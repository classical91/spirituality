import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  EMOTION_CONCEPTS,
  EMOTION_FAMILIES,
  SPIRAL_EMOTIONS,
  SPIRAL_LEVELS,
  conceptsBySlug,
  conceptsInFamily,
  emotionSearchEntries,
  relatedConcepts,
  resolveEmotionSection,
  searchEmotionConcepts,
  slugify,
} from '../emotions.js';
import { searchIndex, searchSections } from '../searchIndex.js';
import { READING_POOL } from '../../lib/dailyReading.js';

describe('emotions catalog', () => {
  it('gives every glossary word a concept page that keeps its family definition', () => {
    for (const family of EMOTION_FAMILIES) {
      for (const [name, definition] of family.emotions) {
        const concept = conceptsBySlug[slugify(name)];
        assert.ok(concept, `${name} has no concept`);
        assert.ok(
          concept.meanings.some((meaning) => meaning.familyId === family.id && meaning.definition === definition),
          `${name} lost its ${family.id} definition`
        );
      }
    }
  });

  it('gives every spiral word a concept page that keeps its spiral reading', () => {
    for (const level of SPIRAL_LEVELS) {
      for (const name of [...level.left, ...level.right]) {
        const concept = conceptsBySlug[slugify(name)];
        assert.ok(concept, `${name} has no concept`);
        assert.ok(concept.spiral.some((position) => position.levelId === level.id), `${name} lost band ${level.id}`);
      }
    }
    // A word without authored spiral copy (today only Dread) gets a generated
    // placeholder on the spiral; its concept page uses the real glossary
    // definition instead, so only authored copy must carry over.
    const authored = SPIRAL_EMOTIONS.filter((emotion) => !emotion.definition.endsWith('as shown on the emotional spiral.'));
    assert.equal(authored.length, SPIRAL_EMOTIONS.length - 1);
    for (const emotion of authored) {
      const concept = conceptsBySlug[emotion.slug];
      assert.ok(concept.meanings.some((meaning) => meaning.definition === emotion.definition), `${emotion.name} lost its definition`);
      if (concept.explanation) assert.equal(concept.explanation, emotion.explanation);
    }
  });

  it('includes glossary-only and spiral-only words', () => {
    assert.deepEqual(conceptsBySlug.resentment.spiral, []);
    assert.deepEqual(conceptsBySlug.victor.families, []);
  });

  it('keeps distinct contextual meanings side by side', () => {
    const definitions = conceptsBySlug.acceptance.meanings.map((meaning) => meaning.definition);
    assert.ok(definitions.includes('Feeling welcomed or approved of.'));
    assert.ok(definitions.includes('Allowing reality instead of fighting it.'));
  });

  it('never folds two different words into one slug', () => {
    const names = new Map();
    const words = [
      ...EMOTION_FAMILIES.flatMap((family) => family.emotions.map(([name]) => name)),
      ...SPIRAL_LEVELS.flatMap((level) => [...level.left, ...level.right]),
    ];
    for (const name of words) {
      const slug = slugify(name);
      assert.equal(names.get(slug) ?? name, name, `${name} collides with ${names.get(slug)}`);
      names.set(slug, name);
    }
    assert.equal(new Set(EMOTION_CONCEPTS.map((concept) => concept.slug)).size, EMOTION_CONCEPTS.length);
  });
});

describe('emotion sections', () => {
  it('keeps the existing section URLs working', () => {
    assert.equal(resolveEmotionSection('emotions').view, 'directory');
    assert.equal(resolveEmotionSection('emotion-glossary').view, 'glossary');
    assert.equal(resolveEmotionSection('guidance-spiral').view, 'spiral');
    for (const family of EMOTION_FAMILIES) {
      assert.equal(resolveEmotionSection(`emotions-${family.id}`).family, family);
    }
  });

  it('resolves every concept page and nothing else', () => {
    for (const concept of EMOTION_CONCEPTS) {
      assert.equal(resolveEmotionSection(concept.section).concept, concept);
    }
    assert.equal(resolveEmotionSection('emotion-not-a-feeling'), null);
    assert.equal(resolveEmotionSection('emotions-nope'), null);
    assert.equal(resolveEmotionSection('emotional-awareness'), null);
    assert.equal(resolveEmotionSection(undefined), null);
  });

  it('lists a family in its original order', () => {
    assert.deepEqual(
      conceptsInFamily('angry').map((concept) => concept.name),
      EMOTION_FAMILIES.find((family) => family.id === 'angry').emotions.map(([name]) => name)
    );
  });

  it('links a concept to its family and the band above it', () => {
    assert.ok(relatedConcepts(conceptsBySlug.resentment).family.some((concept) => concept.name === 'Bitterness'));
    const anger = relatedConcepts(conceptsBySlug.anger);
    assert.equal(anger.stepUp.level.id, 'insecurity-judgment');
    assert.ok(anger.band.some((concept) => concept.name === 'Revenge'));
    assert.ok(!anger.band.includes(conceptsBySlug.anger));
    assert.equal(relatedConcepts(conceptsBySlug['unconditional-love']).stepUp, null);
  });
});

describe('emotion search', () => {
  it('ranks the exact word first', () => {
    assert.equal(searchEmotionConcepts('resentment')[0].name, 'Resentment');
    assert.equal(searchEmotionConcepts('  ')[0], undefined);
  });

  it('surfaces concept pages in global search without touching the daily reading', () => {
    assert.equal(searchSections('resentment')[0].section, 'emotion-resentment');
    const ids = searchIndex.map((entry) => entry.id);
    assert.equal(new Set(ids).size, ids.length);
    const conceptIds = new Set(emotionSearchEntries.map((entry) => entry.id));
    assert.ok(READING_POOL.every((entry) => !conceptIds.has(entry.id)));
  });
});
