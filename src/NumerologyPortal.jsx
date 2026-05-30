import { useEffect, useMemo, useRef, useState } from "react";
import { readJSON, writeJSON } from "./lib/storage";

// ── Shared number meanings ──────────────────────────────────────────────
// Single source of truth for the 1–9 plus master numbers, reused by the
// Life Path page, the Personal Year page, and the calculator results.
const NUMBER_MEANINGS = {
  1: { title: "The Initiator", text: "Independence, initiative, leadership, fresh starts. The invitation: stand on your own and begin." },
  2: { title: "The Peacemaker", text: "Partnership, sensitivity, diplomacy, balance. The invitation: cooperate, listen, and be patient." },
  3: { title: "The Expressive", text: "Creativity, communication, joy, self-expression. The invitation: share your voice without scattering it." },
  4: { title: "The Builder", text: "Structure, discipline, stability, honest work. The invitation: lay steady, lasting foundations." },
  5: { title: "The Explorer", text: "Freedom, change, curiosity, adventure. The invitation: embrace change without losing your center." },
  6: { title: "The Nurturer", text: "Care, responsibility, home, service, love. The invitation: nurture others without over-giving." },
  7: { title: "The Seeker", text: "Reflection, analysis, spirituality, inner truth. The invitation: trust inner knowing without isolating." },
  8: { title: "The Achiever", text: "Ambition, authority, material mastery, resilience. The invitation: pair drive with integrity." },
  9: { title: "The Humanitarian", text: "Compassion, completion, wisdom, release. The invitation: give generously and learn to let go." },
  11: { title: "Master 11 · The Visionary", text: "Heightened intuition, inspiration, and spiritual insight. Sensitive and idealistic — a channel for vision (reduces to 2)." },
  22: { title: "Master 22 · The Master Builder", text: "Turning large visions into tangible reality. Practical idealism on a wide scale (reduces to 4)." },
  33: { title: "Master 33 · The Master Teacher", text: "Compassionate service and uplifting others through nurturing wisdom (reduces to 6)." },
};

const MASTER_NUMBERS = new Set([11, 22, 33]);

// Reduce a number to a single digit, preserving master numbers 11/22/33.
function reduceNumber(n) {
  let value = Math.abs(Math.trunc(n));
  while (value > 9 && !MASTER_NUMBERS.has(value)) {
    value = String(value)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return value;
}

// ── Letter → number chart (Pythagorean) ─────────────────────────────────
const LETTER_VALUES = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};
const LETTER_CHART_ROWS = [
  [1, "A J S"],
  [2, "B K T"],
  [3, "C L U"],
  [4, "D M V"],
  [5, "E N W"],
  [6, "F O X"],
  [7, "G P Y"],
  [8, "H Q Z"],
  [9, "I R"],
];
const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function sumLetters(name, filter) {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const total = letters
    .filter((ch) => (filter ? filter(ch) : true))
    .reduce((sum, ch) => sum + (LETTER_VALUES[ch] || 0), 0);
  return total;
}

// ── Content ──────────────────────────────────────────────────────────────
const concepts = [
  {
    id: "life-path",
    label: "Life Path Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "Your core path, lesson, and direction based on your birth date.",
    intro: "What is the central theme my life keeps asking me to learn?",
    explanation:
      "The Life Path is the most-discussed number in numerology. It is drawn from your full date of birth and is treated as a symbol of the central themes, lessons, and tendencies you tend to return to. Read it as a mirror for reflection — a lens on patterns you may already recognize — not as a fixed script for your future.",
    howTo: [
      "Write your full birth date as numbers, e.g. 14 February 1990 → 14 / 2 / 1990.",
      "Add every digit together: 1 + 4 + 2 + 1 + 9 + 9 + 0 = 26.",
      "Reduce to a single digit by adding again: 2 + 6 = 8.",
      "Stop early only if you reach a master number — 11, 22, or 33 — which are left unreduced.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
    prompts: [
      "Where in my life does this number's theme already show up?",
      "Which part of this meaning feels true — and which part feels like a stretch?",
      "What is one small, grounded action this theme invites this week?",
    ],
  },
  {
    id: "expression",
    label: "Expression / Destiny Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "The symbolic pattern of your full birth name.",
    intro: "What are the talents and tendencies my name seems to point toward?",
    explanation:
      "The Expression Number (also called the Destiny Number) is built from every letter of your full birth name. In numerology it is read as a symbol of your natural talents, abilities, and the way you tend to move through the world. Treat it as a prompt for noticing your own gifts — not as a ceiling or a promise.",
    howTo: [
      "Use your full name as written on your birth certificate.",
      "Convert each letter to a number using the chart below.",
      "Add all of the values together.",
      "Reduce the total to a single digit, keeping master numbers 11, 22, or 33.",
    ],
    letterChart: true,
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    prompts: [
      "Which of these talents do I already lean on — and which do I underuse?",
      "Does this number describe how others tend to experience me?",
    ],
  },
  {
    id: "soul-urge",
    label: "Soul Urge Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "Inner desire, emotional motivation, and what the heart seeks.",
    intro: "Underneath the surface, what does my heart actually want?",
    explanation:
      "The Soul Urge Number (sometimes called the Heart's Desire) is calculated from the vowels in your full name. It is used as a symbol of inner motivation — the quieter wants, values, and emotional needs that drive you beneath everyday choices. It is a reflection tool for getting honest with yourself, not a diagnosis.",
    howTo: [
      "Take your full birth name and keep only the vowels (A, E, I, O, U).",
      "Note: Y is treated as a vowel only when it carries a vowel sound — use your judgment.",
      "Convert each vowel to a number and add them together.",
      "Reduce to a single digit, keeping master numbers.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    prompts: [
      "When was the last time I honored this inner desire?",
      "Where might I be ignoring this need to keep others comfortable?",
    ],
  },
  {
    id: "personality",
    label: "Personality Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "How your energy may appear outwardly to others.",
    intro: "What is the first impression I tend to give before people truly know me?",
    explanation:
      "The Personality Number is calculated from the consonants in your full name. It is read as the 'outer layer' — the social mask, the first impression, the part of you others meet before they meet the rest. Use it to reflect on the gap (or alignment) between how you feel inside and how you come across.",
    howTo: [
      "Take your full birth name and keep only the consonants.",
      "Convert each consonant to a number and add them together.",
      "Reduce to a single digit, keeping master numbers.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    prompts: [
      "Does the impression I give match how I actually feel inside?",
      "Is there a first-impression pattern I'd like to soften or strengthen?",
    ],
  },
  {
    id: "birthday",
    label: "Birthday Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "The symbolic meaning of the day you were born.",
    intro: "What gift or tendency does the day of my birth point to?",
    explanation:
      "The Birthday Number is simply the day of the month you were born, reduced to a single digit (master numbers kept). It is the most lightweight of the core numbers — read as a small, specific talent or flavor you carry, a supporting note rather than the whole song.",
    howTo: [
      "Take the day of the month you were born — for example, the 23rd.",
      "Reduce it to a single digit: 2 + 3 = 5.",
      "If the day is 11 or 22, it is kept as a master number.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
    prompts: [
      "What small, specific strength does this number name in me?",
      "How could I lean on this gift in an ordinary week?",
    ],
  },
  {
    id: "angel-numbers",
    label: "Angel Numbers / Repeating Numbers",
    kicker: "Patterns",
    group: "Patterns & Timing",
    type: "angel",
    short: "Repeated number patterns used for reflection and meaning-making.",
    intro: "When the same number keeps showing up, what am I being invited to notice?",
    explanation:
      "Repeating numbers — 111, 222, and so on — are often called 'angel numbers.' People notice them on clocks, receipts, and license plates. Here they are framed honestly: a repeated number is a prompt for reflection and meaning-making, not a guarantee from the universe. The value is in the pause it creates — a moment to ask what is on your mind right now.",
    items: [
      { num: "111", title: "New beginnings", note: "A doorway feeling — fresh starts, alignment, and watching the thoughts you're planting." },
      { num: "222", title: "Balance & patience", note: "Cooperation, trust, and giving a situation time to find its footing." },
      { num: "333", title: "Expression & support", note: "Creativity, communication, and a sense of being encouraged to show up." },
      { num: "444", title: "Stability & grounding", note: "Structure, protection, and a reminder that steady foundations matter." },
      { num: "555", title: "Change & movement", note: "Transition is near — stay flexible and keep your center through the shift." },
      { num: "666", title: "Recalibration", note: "A nudge toward balance between material concerns and inner life — not an omen." },
      { num: "777", title: "Reflection & insight", note: "Inner work, learning, and trust in your own quiet knowing." },
      { num: "888", title: "Flow & reciprocity", note: "Cycles, abundance, and the give-and-take of effort and reward." },
      { num: "999", title: "Completion", note: "A chapter closing — release what's finished to make room for what's next." },
      { num: "000", title: "Openness & potential", note: "A clean slate; spaciousness and connection to something larger." },
    ],
    prompts: [
      "What was I thinking or feeling the moment I noticed this number?",
      "What meaning am I projecting onto it — and is that meaning useful to me?",
    ],
  },
  {
    id: "personal-year",
    label: "Personal Year Number",
    kicker: "Patterns",
    group: "Patterns & Timing",
    type: "meaning",
    short: "A symbolic yearly theme based on your birth date and the current year.",
    intro: "What theme might this particular year be inviting me to work with?",
    explanation:
      "The Personal Year Number tracks a symbolic nine-year cycle. It is read as a seasonal theme — a backdrop for the year — rather than a forecast of events. Many people find it a helpful frame for setting intentions and noticing where their energy naturally wants to go.",
    howTo: [
      "Add your birth month + your birth day + the current year.",
      "Example: born May 14, in 2026 → 5 + 14 + 2026.",
      "Reduce each part first if you like: 5 + 5 + 1 = 11 → 2.",
      "Reduce the total to a single digit to find this year's theme (1–9).",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    yearThemes: {
      1: "Beginnings — plant seeds, start fresh, take initiative.",
      2: "Patience — partnerships, slowing down, letting things develop.",
      3: "Expression — creativity, social connection, lightness.",
      4: "Foundations — work, structure, building the practical base.",
      5: "Change — movement, freedom, saying yes to the new.",
      6: "Responsibility — home, relationships, care and service.",
      7: "Reflection — study, solitude, inner work and rest.",
      8: "Momentum — ambition, results, material and personal power.",
      9: "Completion — release, closure, clearing space for the next cycle.",
    },
    prompts: [
      "Does this year's theme match where my energy already wants to go?",
      "What is one intention that fits this theme without forcing it?",
    ],
  },
  {
    id: "calculator",
    label: "Numerology Calculator",
    kicker: "Tool",
    group: "Tools",
    type: "calculator",
    short: "Calculate core numerology numbers from birth date and name.",
  },
  {
    id: "journal",
    label: "Numerology Journal",
    kicker: "Tool",
    group: "Tools",
    type: "journal",
    short: "Track repeated numbers, context, feelings, and grounded actions.",
  },
];

const conceptsById = Object.fromEntries(concepts.map((c) => [c.id, c]));
const CONCEPT_GROUPS = ["Core Numbers", "Patterns & Timing", "Tools"];

// ── Small shared pieces ───────────────────────────────────────────────────
function SectionCard({ concept, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(concept.id)}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:-translate-y-1 hover:border-indigo-300/30 hover:bg-white/[0.09]"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-indigo-200/50">{concept.kicker}</p>
      <h3 className="text-xl font-black text-white">{concept.label}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-white/65">{concept.short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo-200/80 transition group-hover:text-white">
        Open <span aria-hidden>→</span>
      </span>
    </button>
  );
}

function InfoBox({ label, tone = "white", children }) {
  const tones = {
    white: "border-white/10 bg-white/[0.05] text-white/72",
    indigo: "border-indigo-300/15 bg-indigo-500/10 text-white/80",
    gold: "border-amber-300/15 bg-amber-500/10 text-white/80",
    violet: "border-violet-300/15 bg-violet-500/10 text-white/76",
  };
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.white}`}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-60">{label}</p>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  );
}

function NumberBadge({ n }) {
  const master = MASTER_NUMBERS.has(Number(n));
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${
        master
          ? "bg-gradient-to-br from-amber-300/30 to-indigo-500/20 text-amber-100"
          : "bg-gradient-to-br from-indigo-400/30 to-violet-500/20 text-indigo-50"
      }`}
    >
      {n}
    </span>
  );
}

function PromptList({ prompts }) {
  if (!prompts?.length) return null;
  return (
    <div className="rounded-3xl border border-indigo-300/15 bg-indigo-500/[0.07] p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-indigo-200/70">Journal prompts</p>
      <ul className="mt-4 space-y-3">
        {prompts.map((p) => (
          <li key={p} className="flex gap-3 text-sm leading-6 text-white/78">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300/80" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LetterChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-indigo-200/70">Letter → number chart</p>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {LETTER_CHART_ROWS.map(([num, letters]) => (
          <div key={num} className="rounded-2xl border border-white/10 bg-black/25 p-3 text-center">
            <p className="text-lg font-black text-indigo-100">{num}</p>
            <p className="mt-1 text-xs font-semibold tracking-widest text-white/60">{letters}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeaningConcept({ concept }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[0.05] to-violet-500/10 p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-indigo-200/70">Reflection question</p>
        <p className="mt-4 text-2xl font-black leading-snug text-white md:text-3xl">{concept.intro}</p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{concept.explanation}</p>
      </div>

      {concept.howTo && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-indigo-200/70">How to calculate</p>
          <ol className="mt-4 space-y-3">
            {concept.howTo.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-white/78">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/25 text-xs font-black text-indigo-100">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {concept.letterChart && <LetterChart />}

      {concept.meanings && (
        <div className="grid gap-3 md:grid-cols-2">
          {concept.meanings.map((n) => {
            const meaning = NUMBER_MEANINGS[n];
            const yearTheme = concept.yearThemes?.[n];
            return (
              <div key={n} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <NumberBadge n={n} />
                <div>
                  <p className="text-base font-black text-white">{meaning.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">{yearTheme || meaning.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <PromptList prompts={concept.prompts} />
    </div>
  );
}

function AngelConcept({ concept }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[0.05] to-violet-500/10 p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-indigo-200/70">Reflection question</p>
        <p className="mt-4 text-2xl font-black leading-snug text-white md:text-3xl">{concept.intro}</p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{concept.explanation}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {concept.items.map((item) => (
          <div key={item.num} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <span className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/30 to-violet-500/20 px-3 text-lg font-black tracking-wide text-indigo-50">
              {item.num}
            </span>
            <div>
              <p className="text-base font-black text-white">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-white/70">{item.note}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox label="Stay grounded" tone="gold">
        A repeated number is a useful pause, not a promise. The meaning you take from it is yours to choose — let it open a question, not close one.
      </InfoBox>

      <PromptList prompts={concept.prompts} />
    </div>
  );
}

// ── Calculator ─────────────────────────────────────────────────────────────
function ResultCard({ label, number, hint }) {
  if (number == null) return null;
  const meaning = NUMBER_MEANINGS[number];
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
      <div className="flex items-center gap-4">
        <NumberBadge n={number} />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200/60">{label}</p>
          <p className="text-lg font-black text-white">{meaning ? meaning.title : `Number ${number}`}</p>
        </div>
      </div>
      {meaning && <p className="mt-3 text-sm leading-6 text-white/70">{meaning.text}</p>}
      {hint && <p className="mt-2 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

function Calculator() {
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");

  const lifePath = useMemo(() => {
    if (!birthDate) return null;
    const digits = birthDate.replace(/[^0-9]/g, "");
    if (!digits) return null;
    const total = digits.split("").reduce((sum, d) => sum + Number(d), 0);
    return reduceNumber(total);
  }, [birthDate]);

  const birthday = useMemo(() => {
    if (!birthDate) return null;
    // birthDate from <input type="date"> is YYYY-MM-DD
    const day = Number(birthDate.slice(8, 10));
    if (!day) return null;
    return reduceNumber(day);
  }, [birthDate]);

  const hasName = name.replace(/[^A-Za-z]/g, "").length > 0;
  const expression = useMemo(() => (hasName ? reduceNumber(sumLetters(name)) : null), [name, hasName]);
  const soulUrge = useMemo(
    () => (hasName ? reduceNumber(sumLetters(name, (ch) => VOWELS.has(ch))) : null),
    [name, hasName]
  );
  const personality = useMemo(
    () => (hasName ? reduceNumber(sumLetters(name, (ch) => !VOWELS.has(ch))) : null),
    [name, hasName]
  );

  const reset = () => {
    setBirthDate("");
    setName("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[0.05] to-violet-500/10 p-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-indigo-200/70">How it works</p>
        <p className="mt-3 text-white/72">
          Enter your birth date for your Life Path and Birthday numbers. Add your full birth name to also see your
          Expression, Soul Urge, and Personality numbers. Everything is calculated in your browser — nothing is sent
          anywhere or stored unless you save it to the journal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
          <label htmlFor="num-birthdate" className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            Birth date
          </label>
          <input
            id="num-birthdate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-indigo-300/40 [color-scheme:dark]"
          />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
          <label htmlFor="num-name" className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            Full birth name <span className="normal-case tracking-normal text-white/30">(optional)</span>
          </label>
          <input
            id="num-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Alexandra Doe"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-indigo-300/40"
          />
        </div>
      </div>

      {(lifePath != null || expression != null) && (
        <div className="grid gap-3 md:grid-cols-2">
          <ResultCard label="Life Path" number={lifePath} hint="From every digit of your birth date." />
          <ResultCard label="Birthday" number={birthday} hint="From the day of the month you were born." />
          <ResultCard label="Expression / Destiny" number={expression} hint="From all letters of your name." />
          <ResultCard label="Soul Urge" number={soulUrge} hint="From the vowels in your name." />
          <ResultCard label="Personality" number={personality} hint="From the consonants in your name." />
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <InfoBox label="Note" tone="gold">
          These results are a starting point for reflection — a symbolic mirror, not a measurement of who you are.
        </InfoBox>
        <button
          type="button"
          onClick={reset}
          className="shrink-0 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/[0.1] hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ── Journal ────────────────────────────────────────────────────────────────
const JOURNAL_KEY = "numerology-journal";

function Journal() {
  const [entries, setEntries] = useState(() => {
    const stored = readJSON(JOURNAL_KEY, []);
    return Array.isArray(stored) ? stored : [];
  });
  const [draft, setDraft] = useState({ number: "", context: "", meaning: "", action: "" });

  useEffect(() => {
    writeJSON(JOURNAL_KEY, entries);
  }, [entries]);

  const canSave = draft.number.trim() || draft.context.trim();

  const addEntry = () => {
    if (!canSave) return;
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      ...draft,
    };
    setEntries((prev) => [entry, ...prev]);
    setDraft({ number: "", context: "", meaning: "", action: "" });
  };

  const removeEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const fields = [
    { key: "number", label: "Numbers I noticed today", placeholder: "e.g. 11:11, 333, a repeated 7", rows: 1 },
    { key: "context", label: "What was happening when I saw it?", placeholder: "Where I was, what I was thinking about...", rows: 2 },
    { key: "meaning", label: "What meaning did I project onto it?", placeholder: "The story or feeling I attached to it...", rows: 2 },
    { key: "action", label: "What grounded action can I take?", placeholder: "One small, real-world next step...", rows: 2 },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/[0.05] to-violet-500/10 p-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-indigo-200/70">Quiet practice</p>
        <p className="mt-3 text-white/72">
          When a number stands out, note it here. The point isn't to prove the number means something — it's to notice
          your own mind: what you were feeling, what story you attached, and what grounded step you can take. Entries are
          saved privately in this browser.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
        <div className="grid gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">{f.label}</label>
              <textarea
                value={draft[f.key]}
                onChange={(e) => setDraft((prev) => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                rows={f.rows}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-indigo-300/40"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addEntry}
            disabled={!canSave}
            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save entry
          </button>
        </div>
      </div>

      {entries.length > 0 ? (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-lg font-black text-indigo-100">{entry.number || "—"}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40">{entry.date}</span>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="text-xs font-bold text-white/40 transition hover:text-rose-300"
                    aria-label="Delete entry"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {entry.context && <p className="mt-2 text-sm leading-6 text-white/72"><span className="text-white/40">Context: </span>{entry.context}</p>}
              {entry.meaning && <p className="mt-1 text-sm leading-6 text-white/72"><span className="text-white/40">Meaning I projected: </span>{entry.meaning}</p>}
              {entry.action && <p className="mt-1 text-sm leading-6 text-white/72"><span className="text-white/40">Grounded action: </span>{entry.action}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-white/12 bg-white/[0.03] p-6 text-center text-sm text-white/45">
          No entries yet. Your saved reflections will appear here.
        </p>
      )}
    </div>
  );
}

function renderConcept(concept) {
  if (concept.type === "calculator") return <Calculator />;
  if (concept.type === "journal") return <Journal />;
  if (concept.type === "angel") return <AngelConcept concept={concept} />;
  return <MeaningConcept concept={concept} />;
}

function NavDropdown({ onSelect, currentId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
      >
        <span>Browse numbers</span>
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0a1a]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur"
        >
          {CONCEPT_GROUPS.map((group) => {
            const groupConcepts = concepts.filter((c) => c.group === group);
            if (!groupConcepts.length) return null;
            return (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">{group}</p>
                {groupConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    role="menuitem"
                    onClick={() => { onSelect(concept.id); setOpen(false); }}
                    className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-white/[0.08] hover:text-white ${
                      currentId === concept.id ? "bg-white/[0.1] text-white" : "text-white/75"
                    }`}
                  >
                    {concept.label}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Lightweight SEO: set document title + meta description for the section.
function useSeo(current) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = current ? `${current.label} | Numerology | Spirituality Hub` : "Numerology | Spirituality Hub";

    const desc =
      "Explore numerology meanings, life path numbers, angel numbers, personal years, and journaling prompts for spiritual reflection.";
    let tag = document.querySelector('meta[name="description"]');
    const hadTag = !!tag;
    const prevDesc = tag?.getAttribute("content") || "";
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", desc);

    return () => {
      document.title = prevTitle;
      if (hadTag) tag.setAttribute("content", prevDesc);
      else tag.remove();
    };
  }, [current]);
}

export default function NumerologyPortal({ onBack, onNavigate, initialSection }) {
  const current = initialSection ? conceptsById[initialSection] : null;
  const currentIndex = current ? concepts.findIndex((c) => c.id === current.id) : -1;
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex >= 0 && currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  useSeo(current);

  const goToConcept = (id) => {
    if (onNavigate) onNavigate("numerology", { section: id });
  };
  const goToOverview = () => {
    if (onNavigate) onNavigate("numerology");
  };

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-4 top-4 z-50 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
        >
          ← Back
        </button>
      )}

      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
          <nav className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <button type="button" onClick={goToOverview} className="flex items-center gap-3 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-amber-300 text-2xl text-white">✷</div>
              <div>
                <p className="text-sm font-black tracking-wide text-white">Numerology</p>
                <p className="text-xs text-white/45">Numbers • Symbolism • Self-Reflection</p>
              </div>
            </button>
            <NavDropdown onSelect={goToConcept} currentId={current?.id} />
          </nav>

          {current ? (
            <div>
              <button
                type="button"
                onClick={goToOverview}
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
              >
                <span aria-hidden>←</span> All numbers
              </button>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.45em] text-indigo-200/70">{current.group} · {current.kicker}</p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] text-white md:text-6xl">{current.label}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/65 md:text-lg md:leading-8">{current.short}</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.45em] text-indigo-200/70">Numbers · Symbolism · Reflection</p>
                <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
                  Numerology
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                  Numerology explores symbolic meanings connected to numbers, names, birthdays, timing, and repeated
                  number patterns. This section is for reflection, journaling, self-understanding, and spiritual
                  symbolism—not fixed destiny.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => goToConcept("calculator")} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]">Open the calculator</button>
                  <button onClick={() => goToConcept("life-path")} className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]">Start with Life Path</button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-indigo-500/20 to-amber-400/10 p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">A grounded stance</p>
                  <div className="space-y-3">
                    {[
                      ["A mirror, not a map", "Numbers are prompts for reflection, not guaranteed predictions."],
                      ["Symbolic, not fixed", "Meanings invite a question; they don't decide your destiny."],
                      ["Self-understanding", "The value is in what you notice about yourself."],
                      ["Grounded action", "Let any insight lead to one small, real-world step."],
                    ].map(([word, d]) => (
                      <div key={word} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="font-black text-white">{word}</p>
                        <p className="mt-1 text-sm text-white/55">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {current ? (
          <>
            <div className="mb-8">{renderConcept(current)}</div>

            <nav className="grid gap-3 md:grid-cols-2">
              {prevConcept ? (
                <button
                  type="button"
                  onClick={() => goToConcept(prevConcept.id)}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:border-indigo-300/25 hover:bg-white/[0.09]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">← Previous</p>
                  <p className="mt-2 text-lg font-black text-white">{prevConcept.label}</p>
                </button>
              ) : <div />}
              {nextConcept ? (
                <button
                  type="button"
                  onClick={() => goToConcept(nextConcept.id)}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-right transition hover:border-indigo-300/25 hover:bg-white/[0.09]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">Next →</p>
                  <p className="mt-2 text-lg font-black text-white">{nextConcept.label}</p>
                </button>
              ) : <div />}
            </nav>
          </>
        ) : (
          <>
            {CONCEPT_GROUPS.map((group) => {
              const groupConcepts = concepts.filter((c) => c.group === group);
              if (!groupConcepts.length) return null;
              return (
                <section key={group} className="mb-10">
                  <div className="mb-5 flex items-baseline justify-between">
                    <h2 className="text-2xl font-black text-white">{group}</h2>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/35">{groupConcepts.length} {groupConcepts.length === 1 ? "page" : "pages"}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {groupConcepts.map((concept) => (
                      <SectionCard key={concept.id} concept={concept} onSelect={goToConcept} />
                    ))}
                  </div>
                </section>
              );
            })}

            <section className="rounded-[2rem] border border-amber-300/15 bg-amber-500/[0.06] p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-200/60">Disclaimer</p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-white/70">
                Numerology is used here as a symbolic and reflective tool. It should not replace personal judgment,
                professional advice, or real-world decision-making.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
