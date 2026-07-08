// Builds Sacred Systems Library card objects (the {id, title, icon, category,
// color, summary, overview, keyIdeas, practice, cautions} shape used by
// SacredSystemsAtlas.jsx) from the raw astrology and numerology data.
import {
  planets, signs, houses, aspects, formulas, angles,
  dignityTerms, dignityTable, configurations, glossary,
} from './astrologyData';
import {
  NUMBER_MEANINGS, concepts as numerologyConcepts,
} from './numerologyData';

const ASTRO_COLOR = 'rgba(126,231,255,.20)';
const NUM_COLOR = 'rgba(255,212,121,.20)';

const GENERIC_ASTRO_PRACTICE = (example) => [
  'Notice where this placement or theme shows up in your own life, even loosely.',
  example ? `Reflect on an example reading: "${example}"` : 'Reflect on how this theme tends to play out for you.',
  'Journal one way this energy already shows up in your daily behavior.',
  'Treat the placement as a mirror for self-understanding, not a fixed verdict.',
];
const GENERIC_ASTRO_CAUTION = 'Astrology works best as a symbolic, reflective language. Treat any single placement as one piece of a much larger picture, not a complete or deterministic description of a person.';

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const planetCards = planets.map((p) => ({
  id: `astro-planet-${p.name.toLowerCase()}`,
  title: `${p.symbol} ${p.name}`,
  icon: '🪐',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: p.meaning,
  overview: [
    p.beginner,
    p.deeper,
    p.myth ? `Myth: ${p.myth}` : null,
    p.shadow ? `Shadow: ${p.shadow}` : null,
    p.body ? `Body: ${p.body}` : null,
    p.retrograde ? `Retrograde: ${p.retrograde}` : null,
  ].filter(Boolean).join(' '),
  keyIdeas: [
    `Keywords: ${p.keywords}`,
    `Symbolic bridge: ${p.symbolicBridge}`,
    `Metal correspondence: ${p.metal} (${p.metalSymbol}) — ${p.metalMeaning}`,
    `Example: ${p.example}`,
    ...p.houses.map((h, i) => `${ordinal(i + 1)} House: ${h}`),
  ],
  practice: GENERIC_ASTRO_PRACTICE(p.example),
  cautions: p.watch,
}));

const signCards = signs.map((s) => ({
  id: `astro-sign-${s.name.toLowerCase()}`,
  title: `${s.symbol} ${s.name}`,
  icon: '✨',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: s.meaning,
  overview: `${s.beginner} ${s.deeper}`,
  keyIdeas: [
    `Element: ${s.element}`,
    `Modality: ${s.modality}`,
    `Ruler: ${s.ruler}`,
    `Keywords: ${s.keywords}`,
    `Example: ${s.example}`,
    ...s.decans.map((d) => `${d.range} decan: ${d.subSign} (${d.subRuler}) — ${d.theme}`),
  ],
  practice: GENERIC_ASTRO_PRACTICE(s.example),
  cautions: s.watch,
}));

const houseCards = houses.map((h) => ({
  id: `astro-house-${h.symbol}`,
  title: `House ${h.symbol}: ${h.modernTitle}`,
  icon: '🏛️',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: h.meaning,
  overview: `${h.beginner} ${h.deeper}`,
  keyIdeas: [
    `Latin: ${h.latin} (${h.latinMeaning})`,
    `Modern title: ${h.modernTitle}`,
    `Keywords: ${h.keywords}`,
    `Example: ${h.example}`,
  ],
  practice: GENERIC_ASTRO_PRACTICE(h.example),
  cautions: h.watch,
}));

const aspectCards = aspects.map((a) => ({
  id: `astro-aspect-${a.name.toLowerCase()}`,
  title: `${a.symbol} ${a.name}`,
  icon: '🔗',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: a.meaning,
  overview: `${a.beginner} ${a.deeper}`,
  keyIdeas: [
    `Keywords: ${a.keywords}`,
    `Example: ${a.example}`,
  ],
  practice: GENERIC_ASTRO_PRACTICE(a.example),
  cautions: a.watch,
}));

const formulaCards = formulas.map((f) => ({
  id: `astro-formula-${f.name.toLowerCase().replace(/\s+/g, '-')}`,
  title: f.title,
  icon: '🧮',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: f.subtitle,
  overview: f.sections.map(([heading, body]) => `${heading}: ${body}`).join(' '),
  keyIdeas: f.sections.map(([heading, body]) => `${heading}: ${body}`),
  practice: [
    'Pick a placement you already know (planet, sign, house) and walk it through this formula step by step.',
    'Write out each layer in plain language before combining them into one sentence.',
    'Use the worked example as a template for your own reading.',
  ],
  cautions: 'Treat any chart formula as a structured starting point for interpretation, not a mechanical formula that produces a single correct answer.',
}));

const angleCards = angles.map((a) => {
  const watchSection = a.sections.find(([heading]) => /watch/i.test(heading));
  return {
    id: `astro-angle-${a.name.toLowerCase()}`,
    title: `${a.symbol} ${a.name} (${a.abbr})`,
    icon: '📐',
    category: 'Astrology',
    color: ASTRO_COLOR,
    summary: a.sections[0]?.[1] || a.keywords,
    overview: a.sections.map(([heading, body]) => `${heading}: ${body}`).join(' '),
    keyIdeas: [
      `Abbreviation: ${a.abbr}`,
      `Keywords: ${a.keywords}`,
      ...a.sections.map(([heading, body]) => `${heading}: ${body}`),
    ],
    practice: GENERIC_ASTRO_PRACTICE(),
    cautions: watchSection ? watchSection[1] : GENERIC_ASTRO_CAUTION,
  };
});

const dignityTermCards = dignityTerms.map((d) => {
  const watchSection = d.sections.find(([heading]) => /watch/i.test(heading));
  return {
    id: `astro-dignity-${d.name.toLowerCase()}`,
    title: `${d.symbol} ${d.name}`,
    icon: '⚖️',
    category: 'Astrology',
    color: ASTRO_COLOR,
    summary: d.sections[0]?.[1] || d.keywords,
    overview: d.sections.map(([heading, body]) => `${heading}: ${body}`).join(' '),
    keyIdeas: [
      `Keywords: ${d.keywords}`,
      ...d.sections.map(([heading, body]) => `${heading}: ${body}`),
    ],
    practice: GENERIC_ASTRO_PRACTICE(),
    cautions: watchSection ? watchSection[1] : GENERIC_ASTRO_CAUTION,
  };
});

const dignityTableCard = {
  id: 'astro-dignity-table',
  title: 'Dignity Reference Table',
  icon: '📊',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: 'A quick-reference table showing each planet\'s domicile, detriment, exaltation, and fall signs.',
  overview: 'Essential dignity describes how comfortably a planet operates in a given sign: at home in its domicile, honored in its exaltation, or working against the grain in its detriment or fall. Outer planets (Uranus, Neptune, Pluto) only have modern domicile/detriment assignments and no traditional exaltation or fall.',
  keyIdeas: dignityTable.map((row) => `${row.symbol} ${row.planet}: Domicile ${row.domicile} · Detriment ${row.detriment} · Exaltation ${row.exaltation} · Fall ${row.fall}`),
  practice: [
    'Look up any planet in your own chart and find its dignity status using this table.',
    'Read the matching Domicile/Detriment/Exaltation/Fall card for the fuller meaning.',
    'Notice that dignity is a layer of nuance, not a verdict on a placement\'s overall worth.',
  ],
  cautions: GENERIC_ASTRO_CAUTION,
};

const configurationCards = configurations.map((c) => {
  const watchSection = c.sections.find(([heading]) => /watch/i.test(heading));
  return {
    id: `astro-configuration-${c.name.toLowerCase()}`,
    title: `${c.symbol} ${c.name}`,
    icon: '🌌',
    category: 'Astrology',
    color: ASTRO_COLOR,
    summary: c.sections[0]?.[1] || c.keywords,
    overview: c.sections.map(([heading, body]) => `${heading}: ${body}`).join(' '),
    keyIdeas: [
      `Keywords: ${c.keywords}`,
      ...c.sections.map(([heading, body]) => `${heading}: ${body}`),
    ],
    practice: GENERIC_ASTRO_PRACTICE(),
    cautions: watchSection ? watchSection[1] : GENERIC_ASTRO_CAUTION,
  };
});

const glossaryCard = {
  id: 'astro-glossary',
  title: 'Astrology Glossary',
  icon: '📖',
  category: 'Astrology',
  color: ASTRO_COLOR,
  summary: 'Core astrology vocabulary — planet, sign, house, aspect, and the alchemical metal correspondences — in one place.',
  overview: 'These are the foundational terms used throughout the astrology cards in this library. Keep this glossary handy while reading planet, sign, house, and aspect cards.',
  keyIdeas: glossary.map(([term, definition]) => `${term}: ${definition}`),
  practice: [
    'Skim this glossary before reading any other astrology card for the first time.',
    'Return here whenever an unfamiliar term comes up elsewhere in the library.',
  ],
  cautions: GENERIC_ASTRO_CAUTION,
};

export const astrologyCards = [
  ...planetCards,
  ...signCards,
  ...houseCards,
  ...aspectCards,
  ...formulaCards,
  ...angleCards,
  ...dignityTermCards,
  dignityTableCard,
  ...configurationCards,
  glossaryCard,
];

const GENERIC_NUMEROLOGY_CAUTION = 'Numbers are used here as a mirror for reflection, not as a fixed destiny. Let any insight lead to one small, grounded action rather than a label.';

function numberMeaningLines(meanings, yearThemes) {
  return meanings.map((n) => {
    const meaning = NUMBER_MEANINGS[n];
    const text = yearThemes?.[n] || meaning.text;
    return `${n} — ${meaning.title}: ${text}`;
  });
}

const numerologyNarrativeCards = numerologyConcepts
  .filter((c) => c.type === 'meaning' || c.type === 'angel')
  .map((c) => {
    const keyIdeas = c.type === 'angel'
      ? c.items.map((item) => `${item.num} — ${item.title}: ${item.note}`)
      : numberMeaningLines(c.meanings, c.yearThemes);
    if (c.letterChart) {
      keyIdeas.unshift('Letter → number chart: A/J/S=1, B/K/T=2, C/L/U=3, D/M/V=4, E/N/W=5, F/O/X=6, G/P/Y=7, H/Q/Z=8, I/R=9.');
    }
    return {
      id: `num-${c.id}`,
      title: c.label,
      icon: '🔢',
      category: 'Numerology',
      color: NUM_COLOR,
      summary: c.short,
      overview: `${c.intro} ${c.explanation}`,
      keyIdeas,
      practice: [
        ...(c.howTo || []),
        ...(c.prompts || []),
      ],
      cautions: GENERIC_NUMEROLOGY_CAUTION,
    };
  });

const calculatorConcept = numerologyConcepts.find((c) => c.id === 'calculator');
const lifePath = numerologyConcepts.find((c) => c.id === 'life-path');
const expression = numerologyConcepts.find((c) => c.id === 'expression');
const soulUrge = numerologyConcepts.find((c) => c.id === 'soul-urge');
const personality = numerologyConcepts.find((c) => c.id === 'personality');
const birthday = numerologyConcepts.find((c) => c.id === 'birthday');

const calculatorCard = {
  id: 'num-calculator',
  title: calculatorConcept.label,
  icon: '🧮',
  category: 'Numerology',
  color: NUM_COLOR,
  summary: calculatorConcept.short,
  overview: 'Calculate your core numerology numbers by hand using simple addition: Life Path and Birthday come from your birth date, while Expression, Soul Urge, and Personality come from the letters of your full birth name.',
  keyIdeas: [
    'Life Path = every digit of your birth date, added and reduced.',
    'Birthday = the day of the month you were born, reduced.',
    'Expression / Destiny = every letter of your full name, converted to numbers and reduced.',
    'Soul Urge = only the vowels in your full name, converted and reduced.',
    'Personality = only the consonants in your full name, converted and reduced.',
    'Master numbers 11, 22, and 33 are kept unreduced wherever they appear.',
  ],
  practice: [
    ...lifePath.howTo,
    ...birthday.howTo,
    ...expression.howTo,
    ...soulUrge.howTo,
    ...personality.howTo,
  ],
  cautions: GENERIC_NUMEROLOGY_CAUTION,
};

const journalConcept = numerologyConcepts.find((c) => c.id === 'journal');
const journalCard = {
  id: 'num-journal',
  title: journalConcept.label,
  icon: '📓',
  category: 'Numerology',
  color: NUM_COLOR,
  summary: journalConcept.short,
  overview: 'When a number stands out, note it down. The point isn\'t to prove the number means something — it\'s to notice your own mind: what you were feeling, what story you attached, and what grounded step you can take.',
  keyIdeas: [
    'Numbers I noticed today — e.g. 11:11, 333, a repeated 7.',
    'What was happening when I saw it — where I was, what I was thinking about.',
    'What meaning did I project onto it — the story or feeling I attached to it.',
    'What grounded action can I take — one small, real-world next step.',
  ],
  practice: [
    'Write down any repeated number you notice during your day.',
    'Note the context: where you were and what was on your mind.',
    'Name the meaning or story you projected onto the number.',
    'Choose one small, grounded action the reflection points toward.',
  ],
  cautions: GENERIC_NUMEROLOGY_CAUTION,
};

export const numerologyCards = [
  ...numerologyNarrativeCards,
  calculatorCard,
  journalCard,
];

export const ASTROLOGY_KEYWORDS = ['planets', 'signs', 'houses', 'aspects', 'natal chart', 'symbolism'];
export const NUMEROLOGY_KEYWORDS = ['life path', 'numbers', 'name', 'reflection', 'journaling', 'symbolism'];

function uniqueTags(values) {
  return [...new Set(values
    .flatMap((value) => String(value || '').toLowerCase().split(/[^a-z0-9+-]+/))
    .filter((value) => value.length > 2)
    .slice(0, 18))];
}

function toSearchEntry(card, portalId, lens = 'Symbolic') {
  return {
    id: card.id,
    portalId,
    section: card.id,
    title: card.title,
    summary: card.summary,
    tags: uniqueTags([
      card.title,
      card.category,
      card.summary,
      card.overview,
      ...(card.keyIdeas || []),
      ...(card.category === 'Astrology' ? ['astrology', 'natal chart', 'birth chart'] : []),
      ...(card.category === 'Numerology' ? ['numerology', 'number symbolism'] : []),
    ]),
    lens,
  };
}

export const sacredSystemsSearchEntries = [
  ...astrologyCards.map((card) => toSearchEntry(card, 'astrology')),
  ...numerologyCards.map((card) => toSearchEntry(card, 'numerology')),
];
