import {
  EMOTIONS_SECTION,
  SPIRAL_SECTION,
  familiesById,
  familySection,
  relatedConcepts,
} from '../data/emotions';
import { Breadcrumbs, ConceptChip, CrisisNote, EmotionLink, PageHeader, PageMain, ReflectionNote, SectionTitle } from './EmotionUI';

const panel = (color) => ({
  border: `1px solid ${color}38`,
  borderRadius: 20,
  background: `linear-gradient(135deg, ${color}10, rgba(255,255,255,0.03))`,
  padding: 'clamp(16px, 3vw, 22px)',
});

function RelatedRow({ title, concepts, go, color, children }) {
  if (concepts.length === 0) return null;
  return (
    <section style={{ marginBottom: 22 }}>
      <SectionTitle color={color} count={concepts.length}>{title}</SectionTitle>
      {children}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {concepts.map((concept) => <ConceptChip key={concept.slug} concept={concept} go={go} />)}
      </div>
    </section>
  );
}

export default function EmotionConceptPage({ concept, go }) {
  const primaryFamily = familiesById[concept.primaryFamilyId];
  const related = relatedConcepts(concept);
  const trail = [
    { label: 'Emotions', section: EMOTIONS_SECTION },
    primaryFamily
      ? { label: primaryFamily.name, section: familySection(primaryFamily.id) }
      : { label: 'Guidance spiral', section: SPIRAL_SECTION },
    { label: concept.name },
  ];
  const eyebrow = [
    ...concept.families.map((id) => familiesById[id].name),
    ...(concept.spiral.length ? [concept.spiral[0].directionLabel] : []),
  ].join(' · ');

  return (
    <PageMain>
      <Breadcrumbs go={go} trail={trail} />
      <PageHeader eyebrow={eyebrow} title={concept.name} color={concept.color} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 16, alignItems: 'start', marginBottom: 30 }}>
        <section style={panel(concept.color)}>
          <h2 style={{ margin: '0 0 12px', color: '#fff', fontSize: 15 }}>
            {concept.meanings.length > 1 ? 'Meanings' : 'Meaning'}
          </h2>
          <dl style={{ display: 'grid', gap: 14, margin: 0 }}>
            {concept.meanings.map((meaning) => (
              <div key={meaning.label}>
                {concept.meanings.length > 1 && (
                  <dt style={{ color: meaning.familyId ? familiesById[meaning.familyId].color : '#86efac', fontSize: 11.5, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                    {meaning.familyId ? `As a ${meaning.label.toLowerCase().replace(/ emotions$/, '')} emotion` : 'On the spiral'}
                  </dt>
                )}
                <dd style={{ margin: 0, color: 'rgba(255,255,255,0.86)', fontSize: 17, lineHeight: 1.6 }}>{meaning.definition}</dd>
              </div>
            ))}
          </dl>
          {concept.explanation && (
            <>
              <div style={{ height: 1, background: `${concept.color}33`, margin: '18px 0' }} />
              <h2 style={{ margin: '0 0 8px', color: '#fff', fontSize: 15 }}>How it works</h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.62)', fontSize: 14.5, lineHeight: 1.7 }}>{concept.explanation}</p>
            </>
          )}
        </section>

        <aside style={{ display: 'grid', gap: 14 }}>
          {concept.crisis && <CrisisNote />}
          {concept.spiral.map((position) => (
            <section key={position.levelId} style={panel(position.tone)}>
              <div style={{ color: position.tone, fontSize: 11.5, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {position.directionLabel}
              </div>
              <h2 style={{ margin: '6px 0 6px', color: '#fff', fontSize: 18 }}>Spiral band: {position.levelName}</h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 13.5, lineHeight: 1.65 }}>{position.meaning}</p>
              <EmotionLink section={SPIRAL_SECTION} go={go} style={{ display: 'inline-block', marginTop: 12, color: position.tone, fontSize: 12.5, fontWeight: 800 }}>
                See it on the spiral →
              </EmotionLink>
            </section>
          ))}
          {concept.families.length > 0 && (
            <section style={panel('#ffffff')}>
              <h2 style={{ margin: '0 0 10px', color: '#fff', fontSize: 15 }}>Part of</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {concept.families.map((id) => (
                  <EmotionLink
                    key={id}
                    section={familySection(id)}
                    go={go}
                    style={{ border: `1px solid ${familiesById[id].color}55`, color: familiesById[id].color, borderRadius: 999, padding: '7px 12px', fontSize: 12.5, fontWeight: 800 }}
                  >
                    {familiesById[id].name}
                  </EmotionLink>
                ))}
              </div>
            </section>
          )}
          <ReflectionNote />
        </aside>
      </div>

      {related.stepUp && related.stepUp.concepts.length > 0 && (
        <RelatedRow title="One band up the spiral" concepts={related.stepUp.concepts} go={go} color={related.stepUp.level.tone}>
          <p style={{ margin: '-4px 0 12px', color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6 }}>
            {related.stepUp.level.name}: {related.stepUp.level.meaning} The next useful move is usually the closest believable improvement, not the top of the chart.
          </p>
        </RelatedRow>
      )}
      <RelatedRow title="Same spiral band" concepts={related.band} go={go} color={concept.spiral[0]?.tone} />
      <RelatedRow
        title={primaryFamily && concept.families.length === 1 ? `More ${primaryFamily.name.toLowerCase()}` : 'Related feelings'}
        concepts={related.family}
        go={go}
        color={concept.color}
      />
    </PageMain>
  );
}
