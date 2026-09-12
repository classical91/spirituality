import assert from 'node:assert/strict';
import test from 'node:test';

import {
  REFRESHING_AFFIRMATIONS,
  getNextAffirmation,
  getRefreshingAffirmation,
} from '../affirmations.js';

test('every affirmation is a themed line', () => {
  assert.ok(REFRESHING_AFFIRMATIONS.length > 0);
  for (const item of REFRESHING_AFFIRMATIONS) {
    assert.equal(typeof item.title, 'string');
    assert.equal(typeof item.line, 'string');
    assert.ok(item.title.trim().length > 0, 'an affirmation has no theme');
    assert.ok(item.line.trim().length > 0, 'an affirmation has no line');
  }
});

test('the list is flat, not the groups it is written as', () => {
  // Written as themed groups for editing, flattened for showing: a card shows
  // one line, so a group would have to be taken apart by every caller.
  assert.equal(REFRESHING_AFFIRMATIONS.some((item) => Array.isArray(item.lines)), false);
});

test('a shuffle never lands on the line already showing', () => {
  // The home screen rotates every twelve seconds; repeating the line on screen
  // reads as the page having frozen rather than moved on.
  const current = REFRESHING_AFFIRMATIONS[0];
  for (let attempt = 0; attempt < 200; attempt += 1) {
    assert.notEqual(getNextAffirmation(current.line).line, current.line);
  }
});

test('a pick is always one of the list', () => {
  const lines = new Set(REFRESHING_AFFIRMATIONS.map((item) => item.line));
  for (let attempt = 0; attempt < 100; attempt += 1) {
    assert.ok(lines.has(getRefreshingAffirmation().line));
  }
});
