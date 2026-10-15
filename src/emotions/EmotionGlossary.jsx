import { useMemo, useState } from 'react';
import { CONCEPTS_ALPHABETICAL, EMOTIONS_SECTION, familiesById, searchEmotionConcepts } from '../data/emotions';
import { Breadcrumbs, EmotionLink, PINK, PageHeader, PageMain, SearchField } from './EmotionUI';

const PAGE_SIZE = 40;

const pagerButton = (active, disabled) => ({
  minWidth: 38,
  border: `1px solid ${active ? PINK : 'rgba(255,255,255,0.12)'}`,
  background: active ? `${PINK}24` : 'rgba(255,255,255,0.035)',
  color: disabled ? 'rgba(255,255,255,0.3)' : '#fff',
  borderRadius: 999,
  padding: '8px 12px',
  fontSize: 12.5,
  fontWeight: 800,
  cursor: disabled ? 'default' : 'pointer',
  fontFamily: 'inherit',
});

export default function EmotionGlossary({ go }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  // Search keeps the list alphabetical: it narrows, it doesn't re-rank.
  const filtered = useMemo(() => {
    if (!query.trim()) return CONCEPTS_ALPHABETICAL;
    const matches = new Set(searchEmotionConcepts(query));
    return CONCEPTS_ALPHABETICAL.filter((concept) => matches.has(concept));
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);

  const turnTo = (next) => {
    setPage(next);
    document.getElementById('emotion-glossary-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageMain>
      <Breadcrumbs go={go} trail={[{ label: 'Emotions', section: EMOTIONS_SECTION }, { label: 'Glossary' }]} />
      <PageHeader
        eyebrow={`${CONCEPTS_ALPHABETICAL.length} feelings, A–Z`}
        title="Emotion glossary"
        intro="Every feeling from the families and the guidance spiral, with a plain definition. Open one for how it works and what sits near it."
      />

      <div style={{ maxWidth: 720, marginBottom: 18 }}>
        <SearchField
          value={query}
          onChange={(value) => { setQuery(value); setPage(0); }}
          label="Filter the glossary"
          placeholder="Filter by word or meaning…"
        />
      </div>

      <div id="emotion-glossary-list" aria-live="polite" style={{ scrollMarginTop: 96 }}>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12.5, fontWeight: 700, margin: '0 0 10px' }}>
          {filtered.length === 0
            ? 'No feelings match that search.'
            : `${current * PAGE_SIZE + 1}–${current * PAGE_SIZE + visible.length} of ${filtered.length}`}
        </p>

        <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', columnGap: 22, margin: 0 }}>
          {visible.map((concept) => (
            <div key={concept.slug} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 0' }}>
              <dt>
                <EmotionLink section={concept.section} go={go} style={{ color: concept.color, fontSize: 14.5, fontWeight: 900 }}>
                  {concept.name}
                </EmotionLink>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11.5, fontWeight: 700, marginLeft: 8 }}>
                  {[...concept.families.map((id) => familiesById[id].name), ...(concept.spiral.length ? ['Spiral'] : [])].join(' · ')}
                </span>
              </dt>
              <dd style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.55, margin: '4px 0 0' }}>
                {concept.summary}
                {concept.meanings.length > 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.38)' }}> (+{concept.meanings.length - 1} more {concept.meanings.length > 2 ? 'meanings' : 'meaning'})</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {pageCount > 1 && (
          <nav aria-label="Glossary pages" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            <button type="button" disabled={current === 0} onClick={() => turnTo(current - 1)} style={pagerButton(false, current === 0)}>
              ← Prev
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => turnTo(index)}
                aria-current={index === current ? 'page' : undefined}
                style={pagerButton(index === current, false)}
              >
                {index + 1}
              </button>
            ))}
            <button type="button" disabled={current === pageCount - 1} onClick={() => turnTo(current + 1)} style={pagerButton(false, current === pageCount - 1)}>
              Next →
            </button>
          </nav>
        )}
      </div>
    </PageMain>
  );
}
