import { test } from 'node:test';
import assert from 'node:assert/strict';
import { astrologyCards, numerologyCards } from './sacredSystemsCards.js';
import { HOUSE_DEPTH, oppositeHouse, houseType, houseElement } from './astrologyHouseDepth.js';

const houseCards = astrologyCards.filter((c) => c.id.startsWith('astro-house-'));
// Hand-written Sacred Systems concepts never appear as link targets from house
// pages, so the generated cards are the full set of valid targets.
const knownIds = new Set([...astrologyCards, ...numerologyCards].map((c) => c.id));

test('every house has depth content', () => {
  assert.equal(houseCards.length, 12);
  for (let n = 1; n <= 12; n++) {
    const d = HOUSE_DEPTH[n];
    assert.ok(d, `house ${n} missing`);
    for (const key of ['lifeAreas', 'healthy', 'shadow', 'questions', 'practice']) {
      assert.ok(Array.isArray(d[key]) && d[key].length >= 3, `house ${n} ${key}`);
    }
    assert.ok(d.innerTheme && d.transits, `house ${n} text fields`);
  }
});

test('house structure helpers', () => {
  assert.equal(oppositeHouse(1), 7);
  assert.equal(oppositeHouse(12), 6);
  assert.equal(oppositeHouse(6), 12);
  assert.equal(houseType(10), 'Angular');
  assert.equal(houseType(8), 'Succedent');
  assert.equal(houseType(12), 'Cadent');
  assert.equal(houseElement(9), 'Fire');
  assert.equal(houseElement(12), 'Water');
});

test('every link on a house page opens an existing concept', () => {
  for (const card of houseCards) {
    assert.ok(card.sections.length > 0, card.id);
    for (const section of card.sections) {
      const links = [
        ...(section.kind === 'facts' ? section.items.flatMap((f) => f.links || []) : []),
        ...(section.kind === 'links' ? section.items : []),
      ];
      for (const link of links) {
        assert.ok(knownIds.has(link.linkId), `${card.id} → ${link.linkId}`);
      }
    }
  }
});

test('the 12th House lists all ten planets', () => {
  const twelfth = houseCards.find((c) => c.id === 'astro-house-12');
  const planets = twelfth.sections.find((s) => s.kind === 'links');
  assert.equal(planets.items.length, 10);
  assert.ok(planets.items.every((p) => p.text));
});
