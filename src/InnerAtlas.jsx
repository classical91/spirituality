import { useEffect, useState } from 'react';
import InnerBalanceAtlasBase from './InnerBalanceAtlasBase';
import PsychologyPortal from './PsychologyPortal';
import ColorPsychologyAtlas from './ColorPsychologyAtlas';
import EmotionsAtlas from './EmotionsAtlas';
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
  dashboard:         { id: null,                  sub: null },
  // Psychology Portal internal tab IDs
  overview:    { id: 'psychology', sub: 'overview' },
  frameworks:  { id: 'psychology', sub: 'frameworks' },
  powerstack:  { id: 'psychology', sub: 'powerstack' },
  growth:      { id: 'psychology', sub: 'growth' },
  nutrients:   { id: 'psychology', sub: 'nutrients' },
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
];

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
