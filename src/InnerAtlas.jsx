import { useState } from 'react';
import InnerBalanceAtlasBase from './InnerBalanceAtlasBase';
import PsychologyPortal from './PsychologyPortal';
import ColorPsychologyAtlas from './ColorPsychologyAtlas';
import RelationshipClarityPortal from './RelationshipClarityPortal';

// ─── Section mapping (handles legacy ?section= params from old portals) ──────

const SECTION_MAP = {
  'nervous-system':        { id: 'nervous-system',        sub: 'psychophysiology' },
  'psychology':            { id: 'psychology',            sub: null },
  'mood-neurochemistry':   { id: 'mood-neurochemistry',   sub: 'neurotransmitters' },
  'lifestyle':             { id: 'lifestyle',             sub: 'sleep' },
  'regulation':            { id: 'regulation',            sub: null },
  'relationship-patterns': { id: 'relationship-patterns', sub: null },
  'relationship-clarity':  { id: 'relationship-clarity',  sub: null },
  // Legacy Relationship Clarity Portal section IDs
  'security-vs-fear':       { id: 'relationship-clarity', sub: 'security-vs-fear' },
  'mixed-signals':          { id: 'relationship-clarity', sub: 'mixed-signals' },
  'chasing-vs-receiving':   { id: 'relationship-clarity', sub: 'chasing-vs-receiving' },
  'pedestalizing':          { id: 'relationship-clarity', sub: 'pedestalizing' },
  'standards':              { id: 'relationship-clarity', sub: 'standards' },
  'boundaries':             { id: 'relationship-clarity', sub: 'boundaries' },
  'devotion':               { id: 'relationship-clarity', sub: 'devotion' },
  'honest-direct':          { id: 'relationship-clarity', sub: 'honest-direct' },
  'texting-urges':          { id: 'relationship-clarity', sub: 'texting-urges' },
  'clarity-check':          { id: 'relationship-clarity', sub: 'clarity-check' },
  'pause-check':            { id: 'relationship-clarity', sub: 'pause-check' },
  // Legacy InnerBalance Atlas tab IDs
  psychophysiology:  { id: 'nervous-system',      sub: 'psychophysiology' },
  stress:            { id: 'nervous-system',      sub: 'stress' },
  neurotransmitters: { id: 'mood-neurochemistry', sub: 'neurotransmitters' },
  mooduplift:        { id: 'mood-neurochemistry', sub: 'mooduplift' },
  physicalactivity:  { id: 'lifestyle',           sub: 'physicalactivity' },
  sleep:             { id: 'lifestyle',           sub: 'sleep' },
  nutrition:         { id: 'lifestyle',           sub: 'nutrition' },
  colorpsychology:   { id: 'lifestyle',           sub: 'colorpsychology' },
  dashboard:         { id: null,                  sub: null },
  // Psychology Portal internal tab IDs
  overview:    { id: 'psychology', sub: 'overview' },
  frameworks:  { id: 'psychology', sub: 'frameworks' },
  powerstack:  { id: 'psychology', sub: 'powerstack' },
  nutrients:   { id: 'psychology', sub: 'nutrients' },
};

// ─── Section palette ────────────────────────────────────────────────────────

const PAL = {
  'nervous-system':        { c: '#7ab979', bg: 'rgba(122,185,121,0.10)', br: 'rgba(122,185,121,0.26)' },
  'psychology':            { c: '#67e8f9', bg: 'rgba(103,232,249,0.08)', br: 'rgba(103,232,249,0.26)' },
  'mood-neurochemistry':   { c: '#a78bfa', bg: 'rgba(167,139,250,0.08)', br: 'rgba(167,139,250,0.26)' },
  'lifestyle':             { c: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  br: 'rgba(251,191,36,0.26)'  },
  'regulation':            { c: '#34d399', bg: 'rgba(52,211,153,0.08)',  br: 'rgba(52,211,153,0.26)'  },
  'relationship-patterns': { c: '#f9a8d4', bg: 'rgba(249,168,212,0.08)', br: 'rgba(249,168,212,0.26)' },
  'relationship-clarity':  { c: '#fb7185', bg: 'rgba(251,113,133,0.08)',  br: 'rgba(251,113,133,0.26)'  },
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
    description: 'Sleep, nutrition, movement, sunlight, music, color psychology, and what shapes your daily state.',
    tags: ['Sleep', 'Nutrition', 'Movement'],
  },
  {
    id: 'regulation',
    icon: '〜',
    title: 'Regulation Tools',
    description: 'Breathing, grounding, journaling, reframing, meditation, body release, and nervous-system reset.',
    tags: ['Breathing', 'Grounding', 'Meditation'],
  },
  {
    id: 'relationship-patterns',
    icon: '♡',
    title: 'Relationship Patterns',
    description: 'Attachment, neediness, pedestalizing, ghosting wounds, emotional independence, and secure love.',
    tags: ['Attachment', 'Secure Love', 'Independence'],
  },
  {
    id: 'relationship-clarity',
    icon: '◇',
    title: 'Relationship Clarity',
    description: 'Mixed signals, texting urges, standards, chasing vs receiving — a dashboard for confusing moments.',
    tags: ['Mixed Signals', 'Standards', 'Clarity'],
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

// ─── Relationship Patterns data ─────────────────────────────────────────────

const RELATIONSHIP_PATTERNS = [
  {
    icon: '⌘',
    name: 'Attachment Styles',
    color: '#67e8f9',
    keyInsight: 'Your attachment style is not your identity — it is a learned strategy. It can change.',
    items: [
      { label: 'Secure', desc: 'Comfortable with closeness and independence. Can ask for needs, receive them, and let go.' },
      { label: 'Anxious', desc: 'Craves closeness but fears abandonment. Monitors, chases, over-explains to feel okay.' },
      { label: 'Avoidant', desc: 'Values independence. Pulls back when things get close. Struggles with vulnerability.' },
      { label: 'Disorganized', desc: 'Mix of anxious and avoidant — both wants and fears closeness. Often linked to unresolved trauma.' },
    ],
  },
  {
    icon: '↺',
    name: 'The Neediness Loop',
    color: '#a78bfa',
    keyInsight: 'Neediness is a signal that self-worth is outsourced. The exit is building it internally.',
    items: [
      { label: 'What it is', desc: 'Seeking validation, reassurance, or proof of love from someone else to feel okay.' },
      { label: 'Why it forms', desc: "When self-worth depends on another person's response rather than internal security." },
      { label: 'The loop', desc: 'Unmet need → reach out → brief relief → need returns stronger → reach out more urgently.' },
      { label: 'The exit', desc: 'Build internal security. Validate yourself first. Need yourself before needing them.' },
    ],
  },
  {
    icon: '◇',
    name: 'Ghosting Wounds',
    color: '#f9a8d4',
    keyInsight: "The brain registers social rejection as physical pain. It's real — and it's not about your worth.",
    items: [
      { label: 'What it triggers', desc: 'The brain registers social rejection as physical pain — same neural pathways as injury.' },
      { label: 'Why it feels so big', desc: 'It leaves no closure — the mind tries to fill the gap with stories about your value.' },
      { label: 'What it usually means', desc: "The other person's discomfort with directness. Not a verdict on who you are." },
      { label: 'How to process', desc: 'Name it, feel it fully. Resist the urge to explain it away or make contact to resolve it.' },
    ],
  },
  {
    icon: '✦',
    name: 'Pedestalizing',
    color: '#fbbf24',
    keyInsight: 'When you place someone above you, you disappear. Equality is the foundation of real connection.',
    items: [
      { label: 'What it is', desc: "Placing someone so high in your mind that their approval becomes the measure of your worth." },
      { label: 'What it costs', desc: 'Your power. Your perspective. Your ability to see them clearly as a person.' },
      { label: 'Why it happens', desc: 'Connected to insecurity — when you feel small, others seem bigger than they are.' },
      { label: 'The correction', desc: 'Remember they are a person — not a prize, not a judge. Bring them back to eye level.' },
    ],
  },
  {
    icon: '◈',
    name: 'Emotional Independence',
    color: '#34d399',
    keyInsight: 'Your baseline belongs to you. No one else should be the source of your okayness.',
    items: [
      { label: 'What it means', desc: "Your baseline mood and self-worth are not controlled by another person's behavior." },
      { label: 'What it is not', desc: 'Emotional detachment or not caring. Independence does not equal coldness.' },
      { label: 'The practice', desc: "Notice when you're waiting for someone else to make you feel okay — then provide it yourself." },
      { label: 'The signal', desc: "You can have a good day even when they haven't responded." },
    ],
  },
  {
    icon: '♡',
    name: 'Secure Love',
    color: '#fb7185',
    keyInsight: 'Secure love is not the absence of need — it is the absence of fear in the presence of need.',
    items: [
      { label: 'What it looks like', desc: 'Both people can be close AND independent. Requests made clearly, received without threat.' },
      { label: 'Giving securely', desc: 'From abundance, not fear. Generosity without scorekeeping or conditions.' },
      { label: 'Receiving securely', desc: 'Without guilt or disbelief. "I accept this — I am worth this."' },
      { label: 'Building it', desc: 'Stop performing. Say what you want. Allow space without filling it with anxiety.' },
    ],
  },
];

// ─── Shared styles ──────────────────────────────────────────────────────────

const pg = {
  minHeight: '100vh',
  background: '#0b0d18',
  color: '#e2e8f0',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
};

const tbBase = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: 'rgba(11,13,24,0.95)',
  backdropFilter: 'blur(14px)',
  padding: '14px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const backBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#e2e8f0',
  padding: '7px 14px',
  borderRadius: '999px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
};

function SectionBar({ label, onBack, color }) {
  return (
    <div style={{ ...tbBase, borderBottom: `1px solid ${color}30` }}>
      <button type="button" style={backBtnStyle} onClick={onBack}>← Back to InnerAtlas</button>
      <span style={{ fontSize: '13px', fontWeight: 700, color, marginLeft: 4 }}>{label}</span>
    </div>
  );
}

// ─── Regulation Tools ──────────────────────────────────────────────────────

function RegulationTools({ onBack }) {
  return (
    <div style={pg}>
      <SectionBar label="Regulation Tools" onBack={onBack} color="#34d399" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Regulation Tools</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8, fontSize: '1rem', maxWidth: 560, lineHeight: 1.65 }}>
            Direct, practical techniques for calming the nervous system, breaking the anxiety loop, and returning to yourself.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {REGULATION_TOOLS.map(tool => (
            <div key={tool.name} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${tool.color}2e`,
              borderRadius: 16,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1, color: tool.color }}>{tool.icon}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: tool.color, margin: 0 }}>{tool.name}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: '0 0 16px', lineHeight: 1.6 }}>{tool.summary}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {tool.techniques.map(t => (
                  <div key={t.name} style={{
                    background: `${tool.color}09`,
                    border: `1px solid ${tool.color}22`,
                    borderRadius: 10,
                    padding: '10px 14px',
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: tool.color, marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Relationship Patterns ──────────────────────────────────────────────────

function RelationshipPatterns({ onBack }) {
  return (
    <div style={pg}>
      <SectionBar label="Relationship Patterns" onBack={onBack} color="#f9a8d4" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Relationship Patterns</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8, fontSize: '1rem', maxWidth: 560, lineHeight: 1.65 }}>
            The repeating patterns underneath love, connection, and disconnection — what they are, why they form, and how to shift them.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {RELATIONSHIP_PATTERNS.map(pattern => (
            <div key={pattern.name} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${pattern.color}2e`,
              borderRadius: 16,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1, color: pattern.color }}>{pattern.icon}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: pattern.color, margin: 0 }}>{pattern.name}</h3>
              </div>
              <p style={{
                fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.38)',
                margin: '0 0 14px', lineHeight: 1.6,
                borderLeft: `2px solid ${pattern.color}40`, paddingLeft: 10,
              }}>
                {pattern.keyInsight}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pattern.items.map(item => (
                  <div key={item.label} style={{
                    background: `${pattern.color}07`,
                    border: `1px solid ${pattern.color}1e`,
                    borderRadius: 10,
                    padding: '10px 14px',
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: pattern.color, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hub landing page ────────────────────────────────────────────────────────

function Hub({ onBack, onSelect }) {
  return (
    <div style={pg}>
      <div style={{ ...tbBase, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button type="button" style={backBtnStyle} onClick={onBack}>← Back</button>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#86efac', letterSpacing: '0.01em' }}>InnerAtlas</span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginLeft: 2 }}>· A map of the inner world</span>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: 16, lineHeight: 1, color: '#86efac' }}>◍</div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          InnerAtlas
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.38)', margin: '12px auto 0', maxWidth: 480, lineHeight: 1.65 }}>
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
              style={{
                background: p.bg,
                border: `1px solid ${p.br}`,
                borderRadius: 18,
                padding: '26px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 14px 36px ${p.c}1a`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: '1.5rem', lineHeight: 1, color: p.c }}>{s.icon}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>{s.title}</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', margin: '0 0 14px', lineHeight: 1.65 }}>
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
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function InnerAtlas({ onBack, onNavigate, initialSection }) {
  const mapped = SECTION_MAP[initialSection] ?? null;
  const [activeSection, setActiveSection] = useState(mapped?.id ?? null);
  const deepSub = mapped?.sub ?? null;

  const [showColor, setShowColor] = useState(deepSub === 'colorpsychology');

  const goHub = () => {
    setActiveSection(null);
    setShowColor(false);
  };

  if (!activeSection) {
    return <Hub onBack={onBack} onSelect={setActiveSection} />;
  }

  if (activeSection === 'psychology') {
    return (
      <PsychologyPortal
        onBack={goHub}
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
    return <RegulationTools onBack={goHub} />;
  }

  if (activeSection === 'relationship-patterns') {
    return <RelationshipPatterns onBack={goHub} />;
  }

  if (activeSection === 'relationship-clarity') {
    return (
      <RelationshipClarityPortal
        onBack={goHub}
        onNavigate={(id, opts) => {
          if (id === 'relationships' || id === 'inneratlas') {
            goHub();
          } else {
            onNavigate?.(id, opts);
          }
        }}
        initialSection={deepSub}
      />
    );
  }

  // nervous-system | mood-neurochemistry | lifestyle → InnerBalanceAtlasBase
  if (activeSection === 'lifestyle' && showColor) {
    return (
      <ColorPsychologyAtlas
        onBack={() => setShowColor(false)}
        onNavigate={onNavigate}
      />
    );
  }

  const defaultSub = {
    'nervous-system': 'psychophysiology',
    'mood-neurochemistry': 'neurotransmitters',
    'lifestyle': 'sleep',
  }[activeSection];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBalanceAtlasBase
        onBack={goHub}
        onNavigate={null}
        initialSection={deepSub && deepSub !== 'colorpsychology' ? deepSub : defaultSub}
      />
      {activeSection === 'lifestyle' && (
        <button
          type="button"
          onClick={() => setShowColor(true)}
          className="iba-nav-btn"
          style={{
            position: 'fixed',
            left: 22,
            top: 438,
            zIndex: 90,
            width: 248,
            justifyContent: 'flex-start',
            boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
          }}
          aria-label="Open Color Psychology section"
        >
          <span className="iba-nav-icon" aria-hidden="true">🎨</span>
          Color Psychology
        </button>
      )}
    </div>
  );
}
