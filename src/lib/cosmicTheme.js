// Today's Cosmic Theme: one theme for the day, read from the sky against a chart.
//
// The rule this module is built on is the one the whole app runs on — say where
// it came from. A theme that cannot name the transit behind it is a horoscope,
// and a horoscope is the same sentence for a twelfth of the world. So every
// reading here ends up as a named contact between a moving body and a natal
// placement, and the card that shows it prints that line underneath.
//
// Three speeds, and the difference between them is the whole design. Saturn on a
// natal placement lasts most of a year; if the strongest contact named the day,
// the card would print the same theme every morning until spring. The Sun is no
// better — it holds a sign for a month, so a Sun-led theme is a monthly theme.
//
// So the reading is layered the way it is done by hand. The slow bodies are the
// chapter, and they set the word in front of the theme. The Moon is the
// paragraph: it changes sign every two and a half days, so its contact with the
// chart names the theme. And the Moon's aspects to the other transiting bodies
// are the sentence — those are read by degree rather than by sign, so they
// tighten and let go within a day, and they are what stops two mornings in the
// same week from reading identically.
//
// What this will not do is invent a new theme every twenty-four hours. Aspects
// do not work that way, and a card that changed daily because it was supposed
// to would be making it up.
//
// Everything here is a table. There is no generated prose and no randomness: the
// same chart and the same date give the same theme, today and in ten years.

import { BODIES, SIGNS, positionsFor } from './ephemeris.js';

/** The four parts of a life the card carries badges for. */
export const DOMAINS = ['Love', 'Career', 'Money', 'Inner Work'];

/**
 * Bodies that move fast enough to name a day.
 *
 * The Moon changes sign every two and a half days, the Sun every month. A theme
 * led by one of these is a theme that is different next week.
 */
const DAY_BODIES = new Set(['Moon', 'Sun', 'Mercury', 'Venus', 'Mars']);

/** Whole-sign aspects: how many signs apart, and what that means. */
const ASPECTS = {
  0: { name: 'conjunct', verb: 'sits on', tone: 'charged', weight: 1.0 },
  2: { name: 'sextile', verb: 'angles toward', tone: 'easy', weight: 0.55 },
  3: { name: 'square', verb: 'squares', tone: 'hard', weight: 0.85 },
  4: { name: 'trine', verb: 'trines', tone: 'easy', weight: 0.8 },
  6: { name: 'opposite', verb: 'stands opposite', tone: 'hard', weight: 0.9 },
};

/**
 * How much a transiting body counts.
 *
 * Within the day bodies this is roughly "how much of the day does it colour":
 * the Moon touches everything and settles nothing, so it leads only when
 * nothing else is contacting the chart.
 */
const TRANSIT_WEIGHT = {
  Moon: 0.45, Sun: 0.95, Mercury: 0.65, Venus: 0.75, Mars: 0.8,
  Jupiter: 0.95, Saturn: 1.0, Uranus: 0.85, Neptune: 0.8, Pluto: 1.0,
};

/** How much a natal placement counts when something contacts it. */
const NATAL_WEIGHT = {
  Sun: 1.0, Moon: 1.0, Ascendant: 0.95, Midheaven: 0.9,
  Mercury: 0.7, Venus: 0.8, Mars: 0.75,
  Jupiter: 0.65, Saturn: 0.8, Uranus: 0.5, Neptune: 0.5, Pluto: 0.6,
  'North Node': 0.7, 'South Node': 0.5, Lilith: 0.5, Chiron: 0.6,
};

/** What each house is the field of, in the words the card will print. */
const HOUSE_FIELD = {
  1: 'how you show up',
  2: 'what you earn and what you value',
  3: 'how you think and how you say it',
  4: 'home, and the ground you stand on',
  5: 'romance, play, and what you make',
  6: 'the work and the body that does it',
  7: 'the people you go in with',
  8: 'what you share and what you owe',
  9: 'meaning, and the long view',
  10: 'your work where people can see it',
  11: 'the people you belong among',
  12: 'what you only meet in private',
};

/** Which parts of a life a house belongs to. */
const HOUSE_DOMAINS = {
  1: ['Inner Work'], 2: ['Money'], 3: ['Inner Work'], 4: ['Inner Work'],
  5: ['Love'], 6: ['Career'], 7: ['Love'], 8: ['Money', 'Inner Work'],
  9: ['Inner Work'], 10: ['Career'], 11: ['Career'], 12: ['Inner Work'],
};

/** And which a natal body carries wherever it sits. */
const BODY_DOMAINS = {
  Sun: ['Inner Work'], Moon: ['Inner Work'], Venus: ['Love'], Mars: ['Career'],
  Mercury: ['Career'], Jupiter: ['Money'], Saturn: ['Career'], Pluto: ['Inner Work'],
  Uranus: ['Inner Work'], Neptune: ['Inner Work'], Ascendant: ['Inner Work'],
  Midheaven: ['Career'], 'North Node': ['Career'], Lilith: ['Love'], Chiron: ['Inner Work'],
};

/**
 * What a transiting body does, by tone — the clause the first sentence turns on.
 *
 * A conjunction takes the charged column because that is what a conjunction is:
 * not help and not friction, but the two bodies in the same place with no room
 * between them.
 */
const TRANSIT_CLAUSE = {
  Sun:     { easy: 'it lights up', hard: 'it puts the pressure on', charged: 'the year turns its attention to' },
  Moon:    { easy: 'it softens', hard: 'it stirs', charged: 'the mood of the day settles over' },
  Mercury: { easy: 'it finds the words for', hard: 'it scrambles the wires in', charged: 'the thinking goes straight to' },
  Venus:   { easy: 'it sweetens', hard: 'it tests what you want in', charged: 'what you want gathers around' },
  Mars:    { easy: 'it puts heat behind', hard: 'it picks the fight in', charged: 'the drive goes into' },
  Jupiter: { easy: 'it opens room in', hard: 'it overpromises in', charged: 'the widening happens in' },
  Saturn:  { easy: 'it puts a floor under', hard: 'it asks for proof in', charged: 'the weight comes down on' },
  Uranus:  { easy: 'it loosens', hard: 'it jolts', charged: 'the break comes in' },
  Neptune: { easy: 'it blurs the edges of', hard: 'it fogs', charged: 'the fog settles on' },
  Pluto:   { easy: 'it deepens', hard: 'it forces the issue in', charged: 'the whole thing is being rebuilt in' },
};

/** The noun the theme is named for: the transiting body's business, by tone. */
const THEME_NOUN = {
  Sun:     { easy: 'focus', hard: 'exposure', charged: 'renewal' },
  Moon:    { easy: 'ease', hard: 'tides', charged: 'feeling' },
  Mercury: { easy: 'clarity', hard: 'revision', charged: 'reckoning' },
  Venus:   { easy: 'warmth', hard: 'recalibration', charged: 'appraisal' },
  Mars:    { easy: 'momentum', hard: 'friction', charged: 'drive' },
  Jupiter: { easy: 'expansion', hard: 'overreach', charged: 'opening' },
  Saturn:  { easy: 'consolidation', hard: 'accounting', charged: 'commitment' },
  Uranus:  { easy: 'loosening', hard: 'disruption', charged: 'departure' },
  Neptune: { easy: 'softening', hard: 'blur', charged: 'dissolution' },
  Pluto:   { easy: 'depth', hard: 'pressure', charged: 'rebuilding' },
};

/**
 * The word in front of the noun: where in a life the day's contact lands.
 *
 * From the house rather than from the backdrop planet, which was the first way
 * this was written and was wrong — a backdrop lasts months, so the theme would
 * have opened with the same word every morning until it moved. The house moves
 * with the Moon.
 */
const HOUSE_QUALIFIER = {
  1: 'Personal', 2: 'Material', 3: 'Spoken', 4: 'Grounded',
  5: 'Playful', 6: 'Working', 7: 'Relational', 8: 'Deep',
  9: 'Widening', 10: 'Public', 11: 'Shared', 12: 'Quiet',
};

/**
 * The Moon's aspects to the other moving bodies, read by degree.
 *
 * Everything else here is whole-sign, because a natal chart given as signs and
 * houses has no degrees to be exact about. These two both come from the
 * ephemeris, so both have degrees — and a six-degree orb on a body that moves
 * thirteen degrees a day is a window of about half a day. This is the layer
 * that makes one morning different from the next.
 */
const DEGREE_ASPECTS = [
  { angle: 0, name: 'conjunct', tone: 'charged' },
  { angle: 60, name: 'sextile', tone: 'easy' },
  { angle: 90, name: 'square', tone: 'hard' },
  { angle: 120, name: 'trine', tone: 'easy' },
  { angle: 180, name: 'opposite', tone: 'hard' },
];

const MOON_ORB = 6;

/** What the Moon meeting each body does to a day. */
const WEATHER_CLAUSE = {
  Sun:     { easy: 'the day agrees with itself', hard: 'what you feel and what you are doing pull apart', charged: 'a fresh start with nothing to show yet' },
  Mercury: { easy: 'feelings arrive already worded', hard: 'the urge to explain outruns the knowing', charged: 'thinking and feeling say the same thing' },
  Venus:   { easy: 'company is easy and worth having', hard: 'wanting it and liking it are not the same today', charged: 'warmth with no particular agenda' },
  Mars:    { easy: 'there is energy for the thing you have been circling', hard: 'irritation arrives before its reason does', charged: 'the impulse is strong and early' },
  Jupiter: { easy: 'a wider mood than the facts strictly justify', hard: 'the appetite is bigger than the afternoon', charged: 'generosity, and some overestimating' },
  Saturn:  { easy: 'a steady hour is available if you take it', hard: 'the mood goes flat and calls itself realism', charged: 'the weight of what is actually required' },
  Uranus:  { easy: 'a small change of plan improves the day', hard: 'restlessness with nowhere particular to go', charged: 'something goes off-script' },
  Neptune: { easy: 'a softer, more porous few hours', hard: 'tiredness reads as sadness; check which it is', charged: 'the edges go quiet and indistinct' },
  Pluto:   { easy: 'an honest look at something you had left alone', hard: 'an old reaction comes up at full size', charged: 'the feeling underneath the feeling' },
};

/** What the day asks, by the tone of its leading contact. */
const ASK = {
  easy: 'Nothing here forces anything, which is exactly why it can be missed — an open door still has to be walked through.',
  hard: 'The friction is the information: what will not hold today was not holding quietly yesterday either.',
  charged: 'This is a starting line rather than a verdict; what you point it at today is what it goes on being about.',
};

/** And what the backdrop is doing underneath it. */
const BACKDROP_CLAUSE = {
  Jupiter: 'more room than usual, for as long as it lasts',
  Saturn: 'the slow argument for doing it properly',
  Uranus: 'the part of it that will not go back to how it was',
  Neptune: 'the edges staying softer than you would like',
  Pluto: 'the version of this that is being rebuilt from underneath',
};

const signIndex = (sign) => SIGNS.indexOf(sign);

/** The whole-sign aspect between two signs, or null when there is none. */
function aspectBetween(fromSign, toSign) {
  const from = signIndex(fromSign);
  const to = signIndex(toSign);
  if (from < 0 || to < 0) return null;
  const distance = Math.abs(from - to);
  return ASPECTS[Math.min(distance, 12 - distance)] || null;
}

/**
 * A natal chart, checked.
 *
 * Deliberately strict about signs and houses and deliberately quiet about
 * everything else: a chart with a body this app has no ephemeris for is a chart
 * with one placement fewer, not a broken endpoint.
 */
export function parseNatalChart(value) {
  // Unset is the commonest state of all — a fresh deployment has no chart — so
  // it gets the plain sentence rather than falling through to a complaint about
  // undefined not being an object.
  if (value === undefined || value === null) return { chart: null, error: 'No chart is set.' };

  let raw = value;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return { chart: null, error: 'No chart is set.' };
    try {
      raw = JSON.parse(trimmed);
    } catch {
      return { chart: null, error: 'The chart is not valid JSON.' };
    }
  }
  if (!raw || typeof raw !== 'object') return { chart: null, error: 'The chart is not an object.' };

  const placements = (Array.isArray(raw.placements) ? raw.placements : [])
    .map((entry) => ({
      body: String(entry?.body ?? '').trim(),
      sign: String(entry?.sign ?? '').trim(),
      house: Number(entry?.house),
    }))
    .filter((entry) => entry.body
      && signIndex(entry.sign) >= 0
      && Number.isInteger(entry.house)
      && entry.house >= 1 && entry.house <= 12);

  if (!placements.length) {
    return { chart: null, error: 'The chart has no placements this app can read.' };
  }

  return { chart: { placements }, error: null };
}

/**
 * The instant a calendar day is read at.
 *
 * Midday UTC, so a day has exactly one sky: the answer is the same all day
 * however often it is asked, and it is never more than half a day from any
 * reader's own noon — which for the Moon, the only body that can change sign
 * inside a day, is the difference that could matter.
 */
export function instantFor(dateKey) {
  return new Date(`${dateKey}T12:00:00.000Z`);
}

/** Every contact between the day's sky and the chart, strongest first. */
function contactsFor(chart, instant) {
  const sky = positionsFor(instant);
  const contacts = [];

  for (const position of sky) {
    for (const placement of chart.placements) {
      const aspect = aspectBetween(position.sign, placement.sign);
      if (!aspect) continue;

      const weight = aspect.weight
        * (TRANSIT_WEIGHT[position.body] ?? 0.5)
        * (NATAL_WEIGHT[placement.body] ?? 0.5);

      contacts.push({
        transit: position.body,
        retrograde: position.retrograde,
        transitSign: position.sign,
        natal: placement.body,
        natalSign: placement.sign,
        house: placement.house,
        aspect: aspect.name,
        verb: aspect.verb,
        tone: aspect.tone,
        weight,
        fast: DAY_BODIES.has(position.body),
      });
    }
  }

  // Sorted so ties break the same way every time: heavier first, then the
  // traditional body order, then the natal body's own order.
  return contacts.sort((a, b) => b.weight - a.weight
    || BODIES.indexOf(a.transit) - BODIES.indexOf(b.transit)
    || String(a.natal).localeCompare(String(b.natal)));
}

/** The separation between two longitudes, folded into 0–180. */
function separation(a, b) {
  const delta = Math.abs(((a - b) % 360 + 360) % 360);
  return delta > 180 ? 360 - delta : delta;
}

/** The Moon's tightest aspect to another moving body: the day's own weather. */
function weatherFor(instant) {
  const byBody = (list) => Object.fromEntries(list.map((entry) => [entry.body, entry]));
  const now = byBody(positionsFor(instant));
  // An hour later, not a day. The Moon covers thirteen degrees between one noon
  // and the next, so a day-long step leaves every aspect wider than it started
  // and reports the whole sky as separating. An hour is half a degree of Moon:
  // enough to see which way an orb is going, short enough that it is still the
  // same aspect being looked at.
  const soon = byBody(positionsFor(new Date(instant.getTime() + 3600000)));

  let best = null;
  for (const body of BODIES) {
    if (body === 'Moon') continue;
    for (const aspect of DEGREE_ASPECTS) {
      const orb = Math.abs(separation(now.Moon.longitude, now[body].longitude) - aspect.angle);
      if (orb > MOON_ORB) continue;

      // Applying or separating, measured rather than assumed: the same orb a
      // day later says which way this is going, and "tightening" and "letting
      // go" are different days.
      const orbSoon = Math.abs(
        separation(soon.Moon.longitude, soon[body].longitude) - aspect.angle,
      );
      const candidate = {
        body,
        aspect: aspect.name,
        tone: aspect.tone,
        orb,
        applying: orbSoon < orb,
      };
      if (!best || candidate.orb < best.orb) best = candidate;
    }
  }

  return best;
}

/** The line the card prints under "Read from". */
function describe(contact) {
  const retrograde = contact.retrograde ? ' retrograde' : '';
  return `Transiting${retrograde} ${contact.transit} in ${contact.transitSign} `
    + `${contact.aspect} natal ${contact.natal} in ${contact.natalSign}`;
}

/** Which parts of a life a contact touches. */
function domainsOf(contact) {
  return [...new Set([
    ...(HOUSE_DOMAINS[contact.house] ?? []),
    ...(BODY_DOMAINS[contact.natal] ?? []),
  ])];
}

/**
 * The reading.
 *
 * Returns null only when the chart and the sky share no aspect at all, which
 * over ten bodies and a dozen placements does not happen — but a card that
 * invents a theme on the day it did would be exactly the thing this module
 * exists not to do.
 */
export function resolveCosmicTheme(chart, dateKey) {
  const instant = instantFor(dateKey);
  const contacts = contactsFor(chart, instant);
  if (!contacts.length) return null;

  // The Moon names the theme, because the Moon is what makes a day a day. Only
  // when it is touching nothing does a slower body get to speak for one.
  const lead = contacts.find((contact) => contact.transit === 'Moon')
    ?? contacts.find((contact) => contact.fast)
    ?? contacts[0];

  const backdrop = contacts.find((contact) => !contact.fast && contact.natal !== lead.natal)
    ?? contacts.find((contact) => !contact.fast)
    ?? null;

  const weather = weatherFor(instant);

  const leadDomains = domainsOf(lead);
  const backdropDomains = backdrop ? domainsOf(backdrop) : [];
  const touched = new Set([...leadDomains, ...backdropDomains]);

  const qualifier = HOUSE_QUALIFIER[lead.house] ?? 'Quiet';
  const noun = THEME_NOUN[lead.transit][lead.tone];

  const field = HOUSE_FIELD[lead.house] ?? 'the day in front of you';
  const clause = TRANSIT_CLAUSE[lead.transit][lead.tone];

  const sentences = [
    `${lead.transit} ${lead.verb} your natal ${lead.natal} in ${lead.natalSign} today — ${clause} ${field}.`,
  ];

  if (weather) {
    const movement = weather.applying ? 'tightening through the day' : 'letting go through the day';
    sentences.push(
      `In the sky today the Moon is ${weather.aspect} ${weather.body} and ${movement}: `
      + `${WEATHER_CLAUSE[weather.body][weather.tone]}.`,
    );
  } else {
    // A Moon touching nothing at all is a real reading in its own right — it is
    // the void-of-course day, and what it asks is the tone of the lead contact.
    sentences.push(ASK[lead.tone]);
  }

  if (backdrop) {
    sentences.push(
      `Underneath it, ${backdrop.transit} is still ${backdrop.aspect} your natal ${backdrop.natal} `
      + `in ${backdrop.natalSign}: ${BACKDROP_CLAUSE[backdrop.transit] ?? 'the longer story this sits inside'}.`,
    );
  } else {
    sentences.push(ASK[lead.tone]);
  }

  const readFrom = [describe(lead)];
  if (weather) {
    readFrom.push(
      `Moon ${weather.aspect} transiting ${weather.body}, ${weather.orb.toFixed(1)}° `
      + `and ${weather.applying ? 'applying' : 'separating'}`,
    );
  }
  if (backdrop) readFrom.push(describe(backdrop));

  return {
    theme: `${qualifier} ${noun}`,
    // Three sentences: the chapter, the day, and what is underneath it. A card
    // has room for a paragraph, and a reading that needs five sentences is two
    // readings.
    interpretation: sentences.slice(0, 3).join(' '),
    badges: DOMAINS.map((label) => ({ label, active: touched.has(label) })),
    transits: readFrom,
  };
}
