import { EMOTIONS_SECTION, EMOTION_FAMILIES, conceptsInFamily, familySection } from '../data/emotions';
import { Breadcrumbs, ConceptCard, EmotionLink, PageHeader, PageMain, SectionTitle, CardGrid } from './EmotionUI';

export default function EmotionFamilyPage({ family, go }) {
  const concepts = conceptsInFamily(family.id);

  return (
    <PageMain>
      <Breadcrumbs go={go} trail={[{ label: 'Emotions', section: EMOTIONS_SECTION }, { label: family.name }]} />
      <PageHeader
        eyebrow={`${concepts.length} feelings`}
        title={family.name}
        color={family.color}
        intro="Open a feeling for its definition, how it works, and the feelings closest to it."
      />

      <section style={{ marginBottom: 34 }}>
        <CardGrid min={240}>
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.slug}
              concept={concept}
              go={go}
              color={family.color}
              note={concept.spiral[0] ? `On the spiral · ${concept.spiral[0].levelName}` : null}
            />
          ))}
        </CardGrid>
      </section>

      <section>
        <SectionTitle>Other families</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {EMOTION_FAMILIES.filter((other) => other.id !== family.id).map((other) => (
            <EmotionLink
              key={other.id}
              section={familySection(other.id)}
              go={go}
              style={{
                border: `1px solid ${other.color}55`,
                background: `${other.color}12`,
                color: other.color,
                borderRadius: 999,
                padding: '8px 12px',
                fontSize: 12.5,
                fontWeight: 800,
              }}
            >
              {other.name}
            </EmotionLink>
          ))}
        </div>
      </section>
    </PageMain>
  );
}
