import { useMemo, useState } from "react";
import RelationshipClarityPortal from "./RelationshipClarityPortal";
import RelationshipPatterns from "./RelationshipPatterns";
import RelationshipFoundations from "./RelationshipFoundations";

// Tabs are split into four labeled clusters that move energy → discipline →
// connection → wholeness: what sexual energy is and how it gets shaped, how
// to hold it with self-mastery, how it shows up in relationships, and how
// the three tie together.
const tabGroups = [
  {
    label: "Sexual Energy",
    accent: "violet",
    tabs: [
      { id: "energy", label: "Energy" },
      { id: "porn", label: "Porn" },
    ],
  },
  {
    label: "Self-Mastery",
    accent: "sky",
    tabs: [
      { id: "overview", label: "Overview" },
      { id: "masturbation", label: "Masturbation" },
      { id: "celibacy", label: "Celibacy" },
      { id: "urges", label: "Urges" },
      { id: "tracker", label: "Tracker" },
      { id: "journal", label: "Journal" },
    ],
  },
  {
    label: "Relationships",
    accent: "rose",
    tabs: [
      { id: "foundations", label: "Foundations" },
      { id: "marriage", label: "Marriage" },
      { id: "dynamics", label: "Dynamics" },
      { id: "scripts", label: "Scripts" },
      { id: "relationship-clarity", label: "Relationship Clarity" },
      { id: "relationship-patterns", label: "Relationship Patterns" },
    ],
  },
  {
    label: "Integration",
    accent: "emerald",
    tabs: [{ id: "integration", label: "Integration" }],
  },
];

const tabs = tabGroups.flatMap((g) => g.tabs);

// Tinted chip styles for the clickable group labels in the tab navigator,
// so they read as section markers that blend with the rounded tab buttons.
const groupAccent = {
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200 hover:bg-violet-400/20",
  sky: "border-sky-400/30 bg-sky-400/10 text-sky-200 hover:bg-sky-400/20",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200 hover:bg-rose-400/20",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20",
};

const groupContainerAccent = {
  violet: "border-violet-400/20 bg-violet-400/[0.04]",
  sky: "border-sky-400/20 bg-sky-400/[0.04]",
  rose: "border-rose-400/20 bg-rose-400/[0.04]",
  emerald: "border-emerald-400/20 bg-emerald-400/[0.04]",
};

const tabIds = new Set(tabs.map((t) => t.id));

// Deep-link concept ids inside Relationship Clarity → resolve to that tab,
// carrying the concept id through as the sub-section the portal opens to.
const RELATIONSHIP_CLARITY_SECTIONS = new Set([
  "security-vs-fear", "mixed-signals", "chasing-vs-receiving", "pedestalizing",
  "reading-red-flags", "love-bombing", "control-and-isolation", "gaslighting",
  "contempt-and-criticism", "jealousy-and-possessiveness", "future-faking",
  "standards", "boundaries", "devotion", "honest-direct", "texting-urges",
  "clarity-check", "pause-check",
]);

// Legacy ?section= values from the former standalone Relationships & Love
// portal → map onto the equivalent tab here.
const SECTION_ALIASES = {
  clarity: "relationship-clarity",
  patterns: "relationship-patterns",
};

// Resolve an incoming ?section= value to { tab, sub }.
function resolveSection(section) {
  if (!section) return { tab: "overview", sub: null };
  if (SECTION_ALIASES[section]) return { tab: SECTION_ALIASES[section], sub: null };
  if (tabIds.has(section)) return { tab: section, sub: null };
  if (RELATIONSHIP_CLARITY_SECTIONS.has(section)) {
    return { tab: "relationship-clarity", sub: section };
  }
  return { tab: "overview", sub: null };
}

const energyExpressions = [
  { title: "Desire & attraction", text: "The pull toward another person, body, or experience — the raw signal before any action is taken." },
  { title: "Arousal & libido", text: "The physiological charge itself: how strong it runs, how often it shows up, how your body carries it." },
  { title: "Fantasy & imagination", text: "The mental rehearsal of desire — useful for noticing what you want, risky when it replaces real life." },
  { title: "Pleasure & passion", text: "The capacity to feel good in your body, and the drive that fuels creativity, ambition, and intensity outside the bedroom too." },
  { title: "Bonding", text: "Sexual energy is also a bonding mechanism — it pulls people toward closeness, attachment, and shared vulnerability." },
  { title: "Temptation", text: "The moment the pull asks for something you have not actually decided you want — worth noticing, not fearing." },
];

const energyShapers = [
  "Porn and its scripts of escalation and availability",
  "Repetition and conditioning — what you practice, your body learns to want",
  "Imagination filling in for real intimacy",
  "Emotional loneliness disguised as physical desire",
  "Stress and the nervous system looking for fast relief",
  "Insecurity seeking proof of being wanted",
  "Idealization — chasing a fantasy version of a person or experience",
];

const integrationPillars = [
  {
    title: "Energy",
    text: "Sexual energy itself is not the problem. It is raw fuel — desire, drive, creativity, the pull toward connection.",
    icon: "⚡",
  },
  {
    title: "Discipline",
    text: "Self-mastery is what keeps that fuel from running you. Awareness and impulse control turn energy into choice.",
    icon: "🧭",
  },
  {
    title: "Connection",
    text: "Relationships are where the energy is finally expressed — toward another person, with consent, safety, and honesty.",
    icon: "🤝",
  },
  {
    title: "Wholeness",
    text: "Integration is what happens when none of the three is suppressed or running unchecked — desire, discipline, and love working together.",
    icon: "🌿",
  },
];

const pillars = [
  {
    title: "No shame",
    text: "The goal is self-honesty, not self-attack. Shame usually makes the cycle worse.",
    icon: "🧭",
  },
  {
    title: "Choice over compulsion",
    text: "The core question is: am I choosing this, or am I using it to escape something?",
    icon: "🧠",
  },
  {
    title: "Body + values",
    text: "Sexual energy is not bad. The practice is learning how to hold it with maturity.",
    icon: "🔥",
  },
  {
    title: "Repair fast",
    text: "A slip is data, not a death sentence. Learn the trigger and reset the system.",
    icon: "🔁",
  },
];

const signals = [
  {
    label: "Healthy / neutral",
    color: "emerald",
    items: [
      "It feels private, intentional, and not secretive in a destructive way.",
      "It does not interfere with work, sleep, relationships, or self-respect.",
      "You can say yes or no without feeling controlled by the urge.",
      "It does not require extreme content, escalation, or numbness to feel anything.",
    ],
  },
  {
    label: "Worth checking",
    color: "amber",
    items: [
      "You mostly do it when lonely, stressed, rejected, bored, or anxious.",
      "You keep promising yourself to stop but repeat the same pattern.",
      "You feel emotionally flat, drained, or disconnected afterward.",
      "It starts replacing intimacy, dating, creativity, prayer, fitness, or purpose.",
    ],
  },
  {
    label: "Get support",
    color: "rose",
    items: [
      "It feels out of control and causes distress or real-life consequences.",
      "You hide major parts of your behavior from a partner or loved ones.",
      "It involves unsafe, illegal, coercive, or harmful behavior.",
      "You are using it to avoid pain, trauma, depression, or constant anxiety.",
    ],
  },
];

const celibacyTypes = [
  {
    title: "Reset celibacy",
    duration: "7–30 days",
    use: "Clear the nervous system, study triggers, lower compulsive momentum.",
    avoid: "Do not turn it into punishment or proof that you are broken.",
  },
  {
    title: "Spiritual celibacy",
    duration: "Chosen season",
    use: "Redirect attention toward prayer, meditation, devotion, study, and identity.",
    avoid: "Do not use spirituality to suppress honest loneliness or desire.",
  },
  {
    title: "Relational celibacy",
    duration: "Until trust is clear",
    use: "Slow down dating so connection, values, and emotional safety can lead.",
    avoid: "Do not use celibacy as a test, manipulation, or moral superiority game.",
  },
  {
    title: "Full abstinence",
    duration: "Personal choice",
    use: "A complete pause from solo or partnered sexual activity based on values.",
    avoid: "Do not isolate yourself or become rigid, fearful, or ashamed of your body.",
  },
];

const urgeTools = [
  {
    name: "Name the state",
    steps: ["I am feeling an urge.", "This is body energy, not an emergency.", "I can wait 10 minutes before acting."],
  },
  {
    name: "Change location",
    steps: ["Stand up.", "Leave the bedroom or bathroom.", "Go somewhere visible, bright, or public."],
  },
  {
    name: "Move the charge",
    steps: ["20 pushups, a walk, cold water on face, or stretching.", "Let the body discharge without sexualizing the feeling."],
  },
  {
    name: "Find the hidden need",
    steps: ["Ask: am I lonely, bored, angry, tired, anxious, or rejected?", "Meet that need directly."],
  },
  {
    name: "Delay, do not debate",
    steps: ["Set a 10-minute timer.", "No arguing with the urge.", "After 10 minutes, choose again from a calmer state."],
  },
  {
    name: "Repair after a slip",
    steps: ["No binge.", "No self-hate.", "Write the trigger.", "Reset the next 3 hours."],
  },
];

const myths = [
  {
    myth: "Masturbation automatically makes you weak.",
    grounded: "Not automatically. The real issue is whether the pattern is intentional, moderate, and aligned with your life.",
  },
  {
    myth: "Celibacy makes you superior.",
    grounded: "Celibacy is a practice, not a personality upgrade. The point is clarity, discipline, and values.",
  },
  {
    myth: "One relapse means all progress is gone.",
    grounded: "Progress is not erased. The useful question is: what trigger did this reveal?",
  },
  {
    myth: "Urges mean I have no discipline.",
    grounded: "Urges are normal. Discipline is what you do after the urge appears.",
  },
];

const pornCritiques = [
  {
    title: "Addiction-like use",
    text: "Compulsive, escalating use that the person cannot stop despite wanting to — driven by the same dopamine and novelty-seeking loops as other behavioral addictions.",
  },
  {
    title: "Exploitation",
    text: "Much of the industry runs on performers with limited bargaining power, financial pressure, or coercion — the supply chain is not neutral just because the content is legal.",
  },
  {
    title: "Consent",
    text: "Footage is sometimes filmed, shared, or recut without full or ongoing consent — including leaked, stolen, or non-consensually distributed material.",
  },
  {
    title: "Objectification",
    text: "Habitual consumption can train a viewer to see people as interchangeable stimuli rather than whole persons, flattening empathy in real relationships.",
  },
  {
    title: "Loneliness",
    text: "Used as a substitute for connection, it can deepen isolation — relieving a craving in the moment while leaving the underlying need for intimacy unmet.",
  },
  {
    title: "Unrealistic expectations",
    text: "Performance-oriented, edited content distorts expectations of bodies, consent dynamics, and sex itself, which can erode satisfaction and confidence in real partnerships.",
  },
  {
    title: "Trafficking",
    text: "Some content is produced through human trafficking or exploitation of minors — the anonymity of the medium makes it hard for a viewer to verify what they're funding.",
  },
  {
    title: "Privacy",
    text: "Viewing histories, payment data, and personal images are valuable and frequently breached, sold, or used for blackmail (sextortion).",
  },
  {
    title: "Compulsive behavior",
    text: "Even short of clinical addiction, habitual use can crowd out sleep, work, study, and relationships — a pattern worth noticing regardless of the label used for it.",
  },
];

const habits = [
  "Sleep before midnight when possible",
  "No phone in bed",
  "Limit sexualized scrolling",
  "Train body 3–5x/week",
  "Journal after strong urges",
  "Build real connection",
  "Create before consuming",
  "Keep room clean and bright",
];

const sources = [
  {
    title: "Planned Parenthood",
    text: "Masturbation is generally safe and does not carry pregnancy or STI risk.",
  },
  {
    title: "Mayo Clinic",
    text: "Compulsive sexual behavior becomes a concern when urges or behaviors feel hard to control and harm health, work, relationships, or life.",
  },
  {
    title: "Better Health Channel",
    text: "Sexual health includes reliable information, healthy relationships, safety, and freedom from stigma or coercion.",
  },
  {
    title: "HSHC Abstinence Guide",
    text: "Abstinence can mean different things to different people, from avoiding intercourse to avoiding all partnered or solo sexual activity.",
  },
];

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
    title: 'Sleeping & Rest',
    accent: '#818cf8',
    description: 'Closeness in stillness and shared rest.',
    items: [
      'Falling asleep together in silence',
      'Waking up slowly beside each other',
      'Middle-of-the-night half-awake closeness',
      'Napping together on a quiet afternoon',
      'Her falling asleep first, you staying present',
      'Rainy night, windows open, shared warmth',
    ],
  },
  {
    id: 'home',
    icon: '🏡',
    title: 'Home & Domestic Intimacy',
    accent: '#fb923c',
    description: 'The quiet texture of building a life together.',
    items: [
      'Cooking dinner together without talking much',
      'Sitting on the couch after a long day',
      'Folding laundry side by side',
      'Cleaning the kitchen together calmly',
      'Watching a show with her head on your shoulder',
      'Sharing a quiet morning coffee',
    ],
  },
  {
    id: 'safety',
    icon: '🫂',
    title: 'Emotional Safety & Choice',
    accent: '#f9a8d4',
    description: 'Being each other\'s place of rest.',
    items: [
      'Feeling emotionally held by each other',
      'Mutual reassurance without words',
      'Being each other\'s place of rest',
      'Calm conflict resolution and reconnection',
      'Feeling wanted without needing validation',
    ],
  },
  {
    id: 'presence',
    icon: '◎',
    title: 'Presence & Familiarity',
    accent: '#22d3ee',
    description: 'Ease in simply existing together.',
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

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "border-slate-700 bg-slate-900/80 text-slate-200",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    rose: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    sky: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  };
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

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

function ProgressBar({ value }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export default function SexualEnergyDashboard({ onBack, onNavigate, initialSection }) {
  const initialResolved = resolveSection(initialSection);
  const [activeTab, setActiveTab] = useState(initialResolved.tab);
  // Sub-concept to open inside Relationship Clarity (e.g. "love-bombing").
  const [claritySub, setClaritySub] = useState(initialResolved.sub);
  const [prevInitialSection, setPrevInitialSection] = useState(initialSection);
  const [goal, setGoal] = useState("reset");
  const [days, setDays] = useState(7);
  const [urge, setUrge] = useState(42);
  const [selectedTrigger, setSelectedTrigger] = useState("Loneliness");
  const [journal, setJournal] = useState("");
  const [showPlan, setShowPlan] = useState(true);

  // Sync activeTab when the route's ?section= changes — adjust-during-render pattern.
  if (initialSection !== prevInitialSection) {
    setPrevInitialSection(initialSection);
    if (initialSection) {
      const resolved = resolveSection(initialSection);
      setActiveTab(resolved.tab);
      setClaritySub(resolved.sub);
    }
  }

  const completion = useMemo(() => {
    const target = goal === "reset" ? 30 : goal === "spiritual" ? 60 : goal === "relationship" ? 90 : 120;
    return Math.round((days / target) * 100);
  }, [days, goal]);

  const plan = useMemo(() => {
    const base = {
      reset: ["No phone in bed", "Track urges without judging", "Replace the ritual with movement", "Review triggers every 7 days"],
      spiritual: ["Morning meditation", "Prayer or contemplation", "Creative transmutation block", "Evening identity statement"],
      relationship: ["Slow dating pace", "No using desire to chase validation", "Build emotional safety", "Practice honest boundaries"],
      abstinence: ["Define exact rules", "Tell one trusted person if needed", "Remove high-trigger apps", "Build purpose-heavy routines"],
    };
    return base[goal];
  }, [goal]);

  const renderEnergy = () => (
    <div>
      <SectionTitle
        eyebrow="The raw force"
        title="What is sexual energy?"
        text="Before any question about discipline or relationships, there is the energy itself — desire, attraction, arousal, fantasy, pleasure. It is not the enemy. It is fuel that can be felt, understood, and directed."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {energyExpressions.map((item) => (
          <Card key={item.title}>
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="violet">How it gets shaped</Badge>
        </div>
        <h3 className="mb-3 text-xl font-bold text-white">The energy doesn't form in a vacuum</h3>
        <p className="text-sm leading-7 text-slate-300">
          What you desire, how strongly, and how often is shaped by more than biology. These forces bend the raw signal before you ever decide what to do with it:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {energyShapers.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">{item}</div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-sm leading-6 text-violet-100">
          Naming what is shaping your desire is not the same as judging it. It is the first step toward choosing what to do with it — which is what the Self-Mastery and Relationships sections are for.
        </div>
      </Card>
    </div>
  );

  const renderOverview = () => (
    <div>
      <SectionTitle
        eyebrow="Grounded framework"
        title="Sexual energy without shame, spiraling, or fantasy math"
        text="This dashboard treats masturbation, celibacy, abstinence, porn habits, urges, and relapse recovery as self-awareness topics. The goal is not fear of sexuality. The goal is mature choice."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {pillars.map((item) => (
          <Card key={item.title}>
            <div className="mb-4 text-3xl">{item.icon}</div>
            <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{item.text}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge tone="sky">Main question</Badge>
            <Badge tone="violet">Choice vs compulsion</Badge>
          </div>
          <h3 className="mb-3 text-xl font-bold text-white">The mature filter</h3>
          <p className="text-sm leading-7 text-slate-300">
            Do not ask only, “Is masturbation good or bad?” Ask: “What state am I in when I want it? What does it cost me? What does it give me? Can I stop when I choose? Does this align with the person I am becoming?”
          </p>
          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
            A private space to notice patterns, choose celibacy intentionally, handle urges, and recover fast without self-hate.
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-bold text-white">Quick status</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm text-slate-300"><span>Urge intensity</span><span>{urge}/100</span></div>
              <ProgressBar value={urge} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm text-slate-300"><span>Practice progress</span><span>{completion}%</span></div>
              <ProgressBar value={completion} />
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Current trigger</p>
              <p className="mt-1 font-semibold text-white">{selectedTrigger}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {signals.map((group) => (
          <Card key={group.label}>
            <Badge tone={group.color}>{group.label}</Badge>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {group.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-1 text-slate-500">•</span><span>{item}</span></li>)}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMasturbation = () => (
    <div>
      <SectionTitle
        eyebrow="Education"
        title="Masturbation: normal behavior vs coping pattern"
        text="This page avoids fear-based claims. Masturbation can be neutral or healthy for many people. It becomes worth examining when it feels compulsive, escalates, replaces life, or leaves you feeling disconnected from yourself."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-xl font-bold text-white">Healthy reflection questions</h3>
          <div className="space-y-3">
            {[
              "Can I choose not to do it without panic?",
              "Do I use it mostly to avoid emotions?",
              "Does it affect my confidence, focus, sleep, or relationships?",
              "Is porn or fantasy doing more of the driving than my actual body?",
              "Do I feel grounded afterward, or empty and hidden?",
            ].map((q) => (
              <label key={q} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm text-slate-300">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900" />
                <span>{q}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-3 text-xl font-bold text-white">Pattern map</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Before", "What happened 1–3 hours before the urge?"],
              ["Emotion", "What feeling did you not want to feel?"],
              ["Environment", "Where were you? Bed, shower, phone, late night?"],
              ["After", "Did you feel calm, clear, numb, guilty, or drained?"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            Use this as a private pattern profile — the goal is awareness, not judgment.
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {myths.map((item) => (
          <Card key={item.myth}>
            <p className="text-sm font-semibold text-rose-200">Myth: {item.myth}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">Grounded: {item.grounded}</p>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPorn = () => (
    <div>
      <SectionTitle
        eyebrow="Honest look"
        title="Legitimate critiques of porn"
        text="Porn is not automatically destructive for every viewer, but it is not neutral either. These are the critiques worth taking seriously — not as a verdict, but as questions to hold while you decide what role, if any, it has in your life."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {pornCritiques.map((item) => (
          <Card key={item.title}>
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="mb-3 text-xl font-bold text-white">Questions worth sitting with</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Can I tell what I'm watching was made with full, ongoing consent?",
            "Does my use escalate in frequency or intensity over time?",
            "Am I using it to avoid loneliness, stress, or boredom rather than facing them?",
            "Has it changed what I expect from real intimacy or from a partner's body?",
            "Would I be comfortable if someone I respect knew exactly what and how much I watch?",
          ].map((q) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">{q}</div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
          None of these critiques require shame to be useful. The point is informed choice — knowing what the medium costs, who it costs, and whether the pattern still serves you.
        </div>
      </Card>
    </div>
  );

  const renderCelibacy = () => (
    <div>
      <SectionTitle
        eyebrow="Practice design"
        title="Celibacy: make it intentional, not fear-based"
        text="Celibacy works best when the rules are clear, the reason is honest, and the energy has somewhere meaningful to go. Suppression without direction usually backfires."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {celibacyTypes.map((item) => (
          <Card key={item.title}>
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-sm text-cyan-200">{item.duration}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">{item.use}</p>
            <div className="mt-4 rounded-2xl bg-slate-950/60 p-3 text-xs leading-5 text-slate-400">
              <span className="font-semibold text-slate-200">Avoid: </span>{item.avoid}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="text-xl font-bold text-white">Build your celibacy plan</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Pick the purpose, then define the structure. Vague celibacy creates loopholes. Clear celibacy creates peace.</p>
            <div className="mt-5 space-y-3">
              {[
                ["reset", "Reset"],
                ["spiritual", "Spiritual"],
                ["relationship", "Relationship"],
                ["abstinence", "Full abstinence"],
              ].map(([id, label]) => (
                <button key={id} onClick={() => setGoal(id)} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${goal === id ? "border-cyan-400 bg-cyan-400/15 text-white" : "border-white/10 bg-slate-950/50 text-slate-300 hover:border-white/25"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Days completed</p>
                <p className="text-3xl font-black text-white">{days}</p>
              </div>
              <input type="range" min="0" max="120" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-48" />
            </div>
            <ProgressBar value={completion} />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {plan.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderUrges = () => (
    <div>
      <SectionTitle
        eyebrow="Urge protocol"
        title="Do not fight the urge. Interrupt the loop."
        text="Urges rise, peak, and fall. The mistake is debating them while sitting in the same environment that created them. This section gives you a fast reset path."
      />

      <Card>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="text-xl font-bold text-white">Current urge level</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Slide it honestly. The dashboard responds with a recommended action intensity.</p>
            <div className="mt-6 rounded-3xl bg-slate-950/60 p-5">
              <div className="mb-3 flex justify-between text-sm text-slate-300"><span>Intensity</span><span>{urge}/100</span></div>
              <input type="range" min="0" max="100" value={urge} onChange={(e) => setUrge(Number(e.target.value))} className="w-full" />
              <div className="mt-5">
                <ProgressBar value={urge} />
              </div>
              <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
                {urge < 35 && "Low charge: breathe, name the state, and choose deliberately."}
                {urge >= 35 && urge < 70 && "Medium charge: change location now and delay 10 minutes before deciding."}
                {urge >= 70 && "High charge: no debate. Stand up, leave the trigger environment, move your body, and contact reality."}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Trigger selector</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Loneliness", "Boredom", "Stress", "Rejection", "Late night", "Scrolling", "Anger", "Avoidance", "Fantasy", "Tiredness"].map((trigger) => (
                <button key={trigger} onClick={() => setSelectedTrigger(trigger)} className={`rounded-full border px-4 py-2 text-sm transition ${selectedTrigger === trigger ? "border-violet-400 bg-violet-400/20 text-white" : "border-white/10 bg-slate-950/50 text-slate-300 hover:border-white/25"}`}>
                  {trigger}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {urgeTools.map((tool) => (
                <div key={tool.name} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="font-semibold text-white">{tool.name}</p>
                  <ol className="mt-3 space-y-2 text-sm leading-5 text-slate-400">
                    {tool.steps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTracker = () => (
    <div>
      <SectionTitle
        eyebrow="Private tracking"
        title="Track patterns, not just streaks"
        text="A streak can motivate you, but pattern awareness changes you. Use this as a private mirror for what is actually driving the urges."
      />

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h3 className="text-xl font-bold text-white">Habit checklist</h3>
          <div className="mt-4 space-y-3">
            {habits.map((habit) => (
              <label key={habit} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900" />
                <span>{habit}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-white">Weekly signal board</h3>
            <button onClick={() => setShowPlan(!showPlan)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-white/25">{showPlan ? "Hide" : "Show"} plan</button>
          </div>
          {showPlan && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Clean days", days, "How many days aligned with your rules."],
                ["Strong urges", Math.round(urge / 12), "Moments that required active regulation."],
                ["Top trigger", selectedTrigger, "Most obvious pattern this week."],
                ["Sleep risk", "Medium", "Late nights increase impulsive loops."],
                ["Connection", "Needs attention", "Isolation often feeds urges."],
                ["Next move", "Simplify", "Remove one trigger, add one support."],
              ].map(([label, value, note]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
                  <p className="mt-2 text-lg font-bold text-white">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
            Track daily: urge level, trigger, action taken, slip or no slip, mood, sleep, and notes. Pattern reveals itself in two weeks.
          </div>
        </Card>
      </div>
    </div>
  );

  const renderJournal = () => (
    <div>
      <SectionTitle
        eyebrow="Reflection"
        title="Journal prompts for sexual self-mastery"
        text="The best journaling here is not dramatic. It is simple, honest, and repeatable. You are looking for the pattern underneath the impulse."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-xl font-bold text-white">Prompt bank</h3>
          <div className="mt-4 space-y-3">
            {[
              "What did I actually need before the urge appeared?",
              "What environment makes me weaker?",
              "What does celibacy mean to me this season?",
              "Where am I confusing desire with loneliness?",
              "What would the grounded version of me do for the next 10 minutes?",
              "What did the last slip teach me?",
            ].map((prompt) => (
              <button key={prompt} onClick={() => setJournal(prompt + "\n\n")} className="w-full rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left text-sm leading-6 text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-400/10">
                {prompt}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-white">Private note</h3>
          <textarea value={journal} onChange={(e) => setJournal(e.target.value)} placeholder="Write the truth without attacking yourself..." className="mt-4 min-h-[330px] w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400/50" />
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="emerald">No shame</Badge>
            <Badge tone="sky">Name the need</Badge>
            <Badge tone="violet">Choose again</Badge>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderMarriage = () => (
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

  const renderScripts = () => (
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

  const renderDynamics = () => (
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

  const renderIntegration = () => (
    <div>
      <SectionTitle
        eyebrow="Healthy masculine sexual energy"
        title="Energy, discipline, connection, and wholeness"
        text="Sexual energy becomes healthy when it is guided by self-awareness, emotional security, respect, and love — not when it is suppressed, and not when it runs unchecked. These four pieces work as one system, not four separate problems."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {integrationPillars.map((item) => (
          <Card key={item.title}>
            <div className="mb-4 text-3xl">{item.icon}</div>
            <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{item.text}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="mb-3 text-xl font-bold text-white">A simple integration check</h3>
        <p className="text-sm leading-7 text-slate-300">
          When energy, discipline, and connection are working together, you can usually feel it: desire does not run the show, but it is not switched off either. You can want someone and still wait. You can feel tempted and still choose. You can love someone without needing them to complete you.
        </p>
        <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
          If any one piece is missing — the energy is denied, the discipline is absent, or the connection is fear-based — the other two usually start to distort too. Use the Sexual Energy, Self-Mastery, and Relationships tabs as a loop, not a one-time read.
        </div>
      </Card>
    </div>
  );

  const renderTab = () => {
    if (activeTab === "energy") return renderEnergy();
    if (activeTab === "integration") return renderIntegration();
    if (activeTab === "overview") return renderOverview();
    if (activeTab === "masturbation") return renderMasturbation();
    if (activeTab === "porn") return renderPorn();
    if (activeTab === "celibacy") return renderCelibacy();
    if (activeTab === "urges") return renderUrges();
    if (activeTab === "tracker") return renderTracker();
    if (activeTab === "foundations") return <RelationshipFoundations />;
    if (activeTab === "marriage") return renderMarriage();
    if (activeTab === "dynamics") return renderDynamics();
    if (activeTab === "scripts") return renderScripts();
    return renderJournal();
  };

  // Relationship sections are full-screen sub-portals with their own chrome;
  // render them in place of the dashboard, returning to Overview on back.
  if (activeTab === "relationship-clarity") {
    return (
      <RelationshipClarityPortal
        onBack={() => { setClaritySub(null); setActiveTab("overview"); }}
        onNavigate={(id, opts) => {
          // The portal navigates between its own concepts via
          // onNavigate("relationships", { section }); keep that in-tab by
          // driving the sub-concept from state instead of leaving.
          if (id === "relationships") {
            setClaritySub(opts?.section ?? null);
          } else if (id === "sexualenergy" || id === "inneratlas") {
            setClaritySub(null);
            setActiveTab("overview");
          } else {
            onNavigate?.(id, opts);
          }
        }}
        initialSection={claritySub}
      />
    );
  }
  if (activeTab === "relationship-patterns") {
    return <RelationshipPatterns onBack={() => setActiveTab("overview")} />;
  }

  return (
    <main className="relative min-h-screen bg-[#070914] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-4 top-4 z-50 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
        >
          ← Back
        </button>
      )}

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge tone="sky">Private dashboard</Badge>
                <Badge tone="violet">Sexual energy</Badge>
                <Badge tone="rose">Relationships &amp; love</Badge>
                <Badge tone="emerald">No-shame discipline</Badge>
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Sexual Energy, Self-Mastery, and Secure Relationships
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                One flow, four parts: understand the <span className="text-slate-100">energy</span> itself, build <span className="text-slate-100">self-mastery</span> over it, bring it into <span className="text-slate-100">relationships</span> with honesty, and let it all settle into <span className="text-slate-100">integration</span> — without shame, and without losing yourself to it.
              </p>
            </div>
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 lg:w-80">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Today’s anchor</p>
              <p className="mt-3 text-lg font-semibold leading-7 text-white">“I do not need to fear desire. I can hold energy, choose clearly, and act from self-respect.”</p>
            </div>
          </div>
        </header>

        <nav className="sticky top-3 z-20 mb-8 rounded-3xl border border-white/10 bg-[#070914]/80 p-3 backdrop-blur-xl">
          {/* Each tab group renders as its own tinted, bordered cluster so the
              two journeys stay visually distinct. Clusters stack on mobile and
              sit side by side (scrolling if needed) from sm: up. */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:overflow-x-auto">
            {tabGroups.map((group) => (
              <div
                key={group.label}
                className={`flex flex-wrap items-center gap-1.5 rounded-2xl border p-1.5 sm:shrink-0 ${groupContainerAccent[group.accent]}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(group.tabs[0].id)}
                  title={`Go to ${group.tabs[0].label}`}
                  className={`shrink-0 cursor-pointer whitespace-nowrap rounded-xl border px-3 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] transition ${groupAccent[group.accent]}`}
                >
                  {group.label}
                </button>
                {group.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${activeTab === tab.id ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </nav>

        <section>{renderTab()}</section>

        <footer className="mt-10 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-4">
          {sources.map((source) => (
            <div key={source.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-semibold text-white">{source.title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{source.text}</p>
            </div>
          ))}
        </footer>
      </section>
    </main>
  );
}
