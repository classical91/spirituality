import assert from 'node:assert/strict';
import test from 'node:test';

import { PAGES, pageSources, readManifest, stalePages, today } from '../../../scripts/pageUpdates.mjs';

test('every page has a "Last updated" date', () => {
  const manifest = readManifest();
  for (const id of Object.keys(PAGES)) {
    assert.match(manifest[id]?.updated ?? '', /^\d{4}-\d{2}-\d{2}$/, `${id} has no date`);
  }
});

test('no page has changed since it was dated', () => {
  // A page's date moves only when someone restamps it, so a change that skips
  // that would leave the page claiming an older date than it has.
  const stale = stalePages();
  assert.deepEqual(
    stale,
    [],
    `Changed since last dated: ${stale.join(', ')}. Run \`npm run stamp-pages\` and commit src/data/pageUpdates.json.`
  );
});

test("a page's sources include what it imports, not just its entry file", () => {
  // The Relationship Hub's topics are in data files; editing one is an update
  // to the page even though RelationshipHub.jsx did not change.
  const sources = pageSources(PAGES.relationshiphub);
  assert.ok(sources.includes('src/RelationshipHub.jsx'));
  assert.ok(sources.some((file) => file.startsWith('src/data/')), 'no data files were followed');
});

test("today is the owner's calendar day, not UTC's", () => {
  // 03:00 UTC on the 14th is still the evening of the 13th in Vancouver.
  assert.equal(today(new Date('2026-11-14T03:00:00Z')), '2026-11-13');
});
