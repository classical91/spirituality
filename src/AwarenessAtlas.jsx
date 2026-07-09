import { useMemo, useState } from 'react';
import MindFrequencies from './MindFrequencies';
import './AwarenessAtlas.css';

// Content tree (Spirituality Hub → Awareness):
//   Awareness & Consciousness · Meditation & Brain States · Inner Practice
const concepts = [
  // ─── Awareness & Consciousness ─────────────────────────────────────────
  {
    id: 'what-is-awareness',
    title: 'What Is Awareness?',
    icon: '👁️',
    category: 'Awareness & Consciousness',
    color: 'rgba(126,231,212,.22)',
    summary: 'Awareness is the simple capacity to know what is happening — the open space in which every thought, feeling, and sensation appears.',
    overview: 'Awareness is not a thought about your experience; it is the knowing that experience is happening at all. Thoughts come and go, moods rise and fade, sounds appear and dissolve — and something quietly registers all of it. That registering is awareness. It is always already present, which is why it is easy to overlook. You do not have to create awareness or earn it; you only have to notice that you are aware.',
    keyIdeas: [
      'Awareness is the knowing background, not the changing content it knows.',
      'It is effortless and always present — you are aware right now, before any technique.',
      'Thoughts, emotions, and sensations are objects appearing in awareness, not awareness itself.',
      'You can be aware of awareness — noticing that you are noticing.',
    ],
    practice: [
      'Pause and ask: "Am I aware right now?" Notice that the answer is obviously yes.',
      'Without changing anything, simply rest as the one who is noticing.',
      'Let a sound, a sensation, and a thought each appear and pass.',
      'Notice that the noticing itself stayed steady the whole time.',
    ],
    cautions: 'Awareness practice is for clarity and calm, not for bypassing real problems. If difficult material surfaces, it is fine to stop and seek support from a trusted person or professional.',
  },
  {
    id: 'placing-awareness',
    title: 'Placing Awareness',
    icon: '🎯',
    category: 'Awareness & Consciousness',
    color: 'rgba(255,212,121,.22)',
    summary: 'Attention is the movable spotlight of awareness — you can place it deliberately on the breath, the body, a sound, or a task.',
    overview: 'If awareness is the open field, attention is the part you can aim. Most of the day, attention is pulled around automatically by whatever is loudest — a notification, a worry, a craving. Learning to place attention on purpose is the central skill of inner practice. Where attention goes, energy and experience follow, so choosing where to place it is a quiet form of self-direction.',
    keyIdeas: [
      'Attention is selective awareness — a spotlight you can aim.',
      'Untrained, it is captured by whatever is most stimulating or threatening.',
      'Placing attention is a choosable act, not a fixed reaction.',
      'A clear "anchor" (breath, feet, sound) gives attention a home to return to.',
    ],
    practice: [
      'Choose one anchor: the breath at the nostrils, the soles of the feet, or ambient sound.',
      'Rest attention there gently, as if setting a hand on something warm.',
      'When it drifts, note where it went, then place it back without judgment.',
      'Do this for two minutes and notice how placing attention feels different from being grabbed by it.',
    ],
    cautions: 'Placing attention is meant to be gentle. Straining to "hold" focus creates tension; the skill is in the calm returning, not in a rigid grip.',
  },
  {
    id: 'inner-vs-outer-awareness',
    title: 'Inner Awareness vs Outer Awareness',
    icon: '🪞',
    category: 'Awareness & Consciousness',
    color: 'rgba(183,140,255,.24)',
    summary: 'Awareness can turn outward to the senses and the world, or inward to thoughts, emotions, and body sensations — both directions matter.',
    overview: 'Outer awareness takes in sights, sounds, textures, and the people and spaces around you. Inner awareness turns toward the felt landscape: the tightness in the chest, the tone of self-talk, the mood beneath the day. Many people live almost entirely in one mode — lost in the outer world, or trapped in inner commentary. Balance comes from being able to move fluidly between them and, at times, to hold both at once.',
    keyIdeas: [
      'Outer awareness: the five senses and the environment around you.',
      'Inner awareness: thoughts, emotions, body sensations, and inner speech.',
      'Over-focus on the outer can numb feeling; over-focus on the inner can fuel rumination.',
      'A whole, grounded state can include both inner and outer at the same time.',
    ],
    practice: [
      'Spend one minute fully outward: name three things you see, hear, and feel by touch.',
      'Spend one minute fully inward: notice your breath, a body sensation, and your mood.',
      'Now soften and let both be present together — inner and outer in one field.',
      'Notice which direction you default to, with curiosity rather than judgment.',
    ],
    cautions: 'If turning inward feels overwhelming, deliberately widen to outer awareness — naming what you see and hear is a reliable way to steady yourself.',
  },
  {
    id: 'awareness-vs-rumination',
    title: 'Awareness vs Rumination',
    icon: '🌀',
    category: 'Awareness & Consciousness',
    color: 'rgba(255,143,199,.22)',
    summary: 'Awareness observes a thought and lets it pass; rumination grips the thought and circles it. Knowing the difference protects your peace.',
    overview: 'Rumination feels like thinking productively, but it is usually the same worry or regret looping without resolution. Awareness relates to a thought differently: it sees the thought arise, names it, and lets it move on. The shift is not in the content of the thought but in your relationship to it — from being inside the loop to watching the loop. That small step out of the current is often the beginning of relief.',
    keyIdeas: [
      'Rumination repeats and grips; awareness observes and releases.',
      'A ruminating mind feels stuck in a story; an aware mind sees the story as a story.',
      'Naming a thought ("planning", "worrying", "rehearsing") loosens its hold.',
      'You cannot stop thoughts from arising, but you can stop feeding the loop.',
    ],
    practice: [
      'When you catch a repeating thought, silently label it: "worrying" or "replaying".',
      'Picture the thought as a leaf on a stream — let it float past instead of grabbing it.',
      'Return attention to the breath or the body, the part of you that is here now.',
      'If the loop returns, repeat the labeling calmly; each return is a chance to practice.',
    ],
    cautions: 'Persistent rumination, intrusive thoughts, or hopelessness deserve real support. Awareness practice complements but does not replace therapy or medical care.',
  },
  {
    id: 'presence',
    title: 'Presence',
    icon: '🕯️',
    category: 'Awareness & Consciousness',
    color: 'rgba(157,255,181,.20)',
    summary: 'Presence is awareness fully arrived in the present moment — not rehearsing the future or replaying the past, but here, now.',
    overview: 'Presence is what awareness feels like when it is not scattered across time. In a present moment there is no problem to solve about yesterday and no fear to manage about tomorrow — there is only what is actually happening. Presence is not a trance or a special state; it is the ordinary, vivid reality of being here. It tends to bring calm, clarity, and a quiet sense of being enough, because it drops the weight of mental time travel.',
    keyIdeas: [
      'Presence is awareness anchored in now, not lost in past or future.',
      'The present moment is the only place real life is actually lived.',
      'Presence is felt in the body and senses more than thought about.',
      'It is available instantly — one conscious breath can return you to it.',
    ],
    practice: [
      'Take one slow breath and feel it as a physical event, not an idea.',
      'Notice three things that are true right now: a sound, a sensation, a sight.',
      'Drop the question "what next?" for ten seconds and just be where you are.',
      'Let "this moment is enough" be the only thought you need.',
    ],
    cautions: 'Presence is a support for living, not a way to avoid planning or responsibility. Use it to act more clearly, not to disengage from your life.',
  },

  // ─── Meditation & Brain States ─────────────────────────────────────────
  {
    id: 'relaxation-vs-meditation',
    title: 'Relaxation vs Meditation',
    icon: '🛋️',
    category: 'Meditation & Brain States',
    color: 'rgba(126,231,212,.20)',
    summary: 'Relaxation lets the body unwind; meditation trains awareness. They overlap and support each other, but they are not the same thing.',
    overview: 'Relaxation is about reducing tension — a warm bath, a deep sigh, the body softening. Meditation is about training the mind\'s relationship to experience: noticing, returning, and staying aware. You can be relaxed and unconscious (dozing on the couch) and you can meditate while alert and even uncomfortable. The clearest meditation includes a relaxed body, but its real work is the steady, awake quality of attention.',
    keyIdeas: [
      'Relaxation lowers physical and nervous-system tension.',
      'Meditation cultivates clear, stable, returning awareness.',
      'You can be relaxed without being aware, and aware without being fully relaxed.',
      'A calm body supports meditation, but alertness is what makes it meditation.',
    ],
    practice: [
      'Begin with relaxation: three slow exhales, letting the shoulders drop.',
      'Then shift to meditation: keep the body soft but the mind alert and watching.',
      'Notice the difference between "switching off" and "tuning in".',
      'End by carrying a little of that alert calm into your next activity.',
    ],
    cautions: 'Neither relaxation nor meditation is a treatment for medical or psychiatric conditions. Use them as supportive practices alongside appropriate care.',
  },
  {
    id: 'meditation-and-brain-waves',
    title: 'Meditation and Brain Waves',
    icon: '📡',
    category: 'Meditation & Brain States',
    color: 'rgba(255,212,121,.20)',
    illustration: 'mindFrequencies',
    summary: 'The brain produces rhythmic electrical activity measured as waves; meditation is associated with shifts in these patterns toward calmer, more coherent states.',
    overview: 'Brain waves are oscillations of electrical activity, measured with EEG and described by frequency. Faster waves tend to accompany active, alert, or anxious states; slower waves accompany calm, drowsy, or deep states. Research suggests meditation can shift the balance of these rhythms — often increasing slower, more restful patterns and, in experienced meditators, distinctive fast "gamma" activity. The science is still developing, so it is best held as a helpful map rather than a precise mechanism.',
    keyIdeas: [
      'Brain waves are categorized by frequency: beta, alpha, theta, delta, and gamma.',
      'Beta dominates ordinary alert thinking and, when excessive, anxiety.',
      'Meditation is associated with more alpha and theta — calm, inward states.',
      'Findings are real but still evolving; treat brain-wave talk as a model, not a guarantee.',
    ],
    practice: [
      'Before practice, notice a "busy beta" mind: fast, jumpy, planning.',
      'Slow the breath and soften the gaze to invite a calmer, more alpha-like state.',
      'Let attention sink inward toward the drowsy, dreamy edge (theta territory).',
      'Afterward, notice any shift in mental pace without needing to measure it.',
    ],
    cautions: 'Consumer claims about "hacking your brain waves" are often overstated. Be skeptical of devices or programs promising guaranteed states or cures.',
  },
  {
    id: 'alpha-theta-gamma',
    title: 'Alpha, Theta, and Gamma Waves',
    icon: '🌊',
    category: 'Meditation & Brain States',
    color: 'rgba(183,140,255,.22)',
    illustration: 'mindFrequencies',
    summary: 'Alpha is calm and relaxed, theta is the dreamy threshold of deep meditation and creativity, and gamma is linked with heightened, integrated awareness.',
    overview: 'These three bands are the ones most often discussed in meditation. Alpha (roughly 8–12 Hz) appears when you are relaxed but awake — eyes closed, calm, at ease. Theta (roughly 4–8 Hz) shows up in deep meditation, drowsiness, and the hypnagogic edge of sleep, where imagery and insight often arise. Gamma (above ~30 Hz) has been recorded at high levels in very experienced meditators and is associated with moments of vivid, unified awareness. Each is a flavor of consciousness, not a goal to force.',
    keyIdeas: [
      'Alpha (~8–12 Hz): relaxed wakefulness, calm, light meditation.',
      'Theta (~4–8 Hz): deep meditation, reverie, creativity, the edge of sleep.',
      'Gamma (~30 Hz+): heightened, integrated awareness seen in seasoned meditators.',
      'These states arise naturally with practice; chasing them tends to block them.',
    ],
    practice: [
      'Settle into alpha: relax the body, close the eyes, slow the breath.',
      'Allow theta: let attention drift inward toward the soft, dreamy border of sleep while staying just awake.',
      'Notice any spontaneous imagery or insight without grabbing at it.',
      'Trust that depth comes from letting go, not from striving for a particular band.',
    ],
    cautions: 'You do not need an EEG to meditate well. Inner stillness, not a frequency reading, is the real measure of practice.',
  },
  {
    id: 'meditation-and-awareness-studies',
    title: 'Meditation and Awareness Studies',
    icon: '🔬',
    category: 'Meditation & Brain States',
    color: 'rgba(255,143,199,.20)',
    summary: 'A growing body of research studies how meditation affects attention, emotion regulation, stress, and the brain — with promising but nuanced findings.',
    overview: 'Over recent decades, scientists have studied meditation using EEG, fMRI, and behavioral tests. Reviews suggest regular practice can support attention, emotional regulation, and stress reduction, and may be associated with changes in brain regions tied to attention and self-awareness. The findings are genuinely encouraging, but effects vary by person, practice, and study quality, and some early claims were overstated. A grounded view holds the evidence as supportive rather than miraculous.',
    keyIdeas: [
      'Studies link meditation with improved attention and emotion regulation.',
      'Mindfulness-based programs are used clinically for stress, anxiety, and relapse prevention.',
      'Neuroimaging suggests practice can influence attention- and self-related brain networks.',
      'Evidence is promising but mixed; effect sizes and study quality vary.',
    ],
    practice: [
      'Treat your own practice as a small experiment: notice what changes for you.',
      'Track one simple marker over a few weeks — sleep, mood, or reactivity.',
      'Favor consistency over intensity; research links benefits to regular practice.',
      'Read claims critically and prefer reputable, peer-reviewed sources.',
    ],
    cautions: 'Meditation is not a cure-all and can occasionally surface difficult emotions. For trauma or serious mental-health concerns, work with a qualified professional.',
  },

  // ─── Inner Practice ────────────────────────────────────────────────────
  {
    id: 'breath-awareness',
    title: 'Breath Awareness',
    icon: '🌬️',
    category: 'Inner Practice',
    color: 'rgba(126,231,212,.22)',
    summary: 'The breath is a living anchor — always present, always now. Resting attention on it is the most universal doorway into awareness.',
    overview: 'Breath awareness is simply noticing the breath as it is, without forcing or changing it. The breath is uniquely useful because it is always happening, it is in the present moment, and it gently links mind and body. When attention rests on the breath, the nervous system tends to settle, and the busy mind has a place to land. It is the foundation of countless traditions precisely because it is so simple and so available.',
    keyIdeas: [
      'The breath is a built-in anchor: always present and always in the now.',
      'You watch the breath rather than control it — natural, not forced.',
      'Slow nasal breathing tends to calm the nervous system.',
      'Each return to the breath is the actual practice, not a failure of it.',
    ],
    practice: [
      'Sit comfortably and find where you feel the breath most clearly — nose, chest, or belly.',
      'Watch one full in-breath and out-breath without changing them.',
      'When the mind wanders, gently bring attention back to the next breath.',
      'Continue for three to five minutes, valuing the returning over any perfect focus.',
    ],
    cautions: 'If focusing on the breath causes anxiety or dizziness, switch to the feet or hands as your anchor. Avoid forceful breath-holding without trained guidance.',
  },
  {
    id: 'body-awareness',
    title: 'Body Awareness',
    icon: '🧍',
    category: 'Inner Practice',
    color: 'rgba(255,212,121,.22)',
    summary: 'The body lives only in the present. Sensing it directly — weight, warmth, tension, ease — is a fast, reliable route into grounded presence.',
    overview: 'Body awareness, sometimes called interoception, is the felt sense of your physical self from the inside. Unlike thoughts, the body is always in the present moment, so turning toward it pulls awareness out of mental time travel. A body scan moves attention slowly through the body, noticing sensation without needing to fix it. Over time this builds a quieter, more grounded baseline and a clearer early-warning system for stress and emotion held in the body.',
    keyIdeas: [
      'The body is always in the present — sensing it anchors you here.',
      'Interoception is the inner sense of sensations like warmth, weight, and tension.',
      'A body scan is awareness moving slowly through the body, part by part.',
      'You notice sensation as it is, without rushing to change or fix it.',
    ],
    practice: [
      'Sit or lie down and feel the points where your body contacts the surface beneath you.',
      'Slowly move attention from the feet upward, pausing at each area.',
      'Notice sensations — tingling, warmth, tightness — without judging them.',
      'End by feeling the body as a single whole, breathing and present.',
    ],
    cautions: 'For some, body scanning can stir up stored tension or trauma. Go slowly, keep your eyes open if needed, and seek trauma-informed guidance if strong reactions arise.',
  },
  {
    id: 'emotional-awareness',
    title: 'Emotional Awareness',
    icon: '💗',
    category: 'Inner Practice',
    color: 'rgba(183,140,255,.24)',
    summary: 'Emotions are felt energies that pass through awareness. Naming and allowing them — rather than suppressing or becoming them — is the heart of inner balance.',
    overview: 'Emotional awareness is the capacity to feel what you feel without being swept away or shutting it down. Every emotion has a felt signature in the body and a natural arc — it rises, peaks, and passes when it is allowed to move. Trouble comes from the two extremes: suppressing emotion (which stores it) or fusing with it (which lets it run the show). Awareness offers a middle way: feel it, name it, give it room, and let it move through.',
    keyIdeas: [
      'Emotions are temporary energies in motion, not permanent facts about you.',
      'Naming a feeling ("this is anxiety", "this is grief") reduces its grip.',
      'Suppressing emotion stores it; fusing with it amplifies it — allowing lets it move.',
      'You are the awareness that feels the emotion, not the emotion itself.',
    ],
    practice: [
      'When a feeling arises, pause and locate it in the body — chest, throat, gut.',
      'Name it simply and kindly: "this is anger", "this is sadness".',
      'Breathe with the sensation and let it be there without acting on it.',
      'Watch it shift; notice that you remained, steady, while the feeling moved.',
    ],
    cautions: 'Allowing emotion is not the same as enduring abuse or crisis alone. If feelings are overwhelming or persistent, reach out to a trusted person or a mental-health professional.',
  },
  {
    id: 'returning-attention',
    title: 'Returning Attention',
    icon: '↩️',
    category: 'Inner Practice',
    color: 'rgba(157,255,181,.20)',
    summary: 'The mind wanders — that is what minds do. The whole practice is the gentle, patient act of noticing and bringing attention back, again and again.',
    overview: 'Many people quit meditation believing they "can\'t stop thinking". But a wandering mind is not failure; it is the very thing that makes practice possible. Each time you notice attention has drifted and bring it back, you strengthen the muscle of awareness — exactly like a single repetition in training. The returning is not the interruption of the practice; the returning IS the practice. Done with kindness instead of frustration, it slowly reshapes how attention behaves all day.',
    keyIdeas: [
      'A wandering mind is normal and expected, not a sign of failure.',
      'Noticing the wander is itself a moment of awakened awareness.',
      'Each gentle return strengthens attention like a rep in training.',
      'Kindness in the return matters more than how long you stayed focused.',
    ],
    practice: [
      'Rest attention on an anchor — the breath, a sound, or the body.',
      'When you notice the mind has wandered, silently say "back" or "returning".',
      'Bring attention to the anchor gently, without scolding yourself.',
      'Repeat for the whole session, treating every return as a small success.',
    ],
    cautions: 'If self-criticism dominates your practice, make kindness the priority. Practice is meant to soften the inner critic, not feed it.',
  },
  {
    id: 'stillness-spaciousness-silence',
    title: 'Stillness, Spaciousness & Silence',
    icon: '🕊️',
    category: 'Inner Practice',
    color: 'rgba(120,180,255,.20)',
    summary: 'A simple three-part sitting practice — settle into stillness, open into spaciousness, and rest in silence — that returns the mind to the present and quiets worry about past and future.',
    overview: 'This is a contemplative practice built on three gentle movements. Stillness settles the body: a quiet place, an upright but easy posture, and slow, full breathing through the nose. Spaciousness is what the mind feels as it unclenches — a sense of openness, with a quiet sharpness and clarity. Silence is resting in the present and meeting thoughts, emotions, and sensations as they actually are, rather than arguing with them. From that settled place you naturally dwell less on past regrets and worry less about the future, responding to what is real instead of to preconceived notions. A few everyday habits support the same calm: breathing deeply and slowly (which helps the body ease off stress hormones like cortisol), getting out into nature, naming one thing you are grateful for, and tending to good sleep.',
    keyIdeas: [
      'Stillness: a quiet place, a tall and settled posture, and slow nasal breathing calm the body.',
      'Spaciousness: a felt sense of openness, sharpness, and clarity as the mind lets go.',
      'Silence: rest in the present and accept thoughts and feelings for what they really are.',
      'Dwelling less on the past and worrying less about the future lets you respond to reality, not to preconceived notions.',
    ],
    practice: [
      'Stillness: find a quiet place and take a comfortable seat. Sit up tall, close your eyes, and breathe patiently and fully — yet gently and quietly — in and out through the nose.',
      'Spaciousness: let a sense of openness arise, with a quiet sharpness and clarity, as if the space behind your eyes has widened.',
      'Silence: focus on the present and accept each thought, emotion, and sensation for what it really is, without arguing with it.',
      'Reduce regret by dwelling less on the past and worry less about the future; let your response come from what is real, not from preconceived notions.',
    ],
    cautions: 'This is a reflective wellness practice, not medical or psychiatric treatment. If sitting in silence stirs difficult emotion, open your eyes and widen to the sounds of the room, and reach out to a trusted person or professional for ongoing support.',
  },
];

const KEYWORDS = {
  'Awareness & Consciousness': ['attention', 'presence', 'noticing', 'the witness', 'consciousness', 'clarity'],
  'Meditation & Brain States': ['meditation', 'brain waves', 'alpha', 'theta', 'gamma', 'relaxation'],
  'Inner Practice': ['breath', 'body scan', 'emotion', 'grounding', 'returning', 'anchor'],
};

function getKeywords(concept) {
  return KEYWORDS[concept.category] || ['awareness', 'presence', 'practice'];
}

function groupConcepts(menuConcepts) {
  const groups = [];
  const byCategory = new Map();
  for (const concept of menuConcepts) {
    if (!byCategory.has(concept.category)) {
      const group = { key: concept.category, label: concept.category, concepts: [] };
      byCategory.set(concept.category, group);
      groups.push(group);
    }
    byCategory.get(concept.category).concepts.push(concept);
  }
  return groups;
}

export default function AwarenessAtlas({ onBack, initialSection }) {
  const [activeSearch, setActiveSearch] = useState('');
  const [activeConceptId, setActiveConceptId] = useState(
    () => (initialSection && concepts.some((c) => c.id === initialSection) ? initialSection : concepts[0].id)
  );
  const [openGroups, setOpenGroups] = useState(() => {
    const initialConcept = concepts.find((c) => c.id === initialSection) || concepts[0];
    return new Set([initialConcept.category]);
  });

  const visible = useMemo(() => {
    const q = activeSearch.trim().toLowerCase();
    return concepts.filter((c) => {
      const haystack = [c.title, c.category, c.summary, c.overview, ...c.keyIdeas].join(' ').toLowerCase();
      return !q || haystack.includes(q);
    });
  }, [activeSearch]);
  const groupedVisible = useMemo(() => groupConcepts(visible), [visible]);

  const activeConcept = concepts.find((c) => c.id === activeConceptId) || concepts[0];
  const hasSearch = activeSearch.trim().length > 0;

  const selectConcept = (id) => {
    setActiveConceptId(id);
    const concept = concepts.find((c) => c.id === id);
    if (concept) {
      setOpenGroups((current) => {
        const next = new Set(current);
        next.add(concept.category);
        return next;
      });
    }
    document.getElementById('aw-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleGroup = (key) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSearch = (query) => {
    setActiveSearch(query);
    const q = query.trim().toLowerCase();
    const vis = concepts.filter((c) => {
      const haystack = [c.title, c.category, c.summary, c.overview, ...c.keyIdeas].join(' ').toLowerCase();
      return !q || haystack.includes(q);
    });
    if (vis.length && !vis.some((c) => c.id === activeConceptId)) {
      setActiveConceptId(vis[0].id);
    }
  };

  return (
    <div className="aw-root">
      <div className="aw-grid-overlay" aria-hidden="true" />

      <div className="aw-app">
        <button onClick={onBack} className="aw-back">← Back</button>

        {/* Hero */}
        <header className="aw-hero">
          <div>
            <div className="aw-eyebrow">✦ Awareness & Presence</div>
            <h1>Awareness, Meditation & Inner Practice</h1>
            <p>
              A calm learning hub for the art of paying attention — what awareness is, how
              meditation shifts the mind and brain, and the inner practices of breath, body,
              and emotion. Each topic has its own explanation, key ideas, a simple practice,
              and a grounding note.
            </p>
            <div className="aw-notice">
              This hub treats awareness and meditation as reflective wellness practices — not as
              medical or psychiatric treatment. Use it as an educational map, and seek
              professional support for serious concerns.
            </div>
          </div>
          <div className="aw-orb-card" aria-hidden="true">
            <div className="aw-rings" />
            <div className="aw-orb" />
          </div>
        </header>

        {/* Layout */}
        <main className="aw-layout" style={{ marginTop: '24px' }}>
          {/* Sidebar */}
          <aside className="aw-sidebar">
            <div className="aw-sidebar-header">
              <h2>Topic Pages</h2>
              <p>Every topic in the hub is listed here. Click one to open its full explanation.</p>
              <input
                className="aw-search aw-sidebar-search"
                type="search"
                value={activeSearch}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search topics..."
              />
            </div>
            <div className="aw-concept-list">
              {visible.length === 0 ? (
                <div className="aw-sidebar-empty">No topics found.</div>
              ) : (
                groupedVisible.map((group) => {
                  const isOpen = hasSearch || openGroups.has(group.key) || group.key === activeConcept.category;
                  return (
                    <div key={group.key} className="aw-menu-group">
                      <button
                        type="button"
                        className={`aw-menu-group-toggle${isOpen ? ' open' : ''}`}
                        onClick={() => toggleGroup(group.key)}
                        aria-expanded={isOpen}
                      >
                        <span>
                          <strong>{group.label}</strong>
                          <em>{group.concepts.length} topics</em>
                        </span>
                        <b>{group.concepts.length}</b>
                      </button>
                      {isOpen && (
                        <div className="aw-menu-group-items">
                          {group.concepts.map((c) => (
                            <button
                              key={c.id}
                              className={`aw-concept-link${activeConceptId === c.id ? ' active' : ''}`}
                              onClick={() => selectConcept(c.id)}
                            >
                              <div className="aw-mini-icon">{c.icon}</div>
                              <div>
                                <strong>{c.title}</strong>
                                <span>{c.category}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* Main */}
          <section className="aw-main">
            {/* Detail */}
            <article
              id="aw-detail"
              className="aw-detail"
              style={{ '--detailGlow': activeConcept.color }}
            >
              <div className="aw-detail-hero">
                <div className="aw-detail-kicker">{activeConcept.category}</div>
                <h2>{activeConcept.icon} {activeConcept.title}</h2>
                <p className="aw-detail-summary">{activeConcept.summary}</p>
              </div>

              <div className="aw-detail-body">
                <section className="aw-section aw-full">
                  <h3>Expanded Explanation</h3>
                  <p>{activeConcept.overview}</p>
                </section>

                {activeConcept.illustration === 'mindFrequencies' && <MindFrequencies />}

                <section className="aw-section">
                  <h3>Core Ideas</h3>
                  <ul>
                    {activeConcept.keyIdeas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="aw-section">
                  <h3>Related Keywords</h3>
                  <div className="aw-pill-row">
                    {getKeywords(activeConcept).map((kw) => (
                      <span key={kw} className="aw-pill">{kw}</span>
                    ))}
                  </div>
                </section>

                <section className="aw-section aw-full">
                  <h3>Simple Practice</h3>
                  <div className="aw-practice">
                    {activeConcept.practice.map((step) => (
                      <div key={step} className="aw-step">
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="aw-section aw-full">
                  <h3>Grounding Note</h3>
                  <p>{activeConcept.cautions}</p>
                </section>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
