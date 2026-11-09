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
//   aliases      alternate names / spellings (searched, diacritic-insensitive)
//   article      id of the long-form Demonology Atlas article, when one exists
//                (defaults to the entry's own id if the Atlas has that id)
//   goetia       { n, rank } for the 72 spirits of the Ars Goetia
//   alsoIn       extra categories an entry is listed under (e.g. Asmodeus is a
//                Seven Princes entry that is also Goetia spirit 32)
//
// "Classification" is rendered as `${type} · ${category}` in the UI.
//
// The 72 Goetic spirits come from ./goetia.js: spirits that already had a
// card here keep it (and its id), the rest are generated as concise cards.

import { GOETIA_SPIRITS } from './goetia.js';
import { demonologyArticleIds } from './demonologyIds.js';

const baseEntries = [
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
    title: 'King · First Spirit of the Ars Goetia',
    explanation: 'The first spirit of the Ars Goetia ("Bael"), a king the grimoire credits with making people invisible and wise; the name is that of the Canaanite storm-god Baal, demonized in biblical polemic.',
    tradition: 'Ars Goetia and Near Eastern deity-name traditions',
    symbolism: 'Authority, concealment, kingship, command.',
    tags: ['Sigil of Baal', 'King', 'Bael'],
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
    explanation: 'The demon of Tobit and the Talmud (Ashmedai), later paired with lust in Binsfeld\'s scheme and listed as the 32nd spirit (Asmoday, a king) of the Ars Goetia.',
    tradition: 'Jewish (Tobit, Talmud), Christian, and grimoire traditions',
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
    tags: ['Agares', 'Astaroth', 'Gremory'],
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

// ── Expansion: figures with long-form Atlas articles ───────────────────────
// Concise A–Z cards; the full history lives in the Demonology Atlas article
// with the same id.
const expansionEntries = [
  // Figures (Biblical & Jewish)
  {
    id: 'leviathan', name: 'Leviathan', aliases: ['Livyatan', 'Lotan'], type: 'Entity', category: 'Figures',
    title: 'Sea-Dragon of Chaos / Prince of Envy',
    explanation: 'The primeval sea-serpent of Job, Psalms and Isaiah, inherited from the Ugaritic Lôtan; Binsfeld (1589) later made Leviathan the demon prince of envy.',
    tradition: 'Ugaritic myth, Hebrew Bible, rabbinic lore, Christian demonology',
    symbolism: 'Chaos, the deep, the mouth of hell.',
    tags: ['Chaos', 'Envy', 'Sea', 'Binsfeld'],
  },
  {
    id: 'abaddon', name: 'Abaddon / Apollyon', aliases: ['Apollyon', 'Abbadon'], type: 'Entity', category: 'Figures',
    title: 'Angel of the Abyss',
    explanation: 'A Hebrew name for the realm of destruction, personified in Revelation 9:11 as the angel-king of the abyss whose Greek name is Apollyon, "Destroyer." Whether he is fallen or an agent of judgment is debated.',
    tradition: 'Hebrew wisdom literature, Book of Revelation, Bunyan',
    symbolism: 'Destruction, the pit, the locust swarm.',
    tags: ['Destruction', 'Abyss', 'Revelation'],
  },
  {
    id: 'samael', name: 'Samael', aliases: ['Sammael'], type: 'Entity', category: 'Figures',
    title: 'Angel of Death / Accuser',
    explanation: 'A post-biblical figure: angel of death and tempter in midrash, a name of the blind creator in Gnostic texts, and Lilith\'s consort in medieval Kabbalah.',
    tradition: 'Ascension of Isaiah, Nag Hammadi, midrash, Zohar',
    symbolism: 'Death, accusation, temptation within divine limits.',
    tags: ['Death', 'Kabbalah', 'Lilith'],
  },
  {
    id: 'naamah', name: 'Naamah', type: 'Entity', category: 'Figures',
    title: 'Kabbalistic Queen of Demons',
    explanation: 'Named once in Genesis 4:22 as Tubal-cain\'s sister; the Zohar later makes her a seductive demoness and Kabbalistic lists a queen of demons.',
    tradition: 'Genesis, Genesis Rabbah, Zohar',
    symbolism: 'Beauty, song, seduction.',
    tags: ['Kabbalah', 'Seduction', 'Genesis'],
  },
  {
    id: 'watchers', name: 'The Watchers', aliases: ['Grigori', 'Egregoroi'], type: 'Entity', category: 'Figures',
    title: 'Fallen Angels of 1 Enoch',
    explanation: 'Two hundred angels who, in 1 Enoch, descend on Mount Hermon, take human wives and teach forbidden arts; their giant offspring\'s spirits become demons.',
    tradition: '1 Enoch, Jubilees, Dead Sea Scrolls',
    symbolism: 'Transgressed boundaries, forbidden knowledge.',
    tags: ['Watchers', 'Enoch', 'Fallen Angels'],
  },
  {
    id: 'nephilim', name: 'Nephilim', aliases: ['Nefilim'], type: 'Entity', category: 'Figures',
    title: 'Giants of Genesis 6',
    explanation: 'The "mighty men of old" of Genesis 6:4; Enochic texts make them the violent offspring of the Watchers whose disembodied spirits become evil spirits.',
    tradition: 'Genesis, Numbers, 1 Enoch, Book of Giants',
    symbolism: 'Unbounded power and appetite.',
    tags: ['Giants', 'Watchers', 'Genesis'],
  },
  {
    id: 'shedim', name: 'Shedim', aliases: ['Shed', 'Mazzikin'], type: 'Spirit Class', category: 'Figures',
    title: 'Demons of Rabbinic Judaism',
    explanation: 'Invisible beings that the Talmud describes as part angel-like and part human-like — dangerous, mortal, and subject to God.',
    tradition: 'Hebrew Bible, Talmud, Jewish folklore',
    symbolism: 'Everyday danger, ruins, night.',
    tags: ['Talmud', 'Ashmedai', 'Folklore'],
  },

  // Mesopotamian Spirits
  {
    id: 'lamashtu', name: 'Lamashtu', aliases: ['Lamaštu', 'Dimme'], type: 'Entity', category: 'Mesopotamian Spirits',
    title: 'Demoness of Childbirth Danger',
    explanation: 'Daughter of the sky-god Anu, feared for attacking pregnant women and infants; warded off by incantations and Pazuzu amulets.',
    tradition: 'Babylonian and Assyrian incantations',
    symbolism: 'The perils of birth and infancy.',
    tags: ['Mesopotamia', 'Childbirth', 'Incantation'],
  },
  {
    id: 'pazuzu', name: 'Pazuzu', type: 'Entity', category: 'Mesopotamian Spirits',
    title: 'King of the Wind-Demons',
    explanation: 'A wind-demon whose image was worn as a protective amulet against Lamashtu — dangerous and protective at once.',
    tradition: 'Neo-Assyrian and Neo-Babylonian amulets',
    symbolism: 'Wind, fever, danger turned to protection.',
    tags: ['Wind', 'Amulet', 'Protection'],
  },
  {
    id: 'gallu', name: 'Gallû (Galla)', aliases: ['Galla', 'Gallu'], type: 'Spirit Class', category: 'Mesopotamian Spirits',
    title: 'Underworld Constables',
    explanation: 'The incorruptible beings who, in "Inanna\'s Descent," seize Dumuzi for the netherworld; later listed among evil demons.',
    tradition: 'Sumerian myth, Utukkū Lemnūtu',
    symbolism: 'Death\'s inevitability.',
    tags: ['Underworld', 'Inanna', 'Dumuzi'],
  },
  {
    id: 'utukku', name: 'Utukku', aliases: ['Udug'], type: 'Spirit Class', category: 'Mesopotamian Spirits',
    title: 'Spirit (Good or Evil)',
    explanation: 'A general Mesopotamian word for a spirit; the great exorcism series is named for the "evil utukku," implying good ones existed too.',
    tradition: 'Udug-hul / Utukkū Lemnūtu series',
    symbolism: 'Unseen causes of illness.',
    tags: ['Exorcism', 'Spirits', 'Mesopotamia'],
  },

  // Islamic Traditions
  {
    id: 'iblis', name: 'Iblīs', aliases: ['Iblis', 'Eblis'], type: 'Entity', category: 'Islamic Traditions',
    title: 'The One Who Refused to Bow',
    explanation: 'In the Quran Iblīs refuses to prostrate before Adam out of pride and is granted respite to mislead humanity; whether he was an angel or a jinn is debated.',
    tradition: 'Quran, tafsir, Sufism',
    symbolism: 'Pride of origin, the whisper.',
    tags: ['Pride', 'Quran', 'Adam'],
  },
  {
    id: 'shayatin', name: 'Shayṭān / Shayāṭīn', aliases: ['Shaytan', 'Shaitan', 'Shayatin'], type: 'Spirit Class', category: 'Islamic Traditions',
    title: 'The Whisperers',
    explanation: 'Al-Shayṭān names Iblīs after his fall; the shayāṭīn are rebellious beings of jinn and humankind who whisper evil suggestions.',
    tradition: 'Quran and hadith',
    symbolism: 'Intrusive suggestion, temptation.',
    tags: ['Waswasa', 'Temptation', 'Quran'],
  },
  {
    id: 'jinn', name: 'Jinn', aliases: ['Djinn', 'Jinni', 'Genie'], type: 'Spirit Class', category: 'Islamic Traditions',
    title: 'Beings of Smokeless Fire',
    explanation: 'A free-willed created order beside angels and humans; some jinn are believers and some are not, so jinn are not demons by definition.',
    tradition: 'Pre-Islamic Arabia, Quran, folk Islam',
    symbolism: 'The hidden, unseen world.',
    tags: ['Quran', 'Smokeless Fire', 'Free Will'],
  },
  {
    id: 'ifrit', name: 'ʿIfrīt', aliases: ['Ifrit', 'Efreet', 'Afrit'], type: 'Spirit Class', category: 'Islamic Traditions',
    title: 'Powerful Jinn',
    explanation: 'A mighty kind of jinn: in Quran 27:39 one offers to fetch Sheba\'s throne for Solomon; later tales make ʿafārīt formidable and often hostile.',
    tradition: 'Quran, Thousand and One Nights, Egyptian folklore',
    symbolism: 'Raw power, the sealed vessel.',
    tags: ['Jinn', 'Solomon', 'Folklore'],
  },

  // South Asian & Buddhist
  {
    id: 'mara', name: 'Māra', aliases: ['Mara', 'Namuci', 'Papiyas'], type: 'Entity', category: 'South Asian & Buddhist',
    title: 'Buddhist Lord of Death and Desire',
    explanation: 'The figure who assails and tempts the Buddha beneath the bodhi tree; in Buddhism a personification of death, craving and the defilements — not a fallen angel.',
    tradition: 'Pali Canon, Buddhacarita, Mahāyāna',
    symbolism: 'Temptation, death, the earth-touching gesture.',
    tags: ['Buddhism', 'Temptation', 'Death'],
  },
  {
    id: 'asuras', name: 'Asuras', aliases: ['Asura', 'Ashura'], type: 'Spirit Class', category: 'South Asian & Buddhist',
    title: 'Rivals of the Gods',
    explanation: 'Once an honorific for Vedic gods, later the rivals of the devas; Hindu asuras include tyrants and devotees, Buddhist asuras inhabit a realm of jealousy, Jain asurakumāras are gods.',
    tradition: 'Vedic, Purāṇic, Buddhist, Jain',
    symbolism: 'Power in conflict with harmony.',
    tags: ['Devas', 'War', 'Rebirth'],
  },
  {
    id: 'rakshasas', name: 'Rākṣasas', aliases: ['Rakshasa', 'Rakshasi'], type: 'Spirit Class', category: 'South Asian & Buddhist',
    title: 'Shape-Shifters of the Epics',
    explanation: 'Night-roaming, shape-shifting beings — Rāvaṇa\'s people in the Rāmāyaṇa — yet the epics include the righteous Vibhīṣaṇa and the hero Ghaṭotkaca.',
    tradition: 'Vedas, Rāmāyaṇa, Mahābhārata, Jain and Buddhist texts',
    symbolism: 'Illusion and appetite.',
    tags: ['Ramayana', 'Ravana', 'Shape-shifting'],
  },
  {
    id: 'pretas', name: 'Pretas (Hungry Ghosts)', aliases: ['Preta', 'Peta', 'Gaki', 'Egui'], type: 'Spirit Class', category: 'South Asian & Buddhist',
    title: 'The Hungry Dead',
    explanation: 'In Hindu ritual the newly dead awaiting ancestorhood; in Buddhism beings reborn into insatiable hunger through greed — fed and pitied, not fought.',
    tradition: 'Hindu funerary rites, Petavatthu, East Asian Buddhism',
    symbolism: 'Unsatisfiable craving.',
    tags: ['Hungry Ghosts', 'Rebirth', 'Offerings'],
  },

  // East Asian Folklore
  {
    id: 'chinese-hungry-ghosts', name: 'Hungry Ghosts (China)', aliases: ['Egui', 'Ghost Month', 'Zhongyuan', 'Yulanpen'], type: 'Spirit Class', category: 'East Asian Folklore',
    title: 'The Neglected Dead',
    explanation: 'Ghosts without descendants or proper rites, fed during the seventh-month Ghost Festival (Buddhist Yulanpen, Daoist Zhongyuan).',
    tradition: 'Chinese popular religion, Buddhism, Daoism',
    symbolism: 'Obligations to the forgotten dead.',
    tags: ['Ghost Festival', 'Ancestors', 'China'],
  },
  {
    id: 'jiangshi', name: 'Jiangshi', aliases: ['Jiang shi', 'Hopping vampire', 'Kyonshi'], type: 'Folklore Being', category: 'East Asian Folklore',
    title: 'Stiff Corpse',
    explanation: 'A reanimated corpse of Qing-era tales that drains life-force; the "hopping vampire" image comes from 1980s Hong Kong film.',
    tradition: 'Qing strange tales, Chinese folklore',
    symbolism: 'Death without ritual closure.',
    tags: ['Revenant', 'China', 'Talisman'],
  },
  {
    id: 'yokai', name: 'Yōkai', aliases: ['Yokai', 'Youkai', 'Bakemono'], type: 'Spirit Class', category: 'East Asian Folklore',
    title: 'The Uncanny Beings of Japan',
    explanation: 'An umbrella term for Japan\'s strange creatures and spirits — some harmful, many mischievous, some lucky.',
    tradition: 'Japanese folklore, Toriyama Sekien, modern media',
    symbolism: 'The uncanny in everyday life.',
    tags: ['Japan', 'Folklore', 'Night Parade'],
  },
  {
    id: 'oni', name: 'Oni', type: 'Folklore Being', category: 'East Asian Folklore',
    title: 'Horned Ogre-Demon',
    explanation: 'Horned, club-wielding beings: hell wardens in Buddhist imagery, raiders in legend, expelled at Setsubun — and protective on roof tiles.',
    tradition: 'Japanese folklore and Buddhism',
    symbolism: 'Misfortune to be expelled; punishment.',
    tags: ['Japan', 'Setsubun', 'Hell Warden'],
  },
  {
    id: 'tengu', name: 'Tengu', type: 'Folklore Being', category: 'East Asian Folklore',
    title: 'Mountain Goblin / Guardian',
    explanation: 'Bird-like obstructors of Buddhism who punished proud monks, later long-nosed mountain guardians venerated as kami.',
    tradition: 'Japanese Buddhism, Shugendō, folklore',
    symbolism: 'Pride and its correction.',
    tags: ['Japan', 'Mountains', 'Pride'],
  },
  {
    id: 'kitsune', name: 'Kitsune', aliases: ['Nine-tailed fox'], type: 'Folklore Being', category: 'East Asian Folklore',
    title: 'Fox Spirit',
    explanation: 'Shape-shifting foxes: sacred messengers of Inari, but also tricksters and seductresses such as Tamamo-no-Mae.',
    tradition: 'Japanese folklore, Inari worship, Chinese fox lore',
    symbolism: 'Transformation, cleverness.',
    tags: ['Japan', 'Inari', 'Trickster'],
  },
  {
    id: 'jorogumo', name: 'Jorōgumo', aliases: ['Jorogumo'], type: 'Folklore Being', category: 'East Asian Folklore',
    title: 'Spider Woman',
    explanation: 'An Edo-period yōkai: a spider that becomes a beautiful woman to lure and bind men.',
    tradition: 'Edo folklore, Toriyama Sekien',
    symbolism: 'Deceptive allure.',
    tags: ['Japan', 'Spider', 'Yokai'],
  },

  // Southeast Asian Folklore
  {
    id: 'pontianak', name: 'Pontianak', aliases: ['Puntianak', 'Matianak', 'Langsuir'], type: 'Folklore Being', category: 'Southeast Asian Folklore',
    title: 'Malay Ghost of Childbirth Death',
    explanation: 'In Malaysia, Singapore and Brunei, the vengeful ghost of a woman who died in pregnancy or childbirth; older Malay lore (Skeat, 1900) called the mother langsuir and the stillborn child pontianak.',
    tradition: 'Malay folklore and cinema',
    symbolism: 'Maternal death, vengeance.',
    tags: ['Malaysia', 'Ghost', 'Frangipani'],
  },
  {
    id: 'kuntilanak', name: 'Kuntilanak', aliases: ['Kuntianak', 'Kunti'], type: 'Folklore Being', category: 'Southeast Asian Folklore',
    title: 'Indonesian Female Ghost',
    explanation: 'The Indonesian counterpart of the pontianak — a female ghost linked with death in childbirth, said to haunt trees — with its own regional lore, including the founding legend of the city of Pontianak.',
    tradition: 'Indonesian (Malay, Javanese, Sundanese) folklore',
    symbolism: 'Grief, vengeance, the liminal tree.',
    tags: ['Indonesia', 'Ghost', 'Pontianak'],
    article: 'pontianak',
  },
  {
    id: 'krasue', name: 'Krasue', aliases: ['Penanggalan', 'Ap', 'Kasu'], type: 'Folklore Being', category: 'Southeast Asian Folklore',
    title: 'Floating Head',
    explanation: 'A woman by day whose head and entrails fly by night in search of blood; related figures are the Khmer ap, Lao kasu and Malay penanggalan.',
    tradition: 'Thai, Khmer, Lao and Malay folklore',
    symbolism: 'Hidden hunger; danger to birth.',
    tags: ['Thailand', 'Phi', 'Ghost'],
  },
  {
    id: 'manananggal', name: 'Manananggal', aliases: ['Mananangal', 'Aswang'], type: 'Folklore Being', category: 'Southeast Asian Folklore',
    title: 'Self-Segmenting Flyer',
    explanation: 'A Philippine aswang-type creature that detaches her upper body and flies at night to prey on pregnant women.',
    tradition: 'Tagalog and Visayan folklore',
    symbolism: 'Threats to pregnancy; the community\'s margins.',
    tags: ['Philippines', 'Aswang', 'Shape-shifter'],
  },
];

// Codex entries whose detailed Atlas article has a different id.
const ARTICLE_ALIASES = {
  'ars-goetia-list': 'ars-goetia',
  'seven-deadly-sins': 'sins-overview',
  'classification-of-demons': 'classification',
  'celtic-names': 'names-celtic',
};

const ATLAS_IDS = new Set(demonologyArticleIds);

function goetiaCard(spirit) {
  const rank = spirit.rank.join(' & ');
  return {
    id: spirit.id,
    name: spirit.name,
    aliases: spirit.aliases,
    type: 'Goetia',
    category: 'Ars Goetia',
    title: `${rank} · Spirit ${spirit.n} of the Ars Goetia`,
    explanation: `The Ars Goetia describes ${spirit.name} as ${spirit.appearance}, and credits the spirit with ${spirit.offices}.`,
    tradition: spirit.weyer === false
      ? 'Ars Goetia (Lemegeton, 17th c.) — one of four spirits not in Weyer\'s "Pseudomonarchia Daemonum"'
      : 'Ars Goetia (Lemegeton, 17th c.), after Weyer\'s "Pseudomonarchia Daemonum" (1577)',
    symbolism: spirit.origin || 'Grimoire imagery; the name has no documented history outside early-modern magical texts.',
    tags: [...spirit.rank, `Goetia #${spirit.n}`],
  };
}

function buildCodex() {
  const entries = [...baseEntries, ...expansionEntries];
  const byId = new Map(entries.map((e) => [e.id, e]));
  for (const spirit of GOETIA_SPIRITS) {
    const goetia = { n: spirit.n, rank: spirit.rank };
    const existing = byId.get(spirit.id);
    if (existing) {
      const aliases = [...new Set([...(existing.aliases || []), spirit.name, ...spirit.aliases])]
        .filter((a) => a !== existing.name);
      byId.set(spirit.id, {
        ...existing,
        aliases,
        goetia,
        ...(existing.category === 'Ars Goetia' ? {} : { alsoIn: ['Ars Goetia'] }),
      });
    } else {
      byId.set(spirit.id, { ...goetiaCard(spirit), goetia });
    }
  }
  return [...byId.values()].map((entry) => {
    const article = entry.article || ARTICLE_ALIASES[entry.id] || (ATLAS_IDS.has(entry.id) ? entry.id : undefined);
    return article ? { ...entry, article } : entry;
  });
}

export const codexEntries = buildCodex();

// Category buttons + grouping order.
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
  'Mesopotamian Spirits',
  'Islamic Traditions',
  'South Asian & Buddhist',
  'East Asian Folklore',
  'Southeast Asian Folklore',
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
  'Folklore Being',
  'Goetia',
  'Prince',
  'Rank',
  'Seal',
  'Sin',
  'Spirit Class',
  'Text',
];

// Reference stats shown in the header strip. Goetia coverage is counted, not
// asserted: it is the number of the 72 spirits that actually have a card.
const CODEX_IDS = new Set(codexEntries.map((e) => e.id));
export const CODEX_STATS = {
  goetiaReference: GOETIA_SPIRITS.length,
  goetiaCovered: GOETIA_SPIRITS.filter((s) => CODEX_IDS.has(s.id)).length,
  princesAndSins: 7,
};

/** True when an entry belongs under a category (its own or an `alsoIn`). */
export function inCodexCategory(entry, category) {
  return entry.category === category || (entry.alsoIn || []).includes(category);
}
