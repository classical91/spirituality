// Timeline and comparison data for the Demonology Atlas intro.
//
// The timeline is organised as parallel tracks (TIMELINE_TRACKS in
// ./demonologyTaxonomy.js). Tracks run side by side: an entry in the Japan
// track does not descend from one in the Christianity track. `start` is an
// approximate year (negative = BCE) used only for ordering within a track;
// `links` are article ids in ./demonology.js.

export const DEMONOLOGY_TIMELINE = [
  // Mesopotamia
  { track: 'Mesopotamia', start: -2000, era: 'c. early 2nd millennium BCE', text: 'Old Babylonian incantations against Lamashtu; Sumerian myths of the galla who seize Dumuzi for the netherworld.', links: ['lamashtu', 'gallu'] },
  { track: 'Mesopotamia', start: -900, era: 'c. 1st millennium BCE', text: 'Standardized exorcistic series (Udug-hul / Utukkū Lemnūtu, Maqlû); Pazuzu amulets protect mothers against Lamashtu.', links: ['utukku', 'pazuzu', 'demons-mesopotamia'] },

  // Ancient Israel & Second Temple
  { track: 'Ancient Israel & Second Temple', start: -1300, era: 'c. 14th–13th c. BCE', text: 'Ugaritic Baal Cycle: Baal defeats the seven-headed sea-serpent Lôtan, ancestor of the biblical Leviathan.', links: ['leviathan', 'baal'] },
  { track: 'Ancient Israel & Second Temple', start: -750, era: 'c. 8th–6th c. BCE', text: 'Prophets condemn Baal, Molech and Ashtoreth; "the satan" appears as heavenly accuser (Job, Zechariah).', links: ['baal', 'moloch', 'astaroth', 'satan'] },
  { track: 'Ancient Israel & Second Temple', start: -250, era: 'c. 3rd–1st c. BCE', text: '1 Enoch\'s Book of the Watchers, Jubilees (Mastema), Tobit (Asmodeus) and the Dead Sea Scrolls (Belial) personify evil powers.', links: ['watchers', 'nephilim', 'mastema', 'asmodeus', 'belial'] },

  // Rabbinic & Kabbalistic Judaism
  { track: 'Rabbinic & Kabbalistic Judaism', start: 300, era: 'c. 3rd–7th c. CE', text: 'The Talmud describes shedim and Ashmedai; Aramaic incantation bowls guard homes against Lilith.', links: ['shedim', 'lilith', 'asmodeus'] },
  { track: 'Rabbinic & Kabbalistic Judaism', start: 750, era: 'c. 8th c. CE', text: 'Pirkei de-Rabbi Eliezer makes Samael the tempter who rode the serpent.', links: ['samael'] },
  { track: 'Rabbinic & Kabbalistic Judaism', start: 1270, era: '13th c.', text: 'The Zohar and the "Treatise on the Left Emanation" pair Samael and Lilith; Naamah becomes a queen of demons.', links: ['samael', 'lilith', 'naamah'] },

  // Christianity
  { track: 'Christianity', start: 50, era: '1st c. CE', text: 'Gospels narrate exorcisms and the temptation of Jesus; Revelation names Abaddon/Apollyon and the dragon "called the devil and Satan."', links: ['satan', 'devil', 'abaddon'] },
  { track: 'Christianity', start: 380, era: 'c. 4th–6th c.', text: 'Evagrius maps the eight logismoi; Augustine treats evil as privation; Gregory the Great fixes the capital sins.', links: ['logismoi', 'acedia', 'sins-overview'] },
  { track: 'Christianity', start: 1589, era: '1589', text: 'Peter Binsfeld pairs seven demon princes with the seven deadly sins (Leviathan–envy, Belphegor–sloth…).', links: ['seven-princes', 'leviathan', 'belphegor'] },

  // Islamic traditions
  { track: 'Islamic traditions', start: 620, era: '7th c. CE', text: 'The Quran describes the jinn, Iblīs\' refusal to bow to Adam, the whispering shayāṭīn and an ʿifrīt serving Solomon.', links: ['jinn', 'iblis', 'shayatin', 'ifrit'] },
  { track: 'Islamic traditions', start: 900, era: 'c. 9th–14th c.', text: 'Hadith collections, exegesis and the Thousand and One Nights elaborate jinn lore; Sufis reinterpret Iblīs.', links: ['demons-islam', 'ifrit', 'iblis'] },

  // Hindu traditions
  { track: 'Hindu traditions', start: -1200, era: 'c. 1500–1000 BCE', text: 'Rigveda: asura is still an honorific for gods; hymns ward off rakṣas.', links: ['asuras', 'rakshasas'] },
  { track: 'Hindu traditions', start: -800, era: 'c. 1st millennium BCE', text: 'Brāhmaṇas frame cosmic history as contests of devas and asuras.', links: ['asuras'] },
  { track: 'Hindu traditions', start: -200, era: 'c. 4th c. BCE – 4th c. CE', text: 'The Rāmāyaṇa and Mahābhārata give rākṣasas kingdoms and moral complexity; Purāṇas narrate demon-slaying avatāras.', links: ['rakshasas', 'demons-south-asia'] },

  // Buddhism
  { track: 'Buddhism', start: -400, era: 'c. 5th–1st c. BCE', text: 'Early Buddhist texts describe Māra\'s assault and temptation, the asura realm and the hungry ghosts (petas).', links: ['mara', 'pretas', 'asuras'] },
  { track: 'Buddhism', start: 100, era: 'c. 1st–2nd c. CE', text: 'Aśvaghoṣa\'s Buddhacarita identifies Māra with Kāmadeva, the god of desire.', links: ['mara'] },

  // China
  { track: 'China', start: -1000, era: 'Zhou dynasty onward', text: 'Ancestor ritual separates cared-for ancestors from neglected, dangerous ghosts (gui).', links: ['demons-east-asia', 'chinese-hungry-ghosts'] },
  { track: 'China', start: 538, era: '538 CE', text: 'Emperor Wu of Liang sponsors the earliest recorded Yulanpen (Ghost Festival).', links: ['chinese-hungry-ghosts', 'pretas'] },
  { track: 'China', start: 1780, era: '18th c.', text: 'Qing "strange tales" (Ji Yun, Yuan Mei) describe stiff corpses — the jiangshi.', links: ['jiangshi'] },

  // Japan
  { track: 'Japan', start: 733, era: '8th c. CE', text: 'The Izumo Fudoki (733) records a one-eyed oni; the Nihon Shoki mentions a tengu meteor.', links: ['oni', 'tengu'] },
  { track: 'Japan', start: 1120, era: 'c. 12th–13th c.', text: 'Konjaku Monogatarishū and the Tengu Zōshi scrolls; the night parade of demons enters picture-scrolls.', links: ['tengu', 'yokai'] },
  { track: 'Japan', start: 1776, era: '1776', text: 'Toriyama Sekien\'s illustrated catalogue fixes the images of many yōkai, including the jorōgumo.', links: ['yokai', 'jorogumo', 'kitsune'] },

  // Southeast Asia
  { track: 'Southeast Asia', start: 1589, era: '1589', text: 'Juan de Plasencia records a Tagalog "magtatanggal" — an early account of the manananggal type.', links: ['manananggal'] },
  { track: 'Southeast Asia', start: 1771, era: '1771', text: 'Founding legend of Pontianak (West Kalimantan): the sultan drives off kuntilanak spirits.', links: ['pontianak'] },
  { track: 'Southeast Asia', start: 1900, era: '1900', text: 'Skeat\'s "Malay Magic" records the langsuir, pontianak and penanggalan.', links: ['pontianak', 'krasue', 'demons-southeast-asia'] },

  // Medieval & early modern Europe
  { track: 'Medieval & early modern Europe', start: 1050, era: 'c. 11th–15th c.', text: 'Psellos, Aquinas and Alfonso de Spina classify spirits; the horned Devil iconography takes shape.', links: ['classification', 'devil'] },
  { track: 'Medieval & early modern Europe', start: 1577, era: '1577', text: 'Johann Weyer\'s "Pseudomonarchia Daemonum" lists 69 ranked spirits.', links: ['ars-goetia', 'infernal-hierarchies'] },
  { track: 'Medieval & early modern Europe', start: 1650, era: '17th c.', text: 'The Lesser Key of Solomon\'s Ars Goetia catalogues 72 spirits.', links: ['lesser-key', 'ars-goetia', 'paimon'] },

  // Modern study
  { track: 'Modern study', start: 1818, era: '1818–1904', text: 'Collin de Plancy\'s "Dictionnaire Infernal"; Mathers and Crowley publish the Goetia (1904).', links: ['ars-goetia', 'belphegor'] },
  { track: 'Modern study', start: 1920, era: '20th c. – present', text: 'Jung\'s shadow, comparative religion, folklore studies and Assyriology reread demons as symbols, cultural memory and history.', links: ['jungian-shadow', 'demons-as-archetypes', 'comparative-overview'] },
];

// Entities shown in the intro's cross-cultural comparison table. The table
// reads each row's name, tradition, classification and associations from the
// article itself, so it can never drift from the dataset.
export const COMPARISON_IDS = [
  'belphegor', 'leviathan', 'samael', 'lilith', 'lamashtu', 'pazuzu', 'iblis', 'jinn',
  'mara', 'asuras', 'rakshasas', 'pretas', 'chinese-hungry-ghosts', 'jiangshi',
  'oni', 'tengu', 'kitsune', 'pontianak', 'krasue', 'manananggal',
];
