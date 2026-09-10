// Where a portal actually lives.
//
// Several portal ids do not route to their own path: two Sacred Moral Atlas
// sections were folded into that page, the relationship sub-portals collapsed
// into one hub, and Natal Chart Decoder and Numerology became tabs of the
// Sacred Systems Atlas. Anything sending a visitor to a portal has to know all
// of that, or it sends them somewhere the app no longer serves.
//
// App.jsx's goPortal knew it, which was enough while navigation was the only
// caller. The Daily Dashboard's "Open Reading →" link is a second caller, so
// the rule moved here rather than being restated — a deep link that drifts from
// what the app itself does is a link into a redirect at best.

import { portalsById } from '../data/portals.js';

export const BIBLICAL_ROUTE = '/sacred-moral-atlas';

export const EMBEDDED_BIBLICAL_SECTIONS = {
  demonology: 'demonology-atlas',
  infernalcodex: 'infernal-codex',
};

// Natal Chart Decoder and Numerology used to be standalone portals; they now
// live inside the Sacred Systems Atlas as tabs.
export const SACRED_SYSTEMS_PORTAL_IDS = new Set(['astrology', 'numerology']);

/**
 * The in-app path for a portal, or null when there is none to navigate to —
 * an unknown id, or a portal that is really an external link.
 */
export function portalPath(portalId, { section } = {}) {
  if (EMBEDDED_BIBLICAL_SECTIONS[portalId]) {
    const embeddedSection =
      portalId === 'demonology' && section ? section : EMBEDDED_BIBLICAL_SECTIONS[portalId];
    return `${BIBLICAL_ROUTE}?section=${encodeURIComponent(embeddedSection)}`;
  }

  // Legacy internal contract used by relationship sub-portals; route to the hub.
  if (portalId === 'relationships') {
    return section ? `/relationship-hub?section=${encodeURIComponent(section)}` : '/relationship-hub';
  }

  // Route straight to the Atlas instead of through the routeHidden /astrology
  // and /numerology aliases — those are excluded from portalsByPath, so landing
  // on them (then rewriting the URL at render time) never registers a
  // "recently viewed" visit at all.
  if (SACRED_SYSTEMS_PORTAL_IDS.has(portalId)) {
    const target = section || (portalId === 'astrology' ? 'natal-chart' : 'numerology');
    return `/sacred-systems?section=${encodeURIComponent(target)}`;
  }

  const portal = portalsById[portalId];
  if (!portal || portal.external) return null;
  return section ? `${portal.path}?section=${encodeURIComponent(section)}` : portal.path;
}
