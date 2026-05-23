import { useEffect, useMemo, useState } from 'react';
import PortalCard from './components/PortalCard';
import GlobalSearch from './components/GlobalSearch';
import { portals, portalsById, searchEverything } from './data/portals';
import { getRecentPortals } from './lib/storage';
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
      marginBottom: 'clamp(16px, 3vw, 24px)',
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

export default function HomePage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [recentIds] = useState(() => getRecentPortals());
  const [surpriseTheme, setSurpriseTheme] = useState(null);

  const openSurprise = () => setSurpriseTheme(getRandomPrayerTheme());
  const reshuffleSurprise = () => setSurpriseTheme(getRandomPrayerTheme());

  const { portals: filtered, sections: sectionResults } = useMemo(
    () => searchEverything(query),
    [query]
  );
  const recentSet = useMemo(() => new Set(recentIds), [recentIds]);

  const handleSectionPick = (entry) => {
    onNavigate(entry.portalId, entry.section ? { section: entry.section } : undefined);
  };

  const recentPortals = recentIds
    .map((id) => portalsById[id])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#07090f',
        color: '#f1eeff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
          radial-gradient(circle at 18% 18%, rgba(168,85,247,0.22), transparent 34%),
          radial-gradient(circle at 82% 12%, rgba(87,184,255,0.16), transparent 30%),
          radial-gradient(circle at 50% 92%, rgba(255,114,200,0.13), transparent 32%)
        `,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.18,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
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
          }}
        >
          ✦ Spirituality, psychology & symbolic frameworks toolkit
        </div>

        <h1
          style={{
            fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
            fontWeight: 950,
            lineHeight: 0.92,
            letterSpacing: '-0.06em',
            margin: '0 0 12px',
          }}
        >
          Sacred
        </h1>
        <h1
          style={{
            fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
            fontWeight: 950,
            lineHeight: 0.92,
            letterSpacing: '-0.06em',
            margin: '0 0 32px',
            background: 'linear-gradient(100deg, #c084fc 0%, #f0abfc 40%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Pathways
        </h1>

        <p
          style={{
            maxWidth: '480px',
            color: '#a89ec4',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.7,
            marginBottom: 'clamp(28px, 5vw, 40px)',
          }}
        >
          Seven portals for exploring inner symbolism, spiritual tradition, psychology, the cosmos, whole-system well-being, manifestation, and the world's best thinking frameworks.
        </p>

        <DailyPrayerCard />

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
            marginBottom: 'clamp(24px, 4vw, 36px)',
            letterSpacing: '0.01em',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,165,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(196,165,255,0.45)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(196,165,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(196,165,255,0.25)'; }}
        >
          <span style={{ fontSize: '1rem' }}>⟳</span> Surprise Me — Random Prayer
        </button>

        <GlobalSearch
          value={query}
          onChange={setQuery}
          resultCount={filtered.length}
          totalCount={portals.length}
          sectionResults={sectionResults}
          onSectionPick={handleSectionPick}
        />

        {recentPortals.length > 0 && !query && (
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              marginBottom: '20px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#a89ec4',
              }}
            >
              Recently viewed
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {recentPortals.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate(p.id)}
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#d8ceff',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {p.titleFlat}
                </button>
              ))}
            </div>
          </div>
        )}

        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              width: '100%',
              maxWidth: '820px',
            }}
          >
            {filtered.map((portal) => (
              <PortalCard
                key={portal.id}
                portal={portal}
                onNavigate={onNavigate}
                recent={!query && recentSet.has(portal.id)}
              />
            ))}
          </div>
        ) : sectionResults.length === 0 ? (
          <div
            style={{
              padding: '36px 24px',
              borderRadius: '24px',
              border: '1px dashed rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.03)',
              color: '#a89ec4',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            Nothing matched "{query}". Try a broader term — for example "shadow", "mood", or "alchemy".
          </div>
        ) : null}
      </div>

      {surpriseTheme && (
        <SurprisePrayerModal
          theme={surpriseTheme}
          onClose={() => setSurpriseTheme(null)}
          onReshuffle={reshuffleSurprise}
        />
      )}

      <p
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: '#5a5375',
          fontSize: '0.82rem',
          padding: '0 20px 24px',
        }}
      >
        No external libraries · Works offline · A spiritual reflection toolkit
      </p>
    </div>
  );
}
