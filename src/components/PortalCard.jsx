import { useState } from 'react';

// Homepage portal card. Compact by design: the description ("what it's about")
// lives behind the "!" info button so the card stays small. The whole card
// opens the portal; the "!" is a sibling button (not nested) so it toggles its
// popover without navigating.
export default function PortalCard({ portal, onNavigate, recent = false }) {
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
        onClick={() => onNavigate(portal.id)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          border: `1px solid ${hovered ? portal.hoverBorder : 'rgba(255,255,255,0.1)'}`,
          background: hovered ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.04)',
          padding: '16px 16px 18px',
          textAlign: 'left',
          cursor: 'pointer',
          backdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? `0 0 44px ${portal.glowColor}, 0 16px 40px rgba(0,0,0,0.3)`
            : '0 6px 22px rgba(0,0,0,0.2)',
          transform: hovered ? 'translateY(-3px)' : 'none',
          transition: 'all 0.24s cubic-bezier(0.34,1.56,0.64,1)',
          color: '#f1eeff',
          fontFamily: 'inherit',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 20%, ${portal.glowColor}, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.24s ease',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, paddingRight: 26 }}>
          <span
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '13px',
              display: 'grid',
              placeItems: 'center',
              fontSize: '1.25rem',
              background: portal.iconBg,
              border: `1px solid ${portal.iconBorder}`,
              flexShrink: 0,
              boxShadow: hovered ? `0 0 22px ${portal.glowColor}` : 'none',
              transition: 'box-shadow 0.24s ease',
            }}
          >
            {portal.icon}
          </span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: portal.badgeColor,
                border: `1px solid ${portal.badgeBorder}`,
                color: portal.badgeText,
                padding: '3px 9px',
                borderRadius: '999px',
                fontSize: '0.66rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
              }}
            >
              {portal.badge}
            </span>
            {recent && (
              <span
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#d8ceff',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                }}
              >
                Recent
              </span>
            )}
          </span>
        </div>

        <h2
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: 'clamp(1.15rem, 2.4vw, 1.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {portal.title}
        </h2>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {portal.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#7a7096',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.66rem',
                fontWeight: 600,
              }}
            >
              {kw}
            </span>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            paddingTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: portal.ctaColor,
          }}
        >
          {portal.cta}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              transform: hovered ? 'translateX(4px)' : 'none',
              transition: 'transform 0.22s ease',
            }}
          >
            {portal.external ? '↗' : '→'}
          </span>
        </div>
      </button>

      {/* "!" info button — sibling of the card button, layered on top. */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setInfoOpen((o) => !o); }}
        aria-label={`What ${portal.titleFlat || 'this portal'} is about`}
        aria-expanded={infoOpen}
        title="What this is about"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 3,
          width: 21,
          height: 21,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 999,
          border: `1px solid ${infoOpen ? 'rgba(196,165,255,0.6)' : 'rgba(255,255,255,0.22)'}`,
          background: infoOpen ? 'rgba(196,165,255,0.25)' : 'rgba(255,255,255,0.08)',
          color: '#e7deff',
          fontSize: '0.74rem',
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
            top: 40,
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
          {portal.description}
        </div>
      )}
    </div>
  );
}
