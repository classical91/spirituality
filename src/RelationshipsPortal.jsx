import { useState } from 'react';
import RelationshipClarityPortal from './RelationshipClarityPortal';
import RelationshipPatterns from './RelationshipPatterns';

const FOUNDATIONS = [
  {
    id: 'trust',
    icon: '◈',
    title: 'Trust',
    description:
      'Trust is not given once — it is built through repeated small acts of consistency, honesty, and follow-through. It cannot be demanded; it accumulates.',
    shadow:
      'Trusting too fast from desire, or withholding trust entirely from fear. Both prevent real connection.',
    secure:
      'I extend trust incrementally, watch for alignment between words and actions, and repair breaks without blowing up the relationship.',
    practice:
      'Name one thing this person has done consistently. Name one thing you need to see more of. Sit with both before deciding what to say or do.',
  },
  {
    id: 'emotional-safety',
    icon: '◉',
    title: 'Emotional Safety',
    description:
      'Feeling safe in a relationship means you can be honest about your feelings, make mistakes, and show your real self without fear of punishment, ridicule, or withdrawal.',
    shadow:
      'Walking on eggshells. Hiding your real thoughts to keep the peace. Bracing for a reaction.',
    secure:
      'I can disagree, feel sad, or share something uncomfortable — and know that we will still be okay.',
    practice:
      'Ask yourself: "Is there something I have been holding back because I am afraid of how it will be received?" That answer shows you your current safety level.',
  },
  {
    id: 'vulnerability',
    icon: '❋',
    title: 'Vulnerability',
    description:
      'Vulnerability is the willingness to be seen — to share something real before you know how it will land. It is the soil from which real intimacy grows.',
    shadow:
      'Over-sharing too early as a test, or closing entirely because you have been hurt before.',
    secure:
      'I let people earn deeper access. I share gradually and notice how they receive what I offer.',
    practice:
      'Share one thing today that is true but slightly uncomfortable. It does not need to be big — just real.',
  },
  {
    id: 'receiving',
    icon: '⇣',
    title: 'Receiving',
    description:
      'Receiving love — compliments, care, support, affection — without deflecting or minimizing is a skill. It requires believing you are worth what is being offered.',
    shadow:
      'Dismissing compliments. Redirecting care. Staying in the giving role to stay in control. Feeling unworthy of love.',
    secure:
      'I let love land. I say thank you and feel it fully instead of brushing it aside.',
    practice:
      'The next time someone offers you care or a compliment, pause before deflecting. Breathe. Say thank you and let it settle for a moment.',
  },
  {
    id: 'mutuality',
    icon: '⇌',
    title: 'Mutuality',
    description:
      'Mutuality means both people are genuinely invested — giving, showing up, and caring about each other\'s wellbeing. A relationship is not mutual when one person carries it alone.',
    shadow:
      'Over-functioning for someone who is not meeting you. Accepting crumbs because you want it to work.',
    secure:
      'I notice whether the energy is returned. I do not carry a relationship that is not being carried with me.',
    practice:
      'Ask: "Am I receiving as much care, attention, and investment as I am giving?" If the answer is no — sit with what that tells you.',
  },
  {
    id: 'appreciation',
    icon: '✦',
    title: 'Appreciation',
    description:
      'Appreciation is the active practice of noticing and naming what you value in someone. It keeps love alive by making the other person feel seen and chosen.',
    shadow:
      'Taking someone for granted. Focusing only on what is missing. Forgetting to say what you actually feel.',
    secure:
      'I name what I notice. I do not assume they know — I tell them.',
    practice:
      'Name one thing you genuinely appreciate about someone in your life. Say it to them today — out loud or in a message.',
  },
  {
    id: 'admiration',
    icon: '✸',
    title: 'Admiration',
    description:
      'Admiration is deeper than appreciation. It is seeing someone\'s essence — their character, their resilience, their way of moving through life — and naming it.',
    shadow:
      'Putting someone on a pedestal (idolizing, not truly seeing). Or diminishing them until you feel nothing.',
    secure:
      'I admire real things — specific, grounded qualities. I see who they actually are, not who I need them to be.',
    practice:
      'Think of one quality in someone you admire that has nothing to do with how they make you feel. Name it to yourself. Then consider naming it to them.',
  },
  {
    id: 'commitment',
    icon: '◎',
    title: 'Commitment',
    description:
      'Commitment is the ongoing decision to choose someone even when the feeling fluctuates — to show up through difficulty, not just in ease.',
    shadow:
      'Commitment as control ("you cannot leave"). Or fear of commitment rooted in fear of losing yourself.',
    secure:
      'I commit because I choose to — freely and clearly. I revisit what that commitment means as we both grow.',
    practice:
      'Name what you are actually committed to in your most important relationship. Is it the person, the feeling, the idea of them, or a shared life?',
  },
  {
    id: 'intimacy',
    icon: '◇',
    title: 'Intimacy',
    description:
      'Intimacy is the quality of being truly known — across emotional, physical, intellectual, spiritual, and experiential dimensions. It deepens with honesty, time, and safety.',
    shadow:
      'Confusing physical intimacy for emotional closeness. Or keeping emotional distance to feel safe.',
    secure:
      'I allow different kinds of closeness in different relationships. I know which types of intimacy matter most to me.',
    practice:
      'Which type of intimacy do you most want right now — emotional, physical, intellectual, spiritual, or experiential? Name it and ask whether you are letting it in.',
  },
  {
    id: 'emotional-support',
    icon: '⌾',
    title: 'Emotional Support',
    description:
      'Emotional support is being present for someone\'s inner world without trying to fix it. It is listening fully, reflecting accurately, and staying close when things are hard.',
    shadow:
      'Jumping to solutions when someone needs to be heard. Withdrawing when emotions get intense.',
    secure:
      'I can hold space for someone else\'s experience without needing to resolve it or take it personally.',
    practice:
      'The next time someone shares something difficult, try: "That sounds hard. Tell me more." Then listen without offering a solution.',
  },
];

const TABS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'clarity', label: 'Clarity' },
  { id: 'patterns', label: 'Patterns' },
];

export default function RelationshipsPortal({ onBack, onNavigate, initialSection }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (initialSection === 'patterns' || initialSection === 'relationship-patterns') return 'patterns';
    if (initialSection === 'clarity' || initialSection === 'relationship-clarity') return 'clarity';
    return 'foundations';
  });
  const [claritySection, setClaritySection] = useState(
    activeTab === 'clarity' ? initialSection : null,
  );

  if (activeTab === 'clarity') {
    return (
      <RelationshipClarityPortal
        onBack={() => {
          setClaritySection(null);
          setActiveTab('foundations');
        }}
        onNavigate={(id, opts) => {
          if (id === 'relationships') {
            setClaritySection(opts?.section ?? null);
          } else {
            onNavigate?.(id, opts);
          }
        }}
        initialSection={claritySection}
      />
    );
  }

  if (activeTab === 'patterns') {
    return <RelationshipPatterns onBack={() => setActiveTab('foundations')} />;
  }

  return (
    <main className="relative min-h-screen bg-[#070914] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full bg-pink-600/18 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-10">
        <div className="mb-10 flex items-start gap-4">
          <button
            onClick={onBack}
            className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-rose-400/40 hover:text-rose-300"
          >
            ← Back
          </button>
          <div>
            <span className="mb-2 inline-block rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-rose-300">
              Relationships & Love
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Relationships<br />& Love
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
              Trust, safety, vulnerability, mutuality, and the full anatomy of conscious love — alongside patterns, red flags, and tools for clarity.
            </p>
          </div>
        </div>

        <div className="mb-8 flex gap-1 border-b border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-rose-400 text-rose-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FOUNDATIONS.map((concept) => (
            <FoundationCard key={concept.id} concept={concept} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FoundationCard({ concept }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 transition-all hover:border-rose-400/25">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl text-rose-300">{concept.icon}</span>
          <h3 className="text-base font-bold text-white">{concept.title}</h3>
        </div>
        <span className="mt-0.5 shrink-0 text-xs text-slate-600">{open ? '▲' : '▼'}</span>
      </button>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">{concept.description}</p>

      {open && (
        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400/70">
              Shadow pattern
            </span>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">{concept.shadow}</p>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400/70">
              Secure expression
            </span>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">{concept.secure}</p>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-400/70">
              Practice
            </span>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">{concept.practice}</p>
          </div>
        </div>
      )}
    </article>
  );
}
