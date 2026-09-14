// Where the planets are, for a given moment.
//
// The Cosmic Theme is a reading of today's sky against a natal chart, so
// something has to say where today's sky actually is. This does, and it does it
// here rather than by asking an ephemeris service: a theme for the day must not
// stop being available because a third party is down, and the positions a whole-
// sign reading needs — which sign a planet is in, and whether it is retrograde —
// are well within what closed-form formulae give.
//
// Accuracy, and why this much is enough. The Sun is Meeus' low-precision series
// (better than a hundredth of a degree); the Moon is the standard truncated
// lunar series (a few tenths); the planets come from JPL's "Approximate
// Positions of the Major Planets" Keplerian elements, which the JPL notes give
// under an arcminute for the inner planets and a few arcminutes for the outer
// ones between 1800 and 2050. A reading that asks "which sign, and is it
// retrograde" needs degrees, not arcseconds — the one case where a tenth of a
// degree could change an answer is a planet within a tenth of a degree of a
// sign boundary, and that planet changes the answer for a few hours at most.
//
// Nothing here is a chart. It is longitudes; cosmicTheme.js is what reads them.

const DEG = Math.PI / 180;
const TWO_PI = Math.PI * 2;

/** Degrees, folded into [0, 360). */
const norm360 = (degrees) => ((degrees % 360) + 360) % 360;
const sinDeg = (degrees) => Math.sin(degrees * DEG);
const cosDeg = (degrees) => Math.cos(degrees * DEG);

export const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

/**
 * Julian Day for an instant.
 *
 * The date arrives as a UTC instant, so this is the plain astronomical
 * conversion: no timezone enters here. Which calendar day a reading is *for* is
 * the caller's question, and cosmicTheme.js answers it by picking the instant.
 */
export function julianDay(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

/** Days since J2000.0, which every series below is written in terms of. */
const daysSinceJ2000 = (date) => julianDay(date) - 2451545.0;

/**
 * The Sun's apparent geocentric longitude (Meeus, low precision).
 *
 * This is the Sun as seen from Earth, which is the Earth's heliocentric
 * longitude turned around — so it is also what the planet loop below needs to
 * know about where it is looking from.
 */
export function sunLongitude(date) {
  const n = daysSinceJ2000(date);
  const meanLongitude = 280.460 + 0.9856474 * n;
  const meanAnomaly = 357.528 + 0.9856003 * n;
  return norm360(
    meanLongitude + 1.915 * sinDeg(meanAnomaly) + 0.020 * sinDeg(2 * meanAnomaly),
  );
}

/**
 * The Moon's geocentric longitude, from the truncated lunar series.
 *
 * More terms than the Sun needs because the Moon is the one body whose sign
 * changes inside a single day — it covers about thirteen degrees between one
 * morning and the next, so the term that is worth a degree is worth keeping.
 */
export function moonLongitude(date) {
  const n = daysSinceJ2000(date);
  const L = 218.3164477 + 13.17639648 * n;   // mean longitude
  const D = 297.8501921 + 12.19074912 * n;   // mean elongation from the Sun
  const M = 357.5291092 + 0.98560028 * n;    // the Sun's mean anomaly
  const F = 93.2720950 + 13.22935024 * n;    // argument of latitude
  const Mp = 134.9633964 + 13.06499295 * n;  // the Moon's own mean anomaly

  return norm360(
    L
    + 6.289 * sinDeg(Mp)
    - 1.274 * sinDeg(Mp - 2 * D)
    + 0.658 * sinDeg(2 * D)
    - 0.214 * sinDeg(2 * Mp)
    - 0.186 * sinDeg(M)
    - 0.114 * sinDeg(2 * F)
    - 0.059 * sinDeg(2 * Mp - 2 * D)
    - 0.057 * sinDeg(Mp - 2 * D + M)
    + 0.053 * sinDeg(Mp + 2 * D)
    + 0.046 * sinDeg(2 * D - M)
    + 0.041 * sinDeg(Mp - M)
    - 0.035 * sinDeg(D)
    - 0.031 * sinDeg(Mp + M),
  );
}

/**
 * JPL's Keplerian elements and their per-century rates, for 1800–2050.
 *
 * Order: semi-major axis (au), eccentricity, inclination, mean longitude,
 * longitude of perihelion, longitude of the ascending node — each as a value at
 * J2000 followed by its change per Julian century. Earth is in the table
 * because a geocentric longitude is a planet's position minus Earth's.
 */
const ELEMENTS = {
  Earth:   [1.00000261,  0.01671123, -0.00001531, 100.46457166, 102.93768193,   0.0,
            0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364,    0.0],
  Mercury: [0.38709927,  0.20563593,  7.00497902, 252.25032350,  77.45779628,  48.33076593,
            0.00000037,  0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  Venus:   [0.72333566,  0.00677672,  3.39467605, 181.97909950, 131.60246718,  76.67984255,
            0.00000390, -0.00004107, -0.00078890, 58517.81538729,  0.00268329, -0.27769418],
  Mars:    [1.52371034,  0.09339410,  1.84969142,  -4.55343205, -23.94362959,  49.55953891,
            0.00001847,  0.00007882, -0.00813131, 19140.30268499,  0.44441088, -0.29257343],
  Jupiter: [5.20288700,  0.04838624,  1.30439695,  34.39644051,  14.72847983, 100.47390909,
           -0.00011607, -0.00013253, -0.00183714,  3034.74612775,  0.21252668,  0.20469106],
  Saturn:  [9.53667594,  0.05386179,  2.48599187,  49.95424423,  92.59887831, 113.66242448,
           -0.00125060, -0.00050991,  0.00193609,  1222.49362201, -0.41897216, -0.28867794],
  Uranus:  [19.18916464, 0.04725744,  0.77263783, 313.23810451, 170.95427630,  74.01692503,
           -0.00196176, -0.00004397, -0.00242939,   428.48202785,  0.40805281,  0.04240589],
  Neptune: [30.06992276, 0.00859048,  1.77004347, -55.12002969,  44.96476227, 131.78422574,
            0.00026291,  0.00005105,  0.00035372,   218.45945325, -0.32241464, -0.00508664],
  Pluto:   [39.48211675, 0.24882730, 17.14001206, 238.92903833, 224.06891629, 110.30393684,
           -0.00031596,  0.00005170,  0.00004818,   145.20780515, -0.04062942, -0.01183482],
};

/** Kepler's equation, solved the way it is always solved: iterate until it stops moving. */
function eccentricAnomaly(meanAnomalyRad, eccentricity) {
  let E = meanAnomalyRad + eccentricity * Math.sin(meanAnomalyRad);
  for (let step = 0; step < 12; step += 1) {
    const delta = (E - eccentricity * Math.sin(E) - meanAnomalyRad)
      / (1 - eccentricity * Math.cos(E));
    E -= delta;
    if (Math.abs(delta) < 1e-12) break;
  }
  return E;
}

/** A planet's heliocentric position in J2000 ecliptic coordinates, in au. */
function heliocentric(name, centuries) {
  const e = ELEMENTS[name];
  const a = e[0] + e[6] * centuries;
  const ecc = e[1] + e[7] * centuries;
  const inclination = e[2] + e[8] * centuries;
  const meanLongitude = e[3] + e[9] * centuries;
  const perihelion = e[4] + e[10] * centuries;
  const ascendingNode = e[5] + e[11] * centuries;

  const argOfPerihelion = perihelion - ascendingNode;
  const meanAnomaly = norm360(meanLongitude - perihelion + 180) - 180;
  const E = eccentricAnomaly(meanAnomaly * DEG, ecc);

  // In the orbital plane, with the perihelion on the x axis.
  const xOrbit = a * (Math.cos(E) - ecc);
  const yOrbit = a * Math.sqrt(1 - ecc * ecc) * Math.sin(E);

  const cosW = cosDeg(argOfPerihelion);
  const sinW = sinDeg(argOfPerihelion);
  const cosO = cosDeg(ascendingNode);
  const sinO = sinDeg(ascendingNode);
  const cosI = cosDeg(inclination);
  const sinI = sinDeg(inclination);

  return {
    x: (cosW * cosO - sinW * sinO * cosI) * xOrbit + (-sinW * cosO - cosW * sinO * cosI) * yOrbit,
    y: (cosW * sinO + sinW * cosO * cosI) * xOrbit + (-sinW * sinO + cosW * cosO * cosI) * yOrbit,
    z: (sinW * sinI) * xOrbit + (cosW * sinI) * yOrbit,
  };
}

/** A planet's geocentric ecliptic longitude — where it appears from here. */
function planetLongitude(name, date) {
  const centuries = daysSinceJ2000(date) / 36525;
  const planet = heliocentric(name, centuries);
  const earth = heliocentric('Earth', centuries);
  const longitude = Math.atan2(planet.y - earth.y, planet.x - earth.x) / DEG;
  return norm360(longitude);
}

/**
 * The bodies a reading uses, in the order they are traditionally listed.
 *
 * The lunar nodes are not here. They are a point rather than a body and they
 * move almost imperceptibly — a node transit is a season, not a day — so a card
 * about *today* would print the same node contact every morning for a year.
 */
export const BODIES = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];

/** One body's geocentric longitude in degrees. */
export function longitudeOf(body, date) {
  if (body === 'Sun') return sunLongitude(date);
  if (body === 'Moon') return moonLongitude(date);
  if (!ELEMENTS[body] || body === 'Earth') throw new Error(`No ephemeris for ${body}.`);
  return planetLongitude(body, date);
}

/** Which sign a longitude falls in, and how far into it. */
export function signOf(longitude) {
  const folded = norm360(longitude);
  return {
    sign: SIGNS[Math.floor(folded / 30)],
    degree: folded % 30,
  };
}

/**
 * Every body's position for an instant.
 *
 * Retrograde is measured rather than looked up: a body is retrograde when its
 * longitude is smaller a day later than it is now. That is what retrograde
 * means — apparent backward motion — so it needs no table, and it is right on
 * the days either side of a station, which a table of dates would not be.
 */
export function positionsFor(date) {
  const nextDay = new Date(date.getTime() + 86400000);

  return BODIES.map((body) => {
    const longitude = longitudeOf(body, date);
    const tomorrow = longitudeOf(body, nextDay);
    // Folded into ±180 so the wrap from 359° to 1° reads as forward motion.
    const motion = norm360(tomorrow - longitude + 180) - 180;

    return {
      body,
      longitude,
      ...signOf(longitude),
      retrograde: motion < 0,
      // The Sun and Moon never turn back, so nothing should ever say they do.
      ...(body === 'Sun' || body === 'Moon' ? { retrograde: false } : {}),
    };
  });
}

export { norm360, TWO_PI };
