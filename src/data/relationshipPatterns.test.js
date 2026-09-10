import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveOwner } from './relationshipIndex.js';
import { relationshipPatterns, relationshipPatternsById } from './relationshipPatterns.js';

describe('relationship pattern pages', () => {
  it('gives every concept a unique deep link owned by the patterns section', () => {
    const ids = relationshipPatterns.map((pattern) => pattern.id);
    assert.equal(new Set(ids).size, ids.length);
    ids.forEach((id) => assert.equal(resolveOwner(id), 'patterns'));
  });

  it('keeps every related concept routable', () => {
    relationshipPatterns.forEach((pattern) => {
      pattern.related.forEach((related) => {
        assert.ok(resolveOwner(related.id), `${pattern.id} links to unknown section ${related.id}`);
      });
    });
  });

  it('expands the ghosting page beyond the old four-item summary', () => {
    const ghosting = relationshipPatternsById['ghosting-wounds'];
    assert.ok(ghosting.items.length >= 5);
    assert.ok(ghosting.practices.length >= 5);
    assert.ok(ghosting.reflection.length >= 3);
    assert.ok(ghosting.note);
    assert.ok(ghosting.sources.length >= 2);
  });
});
