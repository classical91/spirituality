import { useState, useMemo } from 'react';
import './FrameworkAtlas.css';

const frameworks = [
  {
    id:"gtd", title:"Getting Things Done", creator:"David Allen", category:"Productivity & Execution", model:"Workflow", color:"rgba(0,214,255,.22)",
    core:"A trusted external system for capturing commitments so your mind does not have to keep looping on them.",
    use:"When your thoughts, tasks, errands, projects, and reminders feel scattered.",
    parts:["Capture what has your attention","Clarify what it means","Organize it where it belongs","Reflect through regular review","Engage with the right next action"],
    trap:"Collecting everything but never reviewing it.",
    build:"Inbox → clarify wizard → project list → weekly review dashboard.",
    prompt:"Capture everything on your mind. For each item ask: Is it actionable? If yes, what is the next visible action? If no, is it trash, reference, or later?",
    source:"https://gettingthingsdone.com/what-is-gtd/"
  },
  {
    id:"covey", title:"Covey Time Matrix", creator:"Stephen R. Covey", category:"Productivity & Execution", model:"2x2 Matrix", color:"rgba(255,209,102,.20)",
    core:"A quadrant model for separating urgent work from important work.",
    use:"When you are busy but not sure if the busyness actually matters.",
    parts:["Urgent + Important: crisis","Important + Not Urgent: growth","Urgent + Not Important: interruption","Not Urgent + Not Important: distraction"],
    trap:"Living in urgency and calling it productivity.",
    build:"Drag-and-drop daily planner with four quadrants and a 'protect Quadrant II' reminder.",
    prompt:"List today's tasks. Put each into urgent/important quadrants. Choose one important-not-urgent action before reacting to noise.",
    source:"https://www.franklincovey.com/the-7-habits/habit-3/"
  },
  {
    id:"eisenhower", title:"Eisenhower Matrix", creator:"Dwight D. Eisenhower, popularized by productivity writers", category:"Productivity & Execution", model:"2x2 Matrix", color:"rgba(56,242,155,.18)",
    core:"Prioritize by urgency and importance, then decide: do, schedule, delegate, or delete.",
    use:"When your to-do list is huge and everything feels equally loud.",
    parts:["Do now","Schedule","Delegate","Delete"],
    trap:"Putting everything in 'do now' because it feels emotionally urgent.",
    build:"Task sorter with four action buckets and calendar scheduling.",
    prompt:"Sort every task by urgency and importance. Convert each bucket into one of four actions: do, schedule, delegate, delete.",
    source:"https://www.eisenhower.me/eisenhower-matrix/"
  },
  {
    id:"smart", title:"SMART Goals", creator:"George T. Doran", category:"Productivity & Execution", model:"Checklist", color:"rgba(124,92,255,.20)",
    core:"A goal-setting checklist that makes vague goals concrete enough to act on.",
    use:"When a desire sounds good but has no measurable target or deadline.",
    parts:["Specific","Measurable","Assignable / Achievable","Realistic / Relevant","Time-related / Time-bound"],
    trap:"Making goals measurable but not meaningful.",
    build:"Goal editor that warns when a goal is vague, unmeasured, or not scheduled.",
    prompt:"Rewrite this goal so it answers: what exactly, how measured, who acts, why realistic/relevant, and by when?",
    source:"https://www.sciencedirect.com/science/article/abs/pii/S0149718916302580"
  },
  {
    id:"okr", title:"OKRs", creator:"Andy Grove; popularized by John Doerr", category:"Productivity & Execution", model:"Goal System", color:"rgba(0,214,255,.18)",
    core:"Objectives define the meaningful direction; key results define measurable evidence of progress.",
    use:"When teams or personal projects need focus, alignment, and measurable outcomes.",
    parts:["Objective: qualitative aim","Key Results: measurable outcomes","Initiatives: actions that may move the result","Check-ins: progress rhythm"],
    trap:"Turning OKRs into a task list instead of outcomes.",
    build:"Quarterly objective dashboard with confidence scores and progress bars.",
    prompt:"Write one inspiring objective. Add 3 measurable key results. Then list initiatives separately so tasks do not replace outcomes.",
    source:"https://www.whatmatters.com/"
  },
  {
    id:"pomodoro", title:"Pomodoro Technique", creator:"Francesco Cirillo", category:"Productivity & Execution", model:"Cycle", color:"rgba(255,107,107,.18)",
    core:"Work in focused intervals with short breaks to reduce friction and protect attention.",
    use:"When starting is harder than the work itself.",
    parts:["Pick a task","Work one focused interval","Take a short break","Repeat","Take a longer break after a set"],
    trap:"Using timers as pressure instead of support.",
    build:"Focus timer with task notes, distraction log, and completion streaks.",
    prompt:"Choose one task. Work on it for one interval. Write distractions down instead of following them.",
    source:"https://francescocirillo.com/products/the-pomodoro-technique"
  },
  {
    id:"deepwork", title:"Deep Work", creator:"Cal Newport", category:"Productivity & Execution", model:"Practice System", color:"rgba(255,79,216,.16)",
    core:"Protect long stretches of concentration for cognitively demanding work.",
    use:"When constant notifications and shallow tasks are stealing your best thinking.",
    parts:["Define high-value work","Block uninterrupted time","Remove attention residue","Measure depth, not just activity"],
    trap:"Scheduling deep work but leaving the environment unchanged.",
    build:"Calendar blocker that tracks depth sessions and distraction triggers.",
    prompt:"What is the one output that needs your best brain? Block a protected session and remove the obvious interruptions first.",
    source:"https://www.calnewport.com/books/deep-work/"
  },
  {
    id:"atomic", title:"Four Laws of Behavior Change", creator:"James Clear", category:"Productivity & Execution", model:"Loop", color:"rgba(56,242,155,.16)",
    core:"Habits become easier when the cue is obvious, the action attractive and easy, and the reward satisfying.",
    use:"When you want a habit to become automatic instead of dependent on motivation.",
    parts:["Make it obvious","Make it attractive","Make it easy","Make it satisfying"],
    trap:"Trying to build a habit with willpower while the environment fights you.",
    build:"Habit designer that edits cue, craving, friction, and reward.",
    prompt:"For this habit, design the cue, reduce friction, make the reward visible, and attach it to an existing routine.",
    source:"https://jamesclear.com/atomic-habits"
  },
  {
    id:"ooda", title:"OODA Loop", creator:"John Boyd", category:"Decision & Strategy", model:"Loop", color:"rgba(0,214,255,.22)",
    core:"A decision cycle: observe, orient, decide, act — then repeat as reality changes.",
    use:"When speed, adaptation, and feedback matter more than a perfect static plan.",
    parts:["Observe the situation","Orient using context and mental models","Decide a course","Act and create feedback"],
    trap:"Rushing to decide without orienting correctly.",
    build:"Rapid decision board for trading, conflict, product incidents, or life choices.",
    prompt:"What am I observing? What context changes its meaning? What decision is reversible? What action gives the cleanest feedback?",
    source:"https://www.canada.ca/en/department-national-defence/maple-leaf/defence/2023/11/ooda-loop-halfbeat.html"
  },
  {
    id:"cynefin", title:"Cynefin Framework", creator:"Dave Snowden", category:"Decision & Strategy", model:"Sensemaking Map", color:"rgba(124,92,255,.22)",
    core:"Different situations need different responses depending on whether cause and effect are clear, complicated, complex, chaotic, or confused.",
    use:"When one-size-fits-all advice is failing because the problem type is misunderstood.",
    parts:["Clear: sense-categorize-respond","Complicated: sense-analyze-respond","Complex: probe-sense-respond","Chaotic: act-sense-respond","Confused: break apart and classify"],
    trap:"Treating complex human systems like simple mechanical problems.",
    build:"Problem-type diagnostic before choosing tactics.",
    prompt:"Which domain am I in: clear, complicated, complex, chaotic, or confused? What response pattern fits that domain?",
    source:"https://thecynefin.co/about-us/about-cynefin-framework/"
  },
  {
    id:"wardley", title:"Wardley Mapping", creator:"Simon Wardley", category:"Decision & Strategy", model:"Map", color:"rgba(56,242,155,.17)",
    core:"Map user needs, value chains, and component evolution to see strategy more clearly.",
    use:"When you need to understand where to build, buy, outsource, standardize, or innovate.",
    parts:["User need","Value chain","Evolution: genesis → custom → product → commodity","Movement and doctrine"],
    trap:"Drawing a diagram without anchoring it to real user need.",
    build:"Strategy canvas where components move across evolution stages.",
    prompt:"Start with the user need. Map what supports it. Place each component by maturity: genesis, custom-built, product, commodity.",
    source:"https://swardleymaps.com/"
  },
  {
    id:"porter", title:"Five Forces", creator:"Michael E. Porter", category:"Decision & Strategy", model:"Competitive Map", color:"rgba(255,209,102,.18)",
    core:"Industry profitability is shaped by rivalry, suppliers, buyers, entrants, and substitutes.",
    use:"When judging a market, niche, startup idea, or business moat.",
    parts:["Rivalry among competitors","Supplier power","Buyer power","Threat of new entrants","Threat of substitutes"],
    trap:"Only looking at direct competitors and missing substitutes or bargaining power.",
    build:"Market scanner that scores each force and suggests defensive moves.",
    prompt:"Score each force from weak to strong. Which force threatens profit the most? What move reduces that pressure?",
    source:"https://www.isc.hbs.edu/strategy/business-strategy/Pages/the-five-forces.aspx"
  },
  {
    id:"swot", title:"SWOT Analysis", creator:"Albert Humphrey is commonly associated", category:"Decision & Strategy", model:"2x2 Matrix", color:"rgba(255,79,216,.15)",
    core:"Compare internal strengths and weaknesses with external opportunities and threats.",
    use:"When you need a simple snapshot before planning.",
    parts:["Strengths","Weaknesses","Opportunities","Threats"],
    trap:"Listing obvious points without converting them into decisions.",
    build:"SWOT board with action prompts for each quadrant.",
    prompt:"For each SWOT item, add one action: use, improve, pursue, or defend.",
    source:"https://www.mindtools.com/amtbj63/swot-analysis"
  },
  {
    id:"sixhats", title:"Six Thinking Hats", creator:"Edward de Bono", category:"Decision & Strategy", model:"Perspective Set", color:"rgba(0,214,255,.16)",
    core:"Separate thinking modes so a group does not mix facts, fears, optimism, creativity, and process all at once.",
    use:"When discussions are messy or people talk past each other.",
    parts:["White: facts","Red: feelings","Black: risks","Yellow: benefits","Green: ideas","Blue: process"],
    trap:"Using hats as labels for people instead of modes everyone can use.",
    build:"Meeting mode switcher with timed rounds for each hat.",
    prompt:"Run the issue through each hat: facts, feelings, risks, benefits, ideas, and process. Do not debate until all modes are heard.",
    source:"https://www.debono.com/six-thinking-hats-summary"
  },
  {
    id:"inversion", title:"Inversion", creator:"Popularized by Charlie Munger; rooted in classical logic", category:"Decision & Strategy", model:"Mental Model", color:"rgba(255,107,107,.15)",
    core:"Solve backward: instead of asking how to succeed, ask what would guarantee failure and avoid it.",
    use:"When the positive path is unclear but the obvious traps are visible.",
    parts:["Define the goal","Invert into failure","List causes of failure","Remove or prevent those causes"],
    trap:"Stopping at fear instead of converting it into prevention.",
    build:"Failure pre-mortem tool for projects, relationships, habits, and trading rules.",
    prompt:"If this failed badly, what caused it? Which causes can I prevent before starting?",
    source:"https://fs.blog/inversion/"
  },
  {
    id:"designthinking", title:"Design Thinking", creator:"Stanford d.school / IDEO tradition", category:"Design & Product", model:"Process", color:"rgba(124,92,255,.22)",
    core:"A human-centered process for understanding users, defining problems, ideating, prototyping, and testing.",
    use:"When you are building for people and need empathy before solution-making.",
    parts:["Empathize","Define","Ideate","Prototype","Test"],
    trap:"Jumping to prototype before understanding the user.",
    build:"User research → insight wall → prototype tracker → test notes.",
    prompt:"What do users feel, need, and struggle with? Define the problem in human terms before listing solutions.",
    source:"https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process"
  },
  {
    id:"doublediamond", title:"Double Diamond", creator:"Design Council", category:"Design & Product", model:"Diverge/Converge", color:"rgba(0,214,255,.18)",
    core:"A visual design process that alternates between exploring broadly and narrowing clearly.",
    use:"When teams keep solving before discovering the real problem.",
    parts:["Discover","Define","Develop","Deliver"],
    trap:"Treating it as linear when design usually loops.",
    build:"Two-diamond project board with research, synthesis, ideas, and delivery lanes.",
    prompt:"First widen the problem space, then narrow the challenge. Then widen the solution space, then narrow into delivery.",
    source:"https://www.designcouncil.org.uk/our-resources/the-double-diamond/"
  },
  {
    id:"jtbd", title:"Jobs To Be Done", creator:"Clayton Christensen and collaborators", category:"Design & Product", model:"Customer Lens", color:"rgba(56,242,155,.18)",
    core:"People 'hire' products or behaviors to make progress in a circumstance.",
    use:"When demographics do not explain why someone chooses a product, habit, or tool.",
    parts:["Circumstance","Functional job","Emotional job","Social job","Forces pulling toward/away"],
    trap:"Confusing the product category with the real job.",
    build:"Interview tool that extracts functional, emotional, and social jobs.",
    prompt:"When this person chooses X, what progress are they trying to make in that specific situation?",
    source:"https://www.christenseninstitute.org/theory/jobs-to-be-done/"
  },
  {
    id:"leanstartup", title:"Lean Startup", creator:"Eric Ries", category:"Design & Product", model:"Experiment Loop", color:"rgba(255,209,102,.18)",
    core:"Build a minimum viable product, measure real behavior, and learn quickly.",
    use:"When uncertainty is high and you need evidence before scaling.",
    parts:["Build","Measure","Learn","MVP","Validated learning"],
    trap:"Building too much before testing the risky assumption.",
    build:"Hypothesis → MVP → metric → learning dashboard.",
    prompt:"What is the riskiest assumption? What is the smallest test that teaches us whether it is true?",
    source:"https://theleanstartup.com/principles"
  },
  {
    id:"kano", title:"Kano Model", creator:"Noriaki Kano", category:"Design & Product", model:"Satisfaction Curve", color:"rgba(255,79,216,.16)",
    core:"Features affect satisfaction differently: basics prevent dissatisfaction, performance features compete, and delighters surprise.",
    use:"When deciding which features matter most to users.",
    parts:["Must-be / basic","One-dimensional / performance","Attractive / delighter","Indifferent","Reverse"],
    trap:"Over-investing in delighters while basics are broken.",
    build:"Feature survey that classifies user reactions to presence/absence.",
    prompt:"For each feature, ask how users feel if it exists and if it does not exist. Classify the satisfaction type.",
    source:"https://www.qualtrics.com/en-gb/experience-management/research/kano-analysis/"
  },
  {
    id:"aarrr", title:"AARRR Pirate Metrics", creator:"Dave McClure", category:"Design & Product", model:"Funnel", color:"rgba(0,214,255,.17)",
    core:"Track the startup/product lifecycle through acquisition, activation, retention, referral, and revenue.",
    use:"When a product has traffic but unclear growth bottlenecks.",
    parts:["Acquisition","Activation","Retention","Referral","Revenue"],
    trap:"Optimizing acquisition while retention is leaking.",
    build:"Growth dashboard with funnel stage health and bottleneck alerts.",
    prompt:"Where does the user journey break: discovery, first value, return, sharing, or payment?",
    source:"https://www.productplan.com/glossary/aarrr-pirate-metrics-framework/"
  },
  {
    id:"moscow", title:"MoSCoW Prioritization", creator:"Dai Clegg", category:"Design & Product", model:"Priority Buckets", color:"rgba(255,107,107,.14)",
    core:"Sort requirements into must, should, could, and will-not-have for a release.",
    use:"When scope is growing and decisions need boundaries.",
    parts:["Must have","Should have","Could have","Will not have now"],
    trap:"Calling everything a must-have.",
    build:"Feature triage board with release boundaries.",
    prompt:"For each feature, ask: would the release fail without it? If not, it is not a must.",
    source:"https://www.productplan.com/glossary/moscow-prioritization/"
  },
  {
    id:"cbt", title:"CBT Cognitive Model", creator:"Aaron Beck / Judith Beck tradition", category:"Psychology & Self", model:"Cause/Effect Loop", color:"rgba(124,92,255,.22)",
    core:"Perceptions and automatic thoughts influence emotions, behavior, and body reactions.",
    use:"For self-reflection when a situation triggers a strong emotional response.",
    parts:["Situation","Automatic thought","Emotion","Behavior","Physical reaction","Alternative thought"],
    trap:"Using it to argue with yourself harshly instead of examining thoughts fairly.",
    build:"Thought record journal with situation → thought → emotion → balanced response.",
    prompt:"What happened? What did my mind say it meant? What emotion followed? What is a more balanced interpretation?",
    source:"https://beckinstitute.org/about/understanding-cbt/"
  },
  {
    id:"dbt", title:"DBT Skills Modules", creator:"Marsha Linehan", category:"Psychology & Self", model:"Skill Set", color:"rgba(0,214,255,.17)",
    core:"A skills-based approach built around mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.",
    use:"When intense emotion needs skills instead of impulsive reaction.",
    parts:["Mindfulness","Distress tolerance","Emotion regulation","Interpersonal effectiveness"],
    trap:"Only using crisis skills and ignoring everyday regulation practice.",
    build:"Emotion skill selector: calm, tolerate, regulate, communicate.",
    prompt:"Am I needing presence, crisis tolerance, emotion regulation, or relationship communication? Pick one skill before acting.",
    source:"https://dialecticalbehaviortherapy.com/"
  },
  {
    id:"perma", title:"PERMA Well-Being Model", creator:"Martin Seligman", category:"Psychology & Self", model:"Well-being Stack", color:"rgba(56,242,155,.18)",
    core:"Well-being can be viewed through positive emotion, engagement, relationships, meaning, and accomplishment.",
    use:"When life feels off but you need a balanced check-in rather than one vague mood score.",
    parts:["Positive emotion","Engagement","Relationships","Meaning","Accomplishment"],
    trap:"Chasing positive emotion while ignoring meaning or relationships.",
    build:"Weekly PERMA check-in dashboard with reflection prompts.",
    prompt:"Score each PERMA area from 1–10. Which one small action would raise the lowest area this week?",
    source:"https://ppc.sas.upenn.edu/learn-more/perma-theory-well-being-and-perma-workshops"
  },
  {
    id:"maslow", title:"Hierarchy of Needs", creator:"Abraham Maslow", category:"Psychology & Self", model:"Hierarchy", color:"rgba(255,209,102,.18)",
    core:"Human motivation can be viewed through layers of needs from survival and safety to belonging, esteem, and self-actualization.",
    use:"When a high-level goal is failing because lower-level needs are unstable.",
    parts:["Physiological","Safety","Love/belonging","Esteem","Self-actualization"],
    trap:"Treating the pyramid as perfectly rigid or universal in every situation.",
    build:"Needs audit that checks which layer needs support before setting goals.",
    prompt:"Which need is most under-supported right now: body, safety, connection, esteem, or growth?",
    source:"https://www.britannica.com/science/Maslows-hierarchy-of-needs"
  },
  {
    id:"flow", title:"Flow Model", creator:"Mihaly Csikszentmihalyi", category:"Psychology & Self", model:"State Map", color:"rgba(255,79,216,.15)",
    core:"Flow appears when challenge and skill are both high enough to absorb attention.",
    use:"When work feels either boring or overwhelming and needs better calibration.",
    parts:["Challenge","Skill","Clear goals","Immediate feedback","Deep absorption"],
    trap:"Expecting flow without removing interruptions or clarifying the task.",
    build:"Challenge-vs-skill slider that suggests how to increase engagement.",
    prompt:"Is this too easy, too hard, or clear enough? Adjust challenge or skill support until focus becomes possible.",
    source:"https://www.britannica.com/science/flow-psychology"
  },
  {
    id:"act", title:"ACT Hexaflex", creator:"Steven C. Hayes and collaborators", category:"Psychology & Self", model:"Six-Part Model", color:"rgba(0,214,255,.15)",
    core:"Psychological flexibility involves values, committed action, acceptance, defusion, present-moment awareness, and self-as-context.",
    use:"When the aim is to act from values even while discomfort is present.",
    parts:["Values","Committed action","Acceptance","Cognitive defusion","Present moment","Self-as-context"],
    trap:"Waiting to feel perfect before doing values-based action.",
    build:"Values action planner with discomfort-aware prompts.",
    prompt:"What value matters here? What small committed action can I take while allowing discomfort to be present?",
    source:"https://contextualscience.org/act"
  },
  {
    id:"jung", title:"Archetypes", creator:"Carl Jung tradition", category:"Psychology & Self", model:"Symbol Set", color:"rgba(255,107,107,.15)",
    core:"Recurring symbolic patterns can help people reflect on roles, motivations, and inner narratives.",
    use:"For storytelling, brand identity, journaling, and symbolic self-reflection.",
    parts:["Hero","Shadow","Anima/Animus","Self","Persona","Wise old figure"],
    trap:"Treating archetypes as fixed identity boxes.",
    build:"Archetype explorer for journaling, branding, or character design.",
    prompt:"Which role am I acting from right now? Which hidden opposite or shadow is influencing the story?",
    source:"https://www.britannica.com/biography/Carl-Jung"
  },
  {
    id:"nvc", title:"Nonviolent Communication", creator:"Marshall Rosenberg", category:"Communication & Relationships", model:"4-Step Script", color:"rgba(56,242,155,.20)",
    core:"Communicate by separating observations, feelings, needs, and requests.",
    use:"When emotions are high and you want clarity without blame.",
    parts:["Observation","Feeling","Need","Request"],
    trap:"Using the formula mechanically while still blaming underneath.",
    build:"Conversation composer that turns reactions into OFNR statements.",
    prompt:"What did I observe without interpretation? What do I feel? What need matters? What clear request can I make?",
    source:"https://www.sociocracyforall.org/nvc-feelings-and-needs-list/"
  },
  {
    id:"sbi", title:"SBI Feedback", creator:"Center for Creative Leadership tradition", category:"Communication & Relationships", model:"Feedback Script", color:"rgba(0,214,255,.16)",
    core:"Give feedback by naming the situation, behavior, and impact.",
    use:"When feedback needs to be specific rather than personal or vague.",
    parts:["Situation","Behavior","Impact"],
    trap:"Describing character instead of observable behavior.",
    build:"Feedback builder for work, relationships, or self-review.",
    prompt:"In this situation, I observed this behavior, and the impact was this. What request or next step follows?",
    source:"https://www.ccl.org/articles/leading-effectively-articles/closing-the-gap-between-intent-vs-impact-sbii/"
  },
  {
    id:"radicalcandor", title:"Radical Candor", creator:"Kim Scott", category:"Communication & Relationships", model:"2x2 Matrix", color:"rgba(255,209,102,.16)",
    core:"Strong feedback works best when you care personally and challenge directly.",
    use:"When trying to be honest without becoming harsh or avoidant.",
    parts:["Care personally","Challenge directly","Radical candor","Ruinous empathy","Obnoxious aggression","Manipulative insincerity"],
    trap:"Calling bluntness candor when care is missing.",
    build:"Feedback tone checker with care/directness scoring.",
    prompt:"How can I show care and still say the direct truth clearly?",
    source:"https://www.radicalcandor.com/our-approach/"
  },
  {
    id:"johari", title:"Johari Window", creator:"Joseph Luft and Harrington Ingham", category:"Communication & Relationships", model:"2x2 Matrix", color:"rgba(124,92,255,.16)",
    core:"Self-awareness grows by comparing what is known or unknown to self and others.",
    use:"When exploring blind spots, openness, and feedback.",
    parts:["Open area","Blind spot","Hidden area","Unknown area"],
    trap:"Asking for feedback without becoming open to receiving it.",
    build:"Self-awareness map for feedback and reflection.",
    prompt:"What do I know and others know? What do others see that I miss? What am I hiding? What remains unknown?",
    source:"https://www.communicationtheory.org/the-johari-window-model/"
  },
  {
    id:"transactional", title:"Transactional Analysis", creator:"Eric Berne", category:"Communication & Relationships", model:"Interaction Model", color:"rgba(255,79,216,.14)",
    core:"Interactions can be viewed through Parent, Adult, and Child ego-state patterns.",
    use:"When a conversation feels reactive, parental, defensive, or not adult-to-adult.",
    parts:["Parent","Adult","Child","Transactions","Games"],
    trap:"Using ego states as insults instead of noticing patterns.",
    build:"Conversation pattern analyzer for adult-to-adult repair.",
    prompt:"Which state am I speaking from? Which state is the other person inviting? How do I return to Adult?",
    source:"https://www.britannica.com/science/transactional-analysis"
  },
  {
    id:"sternberg-love", title:"Sternberg's Triangular Theory of Love", creator:"Robert Sternberg", category:"Communication & Relationships", model:"Triangle", color:"rgba(255,79,216,.18)",
    core:"Love is built from three components — intimacy, passion, and commitment — and their combinations produce different forms of love.",
    use:"When trying to name what is present, missing, or out of balance in a romantic connection.",
    parts:["Intimacy: closeness, warmth, connection","Passion: physical attraction, drive, romance","Commitment: choice, loyalty, long-term decision","Liking = intimacy alone","Infatuation = passion alone","Empty love = commitment alone","Romantic love = intimacy + passion","Companionate love = intimacy + commitment","Fatuous love = passion + commitment","Consummate love = all three"],
    trap:"Treating the absence of one corner as proof the relationship is failing, instead of as information about what to grow.",
    build:"Three-slider self-assessment that maps the relationship onto a love type and suggests what to nurture.",
    prompt:"Rate intimacy, passion, and commitment in this relationship from 1 to 10. Which corner is highest? Which is lowest? What would it look like to grow the lowest one this month?",
    source:"https://psycnet.apa.org/doi/10.1037/0033-295X.93.2.119"
  },
  {
    id:"knapp-stages", title:"Knapp's Relational Stages", creator:"Mark L. Knapp", category:"Communication & Relationships", model:"Stage Model", color:"rgba(124,92,255,.18)",
    core:"Relationships move through identifiable stages of coming together and (sometimes) coming apart, each with its own communication patterns.",
    use:"When you want to locate where a relationship actually is — not where you hope or fear it is.",
    parts:["Initiating: first impressions","Experimenting: small talk and discovery","Intensifying: opening up, more vulnerability","Integrating: identities start to merge","Bonding: public commitment","Differentiating: re-asserting individuality","Circumscribing: communication shrinks","Stagnating: going through motions","Avoiding: physical or emotional distance","Terminating: ending the connection"],
    trap:"Skipping stages to manufacture closeness, or mistaking stagnation for stability.",
    build:"Stage selector that maps the current connection and surfaces what tends to come next.",
    prompt:"Which stage best describes this connection right now? Which stage was it in three months ago? What direction is the trend moving — together or apart?",
    source:"https://www.communicationtheory.org/knapps-relational-development-model/"
  },
  {
    id:"attraction-factors", title:"Factors of Interpersonal Attraction", creator:"Social psychology tradition (Berscheid, Hatfield, Festinger, et al.)", category:"Communication & Relationships", model:"Factor Set", color:"rgba(56,242,155,.18)",
    core:"Most attraction is shaped by a small set of well-studied factors — not by mystery or fate.",
    use:"When you want to separate genuine compatibility signals from chemistry that may not predict fit.",
    parts:["Proximity: people you encounter often","Familiarity: repeated exposure increases liking","Similarity: shared values, lifestyle, worldview","Reciprocity: knowing someone likes you","Physical attractiveness: especially in early stages","Complementarity: traits that fit alongside yours","Arousal: shared exciting contexts can amplify attraction"],
    trap:"Romanticizing factors like proximity and familiarity as 'destiny' when they're really just exposure.",
    build:"Compatibility scoring tool that weighs each factor against long-term satisfaction predictors.",
    prompt:"For each of the seven factors, rate how strong it is in this attraction. Which are strong? Which are weak? Are the strong ones the kind that predict long-term satisfaction, or the kind that fade?",
    source:"https://www.simplypsychology.org/interpersonal-attraction.html"
  },
  {
    id:"reciprocity-attraction", title:"Reciprocity of Attraction", creator:"Aron, Berscheid, and related research", category:"Communication & Relationships", model:"Mutual Process", color:"rgba(0,214,255,.18)",
    core:"Knowing someone likes you is one of the strongest predictors of liking them back — mutual attraction is largely built, not just discovered.",
    use:"When deciding whether to express interest, or trying to make sense of how attraction grows or fades.",
    parts:["Initial signal: any sign of interest","Acknowledgment: the other person registers the signal","Mutual disclosure: vulnerability deepens the loop","Responsiveness: feeling understood and valued","Validation cycle: each round of warmth feeds the next","Withdrawal effect: silence or distance shuts the loop down"],
    trap:"Withholding interest as a strategy, expecting attraction to grow in the absence of signal.",
    build:"Loop visualizer that shows how each signal/response cycle compounds or dies.",
    prompt:"In this connection, who is sending signal and who is responding? Is the loop building or fading? What would honest reciprocity from your side look like this week?",
    source:"https://en.wikipedia.org/wiki/Reciprocal_liking"
  },
  {
    id:"paradox-of-love", title:"Paradox of Love", creator:"Esther Perel and related thinkers", category:"Communication & Relationships", model:"Tension Model", color:"rgba(255,209,102,.16)",
    core:"The qualities that build security in love (closeness, routine, predictability) are often opposite to the qualities that fuel desire (distance, novelty, mystery).",
    use:"When intimacy is high but desire is low, or when passion exists only in unstable connections.",
    parts:["Security side: closeness, comfort, knowing","Desire side: distance, novelty, otherness","Tension: each side undermines the other if maximized","Integration: brief separations, autonomy, surprise","Erotic intelligence: keeping space for the other to be other","Daily reality: this paradox is normal, not a flaw"],
    trap:"Treating low desire in a committed relationship as proof that something is broken, when it may just be the paradox doing what it does.",
    build:"Tension dashboard that helps couples notice when they've collapsed too far into either pole.",
    prompt:"In this relationship, is the security pole or the desire pole stronger right now? What small experiment could introduce a healthy dose of the missing one — without threatening the other?",
    source:"https://www.estherperel.com/blog/mating-in-captivity"
  },
  {
    id:"bloom", title:"Bloom's Taxonomy", creator:"Benjamin Bloom and collaborators", category:"Learning & Knowledge", model:"Hierarchy", color:"rgba(0,214,255,.18)",
    core:"Learning can move from remembering and understanding toward applying, analyzing, evaluating, and creating.",
    use:"When designing lessons, notes, prompts, quizzes, or skill progression.",
    parts:["Remember","Understand","Apply","Analyze","Evaluate","Create"],
    trap:"Thinking memorization equals mastery.",
    build:"Learning planner that upgrades questions from recall to creation.",
    prompt:"For this topic, write one question at each level: remember, understand, apply, analyze, evaluate, create.",
    source:"https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/"
  },
  {
    id:"feynman", title:"Feynman Technique", creator:"Associated with Richard Feynman", category:"Learning & Knowledge", model:"Study Loop", color:"rgba(255,209,102,.16)",
    core:"Explain a topic simply, find gaps, relearn, and simplify again.",
    use:"When you think you understand something but cannot explain it clearly.",
    parts:["Pick concept","Explain simply","Find gaps","Review source","Simplify with analogy"],
    trap:"Using fancy terms to hide unclear understanding.",
    build:"Explain-it-to-a-beginner note editor with gap prompts.",
    prompt:"Explain this topic to a smart 12-year-old. Mark every place you use jargon and replace it with plain language.",
    source:"https://fs.blog/feynman-technique/"
  },
  {
    id:"kolb", title:"Experiential Learning Cycle", creator:"David Kolb", category:"Learning & Knowledge", model:"Cycle", color:"rgba(56,242,155,.15)",
    core:"Learning cycles through experience, reflection, concepts, and experimentation.",
    use:"When turning life experience or practice into actual learning.",
    parts:["Concrete experience","Reflective observation","Abstract conceptualization","Active experimentation"],
    trap:"Repeating experiences without reflection or testing new approaches.",
    build:"Learning journal that converts events into experiments.",
    prompt:"What happened? What did I notice? What principle explains it? What will I try next?",
    source:"https://learningfromexperience.com/themes/experiential-learning-theory/"
  },
  {
    id:"dreyfus", title:"Dreyfus Skill Model", creator:"Stuart and Hubert Dreyfus", category:"Learning & Knowledge", model:"Maturity Ladder", color:"rgba(255,107,107,.14)",
    core:"Skill development moves through stages from rule-following novice to intuitive expertise.",
    use:"When judging where you are in a skill and what kind of instruction fits.",
    parts:["Novice","Advanced beginner","Competent","Proficient","Expert"],
    trap:"Expecting expert intuition before enough practice patterns exist.",
    build:"Skill roadmap that changes advice by stage.",
    prompt:"What stage am I in? Do I need rules, examples, planning, pattern recognition, or refinement?",
    source:"https://www.toolshero.com/human-resources/dreyfus-model-of-skill-acquisition/"
  },
  {
    id:"spaced", title:"Spaced Repetition", creator:"Hermann Ebbinghaus tradition; modern SRS tools", category:"Learning & Knowledge", model:"Memory System", color:"rgba(124,92,255,.15)",
    core:"Review information at expanding intervals to fight forgetting and strengthen recall.",
    use:"When memorizing language, concepts, definitions, commands, or frameworks.",
    parts:["Recall","Feedback","Interval","Repeat","Increase difficulty"],
    trap:"Re-reading notes passively instead of actively recalling.",
    build:"Framework flashcards with spaced review scheduling.",
    prompt:"Turn this concept into a question-answer card. Review it just before forgetting, not all at once.",
    source:"https://www.britannica.com/science/forgetting-curve"
  },
  {
    id:"deliberate", title:"Deliberate Practice", creator:"K. Anders Ericsson", category:"Learning & Knowledge", model:"Practice System", color:"rgba(0,214,255,.15)",
    core:"Improve by practicing specific subskills with feedback, stretch, repetition, and correction.",
    use:"When you want skill growth instead of just more time spent.",
    parts:["Specific target","Focused effort","Immediate feedback","Stretch zone","Repeat and refine"],
    trap:"Confusing repetition with improvement.",
    build:"Practice planner that isolates one subskill and tracks feedback.",
    prompt:"What exact subskill am I improving today? What feedback will tell me if it improved?",
    source:"https://psycnet.apa.org/record/1993-40718-001"
  }
];

const categoryNotes = {
  "Productivity & Execution": "Frameworks for tasks, habits, goals, attention, and follow-through.",
  "Decision & Strategy":      "Frameworks for choosing, prioritizing, sensing complexity, and mapping markets or systems.",
  "Design & Product":         "Frameworks for building products, researching users, testing ideas, and prioritizing features.",
  "Psychology & Self":        "Frameworks for emotions, identity, reflection, behavior, and well-being. Educational, not medical advice.",
  "Communication & Relationships": "Frameworks for feedback, conflict, needs, clarity, and relationship conversations.",
  "Learning & Knowledge":     "Frameworks for studying, skill-building, remembering, explaining, and practicing."
};

const categories = [...new Set(frameworks.map(f => f.category))];
const models     = [...new Set(frameworks.map(f => f.model))].sort();

function FrameworkCard({ f, onOpen }) {
  return (
    <article
      className="fa-card"
      style={{ '--cardGlow': f.color }}
      onClick={() => onOpen(f)}
    >
      <div className="fa-chip-row">
        <span className="fa-chip hot">{f.category}</span>
        <span className="fa-chip gold">{f.model}</span>
      </div>
      <h3>{f.title}</h3>
      <div className="fa-creator">By {f.creator}</div>
      <p className="fa-core-text">{f.core}</p>
      <div className="fa-mini-list">
        {f.parts.slice(0,3).map(p => (
          <div className="fa-mini-list-item" key={p}><b>•</b><span>{p}</span></div>
        ))}
      </div>
      <span className="fa-open-hint">Open details ↗</span>
    </article>
  );
}

function FrameworkModal({ f, onClose }) {
  if (!f) return null;
  return (
    <div className="fa-modal-overlay" onClick={onClose}>
      <div className="fa-modal-card" onClick={e => e.stopPropagation()}>
        <div className="fa-modal-top">
          <div>
            <div className="fa-chip-row">
              <span className="fa-chip hot">{f.category}</span>
              <span className="fa-chip gold">{f.model}</span>
            </div>
            <div className="fa-modal-title">{f.title}</div>
            <div className="fa-modal-creator">Creator / tradition: {f.creator}</div>
          </div>
          <button className="fa-close" onClick={onClose}>×</button>
        </div>
        <div className="fa-modal-body">
          <div className="fa-detail-grid">
            <div className="fa-detail-box"><h4>Core idea</h4><p>{f.core}</p></div>
            <div className="fa-detail-box"><h4>Use it when</h4><p>{f.use}</p></div>
            <div className="fa-detail-box">
              <h4>Parts of the model</h4>
              <ul>{f.parts.map(p => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="fa-detail-box"><h4>Common trap</h4><p>{f.trap}</p></div>
            <div className="fa-detail-box full"><h4>Frontend tool idea</h4><p>{f.build}</p></div>
            <div className="fa-detail-box full">
              <h4>Reusable prompt / action script</h4>
              <div className="fa-prompt-box">{f.prompt}</div>
            </div>
            <div className="fa-detail-box full">
              <h4>Reference link</h4>
              <a className="fa-source-link" href={f.source} target="_blank" rel="noreferrer">{f.source}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FrameworkAtlas({ onBack }) {
  const [query,          setQuery]          = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modelFilter,    setModelFilter]    = useState('all');
  const [modal,          setModal]          = useState(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [rotation,       setRotation]       = useState(35);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return frameworks.filter(f => {
      const hay = `${f.title} ${f.creator} ${f.category} ${f.model} ${f.core} ${f.use} ${f.parts.join(' ')}`.toLowerCase();
      return (!q || hay.includes(q))
        && (categoryFilter === 'all' || f.category === categoryFilter)
        && (modelFilter    === 'all' || f.model    === modelFilter);
    });
  }, [query, categoryFilter, modelFilter]);

  const catFrameworks = frameworks.filter(f => f.category === activeCategory);

  function reset() { setQuery(''); setCategoryFilter('all'); setModelFilter('all'); }

  return (
    <div className="fa">
      {/* top bar */}
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={onBack}>← Back</button>
        <div className="fa-brand">
          <div className="fa-logo">✦</div>
          <span>Framework Atlas</span>
        </div>
        <nav className="fa-nav-links">
          <a className="fa-nav-link" href="#fa-library">Library</a>
          <a className="fa-nav-link" href="#fa-map">Categories</a>
          <a className="fa-nav-link" href="#fa-models">3D Models</a>
          <a className="fa-nav-link" href="#fa-builder">Build Your Own</a>
        </nav>
      </div>

      <div className="fa-inner">
        {/* hero */}
        <header className="fa-hero">
          <div>
            <div className="fa-eyebrow"><span className="fa-pulse" /> Thinkers, tools &amp; mental models</div>
            <h1 className="fa-h1">
              Other people's <span className="fa-grad">frameworks</span>,<br />organized into a tool you can use.
            </h1>
            <p className="fa-lead">
              A frontend page for collecting frameworks from authors, psychologists, strategists, designers, builders, and communicators — then turning each one into a card, popup lesson, and reusable tool idea.
            </p>
            <div className="fa-hero-actions">
              <a className="fa-btn primary" href="#fa-library">Explore frameworks</a>
              <a className="fa-btn" href="#fa-builder">Make your own framework</a>
            </div>
            <div className="fa-stat-row">
              <div className="fa-stat"><strong>{frameworks.length}</strong><span>Frameworks</span></div>
              <div className="fa-stat"><strong>{categories.length}</strong><span>Categories</span></div>
              <div className="fa-stat"><strong>3D</strong><span>Visual models</span></div>
              <div className="fa-stat"><strong>∞</strong><span>Expandable</span></div>
            </div>
          </div>

          {/* 3D sphere */}
          <div className="fa-atlas-stage" aria-label="3D framework orbit visual">
            <div className="fa-sphere">
              <div className="fa-ring r1" /><div className="fa-ring r2" />
              <div className="fa-ring r3" /><div className="fa-ring r4" />
              <div className="fa-node n1">Design</div>
              <div className="fa-node n2">Strategy</div>
              <div className="fa-node n3">Self</div>
              <div className="fa-node n4">Systems</div>
              <div className="fa-node n5">Action</div>
              <div className="fa-core">FRAME<br/>WORK<br/>ATLAS</div>
            </div>
            <div className="fa-floating-note">
              Each framework becomes a popup, a practice tool, and eventually an interactive mini-app.
            </div>
          </div>
        </header>

        {/* library */}
        <section className="fa-section" id="fa-library">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Framework Library</h2>
              <p>Search by creator, category, use case, or model type. Click any card to open an expanded framework window.</p>
            </div>
          </div>

          <div className="fa-controls fa-panel">
            <div className="fa-field">
              <label>Search</label>
              <input
                className="fa-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Try: emotions, startup, decision, relationship, goals..."
              />
            </div>
            <div className="fa-field">
              <label>Category</label>
              <select className="fa-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option value="all">All categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>Model type</label>
              <select className="fa-select" value={modelFilter} onChange={e => setModelFilter(e.target.value)}>
                <option value="all">All model types</option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={reset}>Reset</button>
            </div>
          </div>

          <div className="fa-grid">
            {filtered.length ? filtered.map(f => (
              <FrameworkCard key={f.id} f={f} onOpen={setModal} />
            )) : (
              <div className="fa-panel" style={{ gridColumn:'1/-1', padding:28, color:'var(--muted)' }}>
                No matching frameworks. Try a broader search.
              </div>
            )}
          </div>
        </section>

        {/* category pages */}
        <section className="fa-section" id="fa-map">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Category Pages</h2>
              <p>Each category can become its own page. This section shows how the library breaks into separate portals.</p>
            </div>
          </div>
          <div className="fa-map-wrap">
            <aside className="fa-category-menu fa-panel">
              {categories.map(c => (
                <button
                  key={c}
                  className={`fa-cat-btn ${c === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  <span>{c}</span>
                  <b>{frameworks.filter(f => f.category === c).length}</b>
                </button>
              ))}
            </aside>

            <div className="fa-lanes">
              <div className="fa-lane">
                <div className="fa-lane-head">
                  <div>
                    <h3>{activeCategory}</h3>
                    <p>{categoryNotes[activeCategory]}</p>
                  </div>
                  <span className="fa-chip gold">{catFrameworks.length} tools</span>
                </div>
                <div className="fa-lane-items">
                  {catFrameworks.map(f => (
                    <div className="fa-pill-card" key={f.id} onClick={() => setModal(f)}>
                      <b>{f.title}</b>
                      <span>{f.model} · {f.creator}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fa-lane">
                <div className="fa-lane-head">
                  <div>
                    <h3>Suggested page sections</h3>
                    <p>Use this layout when you split each category into its own route/page.</p>
                  </div>
                </div>
                <div className="fa-lane-items">
                  {['Overview','Framework Cards','Practice Tool','Compare'].map(label => (
                    <div className="fa-pill-card" key={label}>
                      <b>{label}</b>
                      <span>{{ Overview:'What this category helps you solve.', 'Framework Cards':'Fast browse cards with creator and model shape.', 'Practice Tool':'Turn the framework into a form, quiz, timer, map, or journal.', 'Compare':'Show when to use one framework instead of another.' }[label]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D model lab */}
        <section className="fa-section" id="fa-models">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">3D Model Lab</h2>
              <p>Not every framework needs a boring flat card. Some can become cubes, maps, or orbits.</p>
            </div>
          </div>
          <div className="fa-model-lab">
            <div className="fa-cube-stage fa-panel">
              <div className="fa-cube" style={{ '--rot': `${rotation}deg` }}>
                <div className="fa-face front">Productivity<br/>Matrix</div>
                <div className="fa-face back">Mindset<br/>Loop</div>
                <div className="fa-face right">Strategy<br/>Map</div>
                <div className="fa-face left">Communication<br/>Flow</div>
                <div className="fa-face top">Self<br/>Model</div>
                <div className="fa-face bottom">Learning<br/>Cycle</div>
              </div>
            </div>
            <div className="fa-lab-copy fa-panel">
              <h2 className="fa-h2">Visualize the framework type.</h2>
              <p>A 2x2 matrix can be a quadrant board. A loop can be an orbit. A hierarchy can be a tower. A systems map can be a network. This helps you understand the shape of a framework before reading the details.</p>
              <input
                className="fa-range"
                type="range"
                min="0" max="360"
                value={rotation}
                onChange={e => setRotation(Number(e.target.value))}
              />
              <div className="fa-mini-tools">
                {[
                  ['2x2 Matrix','Use for sorting choices: urgent/important, effort/impact, known/unknown.'],
                  ['Loop','Use for habits, iteration, feedback, experiments, and decision cycles.'],
                  ['Map','Use when pieces interact: systems, strategy, dependencies, cause/effect.'],
                  ['Stack','Use when one layer supports another: needs, skills, maturity, identity.'],
                ].map(([title, desc]) => (
                  <div className="fa-tool-box" key={title}><b>{title}</b><span>{desc}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* build your own */}
        <section className="fa-section" id="fa-builder">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Build Your Own Framework Page</h2>
              <p>This is the template for your own original frameworks: name the pattern, define the parts, then turn it into a repeatable tool.</p>
            </div>
          </div>
          <div className="fa-builder fa-panel">
            {[
              ['1','Name the problem','What confusion keeps repeating? Example: "I can\'t tell if this is emotion, identity, or action."'],
              ['2','Choose a shape','Matrix, loop, ladder, map, compass, stack, spectrum, orbit, or checklist.'],
              ['3','Define the parts','Give each zone a plain-language meaning, a danger sign, and a next action.'],
              ['4','Make it usable','Add questions, examples, scoring, a journal prompt, and an "avoid this trap" warning.'],
            ].map(([num, title, desc]) => (
              <div className="fa-builder-card" key={num}>
                <strong>{num}</strong>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="fa-footer">
          Educational frontend. Frameworks are lenses, not laws. Psychology-related cards are for learning and self-reflection, not diagnosis or treatment.
        </footer>
      </div>

      {/* modal */}
      {modal && <FrameworkModal f={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
