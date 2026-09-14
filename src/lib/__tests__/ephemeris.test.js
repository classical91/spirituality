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
