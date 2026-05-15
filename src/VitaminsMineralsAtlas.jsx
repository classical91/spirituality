import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: "◍" },
  { id: "nutrients", label: "Nutrients", icon: "✦" },
  { id: "neurochemistry", label: "Neurochemistry", icon: "⌁" },
  { id: "patterns", label: "Patterns", icon: "◎" },
  { id: "food", label: "Food First", icon: "✧" },
];

const nutrients = [
  {
    name: "Magnesium",
    theme: "Calm & Sleep",
    tone: "emerald",
    body: "Supports muscle and nerve function, energy production, and relaxation. Connects to tension, sleep, GABA-like calm, and stress recovery.",
    sources: "Leafy greens, legumes, nuts, seeds, whole grains",
    link: "GABA · Sleep · Tension",
  },
  {
    name: "B6",
    theme: "Mood Bridge",
    tone: "violet",
    body: "Supports neurotransmitter-related metabolism. Bridges food, mood, serotonin, dopamine, GABA, and energy regulation.",
    sources: "Poultry, fish, potatoes, bananas, chickpeas",
    link: "Serotonin · Dopamine · GABA",
  },
  {
    name: "B12",
    theme: "Nerve & Energy",
    tone: "blue",
    body: "Supports nerve health, red blood cell formation, and energy. Connects to fatigue, brain fog, mood stability, and cognitive clarity.",
    sources: "Meat, fish, dairy, eggs, fortified foods",
    link: "Acetylcholine · Fatigue · Cognition",
  },
  {
    name: "Folate",
    theme: "Methylation",
    tone: "emerald",
    body: "Works with B12 in methylation and cell function. Belongs near mood steadiness, cognition, and nervous-system support.",
    sources: "Leafy greens, legumes, fortified grains, citrus",
    link: "Serotonin · B12 · Mood",
  },
  {
    name: "Vitamin D",
    theme: "Rhythm & Immune",
    tone: "gold",
    body: "Supports bones, muscles, immune function, and nerve communication. Belongs in sunlight, mood rhythm, and seasonal well-being.",
    sources: "Sunlight, fatty fish, fortified foods, supplements when appropriate",
    link: "Serotonin · Seasonal rhythm · Immune",
  },
  {
    name: "Iron",
    theme: "Oxygen & Drive",
    tone: "rose",
    body: "Supports oxygen transport and energy. Connects to fatigue, focus, exercise capacity, and oxygen delivery to muscles and brain.",
    sources: "Meat, seafood, beans, lentils, spinach, fortified foods — pair plant iron with vitamin C",
    link: "Dopamine · Norepinephrine · Fatigue",
  },
  {
    name: "Zinc",
    theme: "Resilience",
    tone: "emerald",
    body: "Supports immune function, repair, and many enzyme systems. Belongs near resilience, recovery, and neurochemical support.",
    sources: "Seafood, meat, beans, nuts, seeds, dairy, whole grains",
    link: "Dopamine · Immune · Repair",
  },
  {
    name: "Iodine",
    theme: "Thyroid & Pace",
    tone: "blue",
    body: "Supports thyroid hormone production, which influences energy, temperature regulation, metabolism, and mental pace.",
    sources: "Iodized salt, seafood, dairy, seaweed",
    link: "Thyroid · Metabolism · Energy",
  },
  {
    name: "Selenium",
    theme: "Antioxidant",
    tone: "violet",
    body: "Supports thyroid-related and antioxidant systems. Fits the recovery, metabolism, and stress-buffering side of the map.",
    sources: "Brazil nuts, seafood, meat, grains",
    link: "Thyroid · Recovery · Stress",
  },
  {
    name: "Calcium",
    theme: "Nerve Signal",
    tone: "gold",
    body: "Supports bones, muscle contraction, and nerve signaling. Belongs in the body-signal layer, not just bone health.",
    sources: "Dairy, fortified plant milks, leafy greens, tofu, almonds",
    link: "Nerve firing · Muscle · Signaling",
  },
  {
    name: "Sodium + Potassium",
    theme: "Electrolytes",
    tone: "blue",
    body: "Electrolytes that support fluid balance, nerve impulses, and muscle function. Connect to hydration, energy, headaches, and exercise recovery.",
    sources: "Salt (sodium), bananas, potatoes, avocado, leafy greens (potassium)",
    link: "Hydration · Nerve impulse · Muscle",
  },
  {
    name: "Vitamin C",
    theme: "Recovery",
    tone: "rose",
    body: "Supports antioxidant protection, collagen formation, and iron absorption. Belongs near recovery, immune tone, and stress resilience.",
    sources: "Citrus, berries, peppers, broccoli, potatoes",
    link: "Iron absorption · Immune · Recovery",
  },
];

const neuroRows = [
  {
    chem: "Dopamine",
    support: "B vitamins, iron, protein-rich meals, magnesium, zinc",
    state: "Motivation, drive, reward, energy, goal pursuit",
    use: "Goals, movement, productivity rituals, push-ups, steps",
    tone: "violet",
  },
  {
    chem: "Serotonin",
    support: "Vitamin D, B6, folate, magnesium, sunlight, balanced meals",
    state: "Mood steadiness, emotional resilience, satisfaction",
    use: "Gratitude, sunlight, mood tracking, daily rhythm",
    tone: "emerald",
  },
  {
    chem: "GABA",
    support: "Magnesium, B6, steady blood sugar, calming evening routine",
    state: "Calm, relaxation, reducing overactivation",
    use: "Breathwork, sleep rhythm, detachment, down-regulation",
    tone: "blue",
  },
  {
    chem: "Norepinephrine",
    support: "Iron, B vitamins, hydration, electrolytes, adequate calories",
    state: "Alertness, attention, readiness, energy",
    use: "Focus blocks, work sprints, movement activation",
    tone: "gold",
  },
  {
    chem: "Acetylcholine",
    support: "B vitamins, choline-rich foods, magnesium, sleep support",
    state: "Learning, memory, cognition, mental sharpness",
    use: "Learning, journaling, skill-building, personal development",
    tone: "violet",
  },
  {
    chem: "Oxytocin",
    support: "Not a simple supplement target — supported by connection, safety, touch, trust, and stress regulation",
    state: "Bonding, trust, belonging, emotional warmth",
    use: "Relationships, compassion rituals, giving, community",
    tone: "rose",
  },
];

const patterns = [
  {
    title: "Energy + Motivation",
    icon: "⚡",
    body: "When energy is low, mindset work can feel harder. This links fatigue-like states to sleep, iron, B vitamins, hydration, and movement rather than only 'lack of discipline.'",
    pills: ["Iron", "B12", "B6", "Hydration", "Electrolytes", "Steps"],
    tone: "gold",
  },
  {
    title: "Calm + Sleep",
    icon: "◑",
    body: "Evening regulation is a body-state issue. Connects calm to magnesium, breathwork, sleep rhythm, light timing, and emotional detachment.",
    pills: ["Magnesium", "Vitamin D rhythm", "Long exhale", "GABA theme", "Journal release"],
    tone: "blue",
  },
  {
    title: "Focus + Cognitive Clarity",
    icon: "◎",
    body: "Clarity is a combination of oxygen delivery, blood sugar rhythm, neurotransmitter support, rest, and environment design.",
    pills: ["B12", "Folate", "Iron", "Acetylcholine", "Sleep quality"],
    tone: "violet",
  },
];

const foodPlates = [
  {
    title: "Mineral-Focused Plate",
    icon: "◍",
    items: [
      { name: "Magnesium", note: "Leafy greens, legumes, nuts, seeds, whole grains.", tag: "Calm" },
      { name: "Iron", note: "Meat, seafood, beans, lentils, spinach, fortified foods. Pair plant iron with vitamin C.", tag: "Energy" },
      { name: "Zinc", note: "Seafood, meat, beans, nuts, seeds, dairy, whole grains.", tag: "Repair" },
    ],
    tone: "emerald",
  },
  {
    title: "Vitamin-Focused Plate",
    icon: "✦",
    items: [
      { name: "B Vitamins", note: "Eggs, fish, dairy, meat, legumes, leafy greens, fortified foods.", tag: "Nerves" },
      { name: "Vitamin D", note: "Sunlight, fatty fish, fortified foods, and supplements when appropriate.", tag: "Rhythm" },
      { name: "Vitamin C", note: "Citrus, berries, peppers, broccoli, potatoes.", tag: "Recovery" },
    ],
    tone: "gold",
  },
];

const toneClasses = {
  emerald: {
    pill: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
    accent: "text-emerald-400",
    border: "border-emerald-400/25",
    bg: "bg-emerald-500/8",
    tag: "bg-emerald-500/15 text-emerald-200 border-emerald-400/25",
  },
  violet: {
    pill: "border-violet-400/30 bg-violet-500/10 text-violet-100",
    accent: "text-violet-400",
    border: "border-violet-400/25",
    bg: "bg-violet-500/8",
    tag: "bg-violet-500/15 text-violet-200 border-violet-400/25",
  },
  blue: {
    pill: "border-sky-400/30 bg-sky-500/10 text-sky-100",
    accent: "text-sky-400",
    border: "border-sky-400/25",
    bg: "bg-sky-500/8",
    tag: "bg-sky-500/15 text-sky-200 border-sky-400/25",
  },
  gold: {
    pill: "border-amber-300/30 bg-amber-300/10 text-amber-100",
    accent: "text-amber-400",
    border: "border-amber-300/25",
    bg: "bg-amber-300/8",
    tag: "bg-amber-300/15 text-amber-100 border-amber-300/25",
  },
  rose: {
    pill: "border-rose-400/30 bg-rose-500/10 text-rose-100",
    accent: "text-rose-400",
    border: "border-rose-400/25",
    bg: "bg-rose-500/8",
    tag: "bg-rose-500/15 text-rose-200 border-rose-400/25",
  },
};

function Pill({ children, tone = "emerald" }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone].pill}`}>
      {children}
    </span>
  );
}

function NutrientCard({ nutrient }) {
  const t = toneClasses[nutrient.tone];
  return (
    <div className={`rounded-3xl border ${t.border} bg-white/[0.04] p-5 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <h3 className="text-base font-bold text-white">{nutrient.name}</h3>
        <Pill tone={nutrient.tone}>{nutrient.theme}</Pill>
      </div>
      <p className="text-sm leading-6 text-slate-300 flex-1">{nutrient.body}</p>
      <div className="space-y-1.5 border-t border-white/8 pt-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Sources</div>
        <p className="text-xs leading-5 text-slate-400">{nutrient.sources}</p>
        <div className={`mt-2 text-xs font-semibold ${t.accent}`}>{nutrient.link}</div>
      </div>
    </div>
  );
}

function OverviewTab() {
  const mapLeft = [
    { title: "Vitamins", body: "B vitamins, vitamin D, vitamin C, and folate support energy metabolism, nerve function, immune tone, and neurotransmitter-related pathways.", tone: "gold" },
    { title: "Minerals", body: "Magnesium, iron, zinc, iodine, selenium, calcium, sodium, and potassium support nerve firing, oxygen delivery, muscle tension, thyroid function, and stress response.", tone: "violet" },
    { title: "Food + Rhythm", body: "Nutrients work best with steady meals, hydration, sleep, sunlight, movement, and recovery — not as isolated quick fixes.", tone: "emerald" },
  ];
  const mapRight = [
    { title: "Neurochemical Themes", body: "Dopamine, serotonin, GABA, norepinephrine, acetylcholine, and oxytocin are supported indirectly through sleep, amino acids, micronutrients, stress regulation, and lifestyle.", tone: "blue" },
    { title: "Deficiency-Like Signals", body: "Low energy, low mood, brain fog, irritability, poor sleep, muscle tension, and anxious activation can overlap with nutrient issues, stress, or medical factors.", tone: "rose" },
    { title: "Action Layer", body: "Track patterns, improve food quality, avoid megadosing, and use labs or professional guidance when symptoms are persistent or intense.", tone: "emerald" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-400/80">How it works</div>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">Nutrient → Body State → Neurochemistry</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Vitamins and minerals do not "create a mood" by themselves. They help the body run the systems that mood depends on: energy production, oxygen transport, nerve signaling, sleep rhythm, stress recovery, and neurotransmitter synthesis.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4">
          {mapLeft.map(card => (
            <div key={card.title} className={`rounded-2xl border ${toneClasses[card.tone].border} bg-white/[0.04] p-4`}>
              <h4 className={`text-sm font-bold ${toneClasses[card.tone].accent} mb-1.5`}>{card.title}</h4>
              <p className="text-sm leading-6 text-slate-300">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-950/40 to-slate-950/60 p-8 text-center flex flex-col items-center gap-4 h-full justify-center">
            <div className="w-28 h-28 rounded-full border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-violet-500/15 grid place-items-center text-4xl shadow-[0_0_40px_rgba(52,211,153,0.15)]">
              ◍
            </div>
            <div>
              <strong className="block text-2xl font-black text-white tracking-tight mb-2">Psychophysiology</strong>
              <p className="text-sm leading-6 text-slate-400 max-w-[200px]">
                Nutrition influences the body signals your mind reads: energy, calm, tension, clarity, fatigue, motivation, and emotional stability.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mapRight.map(card => (
            <div key={card.title} className={`rounded-2xl border ${toneClasses[card.tone].border} bg-white/[0.04] p-4`}>
              <h4 className={`text-sm font-bold ${toneClasses[card.tone].accent} mb-1.5`}>{card.title}</h4>
              <p className="text-sm leading-6 text-slate-300">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { num: "12", label: "Nutrients", desc: "vitamins and minerals mapped to body and mind systems", tone: "emerald" },
          { num: "6", label: "Neurochemical themes", desc: "dopamine, serotonin, GABA, norepinephrine, acetylcholine, oxytocin", tone: "violet" },
          { num: "3", label: "State patterns", desc: "energy, calm, and focus as psychophysiology layers", tone: "gold" },
        ].map(s => (
          <div key={s.label} className={`rounded-3xl border ${toneClasses[s.tone].border} bg-white/[0.04] p-6`}>
            <Pill tone={s.tone}>{s.label}</Pill>
            <div className="mt-4 text-5xl font-black text-white">{s.num}</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NutrientsTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-400/80">Core nutrients</div>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">12 vitamins & minerals</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Each entry maps the nutrient to a body-state theme, the neurochemical systems it supports indirectly, and food sources. Not prescriptions — educational patterns.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {nutrients.map(n => <NutrientCard key={n.name} nutrient={n} />)}
      </div>
    </div>
  );
}

function NeurochemTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400/80">Integration</div>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">Nutrients + Neurotransmitter Themes</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          This does not mean one nutrient equals one neurotransmitter. It means certain nutrients support the body conditions and biochemical pathways that help those systems function.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {["Neurochemical Theme", "Nutrient Support", "Body-State Connection", "Application"].map(h => (
                <th key={h} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {neuroRows.map((row, i) => {
              const t = toneClasses[row.tone];
              return (
                <tr key={row.chem} className={`border-b border-white/6 ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${t.pill}`}>{row.chem}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-300 leading-6">{row.support}</td>
                  <td className="px-5 py-4 text-slate-300 leading-6">{row.state}</td>
                  <td className="px-5 py-4 text-slate-400 leading-6 text-xs">{row.use}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PatternsTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-400/80">Psychophysiology</div>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">Three core state patterns</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Body states and lifestyle factors interact in recognizable patterns. These are not diagnoses — they are lenses for understanding why a state feels the way it does.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {patterns.map(p => {
          const t = toneClasses[p.tone];
          return (
            <div key={p.title} className={`rounded-3xl border ${t.border} bg-white/[0.04] p-6 flex flex-col gap-4`}>
              <div className={`w-12 h-12 rounded-2xl border ${t.border} bg-white/5 grid place-items-center text-2xl`}>{p.icon}</div>
              <div>
                <h3 className={`text-lg font-bold text-white mb-2`}>{p.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{p.body}</p>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-white/8 pt-4">
                {p.pills.map(pill => (
                  <span key={pill} className={`rounded-full border px-3 py-1 text-xs font-medium ${t.pill}`}>{pill}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-4">Daily mineral + vitamin rhythm</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { time: "Morning", icon: "☀", body: "Hydrate, get light exposure, eat a nutrient-dense meal if not fasting, and use movement to cue dopamine/norepinephrine-style activation.", tone: "gold" },
            { time: "Midday", icon: "◉", body: "Use a balanced meal, steps, electrolytes if needed, and focused work to support energy, cognition, and motivation.", tone: "emerald" },
            { time: "Evening", icon: "◑", body: "Shift toward magnesium-rich foods, slower breathing, lower stimulation, journaling, and sleep rhythm to support calm.", tone: "blue" },
          ].map(step => {
            const t = toneClasses[step.tone];
            return (
              <div key={step.time} className={`rounded-2xl border ${t.border} bg-white/[0.03] p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{step.icon}</span>
                  <h4 className={`font-bold ${t.accent}`}>{step.time}</h4>
                </div>
                <p className="text-sm leading-6 text-slate-300">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FoodTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-400/80">Food first</div>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">Food-first support examples</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Whole foods provide nutrients in context with cofactors, fiber, and other compounds that support absorption and balance. Supplements can help when indicated — food is the foundation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {foodPlates.map(plate => {
          const t = toneClasses[plate.tone];
          return (
            <div key={plate.title} className={`rounded-3xl border ${t.border} bg-white/[0.04] p-6`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{plate.icon}</span>
                <h3 className="text-lg font-bold text-white">{plate.title}</h3>
              </div>
              <div className="space-y-3">
                {plate.items.map(item => (
                  <div key={item.name} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">{item.name}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${t.tag}`}>{item.tag}</span>
                      </div>
                      <p className="text-xs leading-5 text-slate-400">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-rose-400/25 bg-rose-500/8 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 grid place-items-center text-lg flex-shrink-0">⚠</div>
          <div>
            <h3 className="text-base font-bold text-rose-200 mb-2">Safety Note</h3>
            <p className="text-sm leading-6 text-slate-300 mb-3">
              This page is educational. Persistent fatigue, low mood, anxiety, numbness, tingling, dizziness, or major sleep problems deserve proper medical evaluation.
            </p>
            <p className="text-sm leading-6 text-slate-400">
              Avoid megadosing supplements. Some nutrients — including iron and vitamin D — can be harmful in excess or interact with conditions and medications.
            </p>
          </div>
        </div>
      </div>

      <blockquote className="border-l-4 border-emerald-400/40 pl-6 py-2">
        <p className="text-base italic text-slate-300 leading-7">
          "Nutrients are not the whole story, but they help give the nervous system the materials it needs to tell a steadier story."
        </p>
      </blockquote>
    </div>
  );
}

export default function VitaminsMineralsAtlas({ onBack }) {
  const [activeTab, setActiveTab] = useState("overview");

  const content = {
    overview: <OverviewTab />,
    nutrients: <NutrientsTab />,
    neurochemistry: <NeurochemTab />,
    patterns: <PatternsTab />,
    food: <FoodTab />,
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#052814,transparent_34%),radial-gradient(circle_at_top_right,#0f1b2e,transparent_30%),linear-gradient(180deg,#020617,#071a0f_45%,#020617)] text-slate-100">
      <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            ← Back
          </button>
          <span className="text-xs text-slate-500">Vitamins & Minerals · Psychophysiology</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:sticky lg:top-[3.5rem] lg:h-[calc(100vh-3.5rem)] lg:w-72 lg:overflow-y-auto">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <div className="text-3xl">◍</div>
              <h1 className="mt-3 text-2xl font-black leading-tight text-white">Vitamins & Minerals</h1>
              <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                How nutrients support the body systems that influence mood, attention, energy, stress resilience, sleep, and neurochemical balance.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                    activeTab === tab.id
                      ? "bg-emerald-400/15 text-emerald-100 border border-emerald-400/25"
                      : "text-slate-300 hover:bg-white/10 hover:text-white border border-transparent"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-6 text-slate-400">
              <strong className="text-slate-200">Note:</strong> This is educational — not medical advice. Nutrient effects are indirect and individual. Lab work and professional guidance matter when symptoms are real and persistent.
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <section className="rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            {content[activeTab]}
          </section>
        </main>
      </div>
    </div>
  );
}
