// The transit forecast.
//
// Like the Cosmic Theme tests, the charts here are invented — and most are
// built from the sky itself: a natal point placed a known number of degrees
// from where a body actually is, so "exact", "just inside" and "just outside"
// are facts of the fixture rather than of anyone's memory of an ephemeris.

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { MAJOR_ASPECTS, separation } from '../aspects.js';
import { instantFor, parseNatalChart, resolveCosmicTheme } from '../cosmicTheme.js';
import { longitudeOf, positionsFor } from '../ephemeris.js';
import {
  ASPECT_WEIGHT, FORECAST_FUTURE_DAYS, INCLUDE_START_DATE, NATAL_POINT_WEIGHT,
  TRANSIT_ORBS, TRANSIT_PLANET_WEIGHT, WORTH_BASE_SCALE,
  addDays, allowedOrb, calculateTransitWorth, conjunctionPolarity, orbStrength,
  resolveTransitForecast, summarize, transitsAt, zonedInstant,
} from '../transitForecast.js';

const INSTANT = new Date('2026-09-27T12:00:00Z');
const SKY = Object.fromEntries(positionsFor(INSTANT).map((p) => [p.body, p]));
const fold = (degrees) => ((degrees % 360) + 360) % 360;

/** A one-placement chart, `offset` degrees from where `body` is at INSTANT. */
const chartNear = (body, offset, natal = 'Sun') => ({
  placements: [{ body: natal, sign: 'Aries', house: 1, longitude: fold(SKY[body].longitude + offset) }],
  precision: 'exact-degree',
});

const find = (records, transit, natal, aspect) =>
  records.find((r) => r.transit === transit && r.natal === natal && r.aspect === aspect);

const FIXTURE = {
  placements: [
    { body: 'Sun', sign: 'Capricorn', degree: 6.1, house: 4 },
    { body: 'Moon', sign: 'Libra', degree: 11.2, house: 1 },
    { body: 'Mercury', sign: 'Sagittarius', degree: 22.5, house: 3 },
    { body: 'Venus', sign: 'Aquarius', degree: 1.4, house: 5 },
    { body: 'Mars', sign: 'Leo', degree: 17.9, house: 11 },
    { body: 'Jupiter', sign: 'Gemini', degree: 9, house: 10 },
    { body: 'Saturn', sign: 'Aries', degree: 29.3, house: 7 },
    { body: 'Ascendant', sign: 'Virgo', degree: 3.3, house: 1 },
    { body: 'Midheaven', sign: 'Gemini', degree: 1.3, house: 10 },
  ],
};
const chart = parseNatalChart(FIXTURE).chart;

describe('exact aspects', () => {
  for (const [aspect, { angle }] of Object.entries(MAJOR_ASPECTS)) {
    it(`finds an exact ${aspect}`, () => {
      // Mars: a single body whose natal twin will not collide with other rules.
      const records = transitsAt(chartNear('Mars', angle), INSTANT);
      const record = find(records, 'Mars', 'Sun', aspect);
      assert.ok(record, `no ${aspect} found`);
      assert.ok(record.orb < 0.001, `orb was ${record.orb}`);
      assert.equal(record.transitLongitude, Math.round(SKY.Mars.longitude * 1000) / 1000);
    });
  }

  it('gives a record every field the forecast promises', () => {
    const [record] = transitsAt(chartNear('Mercury', 60), INSTANT)
      .filter((r) => r.transit === 'Mercury');
    for (const key of ['transit', 'natal', 'aspect', 'transitLongitude', 'natalLongitude',
      'orb', 'applying', 'retrograde', 'tone', 'worth']) {
      assert.ok(key in record, `missing ${key}`);
    }
    assert.equal(record.tone, 'positive');
    assert.ok(Number.isInteger(record.worth) && record.worth > 0);
  });

  it('measures across 0° Aries: 359.999° to 1° is a one-degree conjunction', () => {
    // The 2025 March equinox: the Sun is at 359.999° (see the ephemeris benchmark).
    const equinox = new Date('2025-03-20T09:00:00Z');
    const natalAt = (longitude) => ({
      placements: [{ body: 'Venus', sign: 'Aries', house: 1, longitude }], precision: 'exact-degree',
    });

    const after = find(transitsAt(natalAt(1), equinox), 'Sun', 'Venus', 'conjunction');
    assert.ok(after && Math.abs(after.orb - 1.001) < 0.01, `orb ${after?.orb}`);
    assert.equal(after.applying, true, 'the Sun moving toward 1° Aries is applying');

    const before = find(transitsAt(natalAt(359), equinox), 'Sun', 'Venus', 'conjunction');
    assert.ok(before && Math.abs(before.orb - 0.999) < 0.01);
    assert.equal(before.applying, false, 'the Sun past 359° Pisces is separating');

    // And an opposition measured across the wrap from the other side.
    const opposite = find(transitsAt(natalAt(180.5), equinox), 'Sun', 'Venus', 'opposition');
    assert.ok(opposite && Math.abs(opposite.orb - 0.501) < 0.01);
    assert.equal(opposite.applying, true);
  });
});

describe('orbs', () => {
  it('keeps an aspect just inside the orb and drops one just outside it', () => {
    const edge = allowedOrb('trine', 'Mars', 'Sun');
    assert.equal(edge, TRANSIT_ORBS.trine);

    const inside = find(transitsAt(chartNear('Mars', 120 + edge - 0.01), INSTANT), 'Mars', 'Sun', 'trine');
    assert.ok(inside, 'just inside the orb was dropped');
    assert.ok(inside.orb <= edge);

    const outside = find(transitsAt(chartNear('Mars', 120 + edge + 0.01), INSTANT), 'Mars', 'Sun', 'trine');
    assert.equal(outside, undefined, 'just outside the orb appeared');
  });

  it('never lists a transit outside its configured orb, over the whole window', () => {
    const forecast = resolveTransitForecast(chart, { startDate: '2026-09-27', timeZone: 'America/Vancouver' });
    for (const snapshot of forecast.snapshots) {
      const instant = new Date(snapshot.instant);
      for (const record of snapshot.transits) {
        const allowed = allowedOrb(record.aspect, record.transit, record.natal);
        assert.ok(record.orb <= allowed, `${record.transit} ${record.aspect} ${record.natal} at ${record.orb}`);
        // Recomputed independently from the ephemeris, not from the record.
        const natal = chart.placements.find((p) => p.body === record.natal).longitude;
        const orb = Math.abs(separation(longitudeOf(record.transit, instant), natal)
          - MAJOR_ASPECTS[record.aspect].angle);
        assert.ok(Math.abs(orb - record.orb) < 0.001);
      }
    }
  });

  it('lists every qualifying pair, not just the strongest', () => {
    const instant = new Date(forecastInstant());
    const records = transitsAt(chart, instant);
    let expected = 0;
    for (const position of positionsFor(instant)) {
      for (const placement of chart.placements) {
        for (const [aspect, { angle }] of Object.entries(MAJOR_ASPECTS)) {
          const orb = Math.abs(separation(position.longitude, placement.longitude) - angle);
          if (orb <= allowedOrb(aspect, position.body, placement.body)) expected += 1;
        }
      }
    }
    assert.equal(records.length, expected);
    assert.ok(records.length > 1);
  });
});

function forecastInstant() {
  return zonedInstant('2026-09-27', 12, 0, 'America/Vancouver').getTime();
}

describe('applying, separating and retrograde', () => {
  it('reads a direct body closing on the point as applying', () => {
    // The Sun moves forward about a degree a day; a point a degree ahead of it
    // is being approached.
    const record = find(transitsAt(chartNear('Sun', 1), INSTANT), 'Sun', 'Sun', 'conjunction');
    assert.equal(record.retrograde, false);
    assert.equal(record.applying, true);
  });

  it('reads a direct body moving away from the point as separating', () => {
    const record = find(transitsAt(chartNear('Sun', -1), INSTANT), 'Sun', 'Sun', 'conjunction');
    assert.equal(record.applying, false);
  });

  it('reads a retrograde body by the way it actually moves', () => {
    // Saturn is retrograde in late September 2026, so a point *behind* it is
    // the one it is approaching — the reverse of the direct case above.
    assert.equal(SKY.Saturn.retrograde, true);
    const behind = find(transitsAt(chartNear('Saturn', -1), INSTANT), 'Saturn', 'Sun', 'conjunction');
    assert.equal(behind.retrograde, true);
    assert.equal(behind.applying, true);

    const ahead = find(transitsAt(chartNear('Saturn', 1), INSTANT), 'Saturn', 'Sun', 'conjunction');
    assert.equal(ahead.applying, false);
  });

  it('reads an opposition the same way from either side', () => {
    const closing = find(transitsAt(chartNear('Sun', 181), INSTANT), 'Sun', 'Sun', 'opposition');
    const opening = find(transitsAt(chartNear('Sun', 179), INSTANT), 'Sun', 'Sun', 'opposition');
    assert.equal(closing.applying, true);
    assert.equal(opening.applying, false);
  });
});

describe('Worth', () => {
  it('is the product of the named weights at an exact aspect', () => {
    const worth = calculateTransitWorth({ transit: 'Saturn', natal: 'Moon', aspect: 'square', orb: 0 });
    const expected = -Math.round(WORTH_BASE_SCALE * TRANSIT_PLANET_WEIGHT.Saturn
      * NATAL_POINT_WEIGHT.Moon * ASPECT_WEIGHT.square);
    assert.equal(worth, expected);
  });

  it('falls continuously from exact to nothing at the orb edge', () => {
    const at = (orb) => calculateTransitWorth({ transit: 'Jupiter', natal: 'Sun', aspect: 'trine', orb });
    const edge = allowedOrb('trine', 'Jupiter', 'Sun');
    assert.ok(at(0) > at(0.5) && at(0.5) > at(1.5) && at(1.5) > at(edge - 0.1));
    assert.equal(at(edge), 0);
    assert.equal(orbStrength(0, edge), 1);
    assert.equal(orbStrength(edge + 1, edge), 0);
  });

  it('signs trines and sextiles positive, squares and oppositions negative', () => {
    const sign = (aspect) => Math.sign(calculateTransitWorth({ transit: 'Mars', natal: 'Sun', aspect, orb: 0 }));
    assert.equal(sign('trine'), 1);
    assert.equal(sign('sextile'), 1);
    assert.equal(sign('square'), -1);
    assert.equal(sign('opposition'), -1);
  });

  it('decides a conjunction by the bodies in it, and calls an unruled one neutral', () => {
    const conj = (transit, natal) =>
      find(transitsAt(chartNear(transit, 0, natal), INSTANT), transit, natal, 'conjunction');
    assert.equal(conj('Jupiter', 'Sun').tone, 'positive');
    assert.ok(conj('Jupiter', 'Sun').worth > 0);
    assert.equal(conj('Saturn', 'Sun').tone, 'negative');
    assert.ok(conj('Saturn', 'Sun').worth < 0);
    // An outer planet leans by tradition, at fractional strength.
    assert.equal(conj('Uranus', 'Sun').tone, 'negative');
    const full = Math.abs(calculateTransitWorth({ transit: 'Saturn', natal: 'Sun', aspect: 'conjunction', orb: 0 }));
    const uranus = Math.abs(calculateTransitWorth({ transit: 'Uranus', natal: 'Sun', aspect: 'conjunction', orb: 0 }));
    assert.ok(uranus < full);
    // A body no rule covers is still neutral rather than guessed at.
    assert.equal(conjunctionPolarity('Vulcan', 'Sun'), 0);
    assert.equal(calculateTransitWorth({ transit: 'Vulcan', natal: 'Sun', aspect: 'conjunction', orb: 0, allowed: 3 }), 0);
  });

  it('never scores the Cosmic Theme’s lead transit as neutral', () => {
    const conj = { conjunct: 'conjunction', opposite: 'opposition' };
    for (let i = 0; i < 60; i += 1) {
      const date = addDays('2026-10-03', i);
      const theme = resolveCosmicTheme(chart, date);
      const m = /Transiting(?: retrograde)? (\w+) in \w+ (\w+) natal (.+?) in /.exec(theme.transits[0]);
      const worth = calculateTransitWorth({ transit: m[1], natal: m[3], aspect: conj[m[2]] ?? m[2], orb: 0 });
      assert.notEqual(worth, 0, `${date}: ${theme.transits[0]}`);
    }
  });

  it('weighs a slow planet above the Moon for the same contact', () => {
    const worth = (transit) => calculateTransitWorth({ transit, natal: 'Sun', aspect: 'square', orb: 0 });
    assert.ok(Math.abs(worth('Pluto')) > Math.abs(worth('Moon')));
  });
});

describe('the fourteen-day window', () => {
  const forecast = resolveTransitForecast(chart, { startDate: '2026-09-27', timeZone: 'America/Vancouver' });

  it('is today plus fourteen future days: fifteen snapshots', () => {
    assert.equal(FORECAST_FUTURE_DAYS, 14);
    assert.equal(INCLUDE_START_DATE, true);
    assert.equal(forecast.futureDays, 14);
    assert.equal(forecast.snapshots.length, 15);
    assert.equal(forecast.snapshots[0].date, '2026-09-27');
    assert.equal(forecast.snapshots[14].date, '2026-10-11');
    forecast.snapshots.forEach((snapshot, index) => {
      assert.equal(snapshot.date, addDays('2026-09-27', index));
    });
    assert.equal(resolveTransitForecast(chart, { startDate: '2026-09-27', days: 0 }).snapshots.length, 1);
  });

  it('adds up positive, negative and net from the day’s own transits', () => {
    for (const snapshot of forecast.snapshots) {
      const positive = snapshot.transits.filter((t) => t.worth > 0).reduce((sum, t) => sum + t.worth, 0);
      const negative = snapshot.transits.filter((t) => t.worth < 0).reduce((sum, t) => sum + t.worth, 0);
      assert.equal(snapshot.positive, positive);
      assert.equal(snapshot.negative, negative);
      assert.ok(snapshot.negative <= 0, 'negative is a signed sum, not an absolute value');
      assert.equal(snapshot.total, positive + negative);
      assert.equal(snapshot.transitCount, snapshot.transits.length);
    }
    assert.ok(forecast.snapshots.some((s) => s.positive > 0));
    assert.ok(forecast.snapshots.some((s) => s.negative < 0));
  });

  it('names the strongest contact each way', () => {
    const summary = summarize([
      { worth: 120 }, { worth: -40 }, { worth: 300 }, { worth: -250 }, { worth: 0 },
    ]);
    assert.deepEqual(
      { ...summary, strongestPositive: summary.strongestPositive.worth, strongestNegative: summary.strongestNegative.worth },
      { positive: 420, negative: -290, total: 130, transitCount: 5, strongestPositive: 300, strongestNegative: -250 },
    );
  });

  it('sorts each day strongest first by absolute Worth', () => {
    for (const snapshot of forecast.snapshots) {
      for (let i = 1; i < snapshot.transits.length; i += 1) {
        assert.ok(Math.abs(snapshot.transits[i - 1].worth) >= Math.abs(snapshot.transits[i].worth));
      }
    }
  });

  it('is deterministic', () => {
    const again = resolveTransitForecast(chart, { startDate: '2026-09-27', timeZone: 'America/Vancouver' });
    assert.deepEqual(again, forecast);
  });

  it('never changes the chart it reads', () => {
    const before = JSON.stringify(chart);
    const frozen = structuredClone(chart);
    Object.freeze(frozen);
    frozen.placements.forEach(Object.freeze);
    Object.freeze(frozen.placements);
    resolveTransitForecast(frozen, { startDate: '2026-09-27' });
    assert.equal(JSON.stringify(chart), before);
    assert.equal(JSON.stringify(frozen), before);
  });

  it('uses no placement without an exact degree', () => {
    const wholeSign = parseNatalChart({ placements: [{ body: 'Sun', sign: 'Taurus', house: 10 }] }).chart;
    const result = resolveTransitForecast(wholeSign, { startDate: '2026-09-27', days: 2 });
    assert.equal(result.natalPointsUsed, 0);
    assert.ok(result.snapshots.every((s) => s.transits.length === 0 && s.total === 0));
  });

  it('refuses options it cannot honour', () => {
    assert.throws(() => resolveTransitForecast(chart, { startDate: '2026-02-31' }), RangeError);
    assert.throws(() => resolveTransitForecast(chart, { startDate: '2026-09-27', days: -1 }), RangeError);
    assert.throws(() => resolveTransitForecast(chart, { startDate: '2026-09-27', hour: 24 }), RangeError);
    assert.throws(() => resolveTransitForecast(chart, { startDate: '2026-09-27', timeZone: 'Nowhere/Else' }), RangeError);
  });
});

describe('the moment each day is read', () => {
  it('turns a wall-clock time in a zone into the right UTC instant', () => {
    assert.equal(zonedInstant('2026-09-27', 14, 0, 'America/Vancouver').toISOString(), '2026-09-27T21:00:00.000Z');
    // Winter time from a zone whose rules are settled in every tz release.
    // (Not Vancouver: newer tzdata keeps British Columbia on UTC−7 all year
    // from November 2026, older releases fall back — the code follows
    // whichever the runtime ships, so a test must not pin either.)
    assert.equal(zonedInstant('2026-12-01', 14, 0, 'America/New_York').toISOString(), '2026-12-01T19:00:00.000Z');
    assert.equal(zonedInstant('2026-09-27', 12, 0, 'UTC').toISOString(), '2026-09-27T12:00:00.000Z');
    assert.equal(zonedInstant('2026-09-27', 9, 30, 'Asia/Kolkata').toISOString(), '2026-09-27T04:00:00.000Z');
  });

  it('keeps local noon across a daylight-saving change', () => {
    // New York leaves EDT for EST on 2026-11-01.
    const result = resolveTransitForecast(chart, {
      startDate: '2026-10-31', days: 1, timeZone: 'America/New_York',
    });
    assert.deepEqual(result.snapshots.map((s) => s.instant),
      ['2026-10-31T16:00:00.000Z', '2026-11-01T17:00:00.000Z']);
  });

  it('reads the Moon where it is at the requested hour, not at noon UTC', () => {
    const noonUtc = find(transitsAt(chart, new Date('2026-09-27T12:00:00Z')), 'Moon', 'Mars', 'trine');
    const afternoon = resolveTransitForecast(chart, {
      startDate: '2026-09-27', days: 0, hour: 14, timeZone: 'America/Vancouver',
    }).snapshots[0];
    const moon = afternoon.transits.find((t) => t.transit === 'Moon');
    assert.ok(moon, 'no lunar transit at the requested hour');
    const expected = longitudeOf('Moon', new Date('2026-09-27T21:00:00Z'));
    assert.ok(Math.abs(moon.transitLongitude - expected) < 0.001);
    assert.notEqual(noonUtc?.transitLongitude, moon.transitLongitude);
  });
});

describe('reading the same sky as the Cosmic Theme', () => {
  it('reads the theme at noon UTC by default, exactly as before', () => {
    const date = '2026-10-03';
    assert.deepEqual(
      resolveCosmicTheme(chart, date),
      resolveCosmicTheme(chart, date, { instant: instantFor(date) }),
    );
  });

  it('lets the theme and the forecast read one instant, so they agree on every orb', () => {
    for (let i = 0; i < 30; i += 1) {
      const date = addDays('2026-10-03', i);
      const instant = zonedInstant(date, 12, 0, 'America/Vancouver');
      const theme = resolveCosmicTheme(chart, date, { instant });
      const day = resolveTransitForecast(chart, { startDate: date, days: 0, timeZone: 'America/Vancouver' }).snapshots[0];
      assert.equal(day.instant, instant.toISOString());
      for (const line of theme.transits.filter((l) => l.startsWith('Transiting'))) {
        const m = /Transiting(?: retrograde)? (\w+) in \w+ (\w+) natal (.+?) in \w+, ([\d.]+)° orb and (\w+)/.exec(line);
        const aspect = { conjunct: 'conjunction', opposite: 'opposition' }[m[2]] ?? m[2];
        const record = find(day.transits, m[1], m[3], aspect);
        assert.ok(record, `${date}: ${line} is missing from the forecast`);
        // The theme prints one decimal; the forecast keeps three.
        assert.ok(Math.abs(record.orb - Number(m[4])) <= 0.051, `${line} vs ${record.orb}`);
        assert.equal(record.applying, m[5] === 'applying', line);
      }
    }
  });
});
