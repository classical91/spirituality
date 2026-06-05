import { useEffect, useMemo, useState } from "react";
import InnerAtlasNav from "./components/InnerAtlasNav";
import "./innerAtlasTheme.css";
import { accentVars } from "./innerAtlasTheme";

const tabs = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "frameworks", label: "All Frameworks", icon: "▣" },
  { id: "powerstack", label: "Power Stack", icon: "✦" },
  { id: "growth", label: "Growth Concepts", icon: "G" },
  { id: "nutrients", label: "Vitamins & Minerals", icon: "◍" },
  { id: "brain", label: "Brain & Spirit", icon: "❋" },
  { id: "emotions", label: "Emotional Awareness", icon: "◎" },
  { id: "shadow", label: "Shadow & Growth", icon: "◑" },
  { id: "manifest", label: "Manifestation & Habits", icon: "✦" },
];

const frameworks = [
  {
    id: 1,
    title: "Self-Schema",
    field: "Psychology",
    icon: "◈",
    tone: "cyan",
    category: "identity",
    keyQuestion: "What kind of person am I being from?",
    use: "Identity work — establishing who you are before outcomes arrive.",
    how: "Replace outcome-focused thinking with identity statements. The schema you hold about yourself drives your behavior and energy. You do not attract what you want — you attract what you are. Before asking what she will do, ask who you are being.",
    example: "Not: 'Will she choose me?' → Instead: 'I am a man who is naturally chosen, loved, and secure.' Act from that schema. Let your behavior match the identity, not the anxiety.",
    prompts: [
      "Who am I being in this situation — and is that who I want to be?",
      "What identity would I need to hold for this outcome to feel natural, not desperate?",
      "If I fully believed I was already loved and chosen, what would I do differently right now?",
    ],
  },
  {
    id: 2,
    title: "Attachment Theory",
    field: "Psychology",
    icon: "⌘",
    tone: "sky",
    category: "awareness",
    keyQuestion: "Am I acting from security or fear?",
    use: "Noticing anxious patterns — texting, mixed signals, overthinking, pedestalizing.",
    how: "Anxious attachment creates the urge to chase, overexplain, and seek constant reassurance. Secure attachment stays grounded without needing external validation. The goal is to act from a secure base — even if you don't fully feel it yet. Ask before every action: is this secure or anxious?",
    example: "Urge to double-text after silence → pause. Ask: 'Is this genuine communication or a fear response?' Secure response: let it land. Move on with your day. Do not monitor. Do not wait.",
    prompts: [
      "What would a securely attached person do in this moment — and can I do that?",
      "Am I reaching out from genuine desire to connect, or from anxiety that needs soothing?",
      "Where did I learn that I needed to chase or prove myself to be loved?",
    ],
  },
  {
    id: 3,
    title: "CBT",
    field: "Cognitive Behavioral Therapy",
    icon: "△",
    tone: "indigo",
    category: "awareness",
    keyQuestion: "What thought is driving this feeling and action?",
    use: "Catching anxiety spirals before they drive behavior.",
    how: "Map the loop: Thought → Feeling → Action. Most spirals begin with an unchecked thought. Once you see the thought clearly, you can insert a new one. The goal is not to suppress feeling — it is to change the thought that generates it. Feelings follow thoughts. Change the root.",
    example: "Thought: 'She doesn't care.' → Feeling: anxiety. → Action: checking, chasing. | New thought: 'I am secure; I don't need to force closeness.' → Feeling: groundedness. → Action: returning to your own life.",
    prompts: [
      "What thought started this spiral — and is it actually true?",
      "What feeling is driving my current urge to act? Is this feeling information or distortion?",
      "If I replaced the thought with a secure one right now, what would I do instead?",
    ],
  },
  {
    id: 4,
    title: "Somatic Work",
    field: "Nervous System Regulation",
    icon: "◯",
    tone: "teal",
    category: "awareness",
    keyQuestion: "Is this truth, or is my nervous system activated?",
    use: "Regulating your body before making decisions, sending messages, or reacting.",
    how: "The nervous system cannot tell the difference between a real threat and an emotional trigger. When you feel urgency, tightness, panic, or rumination — your body is in a survival state. No clear decisions come from here. Regulate first: breath work, cold water, movement, grounding. Then decide.",
    example: "Panic after reading a short reply. Before responding: ask 'Is my body safe right now?' Do 4-7-8 breathing. When calm, the same reply looks different. The urgency was nervous system noise — not truth.",
    prompts: [
      "What does my body feel right now — and is this sensation pointing to truth or to fear?",
      "Can I name the physical feeling and where it lives in my body? What is it trying to protect me from?",
      "What would I do in this situation if my nervous system were fully regulated?",
    ],
  },
  {
    id: 5,
    title: "Stoicism",
    field: "Philosophy",
    icon: "⊡",
    tone: "amber",
    category: "control",
    keyQuestion: "What is mine to control?",
    use: "Releasing what is not yours to carry — her reactions, choices, timing, and feelings.",
    how: "The Stoic dichotomy of control: inside your circle are your identity, reactions, values, standards, and behavior. Outside it: her feelings, her choices, her timeline, her reasons. Suffering comes from trying to control what is outside. Freedom comes from fully owning what is inside.",
    example: "She hasn't responded in two days. Outside your control: her reasons, feelings, choices. Inside your control: how you carry yourself, whether you act from dignity, what you do with your energy today.",
    prompts: [
      "What in this situation is genuinely mine to control — and am I fully owning that?",
      "Where am I spending energy trying to control what is not mine? Can I release it today?",
      "If I focused only on my own character and behavior right now, what would I do?",
    ],
  },
  {
    id: 6,
    title: "Systems Thinking",
    field: "Systems / Patterns",
    icon: "↺",
    tone: "violet",
    category: "control",
    keyQuestion: "What loop keeps repeating?",
    use: "Seeing the pattern beneath isolated moments so you stop reacting to individual events.",
    how: "Instead of reacting to each moment in isolation, zoom out and see the system. Most relationship anxiety runs in loops: trigger → reaction → outcome → reset → same trigger again. Once you see the loop, you can change your input rather than being swept by the same output repeatedly.",
    example: "Mixed signal → hope → anxiety → chasing → confusion → more anxiety → mixed signal again. The loop is the problem. Changing one input (not chasing) changes the whole system output over time.",
    prompts: [
      "What loop is running in this situation — and what is my recurring input into it?",
      "If I changed just one behavior in this pattern, which change would have the most leverage?",
      "Is this moment new information, or is it the same loop presenting itself again?",
    ],
  },
  {
    id: 7,
    title: "Design Thinking",
    field: "Behavioral Design",
    icon: "◇",
    tone: "emerald",
    category: "action",
    keyQuestion: "What small action would a secure version of me take?",
    use: "Testing better behavior gently without dramatic all-or-nothing moves.",
    how: "Design thinking treats behavior as an experiment, not a performance. Instead of demanding the perfect action, ask: what is the smallest test of security I can run today? Small experiments build new identity over time. No grand gestures. Just consistent votes for the person you are becoming.",
    example: "Instead of 'I will never text first again' (all-or-nothing) → ask: 'What would a secure version of me send today, if anything?' Do that one thing. Note how it feels. Adjust. Repeat.",
    prompts: [
      "What is the smallest experiment in security I could run right now?",
      "What would a confident, grounded version of me do in this specific moment — not in theory, but today?",
      "What am I afraid will happen if I act from security instead of anxiety? Is that fear actually true?",
    ],
  },
  {
    id: 8,
    title: "Communication",
    field: "Communication Frameworks",
    icon: "≋",
    tone: "blue",
    category: "action",
    keyQuestion: "Am I being honest, calm, and direct?",
    use: "Avoiding guessing games, indirect chasing, and emotional pressure in communication.",
    how: "Clean communication is honest, calm, and direct. It says what is true without manipulation or pressure. It does not use questions designed to extract a certain response. It does not communicate indirectly and then resent the result. Speak once, clearly, then give space for the answer.",
    example: "Instead of: 'I guess you've been busy...' (indirect, hoping she fills the gap) → Try: 'I'd like to connect. Are you open to that?' — Direct. Honest. No pressure. Then respect whatever comes.",
    prompts: [
      "Am I saying what I actually mean, or communicating indirectly and hoping they'll guess?",
      "Is my message honest, calm, and free of hidden pressure or emotional manipulation?",
      "What am I actually trying to say — and can I say that directly in one clear sentence?",
    ],
  },
  {
    id: 9,
    title: "Values Framework",
    field: "Ethics / Values",
    icon: "✦",
    tone: "rose",
    category: "action",
    keyQuestion: "Does this match my values?",
    use: "Staying aligned with who you are regardless of the relationship outcome.",
    how: "Your values are your north star. When you act from your values — loyalty, peace, honesty, devotion, stability, clarity — you remain yourself regardless of outcome. Values-based action does not depend on the other person's response. It is its own reward and keeps your integrity intact.",
    example: "Your value is loyalty. Even in uncertainty, you behave loyally — not because you're guaranteed loyalty back, but because loyalty is who you are. This keeps your identity clear no matter the result.",
    prompts: [
      "What are my core values in love and relationship — and am I actually living them right now?",
      "Is this action aligned with who I want to be, or is it driven by fear of losing?",
      "If the outcome were already decided and couldn't change, would I still act this way?",
    ],
  },
  {
    id: 10,
    title: "Identity-Based Habits",
    field: "Behavioral Psychology",
    icon: "▷",
    tone: "purple",
    category: "identity",
    keyQuestion: "What would this identity do today?",
    use: "Making affirmations practical — translating 'I am loved' into daily behavior.",
    how: "Identity is built through repeated action, not declarations alone. Every time you act from your stated identity, you vote for that identity becoming real. 'I am loved' is not just a thought — it is a practice. Ask: what does a loved, secure, valued person do today? Do that. Repeat tomorrow.",
    example: "'I am loved' becomes: I move calmly. I don't beg. I receive love naturally. I respect myself. I don't chase. I invest in my own growth. Each of these is a behavioral vote for the identity you are building.",
    prompts: [
      "What does my stated identity — 'I am secure, loved, chosen' — actually look like as behavior today?",
      "What one action today would a man who is fully loved and at peace take — and can I take it?",
      "Am I voting for my desired identity with my actions right now, or am I voting against it?",
    ],
  },
];

const tones = {
  cyan:    { pill: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",    accent: "text-cyan-300/80",   card: "border-cyan-400/20 bg-cyan-500/5",   dot: "bg-cyan-400"   },
  sky:     { pill: "border-sky-400/30 bg-sky-400/10 text-sky-100",       accent: "text-sky-300/80",    card: "border-sky-400/20 bg-sky-500/5",    dot: "bg-sky-400"    },
  indigo:  { pill: "border-indigo-400/30 bg-indigo-400/10 text-indigo-100", accent: "text-indigo-300/80", card: "border-indigo-400/20 bg-indigo-500/5", dot: "bg-indigo-400" },
  teal:    { pill: "border-teal-400/30 bg-teal-400/10 text-teal-100",    accent: "text-teal-300/80",   card: "border-teal-400/20 bg-teal-500/5",   dot: "bg-teal-400"   },
  amber:   { pill: "border-amber-400/30 bg-amber-400/10 text-amber-100", accent: "text-amber-300/80",  card: "border-amber-400/20 bg-amber-500/5",  dot: "bg-amber-400"  },
  violet:  { pill: "border-violet-400/30 bg-violet-400/10 text-violet-100", accent: "text-violet-300/80", card: "border-violet-400/20 bg-violet-500/5", dot: "bg-violet-400" },
  emerald: { pill: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100", accent: "text-emerald-300/80", card: "border-emerald-400/20 bg-emerald-500/5", dot: "bg-emerald-400" },
  blue:    { pill: "border-blue-400/30 bg-blue-400/10 text-blue-100",    accent: "text-blue-300/80",   card: "border-blue-400/20 bg-blue-500/5",   dot: "bg-blue-400"   },
  rose:    { pill: "border-rose-400/30 bg-rose-400/10 text-rose-100",    accent: "text-rose-300/80",   card: "border-rose-400/20 bg-rose-500/5",   dot: "bg-rose-400"   },
  purple:  { pill: "border-purple-400/30 bg-purple-400/10 text-purple-100", accent: "text-purple-300/80", card: "border-purple-400/20 bg-purple-500/5", dot: "bg-purple-400" },
};

const powerStack = [
  {
    layer: "Spiritual",
    framework: "Law of Assumption",
    role: "The root frame. What you assume to be true about yourself and your reality is what manifests. All other frameworks operate inside this one.",
    color: "from-violet-500/20 to-transparent",
    border: "border-violet-400/30",
    accent: "text-violet-300",
  },
  {
    layer: "Emotional",
    framework: "Attachment Theory",
    role: "The diagnostic layer. Reveals whether you are operating from security or fear. Names the pattern so you can interrupt it before it drives behavior.",
    color: "from-sky-500/20 to-transparent",
    border: "border-sky-400/30",
    accent: "text-sky-300",
  },
  {
    layer: "Body",
    framework: "Nervous System Regulation",
    role: "The foundation layer. No clear decision, message, or action is possible while the body is in a survival state. Regulate first, always.",
    color: "from-teal-500/20 to-transparent",
    border: "border-teal-400/30",
    accent: "text-teal-300",
  },
  {
    layer: "Action",
    framework: "Identity-Based Habits",
    role: "The implementation layer. Turns the spiritual assumption and secure identity into daily behavior. Makes 'I am loved' a practice, not just a thought.",
    color: "from-purple-500/20 to-transparent",
    border: "border-purple-400/30",
    accent: "text-purple-300",
  },
];

const growthConceptGroups = [
  {
    group: "Foundation",
    tone: "cyan",
    summary: "The basic habits that give growth direction, rhythm, and stability.",
    concepts: [
      { name: "Reflect daily", definition: "Review your choices, feelings, and patterns so you understand yourself more honestly." },
      { name: "Set clear goals", definition: "Choose a specific outcome and direction instead of moving through life vaguely." },
      { name: "Manage time wisely", definition: "Protect your attention by spending time on what matters most." },
      { name: "Stay disciplined", definition: "Do the needed action even when motivation is low." },
      { name: "Seek balance", definition: "Keep work, rest, health, relationships, and goals in a sustainable rhythm." },
      { name: "Embrace simplicity", definition: "Remove clutter, noise, and unnecessary pressure so the important things are easier to see." },
    ],
  },
  {
    group: "Mindset",
    tone: "violet",
    summary: "The inner posture that keeps you adaptable, teachable, and steady.",
    concepts: [
      { name: "Embrace change", definition: "Accept shifting conditions and adapt instead of fighting reality." },
      { name: "Keep learning", definition: "Continue building knowledge, skill, and understanding throughout life." },
      { name: "Stay curious", definition: "Ask better questions and explore before assuming you already know." },
      { name: "Accept failure", definition: "Treat mistakes as feedback and training, not proof that you are finished." },
      { name: "Build resilience", definition: "Recover after difficulty and keep acting from your values." },
      { name: "Cultivate optimism", definition: "Train attention toward possibility and hope without denying what is hard." },
    ],
  },
  {
    group: "Courage & Skill",
    tone: "amber",
    summary: "The growth edge where fear becomes action and talent becomes mastery.",
    concepts: [
      { name: "Face your fears", definition: "Meet the things that scare you so they stop directing your life." },
      { name: "Challenge yourself", definition: "Move beyond comfort in small, deliberate ways that build capacity." },
      { name: "Improve your skills", definition: "Practice intentionally so ability compounds over time." },
      { name: "Stay creative", definition: "Use imagination to solve problems, express yourself, and see new options." },
      { name: "Pursue your passions", definition: "Give real time to the work, art, people, and goals that make life feel meaningful." },
    ],
  },
  {
    group: "Well-being",
    tone: "emerald",
    summary: "The body and attention practices that make growth easier to sustain.",
    concepts: [
      { name: "Exercise regularly", definition: "Move your body often to support energy, mood, strength, and health." },
      { name: "Read often", definition: "Use books and useful information to widen your perspective." },
      { name: "Practice mindfulness", definition: "Return attention to the present moment instead of living inside stress or distraction." },
      { name: "Prioritize your health", definition: "Care for sleep, food, movement, rest, and emotional regulation." },
      { name: "Practice gratitude", definition: "Notice what is already good so attention is not trained only on lack." },
      { name: "Develop patience", definition: "Stay calm and steady while waiting, learning, healing, or building." },
    ],
  },
  {
    group: "Relationships",
    tone: "rose",
    summary: "The social skills that turn personal growth into better connection.",
    concepts: [
      { name: "Cultivate empathy", definition: "Try to understand another person's feelings and inner world." },
      { name: "Build strong relationships", definition: "Invest in healthy connections built on trust, respect, and consistency." },
      { name: "Welcome feedback", definition: "Let useful correction improve you without making it an attack on your worth." },
      { name: "Listen actively", definition: "Give full attention so you understand before responding." },
      { name: "Communicate clearly", definition: "Say thoughts, feelings, needs, and boundaries in a way others can understand." },
      { name: "Practice kindness", definition: "Treat yourself and others with care, respect, and compassion." },
      { name: "Value honesty", definition: "Protect truth, sincerity, and integrity in your words and behavior." },
    ],
  },
];

const growthDailyLoop = [
  { time: "Morning", action: "Choose one goal, one growth concept, and one behavior that proves it today." },
  { time: "Midday", action: "Pause for two minutes. Ask: am I acting from habit, fear, or intention?" },
  { time: "Evening", action: "Reflect on one win, one lesson, and one adjustment for tomorrow." },
];

const brainRegions = [
  { id: 1, title: "Prefrontal Cortex", icon: "🎯", tone: "cyan", region: "Wisdom · Discipline · Conscious Choice", essence: "The seat of self-mastery — where you pause, plan, and choose who you become.", connected: "Planning, reasoning, decision-making, emotional control, focus, and long-term goals.", theme: "Self-mastery, clarity, purpose, and conscious awareness.", practices: ["Meditation", "Journaling", "Goal-setting", "Mindful focus", "Studying & problem-solving", "Delaying gratification", "Prayer & contemplation"], prompts: ["Where in my life am I reacting on impulse when a conscious choice is available?", "What long-term self am I building with today's small decisions?", "If I paused for ten seconds before every reaction today, what would change?"] },
  { id: 2, title: "Amygdala", icon: "🔥", tone: "rose", region: "Fear · Triggers · Safety", essence: "The alarm bell — fast, protective, and in need of reassurance, not shame.", connected: "Fear, threat detection, emotional intensity, and survival responses.", theme: "Healing fear, emotional safety, courage, and trust.", practices: ["Breathwork", "Grounding (5-4-3-2-1)", "Trauma-informed journaling", "Self-soothing", "Prayer", "Naming the emotion", "Nervous-system regulation"], prompts: ["What is my body bracing against right now — and is it truly a threat?", "Can I offer myself the safety I keep waiting for someone else to give?", "What old fear is running a pattern that no longer protects me?"] },
  { id: 3, title: "Hippocampus", icon: "📚", tone: "indigo", region: "Memory · Learning · Inner Story", essence: "The keeper of memory and meaning — where experience becomes the story of who you are.", connected: "Memory, learning, imagination, spatial awareness, and autobiographical story.", theme: "Life lessons, reflection, identity, and remembering who you are.", practices: ["Journaling", "Studying & learning", "Storytelling", "Visualization", "Gratitude lists", "Reflecting on past lessons"], prompts: ["What lesson is this season of life trying to teach me?", "Which memory am I letting define me — and is that story still true?", "What would I like to remember about who I was becoming this year?"] },
  { id: 4, title: "Insula", icon: "🫀", tone: "teal", region: "Body Awareness · Intuition", essence: "The inner sense — where gut feeling, emotion, and bodily knowing meet.", connected: "Body sensations, emotional awareness, pain signals, and interoception.", theme: "Intuition, embodiment, presence, and inner knowing.", practices: ["Body scans", "Mindful eating", "Yoga", "Breath awareness", "Somatic meditation", "Noticing gut feelings"], prompts: ["What is my body telling me that my mind keeps overriding?", "Where do I feel this emotion physically right now?", "If I trusted my gut on one decision today, what would I do?"] },
  { id: 5, title: "Default Mode Network", icon: "✦", tone: "violet", region: "Identity · Imagination · Meaning", essence: "The inner narrator — daydream, self-concept, and the world you rehearse in private.", connected: "Self-reflection, daydreaming, imagination, personal meaning, and inner narrative.", theme: "Self-concept, manifestation, identity, and purpose.", practices: ["Visualization", "SATS (state akin to sleep)", "Self-inquiry", "Contemplation & prayer", "Identity affirmations", "Revision", "Reflective journaling"], prompts: ["What story about myself am I rehearsing on autopilot?", "If I lived from the end — already whole — how would today feel?", "What identity would make my desired life feel natural rather than forced?"] },
  { id: 6, title: "Anterior Cingulate Cortex", icon: "🤝", tone: "emerald", region: "Compassion · Conflict · Alignment", essence: "The inner referee — noticing the gap between impulse and value, then choosing alignment.", connected: "Attention, emotional regulation, empathy, and conflict monitoring.", theme: "Compassion, forgiveness, harmony, and inner correction.", practices: ["Loving-kindness meditation", "Forgiveness work", "Values reflection", "Noticing inner conflict", "Choosing aligned action"], prompts: ["Where do my actions and my values disagree right now?", "Who am I still carrying resentment toward — including myself?", "What would the most compassionate version of me do here?"] },
  { id: 7, title: "Dopamine Reward System", icon: "⚡", tone: "amber", region: "Motivation · Desire · Drive", essence: "The engine of wanting — anticipation, momentum, and the pull toward what matters.", connected: "Motivation, pleasure, reward, anticipation, and habit formation.", theme: "Desire, devotion, momentum, and inspired action.", practices: ["Goal tracking", "Celebrating progress", "Movement & exercise", "Sunlight", "Music", "Meaningful rewards", "Building healthy habits"], prompts: ["Am I chasing quick hits, or building toward something that matters?", "What small win can I honor today instead of rushing past it?", "What desire is worthy of my devotion right now?"] },
  { id: 8, title: "Hypothalamus", icon: "⚖️", tone: "emerald", region: "Hormones · Stress · Basic Needs", essence: "The body's thermostat — quietly regulating hunger, sleep, stress, and balance.", connected: "Hunger, thirst, sleep, temperature, stress hormones, and regulation.", theme: "Balance, grounding, and honoring basic needs.", practices: ["Consistent sleep routine", "Hydration", "Sunlight", "Nutrition", "Relaxation", "Emotional safety", "Daily rituals"], prompts: ["Which basic need am I overriding in the name of being productive?", "What would change if I treated rest as sacred, not lazy?", "Where is my body asking for rhythm and consistency?"] },
  { id: 9, title: "Brainstem", icon: "🌬", tone: "teal", region: "Survival · Breath · Grounding", essence: "The root of aliveness — breath, heartbeat, and the steady pulse beneath thought.", connected: "Breathing, heart rate, alertness, and core survival functions.", theme: "Life force, grounding, calm, and presence.", practices: ["Slow breathing", "Humming & chanting", "Gentle cold exposure (carefully)", "Grounding exercises", "Gentle movement", "Prayer"], prompts: ["Can I slow my exhale and let my body know it is safe?", "Where am I living in my head when I could return to my breath?", "What does calm feel like in my body — and how do I get back to it?"] },
  { id: 10, title: "Cerebellum", icon: "🌀", tone: "sky", region: "Coordination · Rhythm · Embodied Skill", essence: "The master of timing — turning repeated practice into effortless flow.", connected: "Balance, movement, coordination, timing, and motor learning.", theme: "Flow, rhythm, grounded action, and practice.", practices: ["Dance", "Martial arts", "Yoga", "Walking meditation", "Breath rhythm", "Music", "Repetitive skill practice"], prompts: ["What skill would reward me for showing up daily, even imperfectly?", "Where could rhythm and repetition replace forcing and straining?", "What practice reliably puts me into flow?"] },
  { id: 11, title: "Temporal Lobes", icon: "🔔", tone: "purple", region: "Language · Meaning · Sacred Sound", essence: "The home of word and sound — where language, music, and meaning take root.", connected: "Language, hearing, memory, music, and meaning-making.", theme: "Mantra, prayer, sound healing, and sacred words.", practices: ["Chanting", "Affirmations", "Reading spiritual texts", "Listening to music", "Solfeggio frequencies", "Language learning"], prompts: ["What words am I repeating about myself — and are they worth keeping?", "What sound or song returns me to myself?", "If my self-talk were a mantra, what would I want it to say?"] },
  { id: 12, title: "Parietal Lobes", icon: "🕸", tone: "blue", region: "Perspective · Space · Unity", essence: "The mapmaker of self and space — where the boundary between you and the world softens.", connected: "Body-space awareness, attention, perspective-taking, and sensory integration.", theme: "Oneness, perspective, connection, and expanded awareness.", practices: ["Meditation", "Nature walks", "Visualization", "Perspective-taking", "Body awareness", "Awe practices"], prompts: ["Where am I gripping 'me and mine' when connection is available?", "What would this situation look like from a wider, kinder perspective?", "When did I last feel awe — and how do I make more room for it?"] },
  { id: 13, title: "Occipital Lobes", icon: "👁", tone: "indigo", region: "Vision · Imagery · Inner Seeing", essence: "The screen of the mind — where outer sight and inner vision are rendered.", connected: "Visual processing, mental imagery, and inner picturing.", theme: "Visualization, imagination, symbolic vision, and seeing possibility.", practices: ["Visualization", "Vision boards", "Candle gazing", "Dream journaling", "Art", "Guided imagery"], prompts: ["What future can I picture clearly — and what stays blurry?", "If I could see one possibility vividly today, which would I choose?", "What image represents who I am becoming?"] },
  { id: 14, title: "Corpus Callosum", icon: "☯", tone: "violet", region: "Integration · Whole-Brain Balance", essence: "The bridge — uniting logic and intuition, action and receptivity, into one whole self.", connected: "Communication between the left and right hemispheres.", theme: "Balance of logic and intuition, masculine and feminine, doing and receiving.", practices: ["Bilateral movement", "Walking", "Drumming", "Alternate-nostril breathing", "Cross-body exercises", "Journaling paired with visualization"], prompts: ["Am I over-relying on logic or intuition right now — and what restores balance?", "Where do I need to receive rather than push?", "What would integration — head and heart aligned — feel like today?"] },
];

const brainPractices = [
  { practice: "Meditation", regions: "Prefrontal cortex · Insula · Anterior cingulate" },
  { practice: "Journaling", regions: "Prefrontal cortex · Hippocampus · Default mode network" },
  { practice: "Gratitude", regions: "Reward system · Prefrontal cortex · Emotional regulation" },
  { practice: "Exercise", regions: "Hippocampus · Prefrontal cortex · Dopamine system" },
  { practice: "Breathwork", regions: "Brainstem · Amygdala · Nervous system" },
  { practice: "Visualization", regions: "Occipital lobes · Default mode network · Prefrontal cortex" },
  { practice: "Prayer / mantra", regions: "Temporal lobes · Attention networks · Emotional regulation" },
  { practice: "Sleep", regions: "Hippocampus · Prefrontal cortex · Hypothalamus" },
];

const emotionSteps = [
  { id: 1, title: "Slow Down and Create Space", icon: "◎", tone: "cyan", summary: "Daily check-ins build the habit of noticing what is happening inside before the moment passes.", details: "Take 5–10 minutes daily to sit quietly. Ask: What am I feeling right now? Where do I feel it in my body? Can I name it — sad, tense, numb, irritated? A Feelings Wheel helps with complex or vague emotions that resist easy naming.", prompts: ["What am I feeling right now — and where do I feel it in my body?", "If I had to put one word on this feeling, what would it be?", "What was the last moment today when something shifted inside me?"] },
  { id: 2, title: "Journal Without Judgment", icon: "✍", tone: "sky", summary: "Free-writing creates distance between you and the feeling — enough space to see it clearly.", details: "Write for 5–10 minutes about your day or a recent event. Focus on how things made you feel, not just what happened. Start with: \"Right now I feel ___ because ___\" or \"I don't know what I feel, but if I had to guess…\" No editing, no correcting — just honest motion.", prompts: ["Right now I feel ___ because ___.", "I don't know what I feel, but if I had to guess, it might be ___.", "The last time I felt clearly understood was ___."] },
  { id: 3, title: "Track Patterns", icon: "↺", tone: "indigo", summary: "Emotions become more readable once you can see what consistently triggers them.", details: "Reflect on recurring triggers: certain people, stressful situations, criticism, silence, or specific times of day. Use a simple emotion log — event → feeling → thought — to connect what happens outside to what moves inside. Patterns reveal the real conversation you are having with yourself.", prompts: ["What kind of situation consistently unsettles me — and what does that tell me?", "Is there a person or context that reliably changes how I feel about myself?", "What is the emotion I keep bumping into this week?"] },
  { id: 4, title: "Name Before You Fix", icon: "◇", tone: "teal", summary: "Naming an emotion halves its intensity. You do not have to solve it — just see it.", details: "Do not rush to fix, suppress, or explain the feeling away. Practice simply saying: \"I feel anxious.\" \"I feel disconnected.\" \"I don't know what I feel, but something is off.\" Research shows that labeling emotions — affect labeling — reduces their grip on the nervous system and brings the prefrontal cortex back online.", prompts: ["Can I name this feeling without immediately trying to fix or justify it?", "What happens inside me when I just say the word for what I feel?", "What am I trying to escape by staying busy right now?"] },
  { id: 5, title: "Try Somatic Techniques", icon: "◯", tone: "emerald", summary: "Emotions arrive in the body before the mind catches them — learning to listen closes the gap.", details: "Body scans, breathwork, and gentle movement (yoga, walking) help you tune into the physical cues your emotions leave. Ask: Where am I holding tension? What is that telling me? The body speaks in sensations before the mind forms sentences — somatic awareness is emotional awareness at its root.", prompts: ["Where in my body am I carrying something right now?", "What does this feeling physically feel like — tight, heavy, buzzing, empty?", "If my body could speak one sentence right now, what would it say?"] },
  { id: 6, title: "Expand Your Emotional Vocabulary", icon: "≋", tone: "violet", summary: "The more words you have for emotions, the more precisely you can identify and work with them.", details: "Many people default to a handful of broad words — good, bad, stressed, fine. Expanding your vocabulary (furious vs. irritated, melancholy vs. sad, awe vs. excitement) gives you sharper tools. Books that help: Permission to Feel by Marc Brackett, The Language of Emotions by Karla McLaren. More words means more clarity.", prompts: ["If 'stressed' or 'fine' is too simple, what word comes closer to the truth?", "Is there a more precise word for what I am feeling than the one I usually use?", "What emotion am I rarely willing to name — and why?"] },
  { id: 7, title: "Consider Therapy or Coaching", icon: "⌘", tone: "amber", summary: "A skilled guide can decode what you are feeling and help you understand why.", details: "A therapist or coach offers reflective presence that is hard to replicate alone. Cognitive-behavioral therapy (CBT) and emotion-focused therapy (EFT) are especially useful for building emotional literacy. You do not have to be in crisis to benefit — going earlier, while things are workable, is usually easier and more effective.", prompts: ["What emotion have I been carrying alone that might benefit from being witnessed?", "If I could ask a guide one question about my inner life, what would it be?", "What story about seeking help am I still holding?"] },
  { id: 8, title: "Accept Emotional Confusion as Normal", icon: "△", tone: "rose", summary: "Emotions are layered and contradictory. The goal is not clarity — it is curiosity.", details: "You can feel both anger and love. Both relief and guilt. Both hope and exhaustion. That is not a malfunction — that is depth. The goal is not to always understand what you feel, but to stay with it long enough to learn something. Confusion is not the opposite of emotional intelligence. It is often the beginning of it.", prompts: ["Am I trying to resolve a feeling prematurely, when staying with it might teach me more?", "What contradictory feelings are present at once right now — and can I hold both?", "What would it mean to stay curious about this feeling instead of solving it?"] },
];

const emotionJournalPrompts = [
  "Right now I feel ___ because ___.",
  "I don't know what I feel, but if I had to guess…",
  "The last time I felt clearly understood was ___.",
  "Something I keep feeling but rarely name is ___.",
  "When this emotion passes, I want to remember that ___.",
];

const nonJudgmentSteps = [
  { step: 1, title: "Pause and Observe", icon: "◎", tone: "cyan", body: "Take a moment to pause during your day. Notice what thoughts are passing through your mind and what emotions are present — without immediately acting on them or narrating a story about them. Observation itself is the first act of freedom." },
  { step: 2, title: "Acknowledge Without Judgment", icon: "◇", tone: "sky", body: "Recognize these thoughts and emotions without trying to change, suppress, or criticize them. Simply note: \"I'm feeling anxious\" or \"I'm thinking about tomorrow.\" The act of naming creates a small but crucial distance between you and the experience." },
  { step: 3, title: "Return to the Present", icon: "⊙", tone: "teal", body: "Bring your attention back to the current moment. Focusing on the breath, sounds in the room, or physical sensations helps anchor awareness here rather than in past regrets or future worries. The present is always the only place practice can happen." },
  { step: 4, title: "Practice Regularly", icon: "↺", tone: "indigo", body: "Non-judgmental awareness is a skill that deepens with repetition. Even five minutes of mindful observation each day — sitting quietly, walking, or pausing between activities — rewires the default pattern of reacting before noticing." },
  { step: 5, title: "Be Kind to Yourself", icon: "◈", tone: "rose", body: "Self-compassion is the foundation of the practice. If you catch yourself judging your own thoughts or emotions, gently acknowledge the judgment and return to observing. Harshness is just another thought to observe — not a verdict. Change is gradual, and gentleness sustains it." },
];

const shadowPatterns = [
  { id: 1, shadow: "Overthinking", growth: "Clarity", icon: "◎", tone: "cyan", qualities: "Mental stillness, trust in intuition, decisive focus.", description: "Overthinking is the mind trying to control uncertainty by rehearsing every outcome. Clarity does not come from more thinking — it comes from quieting the mind long enough to hear what you already know. Trust in intuition is not irrational; it is pattern recognition that has gone below the surface.", prompts: ["What decision am I already clear on, but am delaying by thinking more?", "What would I do right now if I trusted my gut completely?", "Where is the thinking protecting me from something I am afraid to feel?"] },
  { id: 2, shadow: "Emotional withholding", growth: "Emotional openness", icon: "◇", tone: "rose", qualities: "Vulnerability, safe expression, emotional availability.", description: "Emotional withholding is protection dressed as self-control. It keeps connection at a distance so that it cannot hurt you. Emotional openness does not mean sharing everything — it means being willing to be known. Vulnerability is not weakness; it is the only path to actual closeness.", prompts: ["What am I not saying that is quietly shaping this relationship?", "What would I share if I trusted that being known was safe?", "Where did I learn that showing emotion was dangerous — and is that still true?"] },
  { id: 3, shadow: "Control issues", growth: "Trust and surrender", icon: "⊡", tone: "indigo", qualities: "Letting go, collaboration, flow with others and life.", description: "The need to control is a fear of outcomes — particularly the fear that without your management, things will fall apart. Surrender does not mean passivity; it means doing your part and releasing the rest. Control creates resistance in relationships. Trust creates space for something better to arrive.", prompts: ["What am I gripping so tightly that I am exhausting myself and others?", "What would happen if I did my part and let go of the outcome?", "What does the need to control here tell me about what I am afraid of?"] },
  { id: 4, shadow: "Escapism", growth: "Grounded presence", icon: "◯", tone: "teal", qualities: "Mindfulness, reality engagement, emotional maturity.", description: "Escapism is the habit of leaving the present — through screens, fantasy, substances, or busyness — to avoid what is difficult or uncomfortable. Grounded presence does not mean forcing positivity; it means staying in contact with your actual life long enough to learn from it and change it.", prompts: ["What am I escaping right now — and what am I escaping from?", "What would I have to face if I stayed present for the next hour?", "What is one way I could meet reality today instead of leaving it?"] },
  { id: 5, shadow: "Restlessness", growth: "Contentment", icon: "≋", tone: "emerald", qualities: "Inner peace, patience, appreciation for stillness.", description: "Restlessness is a signal that the present feels insufficient — that somewhere else, something better is waiting. Contentment is not complacency; it is the ability to be fully where you are without needing it to be different. Stillness is not the absence of desire. It is desire at peace with this moment.", prompts: ["What am I searching for that I might already have in a different form?", "Can I be fully here, in this moment, for five minutes — and what comes up when I try?", "What would contentment feel like — and what am I afraid it would cost me?"] },
  { id: 6, shadow: "Rigidity", growth: "Flexibility", icon: "↺", tone: "violet", qualities: "Adaptability, openness to change, creative flow.", description: "Rigidity is the mind's attempt to stay safe by keeping everything predictable and controlled. It often shows up as 'the way things should be.' Flexibility is not spinelessness — it is intelligence meeting reality as it actually is. The ability to adapt is one of the deepest forms of inner strength.", prompts: ["Where am I insisting on 'the right way' when another way might also work?", "What would change if I held this situation more loosely?", "What belief about how life should be is causing me the most friction right now?"] },
  { id: 7, shadow: "Sensitivity to criticism", growth: "Inner confidence", icon: "△", tone: "amber", qualities: "Self-assurance, self-validation, calm under feedback.", description: "Sensitivity to criticism usually means your sense of self is still partly dependent on external approval. When someone's words can shatter your peace, it reveals that their opinion holds more authority than your own. Inner confidence is not arrogance — it is having a stable enough self-image that feedback becomes information rather than verdict.", prompts: ["Whose criticism affects me most — and what does that person represent to me?", "If I fully trusted my own worth, how would I receive this feedback differently?", "What is the gap between how I see myself and how I fear others see me?"] },
  { id: 8, shadow: "Power struggles", growth: "Empowerment and equality", icon: "✦", tone: "sky", qualities: "Mutual respect, shared leadership, conscious relating.", description: "Power struggles happen when two people are each trying to feel safe, but in opposing ways. One pushes; the other resists. Both feel unseen. Empowerment shifts the question from 'who wins?' to 'how do we both feel respected?' This requires someone to stop fighting long enough to be curious instead.", prompts: ["What am I trying to protect in this struggle — and is there a softer way to protect it?", "What would mutual respect look like here, instead of winning?", "Where am I reacting to past power dynamics rather than the person in front of me?"] },
  { id: 9, shadow: "Avoidance of vulnerability", growth: "Courageous intimacy", icon: "⌘", tone: "purple", qualities: "Emotional honesty, softness, trust in safe connection.", description: "Avoiding vulnerability is a learned defense — proof that openness once brought pain. Courageous intimacy means choosing to be seen anyway, with discernment about who deserves that access. It does not require dropping all walls. It requires identifying safe people and choosing to let them in, even when it is uncomfortable.", prompts: ["With whom do I feel safe enough to be fully honest — and am I using that safety?", "What am I protecting by staying closed — and what is it costing me?", "What is one vulnerable truth I could share that would move this connection forward?"] },
  { id: 10, shadow: "Idealism in relationships", growth: "Realistic love", icon: "◈", tone: "rose", qualities: "Grounded affection, healthy expectations, mature bonding.", description: "Romantic idealism places an imagined version of a person above the real one. It loves the potential, not the present. Realistic love does not mean settling — it means seeing someone clearly and choosing them anyway. Mature bonding is built on truth, not projection. It is more durable and more nourishing than any fantasy.", prompts: ["Am I in love with this person, or with who I imagine they could become?", "What am I unwilling to see clearly — and why?", "What would loving someone realistically, exactly as they are, require from me?"] },
];

const manifestConcepts = [
  {
    id: 1,
    title: "Vibration and Energy",
    icon: "✦",
    tone: "violet",
    lens: "Law of Attraction",
    summary: "Like attracts like — your inner state is always broadcasting a signal.",
    detail: "The law of attraction holds that your dominant emotional state acts as a frequency that draws matching experiences toward you. Low-energy states like guilt, apathy, and stagnation tend to attract more of the same. High-energy states — clarity, gratitude, purpose, inspired action — attract experiences that match them. Your daily habits are not just practical; they are energetic signals.",
    prompts: [
      "What emotional state have I been in most of the day — and what might it be attracting?",
      "What one habit is consistently keeping my energy lower than I want it to be?",
      "If my current state were a broadcast, what would it be inviting into my life?",
    ],
  },
  {
    id: 2,
    title: "Clarity of Intention",
    icon: "◎",
    tone: "cyan",
    lens: "Focus & Alignment",
    summary: "Manifestation works best when your mind is clear and your intention is single-pointed.",
    detail: "A scattered, unstructured day fractures your focus and dilutes your intention. The mind cannot simultaneously pursue ten directions. Clarity is not just a mental state — it is a daily practice. Morning intention-setting, journaling, and visualization are not soft rituals; they are the tools that point your attention consistently toward what matters.",
    prompts: [
      "What is the one thing I most want to create in my life right now — and am I clear on it?",
      "How many directions is my attention pulled today — and which of them actually matters?",
      "If I set one clear intention this morning, what would it be?",
    ],
  },
  {
    id: 3,
    title: "Self-Sabotage",
    icon: "↺",
    tone: "rose",
    lens: "Psychology",
    summary: "Habits that signal a lack of self-worth to the subconscious quietly undermine what you are building.",
    detail: "Patterns like skipping hygiene, overusing substances, or compulsive avoidance behaviors are not just practical problems — they send a message to your subconscious about your value and seriousness. The subconscious is literal: it manifests what it believes you believe about yourself. Every bypassed routine is a small vote for 'I am not worth the effort.' Every followed-through habit is a vote the other way.",
    prompts: [
      "What habit am I tolerating that quietly signals to myself that I am not a priority?",
      "What would I do differently today if I truly believed I deserved what I am trying to create?",
      "Where am I sabotaging my own momentum — and what am I avoiding by doing it?",
    ],
  },
  {
    id: 4,
    title: "Momentum and Dopamine",
    icon: "⚡",
    tone: "amber",
    lens: "Neuroscience",
    summary: "Small wins release dopamine, which fuels motivation — without them, the brain seeks easier hits.",
    detail: "Every small completed action — making your bed, eating a good meal, finishing a task — releases dopamine and builds neural momentum. Without these, your brain looks for faster, cheaper dopamine from phones, substances, or distraction. The problem is that easy dopamine raises the reward threshold: real life starts to feel flat by comparison. Daily discipline is, in part, a dopamine management practice.",
    prompts: [
      "What small win can I build into today that will give me a genuine sense of completion?",
      "Am I outsourcing my motivation to quick hits — and what is that costing me?",
      "What would one fully completed, disciplined morning feel like compared to a scattered one?",
    ],
  },
  {
    id: 5,
    title: "Routine as Alignment",
    icon: "◇",
    tone: "emerald",
    lens: "Behavioral Design",
    summary: "When your daily actions match your stated desires, you send a unified message — to yourself and to life.",
    detail: "Routine is not rigidity. It is congruence — the state in which what you do matches what you say you want. Incongruence creates internal static: you claim to want discipline while living in chaos, or claim to want love while neglecting yourself. A structured day does not restrict you; it proves to your subconscious that you are serious. Structure is a form of self-respect made visible.",
    prompts: [
      "Do my current daily actions look like the actions of someone who has what I want?",
      "Where is there a gap between what I say I want and what my day actually reflects?",
      "What one structural change to my day would create the most alignment?",
    ],
  },
];

const manifestSteps = [
  {
    step: "Start with one habit",
    desc: "You do not need to overhaul your entire day. Make your bed, eat breakfast, or drink water first. One followed-through habit shifts the tone of the whole day.",
  },
  {
    step: "Intentional mornings",
    desc: "Begin with clarity — set one intention, journal for five minutes, or visualize what you want to create. How you start the morning tends to define the day's momentum.",
  },
  {
    step: "Moderate, do not eliminate",
    desc: "Moderation is more sustainable than restriction. Use pleasure as a reward that follows discipline, not as the default before it.",
  },
  {
    step: "Replace passive with active",
    desc: "Swap one passive habit (scrolling, spacing out) for an active one: a walk, ten minutes of movement, or a few minutes of meditation. Active engagement raises energy; passive consumption drains it.",
  },
  {
    step: "Practice gratitude daily",
    desc: "Gratitude shifts attention from scarcity to abundance, which is the energetic posture from which manifestation flows. Even two minutes of genuine acknowledgment changes the frequency of the day.",
  },
];

const imaginationTechniques = [
  {
    id: 1,
    title: "Looping",
    icon: "↺",
    tone: "violet",
    tagline: "Short scene on repeat — locks in the state fast.",
    bestFor: "Locking in the feeling quickly, especially if you tend to overthink.",
    howTo: "Pick a 5–10 second end-scene that implies it is already done — not trying, not hoping. Loop it gently like a GIF: same moment, same outcome, same feeling. Keep attention on one dominant sense of naturalness: 'It is normal. It is mine.' You are not forcing; you are settling.",
    whenItWorks: "You feel a 'click' of naturalness — not excitement, just ease. Your mind stops asking how or when.",
    whenItFails: "It becomes mechanical — you are chanting pictures. You feel pressure to make it work. Switch to novelty or a different scene angle.",
    prompts: [
      "What 10-second moment would only exist if my desire were already real?",
      "Can I feel the naturalness of that scene — not the excitement, just the 'of course'?",
      "Is my loop implying done, or implying wanting?",
    ],
  },
  {
    id: 2,
    title: "Repeating",
    icon: "≋",
    tone: "cyan",
    tagline: "Identity-level affirmation — retrains the assumption during the day.",
    bestFor: "Rewriting the story you tell yourself in ordinary moments between sessions.",
    howTo: "Use a single line that states the end in present tense — 'This is already my life.' 'It is handled.' 'I am the person who has this.' Say it like a fact, not like a spell. Use it the moment you notice the old story rising, then return to normal life. You are not convincing reality; you are returning to the identity you are choosing.",
    whenItWorks: "The old anxious thought loses traction. The new line feels increasingly like truth rather than hope.",
    whenItFails: "You are fighting thoughts and anxiety spikes. Use one calming phrase and an exhale — 'Already done' — then drop it entirely.",
    prompts: [
      "What is the one-line identity statement that is truest from the end?",
      "Am I saying this like a fact or like a wish — and what is the difference in how it lands?",
      "When the old story rises today, what one line do I return to?",
    ],
  },
  {
    id: 3,
    title: "Novelty",
    icon: "◈",
    tone: "emerald",
    tagline: "New angles, new scenes — restores believability when looping goes stale.",
    bestFor: "When your main loop stops producing feeling, or the desire feels abstract.",
    howTo: "Change the proof, not the desire. Try: a friend congratulating you, seeing your name on something, receiving the message, checking an account, waking up in that life on a normal Tuesday. Change the sense: hear a tone of voice, feel an object in your hand, notice the light in the room. Your brain wakes up when the scene is fresh, and the feeling of 'of course' lands more easily.",
    whenItWorks: "You feel real surprise or warmth at the new angle. The desire feels close and specific rather than abstract.",
    whenItFails: "You are endlessly searching for the 'perfect scene' instead of settling into any one. Return to your original loop for one session.",
    prompts: [
      "What sensory detail — sound, texture, smell — would be present in the wish-fulfilled life?",
      "What is a completely ordinary Tuesday in the life I want?",
      "Who would be there? What would they say? What would I feel?",
    ],
  },
];

const threeLayerSystem = [
  {
    timing: "Night / deep session",
    technique: "Looping",
    tone: "violet",
    desc: "1–3 minutes of a short end-scene, looped gently until the feeling of naturalness settles.",
  },
  {
    timing: "Daytime",
    technique: "Repeating",
    tone: "cyan",
    desc: "One identity line, 10–20 seconds, each time the old story surfaces. Then return to ordinary life.",
  },
  {
    timing: "When stale",
    technique: "Novelty",
    tone: "emerald",
    desc: "1–2 days of a fresh scene or angle. Then return to looping once the feeling is live again.",
  },
];

const livingInTheEndSigns = [
  "You feel less urgency about the desire.",
  "You stop checking for signs as often.",
  "You react to outer circumstances like: 'Old echo — not my source.'",
  "You naturally think and act from: 'This is who I am.'",
];

function Pill({ children, tone = "cyan" }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]?.pill || tones.cyan.pill}`}>
      {children}
    </span>
  );
}

function ReflectionModal({ prompts, title, tone, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!prompts) return null;
  const t = tones[tone] || tones.cyan;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.3em] ${t.accent}`}>Reflection Prompts</p>
              <h2 className="mt-1 text-xl font-black text-white">{title}</h2>
            </div>
            <button
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6">
          {prompts.map((prompt, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${t.card}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Prompt {i + 1}</p>
              <p className="text-sm leading-7 text-slate-200">{prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose, onReflect }) {
  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={item.tone}>{item.field}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.icon} {item.title}</h2>
              <p className={`mt-1 text-sm font-semibold ${t.accent}`}>"{item.keyQuestion}"</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                onClick={() => onReflect(item)}
              >
                ◈ Reflect
              </button>
              <button
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {[
            { label: "Use it for", value: item.use },
            { label: "How it works", value: item.how },
            { label: "Example", value: item.example },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</div>
              <p className="text-sm leading-7 text-slate-200">{value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-5">
          <button
            className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
            onClick={() => onReflect(item)}
          >
            ◈ Open Reflection Prompts for {item.title}
          </button>
        </div>
      </div>
    </div>
  );
}

function FrameworkCard({ item, onOpen, onReflect }) {
  const t = tones[item.tone] || tones.cyan;

  return (
    <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
      <button onClick={() => onOpen(item)} className="block flex-1 p-5 text-left">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Pill tone={item.tone}>{item.field}</Pill>
          <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-2xl ${t.accent}`}>{item.icon}</span>
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
        </div>
        <p className={`mt-2 text-xs font-semibold ${t.accent}`}>"{item.keyQuestion}"</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{item.use}</p>
      </button>
      <div className="border-t border-white/[0.06] px-5 pb-4 pt-3">
        <button
          onClick={(e) => { e.stopPropagation(); onReflect(item); }}
          className="w-full rounded-xl border border-cyan-300/20 bg-cyan-300/5 py-2 text-xs font-semibold text-cyan-200/80 transition hover:bg-cyan-300/10 hover:text-cyan-100"
        >
          ◈ Reflect
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
      {children && <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{children}</p>}
    </div>
  );
}

function BrainGlyph() {
  return (
    <svg viewBox="0 0 120 120" width="150" height="150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><radialGradient id="brainGlow" cx="50%" cy="45%" r="60%"><stop offset="0%" stopColor="rgba(34,211,238,0.28)" /><stop offset="100%" stopColor="rgba(34,211,238,0)" /></radialGradient></defs>
      <circle cx="60" cy="58" r="52" fill="url(#brainGlow)" />
      <path d="M60 24c-9 0-14 5-15 11-7-1-13 4-13 11 0 3 1 5 3 7-3 2-5 5-5 9 0 6 5 11 12 11 1 6 6 10 13 10s12-4 13-10c7 0 12-5 12-11 0-4-2-7-5-9 2-2 3-4 3-7 0-7-6-12-13-11-1-6-6-11-15-11z" stroke="rgba(165,243,252,0.7)" strokeWidth="1.6" fill="rgba(34,211,238,0.05)" strokeLinejoin="round" />
      <path d="M60 24v70M48 38c4 2 8 2 12 0M44 56c6 3 22 3 28 0M46 74c5 2 19 2 24 0" stroke="rgba(165,243,252,0.45)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BrainRegionModal({ item, onClose, onReflect }) {
  useEffect(() => {
    if (!item) return undefined;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);
  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={item.tone}>{item.region}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.icon} {item.title}</h2>
              <p className={`mt-1 text-sm font-semibold ${t.accent}`}>{item.essence}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20" onClick={() => onReflect(item)}>◈ Reflect</button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-5">
          {[{ label: "Connected to", value: item.connected }, { label: "Spiritual theme", value: item.theme }].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</div>
              <p className="text-sm leading-7 text-slate-200">{value}</p>
            </div>
          ))}
          <div className={`rounded-2xl border p-4 ${t.card}`}>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Practices that strengthen it</div>
            <div className="flex flex-wrap gap-2">{item.practices.map((p) => <span key={p} className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${t.pill}`}>{p}</span>)}</div>
          </div>
        </div>
        <div className="border-t border-white/10 p-5">
          <button className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10" onClick={() => onReflect(item)}>◈ Open Reflection Prompts for {item.title}</button>
        </div>
      </div>
    </div>
  );
}

function EmotionStepModal({ item, onClose, onReflect }) {
  useEffect(() => {
    if (!item) return undefined;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);
  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={item.tone}>Step {item.id}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.icon} {item.title}</h2>
              <p className={`mt-1 text-sm font-semibold ${t.accent}`}>{item.summary}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20" onClick={() => onReflect(item)}>◈ Reflect</button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">How to practice it</div>
            <p className="text-sm leading-7 text-slate-200">{item.details}</p>
          </div>
        </div>
        <div className="border-t border-white/10 p-5">
          <button className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10" onClick={() => onReflect(item)}>◈ Open Reflection Prompts</button>
        </div>
      </div>
    </div>
  );
}

function ShadowModal({ item, onClose, onReflect }) {
  useEffect(() => {
    if (!item) return undefined;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);
  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${t.accent}`}>{item.shadow}</span>
                <span className="text-slate-500">→</span>
                <span className="text-lg font-bold text-white">{item.growth}</span>
              </div>
              <p className={`mt-1 text-xs font-medium ${t.accent}`}>{item.qualities}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20" onClick={() => onReflect(item)}>◈ Reflect</button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-5">
          <div className={`rounded-2xl border p-4 ${t.card}`}>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">The pattern</div>
            <p className="text-sm leading-7 text-slate-200">{item.description}</p>
          </div>
        </div>
        <div className="border-t border-white/10 p-5">
          <button className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10" onClick={() => onReflect(item)}>◈ Open Reflection Prompts</button>
        </div>
      </div>
    </div>
  );
}

function ManifestModal({ item, onClose, onReflect }) {
  useEffect(() => {
    if (!item) return undefined;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={item.tone}>{item.lens}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.icon} {item.title}</h2>
              <p className={`mt-1 text-sm font-semibold ${t.accent}`}>{item.summary}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20" onClick={() => onReflect(item)}>◈ Reflect</button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">How it works</div>
            <p className="text-sm leading-7 text-slate-200">{item.detail}</p>
          </div>
        </div>
        <div className="border-t border-white/10 p-5">
          <button className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10" onClick={() => onReflect(item)}>◈ Open Reflection Prompts</button>
        </div>
      </div>
    </div>
  );
}

function ImaginationModal({ item, onClose, onReflect }) {
  useEffect(() => {
    if (!item) return undefined;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  if (!item) return null;
  const t = tones[item.tone] || tones.cyan;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={item.tone}>Imagination technique</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.icon} {item.title}</h2>
              <p className={`mt-1 text-sm font-semibold ${t.accent}`}>{item.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20" onClick={() => onReflect(item)}>◈ Reflect</button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-5">
          {[
            { label: "Best for", value: item.bestFor },
            { label: "How to do it", value: item.howTo },
            { label: "When it works", value: item.whenItWorks },
            { label: "When it fails — switch to", value: item.whenItFails },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</div>
              <p className="text-sm leading-7 text-slate-200">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-5">
          <button className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/5 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10" onClick={() => onReflect(item)}>◈ Open Reflection Prompts</button>
        </div>
      </div>
    </div>
  );
}

export default function PsychologyPortal({ onBack, onNavigate, onSelectSection, initialSection }) {
  const validInitial = ["overview", "frameworks", "powerstack", "growth", "nutrients", "brain", "emotions", "shadow", "manifest"].includes(initialSection)
    ? initialSection
    : "overview";
  const [activeTab, setActiveTab] = useState(validInitial);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [brainModal, setBrainModal] = useState(null);
  const [emotionModal, setEmotionModal] = useState(null);
  const [shadowModal, setShadowModal] = useState(null);
  const [manifestModal, setManifestModal] = useState(null);
  const [imaginationModal, setImaginationModal] = useState(null);
  const [reflectionModal, setReflectionModal] = useState(null);
  const [todayCard, setTodayCard] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("psychology-today-card") || "null");
    } catch {
      return null;
    }
  });
  const [checkins, setCheckins] = useState(() => {
    const date = new Date().toISOString().slice(0, 10);
    try {
      const parsed = JSON.parse(window.localStorage.getItem("psychology-checkins") || "null");
      if (parsed?.date === date) return parsed;
    } catch {
      // ignore corrupt storage
    }
    return { date, morning: false, midday: false, night: false };
  });

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) return frameworks;
    return frameworks.filter((f) => JSON.stringify(f).toLowerCase().includes(lower));
  }, [query]);

  const openDetail = (item) => setModal(item);
  const openReflection = (item) => setReflectionModal(item);
  const quickStart = () => {
    const card = {
      createdAt: new Date().toLocaleString(),
      identity: "I am loved, chosen, and secure now.",
      sats: "I hear: ‘I love being with you.’ It feels natural and done.",
      revision: "I remember when I felt uncertain. Now I live from security.",
      mentalDiet: "This is the old state. I return to the fulfilled one.",
    };
    setTodayCard(card);
    window.localStorage.setItem("psychology-today-card", JSON.stringify(card));
  };
  const toggleCheckin = (slot) => {
    setCheckins((current) => {
      const next = { ...current, [slot]: !current[slot] };
      window.localStorage.setItem("psychology-checkins", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="ia-root text-slate-100" style={accentVars('psychology')}>
      <InnerAtlasNav activeId="psychology" onBack={onBack} onSelectSection={onSelectSection} title="Psychology Atlas" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[3.5rem] lg:h-[calc(100vh-3.5rem)] lg:w-72">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-4">
              <div className="text-3xl">◈</div>
              <h1 className="mt-3 text-2xl font-black leading-tight text-white">Psychology Portal</h1>
              <p className="mt-2 text-sm leading-6 text-cyan-50/75">Ten frameworks for identity work, relationship reflection, and living from the end.</p>
            </div>

            <div className="mt-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                    activeTab === tab.id ? "bg-white text-slate-950 shadow-lg" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Frameworks</div>
              {frameworks.map((f) => {
                const t = tones[f.tone] || tones.cyan;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setModal(f); setActiveTab("frameworks"); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition hover:bg-white/10"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
                    <span className="font-semibold text-slate-300">{f.id}. {f.title}</span>
                  </button>
                );
              })}
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('inneratlas')}
                className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">◍</span>
                <div>
                  <div className="font-semibold text-white">InnerAtlas</div>
                  <div className="text-xs text-slate-500">Explore the full inner map →</div>
                </div>
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Hero */}
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl backdrop-blur-xl">
            <div className="relative p-6 md:p-8">
              <div className="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 md:block">
                Study Mode · Psychology
              </div>
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Pill tone="cyan">Self-Schema</Pill>
                  <Pill tone="sky">Attachment</Pill>
                  <Pill tone="teal">Somatic</Pill>
                  <Pill tone="purple">Identity</Pill>
                  <Pill tone="emerald">Growth</Pill>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Frameworks for identity work, relationship clarity, and personal growth.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Borrow tools from psychology, philosophy, and behavioral science to stop reacting from fear and start moving from a secure, grounded identity.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveTab("frameworks"); }}
                  placeholder="Search identity, anxiety, attachment, stoicism, growth..."
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                />
                <button onClick={() => setQuery("")} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-slate-200 hover:bg-white/10">
                  Clear
                </button>
              </div>
            </div>
          </section>

          {/* Tab content */}
          <section className="mt-6 rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div>
                <SectionHeader eyebrow="Start here" title="Ten frameworks for one goal">
                  Each framework targets a different layer of the same work: becoming the kind of person whose identity, body, and behavior are aligned — so you stop living from anxiety and start living from security.
                </SectionHeader>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Identity", count: 2, desc: "Self-Schema · Identity-Based Habits", tone: "cyan" },
                    { label: "Awareness", count: 3, desc: "Attachment · CBT · Somatic Work", tone: "teal" },
                    { label: "Control", count: 2, desc: "Stoicism · Systems Thinking", tone: "violet" },
                    { label: "Action", count: 3, desc: "Design · Communication · Values", tone: "emerald" },
                  ].map(({ label, count, desc, tone }) => (
                    <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                      <Pill tone={tone}>{label}</Pill>
                      <div className="mt-5 text-5xl font-black text-white">{count}</div>
                      <p className="mt-3 text-xs leading-6 text-slate-400">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/5 p-6">
                    <h3 className="text-xl font-bold text-white">Start here (5 minutes)</h3>
                    <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <li><strong className="text-white">1.</strong> Choose desire: one sentence only.</li>
                      <li><strong className="text-white">2.</strong> Choose identity: “I am already...”</li>
                      <li><strong className="text-white">3.</strong> Loop one SATS scene for 60–90 seconds.</li>
                      <li><strong className="text-white">4.</strong> Pick one mental diet line and carry it today.</li>
                    </ol>
                    <button onClick={quickStart} className="mt-5 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-900">Generate Today Card</button>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="text-xl font-bold text-white">How to use this portal</h3>
                    <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <li><strong className="text-white">1.</strong> Notice the feeling or pattern you are in right now.</li>
                      <li><strong className="text-white">2.</strong> Open the matching framework to name it.</li>
                      <li><strong className="text-white">3.</strong> Use the reflection prompts to go deeper.</li>
                      <li><strong className="text-white">4.</strong> Take one small action from a secure identity.</li>
                    </ol>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="text-xl font-bold text-white">The core question</h3>
                    <p className="mt-4 text-2xl font-black leading-tight text-cyan-300">"Am I acting from security or from fear?"</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">Every framework in this portal is a different angle on this one question. The goal is not to eliminate fear — it is to stop letting fear be the one making decisions.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-violet-300/20 bg-violet-300/5 p-6">
                    <h3 className="text-xl font-bold text-white">Today Card</h3>
                    {!todayCard ? <p className="mt-3 text-sm text-slate-300">Generate your quick card to pin your daily identity and practice lines.</p> : (
                      <div className="mt-4 space-y-2 text-sm text-slate-200">
                        <p><strong>Identity:</strong> {todayCard.identity}</p>
                        <p><strong>SATS:</strong> {todayCard.sats}</p>
                        <p><strong>Revision:</strong> {todayCard.revision}</p>
                        <p><strong>Mental diet:</strong> {todayCard.mentalDiet}</p>
                      </div>
                    )}
                  </div>
                  <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                    <h3 className="text-xl font-bold text-white">Daily check-in</h3>
                    <div className="mt-4 space-y-2 text-sm">
                      {[
                        ["morning", "Morning state set"],
                        ["midday", "Midday reset done"],
                        ["night", "Night SATS done"],
                      ].map(([key, label]) => (
                        <button key={key} onClick={() => toggleCheckin(key)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                          <span>{label}</span><span>{checkins[key] ? "✅" : "◻"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">Power Stack · Strongest Combo</div>
                  <p className="mb-5 text-sm leading-6 text-slate-300">These four frameworks work together as a complete system: spiritual → emotional → body → action.</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {powerStack.map((p) => (
                      <div key={p.layer} className={`rounded-2xl border bg-gradient-to-b ${p.color} ${p.border} p-4`}>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{p.layer}</p>
                        <p className={`mt-1 text-sm font-black ${p.accent}`}>{p.framework}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ALL FRAMEWORKS */}
            {activeTab === "frameworks" && (
              <div>
                <SectionHeader eyebrow="All frameworks" title="Ten tools, one goal">
                  Each framework addresses a different layer: identity, emotion, body, thought, pattern, and behavior. Use whichever matches where you are right now.
                </SectionHeader>
                {filtered.length === 0 ? (
                  <p className="text-slate-400">No frameworks match your search.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((f) => (
                      <FrameworkCard key={f.id} item={f} onOpen={openDetail} onReflect={openReflection} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* POWER STACK */}
            {activeTab === "powerstack" && (
              <div>
                <SectionHeader eyebrow="Strongest combo" title="The Power Stack">
                  These four frameworks form a complete system. Use them together for the deepest shifts in identity, emotion, and behavior.
                </SectionHeader>

                <div className="space-y-4">
                  {powerStack.map((p, i) => {
                    const matchedFramework = frameworks.find(
                      (f) => f.title.toLowerCase().includes(p.framework.toLowerCase().split(" ")[0].toLowerCase()) ||
                             p.framework.toLowerCase().includes(f.title.toLowerCase())
                    );
                    return (
                      <div key={p.layer} className={`rounded-3xl border bg-gradient-to-r ${p.color} ${p.border} p-6`}>
                        <div className="flex items-start gap-6">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-black text-white">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{p.layer} layer</span>
                              <span className={`text-lg font-black ${p.accent}`}>{p.framework}</span>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{p.role}</p>
                            {matchedFramework && (
                              <button
                                onClick={() => openDetail(matchedFramework)}
                                className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                              >
                                Open {matchedFramework.title} →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-xl font-bold text-white">How to run the stack daily</h3>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    <li><strong className="text-white">Morning:</strong> Set your identity assumption. "I am loved, secure, and naturally chosen." Write it. Feel it in your body.</li>
                    <li><strong className="text-white">Before any interaction:</strong> Check attachment mode. Am I about to act from security or anxiety? Pause if the answer is anxiety.</li>
                    <li><strong className="text-white">When activated:</strong> Regulate first. Breathe. Ground. Do not send the message from a survival state.</li>
                    <li><strong className="text-white">Evening:</strong> Review your behavioral votes. Did you act from the identity you are building? One thing you did right. One thing to adjust.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* GROWTH CONCEPTS */}
            {activeTab === "growth" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Personal growth" title="Thirty concepts, five practical lanes">
                  A simple reference map for everyday development. Use one concept at a time, then turn it into a behavior you can repeat.
                </SectionHeader>

                <div className="grid gap-4 lg:grid-cols-3">
                  {growthDailyLoop.map(({ time, action }) => (
                    <div key={time} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">{time}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{action}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  {growthConceptGroups.map(({ group, tone, summary, concepts }) => {
                    const t = tones[tone] || tones.cyan;
                    return (
                      <div key={group} className={`rounded-3xl border p-5 ${t.card}`}>
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <Pill tone={tone}>{group}</Pill>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{summary}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${t.accent}`}>
                            {concepts.length}
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {concepts.map(({ name, definition }) => (
                            <div key={name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                              <h3 className="text-sm font-bold text-white">{name}</h3>
                              <p className="mt-2 text-xs leading-5 text-slate-400">{definition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">Use it today</div>
                  <p className="text-sm leading-7 text-slate-300">
                    Pick one lane, not all thirty. For example: Foundation means choosing one clear goal; Mindset means treating a mistake as feedback; Relationships means listening before defending. Growth becomes real when the concept turns into one observable behavior.
                  </p>
                </div>
              </div>
            )}

            {/* VITAMINS & MINERALS */}
            {activeTab === "nutrients" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Psychophysiology" title="Vitamins & Minerals">
                  This page maps how nutrients support body systems that influence mood, attention, energy, stress resilience, sleep, and neurochemical balance.
                </SectionHeader>

                {/* Nutrient map */}
                <div>
                  <p className="mb-5 text-sm leading-7 text-slate-400">
                    Vitamins and minerals do not "create a mood" by themselves. They help the body run the systems that mood depends on: energy production, oxygen transport, nerve signaling, sleep rhythm, stress recovery, and neurotransmitter synthesis.
                  </p>
                  <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
                    {/* Left column */}
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Vitamins", tone: "emerald", text: "B vitamins, vitamin D, vitamin C, and folate support energy metabolism, nerve function, immune tone, and neurotransmitter-related pathways." },
                        { label: "Minerals", tone: "violet", text: "Magnesium, iron, zinc, iodine, selenium, calcium, sodium, and potassium support nerve firing, oxygen delivery, muscle tension, thyroid function, and stress response." },
                        { label: "Food + Rhythm", tone: "gold", text: "Nutrients work best with steady meals, hydration, sleep, sunlight, movement, and recovery — not as isolated quick fixes." },
                      ].map(({ label, tone, text }) => {
                        const colors = { emerald: "border-emerald-400/20 bg-emerald-500/5", violet: "border-violet-400/20 bg-violet-500/5", gold: "border-amber-400/20 bg-amber-500/5" };
                        const headings = { emerald: "text-emerald-300", violet: "text-violet-300", gold: "text-amber-300" };
                        return (
                          <div key={label} className={`rounded-2xl border p-5 ${colors[tone]}`}>
                            <h4 className={`mb-2 text-base font-bold ${headings[tone]}`}>{label}</h4>
                            <p className="text-sm leading-6 text-slate-300">{text}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Center orb */}
                    <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-amber-300/20 bg-[radial-gradient(circle_at_50%_35%,rgba(216,169,72,.2),transparent_50%),radial-gradient(circle_at_35%_65%,rgba(169,145,217,.15),transparent_50%),linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01))] p-8 text-center">
                      <div>
                        <div className="mb-3 text-4xl font-black text-white">Psycho&shy;physiology</div>
                        <p className="text-sm leading-7 text-slate-300">Nutrition influences the body signals your mind reads: energy, calm, tension, clarity, fatigue, motivation, and emotional stability.</p>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Neurochemical Themes", tone: "sky", text: "Dopamine, serotonin, GABA, norepinephrine, acetylcholine, and oxytocin are supported indirectly through sleep, amino acids, micronutrients, stress regulation, and lifestyle." },
                        { label: "Deficiency-Like Signals", tone: "rose", text: "Low energy, low mood, brain fog, irritability, poor sleep, muscle tension, and anxious activation can overlap with nutrient issues, stress, or medical factors." },
                        { label: "Action Layer", tone: "teal", text: "Track patterns, improve food quality, avoid megadosing, and use labs or professional guidance when symptoms are persistent or intense." },
                      ].map(({ label, tone, text }) => {
                        const colors = { sky: "border-sky-400/20 bg-sky-500/5", rose: "border-rose-400/20 bg-rose-500/5", teal: "border-teal-400/20 bg-teal-500/5" };
                        const headings = { sky: "text-sky-300", rose: "text-rose-300", teal: "text-teal-300" };
                        return (
                          <div key={label} className={`rounded-2xl border p-5 ${colors[tone]}`}>
                            <h4 className={`mb-2 text-base font-bold ${headings[tone]}`}>{label}</h4>
                            <p className="text-sm leading-6 text-slate-300">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Core nutrient cards */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Core nutrient cards</div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {[
                      { name: "Magnesium", text: "Supports muscle and nerve function, energy production, and relaxation themes. Connects to tension, sleep, GABA-like calm, and stress recovery." },
                      { name: "B6", text: "Supports neurotransmitter-related metabolism. Bridges food, mood, serotonin, dopamine, GABA, and energy regulation." },
                      { name: "B12", text: "Supports nerve health, red blood cell formation, and energy. Connects to fatigue, brain fog, mood stability, and cognitive clarity." },
                      { name: "Folate", text: "Works with B12 in methylation and cell function. Belongs near mood steadiness, cognition, and nervous-system support." },
                      { name: "Vitamin D", text: "Supports bones, muscles, immune function, and nerve communication. Belongs in sunlight, mood rhythm, and seasonal well-being." },
                      { name: "Iron", text: "Supports oxygen transport and energy. Connects to fatigue, focus, exercise capacity, and oxygen delivery to muscles and brain." },
                      { name: "Zinc", text: "Supports immune function, repair, and many enzyme systems. Belongs near resilience, recovery, and neurochemical support." },
                      { name: "Iodine", text: "Supports thyroid hormone production, which influences energy, temperature regulation, metabolism, and mental pace." },
                      { name: "Selenium", text: "Supports thyroid-related and antioxidant systems. Fits the recovery, metabolism, and stress-buffering side of the map." },
                      { name: "Calcium", text: "Supports bones, muscle contraction, and nerve signaling. Belongs in the body-signal layer, not just bone health." },
                      { name: "Sodium + Potassium", text: "Electrolytes that support fluid balance, nerve impulses, and muscle function. Connect to hydration, energy, headaches, and exercise recovery." },
                      { name: "Vitamin C", text: "Supports antioxidant protection, collagen formation, and iron absorption. Belongs near recovery, immune tone, and stress resilience." },
                    ].map(({ name, text }) => (
                      <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <h4 className="mb-2 text-sm font-bold text-white">{name}</h4>
                        <p className="text-xs leading-5 text-slate-400">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neurochemical table */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Neurochemical integration</div>
                  <p className="mb-5 text-sm leading-7 text-slate-400">
                    This does not mean one nutrient equals one neurotransmitter. Certain nutrients support the body conditions and biochemical pathways that help those systems function.
                  </p>
                  <div className="overflow-x-auto rounded-3xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Neurochemical</th>
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nutrient Support</th>
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hidden md:table-cell">Body-State</th>
                          <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hidden lg:table-cell">Portal Use</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { chem: "Dopamine", nutrients: "B vitamins, iron, protein-rich meals, magnesium, zinc", body: "Motivation, drive, reward, energy, goal pursuit", use: "Goals, push-ups, steps, and productivity rituals." },
                          { chem: "Serotonin", nutrients: "Vitamin D, B6, folate, magnesium, sunlight, balanced meals", body: "Mood steadiness, emotional resilience, satisfaction", use: "Gratitude, sunlight, mood tracking, daily rhythm." },
                          { chem: "GABA", nutrients: "Magnesium, B6, steady blood sugar, calming evening routine", body: "Calm, relaxation, reducing overactivation", use: "Breathwork, sleep rhythm, detachment, down-regulation." },
                          { chem: "Norepinephrine", nutrients: "Iron, B vitamins, hydration, electrolytes, adequate calories", body: "Alertness, attention, readiness, energy", use: "Focus blocks, work sprints, biking, movement activation." },
                          { chem: "Acetylcholine", nutrients: "B vitamins, choline-rich foods, magnesium, sleep support", body: "Learning, memory, cognition, mental sharpness", use: "Personal development, learning, journaling, skill-building." },
                          { chem: "Oxytocin", nutrients: "Not a supplement target — supported by connection, safety, touch, trust, and stress regulation", body: "Bonding, trust, belonging, emotional warmth", use: "Relationships, compassion rituals, giving." },
                        ].map(({ chem, nutrients, body, use }) => (
                          <tr key={chem} className="border-b border-white/[0.06] bg-white/[0.02] last:border-b-0">
                            <td className="p-4 font-semibold text-white">{chem}</td>
                            <td className="p-4 leading-5 text-slate-300">{nutrients}</td>
                            <td className="p-4 leading-5 text-slate-400 hidden md:table-cell">{body}</td>
                            <td className="p-4 leading-5 text-slate-400 hidden lg:table-cell">{use}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Psychophysiology patterns */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Psychophysiology patterns</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { title: "Energy + Motivation", desc: "When energy is low, mindset work can feel harder. Links fatigue-like states to sleep, iron, B vitamins, hydration, and movement — not only lack of discipline.", pills: ["Iron", "B12", "B6", "Hydration", "Electrolytes", "Steps"], tone: "amber" },
                      { title: "Calm + Sleep", desc: "Evening regulation is a body-state issue. Connects calm to magnesium, breathwork, sleep rhythm, light timing, and emotional detachment.", pills: ["Magnesium", "Vitamin D rhythm", "Long exhale", "GABA theme", "Journal release"], tone: "teal" },
                      { title: "Focus + Cognitive Clarity", desc: "Clarity is a combination of oxygen delivery, blood sugar rhythm, neurotransmitter support, rest, and environment design.", pills: ["B12", "Folate", "Iron", "Acetylcholine", "Omega-3"], tone: "sky" },
                    ].map(({ title, desc, pills, tone }) => {
                      const pillColors = { amber: "border-amber-400/20 bg-amber-300/10 text-amber-200", teal: "border-teal-400/20 bg-teal-300/10 text-teal-200", sky: "border-sky-400/20 bg-sky-300/10 text-sky-200" };
                      return (
                        <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                          <h4 className="mb-2 text-sm font-bold text-white">{title}</h4>
                          <p className="mb-4 text-xs leading-5 text-slate-400">{desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {pills.map((p) => (
                              <span key={p} className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${pillColors[tone]}`}>{p}</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Food-first support */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Food-first support</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <h4 className="mb-4 text-sm font-bold text-white">Mineral-Focused Plate</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Magnesium", foods: "Leafy greens, legumes, nuts, seeds, whole grains.", label: "Calm" },
                          { name: "Iron", foods: "Meat, seafood, beans, lentils, spinach, fortified foods. Pair plant iron with vitamin C.", label: "Energy" },
                          { name: "Zinc", foods: "Seafood, meat, beans, nuts, seeds, dairy, whole grains.", label: "Repair" },
                        ].map(({ name, foods, label }) => (
                          <div key={name} className="flex items-start justify-between gap-3 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
                            <div>
                              <p className="text-xs font-bold text-slate-200">{name}</p>
                              <p className="text-xs leading-5 text-slate-500">{foods}</p>
                            </div>
                            <span className="shrink-0 text-xs font-bold text-emerald-400">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <h4 className="mb-4 text-sm font-bold text-white">Vitamin-Focused Plate</h4>
                      <div className="space-y-3">
                        {[
                          { name: "B Vitamins", foods: "Eggs, fish, dairy, meat, legumes, leafy greens, fortified foods.", label: "Nerves" },
                          { name: "Vitamin D", foods: "Sunlight, fatty fish, fortified foods, and supplements when appropriate.", label: "Rhythm" },
                          { name: "Vitamin C", foods: "Citrus, berries, peppers, broccoli, potatoes.", label: "Recovery" },
                        ].map(({ name, foods, label }) => (
                          <div key={name} className="flex items-start justify-between gap-3 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
                            <div>
                              <p className="text-xs font-bold text-slate-200">{name}</p>
                              <p className="text-xs leading-5 text-slate-500">{foods}</p>
                            </div>
                            <span className="shrink-0 text-xs font-bold text-amber-400">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-5">
                      <h4 className="mb-3 text-sm font-bold text-rose-300">Safety Note</h4>
                      <p className="mb-4 text-xs leading-5 text-slate-300">
                        This page is educational. Persistent fatigue, low mood, anxiety, numbness, tingling, dizziness, or major sleep problems deserve proper medical evaluation.
                      </p>
                      <p className="text-xs leading-5 text-slate-400">
                        Avoid megadosing supplements. Some nutrients, including iron and vitamin D, can be harmful in excess or interact with conditions and medications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily ritual */}
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">Daily mineral + vitamin ritual</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { time: "Morning", text: "Hydrate, get light exposure, eat a nutrient-dense meal if not fasting, and use movement to cue dopamine/norepinephrine-style activation." },
                      { time: "Midday", text: "Use a balanced meal, steps, electrolytes if needed, and focused work to support energy, cognition, and motivation." },
                      { time: "Evening", text: "Shift toward magnesium-rich foods, slower breathing, lower stimulation, journaling, and sleep rhythm to support calm." },
                    ].map(({ time, text }) => (
                      <div key={time} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70">{time}</p>
                        <p className="text-sm leading-6 text-slate-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-sm italic leading-7 text-slate-400">
                  "Nutrients are not the whole story, but they help give the nervous system the materials it needs to tell a steadier story."
                </blockquote>
              </div>
            )}

            {/* BRAIN & SPIRIT */}
            {activeTab === "brain" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Neuroscience & spirit" title="The brain as a map for inner growth">
                  Spiritual practice does not magically reshape the skull — but repetition, attention, emotion, and lifestyle genuinely shape the brain through neuroplasticity. Each region pairs a function with a spiritual theme and the practices that strengthen it.
                </SectionHeader>
                <div className="grid items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[auto_1fr]">
                  <div className="mx-auto"><BrainGlyph /></div>
                  <div>
                    <p className="text-sm leading-7 text-slate-300">Think of the brain as a landscape of inner faculties. The prefrontal cortex holds your discipline; the amygdala guards your sense of safety; the default mode network rehearses who you believe you are. Tending each region with the right practice is, in a real sense, spiritual work made physical.</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cyan-300/70">{brainRegions.length} regions · {brainPractices.length} core practices</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {brainRegions.map((region) => {
                    const t = tones[region.tone] || tones.cyan;
                    return (
                      <button key={region.id} onClick={() => setBrainModal(region)} className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
                        <div className="mb-4 flex items-center justify-between gap-3"><Pill tone={region.tone}>{region.region}</Pill><span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span></div>
                        <div className="flex items-center gap-3"><span className="text-2xl">{region.icon}</span><h3 className="text-lg font-bold text-white">{region.title}</h3></div>
                        <p className={`mt-2 text-xs font-semibold ${t.accent}`}>{region.essence}</p>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{region.connected}</p>
                      </button>
                    );
                  })}
                </div>
                <div>
                  <SectionHeader eyebrow="Apply it" title="Daily practices for brain growth">A handful of simple practices light up several regions at once.</SectionHeader>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {brainPractices.map(({ practice, regions }) => (
                      <div key={practice} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <h3 className="text-sm font-bold text-white">{practice}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-400">{regions}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-amber-300/20 bg-amber-300/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-300/80">A grounding note</div>
                  <p className="text-sm leading-7 text-slate-300">This section does not claim that spirituality enlarges the brain or changes its shape. It describes how repeated practices may support neuroplasticity, emotional regulation, focus, memory, motivation, and self-awareness — the real, trainable ground where inner growth and biology meet.</p>
                </div>
              </div>
            )}

            {/* EMOTIONAL AWARENESS */}
            {activeTab === "emotions" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Emotional intelligence" title="Understanding your emotions">
                  If you have a hard time reading your own feelings, you are not alone — and noticing that is already a meaningful first step. These eight practices build emotional self-awareness one layer at a time.
                </SectionHeader>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {emotionSteps.map((step) => {
                    const t = tones[step.tone] || tones.cyan;
                    return (
                      <button key={step.id} onClick={() => setEmotionModal(step)} className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
                        <div className="mb-4 flex items-center justify-between gap-3"><Pill tone={step.tone}>Step {step.id}</Pill><span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span></div>
                        <div className="flex items-center gap-3"><span className={`text-2xl ${t.accent}`}>{step.icon}</span><h3 className="text-lg font-bold text-white">{step.title}</h3></div>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{step.summary}</p>
                      </button>
                    );
                  })}
                </div>
                <div>
                  <SectionHeader eyebrow="Start here" title="Guided journal prompts">Pick one and write for five minutes without editing.</SectionHeader>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {emotionJournalPrompts.map((prompt, i) => (
                      <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70">Prompt {i + 1}</p>
                        <p className="text-sm leading-6 text-slate-300">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">A note on confusion</div>
                  <p className="text-sm leading-7 text-slate-300">Emotions are layered, messy, and often contradictory. You can feel anger and love at the same time. Relief and guilt. Hope and exhaustion. That is not a malfunction — that is depth. The goal is not to always be clear, but to stay curious long enough to learn something.</p>
                </div>
                <div>
                  <SectionHeader eyebrow="Mindfulness practice" title="Awareness without judgment">
                    Observing your inner experience — thoughts, feelings, sensations — without labeling them as good or bad is the foundation of mindfulness. Here are five steps to build that practice.
                  </SectionHeader>
                  <div className="space-y-3">
                    {nonJudgmentSteps.map(({ step, title, icon, tone, body }) => {
                      const t = tones[tone] || tones.cyan;
                      return (
                        <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                          <div className="mb-2 flex items-center gap-3">
                            <span className={`text-xs font-black ${t.accent}`}>{step}.</span>
                            <span className={`text-lg ${t.accent}`}>{icon}</span>
                            <h4 className="text-sm font-bold text-white">{title}</h4>
                          </div>
                          <p className="text-sm leading-6 text-slate-300">{body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SHADOW & GROWTH */}
            {activeTab === "shadow" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Inner work" title="Shadow patterns and their growth edge">
                  Every shadow is a strength in disguise — compressed by fear, habit, or old protection. These ten patterns show the move from contraction to expansion.
                </SectionHeader>
                <div className="grid gap-4 md:grid-cols-2">
                  {shadowPatterns.map((pattern) => {
                    const t = tones[pattern.tone] || tones.cyan;
                    return (
                      <button key={pattern.id} onClick={() => setShadowModal(pattern)} className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
                        <div className="mb-4 flex items-center justify-between gap-3"><span className={`text-2xl ${t.accent}`}>{pattern.icon}</span><span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span></div>
                        <div className="flex items-center gap-2"><span className="text-sm font-semibold text-slate-400">{pattern.shadow}</span><span className="text-slate-500">→</span><span className="text-sm font-bold text-white">{pattern.growth}</span></div>
                        <p className={`mt-1 text-xs font-medium ${t.accent}`}>{pattern.qualities}</p>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{pattern.description}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">How to use this</div>
                  <p className="text-sm leading-7 text-slate-300">Pick the pattern that lands hardest. Open it. Read the description slowly. Then take one reflection prompt to a journal or a quiet moment. The shadow does not need to be eliminated — it needs to be understood. Understanding is already the beginning of the growth edge.</p>
                </div>
              </div>
            )}

            {/* MANIFESTATION & HABITS */}
            {activeTab === "manifest" && (
              <div className="space-y-8">
                <SectionHeader eyebrow="Alignment & action" title="Daily habits and manifestation">
                  What you do during the day directly shapes what you attract — both energetically and psychologically. These five concepts explain why daily habits are not just practical; they are the lived version of your intentions. Open any concept to go deeper, then use the daily steps to apply it.
                </SectionHeader>

                {/* Concept cards */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {manifestConcepts.map((concept) => {
                    const t = tones[concept.tone] || tones.cyan;
                    return (
                      <button
                        key={concept.id}
                        onClick={() => setManifestModal(concept)}
                        className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <Pill tone={concept.tone}>{concept.lens}</Pill>
                          <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl ${t.accent}`}>{concept.icon}</span>
                          <h3 className="text-lg font-bold text-white">{concept.title}</h3>
                        </div>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{concept.summary}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Daily steps */}
                <div>
                  <SectionHeader eyebrow="Apply it today" title="Five steps to align your day">
                    You do not need to transform everything at once. Start with one step and build from there.
                  </SectionHeader>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {manifestSteps.map(({ step, desc }, i) => (
                      <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70">Step {i + 1}</p>
                        <h3 className="text-sm font-bold text-white">{step}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-400">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imagination techniques */}
                <div>
                  <SectionHeader eyebrow="Imagination techniques" title="Looping, repeating, and novelty">
                    Three ways to imagine from the end — each serves a different moment. Use the right one for where you are, not all three at once.
                  </SectionHeader>
                  <div className="grid gap-4 md:grid-cols-3">
                    {imaginationTechniques.map((tech) => {
                      const t = tones[tech.tone] || tones.cyan;
                      return (
                        <button
                          key={tech.id}
                          onClick={() => setImaginationModal(tech)}
                          className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
                        >
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <Pill tone={tech.tone}>{tech.bestFor.split(',')[0].split('.')[0].split('—')[0].trim().slice(0, 30)}</Pill>
                            <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-2xl ${t.accent}`}>{tech.icon}</span>
                            <h3 className="text-lg font-bold text-white">{tech.title}</h3>
                          </div>
                          <p className={`mt-2 text-xs font-semibold ${t.accent}`}>{tech.tagline}</p>
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{tech.bestFor}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-layer system */}
                <div>
                  <SectionHeader eyebrow="Daily rhythm" title="The 3-layer system">
                    Night, daytime, and when stale — one technique for each context.
                  </SectionHeader>
                  <div className="grid gap-3 md:grid-cols-3">
                    {threeLayerSystem.map(({ timing, technique, tone, desc }) => {
                      const t = tones[tone] || tones.cyan;
                      return (
                        <div key={timing} className={`rounded-2xl border p-5 ${t.card}`}>
                          <p className={`text-xs font-bold uppercase tracking-[0.2em] ${t.accent}`}>{timing}</p>
                          <h3 className="mt-2 text-sm font-bold text-white">{technique}</h3>
                          <p className="mt-2 text-xs leading-5 text-slate-400">{desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Living in the end check */}
                <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">Living in the end — the check</div>
                  <div className="space-y-3">
                    {livingInTheEndSigns.map((sign, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <p className="text-sm leading-6 text-slate-300">{sign}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reflection */}
                <div className="rounded-3xl border border-violet-400/20 bg-violet-500/5 p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-violet-300/80">The deeper principle</div>
                  <p className="text-sm leading-7 text-slate-300">
                    Manifestation is not just about thinking your desires into existence. It is about embodying the energy and mindset that match what you want. When your actions are disciplined and intentional, you show your subconscious — and the field of possibility — that you are serious. That congruence is what creates the cycle of positive reinforcement that makes real change feel inevitable, not forced.
                  </p>
                </div>
              </div>
            )}

          </section>
        </main>
      </div>

      <DetailModal item={modal} onClose={() => setModal(null)} onReflect={openReflection} />

      <BrainRegionModal item={brainModal} onClose={() => setBrainModal(null)} onReflect={openReflection} />
      <EmotionStepModal item={emotionModal} onClose={() => setEmotionModal(null)} onReflect={openReflection} />
      <ShadowModal item={shadowModal} onClose={() => setShadowModal(null)} onReflect={openReflection} />
      <ManifestModal item={manifestModal} onClose={() => setManifestModal(null)} onReflect={openReflection} />
      <ImaginationModal item={imaginationModal} onClose={() => setImaginationModal(null)} onReflect={openReflection} />

      {reflectionModal && (
        <ReflectionModal
          prompts={reflectionModal.prompts}
          title={reflectionModal.title}
          tone={reflectionModal.tone}
          onClose={() => setReflectionModal(null)}
        />
      )}
    </div>
  );
}
