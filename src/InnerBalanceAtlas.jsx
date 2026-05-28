import { useState } from 'react';
import InnerBalanceAtlasBase from './InnerBalanceAtlasBase';
import ColorPsychologyAtlas from './ColorPsychologyAtlas';

export default function InnerBalanceAtlas({ onBack, onNavigate, initialSection }) {
  const [showColorPsychology, setShowColorPsychology] = useState(initialSection === 'colorpsychology');

  if (showColorPsychology) {
    return (
      <ColorPsychologyAtlas
        onBack={() => setShowColorPsychology(false)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBalanceAtlasBase
        onBack={onBack}
        onNavigate={onNavigate}
        initialSection={initialSection}
      />
      <button
        type="button"
        onClick={() => setShowColorPsychology(true)}
        className="iba-nav-btn"
        style={{
          position: 'fixed',
          left: 22,
          top: 438,
          zIndex: 90,
          width: 248,
          justifyContent: 'flex-start',
          boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
        }}
        aria-label="Open Color Psychology section"
      >
        <span className="iba-nav-icon" aria-hidden="true">🎨</span>
        Color Psychology
      </button>
    </div>
  );
}
