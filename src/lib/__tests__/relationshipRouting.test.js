import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveSection, sectionForTab, TAB_IDS } from '../relationshipRouting.js';
import {
  clarityChapterFor,
  clarityChapters,
  claritySectionIds,
  patternSectionIds,
  practiceSectionIds,
  relationshipSections,
} from '../../data/relationshipIndex.js';

// These tests pin the contract the Relationship Hub relies on: the URL is the
// only place the visible tab and concept live. App.jsx re-keys the portal on
// `path + search`, so a ?section= that resolves to the wrong tab — or a screen
// that has no ?section= at all — is what makes back/forward and refresh drift.
describe('relationship hub section routing', () => {
  it('opens the overview when there is no section', () => {
    assert.deepEqual(resolveSection(undefined), { tab: 'overview', sub: null });
    assert.deepEqual(resolveSection(null), { tab: 'overview', sub: null });
    assert.deepEqual(resolveSection(''), { tab: 'overview', sub: null });
  });

  it('opens the overview for a section no tab owns', () => {
    assert.deepEqual(resolveSection('not-a-section'), { tab: 'overview', sub: null });
  });

  it('routes a bare tab id, and its longer alias, to that tab index', () => {
    TAB_IDS.forEach((tab) => {
      assert.deepEqual(resolveSection(tab), { tab, sub: null });
      assert.deepEqual(resolveSection(`relationship-${tab}`), { tab, sub: null });
    });
  });

  it('routes every routable section to the tab that owns it', () => {
    claritySectionIds.forEach((id) => assert.equal(resolveSection(id).tab, 'clarity'));
    patternSectionIds.forEach((id) => assert.equal(resolveSection(id).tab, 'patterns'));
    practiceSectionIds.forEach((id) => assert.equal(resolveSection(id).tab, 'practice'));
  });

  it('carries a concept section through as the sub-screen to open', () => {
    // Practice sections are the tab indexes themselves, so they carry no sub.
    [...claritySectionIds, ...patternSectionIds].forEach((id) => {
      assert.equal(resolveSection(id).sub, id, `${id} should open as a sub-screen`);
    });
  });

  it('gives every tab a section that round-trips back to it', () => {
    // The hub's tab bar pushes sectionForTab(id); resolving that URL again on a
    // refresh or a back/forward step has to land on the same tab.
    TAB_IDS.forEach((tab) => {
      const section = sectionForTab(tab);
      assert.ok(section, `${tab} needs a URL of its own`);
      assert.deepEqual(resolveSection(section), { tab, sub: null });
    });
  });

  it('has no URL for the overview, which is the hub path itself', () => {
    assert.equal(sectionForTab('overview'), null);
    assert.equal(sectionForTab(undefined), null);
  });

  it('round-trips every routable section through resolve and back', () => {
    // Deep link → screen → the section that screen re-publishes must resolve to
    // the same screen, or sharing/refreshing a URL shows something else.
    [...claritySectionIds, ...patternSectionIds, ...practiceSectionIds].forEach((id) => {
      const first = resolveSection(id);
      const republished = first.sub ?? sectionForTab(first.tab);
      assert.deepEqual(resolveSection(republished), first, `${id} does not round-trip`);
    });
  });

  it('keeps section ids unique across tabs so ownership is unambiguous', () => {
    const all = [...claritySectionIds, ...patternSectionIds, ...practiceSectionIds];
    assert.equal(new Set(all).size, all.length);
  });

  it('places every Clarity concept in exactly one chapter', () => {
    // A concept link opens its chapter, so a concept left out of every chapter
    // would fall back to the chapter index and its link would show nothing.
    const chapterIds = new Set(clarityChapters.map((c) => c.id));
    const inChapters = clarityChapters.flatMap((c) => c.concepts);
    assert.equal(new Set(inChapters).size, inChapters.length, 'a concept is listed in two chapters');
    claritySectionIds
      .filter((id) => !chapterIds.has(id))
      .forEach((id) => assert.ok(clarityChapterFor(id), `${id} has no chapter`));
    inChapters.forEach((id) => assert.equal(resolveSection(id).tab, 'clarity', `${id} does not route to Clarity`));
  });

  it('routes a chapter id to Clarity and resolves it to that chapter', () => {
    clarityChapters.forEach((chapter) => {
      assert.deepEqual(resolveSection(chapter.id), { tab: 'clarity', sub: chapter.id });
      assert.equal(clarityChapterFor(chapter.id), chapter);
    });
  });

  it('opens every overview chip on the tab its entry names', () => {
    // A chip whose section no tab owns falls back to the overview, so clicking
    // it would look like nothing happened.
    relationshipSections.forEach((entry) => {
      assert.equal(resolveSection(entry.section).tab, entry.owner, `${entry.id} opens the wrong tab`);
    });
  });

  it('routes each skill area to the Practice tab as its own screen', () => {
    ['skills-communication', 'skills-conflict-repair', 'skills-consent'].forEach((id) => {
      assert.deepEqual(resolveSection(id), { tab: 'practice', sub: id });
    });
  });
});
