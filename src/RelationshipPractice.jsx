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

const skillAreas = [
  {
    id: 'communication',
    icon: '🗣️',
    accent: '#38bdf8',
    title: 'Communication',
    description: 'Naming what is true and asking for what you need — clearly, and without assuming.',
    skills: [
      'Naming feelings clearly instead of hinting or acting them out',
      'Expressing needs directly rather than hoping to be read',
      'Making requests, not demands — leaving room for a no',
      'Active listening: letting them finish before you respond',
      'Reflecting back what you heard before reacting to it',
      'Emotional validation — acknowledging a feeling without needing to agree',
      'Asking rather than assuming what a partner meant',
      'Discussing difficult topics directly, and choosing a good time',
    ],
    scripts: [
      '“When X happened, I felt Y.”',
      '“What I need is…”',
      '“Would you be willing to…?”',
      '“What I hear you saying is…”',
      '“Did I understand that correctly?”',
      '“I’m becoming overwhelmed. I want to return to this in 30 minutes.”',
    ],
  },
  {
    id: 'conflict-repair',
    icon: '🤝',
    accent: '#34d399',
    title: 'Conflict and Repair',
    description: 'Fighting fair, taking responsibility, and reconnecting afterward — one issue at a time.',
    skills: [
      'Regulating your body before responding, not after',
      'Staying on one issue instead of stacking old ones',
      'Avoiding character attacks — describe the behavior, not the person',
      'Taking responsibility for your part without excuses',
      'Making a complete apology (see the anatomy below)',
      'Receiving an apology without immediately relitigating',
      'Using small repair attempts — a joke, a hand, “let’s slow down”',
      'Reconnecting deliberately after conflict, not just moving on',
      'Negotiating recurring differences instead of re-fighting them',
      'Recognizing when conflict has stopped being safe',
    ],
    apology: [
      'What happened — name the specific thing you did',
      'Recognition of the impact it had on them',
      'Responsibility, without “but” or excuses',
      'Genuine remorse',
      'A repair action — what you’ll do to make it right',
      'Changed behavior going forward',
    ],
  },
  {
    id: 'consent',
    icon: '💬',
    accent: '#f9a8d4',
    title: 'Consent and Sexual Communication',
    description: 'Consent as an ongoing conversation, and sexuality talked about with respect and care.',
    principles: [
      'Consent must be freely given — not pressured or worn down',
      'Consent is specific — yes to one thing is not yes to everything',
      'Consent is ongoing — checked in, not assumed once',
      'Consent can be withdrawn at any point, for any reason',
      'Past consent does not guarantee present consent',
      'Silence is not consent',
      'Pressure is not consent',
      'A relationship does not create sexual entitlement',
    ],
    skills: [
      'Asking about preferences instead of guessing',
      'Discussing boundaries before, not after',
      'Navigating desire differences without pressure or guilt',
      'Handling sexual rejection respectfully',
      'Initiating in a way that invites rather than pressures',
      'Having sexual-health and testing conversations',
      'Agreeing on contraception expectations together',
      'Respecting privacy about what happens between you',
      'Treating sexting and image-sharing as its own explicit consent',
      'Never sharing intimate images or messages without explicit permission',
    ],
    note:
      'Consent is not optional and cannot be overridden by a relationship, marriage, prior intimacy, or someone’s persistence. Pressuring, coercing, or ignoring a no is a violation, and sharing someone’s intimate images without consent is abuse and, in many places, a crime. If any of this is happening to you, support is available — a trusted person, a therapist, or a sexual-assault helpline.',
  },
];

const PRACTICE_TABS = [
  { id: "foundations", label: "Foundations" },
  { id: "skills", label: "Relationship Skills" },
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

function SkillList({ label, items, accent }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>{label}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate-300">
            <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderSkills() {
  return (
    <div>
      <SectionTitle
        eyebrow="Skills you can practice"
        title="Relationship Skills"
        text="The practical, learnable skills of healthy relating — how to communicate, how to handle conflict and repair, and how to hold consent and sexual communication with respect. These describe skills to build, not diagnoses of you or anyone else."
      />

      <div className="space-y-6">
        {skillAreas.map((area) => (
          <Card key={area.id}>
            <div className="mb-5 flex items-start gap-3">
              <span className="text-2xl leading-none">{area.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{area.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{area.description}</p>
              </div>
            </div>

            {area.principles && (
              <div className="mb-5 rounded-2xl border p-4" style={{ borderColor: `${area.accent}30`, background: `${area.accent}0f` }}>
                <SkillList label="The ground rules of consent" items={area.principles} accent={area.accent} />
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {area.skills && <SkillList label="Skills to practice" items={area.skills} accent={area.accent} />}

              {area.scripts && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: area.accent }}>Scripts to borrow</p>
                  <div className="space-y-2">
                    {area.scripts.map((line) => (
                      <p key={line} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm leading-6 text-slate-200">{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {area.apology && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: area.accent }}>Anatomy of a complete apology</p>
                  <ol className="space-y-2">
                    {area.apology.map((step, i) => (
                      <li key={step} className="flex gap-2.5 text-sm leading-6 text-slate-300">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${area.accent}22`, color: area.accent }}>{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {area.note && (
              <p className="mt-5 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-xs leading-6 text-slate-200">
                <span className="mr-1 font-black text-rose-300">Safety note.</span>{area.note}
              </p>
            )}
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
    if (tab === "skills") return renderSkills();
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
