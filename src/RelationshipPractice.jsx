// How sexual energy and devotion are expressed inside a relationship —
// foundations, marriage, dynamics, and scripting. Lives inside the
// Relationship Hub alongside Clarity and Patterns.
import { useState } from "react";
import RelationshipFoundations from "./RelationshipFoundations";

const marriageThemes = [
  {
    id: 'emotional',
    icon: '🌹',
    title: 'Core Emotional Foundations',
    accent: '#fb7185',
    description: 'The emotional stability and longevity of marriage.',
    themes: ['Trust', 'Emotional safety', 'Intimacy', 'Devotion', 'Vulnerability', 'Forgiveness', 'Gratitude', 'Commitment', 'Harmony', 'Companionship'],
  },
  {
    id: 'spiritual',
    icon: '🕊️',
    title: 'Spiritual & Sacred Union',
    accent: '#a78bfa',
    description: 'Marriage as a spiritual container for growth and meaning.',
    themes: ['Soul alignment', 'Divine partnership', 'Sacred bond', 'Unconditional love', 'Oneness', 'Shared values', 'Emotional healing', 'Mutual evolution', 'Purpose-driven union'],
  },
  {
    id: 'passion',
    icon: '🔥',
    title: 'Passion & Romantic Vitality',
    accent: '#fb923c',
    description: 'Keeps the relationship alive, expressive, and embodied.',
    themes: ['Desire', 'Attraction', 'Chemistry', 'Playfulness', 'Romantic presence', 'Magnetism', 'Sensual connection', 'Physical intimacy', 'Tender affection'],
  },
  {
    id: 'integrity',
    icon: '🛡️',
    title: 'Structural & Relational Integrity',
    accent: '#38bdf8',
    description: 'What makes marriage feel secure, grounded, and functional.',
    themes: ['Loyalty', 'Respect', 'Equality', 'Transparency', 'Partnership', 'Team mentality', 'Home-building', 'Shared vision', 'Emotional reliability'],
  },
  {
    id: 'growth',
    icon: '🌿',
    title: 'Individual Growth Within Marriage',
    accent: '#34d399',
    description: 'Marriage as a space where two whole individuals continue evolving.',
    themes: ['Patience', 'Self-awareness', 'Compassion', 'Emotional regulation', 'Supportiveness', 'Healthy boundaries', 'Maturity', 'Healing past patterns'],
  },
  {
    id: 'endearment',
    icon: '💌',
    title: 'Terms of Endearment',
    accent: '#f9a8d4',
    description: 'The intimate vocabulary of love — words that carry warmth, closeness, and belonging.',
    themes: ['Honey', 'Sweetheart', 'Darling', 'Love', 'Babe', 'Baby', 'Angel', 'Dear', 'Cutie', 'Sunshine'],
  },
];

const scriptThemes = [
  {
    id: 'sleep',
    icon: '🌙',
    title: 'Shared Sleep & Rest',
    accent: '#38bdf8',
    description: 'The quiet closeness of rest as a couple.',
    items: ['Falling asleep together', 'Waking up beside each other', 'Lazy mornings, no rush', 'Naps that feel safe'],
  },
  {
    id: 'home',
    icon: '🏡',
    title: 'Home & Daily Life',
    accent: '#fbbf24',
    description: 'The ordinary rhythm of life together.',
    items: ['Cooking together', 'Errands as a team', 'Small home rituals', 'Shared space that feels like "ours"'],
  },
  {
    id: 'presence',
    icon: '🤍',
    title: 'Presence & Stillness',
    accent: '#a78bfa',
    description: 'Closeness that doesn\'t need to perform.',
    items: [
      'Walking together in public, unhurried',
      'Sitting together in comfortable silence',
      'Eye contact without tension',
      'Breathing together to slow the nervous system',
      'Being bored together — and okay with it',
      'Existing in the same space, doing different things',
    ],
  },
  {
    id: 'commitment',
    icon: '⚓',
    title: 'Commitment & Stability',
    accent: '#34d399',
    description: 'Love that feels settled, not urgent.',
    items: [
      'Living together naturally',
      'Coming home to her consistently',
      'Planning the future without pressure',
      'Shared routines that feel grounding',
      'Feeling chosen daily, not dramatically',
      'Trust that doesn\'t need reassurance',
    ],
  },
  {
    id: 'grounding',
    icon: '🏔',
    title: 'Protection & Grounding',
    accent: '#94a3b8',
    description: 'Masculine calm as a steady presence.',
    items: [
      'Holding space when she\'s tired',
      'Quiet confidence beside her',
      'Being her safe place, not her excitement source',
      'Leading gently without force',
      'Staying steady when emotions arise',
    ],
  },
  {
    id: 'living-end',
    icon: '✧',
    title: '"Living in the End" Scripts',
    accent: '#a78bfa',
    description: 'Scripting from the state of already having it.',
    items: [
      'Normal evenings as a couple',
      'Weekends that feel familiar',
      'Shared sleep as a baseline reality',
      'Mutual comfort as the default',
      'Love that feels settled, not urgent',
    ],
  },
  {
    id: 'perspective',
    icon: '↻',
    title: 'Perspective Shifts',
    accent: '#fbbf24',
    description: 'Different lenses for writing and embodying scripts.',
    items: [
      'From your perspective',
      'From her perspective',
      'From a "we" perspective',
      'Short affirmation-style scripts',
      'Long, cinematic narrative scripts',
    ],
  },
];

const relationshipDynamics = [
  {
    id: 'healthy',
    icon: '✦',
    title: 'Healthy & Fulfilling',
    accent: '#34d399',
    description: 'The foundation of a thriving partnership.',
    items: ['Mutual Respect', 'Open Communication', 'Emotional Safety', 'Support & Encouragement', 'Balance & Equality', 'Playfulness & Fun', 'Passion & Intimacy', 'Adaptability'],
  },
  {
    id: 'struggling',
    icon: '◎',
    title: 'Struggling or Challenging',
    accent: '#fbbf24',
    description: 'Patterns that create friction and distance.',
    items: ['Miscommunication', 'Emotional Distance', 'Control & Dominance', 'Codependency', 'Avoidance', 'Passive-Aggressiveness', 'Jealousy & Possessiveness', 'Lack of Appreciation'],
  },
  {
    id: 'toxic',
    icon: '⚠',
    title: 'Unstable or Toxic',
    accent: '#fb7185',
    description: 'Dynamics that cause harm and erode trust.',
    items: ['Manipulation', 'Gaslighting', 'Neglect', 'Frequent Power Struggles', 'Inconsistency', 'Hostility & Blame', 'Emotional or Physical Abuse'],
  },
  {
    id: 'evolving',
    icon: '↑',
    title: 'Evolving & Growth-Oriented',
    accent: '#a78bfa',
    description: 'Dynamics that carry a relationship forward.',
    items: ['Healing & Rebuilding', 'Personal Growth Together', 'Rekindling Passion', 'Boundaries & Independence', 'Forgiveness & Understanding', 'Long-Distance Love'],
  },
];

const togethernessEmotions = [
  { name: 'Attraction',  desc: 'The initial spark — physical, emotional, or intellectual.' },
  { name: 'Excitement',  desc: 'The thrill of getting to know someone new.' },
  { name: 'Happiness',   desc: 'Joy and contentment in each other\'s presence.' },
  { name: 'Curiosity',   desc: 'The desire to learn more about the other person.' },
  { name: 'Comfort',     desc: 'A sense of safety and ease when together.' },
  { name: 'Trust',       desc: 'The foundation for deepening the bond.' },
  { name: 'Affection',   desc: 'A growing sense of care and tenderness.' },
  { name: 'Passion',     desc: 'Strong romantic or physical desire.' },
  { name: 'Admiration',  desc: 'Respecting and valuing each other.' },
  { name: 'Connection',  desc: 'Deep emotional resonance — feeling truly understood.' },
];

const marriageUseCases = [
  ['Affirmations', 'Write calm, grounded statements using any theme as the anchor word.'],
  ['Scripting', 'Describe your marriage in present-tense language from each dimension.'],
  ['Journaling', 'Pick one theme per day and write freely for 5 minutes.'],
  ['Intention setting', 'Choose one theme per week to consciously embody and notice.'],
];

const PRACTICE_TABS = [
  { id: "foundations", label: "Foundations" },
  { id: "marriage", label: "Marriage" },
  { id: "dynamics", label: "Dynamics" },
  { id: "scripts", label: "Scripts" },
];

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{eyebrow}</p>
      <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      {text && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">{text}</p>}
    </div>
  );
}

function renderMarriage() {
  return (
    <div>
      <SectionTitle
        eyebrow="Sacred union"
        title="Themes of Marriage"
        text="Five dimensions of a thriving marriage — emotional foundation, spiritual depth, romantic vitality, relational integrity, and individual growth. Use as a lens for reflection, scripting, journaling, or intention setting."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {marriageThemes.map((cat) => (
          <Card key={cat.id}>
            <div className="mb-4 flex items-start gap-3">
              <span className="text-2xl leading-none">{cat.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white">{cat.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{cat.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.themes.map((theme) => (
                <span
                  key={theme}
                  style={{ color: cat.accent, background: `${cat.accent}14`, borderColor: `${cat.accent}30` }}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {theme}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Ways to use these themes</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {marriageUseCases.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Emotions of Being Together</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {togethernessEmotions.map((e) => (
            <div key={e.name} className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.05] p-4">
              <p className="text-sm font-bold text-rose-300">{e.name}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderScripts() {
  return (
    <div>
      <SectionTitle
        eyebrow="Conscious scripting"
        title="Relationship Script Themes"
        text="Eight categories of closeness — sleep, home, emotional safety, presence, commitment, grounding, living in the end, and perspective shifts. Use any theme as a starting point for scripting, journaling, or visualization."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {scriptThemes.map((cat) => (
          <Card key={cat.id}>
            <div className="mb-4 flex items-start gap-3">
              <span className="text-2xl leading-none">{cat.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white">{cat.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{cat.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  style={{ color: cat.accent, background: `${cat.accent}14`, borderColor: `${cat.accent}30` }}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function renderDynamics() {
  return (
    <div>
      <SectionTitle
        eyebrow="Relationship awareness"
        title="Dynamics of a Relationship"
        text="Four categories of relationship dynamics — from healthy and fulfilling to toxic and destabilizing. Use this as a mirror to name what's present, what's missing, and what direction things are moving."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {relationshipDynamics.map((cat) => (
          <Card key={cat.id}>
            <div className="mb-4 flex items-start gap-3">
              <span style={{ color: cat.accent }} className="text-2xl leading-none font-bold">{cat.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white">{cat.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{cat.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  style={{ color: cat.accent, background: `${cat.accent}14`, borderColor: `${cat.accent}30` }}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function RelationshipPractice({ initialSection }) {
  const initial = PRACTICE_TABS.some((t) => t.id === initialSection) ? initialSection : "foundations";
  const [tab, setTab] = useState(initial);

  const renderTab = () => {
    if (tab === "marriage") return renderMarriage();
    if (tab === "dynamics") return renderDynamics();
    if (tab === "scripts") return renderScripts();
    return <RelationshipFoundations />;
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <SectionTitle
        eyebrow="Inside the relationship"
        title="Relationship Practice"
        text="Marriage, dynamics, and scripting — how devotion and sexual energy are meant to be expressed inside a relationship, with honesty and without losing yourself to it."
      />
      <nav className="mb-8 flex flex-wrap gap-2">
        {PRACTICE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-2xl border px-4 py-2 text-sm font-bold transition ${tab === t.id ? "border-white/15 bg-white text-slate-950" : "border-white/15 bg-white/[0.06] text-white/80 hover:bg-white/[0.1] hover:text-white"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {renderTab()}
    </div>
  );
}
