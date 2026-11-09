import { useState, useMemo, useEffect } from 'react';
import {
  codexEntries,
  CODEX_CATEGORIES,
  CODEX_TYPES,
  CODEX_STATS,
  inCodexCategory,
} from './data/infernalCodex';
import { foldText, indexLetter, searchEntries } from './lib/demonologySearch';
import './InfernalCodex.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const BY_ID = new Map(codexEntries.map((e) => [e.id, e]));

const SEARCH_FIELDS = ['name', 'aliases', 'title', 'explanation', 'tradition', 'symbolism', 'category', 'type', 'tags'];

// Letters that actually have an entry, for enabling/disabling A–Z jumps.
// Diacritics are ignored, so "Ōni" would file under O and "ʿIfrīt" under I.
const AVAILABLE_LETTERS = new Set(codexEntries.map((e) => indexLetter(e.name)));

// Stable alphabetical order for the entity index.
const INDEX_ENTRIES = [...codexEntries].sort((a, b) =>
  foldText(a.name).localeCompare(foldText(b.name))
);

// Goetic spirits keep their grimoire order inside the Ars Goetia group, with
// the catalogue card first.
function groupOrder(category, entries) {
  if (category !== 'Ars Goetia') return entries;
  return [...entries].sort((a, b) => (a.goetia?.n ?? 0) - (b.goetia?.n ?? 0));
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CodexCard({ entry, expanded, onToggle, flash, onOpenArticle }) {
  const detailId = `ic-detail-${entry.id}`;
  return (
    <div id={`ic-card-${entry.id}`} className={`ic-card ${flash ? 'flash' : ''}`}>
      <div className="ic-card-top">
        <span className="ic-card-name">{entry.name}</span>
        <span className="ic-type-badge">{entry.goetia ? `Goetia #${entry.goetia.n}` : entry.type}</span>
      </div>
      <div className="ic-card-title">{entry.title}</div>
      {entry.aliases?.length > 0 && (
        <div className="ic-card-aliases">Also: {entry.aliases.join(', ')}</div>
      )}
      <p className="ic-card-explain">{entry.explanation}</p>

      <div className="ic-card-actions">
        <button
          type="button"
          className="ic-toggle"
          onClick={() => onToggle(entry.id)}
          aria-expanded={expanded}
          aria-controls={detailId}
        >
          {expanded ? 'Close explanation' : 'Open explanation'}
        </button>
        {entry.article && onOpenArticle && (
          <button type="button" className="ic-toggle ic-article-link" onClick={() => onOpenArticle(entry.article)}>
            Full article →
          </button>
        )}
      </div>

      {expanded && (
        <div id={detailId} className="ic-detail">
          <div>
            <div className="ic-field-label">Tradition / source family</div>
            <div className="ic-field-val">{entry.tradition}</div>
          </div>
          <div>
            <div className="ic-field-label">{entry.goetia && entry.type === 'Goetia' && !entry.article ? 'Name history' : 'Symbolism'}</div>
            <div className="ic-field-val">{entry.symbolism}</div>
          </div>
          {entry.goetia && (
            <div>
              <div className="ic-field-label">Ars Goetia record</div>
              <div className="ic-field-val">Spirit {entry.goetia.n} of 72 · {entry.goetia.rank.join(' & ')}</div>
            </div>
          )}
          <div>
            <div className="ic-field-label">Classification</div>
            <div className="ic-field-val">{entry.type} · {entry.category}{entry.alsoIn ? ` (also ${entry.alsoIn.join(', ')})` : ''}</div>
          </div>
          <div>
            <div className="ic-field-label">Associated titles / tags</div>
            <div className="ic-tags">
              <span className="ic-tag cat">{entry.category}</span>
              {entry.tags.map((t) => (
                <span key={t} className="ic-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InfernalCodex({ onBack, onNavigate, initialEntry, embedded = false }) {
  const startEntry = initialEntry && BY_ID.has(initialEntry) ? initialEntry : null;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [activeLetter, setActiveLetter] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set(startEntry ? [startEntry] : []));
  const [activeIndexId, setActiveIndexId] = useState(startEntry);
  const [flashId, setFlashId] = useState(startEntry);
  // Mobile-only: the long entity index starts collapsed.
  const [indexOpen, setIndexOpen] = useState(false);

  // Jump straight to an entry from the index: clear filters, expand, scroll, flash.
  const jumpToEntry = (id) => {
    setSearch('');
    setActiveCategory('All');
    setActiveType('All');
    setActiveLetter(null);
    setActiveIndexId(id);
    setExpanded((prev) => new Set(prev).add(id));
    setFlashId(id);
    setIndexOpen(false);
  };

  // Follow later changes to the deep-link target.
  const [lastEntry, setLastEntry] = useState(initialEntry);
  if (initialEntry !== lastEntry) {
    setLastEntry(initialEntry);
    if (initialEntry && BY_ID.has(initialEntry)) jumpToEntry(initialEntry);
  }

  const visible = useMemo(() => {
    const filtered = codexEntries.filter((e) => {
      if (activeCategory !== 'All' && !inCodexCategory(e, activeCategory)) return false;
      if (activeType !== 'All' && e.type !== activeType) return false;
      if (activeLetter && indexLetter(e.name) !== activeLetter) return false;
      return true;
    });
    return searchEntries(filtered, search, SEARCH_FIELDS);
  }, [search, activeCategory, activeType, activeLetter]);

  // Group visible entries by category, preserving the canonical order. An
  // entry appears under its own category, and under an `alsoIn` category only
  // when that category is the active filter (so it never shows twice).
  const groups = useMemo(() => {
    return CODEX_CATEGORIES.map((cat) => ({
      name: cat,
      entries: groupOrder(
        cat,
        visible.filter((e) => e.category === cat || (activeCategory === cat && inCodexCategory(e, cat)))
      ),
    })).filter((g) => g.entries.length > 0);
  }, [visible, activeCategory]);

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // After filters reset and the card is rendered, scroll to and flash it.
  useEffect(() => {
    if (!flashId) return;
    // Wait a frame so the host atlas's scroll reset (on a deep link) runs first.
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(`ic-card-${flashId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    const t = setTimeout(() => setFlashId(null), 1600);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t);
    };
  }, [flashId]);

  const resetAll = () => {
    setSearch('');
    setActiveCategory('All');
    setActiveType('All');
    setActiveLetter(null);
    setActiveIndexId(null);
  };

  const openArticle = onNavigate ? (articleId) => onNavigate('demonology', { section: articleId }) : undefined;

  const filtersActive =
    search.trim() || activeCategory !== 'All' || activeType !== 'All' || activeLetter;

  return (
    <div className={`ic-root ${embedded ? 'ic-root-embedded' : ''}`}>
      {/* Hero */}
      <div className="ic-hero">
        {onBack && (
          <button className="ic-back" onClick={onBack}>← Back</button>
        )}
        <div className="ic-eyebrow">✦ Working Navigable Concept Database</div>
        <h1 className="ic-hero-title">Infernal &amp; Mythic Codex</h1>
        <p className="ic-hero-sub">
          Use the category buttons, entity index, search bar, or A–Z links. Every concept
          explanation is visible on its card; deeper details open under “Open explanation.”
          Search ignores accents and knows alternate spellings (Bael / Baal, Yokai / Yōkai).
        </p>
        <div className="ic-disclaimer">
          <strong>Educational reference only.</strong> Short descriptive cards on demons, spirits,
          deities, sins, and concepts — history, symbolism, and classification. Goetic “offices” are
          summaries of what a 17th-century grimoire claims. No summoning, invocation, or ritual content.
          {onNavigate && (
            <>
              {' '}For long-form articles, see the{' '}
              <button className="ic-atlas-link" onClick={() => onNavigate('demonology')}>
                Demonology &amp; Spiritual Adversaries
              </button>{' '}atlas.
            </>
          )}
        </div>

        {/* Stats */}
        <div className="ic-stats">
          <div className="ic-stat">
            <div className="ic-stat-num">{codexEntries.length}</div>
            <div className="ic-stat-label">Total entries</div>
          </div>
          <div className="ic-stat">
            <div className="ic-stat-num" aria-live="polite">{visible.length}</div>
            <div className="ic-stat-label">Shown</div>
          </div>
          <div className="ic-stat">
            <div className="ic-stat-num">{CODEX_STATS.goetiaCovered}/{CODEX_STATS.goetiaReference}</div>
            <div className="ic-stat-label">Goetic spirits</div>
          </div>
          <div className="ic-stat">
            <div className="ic-stat-num">{CODEX_STATS.princesAndSins}</div>
            <div className="ic-stat-label">Princes / Sins</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="ic-controls">
        <div className="ic-control-block">
          <div className="ic-control-label" id="ic-search-label">Search everything</div>
          <div className="ic-search-wrap">
            <span className="ic-search-icon"><SearchIcon /></span>
            <input
              className="ic-search"
              type="search"
              aria-labelledby="ic-search-label"
              placeholder="Search names, spellings, traditions, tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="ic-control-block">
          <div className="ic-control-label" id="ic-type-label">Type filter</div>
          <div className="ic-chips" role="group" aria-labelledby="ic-type-label">
            <button
              type="button"
              className={`ic-chip ${activeType === 'All' ? 'active' : ''}`}
              aria-pressed={activeType === 'All'}
              onClick={() => setActiveType('All')}
            >All</button>
            {CODEX_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`ic-chip ${activeType === t ? 'active' : ''}`}
                aria-pressed={activeType === t}
                onClick={() => setActiveType((prev) => (prev === t ? 'All' : t))}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="ic-control-block">
          <div className="ic-control-label" id="ic-cat-label">Categories</div>
          <div className="ic-chips" role="group" aria-labelledby="ic-cat-label">
            <button
              type="button"
              className={`ic-chip ${activeCategory === 'All' ? 'active' : ''}`}
              aria-pressed={activeCategory === 'All'}
              onClick={() => setActiveCategory('All')}
            >All</button>
            {CODEX_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`ic-chip ${activeCategory === c ? 'active' : ''}`}
                aria-pressed={activeCategory === c}
                onClick={() => setActiveCategory((prev) => (prev === c ? 'All' : c))}
              >{c}</button>
            ))}
          </div>
        </div>

        <div className="ic-control-block">
          <div className="ic-control-label" id="ic-az-label">A–Z jump</div>
          <div className="ic-az" role="group" aria-labelledby="ic-az-label">
            {ALPHABET.map((letter) => {
              const has = AVAILABLE_LETTERS.has(letter);
              return (
                <button
                  key={letter}
                  type="button"
                  className={`ic-az-letter ${activeLetter === letter ? 'active' : ''} ${has ? '' : 'disabled'}`}
                  aria-pressed={activeLetter === letter}
                  aria-disabled={!has}
                  onClick={() => {
                    if (!has) return;
                    setActiveCategory('All');
                    setActiveType('All');
                    setSearch('');
                    setActiveLetter((prev) => (prev === letter ? null : letter));
                  }}
                >{letter}</button>
              );
            })}
            {filtersActive && (
              <button type="button" className="ic-clear" onClick={resetAll}>Clear filters</button>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="ic-layout">
        {/* Entity index */}
        <button
          type="button"
          className="ic-index-toggle"
          onClick={() => setIndexOpen((o) => !o)}
          aria-expanded={indexOpen}
          aria-controls="ic-entity-index"
        >
          <span>☰ Entity index ({INDEX_ENTRIES.length})</span>
          <span className={`ic-index-toggle-arrow ${indexOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
        </button>
        <nav id="ic-entity-index" className={`ic-index ${indexOpen ? 'ic-index-open' : ''}`} aria-label="Entity index">
          <div className="ic-index-title">Entity Index</div>
          {INDEX_ENTRIES.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`ic-index-item ${activeIndexId === e.id ? 'active' : ''}`}
              aria-current={activeIndexId === e.id ? 'true' : undefined}
              onClick={() => jumpToEntry(e.id)}
            >{e.name}</button>
          ))}
        </nav>

        {/* Cards grouped by category */}
        <div>
          {groups.length === 0 ? (
            <div className="ic-empty">
              <div className="ic-empty-icon" aria-hidden="true">✦</div>
              <div>No entries match those filters.</div>
              <button type="button" className="ic-clear" style={{ marginTop: '1rem' }} onClick={resetAll}>
                Clear filters
              </button>
            </div>
          ) : (
            groups.map((g) => (
              <section key={g.name} className="ic-group" aria-label={g.name}>
                <div className="ic-group-head">
                  <h2 className="ic-group-name">{g.name}</h2>
                  <span className="ic-group-count">
                    {g.entries.length} {g.entries.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>
                <div className="ic-grid">
                  {g.entries.map((e) => (
                    <CodexCard
                      key={e.id}
                      entry={e}
                      expanded={expanded.has(e.id)}
                      onToggle={toggle}
                      flash={flashId === e.id}
                      onOpenArticle={openArticle}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
