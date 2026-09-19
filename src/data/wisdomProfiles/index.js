// Loads the long-form half of a teacher's entry on demand.
//
// Profile content is 86% of this atlas's data (roughly 490 kB of 570 kB across
// 53 teachers) and none of it is needed to browse the library, compare
// traditions, or read a card. So it is not bundled with the atlas: each teacher's
// profile is its own chunk, fetched when that teacher's page opens — about 9 kB
// instead of the lot.
//
// The map below is written out one entry per teacher rather than built with
// import.meta.glob so that every import() is statically analysable: the bundler
// gives each one its own chunk, and plain Node can load this module in a test.

const loaders = {
  'neville': () => import('./neville.js'),
  'abdullah': () => import('./abdullah.js'),
  'dispenza': () => import('./dispenza.js'),
  'murphy': () => import('./murphy.js'),
  'shinn': () => import('./shinn.js'),
  'fox': () => import('./fox.js'),
  'troward': () => import('./troward.js'),
  'holmes': () => import('./holmes.js'),
  'quimby': () => import('./quimby.js'),
  'goldsmith': () => import('./goldsmith.js'),
  'dyer': () => import('./dyer.js'),
  'byrne': () => import('./byrne.js'),
  'hall': () => import('./hall.js'),
  'emerson': () => import('./emerson.js'),
  'bardon': () => import('./bardon.js'),
  'krishnamurti': () => import('./krishnamurti.js'),
  'jung': () => import('./jung.js'),
  'watts': () => import('./watts.js'),
  'singer': () => import('./singer.js'),
  'russell': () => import('./russell.js'),
  'spinoza': () => import('./spinoza.js'),
  'kierkegaard': () => import('./kierkegaard.js'),
  'weil': () => import('./weil.js'),
  'maslow': () => import('./maslow.js'),
  'peterson': () => import('./peterson.js'),
  'dweck': () => import('./dweck.js'),
  'frankl': () => import('./frankl.js'),
  'covey': () => import('./covey.js'),
  'proctor': () => import('./proctor.js'),
  'rohn': () => import('./rohn.js'),
  'hill': () => import('./hill.js'),
  'robbins': () => import('./robbins.js'),
  'nightingale': () => import('./nightingale.js'),
  'wattles': () => import('./wattles.js'),
  'haanel': () => import('./haanel.js'),
  'collier': () => import('./collier.js'),
  'ponder': () => import('./ponder.js'),
  'tolle': () => import('./tolle.js'),
  'ramdass': () => import('./ramdass.js'),
  'thich': () => import('./thich.js'),
  'rumi': () => import('./rumi.js'),
  'aurelius': () => import('./aurelius.js'),
  'epictetus': () => import('./epictetus.js'),
  'seneca': () => import('./seneca.js'),
  'laotzu': () => import('./laotzu.js'),
  'campbell': () => import('./campbell.js'),
  'vonfranz': () => import('./vonfranz.js'),
  'yogananda': () => import('./yogananda.js'),
  'steiner': () => import('./steiner.js'),
  'ramana': () => import('./ramana.js'),
  'nisargadatta': () => import('./nisargadatta.js'),
  'adyashanti': () => import('./adyashanti.js'),
  'mooji': () => import('./mooji.js'),
};

// Resolved profiles, kept for the session. Opening a teacher, going back, and
// opening them again costs one fetch, and a profile already pulled in by the
// search warm-up is free.
const cache = new Map();

export const profileIds = Object.keys(loaders);

export function hasProfile(id) {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

/** A teacher's cached profile, or null if it has not been loaded yet. */
export function cachedProfile(id) {
  return cache.get(id) ?? null;
}

/** Load one teacher's profile. Repeat calls resolve from the cache. */
export async function loadProfile(id) {
  if (!hasProfile(id)) return null;
  const cached = cache.get(id);
  if (cached) return cached;
  const mod = await loaders[id]();
  const profile = mod.default;
  cache.set(id, profile);
  return profile;
}

/** Load every profile, for the library search — which matches on the long-form
 *  text as well as the cards, so it needs all of them. The chunks are fetched
 *  in parallel and land in the same cache the teacher pages read. */
export async function loadAllProfiles() {
  await Promise.all(profileIds.map((id) => loadProfile(id)));
  return cache;
}

/** A teacher's card merged with its profile, when the profile is loaded. Used
 *  for rendering a teacher page and for deep search; falls back to the card
 *  alone so every caller has something valid to render. */
export function mergeProfile(card, profile) {
  return profile ? { ...card, ...profile } : card;
}
