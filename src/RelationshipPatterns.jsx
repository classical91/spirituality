// Relationship Patterns — the repeating dynamics underneath love, connection,
// and disconnection. Previously lived inside InnerAtlas; now a standalone
// section surfaced through the Sexual Energy & Self-Mastery portal.

const RELATIONSHIP_PATTERNS = [
  {
    icon: '⌘',
    name: 'Attachment Styles',
    color: '#67e8f9',
    keyInsight: 'Your attachment style is not your identity — it is a learned strategy. It can change.',
    items: [
      { label: 'Secure', desc: 'Comfortable with closeness and independence. Can ask for needs, receive them, and let go.' },
      { label: 'Anxious', desc: 'Craves closeness but fears abandonment. Monitors, chases, over-explains to feel okay.' },
      { label: 'Avoidant', desc: 'Values independence. Pulls back when things get close. Struggles with vulnerability.' },
      { label: 'Disorganized', desc: 'Mix of anxious and avoidant — both wants and fears closeness. Often linked to unresolved trauma.' },
    ],
  },
  {
    icon: '↺',
    name: 'The Neediness Loop',
    color: '#a78bfa',
    keyInsight: 'Neediness is a signal that self-worth is outsourced. The exit is building it internally.',
    items: [
      { label: 'What it is', desc: 'Seeking validation, reassurance, or proof of love from someone else to feel okay.' },
      { label: 'Why it forms', desc: "When self-worth depends on another person's response rather than internal security." },
      { label: 'The loop', desc: 'Unmet need → reach out → brief relief → need returns stronger → reach out more urgently.' },
      { label: 'The exit', desc: 'Build internal security. Validate yourself first. Need yourself before needing them.' },
    ],
  },
  {
    icon: '◇',
    name: 'Ghosting Wounds',
    color: '#f9a8d4',
    keyInsight: "The brain registers social rejection as physical pain. It's real — and it's not about your worth.",
    items: [
      { label: 'What it triggers', desc: 'The brain registers social rejection as physical pain — same neural pathways as injury.' },
      { label: 'Why it feels so big', desc: 'It leaves no closure — the mind tries to fill the gap with stories about your value.' },
      { label: 'What it usually means', desc: "The other person's discomfort with directness. Not a verdict on who you are." },
      { label: 'How to process', desc: 'Name it, feel it fully. Resist the urge to explain it away or make contact to resolve it.' },
    ],
  },
  {
    icon: '✦',
    name: 'Pedestalizing',
    color: '#fbbf24',
    keyInsight: 'When you place someone above you, you disappear. Equality is the foundation of real connection.',
    items: [
      { label: 'What it is', desc: "Placing someone so high in your mind that their approval becomes the measure of your worth." },
      { label: 'What it costs', desc: 'Your power. Your perspective. Your ability to see them clearly as a person.' },
      { label: 'Why it happens', desc: 'Connected to insecurity — when you feel small, others seem bigger than they are.' },
      { label: 'The correction', desc: 'Remember they are a person — not a prize, not a judge. Bring them back to eye level.' },
    ],
  },
  {
    icon: '◈',
    name: 'Emotional Independence',
    color: '#34d399',
    keyInsight: 'Your baseline belongs to you. No one else should be the source of your okayness.',
    items: [
      { label: 'What it means', desc: "Your baseline mood and self-worth are not controlled by another person's behavior." },
      { label: 'What it is not', desc: 'Emotional detachment or not caring. Independence does not equal coldness.' },
      { label: 'The practice', desc: "Notice when you're waiting for someone else to make you feel okay — then provide it yourself." },
      { label: 'The signal', desc: "You can have a good day even when they haven't responded." },
    ],
  },
  {
    icon: '♡',
    name: 'Secure Love',
    color: '#fb7185',
    keyInsight: 'Secure love is not the absence of need — it is the absence of fear in the presence of need.',
    items: [
      { label: 'What it looks like', desc: 'Both people can be close AND independent. Requests made clearly, received without threat.' },
      { label: 'Giving securely', desc: 'From abundance, not fear. Generosity without scorekeeping or conditions.' },
      { label: 'Receiving securely', desc: 'Without guilt or disbelief. "I accept this — I am worth this."' },
      { label: 'Building it', desc: 'Stop performing. Say what you want. Allow space without filling it with anxiety.' },
    ],
  },
];

const pg = {
  minHeight: '100vh',
  background: '#0b0d18',
  color: '#e2e8f0',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
};

const backBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#e2e8f0',
  padding: '7px 14px',
  borderRadius: '999px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
};

export default function RelationshipPatterns({ onBack }) {
  const color = '#f9a8d4';
  return (
    <div style={pg}>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(11,13,24,0.95)',
        backdropFilter: 'blur(14px)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: `1px solid ${color}30`,
      }}>
        {onBack && (
          <button type="button" style={backBtnStyle} onClick={onBack}>← Back</button>
        )}
        <span style={{ fontSize: '13px', fontWeight: 700, color, marginLeft: 4 }}>Relationship Patterns</span>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Relationship Patterns</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8, fontSize: '1rem', maxWidth: 560, lineHeight: 1.65 }}>
            The repeating patterns underneath love, connection, and disconnection — what they are, why they form, and how to shift them.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {RELATIONSHIP_PATTERNS.map(pattern => (
            <div key={pattern.name} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${pattern.color}2e`,
              borderRadius: 16,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1, color: pattern.color }}>{pattern.icon}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: pattern.color, margin: 0 }}>{pattern.name}</h3>
              </div>
              <p style={{
                fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.38)',
                margin: '0 0 14px', lineHeight: 1.6,
                borderLeft: `2px solid ${pattern.color}40`, paddingLeft: 10,
              }}>
                {pattern.keyInsight}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pattern.items.map(item => (
                  <div key={item.label} style={{
                    background: `${pattern.color}07`,
                    border: `1px solid ${pattern.color}1e`,
                    borderRadius: 10,
                    padding: '10px 14px',
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: pattern.color, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
