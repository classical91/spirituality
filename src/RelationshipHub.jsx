// Relationship Hub — the single source of truth for love, attachment, dating,
// intimacy, heartbreak, boundaries, and relationship patterns. Other portals
// (Chakra, Sexual Energy, Psychology) link into this hub rather than holding
// their own copies of relationship content.
//
// Navigation metadata (routable section IDs, overview categories, and search
// entries) lives in src/data/relationshipIndex.js so the overview cards,
// deep-link routing, and global search cannot drift apart. The full
// educational content stays in the tab components (Clarity, Patterns,
// Practice, Foundations).
import { useState } from "react";
import RelationshipClarityPortal from "./RelationshipClarityPortal";
import RelationshipPatterns from "./RelationshipPatterns";
import RelationshipPractice from "./RelationshipPractice";
import { relationshipCategories, resolveOwner } from "./data/relationshipIndex";

const TABS = [
  { id: "clarity", label: "Relationship Clarity" },
  { id: "patterns", label: "Relationship Patterns" },
  { id: "practice", label: "Relationship Practice" },
];

// Resolve an incoming ?section= value to { tab, sub }. Ownership is derived
// from relationshipIndex.js, so adding a section there is all that is needed
// to make its deep link route to the correct tab.
function resolveSection(section) {
  if (!section) return { tab: "overview", sub: null };
  if (section === "patterns" || section === "relationship-patterns") return { tab: "patterns", sub: null };
  if (section === "clarity" || section === "relationship-clarity") return { tab: "clarity", sub: null };
  if (section === "practice" || section === "relationship-practice") return { tab: "practice", sub: null };
  const owner = resolveOwner(section);
  if (owner === "clarity") return { tab: "clarity", sub: section };
  if (owner === "patterns") return { tab: "patterns", sub: section };
  if (owner === "practice") return { tab: "practice", sub: section };
  return { tab: "overview", sub: null };
}

function Overview({ onOpenTab, onOpenSection }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="mb-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-rose-500/15 via-white/[0.05] to-violet-500/10 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.45em] text-rose-200/70">The complete relationship system</p>
        <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white md:text-6xl">
          Relationship Hub
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
          Love is bigger than sex, bigger than chakra, and bigger than psychology alone. This hub is the source of truth for
          attachment, dating, intimacy, desire, heartbreak, boundaries, and the patterns underneath them — other portals link
          here rather than holding their own copy.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("clarity")}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
          >
            Open Relationship Clarity
          </button>
          <button
            type="button"
            onClick={() => onOpenTab("patterns")}
            className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]"
          >
            Open Relationship Patterns
          </button>
          <button
            type="button"
            onClick={() => onOpenTab("practice")}
            className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]"
          >
            Open Relationship Practice
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relationshipCategories.map((cat) => (
          <div key={cat.title} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
            <h3 className="text-base font-black text-white">{cat.title}</h3>
            {cat.summary && <p className="mt-2 text-xs leading-5 text-white/55">{cat.summary}</p>}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {cat.chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => onOpenSection(chip.section)}
                  className="rounded-full border border-rose-300/20 bg-rose-500/10 px-2.5 py-1 text-[11px] font-bold text-rose-100/85 transition hover:border-rose-300/50 hover:bg-rose-500/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70"
                >
                  {chip.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RelationshipHub({ onBack, onNavigate, initialSection }) {
  const initial = resolveSection(initialSection);
  const [tab, setTab] = useState(initial.tab);
  const [claritySub, setClaritySub] = useState(initial.sub);

  // Overview chips deep-link through the app router (?section=…) so browser
  // back/forward and refresh preserve the selected section.
  const openSection = (section) => {
    if (onNavigate) onNavigate("relationshiphub", { section });
  };

  if (tab === "clarity") {
    return (
      <RelationshipClarityPortal
        onBack={() => { setClaritySub(null); setTab("overview"); }}
        onNavigate={(id, opts) => {
          if (id === "relationships") {
            setClaritySub(opts?.section ?? null);
          } else {
            onNavigate?.(id, opts);
          }
        }}
        initialSection={claritySub}
      />
    );
  }

  if (tab === "patterns") {
    return <RelationshipPatterns onBack={() => setTab("overview")} initialSection={initial.sub} />;
  }

  if (tab === "practice") {
    return (
      <div className="min-h-screen bg-[#0a0511] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-rose-500/20 blur-3xl" />
          <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-3xl" />
        </div>
        <button
          onClick={() => setTab("overview")}
          className="fixed left-4 top-4 z-50 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
        >
          ← Back
        </button>
        <RelationshipPractice initialSection={initial.sub} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0511] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-3xl" />
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-4 top-4 z-50 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
        >
          ← Back
        </button>
      )}
      <nav className="sticky top-0 z-40 flex justify-center gap-2 border-b border-white/10 bg-[#0a0511]/90 px-5 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => setTab("overview")}
          className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-950"
        >
          Overview
        </button>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className="rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/[0.1] hover:text-white"
          >
            {t.label}
          </button>
        ))}
      </nav>
      <Overview onOpenTab={setTab} onOpenSection={openSection} />
    </div>
  );
}
