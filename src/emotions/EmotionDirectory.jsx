import { useMemo, useState } from 'react';
import {
  EMOTION_CONCEPTS,
  EMOTION_FAMILIES,
  GLOSSARY_SECTION,
  SPIRAL_LEVELS,
  SPIRAL_SECTION,
  familiesById,
  familySection,
  searchEmotionConcepts,
} from '../data/emotions';
import { ConceptCard, EmotionLink, PINK, PageHeader, PageMain, SearchField, SectionTitle, CardGrid } from './EmotionUI';

const RESULT_LIMIT = 24;

function contextNote(concept) {
  return [
    ...concept.families.map((id) => familiesById[id].name),
    ...concept.spiral.slice(0, 1).map((position) => `Spiral · ${position.levelName}`),
  ].join(' · ');
}

export default function EmotionDirectory({ go }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchEmotionConcepts(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <PageMain>
      <PageHeader
        eyebrow="Emotional vocabulary"
        title="Name what you feel."
        intro="Start with a family of feelings, search for a word directly, or open the guidance spiral to see which way a state is moving."
      />

      <div style={{ maxWidth: 720, marginBottom: 26 }}>
        <SearchField
          value={query}
          onChange={setQuery}
          label="Search emotions"
          placeholder="Search resentment, hopefulness, courage, jealousy…"
        />
      </div>

      {searching ? (
        <section aria-live="polite" style={{ marginBottom: 34 }}>
          <SectionTitle count={results.length}>Matching feelings</SectionTitle>
          {results.length === 0 ? (
            <div style={{ border: '1px dashed rgba(255,255,255,0.18)', borderRadius: 20, padding: 30, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              No emotions found. Try another word, or browse the glossary.
            </div>
          ) : (
            <>
              <CardGrid min={240}>
                {results.slice(0, RESULT_LIMIT).map((concept) => (
                  <ConceptCard key={concept.slug} concept={concept} go={go} note={contextNote(concept)} />
                ))}
              </CardGrid>
              {results.length > RESULT_LIMIT && (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '14px 0 0' }}>
                  Showing the first {RESULT_LIMIT}. Narrow the search, or{' '}
                  <EmotionLink section={GLOSSARY_SECTION} go={go} style={{ color: PINK, fontWeight: 800 }}>browse the full glossary</EmotionLink>.
                </p>
              )}
            </>
          )}
        </section>
      ) : null}

      <section style={{ marginBottom: 34 }}>
        <SectionTitle count={EMOTION_FAMILIES.length}>Families of feelings</SectionTitle>
        <CardGrid min={250} gap={12}>
          {EMOTION_FAMILIES.map((family) => (
            <EmotionLink
              key={family.id}
              section={familySection(family.id)}
              go={go}
              style={{
                display: 'block',
                borderRadius: 20,
                border: `1px solid ${family.color}38`,
                background: `linear-gradient(135deg, ${family.color}14, rgba(255,255,255,0.03))`,
                padding: 18,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <h3 style={{ margin: 0, color: family.color, fontSize: 16, fontWeight: 900 }}>{family.name}</h3>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 800 }}>{family.emotions.length}</span>
              </div>
              <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.58)', fontSize: 13, lineHeight: 1.55 }}>
                {family.emotions.slice(0, 5).map(([name]) => name).join(', ')}
                {family.emotions.length > 5 ? '…' : ''}
              </p>
              <div style={{ marginTop: 12, color: family.color, fontSize: 12.5, fontWeight: 800 }}>Open →</div>
            </EmotionLink>
          ))}
        </CardGrid>
      </section>

      <section>
        <SectionTitle>Other ways in</SectionTitle>
        <CardGrid min={300} gap={12}>
          <EmotionLink
            section={GLOSSARY_SECTION}
            go={go}
            style={{ display: 'block', borderRadius: 20, border: `1px solid ${PINK}38`, background: 'rgba(255,255,255,0.035)', padding: 20 }}
          >
            <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>A–Z glossary</h3>
            <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.58)', fontSize: 13.5, lineHeight: 1.6 }}>
              All {EMOTION_CONCEPTS.length} feelings in one alphabetical list, with plain definitions.
            </p>
            <div style={{ marginTop: 12, color: PINK, fontSize: 12.5, fontWeight: 800 }}>Browse the glossary →</div>
          </EmotionLink>
          <EmotionLink
            section={SPIRAL_SECTION}
            go={go}
            style={{ display: 'block', borderRadius: 20, border: '1px solid rgba(34,197,94,0.32)', background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(239,68,68,0.08))', padding: 20 }}
          >
            <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>Guidance spiral</h3>
            <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.58)', fontSize: 13.5, lineHeight: 1.6 }}>
              {SPIRAL_LEVELS.length} bands of ascending and descending states around the boredom midline. Find where you are, then look one band up.
            </p>
            <div style={{ marginTop: 12, color: '#86efac', fontSize: 12.5, fontWeight: 800 }}>Open the spiral →</div>
          </EmotionLink>
        </CardGrid>
      </section>
    </PageMain>
  );
}
