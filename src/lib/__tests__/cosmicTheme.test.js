// Today's Cosmic Theme.
//
// The chart used here is invented. The real one is a private thing that lives
// in this service's environment and never in this repository, which is public —
// and a fixture that happened to be somebody's chart would put it here forever,
// in the history as well as the file.
//
// What these hold down is the promise the card makes: that every theme can name
// the transit it came from, that the same day reads the same way twice, and
// that two mornings in one week do not print the same paragraph.

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { DOMAINS, instantFor, parseNatalChart, resolveCosmicTheme } from '../cosmicTheme.js';

const FIXTURE = {
  placements: [
    { body: 'Sun', sign: 'Taurus', house: 10 },
    { body: 'Moon', sign: 'Pisces', house: 8 },
    { body: 'Mercury', sign: 'Gemini', house: 11 },
    { body: 'Venus', sign: 'Aries', house: 9 },
    { body: 'Mars', sign: 'Leo', house: 1 },
    { body: 'Jupiter', sign: 'Sagittarius', house: 5 },
    { body: 'Saturn', sign: 'Libra', house: 3 },
    { body: 'Ascendant', sign: 'Leo', house: 1 },
    { body: 'Midheaven', sign: 'Taurus', house: 10 },
  ],
};

const chartOf = (raw) => {
  const { chart, error } = parseNatalChart(raw);
  assert.equal(error, null);
  return chart;
};

const days = (count, from = Date.UTC(2026, 8, 14)) => Array.from({ length: count }, (_, index) =>
  new Date(from + index * 86400000).toISOString().slice(0, 10));

describe('reading a natal chart', () => {
  it('takes a chart as an object or as the JSON a variable holds it in', () => {
    assert.deepEqual(chartOf(FIXTURE), chartOf(JSON.stringify(FIXTURE)));
  });

  it('says what is wrong rather than guessing', () => {
    assert.match(parseNatalChart('').error, /No chart/);
    assert.match(parseNatalChart('   ').error, /No chart/);
    assert.match(parseNatalChart('{not json').error, /valid JSON/);
    assert.match(parseNatalChart('[]').error, /no placements/);
    assert.match(parseNatalChart(null).error, /No chart/);
    assert.match(parseNatalChart(undefined).error, /No chart/);
    assert.match(parseNatalChart(42).error, /not an object/);
    assert.match(parseNatalChart({ placements: [] }).error, /no placements/);
  });

  it('drops a placement it cannot read rather than failing the whole chart', () => {
    const { chart } = parseNatalChart({
      placements: [
        { body: 'Sun', sign: 'Taurus', house: 10 },
        { body: 'Moon', sign: 'Nowhere', house: 8 },  // not a sign
        { body: 'Mars', sign: 'Leo', house: 13 },     // not a house
        { body: '', sign: 'Leo', house: 1 },          // not a body
      ],
    });
    assert.deepEqual(chart.placements, [{ body: 'Sun', sign: 'Taurus', house: 10 }]);
  });
});

describe("today's cosmic theme", () => {
  it('reads the same day the same way, however often it is asked', () => {
    const chart = chartOf(FIXTURE);
    assert.deepEqual(resolveCosmicTheme(chart, '2026-09-14'), resolveCosmicTheme(chart, '2026-09-14'));
    assert.deepEqual(resolveCosmicTheme(chart, '2026-09-14'), resolveCosmicTheme(chartOf(FIXTURE), '2026-09-14'));
  });

  it('takes one instant per calendar day, so a day has one sky', () => {
    assert.equal(instantFor('2026-09-14').toISOString(), '2026-09-14T12:00:00.000Z');
  });

  it('always names what it was read from', () => {
    // The line that separates this from a horoscope. A theme with nothing under
    // "Read from" is a theme the card should not have been given.
    for (const date of days(40)) {
      const reading = resolveCosmicTheme(chartOf(FIXTURE), date);
      assert.ok(reading.transits.length >= 1, `${date} named no transit`);
      for (const line of reading.transits) {
        assert.ok(/natal|transiting/i.test(line), `${date}: "${line}" names no body`);
      }
    }
  });

  it('gives a theme of a couple of words and a paragraph of a few sentences', () => {
    for (const date of days(40)) {
      const { theme, interpretation } = resolveCosmicTheme(chartOf(FIXTURE), date);
      assert.ok(theme.split(' ').length === 2, `"${theme}" is not two words`);
      assert.match(theme, /^[A-Z]/);

      const sentences = interpretation.split('. ').length;
      assert.ok(sentences >= 2 && sentences <= 3, `${date} read as ${sentences} sentences`);
      assert.ok(interpretation.length < 420, `${date} ran to ${interpretation.length} characters`);
      // Nothing half-composed: a table with a hole in it shows up as these.
      assert.doesNotMatch(interpretation, /undefined|null|NaN|\[object/);
    }
  });

  it('does not print the same paragraph two mornings running', () => {
    // The Moon holds a sign for two and a half days, so the theme is allowed to
    // repeat. The reading is not: its middle sentence comes from the Moon's
    // aspects by degree, which tighten and let go within a day.
    const readings = days(14).map((date) => resolveCosmicTheme(chartOf(FIXTURE), date));
    for (let index = 1; index < readings.length; index += 1) {
      assert.notEqual(readings[index].interpretation, readings[index - 1].interpretation,
        `day ${index} read exactly like the day before`);
    }
  });

  it('moves the theme on as the sky does', () => {
    const themes = new Set(days(90).map((date) => resolveCosmicTheme(chartOf(FIXTURE), date).theme));
    assert.ok(themes.size >= 8, `only ${themes.size} themes in three months`);
  });

  it('carries all four badges, and lights only the ones in play', () => {
    for (const date of days(30)) {
      const { badges } = resolveCosmicTheme(chartOf(FIXTURE), date);
      assert.deepEqual(badges.map((badge) => badge.label), DOMAINS);
      const lit = badges.filter((badge) => badge.active);
      assert.ok(lit.length >= 1, `${date} lit no badge at all`);
      assert.ok(lit.length < DOMAINS.length, `${date} lit every badge, which says nothing`);
    }
  });

  it('reads a chart of one placement without inventing the rest', () => {
    const chart = chartOf({ placements: [{ body: 'Sun', sign: 'Taurus', house: 10 }] });
    const reading = resolveCosmicTheme(chart, '2026-09-14');
    // Either it found a contact with that one placement or it says it found
    // none. What it must never do is report a contact with something the chart
    // does not contain.
    if (reading) {
      for (const line of reading.transits) {
        assert.doesNotMatch(line, /natal (?!Sun)/, `"${line}" is about a placement this chart has not got`);
      }
    }
  });
});
