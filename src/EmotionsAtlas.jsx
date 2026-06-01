import { useMemo, useState } from 'react';

const CATEGORIES = [
  {
    id: 'basic',
    name: 'Basic emotions',
    color: '#fbbf24',
    summary: 'Bright states that signal satisfaction, energy, appreciation, or inner ease.',
    emotions: [
      { name: 'Joy', definition: 'A strong feeling of happiness.', explanation: 'Joy often shows that something feels alive, meaningful, or deeply welcome.' },
      { name: 'Happiness', definition: 'Feeling good, pleased, or satisfied.', explanation: 'Happiness points to simple alignment between what is happening and what you want or value.' },
      { name: 'Excitement', definition: 'Feeling energized because something good may happen.', explanation: 'Excitement carries anticipation and invites you to prepare, engage, or move toward possibility.' },
      { name: 'Contentment', definition: 'Feeling calm and satisfied with what you have.', explanation: 'Contentment tells you the nervous system is not chasing the next thing for safety.' },
      { name: 'Peace', definition: 'Feeling calm inside, without stress or conflict.', explanation: 'Peace often appears when there is inner agreement, rest, or release from pressure.' },
      { name: 'Gratitude', definition: 'Feeling thankful for someone or something.', explanation: 'Gratitude helps attention land on what is supportive, nourishing, or already present.' },
      { name: 'Hope', definition: 'Believing something good can happen.', explanation: 'Hope is the first upward turn when the mind can imagine a better next step.' },
      { name: 'Pride', definition: 'Feeling good about yourself or something you did.', explanation: 'Healthy pride recognizes effort, growth, skill, or integrity without needing superiority.' },
    ],
  },
  {
    id: 'sad',
    name: 'Sad emotions',
    color: '#60a5fa',
    summary: 'Tender states that signal loss, disappointment, unmet needs, or emotional absence.',
    emotions: [
      { name: 'Sadness', definition: 'Feeling unhappy or emotionally low.', explanation: 'Sadness asks for honesty, softness, and room to feel what has hurt or changed.' },
      { name: 'Grief', definition: 'Deep sadness after losing someone or something important.', explanation: 'Grief marks love, attachment, or meaning adjusting to a real absence.' },
      { name: 'Loneliness', definition: 'Feeling alone or disconnected from others.', explanation: 'Loneliness points to a need for contact, belonging, or being emotionally seen.' },
      { name: 'Disappointment', definition: 'Sadness because something did not happen as expected.', explanation: 'Disappointment shows where expectation met reality and needs to be digested.' },
      { name: 'Regret', definition: 'Wishing you had done something differently.', explanation: 'Regret can become wisdom when it is used to repair, learn, or choose better next time.' },
      { name: 'Heartbreak', definition: 'Deep emotional pain, usually from love or loss.', explanation: 'Heartbreak signals rupture in attachment and needs care rather than self-blame.' },
      { name: 'Hopelessness', definition: 'Feeling like things will not get better.', explanation: 'Hopelessness is a heavy state that needs support, rest, and the smallest possible next step.' },
      { name: 'Emptiness', definition: 'Feeling emotionally numb or like something is missing.', explanation: 'Emptiness may show depletion, disconnection, or feelings that have gone quiet for protection.' },
    ],
  },
  {
    id: 'angry',
    name: 'Angry emotions',
    color: '#fb7185',
    summary: 'Boundary states that signal threat, unfairness, blocked energy, or violated values.',
    emotions: [
      { name: 'Anger', definition: 'Feeling upset because something feels wrong or unfair.', explanation: 'Anger carries boundary energy and asks what needs protection, repair, or clear speech.' },
      { name: 'Frustration', definition: 'Feeling blocked, stuck, or annoyed.', explanation: 'Frustration shows that energy is trying to move but cannot find an effective path.' },
      { name: 'Irritation', definition: 'Mild anger or annoyance.', explanation: 'Irritation is often an early signal to pause before resentment builds.' },
      { name: 'Annoyance', definition: 'Feeling bothered by someone or something.', explanation: 'Annoyance points to friction, overstimulation, or a small boundary being crossed.' },
      { name: 'Resentment', definition: 'Anger that stays inside for a long time.', explanation: 'Resentment often means a need, hurt, or boundary has gone unnamed for too long.' },
      { name: 'Bitterness', definition: 'Deep hurt mixed with anger.', explanation: 'Bitterness forms when pain hardens into a story that expects more pain.' },
      { name: 'Rage', definition: 'Very strong anger.', explanation: 'Rage is intense protective energy and needs space, safety, and no impulsive action.' },
      { name: 'Hatred', definition: 'Intense dislike or hostility.', explanation: 'Hatred fuses pain and threat into rejection; it needs distance before clear judgment is possible.' },
      { name: 'Contempt', definition: 'Feeling someone is beneath respect.', explanation: 'Contempt signals disconnection from empathy and often destroys trust if expressed unchecked.' },
    ],
  },
  {
    id: 'fear',
    name: 'Fear emotions',
    color: '#a78bfa',
    summary: 'Protection states that scan for danger, uncertainty, rejection, or future threat.',
    emotions: [
      { name: 'Fear', definition: 'Feeling danger or threat.', explanation: 'Fear tries to protect you by focusing attention on safety and response.' },
      { name: 'Anxiety', definition: 'Worry or nervousness about what might happen.', explanation: 'Anxiety is future-oriented fear that needs grounding in what is actually happening now.' },
      { name: 'Worry', definition: 'Thinking too much about possible problems.', explanation: 'Worry attempts to solve uncertainty mentally, even when the body needs regulation first.' },
      { name: 'Nervousness', definition: 'Feeling uneasy before something happens.', explanation: 'Nervousness often means your system is preparing for evaluation, risk, or performance.' },
      { name: 'Panic', definition: 'Sudden, intense fear.', explanation: 'Panic is a surge of threat chemistry; the priority is slowing the body, not debating thoughts.' },
      { name: 'Dread', definition: 'Strong fear about something coming.', explanation: 'Dread points to a future event that feels unavoidable, heavy, or unsafe.' },
      { name: 'Insecurity', definition: 'Feeling unsure, unsafe, or not good enough.', explanation: 'Insecurity asks for reassurance from stable identity, evidence, and grounded support.' },
      { name: 'Suspicion', definition: 'Feeling that something may be wrong or dishonest.', explanation: 'Suspicion asks for careful observation without letting fear invent facts.' },
      { name: 'Terror', definition: 'Extreme fear.', explanation: 'Terror is full threat activation and needs immediate safety, support, and stabilization.' },
    ],
  },
  {
    id: 'love',
    name: 'Love-related emotions',
    color: '#f472b6',
    summary: 'Connection states that signal care, closeness, desire, devotion, and trust.',
    emotions: [
      { name: 'Love', definition: 'Deep care, affection, or attachment.', explanation: 'Love moves attention toward care, protection, giving, and the wish for another to flourish.' },
      { name: 'Affection', definition: 'Warm, gentle liking or care for someone.', explanation: 'Affection is the soft everyday warmth that makes connection feel safe and human.' },
      { name: 'Adoration', definition: 'Deep love and admiration.', explanation: 'Adoration elevates the beloved in attention and should stay grounded in real personhood.' },
      { name: 'Admiration', definition: 'Respect and appreciation for someone.', explanation: 'Admiration recognizes qualities you value and may want to honor or develop.' },
      { name: 'Attraction', definition: 'Feeling drawn to someone.', explanation: 'Attraction signals pull, interest, or chemistry, but does not by itself prove compatibility.' },
      { name: 'Desire', definition: 'Strongly wanting someone or something.', explanation: 'Desire reveals what feels wanted, alive, or important, and needs wise direction.' },
      { name: 'Longing', definition: 'Deep wanting, especially for someone absent.', explanation: 'Longing shows attachment reaching across distance, absence, or an unmet dream.' },
      { name: 'Devotion', definition: 'Loyal love and commitment.', explanation: 'Devotion turns love into steady choice, care, and follow-through.' },
      { name: 'Tenderness', definition: 'Soft, gentle care.', explanation: 'Tenderness appears when the heart feels safe enough to be gentle.' },
      { name: 'Compassion', definition: 'Caring about someone\'s pain and wanting to help.', explanation: 'Compassion joins empathy with the wish to relieve suffering wisely.' },
      { name: 'Trust', definition: 'Feeling safe with someone.', explanation: 'Trust grows when words, actions, and presence become reliably aligned.' },
      { name: 'Intimacy', definition: 'Emotional or physical closeness.', explanation: 'Intimacy means being near the truth of someone, not only near their body or attention.' },
    ],
  },
  {
    id: 'self',
    name: 'Self-related emotions',
    color: '#38bdf8',
    summary: 'Identity states that show how you relate to worth, agency, mistakes, and self-respect.',
    emotions: [
      { name: 'Confidence', definition: 'Believing in yourself.', explanation: 'Confidence comes from felt capacity, evidence, practice, or a stable inner stance.' },
      { name: 'Self-doubt', definition: 'Questioning your ability or worth.', explanation: 'Self-doubt asks for evidence, learning, and care instead of automatic self-rejection.' },
      { name: 'Shame', definition: 'Feeling bad about who you are or how you appear.', explanation: 'Shame attacks identity and needs compassion, truth, and safe connection.' },
      { name: 'Guilt', definition: 'Feeling bad about something you did.', explanation: 'Guilt can be useful when it points to repair, apology, or changed behavior.' },
      { name: 'Embarrassment', definition: 'Feeling awkward or exposed socially.', explanation: 'Embarrassment is a social signal that usually softens when met with humor and perspective.' },
      { name: 'Humility', definition: 'Not thinking you are better than others.', explanation: 'Humility keeps self-worth grounded without collapsing into inferiority.' },
      { name: 'Empowerment', definition: 'Feeling strong and capable.', explanation: 'Empowerment restores agency and helps you act from choice instead of helplessness.' },
      { name: 'Worthiness', definition: 'Feeling deserving of love, respect, or good things.', explanation: 'Worthiness is the felt permission to receive without proving your existence first.' },
      { name: 'Inadequacy', definition: 'Feeling not good enough.', explanation: 'Inadequacy points to comparison, unmet standards, or a wound around belonging and value.' },
      { name: 'Self-respect', definition: 'Valuing yourself and your boundaries.', explanation: 'Self-respect protects dignity by aligning choices with your own value.' },
    ],
  },
  {
    id: 'social',
    name: 'Social emotions',
    color: '#34d399',
    summary: 'Relational states that signal belonging, rejection, comparison, respect, or trust wounds.',
    emotions: [
      { name: 'Belonging', definition: 'Feeling accepted as part of a group.', explanation: 'Belonging tells the body it has a place and does not need to perform for safety.' },
      { name: 'Rejection', definition: 'Feeling unwanted or pushed away.', explanation: 'Rejection hurts because it touches attachment, worth, and the need to matter.' },
      { name: 'Acceptance', definition: 'Feeling welcomed or approved of.', explanation: 'Acceptance relaxes the social nervous system and supports authenticity.' },
      { name: 'Jealousy', definition: 'Fear of losing someone or something to another person.', explanation: 'Jealousy points to attachment threat and asks for security, clarity, or honest communication.' },
      { name: 'Envy', definition: 'Wanting what someone else has.', explanation: 'Envy can reveal a hidden desire, value, or direction you have not owned yet.' },
      { name: 'Respect', definition: 'Valuing someone or treating them as important.', explanation: 'Respect recognizes dignity, boundaries, and significance in yourself or another.' },
      { name: 'Betrayal', definition: 'Hurt from someone breaking trust.', explanation: 'Betrayal wounds the expectation of safety and requires truth before trust can rebuild.' },
      { name: 'Empathy', definition: 'Understanding and feeling another person\'s emotions.', explanation: 'Empathy lets you sense another inner world without making it entirely yours.' },
      { name: 'Sympathy', definition: 'Feeling sorry for someone\'s pain.', explanation: 'Sympathy notices suffering and responds with concern from a little more distance.' },
      { name: 'Pity', definition: 'Feeling sadness for someone, sometimes from a distance.', explanation: 'Pity can show concern, but it should be held with respect so it does not become superiority.' },
      { name: 'Awkwardness', definition: 'Feeling socially uncomfortable.', explanation: 'Awkwardness signals uncertainty about roles, timing, expression, or how you are being received.' },
    ],
  },
  {
    id: 'spiritual',
    name: 'Calm or spiritual emotions',
    color: '#22d3ee',
    summary: 'Settling states that signal release, faith, stillness, patience, and inner steadiness.',
    emotions: [
      { name: 'Relief', definition: 'Feeling better after stress or fear ends.', explanation: 'Relief tells the body that pressure has dropped and safety is returning.' },
      { name: 'Acceptance', definition: 'Allowing reality instead of fighting it.', explanation: 'Acceptance stops arguing with what is already true so energy can return to response.' },
      { name: 'Forgiveness', definition: 'Releasing anger toward someone or yourself.', explanation: 'Forgiveness loosens the grip of resentment without denying what happened.' },
      { name: 'Faith', definition: 'Trusting something even without full proof.', explanation: 'Faith gives the heart a place to stand when certainty is unavailable.' },
      { name: 'Awe', definition: 'Wonder mixed with respect or amazement.', explanation: 'Awe widens perspective and reminds the self it is part of something larger.' },
      { name: 'Stillness', definition: 'Deep inner quiet.', explanation: 'Stillness is the felt quiet beneath urgency, noise, and mental movement.' },
      { name: 'Surrender', definition: 'Letting go of control.', explanation: 'Surrender releases false control while keeping responsibility for the next right action.' },
      { name: 'Patience', definition: 'Calmly waiting without becoming upset.', explanation: 'Patience holds desire without forcing timing, panic, or pressure.' },
      { name: 'Clarity', definition: 'Feeling mentally clear and sure.', explanation: 'Clarity shows that confusion has settled enough for clean seeing or decision.' },
      { name: 'Groundedness', definition: 'Feeling stable, present, and emotionally steady.', explanation: 'Groundedness means awareness is back in the body, the moment, and reality.' },
    ],
  },
  {
    id: 'mixed',
    name: 'Mixed emotions',
    color: '#c084fc',
    summary: 'Complex states where multiple signals, meanings, or directions are active at once.',
    emotions: [
      { name: 'Confusion', definition: 'Not understanding what you feel or what is happening.', explanation: 'Confusion asks for slowing down, naming facts, and separating feelings from assumptions.' },
      { name: 'Nostalgia', definition: 'Warm sadness when remembering the past.', explanation: 'Nostalgia blends gratitude and grief for something meaningful that has changed.' },
      { name: 'Ambivalence', definition: 'Having mixed feelings at the same time.', explanation: 'Ambivalence means more than one value, fear, or desire is speaking at once.' },
      { name: 'Overwhelm', definition: 'Feeling like something is too much to handle.', explanation: 'Overwhelm says the load exceeds current capacity and needs simplification or support.' },
      { name: 'Vulnerability', definition: 'Feeling emotionally open or exposed.', explanation: 'Vulnerability appears when truth is visible and protection is lowered.' },
      { name: 'Curiosity', definition: 'Wanting to know or understand more.', explanation: 'Curiosity turns attention toward discovery instead of immediate judgment.' },
      { name: 'Wonder', definition: 'Amazed interest in something.', explanation: 'Wonder opens perception and makes ordinary things feel fresh or meaningful.' },
      { name: 'Inspiration', definition: 'Feeling mentally or emotionally lifted to act.', explanation: 'Inspiration gives energy, image, or direction to create or move.' },
      { name: 'Motivation', definition: 'Feeling driven to do something.', explanation: 'Motivation is action energy connected to reward, meaning, need, or identity.' },
      { name: 'Determination', definition: 'Strong commitment to keep going.', explanation: 'Determination holds direction even when comfort, mood, or certainty fluctuates.' },
      { name: 'Courage', definition: 'Acting even when afraid.', explanation: 'Courage does not remove fear; it chooses a value that matters more.' },
      { name: 'Optimism', definition: 'Expecting good things to happen.', explanation: 'Optimism looks for favorable possibility and helps the body stay open to effort.' },
      { name: 'Fulfillment', definition: 'Feeling deeply satisfied because something feels meaningful.', explanation: 'Fulfillment signals that action, value, and meaning are meeting in a satisfying way.' },
    ],
  },
];

const ALL_EMOTIONS = CATEGORIES.flatMap((category) =>
  category.emotions.map((emotion) => ({
    ...emotion,
    id: `${category.id}-${emotion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    category: category.name,
    categoryId: category.id,
    color: category.color,
  }))
);

const UPWARD_SPIRAL = [
  { label: 'Groundedness', note: 'Return to the body and the present.', x: 18, y: 76 },
  { label: 'Relief', note: 'The pressure starts to loosen.', x: 40, y: 64 },
  { label: 'Acceptance', note: 'Reality can be met without fighting it.', x: 58, y: 72 },
  { label: 'Hope', note: 'A better next step becomes imaginable.', x: 72, y: 52 },
  { label: 'Gratitude', note: 'Attention finds support already here.', x: 55, y: 36 },
  { label: 'Peace', note: 'The system settles into inner agreement.', x: 34, y: 42 },
  { label: 'Joy', note: 'Energy rises without force.', x: 25, y: 22 },
  { label: 'Fulfillment', note: 'Meaning and satisfaction meet.', x: 50, y: 16 },
];

const DOWNWARD_SPIRAL = [
  { label: 'Worry', note: 'The mind starts scanning for problems.', x: 48, y: 16 },
  { label: 'Anxiety', note: 'Future threat takes over attention.', x: 70, y: 24 },
  { label: 'Frustration', note: 'Energy feels blocked.', x: 58, y: 42 },
  { label: 'Anger', note: 'Boundary energy intensifies.', x: 35, y: 36 },
  { label: 'Resentment', note: 'Unspoken hurt hardens.', x: 22, y: 56 },
  { label: 'Grief', note: 'Loss becomes heavy.', x: 43, y: 68 },
  { label: 'Hopelessness', note: 'The mind stops seeing a path.', x: 68, y: 62 },
  { label: 'Emptiness', note: 'Feeling goes numb or distant.', x: 50, y: 82 },
];

const page = {
  minHeight: '100vh',
  background: '#0b0d18',
  color: '#e2e8f0',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
};

const topbar = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: 'rgba(11,13,24,0.95)',
  backdropFilter: 'blur(14px)',
  padding: '14px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderBottom: '1px solid rgba(244,114,182,0.22)',
};

const backButton = {
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

function SpiralPath({ title, tone, nodes, direction }) {
  const displayTop = (value) => 13 + value * 0.82;
  const points = nodes.map((node) => `${node.x},${displayTop(node.y)}`).join(' ');
  return (
    <section className="emotion-spiral" style={{
      position: 'relative',
      minHeight: 540,
      borderRadius: 24,
      border: `1px solid ${tone}44`,
      background: `radial-gradient(circle at 50% 40%, ${tone}20, transparent 46%), rgba(255,255,255,0.035)`,
      overflow: 'hidden',
      padding: 20,
    }}>
      <div style={{ position: 'relative', zIndex: 2, marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: tone }}>
          {direction}
        </div>
        <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: 24, letterSpacing: '-0.02em' }}>{title}</h3>
      </div>
      <svg className="emotion-spiral-svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.72 }}>
        <polyline points={points} fill="none" stroke={tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {nodes.map((node, index) => (
          <circle key={node.label} cx={node.x} cy={displayTop(node.y)} r={index === nodes.length - 1 ? 2.8 : 2.1} fill={tone} opacity={index === nodes.length - 1 ? 1 : 0.8} />
        ))}
      </svg>
      {nodes.map((node, index) => (
        <div key={node.label} className="emotion-spiral-node" style={{
          position: 'absolute',
          left: `${node.x}%`,
          top: `${displayTop(node.y)}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          width: 124,
          maxWidth: '36%',
          padding: '9px 10px',
          borderRadius: 14,
          border: `1px solid ${tone}55`,
          background: 'rgba(11,13,24,0.88)',
          boxShadow: `0 14px 34px ${tone}1f`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              display: 'grid',
              placeItems: 'center',
              width: 20,
              height: 20,
              borderRadius: 999,
              background: `${tone}22`,
              color: tone,
              fontSize: 11,
              fontWeight: 900,
              flexShrink: 0,
            }}>{index + 1}</span>
            <strong style={{ color: '#fff', fontSize: 11.5 }}>{node.label}</strong>
          </div>
          <p style={{ margin: '5px 0 0', color: 'rgba(255,255,255,0.58)', fontSize: 10.5, lineHeight: 1.4 }}>{node.note}</p>
        </div>
      ))}
    </section>
  );
}

export default function EmotionsAtlas({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('basic-joy');

  const visibleEmotions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_EMOTIONS.filter((emotion) => {
      const matchesCategory = activeCategory === 'all' || emotion.categoryId === activeCategory;
      const haystack = [emotion.name, emotion.definition, emotion.explanation, emotion.category].join(' ').toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [activeCategory, query]);

  const selectedEmotion =
    ALL_EMOTIONS.find((emotion) => emotion.id === selectedId) ||
    visibleEmotions[0] ||
    ALL_EMOTIONS[0];

  const groupedVisible = CATEGORIES.map((category) => ({
    ...category,
    emotions: visibleEmotions.filter((emotion) => emotion.categoryId === category.id),
  })).filter((category) => category.emotions.length > 0);

  const selectEmotion = (emotion) => {
    setSelectedId(emotion.id);
    document.getElementById('emotion-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div style={page}>
      <style>
        {`
          @media (max-width: 640px) {
            .emotion-spiral {
              min-height: auto !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 10px !important;
            }

            .emotion-spiral-svg {
              display: none !important;
            }

            .emotion-spiral-node {
              position: static !important;
              transform: none !important;
              width: auto !important;
              max-width: none !important;
            }
          }
        `}
      </style>
      <div style={topbar}>
        <button type="button" style={backButton} onClick={onBack}>Back to InnerAtlas</button>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#f472b6' }}>Emotions & Guidance Spiral</span>
      </div>

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '38px 24px 72px' }}>
        <header style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: 28,
          alignItems: 'center',
          marginBottom: 28,
        }}>
          <div>
            <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
              Emotional vocabulary
            </div>
            <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(2.1rem, 5vw, 4.8rem)', lineHeight: 0.96, letterSpacing: '-0.045em' }}>
              Name the feeling. Read the signal.
            </h1>
            <p style={{ maxWidth: 640, color: 'rgba(255,255,255,0.56)', fontSize: '1rem', lineHeight: 1.75, margin: '18px 0 0' }}>
              A simple emotion glossary with definitions, explanations, and a guidance spiral for noticing whether a state is opening upward or pulling downward.
            </p>
          </div>

          <div style={{
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'radial-gradient(circle at 45% 35%, rgba(244,114,182,0.22), transparent 36%), radial-gradient(circle at 62% 70%, rgba(34,211,238,0.16), transparent 34%), rgba(255,255,255,0.035)',
            minHeight: 280,
            display: 'grid',
            placeItems: 'center',
            padding: 24,
          }}>
            <div style={{ width: 210, height: 210, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', position: 'relative' }}>
              {['Joy', 'Hope', 'Peace', 'Anger', 'Fear', 'Grief'].map((label, index) => {
                const angle = (index / 6) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 42;
                const y = 50 + Math.sin(angle) * 42;
                const colors = ['#fbbf24', '#34d399', '#22d3ee', '#fb7185', '#a78bfa', '#60a5fa'];
                return (
                  <span key={label} style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${colors[index]}66`,
                    background: `${colors[index]}22`,
                    color: colors[index],
                    borderRadius: 999,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: 800,
                  }}>{label}</span>
                );
              })}
              <div style={{
                position: 'absolute',
                inset: '35%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(244,114,182,0.6), rgba(34,211,238,0.45))',
                boxShadow: '0 0 56px rgba(244,114,182,0.32)',
              }} />
            </div>
          </div>
        </header>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
          gap: 18,
          marginBottom: 28,
        }}>
          <SpiralPath title="Upward spiral" direction="Regulate toward openness" tone="#34d399" nodes={UPWARD_SPIRAL} />
          <SpiralPath title="Downward spiral" direction="Notice the contraction" tone="#fb7185" nodes={DOWNWARD_SPIRAL} />
        </section>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: 20,
          alignItems: 'start',
        }}>
          <aside id="emotion-detail" style={{
            position: 'sticky',
            top: 76,
            border: `1px solid ${selectedEmotion.color}55`,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${selectedEmotion.color}18, rgba(255,255,255,0.035))`,
            padding: 22,
          }}>
            <div style={{ color: selectedEmotion.color, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              {selectedEmotion.category}
            </div>
            <h2 style={{ margin: '8px 0 8px', color: '#fff', fontSize: 32, letterSpacing: '-0.03em' }}>{selectedEmotion.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>{selectedEmotion.definition}</p>
            <div style={{ height: 1, background: `${selectedEmotion.color}44`, margin: '18px 0' }} />
            <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: 14 }}>Explanation</h3>
            <p style={{ color: 'rgba(255,255,255,0.56)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{selectedEmotion.explanation}</p>
            <p style={{ color: 'rgba(255,255,255,0.36)', fontSize: 12, lineHeight: 1.6, margin: '18px 0 0' }}>
              This is a reflection map, not a diagnosis. If a painful state is intense, persistent, or unsafe, involve trusted support or a qualified professional.
            </p>
          </aside>

          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: 12,
              marginBottom: 18,
            }}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search emotions, definitions, anger, fear, love, hope..."
                style={{
                  width: '100%',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.055)',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '14px 16px',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  style={{
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: activeCategory === 'all' ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.055)',
                    color: '#fff',
                    borderRadius: 999,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  All
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    style={{
                      border: `1px solid ${category.color}44`,
                      background: activeCategory === category.id ? `${category.color}24` : 'rgba(255,255,255,0.035)',
                      color: activeCategory === category.id ? category.color : 'rgba(255,255,255,0.68)',
                      borderRadius: 999,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {category.name.replace(' emotions', '')}
                  </button>
                ))}
              </div>
            </div>

            {groupedVisible.length === 0 ? (
              <div style={{ border: '1px dashed rgba(255,255,255,0.18)', borderRadius: 20, padding: 30, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                No emotions found. Try another word.
              </div>
            ) : groupedVisible.map((category) => (
              <section key={category.id} style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: 20 }}>{category.name}</h3>
                  <span style={{ color: category.color, fontSize: 12, fontWeight: 800 }}>{category.emotions.length}</span>
                </div>
                <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, fontSize: 13 }}>{category.summary}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(230px, 100%), 1fr))', gap: 10 }}>
                  {category.emotions.map((emotion) => (
                    <button
                      key={emotion.id}
                      type="button"
                      onClick={() => selectEmotion(emotion)}
                      style={{
                        textAlign: 'left',
                        border: `1px solid ${emotion.id === selectedEmotion.id ? emotion.color : 'rgba(255,255,255,0.09)'}`,
                        borderRadius: 16,
                        background: emotion.id === selectedEmotion.id ? `${emotion.color}18` : 'rgba(255,255,255,0.035)',
                        padding: 14,
                        cursor: 'pointer',
                        color: '#fff',
                        minHeight: 118,
                        fontFamily: 'inherit',
                      }}
                    >
                      <strong style={{ color: emotion.color, fontSize: 14 }}>{emotion.name}</strong>
                      <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.55, fontSize: 12.5, margin: '7px 0 0' }}>{emotion.definition}</p>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
