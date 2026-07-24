import { useState, useMemo, useEffect, useId } from 'react';
import './WisdomAtlas.css';
import {
  teachers,
  categories,
  categoryNotes,
  lineages,
  teacherById,
  isTeacherId,
  teachersInCategory,
  relatedTeachersOf,
  readingListOf,
  randomTeacher,
  teacherMatches,
} from './data/wisdomTeachers';

// Wisdom Atlas — a reflective library of spiritual teachers and inner-work
// traditions. Each teacher is offered in three layers: a compact card with
// the essence, an expandable panel with key ideas and practice, and a
// dedicated page (/wisdom?section=<id>) with the complete wisdom profile.
// The teacher content itself lives in src/data/wisdomTeachers.js; this file
// keeps only the rendering.
// (CSS class names keep the historical `fa-` prefix; they are internal.)

// Tabs split the atlas into focused views instead of one long scroll.
const TABS = ['Teachers', 'Traditions', 'Compare', 'How to Begin'];

// Map deep-link ?section= values (and legacy anchor ids) onto a tab.
const SECTION_TO_TAB = {
  library: 'Teachers', teachers: 'Teachers', 'fa-library': 'Teachers',
  map: 'Traditions', traditions: 'Traditions', 'fa-map': 'Traditions',
  compare: 'Compare', 'fa-compare': 'Compare',
  builder: 'How to Begin', begin: 'How to Begin', 'how-to-begin': 'How to Begin', 'fa-builder': 'How to Begin',
};

function resolveInitialTab(initialSection) {
  if (!initialSection) return 'Teachers';
  return SECTION_TO_TAB[initialSection] || 'Teachers';
}

/* ─── TeacherCard: compact + expandable inline panel ─── */
function TeacherCard({ t, onOpen }) {
  const [expanded, setExpanded] = useState(false);

  function toggle(e) {
    e.stopPropagation();
    setExpanded((v) => !v);
  }

  return (
    <article
      className={`fa-card ${expanded ? 'fa-card-open' : ''}`}
      style={{ '--cardGlow': t.color }}
    >
      {/* ── compact header (always visible) ── */}
      <div className="fa-card-header" onClick={() => onOpen(t)}>
        <div className="fa-chip-row">
          <span className="fa-chip hot">{t.category}</span>
          <span className="fa-chip gold">{t.lineage}</span>
        </div>
        <h3>{t.name}</h3>
        <div className="fa-creator">{t.era} · {t.tradition}</div>
        {t.essence && <p className="fa-essence">"{t.essence}"</p>}
      </div>

      {/* ── expanded inline panel ── */}
      {expanded && (
        <div className="fa-expand-body">
          {t.keyIdeas && t.keyIdeas.length > 0 && (
            <div className="fa-key-ideas">
              {t.keyIdeas.map((idea) => (
                <span key={idea} className="fa-idea-pill">{idea}</span>
              ))}
            </div>
          )}
          <div className="fa-expand-row">
            <div className="fa-expand-item">
              <span className="fa-expand-label">Practice</span>
              <span>{t.practice}</span>
            </div>
          </div>
          <div className="fa-expand-row">
            <div className="fa-expand-item">
              <span className="fa-expand-label">Best for</span>
              <span>{t.bestFor}</span>
            </div>
          </div>
          {t.misunderstanding && (
            <div className="fa-expand-row">
              <div className="fa-expand-item">
                <span className="fa-expand-label">Often misunderstood as</span>
                <span className="fa-misunderstanding">{t.misunderstanding}</span>
              </div>
            </div>
          )}
          <button className="fa-full-profile-btn" onClick={() => onOpen(t)}>
            Open full wisdom profile ↗
          </button>
        </div>
      )}

      {/* ── footer actions ── */}
      <div className="fa-card-footer">
        <button className="fa-expand-btn" onClick={toggle} aria-expanded={expanded}>
          {expanded ? 'Collapse ↑' : 'Expand teaching ↓'}
        </button>
        <button className="fa-open-btn" onClick={() => onOpen(t)}>
          Full profile ↗
        </button>
      </div>
    </article>
  );
}

/* ─── ProfileSection: one titled block of a dedicated teacher page ─── */
/* Long sections are collapsible so a full profile stays navigable; the   */
/* toggle is a real <button>, so it is keyboard-reachable by default.     */
function ProfileSection({ title, subtitle, collapsible = false, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  if (!collapsible) {
    return (
      <section className="fa-profile-section">
        <h2 className="fa-profile-heading">{title}</h2>
        {subtitle && <p className="fa-profile-sub">{subtitle}</p>}
        <div className="fa-profile-body">{children}</div>
      </section>
    );
  }

  return (
    <section className={`fa-profile-section collapsible ${open ? 'open' : ''}`}>
      <h2 className="fa-profile-heading">
        <button
          type="button"
          className="fa-profile-toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{title}</span>
          <span className="fa-profile-caret" aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </h2>
      {open && (
        <div className="fa-profile-body" id={bodyId}>
          {subtitle && <p className="fa-profile-sub">{subtitle}</p>}
          {children}
        </div>
      )}
    </section>
  );
}

/* ─── TeacherProfile: the complete wisdom profile body ─── */
/* Shared by each teacher's dedicated page. Every section is guarded so   */
/* teachers with a lighter record still read cleanly.                     */
function TeacherProfile({ t, onOpenRelated }) {
  const related = relatedTeachersOf(t);
  const reading = readingListOf(t);
  const ctx = t.context;

  function openRelated(teacher) {
    if (onOpenRelated) onOpenRelated(teacher);
  }

  return (
    <div className="fa-profile">
      {/* 1 · essence */}
      {t.essence && <div className="fa-modal-essence">"{t.essence}"</div>}

      {/* 2 · overview */}
      {t.overview?.length > 0 && (
        <ProfileSection title="Overview">
          <div className="fa-prose">
            {t.overview.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </ProfileSection>
      )}

      {/* 3 · key ideas */}
      {t.keyIdeas?.length > 0 && (
        <ProfileSection title="Key ideas">
          <div className="fa-key-ideas large">
            {t.keyIdeas.map((idea) => (
              <span key={idea} className="fa-idea-pill">{idea}</span>
            ))}
          </div>
        </ProfileSection>
      )}

      {/* 4 · historical and intellectual context */}
      {ctx && (
        <ProfileSection title="Historical context" collapsible defaultOpen={false}>
          <dl className="fa-context-list">
            {ctx.period && (<><dt>Period</dt><dd>{ctx.period}</dd></>)}
            {ctx.tradition && (<><dt>Tradition</dt><dd>{ctx.tradition}</dd></>)}
            {ctx.influences && (<><dt>Influences</dt><dd>{ctx.influences}</dd></>)}
            {ctx.influenced && (<><dt>Influence on others</dt><dd>{ctx.influenced}</dd></>)}
            {ctx.imageVsRecord && (<><dt>Popular image vs record</dt><dd>{ctx.imageVsRecord}</dd></>)}
          </dl>
        </ProfileSection>
      )}

      {/* 5 · central teachings */}
      {t.teachings?.length > 0 && (
        <ProfileSection
          title="Central teachings"
          subtitle="What each idea means, and why it matters within this teacher's larger view."
        >
          <div className="fa-teaching-list">
            {t.teachings.map((teaching) => (
              <article className="fa-teaching" key={teaching.title}>
                <h3>{teaching.title}</h3>
                <p>{teaching.explanation}</p>
                {teaching.significance && (
                  <p className="fa-teaching-why">
                    <span className="fa-inline-label">Why it matters</span>
                    {teaching.significance}
                  </p>
                )}
              </article>
            ))}
          </div>
        </ProfileSection>
      )}

      {/* 6 · the compact core: teaching, practice, who it serves */}
      <ProfileSection title="Core teaching &amp; main practice">
        <div className="fa-detail-grid">
          <div className="fa-detail-box full">
            <h4>Core teaching</h4>
            <p>{t.core}</p>
          </div>
          <div className="fa-detail-box">
            <h4>Main practice</h4>
            <p>{t.practice}</p>
          </div>
          <div className="fa-detail-box">
            <h4>Best for</h4>
            <p>{t.bestFor}</p>
          </div>
        </div>
      </ProfileSection>

      {/* 7 · step-by-step application */}
      {t.practiceSteps?.length > 0 && (
        <ProfileSection
          title="Practising it"
          subtitle="A way to begin. Take it as an experiment rather than a prescription — nothing here guarantees a particular outcome."
          collapsible
          defaultOpen={false}
        >
          <ol className="fa-step-list">
            {t.practiceSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.instruction}</span>
              </li>
            ))}
          </ol>
        </ProfileSection>
      )}

      {/* 8 · everyday example */}
      {t.example?.scenario && (
        <ProfileSection title="An everyday example" collapsible defaultOpen={false}>
          <div className="fa-example">
            {t.example.title && <h3>{t.example.title}</h3>}
            <p>{t.example.scenario}</p>
          </div>
        </ProfileSection>
      )}

      {/* 9 · important distinctions */}
      {t.distinctions?.length > 0 && (
        <ProfileSection
          title="Important distinctions"
          subtitle="Where this teaching is most often confused with something it is not."
          collapsible
          defaultOpen={false}
        >
          <dl className="fa-distinction-list">
            {t.distinctions.map((d) => (
              <div className="fa-distinction" key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.clarification}</dd>
              </div>
            ))}
          </dl>
        </ProfileSection>
      )}

      {/* 10 · misunderstandings, limits and cautions */}
      <ProfileSection
        title="Misunderstandings &amp; cautions"
        subtitle="Offered in the spirit of studying a teaching honestly, not of dismissing it."
        collapsible
        defaultOpen={false}
      >
        <div className="fa-detail-grid">
          {t.misunderstanding && (
            <div className="fa-detail-box">
              <h4>Often misunderstood as</h4>
              <p className="fa-misunderstanding">{t.misunderstanding}</p>
            </div>
          )}
          {t.trap && (
            <div className="fa-detail-box">
              <h4>Common trap</h4>
              <p>{t.trap}</p>
            </div>
          )}
        </div>
        {t.cautions?.length > 0 && (
          <ul className="fa-caution-list">
            {t.cautions.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </ProfileSection>

      {/* 11 · reflection questions */}
      {(t.reflectionQuestions?.length > 0 || t.prompt) && (
        <ProfileSection title="Reflection questions">
          {t.prompt && <div className="fa-prompt-box">{t.prompt}</div>}
          {t.reflectionQuestions?.length > 0 && (
            <ul className="fa-question-list">
              {t.reflectionQuestions.map((q) => <li key={q}>{q}</li>)}
            </ul>
          )}
        </ProfileSection>
      )}

      {/* 12 · related teachers */}
      {related.length > 0 && (
        <ProfileSection
          title="Related teachers"
          subtitle="Why each connection matters — some are documented lines of influence, others only a shared insight."
        >
          <div className="fa-related-row">
            {related.map(({ teacher: r, note }) => (
              <div
                key={r.id}
                className={`fa-related-chip ${onOpenRelated ? 'clickable' : ''}`}
                style={{ '--relGlow': r.color }}
                onClick={onOpenRelated ? () => openRelated(r) : undefined}
                role={onOpenRelated ? 'button' : undefined}
                tabIndex={onOpenRelated ? 0 : undefined}
                onKeyDown={onOpenRelated ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRelated(r); }
                } : undefined}
              >
                <strong>{r.name}</strong>
                <span>{r.essence || r.core}</span>
                {note && <span className="fa-related-note">{note}</span>}
              </div>
            ))}
          </div>
        </ProfileSection>
      )}

      {/* 13 · suggested reading */}
      {reading.length > 0 && (
        <ProfileSection title="Suggested reading">
          <ul className="fa-reading-list">
            {reading.map((book) => (
              <li key={book.title}>
                <div className="fa-reading-head">
                  <strong>{book.title}</strong>
                  {book.level && <span className="fa-chip gold">{book.level}</span>}
                  {book.startHere && <span className="fa-chip hot">Start here</span>}
                </div>
                {book.focus && <span className="fa-reading-focus">{book.focus}</span>}
              </li>
            ))}
          </ul>
        </ProfileSection>
      )}

      {/* 14 · source or historical note */}
      {t.note && (
        <ProfileSection title="A note on sources">
          <div className="fa-source-note">{t.note}</div>
        </ProfileSection>
      )}
    </div>
  );
}

/* ─── TeacherPage: a teacher's own dedicated reading page ─── */
/* Reached at /wisdom?section=<id> — where "Reading for Today" jumps in. */
function TeacherPage({ t, onHome, onBackToAtlas, onOpenRelated }) {
  return (
    <div className="fa">
      {/* top bar */}
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={onBackToAtlas}>← Teachers</button>
        <div className="fa-brand">
          <div className="fa-logo">✦</div>
          <span>Wisdom Atlas</span>
        </div>
        <button className="fa-btn fa-topbar-random" onClick={onHome}>⌂ Home</button>
      </div>

      <div className="fa-inner">
        <article className="fa-teacher-page" style={{ '--cardGlow': t.color }}>
          <header className="fa-teacher-page-head">
            <div className="fa-chip-row">
              <span className="fa-chip hot">{t.category}</span>
              <span className="fa-chip gold">{t.lineage}</span>
            </div>
            <h1 className="fa-teacher-page-title">{t.name}</h1>
            <div className="fa-modal-creator">{t.era} · {t.tradition}</div>
          </header>

          <div className="fa-modal-body">
            <TeacherProfile t={t} onOpenRelated={onOpenRelated} />
          </div>

          <button className="fa-btn" onClick={onBackToAtlas}>← Back to all teachers</button>
        </article>
      </div>
    </div>
  );
}

/* ─── WisdomAtlas: main page ─── */
export default function WisdomAtlas({ onBack, onNavigate, initialSection }) {
  const [tab,            setTab]            = useState(() => resolveInitialTab(initialSection));
  const [query,          setQuery]          = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lineageFilter,  setLineageFilter]  = useState('all');
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // ?section= does double duty: a tab name (e.g. "compare") selects a tab,
  // while a teacher id (e.g. "neville") opens that teacher's own page. `localId`
  // keeps the page responsive before the URL settles, and as a fallback when no
  // router navigation is wired in.
  const [localId, setLocalId] = useState(isTeacherId(initialSection) ? initialSection : null);

  // Follow deep-link changes (e.g. ?section=compare) after first mount.
  const [prevSection, setPrevSection] = useState(initialSection);
  if (initialSection !== prevSection) {
    setPrevSection(initialSection);
    setTab(resolveInitialTab(initialSection));
    setLocalId(isTeacherId(initialSection) ? initialSection : null);
  }

  const activeId = isTeacherId(initialSection) ? initialSection : localId;
  const activeTeacher = activeId ? teacherById[activeId] : null;

  // Open a teacher's own page. Push the section URL when we can so the page is
  // shareable; the local id keeps it responsive before the URL settles.
  function openTeacher(t) {
    setLocalId(t.id);
    if (onNavigate) onNavigate('wisdomteachers', { section: t.id });
  }
  function backToAtlas() {
    setLocalId(null);
    if (onNavigate) onNavigate('wisdomteachers');
  }

  // Start each tab at the top rather than wherever the last one was scrolled.
  useEffect(() => { window.scrollTo({ top: 0 }); }, [tab]);

  // Search runs over the flattened profile text (see teacherSearchText), so
  // terms from the expanded sections are findable too.
  const filtered = useMemo(() => teachers.filter((t) => (
    teacherMatches(t, query)
      && (categoryFilter === 'all' || t.category === categoryFilter)
      && (lineageFilter  === 'all' || t.lineage  === lineageFilter)
  )), [query, categoryFilter, lineageFilter]);

  const catTeachers = teachersInCategory(activeCategory);

  function reset() { setQuery(''); setCategoryFilter('all'); setLineageFilter('all'); }

  function openRandom() {
    openTeacher(randomTeacher());
  }

  // A teacher is open → show their dedicated reading page.
  if (activeTeacher) {
    return (
      <TeacherPage
        t={activeTeacher}
        onHome={onBack}
        onBackToAtlas={backToAtlas}
        onOpenRelated={openTeacher}
      />
    );
  }

  return (
    <div className="fa">
      {/* top bar */}
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={() => (onNavigate ? onNavigate('wisdom') : onBack())}>← Wisdom Atlas</button>
        <div className="fa-brand">
          <div className="fa-logo">✦</div>
          <span>Wisdom Atlas</span>
        </div>
        <button className="fa-btn fa-topbar-random" onClick={openRandom}>✦ Random teacher</button>
      </div>

      <div className="fa-inner">
        {/* tab bar — primary navigation, sticky below the top bar on all sizes */}
        <nav className="fa-tabs" role="tablist">
          {TABS.map((name) => (
            <button
              key={name}
              role="tab"
              aria-selected={tab === name}
              className={`fa-tab ${tab === name ? 'active' : ''}`}
              onClick={() => setTab(name)}
            >
              {name}
            </button>
          ))}
        </nav>

        {/* hero — only on the default Teachers tab */}
        {tab === 'Teachers' && (
        <header className="fa-hero">
          <div>
            <div className="fa-eyebrow"><span className="fa-pulse" /> Teachers · Teachings · Inner Work</div>
            <h1 className="fa-h1">
              The teachers of the <span className="fa-grad">inner life</span>,<br />gathered into one quiet library.
            </h1>
            <p className="fa-lead">
              An atlas of spiritual teachers and inner-work traditions. Each one is offered in layers — a distilled essence, key ideas to explore, a practice to live, what it is best for, where it is often misread, and a reflection prompt to carry into your day.
            </p>
            <div className="fa-hero-actions">
              <a className="fa-btn primary" href="#fa-library">Meet the teachers</a>
              <button className="fa-btn" onClick={openRandom}>✦ Read a random teacher</button>
              <button className="fa-btn" onClick={() => setTab('How to Begin')}>How to work with them</button>
            </div>
            <div className="fa-stat-row">
              <div className="fa-stat"><strong>{teachers.length}</strong><span>Teachers</span></div>
              <div className="fa-stat"><strong>{categories.length}</strong><span>Traditions</span></div>
              <div className="fa-stat"><strong>{lineages.length}</strong><span>Approaches</span></div>
              <div className="fa-stat"><strong>∞</strong><span>Reflections</span></div>
            </div>
          </div>

          {/* 3D sphere */}
          <div className="fa-atlas-stage" aria-label="3D orbit of inner-work themes">
            <div className="fa-sphere">
              <div className="fa-ring r1" /><div className="fa-ring r2" />
              <div className="fa-ring r3" /><div className="fa-ring r4" />
              <div className="fa-node n1">Imagination</div>
              <div className="fa-node n2">Spiritual Law</div>
              <div className="fa-node n3">Surrender</div>
              <div className="fa-node n4">Shadow</div>
              <div className="fa-node n5">Presence</div>
              <div className="fa-core">WISDOM<br/>ATLAS</div>
            </div>
            <div className="fa-floating-note">
              Each teacher is a doorway — open the card to see key ideas, then the full profile for the complete wisdom map.
            </div>
          </div>
        </header>
        )}

        {/* library */}
        {tab === 'Teachers' && (
        <section className="fa-section" id="fa-library">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Wisdom Library</h2>
              <p>Search by teacher, tradition, teaching, or practice. Expand any card to see key ideas and practice, or open the full wisdom profile.</p>
            </div>
          </div>

          <div className="fa-controls fa-panel">
            <div className="fa-field">
              <label>Search</label>
              <input
                className="fa-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: imagination, surrender, shadow, subconscious, assumption..."
              />
            </div>
            <div className="fa-field">
              <label>Tradition</label>
              <select className="fa-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All traditions</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>Approach</label>
              <select className="fa-select" value={lineageFilter} onChange={(e) => setLineageFilter(e.target.value)}>
                <option value="all">All approaches</option>
                {lineages.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={reset}>Reset</button>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={openRandom}>✦ Random</button>
            </div>
          </div>

          <div className="fa-grid">
            {filtered.length ? filtered.map((t) => (
              <TeacherCard key={t.id} t={t} onOpen={openTeacher} />
            )) : (
              <div className="fa-panel" style={{ gridColumn: '1/-1', padding: 28, color: 'var(--muted)' }}>
                No teachers match that. Try a broader word — like "surrender", "imagination", or "shadow".
              </div>
            )}
          </div>
        </section>
        )}

        {/* tradition pages */}
        {tab === 'Traditions' && (
        <section className="fa-section" id="fa-map">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Traditions</h2>
              <p>The library gathers naturally into a few living lineages. Choose one to see who sits within it — and a gentle way to study it.</p>
            </div>
          </div>
          <div className="fa-map-wrap">
            <aside className="fa-category-menu fa-panel">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`fa-cat-btn ${c === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  <span>{c}</span>
                  <b>{teachers.filter((t) => t.category === c).length}</b>
                </button>
              ))}
            </aside>

            <div className="fa-lanes">
              <div className="fa-lane">
                <div className="fa-lane-head">
                  <div>
                    <h3>{activeCategory}</h3>
                    <p>{categoryNotes[activeCategory]}</p>
                  </div>
                  <span className="fa-chip gold">{catTeachers.length} teachers</span>
                </div>
                <div className="fa-lane-items">
                  {catTeachers.map((t) => (
                    <div className="fa-pill-card" key={t.id} onClick={() => openTeacher(t)}>
                      <b>{t.name}</b>
                      <span className="fa-pill-essence">{t.essence}</span>
                      <span className="fa-pill-meta">{t.lineage} · {t.era}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fa-lane">
                <div className="fa-lane-head">
                  <div>
                    <h3>How to study a tradition</h3>
                    <p>The same quiet rhythm works for any teacher in this lineage.</p>
                  </div>
                </div>
                <div className="fa-lane-items">
                  {[
                    ['Read slowly', 'Let the core teaching land before you judge it or rush to apply it.'],
                    ['Choose one practice', 'Pick a single practice and give it a week of honest, unforced effort.'],
                    ['Watch the trap', 'Notice the way this path tends to go astray — in others, and in you.'],
                    ['Journal the prompt', 'Write from the reflection prompt without editing or impressing yourself.'],
                  ].map(([label, desc]) => (
                    <div className="fa-pill-card" key={label}>
                      <b>{label}</b>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* comparison table */}
        {tab === 'Compare' && (
        <section className="fa-section" id="fa-compare">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Compare the Teachers</h2>
              <p>The whole library side by side — what each teacher holds as the core idea, the practice they hand you, the distinction their path turns on, who it serves best, and where it tends to go astray. Tap any row to open the full profile.</p>
            </div>
          </div>
          <div className="fa-compare-wrap fa-panel">
            <table className="fa-compare-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Tradition</th>
                  <th>Core idea</th>
                  <th>Practice</th>
                  <th>Key distinction</th>
                  <th>Best for</th>
                  <th>Common trap</th>
                </tr>
              </thead>
              {categories.map((c) => (
                <tbody key={c}>
                  <tr className="fa-compare-cat">
                    <td colSpan={7}>
                      <b>{c}</b>
                      <span>{categoryNotes[c]}</span>
                    </td>
                  </tr>
                  {teachersInCategory(c).map((t) => (
                    <tr key={t.id} className="fa-compare-row" onClick={() => openTeacher(t)}>
                      <td className="fa-compare-teacher">
                        <b>{t.name}</b>
                        <span>{t.era}</span>
                      </td>
                      <td className="fa-compare-trad">
                        <span>{t.tradition}</span>
                        <em>{t.lineage}</em>
                      </td>
                      <td className="fa-compare-essence">"{t.essence}"</td>
                      <td>{t.practice}</td>
                      <td className="fa-compare-distinction">{t.distinctions?.[0]?.label || '—'}</td>
                      <td>{t.bestFor}</td>
                      <td className="fa-compare-trap">{t.trap}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </section>
        )}

        {/* how to begin */}
        {tab === 'How to Begin' && (
        <section className="fa-section" id="fa-builder">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">How to Work With a Teacher</h2>
              <p>These teachings are meant to be lived, not just read. Here is a gentle way to begin.</p>
            </div>
          </div>
          <div className="fa-builder fa-panel">
            {[
              ['1', 'Choose a teacher', 'Let one voice meet you where you are. You do not need all of them at once.'],
              ['2', 'Sit with the core teaching', 'Read it slowly and ask, honestly: what would change if this were true for me?'],
              ['3', 'Take up the practice', 'Give the teaching a body — one small ritual you actually do each day.'],
              ['4', 'Notice the trap, keep the prompt', 'Watch where the path goes astray, and carry the reflection question into your day.'],
            ].map(([num, title, desc]) => (
              <div className="fa-builder-card" key={num}>
                <strong>{num}</strong>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        <footer className="fa-footer">
          A reflective library, not a doctrine. These teachings are offered for contemplation and inner work — take what serves you and hold the rest lightly. Nothing here is medical, psychological, or religious advice.
        </footer>
      </div>
    </div>
  );
}
