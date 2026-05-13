import React, { useMemo, useState } from "react";

const chakras = [
  {
    id: "crown",
    name: "Crown Chakra",
    sanskrit: "Sahasrara",
    location: "Top of head",
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.5)",
    y: "6%",
    x: "50%",
    element: "Consciousness",
    theme: "Purpose, faith, spiritual connection",
    balanced: "A quiet sense of trust, perspective, and connection to something greater than the ego.",
    affirmations: [
      "I am connected to a wisdom greater than fear.",
      "I trust life while staying grounded in my choices.",
      "I release the need to control everything.",
      "I am open to guidance, clarity, and peace.",
      "My life has meaning beyond temporary uncertainty."
    ],
    overview:
      "The Crown Chakra is often described as the center of spiritual connection, meaning, surrender, and higher awareness. In a practical sense, it represents your relationship with purpose, faith, wisdom, and the feeling that life has a bigger pattern beyond immediate fear or control.",
    balancedState:
      "When balanced, this chakra can feel like peace, trust, humility, and inner spaciousness. You may feel less desperate to force outcomes and more able to move through life with clarity, patience, and a wider perspective.",
    underactive:
      "When underactive, a person may feel disconnected from purpose, spiritually numb, cynical, isolated, or trapped in material concerns only. It can feel like life has no deeper meaning or that everything depends only on control and effort.",
    overactive:
      "When overactive, it may show up as spiritual bypassing, detachment from real responsibilities, superiority, obsession with signs, or using spirituality to avoid grief, anger, fear, money, work, health, or relationships.",
    bodyMind:
      "As a reflection tool, this chakra points to how safe you feel surrendering control. It is less about escaping the world and more about being present in the world without making your ego carry everything alone.",
    practices: ["Silent meditation", "Prayer or contemplation", "Gratitude practice", "Spending time in nature", "Letting go of the need to know everything"],
    prompts: ["Where am I trying to control what I need to trust?", "What gives my life meaning beyond fear?", "What would humility look like today?"],
    pros: ["Supports meaning and purpose", "Encourages humility and perspective", "Helps soften over-control"],
    cons: ["Can become escapism", "May create spiritual pressure", "Can disconnect you from body and emotions"],
  },
  {
    id: "third-eye",
    name: "Third Eye Chakra",
    sanskrit: "Ajna",
    location: "Forehead / brow",
    color: "#6366F1",
    glow: "rgba(99, 102, 241, 0.5)",
    y: "18%",
    x: "50%",
    element: "Light",
    theme: "Insight, imagination, intuition",
    balanced: "Clear inner vision without becoming trapped in overthinking or fantasy.",
    affirmations: [
      "I see clearly without spiraling into fear.",
      "My intuition is calm, steady, and grounded.",
      "I can separate facts from stories.",
      "My inner vision guides me without controlling me.",
      "I trust clarity more than mental noise."
    ],
    overview:
      "The Third Eye Chakra represents perception, intuition, imagination, pattern recognition, and inner vision. It is the part of the chakra system linked with seeing beyond the surface, noticing patterns, and understanding what your inner world is trying to show you.",
    balancedState:
      "When balanced, it can feel like calm insight. You can reflect without spiraling, imagine without escaping, and trust your perception without needing constant reassurance. You are able to observe your thoughts instead of being swallowed by them.",
    underactive:
      "When underactive, you may feel mentally foggy, disconnected from intuition, overly dependent on outside opinions, or unable to imagine a better direction. It may also show up as doubting yourself even when something feels obvious.",
    overactive:
      "When overactive, it may become obsessive analysis, paranoia, fantasy loops, constant symbol-chasing, or confusing fear with intuition. This is where imagination becomes noisy instead of clarifying.",
    bodyMind:
      "As a reflection tool, this chakra asks whether your inner vision is helping you see clearly or pulling you into mental movies. A balanced third eye does not need drama to feel certain.",
    practices: ["Mindfulness journaling", "Visualization with grounding", "Reducing information overload", "Dream journaling", "Naming facts versus assumptions"],
    prompts: ["Am I seeing clearly or filling in blanks?", "What is the fact, and what is the story?", "What would calm intuition say?"],
    pros: ["Improves self-reflection", "Supports decision clarity", "Builds imagination and pattern recognition"],
    cons: ["Can turn into over-analyzing", "May create paranoia if ungrounded", "Can confuse intuition with fear"],
  },
  {
    id: "throat",
    name: "Throat Chakra",
    sanskrit: "Vishuddha",
    location: "Throat / neck",
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.5)",
    y: "30%",
    x: "50%",
    element: "Sound / Ether",
    theme: "Expression, truth, communication",
    balanced: "Speaking honestly without forcing, hiding, or over-explaining yourself.",
    affirmations: [
      "My voice is clear, calm, and worthy of being heard.",
      "I can speak truth without forcing understanding.",
      "I express myself with honesty and respect.",
      "I do not need to over-explain my reality.",
      "My words align with my inner truth."
    ],
    overview:
      "The Throat Chakra represents expression, truth, communication, honesty, listening, and the ability to give your inner world a clear voice. It is not only about speaking; it is also about knowing when silence is honest and when silence is self-abandonment.",
    balancedState:
      "When balanced, you can express yourself without panic, manipulation, performance, or over-explaining. You can say what you mean, ask for what you need, and listen without immediately defending yourself.",
    underactive:
      "When underactive, you may hold back, swallow your needs, fear being misunderstood, avoid difficult conversations, or feel like your voice does not matter. This can create resentment because the truth stays trapped inside.",
    overactive:
      "When overactive, it may show as talking over others, bluntness without care, explaining too much, arguing to be seen, or using words to control how people perceive you.",
    bodyMind:
      "As a reflection tool, this chakra asks whether your words are aligned with your truth. The goal is not to say everything. The goal is to speak from steadiness instead of fear.",
    practices: ["Speaking one honest sentence", "Voice notes", "Singing or humming", "Boundary scripts", "Active listening"],
    prompts: ["What am I afraid to say clearly?", "Where am I over-explaining instead of trusting myself?", "What truth can I speak without attacking?"],
    pros: ["Helps express needs clearly", "Supports honest communication", "Reduces people-pleasing"],
    cons: ["Can become bluntness without compassion", "May trigger over-talking", "Can feel blocked when emotions are suppressed"],
  },
  {
    id: "heart",
    name: "Heart Chakra",
    sanskrit: "Anahata",
    location: "Center of chest",
    color: "#22C55E",
    glow: "rgba(34, 197, 94, 0.5)",
    y: "43%",
    x: "50%",
    element: "Air",
    theme: "Love, compassion, forgiveness",
    balanced: "Open-hearted love with boundaries, not self-abandonment.",
    affirmations: [
      "My love includes me, my peace, and my boundaries.",
      "I can stay open without abandoning myself.",
      "I give and receive love with steadiness.",
      "I am worthy of safe, mutual connection.",
      "My heart is warm, wise, and protected."
    ],
    overview:
      "The Heart Chakra represents love, compassion, emotional warmth, forgiveness, grief, connection, and the ability to stay open without losing yourself. It is often seen as the bridge between the lower survival-based chakras and the higher awareness-based chakras.",
    balancedState:
      "When balanced, love feels steady rather than desperate. You can care deeply while still having boundaries. You can forgive without excusing harm, connect without chasing, and be warm without abandoning your own needs.",
    underactive:
      "When underactive, you may feel guarded, numb, bitter, lonely, or afraid of vulnerability. Love can feel unsafe, so the heart protects itself through distance, sarcasm, suspicion, or emotional shutdown.",
    overactive:
      "When overactive, it may show as over-giving, rescuing, tolerating poor treatment, confusing intensity for love, or making your worth depend on whether someone chooses you.",
    bodyMind:
      "As a reflection tool, this chakra asks whether your love includes you. A balanced heart is not just open to others; it is also loyal to your own peace, dignity, and emotional safety.",
    practices: ["Self-compassion practice", "Loving-kindness meditation", "Forgiveness without self-abandonment", "Healthy boundaries", "Breathwork focused on the chest"],
    prompts: ["Does my love include my boundaries?", "Am I giving from fullness or fear?", "Where do I need compassion without excusing harm?"],
    pros: ["Encourages compassion", "Supports forgiveness and repair", "Helps build deeper connection"],
    cons: ["Can become over-giving", "May confuse love with tolerating harm", "Can create attachment if boundaries are weak"],
  },
  {
    id: "solar",
    name: "Solar Plexus Chakra",
    sanskrit: "Manipura",
    location: "Upper stomach",
    color: "#FACC15",
    glow: "rgba(250, 204, 21, 0.5)",
    y: "56%",
    x: "50%",
    element: "Fire",
    theme: "Confidence, willpower, identity",
    balanced: "A steady sense of self-worth and direction without needing to dominate.",
    affirmations: [
      "I trust my power and use it with wisdom.",
      "I act from self-respect, not fear.",
      "I am capable, disciplined, and steady.",
      "My confidence does not need to prove itself.",
      "I choose actions that honor my identity."
    ],
    overview:
      "The Solar Plexus Chakra represents confidence, willpower, identity, self-respect, discipline, and personal power. It is the inner fire that helps you choose, act, commit, protect your boundaries, and stand in your own authority.",
    balancedState:
      "When balanced, you feel capable without needing to prove yourself. You can make decisions, take action, tolerate discomfort, and respect yourself without becoming controlling or aggressive.",
    underactive:
      "When underactive, you may feel powerless, indecisive, passive, ashamed, overly dependent on approval, or afraid to take up space. You may know what you want but struggle to act on it.",
    overactive:
      "When overactive, it may become domination, anger, ego battles, perfectionism, pressure, image-management, or needing to win to feel safe.",
    bodyMind:
      "As a reflection tool, this chakra asks whether your power is clean. Real confidence does not need to overpower others. It feels like self-trust, responsibility, and steady action.",
    practices: ["Small daily commitments", "Core strengthening", "Decision practice", "Boundary setting", "Doing one hard thing without drama"],
    prompts: ["Where am I giving away my power?", "What action would self-respect take?", "Am I acting from confidence or control?"],
    pros: ["Supports confidence and action", "Strengthens boundaries", "Helps decision-making"],
    cons: ["Can become control or pride", "May intensify anger", "Can turn self-improvement into pressure"],
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    sanskrit: "Svadhisthana",
    location: "Lower abdomen",
    color: "#FB923C",
    glow: "rgba(251, 146, 60, 0.5)",
    y: "70%",
    x: "50%",
    element: "Water",
    theme: "Emotion, pleasure, creativity",
    balanced: "Feeling emotions and desire without being ruled by them.",
    affirmations: [
      "My emotions can move through me safely.",
      "I honor desire without being controlled by it.",
      "I allow creativity, pleasure, and play to flow.",
      "I can feel deeply and still choose wisely.",
      "My emotional world is alive, honest, and balanced."
    ],
    overview:
      "The Sacral Chakra represents emotion, pleasure, desire, intimacy, creativity, play, and your ability to move with life. It is connected symbolically to water because emotions and desire are not meant to be frozen or forced; they are meant to move.",
    balancedState:
      "When balanced, you can enjoy pleasure without losing yourself, feel emotions without drowning in them, and create without needing perfection. Desire becomes information, not a command.",
    underactive:
      "When underactive, you may feel emotionally numb, creatively blocked, disconnected from pleasure, ashamed of desire, or overly rigid. Life can feel flat, dry, or mechanical.",
    overactive:
      "When overactive, it may become impulsiveness, addiction to intensity, emotional flooding, chasing validation, sexual confusion, or using pleasure to avoid pain.",
    bodyMind:
      "As a reflection tool, this chakra asks whether your desire is flowing cleanly or trying to fill an emotional wound. Balanced sacral energy is alive, creative, playful, and emotionally honest.",
    practices: ["Creative expression", "Dance or fluid movement", "Emotional journaling", "Healthy pleasure rituals", "Naming desires without immediately acting on them"],
    prompts: ["What am I feeling under the desire?", "Where do I need more play?", "Am I choosing pleasure or escaping discomfort?"],
    pros: ["Supports creativity", "Helps emotional flow", "Rebuilds pleasure and play"],
    cons: ["Can become impulsive", "May over-focus on pleasure", "Can stir old emotional wounds"],
  },
  {
    id: "root",
    name: "Root Chakra",
    sanskrit: "Muladhara",
    location: "Base of spine",
    color: "#EF4444",
    glow: "rgba(239, 68, 68, 0.5)",
    y: "84%",
    x: "50%",
    element: "Earth",
    theme: "Safety, stability, survival",
    balanced: "A grounded sense of safety, presence, and physical stability.",
    affirmations: [
      "I am safe in my body and present in this moment.",
      "I build stability through simple daily actions.",
      "The ground supports me as I move through life.",
      "I choose calm, structure, and consistency.",
      "I belong here, and I can trust my foundation."
    ],
    overview:
      "The Root Chakra represents safety, stability, survival, grounding, consistency, money basics, home, body, and the sense that you can exist here without constantly bracing. It is the foundation of the whole system.",
    balancedState:
      "When balanced, you feel more present, steady, practical, and connected to the body. You can handle ordinary responsibilities without feeling like life is always an emergency.",
    underactive:
      "When underactive, you may feel scattered, anxious, unsafe, unstable, disconnected from the body, or unable to build routines. It can feel like you are floating without a base.",
    overactive:
      "When overactive, it may become rigidity, fear of change, survival obsession, hoarding, control around security, or staying in situations only because they feel familiar.",
    bodyMind:
      "As a reflection tool, this chakra asks whether your foundation supports you. Grounding is not just calm breathing; it is also sleep, food, movement, money habits, clean space, and reliable routines.",
    practices: ["Walking", "Strength training", "Cleaning your space", "Budget basics", "Consistent sleep and meals", "Barefoot grounding when safe"],
    prompts: ["What would make my body feel safer today?", "Where do I need more structure?", "Am I choosing stability or just familiarity?"],
    pros: ["Supports calm and grounding", "Builds consistency", "Helps the body feel safer"],
    cons: ["Can become rigid or fear-based", "May over-focus on survival", "Can keep you stuck in comfort zones"],
  },
];

const chakraStretchLinks = {
  crown: ["crown chakra yoga poses", "sahasrara chakra meditation posture", "crown chakra stretches"],
  "third-eye": ["third eye chakra yoga poses", "ajna chakra stretches", "child pose third eye chakra"],
  throat: ["throat chakra yoga poses", "neck stretches throat chakra", "vishuddha chakra stretches"],
  heart: ["heart chakra yoga poses", "chest opening stretches heart chakra", "anahata chakra stretches"],
  solar: ["solar plexus chakra yoga poses", "core stretches manipura chakra", "solar plexus opening stretches"],
  sacral: ["sacral chakra yoga poses", "hip opening stretches sacral chakra", "svadhisthana chakra stretches"],
  root: ["root chakra yoga poses", "grounding yoga poses root chakra", "muladhara chakra stretches"],
};

function googleImageUrl(query) {
  return "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(query);
}

function openExternalUrl(url) {
  const openedWindow = window.open(url, "_blank");

  if (openedWindow) {
    openedWindow.opener = null;
    openedWindow.focus();
    return;
  }

  window.location.href = url;
}

function IconBadge({ label, className = "" }) {
  return (
    <span className={`inline-grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-white/10 text-lg shadow-lg ${className}`}>
      {label}
    </span>
  );
}

function ChakraOrb({ chakra, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition duration-300 hover:scale-110 active:scale-95"
      style={{ top: chakra.y, left: chakra.x }}
      aria-label={`Select ${chakra.name}`}
    >
      <span
        className={`absolute inset-0 rounded-full ${selected ? "animate-ping" : "animate-pulse"}`}
        style={{ background: chakra.color, boxShadow: `0 0 42px ${chakra.glow}` }}
      />
      <span
        className={`relative grid h-8 w-8 place-items-center rounded-full border border-white/70 shadow-lg md:h-10 md:w-10 ${selected ? "ring-4 ring-white/30" : ""}`}
        style={{ background: chakra.color, boxShadow: `0 0 30px ${chakra.glow}` }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
      </span>
    </button>
  );
}

function BodyModel({ selectedId, setSelectedId, rotate }) {
  const selected = chakras.find((item) => item.id === selectedId) || chakras[3];

  return (
    <div className="relative mx-auto flex min-h-[560px] w-full max-w-[430px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 p-8 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_38%)]" />
      <div className="absolute left-8 top-8 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">3D Aura Field</div>

      <div className={`absolute h-[470px] w-[270px] rounded-full border border-cyan-200/20 ${rotate ? "animate-[spin_12s_linear_infinite]" : ""}`} />
      <div className={`absolute h-[430px] w-[230px] rounded-full border border-fuchsia-200/10 ${rotate ? "animate-[spin_16s_linear_infinite]" : ""}`} />
      <div className="absolute h-[500px] w-[40px] rounded-full bg-cyan-300/5 blur-2xl" />

      <div className={`relative h-[500px] w-[220px] ${rotate ? "animate-[chakraSway_7s_ease-in-out_infinite]" : ""}`}>
        <div className="absolute left-1/2 top-0 h-[82px] w-[82px] -translate-x-1/2 rounded-full border border-white/20 bg-gradient-to-b from-white/25 to-white/5 shadow-[inset_0_0_35px_rgba(255,255,255,0.12)]" />
        <div className="absolute left-1/2 top-[82px] h-[245px] w-[126px] -translate-x-1/2 rounded-[48%_48%_38%_38%] border border-white/20 bg-gradient-to-b from-white/20 to-white/5 shadow-[inset_0_0_45px_rgba(255,255,255,0.08)]" />
        <div className="absolute left-[18px] top-[115px] h-[185px] w-[30px] rotate-6 rounded-full border border-white/15 bg-white/5" />
        <div className="absolute right-[18px] top-[115px] h-[185px] w-[30px] -rotate-6 rounded-full border border-white/15 bg-white/5" />
        <div className="absolute left-[62px] top-[314px] h-[176px] w-[34px] rounded-full border border-white/15 bg-white/5" />
        <div className="absolute right-[62px] top-[314px] h-[176px] w-[34px] rounded-full border border-white/15 bg-white/5" />

        <div className="absolute left-1/2 top-[24px] h-[405px] w-px -translate-x-1/2 bg-gradient-to-b from-purple-400 via-cyan-300 to-red-400 opacity-70" />

        {chakras.map((chakra) => (
          <ChakraOrb key={chakra.id} chakra={chakra} selected={selectedId === chakra.id} onClick={() => setSelectedId(chakra.id)} />
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-slate-950/75 p-4 text-white shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full" style={{ background: selected.color, boxShadow: `0 0 24px ${selected.glow}` }} />
          <div>
            <p className="text-sm font-semibold leading-none">{selected.name}</p>
            <p className="mt-1 text-xs text-slate-300">{selected.location}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes chakraSway {
          0%, 100% { transform: perspective(900px) rotateY(0deg); }
          50% { transform: perspective(900px) rotateY(9deg); }
        }
      `}</style>
    </div>
  );
}

function MiniList({ title, items, tone = "white" }) {
  const toneClasses = {
    white: "border-white/10 bg-white/5",
    green: "border-emerald-300/15 bg-emerald-300/10",
    amber: "border-amber-300/15 bg-amber-300/10",
    blue: "border-cyan-300/15 bg-cyan-300/10",
    violet: "border-violet-300/15 bg-violet-300/10",
  };

  return (
    <section className={`rounded-[1.5rem] border p-5 text-white backdrop-blur-xl ${toneClasses[tone] || toneClasses.white}`}>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-sm leading-relaxed text-slate-100">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StretchImageLinks({ chakra, compact = false }) {
  const searches = chakraStretchLinks[chakra.id] || [chakra.name + " stretches"];

  return (
    <section className={`${compact ? "mt-4" : "mt-6"} rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/10 p-6 backdrop-blur-xl`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge label="↗" className="h-8 w-8 text-cyan-100" />
          <div>
            <h3 className="text-xl font-bold">Stretch image references</h3>
            <p className="mt-1 text-sm text-slate-300">External Google Images searches for visual stretch ideas.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {searches.map((query) => (
          <button
            key={query}
            type="button"
            onClick={() => openExternalUrl(googleImageUrl(query))}
            className="group rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-left text-sm leading-relaxed text-slate-100 transition hover:border-cyan-200/40 hover:bg-cyan-200/10 active:scale-[0.98]"
          >
            <span className="block font-semibold capitalize">{query}</span>
            <span className="mt-2 block text-xs text-cyan-100/80 group-hover:text-cyan-50">Open Google Images →</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AffirmationWindow({ chakra, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/90 px-4 py-6 text-white backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_70%_90%,rgba(59,130,246,0.12),transparent_30%)]" />

      <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="p-6 sm:p-8" style={{ background: `linear-gradient(135deg, ${chakra.glow}, rgba(15,23,42,0.68))` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">Affirmation window</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{chakra.name}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                Use these as calm identity statements. Read them slowly, breathe, and let the words feel steady instead of forced.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 font-semibold text-white transition hover:bg-slate-950/50 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:p-6">
          {chakra.affirmations.map((affirmation, index) => (
            <div
              key={affirmation}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 shadow-lg"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Affirmation {index + 1}</p>
              <p className="text-lg font-semibold leading-relaxed text-slate-50">{affirmation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DetailPanel({ chakra, onOpenExpanded, onOpenAffirmations }) {
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">{chakra.sanskrit}</p>
            <h2 className="text-3xl font-bold tracking-tight">{chakra.name}</h2>
            <p className="mt-2 text-slate-300">{chakra.theme}</p>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/20 text-2xl" style={{ background: chakra.color, boxShadow: `0 0 38px ${chakra.glow}` }}>
            ✦
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location</p>
            <p className="mt-2 font-medium">{chakra.location}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Element</p>
            <p className="mt-2 font-medium">{chakra.element}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">State</p>
            <p className="mt-2 font-medium">Balanced</p>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-2 flex items-center gap-2 text-slate-200">
            <IconBadge label="i" className="h-7 w-7 rounded-xl text-sm" />
            <p className="font-semibold">What it represents</p>
          </div>
          <p className="leading-relaxed text-slate-300">{chakra.balanced}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onOpenAffirmations}
            className="rounded-2xl border border-white/15 px-5 py-4 font-semibold text-white shadow-xl transition hover:brightness-110 active:scale-[0.99]"
            style={{ background: chakra.color, boxShadow: `0 0 26px ${chakra.glow}` }}
          >
            Open affirmations first
          </button>

          <button
            type="button"
            onClick={onOpenExpanded}
            className="rounded-2xl border border-white/15 bg-white px-5 py-4 font-semibold text-slate-950 shadow-xl transition hover:bg-slate-200 active:scale-[0.99]"
          >
            Open full explanation page
          </button>
        </div>

        <StretchImageLinks chakra={chakra} compact />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <MiniList title="Pros" items={chakra.pros} tone="green" />
        <MiniList title="Cons / Watch-outs" items={chakra.cons} tone="amber" />
      </div>
    </div>
  );
}

function ExpandedChakraPage({ chakra, onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 px-4 py-5 text-white backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.14),transparent_26%),radial-gradient(circle_at_50%_95%,rgba(239,68,68,0.12),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full" style={{ background: chakra.color, boxShadow: `0 0 24px ${chakra.glow}` }} />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Expanded chakra page</p>
                <h2 className="text-xl font-bold">{chakra.name}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15 active:scale-95"
            >
              Close page
            </button>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px] overflow-hidden p-8" style={{ background: `linear-gradient(145deg, ${chakra.glow}, rgba(15,23,42,0.6))` }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.22),transparent_28%)]" />
              <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium text-white/75">{chakra.sanskrit}</p>
                  <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{chakra.name}</h1>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{chakra.theme}</p>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Location</p>
                    <p className="mt-2 font-semibold">{chakra.location}</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Element</p>
                    <p className="mt-2 font-semibold">{chakra.element}</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Lens</p>
                    <p className="mt-2 font-semibold">Mind + spirit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
                <h3 className="mb-3 text-2xl font-bold">Full explanation</h3>
                <p className="text-base leading-relaxed text-slate-300">{chakra.overview}</p>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-emerald-300/15 bg-emerald-300/10 p-5">
                  <h4 className="mb-2 font-semibold text-emerald-100">When balanced</h4>
                  <p className="text-sm leading-relaxed text-slate-200">{chakra.balancedState}</p>
                </div>
                <div className="rounded-[1.5rem] border border-cyan-300/15 bg-cyan-300/10 p-5">
                  <h4 className="mb-2 font-semibold text-cyan-100">Body / mind reflection</h4>
                  <p className="text-sm leading-relaxed text-slate-200">{chakra.bodyMind}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-rose-300/15 bg-rose-300/10 p-6 backdrop-blur-xl">
            <h3 className="mb-3 text-xl font-bold">Underactive / blocked pattern</h3>
            <p className="leading-relaxed text-slate-200">{chakra.underactive}</p>
          </div>
          <div className="rounded-[1.75rem] border border-amber-300/15 bg-amber-300/10 p-6 backdrop-blur-xl">
            <h3 className="mb-3 text-xl font-bold">Overactive pattern</h3>
            <p className="leading-relaxed text-slate-200">{chakra.overactive}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <MiniList title="Pros" items={chakra.pros} tone="green" />
          <MiniList title="Watch-outs" items={chakra.cons} tone="amber" />
          <MiniList title="Practices" items={chakra.practices} tone="blue" />
        </section>

        <StretchImageLinks chakra={chakra} />

        <section className="mt-6 rounded-[1.75rem] border border-violet-300/15 bg-violet-300/10 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <IconBadge label="?" className="h-8 w-8 text-violet-100" />
            <h3 className="text-xl font-bold">Journal prompts</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {chakra.prompts.map((prompt) => (
              <div key={prompt} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-relaxed text-slate-100">
                {prompt}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold">Jump to another chakra</h3>
            <p className="text-sm text-slate-400">Switch pages without closing the expanded view.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {chakras.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`rounded-2xl border p-3 text-left text-sm transition ${
                  chakra.id === item.id ? "border-white/40 bg-white/20 shadow-lg" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="mb-2 block h-3 w-3 rounded-full" style={{ background: item.color, boxShadow: `0 0 18px ${item.glow}` }} />
                <span className="block font-semibold leading-tight">{item.name.replace(" Chakra", "")}</span>
              </button>
            ))}
          </div>
        </section>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
          Chakra language is used here as a symbolic wellness framework for reflection, not as medical diagnosis or treatment. Use it to organize self-awareness, not to replace qualified care.
        </p>
      </div>
    </div>
  );
}

export default function Chakra3DVisualizer() {
  const [selectedId, setSelectedId] = useState("heart");
  const [rotate, setRotate] = useState(true);
  const [expandedOpen, setExpandedOpen] = useState(false);
  const [affirmationOpen, setAffirmationOpen] = useState(false);
  const selectedChakra = useMemo(() => chakras.find((item) => item.id === selectedId) || chakras[3], [selectedId]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.16),transparent_26%),radial-gradient(circle_at_50%_95%,rgba(239,68,68,0.14),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
              <span>◎</span>
              Interactive 3D-style chakra map
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Chakra Visualizer</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Explore the seven main chakras through a rotating body model, quick meaning cards, and full expanded explanation pages. This is a wellness and spiritual reflection tool, not medical advice.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setRotate((value) => !value)}
              className="rounded-2xl bg-white px-5 py-4 font-semibold text-slate-950 shadow-xl transition hover:bg-slate-200 active:scale-95"
            >
              {rotate ? "Pause 3D" : "Rotate 3D"}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            <BodyModel selectedId={selectedId} setSelectedId={setSelectedId} rotate={rotate} />

            <section className="rounded-[1.75rem] border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <IconBadge label="☼" className="h-7 w-7 rounded-xl text-sm" />
                Chakra Selector
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {chakras.map((chakra) => (
                  <button
                    key={chakra.id}
                    type="button"
                    onClick={() => setSelectedId(chakra.id)}
                    className={`rounded-2xl border p-3 text-left text-sm transition ${
                      selectedId === chakra.id ? "border-white/40 bg-white/20 shadow-lg" : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="mb-2 block h-3 w-3 rounded-full" style={{ background: chakra.color, boxShadow: `0 0 18px ${chakra.glow}` }} />
                    <span className="block font-semibold leading-tight">{chakra.name.replace(" Chakra", "")}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <DetailPanel
            chakra={selectedChakra}
            onOpenAffirmations={() => setAffirmationOpen(true)}
            onOpenExpanded={() => setExpandedOpen(true)}
          />
        </div>
      </section>

      {affirmationOpen && (
        <AffirmationWindow chakra={selectedChakra} onClose={() => setAffirmationOpen(false)} />
      )}

      {expandedOpen && (
        <ExpandedChakraPage
          chakra={selectedChakra}
          onClose={() => setExpandedOpen(false)}
          onSelect={(id) => setSelectedId(id)}
        />
      )}
    </main>
  );
}
