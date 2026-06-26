// Two standalone portals reached from the hub landing page: Sexuality (the
// energy itself, self-mastery over it, and integration) and Relationships.
export const tabGroups = [
  {
    label: "Self-Mastery",
    slug: "sexuality",
    accent: "violet",
    tabs: [
      { id: "energy", label: "Energy" },
      { id: "porn", label: "Porn" },
      { id: "overview", label: "Overview" },
      { id: "masturbation", label: "Masturbation" },
      { id: "celibacy", label: "Celibacy" },
      { id: "urges", label: "Urges" },
      { id: "tracker", label: "Tracker" },
      { id: "journal", label: "Journal" },
      { id: "integration", label: "Integration" },
    ],
  },
  {
    label: "Secure Relationships",
    slug: "relationships",
    accent: "rose",
    tabs: [
      { id: "foundations", label: "Foundations" },
      { id: "marriage", label: "Marriage" },
      { id: "dynamics", label: "Dynamics" },
      { id: "scripts", label: "Scripts" },
    ],
  },
];

export const tabs = tabGroups.flatMap((g) => g.tabs);

export const tabIds = new Set(tabs.map((t) => t.id));

// Tab id -> owning group slug, used to redirect a hub-level deep link
// (e.g. /sexual-energy?section=masturbation) straight to its portal.
const tabToGroupSlug = {};
tabGroups.forEach((g) => g.tabs.forEach((t) => { tabToGroupSlug[t.id] = g.slug; }));

// Resolve an incoming ?section= value to { tab, sub }. Relationship Clarity
// & Patterns now live in the standalone Relationship Hub portal — App.jsx
// intercepts those deep links before they reach this dashboard.
export function resolveSection(section) {
  if (!section) return { tab: "overview", sub: null };
  if (tabIds.has(section)) return { tab: section, sub: null };
  return { tab: "overview", sub: null };
}

// Which sub-portal (slug) owns an incoming ?section= value, or null when
// there's no section to resolve (the hub's own two-card landing applies).
export function resolveSexualEnergyGroup(section) {
  if (!section) return null;
  const resolved = resolveSection(section);
  return tabToGroupSlug[resolved.tab] ?? null;
}
