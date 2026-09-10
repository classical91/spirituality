// The daily rotations, and the deep link the Daily Dashboard opens.
//
// Run with `npm test`. These use node:test rather than a test framework: the
// modules under test are plain ESM with explicit extensions precisely so the
// server can load them, and node can therefore run them with no dependency.

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { prayerPool } from '../../prayerPool.js';
import { dayOfYear } from '../dateUtils.js';
import { READING_POOL, getDailyReading, getDailyReadingFor } from '../dailyReading.js';
import { getDailyPrayer, getDailyPrayerFor, readingPath, resolveDaily } from '../daily.js';
import { portalPath } from '../portalPath.js';

const day = (year, month, date) => new Date(year, month - 1, date);

describe('the daily rotations', () => {
  it('give the same prayer and reading for the same calendar day', () => {
    assert.deepEqual(resolveDaily(day(2026, 9, 10)), resolveDaily(day(2026, 9, 10)));
  });

  it('move on the next day', () => {
    const today = resolveDaily(day(2026, 9, 10));
    const tomorrow = resolveDaily(day(2026, 9, 11));
    assert.notDeepEqual(tomorrow.prayer, today.prayer);
    assert.notDeepEqual(tomorrow.reading, today.reading);
  });

  it('stay the rotations the home screen shows', () => {
    // The home screen calls getDailyPrayer()/getDailyReading(). resolveDaily has
    // to land on the same entries for the same day, or the dashboard and the app
    // disagree about what today is.
    for (const date of [day(2026, 1, 1), day(2026, 6, 15), day(2026, 12, 31)]) {
      assert.equal(resolveDaily(date).prayer.title, getDailyPrayer(date).title);
      assert.equal(resolveDaily(date).prayer.prayer, getDailyPrayer(date).prayer);
      assert.equal(resolveDaily(date).reading.title, getDailyReading(date).title);
    }
  });

  it('index the prayer by day of year and the reading one ahead of it', () => {
    const index = dayOfYear(day(2026, 9, 10));
    assert.equal(getDailyPrayerFor(index), prayerPool[index % prayerPool.length]);
    assert.equal(getDailyReadingFor(index), READING_POOL[(index + 1) % READING_POOL.length]);
  });

  it('turn over at local midnight, not at UTC midnight', () => {
    // 23:30 local on the 10th is already the 11th in UTC for negative offsets.
    assert.deepEqual(resolveDaily(new Date(2026, 8, 10, 23, 30)), resolveDaily(day(2026, 9, 10)));
  });

  it('cover the whole year without falling off either pool', () => {
    for (let index = 1; index <= 366; index += 1) {
      assert.ok(getDailyPrayerFor(index), `day ${index} has no prayer`);
      assert.ok(getDailyReadingFor(index), `day ${index} has no reading`);
    }
  });
});

describe('the reading pool', () => {
  it('leaves out prayer themes, which have their own card', () => {
    assert.equal(
      READING_POOL.some((entry) => entry.portalId === 'biblical' && entry.section === 'prayers'),
      false,
    );
  });

  it('leaves out the intimate sexual-health sections', () => {
    const excluded = new Set(['masturbation', 'celibacy', 'urges', 'tracker', 'journal']);
    assert.equal(
      READING_POOL.some(
        (entry) => entry.portalId === 'sexualenergy' && excluded.has(entry.section),
      ),
      false,
    );
  });

  it('is not empty, which would make every day null', () => {
    assert.ok(READING_POOL.length > 10);
  });
});

describe('what resolveDaily hands out', () => {
  it('carries only the fields a dashboard card shows', () => {
    const resolved = resolveDaily(day(2026, 9, 10));
    assert.deepEqual(Object.keys(resolved).sort(), ['dayOfYear', 'prayer', 'reading']);
    assert.deepEqual(Object.keys(resolved.prayer).sort(), ['prayer', 'title', 'type']);
    assert.deepEqual(Object.keys(resolved.reading).sort(), [
      'id',
      'lens',
      'path',
      'summary',
      'title',
    ]);
    // No search index, no portal catalog, no tags.
    assert.equal(JSON.stringify(resolved).includes('tags'), false);
  });

  it('deep-links a reading to the path the app itself would navigate to', () => {
    for (let index = 1; index <= 366; index += 1) {
      const reading = getDailyReadingFor(index);
      assert.equal(
        readingPath(reading),
        portalPath(reading.portalId, { section: reading.section }),
      );
    }
  });

  it('gives every day of the year a usable reading link', () => {
    for (let index = 1; index <= 366; index += 1) {
      const path = readingPath(getDailyReadingFor(index));
      assert.ok(path, `day ${index} has no path`);
      assert.ok(path.startsWith('/'), `day ${index} has a path outside the app: ${path}`);
    }
  });
});

describe('portalPath', () => {
  it('routes the folded-in Sacred Moral Atlas sections to that page', () => {
    assert.equal(portalPath('demonology'), '/sacred-moral-atlas?section=demonology-atlas');
    assert.equal(
      portalPath('demonology', { section: 'binsfeld' }),
      '/sacred-moral-atlas?section=binsfeld',
    );
    assert.equal(portalPath('infernalcodex'), '/sacred-moral-atlas?section=infernal-codex');
  });

  it('routes the legacy relationship id to the hub', () => {
    assert.equal(portalPath('relationships'), '/relationship-hub');
    assert.equal(
      portalPath('relationships', { section: 'limerence' }),
      '/relationship-hub?section=limerence',
    );
  });

  it('routes the Sacred Systems tabs to the Atlas rather than their old aliases', () => {
    assert.equal(portalPath('astrology'), '/sacred-systems?section=natal-chart');
    assert.equal(portalPath('numerology'), '/sacred-systems?section=numerology');
  });

  it('has no path for an id it does not know', () => {
    assert.equal(portalPath('not-a-portal'), null);
  });
});
