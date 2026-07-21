// Tiny localStorage helpers. Safe on SSR and when storage is disabled.
const PREFIX = 'sacred-pathways:';

function safeGet(key) {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    // Quota / disabled — silently ignore.
  }
}

export function readJSON(key, fallback) {
  const raw = safeGet(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  safeSet(key, JSON.stringify(value));
}

const RECENTS_KEY = 'recents';
const MAX_RECENTS = 5;

export function getRecentPortals() {
  const list = readJSON(RECENTS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function recordPortalVisit(portalId) {
  if (!portalId) return;
  const current = getRecentPortals().filter((id) => id !== portalId);
  current.unshift(portalId);
  writeJSON(RECENTS_KEY, current.slice(0, MAX_RECENTS));
}

const LAST_PORTAL_KEY = 'last-portal';

export function getLastPortal() {
  return safeGet(LAST_PORTAL_KEY);
}

export function setLastPortal(portalId) {
  if (!portalId) return;
  safeSet(LAST_PORTAL_KEY, portalId);
}

// Recently viewed Spiritual Topics (Topics & Dictionary portal). Stored under
// sacred-pathways:recent-topics — most-recent first, capped.
const RECENT_TOPICS_KEY = 'recent-topics';
const MAX_RECENT_TOPICS = 6;

export function getRecentTopics() {
  const list = readJSON(RECENT_TOPICS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function recordTopicVisit(topicId) {
  if (!topicId) return;
  const current = getRecentTopics().filter((id) => id !== topicId);
  current.unshift(topicId);
  writeJSON(RECENT_TOPICS_KEY, current.slice(0, MAX_RECENT_TOPICS));
}
