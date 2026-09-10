// What today is, in one place.
//
// The Daily Prayer and the Reading for Today are two deterministic rotations
// over the day of the year. They used to be computed where they were rendered —
// the prayer inline in HomePage.jsx, the reading in dailyReading.js — which was
// fine while the home screen was the only thing that wanted them.
//
// Main Hub's Daily Dashboard wants them too, and a second rotation living in a
// second repository would drift from this one the first time a prayer was added.
// So both now resolve here, and both the home screen and server.mjs read them
// from this module. One rotation, two consumers.

import { prayerPool } from '../prayerPool.js';
import { portalPath } from './portalPath.js';
import { dayOfYear } from './dateUtils.js';
import { getDailyReadingFor } from './dailyReading.js';

export function getDailyPrayerFor(dayIndex) {
  if (prayerPool.length === 0) return null;
  return prayerPool[dayIndex % prayerPool.length];
}

export function getDailyPrayer(date = new Date()) {
  return getDailyPrayerFor(dayOfYear(date));
}

/**
 * The path the home screen would navigate to for a reading — the portal's own
 * route, with the section it deep-links to. Main Hub turns this into an
 * "Open Reading →" link, so it has to be the same destination tapping the card
 * here gives you.
 */
export function readingPath(reading) {
  if (!reading) return null;
  return portalPath(reading.portalId, { section: reading.section });
}

/**
 * Both of today's cards, flattened for a caller that is not this app.
 *
 * Only what a dashboard card shows: nothing from the portal catalog beyond the
 * one reading's own entry, and no search index.
 */
export function resolveDaily(date = new Date()) {
  const dayIndex = dayOfYear(date);
  const prayer = getDailyPrayerFor(dayIndex);
  const reading = getDailyReadingFor(dayIndex);

  return {
    dayOfYear: dayIndex,
    prayer: prayer
      ? { type: prayer.type, title: prayer.title, prayer: prayer.prayer }
      : null,
    reading: reading
      ? {
          id: reading.id,
          lens: reading.lens,
          title: reading.title,
          summary: reading.summary,
          path: readingPath(reading),
        }
      : null,
  };
}
