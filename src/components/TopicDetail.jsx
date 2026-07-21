// Full-page detail view for a single Spiritual Topic. Also renders comparison
// topics — distinctions carry the "X vs Y" content, so no separate comparison
// engine is needed for the first release.

const HEADING = {
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#a89ec4',
  margin: '0 0 12px',
};

const CARD = {
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  borderRadius: 20,
  padding: '20px 22px',
  backdropFilter: 'blur(14px)',
};

function Section({ title, children, id }) {
  return (
    <section style={{ ...CARD, marginBottom: 16 }} aria-labelledby={id}>
      <h2 id={id} style={HEADING}>{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items, color = '#c4bbe0', marker = '•', markerColor = '#c4b5fd' }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.92rem', lineHeight: 1.55, color }}>
          <span aria-hidden="true" style={{ color: markerColor, flexShrink: 0, fontWeight: 800 }}>{marker}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TopicDetail({
  topic,
  topicsById,
  portalTitles,
  onOpenRelated,
  onNavigatePortal,
  onBackToLibrary,
}) {
  const related = (topic.relatedTopicIds || [])
    .map((id) => topicsById[id])
    .filter(Boolean);

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(16px, 4vw, 28px) 72px' }}>
      <button
        type="button"
        onClick={onBackToLibrary}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          margin: '8px 0 22px',
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(255,255,255,0.06)',
          color: '#d8ceff',
          borderRadius: 999,
          padding: '8px 16px',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span aria-hidden="true">←</span> All topics
      </button>

      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span
            style={{
              fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#a89ec4', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '3px 10px',
            }}
          >
            {topic.category}
          </span>
          <span
            style={{
              fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: topic.type === 'comparison' ? '#93c5fd' : '#6ee7b7',
              border: `1px solid ${topic.type === 'comparison' ? 'rgba(96,165,250,0.32)' : 'rgba(52,211,153,0.32)'}`,
              background: topic.type === 'comparison' ? 'rgba(96,165,250,0.12)' : 'rgba(52,211,153,0.1)',
              borderRadius: 999, padding: '3px 10px',
            }}
          >
            {topic.type === 'comparison' ? 'Comparison' : 'Concept'}
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', fontWeight: 950, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 12px' }}>
          {topic.title}
        </h1>
        <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: '#c4bbe0', margin: 0 }}>
          {topic.summary}
        </p>
      </header>

      {topic.definition?.length > 0 && (
        <Section title="Definition" id="topic-definition">
          <div style={{ display: 'grid', gap: 12 }}>
            {topic.definition.map((para, i) => (
              <p key={i} style={{ fontSize: '0.96rem', lineHeight: 1.7, color: '#d4cef0', margin: 0 }}>{para}</p>
            ))}
          </div>
        </Section>
      )}

      {topic.keyIdea && (
        <section
          style={{
            border: '1px solid rgba(196,165,255,0.28)',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(96,165,250,0.06))',
            borderRadius: 20,
            padding: '20px 22px',
            marginBottom: 16,
          }}
          aria-labelledby="topic-keyidea"
        >
          <h2 id="topic-keyidea" style={HEADING}>Core idea</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#f1eeff', margin: 0, fontWeight: 600 }}>
            {topic.keyIdea}
          </p>
        </section>
      )}

      {topic.distinctions?.length > 0 && (
        <Section title="Important distinctions" id="topic-distinctions">
          <div style={{ display: 'grid', gap: 14 }}>
            {topic.distinctions.map((d, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#f1eeff', margin: '0 0 5px' }}>{d.label}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#9890b8', margin: 0 }}>{d.explanation}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(topic.signs?.balanced?.length > 0 || topic.signs?.imbalanced?.length > 0) && (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 16 }}>
          {topic.signs?.balanced?.length > 0 && (
            <section style={{ ...CARD, marginBottom: 0, borderColor: 'rgba(52,211,153,0.24)' }} aria-labelledby="topic-balanced">
              <h2 id="topic-balanced" style={{ ...HEADING, color: '#6ee7b7' }}>Balanced expression</h2>
              <Bullets items={topic.signs.balanced} marker="✓" markerColor="#6ee7b7" />
            </section>
          )}
          {topic.signs?.imbalanced?.length > 0 && (
            <section style={{ ...CARD, marginBottom: 0, borderColor: 'rgba(251,146,60,0.24)' }} aria-labelledby="topic-imbalanced">
              <h2 id="topic-imbalanced" style={{ ...HEADING, color: '#fdba74' }}>Imbalanced expression</h2>
              <Bullets items={topic.signs.imbalanced} marker="!" markerColor="#fdba74" />
            </section>
          )}
        </div>
      )}

      {topic.practices?.length > 0 && (
        <Section title="Practical exercises" id="topic-practices">
          <Bullets items={topic.practices} marker="→" markerColor="#c4b5fd" />
        </Section>
      )}

      {topic.reflectionQuestions?.length > 0 && (
        <Section title="Reflection questions" id="topic-reflection">
          <div style={{ display: 'grid', gap: 10 }}>
            {topic.reflectionQuestions.map((q, i) => (
              <p key={i} style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#d4cef0', fontStyle: 'italic', margin: 0 }}>
                “{q}”
              </p>
            ))}
          </div>
        </Section>
      )}

      {topic.portalLinks?.length > 0 && (
        <Section title="Explore across Sacred Pathways" id="topic-portals">
          <div style={{ display: 'grid', gap: 8 }}>
            {topic.portalLinks.map((link, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onNavigatePortal(link.portalId, link.section ? { section: link.section } : undefined)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
                  border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)',
                  borderRadius: 14, padding: '12px 14px', cursor: 'pointer', color: '#f1eeff', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>{link.label}</span>
                  <span style={{ fontSize: '0.74rem', color: '#7a7096' }}>{portalTitles[link.portalId] || link.portalId}</span>
                </span>
                <span aria-hidden="true" style={{ color: '#c4b5fd', fontWeight: 800 }}>→</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section title="Related concepts" id="topic-related">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {related.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onOpenRelated(r.id)}
                style={{
                  border: '1px solid rgba(196,165,255,0.28)', background: 'rgba(196,165,255,0.1)',
                  color: '#d8ceff', borderRadius: 999, padding: '7px 14px', fontSize: '0.82rem',
                  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {r.title} →
              </button>
            ))}
          </div>
        </Section>
      )}

      {topic.note && (
        <p
          role="note"
          style={{
            border: '1px dashed rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.03)',
            borderRadius: 16, padding: '14px 16px', fontSize: '0.82rem', lineHeight: 1.6,
            color: '#a89ec4', margin: 0,
          }}
        >
          <strong style={{ color: '#c4bbe0', fontWeight: 700 }}>Note. </strong>{topic.note}
        </p>
      )}
    </div>
  );
}
