import { useCallback, useEffect, useMemo, useState } from 'react';
import './SacredSystemsAtlas.css';
import { astrologyCards, numerologyCards, ASTROLOGY_KEYWORDS, NUMEROLOGY_KEYWORDS } from './data/sacredSystemsCards';

const PLANET_NAMES = new Set([
  'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
]);
const NUMEROLOGY_SECTION_IDS = new Set([
  'life-path', 'expression', 'soul-urge', 'personality', 'birthday',
  'angel-numbers', 'personal-year', 'calculator', 'journal',
]);

const handwrittenConcepts = [
  {
    id: 'crystals-overview',
    title: 'Crystals: Overview',
    icon: '💎',
    category: 'Crystals',
    color: 'rgba(126,231,255,.22)',
    summary: 'Crystals are natural mineral formations used in spiritual and wellness traditions as symbols, tools, and energetic anchors.',
    overview: 'In spiritual practice, crystals are often treated as physical objects that help focus intention. Their beauty, weight, color, texture, and structure can make abstract inner work feel more tangible. A crystal can become a reminder, meditation object, altar piece, journaling anchor, or symbolic tool for emotional focus.',
    keyIdeas: [
      'Crystals are commonly used as intention anchors rather than guaranteed healing devices.',
      'Their color, shape, and mineral identity are often connected to symbolic meanings.',
      'They can support ritual, mindfulness, meditation, prayer, and personal reflection.',
      'Different traditions assign different energetic meanings to the same crystal.',
    ],
    practice: [
      'Choose one crystal based on the feeling or quality you want to cultivate.',
      'Hold it while taking slow breaths and name your intention clearly.',
      'Place it somewhere visible so it reminds you of the state you are practicing.',
      'Journal what the crystal represents to you rather than forcing a fixed meaning.',
    ],
    cautions: 'Avoid treating crystals as a replacement for medical care, therapy, financial decisions, or direct action. They are best used as symbolic and reflective tools.',
  },
  {
    id: 'crystal-usage',
    title: 'Crystal Usage',
    icon: '🕯️',
    category: 'Crystals',
    color: 'rgba(255,212,121,.22)',
    summary: 'Crystal usage includes meditation, grids, altar work, carrying stones, room placement, intention-setting, and ritual design.',
    overview: 'The most useful way to approach crystal work is to connect the object to a clear inner purpose. Instead of asking the crystal to do everything, you use it as a physical cue for attention, emotion, and repetition. This turns the stone into a ritual interface.',
    keyIdeas: [
      'Meditation: hold or gaze at a crystal while breathing slowly.',
      'Carrying: keep a crystal in your pocket as a reminder of an intention.',
      'Altars: place crystals with candles, notes, symbols, or photos.',
      'Grids: arrange crystals into geometric patterns to symbolize focused energy.',
      'Home placement: use crystals as environmental anchors for calm, beauty, or focus.',
    ],
    practice: [
      'Pick one intention, such as calm, protection, clarity, love, or devotion.',
      'Choose a stone that symbolically matches that intention.',
      'Create a simple ritual: breathe, state the intention, and place the stone.',
      'Repeat daily for a week and notice whether your behavior changes.',
    ],
    cautions: 'The power of the practice comes from awareness, consistency, and meaning. Do not rely on objects alone while avoiding real-world choices.',
  },
  {
    id: 'crystal-shapes',
    title: 'Crystal Shapes',
    icon: '🔺',
    category: 'Crystals',
    color: 'rgba(183,140,255,.24)',
    summary: 'Crystal shapes are often interpreted as directing, radiating, grounding, or holding energy in different ways.',
    overview: 'Shape changes the way a crystal is experienced. A point feels directional, a sphere feels whole, a cluster feels radiant, and a palm stone feels intimate. Whether or not someone believes in literal energy flow, shape strongly affects symbolism and ritual design.',
    keyIdeas: [
      'Point: direction, focus, amplification, intention.',
      'Sphere: wholeness, unity, balance, completion.',
      'Cluster: radiance, community, shared energy, environmental clearing.',
      'Pyramid: structure, ascension, stability, sacred geometry.',
      'Wand: movement, directing attention, ceremonial use.',
      'Palm stone: comfort, grounding, personal reflection.',
    ],
    practice: [
      'Use a point when you want focus or direction.',
      'Use a sphere when you want integration or emotional balance.',
      'Use a cluster for a room, altar, or shared space.',
      'Use a palm stone when you need something tactile and grounding.',
    ],
    cautions: 'Do not overcomplicate shape meanings. The best shape is often the one that helps you remember the state you are cultivating.',
  },
  {
    id: 'crystal-types',
    title: 'Crystal Types',
    icon: '🌈',
    category: 'Crystals',
    color: 'rgba(255,143,199,.22)',
    summary: 'Common crystal types include clear quartz, amethyst, rose quartz, black tourmaline, citrine, selenite, and obsidian.',
    overview: 'Crystal types are often grouped by color, mineral family, and traditional meaning. The meanings below are common in modern spiritual culture, but they vary by teacher, lineage, and personal experience.',
    keyIdeas: [
      'Clear quartz: clarity, amplification, focus.',
      'Amethyst: calm, intuition, spiritual reflection.',
      'Rose quartz: love, softness, compassion, emotional healing.',
      'Black tourmaline: grounding, protection, boundaries.',
      'Citrine: confidence, vitality, abundance symbolism.',
      'Selenite: clarity, cleansing, lightness.',
      'Obsidian: shadow work, truth, protection, emotional honesty.',
    ],
    practice: [
      'Start with one crystal instead of collecting many at once.',
      'Write down what the crystal represents to you.',
      'Use it for one clear purpose for seven days.',
      'Notice whether it supports your focus, behavior, or emotional awareness.',
    ],
    cautions: 'Some stones can be fragile, water-soluble, or unsafe in water. Research physical safety before making crystal water, elixirs, or body products.',
  },
  {
    id: 'orgone',
    title: 'Orgone',
    icon: '⚡',
    category: 'Crystals',
    color: 'rgba(157,255,181,.20)',
    summary: 'Orgone is a concept associated with Wilhelm Reich and later spiritual tools made from resin, metal, and crystals.',
    overview: 'Orgone is described in some spiritual communities as life-force energy. Modern orgone devices often combine resin, metal shavings, and crystals into pyramids, pendants, towers, or discs. In spiritual practice, people use them as symbolic harmonizers for spaces, meditation, and protection rituals.',
    keyIdeas: [
      'Traditional orgone theory is controversial and not accepted as mainstream science.',
      'Modern orgonite usually combines organic resin, inorganic metal, and crystals.',
      'Pyramids are popular because they combine orgone symbolism with sacred geometry.',
      'People use orgone tools for room energy, meditation, grounding, and intention work.',
    ],
    practice: [
      'Place an orgone piece on an altar or desk as a symbolic energetic anchor.',
      'Use it before meditation by stating what kind of energy you want to cultivate.',
      'Pair it with breathwork instead of treating it as a passive magic object.',
      'Clean the space physically too; symbolic clearing works better with real action.',
    ],
    cautions: 'Be careful with claims that orgone devices block radiation or cure illness. Treat them as spiritual or decorative tools unless strong evidence is provided.',
  },
  {
    id: 'sacred-geometry-crystals',
    title: 'Crystal Grids & Sacred Geometry',
    icon: '🕸️',
    category: 'Sacred Geometry',
    color: 'rgba(126,231,255,.18)',
    summary: 'Crystal grids combine stones with geometric layouts to focus intention into a symbolic energetic pattern.',
    overview: 'A crystal grid is a ritual design. The geometry gives structure, the crystals give symbolic qualities, and the intention gives direction. The grid becomes a visual map of what you are cultivating.',
    keyIdeas: [
      'Center stone: the main intention or core energy.',
      'Supporting stones: qualities that stabilize, protect, or amplify the center.',
      'Geometry: the pattern that organizes the ritual field.',
      'Activation: a symbolic action that marks the grid as intentional.',
    ],
    practice: [
      'Choose one intention, such as healing, devotion, clarity, or protection.',
      'Place one main stone in the center.',
      'Arrange supporting stones around it in a circle, triangle, hexagon, or Flower of Life pattern.',
      'Trace the pattern with your finger and speak the intention clearly.',
    ],
    cautions: 'A grid works best as a contemplative tool. It should not become a way to avoid communication, planning, boundaries, or real-world responsibility.',
  },
  {
    id: 'sacred-geometry-overview',
    title: 'Sacred Geometry',
    icon: '📐',
    category: 'Sacred Geometry',
    color: 'rgba(255,212,121,.18)',
    summary: 'Sacred geometry explores symbolic patterns such as circles, spirals, grids, triangles, and repeating forms found in nature and spiritual art.',
    overview: 'Sacred geometry is the study and use of meaningful shapes. It appears in architecture, religious art, mandalas, temples, altars, and meditative diagrams. Spiritually, geometry represents order, harmony, creation, proportion, and the hidden structure of reality.',
    keyIdeas: [
      'Circle: unity, wholeness, source, completion.',
      'Triangle: direction, manifestation, trinity, ascent.',
      'Square: stability, earth, foundation, structure.',
      'Spiral: evolution, growth, life cycles.',
      'Hexagon: harmony, integration, natural intelligence.',
    ],
    practice: [
      'Draw a simple circle and place an intention in the center.',
      'Add repeating shapes around it to represent support.',
      'Use the drawing as a meditation map.',
      'Notice what emotional meaning each shape carries for you.',
    ],
    cautions: 'Different traditions interpret the same symbols differently. Keep the meaning flexible rather than rigid.',
  },
  {
    id: 'genesis-pattern',
    title: 'Genesis Pattern',
    icon: '🌱',
    category: 'Sacred Geometry',
    color: 'rgba(157,255,181,.20)',
    summary: 'The Genesis Pattern is a sequence of overlapping circles that symbolically represents creation, expansion, and emergence.',
    overview: 'The Genesis Pattern begins with one circle and expands through repeated circles of the same size. It is often associated with the idea of creation unfolding from unity into multiplicity. The pattern is closely related to the Seed of Life and Flower of Life.',
    keyIdeas: [
      'One circle: source, origin, unity.',
      'Two circles: polarity, relationship, reflection.',
      'Multiple circles: creation, multiplication, complexity.',
      'The pattern symbolizes life emerging through repetition and relationship.',
    ],
    practice: [
      'Draw one circle and label it source.',
      'Add a second circle overlapping the first and label it relationship.',
      'Continue adding circles and reflect on what is being created in your life.',
      'Use the finished pattern as a meditation on beginnings.',
    ],
    cautions: 'Use the Genesis Pattern as symbolic reflection, not as a fixed historical or scientific model of the universe.',
  },
  {
    id: 'torus',
    title: 'Torus Field',
    icon: '🌀',
    category: 'Sacred Geometry',
    color: 'rgba(126,231,255,.22)',
    summary: 'The torus is a donut-like shape often used to symbolize circulating energy, breath, magnetism, and the flow between inner and outer worlds.',
    overview: 'In spiritual systems, the torus is used as a model of energy flowing from the center outward and returning back inward. It is often connected to the heart field, breath, magnetism, and the idea that life is a continuous circulation.',
    keyIdeas: [
      'Center: your inner source or heart point.',
      'Outflow: expression, giving, radiance.',
      'Inflow: receiving, nourishment, integration.',
      'Circulation: energy moving rather than becoming stuck.',
    ],
    practice: [
      'Sit upright and imagine your heart as the center point.',
      'On the inhale, imagine energy returning to the center.',
      'On the exhale, imagine energy radiating around you.',
      'Repeat gently without forcing visualization.',
    ],
    cautions: 'The torus can be used as a meditation image, but avoid making extreme claims about biology or physics unless you are using scientific sources.',
  },
  {
    id: 'flower-of-life',
    title: 'Flower of Life',
    icon: '🌸',
    category: 'Sacred Geometry',
    color: 'rgba(255,143,199,.24)',
    summary: 'The Flower of Life is a pattern of overlapping circles symbolizing interconnection, harmony, creation, and unity.',
    overview: 'The Flower of Life is one of the most recognized sacred geometry symbols. Its repeating circles create a web-like pattern that many people interpret as a visual symbol of interconnected life. It is often used in meditation, crystal grids, art, jewelry, and altar design.',
    keyIdeas: [
      'Repeating circles symbolize life multiplying from a single source.',
      'The pattern can represent unity within diversity.',
      'It is often used as a base for crystal grids.',
      'It visually expresses harmony, rhythm, and relationship.',
    ],
    practice: [
      'Place the Flower of Life image under a crystal grid.',
      'Put your main intention in the center.',
      'Place supporting stones along the circles.',
      'Meditate on how different parts of your life connect.',
    ],
    cautions: 'The symbol is powerful aesthetically and spiritually, but avoid claiming one universal meaning. Let it be a flexible map.',
  },
  {
    id: 'chakras-overview',
    title: 'Chakras Overview',
    icon: '🌈',
    category: 'Chakras',
    color: 'rgba(183,140,255,.24)',
    summary: 'Chakras are subtle energy centers used in yogic and spiritual systems to map physical, emotional, psychological, and spiritual themes.',
    overview: 'The chakra system is often used as an inner map. Each chakra represents a domain of life, from survival and safety to love, expression, intuition, and spiritual connection. In modern wellness culture, chakras are commonly used for meditation, self-reflection, yoga, breathwork, and emotional awareness.',
    keyIdeas: [
      'Root: safety, grounding, survival, belonging.',
      'Sacral: emotion, pleasure, creativity, intimacy.',
      'Solar plexus: confidence, will, identity, power.',
      'Heart: love, compassion, connection, forgiveness.',
      'Throat: voice, truth, expression, communication.',
      'Third eye: intuition, perception, imagination.',
      'Crown: spirituality, meaning, surrender, unity.',
    ],
    practice: [
      'Pick one chakra based on what feels most relevant.',
      'Ask what part of life that chakra represents.',
      'Breathe into that area of the body gently.',
      'Journal one action that would bring that area into balance.',
    ],
    cautions: 'Chakra work is not a substitute for medical diagnosis or mental health care. Use it as a reflection system.',
  },
  {
    id: 'chakra-activation',
    title: 'Chakra Activation',
    icon: '🔥',
    category: 'Chakras',
    color: 'rgba(255,212,121,.22)',
    summary: 'Activation means bringing awareness, breath, movement, sound, and intention to an energy center.',
    overview: 'Chakra activation does not have to be dramatic. It can simply mean becoming aware of a blocked, underused, or overactive life theme and gently restoring balance. Breathwork, sound, posture, journaling, and behavior changes can all be part of activation.',
    keyIdeas: [
      'Breath brings attention to the body.',
      'Movement helps shift stagnant emotional patterns.',
      'Sound can support expression and nervous system release.',
      'Intention gives the practice direction.',
      'Action grounds spiritual insight into daily life.',
    ],
    practice: [
      'Choose one chakra and one related quality.',
      'Breathe slowly while placing your attention on that body area.',
      'Use a short phrase, such as I am safe or I speak clearly.',
      'Take one real-world action that matches the chakra theme.',
    ],
    cautions: 'Avoid forcing intense experiences. Gentle, consistent work is usually more helpful than chasing dramatic sensations.',
  },
  {
    id: 'chakra-life-impact',
    title: 'Chakras & Life Impact',
    icon: '🧭',
    category: 'Chakras',
    color: 'rgba(157,255,181,.20)',
    summary: 'Chakras can be used as a life map for understanding patterns in safety, emotions, confidence, love, communication, intuition, and spirituality.',
    overview: 'When used practically, chakras become a self-awareness framework. A root chakra issue may look like instability or fear. A throat chakra issue may look like silence, people-pleasing, or unclear communication. A heart chakra issue may involve guardedness, grief, or difficulty receiving love.',
    keyIdeas: [
      'Root imbalance may show as anxiety, instability, or lack of grounding.',
      'Sacral imbalance may show as emotional numbness or chaotic desire.',
      'Solar plexus imbalance may show as low confidence or control issues.',
      'Heart imbalance may show as guardedness or overgiving.',
      'Throat imbalance may show as silence, dishonesty, or fear of expression.',
      'Third eye imbalance may show as confusion or overthinking.',
      'Crown imbalance may show as disconnection from meaning.',
    ],
    practice: [
      'Name the life area that feels most out of balance.',
      'Match it to a chakra theme.',
      'Ask what belief, behavior, or emotion needs attention.',
      'Create one grounded action to restore balance.',
    ],
    cautions: 'Do not label every struggle as a chakra issue. Sometimes practical changes, rest, boundaries, support, or professional help are needed.',
  },
  {
    id: 'thirteen-chakras',
    title: 'Thirteen Chakra System',
    icon: '✨',
    category: 'Chakras',
    color: 'rgba(183,140,255,.20)',
    summary: 'The thirteen chakra system expands beyond the traditional seven to include additional earth, soul, and cosmic centers.',
    overview: 'Some modern spiritual systems expand the chakra model to include centers below the feet and above the head. These are often used to describe deeper grounding, ancestral connection, soul purpose, higher guidance, and cosmic consciousness.',
    keyIdeas: [
      'Earth Star: grounding below the body, ancestral roots, earth connection.',
      'Root to Crown: the traditional seven-center system.',
      'Soul Star: higher self, soul purpose, spiritual memory.',
      'Universal or Galactic centers: cosmic awareness and expanded identity.',
      'The expanded model is symbolic and varies across teachers.',
    ],
    practice: [
      'Imagine a grounding point beneath your feet.',
      'Move awareness slowly up through the traditional seven chakras.',
      'Imagine a point of light above your head.',
      'Close by bringing awareness back into your body and feet.',
    ],
    cautions: 'Expanded chakra systems are not standardized. Use them as symbolic maps, not rigid universal rules.',
  },
  {
    id: 'pineal-gland',
    title: 'Pineal Gland',
    icon: '👁️',
    category: 'Pineal',
    color: 'rgba(126,231,255,.20)',
    summary: 'The pineal gland is a small brain structure linked biologically with melatonin and symbolically with the third eye.',
    overview: 'Biologically, the pineal gland helps regulate melatonin, which is connected to sleep-wake rhythms. Spiritually, many traditions associate it with inner sight, intuition, dreams, and expanded consciousness. This creates two lenses: the physical gland and the symbolic third eye.',
    keyIdeas: [
      'Physical lens: melatonin, sleep rhythms, light-dark cycles.',
      'Spiritual lens: intuition, inner vision, dream awareness, third eye symbolism.',
      'Lifestyle support: sleep hygiene, morning light, darkness at night, meditation.',
      'Symbolic work: visualization, silence, dream journaling, contemplation.',
    ],
    practice: [
      'Reduce bright light before bed.',
      'Spend a few minutes in silence or meditation.',
      'Keep a dream journal near your bed.',
      'Use the third eye symbol as a focus for intuition and inner clarity.',
    ],
    cautions: 'Spiritual claims about the pineal gland are not the same as medical facts. Keep biological and symbolic meanings separate.',
  },
  {
    id: 'pineal-decalcification',
    title: 'Pineal Decalcification',
    icon: '💧',
    category: 'Pineal',
    color: 'rgba(255,212,121,.20)',
    summary: 'Pineal decalcification is a popular spiritual wellness idea, but it should be framed carefully and not treated as a proven medical protocol.',
    overview: 'In spiritual communities, pineal decalcification often means reducing habits believed to dull intuition and supporting clearer sleep, diet, and awareness. A grounded version focuses less on extreme detox claims and more on sleep quality, nutrition, sunlight rhythms, meditation, and reducing unnecessary toxins where practical.',
    keyIdeas: [
      'Common spiritual focus: clarity, intuition, dreams, third eye awareness.',
      'Grounded lifestyle focus: better sleep, light exposure, hydration, nutrition, stress reduction.',
      'Common practices: meditation, breathwork, dream journaling, less overstimulation at night.',
      'Avoid extreme detox claims or miracle protocols.',
    ],
    practice: [
      'Get natural light earlier in the day when possible.',
      'Dim screens and bright lights before sleep.',
      'Meditate for five minutes with attention between the eyebrows.',
      'Drink water, eat nourishing food, and avoid turning this into fear-based cleansing.',
    ],
    cautions: 'There is no simple guaranteed spiritual detox that medically proves pineal decalcification. Be careful with supplements, detoxes, or claims that promise supernatural results.',
  },
  {
    id: 'merkaba',
    title: 'Mer-Ka-Ba',
    icon: '🔯',
    category: 'Mystic Systems',
    color: 'rgba(183,140,255,.25)',
    summary: 'Mer-Ka-Ba is often described as a light-body symbol or vehicle connected to spirit, body, energy, and ascension.',
    overview: 'Mer-Ka-Ba is commonly interpreted as a sacred light-body field. It is often visualized as two interlocking tetrahedrons spinning in opposite directions around the body. Spiritually, it represents integration of body, soul, and higher consciousness.',
    keyIdeas: [
      'Mer: light or spiritual radiance.',
      'Ka: spirit, life-force, or subtle essence.',
      'Ba: body, soul vehicle, or embodied consciousness.',
      'The star tetrahedron symbolizes balance between above and below.',
      'It is used in meditation, protection, ascension, and energy-body practices.',
    ],
    practice: [
      'Sit upright and breathe slowly.',
      'Visualize a tetrahedron pointing upward around your body.',
      'Visualize another tetrahedron pointing downward.',
      'Imagine them forming a balanced field of light around you.',
      'End by grounding through your feet.',
    ],
    cautions: 'Keep Mer-Ka-Ba practices grounded. If visualization feels overwhelming, return to simple breathing and body awareness.',
  },
  {
    id: 'prana',
    title: 'Prana',
    icon: '🌬️',
    category: 'Mystic Systems',
    color: 'rgba(157,255,181,.22)',
    summary: 'Prana means life-force or vital energy in yogic traditions and is often cultivated through breath, movement, food, and awareness.',
    overview: 'Prana is the subtle vitality that animates life in yogic philosophy. Breath is one of the main ways people work with prana because breathing directly affects the body, mind, and nervous system. Practices like pranayama, yoga, meditation, and mindful living are used to cultivate pranic balance.',
    keyIdeas: [
      'Prana is often compared to chi, qi, or life-force energy.',
      'Breath is considered a bridge between body and mind.',
      'Pranayama means working with breath to influence energy and awareness.',
      'Food, rest, sunlight, movement, and emotional state can be seen as prana-related.',
    ],
    practice: [
      'Sit comfortably with a tall spine.',
      'Inhale gently through the nose for four counts.',
      'Exhale through the nose for six counts.',
      'Repeat for three to five minutes.',
      'Notice whether your body feels calmer or clearer.',
    ],
    cautions: 'Avoid intense breathwork if you feel dizzy, panicked, or unwell. Gentle breathing is enough for most daily practice.',
  },
  {
    id: 'dimensions',
    title: 'Dimensions',
    icon: '🪐',
    category: 'Mystic Systems',
    color: 'rgba(255,143,199,.22)',
    summary: 'Dimensions are often used spiritually to describe layers of consciousness, perception, density, or reality.',
    overview: 'In spiritual language, dimensions usually refer to states or levels of awareness rather than literal measurable locations. A lower-dimensional state may symbolize fear, survival, separation, or heaviness. A higher-dimensional state may symbolize unity, compassion, intuition, and expanded perspective.',
    keyIdeas: [
      '3D is often associated with physical reality, survival, separation, and material focus.',
      '4D is often associated with emotional awakening, shadow work, and transition.',
      '5D is often associated with unity, heart consciousness, compassion, and inner coherence.',
      'Higher dimensions are usually symbolic maps of consciousness, not proven destinations.',
      'Dimensional language can help describe growth, but it can also become escapist.',
    ],
    practice: [
      'Ask what state you are living from: fear, control, love, clarity, or trust.',
      'Use breath to calm the body before trying to shift your state.',
      'Choose one action that expresses the higher state you want to embody.',
      'Stay grounded in daily life instead of trying to escape the human experience.',
    ],
    cautions: 'Do not use dimensional language to feel superior to others. Real spiritual growth should make you more grounded, honest, kind, and present.',
  },
];

const concepts = [...handwrittenConcepts, ...astrologyCards, ...numerologyCards];

const conceptIds = new Set(concepts.map((c) => c.id));

// Resolve an incoming ?section= value to a concept id to open directly.
function resolveInitialConceptId(section) {
  if (!section) return null;
  const normalized = section.trim();
  const lower = normalized.toLowerCase();
  if (conceptIds.has(normalized)) return normalized;
  if (conceptIds.has(lower)) return lower;
  if (lower === 'natal-chart' || lower === 'astrology') return 'astro-formula-chart-formula';
  if (lower === 'numerology') return 'num-life-path';
  if (PLANET_NAMES.has(lower)) return `astro-planet-${lower}`;
  if (NUMEROLOGY_SECTION_IDS.has(lower)) return `num-${lower}`;
  return null;
}

const KEYWORDS = {
  Crystals: ['intention', 'minerals', 'altar', 'ritual', 'meditation', 'energy focus'],
  'Sacred Geometry': ['patterns', 'circles', 'creation', 'harmony', 'symbols', 'grid work'],
  Chakras: ['energy body', 'balance', 'yoga', 'breath', 'emotion', 'self-awareness'],
  Pineal: ['third eye', 'melatonin', 'dreams', 'intuition', 'sleep', 'inner sight'],
  'Mystic Systems': ['light body', 'life force', 'consciousness', 'breath', 'ascension', 'grounding'],
  Astrology: ASTROLOGY_KEYWORDS,
  Numerology: NUMEROLOGY_KEYWORDS,
};

function getKeywords(concept) {
  return KEYWORDS[concept.category] || ['awareness', 'practice', 'symbolism'];
}

function getConceptMenuGroup(concept) {
  if (concept.category === 'Astrology') {
    if (concept.id.startsWith('astro-planet-')) return { key: 'astrology-planets', label: 'Planets', category: 'Astrology' };
    if (concept.id.startsWith('astro-sign-')) return { key: 'astrology-signs', label: 'Zodiac Signs', category: 'Astrology' };
    if (concept.id.startsWith('astro-house-')) return { key: 'astrology-houses', label: 'Houses', category: 'Astrology' };
    if (concept.id.startsWith('astro-aspect-')) return { key: 'astrology-aspects', label: 'Aspects', category: 'Astrology' };
    if (concept.id.startsWith('astro-formula-')) return { key: 'astrology-reading', label: 'Chart Reading', category: 'Astrology' };
    if (concept.id.startsWith('astro-angle-')) return { key: 'astrology-angles', label: 'Angles', category: 'Astrology' };
    if (concept.id.startsWith('astro-dignity-')) return { key: 'astrology-dignities', label: 'Dignities', category: 'Astrology' };
    if (concept.id.startsWith('astro-configuration-')) return { key: 'astrology-configurations', label: 'Configurations', category: 'Astrology' };
    return { key: 'astrology-reference', label: 'Reference', category: 'Astrology' };
  }

  if (concept.category === 'Numerology') {
    if (concept.id === 'num-calculator' || concept.id === 'num-journal') {
      return { key: 'numerology-tools', label: 'Tools', category: 'Numerology' };
    }
    if (concept.id === 'num-angel-numbers' || concept.id === 'num-personal-year') {
      return { key: 'numerology-patterns', label: 'Patterns & Cycles', category: 'Numerology' };
    }
    return { key: 'numerology-core', label: 'Core Numbers', category: 'Numerology' };
  }

  return {
    key: concept.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label: concept.category,
    category: concept.category,
  };
}

function groupConcepts(menuConcepts) {
  const groups = [];
  const byKey = new Map();
  for (const concept of menuConcepts) {
    const groupMeta = getConceptMenuGroup(concept);
    if (!byKey.has(groupMeta.key)) {
      const group = { ...groupMeta, concepts: [] };
      byKey.set(groupMeta.key, group);
      groups.push(group);
    }
    byKey.get(groupMeta.key).concepts.push(concept);
  }
  return groups;
}

const conceptsById = new Map(concepts.map((c) => [c.id, c]));
const allGroups = groupConcepts(concepts);
const groupsByKey = new Map(allGroups.map((g) => [g.key, g]));

function matchesSearch(concept, q) {
  if (!q) return true;
  const haystack = [concept.title, concept.category, concept.summary, concept.overview, ...concept.keyIdeas]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

// Neighbours inside the concept's own group, wrapping around so House 12 leads
// back to House 1 and Pisces back to Aries.
function getSiblings(concept) {
  const group = groupsByKey.get(getConceptMenuGroup(concept).key);
  if (!group || group.concepts.length < 2) return { group, prev: null, next: null };
  const list = group.concepts;
  const i = list.findIndex((c) => c.id === concept.id);
  return {
    group,
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

export default function SacredSystemsAtlas({ onBack, onNavigate, initialSection }) {
  const conceptId = useMemo(() => resolveInitialConceptId(initialSection), [initialSection]);
  const concept = conceptId ? conceptsById.get(conceptId) : null;

  // Each concept is its own page with its own history entry, so the browser's
  // back button returns to wherever the visitor came from (the library, the
  // previous concept, or the home page's reading card).
  const openConcept = useCallback(
    (id) => {
      if (onNavigate) onNavigate('sacredsystems', { section: id });
      else window.location.assign(`/sacred-systems?section=${encodeURIComponent(id)}`);
    },
    [onNavigate]
  );
  const openLibrary = useCallback(() => {
    if (onNavigate) onNavigate('sacredsystems');
    else window.location.assign('/sacred-systems');
  }, [onNavigate]);

  useEffect(() => {
    if (concept) document.title = `${concept.title} · Sacred Systems · Sacred Pathways`;
  }, [concept]);

  return (
    <div className="ssa-root">
      <div className="ssa-grid-overlay" aria-hidden="true" />
      <div className="ssa-app">
        {concept ? (
          <ConceptPage concept={concept} onOpenConcept={openConcept} onOpenLibrary={openLibrary} />
        ) : (
          <LibraryIndex onBack={onBack} onOpenConcept={openConcept} />
        )}
      </div>
    </div>
  );
}

const sectionAnchor = (title) => `ssa-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

// A link to another concept page, or plain text when that concept doesn't exist.
function ConceptLink({ linkId, children, onOpenConcept }) {
  if (!linkId || !conceptsById.has(linkId)) return <span>{children}</span>;
  return (
    <button type="button" className="ssa-inline-link" onClick={() => onOpenConcept(linkId)}>
      {children}
    </button>
  );
}

// Optional extra sections a card can carry beyond the standard shape (used by
// the astrology house pages): facts, text, list, steps, and links.
function ExtraSection({ section, onOpenConcept }) {
  const className = [
    'ssa-section',
    section.half ? '' : 'ssa-full',
    section.tone ? `ssa-tone-${section.tone}` : '',
  ].filter(Boolean).join(' ');

  let body = null;
  if (section.kind === 'text') {
    body = <p>{section.text}</p>;
  } else if (section.kind === 'list') {
    body = (
      <ul>
        {section.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  } else if (section.kind === 'steps') {
    body = (
      <ol className="ssa-practice">
        {section.items.map((item) => (
          <li key={item} className="ssa-step"><span>{item}</span></li>
        ))}
      </ol>
    );
  } else if (section.kind === 'facts') {
    body = (
      <dl className="ssa-facts">
        {section.items.map((fact) => (
          <div key={fact.label} className="ssa-fact">
            <dt>{fact.label}</dt>
            <dd>
              {fact.links
                ? fact.links.map((link, i) => (
                    <span key={link.text}>
                      {i > 0 && ' · '}
                      <ConceptLink linkId={link.linkId} onOpenConcept={onOpenConcept}>{link.text}</ConceptLink>
                    </span>
                  ))
                : fact.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  } else if (section.kind === 'links') {
    body = (
      <div className="ssa-link-rows">
        {section.items.map((item) => (
          <div key={item.label} className="ssa-link-row">
            <ConceptLink linkId={item.linkId} onOpenConcept={onOpenConcept}>{item.label}</ConceptLink>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id={sectionAnchor(section.title)} className={className}>
      <h2>{section.title}</h2>
      {body}
    </section>
  );
}

function ConceptPage({ concept, onOpenConcept, onOpenLibrary }) {
  const { group, prev, next } = getSiblings(concept);
  const groupLabel = group?.label || concept.category;
  const showCategory = group && group.label !== concept.category;

  return (
    <>
      <nav className="ssa-topbar" aria-label="Breadcrumb">
        <button type="button" onClick={onOpenLibrary} className="ssa-back">← Sacred Systems</button>
        <ol className="ssa-crumbs">
          <li>
            <button type="button" onClick={onOpenLibrary}>Library</button>
          </li>
          {showCategory && <li>{concept.category}</li>}
          <li>{groupLabel}</li>
        </ol>
      </nav>

      <div className="ssa-concept-layout">
        <div className="ssa-main">
          <article className="ssa-detail" style={{ '--detailGlow': concept.color }}>
            <header className="ssa-detail-hero">
              <div className="ssa-detail-kicker">
                {showCategory ? `${concept.category} · ${groupLabel}` : groupLabel}
              </div>
              <h1>
                <span aria-hidden="true">{concept.icon}</span> {concept.title}
              </h1>
              <p className="ssa-detail-summary">{concept.summary}</p>
              {concept.sections?.length > 0 && (
                <nav className="ssa-jump" aria-label="Jump to section">
                  {[...concept.sections.map((sec) => sec.title), 'Simple Practice'].map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => document.getElementById(sectionAnchor(title))?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    >
                      {title}
                    </button>
                  ))}
                </nav>
              )}
            </header>

            <div className="ssa-detail-body">
              <section className="ssa-section ssa-full">
                <h2>Expanded Explanation</h2>
                <p>{concept.overview}</p>
              </section>

              <section className="ssa-section">
                <h2>Core Ideas</h2>
                <ul>
                  {concept.keyIdeas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="ssa-section">
                <h2>Related Keywords</h2>
                <div className="ssa-pill-row">
                  {getKeywords(concept).map((kw) => (
                    <span key={kw} className="ssa-pill">{kw}</span>
                  ))}
                </div>
              </section>

              {concept.sections?.map((section) => (
                <ExtraSection key={section.title} section={section} onOpenConcept={onOpenConcept} />
              ))}

              <section id={sectionAnchor('Simple Practice')} className="ssa-section ssa-full">
                <h2>Simple Practice</h2>
                <ol className="ssa-practice">
                  {concept.practice.map((step) => (
                    <li key={step} className="ssa-step">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="ssa-section ssa-full">
                <h2>Grounding Note</h2>
                <p>{concept.cautions}</p>
              </section>
            </div>
          </article>

          {prev && next && (
            <nav className="ssa-pager" aria-label={`More ${groupLabel}`}>
              <button type="button" className="ssa-pager-link" onClick={() => onOpenConcept(prev.id)}>
                <span>← Previous</span>
                <strong>{prev.icon} {prev.title}</strong>
              </button>
              <button type="button" className="ssa-pager-link next" onClick={() => onOpenConcept(next.id)}>
                <span>Next →</span>
                <strong>{next.icon} {next.title}</strong>
              </button>
            </nav>
          )}

          <p className="ssa-footnote">
            Spiritual, symbolic, and wellness concepts for reflection — not medical advice.
          </p>
        </div>

        {group && group.concepts.length > 1 && (
          <aside className="ssa-related" aria-label={`All ${groupLabel}`}>
            <div className="ssa-related-header">
              <h2>All {groupLabel}</h2>
              <span>{group.concepts.length}</span>
            </div>
            <div className="ssa-related-list">
              {group.concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`ssa-concept-link${c.id === concept.id ? ' active' : ''}`}
                  aria-current={c.id === concept.id ? 'page' : undefined}
                  onClick={() => c.id !== concept.id && onOpenConcept(c.id)}
                >
                  <div className="ssa-mini-icon" aria-hidden="true">{c.icon}</div>
                  <div>
                    <strong>{c.title}</strong>
                  </div>
                </button>
              ))}
            </div>
            <button type="button" className="ssa-related-all" onClick={onOpenLibrary}>
              Browse the full library →
            </button>
          </aside>
        )}
      </div>
    </>
  );
}

function LibraryIndex({ onBack, onOpenConcept }) {
  const [search, setSearch] = useState('');
  const q = search.trim().toLowerCase();
  const groups = useMemo(() => groupConcepts(concepts.filter((c) => matchesSearch(c, q))), [q]);

  return (
    <>
      <button type="button" onClick={onBack} className="ssa-back">← Back</button>

      <header className="ssa-hero">
        <div>
          <div className="ssa-eyebrow">✦ Sacred Systems Library</div>
          <h1>Energy, Geometry & Inner Alchemy</h1>
          <p>
            A visual learning library for crystals, sacred geometry, chakras, the pineal gland,
            Mer-Ka-Ba, prana, dimensional consciousness, astrology, and numerology. Every concept
            has its own page with an explanation, key ideas, a simple practice, and a grounding note.
          </p>
          <div className="ssa-notice">
            This library treats these topics as spiritual, symbolic, and wellness concepts — not as
            medical advice. Use it as an educational and reflective map.
          </div>
        </div>
        <div className="ssa-orb-card" aria-hidden="true">
          <div className="ssa-rings" />
          <div className="ssa-orb" />
        </div>
      </header>

      <div className="ssa-controls">
        <input
          className="ssa-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search concepts..."
          aria-label="Search concepts"
        />
      </div>

      {groups.length === 0 ? (
        <div className="ssa-empty">No concepts found.</div>
      ) : (
        <div className="ssa-index">
          {groups.map((group) => (
            <section key={group.key} className="ssa-index-group">
              <div className="ssa-index-group-header">
                <h2>
                  {group.label}
                  {group.label !== group.category && <em>{group.category}</em>}
                </h2>
                <span>{group.concepts.length}</span>
              </div>
              <div className="ssa-index-grid">
                {group.concepts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="ssa-index-card"
                    style={{ '--cardGlow': c.color }}
                    onClick={() => onOpenConcept(c.id)}
                  >
                    <div className="ssa-mini-icon" aria-hidden="true">{c.icon}</div>
                    <div>
                      <strong>{c.title}</strong>
                      <span>{c.summary}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
