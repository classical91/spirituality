// The major aspects, in one place.
//
// Both readings of the sky use these — the Cosmic Theme, which picks the one
// contact that names the day, and the transit forecast, which lists every
// contact and scores it. They used to be able to drift: a second copy of the
// angle table is a second opinion about what a square is. So the geometry lives
// here, and each reader layers its own words and weights on top of it.

/**
 * The five Ptolemaic aspects, by their standard names.
 *
 * `polarity` is the aspect's own lean before either body is considered:
 * trines and sextiles flow, squares and oppositions resist. A conjunction has
 * none of its own — whether two bodies in one place help or strain depends on
 * which bodies they are — so it is `null` here and decided by the reader.
 */
export const MAJOR_ASPECTS = {
  conjunction: { angle: 0, polarity: null },
  sextile: { angle: 60, polarity: 1 },
  square: { angle: 90, polarity: -1 },
  trine: { angle: 120, polarity: 1 },
  opposition: { angle: 180, polarity: -1 },
};

/** Aspect names in ascending angle order, for stable iteration. */
export const ASPECT_NAMES = Object.keys(MAJOR_ASPECTS)
  .sort((a, b) => MAJOR_ASPECTS[a].angle - MAJOR_ASPECTS[b].angle);

/**
 * The shortest arc between two longitudes, folded into 0–180.
 *
 * Folding is what makes 359° and 1° two degrees apart rather than 358, and what
 * lets an opposition be measured the same way from either side.
 */
export function separation(a, b) {
  const delta = Math.abs(((a - b) % 360 + 360) % 360);
  return delta > 180 ? 360 - delta : delta;
}

/** How far two longitudes are from forming the named aspect exactly. */
export function aspectOrb(a, b, aspectName) {
  return Math.abs(separation(a, b) - MAJOR_ASPECTS[aspectName].angle);
}
