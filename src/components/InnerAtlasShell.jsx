import '../innerAtlasTheme.css';
import InnerAtlasNav from './InnerAtlasNav';
import { accentVars } from '../innerAtlasTheme';

// Shared frame for every InnerAtlas section. Provides the immersive,
// accent-tinted background and the consistent top navigation so the chrome
// never jumps between sections. Set `container={false}` for sections that
// manage their own inner layout/padding.
export default function InnerAtlasShell({
  activeId,
  onBack,
  onSelectSection,
  title,
  backLabel,
  subNav,
  container = true,
  children,
}) {
  return (
    <div className="ia-root" style={accentVars(activeId)}>
      <InnerAtlasNav
        activeId={activeId}
        onBack={onBack}
        onSelectSection={onSelectSection}
        title={title}
        backLabel={backLabel}
        subNav={subNav}
      />
      {container ? <div className="ia-container">{children}</div> : children}
    </div>
  );
}
