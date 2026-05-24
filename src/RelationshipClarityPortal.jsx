import { useEffect, useMemo, useRef, useState } from "react";

const concepts = [
  {
    id: "security-vs-fear",
    label: "Security vs Fear",
    kicker: "Reflection",
    group: "Reflection",
    short: "Am I moving from security or from fear?",
    question: "Is this move I'm about to make coming from a settled, chosen self — or from anxiety pretending to be insight?",
    explanation:
      "Almost every confusing move in a connection traces back to one of two states. From security: calm, steady, in your own life, with room for the other person to be themselves. From fear: urgent, monitoring, scanning for proof, looking for relief in their next response.",
    fear: [
      "Checking the phone every few minutes for relief.",
      "Replaying their last words to decode hidden meaning.",
      "Rehearsing what you'll say if they don't respond.",
      "Treating their mood as a verdict on your worth.",
    ],
    secure: [
      "Returning attention to your own day, work, and friends.",
      "Letting their pace be theirs without taking it personally.",
      "Speaking once, clearly, then living your life.",
      "Sourcing self-worth from your identity, not their response.",
    ],
    practice:
      "Before any reach — a text, a call, a confrontation — ask once: 'Is this me from security, or me from fear?' If it's fear, wait until you've moved your body, eaten, or slept on it. The answer often changes.",
  },
  {
    id: "mixed-signals",
    label: "Mixed Signals",
    kicker: "Reflection",
    group: "Reflection",
    short: "Mixed signals are a signal — read them, don't decode them.",
    question: "If their behavior is unclear, what does the unclear behavior already tell me?",
    explanation:
      "Mixed signals are the signal. Hot, cold, then hot again is not a puzzle to crack — it's information about where the other person is. The mind wants to solve the puzzle because solving feels like control. But the puzzle is the answer.",
    fear: [
      "Searching old messages to find evidence of consistency.",
      "Reading screenshots aloud to friends to crowdsource interpretation.",
      "Building a future on a single warm moment from last week.",
      "Lowering your standards to match the inconsistency.",
    ],
    secure: [
      "Letting unclear behavior count as unclear.",
      "Trusting consistent patterns more than intense peaks.",
      "Naming what you actually need: clarity, presence, follow-through.",
      "Letting absence be absence; letting presence be presence.",
    ],
    practice:
      "Write down the behavior pattern — not your interpretation — for the last two weeks. If you saw this pattern in a friend's story, what would you tell them? Tell yourself the same thing.",
  },
  {
    id: "chasing-vs-receiving",
    label: "Chasing vs Receiving",
    kicker: "Reflection",
    group: "Reflection",
    short: "If you're chasing, you're not receiving — you're auditioning.",
    question: "Am I letting love arrive, or am I performing for the chance to be chosen?",
    explanation:
      "Chasing looks like effort, but it's often quiet panic. It's the belief that if you stop pushing, the love disappears. Receiving is the opposite: you let your presence speak, and you let the other person move toward you. A connection built on chasing rarely settles into the calm you actually want.",
    fear: [
      "Initiating every plan, every text, every check-in.",
      "Apologizing for things you didn't do, to defuse tension.",
      "Performing interest, charm, or sexiness to hold attention.",
      "Treating their next move as something you have to earn.",
    ],
    secure: [
      "Reaching when you mean it, and resting when you don't.",
      "Letting the other person also reach for you.",
      "Speaking as yourself, not the curated version.",
      "Noticing what they do, not just what they say.",
    ],
    practice:
      "For one week, match their effort instead of leading it. Not as a tactic — as an experiment to see what the connection actually looks like when you stop carrying it alone.",
  },
  {
    id: "pedestalizing",
    label: "Pedestalizing",
    kicker: "Reflection",
    group: "Reflection",
    short: "When you put them on a pedestal, you take yourself off one.",
    question: "Am I seeing this person clearly, or am I worshipping an image I built?",
    explanation:
      "Pedestalizing feels like love but functions like fear. It turns the other person into a fantasy you must perform for, and it puts you in a posture of trying to earn rather than meeting as equals. Real love requires seeing the actual human — gifts, flaws, and ordinary moments.",
    fear: [
      "Treating their attention as proof of your value.",
      "Filtering out their flaws so the dream stays intact.",
      "Adjusting your personality to keep them interested.",
      "Feeling lucky to be considered, instead of mutually chosen.",
    ],
    secure: [
      "Holding yourself in the same regard you hold them in.",
      "Letting their ordinary moments be ordinary.",
      "Speaking honestly about what you see, including disappointment.",
      "Trusting that the right person doesn't need you to shrink.",
    ],
    practice:
      "List three actual flaws you've ignored or excused. Not to weaponize — to come back to ground. You can still want someone after you see them clearly. That want is more solid than the worship version.",
  },
  {
    id: "trauma-bond-vs-true-love",
    label: "Trauma Bond vs True Love",
    kicker: "Reflection",
    group: "Reflection",
    short: "Intensity is not the same as love — calm is not the same as boring.",
    question: "Am I bonded to this person, or am I actually loved by them?",
    explanation:
      "A trauma bond is built on the cycle itself — the highs feel high because the lows were so low, and the relief of reconnection is mistaken for love. True love does not need rupture to feel real. It is steady, mutual, and chosen daily. The clearest difference is not how strong the feeling is, but what the feeling is made of.",
    fear: [
      "The relationship cycles through extreme highs and lows.",
      "Important conversations are avoided, dodged, or punished.",
      "The relationship feels like an addiction you're powerless to leave.",
      "Calm is mistaken for boredom; chaos is mistaken for chemistry.",
      "Your sense of worth rises and falls with their next response.",
    ],
    secure: [
      "The relationship is stable and based on mutual respect.",
      "Important conversations are a priority, not a threat.",
      "The relationship feels like an honor, a privilege, and a choice.",
      "Calm registers as safety, not absence.",
      "Your worth holds steady whether the day with them was great or hard.",
    ],
    practice:
      "Map the last two weeks on paper. Not the peaks — the average day. Was the average day calm and respectful, or were you bracing? Bonded relationships are loud in memory; loved relationships are quiet in the body. Trust the body's record over the highlight reel.",
  },
  {
    id: "attracted-vs-infatuated",
    label: "Attracted vs Infatuated",
    kicker: "Reflection",
    group: "Reflection",
    short: "Attraction notices a person; infatuation rehearses one.",
    question: "Am I drawn to who they actually are, or to the version of them I keep replaying?",
    explanation:
      "Attraction is an honest signal — a pull toward who someone actually is, including their ordinary moments. Infatuation is a story you keep telling yourself, fed by limited information and your own longing. The first slows down to learn; the second speeds up to consume.",
    fear: [
      "Replaying the same few moments to keep the feeling alive.",
      "Filling in their personality with what you wish were true.",
      "Feeling withdrawal — anxiety, dread, scanning — when you don't hear from them.",
      "Treating early intensity as proof of long-term fit.",
    ],
    secure: [
      "Letting curiosity unfold at the pace of real information.",
      "Liking what is actually there without inventing the rest.",
      "Feeling steady between contacts, not in withdrawal.",
      "Allowing time to show whether the pull matches a real fit.",
    ],
    practice:
      "Write down what you actually know about them — verifiable, observed, not inferred. Then write what you're imagining. The size of the second list tells you how much is infatuation.",
  },
  {
    id: "attraction-pitfalls",
    label: "Attraction Pitfalls",
    kicker: "Reflection",
    group: "Reflection",
    short: "Strong attraction can be a signal about your wound, not your match.",
    question: "What is this attraction pulling on inside me — and is it pulling toward growth or toward a familiar pain?",
    explanation:
      "Strong attraction is real, but it isn't always trustworthy. The same chemistry that signals 'this is the one' can be your nervous system recognizing a familiar dynamic from earlier life. The most magnetic pulls often map onto the unresolved — which is why the relationship that feels most fated can also be the most painful.",
    fear: [
      "Reading intensity as destiny.",
      "Feeling 'home' in someone who is emotionally unavailable.",
      "Being drawn to ambiguity because clarity feels boring.",
      "Mistaking the chase for chemistry.",
    ],
    secure: [
      "Treating attraction as data, not a verdict.",
      "Noticing what someone's distance is asking you to perform.",
      "Letting calm people be magnetic in a quieter way.",
      "Allowing slow-build attraction to count as real.",
    ],
    practice:
      "Name the three most charged attractions of your life. What did they have in common — not in personality, but in dynamic? That common dynamic is what you are actually drawn to. Decide whether it still fits the version of love you want.",
  },
  {
    id: "limerence",
    label: "Limerence",
    kicker: "Reflection",
    group: "Reflection",
    short: "Limerence is involuntary; love is chosen.",
    question: "Am I in love with this person, or in love with the state I'm in when I think about them?",
    explanation:
      "Limerence is the intense, intrusive, often involuntary fixation that mimics love but operates more like an altered state. It feeds on uncertainty — its peaks come from any sign of reciprocation, and its lows come from any sign of withdrawal. Love can include intensity, but it doesn't require uncertainty to stay alive.",
    fear: [
      "Intrusive thoughts about them throughout the day.",
      "Mood swings tied to their last message.",
      "Idealizing them while filtering out clear incompatibilities.",
      "Feeling the fixation grow stronger when they pull away.",
    ],
    secure: [
      "Holding them in mind without rumination.",
      "Mood staying steady regardless of their latest signal.",
      "Seeing the full person — including incompatibilities.",
      "Feeling more connected when they show up consistently, not when they withhold.",
    ],
    practice:
      "Ask: would this feeling survive a year of clear, consistent, predictable presence from them? Limerence usually wouldn't — it needs the gap to live in. Love grows in the gap closing.",
  },
  {
    id: "dating-operant-conditioning",
    label: "Dating & Operant Conditioning",
    kicker: "Reflection",
    group: "Reflection",
    short: "Intermittent reinforcement is not romance — it's a slot machine.",
    question: "Am I being trained to crave them, or being met by them?",
    explanation:
      "Operant conditioning describes how unpredictable rewards create the strongest behavioral hooks. Applied to dating: the partner who is sometimes warm and sometimes cold creates a stronger compulsion than the partner who is reliably warm. The pull you feel may not be love — it may be the slot-machine effect of intermittent reinforcement on your nervous system.",
    fear: [
      "Feeling the strongest pull right after a long silence ends.",
      "Treating crumbs as feasts because the gap was so long.",
      "Building tolerance — needing bigger signs of interest to feel relief.",
      "Chasing the high of reconnection rather than the steadiness of being together.",
    ],
    secure: [
      "Recognizing the pattern as conditioning, not chemistry.",
      "Letting reliable warmth register as warmth, even when it's not dramatic.",
      "Refusing to escalate to match someone else's intermittency.",
      "Choosing the partner whose presence is consistent, not whose absence is dramatic.",
    ],
    practice:
      "Plot the last month of contact on a calendar. Are the peaks following long droughts? If yes, the pull you feel is likely conditioning. The cure is not a bigger reward — it's choosing a different reward schedule.",
  },
  {
    id: "investment-vs-vulnerability",
    label: "Investment vs Vulnerability",
    kicker: "Reflection",
    group: "Reflection",
    short: "Investing is what you give them; vulnerability is what you let them see.",
    question: "Am I pouring effort into them, or actually letting them know me?",
    explanation:
      "These two are often confused. Investment is about effort, time, planning, gestures — the visible work of building a connection. Vulnerability is the internal counterpart — letting yourself be seen, naming what you actually feel, risking being unliked for who you really are. You can be highly invested and still emotionally hidden. The first builds activity; only the second builds intimacy.",
    fear: [
      "Pouring time and energy in while staying carefully edited.",
      "Treating effort as proof that you're 'all in.'",
      "Hoping intensity of investment will substitute for honesty.",
      "Feeling resentful when investment isn't met — without ever naming what you need.",
    ],
    secure: [
      "Letting them see the unedited version, not just the offered one.",
      "Naming feelings as they arise, not after they've calcified.",
      "Risking being misunderstood in service of being known.",
      "Investing from fullness, not as a bid for security.",
    ],
    practice:
      "Sort the last week into two lists: things you did for them, and things you let them see about you. If column one is much longer than column two, the connection is heavy on investment and light on vulnerability — and that imbalance usually grows resentment over time.",
  },
  {
    id: "emotional-immaturity",
    label: "Emotional Immaturity",
    kicker: "Reflection",
    group: "Reflection",
    short: "Emotional maturity is the willingness to hold discomfort without making it someone else's job.",
    question: "Can both of us sit with hard feelings, or does one of us always need them to disappear?",
    explanation:
      "Emotional immaturity isn't about age — it's about a relationship to discomfort. The mature version can feel anger without lashing out, hurt without retaliating, fear without controlling. The immature version externalizes — every hard feeling becomes the other person's responsibility to fix, soothe, or absorb. The most reliable predictor of a workable relationship is whether both people can stay with their own state without weaponizing it.",
    fear: [
      "Punishing or withdrawing instead of naming what hurt.",
      "Stonewalling or going silent as a form of leverage.",
      "Bringing up old wounds during unrelated arguments.",
      "Expecting the other person to manage your mood for you.",
    ],
    secure: [
      "Naming the feeling clearly: 'I'm hurt, I'm scared, I'm angry.'",
      "Taking space without using it as a weapon.",
      "Returning to repair instead of waiting to be pursued.",
      "Holding your own discomfort while the other person holds theirs.",
    ],
    practice:
      "After your next hard moment together, ask: did I make them responsible for managing my feeling, or did I name it and hold it myself? Note where each of you defaulted. The pattern over time is the relationship.",
  },

  {
    id: "standards",
    label: "Standards & What You Choose",
    kicker: "Standards",
    group: "Standards",
    short: "Standards aren't demands — they're descriptions of the love you say you live in.",
    question: "Does this connection match the love I say I'm living in?",
    explanation:
      "Standards are not the same as ultimatums or tests. They're the quiet, internal answer to: what does the love I say I'm living in actually look like? When the connection consistently falls below that picture, the standards aren't being violated — the connection just isn't the match. Your standards stay; the people who can't meet them don't.",
    fear: [
      "Lowering standards to match what's being offered.",
      "Treating 'I am loved' as a feeling to chase rather than a description to honor.",
      "Settling for crumbs and calling them progress.",
      "Negotiating your worth based on their mood.",
    ],
    secure: [
      "Naming the love you say you're living in — and matching it.",
      "Letting standards be private, not weaponized.",
      "Walking away from connections that consistently fall below them.",
      "Trusting that the right match will rise to meet you.",
    ],
    practice:
      "Write one sentence: 'The love I say I'm living in looks like ___.' Now read it next to how you've been treated this month. If they don't line up, the gap is the message.",
  },
  {
    id: "boundaries",
    label: "Boundaries vs Walls",
    kicker: "Standards",
    group: "Standards",
    short: "A boundary protects your state. A wall protects your fear.",
    question: "Am I setting a boundary that keeps me steady, or a wall that keeps love out?",
    explanation:
      "A boundary is a clean statement of what you will and won't participate in, spoken once and lived out. It doesn't need defending, escalating, or repeating. A wall, by contrast, is reactive — it locks people out preemptively because vulnerability feels dangerous. Both can look the same from the outside. Only one lets love in.",
    fear: [
      "Cutting people off the moment they disappoint you.",
      "Using silent treatment to control behavior.",
      "Building rules that no one can actually meet.",
      "Calling fear-driven avoidance 'self-respect.'",
    ],
    secure: [
      "Stating the boundary once, calmly, without explanation marathons.",
      "Letting the other person choose whether to meet it.",
      "Staying open to repair when it's offered authentically.",
      "Distinguishing between 'this hurts' and 'this is harm.'",
    ],
    practice:
      "Name one boundary you've been calling a wall, or one wall you've been calling a boundary. The honest label changes what to do next.",
  },
  {
    id: "devotion",
    label: "Devotion vs Intermittent Reinforcement",
    kicker: "Standards",
    group: "Standards",
    short: "Devotion is calm and consistent. Intermittent reinforcement is addictive.",
    question: "Is this love consistent — or is it a hit of relief between long stretches of doubt?",
    explanation:
      "The brain confuses intensity with depth. When affection arrives unpredictably — warm one day, distant the next — the relief of the warm moments feels enormous, because it interrupts the anxiety of the absence. Devotion has none of that high-low texture. It's calm. It's boring in the best way. It doesn't require constant decoding.",
    fear: [
      "Mistaking the relief of their return for the depth of the love.",
      "Building a relationship around the peaks and ignoring the valleys.",
      "Defending inconsistency by quoting one good moment from weeks ago.",
      "Feeling addicted to their attention but not actually safe in it.",
    ],
    secure: [
      "Recognizing that consistent ordinary love is the goal, not the consolation prize.",
      "Treating calm presence as more valuable than dramatic peaks.",
      "Walking away from cycles that look like love but feel like anxiety.",
      "Letting yourself be bored together — that's the real test.",
    ],
    practice:
      "Map the last 30 days. How many genuinely consistent days versus how many peak/valley days? The ratio is the relationship.",
  },

  {
    id: "honest-direct",
    label: "Honest, Calm, Direct",
    kicker: "Communication",
    group: "Communication",
    short: "If you can't say it directly, you're managing — not relating.",
    question: "Am I being honest, calm, and direct — or am I hinting, testing, or managing?",
    explanation:
      "Most of what feels like communication in anxious connections is actually management — hints, tests, indirect chasing, and emotional pressure designed to extract a response without having to ask. Real communication is shorter and scarier: you name what you want, what you feel, what you need, and then you let the other person respond as themselves.",
    fear: [
      "Sending a vague message hoping they'll guess the real one.",
      "Asking 'is everything okay?' to extract reassurance.",
      "Testing them by going silent to see who reaches first.",
      "Bringing up old fights to relitigate without naming what you actually want.",
    ],
    secure: [
      "Saying the thing once, in plain words.",
      "Asking for what you need without packaging it as a complaint.",
      "Letting their answer be the answer — including 'no.'",
      "Treating directness as care, not aggression.",
    ],
    practice:
      "Take the message you almost sent. Rewrite it as one direct sentence: 'I felt ___, and I'd like ___.' If you can't write it that way, you don't have clarity yet — pause until you do.",
  },
  {
    id: "texting-urges",
    label: "Texting Urges",
    kicker: "Communication",
    group: "Communication",
    short: "An urge to text is data about your state — not a command to act.",
    question: "What is this urge actually asking for — and will a text actually give me that?",
    explanation:
      "Most urgent texting urges are not about communication. They're about discharging anxiety. The text is a way to make the discomfort move. But the relief — if it comes — is short, and the underlying state stays untouched. Sometimes the right message is also the one your nervous system is begging you to send. Often it isn't.",
    fear: [
      "Sending three messages to clarify the first one.",
      "Drafting and redrafting to perform the right tone.",
      "Watching the typing indicator and feeling your chest tighten.",
      "Reading the lack of reply as a verdict on your value.",
    ],
    secure: [
      "Noticing the urge, naming it, and letting it pass without acting.",
      "Asking what you actually want — and whether a text delivers it.",
      "Sending one message that you'd be okay with receiving no reply to.",
      "Returning to your day whether or not the reply comes.",
    ],
    practice:
      "When the urge spikes, set a 20-minute pause. Move your body, drink water, do one task. After 20 minutes, read what you almost sent. Send only what still feels true and calm.",
  },

  {
    id: "clarity-check",
    label: "Connection Clarity Check",
    kicker: "Tool",
    group: "Tools",
    short: "Run a recent interaction through five calibration questions.",
    interactive: "clarity-check",
  },
  {
    id: "pause-check",
    label: "The Pause Before You Send",
    kicker: "Tool",
    group: "Tools",
    short: "Check a message against fear/security signals before you press send.",
    interactive: "pause-check",
  },
];

const conceptsById = Object.fromEntries(concepts.map((c) => [c.id, c]));
const CONCEPT_GROUPS = ["Reflection", "Standards", "Communication", "Tools"];

function SectionCard({ concept, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(concept.id)}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-white/40">{concept.kicker}</p>
      <h3 className="text-xl font-black text-white">{concept.label}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-white/65">{concept.short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white/70 transition group-hover:text-white">
        Open <span aria-hidden>→</span>
      </span>
    </button>
  );
}

function InfoBox({ label, tone = "white", children }) {
  const tones = {
    white: "border-white/10 bg-white/[0.05] text-white/72",
    rose: "border-rose-300/15 bg-rose-500/10 text-white/78",
    emerald: "border-emerald-300/15 bg-emerald-500/10 text-white/80",
    violet: "border-violet-300/15 bg-violet-500/10 text-white/76",
  };
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.white}`}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-60">{label}</p>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  );
}

function ReflectionConcept({ concept }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/15 via-white/[0.05] to-violet-500/10 p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-rose-200/70">Core question</p>
        <p className="mt-4 text-2xl font-black leading-snug text-white md:text-3xl">{concept.question}</p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{concept.explanation}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-rose-300/15 bg-rose-500/[0.08] p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-rose-200/80">From fear</p>
          <ul className="mt-4 space-y-3">
            {concept.fear.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/78">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-emerald-300/15 bg-emerald-500/[0.08] p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-200/80">From security</p>
          <ul className="mt-4 space-y-3">
            {concept.secure.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/82">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <InfoBox label="Practice" tone="violet">{concept.practice}</InfoBox>
    </div>
  );
}

const CLARITY_PROMPTS = [
  {
    id: "consistency",
    prompt: "Was this interaction consistent with how they've shown up the last two weeks?",
    yes: "Trust the pattern — this is who they are right now.",
    no: "Peaks and valleys are a pattern too. Read them as a pattern, not as exceptions.",
  },
  {
    id: "match",
    prompt: "Does the love in this interaction match the love I say I'm living in?",
    yes: "Keep moving as the person living in that love. The match is the proof.",
    no: "Your standards stay. The gap between the love you live in and the love they offer is the message.",
  },
  {
    id: "state",
    prompt: "Am I responding from a secure state or an activated one?",
    yes: "Trust the response. Calm choices age well.",
    no: "Pause. Move your body. Sleep on it. Re-decide from a settled body, not a flooded one.",
  },
  {
    id: "chasing",
    prompt: "Am I letting them reach for me too — or am I carrying the whole connection?",
    yes: "Mutual reach is the foundation. Keep noticing it.",
    no: "Match their effort for one week, not as a test — as an experiment in what's real.",
  },
  {
    id: "honest",
    prompt: "Was I honest, calm, and direct — or hinting, testing, managing?",
    yes: "Directness is intimacy. It builds the version of love you actually want.",
    no: "Write the direct sentence. If you can't, you don't have clarity yet. Pause until you do.",
  },
];

function ClarityCheck() {
  const [scenario, setScenario] = useState("");
  const [answers, setAnswers] = useState({});

  const reset = () => {
    setScenario("");
    setAnswers({});
  };

  const score = useMemo(() => {
    const yesCount = Object.values(answers).filter((v) => v === "yes").length;
    const noCount = Object.values(answers).filter((v) => v === "no").length;
    return { yesCount, noCount, total: CLARITY_PROMPTS.length };
  }, [answers]);

  const verdict = useMemo(() => {
    if (!score.yesCount && !score.noCount) return null;
    if (score.yesCount >= 4) return { tone: "emerald", text: "This interaction reads as mostly aligned. Keep moving as the person who lives in this love." };
    if (score.noCount >= 3) return { tone: "rose", text: "This interaction is mostly pulling you out of state. Slow down before responding. Your standards stay." };
    return { tone: "violet", text: "Mixed signal. Trust the consistent pattern, not the moment. Pause before acting on any urge." };
  }, [score]);

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/15 via-white/[0.05] to-violet-500/10 p-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-rose-200/70">How it works</p>
        <p className="mt-3 text-white/72">Describe one recent interaction in a sentence or two. Then answer the five calibration questions. The pattern of answers — not any single one — tells you what to do next.</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
        <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">The interaction</label>
        <textarea
          value={scenario}
          onChange={(event) => setScenario(event.target.value)}
          placeholder="e.g., She replied warmly to my message after two days of silence, but then went quiet again..."
          rows={3}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-white/30"
        />
      </div>

      <div className="space-y-3">
        {CLARITY_PROMPTS.map((item) => {
          const answer = answers[item.id];
          return (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <p className="font-bold text-white">{item.prompt}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: "yes" }))}
                  className={`rounded-2xl border px-4 py-2 text-sm font-black transition ${
                    answer === "yes" ? "border-emerald-300/40 bg-emerald-500/20 text-white" : "border-white/10 bg-black/20 text-white/60 hover:bg-white/[0.08]"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: "no" }))}
                  className={`rounded-2xl border px-4 py-2 text-sm font-black transition ${
                    answer === "no" ? "border-rose-300/40 bg-rose-500/20 text-white" : "border-white/10 bg-black/20 text-white/60 hover:bg-white/[0.08]"
                  }`}
                >
                  No
                </button>
              </div>
              {answer && (
                <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 text-sm leading-6 text-white/75">
                  {answer === "yes" ? item.yes : item.no}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {verdict && (
        <InfoBox label="Reading" tone={verdict.tone}>
          {verdict.text}
        </InfoBox>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/[0.1] hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const PAUSE_SIGNALS = [
  { id: "urgent", label: "It feels urgent — like I have to send it right now.", tone: "fear" },
  { id: "rehearsed", label: "I've rewritten this message more than three times.", tone: "fear" },
  { id: "decoding", label: "I'm sending this to figure out what they're really thinking.", tone: "fear" },
  { id: "relief", label: "I'm hoping their reply will calm me down.", tone: "fear" },
  { id: "test", label: "Part of me is testing how they respond.", tone: "fear" },
  { id: "direct", label: "I could say this same thing out loud in a calm voice.", tone: "secure" },
  { id: "okay-no-reply", label: "I'd be okay if they didn't reply at all.", tone: "secure" },
  { id: "honest", label: "This is honest — not packaged or strategic.", tone: "secure" },
  { id: "rested", label: "I've eaten, slept, and moved my body recently.", tone: "secure" },
];

function PauseCheck() {
  const [message, setMessage] = useState("");
  const [checks, setChecks] = useState({});

  const toggle = (id) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  const fearCount = PAUSE_SIGNALS.filter((s) => s.tone === "fear" && checks[s.id]).length;
  const secureCount = PAUSE_SIGNALS.filter((s) => s.tone === "secure" && checks[s.id]).length;

  const verdict = useMemo(() => {
    if (fearCount === 0 && secureCount === 0) return null;
    if (fearCount >= 3) return { tone: "rose", text: "This message is more about your state than your message. Pause 20 minutes. Move your body. Re-read it then." };
    if (secureCount >= 3 && fearCount <= 1) return { tone: "emerald", text: "This reads as calm and direct. If it still feels true after a short pause, send it." };
    return { tone: "violet", text: "Mixed. Try rewriting it as one sentence: 'I felt ___, and I'd like ___.' If that version is true, send that one." };
  }, [fearCount, secureCount]);

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/15 via-white/[0.05] to-violet-500/10 p-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-rose-200/70">Before you press send</p>
        <p className="mt-3 text-white/72">Paste the message you're about to send. Check the boxes that apply. The mix of fear and security signals tells you whether to send, rewrite, or wait.</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
        <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">The message you almost sent</label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Paste the draft here..."
          rows={4}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-white/30"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-rose-300/15 bg-rose-500/[0.08] p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-rose-200/80">Fear signals</p>
          <div className="mt-4 space-y-2">
            {PAUSE_SIGNALS.filter((s) => s.tone === "fear").map((signal) => (
              <label key={signal.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/78 transition hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={!!checks[signal.id]}
                  onChange={() => toggle(signal.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-rose-400"
                />
                <span>{signal.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-300/15 bg-emerald-500/[0.08] p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-200/80">Security signals</p>
          <div className="mt-4 space-y-2">
            {PAUSE_SIGNALS.filter((s) => s.tone === "secure").map((signal) => (
              <label key={signal.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/82 transition hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={!!checks[signal.id]}
                  onChange={() => toggle(signal.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-emerald-400"
                />
                <span>{signal.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {verdict && (
        <InfoBox label="Reading" tone={verdict.tone}>
          {verdict.text}
        </InfoBox>
      )}
    </div>
  );
}

function renderConcept(concept) {
  if (concept.interactive === "clarity-check") return <ClarityCheck />;
  if (concept.interactive === "pause-check") return <PauseCheck />;
  return <ReflectionConcept concept={concept} />;
}

function NavDropdown({ onSelect, currentId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
      >
        <span>Browse concepts</span>
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-2xl border border-white/15 bg-[#120710]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur"
        >
          {CONCEPT_GROUPS.map((group) => {
            const groupConcepts = concepts.filter((c) => c.group === group);
            if (!groupConcepts.length) return null;
            return (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">{group}</p>
                {groupConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    role="menuitem"
                    onClick={() => { onSelect(concept.id); setOpen(false); }}
                    className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-white/[0.08] hover:text-white ${
                      currentId === concept.id ? "bg-white/[0.1] text-white" : "text-white/75"
                    }`}
                  >
                    {concept.label}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function RelationshipClarityPortal({ onBack, onNavigate, initialSection }) {
  const current = initialSection ? conceptsById[initialSection] : null;
  const currentIndex = current ? concepts.findIndex((c) => c.id === current.id) : -1;
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex >= 0 && currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  const goToConcept = (id) => {
    if (onNavigate) onNavigate("relationships", { section: id });
  };
  const goToOverview = () => {
    if (onNavigate) onNavigate("relationships");
  };

  return (
    <div className="min-h-screen bg-[#0a0511] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-4 top-4 z-50 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
        >
          ← Back
        </button>
      )}

      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
          <nav className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <button type="button" onClick={goToOverview} className="flex items-center gap-3 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-2xl text-white">♡</div>
              <div>
                <p className="text-sm font-black tracking-wide text-white">Relationship Clarity Portal</p>
                <p className="text-xs text-white/45">Standards • Security • Direct Communication</p>
              </div>
            </button>
            <NavDropdown onSelect={goToConcept} currentId={current?.id} />
          </nav>

          {current ? (
            <div>
              <button
                type="button"
                onClick={goToOverview}
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
              >
                <span aria-hidden>←</span> All concepts
              </button>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.45em] text-rose-200/70">{current.group} · {current.kicker}</p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] text-white md:text-6xl">{current.label}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/65 md:text-lg md:leading-8">{current.short}</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.45em] text-rose-200/70">Connection · Clarity · Choice</p>
                <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
                  Does this connection match the love I say I'm living in?
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                  A focused dashboard for the moments when a connection feels confusing — texting urges, mixed signals, anxious decoding. Each concept is its own page: a reflection, a standard, a communication move, or an interactive check.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-500/20 to-violet-500/10 p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Core stance</p>
                  <div className="space-y-3">
                    {[
                      ["From security", "Your state is sourced from you, not their next move."],
                      ["From standards", "The love you say you're living in is the floor, not the ceiling."],
                      ["From honesty", "Direct, calm, and once — not hinting, testing, or chasing."],
                      ["From rest", "Decide from a settled body, not a flooded one."],
                    ].map(([word, desc]) => (
                      <div key={word} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="font-black text-white">{word}</p>
                        <p className="mt-1 text-sm text-white/55">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {current ? (
          <>
            <div className="mb-8">{renderConcept(current)}</div>

            <nav className="grid gap-3 md:grid-cols-2">
              {prevConcept ? (
                <button
                  type="button"
                  onClick={() => goToConcept(prevConcept.id)}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:border-white/25 hover:bg-white/[0.09]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">← Previous</p>
                  <p className="mt-2 text-lg font-black text-white">{prevConcept.label}</p>
                </button>
              ) : <div />}
              {nextConcept ? (
                <button
                  type="button"
                  onClick={() => goToConcept(nextConcept.id)}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-right transition hover:border-white/25 hover:bg-white/[0.09]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">Next →</p>
                  <p className="mt-2 text-lg font-black text-white">{nextConcept.label}</p>
                </button>
              ) : <div />}
            </nav>
          </>
        ) : (
          <>
            {CONCEPT_GROUPS.map((group) => {
              const groupConcepts = concepts.filter((c) => c.group === group);
              if (!groupConcepts.length) return null;
              return (
                <section key={group} className="mb-10">
                  <div className="mb-5 flex items-baseline justify-between">
                    <h2 className="text-2xl font-black text-white">{group}</h2>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/35">{groupConcepts.length} {groupConcepts.length === 1 ? "concept" : "concepts"}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {groupConcepts.map((concept) => (
                      <SectionCard key={concept.id} concept={concept} onSelect={goToConcept} />
                    ))}
                  </div>
                </section>
              );
            })}

            <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/15 to-violet-500/10 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/45">Start Here</p>
              <h2 className="mt-2 text-3xl font-black text-white">If you only have five minutes</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Open <strong className="text-white">Security vs Fear</strong> first — the one question behind every other concept here. Then run a recent interaction through the <strong className="text-white">Connection Clarity Check</strong>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => goToConcept("security-vs-fear")} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]">Open Security vs Fear</button>
                <button onClick={() => goToConcept("clarity-check")} className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]">Run Clarity Check</button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
