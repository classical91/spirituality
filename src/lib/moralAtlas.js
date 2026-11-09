// Pure helpers for the Sacred Moral & Mythic Atlas (BibleConceptAtlas.jsx):
// section deep links, search, and table sorting. Kept free of JSX so the
// node:test suite can cover them directly.

// Keys that hold presentation data (colors, glyphs, ids) rather than text a
// visitor would search for. Serializing the whole object — keys included —
// made "summary" or "title" match every entry and "rgba" match every angel.
const NON_SEARCHABLE_KEYS = new Set(['id', 'icon', 'color', 'accent', 'symbol', 'agree']);

const textCache = new WeakMap();

function collectText(value, out) {
  if (value == null || typeof value === 'boolean') return;
  if (typeof value === 'string' || typeof value === 'number') {
    out.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => collectText(entry, out));
    return;
  }
  if (typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      if (!NON_SEARCHABLE_KEYS.has(key)) collectText(entry, out);
    }
  }
}

/** Lower-cased text of every searchable field in an entry, cached per object. */
export function searchableText(item) {
  if (item == null || typeof item !== 'object') return String(item ?? '').toLowerCase();
  let text = textCache.get(item);
  if (text === undefined) {
    const parts = [];
    collectText(item, parts);
    text = parts.join(' • ').toLowerCase();
    textCache.set(item, text);
  }
  return text;
}

/** Split a query into lower-cased terms; every term must match (AND). */
export function queryTerms(query) {
  return String(query ?? '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function matchesQuery(item, query) {
  const terms = Array.isArray(query) ? query : queryTerms(query);
  if (terms.length === 0) return true;
  const text = searchableText(item);
  return terms.every((term) => text.includes(term));
}

export function filterByQuery(items, query) {
  const terms = queryTerms(query);
  if (terms.length === 0) return items;
  return items.filter((item) => matchesQuery(item, terms));
}

// ── Sorting ────────────────────────────────────────────────────────────────

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function sortValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  return value;
}

/**
 * Sort rows by a column's value. `getValue(row)` returns a string, number or
 * array. Empty values sink to the bottom in both directions; ties keep their
 * original order so an unsorted list's curated order survives as a tiebreak.
 */
export function sortRows(rows, getValue, direction = 'asc') {
  const sign = direction === 'desc' ? -1 : 1;
  return rows
    .map((row, index) => ({ row, index, value: sortValue(getValue(row)) }))
    .sort((a, b) => {
      const aEmpty = a.value == null || a.value === '';
      const bEmpty = b.value == null || b.value === '';
      if (aEmpty || bEmpty) return aEmpty === bEmpty ? a.index - b.index : aEmpty ? 1 : -1;
      const cmp =
        typeof a.value === 'number' && typeof b.value === 'number'
          ? a.value - b.value
          : collator.compare(String(a.value), String(b.value));
      return cmp === 0 ? a.index - b.index : cmp * sign;
    })
    .map((entry) => entry.row);
}

/** Next sort state when a column header is activated: asc → desc → unsorted. */
export function nextSort(current, key) {
  if (!current || current.key !== key) return { key, direction: 'asc' };
  if (current.direction === 'asc') return { key, direction: 'desc' };
  return null;
}

// ── Section deep links ─────────────────────────────────────────────────────

// Prefix for a deep link to one Infernal Codex card: ?section=codex-<entry-id>.
export const CODEX_SECTION_PREFIX = 'codex-';

/** The `?section=` value that opens one Codex card. */
export function codexSection(entryId) {
  return `${CODEX_SECTION_PREFIX}${entryId}`;
}

/**
 * Map a `?section=` value onto an atlas tab, plus the article (or Codex card)
 * to open inside an embedded atlas when the value names one. Unknown values
 * open the overview (tab: null). An unknown Codex card still opens the Codex;
 * the Codex itself ignores an id it does not have.
 */
export function normalizeInitialSection(section, { tabIds, articleIds }) {
  if (!section) return { tab: null };
  if (section.startsWith(CODEX_SECTION_PREFIX) && section.length > CODEX_SECTION_PREFIX.length) {
    return { tab: 'infernal-codex', childSection: section.slice(CODEX_SECTION_PREFIX.length) };
  }
  if (section === 'angelology') return { tab: 'angels' };
  if (section === 'demonology-atlas' || section === 'demonology-portal') return { tab: 'demonology-atlas' };
  if (section === 'infernal-codex' || section === 'infernalcodex') return { tab: 'infernal-codex' };
  if (articleIds.has(section)) return { tab: 'demonology-atlas', childSection: section };
  if (section !== 'overview' && tabIds.has(section)) return { tab: section };
  return { tab: null };
}
