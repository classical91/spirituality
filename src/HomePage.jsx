import { useState, useEffect } from 'react';
import { getRandomPrayerTheme } from './data/prayerThemes';
import { prayerPool } from './prayerPool';

function getDailyPrayer() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return prayerPool[dayOfYear % prayerPool.length];
}

function SurprisePrayerModal({ theme, onClose, onReshuffle }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(4,4,16,0.88)',
        backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '520px',
          maxHeight: '88vh', overflowY: 'auto',
          background: '#0b0d18',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '28px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{
          position: 'sticky', top: 0,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(11,13,24,0.97)',
          padding: '20px 24px',
          borderRadius: '28px 28px 0 0',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: '12px',
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(196,165,255,0.6)', marginBottom: '4px' }}>
              Prayer Theme
            </p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>{theme.title}</h2>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{theme.category}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}
          >×</button>
        </div>

        {/* Prayers */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {theme.prayers.map((prayer, i) => (
            <div key={i} style={{
              background: 'rgba(196,165,255,0.04)',
              border: '1px solid rgba(196,165,255,0.12)',
              borderRadius: '16px',
              padding: '18px',
            }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>Prayer {i + 1}</p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: '#d8ceff', margin: 0 }}>{prayer}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '0 24px 20px', display: 'flex', gap: '10px' }}>
          <button
            onClick={onReshuffle}
            style={{
              flex: 1, padding: '12px', borderRadius: '14px',
              background: 'rgba(196,165,255,0.1)', border: '1px solid rgba(196,165,255,0.2)',
              color: '#c4a5ff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            ⟳ Another theme
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '12px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate }) {
  const [surpriseTheme, setSurpriseTheme] = useState(null);

  const openSurprise = () => setSurpriseTheme(getRandomPrayerTheme());
  const reshuffleSurprise = () => setSurpriseTheme(getRandomPrayerTheme());
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
      id: 'psychology',
      icon: '◈',
      badge: 'Psychology Portal',
      badgeColor: 'rgba(6,182,212,0.12)',
      badgeBorder: 'rgba(6,182,212,0.30)',
      badgeText: '#a5f3fc',
      title: 'Psychology\nPortal',
      description: 'Ten frameworks for identity work, relationship reflection, and living from the end — Self-Schema, Attachment Theory, CBT, Stoicism, and more.',
      keywords: ['Identity', 'Attachment', 'Somatic', 'Stoicism'],
      cta: 'Enter Portal',
      ctaColor: '#67e8f9',
      iconBg: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(30,27,75,0.3))',
      iconBorder: 'rgba(6,182,212,0.35)',
      glowColor: 'rgba(6,182,212,0.20)',
      hoverBorder: 'rgba(6,182,212,0.45)',
    },
    {
      id: 'innerbalance',
      icon: '◍',
      badge: 'InnerBalance Atlas',
      badgeColor: 'rgba(122,171,121,0.14)',
      badgeBorder: 'rgba(122,171,121,0.32)',
      badgeText: '#bbf7d0',
      title: 'InnerBalance\nAtlas',
      description: 'Understand your mind, body & spirit — nervous system, neurotransmitters, mood uplift, psychophysiology, and daily well-being in one place.',
      keywords: ['Dashboard', 'Neurotransmitters', 'Mood', 'Well-Being'],
      cta: 'Enter Portal',
      ctaColor: '#86efac',
      iconBg: 'linear-gradient(135deg, rgba(122,171,121,0.38), rgba(216,169,72,0.18))',
      iconBorder: 'rgba(122,171,121,0.4)',
      glowColor: 'rgba(122,171,121,0.22)',
      hoverBorder: 'rgba(122,171,121,0.48)',
    },
    {
      id: 'neville',
      icon: '✧',
      badge: 'Neville Goddard Portal',
      badgeColor: 'rgba(139,92,246,0.14)',
      badgeBorder: 'rgba(139,92,246,0.32)',
      badgeText: '#ddd6fe',
      title: 'Neville\nGoddard',
      description: 'A visual operating system for Neville\'s work — Living in the End, SATS, Revision, Mental Diet, phrase analyzer, and state-builder tools.',
      keywords: ['Assumption', 'Imagination', 'SATS', 'Revision'],
      cta: 'Enter Portal',
      ctaColor: '#c4b5fd',
      iconBg: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.2))',
      iconBorder: 'rgba(139,92,246,0.4)',
      glowColor: 'rgba(139,92,246,0.22)',
      hoverBorder: 'rgba(139,92,246,0.48)',
    },
    {
      id: 'frameworks',
      icon: '✦',
      badge: 'Framework Atlas',
      badgeColor: 'rgba(124,92,255,0.14)',
      badgeBorder: 'rgba(124,92,255,0.32)',
      badgeText: '#c9b8ff',
      title: 'Framework\nAtlas',
      description: '35 frameworks from authors, psychologists, strategists, and designers — searchable cards, detail modals, category pages, and a 3D model lab.',
      keywords: ['Mental Models', 'Strategy', 'Psychology', 'Learning'],
      cta: 'Enter Portal',
      ctaColor: '#c9b8ff',
      iconBg: 'linear-gradient(135deg, rgba(124,92,255,0.38), rgba(0,214,255,0.18))',
      iconBorder: 'rgba(124,92,255,0.4)',
      glowColor: 'rgba(124,92,255,0.22)',
      hoverBorder: 'rgba(124,92,255,0.48)',
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
          Seven tools for exploring inner symbolism, spiritual tradition, psychology, the cosmos, whole-system well-being, manifestation, and the world's best thinking frameworks.
        </p>

        {/* Daily Prayer */}
        <DailyPrayerCard />

        {/* Surprise Me button */}
        <button
          onClick={openSurprise}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(196,165,255,0.25)',
            background: 'rgba(196,165,255,0.08)',
            color: '#c4a5ff',
            padding: '11px 22px',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            backdropFilter: 'blur(14px)',
            marginBottom: '40px',
            letterSpacing: '0.01em',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,165,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(196,165,255,0.45)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(196,165,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(196,165,255,0.25)'; }}
        >
          <span style={{ fontSize: '1rem' }}>⟳</span> Surprise Me — Random Prayer
        </button>

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

      {surpriseTheme && (
        <SurprisePrayerModal
          theme={surpriseTheme}
          onClose={() => setSurpriseTheme(null)}
          onReshuffle={reshuffleSurprise}
        />
      )}

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

function DailyPrayerCard() {
  const prayer = getDailyPrayer();
  const typeColors = {
    'Commandment':    { border: 'rgba(251,191,36,0.28)',  bg: 'rgba(251,191,36,0.07)',  badge: 'rgba(251,191,36,0.15)',  badgeBorder: 'rgba(251,191,36,0.35)',  badgeText: '#fde68a' },
    'Virtue':         { border: 'rgba(52,211,153,0.28)',  bg: 'rgba(52,211,153,0.07)',  badge: 'rgba(52,211,153,0.15)',  badgeBorder: 'rgba(52,211,153,0.35)',  badgeText: '#6ee7b7' },
    'Deadly Sin':     { border: 'rgba(248,113,113,0.28)', bg: 'rgba(248,113,113,0.07)', badge: 'rgba(248,113,113,0.15)', badgeBorder: 'rgba(248,113,113,0.35)', badgeText: '#fca5a5' },
    "Dante's Inferno":{ border: 'rgba(167,139,250,0.28)', bg: 'rgba(167,139,250,0.07)', badge: 'rgba(167,139,250,0.15)', badgeBorder: 'rgba(167,139,250,0.35)', badgeText: '#c4b5fd' },
  };
  const c = typeColors[prayer.type] || typeColors['Commandment'];

  return (
    <div style={{
      width: '100%',
      maxWidth: '680px',
      marginBottom: 'clamp(20px, 4vw, 28px)',
      borderRadius: '24px',
      border: `1px solid ${c.border}`,
      background: c.bg,
      padding: 'clamp(20px, 4vw, 32px)',
      backdropFilter: 'blur(20px)',
      textAlign: 'left',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7096' }}>
          ✦ Daily Prayer
        </span>
        <span style={{
          background: c.badge,
          border: `1px solid ${c.badgeBorder}`,
          color: c.badgeText,
          padding: '3px 10px',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          {prayer.type}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 700, color: c.badgeText, opacity: 0.85 }}>
          {prayer.title}
        </span>
      </div>
      <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.8, color: '#d4cef0', fontStyle: 'italic', margin: 0 }}>
        "{prayer.prayer}"
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

