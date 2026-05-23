import { useEffect, useMemo, useState } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "frameworks", label: "All Frameworks", icon: "▣" },
  { id: "powerstack", label: "Power Stack", icon: "✦" },
  { id: "nutrients", label: "Vitamins & Minerals", icon: "◍" },
];

const frameworks = [
  {
    id: 1,
    title: "Self-Schema",
    field: "Psychology",
    icon: "◈",
    tone: "cyan",
    category: "identity",
    keyQuestion: "What kind of person am I being from?",
    use: "Identity work — establishing who you are before outcomes arrive.",
    how: "Replace outcome-focused thinking with identity statements. The schema you hold about yourself drives your behavior and energy. You do not attract what you want — you attract what you are. Before asking what she will do, ask who you are being.",
    example: "Not: 'Will she choose me?' → Instead: 'I am a man who is naturally chosen, loved, and secure.' Act from that schema. Let your behavior match the identity, not the anxiety.",
    prompts: [
      "Who am I being in this situation — and is that who I want to be?",
      "What identity would I need to hold for this outcome to feel natural, not desperate?",
      "If I fully believed I was already loved and chosen, what would I do differently right now?",
    ],
  },
  {
    id: 2,
    title: "Attachment Theory",
    field: "Psychology",
    icon: "⌘",
    tone: "sky",
    category: "awareness",
    keyQuestion: "Am I acting from security or fear?",
    use: "Noticing anxious patterns — texting, mixed signals, overthinking, pedestalizing.",
    how: "Anxious attachment creates the urge to chase, overexplain, and seek constant reassurance. Secure attachment stays grounded without needing external validation. The goal is to act from a secure base — even if you don't fully feel it yet. Ask before every action: is this secure or anxious?",
    example: "Urge to double-text after silence → pause. Ask: 'Is this genuine communication or a fear response?' Secure response: let it land. Move on with your day. Do not monitor. Do not wait.",
    prompts: [
      "What would a securely attached person do in this moment — and can I do that?",
      "Am I reaching out from genuine desire to connect, or from anxiety that needs soothing?",
      "Where did I learn that I needed to chase or prove myself to be loved?",
    ],
  },
  {
    id: 3,
    title: "CBT",
    field: "Cognitive Behavioral Therapy",
    icon: "△",
    tone: "indigo",
    category: "awareness",
    keyQuestion: "What thought is driving this feeling and action?",
    use: "Catching anxiety spirals before they drive behavior.",
    how: "Map the loop: Thought → Feeling → Action. Most spirals begin with an unchecked thought. Once you see the thought clearly, you can insert a new one. The goal is not to suppress feeling — it is to change the thought that generates it. Feelings follow thoughts. Change the root.",
    example: "Thought: 'She doesn't care.' → Feeling: anxiety. → Action: checking, chasing. | New thought: 'I am secure; I don't need to force closeness.' → Feeling: groundedness. → Action: returning to your own life.",
    prompts: [
      "What thought started this spiral — and is it actually true?",
      "What feeling is driving my current urge to act? Is this feeling information or distortion?",
      "If I replaced the thought with a secure one right now, what would I do instead?",
    ],
  },
  {
    id: 4,
    title: "Somatic Work",
    field: "Nervous System Regulation",
    icon: "◯",
    tone: "teal",
    category: "awareness",
    keyQuestion: "Is this truth, or is my nervous system activated?",
    use: "Regulating your body before making decisions, sending messages, or reacting.",
    how: "The nervous system cannot tell the difference between a real threat and an emotional trigger. When you feel urgency, tightness, panic, or rumination — your body is in a survival state. No clear decisions come from here. Regulate first: breath work, cold water, movement, grounding. Then decide.",
    example: "Panic after reading a short reply. Before responding: ask 'Is my body safe right now?' Do 4-7-8 breathing. When calm, the same reply looks different. The urgency was nervous system noise — not truth.",
    prompts: [
      "What does my body feel right now — and is this sensation pointing to truth or to fear?",
      "Can I name the physical feeling and where it lives in my body? What is it trying to protect me from?",
      "What would I do in this situation if my nervous system were fully regulated?",
    ],
  },
  {
    id: 5,
    title: "Stoicism",
    field: "Philosophy",
    icon: "⊡",
    tone: "amber",
    category: "control",
    keyQuestion: "What is mine to control?",
    use: "Releasing what is not yours to carry — her reactions, choices, timing, and feelings.",
    how: "The Stoic dichotomy of control: inside your circle are your identity, reactions, values, standards, and behavior. Outside it: her feelings, her choices, her timeline, her reasons. Suffering comes from trying to control what is outside. Freedom comes from fully owning what is inside.",
    example: "She hasn't responded in two days. Outside your control: her reasons, feelings, choices. Inside your control: how you carry yourself, whether you act from dignity, what you do with your energy today.",
    prompts: [
      "What in this situation is genuinely mine to control — and am I fully owning that?",
      "Where am I spending energy trying to control what is not mine? Can I release it today?",
      "If I focused only on my own character and behavior right now, what would I do?",
    ],
  },
  {
    id: 6,
    title: "Systems Thinking",
    field: "Systems / Patterns",
    icon: "↺",
    tone: "violet",
    category: "control",
    keyQuestion: "What loop keeps repeating?",
    use: "Seeing the pattern beneath isolated moments so you stop reacting to individual events.",
    how: "Instead of reacting to each moment in isolation, zoom out and see the system. Most relationship anxiety runs in loops: trigger → reaction → outcome → reset → same trigger again. Once you see the loop, you can change your input rather than being swept by the same output repeatedly.",
    example: "Mixed signal → hope → anxiety → chasing → confusion → more anxiety → mixed signal again. The loop is the problem. Changing one input (not chasing) changes the whole system output over time.",
    prompts: [
      "What loop is running in this situation — and what is my recurring input into it?",
      "If I changed just one behavior in this pattern, which change would have the most leverage?",
      "Is this moment new information, or is it the same loop presenting itself again?",
    ],
  },
  {
    id: 7,
    title: "Design Thinking",
    field: "Behavioral Design",
    icon: "◇",
    tone: "emerald",
    category: "action",
    keyQuestion: "What small action would a secure version of me take?",
    use: "Testing better behavior gently without dramatic all-or-nothing moves.",
    how: "Design thinking treats behavior as an experiment, not a performance. Instead of demanding the perfect action, ask: what is the smallest test of security I can run today? Small experiments build new identity over time. No grand gestures. Just consistent votes for the person you are becoming.",
    example: "Instead of 'I will never text first again' (all-or-nothing) → ask: 'What would a secure version of me send today, if anything?' Do that one thing. Note how it feels. Adjust. Repeat.",
    prompts: [
      "What is the smallest experiment in security I could run right now?",
      "What would a confident, grounded version of me do in this specific moment — not in theory, but today?",
      "What am I afraid will happen if I act from security instead of anxiety? Is that fear actually true?",
    ],
  },
  {
    id: 8,
    title: "Communication",
    field: "Communication Frameworks",
    icon: "≋",
    tone: "blue",
    category: "action",
    keyQuestion: "Am I being honest, calm, and direct?",
    use: "Avoiding guessing games, indirect chasing, and emotional pressure in communication.",
    how: "Clean communication is honest, calm, and direct. It says what is true without manipulation or pressure. It does not use questions designed to extract a certain response. It does not communicate indirectly and then resent the result. Speak once, clearly, then give space for the answer.",
    example: "Instead of: 'I guess you've been busy...' (indirect, hoping she fills the gap) → Try: 'I'd like to connect. Are you open to that?' — Direct. Honest. No pressure. Then respect whatever comes.",
    prompts: [
      "Am I saying what I actually mean, or communicating indirectly and hoping they'll guess?",
      "Is my message honest, calm, and free of hidden pressure or emotional manipulation?",
      "What am I actually trying to say — and can I say that directly in one clear sentence?",
    ],
  },
  {
    id: 9,
    title: "Values Framework",
    field: "Ethics / Values",
    icon: "✦",
    tone: "rose",
    category: "action",
    keyQuestion: "Does this match my values?",
    use: "Staying aligned with who you are regardless of the relationship outcome.",
    how: "Your values are your north star. When you act from your values — loyalty, peace, honesty, devotion, stability, clarity — you remain yourself regardless of outcome. Values-based action does not depend on the other person's response. It is its own reward and keeps your integrity intact.",
    example: "Your value is loyalty. Even in uncertainty, you behave loyally — not because you're guaranteed loyalty back, but because loyalty is who you are. This keeps your identity clear no matter the result.",
    prompts: [
      "What are my core values in love and relationship — and am I actually living them right now?",
      "Is this action aligned with who I want to be, or is it driven by fear of losing?",
      "If the outcome were already decided and couldn't change, would I still act this way?",
    ],
  },
  {
    id: 10,
    title: "Identity-Based Habits",
    field: "Behavioral Psychology",
    icon: "▷",
    tone: "purple",
    category: "identity",
    keyQuestion: "What would this identity do today?",
    use: "Making affirmations practical — translating 'I am loved' into daily behavior.",
    how: "Identity is built through repeated action, not declarations alone. Every time you act from your stated identity, you vote for that identity becoming real. 'I am loved' is not just a thought — it is a practice. Ask: what does a loved, secure, valued person do today? Do that. Repeat tomorrow.",
    example: "'I am loved' becomes: I move calmly. I don't beg. I receive love naturally. I respect myself. I don't chase. I invest in my own growth. Each of these is a behavioral vote for the identity you are building.",
    prompts: [
      "What does my stated identity — 'I am secure, loved, chosen' — actually look like as behavior today?",
      "What one action today would a man who is fully loved and at peace take — and can I take it?",
      "Am I voting for my desired identity with my actions right now, or am I voting against it?",
    ],
  },
];

const tones = {
  cyan:    { pill: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",    accent: "text-cyan-300/80",   card: "border-cyan-400/20 bg-cyan-500/5",   dot: "bg-cyan-400"   },
  sky:     { pill: "border-sky-400/30 bg-sky-400/10 text-sky-100",       accent: "text-sky-300/80",    card: "border-sky-400/20 bg-sky-500/5",    dot: "bg-sky-400"    },
  indigo:  { pill: "border-indigo-400/30 bg-indigo-400/10 text-indigo-100", accent: "text-indigo-300/80", card: "border-indigo-400/20 bg-indigo-500/5", dot: "bg-indigo-400" },
  teal:    { pill: "border-teal-400/30 bg-teal-400/10 text-teal-100",    accent: "text-teal-300/80",   card: "border-teal-400/20 bg-teal-500/5",   dot: "bg-teal-400"   },
  amber:   { pill: "border-amber-400/30 bg-amber-400/10 text-amber-100", accent: "text-amber-300/80",  card: "border-amber-400/20 bg-amber-500/5",  dot: "bg-amber-400"  },
  violet:  { pill: "border-violet-400/30 bg-violet-400/10 text-violet-100", accent: "text-violet-300/80", card: "border-violet-400/20 bg-violet-500/5", dot: "bg-violet-400" },
  emerald: { pill: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100", accent: "text-emerald-300/80", card: "border-emerald-400/20 bg-emerald-500/5", dot: "bg-emerald-400" },
  blue:    { pill: "border-blue-400/30 bg-blue-400/10 text-blue-100",    accent: "text-blue-300/80",   card: "border-blue-400/20 bg-blue-500/5",   dot: "bg-blue-400"   },
  rose:    { pill: "border-rose-400/30 bg-rose-400/10 text-rose-100",    accent: "text-rose-300/80",   card: "border-rose-400/20 bg-rose-500/5",   dot: "bg-rose-400"   },
  purple:  { pill: "border-purple-400/30 bg-purple-400/10 text-purple-100", accent: "text-purple-300/80", card: "border-purple-400/20 bg-purple-500/5", dot: "bg-purple-400" },
};

const powerStack = [
  {
    layer: "Spiritual",
    framework: "Law of Assumption",
    role: "The root frame. What you assume to be true about yourself and your reality is what manifests. All other frameworks operate inside this one.",
    color: "from-violet-500/20 to-transparent",
    border: "border-violet-400/30",
    accent: "text-violet-300",
  },
  {
    layer: "Emotional",
    framework: "Attachment Theory",
    role: "The diagnostic layer. Reveals whether you are operating from security or fear. Names the pattern so you can interrupt it before it drives behavior.",
    color: "from-sky-500/20 to-transparent",
    border: "border-sky-400/30",
    accent: "text-sky-300",
  },
  {
    layer: "Body",
    framework: "Nervous System Regulation",
    role: "The foundation layer. No clear decision, message, or action is possible while the body is in a survival state. Regulate first, always.",
    color: "from-teal-500/20 to-transparent",
    border: "border-teal-400/30",
    accent: "text-teal-300",
  },
  {
    layer: "Action",
    framework: "Identity-Based Habits",
    role: "The implementation layer. Turns the spiritual assumption and secure identity into daily behavior. Makes 'I am loved' a practice, not just a thought.",
    color: "from-purple-500/20 to-transparent",
    border: "border-purple-400/30",
    accent: "text-purple-300",
  },
];

function Pill({ children, tone = "cyan" }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]?.pill || tones.cyan.pill}`}>
      {children}
    </span>
  );
}

function ReflectionModal({ prompts, title, tone, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!prompts) return null;
  const t = tones[tone] || tones.cyan;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.3em] ${t.accent}`}>Reflection Prompts</p>
              <h2 className="mt-1 text-xl font-black text-white">{title}</h2>
            </div>
            <button
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6">
          {prompts.map((prompt, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${t.card}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Prompt {i + 1}</p>
              <p className="text-sm leading-7 text-slate-200">{prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose, onReflect }) {
  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={item.tone}>{item.field}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.icon} {item.title}</h2>
              <p className={`mt-1 text-sm font-semibold ${t.accent}`}>"{item.keyQuestion}"</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                onClick={() => onReflect(item)}
              >
                ◈ Reflect
              </button>
              <button
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {[
            { label: "Use it for", value: item.use },
            { label: "How it works", value: item.how },
            { label: "Example", value: item.example },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</div>
              <p className="text-sm leading-7 text-slate-200">{value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-5">
          <button
            className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
            onClick={() => onReflect(item)}
          >
            ◈ Open Reflection Prompts for {item.title}
          </button>
        </div>
      </div>
    </div>
  );
}

function FrameworkCard({ item, onOpen, onReflect }) {
  const t = tones[item.tone] || tones.cyan;

  return (
    <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
      <button onClick={() => onOpen(item)} className="block flex-1 p-5 text-left">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Pill tone={item.tone}>{item.field}</Pill>
          <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-2xl ${t.accent}`}>{item.icon}</span>
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
        </div>
        <p className={`mt-2 text-xs font-semibold ${t.accent}`}>"{item.keyQuestion}"</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{item.use}</p>
      </button>
      <div className="border-t border-white/[0.06] px-5 pb-4 pt-3">
        <button
          onClick={(e) => { e.stopPropagation(); onReflect(item); }}
          className="w-full rounded-xl border border-cyan-300/20 bg-cyan-300/5 py-2 text-xs font-semibold text-cyan-200/80 transition hover:bg-cyan-300/10 hover:text-cyan-100"
        >
          ◈ Reflect
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
      {children && <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{children}</p>}
    </div>
  );
}

export default function PsychologyPortal({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [reflectionModal, setReflectionModal] = useState(null);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) return frameworks;
    return frameworks.filter((f) => JSON.stringify(f).toLowerCase().includes(lower));
  }, [query]);

  const openDetail = (item) => setModal(item);
  const openReflection = (item) => setReflectionModal(item);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0e3a4a,transparent_34%),radial-gradient(circle_at_top_right,#1e1b4b,transparent_30%),linear-gradient(180deg,#020617,#0f172a_45%,#020617)] text-slate-100">
      {onBack && (
        <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              ← Back
            </button>
            <span className="text-xs text-slate-500">Psychology Portal</span>
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[3.5rem] lg:h-[calc(100vh-3.5rem)] lg:w-72">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-4">
              <div className="text-3xl">◈</div>
              <h1 className="mt-3 text-2xl font-black leading-tight text-white">Psychology Portal</h1>
              <p className="mt-2 text-sm leading-6 text-cyan-50/75">Ten frameworks for identity work, relationship reflection, and living from the end.</p>
            </div>

            <div className="mt-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                    activeTab === tab.id ? "bg-white text-slate-950 shadow-lg" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Frameworks</div>
              {frameworks.map((f) => {
                const t = tones[f.tone] || tones.cyan;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setModal(f); setActiveTab("frameworks"); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition hover:bg-white/10"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
                    <span className="font-semibold text-slate-300">{f.id}. {f.title}</span>
                  </button>
                );
              })}
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('innerbalance')}
                className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">◍</span>
                <div>
                  <div className="font-semibold text-white">InnerBalance Atlas</div>
                  <div className="text-xs text-slate-500">Explore the biological side →</div>
                </div>
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Hero */}
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl backdrop-blur-xl">
            <div className="relative p-6 md:p-8">
              <div className="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 md:block">
                Study Mode · Psychology
              </div>
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Pill tone="cyan">Self-Schema</Pill>
                  <Pill tone="sky">Attachment</Pill>
                  <Pill tone="teal">Somatic</Pill>
                  <Pill tone="purple">Identity</Pill>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Frameworks for identity work, relationship clarity, and living from the end.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Borrow tools from psychology, philosophy, and behavioral science to stop reacting from fear and start moving from a secure, grounded identity.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveTab("frameworks"); }}
                  placeholder="Search identity, anxiety, attachment, stoicism, nervous system..."
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                />
                <button onClick={() => setQuery("")} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-slate-200 hover:bg-white/10">
                  Clear
                </button>
              </div>
            </div>
          </section>

          {/* Tab content */}
          <section className="mt-6 rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div>
                <SectionHeader eyebrow="Start here" title="Ten frameworks for one goal">
                  Each framework targets a different layer of the same work: becoming the kind of person whose identity, body, and behavior are aligned — so you stop living from anxiety and start living from security.
                </SectionHeader>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Identity", count: 2, desc: "Self-Schema · Identity-Based Habits", tone: "cyan" },
                    { label: "Awareness", count: 3, desc: "Attachment · CBT · Somatic Work", tone: "teal" },
                    { label: "Control", count: 2, desc: "Stoicism · Systems Thinking", tone: "violet" },
                    { label: "Action", count: 3, desc: "Design · Communication · Values", tone: "emerald" },
                  ].map(({ label, count, desc, tone }) => (
                    <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                      <Pill tone={tone}>{label}</Pill>
                      <div className="mt-5 text-5xl font-black text-white">{count}</div>
                      <p className="mt-3 text-xs leading-6 text-slate-400">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="text-xl font-bold text-white">How to use this portal</h3>
                    <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <li><strong className="text-white">1.</strong> Notice the feeling or pattern you are in right now.</li>
                      <li><strong className="text-white">2.</strong> Open the matching framework to name it.</li>
                      <li><strong className="text-white">3.</strong> Use the reflection prompts to go deeper.</li>
                      <li><strong className="text-white">4.</strong> Take one small action from a secure identity.</li>
                    </ol>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="text-xl font-bold text-white">The core question</h3>
                    <p className="mt-4 text-2xl font-black leading-tight text-cyan-300">"Am I acting from security or from fear?"</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">Every framework in this portal is a different angle on this one question. The goal is not to eliminate fear — it is to stop letting fear be the one making decisions.</p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">Power Stack · Strongest Combo</div>
                  <p className="mb-5 text-sm leading-6 text-slate-300">These four frameworks work together as a complete system: spiritual → emotional → body → action.</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {powerStack.map((p) => (
                      <div key={p.layer} className={`rounded-2xl border bg-gradient-to-b ${p.color} ${p.border} p-4`}>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{p.layer}</p>
                        <p className={`mt-1 text-sm font-black ${p.accent}`}>{p.framework}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ALL FRAMEWORKS */}
            {activeTab === "frameworks" && (
              <div>
                <SectionHeader eyebrow="All frameworks" title="Ten tools, one goal">
                  Each framework addresses a different layer: identity, emotion, body, thought, pattern, and behavior. Use whichever matches where you are right now.
                </SectionHeader>
                {filtered.length === 0 ? (
                  <p className="text-slate-400">No frameworks match your search.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((f) => (
                      <FrameworkCard key={f.id} item={f} onOpen={openDetail} onReflect={openReflection} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* POWER STACK */}
            {activeTab === "powerstack" && (
              <div>
                <SectionHeader eyebrow="Strongest combo" title="The Power Stack">
                  These four frameworks form a complete system. Use them together for the deepest shifts in identity, emotion, and behavior.
                </SectionHeader>

                <div className="space-y-4">
                  {powerStack.map((p, i) => {
                    const matchedFramework = frameworks.find(
                      (f) => f.title.toLowerCase().includes(p.framework.toLowerCase().split(" ")[0].toLowerCase()) ||
                             p.framework.toLowerCase().includes(f.title.toLowerCase())
                    );
                    return (
                      <div key={p.layer} className={`rounded-3xl border bg-gradient-to-r ${p.color} ${p.border} p-6`}>
                        <div className="flex items-start gap-6">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-black text-white">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{p.layer} layer</span>
                              <span className={`text-lg font-black ${p.accent}`}>{p.framework}</span>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{p.role}</p>
                            {matchedFramework && (
                              <button
                                onClick={() => openDetail(matchedFramework)}
                                className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                              >
                                Open {matchedFramework.title} →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-xl font-bold text-white">How to run the stack daily</h3>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    <li><strong className="text-white">Morning:</strong> Set your identity assumption. "I am loved, secure, and naturally chosen." Write it. Feel it in your body.</li>
                    <li><strong className="text-white">Before any interaction:</strong> Check attachment mode. Am I about to act from security or anxiety? Pause if the answer is anxiety.</li>
                    <li><strong className="text-white">When activated:</strong> Regulate first. Breathe. Ground. Do not send the message from a survival state.</li>
                    <li><strong className="text-white">Evening:</strong> Review your behavioral votes. Did you act from the identity you are building? One thing you did right. One thing to adjust.</li>
                  </ol>
                </div>
              </div>
            )}
            {/* VITAMINS & MINERALS */}
            {activeTab === "nutrients" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Psychophysiology" title="Vitamins & Minerals">
                  This page maps how nutrients support body systems that influence mood, attention, energy, stress resilience, sleep, and neurochemical balance.
                </SectionHeader>

                {/* Nutrient map */}
                <div>
                  <p className="mb-5 text-sm leading-7 text-slate-400">
                    Vitamins and minerals do not "create a mood" by themselves. They help the body run the systems that mood depends on: energy production, oxygen transport, nerve signaling, sleep rhythm, stress recovery, and neurotransmitter synthesis.
                  </p>
                  <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
                    {/* Left column */}
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Vitamins", tone: "emerald", text: "B vitamins, vitamin D, vitamin C, and folate support energy metabolism, nerve function, immune tone, and neurotransmitter-related pathways." },
                        { label: "Minerals", tone: "violet", text: "Magnesium, iron, zinc, iodine, selenium, calcium, sodium, and potassium support nerve firing, oxygen delivery, muscle tension, thyroid function, and stress response." },
                        { label: "Food + Rhythm", tone: "gold", text: "Nutrients work best with steady meals, hydration, sleep, sunlight, movement, and recovery — not as isolated quick fixes." },
                      ].map(({ label, tone, text }) => {
                        const colors = { emerald: "border-emerald-400/20 bg-emerald-500/5", violet: "border-violet-400/20 bg-violet-500/5", gold: "border-amber-400/20 bg-amber-500/5" };
                        const headings = { emerald: "text-emerald-300", violet: "text-violet-300", gold: "text-amber-300" };
                        return (
                          <div key={label} className={`rounded-2xl border p-5 ${colors[tone]}`}>
                            <h4 className={`mb-2 text-base font-bold ${headings[tone]}`}>{label}</h4>
                            <p className="text-sm leading-6 text-slate-300">{text}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Center orb */}
                    <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-amber-300/20 bg-[radial-gradient(circle_at_50%_35%,rgba(216,169,72,.2),transparent_50%),radial-gradient(circle_at_35%_65%,rgba(169,145,217,.15),transparent_50%),linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01))] p-8 text-center">
                      <div>
                        <div className="mb-3 text-4xl font-black text-white">Psycho&shy;physiology</div>
                        <p className="text-sm leading-7 text-slate-300">Nutrition influences the body signals your mind reads: energy, calm, tension, clarity, fatigue, motivation, and emotional stability.</p>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Neurochemical Themes", tone: "sky", text: "Dopamine, serotonin, GABA, norepinephrine, acetylcholine, and oxytocin are supported indirectly through sleep, amino acids, micronutrients, stress regulation, and lifestyle." },
                        { label: "Deficiency-Like Signals", tone: "rose", text: "Low energy, low mood, brain fog, irritability, poor sleep, muscle tension, and anxious activation can overlap with nutrient issues, stress, or medical factors." },
                        { label: "Action Layer", tone: "teal", text: "Track patterns, improve food quality, avoid megadosing, and use labs or professional guidance when symptoms are persistent or intense." },
                      ].map(({ label, tone, text }) => {
                        const colors = { sky: "border-sky-400/20 bg-sky-500/5", rose: "border-rose-400/20 bg-rose-500/5", teal: "border-teal-400/20 bg-teal-500/5" };
                        const headings = { sky: "text-sky-300", rose: "text-rose-300", teal: "text-teal-300" };
                        return (
                          <div key={label} className={`rounded-2xl border p-5 ${colors[tone]}`}>
                            <h4 className={`mb-2 text-base font-bold ${headings[tone]}`}>{label}</h4>
                            <p className="text-sm leading-6 text-slate-300">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Core nutrient cards */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Core nutrient cards</div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {[
                      { name: "Magnesium", text: "Supports muscle and nerve function, energy production, and relaxation themes. Connects to tension, sleep, GABA-like calm, and stress recovery." },
                      { name: "B6", text: "Supports neurotransmitter-related metabolism. Bridges food, mood, serotonin, dopamine, GABA, and energy regulation." },
                      { name: "B12", text: "Supports nerve health, red blood cell formation, and energy. Connects to fatigue, brain fog, mood stability, and cognitive clarity." },
                      { name: "Folate", text: "Works with B12 in methylation and cell function. Belongs near mood steadiness, cognition, and nervous-system support." },
                      { name: "Vitamin D", text: "Supports bones, muscles, immune function, and nerve communication. Belongs in sunlight, mood rhythm, and seasonal well-being." },
                      { name: "Iron", text: "Supports oxygen transport and energy. Connects to fatigue, focus, exercise capacity, and oxygen delivery to muscles and brain." },
                      { name: "Zinc", text: "Supports immune function, repair, and many enzyme systems. Belongs near resilience, recovery, and neurochemical support." },
                      { name: "Iodine", text: "Supports thyroid hormone production, which influences energy, temperature regulation, metabolism, and mental pace." },
                      { name: "Selenium", text: "Supports thyroid-related and antioxidant systems. Fits the recovery, metabolism, and stress-buffering side of the map." },
                      { name: "Calcium", text: "Supports bones, muscle contraction, and nerve signaling. Belongs in the body-signal layer, not just bone health." },
                      { name: "Sodium + Potassium", text: "Electrolytes that support fluid balance, nerve impulses, and muscle function. Connect to hydration, energy, headaches, and exercise recovery." },
                      { name: "Vitamin C", text: "Supports antioxidant protection, collagen formation, and iron absorption. Belongs near recovery, immune tone, and stress resilience." },
                    ].map(({ name, text }) => (
                      <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <h4 className="mb-2 text-sm font-bold text-white">{name}</h4>
                        <p className="text-xs leading-5 text-slate-400">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neurochemical table */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Neurochemical integration</div>
                  <p className="mb-5 text-sm leading-7 text-slate-400">
                    This does not mean one nutrient equals one neurotransmitter. Certain nutrients support the body conditions and biochemical pathways that help those systems function.
                  </p>
                  <div className="overflow-x-auto rounded-3xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Neurochemical</th>
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nutrient Support</th>
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hidden md:table-cell">Body-State</th>
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hidden lg:table-cell">Portal Use</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { chem: "Dopamine", nutrients: "B vitamins, iron, protein-rich meals, magnesium, zinc", body: "Motivation, drive, reward, energy, goal pursuit", use: "Goals, push-ups, steps, and productivity rituals." },
                          { chem: "Serotonin", nutrients: "Vitamin D, B6, folate, magnesium, sunlight, balanced meals", body: "Mood steadiness, emotional resilience, satisfaction", use: "Gratitude, sunlight, mood tracking, daily rhythm." },
                          { chem: "GABA", nutrients: "Magnesium, B6, steady blood sugar, calming evening routine", body: "Calm, relaxation, reducing overactivation", use: "Breathwork, sleep rhythm, detachment, down-regulation." },
                          { chem: "Norepinephrine", nutrients: "Iron, B vitamins, hydration, electrolytes, adequate calories", body: "Alertness, attention, readiness, energy", use: "Focus blocks, work sprints, biking, movement activation." },
                          { chem: "Acetylcholine", nutrients: "B vitamins, choline-rich foods, magnesium, sleep support", body: "Learning, memory, cognition, mental sharpness", use: "Personal development, learning, journaling, skill-building." },
                          { chem: "Oxytocin", nutrients: "Not a supplement target — supported by connection, safety, touch, trust, and stress regulation", body: "Bonding, trust, belonging, emotional warmth", use: "Relationships, compassion rituals, giving." },
                        ].map(({ chem, nutrients, body, use }) => (
                          <tr key={chem} className="border-b border-white/[0.06] bg-white/[0.02] last:border-b-0">
                            <td className="p-4 font-semibold text-white">{chem}</td>
                            <td className="p-4 leading-5 text-slate-300">{nutrients}</td>
                            <td className="p-4 leading-5 text-slate-400 hidden md:table-cell">{body}</td>
                            <td className="p-4 leading-5 text-slate-400 hidden lg:table-cell">{use}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Psychophysiology patterns */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Psychophysiology patterns</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { title: "Energy + Motivation", desc: "When energy is low, mindset work can feel harder. Links fatigue-like states to sleep, iron, B vitamins, hydration, and movement — not only lack of discipline.", pills: ["Iron", "B12", "B6", "Hydration", "Electrolytes", "Steps"], tone: "amber" },
                      { title: "Calm + Sleep", desc: "Evening regulation is a body-state issue. Connects calm to magnesium, breathwork, sleep rhythm, light timing, and emotional detachment.", pills: ["Magnesium", "Vitamin D rhythm", "Long exhale", "GABA theme", "Journal release"], tone: "teal" },
                      { title: "Focus + Cognitive Clarity", desc: "Clarity is a combination of oxygen delivery, blood sugar rhythm, neurotransmitter support, rest, and environment design.", pills: ["B12", "Folate", "Iron", "Acetylcholine", "Covey Q2"], tone: "sky" },
                    ].map(({ title, desc, pills, tone }) => {
                      const pillColors = { amber: "border-amber-400/20 bg-amber-300/10 text-amber-200", teal: "border-teal-400/20 bg-teal-300/10 text-teal-200", sky: "border-sky-400/20 bg-sky-300/10 text-sky-200" };
                      return (
                        <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                          <h4 className="mb-2 text-sm font-bold text-white">{title}</h4>
                          <p className="mb-4 text-xs leading-5 text-slate-400">{desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {pills.map((p) => (
                              <span key={p} className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${pillColors[tone]}`}>{p}</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Food-first support */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Food-first support</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <h4 className="mb-4 text-sm font-bold text-white">Mineral-Focused Plate</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Magnesium", foods: "Leafy greens, legumes, nuts, seeds, whole grains.", label: "Calm" },
                          { name: "Iron", foods: "Meat, seafood, beans, lentils, spinach, fortified foods. Pair plant iron with vitamin C.", label: "Energy" },
                          { name: "Zinc", foods: "Seafood, meat, beans, nuts, seeds, dairy, whole grains.", label: "Repair" },
                        ].map(({ name, foods, label }) => (
                          <div key={name} className="flex items-start justify-between gap-3 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
                            <div>
                              <p className="text-xs font-bold text-slate-200">{name}</p>
                              <p className="text-xs leading-5 text-slate-500">{foods}</p>
                            </div>
                            <span className="shrink-0 text-xs font-bold text-emerald-400">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <h4 className="mb-4 text-sm font-bold text-white">Vitamin-Focused Plate</h4>
                      <div className="space-y-3">
                        {[
                          { name: "B Vitamins", foods: "Eggs, fish, dairy, meat, legumes, leafy greens, fortified foods.", label: "Nerves" },
                          { name: "Vitamin D", foods: "Sunlight, fatty fish, fortified foods, and supplements when appropriate.", label: "Rhythm" },
                          { name: "Vitamin C", foods: "Citrus, berries, peppers, broccoli, potatoes.", label: "Recovery" },
                        ].map(({ name, foods, label }) => (
                          <div key={name} className="flex items-start justify-between gap-3 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
                            <div>
                              <p className="text-xs font-bold text-slate-200">{name}</p>
                              <p className="text-xs leading-5 text-slate-500">{foods}</p>
                            </div>
                            <span className="shrink-0 text-xs font-bold text-amber-400">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-5">
                      <h4 className="mb-3 text-sm font-bold text-rose-300">Safety Note</h4>
                      <p className="mb-4 text-xs leading-5 text-slate-300">
                        This page is educational. Persistent fatigue, low mood, anxiety, numbness, tingling, dizziness, or major sleep problems deserve proper medical evaluation.
                      </p>
                      <p className="text-xs leading-5 text-slate-400">
                        Avoid megadosing supplements. Some nutrients, including iron and vitamin D, can be harmful in excess or interact with conditions and medications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily ritual */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Daily mineral + vitamin ritual</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { time: "Morning", text: "Hydrate, get light exposure, eat a nutrient-dense meal if not fasting, and use movement to cue dopamine/norepinephrine-style activation." },
                      { time: "Midday", text: "Use a balanced meal, steps, electrolytes if needed, and focused work to support energy, cognition, and motivation." },
                      { time: "Evening", text: "Shift toward magnesium-rich foods, slower breathing, lower stimulation, journaling, and sleep rhythm to support calm." },
                    ].map(({ time, text }) => (
                      <div key={time} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70">{time}</p>
                        <p className="text-sm leading-6 text-slate-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-sm italic leading-7 text-slate-400">
                  "Nutrients are not the whole story, but they help give the nervous system the materials it needs to tell a steadier story."
                </blockquote>
              </div>
            )}

          </section>
        </main>
      </div>

      <DetailModal item={modal} onClose={() => setModal(null)} onReflect={openReflection} />

      {reflectionModal && (
        <ReflectionModal
          prompts={reflectionModal.prompts}
          title={reflectionModal.title}
          tone={reflectionModal.tone}
          onClose={() => setReflectionModal(null)}
        />
      )}
    </div>
  );
}
