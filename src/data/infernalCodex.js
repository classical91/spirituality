// Infernal & Mythic Codex — a navigable concept database.
//
// Educational and informational only. Each entry is a short, descriptive
// reference card: a one-line explanation plus tradition/source family,
// symbolism, classification, and associated titles/tags. No ritual,
// summoning, or invocation content is included.
//
// Entry shape:
//   id           unique slug (also the scroll-target anchor)
//   name         display name
//   type         one of CODEX_TYPES (drives the Type filter + badge)
//   category     one of CODEX_CATEGORIES (drives the Category buttons + grouping)
//   title        short subtitle / role line
//   explanation  the short explanation shown on the card face
//   tradition    "Tradition / source family"
//   symbolism    "Symbolism"
//   tags         "Associated titles / tags"
//
// "Classification" is rendered as `${type} · ${category}` in the UI.

export const codexEntries = [
  // ── Ars Goetia ──────────────────────────────────────────────────────────
  {
    id: 'agares', name: 'Agares', type: 'Goetia', category: 'Ars Goetia',
    title: 'Duke of Hell',
    explanation: 'A Goetic duke associated with language, movement, fugitives, and disruption.',
    tradition: 'Ars Goetia',
    symbolism: 'Motion, reversal, communication, instability.',
    tags: ['Duke', 'Language', 'Movement'],
  },
  {
    id: 'astaroth', name: 'Astaroth', type: 'Goetia', category: 'Ars Goetia',
    title: 'Great Duke of Hell',
    explanation: 'A high-ranking Goetic spirit associated with knowledge, philosophy, memory, and hidden history.',
    tradition: 'Ars Goetia and Christian demonology',
    symbolism: 'Forbidden knowledge, memory, intellectual temptation.',
    tags: ['Seal of Astaroth', 'Duke', 'Knowledge'],
  },
  {
    id: 'baal', name: 'Baal', type: 'Goetia', category: 'Ars Goetia',
    title: 'King / Duke / First Spirit of the Ars Goetia',
    explanation: 'A major Goetic spirit associated with rulership, invisibility, command, and ancient Near Eastern divine imagery.',
    tradition: 'Ars Goetia and Near Eastern deity-name traditions',
    symbolism: 'Authority, concealment, kingship, command.',
    tags: ['Sigil of Baal', 'King', 'Duke of Hell'],
  },
  {
    id: 'ars-goetia-list', name: 'List of Demons in the Ars Goetia', type: 'Text', category: 'Ars Goetia',
    title: 'Catalogue of 72 Goetic Spirits',
    explanation: 'A reference category for the 72 spirits listed in the Ars Goetia section of The Lesser Key of Solomon.',
    tradition: 'Solomonic grimoire tradition',
    symbolism: 'Hierarchy, classification, names, offices, and seals.',
    tags: ['Ars Goetia', 'Lesser Key', '72 Spirits'],
  },
  {
    id: 'marchosias', name: 'Marchosias', type: 'Goetia', category: 'Ars Goetia',
    title: 'Marquis of Hell',
    explanation: 'A Goetic marquis often represented with wolf-like warrior imagery.',
    tradition: 'Ars Goetia',
    symbolism: 'Courage, aggression, loyalty, controlled violence.',
    tags: ['Marquis', 'Wolf', 'Warrior'],
  },

  // ── Texts ────────────────────────────────────────────────────────────────
  {
    id: 'spirits-of-solomon', name: 'Spirits of Solomon', type: 'Text', category: 'Texts',
    title: 'Solomonic Spirit Category',
    explanation: 'A category for spirits appearing in Solomonic legends and texts, often framed around wisdom, testing, binding, or divine authority.',
    tradition: 'Testament of Solomon and Solomonic lore',
    symbolism: 'Authority, knowledge, command over spirits.',
    tags: ['Solomon', 'Ephippas', 'Grimoire'],
  },
  {
    id: 'lesser-key', name: 'The Lesser Key of Solomon', type: 'Text', category: 'Texts',
    title: 'Solomonic Grimoire',
    explanation: 'A famous grimoire containing sections on spirits, angels, demons, seals, and classifications, including the Ars Goetia.',
    tradition: 'Solomonic magic literature',
    symbolism: 'Catalogue, command, classification, spiritual hierarchy.',
    tags: ['Solomon', 'Ars Goetia', 'Seals'],
  },

  // ── Solomonic Spirits ─────────────────────────────────────────────────────
  {
    id: 'ephippas', name: 'Ephippas', type: 'Entity', category: 'Solomonic Spirits',
    title: 'Spirit or Demon in Ancient Texts',
    explanation: 'A spirit or demon mentioned in ancient texts, particularly Solomonic traditions, often connected with destructive force or wind-like power.',
    tradition: 'Testament of Solomon',
    symbolism: 'Unseen force, danger, command, wind power.',
    tags: ['Solomon', 'Wind', 'Ancient Spirit'],
  },

  // ── Seven Princes of Hell ──────────────────────────────────────────────────
  {
    id: 'asmodeus', name: 'Asmodeus', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Prince of Lust',
    explanation: 'Associated with lust, destructive desire, gambling, wrath, and domination by appetite.',
    tradition: 'Jewish, Christian, Islamic, and occult traditions',
    symbolism: 'Compulsion, obsession, uncontrolled passion.',
    tags: ['Lust', 'Prince', 'Desire'],
  },
  {
    id: 'beelzebub', name: 'Beelzebub', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Lord of the Flies',
    explanation: 'Connected with gluttony, decay, demonic hierarchy, and corrupted lordship.',
    tradition: 'Biblical and Christian demonology',
    symbolism: 'Decay, appetite, infestation.',
    tags: ['Gluttony', 'Flies', 'Decay'],
  },
  {
    id: 'belial', name: 'Belial', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Prince of Lawlessness',
    explanation: 'Associated with wickedness, corruption, rebellion, and refusal of moral order.',
    tradition: 'Biblical, apocryphal, and occult traditions',
    symbolism: 'Lawlessness, corruption, moral collapse.',
    tags: ['Wickedness', 'Rebellion', 'Lawlessness'],
  },
  {
    id: 'belphegor', name: 'Belphegor / Belphagor', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Prince of Sloth',
    explanation: 'Often linked with sloth, comfort, invention, seduction, laziness, and avoidance of spiritual responsibility.',
    tradition: 'Christian demonology',
    symbolism: 'Comfort addiction, avoidance, wasted potential.',
    tags: ['Sloth', 'Acedia', 'Invention'],
  },
  {
    id: 'lucifer', name: 'Lucifer', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Light-Bearer / Fallen Angel',
    explanation: 'Associated with pride, beauty, intelligence, rebellion, and the fall from divine order.',
    tradition: 'Christian demonology and literary tradition',
    symbolism: 'Illumination turned into rebellion.',
    tags: ['Pride', 'Fallen Angel', 'Light'],
  },
  {
    id: 'mammon', name: 'Mammon', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Prince of Greed',
    explanation: 'Personification of greed, wealth obsession, materialism, and corruption through money.',
    tradition: 'Christian moral tradition',
    symbolism: 'Possession, craving, material attachment.',
    tags: ['Greed', 'Wealth', 'Materialism'],
  },
  {
    id: 'satan', name: 'Satan', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'The Adversary',
    explanation: 'A figure of opposition, accusation, temptation, and spiritual resistance.',
    tradition: 'Jewish, Christian, and Islamic traditions',
    symbolism: 'Adversary, accuser, opposition.',
    tags: ['Devil', 'Temptation', 'Accuser'],
  },
  {
    id: 'seven-princes', name: 'Seven Princes of Hell', type: 'Prince', category: 'Seven Princes of Hell',
    title: 'Infernal Classification',
    explanation: 'A demonological framework associating major infernal figures with ruling powers, sins, or corruptive forces.',
    tradition: 'Later Christian demonology',
    symbolism: 'Hierarchy of vice and opposition.',
    tags: ['Princes', 'Sins', 'Hierarchy'],
  },

  // ── Seven Deadly Sins ──────────────────────────────────────────────────────
  {
    id: 'pride', name: 'Pride', type: 'Sin', category: 'Seven Deadly Sins',
    title: 'Root Deadly Sin',
    explanation: 'Excessive self-exaltation and refusal of humility, often treated as a root of spiritual downfall.',
    tradition: 'Christian moral theology',
    symbolism: 'Self-worship, superiority, refusal to submit.',
    tags: ['Lucifer', 'Ego', 'Fall'],
  },
  {
    id: 'sloth', name: 'Sloth', type: 'Sin', category: 'Seven Deadly Sins',
    title: 'Deadly Sin / Spiritual Laziness',
    explanation: 'Neglect of moral, spiritual, or meaningful responsibility; more than ordinary tiredness.',
    tradition: 'Christian moral theology',
    symbolism: 'Avoidance, numbness, wasted calling.',
    tags: ['Belphegor', 'Acedia', 'Avoidance'],
  },
  {
    id: 'seven-deadly-sins', name: 'The Seven Deadly Sins', type: 'Sin', category: 'Seven Deadly Sins',
    title: 'Moral Classification System',
    explanation: 'A traditional framework for classifying destructive desires and moral distortions.',
    tradition: 'Christian moral theology',
    symbolism: 'Vice patterns, disordered desire, spiritual disorder.',
    tags: ['Pride', 'Greed', 'Lust', 'Sloth'],
  },

  // ── Sins & Desires ─────────────────────────────────────────────────────────
  {
    id: 'acedia', name: 'Acedia', type: 'Sin', category: 'Sins & Desires',
    title: 'Spiritual Weariness',
    explanation: 'A state of spiritual apathy, heaviness, restlessness, and avoidance of one’s higher duty.',
    tradition: 'Desert Fathers and Christian monastic tradition',
    symbolism: 'Inner collapse, boredom with goodness, spiritual fatigue.',
    tags: ['Sloth', 'Logismoi', 'Despair'],
  },
  {
    id: 'killing-and-murder', name: 'Killing and Murder as Sin', type: 'Concept', category: 'Sins & Desires',
    title: 'Moral Prohibition',
    explanation: 'A moral and religious category distinguishing wrongful killing, murder, violence, justice, guilt, and the violation of life.',
    tradition: 'Religious ethics and law',
    symbolism: 'Violence, guilt, moral boundary, life violation.',
    tags: ['Wrath', 'Violence', 'Moral Law'],
  },
  {
    id: 'logismoi', name: 'Logismoi', type: 'Concept', category: 'Sins & Desires',
    title: 'Tempting Thoughts',
    explanation: 'Recurring tempting or intrusive thought-patterns described in early Christian ascetic psychology.',
    tradition: 'Desert Fathers and Eastern Christian tradition',
    symbolism: 'Mental seeds of sin, inner temptation patterns.',
    tags: ['Temptation', 'Thoughts', 'Passions'],
  },
  {
    id: 'sexual-fantasy-vs-lust', name: 'Sexual Fantasy vs Lust', type: 'Concept', category: 'Sins & Desires',
    title: 'Desire Distinction',
    explanation: 'Sexual fantasy can refer to imagination or desire; lust usually means disordered craving that objectifies, dominates, or becomes compulsive.',
    tradition: 'Moral theology, psychology, spirituality',
    symbolism: 'Imagination versus compulsive appetite.',
    tags: ['Asmodeus', 'Lust', 'Desire'],
  },
  {
    id: 'sinful-desires-frameworks', name: 'Sinful Desires Across Cultures', type: 'Concept', category: 'Sins & Desires',
    title: 'Desire Classification Concept',
    explanation: 'A broad concept explaining that sinful or destructive desires are interpreted differently across cultures, religions, and personal moral systems.',
    tradition: 'Comparative religion, ethics, psychology',
    symbolism: 'Appetite, taboo, temptation, moral boundaries.',
    tags: ['Desire', 'Culture', 'Religion'],
  },

  // ── Angels & Demons ────────────────────────────────────────────────────────
  {
    id: 'classification-of-demons', name: 'Classification of Demons', type: 'Concept', category: 'Angels & Demons',
    title: 'Demonic Hierarchy System',
    explanation: 'Systems that organize demons by rank, sin, function, element, theological role, or grimoire title.',
    tradition: 'Christian demonology and grimoires',
    symbolism: 'Hierarchy, spiritual opposition, taxonomy.',
    tags: ['Princes', 'Dukes', 'Kings', 'Marquises'],
  },
  {
    id: 'devil', name: 'Devil', type: 'Entity', category: 'Angels & Demons',
    title: 'Adversarial Figure',
    explanation: 'A broad title for an evil or adversarial spiritual figure, often overlapping with Satan in Christian usage.',
    tradition: 'Christian theology, folklore, literature',
    symbolism: 'Temptation, opposition, accusation, evil authority.',
    tags: ['Satan', 'Lucifer', 'Evil'],
  },
  {
    id: 'duke-of-hell', name: 'Duke of Hell', type: 'Rank', category: 'Angels & Demons',
    title: 'Infernal Rank',
    explanation: 'A rank used in grimoires and demonological hierarchies to classify certain spirits by title, dignity, or authority.',
    tradition: 'Christian demonology and Solomonic grimoires',
    symbolism: 'Rank, hierarchy, delegated power.',
    tags: ['Agares', 'Astaroth', 'Baal'],
  },
  {
    id: 'types-of-angels-and-demons', name: 'Types of Angels and Demons', type: 'Concept', category: 'Angels & Demons',
    title: 'Spiritual Being Taxonomy',
    explanation: 'A comparative section for angels, fallen angels, demons, spirits, watchers, archons, princes, and elemental beings.',
    tradition: 'Abrahamic and occult traditions',
    symbolism: 'Cosmic order versus disorder.',
    tags: ['Angels', 'Demons', 'Watchers', 'Archons'],
  },

  // ── Figures ────────────────────────────────────────────────────────────────
  {
    id: 'azazel', name: 'Azazel', type: 'Entity', category: 'Figures',
    title: 'Scapegoat Demon / Fallen Watcher',
    explanation: 'Associated with the scapegoat ritual, wilderness, forbidden teaching, and Watcher traditions.',
    tradition: 'Leviticus, Book of Enoch, later demonology',
    symbolism: 'Exile, blame transfer, forbidden knowledge.',
    tags: ['Scapegoat', 'Watchers', 'Wilderness'],
  },
  {
    id: 'lilith', name: 'Lilith', type: 'Entity', category: 'Figures',
    title: 'Night Spirit / Rebel Feminine Figure',
    explanation: 'A night-spirit figure from Jewish folklore and later occult traditions, often symbolizing danger, seduction, and autonomy.',
    tradition: 'Jewish folklore, Mesopotamian parallels, occult symbolism',
    symbolism: 'Independence, seduction, fear of uncontrolled desire.',
    tags: ['Night', 'Sexuality', 'Rebellion'],
  },
  {
    id: 'mastema', name: 'Mastema', type: 'Entity', category: 'Figures',
    title: 'Spirit of Hostility',
    explanation: 'An adversarial figure associated with hostility, testing, and accusation.',
    tradition: 'Book of Jubilees',
    symbolism: 'Opposition, testing, accusation.',
    tags: ['Accuser', 'Hostility', 'Testing'],
  },

  // ── Ancient Deities ────────────────────────────────────────────────────────
  {
    id: 'moloch', name: 'Moloch', type: 'Entity', category: 'Ancient Deities',
    title: 'Devouring Idol / False God',
    explanation: 'A biblical figure associated with forbidden sacrifice and destructive devotion.',
    tradition: 'Biblical and Near Eastern religious polemics',
    symbolism: 'Destructive sacrifice, power worship, moral horror.',
    tags: ['Idolatry', 'Sacrifice', 'False Worship'],
  },
  {
    id: 'remphan', name: 'Remphan', type: 'Entity', category: 'Ancient Deities',
    title: 'Star / Idol Figure',
    explanation: 'A biblical idol or star-associated figure connected with false worship and astral symbolism.',
    tradition: 'Biblical tradition',
    symbolism: 'Misplaced devotion, astral worship, false authority.',
    tags: ['Star', 'Idol', 'False Worship'],
  },

  // ── Deity Lists ────────────────────────────────────────────────────────────
  {
    id: 'wind-deities', name: 'List of Wind Deities', type: 'Deity List', category: 'Deity Lists',
    title: 'Wind Deity List',
    explanation: 'A group of deities connected to wind, storms, breath, air, movement, invisible force, and divine messages.',
    tradition: 'Global mythology',
    symbolism: 'Movement, breath, storm, unseen power.',
    tags: ['Air', 'Storm', 'Breath'],
  },
  {
    id: 'lunar-deities', name: 'Lunar Deities', type: 'Deity List', category: 'Deity Lists',
    title: 'Moon Gods and Goddesses',
    explanation: 'Deities connected to the moon, cycles, night, fertility, time, intuition, and tides.',
    tradition: 'Global mythology',
    symbolism: 'Cycles, emotion, mystery, reflection.',
    tags: ['Moon', 'Night', 'Cycles'],
  },
  {
    id: 'mesopotamian-deities', name: 'Mesopotamian Deities', type: 'Deity List', category: 'Deity Lists',
    title: 'Ancient Near Eastern Deity List',
    explanation: 'A broad group of gods and goddesses from Sumerian, Akkadian, Babylonian, and Assyrian traditions.',
    tradition: 'Mesopotamian religion',
    symbolism: 'City gods, fertility, war, wisdom, cosmic order.',
    tags: ['Inanna', 'Enki', 'Marduk', 'Ishtar'],
  },
  {
    id: 'solar-disk-gods', name: 'Solar Disk Gods', type: 'Deity List', category: 'Deity Lists',
    title: 'Sun Disk Deities',
    explanation: 'Solar disk gods personify the visible sun, divine kingship, illumination, order, and life force.',
    tradition: 'Egyptian and global solar traditions',
    symbolism: 'Radiance, authority, life, divine order.',
    tags: ['Sun', 'Disk', 'Kingship'],
  },

  // ── Celtic Mythology ───────────────────────────────────────────────────────
  {
    id: 'celtic-deities', name: 'List of Celtic Deities', type: 'Deity List', category: 'Celtic Mythology',
    title: 'Celtic Deity List',
    explanation: 'Celtic deities are linked with war, sovereignty, poetry, land, healing, animals, craft, and seasonal cycles.',
    tradition: 'Irish, Welsh, Gaulish, and wider Celtic traditions',
    symbolism: 'Land, ancestry, magic, heroic power.',
    tags: ['Celtic', 'Nature', 'Sovereignty'],
  },
  {
    id: 'celtic-names', name: 'Names Inspired by Celtic Mythology', type: 'Deity List', category: 'Celtic Mythology',
    title: 'Naming Reference List',
    explanation: 'A creative naming category drawing from Celtic deities, heroes, places, and mythic concepts.',
    tradition: 'Celtic myth and modern naming culture',
    symbolism: 'Identity, ancestry, poetic naming.',
    tags: ['Names', 'Celtic', 'Mythic Inspiration'],
  },

  // ── Comparative Mythology ──────────────────────────────────────────────────
  {
    id: 'interpretatio-graeca', name: 'Interpretatio Graeca', type: 'Concept', category: 'Comparative Mythology',
    title: 'Greek Interpretation of Foreign Gods',
    explanation: 'A method where Greeks interpreted foreign gods by comparing them to Greek deities.',
    tradition: 'Classical antiquity',
    symbolism: 'Cultural translation, deity comparison, syncretism.',
    tags: ['Syncretism', 'Greek', 'Deities'],
  },
  {
    id: 'personification-across-cultures', name: 'Personification Across Cultures', type: 'Concept', category: 'Comparative Mythology',
    title: 'Personification Across Cultures',
    explanation: 'A broad concept for how cultures personify natural forces, emotions, planets, virtues, vices, death, evil, and cosmic powers.',
    tradition: 'Comparative mythology and religion',
    symbolism: 'Making invisible forces visible through figures.',
    tags: ['Personification', 'Mythology', 'Forces'],
  },

  // ── Concepts ───────────────────────────────────────────────────────────────
  {
    id: 'wickedness', name: 'Wickedness', type: 'Concept', category: 'Concepts',
    title: 'Moral Corruption Concept',
    explanation: 'Wickedness means deliberate moral corruption, cruelty, evil intent, or active opposition to goodness.',
    tradition: 'Religious, ethical, and literary traditions',
    symbolism: 'Corrupt will, cruelty, dark intention.',
    tags: ['Belial', 'Evil', 'Sin'],
  },
  {
    id: 'horror', name: 'Horror', type: 'Concept', category: 'Concepts',
    title: 'Fear-Based Genre and Emotion',
    explanation: 'A genre and emotional mode using fear, taboo, monsters, demons, death, and the unknown.',
    tradition: 'Literature, film, folklore',
    symbolism: 'Dread, shadow, mortality, the forbidden.',
    tags: ['Demons', 'Death', 'Fear'],
  },
  {
    id: 'personification-vs-embodiment', name: 'Personification of Evil vs Embodiment of Evil', type: 'Concept', category: 'Concepts',
    title: 'Symbolic Evil Distinction',
    explanation: 'A personification represents evil as a figure. An embodiment acts as evil made active, present, or incarnate.',
    tradition: 'Theology, literature, horror',
    symbolism: 'Abstract evil versus active evil.',
    tags: ['Devil', 'Satan', 'Wickedness'],
  },

  // ── Seals & Sigils ─────────────────────────────────────────────────────────
  {
    id: 'seal-of-astaroth', name: 'Seal of Astaroth', type: 'Seal', category: 'Seals & Sigils',
    title: 'Symbolic Seal',
    explanation: 'A seal associated with Astaroth in grimoire catalogues, useful as an iconographic reference in the database.',
    tradition: 'Goetic seal tradition',
    symbolism: 'Symbolic identity, hidden knowledge, hierarchy.',
    tags: ['Astaroth', 'Seal', 'Duke'],
  },
  {
    id: 'sigil-of-baal', name: 'Sigil of Baal', type: 'Seal', category: 'Seals & Sigils',
    title: 'Symbolic Seal',
    explanation: 'A visual seal associated with Baal in grimoire traditions, used here as a symbolic database reference only.',
    tradition: 'Goetic seal tradition',
    symbolism: 'Identity marker, symbolic signature, occult taxonomy.',
    tags: ['Baal', 'Seal', 'Goetia'],
  },

  // ── Gnosticism ─────────────────────────────────────────────────────────────
  {
    id: 'archons', name: 'Archons', type: 'Entity', category: 'Gnosticism',
    title: 'Powerful Rulers in Gnostic Cosmology',
    explanation: 'Archons are powerful, often malevolent entities found in Gnostic cosmology, commonly portrayed as rulers that bind souls to ignorance or material limitation.',
    tradition: 'Gnostic cosmology',
    symbolism: 'Control, illusion, false authority, imprisonment of awareness.',
    tags: ['Gnosticism', 'Rulers', 'Cosmic Control'],
  },
];

// Category buttons + grouping order (matches the source design).
export const CODEX_CATEGORIES = [
  'Ars Goetia',
  'Texts',
  'Solomonic Spirits',
  'Seven Princes of Hell',
  'Seven Deadly Sins',
  'Sins & Desires',
  'Angels & Demons',
  'Figures',
  'Ancient Deities',
  'Deity Lists',
  'Celtic Mythology',
  'Comparative Mythology',
  'Concepts',
  'Seals & Sigils',
  'Gnosticism',
];

// Type filter options.
export const CODEX_TYPES = [
  'Concept',
  'Deity List',
  'Entity',
  'Goetia',
  'Prince',
  'Rank',
  'Seal',
  'Sin',
  'Text',
];

// Reference stats shown in the header strip.
export const CODEX_STATS = {
  goetiaReference: 72,
  princesAndSins: 7,
};
