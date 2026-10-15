import { useMemo, useState } from 'react';
import { DIRECTION_META, EMOTIONS_SECTION, SPIRAL_EMOTIONS, SPIRAL_LEVELS, conceptSection } from '../data/emotions';
import { Breadcrumbs, CrisisNote, EmotionLink, PageMain, ReflectionNote } from './EmotionUI';

function SpiralRibbon() {
  const loops = 11;
  const segments = Array.from({ length: loops }, (_, index) => {
    const y = 7 + index * 8;
    const nextY = y + 8;
    const left = 43 - index * 0.55;
    const right = 57 + index * 0.55;
    const startRight = index % 2 === 0;
    const startX = startRight ? right : left;
    const endX = startRight ? left : right;
    return `M ${startX} ${y} C ${startRight ? 80 : 20} ${y + 2}, ${startRight ? 20 : 80} ${nextY - 2}, ${endX} ${nextY}`;
  });

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="emotionRibbon" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5b21b6" />
          <stop offset="18%" stopColor="#2563eb" />
          <stop offset="38%" stopColor="#06b6d4" />
          <stop offset="52%" stopColor="#84cc16" />
          <stop offset="68%" stopColor="#d97706" />
          <stop offset="82%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="emotionCore" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="emotionGlow">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={segments.join(' ')} fill="none" stroke="url(#emotionRibbon)" strokeWidth="5.2" strokeLinecap="round" filter="url(#emotionGlow)" opacity="0.88" />
      <path d={segments.join(' ')} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.15" strokeLinecap="round" opacity="0.8" />
      <path d="M 50 0 C 57 18, 43 33, 50 50 C 57 66, 43 82, 50 100" fill="none" stroke="url(#emotionCore)" strokeWidth="12" opacity="0.55" />
      <path d="M 44 1 L 50 0 L 56 1 L 50 7 Z" fill="rgba(255,255,255,0.34)" />
      <path d="M 44 99 L 50 100 L 56 99 L 50 93 Z" fill="rgba(255,255,255,0.24)" />
    </svg>
  );
}

function EmotionChip({ label, tone, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${selected ? tone : `${tone}55`}`,
        background: selected ? `${tone}30` : 'rgba(11,13,24,0.72)',
        color: selected ? '#fff' : 'rgba(255,255,255,0.78)',
        borderRadius: 999,
        padding: '6px 9px',
        fontSize: 11,
        lineHeight: 1,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: selected ? `0 0 22px ${tone}3d` : 'none',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  );
}

function EmotionalSpiralDiagram({ selectedId, onSelect }) {
  const findEmotion = (name, direction) =>
    SPIRAL_EMOTIONS.find((emotion) => emotion.name === name && emotion.direction === direction) ||
    SPIRAL_EMOTIONS.find((emotion) => emotion.name === name);

  return (
    <section
      style={{
        position: 'relative',
        borderRadius: 28,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))',
        padding: '24px clamp(14px, 2.5vw, 28px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ color: '#e5e7eb', fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' }}>Emotional spiral</div>
        <h2 style={{ margin: '4px 0 0', color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.04em' }}>Ascending and descending states</h2>
      </div>

      <div
        className="spiral-diagram-grid"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(120px, 170px) minmax(0, 1fr)',
          gap: 12,
          alignItems: 'stretch',
        }}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: '54.2%', height: 1, background: 'rgba(255,255,255,0.35)', boxShadow: '0 0 18px rgba(255,255,255,0.26)' }} />
        <div style={{ gridColumn: 2, gridRow: `1 / ${SPIRAL_LEVELS.length + 1}`, minHeight: 760, position: 'relative', zIndex: 1 }}>
          <SpiralRibbon />
        </div>

        {SPIRAL_LEVELS.map((level, index) => (
          <div
            key={level.id}
            className={`spiral-row spiral-${level.direction}`}
            style={{
              display: 'contents',
            }}
          >
            <div style={{ gridColumn: 1, gridRow: index + 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, flexWrap: 'wrap', minHeight: 34, position: 'relative', zIndex: 3 }}>
              {level.left.map((label) => {
                const emotion = findEmotion(label, level.direction);
                return (
                  <EmotionChip
                    key={`${level.id}-${label}-left`}
                    label={label}
                    tone={level.tone}
                    selected={emotion?.id === selectedId}
                    onClick={() => emotion && onSelect(emotion)}
                  />
                );
              })}
            </div>
            <div style={{ gridColumn: 3, gridRow: index + 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6, flexWrap: 'wrap', minHeight: 34, position: 'relative', zIndex: 3 }}>
              {level.right.map((label) => {
                const emotion = findEmotion(label, level.direction);
                return (
                  <EmotionChip
                    key={`${level.id}-${label}-right`}
                    label={label}
                    tone={level.tone}
                    selected={emotion?.id === selectedId}
                    onClick={() => emotion && onSelect(emotion)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 16, color: 'rgba(255,255,255,0.58)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
        <span>Ascending</span>
        <span>Descending</span>
      </div>
    </section>
  );
}

const directionMeta = DIRECTION_META;

export default function GuidanceSpiral({ go }) {
  const [activeDirection, setActiveDirection] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('ascending-joy');

  const visibleEmotions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SPIRAL_EMOTIONS.filter((emotion) => {
      const matchesDirection = activeDirection === 'all' || emotion.direction === activeDirection;
      const haystack = [
        emotion.name,
        emotion.definition,
        emotion.explanation,
        emotion.directionLabel,
        emotion.levelName,
      ].join(' ').toLowerCase();
      return matchesDirection && (!q || haystack.includes(q));
    });
  }, [activeDirection, query]);

  const selectedEmotion =
    SPIRAL_EMOTIONS.find((emotion) => emotion.id === selectedId) ||
    visibleEmotions[0] ||
    SPIRAL_EMOTIONS[0];

  const groupedVisible = ['ascending', 'neutral', 'descending'].map((direction) => ({
    id: direction,
    name: directionMeta[direction].category,
    color: directionMeta[direction].color,
    summary: directionMeta[direction].summary,
    emotions: visibleEmotions.filter((emotion) => emotion.direction === direction),
  })).filter((group) => group.emotions.length > 0);

  const selectEmotion = (emotion) => {
    setSelectedId(emotion.id);
  };

  return (
    <PageMain>
      <style>
        {`
          .spiral-layout {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(280px, 330px);
            gap: 24px;
            align-items: start;
          }

          .spiral-detail {
            position: sticky;
            z-index: 10;
            top: 108px;
            max-height: calc(100vh - 124px);
            overflow-y: auto;
          }

          /* Narrow screens: one column, and the detail rides along the bottom of
             the viewport so picking a state never means scrolling to find it. */
          @media (max-width: 1023px) {
            .spiral-layout {
              grid-template-columns: minmax(0, 1fr);
            }

            .spiral-detail {
              top: auto;
              bottom: 12px;
              max-height: 36vh;
              padding: 14px 16px !important;
              box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.55);
              background-color: rgba(11, 13, 24, 0.94) !important;
              backdrop-filter: blur(14px);
            }

            .spiral-detail h2 {
              font-size: 24px !important;
            }

            .spiral-detail .spiral-detail-explanation {
              margin-top: 8px !important;
            }

            .spiral-detail .spiral-detail-note,
            .spiral-detail .spiral-detail-rule {
              display: none;
            }
          }

          @media (max-width: 760px) {
            .spiral-diagram-grid {
              grid-template-columns: minmax(0, 1fr) !important;
            }

            .spiral-diagram-grid > div:nth-child(2) {
              display: none !important;
            }

            .spiral-row > div {
              grid-column: 1 !important;
              grid-row: auto !important;
              justify-content: flex-start !important;
              min-height: auto !important;
              margin-bottom: 6px !important;
            }
          }
        `}
      </style>
      <Breadcrumbs go={go} trail={[{ label: 'Emotions', section: EMOTIONS_SECTION }, { label: 'Guidance spiral' }]} />

      <header style={{ marginBottom: 28 }}>
        <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
          Guidance spiral
        </div>
        <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(2.1rem, 5vw, 4.8rem)', lineHeight: 0.96, letterSpacing: '-0.035em' }}>
          Map the feeling on the spiral.
        </h1>
        <p style={{ maxWidth: 640, color: 'rgba(255,255,255,0.58)', fontSize: '1rem', lineHeight: 1.75, margin: '18px 0 0' }}>
          Ascending states sit above the boredom midline, descending states below it, and crisis language is clearly marked at the floor.
        </p>
      </header>

      <div className="spiral-layout">
        <div style={{ minWidth: 0 }}>
          <div id="emotion-spiral-map" style={{ marginBottom: 28 }}>
            <EmotionalSpiralDiagram selectedId={selectedEmotion.id} onSelect={selectEmotion} />
          </div>

          <section id="emotion-spiral-list" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: 20,
            alignItems: 'start',
          }}>
            <div style={{ position: 'sticky', top: 76, display: 'grid', gap: 14 }}>
              <CrisisNote />
              <div style={{
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.035)',
                padding: 16,
              }}>
                <div style={{ color: '#fff', fontSize: 14, fontWeight: 900, marginBottom: 10 }}>How to use it</div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>
                  Find the nearest word, then look one or two bands upward. The next useful move is usually not the top of the chart; it is the closest believable improvement in state.
                </p>
              </div>
            </div>

            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: 12,
                marginBottom: 18,
              }}>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  aria-label="Search the spiral"
                  placeholder="Search shame, hopefulness, courage, jealousy, integrity..."
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[
                    { id: 'all', label: 'All', color: '#ffffff' },
                    { id: 'ascending', label: 'Ascending', color: directionMeta.ascending.color },
                    { id: 'neutral', label: 'Midline', color: directionMeta.neutral.color },
                    { id: 'descending', label: 'Descending', color: directionMeta.descending.color },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveDirection(filter.id)}
                      aria-pressed={activeDirection === filter.id}
                      style={{
                        border: `1px solid ${filter.id === 'all' ? 'rgba(255,255,255,0.14)' : `${filter.color}55`}`,
                        background: activeDirection === filter.id ? `${filter.color}24` : 'rgba(255,255,255,0.035)',
                        color: activeDirection === filter.id ? '#fff' : 'rgba(255,255,255,0.68)',
                        borderRadius: 999,
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 800,
                        fontFamily: 'inherit',
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {groupedVisible.length === 0 ? (
                <div style={{ border: '1px dashed rgba(255,255,255,0.18)', borderRadius: 20, padding: 30, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                  No emotions found. Try another word.
                </div>
              ) : groupedVisible.map((group) => (
                <section key={group.id} style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: 20 }}>{group.name}</h3>
                    <span style={{ color: group.color, fontSize: 12, fontWeight: 800 }}>{group.emotions.length}</span>
                  </div>
                  <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, fontSize: 13 }}>{group.summary}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(230px, 100%), 1fr))', gap: 10 }}>
                    {group.emotions.map((emotion) => (
                      <button
                        key={emotion.id}
                        type="button"
                        onClick={() => selectEmotion(emotion)}
                        style={{
                          textAlign: 'left',
                          border: `1px solid ${emotion.id === selectedEmotion.id ? emotion.color : 'rgba(255,255,255,0.09)'}`,
                          borderRadius: 16,
                          background: emotion.id === selectedEmotion.id ? `${emotion.color}18` : 'rgba(255,255,255,0.035)',
                          padding: 14,
                          cursor: 'pointer',
                          color: '#fff',
                          minHeight: 122,
                          fontFamily: 'inherit',
                        }}
                      >
                        <strong style={{ color: emotion.color, fontSize: 14 }}>{emotion.name}</strong>
                        <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.55, fontSize: 12.5, margin: '7px 0 0' }}>{emotion.definition}</p>
                        <p style={{ color: 'rgba(255,255,255,0.34)', lineHeight: 1.45, fontSize: 11.5, margin: '8px 0 0' }}>{emotion.levelName}</p>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>

        <aside id="emotion-detail" className="spiral-detail" aria-live="polite" style={{
          border: `1px solid ${selectedEmotion.color}55`,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${selectedEmotion.color}18, rgba(255,255,255,0.035))`,
          padding: 22,
        }}>
          <div style={{ color: selectedEmotion.color, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            {selectedEmotion.directionLabel} / {selectedEmotion.levelName}
          </div>
          <h2 style={{ margin: '8px 0 8px', color: '#fff', fontSize: 34, letterSpacing: '-0.03em' }}>{selectedEmotion.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>{selectedEmotion.definition}</p>
          <div className="spiral-detail-rule" style={{ height: 1, background: `${selectedEmotion.color}44`, margin: '18px 0' }} />
          <h3 className="spiral-detail-rule" style={{ margin: '0 0 8px', color: '#fff', fontSize: 14 }}>Spiral reading</h3>
          <p className="spiral-detail-explanation" style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{selectedEmotion.explanation}</p>
          <EmotionLink
            section={conceptSection(selectedEmotion.slug)}
            go={go}
            style={{ display: 'inline-block', margin: '16px 0 14px', color: selectedEmotion.color, fontSize: 13, fontWeight: 800 }}
          >
            Open {selectedEmotion.name} →
          </EmotionLink>
          <div className="spiral-detail-note"><ReflectionNote /></div>
        </aside>
      </div>
    </PageMain>
  );
}
