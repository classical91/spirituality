// Relationship Hub navigation index — the single source of truth for how
// relationship topics are organized, routed, and searched.
//
// This module holds NAVIGATION + SEARCH METADATA ONLY. The full educational
// content still lives in the portal components:
//   • src/RelationshipClarityPortal.jsx   (owner: 'clarity')
//   • src/RelationshipPatterns.jsx        (owner: 'patterns')
//   • src/RelationshipPractice.jsx        (owner: 'practice')
//   • src/RelationshipFoundations.jsx     (a tab inside Practice)
//
// Why this exists: RelationshipHub.jsx used to keep hand-written section-ID
// sets and static overview cards. Centralizing that metadata here keeps the
// overview cards, deep-link routing, and global search from drifting apart.
//
// ── Section owners ─────────────────────────────────────────────────────────
//   'clarity'   → Relationship Clarity (what is happening?)
//   'patterns'  → Relationship Patterns (repeating dynamics)
//   'practice'  → Relationship Practice (skills + lived application)
//
// To route a ?section= value, use resolveOwner(section) (or the derived
// *SectionIds arrays). To render the overview, map over relationshipCategories.

// ── Authoritative routable section IDs, per owner ──────────────────────────
// These are the ?section= targets each tab knows how to open. Every existing
// Clarity concept id lives here so deep links never break. New content appends
// its id to the matching list.

export const claritySectionIds = [
  // Reflection
  "security-vs-fear", "mixed-signals", "chasing-vs-receiving", "secure-alternative",
  "pedestalizing", "trauma-bond-vs-true-love",
  // Dating & attraction
  "attracted-vs-infatuated", "attraction-pitfalls", "limerence",
  "dating-operant-conditioning", "investment-vs-vulnerability", "emotional-immaturity",
  "closeness-vs-compatibility", "crush-vs-love", "datable", "courting-vs-dating",
  "companionship", "compatibility-and-choosing",
  // Red flags
  "reading-red-flags", "love-bombing", "control-and-isolation", "gaslighting",
  "contempt-and-criticism", "jealousy-and-possessiveness", "future-faking",
  // Standards
  "standards", "chosen-and-wanted", "being-a-priority", "safety-as-standard",
  "seen-and-valued", "being-together-emotionally", "financial-partnership",
  "boundaries", "devotion",
  // Communication
  "honest-direct", "texting-urges",
  // Intimacy & bonding
  "relationship-lifecycle", "types-of-intimacy", "types-of-kisses", "forms-of-cuddling",
  "mutual-interests", "shared-experiences", "milestones", "gestures-of-affection",
  "quality-time", "forms-of-connection", "emotions-of-being-together",
  "forms-of-playfulness", "core-beliefs-for-sex",
  // Heartbreak & healing (new)
  "forms-of-love", "breakups-grief-and-closure", "reconciliation-and-trust-repair",
  // Tools
  "clarity-check", "pause-check",
];

export const patternSectionIds = [
  "attachment-styles", "neediness-loop", "ghosting-wounds", "emotional-independence",
  "secure-love", "early-trauma-confessional",
  // new
  "codependency-vs-interdependence", "pursuer-distancer-cycle", "conflict-patterns",
];

export const practiceSectionIds = [
  "foundations", "skills", "marriage", "dynamics", "scripts",
];

const claritySet = new Set(claritySectionIds);
const patternSet = new Set(patternSectionIds);
const practiceSet = new Set(practiceSectionIds);

// Resolve a ?section= value to its owning tab, or null if unknown.
export function resolveOwner(section) {
  if (!section) return null;
  if (practiceSet.has(section)) return "practice";
  if (patternSet.has(section)) return "patterns";
  if (claritySet.has(section)) return "clarity";
  return null;
}

// ── Rich nav entries (overview chips + search) ─────────────────────────────
// A curated subset of the routable sections, each with display metadata. Not
// every Clarity concept appears here — only the ones surfaced as an overview
// chip or covered by global search. `section` is the deep-link target; `id`
// is unique within this list (a section may back more than one chip).

export const relationshipSections = [
  // ── Love & Attachment ────────────────────────────────────────────────────
  {
    id: "forms-of-love",
    title: "Forms of Love",
    category: "Love & Attachment",
    owner: "clarity",
    section: "forms-of-love",
    summary:
      "Romantic, passionate, companionate, compassionate, platonic, familial, and self-love — kept distinct from psychological states and unhealthy patterns.",
    tags: ["love", "forms of love", "romantic love", "platonic love", "companionate love", "compassionate love", "familial love", "self-love", "unconditional love"],
  },
  {
    id: "attachment-styles",
    title: "Attachment Styles",
    category: "Love & Attachment",
    owner: "patterns",
    section: "attachment-styles",
    summary: "Secure, anxious, avoidant, and disorganized strategies — learned, not fixed, and able to change.",
    tags: ["attachment", "attachment styles", "secure", "anxious", "avoidant", "disorganized"],
  },
  {
    id: "secure-love",
    title: "Secure Love",
    category: "Love & Attachment",
    owner: "patterns",
    section: "secure-love",
    summary: "Closeness and independence together — need without fear, generosity without scorekeeping.",
    tags: ["secure love", "security", "closeness", "independence", "giving", "receiving"],
  },
  {
    id: "emotional-independence",
    title: "Emotional Independence",
    category: "Love & Attachment",
    owner: "patterns",
    section: "emotional-independence",
    summary: "A baseline of okayness that is not controlled by another person's behavior — without going cold.",
    tags: ["emotional independence", "self-soothing", "baseline", "okayness", "interdependence"],
  },
  {
    id: "being-chosen",
    title: "Being Chosen",
    category: "Love & Attachment",
    owner: "clarity",
    section: "chosen-and-wanted",
    summary: "The difference between being chosen and wanted, and chasing to be tolerated.",
    tags: ["being chosen", "wanted", "priority", "reciprocity"],
  },
  {
    id: "devotion",
    title: "Devotion",
    category: "Love & Attachment",
    owner: "clarity",
    section: "devotion",
    summary: "Calm, consistent commitment versus the addictive pull of intermittent reinforcement.",
    tags: ["devotion", "consistency", "commitment", "intermittent reinforcement"],
  },

  // ── Dating & Attraction ──────────────────────────────────────────────────
  {
    id: "attraction-vs-infatuation",
    title: "Attraction vs Infatuation",
    category: "Dating & Attraction",
    owner: "clarity",
    section: "attracted-vs-infatuated",
    summary: "Grounded attraction to a real person versus infatuation with an image you filled in.",
    tags: ["attraction", "infatuation", "chemistry", "projection"],
  },
  {
    id: "limerence",
    title: "Limerence",
    category: "Dating & Attraction",
    owner: "clarity",
    section: "limerence",
    summary: "The involuntary, obsessive infatuation state — a psychological experience, not a measure of love.",
    tags: ["limerence", "obsession", "infatuation", "psychological state", "intrusive thoughts"],
  },
  {
    id: "compatibility",
    title: "Compatibility",
    category: "Dating & Attraction",
    owner: "clarity",
    section: "compatibility-and-choosing",
    summary: "Values, lifestyle, communication, conflict, sex, money, and long-term fit — versus chemistry alone.",
    tags: ["compatibility", "deal-breakers", "values", "long-term fit", "partner selection", "choosing a partner"],
  },
  {
    id: "courting-vs-dating",
    title: "Courting vs Dating",
    category: "Dating & Attraction",
    owner: "clarity",
    section: "courting-vs-dating",
    summary: "Intentional pursuit toward commitment versus open-ended dating.",
    tags: ["courting", "dating", "intention", "commitment"],
  },
  {
    id: "mixed-signals",
    title: "Mixed Signals",
    category: "Dating & Attraction",
    owner: "clarity",
    section: "mixed-signals",
    summary: "Mixed signals are the signal — read the pattern instead of decoding the puzzle.",
    tags: ["mixed signals", "decoding", "patterns", "clarity"],
  },
  {
    id: "choosing-a-partner",
    title: "Choosing a Partner",
    category: "Dating & Attraction",
    owner: "clarity",
    section: "compatibility-and-choosing",
    summary: "A practical compatibility checklist for choosing well — preferences versus deal-breakers.",
    tags: ["choosing a partner", "partner selection", "compatibility checklist", "deal-breakers"],
  },

  // ── Intimacy & Bonding ───────────────────────────────────────────────────
  {
    id: "emotional-intimacy",
    title: "Emotional Intimacy",
    category: "Intimacy & Bonding",
    owner: "clarity",
    section: "types-of-intimacy",
    summary: "Emotional, physical, intellectual, spiritual, and experiential closeness — the five kinds of being known.",
    tags: ["emotional intimacy", "types of intimacy", "closeness", "being known"],
  },
  {
    id: "physical-intimacy",
    title: "Physical Intimacy",
    category: "Intimacy & Bonding",
    owner: "clarity",
    section: "forms-of-cuddling",
    summary: "Touch, cuddling, and physical closeness held with consent and mutual comfort.",
    tags: ["physical intimacy", "touch", "cuddling", "affection", "consent"],
  },
  {
    id: "vulnerability",
    title: "Vulnerability",
    category: "Intimacy & Bonding",
    owner: "practice",
    section: "foundations",
    summary: "The willingness to be seen — the soil real intimacy grows from.",
    tags: ["vulnerability", "being seen", "trust", "foundations"],
  },
  {
    id: "emotional-availability",
    title: "Emotional Availability",
    category: "Intimacy & Bonding",
    owner: "clarity",
    section: "investment-vs-vulnerability",
    summary: "The capacity to be present, invested, and reachable — not walled off or half-in.",
    tags: ["emotional availability", "investment", "presence", "openness"],
  },
  {
    id: "companionship",
    title: "Companionship",
    category: "Intimacy & Bonding",
    owner: "clarity",
    section: "companionship",
    summary: "The everyday closeness of sharing a life — presence, ease, and being on the same team.",
    tags: ["companionship", "friendship", "presence", "everyday love"],
  },
  {
    id: "shared-experiences",
    title: "Shared Experiences",
    category: "Intimacy & Bonding",
    owner: "clarity",
    section: "shared-experiences",
    summary: "The bonding power of doing things together — novelty, ritual, and shared memory.",
    tags: ["shared experiences", "bonding", "memories", "novelty"],
  },

  // ── Communication & Repair ───────────────────────────────────────────────
  {
    id: "expressing-needs",
    title: "Expressing Needs",
    category: "Communication & Repair",
    owner: "practice",
    section: "skills",
    summary: "Naming feelings and needs clearly, and asking rather than assuming.",
    tags: ["expressing needs", "communication", "feelings", "requests", "assertiveness"],
  },
  {
    id: "requests-vs-demands",
    title: "Requests vs Demands",
    category: "Communication & Repair",
    owner: "practice",
    section: "skills",
    summary: "A request leaves room for a no; a demand punishes it.",
    tags: ["requests vs demands", "communication", "nonviolent communication", "consent"],
  },
  {
    id: "listening-and-validation",
    title: "Listening and Validation",
    category: "Communication & Repair",
    owner: "practice",
    section: "skills",
    summary: "Active listening, reflecting back, and emotional validation without needing to agree.",
    tags: ["listening", "validation", "active listening", "emotional validation", "reflecting"],
  },
  {
    id: "conflict-patterns",
    title: "Conflict Patterns",
    category: "Communication & Repair",
    owner: "patterns",
    section: "conflict-patterns",
    summary: "Criticism, defensiveness, contempt, and stonewalling — and the healthier moves that replace them.",
    tags: ["conflict patterns", "criticism", "defensiveness", "contempt", "stonewalling", "conflict"],
  },
  {
    id: "apologies",
    title: "Apologies",
    category: "Communication & Repair",
    owner: "practice",
    section: "skills",
    summary: "What a complete apology contains — and how to receive one.",
    tags: ["apology", "apologies", "repair", "accountability", "amends"],
  },
  {
    id: "rupture-and-repair",
    title: "Rupture and Repair",
    category: "Communication & Repair",
    owner: "practice",
    section: "skills",
    summary: "Regulating, reconnecting, and repairing after conflict — one issue at a time.",
    tags: ["rupture and repair", "conflict repair", "reconnection", "repair attempts", "regulation"],
  },

  // ── Consent & Sexual Connection ──────────────────────────────────────────
  {
    id: "ongoing-consent",
    title: "Ongoing Consent",
    category: "Consent & Sexual Connection",
    owner: "practice",
    section: "skills",
    summary: "Consent is freely given, specific, ongoing, and revocable — past consent never guarantees present consent.",
    tags: ["consent", "ongoing consent", "sexual consent", "autonomy"],
  },
  {
    id: "sexual-boundaries",
    title: "Sexual Boundaries",
    category: "Consent & Sexual Connection",
    owner: "practice",
    section: "skills",
    summary: "Naming limits and preferences, and honoring a partner's — a relationship creates no sexual entitlement.",
    tags: ["sexual boundaries", "boundaries", "consent", "entitlement"],
  },
  {
    id: "desire-differences",
    title: "Desire Differences",
    category: "Consent & Sexual Connection",
    owner: "practice",
    section: "skills",
    summary: "Navigating mismatched desire without pressure, guilt, or coercion.",
    tags: ["desire differences", "libido", "mismatch", "sexual communication"],
  },
  {
    id: "sexual-communication",
    title: "Sexual Communication",
    category: "Consent & Sexual Connection",
    owner: "practice",
    section: "skills",
    summary: "Talking about preferences, boundaries, sexual health, and contraception — before and during.",
    tags: ["sexual communication", "sexual health", "contraception", "preferences", "consent"],
  },
  {
    id: "handling-rejection",
    title: "Handling Rejection",
    category: "Consent & Sexual Connection",
    owner: "practice",
    section: "skills",
    summary: "Receiving a sexual no respectfully, and initiating without pressure.",
    tags: ["handling rejection", "sexual rejection", "respect", "consent", "initiation"],
  },
  {
    id: "privacy-and-image-sharing",
    title: "Privacy and Image Sharing",
    category: "Consent & Sexual Connection",
    owner: "practice",
    section: "skills",
    summary: "Privacy, sexting, and image consent — never share intimate material without explicit permission.",
    tags: ["privacy", "sexting", "image sharing", "consent", "image-based abuse"],
  },

  // ── Heartbreak & Healing ─────────────────────────────────────────────────
  {
    id: "breakups-and-grief",
    title: "Breakups and Grief",
    category: "Heartbreak & Healing",
    owner: "clarity",
    section: "breakups-grief-and-closure",
    summary: "Relationship grief, no-contact, and letting go without denying that the love was real.",
    tags: ["breakup", "breakups", "relationship grief", "grief", "no contact", "letting go"],
  },
  {
    id: "ghosting",
    title: "Ghosting",
    category: "Heartbreak & Healing",
    owner: "patterns",
    section: "ghosting-wounds",
    summary: "Why ghosting registers as pain, what it usually means, and how to process it.",
    tags: ["ghosting", "rejection", "closure", "ambiguous loss"],
  },
  {
    id: "ambiguous-loss",
    title: "Ambiguous Loss",
    category: "Heartbreak & Healing",
    owner: "clarity",
    section: "breakups-grief-and-closure",
    summary: "Grief without a clear ending — loss that stays open because nothing was resolved.",
    tags: ["ambiguous loss", "grief", "closure", "ghosting"],
  },
  {
    id: "closure",
    title: "Closure",
    category: "Heartbreak & Healing",
    owner: "clarity",
    section: "breakups-grief-and-closure",
    summary: "Creating closure internally when the other person will not, or cannot, provide it.",
    tags: ["closure", "grief", "healing", "no contact", "acceptance"],
  },
  {
    id: "reconciliation",
    title: "Reconciliation",
    category: "Heartbreak & Healing",
    owner: "clarity",
    section: "reconciliation-and-trust-repair",
    summary: "The conditions genuine repair requires — and the freedom to decide against it.",
    tags: ["reconciliation", "getting back together", "repair", "accountability"],
  },
  {
    id: "rebuilding-trust",
    title: "Rebuilding Trust",
    category: "Heartbreak & Healing",
    owner: "clarity",
    section: "reconciliation-and-trust-repair",
    summary: "Trust rebuilt through changed behavior over time — not demanded or fast-forwarded.",
    tags: ["rebuilding trust", "trust repair", "reconciliation", "changed behavior", "consistency"],
  },

  // ── Boundaries & Safety ──────────────────────────────────────────────────
  {
    id: "boundaries-vs-control",
    title: "Boundaries vs Control",
    category: "Boundaries & Safety",
    owner: "clarity",
    section: "boundaries",
    summary: "A boundary protects your state; control tries to manage the other person.",
    tags: ["boundaries", "control", "walls", "self-protection"],
  },
  {
    id: "emotional-safety",
    title: "Emotional Safety",
    category: "Boundaries & Safety",
    owner: "clarity",
    section: "safety-as-standard",
    summary: "Safety as a baseline standard, not a bonus — the ground healthy love needs.",
    tags: ["emotional safety", "safety", "standards", "security"],
  },
  {
    id: "red-flags",
    title: "Red Flags",
    category: "Boundaries & Safety",
    owner: "clarity",
    section: "reading-red-flags",
    summary: "A red flag is information about who someone is, not who they could become.",
    tags: ["red flags", "warning signs", "green flags", "safety"],
  },
  {
    id: "gaslighting",
    title: "Gaslighting",
    category: "Boundaries & Safety",
    owner: "clarity",
    section: "gaslighting",
    summary: "Persistent reality-distortion that leaves you doubting your own memory.",
    tags: ["gaslighting", "manipulation", "reality", "abuse"],
  },
  {
    id: "love-bombing",
    title: "Love Bombing",
    category: "Boundaries & Safety",
    owner: "clarity",
    section: "love-bombing",
    summary: "Overwhelming early intensity used to bypass pacing and boundaries.",
    tags: ["love bombing", "intensity", "manipulation", "pacing"],
  },
  {
    id: "contempt-and-criticism",
    title: "Contempt and Criticism",
    category: "Boundaries & Safety",
    owner: "clarity",
    section: "contempt-and-criticism",
    summary: "Attacks on who you are rather than what happened — corrosive to trust.",
    tags: ["contempt", "criticism", "disrespect", "character attacks"],
  },

  // ── Relationship Patterns ────────────────────────────────────────────────
  {
    id: "neediness-loop",
    title: "Neediness Loop",
    category: "Relationship Patterns",
    owner: "patterns",
    section: "neediness-loop",
    summary: "Outsourced self-worth reaching for reassurance that never quite lands.",
    tags: ["neediness", "validation", "reassurance", "self-worth"],
  },
  {
    id: "codependency",
    title: "Codependency",
    category: "Relationship Patterns",
    owner: "patterns",
    section: "codependency-vs-interdependence",
    summary: "Self-abandonment, rescuing, and enabling — versus two whole people relying on each other.",
    tags: ["codependency", "rescuing", "caretaking", "self-abandonment", "enabling"],
  },
  {
    id: "healthy-interdependence",
    title: "Healthy Interdependence",
    category: "Relationship Patterns",
    owner: "patterns",
    section: "codependency-vs-interdependence",
    summary: "Relying on one another without either person losing identity, agency, or responsibility.",
    tags: ["interdependence", "healthy interdependence", "mutual responsibility", "emotional boundaries"],
  },
  {
    id: "pursuer-distancer-cycle",
    title: "Pursuer–Distancer Cycle",
    category: "Relationship Patterns",
    owner: "patterns",
    section: "pursuer-distancer-cycle",
    summary: "One partner pursues under stress, the other withdraws — each move feeding the other.",
    tags: ["pursuer distancer", "pursue withdraw", "anxious avoidant", "conflict cycle"],
  },
  {
    id: "pedestalizing",
    title: "Pedestalizing",
    category: "Relationship Patterns",
    owner: "clarity",
    section: "pedestalizing",
    summary: "Placing someone above you until you disappear — equality is the correction.",
    tags: ["pedestalizing", "idolizing", "self-worth", "equality"],
  },
  {
    id: "trauma-bonds",
    title: "Trauma Bonds",
    category: "Relationship Patterns",
    owner: "clarity",
    section: "trauma-bond-vs-true-love",
    summary: "Intensity born of anxiety and relief cycles — distinct from steady, safe love.",
    tags: ["trauma bond", "trauma bonds", "intermittent reinforcement", "intensity", "safety"],
  },

  // ── Relationship Practice ────────────────────────────────────────────────
  {
    id: "foundations",
    title: "Foundations",
    category: "Relationship Practice",
    owner: "practice",
    section: "foundations",
    summary: "Trust, safety, vulnerability, mutuality, and the full anatomy of conscious love.",
    tags: ["foundations", "trust", "emotional safety", "mutuality", "conscious love"],
  },
  {
    id: "skills",
    title: "Relationship Skills",
    category: "Relationship Practice",
    owner: "practice",
    section: "skills",
    summary: "Communication, conflict and repair, and consent and sexual communication — put into practice.",
    tags: ["relationship skills", "communication", "conflict repair", "consent", "apology"],
  },
  {
    id: "marriage",
    title: "Marriage",
    category: "Relationship Practice",
    owner: "practice",
    section: "marriage",
    summary: "Five dimensions of a thriving marriage — emotional, spiritual, romantic, structural, and growth.",
    tags: ["marriage", "commitment", "sacred union", "partnership"],
  },
  {
    id: "dynamics",
    title: "Dynamics",
    category: "Relationship Practice",
    owner: "practice",
    section: "dynamics",
    summary: "Healthy, struggling, toxic, and growth-oriented relationship dynamics as a mirror.",
    tags: ["dynamics", "relationship dynamics", "healthy", "toxic", "growth"],
  },
  {
    id: "scripts",
    title: "Scripts",
    category: "Relationship Practice",
    owner: "practice",
    section: "scripts",
    summary: "Conscious scripting themes for journaling, affirmation, and visualization.",
    tags: ["scripts", "scripting", "affirmations", "living in the end"],
  },
];

export const relationshipSectionsById = Object.fromEntries(
  relationshipSections.map((s) => [s.id, s])
);

// Ordered list of overview categories, each with its clickable chips. Derived
// from relationshipSections so the overview and routing cannot drift apart.
export const CATEGORY_ORDER = [
  "Love & Attachment",
  "Dating & Attraction",
  "Intimacy & Bonding",
  "Communication & Repair",
  "Consent & Sexual Connection",
  "Heartbreak & Healing",
  "Boundaries & Safety",
  "Relationship Patterns",
  "Relationship Practice",
];

const CATEGORY_BLURBS = {
  "Love & Attachment": "The forms love takes and the attachment strategies underneath them.",
  "Dating & Attraction": "Attraction, infatuation, compatibility, and choosing well.",
  "Intimacy & Bonding": "The kinds of closeness — emotional, physical, and shared.",
  "Communication & Repair": "Expressing needs, listening, conflict, and repair.",
  "Consent & Sexual Connection": "Ongoing consent, sexual communication, and boundaries.",
  "Heartbreak & Healing": "Breakups, grief, closure, reconciliation, and rebuilding trust.",
  "Boundaries & Safety": "Boundaries, emotional safety, and reading red flags.",
  "Relationship Patterns": "The repeating dynamics underneath connection and disconnection.",
  "Relationship Practice": "Living it out — foundations, skills, marriage, dynamics, scripts.",
};

export const relationshipCategories = CATEGORY_ORDER.map((title) => ({
  title,
  summary: CATEGORY_BLURBS[title] || "",
  chips: relationshipSections
    .filter((s) => s.category === title)
    .map((s) => ({ id: s.id, title: s.title, section: s.section, owner: s.owner })),
})).filter((cat) => cat.chips.length > 0);

// Global-search entries derived from the nav index. searchIndex.js spreads
// these so new relationship sections surface in Deep Search automatically.
export const relationshipSearchEntries = relationshipSections.map((s) => ({
  id: `relidx-${s.id}`,
  portalId: "relationshiphub",
  section: s.section,
  title: `${s.title} — relationship lens`,
  summary: s.summary,
  tags: [...s.tags, "relationship", "relationship hub", s.category.toLowerCase()],
  lens: "Reflection",
}));
