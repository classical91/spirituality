import { useState } from 'react';

export default function PortalCard({ portal, onNavigate, recent = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onNavigate(portal.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '28px',
        border: `1px solid ${hovered ? portal.hoverBorder : 'rgba(255,255,255,0.1)'}`,
        background: hovered
          ? 'rgba(255,255,255,0.065)'
          : 'rgba(255,255,255,0.04)',
        padding: 'clamp(24px, 4vw, 36px)',
        textAlign: 'left',
        cursor: 'pointer',
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 0 70px ${portal.glowColor}, 0 24px 60px rgba(0,0,0,0.35)`
          : '0 8px 32px rgba(0,0,0,0.22)',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        color: '#f1eeff',
        fontFamily: 'inherit',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 30% 20%, ${portal.glowColor}, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.28s ease',
          pointerEvents: 'none',
          borderRadius: '28px',
        }}
      />

      {recent && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 2,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#d8ceff',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            padding: '3px 8px',
            borderRadius: '999px',
            textTransform: 'uppercase',
          }}
        >
          Recent
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            display: 'grid',
            placeItems: 'center',
            fontSize: '1.8rem',
            background: portal.iconBg,
            border: `1px solid ${portal.iconBorder}`,
            marginBottom: '20px',
            boxShadow: hovered ? `0 0 30px ${portal.glowColor}` : 'none',
            transition: 'box-shadow 0.28s ease',
          }}
        >
          {portal.icon}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: portal.badgeColor,
            border: `1px solid ${portal.badgeBorder}`,
            color: portal.badgeText,
            padding: '5px 10px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '12px',
            letterSpacing: '0.03em',
          }}
        >
          {portal.badge}
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            margin: '0 0 12px',
            whiteSpace: 'pre-line',
          }}
        >
          {portal.title}
        </h2>

        <p
          style={{
            fontSize: '0.93rem',
            color: '#9890b8',
            lineHeight: 1.65,
            margin: '0 0 16px',
          }}
        >
          {portal.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
          {portal.keywords.map((kw) => (
            <span
              key={kw}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#7a7096',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {kw}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: portal.ctaColor,
            letterSpacing: '0.01em',
          }}
        >
          {portal.cta}
          <span
            style={{
              display: 'inline-block',
              transform: hovered ? 'translateX(5px)' : 'translateX(0)',
              transition: 'transform 0.22s ease',
            }}
          >
            →
          </span>
        </div>
      </div>
    </button>
  );
}
