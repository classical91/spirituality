import { searchIndex } from '../data/searchIndex';
import { dayOfYear } from './dateUtils';

// Deterministic shuffle so consecutive days don't walk through same-portal
// entries in order. Fixed seed → same rotation order for everyone, every day.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sections that are too personal/intimate to surface as an unsolicited daily reading.
const READING_POOL_SKIP = new Set(['masturbation', 'celibacy', 'urges', 'tracker', 'journal']);

// A well-spread reading rotation drawn from every readable section in the hub.
// Prayer themes are excluded — they already have their own Daily Prayer card.
// Intimate sexual-health journal sections are excluded for the same reason.
export const READING_POOL = (() => {
  const arr = searchIndex.filter(
    (entry) =>
      !(entry.portalId === 'biblical' && entry.section === 'prayers') &&
      !(entry.portalId === 'sexualenergy' && READING_POOL_SKIP.has(entry.section))
  );
  const rnd = mulberry32(20240531);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
})();

// +1 offset keeps consecutive days from repeating when DST shifts caused two
// calendar days to land on the same pool index before the fix was deployed.
export function getDailyReading() {
  if (READING_POOL.length === 0) return null;
  return READING_POOL[(dayOfYear() + 1) % READING_POOL.length];
}
