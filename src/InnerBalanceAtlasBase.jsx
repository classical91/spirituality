import { useState } from 'react';
import './InnerBalanceAtlas.css';
import InnerAtlasNav from './components/InnerAtlasNav';

const tabGroups = [
  { group: 'Overview', items: [
    { id: 'dashboard',        icon: '⌂', label: 'Dashboard' },
  ] },
  { group: 'Systems', items: [
    { id: 'psychophysiology', icon: '◍', label: 'Psychophysiology Map' },
    { id: 'neurotransmitters',icon: '⌁', label: 'Neurotransmitters' },
  ] },
  { group: 'Body', items: [
    { id: 'physicalactivity', icon: '◈', label: 'Physical Activity' },
    { id: 'sleep',            icon: '🌙', label: 'Sleep' },
    { id: 'nutrition',        icon: '🥗', label: 'Nutrition' },
    { id: 'hair',             icon: '◎', label: 'Hair & Scalp Health' },
    { id: 'herbs',            icon: '🌿', label: 'Herbs & Adaptogens' },
  ] },
  { group: 'Mind & Mood', items: [
    { id: 'mooduplift',       icon: '◑', label: 'Mood Uplift' },
    { id: 'stress',           icon: '⟳', label: 'Stress & Recovery' },
    { id: 'gratitude',        icon: '✦', label: 'Gratitude Practice' },
  ] },
  { group: 'Practice', items: [
    { id: 'dailyrituals',     icon: '☀', label: 'Daily Rituals' },
  ] },
];

const tabs = tabGroups.flatMap(g => g.items);

/* ─────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────── */
function Dashboard() {
  const systemNodes = [
    {
      title: 'Nervous System', color: 'var(--sage)',
      items: ['Stress response', 'Vagal tone', 'Sleep'],
    },
    {
      title: 'Emotions', color: 'var(--lavender)',
      items: ['Anxiety', 'Calm', 'Motivation'],
    },
  ];
  const systemNodesRight = [
    {
      title: 'Neurotransmitters', color: 'var(--blue)',
      items: ['Dopamine', 'Serotonin', 'GABA'],
    },
    {
      title: 'Lifestyle', color: 'var(--gold)',
      items: ['Nutrition', 'Movement', 'Sunlight'],
    },
  ];
  const systemFocus = [
    { label: 'Nervous System',    cue: 'Regulate', color: 'var(--sage)' },
    { label: 'Neurotransmitters', cue: 'Support', color: 'var(--blue)' },
    { label: 'Emotions',          cue: 'Name', color: 'var(--lavender)' },
    { label: 'Lifestyle',         cue: 'Steady', color: 'var(--gold)' },
    { label: 'Spiritual Align.',  cue: 'Reflect', color: '#5bbfb5' },
  ];
  const tools = [
    { icon: '〜', name: 'Breathing', sub: '4-7-8 · 4 min' },
    { icon: '◎', name: 'Hydration', sub: 'Check in with thirst and energy' },
    { icon: '✎', name: 'Journaling', sub: '5 min reflection' },
    { icon: '⟳', name: 'Stretching', sub: '5 min flow' },
  ];
  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div className="iba-hero">
        <div>
          <h2>Understand Your Mind, Body &amp; Spirit</h2>
          <p>Explore how your nervous system, hormones, neurotransmitters, habits, and spiritual practices work together to shape your well-being.</p>
        </div>
        <div className="iba-hero-art" />
      </div>

      {/* Whole-System Map + System Focus */}
      <div className="iba-grid-2" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="iba-card">
          <h3>Whole-System Map <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <p className="iba-sub">Five systems working together to shape how you feel and function.</p>
          <div className="iba-system-map">
            <div className="iba-map-col">
              {systemNodes.map(n => (
                <div className="iba-map-node" key={n.title} style={{ borderColor: n.color + '44' }}>
                  <h4 style={{ color: n.color }}>{n.title}</h4>
                  <ul>{n.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="iba-map-center">
              <div className="iba-map-center-content">
                <strong>Self</strong>
                <span>Where all systems meet and interact</span>
              </div>
            </div>
            <div className="iba-map-col">
              {systemNodesRight.map(n => (
                <div className="iba-map-node" key={n.title} style={{ borderColor: n.color + '44' }}>
                  <h4 style={{ color: n.color }}>{n.title}</h4>
                  <ul>{n.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          {/* Spiritual Alignment node below */}
          <div className="iba-map-node" style={{ marginTop: 14, borderColor: '#5bbfb544' }}>
            <h4 style={{ color: '#5bbfb5' }}>Spiritual Alignment</h4>
            <ul style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '4px 16px' }}>
              {['Gratitude', 'Meditation', 'Meaning'].map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div className="iba-card">
            <h3>System Focus <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
            <div className="iba-balance-ring">
              <div className="iba-balance-ring-inner">
                <div>
                  <div className="iba-balance-score">5</div>
                  <div className="iba-balance-label">Connected Areas</div>
                </div>
              </div>
            </div>
            <div className="iba-balance-legend">
              {systemFocus.map(r => (
                <div className="iba-balance-row" key={r.label}>
                  <div className="iba-balance-dot" style={{ background: r.color }} />
                  <span className="iba-balance-name">{r.label}</span>
                  <span className="iba-balance-val">{r.cue}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="iba-card" style={{ background: 'linear-gradient(135deg, rgba(122,171,121,0.12), rgba(216,169,72,0.08))', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            <span style={{ fontSize: 16 }}>🌿</span>
            <p style={{ margin: '6px 0 0' }}><em>Small daily choices can support steadier attention, recovery, and reflection.</em></p>
          </div>
        </div>
      </div>

      {/* Daily Regulation Tools + Mind-Body-Spirit triangle */}
      <div className="iba-grid-2">
        <div className="iba-card">
          <h3>Daily Regulation Tools</h3>
          <p className="iba-sub">Small practices. Big impact.</p>
          <div className="iba-tool-list">
            {tools.map(t => (
              <div className="iba-tool-row" key={t.name}>
                <div className="iba-tool-row-left">
                  <strong>{t.icon} {t.name}</strong>
                  <span>{t.sub}</span>
                </div>
                <span className="iba-tool-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="iba-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3>Mind-Body-Spirit</h3>
          <p className="iba-sub">Everything is connected.</p>
          <div style={{
            display: 'grid', placeItems: 'center', flex: 1,
            background: 'radial-gradient(circle at 50% 48%, rgba(216,169,72,0.1), transparent 65%)',
            borderRadius: 16, padding: '16px 8px',
          }}>
            <div style={{ position: 'relative', width: 180, height: 160 }}>
              {/* Triangle SVG */}
              <svg viewBox="0 0 180 160" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <polygon points="90,10 165,148 15,148"
                  fill="none"
                  stroke="url(#tri-grad)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="tri-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a991d9" />
                    <stop offset="50%" stopColor="#7aab79" />
                    <stop offset="100%" stopColor="#d8a948" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Labels */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) translateY(-6px)', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--lavender)' }}>Mind</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Thoughts · Beliefs</div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, textAlign: 'center', transform: 'translateX(-16px)' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--sage)' }}>Body</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Sensation · Biology</div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, textAlign: 'center', transform: 'translateX(16px)' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--gold)' }}>Spirit</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Purpose · Connection</div>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-30%)', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--deep)' }}>You</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="iba-quote">" Awareness is the key. Balance is the practice. Integration is the path. "</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   PSYCHOPHYSIOLOGY MAP (Vitamins & Minerals)
───────────────────────────────────────── */
function PsychophysiologyMap() {
  const mapLeft = [
    { title: 'Vitamins', body: 'B vitamins, vitamin D, vitamin C, and folate support energy metabolism, nerve function, immune tone, and neurotransmitter-related pathways.' },
    { title: 'Minerals', body: 'Magnesium, iron, zinc, iodine, selenium, calcium, sodium, and potassium support nerve firing, oxygen delivery, muscle tension, thyroid function, and stress response.' },
    { title: 'Food + Rhythm', body: 'Nutrients work best with steady meals, hydration, sleep, sunlight, movement, and recovery — not as isolated quick fixes.' },
  ];
  const mapRight = [
    { title: 'Neurochemical Themes', body: 'Dopamine, serotonin, GABA, norepinephrine, acetylcholine, and oxytocin are supported indirectly through sleep, amino acids, micronutrients, stress regulation, and lifestyle.' },
    { title: 'Deficiency-Like Signals', body: 'Low energy, low mood, brain fog, irritability, poor sleep, muscle tension, and anxious activation can overlap with nutrient issues, stress, or medical factors.' },
    { title: 'Action Layer', body: 'Track patterns, improve food quality, avoid megadosing, and use labs or professional guidance when symptoms are persistent or intense.' },
  ];
  const miniNutrients = [
    { name: 'Magnesium', body: 'Supports muscle and nerve function, energy production, and relaxation. Connects to tension, sleep, GABA-like calm, and stress recovery.' },
    { name: 'B6', body: 'Supports neurotransmitter-related metabolism. Bridges food, mood, serotonin, dopamine, GABA, and energy regulation.' },
    { name: 'B12', body: 'Supports nerve health, red blood cell formation, and energy. Connects to fatigue, brain fog, mood stability, and cognitive clarity.' },
    { name: 'Folate', body: 'Works with B12 in methylation and cell function. Belongs near mood steadiness, cognition, and nervous-system support.' },
    { name: 'Vitamin D', body: 'Supports bones, muscles, immune function, and nerve communication. Belongs in sunlight, mood rhythm, and seasonal well-being.' },
    { name: 'Iron', body: 'Supports oxygen transport and energy. Connects to fatigue, focus, exercise capacity, and oxygen delivery to muscles and brain.' },
    { name: 'Zinc', body: 'Supports immune function, repair, and many enzyme systems. Belongs near resilience, recovery, and neurochemical support.' },
    { name: 'Iodine', body: 'Supports thyroid hormone production, which influences energy, temperature regulation, metabolism, and mental pace.' },
    { name: 'Selenium', body: 'Supports thyroid-related and antioxidant systems. Fits the recovery, metabolism, and stress-buffering side of the map.' },
    { name: 'Calcium', body: 'Supports bones, muscle contraction, and nerve signaling. Belongs in the body-signal layer, not just bone health.' },
    { name: 'Sodium + Potassium', body: 'Electrolytes that support fluid balance, nerve impulses, and muscle function. Connect to hydration, energy, headaches, and exercise recovery.' },
    { name: 'Vitamin C', body: 'Supports antioxidant protection, collagen formation, and iron absorption. Belongs near recovery, immune tone, and stress resilience.' },
  ];
  const neuroRows = [
    { chem: 'Dopamine',       support: 'B vitamins, iron, protein-rich meals, magnesium, zinc',                     state: 'Motivation, drive, reward, energy, goal pursuit',          use: 'Goals, movement, productivity rituals' },
    { chem: 'Serotonin',      support: 'Vitamin D, B6, folate, magnesium, sunlight, balanced meals',               state: 'Mood steadiness, emotional resilience, satisfaction',       use: 'Gratitude, sunlight, mood tracking, daily rhythm' },
    { chem: 'GABA',           support: 'Magnesium, B6, steady blood sugar, calming evening routine',               state: 'Calm, relaxation, reducing overactivation',                 use: 'Breathwork, sleep rhythm, down-regulation' },
    { chem: 'Norepinephrine', support: 'Iron, B vitamins, hydration, electrolytes, adequate calories',             state: 'Alertness, attention, readiness, energy',                  use: 'Focus blocks, work sprints, movement activation' },
    { chem: 'Acetylcholine',  support: 'B vitamins, choline-rich foods, magnesium, sleep support',                 state: 'Learning, memory, cognition, mental sharpness',            use: 'Learning, journaling, skill-building' },
    { chem: 'Oxytocin',       support: 'Connection, safety, touch, trust, and stress regulation',                  state: 'Bonding, trust, belonging, emotional warmth',              use: 'Relationships, compassion rituals, community' },
  ];
  const patterns = [
    { title: 'Energy + Motivation', body: 'When energy is low, mindset work feels harder. Links fatigue-like states to sleep, iron, B vitamins, hydration, and movement rather than only "lack of discipline."', pills: ['Iron', 'B12', 'B6', 'Hydration', 'Electrolytes', 'Steps'] },
    { title: 'Calm + Sleep',        body: 'Evening regulation is a body-state issue. Connects calm to magnesium, breathwork, sleep rhythm, light timing, and emotional detachment.',                                pills: ['Magnesium', 'Vitamin D rhythm', 'Long exhale', 'GABA theme', 'Journal release'] },
    { title: 'Focus + Clarity',     body: 'Clarity is a combination of oxygen delivery, blood sugar rhythm, neurotransmitter support, rest, and environment design.',                                             pills: ['B12', 'Folate', 'Iron', 'Acetylcholine', 'Sleep quality'] },
  ];
  const foodPlates = [
    { title: 'Mineral-Focused', items: [{ name: 'Magnesium', note: 'Leafy greens, legumes, nuts, seeds, whole grains.', tag: 'Calm' }, { name: 'Iron', note: 'Meat, seafood, beans, lentils, spinach. Pair plant iron with vitamin C.', tag: 'Energy' }, { name: 'Zinc', note: 'Seafood, meat, beans, nuts, seeds, dairy, whole grains.', tag: 'Repair' }] },
    { title: 'Vitamin-Focused',  items: [{ name: 'B Vitamins', note: 'Eggs, fish, dairy, meat, legumes, leafy greens, fortified foods.', tag: 'Nerves' }, { name: 'Vitamin D', note: 'Sunlight, fatty fish, fortified foods, supplements when appropriate.', tag: 'Rhythm' }, { name: 'Vitamin C', note: 'Citrus, berries, peppers, broccoli, potatoes.', tag: 'Recovery' }] },
  ];
  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div className="iba-hero">
        <div>
          <h2>Psychophysiology of Vitamins &amp; Minerals</h2>
          <p>How nutrients support body systems that influence mood, attention, energy, stress resilience, sleep, and neurochemical balance.</p>
        </div>
        <div className="iba-hero-art" />
      </div>

      <div className="iba-card">
        <h3>Nutrient → Body State → Neurochemistry Map</h3>
        <p className="iba-sub">Vitamins and minerals do not "create a mood" by themselves. They help the body run the systems that mood depends on.</p>
        <div className="iba-nutrient-map">
          <div className="iba-nutrient-col">
            {mapLeft.map(c => (
              <div className="iba-nutrient-card" key={c.title}>
                <h4>{c.title}</h4><p>{c.body}</p>
              </div>
            ))}
          </div>
          <div className="iba-map-center">
            <div className="iba-map-center-content">
              <strong>Psychophysiology</strong>
              <span>Nutrition influences the body signals your mind reads: energy, calm, tension, clarity, fatigue, motivation, and emotional stability.</span>
            </div>
          </div>
          <div className="iba-nutrient-col">
            {mapRight.map(c => (
              <div className="iba-nutrient-card" key={c.title}>
                <h4>{c.title}</h4><p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="iba-section-label">Core nutrient cards</div>
      <div className="iba-auto">
        {miniNutrients.map(n => (
          <div className="iba-mini" key={n.name}><h4>{n.name}</h4><p>{n.body}</p></div>
        ))}
      </div>

      <div className="iba-section-label">Neurochemical integration</div>
      <div className="iba-card">
        <h3>How Nutrients Connect to Neurotransmitter Themes</h3>
        <p className="iba-sub">Certain nutrients support the body conditions and biochemical pathways that help these systems function.</p>
        <table className="iba-table">
          <thead>
            <tr>
              <th>Neurochemical</th><th>Nutrient Support</th><th>Body-State Connection</th><th>Application</th>
            </tr>
          </thead>
          <tbody>
            {neuroRows.map(r => (
              <tr key={r.chem}>
                <td>{r.chem}</td><td>{r.support}</td><td>{r.state}</td><td>{r.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="iba-section-label">Psychophysiology patterns</div>
      <div className="iba-grid-3">
        {patterns.map(p => (
          <div className="iba-card" key={p.title}>
            <h3>{p.title}</h3>
            <p className="iba-sub">{p.body}</p>
            <div className="iba-pill-row">{p.pills.map(pl => <span className="iba-pill" key={pl}>{pl}</span>)}</div>
          </div>
        ))}
      </div>

      <div className="iba-section-label">Food-first support examples</div>
      <div className="iba-grid-3">
        {foodPlates.map(plate => (
          <div className="iba-card" key={plate.title}>
            <h3>{plate.title}</h3>
            <div className="iba-list" style={{ marginTop: 14 }}>
              {plate.items.map(item => (
                <div className="iba-list-item" key={item.name}>
                  <div className="iba-list-item-body"><strong>{item.name}</strong><span>{item.note}</span></div>
                  <div className="iba-list-tag">{item.tag}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="iba-card iba-warning">
          <h3>Safety Note</h3>
          <p className="iba-sub">This page is educational. Persistent fatigue, low mood, anxiety, numbness, tingling, dizziness, or major sleep problems deserve proper medical evaluation.</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>Avoid megadosing. Iron and vitamin D can be harmful in excess or interact with medications.</p>
        </div>
      </div>

      <div className="iba-section-label">Daily mineral + vitamin ritual</div>
      <div className="iba-demo">
        {[
          { time: 'Morning', body: 'Hydrate, get light exposure, eat a nutrient-dense meal if not fasting, and use movement to cue dopamine/norepinephrine-style activation.' },
          { time: 'Midday',  body: 'Use a balanced meal, steps, electrolytes if needed, and focused work to support energy, cognition, and motivation.' },
          { time: 'Evening', body: 'Shift toward magnesium-rich foods, slower breathing, lower stimulation, journaling, and sleep rhythm to support calm.' },
        ].map(s => (
          <div className="iba-demo-step" key={s.time}><h4>{s.time}</h4><p>{s.body}</p></div>
        ))}
      </div>

      <p className="iba-quote">" Nutrients are not the whole story, but they help give the nervous system the materials it needs to tell a steadier story. "</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   NEUROTRANSMITTERS
───────────────────────────────────────── */
function Neurotransmitters() {
  const neuro = [
    { name: 'Dopamine',       theme: 'motivation, reward, drive',       labelClass: 'lbl-dopamine',  role: 'Drives motivation and goal pursuit',           effect: 'Reward, focus, pleasure',                   support: 'Protein, movement, sunlight, goal setting' },
    { name: 'Serotonin',      theme: 'mood, steadiness, well-being',    labelClass: 'lbl-serotonin', role: 'Supports mood and emotional balance',          effect: 'Well-being, patience, resilience',           support: 'Sunlight, tryptophan, exercise, gratitude' },
    { name: 'GABA',           theme: 'calm, relaxation, slowing down',  labelClass: 'lbl-gaba',      role: 'Calms neural activity and reduces stress',     effect: 'Relaxation, less anxiety, better sleep',     support: 'Magnesium, breathwork, meditation, sleep' },
    { name: 'Norepinephrine', theme: 'alertness, energy, attention',    labelClass: 'lbl-norepi',    role: 'Increases alertness and concentration',        effect: 'Energy, focus, response',                    support: 'Movement, cold exposure, hydration, B vitamins' },
    { name: 'Oxytocin',       theme: 'bonding, trust, connection',      labelClass: 'lbl-oxytocin',  role: 'Builds bonds and social connection',           effect: 'Trust, empathy, sense of belonging',         support: 'Hugs, kind touch, meaningful connection' },
    { name: 'Acetylcholine',  theme: 'learning, memory, cognition',     labelClass: 'lbl-acetyl',    role: 'Enables learning and memory',                 effect: 'Clarity, recall, mental sharpness',          support: 'Choline-rich foods, learning, good sleep' },
  ];
  const offSignals = ['Low motivation', 'Anxiety & worry', 'Poor sleep', 'Brain fog', 'Low connection', 'Irritability'];
  const naturalSupport = [
    { icon: '🥬', name: 'Nutrition',   desc: 'Whole foods, protein, omega-3s, micronutrients' },
    { icon: '🏃', name: 'Movement',    desc: 'Daily activity, strength, walks, yoga' },
    { icon: '🌬', name: 'Breath',      desc: 'Slow, deep breathing, coherence' },
    { icon: '☀', name: 'Light',       desc: 'Sunlight daily, morning light, time outdoors' },
    { icon: '🌙', name: 'Rest',        desc: '7-9 hours sleep, wind-down, consistency' },
    { icon: '🤝', name: 'Relationships',desc: 'Kindness, touch, community, belonging' },
  ];
  const rhythm = [
    { time: 'Morning',   chems: 'Dopamine\nNorepinephrine\nSerotonin',             color: 'var(--gold)' },
    { time: 'Midday',    chems: 'Norepinephrine\nAcetylcholine',                   color: 'var(--blue)' },
    { time: 'Afternoon', chems: 'Dopamine\nOxytocin\nAcetylcholine',               color: 'var(--lavender)' },
    { time: 'Evening',   chems: 'GABA\nSerotonin\nOxytocin',                       color: 'var(--sage)' },
    { time: 'Night',     chems: 'GABA\nSerotonin',                                 color: '#5bbfb5' },
  ];
  const interactionWeb = [
    { label: 'Motivation', chem: 'Dopamine',       top: '0%',   left: '50%',  color: 'var(--lavender)' },
    { label: 'Mood',       chem: 'Serotonin',       top: '28%',  left: '5%',   color: 'var(--blue)' },
    { label: 'Focus',      chem: 'Norepinephrine',  top: '28%',  left: '85%',  color: 'var(--gold)' },
    { label: 'Connection', chem: 'Oxytocin',        top: '68%',  left: '5%',   color: 'var(--rose)' },
    { label: 'Calm',       chem: 'GABA',            top: '68%',  left: '85%',  color: 'var(--sage)' },
    { label: 'Sleep',      chem: 'GABA · Serotonin',top: '92%',  left: '50%',  color: '#5bbfb5' },
  ];
  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div className="iba-hero">
        <div>
          <h2>Understand Your Neurotransmitters</h2>
          <p>Your brain's chemical messengers influence mood, focus, calm, motivation, sleep, and connection. Learn how they work together — and how daily choices can support balance.</p>
        </div>
        <div className="iba-hero-art" />
      </div>

      {/* Neurochemical System Map + How They Interact */}
      <div className="iba-grid-2" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="iba-card">
          <h3>Neurochemical System Map</h3>
          <p className="iba-sub">Six key messengers and what they support.</p>
          <div className="iba-grid-2">
            {neuro.map(n => (
              <div className="iba-neuro-card" key={n.name}>
                <h4 style={{ color: `var(--deep)` }}>{n.name}</h4>
                <div className="iba-neuro-theme">{n.theme}</div>
                {[['Role', n.role], ['Effect', n.effect], ['Support', n.support]].map(([lbl, val]) => (
                  <div className="iba-neuro-row" key={lbl}>
                    <span className={`iba-neuro-label ${n.labelClass}`}>{lbl}</span>
                    <span className="iba-neuro-val">{val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="iba-card">
          <h3>How They Interact <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <p className="iba-sub">Neurotransmitters work in harmony. Balance creates resilience.</p>
          <div style={{ position: 'relative', height: 220, margin: '8px 0' }}>
            {interactionWeb.map(node => (
              <div key={node.label} style={{
                position: 'absolute',
                top: node.top, left: node.left,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: node.color + '22',
                  border: `2px solid ${node.color}`,
                  display: 'grid', placeItems: 'center',
                  margin: '0 auto 4px',
                  fontSize: 14,
                }}>◉</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--deep)' }}>{node.label}</div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>{node.chem}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, borderTop: '1px solid var(--line)', paddingTop: 12, marginTop: 8 }}>
            Support one system, and others benefit. Small daily choices create big shifts.
          </div>
        </div>
      </div>

      {/* When Levels Feel Off + Natural Support + Daily Rhythm */}
      <div className="iba-grid-3">
        <div className="iba-card">
          <h3>When Levels Feel Off <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <p className="iba-sub">Imbalances can show up in many ways.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {offSignals.map(s => (
              <div key={s} style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid var(--line)', borderRadius: 12, padding: '9px 12px', fontSize: 12, color: 'var(--deep)', fontWeight: 500 }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="iba-card">
          <h3>Natural Support <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <p className="iba-sub">Daily habits nourish your neurochemistry.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            {naturalSupport.map(s => (
              <div key={s.name} style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid var(--line)', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--deep)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginTop: 2 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="iba-card">
          <h3>Daily Neurochemistry Rhythm <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <p className="iba-sub">Your brain's chemistry flows with your day.</p>
          <div className="iba-rhythm" style={{ gridTemplateColumns: '1fr' }}>
            {rhythm.map(r => (
              <div key={r.time} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div className="iba-rhythm-dot" style={{ background: r.color, boxShadow: `0 0 0 2px ${r.color}33` }} />
                  <div style={{ width: 1, height: 20, background: 'var(--line)' }} />
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <div className="iba-rhythm-time">{r.time}</div>
                  <div className="iba-rhythm-chems" style={{ whiteSpace: 'pre-line' }}>{r.chems}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="iba-quote">" Awareness is the first step toward balance. "</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   MOOD UPLIFT
───────────────────────────────────────── */
function MoodUplift() {
  const layers = [
    { title: 'Psychology',          color: 'var(--lavender)', items: ['Reframing', 'Self-Talk', 'Boundaries', 'Emotional Awareness'] },
    { title: 'Biology',             color: 'var(--blue)',     items: ['Sleep', 'Neurotransmitters', 'Hormones', 'Nervous System'] },
    { title: 'Holistic Lifestyle',  color: 'var(--sage)',     items: ['Nutrition', 'Movement', 'Sunlight', 'Nature', 'Breathwork'] },
    { title: 'Spiritual Grounding', color: 'var(--gold)',     items: ['Gratitude', 'Meditation', 'Meaning', 'Prayer or Reflection'] },
  ];
  const psychTools = [
    { name: 'Journaling',           sub: 'Express & process' },
    { name: 'Cognitive Reframing',  sub: 'Shift your perspective' },
    { name: 'Self-Compassion',      sub: 'Be kind within' },
    { name: 'Connection',           sub: 'Reach out & belong' },
  ];
  const holisticSupports = [
    { icon: '💧', name: 'Hydration',         sub: 'Drink water mindfully' },
    { icon: '🚶', name: 'Walk',              sub: 'Move in nature' },
    { icon: '🥩', name: 'Protein-Rich Meal', sub: 'Stabilize your energy' },
    { icon: '🌿', name: 'Grounding',         sub: '5 senses reset' },
    { icon: '🤸', name: 'Stretching',        sub: 'Release & restore' },
  ];
  const spiritualPractices = [
    { icon: '🙏', name: 'Gratitude',      sub: 'Notice the good' },
    { icon: '🧘', name: 'Meditation',     sub: 'Calm the mind' },
    { icon: '🔍', name: 'Contemplation',  sub: 'Look within' },
    { icon: '🤲', name: 'Service',        sub: 'Give & uplift others' },
  ];
  const plan = [
    { time: 'Morning', icon: '☀', sub: 'Set the tone', items: ['5 min gratitude', 'Hydrate', 'Sunlight + breath'] },
    { time: 'Midday',  icon: '◉', sub: 'Re-energize',  items: ['Movement break', 'Nourishing meal', '2 min reset'] },
    { time: 'Evening', icon: '🌙', sub: 'Wind down',   items: ['Reflect & journal', 'Gentle stretch', 'Meditation'] },
  ];
  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div className="iba-hero">
        <div>
          <h2>Uplift Your Mood on All Levels</h2>
          <p>Strengthen your well-being through mind, body, lifestyle, and spirit. Small, mindful actions create lasting light from within.</p>
        </div>
        <div className="iba-hero-art" />
      </div>

      {/* Four Layers + Mood Uplift Plan */}
      <div className="iba-grid-2" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="iba-card">
          <h3>Four Layers of Uplift <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <p className="iba-sub">Each layer supports the whole.</p>
          <div className="iba-grid-2" style={{ marginTop: 8 }}>
            {layers.map(l => (
              <div key={l.title} style={{ borderRadius: 16, border: `1px solid ${l.color}44`, background: l.color + '0e', padding: 16 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 600, color: l.color, fontFamily: 'Georgia, serif' }}>{l.title}</h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {l.items.map(i => <li key={i} style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: l.color }}>◦</span>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, borderRadius: 16, border: '1px solid rgba(216,169,72,0.25)', background: 'radial-gradient(circle at 50% 50%, rgba(216,169,72,0.08), transparent 70%)', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 500, color: 'var(--deep)' }}>Mood &amp; Well-Being</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Where all layers converge</div>
          </div>
        </div>

        <div className="iba-card">
          <h3>Mood Uplift Plan <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
          <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
            {plan.map(p => (
              <div className="iba-plan-block" key={p.time}>
                <div className="iba-plan-time">
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <strong>{p.time}</strong>
                  <span>{p.sub}</span>
                </div>
                <div className="iba-plan-items">
                  {p.items.map(item => <div className="iba-plan-item" key={item}>{item}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Psychology Tools + Holistic Supports + Spiritual Practices */}
      <div className="iba-grid-3">
        <div className="iba-card">
          <h3 style={{ color: 'var(--lavender)' }}>Psychology Tools</h3>
          <div className="iba-tool-list" style={{ marginTop: 12 }}>
            {psychTools.map(t => (
              <div className="iba-tool-row" key={t.name}>
                <div className="iba-tool-row-left"><strong>{t.name}</strong><span>{t.sub}</span></div>
                <span className="iba-tool-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="iba-card">
          <h3 style={{ color: 'var(--sage)' }}>Holistic Supports</h3>
          <div className="iba-tool-list" style={{ marginTop: 12 }}>
            {holisticSupports.map(t => (
              <div className="iba-tool-row" key={t.name}>
                <div className="iba-tool-row-left"><strong>{t.icon} {t.name}</strong><span>{t.sub}</span></div>
                <span className="iba-tool-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="iba-card">
          <h3 style={{ color: 'var(--gold)' }}>Spiritual Practices</h3>
          <div className="iba-tool-list" style={{ marginTop: 12 }}>
            {spiritualPractices.map(t => (
              <div className="iba-tool-row" key={t.name}>
                <div className="iba-tool-row-left"><strong>{t.icon} {t.name}</strong><span>{t.sub}</span></div>
                <span className="iba-tool-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="iba-quote">" Nourish your mind. Care for your body. Live with purpose. Connect with spirit. Uplift your life. "</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHYSICAL ACTIVITY
───────────────────────────────────────── */
function ActivityTable({ groups }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {groups.map(group => (
        <div key={group.label} className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>{group.label}</span>
          </div>
          {group.items.map((activity, i) => (
            <div key={activity.name} style={{
              display: 'grid', gridTemplateColumns: '200px 1fr',
              padding: '16px 20px',
              borderBottom: i < group.items.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingRight: 16, paddingTop: 2 }}>
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{activity.icon}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', lineHeight: 1.3 }}>{activity.name}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {activity.benefits.map((b, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                    <span style={{ color: 'var(--sage)', fontSize: '0.6rem', marginTop: 5, flexShrink: 0 }}>◆</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PhysicalActivity() {
  const groups = [
    {
      label: 'Movement',
      items: [
        {
          name: 'Walking (10k steps)', icon: '🚶',
          benefits: [
            'Lowers blood pressure and resting heart rate',
            'Improves mood and reduces anxiety via endorphin release',
            'Strengthens bones and reduces osteoporosis risk',
            'Boosts creative thinking and mental clarity',
            'Regulates blood sugar and supports weight management',
          ],
        },
        {
          name: 'Running / Jogging', icon: '🏃',
          benefits: [
            'Strengthens the heart and improves VO2 max',
            'Releases endorphins and BDNF ("brain fertilizer") for mood and memory',
            'Burns significant calories and supports healthy weight',
            'Builds resilience in tendons, ligaments, and bones',
            'Linked to longer lifespan and reduced cancer risk',
          ],
        },
        {
          name: 'Cycling / Biking', icon: '🚴',
          benefits: [
            'Excellent low-impact cardiovascular workout',
            'Builds leg strength without stressing joints',
            'Reduces risk of heart disease and type 2 diabetes',
            'Improves lung capacity and aerobic fitness',
            'Lowers cortisol levels and stress over time',
          ],
        },
        {
          name: 'Swimming', icon: '🏊',
          benefits: [
            'Full-body workout engaging all major muscle groups',
            'Zero impact — ideal for joint issues or recovery',
            'Improves flexibility and range of motion',
            'Enhances lung efficiency and breath control',
            'Proven to reduce symptoms of depression and anxiety',
          ],
        },
        {
          name: 'Push-ups', icon: '💪',
          benefits: [
            'Builds chest, shoulder, and tricep strength with no equipment',
            'Engages core stabilizers and improves posture',
            'Elevates resting metabolism by building lean muscle',
            'Improves bone density in the upper body',
            'High rep sets provide cardiovascular conditioning',
          ],
        },
        {
          name: 'Weight Training', icon: '🏋️',
          benefits: [
            'Increases muscle mass and basal metabolic rate',
            'Improves insulin sensitivity and blood sugar control',
            'Strengthens bones, reducing fracture risk significantly',
            'Boosts testosterone and growth hormone naturally',
            'Improves functional strength for daily activities',
          ],
        },
        {
          name: 'Yoga / Stretching', icon: '🧘',
          benefits: [
            'Reduces cortisol and activates the parasympathetic nervous system',
            'Improves flexibility, balance, and joint health',
            'Relieves chronic back pain and muscle tension',
            'Enhances body awareness and mind-body connection',
            'Shown to lower blood pressure and improve sleep quality',
          ],
        },
      ],
    },
    {
      label: 'Recovery',
      items: [
        {
          name: 'Sauna', icon: '🧖',
          benefits: [
            'Improves cardiovascular health comparable to moderate exercise',
            'Flushes toxins through deep sweating',
            'Reduces muscle soreness and speeds recovery',
            'Triggers heat shock proteins that repair damaged cells',
            'Regular use linked to lower risk of dementia and Alzheimer\'s',
          ],
        },
        {
          name: 'Cold Exposure / Cold Shower', icon: '🧊',
          benefits: [
            'Dramatically boosts norepinephrine (focus, mood, alertness)',
            'Activates brown fat, increasing metabolic rate',
            'Strengthens immune response over time',
            'Reduces inflammation and muscle soreness',
            'Builds mental resilience and stress tolerance',
          ],
        },
        {
          name: 'Face Massage (self)', icon: '✋',
          benefits: [
            'Stimulates lymphatic drainage, reducing puffiness and toxin buildup',
            'Increases blood circulation, giving skin a natural glow',
            'Relaxes jaw, forehead, and temple tension linked to stress',
            'Activates acupressure points associated with headache relief',
            'Signals the nervous system to shift into a parasympathetic (calm) state',
          ],
        },
      ],
    },
    {
      label: 'Daily Habits',
      items: [
        {
          name: 'Getting Sunlight', icon: '☀️',
          benefits: [
            'Triggers serotonin production — regulates mood, appetite, and sleep',
            'Drives vitamin D synthesis, essential for immunity and bone strength',
            'Morning light anchors the circadian rhythm for deeper nighttime sleep',
            'Reduces risk of seasonal depression and low-energy states',
            'Lowers blood pressure via nitric oxide release in the skin',
          ],
        },
        {
          name: 'Drinking Water (warm vs cold)', icon: '💧',
          benefits: [
            'Warm water aids digestion, stimulates gut motility, and soothes the throat',
            'Cold water boosts alertness and helps cool the body during exercise',
            'Both support kidney function, toxin removal, and joint lubrication',
            'Even mild dehydration impairs focus, mood, and short-term memory',
            'Morning hydration kick-starts metabolism and flushes overnight waste',
          ],
        },
        {
          name: 'Cold Showers', icon: '🚿',
          benefits: [
            'Surges norepinephrine by up to 300% — sharpens focus and lifts mood',
            'Improves circulation as blood vessels dilate after the cold ends',
            'Reduces muscle inflammation and speeds recovery after exercise',
            'Builds deliberate stress tolerance and mental resilience',
            'Activates brown fat thermogenesis, supporting metabolic health',
          ],
        },
        {
          name: 'Smiling', icon: '😊',
          benefits: [
            'Activates facial feedback — even a mild smile reduces perceived stress',
            'Releases dopamine, serotonin, and endorphins, lifting mood immediately',
            'Lowers heart rate during stressful situations',
            'Signals safety to the social nervous system, improving relationships',
            'Genuine smiling (Duchenne) is associated with longer lifespan in studies',
          ],
        },
      ],
    },
    {
      label: 'Mental Practices',
      items: [
        {
          name: 'Meditation', icon: '🧠',
          benefits: [
            'Thickens the prefrontal cortex — the seat of focus and decision-making',
            'Lowers cortisol and baseline stress levels over time',
            'Improves emotional regulation and reduces reactivity',
            'Enhances sleep quality and reduces insomnia',
            'Linked to reduced anxiety, depression, and chronic pain',
          ],
        },
        {
          name: 'Breathwork', icon: '🌬️',
          benefits: [
            'Activates the vagus nerve, calming the nervous system',
            'Lowers blood pressure within minutes of practice',
            'Improves oxygen-CO₂ balance and lung efficiency',
            'Reduces panic, anxiety, and stress acutely',
            'Improves sleep when practiced before bed',
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Physical Activity</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>Health Benefits by Practice</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>Evidence-based benefits of physical and daily practices — grouped by type.</p>
      </div>
      <ActivityTable groups={groups} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SLEEP
───────────────────────────────────────── */
function Sleep() {
  const cycles = [
    { stage: 'NREM Stage 1', duration: '1–7 min', role: 'Light sleep; the transition from wakefulness. Easy to wake. Body temperature drops.' },
    { stage: 'NREM Stage 2', duration: '10–25 min', role: 'Heart rate slows, body temperature drops further. Memory consolidation begins. Sleep spindles protect sleep depth.' },
    { stage: 'NREM Stage 3 (Deep)', duration: '20–40 min', role: 'Physical repair — tissue growth, immune strengthening, hormone release (HGH). Hardest to wake from.' },
    { stage: 'REM Sleep', duration: '10–60 min', role: 'Emotional processing, creativity, and memory integration. Brain is nearly as active as waking. Dreams occur.' },
  ];

  const disruptors = [
    { factor: 'Blue light (screens)', effect: 'Suppresses melatonin production for up to 2 hours, delaying sleep onset.' },
    { factor: 'Caffeine', effect: 'Half-life of ~6 hours — a 3pm coffee still has 50% caffeine in your system at 9pm.' },
    { factor: 'Alcohol', effect: 'Fragments sleep architecture and suppresses REM sleep, reducing emotional recovery.' },
    { factor: 'Irregular schedule', effect: 'Disrupts the circadian rhythm, reducing sleep quality even if total hours are the same.' },
    { factor: 'Room temperature too warm', effect: 'Core body temperature must drop ~1°C to initiate sleep. Warm rooms resist this.' },
    { factor: 'Stress / high cortisol', effect: 'Cortisol and sleep are inversely linked — chronic stress reduces deep sleep stages.' },
  ];

  const enhancers = [
    { practice: 'Consistent wake time', benefit: 'Anchors the circadian clock more powerfully than bedtime.' },
    { practice: 'Cool room (16–19°C)', benefit: 'Supports the core temperature drop needed for deep sleep onset.' },
    { practice: 'Morning sunlight', benefit: 'Sets the circadian timer — improves sleep timing 12–16 hours later.' },
    { practice: 'No caffeine after 12–1pm', benefit: 'Allows adenosine (sleep pressure) to rebuild fully by evening.' },
    { practice: 'Wind-down routine', benefit: 'Signals the nervous system to shift from sympathetic to parasympathetic mode.' },
    { practice: 'Dark, quiet room', benefit: 'Even small amounts of light during sleep reduce melatonin and deep sleep.' },
    { practice: 'Magnesium glycinate', benefit: 'Supports GABA and relaxation pathways; improves sleep depth and onset.' },
  ];

  const rowStyle = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '180px 1fr',
    padding: '14px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
  });

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Sleep</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>The Architecture of Rest</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>Sleep is the most powerful recovery tool available — shaping memory, immunity, mood, and metabolism every night.</p>
      </div>

      {/* Sleep cycles */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Sleep Stages (one ~90-min cycle)</span>
        </div>
        {cycles.map((c, i) => (
          <div key={c.stage} style={rowStyle(i, cycles)}>
            <div style={{ paddingRight: 16, paddingTop: 2 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)' }}>{c.stage}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--sage)', marginTop: 2 }}>{c.duration}</div>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{c.role}</p>
          </div>
        ))}
      </div>

      {/* Disruptors */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>What Disrupts Sleep</span>
        </div>
        {disruptors.map((d, i) => (
          <div key={d.factor} style={rowStyle(i, disruptors)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{d.factor}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{d.effect}</p>
          </div>
        ))}
      </div>

      {/* Enhancers */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>What Improves Sleep</span>
        </div>
        {enhancers.map((e, i) => (
          <div key={e.practice} style={rowStyle(i, enhancers)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{e.practice}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{e.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NUTRITION
───────────────────────────────────────── */
function Nutrition() {
  const categories = [
    {
      label: 'Brain & Mood Foods',
      items: [
        { food: 'Fatty fish (salmon, sardines)', benefit: 'Rich in omega-3 DHA — builds brain cell membranes, reduces neuroinflammation, supports serotonin signalling.' },
        { food: 'Eggs', benefit: 'Choline for acetylcholine production (memory, focus). B12 and folate for methylation and mood stability.' },
        { food: 'Dark chocolate (70%+)', benefit: 'Flavonoids boost cerebral blood flow. Triggers endorphin and serotonin release. Magnesium for calm.' },
        { food: 'Leafy greens (spinach, kale)', benefit: 'Folate, magnesium, and vitamin K support brain function, mood, and neural protection.' },
        { food: 'Berries', benefit: 'Anthocyanins reduce oxidative stress in the brain. Linked to slower cognitive decline and better memory.' },
      ],
    },
    {
      label: 'Nervous System Support',
      items: [
        { food: 'Bananas', benefit: 'Tryptophan + B6 combo directly supports serotonin synthesis. Potassium supports nerve impulses.' },
        { food: 'Avocado', benefit: 'Healthy fats support myelin sheath integrity. Folate and potassium reduce stress and blood pressure.' },
        { food: 'Nuts & seeds', benefit: 'Magnesium (nervous system calm), zinc (neurotransmitter cofactor), and omega-3s in walnuts.' },
        { food: 'Fermented foods (yogurt, kimchi)', benefit: 'Gut microbiome diversity directly influences serotonin production (90% made in the gut).' },
        { food: 'Oats', benefit: 'Slow-release carbs stabilise blood sugar — preventing cortisol spikes. B vitamins for energy metabolism.' },
      ],
    },
    {
      label: 'Energy & Recovery',
      items: [
        { food: 'Sweet potatoes', benefit: 'Complex carbs replenish glycogen. Vitamin A, C, and potassium support recovery and immune function.' },
        { food: 'Lean protein (chicken, legumes)', benefit: 'Amino acids are precursors to dopamine (tyrosine) and serotonin (tryptophan). Essential for tissue repair.' },
        { food: 'Beets', benefit: 'Nitrates boost nitric oxide — improves blood flow, endurance, and oxygen delivery to muscles.' },
        { food: 'Green tea', benefit: 'L-theanine + caffeine combo: calm alertness without the anxiety spike of coffee alone.' },
        { food: 'Water', benefit: 'Even 1–2% dehydration reduces cognitive performance by up to 10%. Essential for every metabolic process.' },
      ],
    },
    {
      label: 'What to Limit',
      items: [
        { food: 'Ultra-processed foods', benefit: 'Disrupt gut microbiome, spike blood sugar, and are linked to higher rates of depression and anxiety.' },
        { food: 'Refined sugar', benefit: 'Causes blood sugar crashes that trigger cortisol and adrenaline, creating anxiety and fatigue cycles.' },
        { food: 'Excess alcohol', benefit: 'Depletes B vitamins, disrupts sleep architecture, and suppresses serotonin and GABA production.' },
        { food: 'Trans fats', benefit: 'Promote neuroinflammation and are associated with increased risk of depression and cognitive decline.' },
      ],
    },
  ];

  const hydration = [
    { benefit: 'Energy & focus', detail: 'Even 1–2% dehydration reduces cognitive performance, working memory, and attention. Fatigue is one of the earliest signs of mild dehydration — often mistaken for hunger or low motivation.' },
    { benefit: 'Detoxification', detail: 'The kidneys require adequate water to filter waste products from the blood and excrete them through urine. Chronic low intake forces the kidneys to concentrate urine, increasing kidney stone risk.' },
    { benefit: 'Digestion', detail: 'Water is needed to produce digestive enzymes and move food through the intestines. Insufficient intake is a leading cause of constipation and slowed nutrient absorption.' },
    { benefit: 'Skin health', detail: 'Hydration supports skin elasticity and barrier function. While drinking water is not a cure for dry skin, chronic dehydration visibly reduces skin plumpness and accelerates the appearance of fine lines.' },
    { benefit: 'Temperature regulation', detail: 'Sweating is the primary way the body dissipates heat. Without enough water, the body cannot cool itself efficiently — core temperature rises and performance drops rapidly in warm conditions.' },
    { benefit: 'Joint & muscle support', detail: 'Synovial fluid in joints is primarily water. Adequate hydration keeps joints lubricated and reduces friction. Muscle cramps during exercise are often linked to fluid and electrolyte loss.' },
    { benefit: 'Weight management', detail: 'Drinking water before meals reduces calorie intake by increasing satiety. The stomach\'s stretch receptors signal fullness regardless of calorie content. Water also slightly raises metabolic rate for 30–40 minutes after ingestion.' },
  ];

  const hydrationTips = [
    ['Start with water', 'Drink a glass of water before anything else in the morning — it rehydrates after overnight fluid loss and jumpstarts kidney function before caffeine.'],
    ['Aim for 2–3 litres daily', 'Exact needs vary by body weight, activity, and climate. A practical guide: urine should be pale yellow — dark yellow means drink more, clear may mean overdrinking.'],
    ['Don\'t wait for thirst', 'Thirst is a late signal — by the time it appears, mild dehydration is already present. Keep water accessible and sip consistently throughout the day.'],
    ['Electrolytes matter', 'Plain water isn\'t enough during intense exercise or heat. Sodium, potassium, and magnesium help water enter cells. Coconut water, a pinch of sea salt, or electrolyte tabs can help.'],
    ['Coffee and tea count', 'Moderate caffeine does not cause net dehydration — the fluid in coffee and tea more than offsets any mild diuretic effect. They count toward daily fluid intake.'],
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Nutrition</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>Eat for Your Nervous System</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>Food is information for the brain and body. What you eat shapes your neurotransmitters, hormones, and energy every day.</p>
      </div>
      <ActivityTable groups={categories.map(c => ({
        label: c.label,
        items: c.items.map(item => ({ name: item.food, icon: '', benefits: [item.benefit] })),
      }))} />

      {/* Hydration */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--blue)', textTransform: 'uppercase' }}>💧 Hydration — Benefits of Drinking Water</span>
        </div>
        {hydration.map((h, i) => (
          <div key={h.benefit} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '13px 20px', borderBottom: i < hydration.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{h.benefit}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{h.detail}</p>
          </div>
        ))}
      </div>

      <div className="iba-card" style={{ background: 'rgba(99,163,219,0.06)', border: '1px solid rgba(99,163,219,0.18)' }}>
        <h4 style={{ margin: '0 0 14px', color: 'var(--blue)', fontFamily: 'Georgia, serif', fontWeight: 500 }}>Practical hydration guide</h4>
        <div style={{ display: 'grid', gap: 10 }}>
          {hydrationTips.map(([title, body]) => (
            <div key={title}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 3 }}>{title}</div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   STRESS & RECOVERY
───────────────────────────────────────── */
function StressRecovery() {
  const rowStyle = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '190px 1fr',
    padding: '14px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
  });

  const stressTypes = [
    { type: 'Acute Stress', duration: 'Short-term', description: 'Triggered by immediate demands or pressures — a deadline, a conflict, a sudden threat. The stress response is appropriate and adaptive here.', symptoms: 'Increased heart rate, rapid breathing, muscle tension, sweating, heightened alertness.' },
    { type: 'Chronic Stress', duration: 'Prolonged', description: 'Ongoing life challenges — financial pressure, work overload, relationship difficulties — keep the stress system perpetually activated. The body never fully recovers.', symptoms: 'Fatigue, irritability, sleep disturbances, weakened immunity, brain fog, low mood.' },
    { type: 'Traumatic Stress', duration: 'Event-triggered', description: 'Caused by exposure to overwhelming events — accidents, violence, abuse, disasters. Can reorganise the nervous system\'s threat-detection in lasting ways.', symptoms: 'Flashbacks, hypervigilance, emotional numbing, avoidance, heightened startle response. May develop into PTSD.' },
  ];

  const mentalDisorders = [
    { name: 'Generalised Anxiety Disorder (GAD)', link: 'Chronic stress keeps the HPA axis overactivated, maintaining a persistent state of threat-detection. The nervous system can\'t find baseline calm.' },
    { name: 'Panic Disorder', link: 'Repeated stress sensitises the brain\'s alarm system. The body learns to interpret normal sensations as danger, triggering sudden episodes of intense fear and physical symptoms.' },
    { name: 'Depression', link: 'Chronic cortisol elevation suppresses hippocampal neurogenesis and disrupts serotonin and dopamine systems. Prolonged stress is one of the strongest environmental predictors of depression onset.' },
    { name: 'PTSD', link: 'Traumatic stress can alter the amygdala (overactive), prefrontal cortex (underactive), and memory processing systems — locking the nervous system in a state of threat long after the event.' },
    { name: 'OCD', link: 'Stress amplifies intrusive thoughts and the distress they cause, increasing compulsive behaviour as a coping mechanism. Stress does not cause OCD but reliably worsens it.' },
    { name: 'Substance Use Disorders', link: 'Stress activates dopamine-driven reward-seeking. People under chronic stress are significantly more likely to use substances as self-medication, which can escalate to dependency.' },
  ];

  const physicalDisorders = [
    { name: 'Cardiovascular disease', link: 'Chronic cortisol raises blood pressure, increases blood clotting, and promotes inflammation — all direct risk factors for heart attack and stroke.' },
    { name: 'Irritable Bowel Syndrome (IBS)', link: 'The gut-brain axis is bidirectional. Stress activates the enteric nervous system, altering gut motility and sensitivity. Most IBS flares correlate directly with psychological stress.' },
    { name: 'Immune dysregulation', link: 'Prolonged cortisol suppresses immune function, making the body more vulnerable to infection. Chronic stress also promotes systemic inflammation — a driver of many diseases.' },
    { name: 'Fibromyalgia & chronic pain', link: 'Stress sensitises central pain pathways. The brain\'s volume control for pain signals is turned up — real physical pain is amplified by a chronically stressed nervous system.' },
    { name: 'Migraines', link: 'Stress triggers cortical spreading depression in susceptible people. Both the presence of stress and the "let-down" phase after it (e.g. the weekend headache) commonly precipitate migraines.' },
    { name: 'Endocrine disruption', link: 'Cortisol competes with and disrupts insulin, thyroid hormones, and sex hormones. Chronic stress can worsen insulin resistance, disrupt menstrual cycles, and suppress thyroid function.' },
  ];

  const acuteTools = [
    { tool: 'Physiological sigh', how: 'Double inhale through nose, long exhale through mouth. Fastest known way to lower heart rate acutely.' },
    { tool: 'Cold water on face/wrists', how: 'Activates the dive reflex — slows heart rate within seconds via vagus nerve stimulation.' },
    { tool: '4-7-8 breathing', how: 'Inhale 4s, hold 7s, exhale 8s. Activates the parasympathetic system and drops cortisol quickly.' },
    { tool: 'Grounding (feet on earth)', how: 'Direct skin contact with the ground reduces cortisol and inflammatory markers within 30 minutes.' },
    { tool: '5-4-3-2-1 sensory reset', how: 'Name 5 things you see, 4 hear, 3 touch, 2 smell, 1 taste. Interrupts the stress loop via present-moment focus.' },
  ];

  const chronicTools = [
    { tool: 'HRV training', how: 'Heart rate variability biofeedback builds long-term vagal tone — your physiological stress resilience.' },
    { tool: 'Regular exercise', how: 'Lowers baseline cortisol, raises stress threshold. Consistent movement is the most effective chronic stress reducer.' },
    { tool: 'Sleep prioritisation', how: 'Sleep debt elevates cortisol the next day by 15–20%. Recovery is impossible without adequate sleep.' },
    { tool: 'Social connection', how: 'Oxytocin from meaningful connection directly counteracts cortisol. Loneliness is as stressful as physical threat.' },
    { tool: 'Journaling', how: 'Expressive writing reduces psychological distress and lowers cortisol by externalising and processing stress.' },
    { tool: 'Time in nature', how: 'Forest environments lower cortisol, blood pressure, and adrenaline. Even 20 minutes produces measurable effects.' },
  ];

  const hrvMarkers = [
    { marker: 'High HRV', meaning: 'Greater adaptability, resilience, and recovery capacity. Associated with better cardiovascular and mental health.' },
    { marker: 'Low HRV', meaning: 'Reduced vagal tone — body is under stress, over-trained, or under-recovered. Signal to rest.' },
    { marker: 'HRV trend down', meaning: 'Accumulating stress load. Prioritise recovery before adding more training or demands.' },
    { marker: 'HRV trend up', meaning: 'Adaptation and recovery in progress. Body is responding well to your current lifestyle.' },
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Stress & Recovery</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>Managing the Stress Response</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>Stress is not the enemy — unmanaged, unrecovered stress is. Understanding the types of stress and the disorders they can produce helps you recognise what you are dealing with and respond effectively.</p>
      </div>

      {/* Stress types */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'grid', gridTemplateColumns: '170px 100px 1fr 1fr', gap: 14 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Type</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Duration</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>What it is</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Symptoms</span>
        </div>
        {stressTypes.map((s, i) => (
          <div key={s.type} style={{ display: 'grid', gridTemplateColumns: '170px 100px 1fr 1fr', padding: '13px 20px', borderBottom: i < stressTypes.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{s.type}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--sage)', paddingTop: 2, fontStyle: 'italic' }}>{s.duration}</div>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s.description}</p>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s.symptoms}</p>
          </div>
        ))}
      </div>

      {/* Mental health disorders */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--lavender)', textTransform: 'uppercase' }}>Mental Health Disorders Linked to Stress</span>
        </div>
        {mentalDisorders.map((d, i) => (
          <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', padding: '13px 20px', borderBottom: i < mentalDisorders.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{d.name}</div>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{d.link}</p>
          </div>
        ))}
      </div>

      {/* Physical disorders */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#e57373', textTransform: 'uppercase' }}>Physical Disorders Linked to Stress</span>
        </div>
        {physicalDisorders.map((d, i) => (
          <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', padding: '13px 20px', borderBottom: i < physicalDisorders.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{d.name}</div>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{d.link}</p>
          </div>
        ))}
      </div>

      <div className="iba-warning">
        <strong>When to seek professional help:</strong> Chronic or overwhelming stress that persists for weeks, disrupts sleep or relationships, or leads to substance use, panic attacks, or hopelessness warrants professional support. CBT is highly effective for stress-related anxiety and depression. Trauma-focused therapy (EMDR, somatic) is recommended for PTSD. Medication can support recovery when needed — there is no award for managing alone.
      </div>

      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Acute Stress Relief (works in minutes)</span>
        </div>
        {acuteTools.map((t, i) => (
          <div key={t.tool} style={rowStyle(i, acuteTools)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{t.tool}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t.how}</p>
          </div>
        ))}
      </div>

      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Chronic Stress Resilience (long-term)</span>
        </div>
        {chronicTools.map((t, i) => (
          <div key={t.tool} style={rowStyle(i, chronicTools)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{t.tool}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t.how}</p>
          </div>
        ))}
      </div>

      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>HRV — Reading Your Recovery</span>
        </div>
        {hrvMarkers.map((h, i) => (
          <div key={h.marker} style={rowStyle(i, hrvMarkers)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{h.marker}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{h.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   DAILY RITUALS
───────────────────────────────────────── */
function DailyRituals() {
  const rowStyle = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '200px 1fr',
    padding: '14px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
  });

  const morning = [
    { ritual: 'Hydration first', why: 'The body loses ~500ml of water overnight through breathing and sweating. Rehydrating before caffeine supports kidney function, cognitive clarity, and cortisol regulation.' },
    { ritual: 'Morning light (5–10 min)', why: 'Sunlight within 30–60 minutes of waking sets the circadian clock, anchors cortisol to the right time of day, and improves both alertness now and sleep quality later.' },
    { ritual: 'Meditation or prayer', why: 'Even 5–10 minutes of quiet reflection lowers cortisol, reduces amygdala reactivity, and creates a psychological anchor before external demands arrive.' },
    { ritual: 'Movement', why: 'Morning exercise raises dopamine and norepinephrine for 2–4 hours, improving focus and motivation. It also shifts the cortisol peak earlier — aligned with the body\'s natural rhythm.' },
    { ritual: 'Nutritious breakfast', why: 'Protein and fat in the morning stabilise blood sugar, support neurotransmitter production (especially serotonin and dopamine), and reduce cortisol-driven cravings later.' },
  ];

  const goalSetting = [
    { ritual: 'Daily planning (3–5 priorities)', why: 'Writing down specific tasks activates the prefrontal cortex and reduces cognitive load — the brain stops holding loose threads and can focus on execution.' },
    { ritual: 'Positive affirmations', why: 'Repeated intentional statements prime the reticular activating system (RAS) to notice aligned evidence and opportunities throughout the day, reinforcing the desired self-concept.' },
    { ritual: 'Identify your "one thing"', why: 'Single-tasking on the most important item each morning leverages peak prefrontal function and prevents the reactive drift of checking messages first.' },
  ];

  const daytime = [
    { ritual: 'Focused work blocks (25–50 min)', why: 'Ultradian rhythms cycle every ~90 minutes. Working in focused intervals followed by short breaks aligns with natural energy peaks rather than fighting the biology.' },
    { ritual: 'Regular breaks (5–10 min)', why: 'Short rest intervals restore focused attention, prevent decision fatigue, and allow the default mode network (DMN) to process and consolidate information.' },
    { ritual: 'Mindful breathing check-ins', why: 'A slow breath cycle (4–6 sec inhale, 6–8 sec exhale) activates the vagus nerve and shifts the autonomic nervous system toward calm within 60–90 seconds.' },
    { ritual: 'Time in nature (even brief)', why: 'Natural environments reduce cortisol, lower blood pressure, and restore directed-attention capacity — the type of focus used for work. Even a 5-minute walk outdoors helps.' },
    { ritual: 'Hydration throughout', why: 'A 1–2% drop in hydration causes measurable declines in mood, memory, and concentration. Keeping water accessible prevents the gradual cognitive fade that builds by afternoon.' },
  ];

  const evening = [
    { ritual: 'Daily reflection', why: 'Reviewing what went well and what to improve consolidates learning, builds self-efficacy, and creates psychological closure — reducing the ruminative thinking that disrupts sleep.' },
    { ritual: 'Screen unplugging (60–90 min before bed)', why: 'Blue light from screens suppresses melatonin for up to 2 hours. Unplugging also reduces cognitive arousal — the brain needs to downshift, not process more input.' },
    { ritual: 'Reading (physical or calm)', why: 'Reading fiction specifically reduces stress by 68% within 6 minutes (Cognitive Neuropsychology, 2009). It moves the brain from problem-solving mode into narrative absorption.' },
    { ritual: 'Gratitude practice', why: 'Writing 3 specific things to be grateful for activates the reward circuit, raises serotonin and dopamine, and ends the day in a positive emotional register that improves sleep onset.' },
    { ritual: 'Wind-down temperature drop', why: 'Core body temperature must fall ~1°C for sleep to initiate. A warm shower followed by a cooler room accelerates this process and improves sleep onset speed.' },
  ];

  const wellnessHabits = [
    { habit: 'Balanced diet', detail: 'Prioritise protein, healthy fats, complex carbohydrates, and micronutrient-rich vegetables. Each macro supports different neurotransmitter and hormone systems.' },
    { habit: '7–9 hours sleep', detail: 'Sleep is the non-negotiable foundation. Every other ritual compounds or collapses depending on sleep quality. Consistency of schedule matters as much as duration.' },
    { habit: 'Consistent hydration', detail: 'Aim for ~2–3L daily, adjusted for body weight and activity. Hydration affects energy, cognition, mood, and digestion — often before thirst signals arrive.' },
    { habit: 'Sunlight + darkness cycle', detail: 'Morning light and evening darkness regulate the entire circadian system, which governs hormones, metabolism, immune function, and mood across 24 hours.' },
  ];

  const growth = [
    { area: 'Dedicated learning time', how: 'Even 20–30 minutes of focused reading, a course, or a skill session compounds significantly over months. The key is consistency over intensity.' },
    { area: 'Creative or meaningful hobbies', how: 'Activities done for intrinsic enjoyment (not productivity) restore psychological energy, build resilience, and contribute to long-term life satisfaction.' },
    { area: 'Social connection', how: 'Quality connection with others is one of the strongest predictors of wellbeing, longevity, and stress recovery. Oxytocin released in genuine connection directly counters cortisol.' },
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Daily Rituals</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>The Architecture of a Good Day</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>Daily rituals are not productivity hacks — they are the biological and psychological conditions under which your best self can show up consistently.</p>
      </div>

      {/* Morning */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gold)', textTransform: 'uppercase' }}>☀ Morning Routine — Set the foundation</span>
        </div>
        {morning.map((r, i) => (
          <div key={r.ritual} style={rowStyle(i, morning)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{r.ritual}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.why}</p>
          </div>
        ))}
      </div>

      {/* Goal setting */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>◎ Goal Setting & Intention</span>
        </div>
        {goalSetting.map((r, i) => (
          <div key={r.ritual} style={rowStyle(i, goalSetting)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{r.ritual}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.why}</p>
          </div>
        ))}
      </div>

      {/* Daytime */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>◑ Daytime Rhythm — Sustain the state</span>
        </div>
        {daytime.map((r, i) => (
          <div key={r.ritual} style={rowStyle(i, daytime)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{r.ritual}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.why}</p>
          </div>
        ))}
      </div>

      {/* Evening */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>🌙 Evening Routine — Close the loop</span>
        </div>
        {evening.map((r, i) => (
          <div key={r.ritual} style={rowStyle(i, evening)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{r.ritual}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.why}</p>
          </div>
        ))}
      </div>

      {/* Health & Wellness */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>⬡ Health & Wellness Foundations</span>
        </div>
        {wellnessHabits.map((h, i) => (
          <div key={h.habit} style={rowStyle(i, wellnessHabits)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{h.habit}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{h.detail}</p>
          </div>
        ))}
      </div>

      {/* Personal Growth */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>✦ Personal Growth</span>
        </div>
        {growth.map((g, i) => (
          <div key={g.area} style={rowStyle(i, growth)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingRight: 16, paddingTop: 2 }}>{g.area}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{g.how}</p>
          </div>
        ))}
      </div>

      {/* Self-Care Practices */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>◈ Self-Care Practices</span>
        </div>

        {/* Face massage */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 10 }}>Facial Self-Massage</div>
          {[
            { benefit: 'Circulation & glow', detail: 'Gentle pressure stimulates blood flow, bringing oxygen and nutrients to the skin surface — the mechanism behind the natural flush after massage.' },
            { benefit: 'Muscle tension release', detail: 'The face holds considerable tension, especially the jaw (masseter), temples, and forehead. Releasing this reduces stress and can prevent tension headaches.' },
            { benefit: 'Lymphatic drainage', detail: 'Light outward strokes encourage lymph movement, reducing morning puffiness by clearing accumulated fluid from the tissue.' },
            { benefit: 'Product absorption', detail: 'Massage increases skin permeability temporarily — applying moisturiser or serum during massage improves how deeply active ingredients penetrate.' },
            { benefit: 'Skin tone & elasticity', detail: 'Stimulating facial muscles may improve tone and slow the sagging that comes from muscle atrophy. Similar to how body exercise maintains muscle, regular facial movement supports structure.' },
            { benefit: 'Headache relief', detail: 'Pressure on the temples, base of skull, and sinus points can interrupt tension headache pathways. Particularly effective for stress-driven headaches.' },
          ].map((r, i, arr) => (
            <div key={r.benefit} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--sage)' }}>{r.benefit}</div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.detail}</p>
            </div>
          ))}
        </div>

        {/* Cold showers */}
        <div style={{ padding: '12px 20px' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 10 }}>Cold Showers</div>
          {[
            { benefit: 'Mood & alertness', detail: 'Cold water triggers a large norepinephrine and dopamine release — studies show increases of 200–300% and 250% respectively. Creates a sharp, sustained lift in mood and focus.' },
            { benefit: 'Circulation', detail: 'Cold causes peripheral vasoconstriction followed by vasodilation on warming. This pumping action trains vascular responsiveness and improves overall circulation over time.' },
            { benefit: 'Immune resilience', detail: 'A Dutch study (Kox et al.) found cold shower practitioners had 29% fewer sick days. Repeated cold exposure trains the immune system\'s inflammatory response.' },
            { benefit: 'Recovery & muscle soreness', detail: 'Cold water reduces inflammation and metabolic waste products in muscle tissue. Widely used by athletes as a post-exercise recovery tool.' },
            { benefit: 'Mental resilience', detail: 'Voluntarily entering discomfort trains the prefrontal cortex to override the impulse to avoid. This tolerance transfers to other areas — it is a deliberate practice in discomfort tolerance.' },
            { benefit: 'Cortisol regulation', detail: 'Brief cold exposure raises cortisol acutely (a healthy stress response), but regular practice lowers baseline cortisol — similar to how exercise creates hormetic adaptation.' },
            { benefit: 'Skin & hair', detail: 'Cold water causes pores and hair cuticles to contract, reducing moisture loss from skin and adding shine and smoothness to hair. Hot water strips natural oils; cold preserves them.' },
          ].map((r, i, arr) => (
            <div key={r.benefit} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--blue)' }}>{r.benefit}</div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.detail}</p>
            </div>
          ))}
          <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.5 }}>Start: end your normal shower with 30–60 seconds of cold. Build to 2–3 minutes over weeks. People with cardiovascular conditions should consult a doctor first.</p>
        </div>

        {/* Sunlight */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 10 }}>Getting Sunlight</div>
          {[
            { benefit: 'Circadian anchoring', detail: 'Morning light (ideally within 30–60 min of waking) sets the circadian clock by suppressing residual melatonin and triggering the cortisol peak at the right time — improving energy now and sleep onset later.' },
            { benefit: 'Vitamin D synthesis', detail: 'UVB light triggers vitamin D production in the skin. Vitamin D supports immune function, bone health, mood regulation, and has receptors in virtually every tissue in the body.' },
            { benefit: 'Serotonin production', detail: 'Light — even on overcast days — stimulates serotonin release in the brain. Low light exposure in winter is the primary driver of Seasonal Affective Disorder (SAD).' },
            { benefit: 'Mood & alertness', detail: 'Bright light increases alertness and positive mood within minutes via the melanopsin cells in the retina. This pathway is distinct from vitamin D and works even in people with certain visual impairments.' },
            { benefit: 'Eye health', detail: 'Time outdoors in natural light is the strongest known preventive factor against myopia (short-sightedness) in children and young adults, likely through dopamine release in the retina.' },
          ].map((r, i, arr) => (
            <div key={r.benefit} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--gold)' }}>{r.benefit}</div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.detail}</p>
            </div>
          ))}
          <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.5 }}>Aim for 10–20 minutes of outdoor light in the morning. Avoid sunglasses during this window if safe — the light needs to reach the retina. Glass and most windows block the relevant UV wavelengths.</p>
        </div>

        {/* Smiling */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 10 }}>Smiling (Genuine & Deliberate)</div>
          {[
            { benefit: 'Facial feedback loop', detail: 'The act of smiling — even deliberately — activates the same neural circuits as genuine happiness. The brain reads muscle position as emotional information and adjusts mood accordingly (Strack et al., replicated 2019).' },
            { benefit: 'Endorphin & serotonin release', detail: 'Smiling triggers the release of endorphins, natural pain relievers, and serotonin — mood-supporting neurotransmitters that create a mild but measurable lift even from a brief smile.' },
            { benefit: 'Cortisol reduction', detail: 'Studies show that even a maintained smile during a stressful task reduces heart rate recovery time and cortisol elevation — the body responds to the facial signal as a cue that safety is present.' },
            { benefit: 'Social contagion', detail: 'Smiling is neurologically contagious — mirror neurons in observers automatically activate the same facial muscles. A smile tends to generate a smile back, creating a positive social feedback loop.' },
            { benefit: 'Perspective shift', detail: 'Deliberately choosing to smile during a neutral or mild negative moment can interrupt rumination. It is a physical state change that slightly shifts the emotional register.' },
          ].map((r, i, arr) => (
            <div key={r.benefit} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--lavender)' }}>{r.benefit}</div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.detail}</p>
            </div>
          ))}
        </div>

        {/* Practising Om */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 10 }}>Practising Om (Chanting)</div>
          {[
            { benefit: 'Vagus nerve activation', detail: 'The extended exhale and vocal resonance of Om chanting directly stimulates the vagus nerve, shifting the nervous system from sympathetic (activation) to parasympathetic (rest). Measurable heart rate and cortisol reduction follow.' },
            { benefit: 'Meditative state induction', detail: 'Sustained focus on the vibration and sound of Om occupies the mind\'s attention circuits — interrupting thought loops and producing brainwave patterns consistent with meditation (increased alpha and theta waves).' },
            { benefit: 'Limbic system calming', detail: 'Research using fMRI shows that Om chanting deactivates the amygdala and limbic system — the brain\'s threat and emotion centres — more effectively than a control sound (ssss), suggesting something specific to the resonant quality.' },
            { benefit: 'Breath regulation', detail: 'Om practice naturally lengthens the exhale relative to the inhale, which is one of the most effective breathing patterns for activating the parasympathetic response and reducing anxiety.' },
            { benefit: 'Vibration & body awareness', detail: 'The physical resonance of Om is felt in the chest, throat, and skull. Tuning attention to this sensation builds interoception — awareness of the body\'s internal state — which is associated with better emotional regulation.' },
          ].map((r, i, arr) => (
            <div key={r.benefit} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--sage)' }}>{r.benefit}</div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{r.detail}</p>
            </div>
          ))}
          <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.5 }}>Practice: sit comfortably, take a deep breath, and on the exhale produce a sustained "Aum" — the A rises from the belly, the U moves through the chest, the M vibrates through the lips and skull. 3–5 rounds takes under 2 minutes.</p>
        </div>
      </div>

      <div className="iba-card" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.18)' }}>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--gold)' }}>The compound effect:</strong> No single ritual transforms a life. What works is the accumulation — consistent small actions that align biology, mindset, and behaviour in the same direction over time. Start with one block and build from there.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERBS & ADAPTOGENS
───────────────────────────────────────── */
function HerbsAdaptogens() {
  const rowStyle = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '180px 1fr 1fr',
    padding: '14px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
    gap: 16,
  });

  const herbs = [
    {
      name: 'St. John\'s Wort',
      type: 'Herb',
      commonUse: 'Often used to support mild to moderate low mood.',
      notes: 'Can interact seriously with many medications — including antidepressants (risk of serotonin syndrome) and hormonal contraceptives (reduced effectiveness). Do not use alongside prescription medication without medical advice.',
      caution: true,
    },
    {
      name: 'Ashwagandha',
      type: 'Adaptogen',
      commonUse: 'Commonly used to support stress resilience, relaxation, sleep quality, and anxiety balance.',
      notes: 'Well-researched adaptogen with a generally good safety profile. May lower thyroid hormone levels — consult a doctor if you have thyroid conditions. Avoid in pregnancy.',
      caution: false,
    },
    {
      name: 'Rhodiola Rosea',
      type: 'Adaptogen',
      commonUse: 'Often used for fatigue, stress, mental performance, energy, and mood support.',
      notes: 'Evidence is promising but still mixed. May cause mild stimulating effects — best taken in the morning. Generally well-tolerated at standard doses.',
      caution: false,
    },
    {
      name: 'Chamomile',
      type: 'Herb',
      commonUse: 'Commonly used for calmness, relaxation, sleep, and mild anxiety support.',
      notes: 'Research suggests possible benefit, though findings are not fully conclusive. Very well-tolerated. May interact with blood-thinning medications at high doses. Avoid if allergic to plants in the daisy family.',
      caution: false,
    },
    {
      name: 'Lavender',
      type: 'Herb / Aromatherapy',
      commonUse: 'Often used in aromatherapy and supplements for relaxation, stress, sleep, and anxiety support.',
      notes: 'Some studies suggest benefit, though evidence has limits. Oral supplements (e.g. Silexan) have better evidence than aromatherapy alone. Generally safe for most adults.',
      caution: false,
    },
    {
      name: 'Lemon Balm',
      type: 'Herb',
      commonUse: 'Commonly used for nervousness, calmness, sleep quality, and mood support.',
      notes: 'Newer reviews suggest it may have calming and anti-anxiety effects. Well-tolerated. May enhance sedative effects of medications — use with care if taking sleep aids.',
      caution: false,
    },
    {
      name: 'Passionflower',
      type: 'Herb',
      commonUse: 'Traditionally used for anxiety, restlessness, and sleep support.',
      notes: 'Evidence is limited but generally encouraging for short-term use. May cause drowsiness or dizziness — avoid before driving. May interact with sedative medications.',
      caution: false,
    },
    {
      name: 'Ginkgo Biloba',
      type: 'Herb',
      commonUse: 'More commonly linked with memory, circulation, and cognitive support than mood.',
      notes: 'Evidence for major cognitive benefits is not conclusive. May interact with blood thinners and some antidepressants. Not recommended before surgery. Less directly mood-focused than others on this list.',
      caution: false,
    },
  ];

  const adaptogens = [
    { name: 'Ashwagandha', mechanism: 'Regulates cortisol and HPA-axis stress response. Shown to reduce cortisol levels and improve stress resilience in clinical trials.' },
    { name: 'Rhodiola Rosea', mechanism: 'Modulates stress hormones and supports mitochondrial energy production. May reduce fatigue-related cognitive decline.' },
    { name: 'Holy Basil (Tulsi)', mechanism: 'Anti-stress and anti-anxiety properties; supports adrenal function and may lower cortisol. Used in Ayurvedic medicine.' },
    { name: 'Eleuthero (Siberian Ginseng)', mechanism: 'Supports physical and mental endurance under stress. May improve immune function and reduce fatigue.' },
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Herbs & Adaptogens</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>Plants for Mood, Stress & Emotional Balance</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 580 }}>These herbs are commonly used to support mood, relaxation, stress balance, sleep, and emotional well-being. They are not replacements for medical treatment — they are tools with varying levels of evidence and real safety considerations.</p>
      </div>

      {/* Safety notice */}
      <div className="iba-warning">
        <strong>Safety note:</strong> Several herbs on this list interact with prescription medications — especially antidepressants, blood thinners, sedatives, and hormonal contraceptives. Always check interactions with a pharmacist or doctor before combining herbs with any medication. This page is educational, not medical advice.
      </div>

      {/* Herb table */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 16 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Herb</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Common Use</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>What to Know</span>
        </div>
        {herbs.map((h, i) => (
          <div key={h.name} style={rowStyle(i, herbs)}>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)' }}>{h.name}</div>
              <div style={{ fontSize: '0.74rem', color: h.caution ? '#e57373' : 'var(--sage)', marginTop: 3, fontWeight: 600 }}>{h.type}{h.caution ? ' · ⚠ interactions' : ''}</div>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{h.commonUse}</p>
            <p style={{ margin: 0, fontSize: '0.84rem', color: h.caution ? 'rgba(229,115,115,0.9)' : 'var(--muted)', lineHeight: 1.6 }}>{h.notes}</p>
          </div>
        ))}
      </div>

      {/* Adaptogens deeper */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>How Adaptogens Work</span>
        </div>
        {adaptogens.map((a, i) => (
          <div key={a.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '14px 20px', borderBottom: i < adaptogens.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 16 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{a.name}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{a.mechanism}</p>
          </div>
        ))}
      </div>

      {/* Guidance card */}
      <div className="iba-card" style={{ background: 'rgba(91,191,181,0.06)', border: '1px solid rgba(91,191,181,0.18)' }}>
        <h4 style={{ margin: '0 0 10px', color: 'var(--sage)', fontFamily: 'Georgia, serif', fontWeight: 500 }}>How to approach herbal support</h4>
        <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>Start with one herb at a time so you can clearly observe any effect or reaction.</li>
          <li style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>Quality matters — choose standardised extracts from reputable brands where possible.</li>
          <li style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>Herbs work best alongside — not instead of — sleep, nutrition, movement, and stress management.</li>
          <li style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>Persistent low mood, anxiety, or sleep problems deserve proper evaluation, not just herbal management.</li>
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HAIR & SCALP HEALTH
───────────────────────────────────────── */
function HairHealth() {
  const row2 = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '170px 1fr 1fr',
    padding: '13px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
    gap: 14,
  });
  const row1 = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '190px 1fr',
    padding: '13px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
    gap: 14,
  });

  const nutrients = [
    { name: 'Protein', role: 'Hair is made of keratin. Without enough dietary protein, growth slows and strands weaken. Severe deficiency causes thinning and shedding.', sources: 'Lean meats, poultry, fish, eggs, dairy, legumes — include a source at every meal.' },
    { name: 'Iron', role: 'Helps red blood cells carry oxygen to follicles. Iron deficiency is a leading cause of hair loss, especially in women. Correcting low ferritin often reduces excess shedding.', sources: 'Red meat, poultry, seafood, spinach, lentils. Pair plant sources with vitamin C to improve absorption.' },
    { name: 'Vitamin D', role: 'Receptors in hair follicles depend on vitamin D. Lower levels are consistently found in people with hair loss conditions. May help regulate the growth cycle.', sources: 'Fatty fish, fortified foods, sensible sun exposure, or supplementation if tested deficient.' },
    { name: 'Biotin (B7)', role: 'Deficiency causes hair loss and brittle nails — well established. However, true deficiency is uncommon and extra biotin has no proven benefit in people who are not deficient.', sources: 'Eggs (cooked), nuts, whole grains, vegetables. Avoid excess raw egg whites — avidin blocks biotin absorption.' },
    { name: 'Omega-3 Fatty Acids', role: 'Anti-inflammatory fats that support scalp and follicle health. Deficiency leads to hair and eyebrow loss. One study found omega-3 supplementation reduced shedding and increased density in women.', sources: 'Salmon, mackerel, sardines, flaxseeds, chia seeds, walnuts.' },
    { name: 'Zinc', role: 'Required for protein synthesis and cell division in follicles. Deficiency causes hair loss that improves with zinc supplementation. Excess zinc can interfere with other minerals — avoid high-dose supplements.', sources: 'Oysters (very high), red meat, pumpkin seeds, nuts, beans.' },
    { name: 'Vitamin C', role: 'Essential for collagen production and iron absorption from plant foods. Deficiency weakens hair shafts. Also protects follicles from oxidative stress.', sources: 'Citrus fruits, berries, kiwi, papaya, bell peppers, broccoli.' },
    { name: 'Vitamin A', role: 'Supports cell growth and sebum production for scalp moisture. Both deficiency (dry hair) and excess (hair loss) are problems. Get it from food, not high-dose supplements.', sources: 'Sweet potatoes, carrots, spinach — these provide beta-carotene, which the body converts as needed.' },
    { name: 'Vitamin E & Antioxidants', role: 'Neutralise oxidative damage in scalp tissue. Small trials show vitamin E supplementation can increase hair count in people with hair loss. Megadoses can be harmful — food sources are safer.', sources: 'Almonds, sunflower seeds, avocados, spinach, green tea.' },
    { name: 'Selenium', role: 'Trace mineral needed for follicle function and antioxidant enzymes. Deficiency and excess both cause hair loss — keep intake balanced.', sources: 'Brazil nuts (very high — 1–2 per day is enough), fish, eggs, whole grains.' },
  ];

  const foods = [
    { food: 'Fatty fish (salmon, sardines, mackerel)', nutrients: 'Omega-3s, vitamin D, protein, B vitamins, iron', why: 'Anti-inflammatory fats linked to improved hair density and reduced shedding. Aim for 2 servings per week.' },
    { food: 'Eggs', nutrients: 'Protein, biotin, zinc, selenium', why: 'One of the most complete hair foods — delivers keratin building blocks and follicle-supporting minerals in one package. Eat cooked, not raw.' },
    { food: 'Leafy greens (spinach, kale)', nutrients: 'Iron, folate, vitamin C, beta-carotene', why: 'Iron oxygenates follicles, vitamin C builds collagen, and beta-carotene becomes vitamin A to regulate sebum. Aim for a daily serving.' },
    { food: 'Nuts & seeds (almonds, walnuts, flaxseeds, sunflower seeds)', nutrients: 'Vitamin E, zinc, selenium, omega-3s, B vitamins', why: 'Broad spectrum of antioxidants and healthy fats. Just 1 oz almonds covers ~50% of daily vitamin E. Easy daily snack.' },
    { food: 'Beans & lentils', nutrients: 'Plant protein, iron, zinc, biotin', why: 'Budget-friendly way to prevent iron, zinc, and biotin deficiencies that directly cause hair loss. Pair with vitamin C foods for better iron absorption.' },
    { food: 'Berries & citrus', nutrients: 'Vitamin C, antioxidants, folate', why: 'Vitamin C is required for collagen synthesis and doubles iron absorption from plant meals. Antioxidants defend follicles from free radical damage.' },
    { food: 'Sweet potatoes & carrots', nutrients: 'Beta-carotene (→ vitamin A), fibre', why: 'A medium sweet potato can exceed 100% of daily vitamin A needs safely — the body regulates beta-carotene conversion, making overdose impossible from food.' },
    { food: 'Soybeans & legumes', nutrients: 'Protein, spermidine, iron, zinc', why: 'Spermidine (abundant in soybeans) has shown promise in prolonging the active hair growth phase in early research.' },
    { food: 'Greek yogurt & dairy', nutrients: 'Protein, B5 (pantothenic acid), calcium', why: 'B5 is linked to hair thickness and follicle health. Protein from dairy provides complete amino acids for keratin production.' },
    { food: 'Oysters', nutrients: 'Zinc (extremely high), protein, iron', why: 'The single richest food source of zinc. One or two oysters can meet daily zinc needs — important for follicle cell turnover.' },
  ];

  const avoid = [
    { item: 'Excess sugar & refined carbs', why: 'Spikes blood sugar and insulin, may raise androgen levels and inflame follicles. High-glycemic diets linked to accelerated hair thinning in susceptible people. Swap for whole grains, sweet potatoes, beans.' },
    { item: 'High-mercury fish (swordfish, shark, king mackerel, excess albacore tuna)', why: 'Mercury accumulates in the body and has been linked to hair loss in case reports. Choose low-mercury fish: salmon, sardines, trout, light tuna, tilapia, shrimp.' },
    { item: 'Crash diets & severe calorie restriction', why: 'Starving the body pushes hair into a resting/shedding phase (telogen effluvium). Sudden hair loss 1–2 months after a very low-calorie diet is a well-documented clinical pattern. Lose weight gradually with adequate protein.' },
    { item: 'Skipping meals / low-protein breakfast', why: 'One study found people with hair loss who skipped breakfast or ate low-protein breakfasts had worse follicle structure. Follicles need a steady nutrient supply — going long periods without protein starves them.' },
    { item: 'High-dose supplement megadosing', why: 'Vitamin A above ~10,000 IU/day causes hair loss. Selenium overdose causes hair loss. Excess zinc disrupts other minerals. More is not better. Correct confirmed deficiencies; don\'t guess-and-supplement.' },
    { item: 'Fried foods & trans fats', why: 'May increase scalp oil production and inflammation. Also displaces nutrient-dense foods from the diet. Bake, grill, or sauté in olive oil instead.' },
    { item: 'Smoking', why: 'Constricts blood vessels supplying the scalp, generates free radicals that damage follicles. Research shows higher hair loss rates in smokers.' },
    { item: 'Heavy alcohol consumption', why: 'Depletes zinc, folate, and protein — all essential for hair. Also impairs liver function which affects nutrient metabolism.' },
  ];

  const steps = [
    'Include a protein source at every meal — eggs, fish, legumes, dairy, or lean meat.',
    'Eat fatty fish (salmon, sardines) twice a week for omega-3s and vitamin D.',
    'Have at least one serving of leafy greens daily — spinach, kale, or similar.',
    'Snack on nuts and seeds for vitamin E, zinc, and healthy fats.',
    'Pair plant iron sources with vitamin C foods at the same meal to maximise absorption.',
    'Avoid crash dieting — steady, balanced eating keeps hair in its growth phase.',
    'If experiencing unexplained hair loss, test for iron, ferritin, vitamin D, and thyroid function before buying supplements.',
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Hair & Scalp Health</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>Growing Strong Hair from the Inside</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 580 }}>Hair follicles are among the most metabolically active cells in the body. They require a consistent supply of protein, vitamins, and minerals to produce healthy strands. Diet is one of the most modifiable factors in hair health.</p>
      </div>

      <div className="iba-warning">
        <strong>Important:</strong> Hair grows approximately 1 cm per month. Changes from diet won't be visible immediately — consistent nutrition over several months creates the conditions for visible improvement. Persistent or sudden hair loss warrants medical evaluation, not just dietary adjustment.
      </div>

      {/* Key Nutrients */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'grid', gridTemplateColumns: '170px 1fr 1fr', gap: 14 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Nutrient</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Why it matters</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Food sources</span>
        </div>
        {nutrients.map((n, i) => (
          <div key={n.name} style={row2(i, nutrients)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{n.name}</div>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{n.role}</p>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--sage)', lineHeight: 1.6 }}>{n.sources}</p>
          </div>
        ))}
      </div>

      {/* Best foods */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'grid', gridTemplateColumns: '210px 1fr 1fr', gap: 14 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Food</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Key nutrients</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Why it helps</span>
        </div>
        {foods.map((f, i) => (
          <div key={f.food} style={{ display: 'grid', gridTemplateColumns: '210px 1fr 1fr', padding: '13px 20px', borderBottom: i < foods.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{f.food}</div>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--blue)', lineHeight: 1.6 }}>{f.nutrients}</p>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.why}</p>
          </div>
        ))}
      </div>

      {/* What to avoid */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Avoid or Limit</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Why it harms hair</span>
        </div>
        {avoid.map((a, i) => (
          <div key={a.item} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', padding: '13px 20px', borderBottom: i < avoid.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e57373', paddingTop: 2 }}>{a.item}</div>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{a.why}</p>
          </div>
        ))}
      </div>

      {/* Diet pattern note */}
      <div className="iba-card" style={{ background: 'rgba(91,191,181,0.06)', border: '1px solid rgba(91,191,181,0.18)' }}>
        <h4 style={{ margin: '0 0 10px', color: 'var(--sage)', fontFamily: 'Georgia, serif', fontWeight: 500 }}>The Mediterranean diet connection</h4>
        <p style={{ margin: '0 0 8px', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7 }}>A 2020 review of 24 studies found that anti-inflammatory, whole-food dietary patterns are associated with better hair outcomes. Men who ate a Mediterranean-style diet (high in vegetables, herbs, legumes, and olive oil) had around 56% lower odds of androgenetic alopecia in one study.</p>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7 }}>The mechanism: high antioxidant and omega-3 intake reduces follicle-damaging inflammation. The same diet pattern recommended for heart and skin health is the best one for hair.</p>
      </div>

      {/* Action steps */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gold)', textTransform: 'uppercase' }}>◎ Actionable Steps</span>
        </div>
        {steps.map((s, i) => (
          <div key={i} style={row1(i, steps)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gold)', paddingTop: 2 }}>Step {i + 1}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   GRATITUDE PRACTICE
───────────────────────────────────────── */
function GratitudePractice() {
  const rowStyle = (i, arr) => ({
    display: 'grid', gridTemplateColumns: '200px 1fr',
    padding: '13px 20px',
    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
    gap: 14,
  });

  const science = [
    { finding: 'Raises serotonin and dopamine', detail: 'Consciously counting blessings activates the brain\'s reward circuits. Studies by Dr. Robert Emmons (UC Davis) found that people who wrote weekly gratitude lists reported higher positive affect and life satisfaction than control groups.' },
    { finding: 'Reduces cortisol', detail: 'A 2015 study found that gratitude journaling before sleep lowered cortisol levels and improved sleep quality. Even brief gratitude reflection shifts the autonomic nervous system toward parasympathetic (rest) mode.' },
    { finding: 'Rewires the negativity bias', detail: 'The brain is wired to prioritise threats over positives. Regular gratitude practice literally builds new neural pathways that make positive recognition faster and more automatic over time.' },
    { finding: 'Improves relationships', detail: 'Expressing gratitude to others strengthens social bonds, increases oxytocin, and creates a positive feedback loop — grateful people receive more warmth, which generates more gratitude.' },
    { finding: 'Linked to better sleep', detail: 'Spending 15 minutes writing what you\'re grateful for before bed reduces pre-sleep worry and increases sleep duration and quality, particularly in people with anxiety tendencies.' },
    { finding: 'Reduces symptoms of depression', detail: 'Multiple randomised controlled trials show gratitude interventions (letters, journals, mental reflection) produce measurable reductions in depressive symptoms, even weeks after the practice ends.' },
    { finding: 'Builds psychological resilience', detail: 'Gratitude is one of the strongest predictors of post-traumatic growth. People who can find meaning or appreciation even in difficult circumstances recover faster and report higher long-term wellbeing.' },
  ];

  const practices = [
    { name: 'Gratitude journal (3 specifics)', how: 'Each day — ideally at the same time — write down three specific things you are grateful for. Specificity matters more than quantity. "I am grateful for the warmth of my coffee this morning" is more effective than "I am grateful for my life."', timing: 'Morning or before bed' },
    { name: 'Gratitude letter', how: 'Write a detailed letter to someone who has positively impacted your life and whom you\'ve never fully thanked. The act of writing it — even if never sent — produces significant emotional benefit. Reading it aloud to the person amplifies the effect substantially.', timing: 'Weekly or monthly' },
    { name: 'Mental subtraction', how: 'Imagine your life without something or someone you value — a relationship, a skill, a moment. Notice the absence, then return to the presence. This resets hedonic adaptation and makes ordinary things feel extraordinary again.', timing: 'Any time' },
    { name: 'Savouring', how: 'Slow down and fully attend to a positive experience as it happens — a meal, a conversation, sunlight. Research shows that extending your attention on positive moments increases their emotional impact significantly.', timing: 'Throughout the day' },
    { name: 'Gratitude meditation', how: 'Sit quietly and bring to mind something you appreciate. Hold it in awareness and let the feeling expand through your body. Move to another. This is different from journaling — it builds the felt sense of gratitude rather than just the cognitive recognition.', timing: '5–10 min, morning or evening' },
    { name: 'Gratitude in relationships', how: 'Verbally express specific appreciation to people in your life regularly. "Thank you for listening when I was stressed yesterday" lands differently than a general thank-you. This practice builds the relationship and reinforces your own gratitude habit.', timing: 'Daily' },
    { name: 'Reframe challenge as teacher', how: 'When facing difficulty, ask: what might this situation be teaching me? What can I be grateful for even here? This does not mean denying pain — it means looking for meaning alongside it.', timing: 'During hard moments' },
  ];

  const mistakes = [
    { mistake: 'Forcing positivity', why: 'Gratitude is not about pretending everything is fine. It coexists with grief, frustration, and difficulty. Toxic positivity — using gratitude to bypass real emotions — undermines the practice and erodes trust in it.' },
    { mistake: 'Being too vague', why: '"I\'m grateful for my family" every day loses its impact through repetition. The brain habituates quickly. Specificity ("I\'m grateful that my sister called to check in this morning") keeps the practice alive and meaningful.' },
    { mistake: 'Treating it as a chore', why: 'Gratitude journaled mechanically without genuine feeling produces little benefit. The emotional engagement is the active ingredient — going through the motions without feeling the appreciation misses the point.' },
    { mistake: 'Only practising when things are good', why: 'The highest-leverage time to practise gratitude is during difficulty. Gratitude during hard times builds resilience; gratitude only when things are easy stays a fair-weather habit.' },
    { mistake: 'Comparing your gratitude list to others', why: 'Gratitude is not competitive. There is no threshold of hardship you must cross before you are "allowed" to be grateful. What matters is your genuine relationship to your own life.' },
  ];

  const deepening = [
    ['Appreciate the ordinary', 'Most of life happens in unremarkable moments — a glass of water, the ability to breathe, a working body. Training attention on the mundane produces the richest long-term returns.'],
    ['Let gratitude become a lens, not a list', 'The goal is not a daily checklist but a shift in orientation — moving from scanning for what is wrong (the brain\'s default) to also noticing what is working, what is given, what is beautiful.'],
    ['Connect gratitude to values', 'When you are grateful for what actually matters to you — not what you think should matter — the practice becomes grounding. It clarifies what your life is actually built around.'],
    ['Pair with giving', 'Gratitude that stays internal reaches a ceiling. When it flows outward — into generosity, service, expressed appreciation — it compounds and creates the conditions for more.'],
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Gratitude Practice</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>The Practice of Noticing What Is Good</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 580 }}>Gratitude is not a personality trait — it is a trainable skill. Research consistently shows that deliberate gratitude practice changes brain structure, improves mood, strengthens relationships, and builds the kind of resilience that sustains wellbeing over time.</p>
      </div>

      {/* Science */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>What the Research Shows</span>
        </div>
        {science.map((s, i) => (
          <div key={s.finding} style={rowStyle(i, science)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{s.finding}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Practices */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'grid', gridTemplateColumns: '200px 1fr 100px', gap: 14 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Practice</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>How to do it</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>When</span>
        </div>
        {practices.map((p, i) => (
          <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 100px', padding: '13px 20px', borderBottom: i < practices.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', gap: 14 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', paddingTop: 2 }}>{p.name}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p.how}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--gold)', lineHeight: 1.5, fontStyle: 'italic' }}>{p.timing}</p>
          </div>
        ))}
      </div>

      {/* Counting Blessings */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(216,169,72,0.22)' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(216,169,72,0.08)', borderBottom: '1px solid rgba(216,169,72,0.15)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gold)', textTransform: 'uppercase' }}>Counting Blessings — A Structured Practice</span>
        </div>
        <div style={{ padding: '16px 20px', display: 'grid', gap: 16 }}>
          <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.65 }}>
            Counting blessings is the deliberate, domain-by-domain practice of naming specific gifts in your life. Unlike a general gratitude list, it moves through different areas — body, relationships, material provision, growth — so nothing is overlooked and hedonic adaptation is resisted.
          </p>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>How to do it</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                ['1. Set aside a quiet moment', 'Morning after waking or last thing before sleep work best — the mind is quieter and more receptive at these thresholds.'],
                ['2. Move through life domains', 'Health & body · Senses · Relationships & people · Home & material provision · Work or purpose · Spiritual life · Lessons and growth from difficulties.'],
                ['3. Name at least one specific blessing per domain', 'The specificity is the practice. "I am grateful that my legs carried me up the stairs today" beats "I am grateful for my health." Specificity prevents the list becoming automatic noise.'],
                ['4. Add the why', 'For each blessing, note why it matters: "… because it means I am able to be present with my family." The why connects the blessing to your actual values.'],
                ['5. Sit with the feeling', 'After writing, pause for 10–15 seconds on each item. Let the feeling of appreciation register in the body, not just the mind. This is what builds the neural pathway.'],
                ['6. Close with one blessing from difficulty', 'End by naming something you are grateful for even in a current challenge. This is the hardest and highest-return step.'],
              ].map(([step, detail]) => (
                <div key={step} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1.4 }}>{step}</div>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>{detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: 'rgba(216,169,72,0.06)', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>What to count</div>
              {['Your senses and what they receive', 'People who love or support you', 'Freedoms you enjoy daily', 'Skills and talents you have developed', 'Past hardships you survived', 'Small pleasures of the day', 'Your capacity to grow and change'].map(item => (
                <div key={item} style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: 4 }}>• {item}</div>
              ))}
            </div>
            <div style={{ background: 'rgba(100,140,100,0.06)', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sage)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Signs it is working</div>
              {['You notice good things during the day unprompted', 'Small irritations lose their grip faster', 'You feel fuller after fewer items', 'You begin counting without needing to write', 'Difficulties feel less absolute', 'You feel a spontaneous urge to give or express appreciation'].map(item => (
                <div key={item} style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: 4 }}>• {item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common mistakes */}
      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>What Weakens the Practice</span>
        </div>
        {mistakes.map((m, i) => (
          <div key={m.mistake} style={rowStyle(i, mistakes)}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e57373', paddingTop: 2 }}>{m.mistake}</div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{m.why}</p>
          </div>
        ))}
      </div>

      {/* Deepening */}
      <div className="iba-card" style={{ background: 'rgba(216,169,72,0.06)', border: '1px solid rgba(216,169,72,0.18)' }}>
        <h4 style={{ margin: '0 0 14px', color: 'var(--gold)', fontFamily: 'Georgia, serif', fontWeight: 500 }}>Taking it deeper</h4>
        <div style={{ display: 'grid', gap: 12 }}>
          {deepening.map(([title, body]) => (
            <div key={title}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--deep)', marginBottom: 4 }}>{title}</div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function InnerBalanceAtlas({ onBack, onNavigate, onSelectSection, activeSectionId, initialSection }) {
  const validInitial = tabs.some((t) => t.id === initialSection) ? initialSection : 'dashboard';
  const [activeTab, setActiveTab] = useState(validInitial);
  const sectionTitle = {
    'nervous-system': 'Nervous System Atlas',
    'mood-neurochemistry': 'Mood & Neurochemistry',
    lifestyle: 'Lifestyle Inputs',
  }[activeSectionId] || 'Mind, Body & Spirit';

  const content = {
    dashboard:        <Dashboard />,
    psychophysiology: <PsychophysiologyMap />,
    neurotransmitters:<Neurotransmitters />,
    mooduplift:       <MoodUplift />,
    physicalactivity: <PhysicalActivity />,
    sleep:            <Sleep />,
    nutrition:        <Nutrition />,
    stress:           <StressRecovery />,
    dailyrituals:     <DailyRituals />,
    herbs:            <HerbsAdaptogens />,
    hair:             <HairHealth />,
    gratitude:        <GratitudePractice />,
  };

  return (
    <div className="iba">
      <InnerAtlasNav activeId={activeSectionId} onBack={onBack} onSelectSection={onSelectSection} title={sectionTitle} />
      <div className="iba-topbar" style={{ display: 'none' }}>
        <button className="iba-back-btn" onClick={onBack}>← Back</button>
        <span className="iba-topbar-title">InnerAtlas</span>
        <span className="iba-topbar-sub">· Mind, Body &amp; Spirit</span>
        {onNavigate && (
          <button
            className="iba-topbar-link"
            onClick={() => onNavigate('inneratlas', { section: 'psychology' })}
            aria-label="Open Psychology Atlas"
          >
            <span aria-hidden="true">◈</span> Psychology Atlas →
          </button>
        )}
      </div>

      {/* Mobile tab selector — sidebar is hidden below 900px */}
      <div className="iba-mobile-nav">
        <select
          aria-label="Select section"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabGroups.map(group => (
            <optgroup key={group.group} label={group.group}>
              {group.items.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.icon} {tab.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="iba-body">
        <aside className="iba-sidebar">
          <div className="iba-logo">
            <div className="iba-logo-icon">◍</div>
            <div className="iba-logo-text">
              <span className="iba-logo-name">InnerAtlas</span>
            </div>
          </div>

          {tabGroups.map(group => (
            <div key={group.group} className="iba-nav-group">
              <div className="iba-nav-group-label">{group.group}</div>
              {group.items.map(tab => (
                <button
                  key={tab.id}
                  className={`iba-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="iba-nav-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          ))}

          <div className="iba-intention">
            <strong>Daily Intention</strong>
            I choose balance, awareness and compassion.
          </div>

          {onNavigate && (
            <button
              className="iba-crosslink-btn"
              onClick={() => onNavigate('inneratlas', { section: 'psychology' })}
            >
              <span className="iba-crosslink-icon">◈</span>
              <div>
                <div className="iba-crosslink-title">Psychology Atlas</div>
                <div className="iba-crosslink-sub">Explore the frameworks side →</div>
              </div>
            </button>
          )}
        </aside>

        <main className="iba-main">
          {content[activeTab]}
        </main>
      </div>
    </div>
  );
}
