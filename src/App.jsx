import { useCallback, useEffect, useMemo } from 'react';
import HomePage from './HomePage';
import Chakra3DVisualizer from './Chakra3DVisualizer';
import NatalChartDecoder from './NatalChartDecoder';
import BibleConceptAtlas from './BibleConceptAtlas';
import InnerAtlas from './InnerAtlas';
import WisdomAtlas from './WisdomAtlas';
import NevillePortal from './NevillePortal';
import SacredSystemsAtlas from './SacredSystemsAtlas';
import SexualEnergyDashboard from './SexualEnergyDashboard';
import NumerologyPortal from './NumerologyPortal';
import RelationshipHub from './RelationshipHub';
import { portals, portalsById, portalsByPath } from './data/portals';
import { useRoute } from './hooks/useRoute';
import { recordPortalVisit, setLastPortal } from './lib/storage';

const BIBLICAL_ROUTE = '/sacred-moral-atlas';
const EMBEDDED_BIBLICAL_SECTIONS = {
  demonology: 'demonology-atlas',
  infernalcodex: 'infernal-codex',
};

const RELATIONSHIP_SECTION_REDIRECTS = new Set([
  'relationship-clarity', 'relationship-patterns',
  'security-vs-fear', 'mixed-signals', 'chasing-vs-receiving', 'pedestalizing',
  'trauma-bond-vs-true-love', 'attracted-vs-infatuated', 'attraction-pitfalls',
  'limerence', 'dating-operant-conditioning', 'investment-vs-vulnerability',
  'emotional-immaturity', 'closeness-vs-compatibility', 'crush-vs-love',
  'datable', 'courting-vs-dating', 'companionship',
  'reading-red-flags', 'love-bombing', 'control-and-isolation', 'gaslighting',
  'contempt-and-criticism', 'jealousy-and-possessiveness', 'future-faking',
  'standards', 'chosen-and-wanted', 'being-a-priority', 'safety-as-standard',
  'seen-and-valued', 'being-together-emotionally', 'financial-partnership',
  'boundaries', 'devotion', 'honest-direct', 'texting-urges',
  'types-of-intimacy', 'types-of-kisses', 'forms-of-cuddling',
  'mutual-interests', 'shared-experiences', 'milestones',
  'gestures-of-affection', 'quality-time', 'forms-of-connection',
  'emotions-of-being-together', 'forms-of-playfulness', 'core-beliefs-for-sex',
  'clarity-check', 'pause-check',
]);

const COMPONENTS = {
  chakra: Chakra3DVisualizer,
  astrology: NatalChartDecoder,
  biblical: BibleConceptAtlas,
  inneratlas: InnerAtlas,
  wisdom: WisdomAtlas,
  neville: NevillePortal,
  sacredsystems: SacredSystemsAtlas,
  sexualenergy: SexualEnergyDashboard,
  numerology: NumerologyPortal,
  relationshiphub: RelationshipHub,
};

export default function App() {
  const route = useRoute();
  const [path, navigate] = route;
  const search = route.search;

  // ?section=heart -> "heart"; portals that recognize it open that section.
  const initialSection = useMemo(() => {
    if (!search) return undefined;
    try {
      return new URLSearchParams(search).get('section') || undefined;
    } catch {
      return undefined;
    }
  }, [search]);

  const goHome = useCallback(() => navigate('/'), [navigate]);

  const goPortal = useCallback(
    (portalId, { section } = {}) => {
      if (EMBEDDED_BIBLICAL_SECTIONS[portalId]) {
        const embeddedSection =
          portalId === 'demonology' && section
            ? section
            : EMBEDDED_BIBLICAL_SECTIONS[portalId];
        navigate(`${BIBLICAL_ROUTE}?section=${encodeURIComponent(embeddedSection)}`);
        return;
      }
      // Legacy internal contract used by relationship sub-portals; route to the hub.
      if (portalId === 'relationships') {
        navigate(section ? `/relationship-hub?section=${encodeURIComponent(section)}` : '/relationship-hub');
        return;
      }
      const portal = portalsById[portalId];
      if (!portal) return;
      if (portal.external && portal.externalUrl) {
        window.open(portal.externalUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      navigate(section ? `${portal.path}?section=${encodeURIComponent(section)}` : portal.path);
    },
    [navigate]
  );

  useEffect(() => {
    const portal = portalsByPath[path];
    if (portal) {
      recordPortalVisit(portal.id);
      setLastPortal(portal.id);
    }
  }, [path]);

  const activePortal = portalsByPath[path];
  if (activePortal) {
    // Normalize legacy alias paths (e.g. /frameworks) to the canonical route.
    if (path !== activePortal.path && typeof window !== 'undefined') {
      window.history.replaceState({}, '', activePortal.path + (search || ''));
    }
    const Component = COMPONENTS[activePortal.id];
    return (
      <Component
        onBack={goHome}
        onNavigate={goPortal}
        initialSection={initialSection}
      />
    );
  }

  // Backward-compat: relationship content moved out of Sexual Energy into its
  // own Relationship Hub portal. Redirect old deep-links there.
  if (path === '/sexual-energy' && RELATIONSHIP_SECTION_REDIRECTS.has(initialSection)) {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `/relationship-hub?section=${encodeURIComponent(initialSection)}`);
    }
    return <RelationshipHub onBack={goHome} onNavigate={goPortal} initialSection={initialSection} />;
  }

  // Backward-compat: old standalone routes redirect into InnerAtlas
  if (path === '/psychology') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/inner-atlas?section=psychology');
    }
    return <InnerAtlas onBack={goHome} onNavigate={goPortal} initialSection="psychology" />;
  }
  if (path === '/relationships') {
    const section = initialSection || 'relationship-clarity';
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `/relationship-hub?section=${encodeURIComponent(section)}`);
    }
    return <RelationshipHub onBack={goHome} onNavigate={goPortal} initialSection={section} />;
  }
  if (path === '/awareness') {
    const section = initialSection || 'awareness';
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `/inner-atlas?section=${encodeURIComponent(section)}`);
    }
    return <InnerAtlas onBack={goHome} onNavigate={goPortal} initialSection={section} />;
  }
  if (path === '/consciousness-map') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/inner-atlas?section=consciousness-map');
    }
    return <InnerAtlas onBack={goHome} onNavigate={goPortal} initialSection="consciousness-map" />;
  }
  if (path === '/inner-balance') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/inner-atlas');
    }
    return <InnerAtlas onBack={goHome} onNavigate={goPortal} initialSection={initialSection} />;
  }
  // Angelology folded into the Biblical portal as its Angelology section.
  if (path === '/angelology') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `${BIBLICAL_ROUTE}?section=angels`);
    }
    return <BibleConceptAtlas onBack={goHome} onNavigate={goPortal} initialSection="angels" />;
  }
  if (path === '/demonology') {
    const section = initialSection || 'demonology-atlas';
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `${BIBLICAL_ROUTE}?section=${encodeURIComponent(section)}`);
    }
    return <BibleConceptAtlas onBack={goHome} onNavigate={goPortal} initialSection={section} />;
  }
  if (path === '/inferno' || path === '/dante-inferno') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `${BIBLICAL_ROUTE}?section=inferno`);
    }
    return <BibleConceptAtlas onBack={goHome} onNavigate={goPortal} initialSection="inferno" />;
  }
  if (path === '/infernal-codex') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `${BIBLICAL_ROUTE}?section=infernal-codex`);
    }
    return <BibleConceptAtlas onBack={goHome} onNavigate={goPortal} initialSection="infernal-codex" />;
  }

  if (path !== '/' && !portals.some((p) => p.path === path)) {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/');
    }
  }

  return <HomePage onNavigate={goPortal} />;
}
