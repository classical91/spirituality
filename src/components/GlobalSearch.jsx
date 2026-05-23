// Single global search bar that filters the portal grid.
export default function GlobalSearch({ value, onChange, resultCount, totalCount }) {
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
        </p>
      )}
    </div>
  );
}
