import { useCallback, useEffect } from 'react';
import HomePage from './HomePage';
import Chakra3DVisualizer from './Chakra3DVisualizer';
import NatalChartDecoder from './NatalChartDecoder';
import BibleConceptAtlas from './BibleConceptAtlas';
import PsychologyPortal from './PsychologyPortal';
import InnerBalanceAtlas from './InnerBalanceAtlas';
import FrameworkAtlas from './FrameworkAtlas';
import NevilleGoddardPortal from './NevilleGoddardPortal';
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
  neville: NevilleGoddardPortal,
};

export default function App() {
  const [path, navigate] = useRoute();

  const goHome = useCallback(() => navigate('/'), [navigate]);

  const goPortal = useCallback(
    (portalId) => {
      const portal = portalsById[portalId];
      if (!portal) return;
      navigate(portal.path);
    },
    [navigate]
  );

  // Record visits and last-seen portal for the homepage "Recent" rail.
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
    return <Component onBack={goHome} onNavigate={goPortal} />;
  }

  // Unknown routes fall back to home (after correcting the URL).
  if (path !== '/' && !portals.some((p) => p.path === path)) {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/');
    }
  }

  return <HomePage onNavigate={goPortal} />;
}
