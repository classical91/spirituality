import { useCallback, useState } from 'react';
import InnerAtlasNav from './components/InnerAtlasNav';
import './innerAtlasTheme.css';
import { accentVars } from './innerAtlasTheme';
import { EMOTIONS_SECTION, resolveEmotionSection } from './data/emotions';
import EmotionDirectory from './emotions/EmotionDirectory';
import EmotionFamilyPage from './emotions/EmotionFamilyPage';
import EmotionConceptPage from './emotions/EmotionConceptPage';
import EmotionGlossary from './emotions/EmotionGlossary';
import GuidanceSpiral from './emotions/GuidanceSpiral';

// The Emotions section is a small set of pages, each with its own ?section=
// URL: the directory (emotions), a page per family (emotions-angry), a page per
// concept (emotion-resentment), the A–Z glossary (emotion-glossary) and the
// guidance spiral (guidance-spiral). `onNavigateSection` puts the section in the
// URL, so refresh and back/forward land on the same page; without it the pages
// still switch, just in local state.
export default function EmotionsAtlas({ onBack, onSelectSection, onNavigateSection, initialView }) {
  const [localSection, setLocalSection] = useState(initialView || EMOTIONS_SECTION);
  const route = resolveEmotionSection(localSection) || { view: 'directory' };

  const go = useCallback((section) => {
    if (onNavigateSection) {
      onNavigateSection(section);
    } else {
      setLocalSection(section);
      window.scrollTo(0, 0);
    }
  }, [onNavigateSection]);

  let title = 'Emotions';
  let page;
  if (route.view === 'family') {
    title = route.family.name;
    page = <EmotionFamilyPage key={route.family.id} family={route.family} go={go} />;
  } else if (route.view === 'concept') {
    title = route.concept.name;
    page = <EmotionConceptPage key={route.concept.slug} concept={route.concept} go={go} />;
  } else if (route.view === 'glossary') {
    title = 'Emotion Glossary';
    page = <EmotionGlossary go={go} />;
  } else if (route.view === 'spiral') {
    title = 'Guidance Spiral';
    page = <GuidanceSpiral go={go} />;
  } else {
    page = <EmotionDirectory go={go} />;
  }

  return (
    <div className="ia-root" style={accentVars('emotions')}>
      <InnerAtlasNav activeId="emotions" onBack={onBack} onSelectSection={onSelectSection} title={title} />
      {page}
    </div>
  );
}
