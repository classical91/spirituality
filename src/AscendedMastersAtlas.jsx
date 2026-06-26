import { useState, useMemo } from 'react';
import './WisdomAtlas.css';
import { masters, masterById, sourceNote } from './data/ascendedMasters';

// Ascended Masters — the esoteric companion library to the Wisdom Atlas.
// These are figures of the Theosophical / New Age tradition, framed honestly
// as symbolic/devotional rather than documented history (see the disclaimer
// and each card's source note). Visual language is shared with the Wisdom
// Atlas via the reused `fa-` CSS classes.

const rays = [...new Set(masters.map((m) => m.ray))];

/* ─── MasterProfile: the full reading body, shared by the page ─── */
function MasterProfile({ m, onOpenRelated }) {
  const related = (m.relatedMasters || [])
    .map((id) => masterById[id])
    .filter(Boolean);

  return (
    <>
      {m.essence && <div className="fa-modal-essence">"{m.essence}"</div>}

      {m.keyIdeas && m.keyIdeas.length > 0 && (
        <div className="fa-modal-section">
          <h4 className="fa-modal-label">Key ideas</h4>
          <div className="fa-key-ideas large">
            {m.keyIdeas.map((idea) => (
              <span key={idea} className="fa-idea-pill">{idea}</span>
            ))}
          </div>
        </div>
      )}

      <div className="fa-detail-grid">
        <div className="fa-detail-box full">
          <h4>Core teaching</h4>
          <p>{m.core}</p>
        </div>
        <div className="fa-detail-box">
          <h4>Main practice</h4>
          <p>{m.practice}</p>
        </div>
        <div className="fa-detail-box">
          <h4>Best for</h4>
          <p>{m.bestFor}</p>
        </div>
        {m.trap && (
          <div className="fa-detail-box">
            <h4>Common trap</h4>
            <p>{m.trap}</p>
          </div>
        )}
      </div>

      {m.prompt && (
        <div className="fa-detail-box full">
          <h4>Reflection prompt</h4>
          <div className="fa-prompt-box">{m.prompt}</div>
        </div>
      )}

      {related.length > 0 && (
        <div className="fa-modal-section">
          <h4 className="fa-modal-label">Relates to</h4>
          <div className="fa-related-row">
            {related.map((r) => (
              <div
                key={r.id}
                className={`fa-related-chip ${onOpenRelated ? 'clickable' : ''}`}
                style={{ '--relGlow': r.color }}
                onClick={onOpenRelated ? () => onOpenRelated(r) : undefined}
                role={onOpenRelated ? 'button' : undefined}
                tabIndex={onOpenRelated ? 0 : undefined}
                onKeyDown={onOpenRelated ? (e) => { if (e.key === 'Enter') onOpenRelated(r); } : undefined}
              >
                <strong>{r.name}</strong>
                <span>{r.essence || r.core}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {m.books && m.books.length > 0 && (
        <div className="fa-detail-box full">
          <h4>Associated writings</h4>
          <ul>{m.books.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      )}

      <div className="fa-detail-box full">
        <h4>A note on sources</h4>
        <p>{m.note ? `${m.note} ${sourceNote}` : sourceNote}</p>
      </div>
    </>
  );
}

/* ─── MasterPage: a master's own dedicated reading page ─── */
function MasterPage({ m, onHome, onBackToAtlas, onOpenRelated }) {
  return (
    <div className="fa">
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={onBackToAtlas}>← Ascended Masters</button>
        <div className="fa-brand">
          <div className="fa-logo">☼</div>
          <span>Ascended Masters</span>
        </div>
        <button className="fa-btn fa-topbar-random" onClick={onHome}>⌂ Home</button>
      </div>

      <div className="fa-inner">
        <article className="fa-teacher-page" style={{ '--cardGlow': m.color }}>
          <header className="fa-teacher-page-head">
            <div className="fa-chip-row">
              <span className="fa-chip hot">{m.ray}</span>
              <span className="fa-chip gold">{m.tradition}</span>
            </div>
            <h1 className="fa-teacher-page-title">{m.name}</h1>
          </header>

          <div className="fa-modal-body">
            <MasterProfile m={m} onOpenRelated={onOpenRelated} />
          </div>

          <button className="fa-btn" onClick={onBackToAtlas}>← Back to all masters</button>
        </article>
      </div>
    </div>
  );
}

/* ─── MasterCard: compact card ─── */
function MasterCard({ m, onOpen }) {
  return (
    <article className="fa-card" style={{ '--cardGlow': m.color }}>
      <div className="fa-card-header" onClick={() => onOpen(m)}>
        <div className="fa-chip-row">
          <span className="fa-chip hot">{m.ray}</span>
        </div>
        <h3>{m.name}</h3>
        <div className="fa-creator">{m.tradition}</div>
        <p className="fa-essence">"{m.essence}"</p>
      </div>
      <div className="fa-card-footer">
        <button className="fa-open-btn" onClick={() => onOpen(m)}>
          Open profile ↗
        </button>
      </div>
    </article>
  );
}

/* ─── AscendedMastersAtlas: main page ─── */
export default function AscendedMastersAtlas({ onBack, onNavigate, initialSection }) {
  const [query,      setQuery]      = useState('');
  const [rayFilter,  setRayFilter]  = useState('all');

  // ?section=<masterId> opens that master's own page. localId keeps it
  // responsive before the URL settles, and as a fallback when no router is wired.
  const [localId, setLocalId] = useState(initialSection && masterById[initialSection] ? initialSection : null);
  const [prevSection, setPrevSection] = useState(initialSection);
  if (initialSection !== prevSection) {
    setPrevSection(initialSection);
    setLocalId(initialSection && masterById[initialSection] ? initialSection : null);
  }

  const activeId = (initialSection && masterById[initialSection]) ? initialSection : localId;
  const activeMaster = activeId ? masterById[activeId] : null;

  function openMaster(m) {
    setLocalId(m.id);
    if (onNavigate) onNavigate('ascended', { section: m.id });
  }
  function backToAtlas() {
    setLocalId(null);
    if (onNavigate) onNavigate('ascended');
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return masters.filter((m) => {
      const hay = [
        m.name, m.ray, m.tradition, m.essence, m.core,
        m.practice, m.bestFor, ...(m.keyIdeas || []),
      ].join(' ').toLowerCase();
      return (!q || hay.includes(q)) && (rayFilter === 'all' || m.ray === rayFilter);
    });
  }, [query, rayFilter]);

  function reset() { setQuery(''); setRayFilter('all'); }

  function openRandom() {
    openMaster(masters[Math.floor(Math.random() * masters.length)]);
  }

  if (activeMaster) {
    return (
      <MasterPage
        m={activeMaster}
        onHome={onBack}
        onBackToAtlas={backToAtlas}
        onOpenRelated={openMaster}
      />
    );
  }

  return (
    <div className="fa">
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={() => (onNavigate ? onNavigate('wisdom') : onBack())}>← Wisdom Atlas</button>
        <div className="fa-brand">
          <div className="fa-logo">☼</div>
          <span>Ascended Masters</span>
        </div>
        <button className="fa-btn fa-topbar-random" onClick={openRandom}>☼ Random master</button>
      </div>

      <div className="fa-inner">
        <header className="fa-hero">
          <div>
            <div className="fa-eyebrow"><span className="fa-pulse" /> Theosophy · The Seven Rays · Esoteric Wisdom</div>
            <h1 className="fa-h1">
              The <span className="fa-grad">Ascended Masters</span>,<br />the rays of the inner light.
            </h1>
            <p className="fa-lead">
              The Chohans of the Seven Rays and the central figures of the Theosophical and New Age tradition — each a doorway into a single quality of the spiritual life: will, wisdom, love, purity, truth, service, and freedom.
            </p>
            <div className="fa-hero-actions">
              <a className="fa-btn primary" href="#am-library">Meet the masters</a>
              <button className="fa-btn" onClick={openRandom}>☼ Read a random master</button>
            </div>
          </div>
        </header>

        {/* honest framing — set apart from the documented teachers */}
        <div className="fa-panel" style={{ padding: 20, margin: '8px 0 28px', borderColor: 'rgba(255,209,102,.28)' }}>
          <strong style={{ color: '#fde68a' }}>A note before you begin.</strong>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 8, fontSize: 14 }}>
            Unlike the rest of the Wisdom Atlas, these are not documented historical teachers. They are esoteric figures known through Theosophical, “I AM,” and Summit Lighthouse literature — much of it received as channeled or devotional transmission. They are offered here for symbolic contemplation, not as historical fact. Take what serves you and hold the rest lightly.
          </p>
        </div>

        <section className="fa-section" id="am-library">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">The Masters</h2>
              <p>Search by name, ray, or quality. Open any master for their core teaching, a practice to live, and a reflection to carry.</p>
            </div>
          </div>

          <div className="fa-controls fa-panel">
            <div className="fa-field">
              <label>Search</label>
              <input
                className="fa-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: will, wisdom, violet flame, healing, service..."
              />
            </div>
            <div className="fa-field">
              <label>Ray</label>
              <select className="fa-select" value={rayFilter} onChange={(e) => setRayFilter(e.target.value)}>
                <option value="all">All rays</option>
                {rays.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={reset}>Reset</button>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={openRandom}>☼ Random</button>
            </div>
          </div>

          <div className="fa-grid">
            {filtered.length ? filtered.map((m) => (
              <MasterCard key={m.id} m={m} onOpen={openMaster} />
            )) : (
              <div className="fa-panel" style={{ gridColumn: '1/-1', padding: 28, color: 'var(--muted)' }}>
                No masters match that. Try a broader word — like "wisdom", "freedom", or "service".
              </div>
            )}
          </div>
        </section>

        <footer className="fa-footer">
          A reflective library, not a doctrine. These figures and teachings are offered for contemplation and symbolic study — esoteric tradition, not documented history or religious instruction. Take what serves you and hold the rest lightly.
        </footer>
      </div>
    </div>
  );
}
