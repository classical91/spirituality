import { useState, useMemo } from 'react';
import { angels, ANGEL_FILTERS } from './data/angels';
import './AngelologyAtlas.css';

// Group angels by category for the sidebar
const BY_CATEGORY = ANGEL_FILTERS.slice(1).map((cat) => ({
  label: cat,
  entries: angels.filter((a) => a.category === cat),
}));

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function AngelCard({ angel, isActive, onClick }) {
  return (
    <div
      className={`ao-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(angel.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(angel.id)}
    >
      <div className="ao-card-head">
        <span className="ao-card-icon">{angel.icon}</span>
        <div className="ao-card-meta">
          <div className="ao-card-name">{angel.name}</div>
          <div className="ao-card-role">{angel.role}</div>
        </div>
      </div>
      <p className="ao-card-summary">{angel.summary}</p>
      <div className="ao-card-footer">
        <span className="ao-card-cat">{angel.category}</span>
        <span className="ao-card-trad">{angel.traditions.slice(0, 2).join(' · ')}</span>
      </div>
    </div>
  );
}

function DetailPanel({ angel }) {
  const assoc = angel.associations || {};
  const colorStr = Array.isArray(assoc.colors) ? assoc.colors.join(', ') : (assoc.colors || '—');
  const symbolStr = Array.isArray(assoc.symbols) ? assoc.symbols.join(', ') : (assoc.symbols || '—');

  return (
    <div className="ao-detail">
      <div className="ao-detail-header">
        <div className="ao-detail-hero">
          <span className="ao-detail-icon">{angel.icon}</span>
          <div className="ao-detail-title-wrap">
            <div className="ao-detail-name">{angel.name}</div>
            {angel.originalName && (
              <div className="ao-detail-original">{angel.originalName}</div>
            )}
            <div className="ao-detail-role">{angel.role}</div>
          </div>
        </div>
        <p className="ao-detail-summary">{angel.summary}</p>
      </div>

      <div className="ao-detail-body">
        {/* Traditions */}
        <div>
          <div className="ao-section-title">Traditions</div>
          <div className="ao-traditions">
            {angel.traditions.map((t) => (
              <span key={t} className="ao-trad-chip">{t}</span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div>
          <div className="ao-section-title">Overview</div>
          <p className="ao-overview">{angel.overview}</p>
        </div>

        {/* Domains */}
        {angel.domains && angel.domains.length > 0 && (
          <div>
            <div className="ao-section-title">Domains & Attributes</div>
            <div className="ao-domains">
              {angel.domains.map((d) => (
                <span key={d} className="ao-domain-pill">{d}</span>
              ))}
            </div>
          </div>
        )}

        {/* Associations */}
        {assoc && (
          <div>
            <div className="ao-section-title">Associations</div>
            <div className="ao-assoc-grid">
              {assoc.element && (
                <div className="ao-assoc-item">
                  <div className="ao-assoc-key">Element</div>
                  <div className="ao-assoc-val">{assoc.element}</div>
                </div>
              )}
              {assoc.day && (
                <div className="ao-assoc-item">
                  <div className="ao-assoc-key">Day</div>
                  <div className="ao-assoc-val">{assoc.day}</div>
                </div>
              )}
              {assoc.colors && assoc.colors.length > 0 && (
                <div className="ao-assoc-item">
                  <div className="ao-assoc-key">Colors</div>
                  <div className="ao-assoc-val">{colorStr}</div>
                </div>
              )}
              {assoc.symbols && assoc.symbols.length > 0 && (
                <div className="ao-assoc-item">
                  <div className="ao-assoc-key">Symbols</div>
                  <div className="ao-assoc-val">{symbolStr}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scriptural Texts */}
        {angel.texts && angel.texts.length > 0 && (
          <div>
            <div className="ao-section-title">Scriptural & Sacred Texts</div>
            <div className="ao-texts">
              {angel.texts.map((t) => (
                <span key={t} className="ao-text-chip">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Invocation */}
        {angel.invocation && (
          <div>
            <div className="ao-section-title">Invocation & Practice</div>
            <div className="ao-invocation">{angel.invocation}</div>
          </div>
        )}

        {/* Caution */}
        {angel.caution && (
          <div>
            <div className="ao-caution-label">Grounding Note</div>
            <div className="ao-caution">{angel.caution}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AngelologyAtlas({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(null);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return angels.filter((a) => {
      const catMatch = activeFilter === 'All' || a.category === activeFilter;
      if (!catMatch) return false;
      if (!q) return true;
      const hay = [a.name, a.originalName, a.role, a.summary, a.overview, a.category, ...(a.traditions || []), ...(a.domains || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [activeFilter, search]);

  const activeAngel = activeId ? angels.find((a) => a.id === activeId) : null;

  const handleSelect = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="ao-root">
      {/* Hero */}
      <div className="ao-hero">
        {onBack && (
          <button className="ao-back" onClick={onBack}>
            ← Back
          </button>
        )}
        <div className="ao-orb-wrap">
          <div className="ao-orb" />
          <div className="ao-ring ao-ring-1" />
          <div className="ao-ring ao-ring-2" />
          <div className="ao-ring ao-ring-3" />
        </div>
        <h1 className="ao-hero-title">Angelology Atlas</h1>
        <p className="ao-hero-subtitle">
          Celestial messengers across traditions — Archangels, Celestial Hierarchy, Kabbalistic angels,
          Islamic Malak, Zoroastrian Amesha Spentas, and Apocryphal figures.
        </p>
        <div className="ao-search-wrap">
          <span className="ao-search-icon"><SearchIcon /></span>
          <input
            className="ao-search"
            type="text"
            placeholder="Search angels, domains, traditions…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveId(null);
            }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="ao-filters">
        {ANGEL_FILTERS.map((f) => (
          <button
            key={f}
            className={`ao-chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter(f);
              setActiveId(null);
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="ao-layout">
        {/* Sidebar */}
        <nav className="ao-sidebar">
          {BY_CATEGORY.map(({ label, entries }) => {
            const filtered = entries.filter(
              (a) =>
                (activeFilter === 'All' || a.category === activeFilter) &&
                visible.some((v) => v.id === a.id)
            );
            if (filtered.length === 0) return null;
            return (
              <div key={label}>
                <div className="ao-sidebar-label">{label}</div>
                {filtered.map((a) => (
                  <button
                    key={a.id}
                    className={`ao-sidebar-item ${activeId === a.id ? 'active' : ''}`}
                    onClick={() => handleSelect(a.id)}
                  >
                    <span className="ao-sidebar-icon">{a.icon}</span>
                    <span className="ao-sidebar-name">
                      {a.name}
                      <span className="ao-sidebar-cat">{a.traditions.slice(0, 2).join(' · ')}</span>
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Content */}
        <div>
          {activeAngel ? (
            <DetailPanel angel={activeAngel} />
          ) : (
            <div className="ao-grid">
              {visible.length === 0 ? (
                <div className="ao-empty">
                  <div className="ao-empty-icon">✦</div>
                  <div className="ao-empty-text">No angels found for that search.</div>
                </div>
              ) : (
                visible.map((a) => (
                  <AngelCard
                    key={a.id}
                    angel={a}
                    isActive={activeId === a.id}
                    onClick={handleSelect}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
