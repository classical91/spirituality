// The editable library: the prayers and affirmations this person actually uses.
//
// prayerPool.js and affirmations.js are the shipped lists — everyone starts
// with them, the API serves them, and they stay source files. What this module
// adds is the layer on top: lines this person wrote themselves, edits to the
// shipped ones, and the ones they hid. That layer is per-browser, so it lives
// in localStorage rather than in the bundle, and it is read here rather than in
// daily.js so the server (which has no localStorage and no single user) keeps
// serving the shipped rotation unchanged.
//
// Everything the Settings screen does — list, add, edit, delete, restore —
// goes through this module, and the home screen reads its daily prayer and its
// refreshing affirmation from the same place, so an edit shows up on the home
// screen without a reload.

import { prayerPool } from '../prayerPool.js';
import { REFRESHING_AFFIRMATIONS } from './affirmations.js';
import { dayOfYear } from './dateUtils.js';
import { readJSON, writeJSON } from './storage.js';

const PRAYERS_KEY = 'library:prayers';
const AFFIRMATIONS_KEY = 'library:affirmations';

// A shipped entry has no id of its own, and its position in the array is not
// one: inserting a prayer above it would silently move somebody's "hidden" flag
// onto a different prayer. So the id is derived from the text itself — stable
// across reorders, and different the moment the shipped wording changes.
function hashId(parts) {
  const source = parts.join('\u0000');
  let hash = 0x811c9dc5;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `builtin-${hash.toString(36)}`;
}

export const prayerBuiltinId = (prayer) => hashId([prayer.type || '', prayer.title || '', prayer.prayer || '']);
export const affirmationBuiltinId = (affirmation) => hashId([affirmation.title || '', affirmation.line || '']);

function customId(prefix) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${random}`;
}

const EMPTY_OVERLAY = { custom: [], hidden: [], edits: {} };

function withoutEdit(edits, id) {
  const next = { ...edits };
  delete next[id];
  return next;
}

function readOverlay(key) {
  const stored = readJSON(key, null);
  if (!stored || typeof stored !== 'object') return { ...EMPTY_OVERLAY, custom: [], hidden: [], edits: {} };
  return {
    custom: Array.isArray(stored.custom) ? stored.custom : [],
    hidden: Array.isArray(stored.hidden) ? stored.hidden : [],
    edits: stored.edits && typeof stored.edits === 'object' ? stored.edits : {},
  };
}

// One subscriber list for both collections. A change to either is rare and the
// screens that care read both, so splitting the notification would buy nothing.
const listeners = new Set();
let revision = 0;

/**
 * A number that changes whenever the library does.
 *
 * useSyncExternalStore needs a snapshot it can compare with ===, and the lists
 * themselves are rebuilt on every read, so a counter is the snapshot and the
 * screens re-derive their list from it.
 */
export function getRevision() {
  return revision;
}

/**
 * Re-read localStorage and tell every screen.
 *
 * Writes through this module notify on their own; this is for the times the
 * stored library changed behind its back — another tab, or a test clearing it.
 */
export function reloadFromStorage() {
  notify();
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  revision += 1;
  for (const listener of listeners) listener();
}

function writeOverlay(key, overlay) {
  writeJSON(key, overlay);
  notify();
}

// Other tabs edit the same library. Without this, a prayer deleted in Settings
// in one tab would stay on the home screen in another until it was reloaded.
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('storage', (event) => {
    if (!event.key || event.key.includes('library:')) reloadFromStorage();
  });
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * A collection is "the shipped list, plus this person's changes to it".
 *
 * Prayers and affirmations differ only in which fields they carry and how a
 * blank one is rejected, so the whole add/edit/delete/restore surface is
 * written once here and bound to each list below.
 */
function makeCollection({ key, base, baseId, fields, normalize, validate }) {
  function entryFrom(raw, source, edits) {
    const id = source === 'builtin' ? baseId(raw) : raw.id;
    const edit = edits[id];
    const merged = edit ? { ...raw, ...edit } : raw;
    const entry = { id, source, edited: Boolean(edit) };
    for (const field of fields) entry[field] = merged[field] ?? '';
    return entry;
  }

  function build() {
    const overlay = readOverlay(key);
    const hidden = new Set(overlay.hidden);
    const builtins = base.map((raw) => entryFrom(raw, 'builtin', overlay.edits));
    const customs = overlay.custom.map((raw) => entryFrom(raw, 'custom', overlay.edits));
    return [...builtins, ...customs].map((entry) => ({ ...entry, hidden: hidden.has(entry.id) }));
  }

  let cached = null;
  let cachedRevision = -1;

  /**
   * Every entry, hidden ones included, each flagged with its state.
   *
   * The result is cached until the library actually changes, because this is
   * what Settings hands useSyncExternalStore as its snapshot: a fresh array on
   * every call reads as a fresh store value and spins React forever.
   */
  function all() {
    if (cachedRevision !== getRevision() || cached === null) {
      cached = build();
      cachedRevision = getRevision();
    }
    return cached;
  }

  let cachedActive = null;
  let cachedActiveRevision = -1;

  /** What the app actually shows: everything not hidden. Cached, as above. */
  function active() {
    if (cachedActiveRevision !== getRevision() || cachedActive === null) {
      cachedActive = all().filter((entry) => !entry.hidden);
      cachedActiveRevision = getRevision();
    }
    return cachedActive;
  }

  function add(input) {
    const draft = normalize(input);
    const problem = validate(draft);
    if (problem) return { ok: false, error: problem };
    const overlay = readOverlay(key);
    const entry = { id: customId('custom'), ...draft };
    writeOverlay(key, { ...overlay, custom: [...overlay.custom, entry] });
    return { ok: true, id: entry.id };
  }

  function update(id, input) {
    const existing = all().find((entry) => entry.id === id);
    if (!existing) return { ok: false, error: 'That entry no longer exists.' };
    const draft = normalize({ ...existing, ...input });
    const problem = validate(draft);
    if (problem) return { ok: false, error: problem };
    const overlay = readOverlay(key);
    if (existing.source === 'custom') {
      writeOverlay(key, {
        ...overlay,
        custom: overlay.custom.map((entry) => (entry.id === id ? { id, ...draft } : entry)),
      });
    } else {
      // A shipped entry is never rewritten in place — the edit is kept beside
      // it, so "restore" can put the original wording back.
      writeOverlay(key, { ...overlay, edits: { ...overlay.edits, [id]: draft } });
    }
    return { ok: true, id };
  }

  /**
   * Delete removes one of this person's own entries outright; a shipped one is
   * hidden instead, because the source file will still be there next release
   * and hiding is the only removal that survives it. Either way it is gone from
   * the app, and either way "restore" brings it back.
   */
  function remove(id) {
    const overlay = readOverlay(key);
    if (overlay.custom.some((entry) => entry.id === id)) {
      writeOverlay(key, {
        ...overlay,
        custom: overlay.custom.filter((entry) => entry.id !== id),
        hidden: overlay.hidden.filter((hiddenId) => hiddenId !== id),
        edits: withoutEdit(overlay.edits, id),
      });
      return { ok: true, restorable: false };
    }
    if (!base.some((raw) => baseId(raw) === id)) return { ok: false, error: 'That entry no longer exists.' };
    if (overlay.hidden.includes(id)) return { ok: true, restorable: true };
    writeOverlay(key, { ...overlay, hidden: [...overlay.hidden, id] });
    return { ok: true, restorable: true };
  }

  /** Un-hide, and drop any edit, so the entry reads as it ships. */
  function restore(id) {
    const overlay = readOverlay(key);
    writeOverlay(key, {
      ...overlay,
      hidden: overlay.hidden.filter((hiddenId) => hiddenId !== id),
      edits: withoutEdit(overlay.edits, id),
    });
    return { ok: true };
  }

  /** Throw away the whole overlay: back to exactly what the app shipped with. */
  function reset() {
    writeOverlay(key, { custom: [], hidden: [], edits: {} });
    return { ok: true };
  }

  function counts() {
    const entries = all();
    return {
      total: entries.filter((entry) => !entry.hidden).length,
      custom: entries.filter((entry) => entry.source === 'custom' && !entry.hidden).length,
      edited: entries.filter((entry) => entry.edited && !entry.hidden).length,
      hidden: entries.filter((entry) => entry.hidden).length,
    };
  }

  return { all, active, add, update, remove, restore, reset, counts };
}

export const prayerLibrary = makeCollection({
  key: PRAYERS_KEY,
  base: prayerPool,
  baseId: prayerBuiltinId,
  fields: ['title', 'type', 'prayer'],
  normalize: (input) => ({
    title: cleanText(input.title),
    type: cleanText(input.type) || 'Personal',
    prayer: cleanText(input.prayer),
  }),
  validate: (draft) => {
    if (!draft.title) return 'Give the prayer a title.';
    if (!draft.prayer) return 'The prayer itself cannot be empty.';
    return null;
  },
});

export const affirmationLibrary = makeCollection({
  key: AFFIRMATIONS_KEY,
  base: REFRESHING_AFFIRMATIONS,
  baseId: affirmationBuiltinId,
  fields: ['title', 'line'],
  normalize: (input) => ({
    title: cleanText(input.title) || 'Personal',
    line: cleanText(input.line),
  }),
  validate: (draft) => {
    if (!draft.line) return 'Write the affirmation.';
    return null;
  },
});

/** The types the shipped prayers use, for the "type" picker in Settings. */
export function prayerTypes() {
  const types = new Set(prayerLibrary.all().map((entry) => entry.type).filter(Boolean));
  return [...types].sort((a, b) => a.localeCompare(b));
}

/** The themes affirmations are grouped under, same purpose. */
export function affirmationThemes() {
  const themes = new Set(affirmationLibrary.all().map((entry) => entry.title).filter(Boolean));
  return [...themes].sort((a, b) => a.localeCompare(b));
}

/**
 * Today's prayer, from the library rather than the shipped pool.
 *
 * Same day-of-year rotation daily.js uses — it just rotates over the list this
 * person is left with after their own edits, so a prayer they added takes its
 * turn and one they deleted never comes up.
 */
export function getLibraryDailyPrayer(date = new Date()) {
  const entries = prayerLibrary.active();
  if (entries.length === 0) return null;
  return entries[dayOfYear(date) % entries.length];
}

export function getLibraryAffirmation(excludeLine) {
  const entries = affirmationLibrary.active();
  if (entries.length === 0) return null;
  if (entries.length === 1) return entries[0];
  let pick;
  do {
    pick = entries[Math.floor(Math.random() * entries.length)];
  } while (pick.line === excludeLine);
  return pick;
}
