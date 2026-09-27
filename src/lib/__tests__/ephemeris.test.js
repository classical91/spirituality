// The ephemeris, checked against the sky rather than against itself.
//
// A table of expected longitudes copied out of this module's own output would
// pass forever and prove nothing. So these pin it to moments the sky is defined
// by — an equinox is the instant the Sun is at zero Aries, a full moon is the
// instant the Moon is opposite it — and to the one thing a reading actually
// asks of it: which sign, and which way a body is moving.

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  BODIES, SIGNS, julianDay, longitudeOf, moonLongitude,
  positionsFor, signOf, sunLongitude,
} from '../ephemeris.js';

describe('the ephemeris', () => {
  it('matches published high-precision geocentric longitudes closely enough for exact orbs', () => {
    // Swiss Ephemeris positions for 2026-09-27 12:00 UTC. These are an
    // independent benchmark, not values copied from this implementation.
    const instant = new Date('2026-09-27T12:00:00Z');
    const expected = {
      Sun: 184.4033, Moon: 14.5418, Mercury: 205.9211, Venus: 217.8610,
      Mars: 119.6364, Jupiter: 138.9562, Saturn: 11.8514,
      Uranus: 65.5794, Neptune: 2.9588, Pluto: 303.1495,
    };

    for (const [body, longitude] of Object.entries(expected)) {
      const error = Math.abs(longitudeOf(body, instant) - longitude);
      assert.ok(error < 0.01, `${body} missed the benchmark by ${error.toFixed(4)}°`);
    }
  });

  it('stays on Swiss Ephemeris across several dates, including the 0° Aries wrap', () => {
    // More independent benchmarks in the same style as the one above, computed
    // with Swiss Ephemeris (pyswisseph, Moshier mode). The transit forecast
    // reads every one of its positions through positionsFor(), so this is what
    // its orbs ultimately rest on. The 2025 March equinox instant puts the Sun
    // at 359.999° and Neptune at 359.6°, so the wrap is measured, not assumed.
    const benchmarks = {
      '2025-03-20T09:00:00Z': {
        Sun: 359.999, Moon: 246.3446, Mercury: 7.8912, Venus: 4.3249, Mars: 110.2494,
        Jupiter: 74.3183, Saturn: 353.075, Uranus: 54.2622, Neptune: 359.6173, Pluto: 303.3449,
      },
      '2026-01-01T00:00:00Z': {
        Sun: 280.5686, Moon: 66.7158, Mercury: 268.6516, Venus: 279.2065, Mars: 282.6882,
        Jupiter: 111.3577, Saturn: 356.1673, Uranus: 57.9493, Neptune: 359.5068, Pluto: 302.7185,
      },
      '2027-06-15T18:30:00Z': {
        Sun: 84.4455, Moon: 227.2137, Mercury: 95.4616, Venus: 68.8396, Mars: 164.1745,
        Jupiter: 142.5516, Saturn: 25.4125, Uranus: 66.8916, Neptune: 6.4997, Pluto: 306.8604,
      },
    };

    for (const [moment, expected] of Object.entries(benchmarks)) {
      const sky = Object.fromEntries(positionsFor(new Date(moment)).map((p) => [p.body, p.longitude]));
      for (const [body, longitude] of Object.entries(expected)) {
        // Folded so 359.999° against 0.001° reads as a hundredth, not 360.
        const error = Math.abs(((sky[body] - longitude) % 360 + 540) % 360 - 180);
        assert.ok(error < 0.01, `${body} at ${moment} missed by ${error.toFixed(4)}°`);
      }
    }
  });

  it('crosses the equinox points on the days the calendar says', () => {
    // The strongest check available without a second ephemeris to compare
    // against: the equinoxes are *defined* as the Sun reaching 0° Aries and 0°
    // Libra, and everyone's calendar agrees on which day of which month that
    // falls. So find the crossings and see where they land. Asserting a
    // published minute instead would test my memory of the minute.
    const crossing = (target, from, to) => {
      const distance = (date) => {
        const delta = ((sunLongitude(date) - target) % 360 + 540) % 360 - 180;
        return delta;
      };
      let low = from.getTime();
      let high = to.getTime();
      for (let step = 0; step < 60; step += 1) {
        const middle = (low + high) / 2;
        if (distance(new Date(middle)) < 0) low = middle; else high = middle;
      }
      return new Date((low + high) / 2);
    };

    const march = crossing(0, new Date('2026-03-15T00:00:00Z'), new Date('2026-03-25T00:00:00Z'));
    assert.equal(march.getUTCMonth(), 2);
    assert.ok([19, 20, 21].includes(march.getUTCDate()),
      `the March equinox landed on the ${march.getUTCDate()}`);
    assert.ok(Math.abs(((sunLongitude(march) + 180) % 360) - 180) < 0.01);

    const september = crossing(180, new Date('2026-09-18T00:00:00Z'), new Date('2026-09-28T00:00:00Z'));
    assert.equal(september.getUTCMonth(), 8);
    assert.ok([22, 23, 24].includes(september.getUTCDate()),
      `the September equinox landed on the ${september.getUTCDate()}`);
    assert.ok(Math.abs(sunLongitude(september) - 180) < 0.01);
  });

  it('puts the Moon on the Sun at a new moon, and opposite it at a full one', () => {
    const newMoon = new Date('2026-01-18T19:52:00Z');
    const separation = Math.abs(moonLongitude(newMoon) - sunLongitude(newMoon));
    assert.ok(separation < 1, `the new moon was ${separation.toFixed(2)}° from the Sun`);

    const fullMoon = new Date('2026-09-26T16:49:00Z');
    const elongation = ((moonLongitude(fullMoon) - sunLongitude(fullMoon)) % 360 + 360) % 360;
    assert.ok(Math.abs(elongation - 180) < 1,
      `the full moon was ${elongation.toFixed(2)}° from the Sun, not 180°`);
  });

  it('reads every body into a real sign', () => {
    for (const position of positionsFor(new Date('2026-09-14T12:00:00Z'))) {
      assert.ok(SIGNS.includes(position.sign), `${position.body} was in ${position.sign}`);
      assert.ok(position.degree >= 0 && position.degree < 30);
      assert.ok(position.longitude >= 0 && position.longitude < 360);
    }
    assert.equal(positionsFor(new Date('2026-09-14T12:00:00Z')).length, BODIES.length);
  });

  it('never says the Sun or the Moon turned back', () => {
    // They cannot, and a reading that said so would be visibly wrong to anyone
    // who knows what retrograde means.
    for (let month = 0; month < 12; month += 1) {
      const sky = positionsFor(new Date(Date.UTC(2026, month, 15, 12)));
      for (const position of sky) {
        if (position.body === 'Sun' || position.body === 'Moon') {
          assert.equal(position.retrograde, false, `${position.body} in month ${month}`);
        }
      }
    }
  });

  it('finds the outer planets retrograde in the northern autumn, as they are', () => {
    // Every outer planet stations retrograde in the months around its
    // opposition, which for all four falls between June and December.
    const sky = positionsFor(new Date('2026-09-14T12:00:00Z'));
    const retrograde = sky.filter((position) => position.retrograde).map((p) => p.body);
    for (const body of ['Saturn', 'Uranus', 'Neptune', 'Pluto']) {
      assert.ok(retrograde.includes(body), `${body} was not retrograde in September 2026`);
    }
  });

  it('moves the Moon about thirteen degrees a day, and the Sun about one', () => {
    const start = new Date('2026-05-01T12:00:00Z');
    const end = new Date('2026-05-02T12:00:00Z');
    const travelled = (body) => (((longitudeOf(body, end) - longitudeOf(body, start)) % 360) + 360) % 360;

    assert.ok(Math.abs(travelled('Moon') - 13.2) < 1.5, `the Moon moved ${travelled('Moon').toFixed(2)}°`);
    assert.ok(Math.abs(travelled('Sun') - 1) < 0.2, `the Sun moved ${travelled('Sun').toFixed(2)}°`);
  });

  it('splits longitudes into signs at the thirty-degree marks', () => {
    assert.deepEqual(signOf(0), { sign: 'Aries', degree: 0 });
    assert.equal(signOf(29.99).sign, 'Aries');
    assert.equal(signOf(30).sign, 'Taurus');
    assert.equal(signOf(359.9).sign, 'Pisces');
    // And folds, so nothing has to normalise before asking.
    assert.equal(signOf(360).sign, 'Aries');
    assert.equal(signOf(-1).sign, 'Pisces');
  });

  it('counts Julian days from the epoch the series are written against', () => {
    // J2000.0 is 2000-01-01 12:00 UTC, by definition.
    assert.ok(Math.abs(julianDay(new Date('2000-01-01T12:00:00Z')) - 2451545.0) < 1e-6);
  });

  it('has no ephemeris to offer for something that is not a body', () => {
    assert.throws(() => longitudeOf('Vulcan', new Date()), /No ephemeris/);
  });
});
