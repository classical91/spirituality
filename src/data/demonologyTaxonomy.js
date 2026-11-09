// Shared vocabulary for the Demonology Atlas: navigation categories, the
// cultural-origin and entity-classification facets, traditional-association
// themes, and the source layers every association must name.
//
// The facets are deliberately separate. A category is where an article sits
// in the sidebar; `traditionGroups` says which cultures and periods discuss
// it; `classification` says what kind of being or idea it is *within its own
// tradition*. That keeps a Japanese oni or a Buddhist Māra from being filed
// as a "Christian demon" just because they share a page.

// Sidebar / chip categories, in display order. 'All' is the reset chip.
export const DEMON_FILTERS = [
  'All',
  'Foundations',
  'Biblical',
  'Jewish & Second Temple',
  'Seven Deadly Sins',
  'Solomonic',
  'Hierarchies',
  'Sigils & Seals',
  'Gnostic',
  'Ancient Gods',
  'Mesopotamian',
  'Islamic',
  'South Asian & Buddhist',
  'East & Southeast Asian',
  'Comparative',
  'Psychology',
];

// Cultural origin / source tradition — the "Tradition" facet.
export const TRADITION_GROUPS = [
  'Mesopotamian',
  'Canaanite & Levantine',
  'Persian / Zoroastrian',
  'Hebrew Bible',
  'Second Temple Judaism',
  'Rabbinic & Kabbalistic Judaism',
  'Christian',
  'Islamic',
  'Gnostic',
  'Greco-Roman',
  'Celtic',
  'Hindu',
  'Buddhist',
  'Jain',
  'Chinese',
  'Japanese',
  'Southeast Asian',
  'European grimoire',
  'Modern psychology',
  'Comparative',
];

// What an entry *is* — the "Classification" facet.
export const ENTITY_CLASSES = [
  'Concept',
  'Text or framework',
  'Rank or title',
  'Symbol or seal',
  'Deity or deity group',
  'Spiritual adversary',
  'Fallen angel',
  'Angel of death or destruction',
  'Demonized deity',
  'Personified vice',
  'Grimoire spirit',
  'Chaos monster',
  'Demon',
  'Class of spirits',
  'Cosmic power',
  'Ambivalent or protective spirit',
  'Ghost or revenant',
  'Shape-shifter',
  'Mythic race',
];

// Traditional associations. Each must be backed, per entry, by a `basis`
// sentence and a source layer — see SOURCE_LAYERS.
export const ASSOCIATION_THEMES = [
  'Pride',
  'Greed',
  'Lust',
  'Envy',
  'Gluttony',
  'Wrath',
  'Sloth',
  'Deception',
  'Temptation',
  'Accusation',
  'Rebellion',
  'Idolatry',
  'Lawlessness',
  'Destruction',
  'Discord',
  'War',
  'Illusion',
  'Ignorance',
  'Craving',
  'Hunger',
  'Fear',
  'Death',
  'Disease',
  'Misfortune',
  'Danger to mothers & infants',
  'Seduction',
  'Vengeance',
  'Punishment',
  'Trickery',
  'Chaos',
  'Storms & wind',
  'Impurity',
  'Forbidden knowledge',
  'Protection',
  'Moral ambivalence',
];

// Where an association comes from. Rendered beside every association so a
// reader can tell a primary-text statement from a later reinterpretation.
export const SOURCE_LAYERS = {
  primary: 'Primary text',
  religious: 'Later religious interpretation',
  folklore: 'Folklore',
  grimoire: 'Grimoire / occult tradition',
  literary: 'Literary tradition',
  psychological: 'Psychological reading',
  scholarly: 'Modern scholarship',
};

// Parallel tracks for the timeline. Tracks are lanes, not a lineage: nothing
// in a later track is implied to descend from an earlier one.
export const TIMELINE_TRACKS = [
  'Mesopotamia',
  'Ancient Israel & Second Temple',
  'Rabbinic & Kabbalistic Judaism',
  'Christianity',
  'Islamic traditions',
  'Hindu traditions',
  'Buddhism',
  'China',
  'Japan',
  'Southeast Asia',
  'Medieval & early modern Europe',
  'Modern study',
];
