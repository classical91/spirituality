import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { demons, DEMON_FILTERS } from '../demonology.js';
import { westernEntries } from '../demonologyWestern.js';
import { worldEntries } from '../demonologyWorld.js';
import { demonologyArticleIds } from '../demonologyIds.js';
import {
  ASSOCIATION_THEMES,
  ENTITY_CLASSES,
  SOURCE_LAYERS,
  TIMELINE_TRACKS,
  TRADITION_GROUPS,
} from '../demonologyTaxonomy.js';
import { DEMONOLOGY_TIMELINE, COMPARISON_IDS } from '../demonologyTimeline.js';
import { GOETIA_RANKS, GOETIA_SPIRITS } from '../goetia.js';
import {
  codexEntries,
  CODEX_CATEGORIES,
  CODEX_STATS,
  CODEX_TYPES,
  inCodexCategory,
} from '../infernalCodex.js';
import { searchIndex } from '../searchIndex.js';
import { foldText, indexLetter, searchEntries, searchTerms } from '../../lib/demonologySearch.js';
import { normalizeInitialSection } from '../../lib/moralAtlas.js';

const ATLAS_IDS = new Set(demons.map((d) => d.id));
const CODEX_IDS = new Set(codexEntries.map((e) => e.id));
const EXPANSION = [...westernEntries, ...worldEntries];

// Every article id that existed before the atlas expansion. These are live
// deep links (?section=<id>) and must never be renamed or dropped.
const LEGACY_ATLAS_IDS = [
  'demonology', 'what-is-a-demon', 'personification-vs-embodiment', 'wickedness', 'temptation',
  'sin-and-corruption', 'satan', 'devil', 'lucifer', 'beelzebub', 'belial', 'mammon', 'azazel',
  'moloch', 'remphan', 'mastema', 'lilith', 'seven-princes', 'classification', 'sins-overview',
  'pride', 'greed', 'lust', 'envy', 'gluttony', 'wrath', 'sloth', 'acedia', 'logismoi',
  'sexual-fantasy-vs-lust', 'killing-and-murder', 'lesser-key', 'ars-goetia',
  'spirits-of-solomon', 'ephippas', 'baal', 'agares', 'asmodeus', 'astaroth', 'belphegor',
  'marchosias', 'infernal-hierarchies', 'king-of-hell', 'duke-of-hell', 'prince-of-hell',
  'marquis-of-hell', 'president-of-hell', 'what-is-a-sigil', 'sigil-of-baal',
  'seal-of-astaroth', 'seals-history', 'archons', 'demiurge', 'gnostic-cosmology',
  'spiritual-ignorance', 'gods-reinterpreted', 'interpretatio-graeca', 'mesopotamian-deities',
  'lunar-deities', 'solar-disk-gods', 'wind-deities', 'celtic-deities', 'names-celtic',
  'comparative-overview', 'demons-christianity', 'demons-judaism', 'demons-islam',
  'demons-gnosticism', 'demons-mesopotamia', 'demons-greek', 'demons-celtic',
  'demons-as-archetypes', 'jungian-shadow', 'symbolic-evil', 'inner-temptation',
  'spiritual-warfare',
];

const LEGACY_CODEX_IDS = [
  'agares', 'astaroth', 'baal', 'ars-goetia-list', 'marchosias', 'spirits-of-solomon', 'lesser-key',
  'ephippas', 'asmodeus', 'beelzebub', 'belial', 'belphegor', 'lucifer', 'mammon', 'satan',
  'seven-princes', 'pride', 'sloth', 'seven-deadly-sins', 'acedia', 'killing-and-murder', 'logismoi',
  'sexual-fantasy-vs-lust', 'sinful-desires-frameworks', 'classification-of-demons', 'devil',
  'duke-of-hell', 'types-of-angels-and-demons', 'azazel', 'lilith', 'mastema', 'moloch', 'remphan',
  'wind-deities', 'lunar-deities', 'mesopotamian-deities', 'solar-disk-gods', 'celtic-deities',
  'celtic-names', 'interpretatio-graeca', 'personification-across-cultures', 'wickedness', 'horror',
  'personification-vs-embodiment', 'seal-of-astaroth', 'sigil-of-baal', 'archons',
];

// The Sacred Moral Atlas tab ids, read from its source so this test follows
// any change there. An article id equal to a tab id would hijack that tab's
// ?section= link (articles are resolved first).
const atlasSource = readFileSync(new URL('../../BibleConceptAtlas.jsx', import.meta.url), 'utf8');
const tabBlock = atlasSource.slice(atlasSource.indexOf('const tabs = ['), atlasSource.indexOf('];', atlasSource.indexOf('const tabs = [')));
const TAB_IDS = new Set([...tabBlock.matchAll(/id: "([^"]+)"/g)].map((m) => m[1]));

const SECTION_LINKS = { tabIds: TAB_IDS, articleIds: new Set(demonologyArticleIds) };

const top = (results) => results[0]?.id;
const ATLAS_FIELDS = ['name', 'aliases', 'originalName', 'role', 'summary', 'overview', 'traditions', 'traditionGroups', 'classification'];
const CODEX_FIELDS = ['name', 'aliases', 'title', 'explanation', 'tradition', 'tags'];

describe('demonology atlas integrity', () => {
  it('has unique ids and unique names', () => {
    assert.equal(ATLAS_IDS.size, demons.length);
    const names = demons.map((d) => foldText(d.name));
    assert.equal(new Set(names).size, names.length, 'two entries share a name');
  });

  it('keeps every legacy article id, in its original order, at the front of the index', () => {
    LEGACY_ATLAS_IDS.forEach((id) => assert.ok(ATLAS_IDS.has(id), `legacy id "${id}" was removed`));
    assert.deepEqual(demonologyArticleIds.slice(0, LEGACY_ATLAS_IDS.length), LEGACY_ATLAS_IDS);
    assert.deepEqual(demonologyArticleIds, demons.map((d) => d.id));
  });

  it('never lets an article id shadow a Sacred Moral Atlas tab', () => {
    assert.ok(TAB_IDS.has('demonology-atlas') && TAB_IDS.size > 5, 'could not read the tab ids');
    demons.forEach((d) => assert.ok(!TAB_IDS.has(d.id), `article "${d.id}" collides with a tab id`));
    demons.forEach((d) => assert.ok(!d.id.startsWith('codex-'), `article "${d.id}" uses the Codex prefix`));
  });

  it('uses only known categories, and every category has entries', () => {
    const cats = new Set(DEMON_FILTERS.slice(1));
    demons.forEach((d) => assert.ok(cats.has(d.category), `${d.id}: unknown category "${d.category}"`));
    cats.forEach((c) => assert.ok(demons.some((d) => d.category === c), `category "${c}" is empty`));
  });

  it('fills the required content fields', () => {
    for (const d of demons) {
      for (const field of ['id', 'name', 'icon', 'category', 'role', 'summary', 'overview']) {
        assert.equal(typeof d[field], 'string', `${d.id}: ${field} missing`);
        assert.ok(d[field].trim().length > 0, `${d.id}: ${field} empty`);
      }
      assert.ok(Array.isArray(d.reading) && d.reading.length >= 1, `${d.id}: no sources`);
      assert.ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.id), `${d.id}: id is not a lowercase slug`);
    }
  });

  it('gives every expansion article at least two sources and a period or concept framing', () => {
    for (const d of EXPANSION) {
      assert.ok(d.reading.length >= 2, `${d.id}: needs at least two sources`);
      assert.ok(d.origins && d.religious && d.interpretations, `${d.id}: missing article sections`);
      if (d.classification !== 'Concept') assert.ok(d.period, `${d.id}: missing source period`);
    }
  });

  it('tags every entry with valid tradition and classification facets', () => {
    const groups = new Set(TRADITION_GROUPS);
    const classes = new Set(ENTITY_CLASSES);
    for (const d of demons) {
      assert.ok(Array.isArray(d.traditionGroups) && d.traditionGroups.length > 0, `${d.id}: no traditionGroups`);
      d.traditionGroups.forEach((g) => assert.ok(groups.has(g), `${d.id}: unknown tradition "${g}"`));
      assert.equal(new Set(d.traditionGroups).size, d.traditionGroups.length, `${d.id}: duplicate tradition`);
      assert.ok(classes.has(d.classification), `${d.id}: unknown classification "${d.classification}"`);
    }
  });

  it('has valid, non-self, non-duplicate related links', () => {
    for (const d of demons) {
      const related = d.related || [];
      assert.equal(new Set(related).size, related.length, `${d.id}: duplicate related link`);
      related.forEach((id) => {
        assert.notEqual(id, d.id, `${d.id}: links to itself`);
        assert.ok(ATLAS_IDS.has(id), `${d.id}: related "${id}" does not exist`);
      });
    }
  });

  it('has well-formed aliases', () => {
    for (const d of demons) {
      if (d.aliases === undefined) continue;
      assert.ok(Array.isArray(d.aliases), `${d.id}: aliases must be an array`);
      const folded = d.aliases.map(foldText);
      folded.forEach((a) => assert.ok(a.length > 0, `${d.id}: empty alias`));
      assert.equal(new Set(folded).size, folded.length, `${d.id}: duplicate alias`);
      assert.ok(!folded.includes(foldText(d.name)), `${d.id}: alias repeats the name`);
    }
  });
});

describe('traditional associations', () => {
  const themes = new Set(ASSOCIATION_THEMES);

  it('names a valid theme, a source layer and a basis for every association', () => {
    for (const d of demons) {
      for (const a of d.associations || []) {
        assert.ok(themes.has(a.theme), `${d.id}: unknown theme "${a.theme}"`);
        assert.ok(Object.hasOwn(SOURCE_LAYERS, a.layer), `${d.id}: unknown layer "${a.layer}"`);
        assert.ok(typeof a.basis === 'string' && a.basis.length > 20, `${d.id}: association "${a.theme}" lacks a basis`);
      }
      const keys = (d.associations || []).map((a) => `${a.theme}|${a.layer}`);
      assert.equal(new Set(keys).size, keys.length, `${d.id}: duplicate association`);
    }
  });

  it('documents associations for every new figure', () => {
    EXPANSION.filter((d) => d.classification !== 'Concept').forEach((d) =>
      assert.ok(d.associations?.length > 0, `${d.id}: no traditional associations`));
  });

  it('covers the Binsfeld princes with their later-demonology sins', () => {
    const expect = { lucifer: 'Pride', mammon: 'Greed', asmodeus: 'Lust', leviathan: 'Envy', beelzebub: 'Gluttony', satan: 'Wrath', belphegor: 'Sloth' };
    for (const [id, sin] of Object.entries(expect)) {
      const entry = demons.find((d) => d.id === id);
      // The sin pairing is later tradition (Binsfeld), so it must be recorded
      // under a non-primary layer even when a primary text supports a link too.
      const match = entry.associations.find((a) => a.theme === sin && a.layer !== 'primary');
      assert.ok(match, `${id} lacks ${sin} as a later-tradition association`);
    }
  });

  it('does not file non-Abrahamic beings as fallen angels or demonized gods', () => {
    const regional = demons.filter((d) =>
      ['South Asian & Buddhist', 'East & Southeast Asian', 'Islamic', 'Mesopotamian'].includes(d.category));
    assert.ok(regional.length >= 20);
    regional.forEach((d) =>
      assert.ok(!['Fallen angel', 'Demonized deity'].includes(d.classification), `${d.id}: ${d.classification}`));
    assert.notEqual(demons.find((d) => d.id === 'jinn').classification, 'Demon');
  });
});

describe('ars goetia coverage', () => {
  it('lists all 72 spirits once, numbered 1–72 in order', () => {
    assert.equal(GOETIA_SPIRITS.length, 72);
    assert.deepEqual(GOETIA_SPIRITS.map((s) => s.n), Array.from({ length: 72 }, (_, i) => i + 1));
    assert.equal(new Set(GOETIA_SPIRITS.map((s) => s.id)).size, 72);
    assert.equal(new Set(GOETIA_SPIRITS.map((s) => foldText(s.name))).size, 72);
  });

  it('gives every spirit a valid rank, an appearance and its attributed offices', () => {
    const ranks = new Set(GOETIA_RANKS);
    for (const s of GOETIA_SPIRITS) {
      assert.ok(s.rank.length >= 1 && s.rank.every((r) => ranks.has(r)), `#${s.n}: bad rank`);
      assert.ok(s.appearance && s.offices, `#${s.n}: missing appearance or offices`);
      assert.ok(Array.isArray(s.aliases), `#${s.n}: aliases must be an array`);
    }
    assert.equal(GOETIA_SPIRITS.filter((s) => s.rank.includes('King')).length, 9, 'the Goetia has nine kings');
    assert.deepEqual(
      GOETIA_SPIRITS.filter((s) => s.weyer === false).map((s) => s.name),
      ['Vassago', 'Seere', 'Dantalion', 'Andromalius'],
    );
  });

  it('has a Codex card for every spirit, carrying its Goetia number', () => {
    for (const s of GOETIA_SPIRITS) {
      const card = codexEntries.find((e) => e.id === s.id);
      assert.ok(card, `no Codex card for #${s.n} ${s.name}`);
      assert.equal(card.goetia?.n, s.n, `${s.id}: wrong Goetia number`);
      assert.ok(inCodexCategory(card, 'Ars Goetia'), `${s.id}: not reachable from the Ars Goetia filter`);
    }
    assert.equal(CODEX_STATS.goetiaCovered, 72);
    assert.equal(codexEntries.filter((e) => e.goetia).length, 72);
  });

  it('reuses the existing ids for spirits that already had cards', () => {
    assert.equal(GOETIA_SPIRITS[0].id, 'baal');
    assert.equal(GOETIA_SPIRITS[31].id, 'asmodeus');
    assert.equal(GOETIA_SPIRITS[67].id, 'belial');
    assert.deepEqual(codexEntries.find((e) => e.id === 'baal').goetia.rank, ['King']);
  });
});

describe('infernal codex integrity', () => {
  it('has unique ids and keeps every legacy card', () => {
    assert.equal(CODEX_IDS.size, codexEntries.length);
    LEGACY_CODEX_IDS.forEach((id) => assert.ok(CODEX_IDS.has(id), `legacy Codex card "${id}" was removed`));
  });

  it('uses known categories and types, and every category has cards', () => {
    const cats = new Set(CODEX_CATEGORIES);
    const types = new Set(CODEX_TYPES);
    for (const e of codexEntries) {
      assert.ok(cats.has(e.category), `${e.id}: unknown category "${e.category}"`);
      assert.ok(types.has(e.type), `${e.id}: unknown type "${e.type}"`);
      (e.alsoIn || []).forEach((c) => assert.ok(cats.has(c), `${e.id}: unknown alsoIn "${c}"`));
      for (const f of ['name', 'title', 'explanation', 'tradition', 'symbolism']) {
        assert.ok(typeof e[f] === 'string' && e[f].length > 0, `${e.id}: ${f} missing`);
      }
      assert.ok(Array.isArray(e.tags), `${e.id}: tags missing`);
    }
    cats.forEach((c) => assert.ok(codexEntries.some((e) => e.category === c), `Codex category "${c}" is empty`));
  });

  it('links each card to an Atlas article that exists', () => {
    codexEntries.filter((e) => e.article).forEach((e) =>
      assert.ok(ATLAS_IDS.has(e.article), `${e.id}: article "${e.article}" does not exist`));
    // Every new Atlas figure has a concise Codex card pointing back to it.
    EXPANSION.filter((d) => d.classification !== 'Concept').forEach((d) =>
      assert.ok(codexEntries.some((e) => e.article === d.id), `no Codex card links to "${d.id}"`));
  });

  it('files every name under a real A–Z letter', () => {
    codexEntries.forEach((e) => assert.match(indexLetter(e.name), /^[A-Z]$/, e.name));
  });
});

describe('alias- and diacritic-insensitive search', () => {
  it('folds case, diacritics, transliteration marks and hyphens', () => {
    assert.equal(foldText('Māra'), 'mara');
    assert.equal(foldText('YŌKAI'), 'yokai');
    assert.equal(foldText('Shayṭān'), 'shaytan');
    assert.equal(foldText('ʿIfrīt'), 'ifrit');
    assert.equal(foldText("Ba'al"), 'baal');
    assert.equal(foldText('Ronové'), 'ronove');
    assert.equal(foldText('Glasya-Labolas'), 'glasya labolas');
    assert.deepEqual(searchTerms('  Rākṣasa   KING '), ['raksasa', 'king']);
  });

  const atlasCases = {
    Moloch: 'moloch', Molech: 'moloch', Belphegor: 'belphegor', Belphagor: 'belphegor',
    Leviathan: 'leviathan', Samael: 'samael', Abaddon: 'abaddon', Apollyon: 'abaddon',
    Bael: 'baal', Baal: 'baal', Paimon: 'paimon', Māra: 'mara', Mara: 'mara', MARA: 'mara',
    Oni: 'oni', Yōkai: 'yokai', Yokai: 'yokai', youkai: 'yokai', Rakshasa: 'rakshasas',
    Jiangshi: 'jiangshi', Pontianak: 'pontianak', Kuntilanak: 'pontianak', Iblis: 'iblis',
    Shaytan: 'shayatin', Djinn: 'jinn', Watchers: 'watchers', Ashmedai: 'asmodeus',
  };
  for (const [query, id] of Object.entries(atlasCases)) {
    it(`Atlas search "${query}" puts ${id} first`, () => {
      assert.equal(top(searchEntries(demons, query, ATLAS_FIELDS)), id);
    });
  }

  const codexCases = {
    Bael: 'baal', Ronove: 'ronove', 'Ronové': 'ronove', Vassago: 'vassago', 'glasya labolas': 'glasya-labolas',
    Kuntilanak: 'kuntilanak', Apollyon: 'abaddon', Asmoday: 'asmodeus', Gaap: 'gaap', Yokai: 'yokai',
    Decarabia: 'decarabia', Stolas: 'stolas', Orobas: 'orobas', Zagan: 'zagan',
  };
  for (const [query, id] of Object.entries(codexCases)) {
    it(`Codex search "${query}" puts ${id} first`, () => {
      assert.equal(top(searchEntries(codexEntries, query, CODEX_FIELDS)), id);
    });
  }

  it('requires every term and returns the list unchanged for an empty query', () => {
    assert.equal(searchEntries(demons, '   ', ATLAS_FIELDS), demons);
    assert.equal(searchEntries(demons, 'oni zzzz', ATLAS_FIELDS).length, 0);
    assert.ok(searchEntries(demons, 'japan fox', ATLAS_FIELDS).some((d) => d.id === 'kitsune'));
  });

  it('matches terms at word starts, not inside other words', () => {
    const ids = searchEntries(demons, 'oni', ATLAS_FIELDS).map((d) => d.id);
    assert.equal(ids[0], 'oni');
    assert.ok(!ids.includes('demons-mesopotamia'), '"oni" should not match "Babylonian"');
    assert.ok(searchEntries(demons, 'goet', ATLAS_FIELDS).some((d) => d.id === 'ars-goetia'), 'prefixes still match');
  });
});

describe('demonology deep links', () => {
  it('opens Atlas articles and Codex cards from ?section=', () => {
    assert.deepEqual(normalizeInitialSection('mara', SECTION_LINKS), { tab: 'demonology-atlas', childSection: 'mara' });
    assert.deepEqual(normalizeInitialSection('codex-vassago', SECTION_LINKS), { tab: 'infernal-codex', childSection: 'vassago' });
    assert.deepEqual(normalizeInitialSection('codex-', SECTION_LINKS), { tab: null });
    assert.deepEqual(normalizeInitialSection('infernal-codex', SECTION_LINKS), { tab: 'infernal-codex' });
  });

  it('has no broken Sacred Moral Atlas links in the global search index', () => {
    const legacy = new Set(['angelology', 'demonology-atlas', 'demonology-portal', 'infernal-codex', 'infernalcodex']);
    searchIndex
      .filter((e) => e.portalId === 'biblical' && e.section)
      .forEach((e) => {
        const ok = TAB_IDS.has(e.section) || ATLAS_IDS.has(e.section) || legacy.has(e.section);
        assert.ok(ok, `${e.id} links to unknown section "${e.section}"`);
        if (e.section.startsWith('codex-')) assert.ok(CODEX_IDS.has(e.section.slice(6)), e.id);
      });
  });
});

describe('timeline and comparison data', () => {
  it('uses known tracks, fills every track, and links to real articles', () => {
    const tracks = new Set(TIMELINE_TRACKS);
    DEMONOLOGY_TIMELINE.forEach((t) => {
      assert.ok(tracks.has(t.track), `unknown track "${t.track}"`);
      assert.equal(typeof t.start, 'number');
      (t.links || []).forEach((id) => assert.ok(ATLAS_IDS.has(id), `timeline links to unknown "${id}"`));
    });
    TIMELINE_TRACKS.forEach((track) =>
      assert.ok(DEMONOLOGY_TIMELINE.some((t) => t.track === track), `track "${track}" is empty`));
  });

  it('compares only articles that carry the compared facets', () => {
    assert.equal(new Set(COMPARISON_IDS).size, COMPARISON_IDS.length);
    COMPARISON_IDS.forEach((id) => {
      const d = demons.find((x) => x.id === id);
      assert.ok(d, `comparison row "${id}" does not exist`);
      assert.ok(d.classification && d.traditionGroups.length && d.associations?.length, `${id}: missing facets`);
    });
  });
});
