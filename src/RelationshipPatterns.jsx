import { useEffect, useMemo, useState } from 'react';
import { relationshipPatterns, relationshipPatternsById } from './data/relationshipPatterns';
import './RelationshipPatterns.css';

function PatternLibrary({ onOpen }) {
  return (
    <main className="rp-library rp-page-enter">
      <header className="rp-library-hero">
        <p className="rp-eyebrow">A field guide to connection</p>
        <h1>Relationship<br />Patterns</h1>
        <p className="rp-library-intro">
          Notice the loop without turning it into an identity. Choose one pattern to understand
          what activates it, how it sustains itself, and where a different response can begin.
        </p>
      </header>

      <div className="rp-library-list" aria-label="Relationship pattern concepts">
        {relationshipPatterns.map((pattern, index) => (
          <button
            className="rp-library-row"
            key={pattern.id}
            type="button"
            onClick={() => onOpen(pattern.id)}
            style={{ '--pattern-color': pattern.color, '--row-delay': `${index * 45}ms` }}
          >
            <span className="rp-library-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="rp-library-mark" aria-hidden="true">{pattern.icon}</span>
            <span className="rp-library-copy">
              <strong>{pattern.name}</strong>
              <span>{pattern.kicker}</span>
            </span>
            <span className="rp-library-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <aside className="rp-library-note">
        <span>Use this as a mirror, not a label.</span>
        These concepts describe common protective moves. They are not diagnoses, and context always matters.
      </aside>
    </main>
  );
}

function SectionTitle({ number, children }) {
  return (
    <div className="rp-section-title">
      <span>{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

function PatternDetail({ pattern, index, onOpen, onAllPatterns }) {
  const previous = relationshipPatterns[(index - 1 + relationshipPatterns.length) % relationshipPatterns.length];
  const next = relationshipPatterns[(index + 1) % relationshipPatterns.length];

  return (
    <main className="rp-detail rp-page-enter" style={{ '--pattern-color': pattern.color }}>
      <header className="rp-detail-hero">
        <div className="rp-hero-orbit" aria-hidden="true"><span>{pattern.icon}</span></div>
        <div className="rp-detail-heading">
          <p className="rp-eyebrow">Pattern {String(index + 1).padStart(2, '0')} of {String(relationshipPatterns.length).padStart(2, '0')}</p>
          <h1>{pattern.name}</h1>
          <p className="rp-kicker">{pattern.kicker}</p>
        </div>
        <blockquote>{pattern.keyInsight}</blockquote>
      </header>

      <div className="rp-detail-layout">
        <aside className="rp-contents" aria-label="On this page">
          <p>On this page</p>
          <a href="#understand">Understand</a>
          <a href="#pattern-map">Pattern map</a>
          <a href="#why">Why it holds</a>
          <a href="#practice">What helps</a>
          <a href="#reflect">Reflect</a>
        </aside>

        <article className="rp-article">
          <section id="understand" className="rp-prose-section">
            <SectionTitle number="01">Understand</SectionTitle>
            <p className="rp-lede">{pattern.intro}</p>
          </section>

          <section id="pattern-map" className="rp-prose-section">
            <SectionTitle number="02">The pattern map</SectionTitle>
            <div className="rp-map-list">
              {pattern.items.map((item, itemIndex) => (
                <div className="rp-map-row" key={item.label}>
                  <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="why" className="rp-prose-section">
            <SectionTitle number="03">Why it can hold</SectionTitle>
            <ul className="rp-reason-list">
              {pattern.whyItForms.map((reason) => <li key={reason}>{reason}</li>)}
            </ul>
          </section>

          <section id="practice" className="rp-prose-section">
            <SectionTitle number="04">What helps</SectionTitle>
            <ol className="rp-practice-list">
              {pattern.practices.map((practice, practiceIndex) => (
                <li key={practice}>
                  <span>{String(practiceIndex + 1).padStart(2, '0')}</span>
                  <p>{practice}</p>
                </li>
              ))}
            </ol>
          </section>

          {pattern.note && (
            <aside className="rp-safety-note">
              <span>Context &amp; safety</span>
              <p>{pattern.note}</p>
            </aside>
          )}

          <section id="reflect" className="rp-prose-section rp-reflection">
            <SectionTitle number="05">Pause and reflect</SectionTitle>
            {pattern.reflection.map((question) => <p key={question}>{question}</p>)}
          </section>

          <section className="rp-related" aria-labelledby="related-title">
            <p id="related-title">Continue exploring</p>
            <div>
              {pattern.related.map((related) => (
                <button type="button" key={related.id} onClick={() => onOpen(related.id)}>
                  {related.label}<span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </section>

          {pattern.sources?.length > 0 && (
            <details className="rp-sources">
              <summary>Research &amp; further reading</summary>
              <ul>
                {pattern.sources.map((source) => (
                  <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>
                ))}
              </ul>
            </details>
          )}
        </article>
      </div>

      <nav className="rp-pager" aria-label="Pattern navigation">
        <button type="button" onClick={() => onOpen(previous.id)}>
          <span>← Previous</span><strong>{previous.name}</strong>
        </button>
        <button type="button" className="rp-pager-all" onClick={onAllPatterns}>All patterns</button>
        <button type="button" onClick={() => onOpen(next.id)}>
          <span>Next →</span><strong>{next.name}</strong>
        </button>
      </nav>
    </main>
  );
}

export default function RelationshipPatterns({ onBack, onOpenSection, initialSection }) {
  // The hub addresses each pattern by ?section=, so the incoming section wins
  // whenever there is one. `localId` only covers the case where this page is
  // rendered without a router to push URLs to, and is reset whenever the
  // section changes so it can never hold a stale pattern.
  const routedId = relationshipPatternsById[initialSection] ? initialSection : null;
  const [localId, setLocalId] = useState(routedId);
  const [lastSection, setLastSection] = useState(initialSection);
  if (initialSection !== lastSection) {
    setLastSection(initialSection);
    setLocalId(routedId);
  }

  const activeId = routedId ?? localId;
  const activePattern = activeId ? relationshipPatternsById[activeId] : null;
  const activeIndex = useMemo(
    () => activePattern ? relationshipPatterns.findIndex((pattern) => pattern.id === activePattern.id) : -1,
    [activePattern]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeId]);

  const openPattern = (id) => {
    if (relationshipPatternsById[id]) setLocalId(id);
    onOpenSection?.(id);
  };

  const openAllPatterns = () => {
    setLocalId(null);
    onOpenSection?.('patterns');
  };

  return (
    <div className="rp-shell">
      <div className="rp-ambient rp-ambient-one" aria-hidden="true" />
      <div className="rp-ambient rp-ambient-two" aria-hidden="true" />
      <nav className="rp-topbar">
        {onBack && <button type="button" className="rp-back" onClick={onBack}><span aria-hidden="true">←</span> Relationship Hub</button>}
        <button type="button" className="rp-wordmark" onClick={openAllPatterns}>Relationship Patterns</button>
        {activePattern && <button type="button" className="rp-all-link" onClick={openAllPatterns}>All patterns <span aria-hidden="true">↗</span></button>}
      </nav>

      {activePattern ? (
        <PatternDetail pattern={activePattern} index={activeIndex} onOpen={openPattern} onAllPatterns={openAllPatterns} />
      ) : (
        <PatternLibrary onOpen={openPattern} />
      )}
    </div>
  );
}
