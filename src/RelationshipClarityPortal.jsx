import { useEffect, useMemo, useRef, useState } from "react";
import { clarityChapterFor, clarityChapters } from "./data/relationshipIndex";
import { clarityConceptsById as conceptsById } from "./data/clarityConcepts";

function conceptType(concept) {
  if (concept.interactive) return "Interactive check";
  if (concept.inventory) return "Inventory";
  if (concept.redflag) return "Red flag";
  return "Reflection";
}

function BulletList({ label, items, tone }) {
  const tones = {
    rose: { box: "border-rose-300/15 bg-rose-500/[0.07]", label: "text-rose-200/85", dot: "bg-rose-300/80" },
    emerald: { box: "border-emerald-300/15 bg-emerald-500/[0.07]", label: "text-emerald-200/85", dot: "bg-emerald-300/80" },
  };
  const t = tones[tone];
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${t.box}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${t.label}`}>{label}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/78">
            <span aria-hidden className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoBox({ label, tone = "white", children }) {
  const tones = {
    white: "border-white/10 bg-white/[0.05] text-white/75",
    rose: "border-rose-300/15 bg-rose-500/10 text-white/80",
    emerald: "border-emerald-300/15 bg-emerald-500/10 text-white/80",
    violet: "border-violet-300/15 bg-violet-500/10 text-white/80",
    amber: "border-amber-300/20 bg-amber-500/10 text-white/80",
  };
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${tones[tone] || tones.white}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  );
}

function CoreQuestion({ concept }) {
  return (
    <>
      <blockquote className="border-l-2 border-rose-300/50 pl-4 text-lg font-semibold leading-snug text-white sm:text-xl">
        {concept.question}
      </blockquote>
      <p className="max-w-3xl text-[15px] leading-7 text-white/68 sm:text-base sm:leading-8">{concept.explanation}</p>
    </>
  );
}

function ReflectionBody({ concept }) {
  return (
    <div className="space-y-5">
      <CoreQuestion concept={concept} />
      <div className="grid gap-3 md:grid-cols-2">
        <BulletList label="From fear" items={concept.fear} tone="rose" />
        <BulletList label="From security" items={concept.secure} tone="emerald" />
      </div>
      <InfoBox label="Practice" tone="violet">{concept.practice}</InfoBox>
      {concept.note && <InfoBox label="Safety note" tone="amber">{concept.note}</InfoBox>}
    </div>
  );
}

function RedFlagBody({ concept }) {
  return (
    <div className="space-y-5">
      <CoreQuestion concept={concept} />
      <div className="grid gap-3 md:grid-cols-2">
        <BulletList label="⚑ Red flags" items={concept.flags} tone="rose" />
        <BulletList label="✓ Green flags" items={concept.green} tone="emerald" />
      </div>
      <InfoBox label="Practice" tone="rose">{concept.practice}</InfoBox>
    </div>
  );
}

function InventoryBody({ concept }) {
  return (
    <div className="space-y-5">
      {concept.intro && <p className="max-w-3xl text-[15px] leading-7 text-white/68 sm:text-base sm:leading-8">{concept.intro}</p>}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {concept.items.map((item) => (
          <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[15px] font-semibold text-white">{item.name}</p>
            {item.note && <p className="mt-1.5 text-sm leading-6 text-white/62">{item.note}</p>}
          </div>
        ))}
      </div>
      {concept.note && <InfoBox label="Grounding note" tone="amber">{concept.note}</InfoBox>}
    </div>
  );
}

const CLARITY_PROMPTS = [
  {
    id: "consistency",
    prompt: "Was this interaction consistent with how they've shown up the last two weeks?",
    yes: "Trust the pattern — this is who they are right now.",
    no: "Peaks and valleys are a pattern too. Read them as a pattern, not as exceptions.",
  },
  {
    id: "match",
    prompt: "Does the love in this interaction match the love I say I'm living in?",
    yes: "Keep moving as the person living in that love. The match is the proof.",
    no: "Your standards stay. The gap between the love you live in and the love they offer is the message.",
  },
  {
    id: "state",
    prompt: "Am I responding from a secure state or an activated one?",
    yes: "Trust the response. Calm choices age well.",
    no: "Pause. Move your body. Sleep on it. Re-decide from a settled body, not a flooded one.",
  },
  {
    id: "chasing",
    prompt: "Am I letting them reach for me too — or am I carrying the whole connection?",
    yes: "Mutual reach is the foundation. Keep noticing it.",
    no: "Match their effort for one week, not as a test — as an experiment in what's real.",
  },
  {
    id: "honest",
    prompt: "Was I honest, calm, and direct — or hinting, testing, managing?",
    yes: "Directness is intimacy. It builds the version of love you actually want.",
    no: "Write the direct sentence. If you can't, you don't have clarity yet. Pause until you do.",
  },
];

function ClarityCheck() {
  const [scenario, setScenario] = useState("");
  const [answers, setAnswers] = useState({});

  const reset = () => {
    setScenario("");
    setAnswers({});
  };

  const score = useMemo(() => {
    const yesCount = Object.values(answers).filter((v) => v === "yes").length;
    const noCount = Object.values(answers).filter((v) => v === "no").length;
    return { yesCount, noCount, total: CLARITY_PROMPTS.length };
  }, [answers]);

  const verdict = useMemo(() => {
    if (!score.yesCount && !score.noCount) return null;
    if (score.yesCount >= 4) return { tone: "emerald", text: "This interaction reads as mostly aligned. Keep moving as the person who lives in this love." };
    if (score.noCount >= 3) return { tone: "rose", text: "This interaction is mostly pulling you out of state. Slow down before responding. Your standards stay." };
    return { tone: "violet", text: "Mixed signal. Trust the consistent pattern, not the moment. Pause before acting on any urge." };
  }, [score]);

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-[15px] leading-7 text-white/68">
        Describe one recent interaction in a sentence or two, then answer the five calibration questions. The pattern of answers — not any single one — tells you what to do next.
      </p>

      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
        <label htmlFor="clarity-check-scenario" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">The interaction</label>
        <textarea
          id="clarity-check-scenario"
          value={scenario}
          onChange={(event) => setScenario(event.target.value)}
          placeholder="e.g., She replied warmly to my message after two days of silence, but then went quiet again..."
          rows={3}
          className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base leading-6 text-white outline-none placeholder:text-white/40 focus:border-white/30 sm:text-sm"
        />
      </div>

      <ol className="space-y-2.5">
        {CLARITY_PROMPTS.map((item, index) => {
          const answer = answers[item.id];
          return (
            <li key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <p className="flex gap-3 text-[15px] font-semibold leading-6 text-white">
                <span className="text-white/55">{index + 1}.</span>
                <span>{item.prompt}</span>
              </p>
              <div className="mt-3 flex gap-2 pl-7">
                {["yes", "no"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={answer === value}
                    onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: value }))}
                    className={`min-w-16 rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition ${
                      answer === value
                        ? value === "yes"
                          ? "border-emerald-300/40 bg-emerald-500/20 text-white"
                          : "border-rose-300/40 bg-rose-500/20 text-white"
                        : "border-white/10 bg-black/20 text-white/65 hover:bg-white/[0.08]"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              {answer && (
                <p className="ml-7 mt-3 rounded-xl border border-white/10 bg-black/25 p-3 text-sm leading-6 text-white/75">
                  {answer === "yes" ? item.yes : item.no}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {verdict && (
        <InfoBox label="Reading" tone={verdict.tone}>
          {verdict.text}
        </InfoBox>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.1] hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const PAUSE_SIGNALS = [
  { id: "urgent", label: "It feels urgent — like I have to send it right now.", tone: "fear" },
  { id: "rehearsed", label: "I've rewritten this message more than three times.", tone: "fear" },
  { id: "decoding", label: "I'm sending this to figure out what they're really thinking.", tone: "fear" },
  { id: "relief", label: "I'm hoping their reply will calm me down.", tone: "fear" },
  { id: "test", label: "Part of me is testing how they respond.", tone: "fear" },
  { id: "direct", label: "I could say this same thing out loud in a calm voice.", tone: "secure" },
  { id: "okay-no-reply", label: "I'd be okay if they didn't reply at all.", tone: "secure" },
  { id: "honest", label: "This is honest — not packaged or strategic.", tone: "secure" },
  { id: "rested", label: "I've eaten, slept, and moved my body recently.", tone: "secure" },
];

function SignalGroup({ label, tone, checks, onToggle }) {
  const styles = tone === "fear"
    ? { box: "border-rose-300/15 bg-rose-500/[0.07]", label: "text-rose-200/85", accent: "accent-rose-400" }
    : { box: "border-emerald-300/15 bg-emerald-500/[0.07]", label: "text-emerald-200/85", accent: "accent-emerald-400" };
  return (
    <fieldset className={`rounded-2xl border p-4 sm:p-5 ${styles.box}`}>
      <legend className={`float-left mb-3 w-full text-xs font-semibold uppercase tracking-[0.18em] ${styles.label}`}>{label}</legend>
      <div className="clear-left space-y-2">
        {PAUSE_SIGNALS.filter((s) => s.tone === tone).map((signal) => (
          <label key={signal.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/80 transition hover:bg-white/[0.05]">
            <input
              type="checkbox"
              checked={!!checks[signal.id]}
              onChange={() => onToggle(signal.id)}
              className={`mt-1 h-4 w-4 shrink-0 ${styles.accent}`}
            />
            <span>{signal.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PauseCheck() {
  const [message, setMessage] = useState("");
  const [checks, setChecks] = useState({});

  const toggle = (id) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  const fearCount = PAUSE_SIGNALS.filter((s) => s.tone === "fear" && checks[s.id]).length;
  const secureCount = PAUSE_SIGNALS.filter((s) => s.tone === "secure" && checks[s.id]).length;

  const verdict = useMemo(() => {
    if (fearCount === 0 && secureCount === 0) return null;
    if (fearCount >= 3) return { tone: "rose", text: "This message is more about your state than your message. Pause 20 minutes. Move your body. Re-read it then." };
    if (secureCount >= 3 && fearCount <= 1) return { tone: "emerald", text: "This reads as calm and direct. If it still feels true after a short pause, send it." };
    return { tone: "violet", text: "Mixed. Try rewriting it as one sentence: 'I felt ___, and I'd like ___.' If that version is true, send that one." };
  }, [fearCount, secureCount]);

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-[15px] leading-7 text-white/68">
        Paste the message you're about to send and tick the statements that apply. The mix of fear and security signals tells you whether to send, rewrite, or wait.
      </p>

      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
        <label htmlFor="pause-check-message" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">The message you almost sent</label>
        <textarea
          id="pause-check-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Paste the draft here..."
          rows={4}
          className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base leading-6 text-white outline-none placeholder:text-white/40 focus:border-white/30 sm:text-sm"
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <SignalGroup label="Fear signals" tone="fear" checks={checks} onToggle={toggle} />
        <SignalGroup label="Security signals" tone="secure" checks={checks} onToggle={toggle} />
      </div>

      {verdict && (
        <InfoBox label="Reading" tone={verdict.tone}>
          {verdict.text}
        </InfoBox>
      )}
    </div>
  );
}

function ConceptBody({ concept }) {
  if (concept.interactive === "clarity-check") return <ClarityCheck />;
  if (concept.interactive === "pause-check") return <PauseCheck />;
  if (concept.inventory) return <InventoryBody concept={concept} />;
  if (concept.redflag) return <RedFlagBody concept={concept} />;
  return <ReflectionBody concept={concept} />;
}

const pad = (n) => String(n).padStart(2, "0");

function ChapterIndex({ onOpenSection }) {
  const topicCount = clarityChapters.reduce((sum, chapter) => sum + chapter.concepts.length, 0);
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/75">Relationship Clarity</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          What is actually happening in this connection?
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-white/65 sm:text-lg sm:leading-8">
          {clarityChapters.length} short chapters for the moments a connection feels confusing — mixed signals, attraction, red flags, standards,
          and what to say next. Each chapter lists its topics, and every topic has a page of its own.
        </p>
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {[
          ["From security", "Your state is sourced from you, not their next move."],
          ["From standards", "The love you say you're living in is the floor."],
          ["From honesty", "Direct, calm, and once — not hinting or testing."],
          ["From rest", "Decide from a settled body, not a flooded one."],
        ].map(([word, desc]) => (
          <div key={word} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4">
            <dt className="text-sm font-semibold text-white">{word}</dt>
            <dd className="mt-1 text-xs leading-5 text-white/55 sm:text-sm sm:leading-6">{desc}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="clarity-start" className="mt-6 flex flex-col gap-4 rounded-2xl border border-rose-300/20 bg-gradient-to-br from-rose-500/15 to-violet-500/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 id="clarity-start" className="text-base font-semibold text-white sm:text-lg">Short on time? Start here.</h2>
          <p className="mt-1 text-sm leading-6 text-white/65">
            Read <strong className="font-semibold text-white">Security vs Fear</strong> — the question behind every other topic — then run a recent interaction through the Clarity Check.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => onOpenSection("security-vs-fear")} className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-white/90">
            Security vs Fear
          </button>
          <button type="button" onClick={() => onOpenSection("clarity-check")} className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.12]">
            Clarity Check
          </button>
        </div>
      </section>

      <section aria-labelledby="clarity-chapters" className="mt-12">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="clarity-chapters" className="text-xl font-semibold text-white sm:text-2xl">Chapters</h2>
          <p className="text-xs font-medium text-white/55">{clarityChapters.length} chapters · {topicCount} topics</p>
        </div>
        <ol className="grid gap-3 md:grid-cols-2">
          {clarityChapters.map((chapter, index) => (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => onOpenSection(chapter.id)}
                className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-rose-300/30 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60"
              >
                <span className="flex items-center justify-between gap-3 text-xs font-semibold text-white/55">
                  <span>Chapter {pad(index + 1)}</span>
                  <span>{chapter.concepts.length} topics</span>
                </span>
                <span className="mt-3 text-lg font-semibold text-white">{chapter.title}</span>
                <span className="mt-1 text-sm font-medium text-rose-100/80">{chapter.question}</span>
                <span className="mt-3 flex-1 text-sm leading-6 text-white/58">{chapter.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition group-hover:text-white">
                  Read chapter <span aria-hidden>→</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

// Every topic in reading order, across chapters, so a topic page can hand the
// reader on to the next one even when that means starting the next chapter.
const readingOrder = clarityChapters.flatMap((chapter, chapterIndex) =>
  chapter.concepts
    .filter((id) => conceptsById[id])
    .map((id, topicIndex) => ({ id, chapter, chapterIndex, topicIndex })),
);
const readingIndexById = new Map(readingOrder.map((entry, i) => [entry.id, i]));

const cardClass =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60";

// A chapter is a table of contents: one card per topic, each opening that
// topic on its own page.
function ChapterPage({ chapter, onOpenSection }) {
  const chapterIndex = clarityChapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = clarityChapters[chapterIndex - 1] ?? null;
  const nextChapter = clarityChapters[chapterIndex + 1] ?? null;
  const chapterConcepts = chapter.concepts.map((id) => conceptsById[id]).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="max-w-3xl">
        <button
          type="button"
          onClick={() => onOpenSection("clarity")}
          className="-my-2 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/75 transition hover:text-white"
        >
          Clarity · Chapter {pad(chapterIndex + 1)} of {pad(clarityChapters.length)}
        </button>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{chapter.title}</h1>
        <p className="mt-3 text-lg font-medium text-rose-100/85 sm:text-xl">{chapter.question}</p>
        <p className="mt-3 text-[15px] leading-7 text-white/60 sm:text-base">{chapter.summary}</p>
      </header>

      <section aria-labelledby="chapter-topics" className="mt-10">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="chapter-topics" className="text-xl font-semibold text-white sm:text-2xl">Topics</h2>
          <p className="text-xs font-medium text-white/55">{chapterConcepts.length} topics</p>
        </div>
        <ol className="grid gap-3 md:grid-cols-2">
          {chapterConcepts.map((concept, i) => (
            <li key={concept.id}>
              <button
                type="button"
                onClick={() => onOpenSection(concept.id)}
                className={`group flex h-full w-full flex-col p-5 text-left ${cardClass}`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  {chapterIndex + 1}.{i + 1} · {conceptType(concept)}
                </span>
                <span className="mt-2 text-lg font-semibold text-white">{concept.label}</span>
                <span className="mt-1.5 flex-1 text-sm leading-6 text-white/60">{concept.short}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition group-hover:text-white">
                  Read topic <span aria-hidden>→</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <nav aria-label="Chapters" className="mt-16 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onOpenSection(prevChapter ? prevChapter.id : "clarity")}
          className={`text-left ${cardClass}`}
        >
          <span className="block text-xs font-semibold text-white/55">{prevChapter ? "← Previous chapter" : "← Back to"}</span>
          <span className="mt-1 block text-base font-semibold text-white">{prevChapter ? prevChapter.title : "All chapters"}</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenSection(nextChapter ? nextChapter.id : "clarity")}
          className={`text-right ${cardClass}`}
        >
          <span className="block text-xs font-semibold text-white/55">{nextChapter ? "Next chapter →" : "Finished →"}</span>
          <span className="mt-1 block text-base font-semibold text-white">{nextChapter ? nextChapter.title : "All chapters"}</span>
        </button>
      </nav>
    </div>
  );
}

// One topic, alone on its page. The sidebar lists the rest of its chapter so
// the reader can move sideways, and previous/next follow the reading order
// across chapter boundaries.
function TopicPage({ concept, onOpenSection }) {
  const { chapter, chapterIndex, topicIndex } = readingOrder[readingIndexById.get(concept.id)];
  const position = readingIndexById.get(concept.id);
  const prev = readingOrder[position - 1] ?? null;
  const next = readingOrder[position + 1] ?? null;
  const chapterConcepts = chapter.concepts.map((id) => conceptsById[id]).filter(Boolean);

  // On narrow screens the chapter's topics are a horizontal chip row; slide it
  // so the current topic's chip is in view. Only the row scrolls, never the page.
  const topicList = useRef(null);
  useEffect(() => {
    const list = topicList.current;
    const chip = list?.querySelector('[aria-current="page"]');
    if (!list || !chip || list.scrollWidth <= list.clientWidth) return;
    list.scrollLeft = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
  }, [concept.id]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <nav aria-label={`Topics in ${chapter.title}`} className="lg:sticky lg:top-24 lg:self-start">
          <button
            type="button"
            onClick={() => onOpenSection(chapter.id)}
            className="-my-1 mb-1 py-1 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:text-white"
          >
            Chapter {pad(chapterIndex + 1)} · {chapter.title}
          </button>
          <ol ref={topicList} className="relative -mx-4 mt-1 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
            {chapterConcepts.map((item, i) => {
              const current = item.id === concept.id;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    aria-current={current ? "page" : undefined}
                    onClick={() => onOpenSection(item.id)}
                    className={`min-h-9 whitespace-nowrap rounded-full border px-3 py-2 text-[13px] font-medium transition lg:flex lg:w-full lg:gap-2 lg:whitespace-normal lg:rounded-lg lg:border-0 lg:px-2 lg:py-1.5 lg:text-left lg:text-sm ${
                      current
                        ? "border-rose-300/40 bg-rose-500/20 text-white lg:bg-white/[0.08]"
                        : "border-white/12 bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white lg:bg-transparent"
                    }`}
                  >
                    <span className="hidden text-white/55 lg:inline">{i + 1}.</span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <article aria-labelledby="topic-title" className="mt-6 min-w-0 lg:mt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200/75">
            {chapterIndex + 1}.{topicIndex + 1} · {conceptType(concept)}
          </p>
          <h1 id="topic-title" className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{concept.label}</h1>
          <p className="mt-3 text-[15px] leading-7 text-white/60 sm:text-lg sm:leading-8">{concept.short}</p>
          <div className="mt-8">
            <ConceptBody concept={concept} />
          </div>

          <nav aria-label="Topics" className="mt-16 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onOpenSection(prev ? prev.id : "clarity")}
              className={`text-left ${cardClass}`}
            >
              <span className="block text-xs font-semibold text-white/55">
                {prev ? (prev.chapter === chapter ? "← Previous topic" : `← ${prev.chapter.title}`) : "← Back to"}
              </span>
              <span className="mt-1 block text-base font-semibold text-white">{prev ? conceptsById[prev.id].label : "All chapters"}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenSection(next ? next.id : "clarity")}
              className={`text-right ${cardClass}`}
            >
              <span className="block text-xs font-semibold text-white/55">
                {next ? (next.chapter === chapter ? "Next topic →" : `Next chapter · ${next.chapter.title} →`) : "Finished →"}
              </span>
              <span className="mt-1 block text-base font-semibold text-white">{next ? conceptsById[next.id].label : "All chapters"}</span>
            </button>
          </nav>
        </article>
      </div>
    </div>
  );
}

// Renders inside the Relationship Hub, which owns the page chrome (background,
// top bar, back button). `initialSection` is a concept id (that topic on its
// own page), a chapter id (the chapter's topic list), or empty for the chapter
// index.
export default function RelationshipClarityPortal({ initialSection, onOpenSection }) {
  const open = (section) => onOpenSection?.(section);

  const concept = conceptsById[initialSection];
  if (concept && readingIndexById.has(concept.id)) return <TopicPage concept={concept} onOpenSection={open} />;

  const chapter = clarityChapterFor(initialSection);
  if (!chapter) return <ChapterIndex onOpenSection={open} />;
  return <ChapterPage chapter={chapter} onOpenSection={open} />;
}
