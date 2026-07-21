import { useState, useMemo, useRef, useEffect } from 'react';
import { demons, DEMON_FILTERS } from './data/demonology';
import './DemonologyAtlas.css';

// Quick lookup by id, for related-concept cross-links.
const BY_ID = Object.fromEntries(demons.map((d) => [d.id, d]));

// Group entries by category for the sidebar (in filter order).
const BY_CATEGORY = DEMON_FILTERS.slice(1).map((cat) => ({
  label: cat,
  entries: demons.filter((d) => d.category === cat),
}));

// Historical development of demonology, ancient Mesopotamia → modern.
const TIMELINE = [
  { era: 'c. 2000–1000 BCE', text: 'Mesopotamian incantation series (Utukkū Lemnūtu, Maqlû) catalogue ambivalent disease- and wind-spirits — the oldest documented demonology.' },
  { era: 'c. 1200–600 BCE', text: 'Canaanite and Near Eastern gods (Baal, Astarte, Moloch, Baal-Zebul) are condemned in Hebrew scripture; the demotion of rival deities begins.' },
  { era: 'c. 500–100 BCE', text: 'Persian (Zoroastrian) dualism and Second Temple Judaism (1 Enoch, Jubilees, the Scrolls) personify evil: the Watchers, Belial, Mastema, and "the satan" as a figure.' },
  { era: 'c. 1st–4th c. CE', text: 'The Greek daimon narrows to "demon"; the Gospels feature exorcism; Gnostic texts describe Archons and the Demiurge; the Testament of Solomon catalogues spirits.' },
  { era: 'c. 4th–6th c. CE', text: 'Desert monks map the eight logismoi (Evagrius); Augustine frames evil as privation; Gregory the Great fixes the seven deadly sins.' },
  { era: 'c. 11th–15th c.', text: 'Scholastic and medieval demonology classifies spirits (Psellos, Aquinas, Alfonso de Spina); the horned Devil iconography is assembled from older nature-gods.' },
  { era: 'c. 1500–1700', text: 'Renaissance grimoires — Weyer\'s "Pseudomonarchia Daemonum," Binsfeld\'s seven princes, the Lesser Key of Solomon — build the "infernal hierarchy" and the 72 Goetic spirits.' },
  { era: 'c. 1800–1900', text: 'Collin de Plancy\'s "Dictionnaire Infernal" illustrates demons; Mathers and Crowley edit and publish the Goetia, shaping all later popular demon-lists.' },
  { era: 'c. 1900–present', text: 'Depth psychology (Jung\'s shadow & archetypes), comparative religion, and folklore studies reread demons as symbols, projections, and cultural memory.' },
];

// Cross-tradition comparison of the demonic.
const COMPARISON = [
  { tradition: 'Mesopotamia', concept: 'Ambivalent spirits', nature: 'Amoral causes of disease & misfortune', response: 'Incantation, amulets, exorcist (āšipu)' },
  { tradition: 'Judaism', concept: 'Shedim / yetzer hara', nature: 'Diffuse spirits; inner evil inclination', response: 'Torah, repentance, ruling over the inclination' },
  { tradition: 'Christianity', concept: 'Fallen angels', nature: 'Created, fell by choice; tempt & accuse', response: 'Grace, virtue, exorcism; defeated in Christ' },
  { tradition: 'Islam', concept: 'Jinn / Iblis', nature: 'Free-willed beings of fire; some hostile', response: 'Quranic recitation, refuge, trust in God' },
  { tradition: 'Gnosticism', concept: 'Archons / Demiurge', nature: 'Jailers enforcing ignorance & confinement', response: 'Gnosis — awakening knowledge' },
  { tradition: 'Greece', concept: 'Daimon', nature: 'Neutral intermediary; can guide', response: 'Discernment; later moralized good/bad' },
  { tradition: 'Celtic', concept: 'Otherworld powers', nature: 'Sídhe, omens, mythic foes (not "demons")', response: 'Folk custom; later absorbed or demonized' },
];

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function EntryCard({ entry, isActive, onClick }) {
  return (
    <div
      className={`dm-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(entry.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(entry.id)}
    >
      <div className="dm-card-head">
        <span className="dm-card-icon">{entry.icon}</span>
        <div className="dm-card-meta">
          <div className="dm-card-name">{entry.name}</div>
          <div className="dm-card-role">{entry.role}</div>
        </div>
      </div>
      <p className="dm-card-summary">{entry.summary}</p>
      <div className="dm-card-footer">
        <span className="dm-card-cat">{entry.category}</span>
        <span className="dm-card-trad">{(entry.traditions || []).slice(0, 2).join(' · ')}</span>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  if (!children) return null;
  return (
    <div>
      <div className="dm-section-title">{title}</div>
      {children}
    </div>
  );
}

function DetailPanel({ entry, onSelect }) {
  const attrs = entry.attributes || {};
  const attrKeys = Object.keys(attrs);
  const related = (entry.related || [])
    .map((id) => BY_ID[id])
    .filter(Boolean);

  return (
    <div className="dm-detail">
      <div className="dm-detail-header">
        <div className="dm-detail-hero">
          <span className="dm-detail-icon">{entry.icon}</span>
          <div className="dm-detail-title-wrap">
            <div className="dm-detail-name">{entry.name}</div>
            {entry.originalName && (
              <div className="dm-detail-original">{entry.originalName}</div>
            )}
            <div className="dm-detail-role">{entry.role}</div>
          </div>
        </div>
        <p className="dm-detail-summary">{entry.summary}</p>
      </div>

      <div className="dm-detail-body">
        {/* Traditions */}
        {entry.traditions && entry.traditions.length > 0 && (
          <Section title="Traditions">
            <div className="dm-traditions">
              {entry.traditions.map((t) => (
                <span key={t} className="dm-trad-chip">{t}</span>
              ))}
            </div>
          </Section>
        )}

        {/* 1. Overview */}
        <Section title="Overview">
          <p className="dm-prose">{entry.overview}</p>
        </Section>

        {/* 2. Historical Origins */}
        {entry.origins && (
          <Section title="Historical Origins">
            <p className="dm-prose">{entry.origins}</p>
          </Section>
        )}

        {/* 3. Religious Context */}
        {entry.religious && (
          <Section title="Religious Context">
            <p className="dm-prose">{entry.religious}</p>
          </Section>
        )}

        {/* 4. Symbolism and Attributes */}
        {(entry.symbolism || attrKeys.length > 0) && (
          <Section title="Symbolism & Attributes">
            {entry.symbolism && <p className="dm-prose" style={{ marginBottom: attrKeys.length ? '0.8rem' : 0 }}>{entry.symbolism}</p>}
            {attrKeys.length > 0 && (
              <div className="dm-assoc-grid">
                {attrKeys.map((k) => (
                  <div key={k} className="dm-assoc-item">
                    <div className="dm-assoc-key">{k}</div>
                    <div className="dm-assoc-val">{attrs[k]}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 5. Major Interpretations */}
        {entry.interpretations && (
          <Section title="Major Interpretations">
            <p className="dm-prose">{entry.interpretations}</p>
          </Section>
        )}

        {/* 6. Related Concepts */}
        {related.length > 0 && (
          <Section title="Related Concepts">
            <div className="dm-related">
              {related.map((r) => (
                <button
                  key={r.id}
                  className="dm-related-link"
                  onClick={() => onSelect(r.id)}
                >
                  {r.icon} {r.name}
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* 7. Further Reading */}
        {entry.reading && entry.reading.length > 0 && (
          <Section title="Further Reading">
            <div className="dm-texts">
              {entry.reading.map((t) => (
                <span key={t} className="dm-text-chip">{t}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Grounding / educational note */}
        {entry.note && (
          <div>
            <div className="dm-note-label">Educational Note</div>
            <div className="dm-note">{entry.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function IntroPanel() {
  return (
    <div className="dm-intro">
      <div className="dm-intro-card">
        <h2 className="dm-intro-title">A Comparative Reference Library</h2>
        <p className="dm-intro-lead">
          This atlas explores demons, spiritual adversaries, evil, temptation, sin, mythology, folklore,
          occult traditions, and psychological interpretations — neutrally and historically. Select any
          entry to read a structured article (Overview · Historical Origins · Religious Context ·
          Symbolism &amp; Attributes · Major Interpretations · Related Concepts · Further Reading), or use
          the filters and search to explore by theme. It is a study resource only: it documents what
          traditions have believed, never how to practice anything.
        </p>
      </div>

      <div className="dm-intro-card">
        <h2 className="dm-intro-title">Timeline — The Development of Demonology</h2>
        <p className="dm-intro-lead">From ancient Mesopotamia through modern psychology.</p>
        <div className="dm-timeline">
          {TIMELINE.map((t) => (
            <div key={t.era} className="dm-tl-item">
              <div className="dm-tl-era">{t.era}</div>
              <div className="dm-tl-text">{t.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dm-intro-card">
        <h2 className="dm-intro-title">Comparison — The Demonic Across Traditions</h2>
        <p className="dm-intro-lead">
          "Demon" means very different things in different worlds. The English word flattens these
          distinctions; comparison restores them.
        </p>
        <div className="dm-table-wrap">
          <table className="dm-table">
            <thead>
              <tr>
                <th>Tradition</th>
                <th>Core concept</th>
                <th>Nature of the demonic</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.tradition}>
                  <td>{row.tradition}</td>
                  <td>{row.concept}</td>
                  <td>{row.nature}</td>
                  <td>{row.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function DemonologyAtlas({ onBack, onNavigate, initialSection, embedded = false }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  // Mobile-only: the topic index is collapsed behind a toggle so readers
  // don't have to scroll past ~90 links to reach the content.
  const [navOpen, setNavOpen] = useState(false);
  const contentRef = useRef(null);
  const pendingScroll = useRef(false);
  // Honor a ?section= deep-link if it matches an entry id.
  const [activeId, setActiveId] = useState(() =>
    initialSection && BY_ID[initialSection] ? initialSection : null
  );

  // Follow later changes to the deep-link target (e.g. cross-portal navigation).
  const [lastSection, setLastSection] = useState(initialSection);
  if (initialSection !== lastSection) {
    setLastSection(initialSection);
    if (initialSection && BY_ID[initialSection]) {
      setActiveId(initialSection);
    }
  }

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return demons.filter((d) => {
      const catMatch = activeFilter === 'All' || d.category === activeFilter;
      if (!catMatch) return false;
      if (!q) return true;
      const hay = [
        d.name, d.originalName, d.role, d.summary, d.overview, d.origins,
        d.religious, d.symbolism, d.interpretations, d.category,
        ...(d.traditions || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [activeFilter, search]);

  const activeEntry = activeId ? BY_ID[activeId] : null;

  const handleSelect = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
    setNavOpen(false);
    pendingScroll.current = true;
  };

  // Scroll after the re-render so the collapsed index doesn't throw off the
  // measured position.
  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 900 && contentRef.current) {
      // On mobile the hero + index sit above the article; jump straight to it.
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeId]);

  const showIntro = !activeEntry && !search.trim() && activeFilter === 'All';

  return (
    <div className={`dm-root ${embedded ? 'dm-root-embedded' : ''}`}>
      {/* Hero */}
      <div className="dm-hero">
        {onBack && (
          <button className="dm-back" onClick={onBack}>
            ← Back
          </button>
        )}
        <div className="dm-orb-wrap">
          <div className="dm-orb" />
          <div className="dm-ring dm-ring-1" />
          <div className="dm-ring dm-ring-2" />
          <div className="dm-ring dm-ring-3" />
        </div>
        <h1 className="dm-hero-title">Demonology &amp; Spiritual Adversaries</h1>
        <p className="dm-hero-subtitle">
          A comparative, academic reference to demons, spiritual adversaries, evil, sin, mythology,
          folklore, occult traditions, and their psychological interpretations.
        </p>
        <div className="dm-disclaimer">
          <strong>Educational use only.</strong> This atlas studies what traditions have believed about
          demons across history, theology, mythology, and psychology. It contains no instructions for
          summoning, invoking, worshipping, or contacting any entity.
          {onNavigate && (
            <>
              {' '}For the broader A-Z database, open the{' '}
              <button className="dm-codex-link" onClick={() => onNavigate('infernalcodex')}>
                Infernal &amp; Mythic Codex
              </button>.
            </>
          )}
        </div>
        <div className="dm-search-wrap">
          <span className="dm-search-icon"><SearchIcon /></span>
          <input
            className="dm-search"
            type="text"
            placeholder="Search demons, concepts, traditions…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveId(null);
            }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="dm-filters">
        {DEMON_FILTERS.map((f) => (
          <button
            key={f}
            className={`dm-chip ${activeFilter === f ? 'active' : ''}`}
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
      <div className="dm-layout">
        {/* Mobile-only toggle for the topic index */}
        <button
          className="dm-sidebar-toggle"
          onClick={() => setNavOpen((o) => !o)}
          aria-expanded={navOpen}
        >
          <span>☰ Browse all topics ({visible.length})</span>
          <span className={`dm-sidebar-toggle-arrow ${navOpen ? 'open' : ''}`}>▾</span>
        </button>

        {/* Sidebar */}
        <nav className={`dm-sidebar ${navOpen ? 'dm-sidebar-open' : ''}`}>
          {BY_CATEGORY.map(({ label, entries }) => {
            const filtered = entries.filter((d) => visible.some((v) => v.id === d.id));
            if (filtered.length === 0) return null;
            return (
              <div key={label}>
                <div className="dm-sidebar-label">{label}</div>
                {filtered.map((d) => (
                  <button
                    key={d.id}
                    className={`dm-sidebar-item ${activeId === d.id ? 'active' : ''}`}
                    onClick={() => handleSelect(d.id)}
                  >
                    <span className="dm-sidebar-icon">{d.icon}</span>
                    <span className="dm-sidebar-name">{d.name}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Content */}
        <div ref={contentRef} className="dm-content">
          {activeEntry ? (
            <DetailPanel entry={activeEntry} onSelect={handleSelect} />
          ) : (
            <>
              {showIntro && <IntroPanel />}
              <div className="dm-grid">
                {visible.length === 0 ? (
                  <div className="dm-empty">
                    <div className="dm-empty-icon">🜏</div>
                    <div className="dm-empty-text">No entries found for that search.</div>
                  </div>
                ) : (
                  visible.map((d) => (
                    <EntryCard
                      key={d.id}
                      entry={d}
                      isActive={activeId === d.id}
                      onClick={handleSelect}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
