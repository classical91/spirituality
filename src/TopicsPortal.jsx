// Spiritual Topics & Dictionary — an index, concept guide, comparison tool, and
// navigation layer over the rest of Sacred Pathways. It holds no portal content
// of its own beyond concise definitions; every deeper dive links out to an
// existing portal via onNavigate(portalId, { section }).
//
// Routing note: opening a topic goes through the app's existing onNavigate, so
// the address becomes /topics?section=<id> and browser back/forward "just work"
// (App re-renders this portal with the new initialSection). No custom history
// handling lives here.
import { useEffect, useMemo, useState } from 'react';
import { spiritualTopics, spiritualTopicsById, TOPIC_CATEGORIES } from './data/spiritualTopics';
import { portalsById } from './data/portals';
import { getRecentTopics, recordTopicVisit } from './lib/storage';
import TopicCard from './components/TopicCard';
import TopicDetail from './components/TopicDetail';

const PORTAL_TITLES = Object.fromEntries(
  Object.values(portalsById).map((p) => [p.id, p.titleFlat || p.title])
);

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function matchesQuery(topic, q) {
  if (!q) return true;
  const haystack = [
    topic.title,
    topic.summary,
    topic.category,
    ...(topic.tags || []),
    ...(topic.distinctions || []).map((d) => d.label),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

function BrowseView({ onOpen, notFoundId }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [letter, setLetter] = useState('All');
  const [recentIds] = useState(() => getRecentTopics());

  const q = query.trim().toLowerCase();

  const availableLetters = useMemo(() => {
    const set = new Set(spiritualTopics.map((t) => t.title[0].toUpperCase()));
    return ALPHABET.filter((l) => set.has(l));
  }, []);

  const results = useMemo(() => {
    return spiritualTopics
      .filter((t) => matchesQuery(t, q))
      .filter((t) => category === 'All' || t.category === category)
      .filter((t) => letter === 'All' || t.title[0].toUpperCase() === letter)
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [q, category, letter]);

  const recentTopics = recentIds
    .map((id) => spiritualTopicsById[id])
    .filter(Boolean)
    .slice(0, 6);

  const chipStyle = (active) => ({
    border: `1px solid ${active ? 'rgba(196,165,255,0.5)' : 'rgba(255,255,255,0.14)'}`,
    background: active ? 'rgba(196,165,255,0.18)' : 'rgba(255,255,255,0.05)',
    color: active ? '#f1eeff' : '#a89ec4',
    borderRadius: 999,
    padding: '6px 13px',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  });

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(16px, 4vw, 28px) 72px' }}>
      <header style={{ margin: '4px 0 24px' }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
            border: '1px solid rgba(196,165,255,0.3)', background: 'rgba(196,165,255,0.12)',
            color: '#d8ceff', borderRadius: 999, padding: '5px 12px',
            fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em',
          }}
        >
          ◇ Concept Library
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 950, letterSpacing: '-0.05em', lineHeight: 0.98, margin: '0 0 14px' }}>
          Spiritual Topics &amp; Dictionary
        </h1>
        <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#9890b8', maxWidth: 640, margin: 0 }}>
          Definitions, comparisons, practices, and reflection questions for the spiritual, emotional,
          relationship, and self-concept terms used across Sacred Pathways — each one linking out to the
          portals where you can go deeper.
        </p>
      </header>

      <div style={{ position: 'relative', marginBottom: 18 }}>
        <label htmlFor="topic-search" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Search topics
        </label>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px',
            borderRadius: 999, border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.05rem', color: '#a89ec4' }}>⌕</span>
          <input
            id="topic-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics — try 'receptivity', 'sovereignty', 'contentment'"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f1eeff', fontSize: '0.95rem', fontFamily: 'inherit' }}
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} style={{ ...chipStyle(false), padding: '4px 10px', fontSize: '0.72rem' }}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
        <button type="button" aria-pressed={category === 'All'} onClick={() => setCategory('All')} style={chipStyle(category === 'All')}>
          All categories
        </button>
        {TOPIC_CATEGORIES.map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} style={chipStyle(category === c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 24 }}>
        <button type="button" aria-pressed={letter === 'All'} onClick={() => setLetter('All')} style={{ ...chipStyle(letter === 'All'), padding: '5px 11px', fontSize: '0.76rem' }}>
          A–Z
        </button>
        {availableLetters.map((l) => (
          <button key={l} type="button" aria-pressed={letter === l} onClick={() => setLetter(l)} style={{ ...chipStyle(letter === l), padding: '5px 10px', fontSize: '0.76rem', minWidth: 32 }}>
            {l}
          </button>
        ))}
      </div>

      {notFoundId && (
        <div
          role="status"
          style={{
            marginBottom: 22, borderRadius: 16, border: '1px dashed rgba(251,146,60,0.32)',
            background: 'rgba(251,146,60,0.08)', color: '#fdba74', padding: '12px 16px', fontSize: '0.86rem',
          }}
        >
          No topic found for “{notFoundId}”. Browse the library below instead.
        </div>
      )}

      {recentTopics.length > 0 && !q && category === 'All' && letter === 'All' && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a89ec4', marginBottom: 10 }}>
            Recently viewed
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {recentTopics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onOpen(t.id)}
                style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.06)', color: '#d8ceff', borderRadius: 999, padding: '6px 13px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <p aria-live="polite" style={{ fontSize: '0.78rem', color: '#7a7096', margin: '0 0 14px' }}>
        {results.length} {results.length === 1 ? 'topic' : 'topics'}
        {(q || category !== 'All' || letter !== 'All') ? ' match your filters' : ' in the library'}
      </p>

      {results.length > 0 ? (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}>
          {results.map((topic) => (
            <TopicCard key={topic.id} topic={topic} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '36px 24px', borderRadius: 24, border: '1px dashed rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.03)', color: '#a89ec4', maxWidth: 480,
          }}
        >
          Nothing matched those filters. Try a broader term, or reset the category and A–Z filters.
        </div>
      )}
    </div>
  );
}

export default function TopicsPortal({ onBack, onNavigate, initialSection }) {
  const topic = initialSection ? spiritualTopicsById[initialSection] : null;
  const notFoundId = initialSection && !topic ? initialSection : null;

  useEffect(() => {
    if (topic) recordTopicVisit(topic.id);
  }, [topic]);

  const openTopic = (id) => onNavigate?.('topics', { section: id });
  const backToLibrary = () => onNavigate?.('topics');

  return (
    <div
      style={{
        position: 'relative', minHeight: '100vh', overflow: 'hidden',
        background: '#07090f', color: '#f1eeff',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(circle at 18% 12%, rgba(168,85,247,0.2), transparent 34%), radial-gradient(circle at 84% 10%, rgba(96,165,250,0.14), transparent 30%)',
        }}
      />
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            position: 'fixed', left: 'max(16px, env(safe-area-inset-left))', top: 16, zIndex: 40,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(10,12,20,0.72)',
            backdropFilter: 'blur(14px)', color: '#fff', borderRadius: 999,
            padding: '8px 15px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <span aria-hidden="true">←</span> Back
        </button>
      )}

      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px, 8vw, 84px) 0 0' }}>
        {topic ? (
          <TopicDetail
            topic={topic}
            topicsById={spiritualTopicsById}
            portalTitles={PORTAL_TITLES}
            onOpenRelated={openTopic}
            onNavigatePortal={onNavigate}
            onBackToLibrary={backToLibrary}
          />
        ) : (
          <BrowseView onOpen={openTopic} notFoundId={notFoundId} />
        )}
      </div>
    </div>
  );
}
