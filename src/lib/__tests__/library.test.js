// The editable library: what add/edit/delete/restore do to the lists the home
// screen draws from, and what they leave alone.
//
// storage.js reads window.localStorage, so these install a minimal one before
// importing the module under test — the same trade the rest of this suite makes
// to stay on node:test with no dependencies.

import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';

const store = new Map();
globalThis.window = {
  localStorage: {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
  },
  addEventListener: () => {},
};

const { prayerPool } = await import('../../prayerPool.js');
const { REFRESHING_AFFIRMATIONS } = await import('../affirmations.js');
const {
  affirmationLibrary,
  getLibraryAffirmation,
  getLibraryDailyPrayer,
  prayerBuiltinId,
  prayerLibrary,
  reloadFromStorage,
  subscribe,
} = await import('../library.js');

beforeEach(() => {
  // Emptying the store behind the module's back is exactly the case
  // reloadFromStorage exists for — without it the cached lists would still
  // describe the previous test's library.
  store.clear();
  reloadFromStorage();
});

describe('the shipped lists', () => {
  it('are what an untouched library holds', () => {
    assert.equal(prayerLibrary.active().length, prayerPool.length);
    assert.equal(affirmationLibrary.active().length, REFRESHING_AFFIRMATIONS.length);
  });

  it('give each entry an id that survives a reorder', () => {
    // The id is derived from the text, not the index: inserting a prayer above
    // a hidden one must not move the "hidden" flag onto a different prayer.
    const first = prayerPool[0];
    assert.equal(prayerBuiltinId(first), prayerBuiltinId({ ...first }));
    assert.notEqual(prayerBuiltinId(first), prayerBuiltinId(prayerPool[1]));
  });
});

describe('adding', () => {
  it('puts a new prayer into the rotation', () => {
    const result = prayerLibrary.add({ title: 'Evening', type: 'Personal', prayer: 'Let me rest.' });
    assert.ok(result.ok);
    const added = prayerLibrary.active().find((entry) => entry.id === result.id);
    assert.equal(added.prayer, 'Let me rest.');
    assert.equal(added.source, 'custom');
    assert.equal(prayerLibrary.active().length, prayerPool.length + 1);
  });

  it('refuses a blank one, with a reason to show', () => {
    const result = prayerLibrary.add({ title: '  ', prayer: '  ' });
    assert.equal(result.ok, false);
    assert.equal(typeof result.error, 'string');
    assert.equal(prayerLibrary.active().length, prayerPool.length);
  });

  it('trims what it stores', () => {
    const { id } = affirmationLibrary.add({ title: '  Clarity  ', line: '  I see clearly.  ' });
    const added = affirmationLibrary.active().find((entry) => entry.id === id);
    assert.equal(added.title, 'Clarity');
    assert.equal(added.line, 'I see clearly.');
  });
});

describe('editing', () => {
  it('keeps a shipped prayer editable without losing the original', () => {
    const target = prayerLibrary.active()[0];
    prayerLibrary.update(target.id, { prayer: 'My own wording.' });

    const edited = prayerLibrary.active().find((entry) => entry.id === target.id);
    assert.equal(edited.prayer, 'My own wording.');
    assert.equal(edited.edited, true);
    assert.equal(prayerPool[0].prayer, target.prayer, 'the shipped list was mutated');

    prayerLibrary.restore(target.id);
    assert.equal(prayerLibrary.active().find((entry) => entry.id === target.id).prayer, target.prayer);
  });

  it('refuses an edit that empties the entry', () => {
    const target = affirmationLibrary.active()[0];
    const result = affirmationLibrary.update(target.id, { line: '   ' });
    assert.equal(result.ok, false);
    assert.equal(affirmationLibrary.active()[0].line, target.line);
  });
});

describe('deleting', () => {
  it('hides a shipped prayer and can bring it back', () => {
    const target = prayerLibrary.active()[0];
    const result = prayerLibrary.remove(target.id);

    assert.equal(result.restorable, true, 'a shipped prayer is hidden, not erased');
    assert.equal(prayerLibrary.active().length, prayerPool.length - 1);
    assert.ok(prayerLibrary.all().find((entry) => entry.id === target.id).hidden);

    prayerLibrary.restore(target.id);
    assert.equal(prayerLibrary.active().length, prayerPool.length);
  });

  it('erases one of your own outright', () => {
    const { id } = prayerLibrary.add({ title: 'Mine', prayer: 'A line.' });
    const result = prayerLibrary.remove(id);

    assert.equal(result.restorable, false);
    assert.equal(prayerLibrary.all().some((entry) => entry.id === id), false);
  });
});

describe('reset', () => {
  it('returns both lists to what the app ships with', () => {
    prayerLibrary.add({ title: 'Mine', prayer: 'A line.' });
    prayerLibrary.remove(prayerLibrary.active()[0].id);
    prayerLibrary.reset();

    assert.deepEqual(prayerLibrary.counts(), { total: prayerPool.length, custom: 0, edited: 0, hidden: 0 });
  });
});

describe('what the home screen shows', () => {
  it('rotates the daily prayer over the library, not the shipped pool', () => {
    const before = getLibraryDailyPrayer(new Date(2026, 0, 5));
    prayerLibrary.remove(before.id);
    const after = getLibraryDailyPrayer(new Date(2026, 0, 5));
    assert.notEqual(after.id, before.id);
  });

  it('is stable for a given day', () => {
    const date = new Date(2026, 5, 15);
    assert.equal(getLibraryDailyPrayer(date).id, getLibraryDailyPrayer(date).id);
  });

  it('never repeats the affirmation already on screen', () => {
    const current = affirmationLibrary.active()[0];
    for (let attempt = 0; attempt < 100; attempt += 1) {
      assert.notEqual(getLibraryAffirmation(current.line).line, current.line);
    }
  });

  it('has nothing to show once the library is emptied', () => {
    for (const entry of prayerLibrary.active()) prayerLibrary.remove(entry.id);
    assert.equal(getLibraryDailyPrayer(), null);
  });
});

describe('subscribers', () => {
  it('hear about every change, so an open screen updates itself', () => {
    let calls = 0;
    const unsubscribe = subscribe(() => { calls += 1; });

    const { id } = prayerLibrary.add({ title: 'Mine', prayer: 'A line.' });
    prayerLibrary.update(id, { prayer: 'Reworded.' });
    prayerLibrary.remove(id);
    unsubscribe();
    prayerLibrary.add({ title: 'Later', prayer: 'Not counted.' });

    assert.equal(calls, 3);
  });
});
