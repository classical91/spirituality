// Single global search bar that filters the portal grid AND surfaces
// matching sections from inside each portal.
import { portalsById } from '../data/portals';

export default function GlobalSearch({
  value,
  onChange,
  resultCount,
  totalCount,
  sectionResults = [],
  onSectionPick,
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto clamp(28px, 5vw, 44px)',
      }}
    >
      <label
        htmlFor="sacred-search"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(14px)',
          color: '#f1eeff',
          boxShadow: '0 12px 36px rgba(0,0,0,0.28)',
        }}
      >
        <span style={{ fontSize: '1.1rem', color: '#a89ec4' }} aria-hidden="true">
          ⌕
        </span>
        <input
          id="sacred-search"
          type="search"
          placeholder="Search across portals — try 'shadow work', 'oxytocin', 'attachment'"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search across all portals"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f1eeff',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#d8ceff',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Clear
          </button>
        )}
      </label>
      {value && (
        <p
          style={{
            marginTop: '10px',
            fontSize: '0.78rem',
            color: '#7a7096',
            textAlign: 'center',
          }}
          aria-live="polite"
        >
          {resultCount} of {totalCount} portals match "{value}"
          {sectionResults.length > 0 && (
            <> · {sectionResults.length} matching {sectionResults.length === 1 ? 'topic' : 'topics'} inside portals</>
          )}
        </p>
      )}

      {value && sectionResults.length > 0 && (
        <div
          style={{
            marginTop: '14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '20px',
            overflow: 'hidden',
            textAlign: 'left',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#a89ec4',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            Inside portals
          </div>
          {sectionResults.map((entry) => {
            const portal = portalsById[entry.portalId];
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onSectionPick?.(entry)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#f1eeff',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '0.95rem',
                    background: portal?.iconBg || 'rgba(255,255,255,0.06)',
                    border: `1px solid ${portal?.iconBorder || 'rgba(255,255,255,0.12)'}`,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {portal?.icon || '✦'}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
                  <span style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{entry.title}</span>
                    <span style={{ fontSize: '0.72rem', color: '#7a7096' }}>{portal?.titleFlat}</span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#a89ec4',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 999,
                        padding: '1px 7px',
                      }}
                    >
                      {entry.lens}
                    </span>
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#9890b8', lineHeight: 1.45 }}>
                    {entry.summary}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
