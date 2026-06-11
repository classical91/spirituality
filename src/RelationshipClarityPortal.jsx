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
    id: "secure-alternative",
    label: "The Secure Alternative",
    kicker: "Reflection",
    group: "Reflection",
    short: "Instead of chasing, forcing, proving, and performing — invite, trust, know, and show up.",
    question: "What would this moment look like if I moved from security instead of the old anxious habit?",
    explanation:
      "Anxious love runs on four engines: chasing, forcing, proving, and performing. Each one tries to manufacture an outcome — to make someone stay, choose, or want you. The secure alternative is not passivity; it is a different posture. You invite rather than chase, trust rather than force, know your worth rather than prove it, and show up authentically rather than perform. Same desire, opposite energy.",
    fear: [
      "Chasing — initiating everything to keep the connection alive.",
      "Forcing — pushing the pace and the outcome you want.",
      "Proving — building a case for why you're worth choosing.",
      "Performing — presenting a curated version to hold their attention.",
    ],
    secure: [
      "You invite and allow.",
      "You trust and let things unfold.",
      "You know your worth.",
      "You show up authentically.",
    ],
    practice:
      "Catch yourself in one of the four — chasing, forcing, proving, or performing — and name it out loud. Then choose its secure alternative for your very next action: invite instead of chase, trust instead of force, know instead of prove, show up instead of perform.",
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
    id: "closeness-vs-compatibility",
    label: "Closeness vs Compatibility",
    kicker: "Reflection",
    group: "Reflection",
    short: "Closeness is what you feel. Compatibility is what you can live with.",
    question: "Is this connection close — or is it actually workable as a daily life?",
    explanation:
      "Closeness is the intensity of connection — the chemistry, the feeling of being known, the pull. Compatibility is the structural fit — values, lifestyles, rhythms, plans, beliefs. The most painful relationships are the ones where closeness is high but compatibility is low. You can feel deeply bonded to someone you cannot build a life with.",
    fear: [
      "Treating intense closeness as proof of fit.",
      "Ignoring structural mismatches because the chemistry is loud.",
      "Believing love alone will close compatibility gaps.",
      "Confusing 'we get each other' with 'we can build together.'",
    ],
    secure: [
      "Letting both closeness and compatibility count.",
      "Naming the structural mismatches out loud, not just feeling them.",
      "Letting compatibility be the slower, quieter signal — and trusting it.",
      "Walking away from high-closeness, low-compatibility loops.",
    ],
    practice:
      "List five things that need to be compatible for a long-term life with this person (rhythms, money, faith, family, ambition). Score each from 1 to 10. Score closeness from 1 to 10. If closeness is much higher than the compatibility average, the pain you're feeling makes sense.",
  },
  {
    id: "crush-vs-love",
    label: "Crush vs Love",
    kicker: "Reflection",
    group: "Reflection",
    short: "A crush is what you feel about them. Love is what you build with them.",
    question: "Is this a crush I'm calling love because of how strong the feeling is?",
    explanation:
      "Crushes live in your head — fueled by limited information, projection, and the thrill of possibility. Love lives in reality — tested by ordinary days, disappointment, repair, and choice over time. Crushes can become love if both people show up. But often a crush stays a crush even when both people pretend it's more, because the work of building never happens.",
    fear: [
      "Treating crush intensity as evidence of long-term love.",
      "Investing in a crush as if it's already a relationship.",
      "Reading their absence as longing rather than information.",
      "Refusing to let a crush either become real or pass through.",
    ],
    secure: [
      "Letting a crush be a crush without making it more.",
      "Noticing the difference between feeling drawn and actually building.",
      "Allowing crushes to either evolve into reciprocated love or fade naturally.",
      "Not confusing strong feeling with mutual commitment.",
    ],
    practice:
      "Write what you actually know about them versus what you imagine. If the imagination column is larger, you're in crush territory. Let it be that — crushes don't need to become anything to be valid; they just need to stay honest.",
  },
  {
    id: "datable",
    label: "Datable",
    kicker: "Reflection",
    group: "Reflection",
    short: "Datable isn't a vibe — it's a small set of grounded qualities you can verify.",
    question: "Am I dating someone who is actually datable — or someone who is exciting but not available for a relationship?",
    explanation:
      "Datable means the person has the basic capacity for a real relationship: emotionally available, communicates honestly, has a workable life, and wants what you want. Chemistry alone doesn't make someone datable. The same energy that makes a connection thrilling can mask the structural gaps that make it impossible to build.",
    fear: [
      "Calling someone datable because they're charismatic.",
      "Treating unavailability as a personality you can love through.",
      "Believing chemistry will compensate for a non-datable life situation.",
      "Mistaking 'we click' for 'they're ready.'",
    ],
    secure: [
      "Checking for the basics — availability, honesty, workable life, aligned wants.",
      "Letting unavailability be a no, even when the chemistry is yes.",
      "Trusting that someone datable still feels exciting once the basics are met.",
      "Refusing to date someone who isn't choosing what you're choosing.",
    ],
    practice:
      "Run them through five questions: Are they emotionally available? Do they communicate honestly? Is their life workable? Do they want what you want? Have they shown up consistently? If you can't answer yes to most, you're not in a relationship — you're in a holding pattern.",
  },
  {
    id: "courting-vs-dating",
    label: "Courting vs Just Dating",
    kicker: "Reflection",
    group: "Reflection",
    short: "Courting is intentional pursuit. Dating without intent is just sharing time.",
    question: "Are we courting toward something, or just dating for its own sake?",
    explanation:
      "Courting is dating with a purpose — both people show up trying to find out whether this can become a real relationship. Dating without intent is the modern default — meeting, hanging out, sleeping together, repeating, without ever asking what it's for. Courting doesn't have to be old-fashioned. It just means both people are honest about what they're looking for and willing to pursue it on purpose.",
    fear: [
      "Avoiding the 'what is this' conversation indefinitely.",
      "Calling open-ended ambiguity 'taking it slow.'",
      "Letting connection grow without ever directing it.",
      "Fearing intent will scare them — so settling for drift.",
    ],
    secure: [
      "Naming what you're dating for, out loud.",
      "Pursuing on purpose, with calm directness.",
      "Letting the other person's response to intent be the data.",
      "Distinguishing between courtship and chasing — courtship is mutual.",
    ],
    practice:
      "Ask once, clearly: 'What are we doing, and what are we building toward?' Their answer — including hesitation — is the answer. Drift is also a choice, just an unspoken one.",
  },
  {
    id: "companionship",
    label: "Companionship",
    kicker: "Reflection",
    group: "Reflection",
    short: "Companionship is what's left when the intensity settles — and it's the best part.",
    question: "Do I actually enjoy being with this person — or do I only want the feeling they give me?",
    explanation:
      "Passion can exist without companionship, and companionship can exist without grand passion. But the relationships that last are built on the quieter thing: the person whose company you actually want — when nothing's exciting, when you're tired, when you're just in a room together. Companionship is comfort without boredom, familiarity without contempt. It doesn't ask to be performed. It's just there.",
    fear: [
      "Staying for the highs while tolerating the person they're attached to.",
      "Mistaking loneliness relief for genuine enjoyment of their presence.",
      "Only feeling connected during intensity, conflict, or reunion.",
      "Needing things to be exciting to feel like the relationship is 'working.'",
    ],
    secure: [
      "Looking forward to ordinary time with them — not just events.",
      "Being comfortable in quiet, shared space.",
      "Enjoying who they are as a person, separate from how they make you feel.",
      "Choosing their company when you're not chasing anything.",
    ],
    practice:
      "Imagine a slow Tuesday afternoon — no plans, no agenda — just the two of you in a room. Do you feel peace, comfort, and ease? Or do you start filling silence and engineering closeness? Your honest answer is your answer.",
  },

  {
    id: "reading-red-flags",
    label: "Reading Red Flags",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "A red flag is information, not an accusation — it tells you who someone is, not who they could be.",
    question: "Am I responding to what this person actually does — or to the potential I've projected onto them?",
    explanation:
      "A red flag is a repeated behavior that consistently costs you safety, respect, or peace. It is not one bad day, one awkward sentence, or one nervous moment. The trap is treating flags as puzzles to solve or potential to coach out of someone. They aren't. They're data about how this person operates when it matters. The goal here isn't to diagnose anyone — it's to stop overriding your own clear evidence with hope.",
    flags: [
      "A pattern repeats even after you've named that it hurts you.",
      "You find yourself explaining away behavior you'd flag instantly in a friend's story.",
      "You feel more anxious, smaller, or less yourself the longer it goes on.",
      "You're attached to their potential, not their present.",
    ],
    green: [
      "When you name a problem, the behavior actually changes over time.",
      "You feel more like yourself, not less, the more time you spend together.",
      "Their words and their actions tell the same story.",
      "You don't need to manage, coach, or rehabilitate them to feel safe.",
    ],
    practice:
      "Pick one behavior that's been bothering you. Write only the facts — what happened, how often, over what period — with no interpretation and no 'but they...'. Read it back as if a friend handed it to you. The flag was always in the pattern, not in your reaction to it.",
  },
  {
    id: "love-bombing",
    label: "Love Bombing",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "Intensity that arrives too fast is a strategy, not a depth of feeling.",
    question: "Is this affection building trust over time — or rushing me past the point where I'd notice the cost?",
    explanation:
      "Love bombing is overwhelming affection, attention, and future-talk delivered early and fast — before any real knowing has happened. It feels like being adored, but its function is acceleration: to bond you so quickly that boundaries, doubts, and pacing get bypassed. Real closeness is earned in increments. Manufactured closeness is dumped on you all at once, and it usually comes with a bill later.",
    flags: [
      "Grand declarations, gifts, or 'soulmate' talk within days or weeks.",
      "Pressure to commit, define, or merge lives far faster than feels natural.",
      "Affection that flips to sulking or punishment the moment you slow the pace.",
      "Being told you're unlike anyone they've ever met — before they actually know you.",
    ],
    green: [
      "Warmth that scales with how much you actually know each other.",
      "Comfort with your pace, including your need to slow down.",
      "Excitement that survives you having a separate, full life.",
      "Consistency over time rather than a dazzling opening week.",
    ],
    practice:
      "Notice the gap between how well this person knows you and how intensely they're treating you. If the intensity is far ahead of the knowing, slow everything down on purpose for two weeks. Genuine interest stays. A strategy gets frustrated.",
  },
  {
    id: "control-and-isolation",
    label: "Control & Isolation",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "Care that shrinks your world is not care — it's a leash with a soft handle.",
    question: "Is my life getting bigger and freer with this person, or quietly smaller?",
    explanation:
      "Control rarely arrives as obvious tyranny. It arrives as concern, preference, and 'I just missed you.' Over time it narrows where you go, who you see, what you wear, and how you spend money — each step framed as love. Isolation is the engine of most unhealthy dynamics, because a person with no outside mirrors loses the reference points that would name the problem. Healthy love widens your life. Control prunes it.",
    flags: [
      "Friends and family slowly drop off your calendar — by their preference, not yours.",
      "You explain or justify ordinary choices to avoid a reaction.",
      "Guilt, sulking, or conflict follows time spent apart from them.",
      "Monitoring of your phone, location, money, or schedule, framed as closeness.",
    ],
    green: [
      "Your other relationships are encouraged, not resented.",
      "Time apart is normal and uneventful, not a source of tension.",
      "Disagreement is allowed without it becoming a crisis.",
      "You keep your own money, choices, and movement without negotiation.",
    ],
    practice:
      "Map your last three months. Who have you seen less of, and was that your choice or a response to friction? If your world has narrowed around one person, that narrowing is itself the flag — independent of how loving each individual step was framed.",
  },
  {
    id: "gaslighting",
    label: "Gaslighting & Rewriting Reality",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "If you keep leaving conversations doubting your own memory, that doubt is the injury.",
    question: "Do I trust my perception more or less after we talk things through?",
    explanation:
      "Gaslighting is the steady erosion of your confidence in your own reality — 'that never happened,' 'you're too sensitive,' 'you're remembering it wrong,' 'you're crazy.' It doesn't require malice to do damage; the effect is what matters. Over time you stop trusting your own memory and start outsourcing reality to the very person distorting it. The tell isn't any single sentence — it's the cumulative feeling of going crazy in slow motion.",
    flags: [
      "Your clear memories are routinely denied or rewritten.",
      "You apologize for reactions to things that genuinely happened.",
      "You've started recording, screenshotting, or saving proof to stay sane.",
      "Concerns get turned around so you end up comforting them or apologizing.",
    ],
    green: [
      "Your account of events is taken seriously even during conflict.",
      "Repair sounds like 'you're right, that happened' — not 'you imagined it.'",
      "Your feelings are treated as real information, not as defects.",
      "You leave hard conversations clearer, not more confused.",
    ],
    practice:
      "Keep a private, factual log for two weeks — just dates and what was said or done, no commentary. You're not building a case to win; you're rebuilding trust in your own perception. If reality stops matching their version of it, believe your record.",
  },
  {
    id: "contempt-and-criticism",
    label: "Contempt & Criticism",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "Contempt is criticism aimed at who you are, not what happened — and it's corrosive.",
    question: "When something goes wrong, is the problem the problem — or am I the problem?",
    explanation:
      "Criticism attacks an event ('this hurt me'); contempt attacks the person ('you're pathetic, you're stupid, what is wrong with you'). Contempt — eye-rolling, mockery, sneering, name-calling, sarcasm meant to wound — is one of the strongest predictors of a relationship's collapse, because it communicates disgust rather than disagreement. You cannot build safety with someone who, in their hardest moments, treats you as beneath them.",
    flags: [
      "Mockery, name-calling, or sarcasm aimed at your character.",
      "Your feelings are met with eye-rolls, contempt, or 'here we go again.'",
      "Mistakes become evidence that you're fundamentally defective.",
      "You feel humiliated in private — or in front of others — and it's called a joke.",
    ],
    green: [
      "Conflict stays about the issue, not your worth as a person.",
      "Complaints come as 'I felt X when Y,' not as attacks on who you are.",
      "Repair includes genuine ownership and warmth afterward.",
      "Even angry, they treat you as someone they respect.",
    ],
    practice:
      "After your next disagreement, ask: was this about a behavior, or about my character? Behavior can be worked on together. A pattern of contempt is a verdict being passed on you — and no amount of fixing the behavior will satisfy it.",
  },
  {
    id: "jealousy-and-possessiveness",
    label: "Jealousy & Possessiveness",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "Possessiveness wears the costume of passion — but it's about ownership, not love.",
    question: "Does this person trust me, or do they need to control me to feel okay?",
    explanation:
      "A flicker of jealousy is human. Possessiveness is different: it treats you as property to be guarded rather than a person to be trusted. It shows up as accusation without cause, interrogation about your whereabouts, and resentment of any attention or closeness that isn't theirs. It's often romanticized as 'they love me so much,' but its root is insecurity demanding control — and the demands almost always grow, never shrink.",
    flags: [
      "Accusations of interest or cheating with no basis in your behavior.",
      "Interrogation about where you were, who texted, why you smiled.",
      "Resentment of your friendships, attention, or independence.",
      "You preemptively hide harmless things to avoid an episode.",
    ],
    green: [
      "Trust is the default; reassurance is occasional, not a daily tax.",
      "Your friendships and attention aren't treated as threats.",
      "Insecurity is owned and worked on, not enforced on you.",
      "You feel free to be honest because honesty isn't punished.",
    ],
    practice:
      "Notice whether you've started self-censoring — hiding a harmless text, downplaying a friendship — to keep the peace. That self-editing is the cost of possessiveness, and it grows. Name it out loud once, plainly, and watch whether it's met with reflection or escalation.",
  },
  {
    id: "future-faking",
    label: "Future-Faking & Broken Words",
    kicker: "Red Flags",
    group: "Red Flags",
    redflag: true,
    short: "Promises are cheap; patterns are the truth. Watch what's done, not what's pledged.",
    question: "Am I in a relationship with this person's actions — or with their promises?",
    explanation:
      "Future-faking is using vivid promises about the future — the trip, the move, the ring, the change — to secure your investment in the present, with no intention or track record of following through. It keeps you holding on for a version of them that never quite arrives. The antidote is simple and unsentimental: weigh what consistently happens far more heavily than what's repeatedly promised. A pattern of broken words is itself the answer.",
    flags: [
      "Big promises that dissolve the moment they'd require real follow-through.",
      "Apologies and vows to change that reset the same cycle next week.",
      "You're sustained by the future they describe, not the present they give.",
      "'I'll change' arrives right when you're about to walk away.",
    ],
    green: [
      "Promises are sized to what they actually deliver.",
      "Change, when it's needed, shows up as sustained behavior over time.",
      "The present already feels good — the future is a bonus, not the lifeline.",
      "Their word and their follow-through match often enough to be trusted.",
    ],
    practice:
      "List the last few significant things this person promised. Beside each, write what actually happened. If the two columns don't match, stop dating the promises and start reading the pattern. The pattern is who they are.",
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
    id: "chosen-and-wanted",
    label: "Chosen & Wanted",
    kicker: "Standards",
    group: "Standards",
    short: "You shouldn't have to audition for the role you were promised.",
    question: "Do they choose me on purpose — or am I a default they haven't gotten around to changing?",
    explanation:
      "Being chosen isn't a one-time event at the beginning. It's the daily, quiet decision someone makes to keep showing up — to text first, to plan, to prioritize, to pursue. When you have to chase or remind, you're not being chosen; you're being tolerated. The cleanest love feels like both people actively pick each other.",
    fear: [
      "Treating their occasional presence as proof of being chosen.",
      "Earning love through over-functioning.",
      "Settling for being convenient and calling it 'easy.'",
      "Reading lack of pursuit as 'they're just busy.'",
    ],
    secure: [
      "Recognizing chosen as active, not passive.",
      "Letting being chosen feel like the baseline, not the prize.",
      "Walking away from connections where you're never pursued.",
      "Trusting that the right person makes the choice visible.",
    ],
    practice:
      "List the last five times they initiated something — a plan, a text, a touch, a kindness. If you can't easily name three, you're being received rather than chosen. The right person leaves a trail of small choices.",
  },
  {
    id: "being-a-priority",
    label: "Being a Priority",
    kicker: "Standards",
    group: "Standards",
    short: "Priority isn't what they say — it's what shows up on their actual calendar.",
    question: "Where do I fit in the real ranking of their life — not the stated one?",
    explanation:
      "Everyone says they care. The truer test is what makes the cut when time, energy, and attention are limited. Real priority shows up as time held, plans protected, and tired evenings where they still want to talk. If you're consistently the thing that gets squeezed when their life gets busy, that's the answer.",
    fear: [
      "Accepting reassurance instead of evidence.",
      "Settling for after-hours, after-friends, after-everything attention.",
      "Reading promises as priority.",
      "Believing 'next time' more than you believe what already happened.",
    ],
    secure: [
      "Noticing where their time actually goes.",
      "Letting priority be a verb — what they protect, not what they claim.",
      "Stating clearly what being a priority would look like to you.",
      "Trusting the calendar over the words.",
    ],
    practice:
      "Map the last two weeks. How many times did they protect time for you when life got busy? How many times were you the thing that got cancelled? The ratio is the priority.",
  },
  {
    id: "safety-as-standard",
    label: "Safety as a Standard",
    kicker: "Standards",
    group: "Standards",
    short: "Safety isn't a bonus — it's the floor of any real love.",
    question: "Can I be myself, say hard things, and make mistakes here without bracing?",
    explanation:
      "Emotional safety is the precondition for everything else — intimacy, vulnerability, growth, repair. It's the felt sense that you can be your full self, including the messy parts, without fear of withdrawal, punishment, or shaming. Without it, the relationship stays performative no matter how warm it looks.",
    fear: [
      "Editing yourself to avoid their reaction.",
      "Walking on eggshells about specific topics or moods.",
      "Treating their stability as more important than your honesty.",
      "Mistaking the absence of conflict for safety.",
    ],
    secure: [
      "Being able to bring hard things up without rehearsal.",
      "Trusting that disagreement won't end the connection.",
      "Letting your full self show up, including the parts that worry you.",
      "Knowing that mistakes can be repaired, not weaponized.",
    ],
    practice:
      "Name the three topics you avoid most with them. Is the avoidance protecting the connection, or protecting you from them? The first is care; the second is a sign safety is missing.",
  },
  {
    id: "seen-and-valued",
    label: "Being Seen & Valued",
    kicker: "Standards",
    group: "Standards",
    short: "Being seen is being known accurately. Being valued is the response to knowing.",
    question: "Do they actually know me — and does the version they know feel valued, or merely tolerated?",
    explanation:
      "Being seen means the other person knows your real self — your patterns, your wounds, your gifts — without you having to keep explaining. Being valued is what happens after they see: they respond with care, interest, and protection of who you actually are. One without the other isn't enough. You can be seen and not valued (judged), or valued and not seen (loved as a fantasy).",
    fear: [
      "Hiding the real version to stay valued for the offered one.",
      "Performing the version they like and resenting it.",
      "Settling for being loved as an idea, not as a person.",
      "Believing 'they don't know that part of me' is protection.",
    ],
    secure: [
      "Letting yourself be known, including the parts that test the connection.",
      "Receiving care that matches who you actually are.",
      "Trusting that being seen and chosen is possible together.",
      "Letting the response to your real self be the real data.",
    ],
    practice:
      "Pick one part of yourself you've kept hidden. Share it this week. Notice their response. Their reaction to your real self is more information than a hundred 'I love you's spoken to the curated version.",
  },
  {
    id: "being-together-emotionally",
    label: "Being Together Emotionally",
    kicker: "Standards",
    group: "Standards",
    short: "Emotional togetherness is a shared state — not one person managing the other.",
    question: "Are we emotionally present with each other, or just physically close?",
    explanation:
      "Emotional togetherness is different from proximity. It means both people are aware of the other's inner world, respond to it, and aren't alone in their feelings even when the feelings are hard. It's possible to sleep in the same bed and be emotionally alone. It's also possible to be apart and feel deeply together. The standard is: can I share what I'm actually going through, and do they receive it as real?",
    fear: [
      "Feeling alone in your emotional life while in a relationship.",
      "Suppressing difficult feelings to protect the mood.",
      "Carrying the emotional weight alone while they stay light.",
      "Believing 'they're just not emotional' is a permanent reality to accept.",
    ],
    secure: [
      "Knowing their actual emotional state — not just the surface version.",
      "Feeling received when you share something real.",
      "Moving through hard feelings together rather than in parallel.",
      "Neither person carrying the weight alone.",
    ],
    practice:
      "Once this week, share something emotionally real — not a complaint, a need, or a conflict, but something true about your inner world. Notice whether they lean in or deflect. That response is the data.",
  },
  {
    id: "financial-partnership",
    label: "Financial Partnership",
    kicker: "Standards",
    group: "Standards",
    short: "Money is one of the places where shared values either show up — or don't.",
    question: "Do we have a shared vision for our financial life together, or are we just hoping it works out?",
    explanation:
      "Financial partnership isn't about having the same income or the same spending style. It's about shared values: how you treat money, what you're building toward, how you make decisions about resources, and whether you're honest about your situation. Incompatibility here is one of the most common long-term wedges in relationships — because money is tangled up with security, control, freedom, and worth. A couple doesn't have to agree on everything, but they do need to talk about it.",
    fear: [
      "Avoiding financial conversations to keep the mood light.",
      "Assuming compatibility without ever checking.",
      "Letting one person carry the financial clarity while the other stays uninvolved.",
      "Using money (or withholding it) as control.",
    ],
    secure: [
      "Talking about money early — not as a test, as a conversation.",
      "Sharing financial goals and comparing them honestly.",
      "Building toward something together, with shared awareness.",
      "Making financial decisions together, without secrecy or imbalance.",
    ],
    practice:
      "Have one clear money conversation — not a fight, a conversation. What do we each earn? What are we saving toward? What's our financial vision for the next 5 years? The discomfort of the question is a fraction of the cost of not asking.",
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
    id: "types-of-intimacy",
    label: "Types of Intimacy",
    kicker: "Inventory",
    group: "Inventory",
    short: "Closeness lives in more places than the bedroom.",
    inventory: true,
    intro: "Intimacy is the felt sense of being known. It moves through many channels — and a strong relationship usually has several of them open at once.",
    items: [
      { name: "Emotional", note: "Sharing inner states — fear, joy, grief, hope — without performing." },
      { name: "Physical (non-sexual)", note: "Hugs, hand-holding, cuddling, sitting close — closeness through the body." },
      { name: "Sexual", note: "Erotic connection that is felt as mutual, safe, and chosen." },
      { name: "Intellectual", note: "Trading ideas, debating, building arguments together without either ego getting bruised." },
      { name: "Spiritual", note: "Sharing meaning, faith, prayer, awe, or a sense of something larger." },
      { name: "Experiential", note: "Doing things side by side — trips, projects, ordinary errands made into a shared moment." },
      { name: "Recreational", note: "Playing together — games, sport, hobbies, laughter for its own sake." },
      { name: "Creative", note: "Making something together — meals, art, plans, traditions." },
      { name: "Financial", note: "Honest visibility about money — earning, spending, saving, planning." },
    ],
  },
  {
    id: "types-of-kisses",
    label: "Types of Kisses",
    kicker: "Inventory",
    group: "Inventory",
    short: "Different kisses say different things.",
    inventory: true,
    intro: "A kiss is a small language. The kind you give and the kind you ask for says something about where you both are.",
    items: [
      { name: "Peck", note: "Quick, casual — hello, goodbye, ordinary affection." },
      { name: "Forehead kiss", note: "Protective, tender, reverent — 'you are precious to me.'" },
      { name: "Hand kiss", note: "Courtly, formal warmth — honor and respect." },
      { name: "Cheek kiss", note: "Warm, friendly affection — closeness without intensity." },
      { name: "Top-of-head kiss", note: "Held close while you kiss her hair — sweet, anchoring." },
      { name: "Neck kiss", note: "Sensual, slow, intimate — saved for private moments." },
      { name: "Slow kiss", note: "Lingering and unhurried — full presence, no agenda." },
      { name: "French kiss", note: "Open, deep, mutual — erotic closeness." },
      { name: "Butterfly kiss", note: "Eyelashes brushing skin — playful and tender." },
      { name: "Eskimo kiss", note: "Nose-to-nose rub — affection without words." },
    ],
  },
  {
    id: "forms-of-cuddling",
    label: "Forms of Cuddling",
    kicker: "Inventory",
    group: "Inventory",
    short: "Closeness has more shapes than 'big spoon, little spoon.'",
    inventory: true,
    intro: "Different positions create different feelings of safety. Vary them and notice which ones she actually relaxes into.",
    items: [
      { name: "Big spoon / little spoon", note: "Classic full-body wrap — protective, warm, comforting." },
      { name: "Head on chest", note: "She rests her head on your chest while you hold her — heartbeat as anchor." },
      { name: "Face to face", note: "Lying on your sides, foreheads close — intimate eye contact." },
      { name: "Lap pillow", note: "Her head on your lap while you stroke her hair." },
      { name: "Side hug", note: "Sitting beside her with an arm around her shoulders." },
      { name: "Hand-holding while sitting", note: "Quiet connection in a shared space." },
      { name: "Leg over leg", note: "Lounging entwined on a couch — easy, casual closeness." },
      { name: "Full embrace standing", note: "A long, full hug — chest to chest, no rush." },
      { name: "Back hug", note: "Coming up behind her, arms around her waist — playful tenderness." },
    ],
  },
  {
    id: "mutual-interests",
    label: "Mutual Interests",
    kicker: "Inventory",
    group: "Inventory",
    short: "Shared interests are infrastructure — the ground where ordinary days happen together.",
    inventory: true,
    intro: "You don't need to share everything. But a handful of real overlaps means most weeks have a built-in 'we' instead of needing to engineer one.",
    items: [
      { name: "Food", note: "Cooking, restaurants, cuisines you both love." },
      { name: "Music", note: "Artists, genres, live shows, the song you each put on first." },
      { name: "Movies & shows", note: "What you'll actually watch together — and what you'll never agree on." },
      { name: "Travel", note: "Places you want to go, pace you like to travel at." },
      { name: "Movement & sport", note: "Walking, gym, hiking, dance, a team you both follow." },
      { name: "Learning", note: "Books, courses, podcasts, languages, a topic you'll go deep on together." },
      { name: "Faith & meaning", note: "Spiritual practice, philosophy, the questions you both sit with." },
      { name: "Creativity", note: "Making, building, decorating, projects you start together." },
      { name: "Friends & community", note: "Shared people you both want in your lives." },
      { name: "Family rhythm", note: "How you each relate to family — what you want to keep, what you want to change." },
    ],
  },
  {
    id: "shared-experiences",
    label: "Shared Experiences",
    kicker: "Inventory",
    group: "Inventory",
    short: "Shared history is what makes a relationship feel real, not just stated.",
    inventory: true,
    intro: "A connection becomes a relationship through the experiences you stack up together — both the highlight reel and the quiet hours nobody else sees.",
    items: [
      { name: "First memories", note: "The first meeting, first date, first kiss — small, specific scenes." },
      { name: "Ordinary days", note: "The unremarkable hours that make up most of the relationship." },
      { name: "Hard seasons", note: "Sickness, loss, money stress — what you got through together." },
      { name: "Holidays & rituals", note: "Birthdays, anniversaries, traditions you build year over year." },
      { name: "Trips", note: "Time away from the routine — both planned and spontaneous." },
      { name: "Meeting each other's people", note: "Family, close friends, the people who shape your sense of self." },
      { name: "Milestone life events", note: "Graduations, moves, new jobs, weddings, funerals." },
      { name: "Private jokes", note: "Stories and phrases only you two understand." },
      { name: "Long conversations", note: "Late nights when something honest got said and remembered." },
    ],
  },
  {
    id: "milestones",
    label: "Relationship Milestones",
    kicker: "Inventory",
    group: "Inventory",
    short: "Milestones aren't the relationship — they're markers of where it's been.",
    inventory: true,
    intro: "These are signposts, not requirements. Skipping a few doesn't mean less love; collecting them doesn't guarantee more. Notice which ones matter most to each of you.",
    items: [
      { name: "First meeting", note: "Where, when, and what you first noticed." },
      { name: "First date", note: "The first time it was officially 'us, together, on purpose.'" },
      { name: "First kiss", note: "The moment the line moved from friendly to romantic." },
      { name: "Saying 'I love you'", note: "The first time, and who said it first." },
      { name: "Becoming exclusive", note: "Naming the relationship as committed." },
      { name: "Meeting families", note: "Bringing each other into the world you came from." },
      { name: "First trip together", note: "Travel as a real compatibility test." },
      { name: "Moving in", note: "Sharing space, chores, daily rhythm." },
      { name: "Engagement", note: "Choosing the long version on purpose." },
      { name: "Marriage / commitment ceremony", note: "Publicly choosing each other." },
      { name: "Building a home together", note: "Furnishing, decorating, making it ours." },
      { name: "Children, if chosen", note: "Becoming parents together." },
      { name: "Major anniversaries", note: "Yearly markers of choosing each other again." },
    ],
  },
  {
    id: "gestures-of-affection",
    label: "Gestures of Affection",
    kicker: "Inventory",
    group: "Inventory",
    short: "Small daily acts say more than the big ones.",
    inventory: true,
    intro: "Affection is built in the small acts that don't require an occasion. A few done consistently beat one grand gesture done occasionally.",
    items: [
      { name: "Good morning text or kiss", note: "First contact of the day, on purpose." },
      { name: "Bringing her water without being asked", note: "Quiet care that doesn't need recognition." },
      { name: "Warming her plate first", note: "Small honoring at the table." },
      { name: "Hand on her back when you pass behind her", note: "Touch as 'I see you, I'm here.'" },
      { name: "Holding her hand in public", note: "Visible chosenness." },
      { name: "Sending a song that reminded you of her", note: "Thinking of her when she's not there." },
      { name: "Asking how the hard thing went", note: "Remembering what's on her mind." },
      { name: "Telling her she looks beautiful — when she's not trying to", note: "Beauty named in ordinary moments." },
      { name: "Saying thank you for the small things", note: "Naming what she does that often goes unnamed." },
      { name: "A long hug for no reason", note: "Closeness with no agenda." },
    ],
  },
  {
    id: "quality-time",
    label: "Quality Time",
    kicker: "Inventory",
    group: "Inventory",
    short: "Quality time is presence, not just proximity.",
    inventory: true,
    intro: "Sitting on a couch with two phones is not quality time. These are the kinds of hours that actually build the relationship.",
    items: [
      { name: "Undivided attention", note: "Phones away, real eye contact, real listening." },
      { name: "Walking together", note: "Side by side, no agenda, conversation rises naturally." },
      { name: "Cooking together", note: "Shared task with built-in closeness." },
      { name: "Sharing a meal without screens", note: "Eating across from each other, not next to a show." },
      { name: "Driving somewhere together", note: "The car is one of the most underrated intimacy spaces." },
      { name: "Lying in bed talking before sleep", note: "Honest end-of-day conversation." },
      { name: "A shared ritual (coffee, prayer, gym, etc.)", note: "Something you do together regularly, by choice." },
      { name: "A date with no other purpose", note: "Time set aside for the relationship itself." },
      { name: "Doing nothing together", note: "Comfortable silence in the same room — a real test of connection." },
    ],
  },

  {
    id: "forms-of-connection",
    label: "Forms of Connection",
    kicker: "Inventory",
    group: "Inventory",
    short: "Not every connection is supposed to be romantic — and the romantic one needs the others to thrive.",
    inventory: true,
    intro: "A whole life has many kinds of connection. When too much weight rests on one relationship, the relationship buckles. These are the forms that, together, make a person feel held in the world.",
    items: [
      { name: "Romantic partner", note: "The chosen primary — sexual, emotional, committed." },
      { name: "Family of origin", note: "Parents, siblings, the people you came from." },
      { name: "Chosen family", note: "Close friends who are family in practice." },
      { name: "Close friends", note: "A small circle that knows you over time." },
      { name: "Wider friends", note: "The people you see often without going deep — texture of daily life." },
      { name: "Community", note: "A group, faith, neighborhood, team — being part of something." },
      { name: "Mentors / elders", note: "People older or wiser whose perspective shapes yours." },
      { name: "Mentees / those you guide", note: "People you pour into — gives meaning, not just receiving." },
      { name: "Professional", note: "Colleagues, collaborators — connection through shared work." },
      { name: "Self", note: "The relationship that holds all the others together." },
    ],
  },
  {
    id: "emotions-of-being-together",
    label: "Emotions of Being Together",
    kicker: "Inventory",
    group: "Inventory",
    short: "The felt sense of a real relationship has its own emotional vocabulary.",
    inventory: true,
    intro: "These are the emotions a steady, chosen relationship tends to generate. Notice which ones are alive in yours — and which ones have gone quiet.",
    items: [
      { name: "Safety", note: "Nervous-system permission to be yourself." },
      { name: "Warmth", note: "Affection that doesn't need to perform." },
      { name: "Gratitude", note: "Quiet appreciation for their presence." },
      { name: "Peace", note: "The absence of bracing." },
      { name: "Joy", note: "Laughter, lightness, delight in ordinary moments." },
      { name: "Steadiness", note: "Confidence in tomorrow." },
      { name: "Tenderness", note: "Care without conditions." },
      { name: "Pride", note: "A clean pride in being together." },
      { name: "Belonging", note: "Mutual home." },
      { name: "Hope", note: "Future tense feels good." },
      { name: "Devotion", note: "Wanting to show up for them, repeatedly, on purpose." },
    ],
  },
  {
    id: "forms-of-playfulness",
    label: "Forms of Playfulness",
    kicker: "Inventory",
    group: "Inventory",
    short: "Play is what keeps love alive after the early novelty fades.",
    inventory: true,
    intro: "Couples who keep playing together stay in love longer. Play is not a personality trait — it's a practice, in many forms.",
    items: [
      { name: "Banter", note: "Verbal teasing, inside jokes, quick-witted exchange." },
      { name: "Physical play", note: "Tickling, wrestling, dancing in the kitchen." },
      { name: "Games", note: "Cards, board games, video games, word games." },
      { name: "Pranks", note: "Light, harmless surprise — the kind that ends in laughter." },
      { name: "Everyday roleplay", note: "Silly voices, made-up characters, playful pretending." },
      { name: "Intimate roleplay", note: "Sexual play between consenting partners." },
      { name: "Adventure", note: "Spontaneous outings, road trips, trying new things." },
      { name: "Creative play", note: "Cooking experiments, art, building something together." },
      { name: "Sport / movement", note: "Playing on the same team or against each other." },
      { name: "Storytelling", note: "Telling exaggerated stories, making each other laugh." },
    ],
  },
  {
    id: "core-beliefs-for-sex",
    label: "Core Beliefs for Sex",
    kicker: "Inventory",
    group: "Inventory",
    short: "Sex works when the underlying beliefs about it are clean.",
    inventory: true,
    intro: "Sexual health in a relationship depends less on technique and more on shared, honest beliefs. These are the foundations that keep intimacy mutual, safe, and alive.",
    items: [
      { name: "Sex is for both of us", note: "Both people's pleasure and desire matter equally." },
      { name: "Both 'yes' and 'no' are welcome", note: "Consent is honored every time, without resentment." },
      { name: "Honesty about desire", note: "We can talk about what we want, what we don't, what we're curious about." },
      { name: "Sex changes over time", note: "Desire, frequency, and style will shift — and we'll talk about it." },
      { name: "Pleasure is not earned", note: "Neither person has to perform to deserve closeness." },
      { name: "Vulnerability is part of intimacy", note: "Real sex includes emotional risk, not just physical contact." },
      { name: "Respect doesn't pause for sex", note: "How we treat each other in bed reflects how we treat each other outside it." },
      { name: "Sex is not a transaction", note: "Not exchanged for favors, mood management, or fear of losing the relationship." },
      { name: "Repair after rupture matters", note: "Awkward, painful, or disconnected moments can be talked about and healed." },
      { name: "Faithfulness is mutual", note: "What we promised to each other, we mean and live." },
    ],
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
const CONCEPT_GROUPS = ["Reflection", "Red Flags", "Standards", "Communication", "Inventory", "Tools"];

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

function RedFlagConcept({ concept }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-rose-300/20 bg-gradient-to-br from-rose-600/20 via-white/[0.05] to-rose-500/10 p-6 md:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-rose-200/80">
          <span aria-hidden>⚑</span> Core question
        </p>
        <p className="mt-4 text-2xl font-black leading-snug text-white md:text-3xl">{concept.question}</p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{concept.explanation}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-rose-300/20 bg-rose-500/[0.1] p-5">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-rose-200/80">
            <span aria-hidden>⚑</span> Red flags
          </p>
          <ul className="mt-4 space-y-3">
            {concept.flags.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/78">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-emerald-300/15 bg-emerald-500/[0.08] p-5">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-emerald-200/80">
            <span aria-hidden>✓</span> Green flags
          </p>
          <ul className="mt-4 space-y-3">
            {concept.green.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/82">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <InfoBox label="Practice" tone="rose">{concept.practice}</InfoBox>
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

function InventoryConcept({ concept }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/15 via-white/[0.05] to-violet-500/10 p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-rose-200/70">Inventory</p>
        <p className="mt-4 text-2xl font-black leading-snug text-white md:text-3xl">{concept.short}</p>
        {concept.intro && (
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{concept.intro}</p>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {concept.items.map((item) => (
          <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <p className="text-base font-black text-white">{item.name}</p>
            {item.note && <p className="mt-2 text-sm leading-6 text-white/70">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderConcept(concept) {
  if (concept.interactive === "clarity-check") return <ClarityCheck />;
  if (concept.interactive === "pause-check") return <PauseCheck />;
  if (concept.inventory) return <InventoryConcept concept={concept} />;
  if (concept.redflag) return <RedFlagConcept concept={concept} />;
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
