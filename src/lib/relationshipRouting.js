// Relationship Hub routing. The ?section= value in the URL is the single
// source of truth for which tab (and which concept inside it) the hub shows,
// so every screen inside the hub is deep-linkable, shareable, survives a
// refresh, and gets its own browser history entry.
//
// App.jsx re-keys portals on `path + search`, so pushing a new ?section=
// re-renders the hub from the URL. Components therefore derive their view from
// resolveSection() instead of copying the incoming section into state.
import { resolveOwner } from "../data/relationshipIndex.js";

// The three tabs, plus the overview that lists them.
export const TAB_IDS = ["clarity", "patterns", "practice"];

// A bare tab is reachable by its own id and by its longer "relationship-" form
// (the shape older links and the Sexual Energy redirects use).
const TAB_ALIASES = new Map([
  ["clarity", "clarity"],
  ["relationship-clarity", "clarity"],
  ["patterns", "patterns"],
  ["relationship-patterns", "patterns"],
  ["practice", "practice"],
  ["relationship-practice", "practice"],
]);

// Resolve an incoming ?section= value to { tab, sub }.
//
// `tab` is "overview" for a missing or unrecognized section. `sub` is the
// concept to open inside that tab, or null for the tab's own index. Section
// ownership comes from relationshipIndex.js, so listing a new section there is
// all that is needed to make its deep link route to the right tab.
export function resolveSection(section) {
  if (!section) return { tab: "overview", sub: null };

  const tabAlias = TAB_ALIASES.get(section);
  if (tabAlias) return { tab: tabAlias, sub: null };

  const owner = resolveOwner(section);
  if (owner) return { tab: owner, sub: section };

  return { tab: "overview", sub: null };
}

// The canonical ?section= value that opens a tab's own index, or null for the
// overview (which is the hub path with no query at all).
export function sectionForTab(tab) {
  return TAB_IDS.includes(tab) ? tab : null;
}
