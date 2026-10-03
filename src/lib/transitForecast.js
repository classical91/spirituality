// The 14-day transit forecast: every natal contact, scored, day by day.
//
// This is a different question from the one cosmicTheme.js answers. The Cosmic
// Theme picks *one* contact to name the day and reads it into a sentence. This
// lists *every* contact between the transiting sky and the natal chart at a
// chosen moment, gives each a signed number, and adds those numbers up per day,
// so a card can show how the balance of the chart's contacts moves across two
// weeks. The two are meant to sit side by side, not to replace one another.
//
// ── On Café Astrology ──────────────────────────────────────────────────────
//
// The presentation — a signed "Worth" per transit and Positive / Challenging /
// Net totals per day — is modelled on Café Astrology's transit forecast.
// Café Astrology's exact Worth coefficients are not public. This implementation
// approximates the same concept using an explicit, auditable weighting model.
// Nothing here is Café Astrology's formula, and its numbers are not expected to
// match theirs integer for integer; the aim is comparable behaviour and sensible
// relative strengths. Every coefficient is a named table below so it can be
// calibrated against reference reports without touching the arithmetic.
//
// ── The one astronomy source ──────────────────────────────────────────────
//
// Positions come from positionsFor() in ephemeris.js and nowhere else. There is
// no second ephemeris here and no sign-based shortcut: a placement contributes
// only when the chart gives its exact longitude.

import { ASPECT_NAMES, MAJOR_ASPECTS, aspectOrb } from './aspects.js';
import { BODIES, positionsFor } from './ephemeris.js';

// ── Window ───────────────────────────────────────────────────────────────

/**
 * The window convention, spelled out rather than implied by a loop bound.
 *
 * Café Astrology's "14 Days" view reads as today plus fourteen days ahead, which
 * is fifteen dated snapshots: Day 0 through Day 14.
 */
export const FORECAST_FUTURE_DAYS = 14;
export const INCLUDE_START_DATE = true;
export const MAX_FUTURE_DAYS = 45;

/** The moment of each day read by default: local noon in the requested zone. */
export const DEFAULT_HOUR = 12;
export const DEFAULT_MINUTE = 0;

/**
 * How far ahead applying/separating looks. An hour is about half a degree of
 * Moon and a vanishingly small step for everything else — enough to see which
 * way an orb is moving, short enough that it is the same aspect being measured.
 * This is the same step cosmicTheme.js uses.
 */
const APPLYING_STEP_MS = 3600000;

// ── Orbs ─────────────────────────────────────────────────────────────────

/**
 * The widest orb, in degrees, at which each aspect counts as an active transit.
 *
 * These are the calibration surface for "which transits appear at all". The
 * Cosmic Theme keeps its own flat three degrees; the forecast reads from here.
 */
export const TRANSIT_ORBS = {
  conjunction: 3,
  opposition: 3,
  square: 2.5,
  trine: 2.5,
  sextile: 2,
};

/**
 * Multipliers on TRANSIT_ORBS by transiting body and by natal point.
 *
 * All 1 unless noted: the structure is here so a calibration pass can widen the
 * luminaries or tighten the minor points without editing the loop. A body or
 * point missing from a table multiplies by 1.
 */
export const TRANSIT_BODY_ORB_FACTOR = {};

export const NATAL_POINT_ORB_FACTOR = {
  // Calculated points rather than bodies; kept a little tighter.
  'North Node': 0.75, 'South Node': 0.75, Lilith: 0.75, Chiron: 0.75,
};

/** The allowed orb for one aspect between one transiting body and one natal point. */
export function allowedOrb(aspect, transit, natal) {
  const base = TRANSIT_ORBS[aspect] ?? 0;
  return base
    * (TRANSIT_BODY_ORB_FACTOR[transit] ?? 1)
    * (NATAL_POINT_ORB_FACTOR[natal] ?? 1);
}

// ── Worth ────────────────────────────────────────────────────────────────

/** The multiplier that turns a product of 0–1 weights into Café-sized integers. */
export const WORTH_BASE_SCALE = 500;

/**
 * How much a transiting body counts.
 *
 * Slow bodies weigh more — their contacts last weeks to months — and the Moon
 * least, because it contacts nearly everything in a fortnight and settles
 * little. Started from the Cosmic Theme's TRANSIT_WEIGHT, then spread out so
 * the outer planets clearly outrank the Moon.
 */
export const TRANSIT_PLANET_WEIGHT = {
  Moon: 0.4, Sun: 0.75, Mercury: 0.6, Venus: 0.65, Mars: 0.75,
  Jupiter: 0.85, Saturn: 0.95, Uranus: 0.9, Neptune: 0.85, Pluto: 1.0,
};

/** How much a natal placement counts when something contacts it. */
export const NATAL_POINT_WEIGHT = {
  Sun: 1.0, Moon: 1.0, Ascendant: 0.95, Midheaven: 0.9,
  Mercury: 0.75, Venus: 0.8, Mars: 0.8,
  Jupiter: 0.7, Saturn: 0.75, Uranus: 0.55, Neptune: 0.55, Pluto: 0.6,
  'North Node': 0.6, 'South Node': 0.45, Lilith: 0.45, Chiron: 0.5,
};

/** Used for a transiting body or natal point missing from the tables above. */
const DEFAULT_WEIGHT = 0.5;

/** How much each aspect counts, before polarity. */
export const ASPECT_WEIGHT = {
  conjunction: 1.0,
  opposition: 0.9,
  square: 0.85,
  trine: 0.8,
  sextile: 0.6,
};

/**
 * Exponent on the orb decay. 1 is linear (strength falls evenly from exact to
 * the orb edge); above 1 holds strength near exact and drops it late; below 1
 * drops it early. Linear until calibration says otherwise.
 */
export const ORB_DECAY_EXPONENT = 1;

/**
 * Conjunction polarity, by combination.
 *
 * A conjunction is two bodies in one place, and whether that helps or strains
 * depends on which two. Rules are checked in order, first match wins, and
 * `'*'` matches any body. `polarity` is signed and may be fractional to soften
 * a lean. No match means the conjunction is reported as neutral with Worth 0 —
 * not guessed at; every body in the ephemeris now has a rule, so that is left
 * for points a later table adds.
 */
export const CONJUNCTION_RULES = [
  // Specific pairs first.
  { transit: 'Saturn', natal: 'Saturn', polarity: -1 },
  { transit: 'Mars', natal: 'Saturn', polarity: -1 },
  { transit: 'Saturn', natal: 'Mars', polarity: -1 },
  { transit: 'Venus', natal: 'Jupiter', polarity: 1 },
  { transit: 'Jupiter', natal: 'Venus', polarity: 1 },
  // The benefics bring their lean to whatever they sit on.
  { transit: 'Jupiter', natal: '*', polarity: 1 },
  { transit: 'Venus', natal: '*', polarity: 1 },
  // Saturn's conjunctions are the traditional "test".
  { transit: 'Saturn', natal: '*', polarity: -1 },
  // A natal benefic or malefic lends its lean to a light, quick transit.
  { transit: 'Sun', natal: 'Venus', polarity: 1 },
  { transit: 'Sun', natal: 'Jupiter', polarity: 1 },
  { transit: 'Moon', natal: 'Venus', polarity: 1 },
  { transit: 'Moon', natal: 'Jupiter', polarity: 1 },
  { transit: 'Mercury', natal: 'Jupiter', polarity: 1 },
  { transit: 'Moon', natal: 'Saturn', polarity: -1 },
  { transit: 'Mercury', natal: 'Saturn', polarity: -1 },
  { transit: 'Sun', natal: 'Saturn', polarity: -1 },
  // Every other transiting body leans one way on its own, held to a fractional
  // polarity because the lean is a tradition, not a certainty: the lights and
  // Mercury bring focus, Mars friction, and the outer planets upheaval. These
  // close the gap where the Cosmic Theme could headline a conjunction that
  // scored 0 here.
  { transit: 'Sun', natal: '*', polarity: 0.5 },
  { transit: 'Moon', natal: '*', polarity: 0.25 },
  { transit: 'Mercury', natal: '*', polarity: 0.25 },
  { transit: 'Mars', natal: '*', polarity: -0.5 },
  { transit: 'Uranus', natal: '*', polarity: -0.5 },
  { transit: 'Neptune', natal: '*', polarity: -0.5 },
  { transit: 'Pluto', natal: '*', polarity: -0.75 },
];

/** The polarity of one conjunction, or 0 when no rule covers it. */
export function conjunctionPolarity(transit, natal) {
  const rule = CONJUNCTION_RULES.find((candidate) =>
    (candidate.transit === transit || candidate.transit === '*')
    && (candidate.natal === natal || candidate.natal === '*'));
  return rule ? rule.polarity : 0;
}

/** Polarity of any aspect between two named bodies: +, −, fractional or 0. */
export function aspectPolarity(aspect, transit, natal) {
  const own = MAJOR_ASPECTS[aspect]?.polarity;
  if (own === null) return conjunctionPolarity(transit, natal);
  return own ?? 0;
}

/** 1 at exact, falling to 0 at the orb edge, shaped by ORB_DECAY_EXPONENT. */
export function orbStrength(orb, allowed) {
  if (!(allowed > 0) || orb > allowed) return 0;
  return Math.max(0, 1 - (orb / allowed) ** ORB_DECAY_EXPONENT);
}

/**
 * The signed Worth of one transit.
 *
 *   worth = round(polarity × WORTH_BASE_SCALE × transitWeight × natalWeight
 *                 × aspectWeight × orbStrength)
 *
 * An approximation inspired by Café Astrology's presentation, not their
 * unpublished formula. Kept isolated so calibration only ever touches this and
 * the tables it reads.
 */
export function calculateTransitWorth({ transit, natal, aspect, orb, allowed }) {
  const polarity = aspectPolarity(aspect, transit, natal);
  const magnitude = WORTH_BASE_SCALE
    * (TRANSIT_PLANET_WEIGHT[transit] ?? DEFAULT_WEIGHT)
    * (NATAL_POINT_WEIGHT[natal] ?? DEFAULT_WEIGHT)
    * (ASPECT_WEIGHT[aspect] ?? 0)
    * orbStrength(orb, allowed ?? allowedOrb(aspect, transit, natal));
  // `+ 0` folds a negative zero into zero so a neutral contact serialises as 0.
  return Math.round(polarity * magnitude) + 0;
}

const toneOf = (worth, polarity) => {
  if (polarity === 0) return 'neutral';
  if (worth > 0) return 'positive';
  if (worth < 0) return 'negative';
  return polarity > 0 ? 'positive' : 'negative';
};

// ── Contacts ─────────────────────────────────────────────────────────────

const round = (value, places) => Math.round(value * 10 ** places) / 10 ** places;

/** Placements the forecast can use: those with an exact longitude. */
function exactPlacements(chart) {
  return (chart?.placements ?? []).filter((entry) => Number.isFinite(entry.longitude));
}

/**
 * Every qualifying transit at one instant, strongest (by |Worth|) first.
 *
 * A pair of bodies can only be within orb of one major aspect at a time, since
 * the aspects are at least 60° apart and no orb here is near 30°, so each pair
 * yields at most one record. The natal chart is read, never written.
 */
export function transitsAt(chart, instant) {
  const placements = exactPlacements(chart);
  const sky = positionsFor(instant);
  const soon = Object.fromEntries(positionsFor(new Date(instant.getTime() + APPLYING_STEP_MS))
    .map((entry) => [entry.body, entry]));
  const records = [];

  for (const position of sky) {
    for (const placement of placements) {
      for (const aspect of ASPECT_NAMES) {
        const allowed = allowedOrb(aspect, position.body, placement.body);
        const orb = aspectOrb(position.longitude, placement.longitude, aspect);
        if (orb > allowed) continue;

        // Measured, not assumed: the same aspect an hour on. separation()
        // folds across 0° Aries and measures oppositions from either side, and
        // comparing orbs rather than longitudes is what keeps a retrograde or
        // stationary body honest.
        const orbSoon = aspectOrb(soon[position.body].longitude, placement.longitude, aspect);
        const worth = calculateTransitWorth({
          transit: position.body, natal: placement.body, aspect, orb, allowed,
        });

        records.push({
          transit: position.body,
          natal: placement.body,
          aspect,
          transitLongitude: round(position.longitude, 3),
          natalLongitude: round(placement.longitude, 3),
          orb: round(orb, 3),
          allowedOrb: allowed,
          applying: orbSoon < orb,
          retrograde: position.retrograde,
          tone: toneOf(worth, aspectPolarity(aspect, position.body, placement.body)),
          worth,
        });
      }
    }
  }

  return records.sort(compareByStrength);
}

/** |Worth| descending, then tighter orb, then traditional body order: stable. */
function compareByStrength(a, b) {
  return Math.abs(b.worth) - Math.abs(a.worth)
    || a.orb - b.orb
    || BODIES.indexOf(a.transit) - BODIES.indexOf(b.transit)
    || String(a.natal).localeCompare(String(b.natal))
    || a.aspect.localeCompare(b.aspect);
}

/** Positive, negative and net for a list of transits. */
export function summarize(transits) {
  let positive = 0;
  let negative = 0;
  let strongestPositive = null;
  let strongestNegative = null;
  for (const record of transits) {
    if (record.worth > 0) {
      positive += record.worth;
      if (!strongestPositive || record.worth > strongestPositive.worth) strongestPositive = record;
    } else if (record.worth < 0) {
      negative += record.worth;
      if (!strongestNegative || record.worth < strongestNegative.worth) strongestNegative = record;
    }
  }
  return {
    positive,
    negative,
    total: positive + negative,
    transitCount: transits.length,
    strongestPositive,
    strongestNegative,
  };
}

// ── Time ─────────────────────────────────────────────────────────────────

const DATE_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Whether a string names a real calendar day in YYYY-MM-DD form. */
export function isDateKey(value) {
  const match = DATE_KEY.exec(String(value ?? ''));
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** Whether the runtime knows an IANA time zone by this name. */
export function isTimeZone(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

/** A calendar day `offset` days after `dateKey`, by the calendar, not by 24h steps. */
export function addDays(dateKey, offset) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + offset)).toISOString().slice(0, 10);
}

/** Milliseconds a zone is ahead of UTC at one instant. */
function zoneOffsetMs(timeZone, epochMs) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(epochMs)).map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day,
    +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(epochMs / 1000) * 1000;
}

/**
 * The UTC instant of a wall-clock time in a named zone.
 *
 * 2026-09-27 14:00 America/Vancouver is 21:00Z. Two passes of the offset so a
 * time near a DST change settles on the offset in force at that wall time; a
 * wall time skipped by a spring-forward lands an hour later, as clocks do.
 */
export function zonedInstant(dateKey, hour = DEFAULT_HOUR, minute = DEFAULT_MINUTE, timeZone = 'UTC') {
  const [y, m, d] = dateKey.split('-').map(Number);
  const wall = Date.UTC(y, m - 1, d, hour, minute);
  let instant = wall - zoneOffsetMs(timeZone, wall);
  instant = wall - zoneOffsetMs(timeZone, instant);
  return new Date(instant);
}

// ── The forecast ─────────────────────────────────────────────────────────

/**
 * Today plus `days` future days, each read at the same local wall-clock time.
 *
 * Options: `startDate` (YYYY-MM-DD, required), `days` (future days, default
 * FORECAST_FUTURE_DAYS), `hour`, `minute` and `timeZone` (IANA, default UTC).
 * Deterministic: the same chart and options always give the same forecast.
 */
export function resolveTransitForecast(chart, options = {}) {
  const {
    startDate,
    days = FORECAST_FUTURE_DAYS,
    hour = DEFAULT_HOUR,
    minute = DEFAULT_MINUTE,
    timeZone = 'UTC',
  } = options;

  if (!isDateKey(startDate)) throw new RangeError('startDate must be a real YYYY-MM-DD day.');
  if (!Number.isInteger(days) || days < 0 || days > MAX_FUTURE_DAYS) {
    throw new RangeError(`days must be a whole number from 0 to ${MAX_FUTURE_DAYS}.`);
  }
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) throw new RangeError('hour must be 0–23.');
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) throw new RangeError('minute must be 0–59.');
  if (!isTimeZone(timeZone)) throw new RangeError('timeZone must be an IANA time zone.');

  const first = INCLUDE_START_DATE ? 0 : 1;
  const snapshots = [];
  for (let offset = first; offset <= days; offset += 1) {
    const date = addDays(startDate, offset);
    const instant = zonedInstant(date, hour, minute, timeZone);
    const transits = transitsAt(chart, instant);
    snapshots.push({ date, instant: instant.toISOString(), ...summarize(transits), transits });
  }

  return {
    startDate,
    futureDays: days,
    includeStartDate: INCLUDE_START_DATE,
    hour,
    minute,
    timeZone,
    natalPointsUsed: exactPlacements(chart).length,
    snapshots,
  };
}
