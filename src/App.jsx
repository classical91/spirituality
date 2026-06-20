import { useCallback, useEffect, useMemo } from 'react';
import HomePage from './HomePage';
import Chakra3DVisualizer from './Chakra3DVisualizer';
import NatalChartDecoder from './NatalChartDecoder';
import BibleConceptAtlas from './BibleConceptAtlas';
import InnerAtlas from './InnerAtlas';
import WisdomHub from './WisdomHub';
import WisdomAtlas from './WisdomAtlas';
import AscendedMastersAtlas from './AscendedMastersAtlas';
import NevillePortal from './NevillePortal';
import SacredSystemsAtlas from './SacredSystemsAtlas';
import SexualEnergyDashboard from './SexualEnergyDashboard';
import DailyPracticePortal from './DailyPracticePortal';
import NumerologyPortal from './NumerologyPortal';
import { portals, portalsById, portalsByPath } from './data/portals';
import { useRoute } from './hooks/useRoute';
import { recordPortalVisit, setLastPortal } from './lib/storage';
import { getDailyReading } from './lib/dailyReading';

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
  wisdom: WisdomHub,
  wisdomteachers: WisdomAtlas,
  ascended: AscendedMastersAtlas,
  neville: NevillePortal,
  sacredsystems: SacredSystemsAtlas,
  sexualenergy: SexualEnergyDashboard,
  dailypractice: DailyPracticePortal,
  numerology: NumerologyPortal,
};

// A persistent way back to the hub from anywhere in the site. Sits below modal
// overlays (z 50+) so it never covers a dialog, above ordinary page content.
function FloatingHomeButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go to home"
      title="Home"
      style={{
        position: 'fixed',
        right: 'max(16px, env(safe-area-inset-right))',
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        zIndex: 45,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '11px 16px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(10,12,20,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        color: '#fff',
        fontSize: 14,
        fontWeight: 800,
        fontFamily: 'inherit',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }} aria-hidden="true">⌂</span>
      Home
    </button>
  );
}

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

  // `homeView` is set true only by the final HomePage fallback below, so the
  // floating Home button shows on every other screen but not on home itself.
  let homeView = false;
  const content = renderRoute();
  return (
    <>
      {content}
      {!homeView && <FloatingHomeButton onClick={goHome} />}
    </>
  );

  function renderRoute() {
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

  // Focused sub-portals of the Sexual Energy hub: same component, but scoped
  // to a single tab group instead of the full four-group dashboard.
  if (path === '/sexual-energy/self-mastery') {
    return (
      <SexualEnergyDashboard
        onBack={goHome}
        onNavigate={goPortal}
        initialSection={initialSection}
        initialGroup="self-mastery"
      />
    );
  }
  if (path === '/sexual-energy/relationships') {
    return (
      <SexualEnergyDashboard
        onBack={goHome}
        onNavigate={goPortal}
        initialSection={initialSection}
        initialGroup="relationships"
      />
    );
  }

  // Stable permalink: /today always resolves to whatever today's reading is,
  // redirecting to that teacher/section page (the same target the homepage
  // "Reading for Today" card opens).
  if (path === '/today') {
    const reading = getDailyReading();
    const portal = reading ? portalsById[reading.portalId] : null;
    if (portal && COMPONENTS[portal.id]) {
      const section = reading.section;
      const target = section
        ? `${portal.path}?section=${encodeURIComponent(section)}`
        : portal.path;
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', target);
      }
      const Component = COMPONENTS[portal.id];
      return (
        <Component onBack={goHome} onNavigate={goPortal} initialSection={section} />
      );
    }
    // No resolvable reading → fall back to the hub.
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/');
    }
    return <HomePage onNavigate={goPortal} />;
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

  homeView = true;
  return <HomePage onNavigate={goPortal} />;
  }
}
