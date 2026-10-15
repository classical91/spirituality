// The emotions catalog: one source for every Emotions page and for search.
//
// Two vocabularies feed it. The guidance spiral places states on an ascending /
// descending map (SPIRAL_LEVELS, with SPIRAL_COPY's definition + explanation);
// the glossary groups everyday feeling words into nine families
// (EMOTION_FAMILIES). They overlap only partly — Resentment exists only in the
// glossary, Victor only on the spiral — so EMOTION_CONCEPTS merges both into
// one entry per word, each with its own stable ?section=emotion-<slug> page.
// A word can carry more than one meaning (Acceptance is "feeling welcomed" in
// the social family and "allowing reality" in the calm one); every distinct
// meaning is kept, labelled with where it comes from.

export const SPIRAL_LEVELS = [
  {
    id: 'integrity-love',
    direction: 'ascending',
    name: 'Summit',
    tone: '#6d28d9',
    left: ['Unconditional Love'],
    right: ['100% Integrity'],
    meaning: 'The top of the spiral: love and integrity feel like one coherent state.',
  },
  {
    id: 'compassion',
    direction: 'ascending',
    name: 'Open-hearted',
    tone: '#7c3aed',
    left: ['Empathy', 'Forgiveness'],
    right: ['Compassion', 'Radiant'],
    meaning: 'The heart is open, generous, and able to see beyond defense.',
  },
  {
    id: 'empowered',
    direction: 'ascending',
    name: 'Empowered',
    tone: '#2563eb',
    left: ['Passion', 'Empowerment'],
    right: ['Abundance', 'Victor'],
    meaning: 'Energy returns as agency, purpose, and confidence in possibility.',
  },
  {
    id: 'service',
    direction: 'ascending',
    name: 'Outward focus',
    tone: '#0284c7',
    left: ['Generous', 'Outward-Focused'],
    right: ['Knowledge', 'Service'],
    meaning: 'Attention can move beyond self-protection into learning, contribution, and service.',
  },
  {
    id: 'joy-trust',
    direction: 'ascending',
    name: 'Joy and trust',
    tone: '#0891b2',
    left: ['Powerful', 'Joy', 'Patient'],
    right: ['Freedom', 'Trust'],
    meaning: 'The body feels capable, patient, and less controlled by threat.',
  },
  {
    id: 'confidence-humility',
    direction: 'ascending',
    name: 'Secure identity',
    tone: '#06b6d4',
    left: ['Confidence', 'Positive Self-Talk'],
    right: ['Humility', 'Seek-for-Good'],
    meaning: 'Self-talk becomes supportive without becoming inflated.',
  },
  {
    id: 'learning-gratitude',
    direction: 'ascending',
    name: 'Growth',
    tone: '#14b8a6',
    left: ['Learning', 'Self-Love'],
    right: ['Enthusiasm', 'Gratitude'],
    meaning: 'The mind can learn, appreciate, and love the self without collapse.',
  },
  {
    id: 'security-worth',
    direction: 'ascending',
    name: 'Secure mood',
    tone: '#22c55e',
    left: ['Happiness', 'Security'],
    right: ['Worthy', 'Cheerful'],
    meaning: 'Safety, worth, and lightness are accessible enough to act from.',
  },
  {
    id: 'belief-expectation',
    direction: 'ascending',
    name: 'Positive expectation',
    tone: '#16a34a',
    left: ['Acceptance', 'Belief'],
    right: ['Productive Expectation'],
    meaning: 'Reality can be accepted while still expecting movement and improvement.',
  },
  {
    id: 'play-courage',
    direction: 'ascending',
    name: 'Playful action',
    tone: '#65a30d',
    left: ['Playful', 'Positive'],
    right: ['Organize', 'Courage'],
    meaning: 'Energy becomes organized, brave, and flexible.',
  },
  {
    id: 'peace-pleased',
    direction: 'ascending',
    name: 'Peaceful interest',
    tone: '#84cc16',
    left: ['Curiosity', 'Peace'],
    right: ['Serene', 'Pleased'],
    meaning: 'Curiosity and peace create enough space to respond instead of react.',
  },
  {
    id: 'hope-calm',
    direction: 'ascending',
    name: 'First lift',
    tone: '#a3e635',
    left: ['Hopefulness'],
    right: ['Calm', 'Optimism'],
    meaning: 'The first upward turn: enough calm and hope to see a better next step.',
  },
  {
    id: 'boredom',
    direction: 'neutral',
    name: 'Midline',
    tone: '#d1d5db',
    left: ['Boredom'],
    right: ['Boredom'],
    meaning: 'The neutral line. Energy is not strongly rising or falling, but attention can tip either way.',
  },
  {
    id: 'fear-frustration',
    direction: 'descending',
    name: 'Activation',
    tone: '#84cc16',
    left: ['Overwhelm', 'Fear'],
    right: ['Jealousy', 'Frustration'],
    meaning: 'The system starts contracting around threat, comparison, or blocked movement.',
  },
  {
    id: 'insecurity-judgment',
    direction: 'descending',
    name: 'Threat story',
    tone: '#a3a10f',
    left: ['Insecurity', 'Pessimism'],
    right: ['Judgment', 'Self-Pity'],
    meaning: 'Attention starts interpreting life through danger, lack, or unfairness.',
  },
  {
    id: 'grief-anger',
    direction: 'descending',
    name: 'Pain and protest',
    tone: '#d97706',
    left: ['Grief', 'Unsupported'],
    right: ['Revenge', 'Anger'],
    meaning: 'Pain begins looking for either support or retaliation.',
  },
  {
    id: 'failure-depression',
    direction: 'descending',
    name: 'Collapse story',
    tone: '#b45309',
    left: ['Failure', 'Hatred'],
    right: ['Doubt', 'Depression'],
    meaning: 'The mind turns difficulty into identity-level defeat or hostility.',
  },
  {
    id: 'heartache-worry',
    direction: 'descending',
    name: 'Attachment pain',
    tone: '#c2410c',
    left: ['Heartache', 'Rejection'],
    right: ['Impatience', 'Worry'],
    meaning: 'Attachment pain and urgent thinking make it hard to stay centered.',
  },
  {
    id: 'disappointment-negative-talk',
    direction: 'descending',
    name: 'Inner attack',
    tone: '#dc2626',
    left: ['Depression', 'Disappointment'],
    right: ['Negative Self-Talk'],
    meaning: 'The feeling turns inward as discouragement and self-attacking language.',
  },
  {
    id: 'despair-blame',
    direction: 'descending',
    name: 'Despair',
    tone: '#ef4444',
    left: ['Despair', 'Discouragement'],
    right: ['Blame', 'Sorrow'],
    meaning: 'Energy drops into blame, sorrow, and the sense that effort will not matter.',
  },
  {
    id: 'worthless-helpless',
    direction: 'descending',
    name: 'Helplessness',
    tone: '#f87171',
    left: ['Worthless', 'Humiliation'],
    right: ['Irritation', 'Helplessness'],
    meaning: 'The self feels exposed, powerless, or unable to change the situation.',
  },
  {
    id: 'victim-dread',
    direction: 'descending',
    name: 'Identity wound',
    tone: '#fb7185',
    left: ['Low Self-Esteem', 'Victim'],
    right: ['Bitterness', 'Dread'],
    meaning: 'Pain hardens into victim identity, bitterness, or fear of what is coming.',
  },
  {
    id: 'shame-apathy',
    direction: 'descending',
    name: 'Shame and apathy',
    tone: '#f43f5e',
    left: ['Unworthiness', 'Shame'],
    right: ['Guilt', 'Apathy'],
    meaning: 'The bottom emotional range attacks worth, drains agency, and needs care.',
  },
  {
    id: 'crisis',
    direction: 'descending',
    name: 'Crisis floor',
    tone: '#991b1b',
    left: ['No Will to Live'],
    right: ['Death'],
    meaning: 'Crisis language. Treat this as a signal to involve immediate trusted or professional support.',
  },
];

export const EMOTION_FAMILIES = [
  {
    id: 'basic',
    name: 'Basic emotions',
    color: '#fbbf24',
    emotions: [
      ['Joy', 'A strong feeling of happiness.'],
      ['Happiness', 'Feeling good, pleased, or satisfied.'],
      ['Excitement', 'Feeling energized because something good may happen.'],
      ['Contentment', 'Feeling calm and satisfied with what you have.'],
      ['Peace', 'Feeling calm inside, without stress or conflict.'],
      ['Gratitude', 'Feeling thankful for someone or something.'],
      ['Hope', 'Believing something good can happen.'],
      ['Pride', 'Feeling good about yourself or something you did.'],
    ],
  },
  {
    id: 'sad',
    name: 'Sad emotions',
    color: '#60a5fa',
    emotions: [
      ['Sadness', 'Feeling unhappy or emotionally low.'],
      ['Grief', 'Deep sadness after losing someone or something important.'],
      ['Loneliness', 'Feeling alone or disconnected from others.'],
      ['Disappointment', 'Sadness because something did not happen as expected.'],
      ['Regret', 'Wishing you had done something differently.'],
      ['Heartbreak', 'Deep emotional pain, usually from love or loss.'],
      ['Hopelessness', 'Feeling like things will not get better.'],
      ['Emptiness', 'Feeling emotionally numb or like something is missing.'],
    ],
  },
  {
    id: 'angry',
    name: 'Angry emotions',
    color: '#fb7185',
    emotions: [
      ['Anger', 'Feeling upset because something feels wrong or unfair.'],
      ['Frustration', 'Feeling blocked, stuck, or annoyed.'],
      ['Irritation', 'Mild anger or annoyance.'],
      ['Annoyance', 'Feeling bothered by someone or something.'],
      ['Resentment', 'Anger that stays inside for a long time.'],
      ['Bitterness', 'Deep hurt mixed with anger.'],
      ['Rage', 'Very strong anger.'],
      ['Hatred', 'Intense dislike or hostility.'],
      ['Contempt', 'Feeling someone is beneath respect.'],
    ],
  },
  {
    id: 'fear',
    name: 'Fear emotions',
    color: '#a78bfa',
    emotions: [
      ['Fear', 'Feeling danger or threat.'],
      ['Anxiety', 'Worry or nervousness about what might happen.'],
      ['Worry', 'Thinking too much about possible problems.'],
      ['Nervousness', 'Feeling uneasy before something happens.'],
      ['Panic', 'Sudden, intense fear.'],
      ['Dread', 'Strong fear about something coming.'],
      ['Insecurity', 'Feeling unsure, unsafe, or not good enough.'],
      ['Suspicion', 'Feeling that something may be wrong or dishonest.'],
      ['Terror', 'Extreme fear.'],
    ],
  },
  {
    id: 'love',
    name: 'Love-related emotions',
    color: '#f472b6',
    emotions: [
      ['Love', 'Deep care, affection, or attachment.'],
      ['Affection', 'Warm, gentle liking or care for someone.'],
      ['Adoration', 'Deep love and admiration.'],
      ['Admiration', 'Respect and appreciation for someone.'],
      ['Attraction', 'Feeling drawn to someone.'],
      ['Desire', 'Strongly wanting someone or something.'],
      ['Longing', 'Deep wanting, especially for someone absent.'],
      ['Devotion', 'Loyal love and commitment.'],
      ['Tenderness', 'Soft, gentle care.'],
      ['Compassion', 'Caring about someone\'s pain and wanting to help.'],
      ['Trust', 'Feeling safe with someone.'],
      ['Intimacy', 'Emotional or physical closeness.'],
    ],
  },
  {
    id: 'self',
    name: 'Self-related emotions',
    color: '#38bdf8',
    emotions: [
      ['Confidence', 'Believing in yourself.'],
      ['Self-doubt', 'Questioning your ability or worth.'],
      ['Shame', 'Feeling bad about who you are or how you appear.'],
      ['Guilt', 'Feeling bad about something you did.'],
      ['Embarrassment', 'Feeling awkward or exposed socially.'],
      ['Humility', 'Not thinking you are better than others.'],
      ['Empowerment', 'Feeling strong and capable.'],
      ['Worthiness', 'Feeling deserving of love, respect, or good things.'],
      ['Inadequacy', 'Feeling not good enough.'],
      ['Self-respect', 'Valuing yourself and your boundaries.'],
    ],
  },
  {
    id: 'social',
    name: 'Social emotions',
    color: '#34d399',
    emotions: [
      ['Belonging', 'Feeling accepted as part of a group.'],
      ['Rejection', 'Feeling unwanted or pushed away.'],
      ['Acceptance', 'Feeling welcomed or approved of.'],
      ['Jealousy', 'Fear of losing someone or something to another person.'],
      ['Envy', 'Wanting what someone else has.'],
      ['Respect', 'Valuing someone or treating them as important.'],
      ['Betrayal', 'Hurt from someone breaking trust.'],
      ['Empathy', 'Understanding and feeling another person\'s emotions.'],
      ['Sympathy', 'Feeling sorry for someone\'s pain.'],
      ['Pity', 'Feeling sadness for someone, sometimes from a distance.'],
      ['Awkwardness', 'Feeling socially uncomfortable.'],
    ],
  },
  {
    id: 'calm',
    name: 'Calm or spiritual emotions',
    color: '#22d3ee',
    emotions: [
      ['Relief', 'Feeling better after stress or fear ends.'],
      ['Acceptance', 'Allowing reality instead of fighting it.'],
      ['Forgiveness', 'Releasing anger toward someone or yourself.'],
      ['Faith', 'Trusting something even without full proof.'],
      ['Awe', 'Wonder mixed with respect or amazement.'],
      ['Stillness', 'Deep inner quiet.'],
      ['Surrender', 'Letting go of control.'],
      ['Patience', 'Calmly waiting without becoming upset.'],
      ['Clarity', 'Feeling mentally clear and sure.'],
      ['Groundedness', 'Feeling stable, present, and emotionally steady.'],
    ],
  },
  {
    id: 'mixed',
    name: 'Mixed emotions',
    color: '#c084fc',
    emotions: [
      ['Confusion', 'Not understanding what you feel or what is happening.'],
      ['Nostalgia', 'Warm sadness when remembering the past.'],
      ['Ambivalence', 'Having mixed feelings at the same time.'],
      ['Overwhelm', 'Feeling like something is too much to handle.'],
      ['Vulnerability', 'Feeling emotionally open or exposed.'],
      ['Curiosity', 'Wanting to know or understand more.'],
      ['Wonder', 'Amazed interest in something.'],
      ['Inspiration', 'Feeling mentally or emotionally lifted to act.'],
      ['Motivation', 'Feeling driven to do something.'],
      ['Determination', 'Strong commitment to keep going.'],
      ['Courage', 'Acting even when afraid.'],
      ['Optimism', 'Expecting good things to happen.'],
      ['Fulfillment', 'Feeling deeply satisfied because something feels meaningful.'],
    ],
  },
];

const SPIRAL_COPY = {
  '100% Integrity': ['Complete alignment between values, words, and behavior.', 'Integrity steadies the nervous system because there is less inner conflict to manage.'],
  Abundance: ['Feeling that there is enough support, possibility, or provision.', 'Abundance opens attention toward resource, opportunity, and generosity.'],
  Acceptance: ['Allowing reality instead of fighting it.', 'Acceptance returns energy from resistance to response.'],
  Anger: ['Feeling upset because something feels wrong or unfair.', 'Anger carries boundary energy and asks what needs protection, repair, or clear speech.'],
  Apathy: ['Feeling emotionally flat, indifferent, or unable to care.', 'Apathy can be a shutdown state after too much stress, shame, or disappointment.'],
  Belief: ['Feeling inner agreement that something is possible or true.', 'Belief gives action a stable direction before full proof has arrived.'],
  Bitterness: ['Deep hurt mixed with anger.', 'Bitterness forms when pain hardens into a story that expects more pain.'],
  Blame: ['Locating the cause of pain in someone or something else.', 'Blame may identify responsibility, but it can also keep attention away from repair and agency.'],
  Boredom: ['Feeling unstimulated, uninterested, or emotionally flat.', 'Boredom sits near the midline: it can slide into numbness or become space for curiosity.'],
  Calm: ['Feeling settled and not urgently threatened.', 'Calm gives the body enough safety to choose instead of react.'],
  Cheerful: ['Light, bright, and pleasantly upbeat.', 'Cheerfulness makes social contact and effort feel easier.'],
  Compassion: ['Caring about pain and wanting to respond wisely.', 'Compassion joins empathy with helpful action while keeping the heart open.'],
  Confidence: ['Believing in your ability, worth, or capacity.', 'Confidence comes from evidence, practice, and stable self-regard.'],
  Courage: ['Acting from value even when fear is present.', 'Courage does not remove fear; it chooses what matters more.'],
  Curiosity: ['Wanting to know, understand, or explore.', 'Curiosity interrupts judgment and opens a path toward learning.'],
  Death: ['A crisis-level association with ending or collapse.', 'If this state feels personal or immediate, it needs real-time support, not solitary processing.'],
  Depression: ['A low, heavy state marked by reduced energy or hope.', 'Depression can shrink the future; support and small grounded steps matter.'],
  Despair: ['Feeling that things cannot get better.', 'Despair needs care, rest, and connection before the mind can think clearly.'],
  Disappointment: ['Sadness because reality did not meet expectation.', 'Disappointment asks you to digest the gap between hope and outcome.'],
  Discouragement: ['Feeling less willing or able to continue.', 'Discouragement often needs the next step made smaller and more concrete.'],
  Doubt: ['Questioning whether something is true, safe, or possible.', 'Doubt can protect from false certainty, but it can also freeze action when fear leads it.'],
  Empathy: ['Understanding and feeling another person\'s emotional world.', 'Empathy allows connection without needing to lose yourself inside another person.'],
  Empowerment: ['Feeling capable, choiceful, and able to act.', 'Empowerment restores agency after helplessness or self-doubt.'],
  Enthusiasm: ['Warm, energized interest.', 'Enthusiasm gives effort a feeling of aliveness.'],
  Failure: ['Feeling defined by a mistake, loss, or unmet outcome.', 'Failure becomes useful when it is treated as feedback rather than identity.'],
  Fear: ['Feeling danger or threat.', 'Fear tries to protect you by focusing attention on safety and response.'],
  Forgiveness: ['Releasing the hold of anger or resentment.', 'Forgiveness loosens emotional grip without pretending harm did not happen.'],
  Freedom: ['Feeling unconfined, self-directed, or able to choose.', 'Freedom appears when fear, shame, or pressure no longer owns the next action.'],
  Frustration: ['Feeling blocked, stuck, or annoyed.', 'Frustration shows that energy wants to move but cannot find an effective path.'],
  Generous: ['Feeling willing to give, share, or support.', 'Generosity becomes easier when the self does not feel endangered.'],
  Gratitude: ['Feeling thankful for someone or something.', 'Gratitude trains attention toward support, nourishment, and what is already present.'],
  Grief: ['Deep sadness after loss or separation.', 'Grief marks love, attachment, or meaning adjusting to absence.'],
  Guilt: ['Feeling bad about something you did.', 'Guilt can guide repair when it stays connected to behavior instead of attacking identity.'],
  Happiness: ['Feeling good, pleased, or satisfied.', 'Happiness points to simple alignment between what is happening and what you value.'],
  Hatred: ['Intense dislike or hostility.', 'Hatred fuses pain and threat into rejection; distance helps before judgment or action.'],
  Heartache: ['Emotional pain from love, attachment, or loss.', 'Heartache needs tenderness, time, and care rather than self-attack.'],
  Helplessness: ['Feeling unable to affect what is happening.', 'Helplessness asks for support and one controllable next action.'],
  Hopefulness: ['Feeling that something better can happen.', 'Hopefulness is often the first upward movement out of shutdown.'],
  Humiliation: ['Feeling exposed, lowered, or painfully embarrassed.', 'Humiliation attacks social safety and needs dignity restored.'],
  Humility: ['Feeling grounded without superiority.', 'Humility lets you learn, apologize, and grow without collapsing self-worth.'],
  Impatience: ['Agitation from wanting something to happen sooner.', 'Impatience turns desire into pressure and often benefits from slowing the body.'],
  Insecurity: ['Feeling unsure, unsafe, or not good enough.', 'Insecurity asks for reassurance from stable identity, evidence, and grounded support.'],
  Irritation: ['Mild anger or annoyance.', 'Irritation is often an early signal to pause before resentment builds.'],
  Jealousy: ['Fear of losing someone or something to another.', 'Jealousy points to attachment threat and asks for security, clarity, or honest communication.'],
  Joy: ['A bright feeling of happiness, aliveness, or delight.', 'Joy shows that something feels welcome, meaningful, or deeply alive.'],
  Judgment: ['Evaluating harshly or reducing someone to a fault.', 'Judgment can signal discernment, but harsh judgment often protects an unexamined wound.'],
  Knowledge: ['Feeling informed, clear, or mentally equipped.', 'Knowledge can steady emotion by replacing vague threat with clearer understanding.'],
  Learning: ['Feeling open to growth and correction.', 'Learning turns uncertainty into development instead of shame.'],
  'Low Self-Esteem': ['Feeling poorly about your value or capacity.', 'Low self-esteem needs evidence, care, and identity repair rather than more inner attack.'],
  'Negative Self-Talk': ['Harsh, discouraging language directed at yourself.', 'Negative self-talk deepens contraction because the mind becomes the attacker.'],
  'No Will to Live': ['A crisis-level loss of desire to continue.', 'If this feels current or literal, contact emergency services, a crisis line, or a trusted person now.'],
  Optimism: ['Expecting favorable possibility.', 'Optimism helps the body stay open to effort without denying difficulty.'],
  Organize: ['Feeling ready to order, plan, and structure action.', 'Organization turns emotional energy into a workable next step.'],
  'Outward-Focused': ['Attention oriented toward others, service, or the wider world.', 'Outward focus can interrupt rumination when it is grounded and not avoidant.'],
  Overwhelm: ['Feeling that the load exceeds current capacity.', 'Overwhelm asks for simplification, support, and fewer inputs.'],
  Passion: ['Strong feeling, desire, or enthusiasm.', 'Passion gives energy to what feels alive, important, or meaningful.'],
  Patient: ['Able to wait without forcing or collapsing.', 'Patience holds desire without panic or pressure.'],
  Peace: ['Feeling calm inside, without conflict.', 'Peace often appears when there is inner agreement, rest, or release from pressure.'],
  Pessimism: ['Expecting things to go badly.', 'Pessimism may be protective, but it can train attention to miss openings.'],
  Playful: ['Light, flexible, and willing to engage.', 'Playfulness helps the nervous system learn without pressure.'],
  Pleased: ['Gently satisfied or happy with something.', 'Being pleased lets small good things register instead of being dismissed.'],
  Positive: ['Oriented toward possibility, support, or constructive meaning.', 'A positive state makes action feel lighter and more available.'],
  'Positive Self-Talk': ['Supportive inner language.', 'Positive self-talk gives the mind a voice that helps rather than harms.'],
  Powerful: ['Feeling strong, capable, or influential.', 'Power feels healthiest when joined with patience, humility, and care.'],
  'Productive Expectation': ['Expecting improvement in a way that supports useful action.', 'Productive expectation keeps hope connected to behavior.'],
  Radiant: ['Feeling bright, open, and visibly alive.', 'Radiance is the felt overflow of inner alignment and openness.'],
  Rejection: ['Feeling unwanted, dismissed, or pushed away.', 'Rejection hurts because it touches attachment, worth, and belonging.'],
  Revenge: ['Wanting to hurt back after being hurt.', 'Revenge signals pain and boundary violation, but acting from it usually deepens damage.'],
  Security: ['Feeling safe, steady, or protected.', 'Security lets the body stop scanning constantly for danger.'],
  'Seek-for-Good': ['Looking deliberately for what is useful, true, or redeemable.', 'Seeking for good trains attention toward repair without denying reality.'],
  'Self-Love': ['Warm care and loyalty toward yourself.', 'Self-love protects worth while still allowing growth and correction.'],
  'Self-Pity': ['Feeling trapped in your own misfortune.', 'Self-pity needs compassion, but it also needs a path back to agency.'],
  Serene: ['Quietly peaceful and composed.', 'Serenity is calm with depth, not numbness.'],
  Service: ['Feeling moved to contribute or help.', 'Service channels emotion into care beyond the self.'],
  Shame: ['Feeling bad about who you are or how you appear.', 'Shame attacks identity and needs compassion, truth, and safe connection.'],
  Sorrow: ['A tender sadness or grief.', 'Sorrow asks for room to feel what hurts without making it your whole identity.'],
  Trust: ['Feeling safe with someone, yourself, or life.', 'Trust grows when words, actions, and experience become reliably aligned.'],
  'Unconditional Love': ['Love not dependent on performance or control.', 'Unconditional love holds care without withdrawing basic worth.'],
  Unsupported: ['Feeling alone, unseen, or without help.', 'Unsupported states need connection, clear asking, or practical scaffolding.'],
  Unworthiness: ['Feeling undeserving of love, respect, or good.', 'Unworthiness is a wound around value, not a fact about the self.'],
  Victor: ['Feeling like you can overcome rather than be defeated.', 'Victor energy is agency after struggle, strongest when it stays humble.'],
  Victim: ['Feeling defined by harm, powerlessness, or what happened to you.', 'Victim identity may begin as pain recognition, but healing requires restored agency.'],
  Worry: ['Thinking repeatedly about possible problems.', 'Worry tries to solve uncertainty mentally when the body often needs regulation first.'],
  Worthless: ['Feeling without value.', 'Worthless feelings are serious identity attacks and need compassion, reality-checking, and support.'],
  Worthy: ['Feeling deserving of love, respect, and good things.', 'Worthiness is permission to receive without proving your existence first.'],
};

export const DIRECTION_META = {
  ascending: {
    category: 'Ascending emotions',
    summary: 'States that open attention, restore agency, and move toward love, integrity, service, courage, and calm.',
    color: '#22c55e',
  },
  neutral: {
    category: 'Neutral midpoint',
    summary: 'The midline state where energy is flat enough to turn upward or downward.',
    color: '#d1d5db',
  },
  descending: {
    category: 'Descending emotions',
    summary: 'States that contract around threat, shame, anger, grief, helplessness, or crisis.',
    color: '#fb7185',
  },
};

export function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ?section= values the Emotions pages answer to.
export const EMOTIONS_SECTION = 'emotions';
export const GLOSSARY_SECTION = 'emotion-glossary';
export const SPIRAL_SECTION = 'guidance-spiral';
export const familySection = (familyId) => `emotions-${familyId}`;
export const conceptSection = (slug) => `emotion-${slug}`;
export const emotionHref = (section) => `/inner-atlas?section=${encodeURIComponent(section)}`;

export const familiesById = Object.fromEntries(EMOTION_FAMILIES.map((family) => [family.id, family]));

// Every position on the spiral, one per (direction, word). Boredom sits on
// both sides of the midline and Depression in two descending bands; the spiral
// view shows the first, the concept page lists them all.
export const SPIRAL_EMOTIONS = SPIRAL_LEVELS.flatMap((level, levelIndex) =>
  [...level.left, ...level.right].map((name, sideIndex) => ({
    name,
    slug: slugify(name),
    levelId: level.id,
    levelName: level.name,
    direction: level.direction,
    directionLabel: DIRECTION_META[level.direction].category,
    directionSummary: DIRECTION_META[level.direction].summary,
    definition: SPIRAL_COPY[name]?.[0] || `${name} as shown on the emotional spiral.`,
    explanation: SPIRAL_COPY[name]?.[1] || `This state belongs to the ${level.name.toLowerCase()} band of the spiral.`,
    color: level.tone,
    rank: levelIndex + 1,
    side: sideIndex < level.left.length ? 'left' : 'right',
    id: `${level.direction}-${slugify(name)}`,
  }))
).filter((emotion, index, list) => list.findIndex((item) => item.id === emotion.id) === index);

function buildConcepts() {
  const bySlug = new Map();
  const entry = (name) => {
    const slug = slugify(name);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { slug, name, section: conceptSection(slug), families: [], spiral: [], meanings: [] });
    }
    return bySlug.get(slug);
  };

  for (const family of EMOTION_FAMILIES) {
    for (const [name, definition] of family.emotions) {
      const concept = entry(name);
      concept.families.push(family.id);
      concept.meanings.push({ source: 'family', familyId: family.id, label: family.name, definition });
    }
  }

  SPIRAL_LEVELS.forEach((level, levelIndex) => {
    for (const name of [...level.left, ...level.right]) {
      const concept = entry(name);
      if (concept.spiral.some((position) => position.levelId === level.id)) continue;
      concept.spiral.push({
        levelId: level.id,
        levelIndex,
        levelName: level.name,
        direction: level.direction,
        directionLabel: DIRECTION_META[level.direction].category,
        tone: level.tone,
        meaning: level.meaning,
      });
    }
  });

  return [...bySlug.values()].map((concept) => {
    const copy = SPIRAL_COPY[concept.name];
    const meanings = [...concept.meanings];
    if (copy && !meanings.some((meaning) => meaning.definition === copy[0])) {
      meanings.push({ source: 'spiral', label: 'Guidance spiral', definition: copy[0] });
    }
    if (meanings.length === 0) {
      meanings.push({ source: 'spiral', label: 'Guidance spiral', definition: `${concept.name} as shown on the emotional spiral.` });
    }
    const primaryFamily = familiesById[concept.families[0]] || null;
    return {
      ...concept,
      meanings,
      summary: meanings[0].definition,
      explanation: copy?.[1] || null,
      primaryFamilyId: primaryFamily?.id || null,
      color: primaryFamily?.color || concept.spiral[0]?.tone || '#f472b6',
      crisis: concept.spiral.some((position) => position.levelId === 'crisis'),
    };
  });
}

export const EMOTION_CONCEPTS = buildConcepts();
export const conceptsBySlug = Object.fromEntries(EMOTION_CONCEPTS.map((concept) => [concept.slug, concept]));
export const CONCEPTS_ALPHABETICAL = [...EMOTION_CONCEPTS].sort((a, b) => a.name.localeCompare(b.name));

export const conceptsInFamily = (familyId) =>
  (familiesById[familyId]?.emotions || []).map(([name]) => conceptsBySlug[slugify(name)]);

/**
 * What a ?section= value means to the Emotions pages, or null when it is not
 * one of theirs: { view: 'directory' | 'glossary' | 'spiral' | 'family' | 'concept', ... }.
 */
export function resolveEmotionSection(section) {
  if (!section) return null;
  if (section === EMOTIONS_SECTION) return { view: 'directory' };
  if (section === GLOSSARY_SECTION) return { view: 'glossary' };
  if (section === SPIRAL_SECTION) return { view: 'spiral' };
  if (section.startsWith('emotions-')) {
    const family = familiesById[section.slice('emotions-'.length)];
    return family ? { view: 'family', family } : null;
  }
  if (section.startsWith('emotion-')) {
    const concept = conceptsBySlug[section.slice('emotion-'.length)];
    return concept ? { view: 'concept', concept } : null;
  }
  return null;
}

// Neighbours worth offering from a concept page: the rest of its families, the
// rest of its spiral band, and the band just above it — the spiral's advice is
// to reach for the closest believable improvement, not the top of the chart.
export function relatedConcepts(concept) {
  const others = (list) => {
    const seen = new Set([concept.slug]);
    return list.filter((item) => item && !seen.has(item.slug) && seen.add(item.slug));
  };
  const levelConcepts = (level) => (level ? [...level.left, ...level.right].map((name) => conceptsBySlug[slugify(name)]) : []);
  const position = concept.spiral[0];
  return {
    family: others(concept.families.flatMap(conceptsInFamily)),
    band: others(concept.spiral.flatMap((spot) => levelConcepts(SPIRAL_LEVELS[spot.levelIndex]))),
    stepUp: position && position.levelIndex > 0
      ? { level: SPIRAL_LEVELS[position.levelIndex - 1], concepts: others(levelConcepts(SPIRAL_LEVELS[position.levelIndex - 1])) }
      : null,
  };
}

// Ranked search over every concept: name matches first, then meanings, then
// the family / spiral band it sits in.
export function searchEmotionConcepts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = [];
  for (const concept of EMOTION_CONCEPTS) {
    const name = concept.name.toLowerCase();
    let score = 0;
    if (name === q) score += 40;
    if (name.startsWith(q)) score += 20;
    if (name.includes(q)) score += 10;
    if (concept.meanings.some((meaning) => meaning.definition.toLowerCase().includes(q))) score += 4;
    if (concept.explanation?.toLowerCase().includes(q)) score += 2;
    const context = [
      ...concept.families.map((id) => familiesById[id].name),
      ...concept.spiral.map((position) => position.levelName),
    ].join(' ').toLowerCase();
    if (context.includes(q)) score += 1;
    if (score > 0) scored.push({ concept, score });
  }
  scored.sort((a, b) => b.score - a.score || a.concept.name.localeCompare(b.concept.name));
  return scored.map((item) => item.concept);
}

// One global-search entry per concept page. They stay out of the daily-reading
// rotation (readingPool: false) so adding them does not reshuffle it.
export const emotionSearchEntries = EMOTION_CONCEPTS.map((concept) => ({
  id: `ia-emotion-${concept.slug}`,
  portalId: 'inneratlas',
  section: concept.section,
  title: concept.name,
  summary: concept.summary,
  tags: [concept.name.toLowerCase()],
  lens: 'Reflection',
  readingPool: false,
}));
