import { useState } from 'react';

// A single concept in the Browse view of the Topics & Dictionary portal.
// Compact by design: the summary ("what it's about") lives behind the "!" info
// button so the card stays small. The whole card opens the topic; the "!" is a
// sibling button (not nested) so it toggles its popover without opening the topic.
export default function TopicCard({ topic, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div
      style={{ position: 'relative', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setInfoOpen(false); }}
    >
      <button
        type="button"
        onClick={() => onOpen(topic.id)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          textAlign: 'left',
          width: '100%',
          height: '100%',
          borderRadius: 16,
          border: `1px solid ${hovered ? 'rgba(196,165,255,0.45)' : 'rgba(255,255,255,0.1)'}`,
          background: hovered ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.04)',
          padding: '13px 14px',
          cursor: 'pointer',
          color: '#f1eeff',
          fontFamily: 'inherit',
          backdropFilter: 'blur(16px)',
          boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.28)' : '0 6px 20px rgba(0,0,0,0.18)',
          transform: hovered ? 'translateY(-2px)' : 'none',
          transition: 'all 0.18s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', paddingRight: 26 }}>
          <span
            style={{
              fontSize: '0.58rem',
              fontWeight: 800,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#a89ec4',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              padding: '2px 8px',
            }}
          >
            {topic.category}
          </span>
          {topic.type === 'comparison' && (
            <span
              style={{
                fontSize: '0.56rem',
                fontWeight: 800,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: '#93c5fd',
                border: '1px solid rgba(96,165,250,0.32)',
                background: 'rgba(96,165,250,0.12)',
                borderRadius: 999,
                padding: '2px 8px',
              }}
            >
              Comparison
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '0.98rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>
          {topic.title}
        </h3>

        {topic.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {topic.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  color: '#7a7096',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 999,
                  padding: '1px 7px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span
          style={{
            marginTop: 'auto',
            paddingTop: 4,
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#c4b5fd',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          Open topic
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              transform: hovered ? 'translateX(3px)' : 'none',
              transition: 'transform 0.18s ease',
            }}
          >
            →
          </span>
        </span>
      </button>

      {/* "!" info button — sibling of the card button, layered on top in the corner. */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setInfoOpen((o) => !o); }}
        aria-label={`What ${topic.title} is about`}
        aria-expanded={infoOpen}
        title="What this is about"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 3,
          width: 20,
          height: 20,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 999,
          border: `1px solid ${infoOpen ? 'rgba(196,165,255,0.6)' : 'rgba(255,255,255,0.22)'}`,
          background: infoOpen ? 'rgba(196,165,255,0.25)' : 'rgba(255,255,255,0.08)',
          color: '#e7deff',
          fontSize: '0.72rem',
          fontWeight: 900,
          lineHeight: 1,
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: 0,
        }}
      >
        !
      </button>

      {infoOpen && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            top: 36,
            left: 12,
            right: 12,
            zIndex: 4,
            borderRadius: 12,
            border: '1px solid rgba(196,165,255,0.35)',
            background: 'rgba(20,16,32,0.98)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            padding: '10px 12px',
            fontSize: '0.8rem',
            lineHeight: 1.5,
            color: '#d4cef0',
            backdropFilter: 'blur(10px)',
          }}
        >
          {topic.summary}
        </div>
      )}
    </div>
  );
}
