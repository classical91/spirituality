import { useState } from 'react';
import './InnerBalanceAtlas.css';

const tabs = [
  { id: 'dashboard',        icon: '⌂', label: 'Dashboard' },
  { id: 'psychophysiology', icon: '◍', label: 'Psychophysiology Map' },
  { id: 'neurotransmitters',icon: '⌁', label: 'Neurotransmitters' },
  { id: 'mooduplift',       icon: '◑', label: 'Mood Uplift' },
  { id: 'physicalactivity', icon: '◈', label: 'Physical Activity' },
  { id: 'mindbodyspirit',   icon: '◎', label: 'Mind-Body-Spirit' },
  { id: 'journal',          icon: '✦', label: 'Journal' },
];

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
  const balanceLegend = [
    { label: 'Nervous System',    val: 84, color: 'var(--sage)' },
    { label: 'Neurotransmitters', val: 78, color: 'var(--blue)' },
    { label: 'Emotions',          val: 81, color: 'var(--lavender)' },
    { label: 'Lifestyle',         val: 86, color: 'var(--gold)' },
    { label: 'Spiritual Align.',  val: 83, color: '#5bbfb5' },
  ];
  const tools = [
    { icon: '〜', name: 'Breathing', sub: '4-7-8 · 4 min' },
    { icon: '◎', name: 'Hydration', sub: '8 glasses goal' },
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

      {/* Whole-System Map + Today's Balance */}
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
            <h3>Today's Balance <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>ⓘ</span></h3>
            <div className="iba-balance-ring">
              <div className="iba-balance-ring-inner">
                <div>
                  <div className="iba-balance-score">82</div>
                  <div className="iba-balance-label">Good Balance</div>
                </div>
              </div>
            </div>
            <div className="iba-balance-legend">
              {balanceLegend.map(r => (
                <div className="iba-balance-row" key={r.label}>
                  <div className="iba-balance-dot" style={{ background: r.color }} />
                  <span className="iba-balance-name">{r.label}</span>
                  <span className="iba-balance-val">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="iba-card" style={{ background: 'linear-gradient(135deg, rgba(122,171,121,0.12), rgba(216,169,72,0.08))', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            <span style={{ fontSize: 16 }}>🌿</span>
            <p style={{ margin: '6px 0 0' }}><em>You're doing great. Small daily choices create lasting change.</em></p>
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
function PhysicalActivity() {
  const activities = [
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
      name: 'Yoga / Stretching', icon: '🧘',
      benefits: [
        'Reduces cortisol and activates the parasympathetic nervous system',
        'Improves flexibility, balance, and joint health',
        'Relieves chronic back pain and muscle tension',
        'Enhances body awareness and mind-body connection',
        'Shown to lower blood pressure and improve sleep quality',
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
      name: 'Breathwork', icon: '🌬️',
      benefits: [
        'Activates the vagus nerve, calming the nervous system',
        'Lowers blood pressure within minutes of practice',
        'Improves oxygen-CO₂ balance and lung efficiency',
        'Reduces panic, anxiety, and stress acutely',
        'Improves sleep when practiced before bed',
      ],
    },
  ];

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Physical Activity</div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 500, color: 'var(--deep)', lineHeight: 1.15 }}>Health Benefits by Practice</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>Evidence-based benefits of ten key physical practices — the body as the foundation of inner balance.</p>
      </div>

      <div className="iba-card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '200px 1fr',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.03)',
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Practice</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>Health Benefits</span>
        </div>

        {activities.map((activity, i) => (
          <div
            key={activity.name}
            style={{
              display: 'grid', gridTemplateColumns: '200px 1fr',
              padding: '18px 20px',
              borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingRight: 16, paddingTop: 2 }}>
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{activity.icon}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{activity.name}</span>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {activity.benefits.map((b, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--sage)', fontSize: '0.65rem', marginTop: 5, flexShrink: 0 }}>◆</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PLACEHOLDER SECTIONS
───────────────────────────────────────── */
function PlaceholderSection({ title, icon, description }) {
  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div className="iba-hero">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="iba-hero-art" />
      </div>
      <div className="iba-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
          This section is coming soon. Content will be added here.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function InnerBalanceAtlas({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const content = {
    dashboard:        <Dashboard />,
    psychophysiology: <PsychophysiologyMap />,
    neurotransmitters:<Neurotransmitters />,
    mooduplift:       <MoodUplift />,
    physicalactivity: <PhysicalActivity />,
    mindbodyspirit:   <PlaceholderSection title="Mind-Body-Spirit" icon="◎" description="Explore the deep connection between your mind, body, and spirit — how each shapes and supports the others." />,
    journal:          <PlaceholderSection title="Journal" icon="✦" description="A space for daily reflection, intentions, and tracking your inner balance over time." />,
  };

  return (
    <div className="iba">
      <div className="iba-topbar">
        <button className="iba-back-btn" onClick={onBack}>← Back</button>
        <span className="iba-topbar-title">InnerBalance Atlas</span>
        <span className="iba-topbar-sub">· Mind, Body &amp; Spirit</span>
      </div>

      <div className="iba-body">
        <aside className="iba-sidebar">
          <div className="iba-logo">
            <div className="iba-logo-icon">◍</div>
            <div className="iba-logo-text">
              <span className="iba-logo-name">InnerBalance</span>
              <span className="iba-logo-sub">Atlas</span>
            </div>
          </div>

          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`iba-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="iba-nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          <div className="iba-intention">
            <strong>Daily Intention</strong>
            I choose balance, awareness and compassion.
          </div>

          {onNavigate && (
            <button
              className="iba-crosslink-btn"
              onClick={() => onNavigate('psychology')}
            >
              <span className="iba-crosslink-icon">◈</span>
              <div>
                <div className="iba-crosslink-title">Psychology Portal</div>
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
