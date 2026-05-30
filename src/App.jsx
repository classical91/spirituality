import { useCallback, useEffect, useMemo } from 'react';
import HomePage from './HomePage';
import Chakra3DVisualizer from './Chakra3DVisualizer';
import NatalChartDecoder from './NatalChartDecoder';
import BibleConceptAtlas from './BibleConceptAtlas';
import PsychologyPortal from './PsychologyPortal';
import InnerBalanceAtlas from './InnerBalanceAtlas';
import FrameworkAtlas from './FrameworkAtlas';
import NevillePortal from './NevillePortal';
import SacredSystemsAtlas from './SacredSystemsAtlas';
import RelationshipClarityPortal from './RelationshipClarityPortal';
import SexualEnergyDashboard from './SexualEnergyDashboard';
import AngelologyAtlas from './AngelologyAtlas';
import AwarenessAtlas from './AwarenessAtlas';
import { portals, portalsById, portalsByPath } from './data/portals';
import { useRoute } from './hooks/useRoute';
import { recordPortalVisit, setLastPortal } from './lib/storage';

const COMPONENTS = {
  chakra: Chakra3DVisualizer,
  astrology: NatalChartDecoder,
  biblical: BibleConceptAtlas,
  psychology: PsychologyPortal,
  innerbalance: InnerBalanceAtlas,
  frameworks: FrameworkAtlas,
  neville: NevillePortal,
  sacredsystems: SacredSystemsAtlas,
  relationships: RelationshipClarityPortal,
  sexualenergy: SexualEnergyDashboard,
  angelology: AngelologyAtlas,
  awareness: AwarenessAtlas,
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
    const Component = COMPONENTS[activePortal.id];
    return (
      <Component
        onBack={goHome}
        onNavigate={goPortal}
        initialSection={initialSection}
      />
    );
  }

  if (path !== '/' && !portals.some((p) => p.path === path)) {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/');
    }
  }

  return <HomePage onNavigate={goPortal} />;
}
