// Relationship Patterns — the repeating dynamics underneath love, connection,
// and disconnection. This content belongs to the Relationship Hub and is
// surfaced through its "Relationship Patterns" tab. Each pattern has a stable
// `id` used for ?section= deep links (see src/data/relationshipIndex.js);
// arriving with `initialSection` scrolls that pattern into view and highlights
// it, no modal required.
import { useEffect, useRef, useState } from 'react';

const RELATIONSHIP_PATTERNS = [
  {
    id: 'attachment-styles',
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
    id: 'neediness-loop',
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
    id: 'ghosting-wounds',
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
    id: 'pedestalizing',
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
    id: 'emotional-independence',
    icon: '◈',
    name: 'Emotional Independence',
    color: '#34d399',
    keyInsight: 'Your baseline belongs to you. No one else should be the source of your okayness.',
    items: [
      { label: 'What it means', desc: "Your baseline mood and self-worth are not controlled by another person's behavior." },
      { label: 'What it is not', desc: 'Emotional detachment or not caring. Independence does not equal coldness — or independence from all other people.' },
      { label: 'The practice', desc: "Notice when you're waiting for someone else to make you feel okay — then provide it yourself." },
      { label: 'The signal', desc: "You can have a good day even when they haven't responded." },
    ],
  },
  {
    id: 'secure-love',
    icon: '◑',
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
  {
    id: 'codependency-vs-interdependence',
    icon: '⚖',
    name: 'Codependency vs Interdependence',
    color: '#5eead4',
    keyInsight: 'Healthy interdependence lets two capable people rely on one another without either losing their identity, agency, or responsibility.',
    items: [
      { label: 'Independence', desc: 'Standing on your own — able to meet your own needs and self-regulate. Healthy, but not the whole picture.' },
      { label: 'Codependence', desc: 'Self-worth tied to being needed. Rescuing, caretaking, and self-abandonment — managing another\'s life instead of living your own.' },
      { label: 'Enabling', desc: 'Protecting someone from the consequences of their choices, which quietly removes their responsibility to change.' },
      { label: 'Healthy interdependence', desc: 'Two whole people leaning on each other by choice. Mutual responsibility, clear emotional boundaries, no self-erasure.' },
      { label: 'The tell', desc: 'Codependence asks "who am I if they don\'t need me?" Interdependence can say "I choose you" and still stand on its own.' },
    ],
    note: 'Losing yourself to keep a relationship is not devotion. If leaving feels impossible because you have disappeared into someone else, support exists — a trusted person or a therapist can help you find the ground again.',
  },
  {
    id: 'pursuer-distancer-cycle',
    icon: '⇄',
    name: 'Pursuer–Distancer Cycle',
    color: '#93c5fd',
    keyInsight: 'The cycle is the problem, not the person. Pursuit and withdrawal each intensify the other until you name the loop instead of blaming a partner.',
    items: [
      { label: 'The pattern', desc: 'Under stress, one partner seeks closeness; the other seeks distance. Pursuit increases withdrawal; withdrawal increases pursuit.' },
      { label: 'Why it locks in', desc: 'Both people are trying to feel safe. Each move makes sense from the inside and makes the other person feel less safe.' },
      { label: 'Name the cycle', desc: 'Talk about "the cycle" as a shared third thing — not "you always chase" or "you always shut down."' },
      { label: 'Agree on a return time', desc: 'Space is fine when it has a clear end: "I need 30 minutes, then I\'ll come back." Distance without a return reads as abandonment.' },
      { label: 'Reconnect reliably', desc: 'Reduce repeated pursuit, communicate needs before activation peaks, and follow through on reconnecting after distance.' },
    ],
  },
  {
    id: 'conflict-patterns',
    icon: '⚡',
    name: 'Conflict Patterns',
    color: '#fca5a5',
    keyInsight: 'Conflict is not the danger — the way you fight is. These are descriptions of moves, not diagnoses of you or your partner.',
    items: [
      { label: 'Criticism → complaint', desc: 'Instead of attacking character ("you always…"), name the specific behavior and its effect on you.' },
      { label: 'Defensiveness → responsibility', desc: 'Instead of counter-attacking or explaining, take the part that is yours, even if it is small.' },
      { label: 'Contempt → respect', desc: 'Mockery, sarcasm, and eye-rolling are the most corrosive move. Replace them with respect, even in disagreement.' },
      { label: 'Stonewalling → regulated pause', desc: 'Shutting down and walling off differs from a named, time-bound pause to calm your body and return.' },
      { label: 'Kitchen-sinking → one issue', desc: 'Dragging in old grievances or scorekeeping buries the real thing. Stay on one issue at a time.' },
      { label: 'Threats → repair attempts', desc: 'Threatening the relationship or punishing with silence escalates. Small repair attempts — a joke, a hand, "let\'s slow down" — de-escalate.' },
    ],
    note: 'These describe ordinary conflict habits, not abuse. Contempt, threats, and punishment that leave you afraid, controlled, or unsafe are a different category. If that is happening, prioritize your safety and reach out to someone you trust or a domestic-violence helpline.',
  },
  {
    id: 'early-trauma-confessional',
    icon: '🧭',
    name: 'The Early Trauma Confessional',
    color: '#94a3b8',
    keyInsight: 'Safety is not the same as readiness. Triggering emotional safety before polarity forms turns you into a container — not a counterpart.',
    items: [
      { label: 'The pattern', desc: 'Early dates (1st–2nd hangout). She discloses deep trauma. You listen calmly and attentively. Emotional gravity enters fast. Momentum quietly dies afterward.' },
      { label: 'Why it keeps happening', desc: 'Your calm, non-judgmental strength reads as a safe place to finally say the unintegrated thing. She is not choosing you as a partner — she is regulating in the presence of someone who won\'t flinch.' },
      { label: 'The hidden pitfall', desc: 'Depth before polarity. The frame shifts from romantic discovery to emotional processing. Desire gets replaced by seriousness. The connection collapses under weight it didn\'t earn yet.' },
      { label: 'Real-time signal', desc: 'She shares trauma without context, very early, without balancing it with curiosity, humor, or forward-looking energy. That\'s your tell: this is about regulation, not romance.' },
      { label: 'The course-correction', desc: 'Re-pace — don\'t shut her down. Acknowledge: "That sounds meaningful to your story." Then redirect: "I\'m also curious what your life feels like now — what lights you up." Respect her experience and return to mutual presence.' },
      { label: 'The reframe', desc: 'Your growth edge is pacing intimacy — not eliminating depth. Depth belongs in relationships that have earned it.' },
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

export default function RelationshipPatterns({ onBack, initialSection }) {
  const color = '#f9a8d4';
  const [highlightId, setHighlightId] = useState(() =>
    initialSection && RELATIONSHIP_PATTERNS.some((p) => p.id === initialSection)
      ? initialSection
      : null
  );
  const cardRefs = useRef({});

  useEffect(() => {
    if (!highlightId) return undefined;
    const node = cardRefs.current[highlightId];
    if (node && typeof node.scrollIntoView === 'function') {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const timer = setTimeout(() => setHighlightId(null), 2600);
    return () => clearTimeout(timer);
  }, [highlightId]);

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
          {RELATIONSHIP_PATTERNS.map(pattern => {
            const isHighlighted = highlightId === pattern.id;
            return (
              <div
                key={pattern.id}
                id={`pattern-${pattern.id}`}
                ref={(node) => { cardRefs.current[pattern.id] = node; }}
                style={{
                  background: isHighlighted ? `${pattern.color}12` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHighlighted ? pattern.color : `${pattern.color}2e`}`,
                  borderRadius: 16,
                  padding: '24px',
                  boxShadow: isHighlighted ? `0 0 0 2px ${pattern.color}66, 0 18px 40px ${pattern.color}22` : 'none',
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease',
                  scrollMarginTop: 90,
                }}
              >
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
                {pattern.note && (
                  <p style={{
                    marginTop: 14,
                    fontSize: '0.75rem',
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(251,113,133,0.08)',
                    border: '1px solid rgba(251,113,133,0.25)',
                    borderRadius: 10,
                    padding: '10px 12px',
                  }}>
                    <strong style={{ color: '#fda4af' }}>Safety note.</strong> {pattern.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
