// Search helpers shared by the Demonology Atlas and the Infernal & Mythic
// Codex. Kept free of JSX so node:test can cover them directly.
//
// Queries and text are folded the same way: lower-cased, diacritics removed
// (Māra → mara, Yōkai → yokai, Shayṭān → shaytan, Ronové → ronove), Semitic
// transliteration marks (ʿ ʾ ‘ ’) dropped, and hyphens treated as spaces. A
// query matches when every term starts a word somewhere in the entry (AND).

const COMBINING_MARKS = /[̀-ͯ]/g;
// Ayin/alef marks and apostrophes vanish rather than splitting a word, so
// "Ba'al", "Baʿal" and "Baal" fold to the same string.
const SILENT_MARKS = /[ʻʼʾʿ‘’'`]/g;
const SEPARATORS = /[-‐‑–—_/·]+/g;

const LETTER_FOLDS = { ß: 'ss', æ: 'ae', œ: 'oe', ø: 'o', đ: 'd', ł: 'l', ı: 'i' };
const LETTER_FOLD_RE = new RegExp(`[${Object.keys(LETTER_FOLDS).join('')}]`, 'g');

/** Lower-case, strip diacritics and transliteration marks, collapse spaces. */
export function foldText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(LETTER_FOLD_RE, (ch) => LETTER_FOLDS[ch])
    .replace(SILENT_MARKS, '')
    .replace(SEPARATORS, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Folded query terms; every term must match. */
export function searchTerms(query) {
  const folded = foldText(query);
  return folded ? folded.split(' ') : [];
}

const NAME_FIELDS = ['name', 'aliases', 'originalName'];

function flatten(value, out) {
  if (value == null || typeof value === 'boolean') return;
  if (Array.isArray(value)) {
    value.forEach((v) => flatten(v, out));
  } else if (typeof value === 'object') {
    Object.values(value).forEach((v) => flatten(v, out));
  } else {
    out.push(String(value));
  }
}

const cache = new WeakMap();

/**
 * Folded search text for an entry, split into the names (name, aliases,
 * original-language form) and everything else listed in `fields`. Cached per
 * object and field list.
 */
export function entrySearchText(entry, fields) {
  const key = fields.join('|');
  let perEntry = cache.get(entry);
  if (!perEntry) {
    perEntry = new Map();
    cache.set(entry, perEntry);
  }
  let text = perEntry.get(key);
  if (!text) {
    const names = [];
    NAME_FIELDS.forEach((f) => flatten(entry[f], names));
    const body = [];
    fields.filter((f) => !NAME_FIELDS.includes(f)).forEach((f) => flatten(entry[f], body));
    const foldedNames = foldText(names.join(' | '));
    text = { names: foldedNames, all: `${foldedNames} | ${foldText(body.join(' | '))}` };
    perEntry.set(key, text);
  }
  return text;
}

// "baal (bael)" → ["baal (bael)", "baal", "bael"], so a parenthetical
// alternate name counts as an exact name.
function nameVariants(name) {
  const out = [name];
  const m = name.match(/^(.*?)\s*\((.*)\)\s*$/);
  if (m) out.push(m[1].trim(), m[2].trim());
  return out.filter(Boolean);
}

// Terms match at the start of a word, so "oni" finds "Oni" and "onigawara"
// but not "Babylonian" or "demonic".
const termMatchers = new Map();
function wordStart(term) {
  let re = termMatchers.get(term);
  if (!re) {
    re = new RegExp(`(?:^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    if (termMatchers.size > 500) termMatchers.clear();
    termMatchers.set(term, re);
  }
  return re;
}

function rankFor(text, terms, phrase) {
  const names = text.names.split(' | ').flatMap(nameVariants);
  if (names.some((n) => n === phrase)) return 0;
  if (names.some((n) => n.startsWith(`${phrase} `))) return 1;
  if (terms.every((t) => wordStart(t).test(text.names))) return 2;
  return 3;
}

/**
 * Filter entries by a query and rank them: an exact name or alias match
 * first, then names that start with the query, then names containing every
 * term, then matches elsewhere in the text. Ties keep the original (curated)
 * order.
 */
export function searchEntries(entries, query, fields) {
  const terms = searchTerms(query);
  if (terms.length === 0) return entries;
  const phrase = terms.join(' ');
  const scored = [];
  entries.forEach((entry, index) => {
    const text = entrySearchText(entry, fields);
    if (!terms.every((t) => wordStart(t).test(text.all))) return;
    scored.push({ entry, index, score: rankFor(text, terms, phrase) });
  });
  scored.sort((a, b) => a.score - b.score || a.index - b.index);
  return scored.map((s) => s.entry);
}

/** First letter for an A–Z index, ignoring diacritics (Ōni → O). */
export function indexLetter(name) {
  const first = foldText(name).replace(/[^a-z]/g, '')[0];
  return first ? first.toUpperCase() : '#';
}
