import { useEffect, useMemo, useState } from 'react';
import PortalCard from './components/PortalCard';
import GlobalSearch from './components/GlobalSearch';
import { portals, portalsById, searchEverything } from './data/portals';
import { searchIndex } from './data/searchIndex';
import { getRecentPortals } from './lib/storage';
import { getRandomPrayerTheme } from './data/prayerThemes';
import { prayerPool } from './prayerPool';
import { dayOfYear } from './lib/dateUtils';

function getDailyPrayer() {
  return prayerPool[dayOfYear() % prayerPool.length];
}

// Deterministic shuffle so consecutive days don't walk through same-portal
// entries in order. Fixed seed → same rotation order for everyone, every day.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A well-spread reading rotation drawn from every readable section in the hub.
const READING_POOL = (() => {
  const arr = searchIndex.slice();
  const rnd = mulberry32(20240531);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
})();

function getDailyReading() {
  if (READING_POOL.length === 0) return null;
  return READING_POOL[dayOfYear() % READING_POOL.length];
}

// Pick a different reading than the one currently shown, for the shuffle button.
function getRandomReading(excludeTitle) {
  if (READING_POOL.length === 0) return null;
  if (READING_POOL.length === 1) return READING_POOL[0];
  let pick;
  do {
    pick = READING_POOL[Math.floor(Math.random() * READING_POOL.length)];
  } while (pick.title === excludeTitle);
  return pick;
}

const LENS_COLORS = {
  Symbolic:      { border: 'rgba(167,139,250,0.30)', bg: 'rgba(167,139,250,0.07)', badge: 'rgba(167,139,250,0.16)', badgeText: '#c4b5fd' },
  Psychological: { border: 'rgba(6,182,212,0.30)',   bg: 'rgba(6,182,212,0.07)',   badge: 'rgba(6,182,212,0.16)',   badgeText: '#67e8f9' },
  Historical:    { border: 'rgba(251,191,36,0.30)',  bg: 'rgba(251,191,36,0.07)',  badge: 'rgba(251,191,36,0.16)',  badgeText: '#fde68a' },
  Wellness:      { border: 'rgba(52,211,153,0.30)',  bg: 'rgba(52,211,153,0.07)',  badge: 'rgba(52,211,153,0.16)',  badgeText: '#6ee7b7' },
  Reflection:    { border: 'rgba(244,114,182,0.30)', bg: 'rgba(244,114,182,0.07)', badge: 'rgba(244,114,182,0.16)', badgeText: '#fbcfe8' },
};

const ASTRO_CHART_URL = 'https://astro.cafeastrology.com/horoscope.php?date=12/28/1991&d1hour=12&d1min=0&tz=0.00&dformat=0&date2=06/03/2026&d2hour=18&d2min=47&lang=en';

const REFRESHING_AFFIRMATIONS = [
  { title: 'Alignment', lines: ['I am aligned with who I truly am.', 'I live in harmony with my values.', 'I naturally make choices that feel right for me.'] },
  { title: 'Stability', lines: ['I am steady and grounded.', 'I create stability wherever I go.', 'I trust myself to remain centered.'] },
  { title: 'Depth', lines: ['I embrace depth in myself and in life.', 'I connect with people in meaningful ways.', 'I value what is real, authentic, and profound.'] },
  { title: 'Honesty', lines: ['I am honest with myself and others.', 'I speak my truth with confidence and kindness.', 'I live transparently and authentically.'] },
  { title: 'Peace', lines: ['I am at peace with myself.', 'I carry calmness within me.', 'I choose peace over unnecessary conflict.'] },
  { title: 'Devotion', lines: ['I am devoted to what matters most.', 'I give my heart fully and sincerely.', 'I honor my commitments with love and consistency.'] },
  { title: 'Freedom', lines: ['I am free to be myself.', 'I live life on my own terms.', 'I trust my ability to choose my path.'] },
  { title: 'Purpose', lines: ['I am guided by purpose.', 'I know my life has meaning.', 'I move forward with intention and direction.'] },
  { title: 'Clarity', lines: ['I see clearly and think clearly.', 'I trust my understanding.', 'I make decisions with confidence and wisdom.'] },
  { title: 'Balance', lines: ['I live in balance and harmony.', 'I honor both work and rest.', 'I maintain healthy priorities.'] },
  { title: 'Growth', lines: ['I am always growing into my highest self.', 'I welcome growth and transformation.', 'I become stronger and wiser every day.'] },
  { title: 'Loyalty', lines: ['I am loyal to myself and those I love.', 'I build relationships based on trust and commitment.', 'I value faithfulness and consistency.'] },
  { title: 'Security', lines: ['I am secure in who I am.', 'I trust life to support me.', 'I feel safe, grounded, and protected.'] },
  { title: 'Connection', lines: ['I am deeply connected to myself and others.', 'I build meaningful and fulfilling relationships.', 'I welcome love, understanding, and closeness.'] },
  { title: 'Integrity', lines: ['I live with integrity in all that I do.', 'I honor my values through my actions.', 'I am trustworthy, authentic, and true to myself.'] },
  {
    title: 'Condensed Identity Version',
    lines: [
      'I am aligned.',
      'I am stable.',
      'I am deep.',
      'I am honest.',
      'I am peaceful.',
      'I am devoted.',
      'I am free.',
      'I am purposeful.',
      'I am clear.',
      'I am balanced.',
      'I am growing.',
      'I am loyal.',
      'I am secure.',
      'I am connected.',
      'I am a man of integrity.',
    ],
  },
].flatMap((group) => group.lines.map((line) => ({ title: group.title, line })));

function getRefreshingAffirmation() {
  return REFRESHING_AFFIRMATIONS[Math.floor(Math.random() * REFRESHING_AFFIRMATIONS.length)];
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
      marginBottom: 0,
      borderRadius: '20px',
      border: `1px solid ${c.border}`,
      background: c.bg,
      padding: 'clamp(16px, 3vw, 22px)',
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

function DailyReadingCard({ onNavigate }) {
  const [reading, setReading] = useState(() => getDailyReading());
  if (!reading) return null;

  const shuffle = (e) => {
    e.stopPropagation();
    setReading(getRandomReading(reading.title));
  };

  const portal = portalsById[reading.portalId];
  const c = LENS_COLORS[reading.lens] || LENS_COLORS.Symbolic;
  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const open = () =>
    onNavigate(reading.portalId, reading.section ? { section: reading.section } : undefined);

  return (
    <div
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') open(); }}
      style={{
        width: '100%',
        maxWidth: '680px',
        marginBottom: 0,
        borderRadius: '20px',
        border: `1px solid ${c.border}`,
        background: c.bg,
        padding: 'clamp(16px, 3vw, 22px)',
        backdropFilter: 'blur(20px)',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 18px 44px ${c.bg}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7096' }}>
          📖 Reading for Today
        </span>
        <span style={{
          background: c.badge,
          border: `1px solid ${c.border}`,
          color: c.badgeText,
          padding: '3px 10px',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          {reading.lens}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.74rem', color: '#7a7096' }}>{dateLabel}</span>
        <button
          type="button"
          onClick={shuffle}
          aria-label="Show a different reading"
          title="Show a different reading"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '999px',
            border: `1px solid ${c.border}`, background: c.badge, color: c.badgeText,
            cursor: 'pointer', fontSize: '0.85rem', lineHeight: 1, padding: 0,
          }}
        >
          ⟳
        </button>
      </div>

      <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)', fontWeight: 900, color: '#f1eeff', margin: '0 0 8px' }}>
        {reading.title}
      </h3>
      <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7, color: '#c4bbe0', margin: '0 0 16px' }}>
        {reading.summary}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.85rem', fontWeight: 700, color: c.badgeText,
        }}>
          Read today's page →
        </span>
        {portal && (
          <span style={{ marginLeft: 'auto', fontSize: '0.74rem', color: '#7a7096' }}>
            in {portal.titleFlat}
          </span>
        )}
      </div>
    </div>
  );
}

function AstroChartLink() {
  return (
    <a
      href={ASTRO_CHART_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: '1px solid rgba(147,197,253,0.26)',
        background: 'rgba(147,197,253,0.08)',
        color: '#bfdbfe',
        padding: '11px 18px',
        borderRadius: '999px',
        fontSize: '0.88rem',
        fontWeight: 800,
        textDecoration: 'none',
        backdropFilter: 'blur(14px)',
        letterSpacing: '0.01em',
        transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(147,197,253,0.14)';
        e.currentTarget.style.borderColor = 'rgba(147,197,253,0.46)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(147,197,253,0.08)';
        e.currentTarget.style.borderColor = 'rgba(147,197,253,0.26)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <span aria-hidden="true">☉</span>
      Transit chart
      <span aria-hidden="true" style={{ opacity: 0.7 }}>↗</span>
    </a>
  );
}

function RefreshingAffirmationCard({ affirmation }) {
  return (
    <aside
      aria-label="Refreshing affirmation"
      style={{
        width: '100%',
        maxWidth: '360px',
        justifySelf: 'end',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.055)',
        borderRadius: '18px',
        padding: '14px 16px',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 18px 48px rgba(0,0,0,0.22)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
        <p style={{
          margin: 0,
          color: 'rgba(216,206,255,0.65)',
          fontSize: '0.68rem',
          fontWeight: 900,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          Refreshing Affirmation
        </p>
        <span style={{
          flexShrink: 0,
          border: '1px solid rgba(196,165,255,0.18)',
          background: 'rgba(196,165,255,0.1)',
          color: '#d8ceff',
          borderRadius: '999px',
          padding: '3px 8px',
          fontSize: '0.66rem',
          fontWeight: 800,
        }}>
          {affirmation.title}
        </span>
      </div>
      <p style={{
        margin: 0,
        color: '#f1eeff',
        fontSize: 'clamp(0.9rem, 1.7vw, 1rem)',
        lineHeight: 1.55,
        fontWeight: 750,
      }}>
        {affirmation.line}
      </p>
    </aside>
  );
}

export default function HomePage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [recentIds] = useState(() => getRecentPortals());
  const [surpriseTheme, setSurpriseTheme] = useState(null);
  const [refreshingAffirmation] = useState(() => getRefreshingAffirmation());

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
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          padding: 'clamp(24px, 5vw, 56px) clamp(16px, 4vw, 40px) clamp(40px, 6vw, 72px)',
          textAlign: 'left',
        }}
      >
        <section
          style={{
            width: '100%',
            maxWidth: '1120px',
            margin: '0 auto clamp(24px, 4vw, 34px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(18px, 4vw, 36px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: '#d8ceff',
                padding: '8px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                backdropFilter: 'blur(14px)',
                marginBottom: '18px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span aria-hidden="true">✦</span> Spiritual toolkit
            </div>

            <h1
              style={{
                fontSize: 'clamp(3.1rem, 8vw, 6.5rem)',
                fontWeight: 950,
                lineHeight: 0.9,
                letterSpacing: '-0.06em',
                margin: '0 0 14px',
              }}
            >
              Sacred
              <span
                style={{
                  display: 'block',
                  background: 'linear-gradient(100deg, #c084fc 0%, #f0abfc 40%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Pathways
              </span>
            </h1>

            <p
              style={{
                maxWidth: '560px',
                color: '#a89ec4',
                fontSize: 'clamp(0.98rem, 2vw, 1.1rem)',
                lineHeight: 1.65,
                margin: '0 0 18px',
              }}
            >
              {portals.length} portals for inner symbolism, spiritual tradition, psychology, astrology, manifestation, relationships, and self-mastery.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={openSurprise}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  border: '1px solid rgba(196,165,255,0.25)',
                  background: 'rgba(196,165,255,0.08)',
                  color: '#c4a5ff',
                  padding: '11px 18px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backdropFilter: 'blur(14px)',
                  letterSpacing: '0.01em',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,165,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(196,165,255,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(196,165,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(196,165,255,0.25)'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '1rem' }}>⟳</span> Random prayer
              </button>
              <AstroChartLink />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '14px',
              alignContent: 'center',
            }}
          >
            <RefreshingAffirmationCard affirmation={refreshingAffirmation} />
            <DailyPrayerCard />
            <DailyReadingCard onNavigate={onNavigate} />
          </div>
        </section>

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
              margin: '0 auto 20px',
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
              margin: '0 auto',
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
              margin: '0 auto',
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
