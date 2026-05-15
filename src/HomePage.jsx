import { useState } from 'react';

export default function HomePage({ onNavigate }) {
  const portals = [
    {
      id: 'chakra',
      icon: '◎',
      badge: 'Energy Centers',
      badgeColor: 'rgba(168,85,247,0.18)',
      badgeBorder: 'rgba(168,85,247,0.35)',
      badgeText: '#d8b4fe',
      title: 'Chakra\nVisualizer',
      description: 'Explore the seven energy centers of the subtle body — balance, practices, affirmations, and deep reflection.',
      keywords: ['Energy', 'Body', 'Balance', 'Reflection'],
      cta: 'Enter Portal',
      ctaColor: '#c084fc',
      iconBg: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(139,92,246,0.2))',
      iconBorder: 'rgba(168,85,247,0.4)',
      glowColor: 'rgba(168,85,247,0.22)',
      hoverBorder: 'rgba(168,85,247,0.45)',
    },
    {
      id: 'astrology',
      icon: '✦',
      badge: 'Natal Chart',
      badgeColor: 'rgba(251,191,36,0.15)',
      badgeBorder: 'rgba(251,191,36,0.35)',
      badgeText: '#fde68a',
      title: 'Natal Chart\nDecoder',
      description: 'Decode your birth chart through planets, signs, houses, aspects, and alchemical metal correspondences.',
      keywords: ['Planets', 'Signs', 'Houses', 'Alchemy'],
      cta: 'Enter Portal',
      ctaColor: '#fcd34d',
      iconBg: 'linear-gradient(135deg, rgba(251,191,36,0.38), rgba(245,158,11,0.15))',
      iconBorder: 'rgba(251,191,36,0.38)',
      glowColor: 'rgba(251,191,36,0.18)',
      hoverBorder: 'rgba(251,191,36,0.45)',
    },
    {
      id: 'biblical',
      icon: '✠',
      badge: 'Sacred Moral Atlas',
      badgeColor: 'rgba(251,191,36,0.12)',
      badgeBorder: 'rgba(251,191,36,0.28)',
      badgeText: '#fef3c7',
      title: 'Biblical\nConcepts',
      description: 'Explore the 10 Commandments, 7 Deadly Sins, virtues, Dante\'s Inferno, and demonology as an interactive study board.',
      keywords: ['Commandments', 'Virtues', 'Deadly Sins', 'Dante'],
      cta: 'Enter Portal',
      ctaColor: '#fde68a',
      iconBg: 'linear-gradient(135deg, rgba(120,53,15,0.6), rgba(30,27,75,0.4))',
      iconBorder: 'rgba(251,191,36,0.3)',
      glowColor: 'rgba(120,53,15,0.35)',
      hoverBorder: 'rgba(251,191,36,0.4)',
    },
    {
      id: 'nutrients',
      icon: '◍',
      badge: 'Psychophysiology',
      badgeColor: 'rgba(52,211,153,0.12)',
      badgeBorder: 'rgba(52,211,153,0.3)',
      badgeText: '#a7f3d0',
      title: 'Vitamins &\nMinerals',
      description: 'Map how nutrients support mood, attention, energy, stress resilience, sleep, and neurochemical balance through body-state science.',
      keywords: ['Nutrients', 'Neurochemistry', 'Energy', 'Sleep'],
      cta: 'Enter Portal',
      ctaColor: '#6ee7b7',
      iconBg: 'linear-gradient(135deg, rgba(52,211,153,0.35), rgba(16,185,129,0.15))',
      iconBorder: 'rgba(52,211,153,0.38)',
      glowColor: 'rgba(52,211,153,0.2)',
      hoverBorder: 'rgba(52,211,153,0.45)',
    },
  ];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#07090f',
      color: '#f1eeff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
    }}>
      {/* Background gradients */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(circle at 18% 18%, rgba(168,85,247,0.22), transparent 34%),
          radial-gradient(circle at 82% 12%, rgba(87,184,255,0.16), transparent 30%),
          radial-gradient(circle at 50% 92%, rgba(255,114,200,0.13), transparent 32%)
        `,
      }} />
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px)',
        textAlign: 'center',
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.06)',
          color: '#d8ceff',
          padding: '9px 16px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          backdropFilter: 'blur(14px)',
          marginBottom: '28px',
          letterSpacing: '0.02em',
        }}>
          ✦ Spiritual exploration toolkit
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
          fontWeight: 950,
          lineHeight: 0.92,
          letterSpacing: '-0.06em',
          margin: '0 0 12px',
        }}>
          Sacred
        </h1>
        <h1 style={{
          fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
          fontWeight: 950,
          lineHeight: 0.92,
          letterSpacing: '-0.06em',
          margin: '0 0 32px',
          background: 'linear-gradient(100deg, #c084fc 0%, #f0abfc 40%, #93c5fd 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Pathways
        </h1>

        <p style={{
          maxWidth: '480px',
          color: '#a89ec4',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          lineHeight: 1.7,
          marginBottom: 'clamp(40px, 7vw, 64px)',
        }}>
          Four tools for exploring inner symbolism, spiritual tradition, the cosmos, and psychophysiology.
        </p>

        {/* Portal cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '820px',
        }}>
          {portals.map(portal => (
            <PortalCard key={portal.id} portal={portal} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <p style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        color: '#5a5375',
        fontSize: '0.82rem',
        padding: '0 20px 24px',
      }}>
        No external libraries · Works offline · A spiritual reflection toolkit
      </p>
    </div>
  );
}

function PortalCard({ portal, onNavigate }) {
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
      {/* Glow overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 30% 20%, ${portal.glowColor}, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.28s ease',
        pointerEvents: 'none',
        borderRadius: '28px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: '64px', height: '64px',
          borderRadius: '20px',
          display: 'grid',
          placeItems: 'center',
          fontSize: '1.8rem',
          background: portal.iconBg,
          border: `1px solid ${portal.iconBorder}`,
          marginBottom: '20px',
          boxShadow: hovered ? `0 0 30px ${portal.glowColor}` : 'none',
          transition: 'box-shadow 0.28s ease',
        }}>
          {portal.icon}
        </div>

        {/* Badge */}
        <div style={{
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
        }}>
          {portal.badge}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          margin: '0 0 12px',
          whiteSpace: 'pre-line',
        }}>
          {portal.title}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '0.93rem',
          color: '#9890b8',
          lineHeight: 1.65,
          margin: '0 0 16px',
        }}>
          {portal.description}
        </p>

        {/* Keywords */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
          {portal.keywords.map(kw => (
            <span key={kw} style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#7a7096',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {kw}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: portal.ctaColor,
          letterSpacing: '0.01em',
        }}>
          {portal.cta}
          <span style={{
            display: 'inline-block',
            transform: hovered ? 'translateX(5px)' : 'translateX(0)',
            transition: 'transform 0.22s ease',
          }}>
            →
          </span>
        </div>
      </div>
    </button>
  );
}

