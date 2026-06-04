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
import RelationshipsPortal from './RelationshipsPortal';
import DailyPracticePortal from './DailyPracticePortal';
import NumerologyPortal from './NumerologyPortal';
import { portals, portalsById, portalsByPath } from './data/portals';
import { useRoute } from './hooks/useRoute';
import { recordPortalVisit, setLastPortal } from './lib/storage';

const BIBLICAL_ROUTE = '/sacred-moral-atlas';
const EMBEDDED_BIBLICAL_SECTIONS = {
  demonology: 'demonology-atlas',
  infernalcodex: 'infernal-codex',
};

const COMPONENTS = {
  chakra: Chakra3DVisualizer,
  astrology: NatalChartDecoder,
  biblical: BibleConceptAtlas,
  inneratlas: InnerAtlas,
  wisdom: WisdomAtlas,
  neville: NevillePortal,
  sacredsystems: SacredSystemsAtlas,
  sexualenergy: SexualEnergyDashboard,
  relationships: RelationshipsPortal,
  dailypractice: DailyPracticePortal,
  numerology: NumerologyPortal,
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

  // Backward-compat: old standalone routes redirect into InnerAtlas
  if (path === '/psychology') {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/inner-atlas?section=psychology');
    }
    return <InnerAtlas onBack={goHome} onNavigate={goPortal} initialSection="psychology" />;
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
