// Reusable wellness/safety reminder shown inside each portal. Symbolic, not medical.
export default function SafetyNote({
  tone = 'wellness',
  text,
  className = '',
}) {
  const palette = TONES[tone] || TONES.wellness;
  const message = text || palette.defaultText;

  return (
    <p
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.78rem',
        lineHeight: 1.55,
        color: palette.color,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        padding: '8px 14px',
        borderRadius: '999px',
        backdropFilter: 'blur(8px)',
        margin: 0,
      }}
    >
      <span aria-hidden="true">{palette.icon}</span>
      <span>{message}</span>
    </p>
  );
}

const TONES = {
  wellness: {
    icon: '⚠',
    color: '#cbd5e1',
    bg: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.12)',
    defaultText:
      'Educational tool only — not medical advice. Consult a healthcare professional for any health concerns.',
  },
  symbolic: {
    icon: '✦',
    color: '#d8ceff',
    bg: 'rgba(168,85,247,0.10)',
    border: 'rgba(168,85,247,0.28)',
    defaultText:
      'Used as a symbolic framework for self-reflection — not as diagnosis, prophecy, or treatment.',
  },
  scripture: {
    icon: '✠',
    color: '#fde68a',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.25)',
    defaultText:
      'Presented as historical, literary, and symbolic study material — not as religious authority.',
  },
};
