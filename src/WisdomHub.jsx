import PortalCard from './components/PortalCard';
import { portalsById } from './data/portals';
import './WisdomAtlas.css';

// Wisdom Atlas hub — a small landing that holds its two libraries:
// the documented Teachers and the esoteric Ascended Masters. Reuses the
// home-grid PortalCard and the shared `fa-` background styling.

export default function WisdomHub({ onBack, onNavigate }) {
  const teachers = portalsById.wisdomteachers;
  const ascended = portalsById.ascended;

  return (
    <div className="fa">
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={onBack}>← Back</button>
        <div className="fa-brand">
          <div className="fa-logo">✦</div>
          <span>Wisdom Atlas</span>
        </div>
        <span style={{ width: 1 }} />
      </div>

      <div className="fa-inner">
        <header className="fa-hero" style={{ gridTemplateColumns: '1fr', paddingBottom: 12 }}>
          <div>
            <div className="fa-eyebrow"><span className="fa-pulse" /> Two libraries, one inner life</div>
            <h1 className="fa-h1">
              The <span className="fa-grad">Wisdom Atlas</span>
            </h1>
            <p className="fa-lead">
              A reflective library of inner-work wisdom in two collections — the documented teachers of the modern inner life, and the esoteric Ascended Masters of the Theosophical tradition. Choose a doorway.
            </p>
          </div>
        </header>

        <section className="fa-section" aria-label="Choose a library">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 3vw, 28px)',
            }}
          >
            {teachers && <PortalCard portal={teachers} onNavigate={onNavigate} />}
            {ascended && <PortalCard portal={ascended} onNavigate={onNavigate} />}
          </div>
        </section>

        <footer className="fa-footer">
          A reflective library, not a doctrine. These teachings are offered for contemplation and inner work — take what serves you and hold the rest lightly. Nothing here is medical, psychological, or religious advice.
        </footer>
      </div>
    </div>
  );
}
