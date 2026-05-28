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
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid rgba(122,171,121,0.38)',
          borderRadius: 999,
          background: 'linear-gradient(135deg, rgba(122,171,121,0.95), rgba(216,169,72,0.95))',
          color: '#102018',
          boxShadow: '0 18px 45px rgba(0,0,0,0.22)',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: '0.01em',
          padding: '12px 16px',
        }}
        aria-label="Open Color Psychology section"
      >
        <span aria-hidden="true">🎨</span>
        Color Psychology
      </button>
    </div>
  );
}
