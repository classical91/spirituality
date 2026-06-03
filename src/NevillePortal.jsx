import { useEffect, useState } from 'react';
import SelfConceptLanguageStudio from './SelfConceptLanguageStudio';

const TABS = ['Daily Alignment', 'Concepts', 'SATS', 'Revision', 'Mental Diet', 'Self-Concept Studio'];

const SECTION_ALIASES = {
  selfconcept: 'phrase-analyzer',
  'self-concept': 'phrase-analyzer',
  'language-studio': 'phrase-analyzer',
  states: 'states-of-mind',
  'inner-state': 'living-end',
  imagination: 'living-end',
};

const CONCEPT_SECTIONS = new Set([
  'living-end',
  'feeling-secret',
  'inner-conversation',
  'wish-fulfilled',
  'certainty',
  'persistence',
  'knowing-by-being',
]);

function normalizeInitialSection(initialSection) {
  if (!initialSection) return null;
  return SECTION_ALIASES[initialSection] || initialSection;
}

function resolveInitialTab(initialSection) {
  const section = normalizeInitialSection(initialSection);
  if (section === 'phrase-analyzer' || section === 'tone-traps') return 'Self-Concept Studio';
  if (section === 'sats') return 'SATS';
  if (section === 'revision') return 'Revision';
  if (section === 'mental-diet') return 'Mental Diet';
  if (section === 'concepts' || section === 'frameworks' || CONCEPT_SECTIONS.has(section)) return 'Concepts';
  if (section === 'states-of-mind' || section === 'daily-structure' || section === 'state-builder') return 'Daily Alignment';
  return 'Daily Alignment';
}

const CONCEPTS = [
  {
    id: 'living-end',
    title: 'Living in the End',
    tag: 'Identity Framework',
    short: 'Assume the wish fulfilled and let your inner state match the reality already accepted within.',
    explanation: "Neville's central move is not begging, chasing, or forcing. It is becoming the version of yourself for whom the desire is already natural. You occupy the state first — you do not wait for the world to prove it.",
    steps: [
      'Name the fulfilled reality clearly.',
      'Ask: who am I if this is already true?',
      'Feel the naturalness of that identity.',
      'Return to the state when appearances contradict it.',
    ],
    example: "Instead of 'I hope she chooses me,' try 'I am chosen, loved, and steady in love.'",
    accent: 'violet',
  },
  {
    id: 'feeling-secret',
    title: 'Feeling Is the Secret',
    tag: 'Emotional Assumption',
    short: 'The feeling of reality gives an assumption its power.',
    explanation: "Feeling does not mean forcing high emotion all day. It means the inner sense that something is real, settled, natural, and already yours.",
    steps: [
      'Do not chase intensity.',
      "Look for the quiet feeling of 'of course.'",
      'Let the desired identity feel normal.',
      'Return to emotional ownership when doubt appears.',
    ],
    example: "The feeling is less 'I need this now' and more 'this is already my place.'",
    accent: 'rose',
  },
  {
    id: 'inner-conversation',
    title: 'Inner Conversations',
    tag: 'Internal Dialogue',
    short: 'Your repeated inner conversations reveal the state you are occupying.',
    explanation: "Neville placed huge importance on the silent conversations we have with people. If you keep arguing inside, you rehearse separation. If you hear love, respect, and resolution, you practice the fulfilled state.",
    steps: [
      'Notice the silent conversation you keep replaying.',
      'Pause the argument version.',
      'Hear the person respond from the desired reality.',
      'Let that new conversation feel normal.',
    ],
    example: "Hear: 'I love you. I choose you. I am happy with you.' Then rest in it.",
    accent: 'fuchsia',
  },
  {
    id: 'wish-fulfilled',
    title: 'The Wish Fulfilled',
    tag: 'The State Sought',
    short: 'The end is the feeling of the wish already fulfilled — the satisfied state, not the getting.',
    explanation: "For Neville, the goal is never the external object. It is the inner state of satisfaction that comes after the wish is granted. You imagine from the place of already having, not from wanting.",
    steps: [
      'Ask: what would I feel if this were already done?',
      'Find the relief or quiet satisfaction of completion.',
      'Drop the wanting — wanting confirms absence.',
      "Rest in the feeling of 'it is finished.'",
    ],
    example: "Not 'I want to be loved' but the settled feeling of one who is already loved and secure.",
    accent: 'violet',
  },
  {
    id: 'certainty',
    title: 'Certainty',
    tag: 'Faith in the Unseen',
    short: 'Faith is loyalty to unseen reality — assuming with the certainty you give a known fact.',
    explanation: "Neville defined faith not as hope but as certainty about what the senses cannot yet confirm. You treat the assumption as established truth. Doubt is loyalty to appearances over the chosen state.",
    steps: [
      'Choose the assumption and treat it as settled fact.',
      'Stop requiring the outer world to confirm it first.',
      'When appearances contradict, stay loyal to the unseen.',
      'Let certainty feel quiet and matter-of-fact, not forced.',
    ],
    example: 'You are as certain of the fulfilled state as you are that the sun will rise — no argument needed.',
    accent: 'cyan',
  },
  {
    id: 'persistence',
    title: 'Persistence',
    tag: 'Faithful Continuance',
    short: 'An assumption, though false to the senses, hardens into fact if you persist in it.',
    explanation: "Manifestation rarely fails from a wrong technique; it fails from abandoning the state the moment appearances disagree. Persistence is the quiet refusal to return to the old assumption, day after day.",
    steps: [
      'Decide the state and commit to remaining in it.',
      'Expect contradiction and do not let it move you.',
      'Return gently each time you slip — without self-attack.',
      'Continue until the assumption feels like simple fact.',
    ],
    example: 'You keep assuming the secure, chosen identity even on the days nothing has visibly changed.',
    accent: 'emerald',
  },
  {
    id: 'knowing-by-being',
    title: 'Knowing by Being',
    tag: 'To Be Is to Know',
    short: 'You cannot know a state from the outside — you know it only by entering and being it.',
    explanation: "Knowledge of a state comes through occupation, not observation. You do not study love or security from a distance; you become the one who already has it, and from inside that identity you know its reality. Being precedes evidence.",
    steps: [
      'Stop analysing the desire from the outside.',
      'Step into the identity for whom it is already true.',
      'Notice how the world looks and feels from inside that state.',
      'Let being the state replace trying to figure it out.',
    ],
    example: "You don't think about how to be chosen — you assume the self that already is, and know it from within.",
    accent: 'amber',
  },
];

const CONCEPT_ACCENTS = {
  violet: 'border-violet-300/20 bg-violet-400/[0.06]',
  rose: 'border-rose-300/20 bg-rose-400/[0.06]',
  fuchsia: 'border-fuchsia-300/20 bg-fuchsia-400/[0.06]',
  cyan: 'border-cyan-300/20 bg-cyan-400/[0.06]',
  emerald: 'border-emerald-300/20 bg-emerald-400/[0.06]',
  amber: 'border-amber-300/20 bg-amber-400/[0.06]',
};

function cx(...cls) {
  return cls.filter(Boolean).join(' ');
}

const DAILY_STRUCTURE = [
  {
    time: 'Morning',
    title: 'Set the state before the day starts',
    tone: 'emerald',
    steps: [
      'Before getting out of bed, feel gratitude as if the desire is already fulfilled.',
      'Rehearse one short fulfilled scene for 5-10 minutes: a morning greeting, a calm message, or a simple moment of being chosen.',
      'Choose one I AM sentence and carry it into getting ready, breakfast, school, or work.',
    ],
    line: 'Start the day from assumption, not checking.',
  },
  {
    time: 'Daytime',
    title: 'Maintain the state while living normally',
    tone: 'cyan',
    steps: [
      'Use subtle inner conversations while walking, commuting, or between tasks.',
      'When doubt appears, interrupt it with: "Isn\'t it wonderful?" or "That is the old state. I return to the fulfilled one."',
      'Move through ordinary responsibilities as someone already secure, loved, and chosen.',
    ],
    line: 'Stay aligned without turning the day into performance.',
  },
  {
    time: 'Afternoon / Evening',
    title: 'Re-enter deliberately after responsibilities',
    tone: 'violet',
    steps: [
      'Take 5-10 minutes after school or work for a deeper fulfilled-scene rehearsal.',
      'If journaling helps, script from the end in present tense: what happened today because the state was already real?',
      'Keep it natural: one scene, one feeling, one identity.',
    ],
    line: 'Use practice to reset, not to chase.',
  },
  {
    time: 'Night',
    title: 'SATS before sleep',
    tone: 'rose',
    steps: [
      'Lie down, relax the body, and loop one short scene that implies the wish is fulfilled.',
      'Let the scene be sensory and ordinary: hearing loving words, feeling closeness, or resting in certainty.',
      'Fall asleep in the felt assumption rather than planning how it will happen.',
    ],
    line: 'Quality beats quantity. One convincing SATS session is enough.',
  },
];

const DAILY_TONES = {
  emerald: {
    card: 'border-emerald-200/15 bg-emerald-400/5',
    kicker: 'text-emerald-200/70',
    note: 'border-emerald-200/15 text-emerald-100',
  },
  cyan: {
    card: 'border-cyan-200/15 bg-cyan-400/5',
    kicker: 'text-cyan-200/70',
    note: 'border-cyan-200/15 text-cyan-100',
  },
  violet: {
    card: 'border-violet-200/15 bg-violet-400/5',
    kicker: 'text-violet-200/70',
    note: 'border-violet-200/15 text-violet-100',
  },
  rose: {
    card: 'border-rose-200/15 bg-rose-400/5',
    kicker: 'text-rose-200/70',
    note: 'border-rose-200/15 text-rose-100',
  },
};

// ─── Daily Alignment Tab ──────────────────────────────────────────────────────

function DailyAlignmentTab() {
  const [todayCard, setTodayCard] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('neville-today-card') || 'null'); } catch { return null; }
  });

  const [checkins, setCheckins] = useState(() => {
    const date = new Date().toISOString().slice(0, 10);
    try {
      const parsed = JSON.parse(window.localStorage.getItem('neville-checkins') || 'null');
      if (parsed?.date === date) return parsed;
    } catch {
      // ignore corrupt storage
    }
    return { date, morning: false, midday: false, night: false };
  });

  const generateTodayCard = () => {
    const card = {
      createdAt: new Date().toLocaleString(),
      identity: 'I am loved, chosen, secure, and fulfilled now.',
      sats: 'I hear: "I choose you. I love being with you." It feels natural and done.',
      revision: 'I remember when I doubted. Now I rest in certainty.',
      mentalDiet: 'That is the old state. I return to the fulfilled one.',
    };
    setTodayCard(card);
    window.localStorage.setItem('neville-today-card', JSON.stringify(card));
  };

  const toggleCheckin = (slot) => {
    setCheckins((current) => {
      const next = { ...current, [slot]: !current[slot] };
      window.localStorage.setItem('neville-checkins', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <section id="state-builder" className="scroll-mt-24 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/5 p-6">
          <h2 className="text-2xl font-black">Start Here (5 minutes)</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-white/80">
            <li>Choose one fulfilled desire sentence.</li>
            <li>Choose your "I AM" identity.</li>
            <li>Loop one short SATS scene for 60–90 seconds.</li>
            <li>Carry one mental diet line through the day.</li>
          </ol>
          <button
            onClick={generateTodayCard}
            className="mt-5 rounded-xl bg-white px-4 py-2 font-bold text-slate-900"
          >
            Generate Today Card
          </button>
        </div>

        <div className="rounded-3xl border border-violet-300/20 bg-violet-400/5 p-6">
          <h2 className="text-2xl font-black">Today Card</h2>
          {!todayCard ? (
            <p className="mt-3 text-white/70">Generate your card to pin today's identity practice.</p>
          ) : (
            <div className="mt-4 space-y-2 text-sm text-white/90">
              <p><strong>Identity:</strong> {todayCard.identity}</p>
              <p><strong>SATS:</strong> {todayCard.sats}</p>
              <p><strong>Revision:</strong> {todayCard.revision}</p>
              <p><strong>Mental Diet:</strong> {todayCard.mentalDiet}</p>
            </div>
          )}
        </div>
      </section>

      <section id="daily-structure" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-violet-200/70">Daily structure</p>
            <h2 className="mt-2 text-2xl font-black">Neville practice around real life</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              A balanced day uses short state-setting moments around school, work, and responsibilities. The aim is steady assumption, not constant checking or forced visualization.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-bold text-amber-100">
            Quality over quantity
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {DAILY_STRUCTURE.map((block) => {
            const tone = DAILY_TONES[block.tone];
            return (
              <article key={block.time} className={`rounded-2xl border p-4 ${tone.card}`}>
                <p className={`text-xs font-black uppercase tracking-[0.2em] ${tone.kicker}`}>{block.time}</p>
                <h3 className="mt-2 text-lg font-black text-white">{block.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-white/68">
                  {block.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <p className={`mt-4 rounded-xl border bg-black/20 p-3 text-xs font-bold leading-5 ${tone.note}`}>
                  {block.line}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ['Persist', 'Return to the chosen state when appearances contradict it.'],
            ['Live normally', 'Let school, work, rest, and friendship continue instead of making practice obsessive.'],
            ['Do not force timing', 'Drop the when and how; rehearse the fulfilled identity.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-black text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/60">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="states-of-mind" className="scroll-mt-24 rounded-3xl border border-sky-300/20 bg-sky-400/5 p-6">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-200/70">State of mind</p>
            <h2 className="mt-2 text-2xl font-black">The inner position you are living from</h2>
            <p className="mt-3 leading-relaxed text-white/70">
              A state of mind is your current mental, emotional, and imaginative condition. It is the inner weather you interpret life from: calm, anxious, confident, angry, loving, discouraged, focused, jealous, or grateful.
            </p>
            <p className="mt-3 leading-relaxed text-white/60">
              The same event can mean different things from different states. A delay can feel like rejection from fear, or feel normal from security. The event is the same; the state changes the meaning.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Fearful state', 'A small delay becomes "I am being rejected."'],
              ['Secure state', 'The same delay becomes "They are probably busy."'],
              ['Old identity', '"I am rejected" becomes the state everything is filtered through.'],
              ['Chosen identity', '"I am loved and chosen" becomes the state you return to.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-sky-200/15 bg-black/20 p-4">
                <p className="font-black text-sky-100">{title}</p>
                <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-6">
        <h2 className="text-2xl font-black">Daily Check-in</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {[
            ['morning', 'Morning state set'],
            ['midday', 'Midday reset done'],
            ['night', 'Night SATS done'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleCheckin(key)}
              className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-left"
            >
              <span>{label}</span>
              <span className="ml-2">{checkins[key] ? '✅' : '◻'}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── SATS Tab ─────────────────────────────────────────────────────────────────

function SATSTab() {
  const [scene, setScene] = useState(() => {
    try { return window.localStorage.getItem('neville-sats-scene') || ''; } catch { return ''; }
  });

  const saveScene = (val) => {
    setScene(val);
    try { window.localStorage.setItem('neville-sats-scene', val); } catch { /* ignore */ }
  };

  return (
    <div id="sats" className="scroll-mt-24 space-y-4">
      <div className="rounded-3xl border border-violet-300/20 bg-violet-400/5 p-6">
        <h2 className="text-2xl font-black">What is SATS?</h2>
        <p className="mt-3 leading-relaxed text-white/70">
          State Akin to Sleep is the drowsy, hypnagogic state between waking and sleeping. The conscious mind relaxes its grip on "reality," and the subconscious is highly receptive to a new impression. You plant one small scene — a looped, sensory moment — and let it do the work.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ['Keep it short', 'One moment, 5–10 seconds. Not a movie — a clip.'],
            ['Loop it gently', 'Repeat the same scene until you drift off.'],
            ['Feel the feeling', 'The emotion is the currency. Not the picture.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-violet-200/15 bg-black/20 p-4">
              <p className="font-black text-violet-100">{title}</p>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-6">
        <h2 className="text-2xl font-black">Tonight's Scene</h2>
        <p className="mt-2 text-sm text-white/60">Write the specific moment you will loop during SATS tonight. Describe it from inside the wish fulfilled.</p>
        <textarea
          value={scene}
          onChange={(e) => saveScene(e.target.value)}
          className="mt-4 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
          placeholder='e.g. I feel her hand in mine. She says "I love you." It feels natural, settled, and done.'
        />
      </div>

      <div className="rounded-3xl border border-emerald-300/15 bg-emerald-400/5 p-6">
        <h2 className="text-xl font-black">Scene Starters</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            'She says "I love you" and I feel completely at ease.',
            'I get the call — the news I\'ve been waiting for. I exhale.',
            'I wake up beside her. Everything is settled.',
            'A friend congratulates me. I feel the accomplishment.',
            'I feel the ring on my finger. It\'s done.',
            'I hold the offer letter. I read my name on it.',
          ].map((s) => (
            <button
              key={s}
              onClick={() => saveScene(s)}
              className="rounded-2xl border border-white/10 bg-black/20 p-3 text-left text-sm text-white/75 transition hover:border-emerald-300/30 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Revision Tab ─────────────────────────────────────────────────────────────

function RevisionTab() {
  const [event, setEvent] = useState('');
  const [revised, setRevised] = useState('');
  const [revisions, setRevisions] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('neville-revisions') || '[]'); } catch { return []; }
  });

  const save = () => {
    if (!event.trim()) return;
    const entry = {
      id: Date.now(),
      event: event.trim(),
      revised: revised.trim(),
      date: new Date().toLocaleDateString(),
    };
    const next = [entry, ...revisions].slice(0, 20);
    setRevisions(next);
    window.localStorage.setItem('neville-revisions', JSON.stringify(next));
    setEvent('');
    setRevised('');
  };

  const remove = (id) => {
    const next = revisions.filter((r) => r.id !== id);
    setRevisions(next);
    window.localStorage.setItem('neville-revisions', JSON.stringify(next));
  };

  return (
    <div id="revision" className="scroll-mt-24 space-y-4">
      <div className="rounded-3xl border border-rose-300/20 bg-rose-400/5 p-6">
        <h2 className="text-2xl font-black">What is Revision?</h2>
        <p className="mt-3 leading-relaxed text-white/70">
          Revision is Neville's practice of mentally rewriting past events. You revisit a memory — a conversation, a moment, a whole day — and imagine it as it should have been. This changes the emotional impression the past leaves on your subconscious, which changes your present state and future assumptions.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ['Identify the wound', 'What memory is still pulling you into the old state?'],
            ['Rewrite it fully', 'How would it have gone if it was already done? What did you hear, see, feel?'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-rose-200/15 bg-black/20 p-4">
              <p className="font-black text-rose-100">{title}</p>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-amber-300/20 bg-amber-400/5 p-6">
        <h2 className="mb-4 text-xl font-black">Write a Revision</h2>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-white/60">What happened (old version)</label>
            <textarea
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none placeholder:text-white/30 focus:border-amber-300/40"
              placeholder="Describe the event or memory as it happened..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-white/60">Revised version (how it should have gone)</label>
            <textarea
              value={revised}
              onChange={(e) => setRevised(e.target.value)}
              className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none placeholder:text-white/30 focus:border-emerald-300/40"
              placeholder="Rewrite it as you wish it had been. Present, sensory, complete."
            />
          </div>
          <button
            onClick={save}
            className="rounded-xl bg-white px-4 py-2 font-bold text-slate-900"
          >
            Save Revision
          </button>
        </div>
      </div>

      {revisions.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-black">Saved Revisions</h2>
          <div className="space-y-3">
            {revisions.map((r) => (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2 text-sm">
                    <p className="text-xs text-white/50">{r.date}</p>
                    <p className="italic text-white/60">"{r.event}"</p>
                    {r.revised && <p className="text-emerald-200">→ {r.revised}</p>}
                  </div>
                  <button
                    onClick={() => remove(r.id)}
                    className="text-xs text-white/30 hover:text-white/60"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mental Diet Tab ──────────────────────────────────────────────────────────

function MentalDietTab() {
  const [catches, setCatches] = useState(() => {
    const date = new Date().toISOString().slice(0, 10);
    try {
      const stored = JSON.parse(window.localStorage.getItem('neville-mental-diet') || 'null');
      if (stored?.date === date) return stored;
    } catch {
      // ignore corrupt storage
    }
    return { date, count: 0 };
  });

  const intercept = () => {
    setCatches((c) => {
      const next = { ...c, count: c.count + 1 };
      window.localStorage.setItem('neville-mental-diet', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div id="mental-diet" className="scroll-mt-24 space-y-4">
      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-6">
        <h2 className="text-2xl font-black">What is Mental Diet?</h2>
        <p className="mt-3 leading-relaxed text-white/70">
          Mental Diet is Neville's 24-hour challenge: do not allow a single thought that contradicts your desired state to go unchallenged. The moment a fearful or contradicting thought appears, catch it and return to the fulfilled state. You do not fight it — you replace it.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ['Catch it', 'Notice the moment a contradicting thought appears.'],
            ['Name it', '"That is the old state."'],
            ['Return', '"I am already in my fulfilled state."'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-cyan-200/15 bg-black/20 p-4">
              <p className="font-black text-cyan-100">{title}</p>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center rounded-3xl border border-emerald-300/20 bg-emerald-400/5 p-6 text-center">
          <h2 className="text-xl font-black">Today's Intercepts</h2>
          <p className="mt-1 text-sm text-white/60">Each time you catch a contradicting thought and return to your state, press this.</p>
          <div className="mt-6 text-7xl font-black text-white">{catches.count}</div>
          <button
            onClick={intercept}
            className="mt-6 rounded-2xl bg-emerald-400 px-6 py-3 text-lg font-black text-slate-900 transition hover:bg-emerald-300"
          >
            I caught one ✓
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-black">Return Phrases</h2>
          <div className="space-y-3">
            {[
              'That is the old state. I return to the fulfilled one.',
              'My desire is already done in the divine mind.',
              'I am not that thought. I am the fulfilled version.',
              'I persist. I do not waver.',
              'All I need to do is feel it is true now.',
            ].map((p) => (
              <div key={p} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-sm text-white/80">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Concepts Tab ─────────────────────────────────────────────────────────────

function ConceptsTab({ initialSection }) {
  const section = normalizeInitialSection(initialSection);
  const initialConcept = CONCEPT_SECTIONS.has(section) ? section : null;
  const [openId, setOpenId] = useState(initialConcept);
  const [prevInitialConcept, setPrevInitialConcept] = useState(initialConcept);

  if (initialConcept !== prevInitialConcept) {
    setPrevInitialConcept(initialConcept);
    if (initialConcept) setOpenId(initialConcept);
  }

  return (
    <div id="concepts" className="scroll-mt-24">
      <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300/70">Core Concepts</p>
        <p className="mt-2 text-sm leading-6 text-white/65">
          The conceptual backbone of Neville's teaching. SATS, Revision, and Mental Diet have their own
          practice tabs — these are the states and principles behind them. Tap any concept to expand it.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {CONCEPTS.map((c) => {
          const open = openId === c.id;
          return (
            <button
              id={c.id}
              key={c.id}
              type="button"
              onClick={() => setOpenId(open ? null : c.id)}
              className={cx(
                'scroll-mt-24 rounded-3xl border p-5 text-left transition',
                CONCEPT_ACCENTS[c.accent] || 'border-white/10 bg-white/[0.05]',
                open ? 'md:col-span-2' : 'hover:border-white/25'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">{c.tag}</span>
                  <h3 className="mt-3 text-xl font-black text-white">{c.title}</h3>
                </div>
                <span className="text-lg text-white/40">{open ? '−' : '+'}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/70">{c.short}</p>

              {open && (
                <div className="mt-4 grid gap-4 border-t border-white/10 pt-4">
                  <p className="text-sm leading-6 text-white/75">{c.explanation}</p>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45">How to use it</p>
                    <ul className="grid gap-1.5">
                      {c.steps.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-white/70">
                          <span className="text-white/35">{i + 1}.</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Example</p>
                    <p className="mt-1.5 text-sm leading-6 text-white/75">{c.example}</p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root Portal ──────────────────────────────────────────────────────────────

export default function NevillePortal({ onBack, initialSection }) {
  const [tab, setTab] = useState(() => resolveInitialTab(initialSection));
  const section = normalizeInitialSection(initialSection);
  const [prevInitialSection, setPrevInitialSection] = useState(initialSection);

  if (initialSection !== prevInitialSection) {
    setPrevInitialSection(initialSection);
    setTab(resolveInitialTab(initialSection));
  }

  useEffect(() => {
    if (!section) return undefined;
    const timeout = window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ block: 'start' });
    }, 60);
    return () => window.clearTimeout(timeout);
  }, [section, tab]);

  return (
    <div className="min-h-screen bg-[#070713] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={onBack} className="mb-4 rounded-xl border border-white/20 px-4 py-2">← Back</button>

        <header className="mb-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Neville Goddard Portal</p>
          <h1 className="mt-2 text-4xl font-black">Living in Alignment</h1>
          <p className="mt-3 text-white/70">Daily identity practice, SATS, revision, mental diet, and self-concept language — all in one place.</p>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cx(
                'rounded-xl px-4 py-2 text-sm font-bold transition',
                tab === t
                  ? 'bg-white text-slate-900'
                  : 'border border-white/15 text-white/60 hover:border-white/30 hover:text-white'
              )}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === 'Daily Alignment' && <DailyAlignmentTab />}
        {tab === 'Concepts' && <ConceptsTab initialSection={section} />}
        {tab === 'SATS' && <SATSTab />}
        {tab === 'Revision' && <RevisionTab />}
        {tab === 'Mental Diet' && <MentalDietTab />}
        {tab === 'Self-Concept Studio' && <SelfConceptLanguageStudio embedded initialSection={section} />}
      </div>
    </div>
  );
}
