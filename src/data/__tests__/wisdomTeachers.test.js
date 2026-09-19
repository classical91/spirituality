import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  teachers,
  categories,
  teacherById,
  teacherSearchText,
  teacherMatches,
  validateTeachers,
} from '../wisdomTeachers.js';
import {
  loadAllProfiles,
  loadProfile,
  mergeProfile,
  profileIds,
} from '../wisdomProfiles/index.js';

// The teacher data is split in two: compact cards in wisdomTeachers.js, and the
// long-form profile for each teacher in its own module under wisdomProfiles/.
// That split is what keeps the atlas from shipping ~490 kB nobody browsing
// needs, and these tests are what stop the halves from drifting apart — a
// profile for a teacher who no longer exists, a teacher with no profile, or a
// field that wandered into the wrong layer.

const PROFILE_KEYS = [
  'overview', 'context', 'teachings', 'practiceSteps', 'example',
  'distinctions', 'cautions', 'relatedNotes', 'reading', 'reflectionQuestions',
];

const profileDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'wisdomProfiles');

async function mergedTeachers() {
  await loadAllProfiles();
  return Promise.all(teachers.map(async (card) => mergeProfile(card, await loadProfile(card.id))));
}

describe('the wisdom teacher card layer', () => {
  it('holds no long-form profile fields', () => {
    // A profile field left here would be bundled with the atlas, which is the
    // whole thing this split exists to prevent.
    for (const card of teachers) {
      for (const key of PROFILE_KEYS) {
        assert.equal(card[key], undefined, `${card.id} still carries "${key}" in its card`);
      }
    }
  });

  it('passes its own validation', () => {
    assert.deepEqual(validateTeachers(), []);
  });

  it('gives every teacher a unique id and a known category', () => {
    const ids = teachers.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length);
    teachers.forEach((t) => assert.ok(categories.includes(t.category), `${t.id}: ${t.category}`));
  });
});

describe('the wisdom profile modules', () => {
  it('has exactly one profile per teacher, and no orphans', () => {
    assert.deepEqual(profileIds.slice().sort(), teachers.map((t) => t.id).sort());
  });

  it('has a file on disk for each id in the loader map', () => {
    const onDisk = readdirSync(profileDir)
      .filter((f) => f.endsWith('.js') && f !== 'index.js')
      .map((f) => f.replace(/\.js$/, ''))
      .sort();
    // A file the loader does not list would never be fetched; an id with no file
    // would fail at runtime only when someone opened that teacher.
    assert.deepEqual(onDisk, profileIds.slice().sort());
  });

  it('loads every profile, and each carries only profile fields', async () => {
    for (const id of profileIds) {
      const profile = await loadProfile(id);
      assert.ok(profile && typeof profile === 'object', `${id}: profile did not load`);
      const stray = Object.keys(profile).filter((k) => !PROFILE_KEYS.includes(k));
      assert.deepEqual(stray, [], `${id}: card fields leaked into the profile`);
    }
  });

  it('holds the merged teachers to the full data shape', async () => {
    // validateTeachers skips the profile-layer checks when handed bare cards,
    // so this is the one place the long-form shape is actually enforced.
    assert.deepEqual(validateTeachers(await mergedTeachers()), []);
  });

  it('resolves relatedNotes against ids that exist', async () => {
    for (const t of await mergedTeachers()) {
      for (const id of Object.keys(t.relatedNotes || {})) {
        assert.ok(teacherById[id], `${t.id}: relatedNotes points at unknown teacher "${id}"`);
      }
    }
  });

  it('serves a repeat load from the cache rather than re-importing', async () => {
    const first = await loadProfile('neville');
    const second = await loadProfile('neville');
    assert.equal(first, second, 'a second load returned a different object');
  });

  it('returns null for an id with no profile instead of throwing', async () => {
    assert.equal(await loadProfile('not-a-teacher'), null);
  });
});

describe('wisdom search across the split', () => {
  it('matches card text before any profile is loaded', () => {
    const neville = teacherById.neville;
    assert.ok(teacherMatches(neville, 'imagination'));
    assert.ok(teacherMatches(neville, 'Neville'));
  });

  it('matches long-form text once a teacher is merged', async () => {
    // These terms live only in the profile layer, so they are the ones that
    // would silently stop matching if the merge were dropped.
    const merged = await mergedTeachers();
    const deepTerms = ['grief', 'trauma', 'assumption'];
    for (const term of deepTerms) {
      const cardHits = teachers.filter((t) => teacherMatches(t, term)).length;
      const mergedHits = merged.filter((t) => teacherMatches(t, term)).length;
      assert.ok(
        mergedHits > cardHits,
        `"${term}" should match more teachers once profiles are merged (${mergedHits} vs ${cardHits})`
      );
    }
  });

  it('flattens nested profile structures into the haystack, not "[object Object]"', async () => {
    const merged = (await mergedTeachers()).find((t) => t.id === 'neville');
    const hay = teacherSearchText(merged);
    assert.ok(!hay.includes('[object object]'), 'nested values were stringified instead of flattened');
    // `teachings` is an array of objects; its prose has to be reachable.
    assert.ok(hay.includes(merged.teachings[0].explanation.slice(0, 40).toLowerCase()));
  });

  it('matches everything on an empty query', () => {
    assert.ok(teachers.every((t) => teacherMatches(t, '')));
    assert.ok(teachers.every((t) => teacherMatches(t, '   ')));
  });
});
