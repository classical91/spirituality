// Animated "Mind Frequencies" illustration for the brain-states topics.
// Each band is a seamless, scrolling SVG wave coloured by frequency.

const BANDS = [
  {
    name: 'Gamma',
    hz: '30+ Hz',
    color: '#c4b5fd',
    cycles: 26,
    amp: 9,
    jitter: 3,
    desc: 'Heightened, unified awareness · insight · peak focus seen in deep meditation',
    speed: 2.4,
  },
  {
    name: 'Beta',
    hz: '14–30 Hz',
    color: '#fb7185',
    cycles: 17,
    amp: 11,
    jitter: 4,
    desc: 'Alert · engaged in work · "busy" thinking · everyday problem-solving',
    speed: 3,
  },
  {
    name: 'Alpha',
    hz: '9–13 Hz',
    color: '#fcd34d',
    cycles: 10,
    amp: 15,
    jitter: 0.6,
    desc: 'Relaxed · images & visuals · self-introspection · daydreaming',
    speed: 4.2,
  },
  {
    name: 'Theta',
    hz: '4–8 Hz',
    color: '#6ee7b7',
    cycles: 6,
    amp: 18,
    jitter: 0.4,
    desc: 'Between awake & sleep · deep meditation · flow of ideas · altered states',
    speed: 6,
  },
  {
    name: 'Delta',
    hz: '1–3 Hz',
    color: '#7ec4ff',
    cycles: 2.5,
    amp: 18,
    jitter: 0.3,
    desc: 'Unconscious · very deep, dreamless sleep · physical restoration',
    speed: 9,
  },
];

// Build a seamless wave path spanning two tiles (0..2W) so a -50% scroll loops.
function wavePath(width, height, cycles, amp, jitter) {
  const mid = height / 2;
  const tile = width;
  const steps = 240;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * tile * 2;
    const phase = (x / tile) * cycles * Math.PI * 2;
    // Deterministic pseudo-noise so each render is identical and seamless.
    const noise = jitter
      ? Math.sin(phase * 3.1 + 1.3) * jitter * 0.5 + Math.sin(phase * 7.7) * jitter * 0.3
      : 0;
    const y = mid - (Math.sin(phase) * amp + noise);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return 'M' + pts.join(' L');
}

export default function MindFrequencies() {
  const W = 320;
  const H = 56;
  return (
    <div className="aw-freq">
      <div className="aw-freq-title">
        <h3>Mind Frequencies</h3>
        <span>EEG brain-wave bands — fast & alert at the top, slow & deep below</span>
      </div>
      <p className="aw-freq-sub">
        The brain hums at different speeds depending on your state. Meditation gently shifts the
        balance from fast, busy beta toward calmer alpha and theta — and, in seasoned practitioners,
        bursts of integrated gamma.
      </p>
      <div className="aw-freq-rows">
        {BANDS.map((b) => (
          <div className="aw-freq-row" key={b.name}>
            <div className="aw-freq-label" style={{ color: b.color }}>
              <strong>{b.name}</strong>
              <span>{b.hz}</span>
            </div>
            <div className="aw-freq-wave">
              <svg viewBox={`0 0 ${W * 2} ${H}`} preserveAspectRatio="none" aria-hidden="true">
                <path
                  d={wavePath(W, H, b.cycles, b.amp, b.jitter)}
                  style={{ color: b.color, stroke: b.color, animationDuration: `${b.speed}s` }}
                />
              </svg>
            </div>
            <p className="aw-freq-desc">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
