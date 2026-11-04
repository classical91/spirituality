import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  filterByQuery,
  matchesQuery,
  nextSort,
  normalizeInitialSection,
  queryTerms,
  searchableText,
  sortRows,
} from '../moralAtlas.js';
import { demons } from '../../data/demonology.js';
import { demonologyArticleIds } from '../../data/demonologyIds.js';
import { angels } from '../../data/angels.js';

describe('atlas search', () => {
  const pride = {
    id: 'pride',
    title: 'Pride',
    latin: 'Superbia',
    summary: 'Identity becomes inflated.',
    color: 'rgba(255,0,0,.2)',
    texts: ['Proverbs 16:18'],
    associations: { symbols: ['Peacock', 'Mirror'] },
  };

  it('matches field values, not field names', () => {
    assert.equal(matchesQuery(pride, 'superbia'), true);
    // "summary" and "title" are keys — they used to match every entry.
    assert.equal(matchesQuery(pride, 'summary'), false);
    assert.equal(matchesQuery(pride, 'title'), false);
  });

  it('ignores presentation-only fields', () => {
    assert.equal(matchesQuery(pride, 'rgba'), false);
  });

  it('searches nested arrays and objects', () => {
    assert.equal(matchesQuery(pride, 'proverbs'), true);
    assert.equal(matchesQuery(pride, 'peacock'), true);
  });

  it('requires every term to match, in any order', () => {
    assert.equal(matchesQuery(pride, 'mirror pride'), true);
    assert.equal(matchesQuery(pride, 'pride envy'), false);
  });

  it('returns the original list for an empty query', () => {
    const list = [pride];
    assert.equal(filterByQuery(list, '   '), list);
    assert.deepEqual(queryTerms('  Two   words '), ['two', 'words']);
  });

  it('no longer matches every angel on a colour value', () => {
    assert.ok(angels.length > 5);
    assert.equal(filterByQuery(angels, 'rgba').length, 0);
    assert.ok(filterByQuery(angels, 'michael').length >= 1);
  });

  it('caches per object', () => {
    const entry = { title: 'Humility' };
    assert.equal(searchableText(entry), searchableText(entry));
  });
});

describe('atlas table sorting', () => {
  const rows = [
    { name: 'Circle 10', n: 10 },
    { name: 'Circle 2', n: 2 },
    { name: '', n: null },
    { name: 'circle 1', n: 1 },
  ];

  it('sorts text naturally and case-insensitively', () => {
    assert.deepEqual(sortRows(rows, (r) => r.name).map((r) => r.n), [1, 2, 10, null]);
  });

  it('sorts descending with empty values still last', () => {
    assert.deepEqual(sortRows(rows, (r) => r.n, 'desc').map((r) => r.n), [10, 2, 1, null]);
  });

  it('keeps original order for ties', () => {
    const ties = [{ k: 'a', i: 0 }, { k: 'a', i: 1 }, { k: 'a', i: 2 }];
    assert.deepEqual(sortRows(ties, (r) => r.k, 'desc').map((r) => r.i), [0, 1, 2]);
  });

  it('cycles header clicks asc → desc → unsorted', () => {
    const first = nextSort(null, 'sin');
    assert.deepEqual(first, { key: 'sin', direction: 'asc' });
    const second = nextSort(first, 'sin');
    assert.deepEqual(second, { key: 'sin', direction: 'desc' });
    assert.equal(nextSort(second, 'sin'), null);
    assert.deepEqual(nextSort(second, 'virtue'), { key: 'virtue', direction: 'asc' });
  });
});

describe('atlas section deep links', () => {
  const tabIds = new Set(['overview', 'virtues', 'angels', 'demonology-atlas', 'infernal-codex']);
  const articleIds = new Set(demonologyArticleIds);
  const resolve = (section) => normalizeInitialSection(section, { tabIds, articleIds });

  it('opens a known tab', () => {
    assert.deepEqual(resolve('virtues'), { tab: 'virtues' });
  });

  it('maps legacy section names', () => {
    assert.deepEqual(resolve('angelology'), { tab: 'angels' });
    assert.deepEqual(resolve('infernalcodex'), { tab: 'infernal-codex' });
    assert.deepEqual(resolve('demonology-portal'), { tab: 'demonology-atlas' });
  });

  it('opens a demonology article inside the embedded atlas', () => {
    assert.deepEqual(resolve('asmodeus'), { tab: 'demonology-atlas', childSection: 'asmodeus' });
  });

  it('falls back to the overview', () => {
    assert.deepEqual(resolve(undefined), { tab: null });
    assert.deepEqual(resolve('overview'), { tab: null });
    assert.deepEqual(resolve('no-such-section'), { tab: null });
  });

  it('keeps the lightweight id index in sync with the article data', () => {
    assert.deepEqual(demonologyArticleIds, demons.map((entry) => entry.id));
  });
});
