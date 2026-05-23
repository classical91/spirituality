import { useMemo, useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "masturbation", label: "Masturbation" },
  { id: "celibacy", label: "Celibacy" },
  { id: "urges", label: "Urges" },
  { id: "tracker", label: "Tracker" },
  { id: "journal", label: "Journal" },
];

const tabIds = new Set(tabs.map((t) => t.id));

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

export default function SexualEnergyDashboard({ onBack, initialSection }) {
  const [activeTab, setActiveTab] = useState(() =>
    initialSection && tabIds.has(initialSection) ? initialSection : "overview"
  );
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
    if (initialSection && tabIds.has(initialSection)) {
      setActiveTab(initialSection);
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

  const renderTab = () => {
    if (activeTab === "overview") return renderOverview();
    if (activeTab === "masturbation") return renderMasturbation();
    if (activeTab === "celibacy") return renderCelibacy();
    if (activeTab === "urges") return renderUrges();
    if (activeTab === "tracker") return renderTracker();
    return renderJournal();
  };

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
                <Badge tone="emerald">No-shame discipline</Badge>
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Sexual Energy &amp; Self-Mastery
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                A dashboard for masturbation, celibacy, urges, abstinence, porn-pattern awareness, relapse recovery, and values-based discipline — without turning you against your own body.
              </p>
            </div>
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 lg:w-80">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Today’s anchor</p>
              <p className="mt-3 text-lg font-semibold leading-7 text-white">“I do not need to fear desire. I can hold energy, choose clearly, and act from self-respect.”</p>
            </div>
          </div>
        </header>

        <nav className="sticky top-3 z-20 mb-8 rounded-3xl border border-white/10 bg-[#070914]/80 p-2 backdrop-blur-xl">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-medium transition ${activeTab === tab.id ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
              >
                {tab.label}
              </button>
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
