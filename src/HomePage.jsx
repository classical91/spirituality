import { useMemo, useState } from 'react';
import PortalCard from './components/PortalCard';
import GlobalSearch from './components/GlobalSearch';
import { portals, portalsById, searchPortals } from './data/portals';
import { getRecentPortals } from './lib/storage';

export default function HomePage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [recentIds] = useState(() => getRecentPortals());

  const filtered = useMemo(() => searchPortals(query), [query]);
  const recentSet = useMemo(() => new Set(recentIds), [recentIds]);

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
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          Six portals for exploring inner symbolism, spiritual tradition, psychology, the cosmos, whole-system well-being, and the world's best thinking frameworks.
        </p>

        <GlobalSearch
          value={query}
          onChange={setQuery}
          resultCount={filtered.length}
          totalCount={portals.length}
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
        ) : (
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
            No portals matched "{query}". Try a broader term — for example "shadow", "mood", or "alchemy".
          </div>
        )}
      </div>

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
