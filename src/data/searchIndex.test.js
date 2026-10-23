import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { hinduChakras } from './hinduChakras.js';
import { searchIndex } from './searchIndex.js';

describe('search index deep links', () => {
  it('links each chakra result to a chakra the visualizer knows', () => {
    // The visualizer falls back to the Heart chakra for an id it does not
    // know, so a mistyped section opens the wrong chakra instead of failing.
    const ids = new Set(hinduChakras.map((chakra) => chakra.id));
    searchIndex
      .filter((entry) => entry.portalId === 'chakra' && entry.section)
      .forEach((entry) => assert.ok(ids.has(entry.section), `${entry.id} links to unknown chakra "${entry.section}"`));
  });
});
