// Sexual Energy is a single-focus portal: the energy itself, self-mastery
// over it, and integration. Marriage/Dynamics/Scripts ("Relationship
// Practice") live in the Relationship Hub instead.
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
];

export const tabs = tabGroups.flatMap((g) => g.tabs);

export const tabIds = new Set(tabs.map((t) => t.id));

// Resolve an incoming ?section= value to { tab, sub }. Relationship Clarity,
// Patterns, and Practice now live in the standalone Relationship Hub portal —
// App.jsx intercepts those deep links before they reach this dashboard.
export function resolveSection(section) {
  if (!section) return { tab: "overview", sub: null };
  if (tabIds.has(section)) return { tab: section, sub: null };
  return { tab: "overview", sub: null };
}
