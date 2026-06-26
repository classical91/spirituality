import { useState, useEffect } from 'react';

const todayKey = () => {
  const d = new Date();
  return `daily-practice-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const PERIODS = [
  {
    id: 'morning',
    label: 'Morning',
    icon: '◎',
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.10)',
    accentBorder: 'rgba(251,191,36,0.28)',
    practices: [
      {
        id: 'daily-alignment',
        icon: '✦',
        title: 'Daily Alignment',
        duration: '5–10 min',
        description:
          'Set your state for the day. Open with gratitude, write your I AM sentence, and run a short mental rehearsal of your desired scene.',
        portal: 'neville',
        section: 'daily-structure',
      },
      {
        id: 'morning-breath',
        icon: '◉',
        title: 'Breathwork',
        duration: '3–5 min',
        description:
          'Box breathing or 4-7-8 to settle the nervous system before the day takes over. Enter the day from steadiness, not urgency.',
        portal: 'inneratlas',
        section: 'breath-awareness',
      },
      {
        id: 'self-concept-check',
        icon: '◈',
        title: 'I AM Language Check',
        duration: '2–3 min',
        description:
          'Run your current self-talk through the Language Studio. Catch any limiting phrases and replace them before they run all day.',
        portal: 'neville',
        section: 'phrase-analyzer',
      },
    ],
  },
  {
    id: 'midday',
    label: 'Midday',
    icon: '◑',
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.10)',
    accentBorder: 'rgba(52,211,153,0.28)',
    practices: [
      {
        id: 'mental-diet',
        icon: '⇌',
        title: 'Mental Diet Check-In',
        duration: '1–2 min',
        description:
          'Pause and notice your inner conversations. Are you rehearsing what you want — or what you fear? One catch is enough.',
        portal: 'neville',
        section: 'mental-diet',
      },
      {
        id: 'grounding',
        icon: '◍',
        title: 'Grounding Reset',
        duration: '2–3 min',
        description:
          '5-4-3-2-1 senses, cold water, or feet on the floor to return fully to the present when the mind has drifted.',
        portal: 'inneratlas',
        section: 'regulation',
      },
      {
        id: 'emotional-checkin',
        icon: '❋',
        title: 'Emotional Check-In',
        duration: '2–3 min',
        description:
          'Name what you are feeling right now without judgment. Locate it, label it, and let it be without needing to fix it.',
        portal: 'inneratlas',
        section: 'emotional-awareness',
      },
    ],
  },
  {
    id: 'evening',
    label: 'Evening',
    icon: '◐',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.10)',
    accentBorder: 'rgba(167,139,250,0.28)',
    practices: [
      {
        id: 'revision',
        icon: '✸',
        title: 'Revision',
        duration: '5–10 min',
        description:
          'Rewrite anything from today that felt off. Give it the ending it deserved. Do not carry the old version into sleep.',
        portal: 'neville',
        section: 'revision',
      },
      {
        id: 'body-release',
        icon: '⌾',
        title: 'Body Release',
        duration: '5–10 min',
        description:
          'Progressive relaxation, TRE shaking, or yoga nidra to discharge the tension of the day from the body before rest.',
        portal: 'inneratlas',
        section: 'body-awareness',
      },
      {
        id: 'sats',
        icon: '◇',
        title: 'SATS',
        duration: '5–10 min',
        description:
          'In the drowsy hypnagogic state just before sleep, loop your fulfilled scene — short, feeling-based, and gentle.',
        portal: 'neville',
        section: 'sats',
      },
    ],
  },
  {
    id: 'emergency',
    label: 'Emergency Reset',
    icon: '⚡',
    accent: '#fb7185',
    accentBg: 'rgba(251,113,133,0.10)',
    accentBorder: 'rgba(251,113,133,0.28)',
    practices: [
      {
        id: 'emergency-grounding',
        icon: '◍',
        title: 'Grounding Reset',
        duration: '1–2 min',
        description:
          'Spiraling or flooded right now? 5-4-3-2-1 senses, cold water, or feet on the floor — get back into your body first.',
        portal: 'inneratlas',
        section: 'regulation',
      },
      {
        id: 'emergency-security-check',
        icon: '♡',
        title: 'Security vs Fear Check',
        duration: '1–2 min',
        description:
          'Before you text, react, or decide anything: am I moving from security or from fear right now?',
        portal: 'relationshiphub',
        section: 'security-vs-fear',
      },
      {
        id: 'emergency-self-concept',
        icon: '◈',
        title: 'Reclaim the I AM',
        duration: '1–2 min',
        description:
          'Catch the panicked or self-attacking sentence running in your head and replace it with one true, steady I AM statement.',
        portal: 'neville',
        section: 'phrase-analyzer',
      },
    ],
  },
];

const KEY_INSIGHTS = [
  {
    theme: 'Morning Intentionality',
    insight: 'What you do before 10 am sets your emotional and mental baseline for the day.',
  },
  {
    theme: 'Mindful Creation',
    insight: 'Becoming conscious of thought patterns lets you intentionally shape your experience.',
  },
  {
    theme: 'Emotion + Vision = Neuroplasticity',
    insight: 'Feeling your future emotionally helps rewire your brain to align with it.',
  },
  {
    theme: 'Escape From Victim Thinking',
    insight: 'Intentional habits disrupt reactive, past-driven mental states.',
  },
];

const ALL_PRACTICE_IDS = PERIODS.flatMap((p) => p.practices.map((pr) => pr.id));

function loadChecked() {
  try {
    const raw = localStorage.getItem(todayKey());
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveChecked(set) {
  try {
    localStorage.setItem(todayKey(), JSON.stringify([...set]));
  } catch {
    // storage unavailable — silently continue
  }
}

export default function DailyPracticePortal({ onBack, onNavigate }) {
  const [checked, setChecked] = useState(loadChecked);

  useEffect(() => {
    saveChecked(checked);
  }, [checked]);

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const resetDay = () => setChecked(new Set());

  const completedCount = checked.size;
  const totalCount = ALL_PRACTICE_IDS.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <main className="relative min-h-screen bg-[#070914] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[440px] w-[440px] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-10">
        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <button
            onClick={onBack}
            className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-amber-400/40 hover:text-amber-300"
          >
            ← Back
          </button>
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
              Daily Practice
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Daily Practice<br />Flow
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
              A structured day — morning alignment, midday resets, and evening wind-down. Each practice links directly into the relevant portal.
            </p>
          </div>
        </div>

        {/* Key insights */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
            Why this works
          </h2>
          <p className="mb-4 text-xs leading-relaxed text-slate-500">
            The principles behind an intentional day — why the morning matters most and how steady practice reshapes your mental baseline.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {KEY_INSIGHTS.map((item) => (
              <div
                key={item.theme}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
              >
                <p className="text-sm font-bold text-slate-200">{item.theme}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">
              Today — {completedCount} of {totalCount} practices
            </span>
            <button
              onClick={resetDay}
              className="text-xs text-slate-600 transition-colors hover:text-slate-400"
            >
              Reset day
            </button>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {completedCount === totalCount && totalCount > 0 && (
            <p className="mt-2 text-xs text-amber-300">
              Full day complete. Rest well.
            </p>
          )}
        </div>

        {/* Periods */}
        <div className="space-y-8">
          {PERIODS.map((period) => {
            const periodDone = period.practices.every((p) => checked.has(p.id));
            return (
              <section key={period.id}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="text-lg font-black"
                    style={{ color: period.accent }}
                  >
                    {period.icon}
                  </span>
                  <h2
                    className="text-sm font-black uppercase tracking-[0.14em]"
                    style={{ color: period.accent }}
                  >
                    {period.label}
                  </h2>
                  {periodDone && (
                    <span className="ml-1 text-xs text-slate-600">◆ done</span>
                  )}
                </div>

                <div className="space-y-3">
                  {period.practices.map((practice) => {
                    const done = checked.has(practice.id);
                    return (
                      <PracticeCard
                        key={practice.id}
                        practice={practice}
                        done={done}
                        accent={period.accent}
                        accentBg={period.accentBg}
                        accentBorder={period.accentBorder}
                        onToggle={() => toggle(practice.id)}
                        onNavigate={onNavigate}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function PracticeCard({ practice, done, accent, accentBg, accentBorder, onToggle, onNavigate }) {
  return (
    <article
      className="rounded-[1.5rem] border p-4 transition-all"
      style={{
        borderColor: done ? accentBorder : 'rgba(255,255,255,0.08)',
        background: done ? accentBg : 'rgba(255,255,255,0.03)',
      }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-md border transition-all"
          style={{
            borderColor: done ? accent : 'rgba(255,255,255,0.2)',
            background: done ? accent : 'transparent',
          }}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          {done && <span className="text-[10px] font-black text-black">✓</span>}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base" style={{ color: done ? accent : 'rgba(255,255,255,0.5)' }}>
              {practice.icon}
            </span>
            <h3
              className="text-sm font-bold transition-colors"
              style={{ color: done ? '#e2e8f0' : '#cbd5e1' }}
            >
              {practice.title}
            </h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
              {practice.duration}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            {practice.description}
          </p>
        </div>

        {/* Go button */}
        <button
          onClick={() => onNavigate?.(practice.portal, { section: practice.section })}
          className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-90"
          style={{
            borderColor: accentBorder,
            color: accent,
            background: accentBg,
          }}
        >
          Go →
        </button>
      </div>
    </article>
  );
}
