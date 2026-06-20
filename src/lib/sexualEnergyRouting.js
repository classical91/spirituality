// Two standalone portals reached from the hub landing page: Sexuality (the
// energy itself, self-mastery over it, and integration) and Relationships.
export const tabGroups = [
  {
    label: "Sexuality",
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
    label: "Relationships",
    slug: "relationships",
    accent: "rose",
    tabs: [
      { id: "foundations", label: "Foundations" },
      { id: "marriage", label: "Marriage" },
      { id: "dynamics", label: "Dynamics" },
      { id: "scripts", label: "Scripts" },
      { id: "relationship-clarity", label: "Relationship Clarity" },
      { id: "relationship-patterns", label: "Relationship Patterns" },
    ],
  },
];

export const tabs = tabGroups.flatMap((g) => g.tabs);

export const tabIds = new Set(tabs.map((t) => t.id));

// Tab id -> owning group slug, used to redirect a hub-level deep link
// (e.g. /sexual-energy?section=masturbation) straight to its portal.
const tabToGroupSlug = {};
tabGroups.forEach((g) => g.tabs.forEach((t) => { tabToGroupSlug[t.id] = g.slug; }));

// Deep-link concept ids inside Relationship Clarity → resolve to that tab,
// carrying the concept id through as the sub-section the portal opens to.
export const RELATIONSHIP_CLARITY_SECTIONS = new Set([
  "security-vs-fear", "mixed-signals", "chasing-vs-receiving", "pedestalizing",
  "reading-red-flags", "love-bombing", "control-and-isolation", "gaslighting",
  "contempt-and-criticism", "jealousy-and-possessiveness", "future-faking",
  "standards", "boundaries", "devotion", "honest-direct", "texting-urges",
  "clarity-check", "pause-check",
]);

// Legacy ?section= values from the former standalone Relationships & Love
// portal → map onto the equivalent tab here.
const SECTION_ALIASES = {
  clarity: "relationship-clarity",
  patterns: "relationship-patterns",
};

// Resolve an incoming ?section= value to { tab, sub }.
export function resolveSection(section) {
  if (!section) return { tab: "overview", sub: null };
  if (SECTION_ALIASES[section]) return { tab: SECTION_ALIASES[section], sub: null };
  if (tabIds.has(section)) return { tab: section, sub: null };
  if (RELATIONSHIP_CLARITY_SECTIONS.has(section)) {
    return { tab: "relationship-clarity", sub: section };
  }
  return { tab: "overview", sub: null };
}

// Which sub-portal (slug) owns an incoming ?section= value, or null when
// there's no section to resolve (the hub's own two-card landing applies).
export function resolveSexualEnergyGroup(section) {
  if (!section) return null;
  const resolved = resolveSection(section);
  return tabToGroupSlug[resolved.tab] ?? null;
}
