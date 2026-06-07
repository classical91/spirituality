import './VitaminsMineralsAtlas.css';

export default function VitaminsMineralsAtlas({ onBack }) {
  return (
    <div className="nutrients-page">
      <div className="nutrients-back-bar">
        <button className="nutrients-back-btn" onClick={onBack}>← Back</button>
        <span>Vitamins &amp; Minerals · Psychophysiology</span>
      </div>

      <section className="page" id="nutrients">
        <div className="hero">
          <div>
            <h2>Psychophysiology of Vitamins &amp; Minerals</h2>
            <p>
              This page maps how nutrients support body systems that influence mood,
              attention, energy, stress resilience, sleep, and neurochemical balance.
              It integrates the neurotransmitter page without repeating it.
            </p>
          </div>
          <div className="hero-art"></div>
        </div>

        <section className="card">
          <h3>Nutrient → Body State → Neurochemistry Map <span className="info">i</span></h3>
          <p className="sub">
            Vitamins and minerals do not "create a mood" by themselves. They help the body
            run the systems that mood depends on: energy production, oxygen transport,
            nerve signaling, sleep rhythm, stress recovery, and neurotransmitter synthesis.
          </p>

          <div className="nutrient-map">
            <div className="map-column">
              <div className="map-card green">
                <h4>Vitamins</h4>
                <p>
                  B vitamins, vitamin D, vitamin C, and folate support energy metabolism,
                  nerve function, immune tone, and neurotransmitter-related pathways.
                </p>
              </div>

              <div className="map-card purple">
                <h4>Minerals</h4>
                <p>
                  Magnesium, iron, zinc, iodine, selenium, calcium, sodium, and potassium
                  support nerve firing, oxygen delivery, muscle tension, thyroid function,
                  and stress response.
                </p>
              </div>

              <div className="map-card gold">
                <h4>Food + Rhythm</h4>
                <p>
                  Nutrients work best with steady meals, hydration, sleep, sunlight,
                  movement, and recovery—not as isolated "quick fixes."
                </p>
              </div>
            </div>

            <div className="map-center">
              <div>
                <strong>Psychophysiology</strong>
                <span>
                  Nutrition influences the body signals your mind reads: energy, calm,
                  tension, clarity, fatigue, motivation, and emotional stability.
                </span>
              </div>
            </div>

            <div className="map-column">
              <div className="map-card blue">
                <h4>Neurochemical Themes</h4>
                <p>
                  Dopamine, serotonin, GABA, norepinephrine, acetylcholine, and oxytocin
                  are supported indirectly through sleep, amino acids, micronutrients,
                  stress regulation, and lifestyle.
                </p>
              </div>

              <div className="map-card rose">
                <h4>Deficiency-Like Signals</h4>
                <p>
                  Low energy, low mood, brain fog, irritability, poor sleep, muscle tension,
                  and anxious activation can overlap with nutrient issues, stress, or medical factors.
                </p>
              </div>

              <div className="map-card teal">
                <h4>Action Layer</h4>
                <p>
                  Track patterns, improve food quality, avoid megadosing, and use labs or
                  professional guidance when symptoms are persistent or intense.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-title">Core nutrient cards</div>

        <div className="mini-grid">
          <div className="mini">
            <h4>Magnesium</h4>
            <p>
              Supports muscle and nerve function, energy production, and relaxation themes.
              In the app, it connects to tension, sleep, GABA-like calm, and stress recovery.
            </p>
          </div>

          <div className="mini">
            <h4>B6</h4>
            <p>
              Supports neurotransmitter-related metabolism. It fits the bridge between food,
              mood, serotonin, dopamine, GABA, and energy regulation.
            </p>
          </div>

          <div className="mini">
            <h4>B12</h4>
            <p>
              Supports nerve health, red blood cell formation, and energy. It connects to
              fatigue, brain fog, mood stability, and cognitive clarity.
            </p>
          </div>

          <div className="mini">
            <h4>Folate</h4>
            <p>
              Works with B12 in methylation and cell function. In this app, it belongs near
              mood steadiness, cognition, and nervous-system support.
            </p>
          </div>

          <div className="mini">
            <h4>Vitamin D</h4>
            <p>
              Supports bones, muscles, immune function, and nerve communication. It also
              belongs in sunlight, mood rhythm, and seasonal well-being sections.
            </p>
          </div>

          <div className="mini">
            <h4>Iron</h4>
            <p>
              Supports oxygen transport and energy. It connects to fatigue, focus, exercise
              capacity, and oxygen delivery to muscles and brain.
            </p>
          </div>

          <div className="mini">
            <h4>Zinc</h4>
            <p>
              Supports immune function, repair, and many enzyme systems. In the mood map,
              it belongs near resilience, recovery, and neurochemical support.
            </p>
          </div>

          <div className="mini">
            <h4>Iodine</h4>
            <p>
              Supports thyroid hormone production, which influences energy, temperature
              regulation, metabolism, and mental pace.
            </p>
          </div>

          <div className="mini">
            <h4>Selenium</h4>
            <p>
              Supports thyroid-related and antioxidant systems. It fits the recovery,
              metabolism, and stress-buffering side of the map.
            </p>
          </div>

          <div className="mini">
            <h4>Calcium</h4>
            <p>
              Supports bones, muscle contraction, and nerve signaling. It belongs in the
              body-signal layer, not just "bone health."
            </p>
          </div>

          <div className="mini">
            <h4>Sodium + Potassium</h4>
            <p>
              Electrolytes that support fluid balance, nerve impulses, and muscle function.
              They connect to hydration, energy, headaches, and exercise recovery.
            </p>
          </div>

          <div className="mini">
            <h4>Vitamin C</h4>
            <p>
              Supports antioxidant protection, collagen formation, and iron absorption.
              It belongs near recovery, immune tone, and stress resilience.
            </p>
          </div>
        </div>

        <div className="section-title">Neurochemical integration</div>

        <section className="card">
          <h3>How Nutrients Connect to Neurotransmitter Themes</h3>
          <p className="sub">
            This does not mean one nutrient equals one neurotransmitter. It means certain
            nutrients support the body conditions and biochemical pathways that help those
            systems function.
          </p>

          <table className="nutrient-table">
            <thead>
              <tr>
                <th>Neurochemical Theme</th>
                <th>Nutrient Support Ideas</th>
                <th>Body-State Connection</th>
                <th>Frontend Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dopamine</td>
                <td>B vitamins, iron, protein-rich meals, magnesium, zinc</td>
                <td>Motivation, drive, reward, energy, goal pursuit</td>
                <td>Use near Top 3 goals, push-ups, steps, and productivity rituals.</td>
              </tr>
              <tr>
                <td>Serotonin</td>
                <td>Vitamin D, B6, folate, magnesium, sunlight, balanced meals</td>
                <td>Mood steadiness, emotional resilience, satisfaction</td>
                <td>Use near gratitude, sunlight, mood tracking, and daily rhythm.</td>
              </tr>
              <tr>
                <td>GABA</td>
                <td>Magnesium, B6, steady blood sugar, calming evening routine</td>
                <td>Calm, relaxation, reducing overactivation</td>
                <td>Use near breathwork, sleep rhythm, detachment, and down-regulation.</td>
              </tr>
              <tr>
                <td>Norepinephrine</td>
                <td>Iron, B vitamins, hydration, electrolytes, adequate calories</td>
                <td>Alertness, attention, readiness, energy</td>
                <td>Use near focus blocks, work sprints, biking, and movement activation.</td>
              </tr>
              <tr>
                <td>Acetylcholine</td>
                <td>B vitamins, choline-rich foods, magnesium, sleep support</td>
                <td>Learning, memory, cognition, mental sharpness</td>
                <td>Use near personal development, learning, journaling, and skill-building.</td>
              </tr>
              <tr>
                <td>Oxytocin</td>
                <td>
                  Not a simple supplement target; supported more by connection, safety,
                  touch, trust, and stress regulation
                </td>
                <td>Bonding, trust, belonging, emotional warmth</td>
                <td>Use near "things you can give besides money," relationships, and compassion rituals.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className="section-title">Psychophysiology patterns</div>

        <div className="grid three">
          <section className="card">
            <h3>Energy + Motivation</h3>
            <p className="sub">
              When energy is low, mindset work can feel harder. The page links fatigue-like
              states to sleep, iron, B vitamins, hydration, and movement rather than only
              "lack of discipline."
            </p>
            <div className="pill-row">
              <span className="pill">Iron</span>
              <span className="pill">B12</span>
              <span className="pill">B6</span>
              <span className="pill">Hydration</span>
              <span className="pill">Electrolytes</span>
              <span className="pill">Steps</span>
            </div>
          </section>

          <section className="card">
            <h3>Calm + Sleep</h3>
            <p className="sub">
              Evening regulation is a body-state issue. The page connects calm to magnesium,
              breathwork, sleep rhythm, light timing, and emotional detachment.
            </p>
            <div className="pill-row">
              <span className="pill">Magnesium</span>
              <span className="pill">Vitamin D rhythm</span>
              <span className="pill">Long exhale</span>
              <span className="pill">GABA theme</span>
              <span className="pill">Journal release</span>
            </div>
          </section>

          <section className="card">
            <h3>Focus + Cognitive Clarity</h3>
            <p className="sub">
              Clarity is mapped as a combination of oxygen delivery, blood sugar rhythm,
              neurotransmitter support, rest, and environment design.
            </p>
            <div className="pill-row">
              <span className="pill">B12</span>
              <span className="pill">Folate</span>
              <span className="pill">Iron</span>
              <span className="pill">Acetylcholine</span>
              <span className="pill">Omega-3</span>
            </div>
          </section>
        </div>

        <div className="section-title">Food-first support examples</div>

        <div className="bottom-grid">
          <section className="card">
            <h3>Mineral-Focused Plate</h3>
            <div className="list">
              <div className="list-item">
                <div>
                  <strong>Magnesium</strong>
                  <span>Leafy greens, legumes, nuts, seeds, whole grains.</span>
                </div>
                <b>Calm</b>
              </div>
              <div className="list-item">
                <div>
                  <strong>Iron</strong>
                  <span>
                    Meat, seafood, beans, lentils, spinach, fortified foods.
                    Pair plant iron with vitamin C.
                  </span>
                </div>
                <b>Energy</b>
              </div>
              <div className="list-item">
                <div>
                  <strong>Zinc</strong>
                  <span>Seafood, meat, beans, nuts, seeds, dairy, whole grains.</span>
                </div>
                <b>Repair</b>
              </div>
            </div>
          </section>

          <section className="card">
            <h3>Vitamin-Focused Plate</h3>
            <div className="list">
              <div className="list-item">
                <div>
                  <strong>B Vitamins</strong>
                  <span>Eggs, fish, dairy, meat, legumes, leafy greens, fortified foods.</span>
                </div>
                <b>Nerves</b>
              </div>
              <div className="list-item">
                <div>
                  <strong>Vitamin D</strong>
                  <span>Sunlight, fatty fish, fortified foods, and supplements when appropriate.</span>
                </div>
                <b>Rhythm</b>
              </div>
              <div className="list-item">
                <div>
                  <strong>Vitamin C</strong>
                  <span>Citrus, berries, peppers, broccoli, potatoes.</span>
                </div>
                <b>Recovery</b>
              </div>
            </div>
          </section>

          <section className="card warning-card">
            <h3>Safety Note</h3>
            <p className="sub">
              This page is educational. Persistent fatigue, low mood, anxiety, numbness,
              tingling, dizziness, or major sleep problems deserve proper medical evaluation.
            </p>
            <div className="note">
              Avoid megadosing supplements. Some nutrients, including iron and vitamin D,
              can be harmful in excess or interact with conditions and medications.
            </div>
          </section>
        </div>

        <div className="section-title">Demonstration: daily mineral + vitamin ritual</div>

        <div className="demo">
          <div className="demo-step">
            <h4>Morning</h4>
            <p>
              Hydrate, get light exposure, eat a nutrient-dense meal if not fasting,
              and use movement to cue dopamine/norepinephrine-style activation.
            </p>
          </div>
          <div className="demo-step">
            <h4>Midday</h4>
            <p>
              Use a balanced meal, steps, electrolytes if needed, and focused work to
              support energy, cognition, and motivation.
            </p>
          </div>
          <div className="demo-step">
            <h4>Evening</h4>
            <p>
              Shift toward magnesium-rich foods, slower breathing, lower stimulation,
              journaling, and sleep rhythm to support calm.
            </p>
          </div>
        </div>

        <p className="quote">
          " Nutrients are not the whole story, but they help give the nervous system
          the materials it needs to tell a steadier story. "
        </p>
      </section>
    </div>
  );
}
