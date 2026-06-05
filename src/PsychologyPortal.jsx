import { useEffect, useMemo, useState } from "react";
import InnerAtlasNav from "./components/InnerAtlasNav";
import "./innerAtlasTheme.css";
import { accentVars } from "./innerAtlasTheme";

const tabs = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "frameworks", label: "All Frameworks", icon: "▣" },
  { id: "powerstack", label: "Power Stack", icon: "✦" },
  { id: "growth", label: "Growth Concepts", icon: "G" },
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
  {
    id: 11,
    title: "Emotional Avoidance",
    field: "Psychology & Nervous System",
    icon: "◑",
    tone: "violet",
    category: "awareness",
    keyQuestion: "Am I escaping this feeling — or am I with it?",
    use: "Recognising avoidance patterns before they compound into anxiety, numbness, or relational disconnection.",
    how: "Avoidance is an active nervous system strategy to reduce discomfort in the short term — not weakness, not the absence of emotion. The body learns 'feeling this is unsafe' and redirects attention, behaviour, or identity to prevent contact. Understanding this removes shame and opens the door to genuine regulation.",
    example: "Scrolling for an hour after a difficult conversation is not rest — it is the nervous system refusing to stay with what was stirred. The emotion does not disappear; it goes underground and resurfaces later as irritability, numbness, or anxiety.",
    prompts: [
      "What am I avoiding feeling right now — and what would happen if I stayed with it for sixty seconds?",
      "Is this distraction or rest? Am I choosing this, or is my nervous system choosing it for me?",
      "What emotion am I protecting myself from — and is it actually dangerous to feel it?",
      "What has been put underground? What emotional cycle hasn't been completed?",
      "What does 'safe presence' feel like — and can I offer that to myself right now?",
    ],
    avoidanceForms: [
      { form: "Distraction", icon: "◎", tone: "cyan", desc: "Scrolling, binge-watching, overworking — redirecting attention to reduce emotional contact." },
      { form: "Intellectualization", icon: "△", tone: "sky", desc: "Analysing feelings instead of feeling them — thinking about emotion as a way of avoiding it." },
      { form: "Numbing", icon: "◯", tone: "indigo", desc: "Substances, food, compulsive habits — chemically or behaviourally dampening the signal." },
      { form: "Busyness", icon: "↺", tone: "teal", desc: "Constant productivity to avoid stillness — filling time so there is no room for feeling." },
      { form: "Spiritual bypassing", icon: "◈", tone: "violet", desc: "\"I'm above this\" or \"Everything is fine\" — using spiritual framing to skip over unprocessed material." },
      { form: "Emotional detachment", icon: "◇", tone: "rose", desc: "Shutting down, going flat, \"I don't care\" — dissociation as a protective layer against feeling." },
    ],
    avoidanceVsRegulation: {
      avoidance: { label: "Avoidance", statement: "I can't feel this.", desc: "Removes contact with the emotion entirely. Provides short-term relief but builds long-term pressure." },
      regulation: { label: "Regulation", statement: "I can feel this safely.", desc: "Allows pacing, containment, and choice. Emotion is acknowledged, processed, and completed." },
    },
    avoidanceBlocks: [
      "Emotional clarity — the felt sense of what you actually want and need",
      "Genuine confidence — groundedness that comes from having been with hard things",
      "Intimacy — with yourself and others; both require presence with what is real",
      "Intuitive decision-making — intuition lives in the body, not in avoidance",
      "Identity stability — unfelt emotion leaks out as reaction, not expression",
    ],
    avoidanceAntidote: "Not confrontation. Not rumination. Safe presence — 'I can stay with this without needing it to disappear.' Avoidance dissolves naturally when emotion is no longer perceived as dangerous. The practice is building enough capacity that feeling is a choice, not a threat.",
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

const growthConceptGroups = [
  {
    group: "Foundation",
    tone: "cyan",
    summary: "The basic habits that give growth direction, rhythm, and stability.",
    concepts: [
      { name: "Reflect daily", definition: "Review your choices, feelings, and patterns so you understand yourself more honestly." },
      { name: "Set clear goals", definition: "Choose a specific outcome and direction instead of moving through life vaguely." },
      { name: "Manage time wisely", definition: "Protect your attention by spending time on what matters most." },
      { name: "Stay disciplined", definition: "Do the needed action even when motivation is low." },
      { name: "Seek balance", definition: "Keep work, rest, health, relationships, and goals in a sustainable rhythm." },
      { name: "Embrace simplicity", definition: "Remove clutter, noise, and unnecessary pressure so the important things are easier to see." },
    ],
  },
  {
    group: "Mindset",
    tone: "violet",
    summary: "The inner posture that keeps you adaptable, teachable, and steady.",
    concepts: [
      { name: "Embrace change", definition: "Accept shifting conditions and adapt instead of fighting reality." },
      { name: "Keep learning", definition: "Continue building knowledge, skill, and understanding throughout life." },
      { name: "Stay curious", definition: "Ask better questions and explore before assuming you already know." },
      { name: "Accept failure", definition: "Treat mistakes as feedback and training, not proof that you are finished." },
      { name: "Build resilience", definition: "Recover after difficulty and keep acting from your values." },
      { name: "Cultivate optimism", definition: "Train attention toward possibility and hope without denying what is hard." },
    ],
  },
  {
    group: "Courage & Skill",
    tone: "amber",
    summary: "The growth edge where fear becomes action and talent becomes mastery.",
    concepts: [
      { name: "Face your fears", definition: "Meet the things that scare you so they stop directing your life." },
      { name: "Challenge yourself", definition: "Move beyond comfort in small, deliberate ways that build capacity." },
      { name: "Improve your skills", definition: "Practice intentionally so ability compounds over time." },
      { name: "Stay creative", definition: "Use imagination to solve problems, express yourself, and see new options." },
      { name: "Pursue your passions", definition: "Give real time to the work, art, people, and goals that make life feel meaningful." },
    ],
  },
  {
    group: "Well-being",
    tone: "emerald",
    summary: "The body and attention practices that make growth easier to sustain.",
    concepts: [
      { name: "Exercise regularly", definition: "Move your body often to support energy, mood, strength, and health." },
      { name: "Read often", definition: "Use books and useful information to widen your perspective." },
      { name: "Practice mindfulness", definition: "Return attention to the present moment instead of living inside stress or distraction." },
      { name: "Prioritize your health", definition: "Care for sleep, food, movement, rest, and emotional regulation." },
      { name: "Practice gratitude", definition: "Notice what is already good so attention is not trained only on lack." },
      { name: "Develop patience", definition: "Stay calm and steady while waiting, learning, healing, or building." },
    ],
  },
  {
    group: "Relationships",
    tone: "rose",
    summary: "The social skills that turn personal growth into better connection.",
    concepts: [
      { name: "Cultivate empathy", definition: "Try to understand another person's feelings and inner world." },
      { name: "Build strong relationships", definition: "Invest in healthy connections built on trust, respect, and consistency." },
      { name: "Welcome feedback", definition: "Let useful correction improve you without making it an attack on your worth." },
      { name: "Listen actively", definition: "Give full attention so you understand before responding." },
      { name: "Communicate clearly", definition: "Say thoughts, feelings, needs, and boundaries in a way others can understand." },
      { name: "Practice kindness", definition: "Treat yourself and others with care, respect, and compassion." },
      { name: "Value honesty", definition: "Protect truth, sincerity, and integrity in your words and behavior." },
    ],
  },
];

const growthDailyLoop = [
  { time: "Morning", action: "Choose one goal, one growth concept, and one behavior that proves it today." },
  { time: "Midday", action: "Pause for two minutes. Ask: am I acting from habit, fear, or intention?" },
  { time: "Evening", action: "Reflect on one win, one lesson, and one adjustment for tomorrow." },
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

        {(item.avoidanceForms || item.avoidanceVsRegulation || item.avoidanceBlocks || item.avoidanceAntidote) && (
          <div className="space-y-4 px-5 pb-2">
            {item.avoidanceForms && (
              <div className={`rounded-2xl border p-4 ${t.card}`}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Common forms of avoidance</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {item.avoidanceForms.map(({ form, icon, tone: ft, desc }) => {
                    const ft2 = tones[ft] || tones.cyan;
                    return (
                      <div key={form} className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <span className={`text-sm ${ft2.accent}`}>{icon}</span>
                          <span className="text-xs font-bold text-white">{form}</span>
                        </div>
                        <p className="text-xs leading-5 text-slate-400">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {item.avoidanceVsRegulation && (
              <div className={`rounded-2xl border p-4 ${t.card}`}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Avoidance vs regulation</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.values(item.avoidanceVsRegulation).map(({ label, statement, desc }) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
                      <p className={`mb-2 text-base font-bold ${t.accent}`}>"{statement}"</p>
                      <p className="text-xs leading-5 text-slate-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.avoidanceBlocks && (
              <div className={`rounded-2xl border p-4 ${t.card}`}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">What avoidance blocks</div>
                <ul className="space-y-2">
                  {item.avoidanceBlocks.map((block) => (
                    <li key={block} className="flex items-start gap-2 text-xs leading-5 text-slate-300">
                      <span className={`mt-0.5 shrink-0 text-xs ${t.accent}`}>◆</span>
                      {block}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.avoidanceAntidote && (
              <div className={`rounded-2xl border p-5 ${t.card}`}>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">The antidote</div>
                <p className="text-sm leading-7 text-slate-200">{item.avoidanceAntidote}</p>
              </div>
            )}
          </div>
        )}

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

export default function PsychologyPortal({ onBack, onNavigate, onSelectSection, initialSection }) {
  const validInitial = ["overview", "frameworks", "powerstack", "growth", "nutrients"].includes(initialSection)
    ? initialSection
    : "overview";
  const [activeTab, setActiveTab] = useState(validInitial);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [reflectionModal, setReflectionModal] = useState(null);
  const [todayCard, setTodayCard] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("psychology-today-card") || "null");
    } catch {
      return null;
    }
  });
  const [checkins, setCheckins] = useState(() => {
    const date = new Date().toISOString().slice(0, 10);
    try {
      const parsed = JSON.parse(window.localStorage.getItem("psychology-checkins") || "null");
      if (parsed?.date === date) return parsed;
    } catch {
      // ignore corrupt storage
    }
    return { date, morning: false, midday: false, night: false };
  });

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) return frameworks;
    return frameworks.filter((f) => JSON.stringify(f).toLowerCase().includes(lower));
  }, [query]);

  const openDetail = (item) => setModal(item);
  const openReflection = (item) => setReflectionModal(item);
  const quickStart = () => {
    const card = {
      createdAt: new Date().toLocaleString(),
      identity: "I am loved, chosen, and secure now.",
      sats: "I hear: ‘I love being with you.’ It feels natural and done.",
      revision: "I remember when I felt uncertain. Now I live from security.",
      mentalDiet: "This is the old state. I return to the fulfilled one.",
    };
    setTodayCard(card);
    window.localStorage.setItem("psychology-today-card", JSON.stringify(card));
  };
  const toggleCheckin = (slot) => {
    setCheckins((current) => {
      const next = { ...current, [slot]: !current[slot] };
      window.localStorage.setItem("psychology-checkins", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="ia-root text-slate-100" style={accentVars('psychology')}>
      <InnerAtlasNav activeId="psychology" onBack={onBack} onSelectSection={onSelectSection} title="Psychology Atlas" />

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
                onClick={() => onNavigate('inneratlas')}
                className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">◍</span>
                <div>
                  <div className="font-semibold text-white">InnerAtlas</div>
                  <div className="text-xs text-slate-500">Explore the full inner map →</div>
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
                  <Pill tone="emerald">Growth</Pill>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Frameworks for identity work, relationship clarity, and personal growth.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Borrow tools from psychology, philosophy, and behavioral science to stop reacting from fear and start moving from a secure, grounded identity.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveTab("frameworks"); }}
                  placeholder="Search identity, anxiety, attachment, stoicism, growth..."
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
                  <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/5 p-6">
                    <h3 className="text-xl font-bold text-white">Start here (5 minutes)</h3>
                    <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <li><strong className="text-white">1.</strong> Choose desire: one sentence only.</li>
                      <li><strong className="text-white">2.</strong> Choose identity: “I am already...”</li>
                      <li><strong className="text-white">3.</strong> Loop one SATS scene for 60–90 seconds.</li>
                      <li><strong className="text-white">4.</strong> Pick one mental diet line and carry it today.</li>
                    </ol>
                    <button onClick={quickStart} className="mt-5 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-900">Generate Today Card</button>
                  </div>
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
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-violet-300/20 bg-violet-300/5 p-6">
                    <h3 className="text-xl font-bold text-white">Today Card</h3>
                    {!todayCard ? <p className="mt-3 text-sm text-slate-300">Generate your quick card to pin your daily identity and practice lines.</p> : (
                      <div className="mt-4 space-y-2 text-sm text-slate-200">
                        <p><strong>Identity:</strong> {todayCard.identity}</p>
                        <p><strong>SATS:</strong> {todayCard.sats}</p>
                        <p><strong>Revision:</strong> {todayCard.revision}</p>
                        <p><strong>Mental diet:</strong> {todayCard.mentalDiet}</p>
                      </div>
                    )}
                  </div>
                  <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                    <h3 className="text-xl font-bold text-white">Daily check-in</h3>
                    <div className="mt-4 space-y-2 text-sm">
                      {[
                        ["morning", "Morning state set"],
                        ["midday", "Midday reset done"],
                        ["night", "Night SATS done"],
                      ].map(([key, label]) => (
                        <button key={key} onClick={() => toggleCheckin(key)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                          <span>{label}</span><span>{checkins[key] ? "✅" : "◻"}</span>
                        </button>
                      ))}
                    </div>
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

            {/* GROWTH CONCEPTS */}
            {activeTab === "growth" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Personal growth" title="Thirty concepts, five practical lanes">
                  A simple reference map for everyday development. Use one concept at a time, then turn it into a behavior you can repeat.
                </SectionHeader>

                <div className="grid gap-4 lg:grid-cols-3">
                  {growthDailyLoop.map(({ time, action }) => (
                    <div key={time} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">{time}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{action}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  {growthConceptGroups.map(({ group, tone, summary, concepts }) => {
                    const t = tones[tone] || tones.cyan;
                    return (
                      <div key={group} className={`rounded-3xl border p-5 ${t.card}`}>
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <Pill tone={tone}>{group}</Pill>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{summary}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${t.accent}`}>
                            {concepts.length}
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {concepts.map(({ name, definition }) => (
                            <div key={name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                              <h3 className="text-sm font-bold text-white">{name}</h3>
                              <p className="mt-2 text-xs leading-5 text-slate-400">{definition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">Use it today</div>
                  <p className="text-sm leading-7 text-slate-300">
                    Pick one lane, not all thirty. For example: Foundation means choosing one clear goal; Mindset means treating a mistake as feedback; Relationships means listening before defending. Growth becomes real when the concept turns into one observable behavior.
                  </p>
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
                      { title: "Focus + Cognitive Clarity", desc: "Clarity is a combination of oxygen delivery, blood sugar rhythm, neurotransmitter support, rest, and environment design.", pills: ["B12", "Folate", "Iron", "Acetylcholine", "Omega-3"], tone: "sky" },
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
