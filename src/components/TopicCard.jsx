import { useState } from 'react';

// A single concept in the Browse view of the Topics & Dictionary portal.
export default function TopicCard({ topic, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(topic.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textAlign: 'left',
        width: '100%',
        height: '100%',
        borderRadius: 22,
        border: `1px solid ${hovered ? 'rgba(196,165,255,0.45)' : 'rgba(255,255,255,0.1)'}`,
        background: hovered ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.04)',
        padding: '20px 20px 22px',
        cursor: 'pointer',
        color: '#f1eeff',
        fontFamily: 'inherit',
        backdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? '0 0 40px rgba(168,85,247,0.16), 0 18px 44px rgba(0,0,0,0.32)'
          : '0 8px 28px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '0.64rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#a89ec4',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            padding: '2px 9px',
          }}
        >
          {topic.category}
        </span>
        {topic.type === 'comparison' && (
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#93c5fd',
              border: '1px solid rgba(96,165,250,0.32)',
              background: 'rgba(96,165,250,0.12)',
              borderRadius: 999,
              padding: '2px 9px',
            }}
          >
            Comparison
          </span>
        )}
      </div>

      <h3 style={{ fontSize: '1.12rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
        {topic.title}
      </h3>
      <p style={{ fontSize: '0.86rem', lineHeight: 1.55, color: '#9890b8', margin: 0 }}>
        {topic.summary}
      </p>

      {topic.tags?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
          {topic.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: '#7a7096',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 999,
                padding: '2px 8px',
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
          paddingTop: 8,
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#c4b5fd',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        Open topic
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            transform: hovered ? 'translateX(4px)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          →
        </span>
      </span>
    </button>
  );
}
