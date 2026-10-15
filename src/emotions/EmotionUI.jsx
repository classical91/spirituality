import { emotionHref } from '../data/emotions';

// Building blocks shared by the Emotions pages. Links are real <a href>s to the
// page's ?section= URL (so they open in a new tab, survive refresh, and work
// with back/forward); a plain click hands the section to `go` instead.

export const PINK = '#f472b6';

export function EmotionLink({ section, go, style, children, ...rest }) {
  return (
    <a
      href={emotionHref(section)}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        go(section);
      }}
      style={{ textDecoration: 'none', color: 'inherit', ...style }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function PageMain({ children }) {
  return (
    <main style={{ maxWidth: 'var(--ia-max, 1280px)', margin: '0 auto', padding: '28px clamp(16px, 4vw, 24px) 72px' }}>
      {children}
    </main>
  );
}

// `trail` is [{ label, section? }]; the last item is the current page.
export function Breadcrumbs({ trail, go }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, listStyle: 'none', margin: 0, padding: 0, fontSize: 12.5, fontWeight: 800 }}>
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {last || !item.section ? (
                <span aria-current={last ? 'page' : undefined} style={{ color: last ? '#fff' : 'rgba(255,255,255,0.5)' }}>{item.label}</span>
              ) : (
                <EmotionLink section={item.section} go={go} style={{ color: PINK }}>{item.label}</EmotionLink>
              )}
              {!last && <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({ eyebrow, title, intro, color = PINK, children }) {
  return (
    <header style={{ marginBottom: 26 }}>
      {eyebrow && (
        <div style={{ color, fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
          {eyebrow}
        </div>
      )}
      <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.8rem)', lineHeight: 1, letterSpacing: '-0.035em', overflowWrap: 'anywhere' }}>
        {title}
      </h1>
      {intro && (
        <p style={{ maxWidth: 680, color: 'rgba(255,255,255,0.58)', fontSize: '1rem', lineHeight: 1.75, margin: '16px 0 0' }}>{intro}</p>
      )}
      {children}
    </header>
  );
}

export function SearchField({ value, onChange, placeholder, label }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type="search"
      aria-label={label}
      placeholder={placeholder}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.055)',
        color: '#fff',
        borderRadius: 16,
        padding: '14px 16px',
        fontSize: 16,
        outline: 'none',
        fontFamily: 'inherit',
      }}
    />
  );
}

// A concept as a tappable card: name, its first meaning, and an optional note.
export function ConceptCard({ concept, go, note, color = concept.color }) {
  return (
    <EmotionLink
      section={concept.section}
      go={go}
      style={{
        display: 'block',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.035)',
        padding: 14,
      }}
    >
      <strong style={{ color, fontSize: 14.5 }}>{concept.name}</strong>
      <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, fontSize: 13, margin: '6px 0 0' }}>{concept.summary}</p>
      {note && <p style={{ color: 'rgba(255,255,255,0.36)', lineHeight: 1.45, fontSize: 11.5, margin: '8px 0 0' }}>{note}</p>}
    </EmotionLink>
  );
}

export function ConceptChip({ concept, go, color = concept.color }) {
  return (
    <EmotionLink
      section={concept.section}
      go={go}
      style={{
        border: `1px solid ${color}55`,
        background: `${color}14`,
        color: '#fff',
        borderRadius: 999,
        padding: '7px 12px',
        fontSize: 12.5,
        fontWeight: 800,
        lineHeight: 1.1,
      }}
    >
      {concept.name}
    </EmotionLink>
  );
}

export function CardGrid({ min, gap = 10, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))`, gap }}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, count, color = PINK }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '0 0 12px' }}>
      <h2 style={{ color: '#fff', margin: 0, fontSize: 20, letterSpacing: '-0.01em' }}>{children}</h2>
      {count != null && <span style={{ color, fontSize: 12, fontWeight: 800 }}>{count}</span>}
    </div>
  );
}

export function CrisisNote() {
  return (
    <div style={{
      border: '1px solid rgba(248,113,113,0.34)',
      borderRadius: 18,
      background: 'rgba(127,29,29,0.22)',
      padding: 14,
      color: 'rgba(254,226,226,0.9)',
      fontSize: 12.5,
      lineHeight: 1.65,
    }}>
      If "No Will to Live" or "Death" feels literal, current, or unsafe, contact emergency services or a crisis line now. In the U.S. or Canada, call or text 988 for immediate crisis support.
    </div>
  );
}

export function ReflectionNote() {
  return (
    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
      This is a reflection map, not a diagnosis. Use it to name direction, not to shame yourself for being in a lower state.
    </p>
  );
}
