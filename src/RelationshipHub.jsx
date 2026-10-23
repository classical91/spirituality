// Relationship Hub — the single source of truth for love, attachment, dating,
// intimacy, heartbreak, boundaries, and relationship patterns. Other portals
// (Chakra, Sexual Energy, Psychology) link into this hub rather than holding
// their own copies of relationship content.
//
// Navigation metadata (routable section IDs, Clarity chapters, overview
// categories, and search entries) lives in src/data/relationshipIndex.js so
// the overview cards, deep-link routing, and global search cannot drift apart.
// The full educational content stays in the tab components (Clarity, Patterns,
// Practice, Foundations).
//
// Every screen in the hub is addressed by ?section= and nothing is copied into
// component state: tabs, chapters, concepts, and patterns are all derived from
// the URL through resolveSection(). Switching tabs pushes a new URL, so each
// step gets its own history entry and back/forward/refresh/sharing all behave.
//
// The hub owns the page chrome for every tab — background and the sticky top
// bar with the back button and tab switcher — so the tabs render content only.
import { useEffect } from "react";
import RelationshipClarityPortal from "./RelationshipClarityPortal";
import RelationshipPatterns from "./RelationshipPatterns";
import RelationshipPractice from "./RelationshipPractice";
import {
  clarityChapterFor,
  clarityChapters,
  relationshipCategories,
  relationshipSectionsById,
} from "./data/relationshipIndex";
import { relationshipPatterns, relationshipPatternsById } from "./data/relationshipPatterns";
import { resolveSection, sectionForTab } from "./lib/relationshipRouting";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "clarity", label: "Clarity" },
  { id: "patterns", label: "Patterns" },
  { id: "practice", label: "Practice" },
];

const PARTS = [
  {
    id: "clarity",
    label: "Clarity",
    question: "What is happening?",
    text: "Short chapters for confusing moments — mixed signals, attraction, red flags, standards, and what to say next.",
    meta: `${clarityChapters.length} chapters · ${clarityChapters.reduce((n, c) => n + c.concepts.length, 0)} topics`,
    accent: "from-rose-500/20",
  },
  {
    id: "patterns",
    label: "Patterns",
    question: "Why does it keep happening?",
    text: "A field guide to the loops underneath connection — attachment, neediness, pursuit and withdrawal, conflict.",
    meta: `${relationshipPatterns.length} patterns`,
    accent: "from-violet-500/20",
  },
  {
    id: "practice",
    label: "Practice",
    question: "How do I do this well?",
    text: "Foundations, communication and repair skills, consent, marriage, relationship dynamics, and scripting.",
    meta: "5 sections",
    accent: "from-sky-500/15",
  },
];

const QUICK_TOOLS = [
  { section: "pause-check", title: "Pause Check", text: "About to send a text? Check whether it comes from fear or security." },
  { section: "clarity-check", title: "Clarity Check", text: "Confused by an interaction? Run it through five calibration questions." },
  { section: "red-and-green-flags", title: "Red & Green Flags", text: "Not sure it is safe? Read the warning signs and their healthy versions." },
];

// Where the top bar's back button goes, and what the bar names the screen.
// Back always moves up one level: a chapter or pattern goes to its tab index,
// a tab goes to the overview, and the overview leaves the hub.
function describeScreen(tab, sub) {
  if (tab === "clarity") {
    const chapter = clarityChapterFor(sub);
    return chapter
      ? { title: chapter.title, back: { label: "Clarity", section: "clarity" } }
      : { title: "Relationship Clarity", back: { label: "Overview", section: null } };
  }
  if (tab === "patterns") {
    const pattern = sub ? relationshipPatternsById[sub] : null;
    return pattern
      ? { title: pattern.name, back: { label: "Patterns", section: "patterns" } }
      : { title: "Relationship Patterns", back: { label: "Overview", section: null } };
  }
  if (tab === "practice") {
    // A skill-area link ("skills-consent") is still the Skills screen.
    const title = relationshipSectionsById[sub?.startsWith("skills-") ? "skills" : sub]?.title;
    return { title: title ? `Practice · ${title}` : "Relationship Practice", back: { label: "Overview", section: null } };
  }
  return { title: "Overview", back: null };
}

function HubTopBar({ tab, title, backLabel, onBackClick, onSelectTab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0511]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2.5 px-4 py-2.5 sm:px-6 md:flex-nowrap md:py-3">
        {onBackClick && (
          <button
            type="button"
            onClick={onBackClick}
            aria-label={`Back to ${backLabel}`}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] pl-2.5 pr-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60"
          >
            <span aria-hidden className="text-base leading-none">←</span>
            <span>{backLabel}</span>
          </button>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-200/70">Relationship Hub</p>
          <p className="truncate text-sm font-semibold text-white">{title}</p>
        </div>
        <nav
          aria-label="Relationship Hub sections"
          className="order-last grid w-full grid-cols-4 gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:order-none md:flex md:w-auto"
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onSelectTab(t.id)}
                className={`min-h-9 rounded-full px-2 py-2 text-[13px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60 md:px-4 ${
                  active ? "bg-white text-slate-950 shadow" : "text-white/65 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Overview({ onOpenTab, onOpenSection }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/75">The complete relationship system</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">Relationship Hub</h1>
        <p className="mt-4 text-[15px] leading-7 text-white/65 sm:text-lg sm:leading-8">
          Love is bigger than sex, chakra, or psychology alone. Attachment, dating, intimacy, boundaries, heartbreak, and the
          patterns underneath them live here — organized into three parts, each answering one question.
        </p>
      </header>

      <section aria-labelledby="hub-parts" className="mt-8">
        <h2 id="hub-parts" className="sr-only">The three parts</h2>
        <ol className="grid gap-3 md:grid-cols-3">
          {PARTS.map((part, index) => (
            <li key={part.id}>
              <button
                type="button"
                onClick={() => onOpenTab(part.id)}
                className={`group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br ${part.accent} to-white/[0.03] p-5 text-left transition hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60`}
              >
                <span className="flex items-center justify-between text-xs font-semibold text-white/55">
                  <span>Part {index + 1} · {part.label}</span>
                  <span>{part.meta}</span>
                </span>
                <span className="mt-3 text-xl font-semibold text-white">{part.question}</span>
                <span className="mt-2 flex-1 text-sm leading-6 text-white/60">{part.text}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/75 transition group-hover:text-white">
                  Open {part.label} <span aria-hidden>→</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="hub-tools" className="mt-10">
        <h2 id="hub-tools" className="text-lg font-semibold text-white sm:text-xl">In the moment</h2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {QUICK_TOOLS.map((tool) => (
            <button
              key={tool.section}
              type="button"
              onClick={() => onOpenSection(tool.section)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-rose-300/30 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60"
            >
              <span className="block text-[15px] font-semibold text-white">{tool.title} <span aria-hidden className="text-white/55">→</span></span>
              <span className="mt-1 block text-sm leading-6 text-white/58">{tool.text}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="hub-topics" className="mt-12">
        <div className="mb-4">
          <h2 id="hub-topics" className="text-lg font-semibold text-white sm:text-xl">Browse by topic</h2>
          <p className="mt-1 text-sm text-white/55">Jump straight to a subject — each opens the part of the hub that covers it.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {relationshipCategories.map((cat) => (
            <div key={cat.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-[15px] font-semibold text-white">{cat.title}</h3>
              {cat.summary && <p className="mt-1 text-sm leading-6 text-white/55">{cat.summary}</p>}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cat.chips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => onOpenSection(chip.section)}
                    className="min-h-8 rounded-full border border-rose-300/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-100/85 transition hover:border-rose-300/50 hover:bg-rose-500/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70"
                  >
                    {chip.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function RelationshipHub({ onBack, onNavigate, initialSection }) {
  const { tab, sub } = resolveSection(initialSection);

  // Every move inside the hub goes through the app router (?section=…), so the
  // URL always describes what is on screen and browser back/forward walk the
  // steps the visitor actually took.
  const openSection = (section) => {
    if (onNavigate) onNavigate("relationshiphub", section ? { section } : {});
  };
  const openTab = (id) => openSection(sectionForTab(id));

  const screen = describeScreen(tab, sub);

  // Name the tab after the screen so history, bookmarks, and shared links read
  // as the page they open. App sets the portal-level title before this runs
  // (a layout effect) and sets the next page's title when the hub closes.
  useEffect(() => {
    document.title = tab === "overview"
      ? "Relationship Hub · Sacred Pathways"
      : `${screen.title} · Relationship Hub · Sacred Pathways`;
  }, [tab, screen.title]);
  const back = screen.back
    ? { label: screen.back.label, onClick: () => openSection(screen.back.section) }
    : onBack
      ? { label: "Home", onClick: onBack }
      : null;

  let content;
  if (tab === "clarity") {
    content = <RelationshipClarityPortal initialSection={sub} onOpenSection={openSection} />;
  } else if (tab === "patterns") {
    content = <RelationshipPatterns onOpenSection={openSection} initialSection={sub} />;
  } else if (tab === "practice") {
    content = <RelationshipPractice initialSection={sub} onOpenSection={openSection} />;
  } else {
    content = <Overview onOpenTab={openTab} onOpenSection={openSection} />;
  }

  return (
    <div className="relative min-h-screen bg-[#0a0511] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-violet-600/12 blur-3xl" />
      </div>
      <HubTopBar
        tab={tab}
        title={screen.title}
        backLabel={back?.label}
        onBackClick={back?.onClick}
        onSelectTab={(id) => openTab(id === "overview" ? null : id)}
      />
      <main id="main" className="relative">{content}</main>
    </div>
  );
}
