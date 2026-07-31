import { useEffect, useRef, useState } from 'react';
import InnerAtlasShell from './components/InnerAtlasShell';

const LEVELS = [
  {
    score: 1000, emotion: 'Enlightenment', title: 'Pure Consciousness',
    keywords: ['Unity', 'Being', 'Non-Duality'], zone: 'expanded',
    color: '#4c1d95',
    description: 'The apex of human experience. The boundary between self and All That Is dissolves entirely. Not a state that is maintained by a person, but the permanent recognition of what was always true. Associated with rare figures like Buddha and Christ — this level is the end of the path.',
    experience: [
      'No separation remains between self and world',
      'Time ceases — only the eternal now remains',
      'Infinite compassion without a self to feel it',
      'The knower, knowing, and known become one',
    ],
    pathUp: [
      'There is no "higher" from here — all seeking falls away',
      'Reached only by the complete surrender of all striving',
      'The seeker and the path dissolve together',
    ],
  },
  {
    score: 700, emotion: 'Peace', title: 'Transcendence',
    keywords: ['Bliss', 'Inner Peace'], zone: 'expanded',
    color: '#5b21b6',
    description: 'Profound, unshakeable inner stillness. Bliss is no longer dependent on anything external. Rare and characterizes advanced sages and contemplatives who have moved beyond the usual drama of existence.',
    experience: [
      'Inner stillness no external event can disturb',
      'A natural luminosity others sense and are drawn to',
      'Compassion without pity, agenda, or personal cost',
      'Life flows without resistance or effort',
    ],
    pathUp: [
      'Daily silent meditation — long periods, regularly',
      'Surrender all remaining attachments, even to peace itself',
      'Serve without any expectation of return or recognition',
    ],
  },
  {
    score: 600, emotion: 'Joy', title: 'Serenity',
    keywords: ['Gratitude', 'Radiance'], zone: 'expanded',
    color: '#6d28d9',
    description: 'Continuous inner radiance not dependent on circumstances. Joy here is not excitement or pleasure — it is a steady, quiet aliveness. Gratitude arises spontaneously for the simple fact of existence.',
    experience: [
      'Gratitude wells up without cause or effort',
      'Beauty is visible in the most ordinary things',
      'Relationships held with warmth and total freedom',
      'Life itself feels like an unearned gift',
    ],
    pathUp: [
      'Morning gratitude practice — specific and felt, not rote',
      'Meditation on sensation rather than narrative',
      'Generosity with no scorekeeping whatsoever',
    ],
  },
  {
    score: 540, emotion: 'Love', title: 'Unconditional Love',
    keywords: ['Compassion', 'Oneness'], zone: 'expanded',
    color: '#1e40af',
    description: 'Love that is not directed at a person or outcome but radiates as a field. This is not romantic or conditional love — it is a felt sense of benevolence toward all life. The well-being of others is experienced as one\'s own.',
    experience: [
      'Care for others without needing them to change',
      'No enemies — only beings at different stages',
      'Forgiveness arises naturally, not through effort',
      'The heart remains open without needing protection',
    ],
    pathUp: [
      'Loving-kindness (metta) meditation — begin with yourself',
      'Practice seeing the divine in people who frustrate you',
      'Release the need to be right in close relationships',
    ],
  },
  {
    score: 400, emotion: 'Reason', title: 'Understanding',
    keywords: ['Logic', 'Clarity', 'Science'], zone: 'expanded',
    color: '#0369a1',
    description: 'The realm of science, philosophy, and formal education. Reality is approached through analysis and understanding. The highest level most people in modern society will reach. Its shadow: using the mind to avoid feeling.',
    experience: [
      'Truth is sought through evidence and careful reasoning',
      'Life is organized, purposeful, and goal-directed',
      'Contribution through knowledge, teaching, or mastery',
      'The mind is a reliable tool rather than an enemy',
    ],
    pathUp: [
      'Study wisdom traditions alongside rational frameworks',
      'Sit with uncertainty without needing to resolve it',
      'Let beauty, awe, and love inform decisions alongside logic',
    ],
  },
  {
    score: 350, emotion: 'Acceptance', title: 'Forgiveness',
    keywords: ['Harmony', 'Responsibility'], zone: 'expanded',
    color: '#0d9488',
    description: 'Life is taken as it comes. People and events are accepted rather than forced into a preferred shape. Problems are increasingly recognized within rather than blamed on the outside. Long-term thinking and collaboration become natural.',
    experience: [
      'The habit of blame weakens — responsibility grows',
      'Difficult people are met with patience rather than reactivity',
      'Long-range goals feel sustainable rather than burdensome',
      'Harmony is actively chosen over the need to win',
    ],
    pathUp: [
      'Write a forgiveness letter you don\'t send',
      'Ask with each frustration: "What part of this is mine?"',
      'Volunteer, contribute — practice being genuinely useful',
    ],
  },
  {
    score: 310, emotion: 'Willingness', title: 'Optimism',
    keywords: ['Growth', 'Trust', 'Discipline'], zone: 'expanded',
    color: '#16a34a',
    description: 'A genuine yes to life and its demands. People here are teachable, growth-oriented, and willing to look at themselves honestly. The level of self-improvement, skill-building, and consistent contribution.',
    experience: [
      'Obstacles feel like invitations rather than attacks',
      'Discipline and habit feel rewarding, not punishing',
      'Openness to feedback and willingness to be wrong',
      'A steady sense that things can genuinely improve',
    ],
    pathUp: [
      'Commit to one consistent daily practice and keep it',
      'Seek a mentor or community aligned with real growth',
      'Say yes to things that stretch your comfort zone',
    ],
  },
  {
    score: 250, emotion: 'Neutrality', title: 'Equanimity',
    keywords: ['Flexibility', 'Detachment'], zone: 'expanded',
    color: '#65a30d',
    description: 'The first level where life feels manageable rather than threatening. A live-and-let-live orientation. Not deeply invested in outcomes; relatively free of the emotional storms below. A stable resting place — but it can also become comfortable complacency.',
    experience: [
      'Not easily rattled by life\'s ordinary ups and downs',
      'Relatively free of chronic stress or ambient anxiety',
      'Comfortable sitting with ambiguity',
      'A quiet sense that most things work out fine',
    ],
    pathUp: [
      'Move from passive acceptance toward active engagement',
      'Choose one area of genuine growth and commit to it',
      'Notice when "neutrality" is actually avoidance in disguise',
    ],
  },
  {
    score: 200, emotion: 'Courage', title: 'Empowerment',
    keywords: ['Will', 'Action', 'Turning Point'], zone: 'threshold',
    color: '#b45309',
    description: 'The critical threshold. The first level at which life-energy becomes net positive. Courage means facing reality as it is — including uncomfortable truths about oneself. Fear no longer makes all the decisions. This is the turning point where growth becomes genuinely possible.',
    experience: [
      'Willingness to look at yourself honestly without collapse',
      'Fear exists but no longer determines every choice',
      'Setbacks are recoverable — not catastrophic',
      'The world is seen as a place of opportunity, not only threat',
    ],
    pathUp: [
      'Do the thing you\'ve been afraid to do — start small',
      'Seek therapy, coaching, or a truthful community',
      'Own your part: be accountable for your own difficulties',
    ],
  },
  {
    score: 175, emotion: 'Pride', title: 'Inflation',
    keywords: ['Ego', 'Superiority', 'Defensiveness'], zone: 'contracted',
    color: '#d97706',
    description: 'Pride feels good compared to the levels below — but is still below the threshold. Pride depends on external things (status, group identity, achievement) and defends itself aggressively when threatened. Beneath every pride is a fear of inadequacy.',
    experience: [
      'A strong sense that "my group is better"',
      'Contempt or dismissal toward those seen as lesser',
      'Defensiveness and real difficulty hearing criticism',
      'Self-worth tightly bound to performance or position',
    ],
    pathUp: [
      'Ask honestly: "What am I afraid people will find out?"',
      'Practice genuine curiosity toward people you currently dismiss',
      'Notice when defensiveness arrives — sit with the vulnerability beneath',
    ],
  },
  {
    score: 150, emotion: 'Anger', title: 'Hatred',
    keywords: ['Frustration', 'Resentment'], zone: 'contracted',
    color: '#ea580c',
    description: 'Anger carries more energy than apathy or grief, which is why it can be a step up from those states. But as a chronic stance it burns relationships and contracts life. At its core, anger is always about a perceived injustice or violated boundary.',
    experience: [
      'The world feels fundamentally unfair and hostile',
      'Chronic frustration and accumulated resentment',
      'Relationships marked by volatility and power struggles',
      'Energy exists, but it flows against rather than toward',
    ],
    pathUp: [
      'Use anger as information: what boundary was crossed?',
      'Physical release — intense exercise, cold water, movement',
      'Move from blame to need: "I\'m angry because I need..."',
    ],
  },
  {
    score: 125, emotion: 'Desire', title: 'Craving',
    keywords: ['Attachment', 'Ambition'], zone: 'contracted',
    color: '#dc2626',
    description: 'Not desire as healthy motivation, but desire as compulsive seeking that promises satisfaction and never delivers it. Each attainment just shifts the goal further out. Advertising, consumerism, and social media are largely designed to cultivate this state.',
    experience: [
      'Chronic seeking — always wanting the next thing',
      'Real difficulty being satisfied with what already is',
      'Relationships experienced through a lens of "what can I get?"',
      'Addictive patterns; impulsive, compulsive behaviors',
    ],
    pathUp: [
      'Practice contentment: name what is genuinely enough right now',
      'Delay gratification in small, consistent ways daily',
      'Investigate: "What am I actually hungry for beneath this craving?"',
    ],
  },
  {
    score: 100, emotion: 'Fear', title: 'Anxiety',
    keywords: ['Insecurity', 'Control'], zone: 'contracted',
    color: '#b91c1c',
    description: 'Fear constructs a world of constant threat. Energy is spent on avoidance, control, and safety-seeking. The future is a source of dread, other people are potential dangers, and the self feels fundamentally unequal to life\'s demands.',
    experience: [
      'Chronic anxiety; worry about the future as a default state',
      'Intense need to control outcomes and environments',
      'Relationships governed by caution and pervasive distrust',
      'Avoidance of anything that might expose inadequacy',
    ],
    pathUp: [
      'Body-based regulation: slow exhale, cold exposure, vigorous exercise',
      'Gradually approach feared situations rather than avoiding them',
      'Professional support — fear at this level often needs skilled accompaniment',
    ],
  },
  {
    score: 75, emotion: 'Grief', title: 'Regret',
    keywords: ['Sadness', 'Loss'], zone: 'contracted',
    color: '#991b1b',
    description: 'The world experienced as a series of losses. Depression, sadness, and mourning characterize this level. Grief is natural and necessary — the problem is when it becomes a permanent dwelling place rather than a passage.',
    experience: [
      'Pervasive sadness and the feeling of ongoing mourning',
      'Life felt as an accumulation of losses',
      'Low energy, low motivation, low engagement',
      'Difficulty imagining that things could genuinely change',
    ],
    pathUp: [
      'Allow grief to move — tears, movement, telling the story aloud',
      'Seek human presence — grief needs witness, not solutions',
      'One small act of beauty, creativity, or kindness per day',
    ],
  },
  {
    score: 50, emotion: 'Apathy', title: 'Hopelessness',
    keywords: ['Helplessness', 'Isolation'], zone: 'contracted',
    color: '#7f1d1d',
    description: 'Among the most dangerous levels because it lacks even the energy to seek help. Life feels pointless, effort feels futile, and human connection feels meaningless. Chronic apathy shades into clinical depression and learned helplessness.',
    experience: [
      'Profound hopelessness — "nothing will ever change"',
      'Withdrawal from relationships and meaningful activities',
      'Neglect of basic self-care',
      'Extreme passivity; waiting without hope',
    ],
    pathUp: [
      'Professional support is strongly encouraged at this level',
      'One tiny act of agency per day — even making tea counts',
      'Brief human contact, even uncomfortable, even imperfect',
    ],
  },
  {
    score: 30, emotion: 'Guilt', title: 'Blame',
    keywords: ['Regret', 'Self-Punishment'], zone: 'contracted',
    color: '#6b1515',
    description: 'Guilt turned inward becomes self-punishment; projected outward, it becomes blame. This level traps the person in cycles of transgression and punishment. Unexpressed guilt can manifest as psychosomatic illness, seeking physical expression.',
    experience: [
      'Chronic self-blame and compulsive self-punishment',
      'Or: blaming others as a defense against intolerable shame',
      'Relationships shaped by martyrdom or victimhood',
      'An inner critic that is extremely active and cruel',
    ],
    pathUp: [
      'Distinguish guilt (I did wrong) from shame (I am wrong)',
      'Make real amends where possible — action releases guilt',
      'Speak to yourself with the care you\'d offer a frightened child',
    ],
  },
  {
    score: 20, emotion: 'Shame', title: 'Humiliation',
    keywords: ['Self-Hatred', 'Worthlessness'], zone: 'contracted',
    color: '#450a0a',
    description: 'The lowest level — the bedrock of pathology. Shame says "I am bad at the core" — not that I did something wrong, but that my very existence is wrong. It is correlated with violence toward self and others. The most destructive of all emotional orientations.',
    experience: [
      'A deep conviction of being fundamentally worthless or broken',
      'The secret hidden from others at all costs',
      'Chronic self-hatred and self-destructive behavior',
      'Violence toward self or others as shame seeks an outlet',
    ],
    pathUp: [
      'Shame heals in connection — it thrives only in secrecy',
      'Find one person or professional who can hear your story without flinching',
      'You are not your story. The awareness witnessing shame is itself unstained.',
    ],
  },
];

// Maps a deep-link section id (e.g. 'love', 'shame') to its level index, so a
// "Reading for Today" card can land directly on a specific consciousness level.
const SECTION_TO_INDEX = LEVELS.reduce((map, level, i) => {
  map[level.emotion.toLowerCase()] = i;
  return map;
}, {});


function LevelDetail({ level, onClose }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: `1px solid ${level.color}55`,
      borderLeft: `4px solid ${level.color}`, borderRadius: 10, padding: '20px 22px',
      marginTop: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: level.color, lineHeight: 1.1 }}>
            {level.score}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginTop: 2 }}>
            {level.emotion}
          </div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>
            {level.title} · {level.keywords.join(' · ')}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: '#475569', cursor: 'pointer',
          fontSize: 20, lineHeight: 1, padding: 4,
        }}>✕</button>
      </div>

      <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>
        {level.description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
            How It Shows Up
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {level.experience.map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: '#94a3b8', paddingLeft: 14, position: 'relative', lineHeight: 1.5 }}>
                <span style={{ position: 'absolute', left: 0, color: level.color }}>›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
            Moving Higher
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {level.pathUp.map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: '#94a3b8', paddingLeft: 14, position: 'relative', lineHeight: 1.5 }}>
                <span style={{ position: 'absolute', left: 0, color: level.color }}>›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MapView({ levels, selected, setSelected }) {
  const total = levels.length;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20, color: '#64748b', fontSize: 13 }}>
        Tap any level to explore it
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {/* Expanded Awareness label */}
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: '#6d28d9', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
          ▲ Expanded Awareness · Energy Enhancing
        </div>

        {levels.map((level, i) => {
          const widthPct = 100 - (i / (total - 1)) * 76;
          const isSelected = selected === i;
          const isThreshold = level.zone === 'threshold';

          return (
            <div key={level.score} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {isThreshold && (
                <div style={{
                  width: '100%', borderTop: '1px dashed #b4530988', margin: '4px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <span style={{ fontSize: 10, letterSpacing: 1.5, color: '#b45309', background: '#0a0a0f', padding: '0 8px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Threshold of Courage — 200
                  </span>
                </div>
              )}
              <button
                onClick={() => setSelected(isSelected ? null : i)}
                style={{
                  width: `${widthPct}%`,
                  background: isSelected ? level.color : `${level.color}99`,
                  border: `1px solid ${isSelected ? level.color : level.color + '55'}`,
                  borderRadius: 4,
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#fff',
                  transition: 'all 0.15s',
                  boxShadow: isSelected ? `0 0 12px ${level.color}55` : 'none',
                  minWidth: 120,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
                  {level.score} — {level.emotion}
                </span>
                <span style={{ fontSize: 11, opacity: 0.85, whiteSpace: 'nowrap', marginLeft: 8 }}>
                  {level.title}
                </span>
              </button>
            </div>
          );
        })}

        {/* Contracted Awareness label */}
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: '#b91c1c', textTransform: 'uppercase', fontWeight: 700, marginTop: 4 }}>
          ▼ Contracted Awareness · Energy Draining
        </div>
      </div>

      {selected !== null && (
        <LevelDetail level={levels[selected]} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function ExploreView({ levels, selected, setSelected }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? levels : levels.filter((l) => l.zone === filter);

  return (
    <div>
      {/* Zone filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[['all', 'All Levels', '#475569'], ['expanded', 'Expanded', '#6d28d9'], ['threshold', 'Threshold', '#b45309'], ['contracted', 'Contracted', '#b91c1c']].map(([id, label, color]) => (
          <button key={id} onClick={() => { setFilter(id); setSelected(null); }} style={{
            background: filter === id ? `${color}22` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${filter === id ? color : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 20, padding: '5px 14px', cursor: 'pointer',
            color: filter === id ? color : '#64748b', fontSize: 12, fontWeight: 600,
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((level) => {
          const idx = levels.indexOf(level);
          const isSelected = selected === idx;
          return (
            <div key={level.score} id={`moc-level-${idx}`}>
              <button
                onClick={() => setSelected(isSelected ? null : idx)}
                style={{
                  width: '100%', textAlign: 'left',
                  background: isSelected ? `${level.color}18` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isSelected ? level.color + '60' : 'rgba(255,255,255,0.07)'}`,
                  borderLeft: `4px solid ${level.color}`,
                  borderRadius: 8, padding: '12px 16px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: level.color }}>{level.score}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{level.emotion}</span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>· {level.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 3 }}>
                    {level.keywords.join(' · ')}
                  </div>
                </div>
                <span style={{ color: '#334155', fontSize: 16, marginLeft: 12, flexShrink: 0 }}>
                  {isSelected ? '▲' : '▼'}
                </span>
              </button>

              {isSelected && <LevelDetail level={level} onClose={() => setSelected(null)} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.2)',
        borderRadius: 10, padding: '20px 22px',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>About the Model</div>
        <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
          David R. Hawkins (1927–2012) was a psychiatrist, physician, and spiritual teacher. In{' '}
          <em>Power vs. Force</em> (1995) he introduced a logarithmic scale of human consciousness
          ranging from 20 (Shame) to 1000 (Enlightenment), calibrated through decades of clinical work and
          applied kinesiology research. Hawkins proposed that each level represents a distinct attractor
          field — a coherent pattern of perception, emotion, and behavior that shapes how reality is experienced.
        </p>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10, padding: '20px 22px',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', marginBottom: 10 }}>Key Principles</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['The 200 threshold', 'Levels below 200 are net energy-draining; above 200 they become life-enhancing. Crossing this line — the Courage threshold — is the most significant shift available to a human being.'],
            ['Logarithmic, not linear', 'The scale is logarithmic: a small numerical increase at the higher levels represents an enormous expansion of influence and inner power.'],
            ['Most of humanity', 'Hawkins estimated that roughly 85% of the world\'s population calibrates below 200, dragged upward by the small number at the higher levels.'],
            ['You cannot skip levels', 'Growth is generally sequential — it is not possible to jump from Anger to Love without passing through Pride, Courage, and Willingness. Each level must be genuinely inhabited and released.'],
            ['Multiple levels at once', 'A person is not a single number. Different areas of life (work, love, parenting, health) may calibrate at very different levels simultaneously.'],
          ].map(([title, body]) => (
            <li key={title} style={{ paddingLeft: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: '#6d28d9', fontWeight: 700 }}>›</span>
              <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 13 }}>{title}: </span>
              <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{body}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10, padding: '20px 22px',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', marginBottom: 10 }}>Using This Map</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Use the levels as a mirror, not a verdict. The goal is honest self-recognition, not self-judgment.',
            'Notice which level describes your current experience — not your aspirations or your worst moments.',
            'You don\'t need to "leap" to Love. The immediate next level is always the most reachable.',
            'What activities, relationships, and environments raise your level? Protect those.',
            'The practices under each level are starting points. Consistent small actions compound over time.',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 13, color: '#94a3b8', paddingLeft: 16, position: 'relative', lineHeight: 1.6 }}>
              <span style={{ position: 'absolute', left: 0, color: '#6d28d9' }}>›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ConsciousnessMap({ onBack, onSelectSection, initialSection }) {
  // Deep-link: a "Reading for Today" card can target a specific level by section
  // id (e.g. 'love' → Unconditional Love). Land on the Explore tab with it open.
  const initialIdx = initialSection != null
    ? (SECTION_TO_INDEX[String(initialSection).toLowerCase()] ?? null)
    : null;
  const [selected, setSelected] = useState(initialIdx);
  const [tab, setTab] = useState(initialIdx != null ? 'explore' : 'map');
  const didScroll = useRef(false);

  // Scroll the deep-linked level into view once after the Explore tab renders.
  useEffect(() => {
    if (initialIdx == null || didScroll.current) return;
    didScroll.current = true;
    const el = document.getElementById(`moc-level-${initialIdx}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [initialIdx]);

  const tabs = [
    ['map', 'Visual Map'],
    ['explore', 'Explore Levels'],
    ['about', 'About'],
  ];

  return (
    <InnerAtlasShell
      activeId="consciousness-map"
      onBack={onBack}
      onSelectSection={onSelectSection}
      title="Map of Consciousness"
      container={false}
    >
      <div style={{ color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 20px',
      }}>
        <div style={{ maxWidth: 'var(--ia-max, 1280px)', margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: '#6d28d9', textTransform: 'uppercase', fontWeight: 700 }}>
            Consciousness Studies
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2 }}>
            Map of Consciousness
          </div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
            David R. Hawkins · <em>Power vs. Force</em>
          </div>
        </div>
      </div>

      {/* Tabs — full-bleed rule, capped row, so it lines up with the nav above. */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflowX: 'auto',
      }}>
      <div style={{
        display: 'flex', gap: 0,
        padding: '0 20px',
        maxWidth: 'var(--ia-max, 1280px)', margin: '0 auto',
      }}>
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); setSelected(null); }} style={{
            background: 'none', border: 'none',
            color: tab === id ? '#a78bfa' : '#475569',
            borderBottom: tab === id ? '2px solid #6d28d9' : '2px solid transparent',
            padding: '12px 18px', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, letterSpacing: 0.3,
            whiteSpace: 'nowrap',
          }}>{label}</button>
        ))}
      </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 16px 48px' }}>
        {tab === 'map' && (
          <MapView levels={LEVELS} selected={selected} setSelected={setSelected} />
        )}
        {tab === 'explore' && (
          <ExploreView levels={LEVELS} selected={selected} setSelected={setSelected} />
        )}
        {tab === 'about' && <AboutView />}
      </div>
      </div>
    </InnerAtlasShell>
  );
}
