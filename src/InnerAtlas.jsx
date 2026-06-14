import { useEffect, useState } from 'react';
import InnerBalanceAtlasBase from './InnerBalanceAtlasBase';
import PsychologyPortal from './PsychologyPortal';
import ColorPsychologyAtlas from './ColorPsychologyAtlas';
import EmotionsAtlas from './EmotionsAtlas';
import AwarenessAtlas from './AwarenessAtlas';
import ConsciousnessMap from './ConsciousnessMap';
import InnerAtlasShell from './components/InnerAtlasShell';
import { IA_ACCENTS } from './innerAtlasTheme';
// ─── Section mapping (handles legacy ?section= params from old portals) ──────

const SECTION_MAP = {
  'nervous-system':        { id: 'nervous-system',        sub: 'psychophysiology' },
  'psychology':            { id: 'psychology',            sub: null },
  'mood-neurochemistry':   { id: 'mood-neurochemistry',   sub: 'neurotransmitters' },
  'lifestyle':             { id: 'lifestyle',             sub: 'sleep' },
  'colorpsychology':        { id: 'colorpsychology',       sub: null },
  'color-psychology':       { id: 'colorpsychology',       sub: null },
  'regulation':            { id: 'regulation',            sub: null },
  'detox':                 { id: 'detox',                 sub: null },
  'emotions':              { id: 'emotions',              sub: null },
  'emotion-glossary':      { id: 'emotions',              sub: null },
  'guidance-spiral':       { id: 'emotions',              sub: null },
  // Legacy InnerBalance Atlas tab IDs
  psychophysiology:  { id: 'nervous-system',      sub: 'psychophysiology' },
  stress:            { id: 'nervous-system',      sub: 'stress' },
  neurotransmitters: { id: 'mood-neurochemistry', sub: 'neurotransmitters' },
  mooduplift:        { id: 'mood-neurochemistry', sub: 'mooduplift' },
  physicalactivity:  { id: 'lifestyle',           sub: 'physicalactivity' },
  sleep:             { id: 'lifestyle',           sub: 'sleep' },
  nutrition:         { id: 'lifestyle',           sub: 'nutrition' },
  hair:              { id: 'lifestyle',           sub: 'hair' },
  herbs:             { id: 'lifestyle',           sub: 'herbs' },
  gratitude:         { id: 'mood-neurochemistry', sub: 'gratitude' },
  dailyrituals:      { id: 'lifestyle',           sub: 'dailyrituals' },
  heatcold:          { id: 'lifestyle',           sub: 'heatcold' },
  journaling:        { id: 'mood-neurochemistry', sub: 'journaling' },
  statesofmind:      { id: 'mood-neurochemistry', sub: 'statesofmind' },
  productivity:      { id: 'lifestyle',           sub: 'productivity' },
  purpose:           { id: 'lifestyle',           sub: 'purpose' },
  mycore:            { id: 'lifestyle',           sub: 'mycore' },
  'my-core':         { id: 'lifestyle',           sub: 'mycore' },
  virtues:           { id: 'lifestyle',           sub: 'virtues' },
  soundfrequency:    { id: 'lifestyle',           sub: 'soundfrequency' },
  dashboard:         { id: null,                  sub: null },
  // Psychology Portal internal tab IDs
  overview:    { id: 'psychology', sub: 'overview' },
  frameworks:  { id: 'psychology', sub: 'frameworks' },
  powerstack:  { id: 'psychology', sub: 'powerstack' },
  growth:      { id: 'psychology', sub: 'growth' },
  nutrients:   { id: 'psychology', sub: 'nutrients' },
  // Awareness section IDs
  'awareness':                         { id: 'awareness', sub: null },
  'what-is-awareness':                 { id: 'awareness', sub: 'what-is-awareness' },
  'placing-awareness':                 { id: 'awareness', sub: 'placing-awareness' },
  'inner-vs-outer-awareness':          { id: 'awareness', sub: 'inner-vs-outer-awareness' },
  'awareness-vs-rumination':           { id: 'awareness', sub: 'awareness-vs-rumination' },
  'presence':                          { id: 'awareness', sub: 'presence' },
  'relaxation-vs-meditation':          { id: 'awareness', sub: 'relaxation-vs-meditation' },
  'meditation-and-brain-waves':        { id: 'awareness', sub: 'meditation-and-brain-waves' },
  'alpha-theta-gamma':                 { id: 'awareness', sub: 'alpha-theta-gamma' },
  'meditation-and-awareness-studies':  { id: 'awareness', sub: 'meditation-and-awareness-studies' },
  'breath-awareness':                  { id: 'awareness', sub: 'breath-awareness' },
  'body-awareness':                    { id: 'awareness', sub: 'body-awareness' },
  'emotional-awareness':               { id: 'awareness', sub: 'emotional-awareness' },
  'returning-attention':               { id: 'awareness', sub: 'returning-attention' },
  // Consciousness Map section IDs
  'consciousness-map':                 { id: 'consciousness-map', sub: null },
  'consciousnessmap':                  { id: 'consciousness-map', sub: null },
  'map-of-consciousness':              { id: 'consciousness-map', sub: null },
  // Individual Map of Consciousness levels (deep-links from daily readings)
  'shame':                             { id: 'consciousness-map', sub: 'shame' },
  'guilt':                             { id: 'consciousness-map', sub: 'guilt' },
  'fear':                              { id: 'consciousness-map', sub: 'fear' },
  'anger':                             { id: 'consciousness-map', sub: 'anger' },
  'courage':                           { id: 'consciousness-map', sub: 'courage' },
  'acceptance':                        { id: 'consciousness-map', sub: 'acceptance' },
  'love':                              { id: 'consciousness-map', sub: 'love' },
  'enlightenment':                     { id: 'consciousness-map', sub: 'enlightenment' },
  // Manifestation Blocks
  'manifestation':                     { id: 'manifestation', sub: null },
  'manifestation-blocks':              { id: 'manifestation', sub: null },
};

// Relationship Clarity & Patterns moved to the Sexual Energy portal. Old
// deep-links into InnerAtlas redirect there, preserving the concept sub-section.
const RELATIONSHIP_REDIRECTS = new Set([
  'relationship-clarity', 'relationship-patterns',
  'security-vs-fear', 'mixed-signals', 'chasing-vs-receiving', 'pedestalizing',
  'reading-red-flags', 'love-bombing', 'control-and-isolation', 'gaslighting',
  'contempt-and-criticism', 'jealousy-and-possessiveness', 'future-faking',
  'standards', 'boundaries', 'devotion', 'honest-direct', 'texting-urges',
  'clarity-check', 'pause-check',
]);

// ─── Section palette ────────────────────────────────────────────────────────

const PAL = {
  'nervous-system':        { c: '#7ab979', bg: 'rgba(122,185,121,0.10)', br: 'rgba(122,185,121,0.26)' },
  'psychology':            { c: '#67e8f9', bg: 'rgba(103,232,249,0.08)', br: 'rgba(103,232,249,0.26)' },
  'mood-neurochemistry':   { c: '#a78bfa', bg: 'rgba(167,139,250,0.08)', br: 'rgba(167,139,250,0.26)' },
  'lifestyle':             { c: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  br: 'rgba(251,191,36,0.26)'  },
  'colorpsychology':        { c: '#22d3ee', bg: 'rgba(34,211,238,0.08)',  br: 'rgba(34,211,238,0.26)'  },
  'regulation':            { c: '#34d399', bg: 'rgba(52,211,153,0.08)',  br: 'rgba(52,211,153,0.26)'  },
  'emotions':              { c: '#f472b6', bg: 'rgba(244,114,182,0.08)', br: 'rgba(244,114,182,0.26)' },
  'awareness':             { c: '#7ee7d4', bg: 'rgba(126,231,212,0.08)', br: 'rgba(126,231,212,0.26)' },
  'consciousness-map':     { c: '#a78bfa', bg: 'rgba(167,139,250,0.08)', br: 'rgba(167,139,250,0.26)' },
  'detox':                 { c: '#a3e635', bg: 'rgba(163,230,53,0.08)',  br: 'rgba(163,230,53,0.26)'  },
  'manifestation':         { c: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  br: 'rgba(245,158,11,0.26)'  },
};

// ─── Hub section definitions ────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'nervous-system',
    icon: '◍',
    title: 'Nervous System Atlas',
    description: 'Stress response, vagus nerve, fight-or-flight, psychophysiology map, and the science of recovery.',
    tags: ['Vagus Nerve', 'Cortisol', 'Recovery'],
  },
  {
    id: 'psychology',
    icon: '◈',
    title: 'Psychology Atlas',
    description: 'Self-worth, insecurity, attachment, identity, trauma loops, shadow work, and emotional regulation.',
    tags: ['Attachment', 'Identity', 'Shadow Work'],
  },
  {
    id: 'mood-neurochemistry',
    icon: '⌁',
    title: 'Mood & Neurochemistry',
    description: 'Dopamine, serotonin, oxytocin, GABA, cortisol, adrenaline — the chemistry of how you feel.',
    tags: ['Dopamine', 'Serotonin', 'GABA'],
  },
  {
    id: 'lifestyle',
    icon: '🌿',
    title: 'Lifestyle Inputs',
    description: 'Sleep, nutrition, movement, sunlight, music, and what shapes your daily state.',
    tags: ['Sleep', 'Nutrition', 'Movement'],
  },
  {
    id: 'colorpsychology',
    icon: '🎨',
    title: 'Color Psychology',
    description: 'How color shapes mood, attention, atmosphere, design, symbolism, and self-concept cues.',
    tags: ['Colors', 'Mood', 'Design'],
  },
  {
    id: 'regulation',
    icon: '〜',
    title: 'Regulation Tools',
    description: 'Breathing, grounding, journaling, reframing, meditation, body release, and nervous-system reset.',
    tags: ['Breathing', 'Grounding', 'Meditation'],
  },
  {
    id: 'emotions',
    icon: '~',
    title: 'Emotions & Guidance Spiral',
    description: 'A simple emotion glossary with definitions, explanations, and upward/downward spiral mapping.',
    tags: ['Feelings', 'Definitions', 'Spiral'],
  },
  {
    id: 'awareness',
    icon: '☼',
    title: 'Awareness & Presence',
    description: 'What awareness is, how meditation shifts brain states (alpha, theta, gamma), and the inner practices of breath, body, and attention.',
    tags: ['Meditation', 'Brain Waves', 'Presence'],
  },
  {
    id: 'consciousness-map',
    icon: '◬',
    title: 'Map of Consciousness',
    description: 'Hawkins\'s 17-level scale from Shame (20) to Enlightenment (1000) — emotional signatures, lived experience, and practices for moving higher.',
    tags: ['Hawkins', 'Levels', 'Threshold'],
  },
  {
    id: 'detox',
    icon: '⬡',
    title: 'Detox Guide',
    description: '19 detox types — juice, herbal, liver, heavy metal, parasite, sauna, and more — each with ingredients and a smoothie or tonic recipe.',
    tags: ['Cleanse', 'Herbs', 'Reset'],
  },
  {
    id: 'manifestation',
    icon: '✦',
    title: 'Manifestation Blocks',
    description: 'The 10 core barriers that delay or block manifestation — limiting beliefs, fear, attachment, low vibration, and more — with steps to clear each one.',
    tags: ['Beliefs', 'Resistance', 'Alignment'],
  },
];

// ─── Manifestation Blocks data ────────────────────────────────────────────

const MANIFESTATION_BLOCKS = [
  {
    id: 'limiting-beliefs',
    name: 'Limiting Beliefs',
    icon: '◈',
    bullets: [
      'Doubts about your worthiness or ability to achieve your desires.',
      'Negative subconscious programming from childhood or past experiences.',
      'Conflicting beliefs (e.g., wanting wealth but believing money is evil).',
    ],
    clear: 'Reprogram through daily affirmations, mirror work, and belief audits. Ask: "Where did I first learn this?" and consciously replace it with its opposite.',
  },
  {
    id: 'fear-resistance',
    name: 'Fear & Resistance',
    icon: '△',
    bullets: [
      'Fear of failure or success.',
      'Fear of change or the unknown.',
      'Resistance to stepping out of your comfort zone.',
    ],
    clear: 'Name the fear specifically, then ask: "What is the worst realistic outcome?" Visualise moving through the fear with the outcome already handled.',
  },
  {
    id: 'attachment-desperation',
    name: 'Attachment & Desperation',
    icon: '⊗',
    bullets: [
      'Obsessing over the outcome, creating energetic resistance.',
      'Feeling like you need something to be happy instead of trusting divine timing.',
      'Micromanaging how things should manifest instead of allowing them to unfold.',
    ],
    clear: 'Practice the "set it and forget it" method — state the intention clearly, then redirect your focus to daily joy. Surrender is not giving up; it is trusting.',
  },
  {
    id: 'negative-thoughts',
    name: 'Negative Thoughts & Emotions',
    icon: '〜',
    bullets: [
      'Constantly focusing on what you do not want.',
      'Chronic stress, anxiety, or pessimism lowering your vibrational energy.',
      'Dwelling in lack rather than abundance.',
    ],
    clear: 'Use the 17-second rule (Abraham Hicks): hold a positive thought for 17 seconds to begin shifting momentum. Pair with gratitude lists and guided meditations.',
  },
  {
    id: 'lack-of-alignment',
    name: 'Lack of Alignment & Inspired Action',
    icon: '⌁',
    bullets: [
      'Saying you want something but taking no steps toward it.',
      'Acting out of alignment with your desires (e.g., wanting love but avoiding social interactions).',
      'Ignoring intuition and inspired nudges.',
    ],
    clear: 'Ask daily: "What one action today would my future self thank me for?" Act on any nudge that feels light, not forced.',
  },
  {
    id: 'environmental-influences',
    name: 'Environmental & Social Influences',
    icon: '◎',
    bullets: [
      'Surrounding yourself with negative or unsupportive people.',
      'Being in a toxic environment that drains your energy.',
      'Absorbing limiting societal norms or cultural beliefs.',
    ],
    clear: 'Audit your five closest influences. Consciously add one energy-raising person, podcast, or environment per week. You absorb the frequency around you.',
  },
  {
    id: 'impatience-distrust',
    name: 'Impatience & Lack of Trust',
    icon: '◷',
    bullets: [
      'Feeling frustrated when things do not manifest instantly.',
      'Constantly questioning "Why hasn\'t it happened yet?"',
      'Not trusting divine timing and universal alignment.',
    ],
    clear: 'Look back at past manifestations — notice they always arrived at the right moment. Build a "proof journal" of times things worked out perfectly.',
  },
  {
    id: 'low-self-worth',
    name: 'Low Self-Worth & Self-Sabotage',
    icon: '⊖',
    bullets: [
      'Feeling unworthy of receiving good things.',
      'Subconsciously sabotaging opportunities out of fear or guilt.',
      'Not allowing yourself to feel joy, love, or success.',
    ],
    clear: 'Begin a daily self-worth practice: write three things you appreciate about yourself. Catch self-sabotage patterns in real time by asking "Is this aligned with my desires?"',
  },
  {
    id: 'lack-of-gratitude',
    name: 'Lack of Gratitude & Presence',
    icon: '☽',
    bullets: [
      'Focusing too much on the future rather than appreciating the present.',
      'Not acknowledging what you already have, which reinforces scarcity.',
      'Complaining about life instead of feeling gratitude for it.',
    ],
    clear: 'Write three specific gratitudes every morning — not generic, but detailed. Gratitude is the frequency that attracts more of what you appreciate.',
  },
  {
    id: 'energetic-blocks',
    name: 'Energetic Blocks & Past Trauma',
    icon: '◬',
    bullets: [
      'Unhealed wounds or emotional baggage lowering your vibration.',
      'Holding onto resentment, anger, or past disappointments.',
      'Being stuck in old patterns that no longer serve you.',
    ],
    clear: 'Work with somatic release, EFT tapping, or inner-child journaling. Forgiveness (of yourself and others) is one of the most powerful frequency-raisers.',
  },
];

const MANIFESTATION_CLEAR_STEPS = [
  { icon: '✅', text: 'Reprogram limiting beliefs through affirmations and inner work.' },
  { icon: '✅', text: 'Release fear and trust the process.' },
  { icon: '✅', text: 'Practice gratitude and focus on abundance.' },
  { icon: '✅', text: 'Take aligned, inspired action.' },
  { icon: '✅', text: 'Let go of attachment and surrender to divine timing.' },
  { icon: '✅', text: 'Heal emotional wounds and raise your vibration.' },
];

function ManifestationBlocks({ onBack, onSelectSection }) {
  const [expanded, setExpanded] = useState(null);
  const color = '#f59e0b';

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  return (
    <InnerAtlasShell activeId="manifestation" onBack={onBack} onSelectSection={onSelectSection} title="Manifestation Blocks">
      <div className="ia-section-head">
        <div className="ia-eyebrow">Law of attraction</div>
        <h2 className="ia-title">Manifestation Blocks</h2>
        <p className="ia-lede">
          The 10 core barriers that delay or prevent manifestations — and how to clear each one. Tap any block to see what drives it and how to release it.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
        {MANIFESTATION_BLOCKS.map((block, i) => (
          <div key={block.id}>
            <button
              type="button"
              onClick={() => toggle(block.id)}
              className="ia-card"
              style={{
                width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                borderColor: expanded === block.id ? `${color}55` : `${color}20`,
                background: expanded === block.id ? `${color}0d` : 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, color, background: `${color}18`,
                  border: `1px solid ${color}30`, borderRadius: 999,
                  padding: '3px 9px', flexShrink: 0, marginTop: 2,
                }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ color, fontSize: '1rem' }}>{block.icon}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>{block.name}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ia-text-dim)', lineHeight: 1.6 }}>
                    {block.bullets[0]}
                  </div>
                </div>
              </div>
              <span style={{ color, flexShrink: 0, fontSize: '0.9rem', marginTop: 4 }}>
                {expanded === block.id ? '▲' : '▼'}
              </span>
            </button>

            {expanded === block.id && (
              <div style={{
                background: `${color}08`, border: `1px solid ${color}28`,
                borderTop: 'none', borderRadius: '0 0 14px 14px', padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  {block.bullets.map((b, bi) => (
                    <div key={bi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color, flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ia-text-dim)', lineHeight: 1.6 }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{
                  background: `${color}12`, border: `1px solid ${color}28`,
                  borderRadius: 10, padding: '12px 14px',
                }}>
                  <div style={{
                    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color, marginBottom: 6,
                  }}>How to clear this block</div>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    {block.clear}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        background: `${color}08`, border: `1px solid ${color}28`,
        borderRadius: 16, padding: '24px 22px',
      }}>
        <div style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color, marginBottom: 16,
        }}>How to remove these blocks</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MANIFESTATION_CLEAR_STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{step.icon}</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </InnerAtlasShell>
  );
}

// ─── Detox Guide data ──────────────────────────────────────────────────────

const DETOXES = [
  {
    id: 'juice', name: 'Juice Detox / Cleanse', category: 'Physical',
    desc: 'Cold-pressed juices flood the body with micronutrients while giving the digestive system a rest.',
    recipe: 'Green Cleanse Smoothie',
    ingredients: ['1 green apple', 'Large handful kale or spinach', '½ cucumber', 'Juice of 1 lemon', '1-inch fresh ginger', '2 stalks celery', '1 cup coconut water'],
  },
  {
    id: 'water', name: 'Water Fasting Detox', category: 'Physical',
    desc: 'Extended periods of water-only intake to trigger autophagy and reset metabolic processes.',
    recipe: 'Electrolyte Support Water',
    ingredients: ['Filtered water', 'Pinch of pink Himalayan salt', 'Juice of ½ lemon', '1 tsp raw honey (optional)', 'Small pinch of cream of tartar (potassium)'],
  },
  {
    id: 'tea', name: 'Tea Detox (Teatox)', category: 'Herbal',
    desc: 'Herbal tea blends designed to support liver function, digestion, and gentle cleansing.',
    recipe: 'Detox Tea Blend (steep 10 min)',
    ingredients: ['Dandelion root', 'Milk thistle seeds', 'Fresh ginger slices', 'Peppermint leaf', 'Licorice root (small amount)', 'Lemon slice to serve'],
  },
  {
    id: 'smoothie', name: 'Smoothie Detox', category: 'Physical',
    desc: 'Nutrient-dense smoothies packed with fiber, antioxidants, and detox-supporting compounds.',
    recipe: 'Daily Detox Smoothie',
    ingredients: ['2 cups spinach', '1 banana (frozen)', '½ cup mango chunks', '1 tbsp chia seeds', '1 tbsp ground flaxseeds', '1 cup coconut water', 'Juice of ½ lemon'],
  },
  {
    id: 'rawfood', name: 'Raw Food Detox', category: 'Physical',
    desc: 'Uncooked, unprocessed plant foods to preserve enzymes and maximize nutrient absorption.',
    recipe: 'Raw Vitality Bowl Base',
    ingredients: ['Shredded beets', 'Grated carrot', 'Sliced cucumber', 'Avocado', 'Sprouts (broccoli or alfalfa)', 'Pumpkin seeds', 'Cold-pressed olive oil + lemon dressing'],
  },
  {
    id: 'herbal', name: 'Herbal Detox', category: 'Herbal',
    desc: 'Medicinal herbs known to support liver, kidney, and lymphatic detoxification pathways.',
    recipe: 'Herbal Detox Smoothie',
    ingredients: ['1 tsp spirulina powder', '1 tsp chlorella powder', '½ tsp turmeric', 'Small bunch fresh cilantro', '1 clove garlic', '1 cup almond milk', 'Juice of 1 lemon'],
  },
  {
    id: 'colon', name: 'Colon Cleanse Detox', category: 'Physical',
    desc: 'Supports peristalsis and bowel regularity using fiber, probiotics, and gut-soothing compounds.',
    recipe: 'Colon Reset Drink (morning)',
    ingredients: ['1 tbsp psyllium husk', '1 tbsp aloe vera juice', '1 tbsp apple cider vinegar', '1 tsp raw honey', '1 cup warm water', 'Probiotic capsule alongside'],
  },
  {
    id: 'liver', name: 'Liver Detox', category: 'Physical',
    desc: 'Targeted support for the liver\'s two-phase detoxification process using proven hepatoprotective compounds.',
    recipe: 'Liver Support Smoothie',
    ingredients: ['1 small raw beet (peeled)', '1 tbsp milk thistle powder', '½ tsp turmeric', '2 cloves garlic', 'Juice of 1 lemon', 'Handful dandelion greens', '1 cup water'],
  },
  {
    id: 'heavymetal', name: 'Heavy Metal Detox', category: 'Physical',
    desc: 'Binds and removes heavy metals (mercury, lead, arsenic) using chelating foods and algae.',
    recipe: 'Heavy Metal Detox Smoothie',
    ingredients: ['Large handful wild blueberries', 'Large handful fresh cilantro', '1 tsp spirulina', '1 tsp barley grass juice powder', '1 tsp Atlantic dulse flakes', '1 orange (juiced)', '1 banana'],
  },
  {
    id: 'parasite', name: 'Parasite Detox', category: 'Herbal',
    desc: 'Antiparasitic herbs and foods that create an inhospitable environment for intestinal parasites.',
    recipe: 'Antiparasitic Tonic Smoothie',
    ingredients: ['¼ cup raw pumpkin seeds', '2 cloves garlic', 'Small bunch fresh thyme', '1 tsp black seed (nigella)', 'Juice of 1 lemon', '1 tbsp raw honey', '1 cup coconut water'],
  },
  {
    id: 'digital', name: 'Digital Detox', category: 'Lifestyle',
    desc: 'A conscious break from screens, social media, and digital stimulation to reset attention and nervous system.',
    recipe: 'Calm Focus Support Drink',
    ingredients: ['1 tsp ashwagandha powder', '1 tsp raw cacao', '½ tsp cinnamon', '1 cup warm oat milk', '1 tsp raw honey', 'Pinch of cardamom'],
  },
  {
    id: 'sugar', name: 'Sugar Detox', category: 'Lifestyle',
    desc: 'Eliminating refined sugars to reset insulin sensitivity, reduce cravings, and stabilize mood.',
    recipe: 'Blood Sugar Balance Smoothie',
    ingredients: ['1 cup unsweetened almond milk', '½ cup frozen berries', '1 tbsp almond butter', '1 tsp cinnamon', '1 tbsp chia seeds', '½ tsp vanilla extract', 'Handful spinach'],
  },
  {
    id: 'alcohol', name: 'Alcohol Detox', category: 'Medical',
    desc: 'Recovery support for the liver and nervous system after alcohol use. Medical supervision is essential for heavy use.',
    recipe: 'Liver Recovery Smoothie',
    ingredients: ['1 tsp milk thistle powder', 'Handful spinach', '1 banana', '1 tbsp flaxseeds', '1 tsp turmeric', 'B-complex supplement alongside', '1 cup coconut water — stay well hydrated'],
  },
  {
    id: 'drug', name: 'Drug Detox (Medical)', category: 'Medical',
    desc: 'Medically supervised withdrawal and recovery. Always requires professional oversight — do not attempt alone.',
    recipe: 'Nutritional Recovery Support',
    ingredients: ['High-quality protein (eggs, legumes, lean meat)', 'Omega-3 rich foods (flaxseed, walnuts)', 'Magnesium-rich foods (dark leafy greens)', 'B-vitamin foods (nutritional yeast, whole grains)', 'Professional guidance is required'],
  },
  {
    id: 'bath', name: 'Detox Baths', category: 'Physical',
    desc: 'Transdermal absorption of minerals and clay compounds to draw toxins through the skin.',
    recipe: 'Detox Bath Formula',
    ingredients: ['2 cups Epsom salt (magnesium sulfate)', '½ cup bentonite clay', '½ cup baking soda', '10 drops lavender essential oil', 'Optional: 1 cup apple cider vinegar', 'Soak 20–40 minutes in warm (not hot) water'],
  },
  {
    id: 'ayurvedic', name: 'Ayurvedic Detox (Panchakarma)', category: 'Herbal',
    desc: 'A classical Indian cleansing system using ghee, herbs, and oil therapies to remove deep-seated toxins (ama).',
    recipe: 'Kitchari Cleanse Base Smoothie',
    ingredients: ['1 tsp triphala powder', '½ tsp turmeric', '½ tsp cumin', 'Small piece fresh ginger', '1 tsp ghee (if tolerated)', '1 cup warm water or light broth', 'Ideally guided by an Ayurvedic practitioner'],
  },
  {
    id: 'supplements', name: 'Detox Supplements / Pills', category: 'Herbal',
    desc: 'Targeted nutraceuticals that support the body\'s natural detox enzymes and antioxidant systems.',
    recipe: 'Antioxidant Detox Smoothie',
    ingredients: ['1 tsp spirulina or chlorella', '1 tsp glutathione (reduced) powder', '½ tsp NAC powder', '1 cup green tea (cooled)', '½ cup frozen berries', '1 tbsp flaxseeds'],
  },
  {
    id: 'sauna', name: 'Infrared Sauna Detox', category: 'Physical',
    desc: 'A heat-based recovery ritual that encourages sweating and relaxation. Hydrate well, keep sessions modest, and avoid use when heat exposure is unsafe for you.',
    recipe: 'Pre/Post Sauna Hydration Drink',
    ingredients: ['2 cups filtered water', 'Pinch of pink Himalayan salt', 'Juice of ½ lemon', '¼ tsp magnesium powder', '1 tsp raw honey or coconut water', 'Electrolyte minerals — drink before and after'],
  },
  {
    id: 'diet', name: 'Detox Diets (Whole30 / Elimination)', category: 'Lifestyle',
    desc: 'Systematic elimination of common inflammatory foods to identify sensitivities and reset the gut.',
    recipe: 'Elimination Diet Smoothie',
    ingredients: ['1 cup coconut milk', '1 banana', '½ cup blueberries', '2 tbsp sunflower seed butter', '1 tbsp hemp seeds', '1 tsp cinnamon', 'No dairy, soy, gluten, corn, or added sugar'],
  },
];

const DETOX_CATEGORY_COLORS = {
  Physical:  '#a3e635',
  Herbal:    '#34d399',
  Lifestyle: '#38bdf8',
  Medical:   '#fb923c',
};

function DetoxGuide({ onBack, onSelectSection }) {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  const categories = ['Physical', 'Herbal', 'Lifestyle', 'Medical'];

  return (
    <InnerAtlasShell activeId="detox" onBack={onBack} onSelectSection={onSelectSection} title="Detox Guide">
      <div className="ia-section-head">
        <div className="ia-eyebrow">Cleansing & reset</div>
        <h2 className="ia-title">Detox Guide</h2>
        <p className="ia-lede">
          19 recognized detox types — physical, herbal, lifestyle, and medical. Tap any to see ingredients and a smoothie recipe.
        </p>
      </div>

      {categories.map(cat => {
        const color = DETOX_CATEGORY_COLORS[cat];
        const items = DETOXES.filter(d => d.category === cat);
        return (
          <div key={cat} style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color, marginBottom: 12,
            }}>{cat}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map(detox => (
                <div key={detox.id}>
                  <button
                    type="button"
                    onClick={() => toggle(detox.id)}
                    className="ia-card"
                    style={{
                      width: '100%', textAlign: 'left', cursor: 'pointer',
                      borderColor: expanded === detox.id ? `${color}55` : `${color}20`,
                      background: expanded === detox.id ? `${color}0d` : 'rgba(255,255,255,0.03)',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
                      fontFamily: 'inherit',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
                        {detox.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--ia-text-dim)', lineHeight: 1.6 }}>
                        {detox.desc}
                      </div>
                    </div>
                    <span style={{ color, flexShrink: 0, fontSize: '1rem', marginTop: 2 }}>
                      {expanded === detox.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {expanded === detox.id && (
                    <div style={{
                      background: `${color}08`,
                      border: `1px solid ${color}28`,
                      borderTop: 'none',
                      borderRadius: '0 0 14px 14px',
                      padding: '16px 20px',
                    }}>
                      <div style={{
                        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                        textTransform: 'uppercase', color, marginBottom: 10,
                      }}>
                        {detox.recipe}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                        {detox.ingredients.map((ing, i) => (
                          <span key={i} style={{
                            fontSize: '0.78rem', color: '#cbd5e1',
                            background: `${color}12`,
                            border: `1px solid ${color}25`,
                            borderRadius: 999, padding: '4px 12px',
                          }}>
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </InnerAtlasShell>
  );
}

// ─── Regulation Tools data ──────────────────────────────────────────────────

const REGULATION_TOOLS = [
  {
    icon: '〜',
    name: 'Breathing',
    color: '#67e8f9',
    summary: 'Direct, immediate control over the nervous system through the breath.',
    techniques: [
      { name: 'Box Breathing', desc: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Activates parasympathetic state.' },
      { name: '4-7-8', desc: 'Inhale 4s → Hold 7s → Exhale 8s. Slows heart rate and induces calm.' },
      { name: 'Physiological Sigh', desc: 'Double inhale through nose → long exhale. Fastest known way to reduce acute stress.' },
    ],
  },
  {
    icon: '◎',
    name: 'Grounding',
    color: '#7ab979',
    summary: 'Anchor the nervous system in the present moment through sensory input.',
    techniques: [
      { name: '5-4-3-2-1 Senses', desc: '5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.' },
      { name: 'Cold Water', desc: 'Splash cold water on your face or hold ice. Activates the dive reflex — immediate calm.' },
      { name: 'Feet on Floor', desc: 'Stand barefoot, press feet into the ground. Physical anchoring stops dissociation.' },
    ],
  },
  {
    icon: '✎',
    name: 'Journaling',
    color: '#fbbf24',
    summary: 'Externalise the loop. Write it out to see it clearly.',
    techniques: [
      { name: 'Stream of Consciousness', desc: 'Write everything unfiltered for 5 minutes. Gets the loop out of the body.' },
      { name: 'CBT Thought Record', desc: 'Thought → Emotion → Evidence for/against → Reframe. Breaks distorted thinking.' },
      { name: 'Gratitude', desc: '3 specific things you are grateful for. Shifts focus from threat to resource.' },
    ],
  },
  {
    icon: '△',
    name: 'Reframing',
    color: '#a78bfa',
    summary: 'Change the thought upstream, and the feeling follows.',
    techniques: [
      { name: 'Cognitive Reappraisal', desc: '"What else could this mean?" — one question that opens the situation.' },
      { name: 'Stoic Sorting', desc: '"Is this in my control?" Sort every burden into what you can and cannot change.' },
      { name: 'Time Distance', desc: 'How will I see this in 10 years? 10 months? 10 minutes?' },
    ],
  },
  {
    icon: '◯',
    name: 'Meditation',
    color: '#34d399',
    summary: 'Train the witnessing self — the part that watches without being swept.',
    techniques: [
      { name: 'Body Scan', desc: 'Start at the feet, move upward, notice sensation without judgment. 5–20 min.' },
      { name: 'Loving-Kindness', desc: 'Wish yourself well first, then extend it outward. Builds self-compassion and oxytocin.' },
      { name: 'Observing Thoughts', desc: "Watch thoughts like clouds passing. Don't engage — just observe." },
    ],
  },
  {
    icon: '⟳',
    name: 'Body Release',
    color: '#f9a8d4',
    summary: 'Stress is stored in the body — release it physically, not just mentally.',
    techniques: [
      { name: 'Progressive Muscle Relaxation', desc: 'Tense each muscle group → hold → release. Teaches the body the feel of ease.' },
      { name: 'Shaking / TRE', desc: 'Allow the body to vibrate or shake voluntarily. Discharges stored stress from the system.' },
      { name: 'Yoga Nidra', desc: 'Guided practice between waking and sleeping. Deep nervous-system restoration in 20–30 min.' },
    ],
  },
  {
    icon: '⌂',
    name: 'Nervous System Reset',
    color: '#fb923c',
    summary: 'Full-cycle reset after sustained stress or chronic activation.',
    techniques: [
      { name: 'Cold Exposure', desc: 'Cold shower (2–3 min) or cold plunge. Increases vagal tone and lowers cortisol over time.' },
      { name: 'Humming / Singing', desc: 'Vibrates the vagus nerve through the throat. Directly shifts into parasympathetic state.' },
      { name: 'Morning Sunlight', desc: '10 min of direct sunlight in the first hour. Sets circadian rhythm and cortisol anchor.' },
    ],
  },
];

// ─── Regulation Tools ──────────────────────────────────────────────────────

function RegulationTools({ onBack, onSelectSection }) {
  return (
    <InnerAtlasShell activeId="regulation" onBack={onBack} onSelectSection={onSelectSection} title="Regulation Tools">
      <div className="ia-section-head">
        <div className="ia-eyebrow">Nervous-system reset</div>
        <h2 className="ia-title">Regulation Tools</h2>
        <p className="ia-lede">
          Direct, practical techniques for calming the nervous system, breaking the anxiety loop, and returning to yourself.
        </p>
      </div>
      <div className="ia-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {REGULATION_TOOLS.map(tool => (
          <div key={tool.name} className="ia-card" style={{ borderColor: `${tool.color}2e` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: '1.4rem', lineHeight: 1, color: tool.color }}>{tool.icon}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: tool.color, margin: 0 }}>{tool.name}</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ia-text-dim)', margin: '0 0 16px', lineHeight: 1.6 }}>{tool.summary}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {tool.techniques.map(t => (
                <div key={t.name} style={{
                  background: `${tool.color}09`,
                  border: `1px solid ${tool.color}22`,
                  borderRadius: 10,
                  padding: '10px 14px',
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: tool.color, marginBottom: 3 }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ia-text-dim)', lineHeight: 1.55 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </InnerAtlasShell>
  );
}

// ─── Hub landing page ────────────────────────────────────────────────────────

function Hub({ onBack, onSelect }) {
  return (
    <InnerAtlasShell
      activeId="hub"
      onBack={onBack}
      onSelectSection={onSelect}
      title="A map of the inner world"
      backLabel="Back"
      container={false}
    >
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: 16, lineHeight: 1, color: 'var(--ia-accent)' }}>◍</div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          InnerAtlas
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--ia-text-dim)', margin: '12px auto 0', maxWidth: 480, lineHeight: 1.65 }}>
          A map of the mind, body, nervous system, and emotional patterns.
        </p>
      </div>

      <div style={{
        maxWidth: 1020,
        margin: '0 auto',
        padding: '36px 24px 64px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: 18,
      }}>
        {SECTIONS.map(s => {
          const p = PAL[s.id];
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className="ia-card ia-card--interactive"
              style={{
                background: p.bg,
                borderColor: p.br,
                textAlign: 'left',
                fontFamily: 'inherit',
                ['--ia-accent-rgb']: IA_ACCENTS[s.id]?.rgb,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: '1.5rem', lineHeight: 1, color: p.c }}>{s.icon}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>{s.title}</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ia-text-dim)', margin: '0 0 14px', lineHeight: 1.65 }}>
                {s.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.7rem', fontWeight: 600,
                    color: p.c, background: `${p.c}14`, border: `1px solid ${p.c}28`,
                    borderRadius: 999, padding: '3px 10px',
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: '0.82rem', fontWeight: 600, color: p.c }}>
                Explore →
              </div>
            </button>
          );
        })}
      </div>
    </InnerAtlasShell>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function InnerAtlas({ onBack, onNavigate, initialSection }) {
  // Relationship Clarity & Patterns now live in the Sexual Energy portal —
  // redirect any legacy InnerAtlas deep-link there, keeping the sub-section.
  const redirectRelationship = RELATIONSHIP_REDIRECTS.has(initialSection);
  useEffect(() => {
    if (redirectRelationship) {
      onNavigate?.('sexualenergy', { section: initialSection });
    }
  }, [redirectRelationship, initialSection, onNavigate]);

  const mapped = SECTION_MAP[initialSection] ?? null;
  const [activeSection, setActiveSection] = useState(mapped?.id ?? null);
  const deepSub = mapped?.sub ?? null;

  const goHub = () => {
    setActiveSection(null);
  };

  if (redirectRelationship) {
    return null;
  }

  if (!activeSection) {
    return <Hub onBack={onBack} onSelect={setActiveSection} />;
  }

  if (activeSection === 'psychology') {
    return (
      <PsychologyPortal
        onBack={goHub}
        onSelectSection={setActiveSection}
        onNavigate={(id, opts) => {
          if (id === 'inneratlas' || id === 'innerbalance') {
            goHub();
          } else {
            onNavigate?.(id, opts);
          }
        }}
        initialSection={deepSub}
      />
    );
  }

  if (activeSection === 'regulation') {
    return <RegulationTools onBack={goHub} onSelectSection={setActiveSection} />;
  }

  if (activeSection === 'emotions') {
    return <EmotionsAtlas onBack={goHub} onSelectSection={setActiveSection} />;
  }

  if (activeSection === 'awareness') {
    return <AwarenessAtlas onBack={goHub} initialSection={deepSub} />;
  }

  if (activeSection === 'consciousness-map') {
    return <ConsciousnessMap onBack={goHub} initialSection={deepSub} />;
  }

  if (activeSection === 'detox') {
    return <DetoxGuide onBack={goHub} onSelectSection={setActiveSection} />;
  }

  if (activeSection === 'manifestation') {
    return <ManifestationBlocks onBack={goHub} onSelectSection={setActiveSection} />;
  }

  // nervous-system | mood-neurochemistry | lifestyle → InnerBalanceAtlasBase
  if (activeSection === 'colorpsychology') {
    return <ColorPsychologyAtlas onBack={goHub} onSelectSection={setActiveSection} />;
  }

  const defaultSub = {
    'nervous-system': 'psychophysiology',
    'mood-neurochemistry': 'neurotransmitters',
    'lifestyle': 'sleep',
  }[activeSection];

  return (
    <InnerBalanceAtlasBase
      onBack={goHub}
      onSelectSection={setActiveSection}
      activeSectionId={activeSection}
      onNavigate={null}
      initialSection={deepSub || defaultSub}
    />
  );
}
