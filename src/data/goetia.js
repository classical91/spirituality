// The 72 spirits of the Ars Goetia — a machine-readable checklist.
//
// Source: the Ars Goetia, Book I of the Lemegeton / Lesser Key of Solomon
// (17th-century manuscripts, chiefly British Library Sloane MSS 2731 and
// 3825), in the numbering, spelling and ranks of the S. L. MacGregor Mathers
// translation edited by Aleister Crowley (1904). Most entries descend from
// Johann Weyer's "Pseudomonarchia Daemonum" (1577), which lists 69 spirits;
// `weyer: false` marks the four the Goetia adds (Vassago, Seere, Dantalion,
// Andromalius). Weyer's Pruflas has no Goetia number and is not listed here.
//
// Everything in `offices` and `appearance` is what the grimoire *claims* —
// a summary of a 17th-century text, not a statement that any such being
// exists or can do anything. No conjurations, seals or ritual instructions
// are reproduced.
//
// Shape:
//   n           Goetia number (1–72)
//   id          Codex entry id (existing Codex/Atlas ids are reused so old
//               deep links keep working: Bael → 'baal', Asmoday → 'asmodeus')
//   name        Mathers spelling
//   aliases     variant spellings in Weyer, manuscripts and later editions
//   rank        title(s) given in the Goetia
//   appearance  the grimoire's description of the spirit's form
//   offices     the powers the grimoire attributes to it
//   weyer       false when absent from the Pseudomonarchia Daemonum
//   origin      optional note on a name's earlier history, when documented

export const GOETIA_SOURCE =
  'Ars Goetia (Lemegeton, 17th c.); Mathers & Crowley ed., "The Goetia" (1904); Weyer, "Pseudomonarchia Daemonum" (1577)';

export const GOETIA_RANKS = ['King', 'Duke', 'Prince', 'Marquis', 'President', 'Earl', 'Knight'];

export const GOETIA_SPIRITS = [
  { n: 1, id: 'baal', name: 'Bael', aliases: ['Baal', 'Baell'], rank: ['King'], appearance: 'a figure with the heads of a toad, a man and a cat', offices: 'making people invisible and wise', origin: 'Name of the Canaanite storm-god Baal ("lord"), demonized in biblical polemic.' },
  { n: 2, id: 'agares', name: 'Agares', aliases: ['Agreas'], rank: ['Duke'], appearance: 'an old man riding a crocodile and carrying a goshawk', offices: 'teaching languages, bringing back runaways and causing earthquakes' },
  { n: 3, id: 'vassago', name: 'Vassago', aliases: [], rank: ['Prince'], appearance: 'a spirit "of the same nature as Agares" (no form is given)', offices: 'declaring things past and to come and finding lost things; called "of a good nature"', weyer: false },
  { n: 4, id: 'samigina', name: 'Samigina', aliases: ['Gamigin', 'Gamygyn'], rank: ['Marquis'], appearance: 'a little horse or ass', offices: 'teaching the liberal sciences and giving account of the souls of the dead' },
  { n: 5, id: 'marbas', name: 'Marbas', aliases: ['Barbas'], rank: ['President'], appearance: 'a great lion', offices: 'answering questions about hidden things, causing and curing diseases, and teaching mechanical arts' },
  { n: 6, id: 'valefor', name: 'Valefor', aliases: ['Valefar', 'Malaphar'], rank: ['Duke'], appearance: 'a lion with the head of an ass, bellowing', offices: 'acting as a familiar who tempts people to steal' },
  { n: 7, id: 'amon', name: 'Amon', aliases: ['Aamon'], rank: ['Marquis'], appearance: 'a wolf with a serpent\'s tail vomiting flame, or a man with a raven\'s head', offices: 'telling past and future, procuring love and reconciling quarrels', origin: 'Popular sources often link the name to the Egyptian god Amun; the connection is unproven.' },
  { n: 8, id: 'barbatos', name: 'Barbatos', aliases: [], rank: ['Duke'], appearance: 'appearing when the Sun is in Sagittarius with four noble kings and their companies', offices: 'understanding the songs of birds and the voices of animals, revealing treasures hidden by enchantment, and reconciling friends' },
  { n: 9, id: 'paimon', name: 'Paimon', aliases: ['Paymon', 'Paimonia'], rank: ['King'], appearance: 'a crowned man on a dromedary, preceded by musicians with trumpets and cymbals', offices: 'teaching arts, sciences and secret things, and granting dignities; described as obedient to Lucifer' },
  { n: 10, id: 'buer', name: 'Buer', aliases: [], rank: ['President'], appearance: 'appearing "in Sagittary" (later illustrated as a lion\'s head ringed by goat legs)', offices: 'teaching moral and natural philosophy, logic and the virtues of herbs, and healing distempers' },
  { n: 11, id: 'gusion', name: 'Gusion', aliases: ['Gusoin', 'Gusoyn'], rank: ['Duke'], appearance: 'a "Xenophilus" (often read as a cynocephalus, a dog-headed figure)', offices: 'telling past and future, answering questions, reconciling friendships and conferring honour' },
  { n: 12, id: 'sitri', name: 'Sitri', aliases: ['Sytry', 'Bitru'], rank: ['Prince'], appearance: 'a figure with a leopard\'s head and griffin\'s wings who then takes a beautiful human form', offices: 'inflaming love between men and women' },
  { n: 13, id: 'beleth', name: 'Beleth', aliases: ['Byleth', 'Bileth'], rank: ['King'], appearance: 'a rider on a pale horse, preceded by trumpets and music', offices: 'causing love between men and women' },
  { n: 14, id: 'leraje', name: 'Leraje', aliases: ['Leraikha', 'Loray', 'Oray'], rank: ['Marquis'], appearance: 'an archer clad in green', offices: 'causing battles and making arrow-wounds putrefy' },
  { n: 15, id: 'eligos', name: 'Eligos', aliases: ['Eligor', 'Abigor'], rank: ['Duke'], appearance: 'a knight carrying a lance, an ensign and a serpent', offices: 'discovering hidden things, knowing the outcome of wars, and winning the favour of lords' },
  { n: 16, id: 'zepar', name: 'Zepar', aliases: [], rank: ['Duke'], appearance: 'a soldier in red apparel and armour', offices: 'inflaming love — and, in the same text, causing barrenness' },
  { n: 17, id: 'botis', name: 'Botis', aliases: ['Otis'], rank: ['President', 'Earl'], appearance: 'an ugly viper, then a man with great teeth and two horns carrying a sword', offices: 'telling past and future and reconciling friends and foes' },
  { n: 18, id: 'bathin', name: 'Bathin', aliases: ['Bathym', 'Marthim'], rank: ['Duke'], appearance: 'a strong man with a serpent\'s tail riding a pale horse', offices: 'knowing the virtues of herbs and stones and transporting people from place to place' },
  { n: 19, id: 'sallos', name: 'Sallos', aliases: ['Saleos', 'Zaleos'], rank: ['Duke'], appearance: 'a gallant soldier with a ducal crown riding a crocodile, "of a peaceable nature"', offices: 'causing love between men and women' },
  { n: 20, id: 'purson', name: 'Purson', aliases: ['Curson', 'Pursan'], rank: ['King'], appearance: 'a man with a lion\'s face carrying a viper and riding a bear, preceded by trumpets', offices: 'knowing hidden things and treasure, telling past and future, and giving good familiars' },
  { n: 21, id: 'marax', name: 'Marax', aliases: ['Morax', 'Foraii'], rank: ['Earl', 'President'], appearance: 'a great bull with a man\'s face', offices: 'teaching astronomy, the liberal sciences and the virtues of herbs and stones' },
  { n: 22, id: 'ipos', name: 'Ipos', aliases: ['Ipes', 'Ayperos'], rank: ['Earl', 'Prince'], appearance: 'an angel with a lion\'s head, goose\'s feet and a hare\'s tail', offices: 'telling past and future and making people witty and bold' },
  { n: 23, id: 'aim', name: 'Aim', aliases: ['Haborym', 'Aym'], rank: ['Duke'], appearance: 'a man with three heads (serpent, man, calf) riding a viper and carrying a firebrand', offices: 'setting cities and castles on fire, making people witty, and giving true answers' },
  { n: 24, id: 'naberius', name: 'Naberius', aliases: ['Naberus', 'Cerberus'], rank: ['Marquis'], appearance: 'a black crane fluttering about the circle', offices: 'making people cunning in the arts — especially rhetoric — and restoring lost dignities' },
  { n: 25, id: 'glasya-labolas', name: 'Glasya-Labolas', aliases: ['Caacrinolaas', 'Caassimolar', 'Glassia-Labolis'], rank: ['President', 'Earl'], appearance: 'a dog with griffin\'s wings', offices: 'teaching arts and sciences, telling past and future, and being "author of bloodshed and manslaughter"' },
  { n: 26, id: 'bune', name: 'Buné', aliases: ['Bune', 'Bimé', 'Bim'], rank: ['Duke'], appearance: 'a dragon with three heads — dog, griffin and man', offices: 'making people rich, wise and eloquent, and moving the dead from their places' },
  { n: 27, id: 'ronove', name: 'Ronové', aliases: ['Ronove', 'Ronobe', 'Ronwe'], rank: ['Marquis', 'Earl'], appearance: 'a monster (no further description)', offices: 'teaching rhetoric and languages and winning favour with friends and foes' },
  { n: 28, id: 'berith', name: 'Berith', aliases: ['Beale', 'Beal', 'Bolfri', 'Bofry'], rank: ['Duke'], appearance: 'a soldier in red riding a red horse, wearing a golden crown', offices: 'telling past, present and future and turning metals into gold; the text warns he is "a great liar"', origin: 'Often connected with Baal-Berith ("lord of the covenant"), worshipped at Shechem in Judges 8:33 and 9:4; the link is plausible but not documented in the grimoire.' },
  { n: 29, id: 'astaroth', name: 'Astaroth', aliases: ['Ashtaroth'], rank: ['Duke'], appearance: 'a "hurtful angel" riding an infernal dragon and holding a viper', offices: 'answering truly of past, present and future, discovering secrets and teaching the liberal sciences', origin: 'Name descends from Ashtoreth/Astarte, a Levantine goddess condemned in 1 Kings 11:5.' },
  { n: 30, id: 'forneus', name: 'Forneus', aliases: [], rank: ['Marquis'], appearance: 'a great sea-monster', offices: 'teaching rhetoric and languages, giving a good name, and making people loved by their enemies' },
  { n: 31, id: 'foras', name: 'Foras', aliases: ['Forcas', 'Forras'], rank: ['President'], appearance: 'a strong man', offices: 'teaching the virtues of herbs and stones, logic and ethics, making people invisible and long-lived, and discovering treasure' },
  { n: 32, id: 'asmodeus', name: 'Asmoday', aliases: ['Asmodeus', 'Asmodai', 'Sidonay', 'Ashmedai'], rank: ['King'], appearance: 'a figure with three heads (bull, man, ram), a serpent\'s tail and goose\'s feet, riding a dragon', offices: 'teaching arithmetic, geometry, astronomy and mechanics, and revealing treasures', origin: 'The demon Asmodeus of the Book of Tobit and the Talmud (Ashmedai), probably from Avestan Aēšma-daēva.' },
  { n: 33, id: 'gaap', name: 'Gäap', aliases: ['Gaap', 'Tap', 'Goap'], rank: ['President', 'Prince'], appearance: 'a human form appearing when the Sun is in the southern signs, preceded by four great kings', offices: 'teaching philosophy and the liberal sciences, causing love or hatred, and carrying people from place to place' },
  { n: 34, id: 'furfur', name: 'Furfur', aliases: ['Furtur'], rank: ['Earl'], appearance: 'a hart with a fiery tail, later an angel', offices: 'causing love between man and woman and raising thunder, lightning and storms; said to lie unless constrained' },
  { n: 35, id: 'marchosias', name: 'Marchosias', aliases: [], rank: ['Marquis'], appearance: 'a wolf with griffin\'s wings and a serpent\'s tail breathing fire', offices: 'fighting strongly; said to hope to return to the Seventh Throne after 1,200 years' },
  { n: 36, id: 'stolas', name: 'Stolas', aliases: ['Stolos'], rank: ['Prince'], appearance: 'a mighty raven (later illustrations make it an owl), then a man', offices: 'teaching astronomy and the virtues of herbs and precious stones' },
  { n: 37, id: 'phenex', name: 'Phenex', aliases: ['Pheynix', 'Phoenix'], rank: ['Marquis'], appearance: 'a phoenix with a child\'s voice', offices: 'speaking of the sciences and being "an excellent poet"; said to hope to return to the Seventh Throne' },
  { n: 38, id: 'halphas', name: 'Halphas', aliases: ['Malthus', 'Malthas'], rank: ['Earl'], appearance: 'a stock-dove speaking with a hoarse voice', offices: 'building towers, furnishing them with weapons, and sending men-of-war to appointed places' },
  { n: 39, id: 'malphas', name: 'Malphas', aliases: [], rank: ['President'], appearance: 'a crow, then a man with a hoarse voice', offices: 'building houses and high towers and destroying enemies\' buildings; the text warns he deceives those who deal with him' },
  { n: 40, id: 'raum', name: 'Räum', aliases: ['Raum', 'Raim', 'Raym'], rank: ['Earl'], appearance: 'a crow', offices: 'stealing treasure from kings\' houses, destroying cities and dignities, and telling past and future' },
  { n: 41, id: 'focalor', name: 'Focalor', aliases: ['Forcalor', 'Furcalor'], rank: ['Duke'], appearance: 'a man with griffin\'s wings', offices: 'drowning men and overturning warships, with power over winds and seas; said to hope to return to the Seventh Throne' },
  { n: 42, id: 'vepar', name: 'Vepar', aliases: ['Separ'], rank: ['Duke'], appearance: 'a mermaid', offices: 'governing the waters, guiding ships laden with arms, and raising storms at sea' },
  { n: 43, id: 'sabnock', name: 'Sabnock', aliases: ['Sabnach', 'Savnok', 'Saburac'], rank: ['Marquis'], appearance: 'an armed soldier with a lion\'s head riding a pale horse', offices: 'building towers, castles and cities and furnishing them with armour' },
  { n: 44, id: 'shax', name: 'Shax', aliases: ['Chax', 'Shass', 'Scox'], rank: ['Marquis'], appearance: 'a stock-dove speaking with a hoarse, subtle voice', offices: 'taking away sight, hearing or understanding, and stealing money and horses; said to lie unless constrained' },
  { n: 45, id: 'vine', name: 'Viné', aliases: ['Vine', 'Vinea'], rank: ['King', 'Earl'], appearance: 'a lion riding a black horse and holding a viper', offices: 'discovering hidden things and witches, building towers, overthrowing walls and stirring up the waters' },
  { n: 46, id: 'bifrons', name: 'Bifrons', aliases: ['Bifrovs', 'Bifröns'], rank: ['Earl'], appearance: 'a monster, then a man', offices: 'teaching astrology, geometry and the virtues of stones and woods, and moving corpses from their graves' },
  { n: 47, id: 'vual', name: 'Vual', aliases: ['Uvall', 'Voval', 'Wal'], rank: ['Duke'], appearance: 'a mighty dromedary, then a man speaking Egyptian', offices: 'procuring the love of women, telling past and future, and making friendship between foes' },
  { n: 48, id: 'haagenti', name: 'Haagenti', aliases: [], rank: ['President'], appearance: 'a mighty bull with griffin\'s wings', offices: 'making people wise and transmuting metals into gold and wine into water' },
  { n: 49, id: 'crocell', name: 'Crocell', aliases: ['Procel', 'Pucel', 'Crokel'], rank: ['Duke'], appearance: 'an angel', offices: 'speaking mystically of hidden things, teaching geometry, and making a noise like rushing waters' },
  { n: 50, id: 'furcas', name: 'Furcas', aliases: [], rank: ['Knight'], appearance: 'a cruel old man with a long beard riding a pale horse and carrying a sharp weapon', offices: 'teaching philosophy, astronomy, rhetoric, logic, chiromancy and pyromancy' },
  { n: 51, id: 'balam', name: 'Balam', aliases: [], rank: ['King'], appearance: 'a figure with three heads (bull, man, ram) and flaming eyes, riding a bear and carrying a goshawk', offices: 'answering of past, present and future and making people invisible and witty' },
  { n: 52, id: 'alloces', name: 'Alloces', aliases: ['Allocen', 'Alocer'], rank: ['Duke'], appearance: 'a soldier with a red lion\'s face and flaming eyes on a great horse', offices: 'teaching astronomy and the liberal sciences and bringing good familiars' },
  { n: 53, id: 'camio', name: 'Camio', aliases: ['Caim'], rank: ['President'], appearance: 'a thrush, then a man holding a sharp sword', offices: 'giving understanding of the songs of birds, the voices of animals and the sound of waters, and telling the future' },
  { n: 54, id: 'murmur', name: 'Murmur', aliases: ['Murmus'], rank: ['Duke', 'Earl'], appearance: 'a warrior with a ducal crown riding a griffin, preceded by trumpets', offices: 'teaching philosophy and compelling the souls of the dead to answer questions' },
  { n: 55, id: 'orobas', name: 'Orobas', aliases: [], rank: ['Prince'], appearance: 'a horse, then a man', offices: 'telling past and future, giving dignities, and answering truly about divinity and creation; said to be faithful and to protect from other spirits' },
  { n: 56, id: 'gremory', name: 'Gremory', aliases: ['Gamori', 'Gemory'], rank: ['Duke'], appearance: 'a beautiful woman with a duchess\'s crown riding a camel', offices: 'telling past and future, revealing hidden treasure, and procuring the love of women' },
  { n: 57, id: 'ose', name: 'Osé', aliases: ['Ose', 'Oze', 'Voso'], rank: ['President'], appearance: 'a leopard, then a man', offices: 'teaching the liberal sciences, answering of divine and secret things, and making a person believe they have changed shape' },
  { n: 58, id: 'amy', name: 'Amy', aliases: ['Avnas'], rank: ['President'], appearance: 'a flaming fire, then a man', offices: 'teaching astrology and the liberal sciences and revealing treasures kept by spirits' },
  { n: 59, id: 'orias', name: 'Orias', aliases: ['Oriax'], rank: ['Marquis'], appearance: 'a lion with a serpent\'s tail riding a strong horse and holding two serpents', offices: 'teaching the virtues of the stars and planets, transforming people, and conferring dignities' },
  { n: 60, id: 'vapula', name: 'Vapula', aliases: ['Naphula'], rank: ['Duke'], appearance: 'a lion with griffin\'s wings', offices: 'teaching handicrafts, professions, philosophy and the sciences' },
  { n: 61, id: 'zagan', name: 'Zagan', aliases: [], rank: ['King', 'President'], appearance: 'a bull with griffin\'s wings, then a man', offices: 'making people witty, turning wine into water and water into wine, and turning metals into coin' },
  { n: 62, id: 'volac', name: 'Volac', aliases: ['Valac', 'Valak', 'Valu', 'Ualac'], rank: ['President'], appearance: 'a child with angel\'s wings riding a two-headed dragon', offices: 'answering truly of hidden treasures and revealing where serpents may be found' },
  { n: 63, id: 'andras', name: 'Andras', aliases: [], rank: ['Marquis'], appearance: 'an angel with the head of a night-raven riding a black wolf and holding a sword', offices: 'sowing discord; the text warns he can kill the unwary' },
  { n: 64, id: 'haures', name: 'Haures', aliases: ['Hauras', 'Havres', 'Flauros'], rank: ['Duke'], appearance: 'a leopard, then a man with fiery eyes', offices: 'answering of past, present and future, speaking of creation and the fall of spirits, and destroying enemies by fire' },
  { n: 65, id: 'andrealphus', name: 'Andrealphus', aliases: [], rank: ['Marquis'], appearance: 'a peacock with great noises, then a man', offices: 'teaching geometry, measurement and astronomy and turning people into the likeness of birds' },
  { n: 66, id: 'cimejes', name: 'Cimejes', aliases: ['Cimeies', 'Kimaris'], rank: ['Marquis'], appearance: 'a valiant warrior riding a black horse', offices: 'ruling spirits "in the parts of Africa", teaching grammar, logic and rhetoric, and finding lost things' },
  { n: 67, id: 'amdusias', name: 'Amdusias', aliases: ['Amduscias', 'Amdukias'], rank: ['Duke'], appearance: 'a unicorn, then a man', offices: 'causing music to be heard without visible instruments and making trees bend' },
  { n: 68, id: 'belial', name: 'Belial', aliases: ['Beliall', 'Beliar'], rank: ['King'], appearance: 'two beautiful angels sitting in a chariot of fire', offices: 'distributing preferments and winning favour; said to have been created next after Lucifer', origin: 'Hebrew beliyya‘al ("worthlessness") in the Bible, personified as a ruler of evil in the Dead Sea Scrolls and 2 Corinthians 6:15.' },
  { n: 69, id: 'decarabia', name: 'Decarabia', aliases: ['Carabia'], rank: ['Marquis'], appearance: 'a star in a pentacle, then a man', offices: 'knowing the virtues of birds and precious stones and making the likeness of birds fly' },
  { n: 70, id: 'seere', name: 'Seere', aliases: ['Sear', 'Seir'], rank: ['Prince'], appearance: 'a beautiful man on a winged horse', offices: 'bringing things to pass suddenly and carrying anything anywhere; described as "of a good nature"', weyer: false },
  { n: 71, id: 'dantalion', name: 'Dantalion', aliases: [], rank: ['Duke'], appearance: 'a man with many faces of men and women, holding a book', offices: 'teaching arts and sciences, knowing and changing people\'s thoughts, and causing love', weyer: false },
  { n: 72, id: 'andromalius', name: 'Andromalius', aliases: [], rank: ['Earl'], appearance: 'a man holding a great serpent', offices: 'bringing back thieves and stolen goods and uncovering wickedness and hidden treasure', weyer: false },
];
