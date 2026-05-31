import { useState, useMemo, useEffect } from 'react';
import {
  codexEntries,
  CODEX_CATEGORIES,
  CODEX_TYPES,
  CODEX_STATS,
} from './data/infernalCodex';
import './InfernalCodex.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Letters that actually have an entry, for enabling/disabling A–Z jumps.
const AVAILABLE_LETTERS = new Set(
  codexEntries.map((e) => e.name[0].toUpperCase())
);

// Stable alphabetical order for the entity index.
const INDEX_ENTRIES = [...codexEntries].sort((a, b) =>
  a.name.localeCompare(b.name)
);

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CodexCard({ entry, expanded, onToggle, flash }) {
  return (
    <div id={`ic-card-${entry.id}`} className={`ic-card ${flash ? 'flash' : ''}`}>
      <div className="ic-card-top">
        <span className="ic-card-name">{entry.name}</span>
        <span className="ic-type-badge">{entry.type}</span>
      </div>
      <div className="ic-card-title">{entry.title}</div>
      <p className="ic-card-explain">{entry.explanation}</p>

      <button className="ic-toggle" onClick={() => onToggle(entry.id)}>
        {expanded ? 'Close explanation' : 'Open explanation'}
      </button>

      {expanded && (
        <div className="ic-detail">
          <div>
            <div className="ic-field-label">Tradition / source family</div>
            <div className="ic-field-val">{entry.tradition}</div>
          </div>
          <div>
            <div className="ic-field-label">Symbolism</div>
            <div className="ic-field-val">{entry.symbolism}</div>
          </div>
          <div>
            <div className="ic-field-label">Classification</div>
            <div className="ic-field-val">{entry.type} · {entry.category}</div>
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

export default function InfernalCodex({ onBack, onNavigate }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [activeLetter, setActiveLetter] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set());
  const [activeIndexId, setActiveIndexId] = useState(null);
  const [flashId, setFlashId] = useState(null);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return codexEntries.filter((e) => {
      if (activeCategory !== 'All' && e.category !== activeCategory) return false;
      if (activeType !== 'All' && e.type !== activeType) return false;
      if (activeLetter && e.name[0].toUpperCase() !== activeLetter) return false;
      if (q) {
        const hay = [e.name, e.title, e.explanation, e.tradition, e.symbolism, e.category, e.type, ...e.tags]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, activeCategory, activeType, activeLetter]);

  // Group visible entries by category, preserving the canonical order.
  const groups = useMemo(() => {
    return CODEX_CATEGORIES.map((cat) => ({
      name: cat,
      entries: visible.filter((e) => e.category === cat),
    })).filter((g) => g.entries.length > 0);
  }, [visible]);

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Jump straight to an entry from the index: clear filters, expand, scroll, flash.
  const jumpToEntry = (id) => {
    setSearch('');
    setActiveCategory('All');
    setActiveType('All');
    setActiveLetter(null);
    setActiveIndexId(id);
    setExpanded((prev) => new Set(prev).add(id));
    setFlashId(id);
  };

  // After filters reset and the card is rendered, scroll to and flash it.
  useEffect(() => {
    if (!flashId) return;
    const el = document.getElementById(`ic-card-${flashId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const t = setTimeout(() => setFlashId(null), 1600);
    return () => clearTimeout(t);
  }, [flashId]);

  const resetAll = () => {
    setSearch('');
    setActiveCategory('All');
    setActiveType('All');
    setActiveLetter(null);
    setActiveIndexId(null);
  };

  const filtersActive =
    search.trim() || activeCategory !== 'All' || activeType !== 'All' || activeLetter;

  return (
    <div className="ic-root">
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
        </p>
        <div className="ic-disclaimer">
          <strong>Educational reference only.</strong> Short descriptive cards on demons, spirits,
          deities, sins, and concepts — history, symbolism, and classification. No summoning,
          invocation, or ritual content.
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
            <div className="ic-stat-num">{visible.length}</div>
            <div className="ic-stat-label">Shown</div>
          </div>
          <div className="ic-stat">
            <div className="ic-stat-num">{CODEX_STATS.goetiaReference}</div>
            <div className="ic-stat-label">Goetia reference</div>
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
          <div className="ic-control-label">Search everything</div>
          <div className="ic-search-wrap">
            <span className="ic-search-icon"><SearchIcon /></span>
            <input
              className="ic-search"
              type="text"
              placeholder="Search names, traditions, symbolism, tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="ic-control-block">
          <div className="ic-control-label">Type filter</div>
          <div className="ic-chips">
            <button
              className={`ic-chip ${activeType === 'All' ? 'active' : ''}`}
              onClick={() => setActiveType('All')}
            >All</button>
            {CODEX_TYPES.map((t) => (
              <button
                key={t}
                className={`ic-chip ${activeType === t ? 'active' : ''}`}
                onClick={() => setActiveType((prev) => (prev === t ? 'All' : t))}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="ic-control-block">
          <div className="ic-control-label">Categories</div>
          <div className="ic-chips">
            <button
              className={`ic-chip ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >All</button>
            {CODEX_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`ic-chip ${activeCategory === c ? 'active' : ''}`}
                onClick={() => setActiveCategory((prev) => (prev === c ? 'All' : c))}
              >{c}</button>
            ))}
          </div>
        </div>

        <div className="ic-control-block">
          <div className="ic-control-label">A–Z jump</div>
          <div className="ic-az">
            {ALPHABET.map((letter) => {
              const has = AVAILABLE_LETTERS.has(letter);
              return (
                <button
                  key={letter}
                  className={`ic-az-letter ${activeLetter === letter ? 'active' : ''} ${has ? '' : 'disabled'}`}
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
              <button className="ic-clear" onClick={resetAll}>Clear filters</button>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="ic-layout">
        {/* Entity index */}
        <nav className="ic-index">
          <div className="ic-index-title">Entity Index</div>
          {INDEX_ENTRIES.map((e) => (
            <button
              key={e.id}
              className={`ic-index-item ${activeIndexId === e.id ? 'active' : ''}`}
              onClick={() => jumpToEntry(e.id)}
            >{e.name}</button>
          ))}
        </nav>

        {/* Cards grouped by category */}
        <div>
          {groups.length === 0 ? (
            <div className="ic-empty">
              <div className="ic-empty-icon">✦</div>
              <div>No entries match those filters.</div>
              <button className="ic-clear" style={{ marginTop: '1rem' }} onClick={resetAll}>
                Clear filters
              </button>
            </div>
          ) : (
            groups.map((g) => (
              <section key={g.name} className="ic-group">
                <div className="ic-group-head">
                  <span className="ic-group-name">{g.name}</span>
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
