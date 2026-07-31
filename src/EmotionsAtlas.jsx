import { useEffect, useMemo, useState } from 'react';
import InnerAtlasNav from './components/InnerAtlasNav';
import './innerAtlasTheme.css';
import { accentVars } from './innerAtlasTheme';

const SPIRAL_LEVELS = [
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

const DEFINITION_GROUPS = [
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

const COPY = {
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

const directionMeta = {
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

const ALL_EMOTIONS = SPIRAL_LEVELS.flatMap((level, levelIndex) =>
  [...level.left, ...level.right].map((name, sideIndex) => ({
    name,
    levelId: level.id,
    levelName: level.name,
    direction: level.direction,
    directionLabel: directionMeta[level.direction].category,
    directionSummary: directionMeta[level.direction].summary,
    definition: COPY[name]?.[0] || `${name} as shown on the emotional spiral.`,
    explanation: COPY[name]?.[1] || `This state belongs to the ${level.name.toLowerCase()} band of the spiral.`,
    color: level.tone,
    rank: levelIndex + 1,
    side: sideIndex < level.left.length ? 'left' : 'right',
    id: `${level.direction}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  }))
).filter((emotion, index, list) => list.findIndex((item) => item.id === emotion.id) === index);

// When a daily reading or search lands on a specific emotion family, open the
// page focused on that family: select a representative state on the spiral so
// the detail panel reflects it, and highlight the matching glossary card.
const FAMILY_SPIRAL_ANCHOR = {
  basic: 'ascending-joy',
  sad: 'descending-grief',
  angry: 'descending-anger',
  fear: 'descending-fear',
  love: 'ascending-compassion',
  self: 'ascending-confidence',
  social: 'ascending-empathy',
  calm: 'ascending-acceptance',
  mixed: 'ascending-courage',
};
const DEFINITION_GROUP_IDS = new Set(DEFINITION_GROUPS.map((group) => group.id));

function SpiralRibbon() {
  const loops = 11;
  const segments = Array.from({ length: loops }, (_, index) => {
    const y = 7 + index * 8;
    const nextY = y + 8;
    const left = 43 - index * 0.55;
    const right = 57 + index * 0.55;
    const startRight = index % 2 === 0;
    const startX = startRight ? right : left;
    const endX = startRight ? left : right;
    return `M ${startX} ${y} C ${startRight ? 80 : 20} ${y + 2}, ${startRight ? 20 : 80} ${nextY - 2}, ${endX} ${nextY}`;
  });

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="emotionRibbon" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5b21b6" />
          <stop offset="18%" stopColor="#2563eb" />
          <stop offset="38%" stopColor="#06b6d4" />
          <stop offset="52%" stopColor="#84cc16" />
          <stop offset="68%" stopColor="#d97706" />
          <stop offset="82%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="emotionCore" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="emotionGlow">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={segments.join(' ')} fill="none" stroke="url(#emotionRibbon)" strokeWidth="5.2" strokeLinecap="round" filter="url(#emotionGlow)" opacity="0.88" />
      <path d={segments.join(' ')} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.15" strokeLinecap="round" opacity="0.8" />
      <path d="M 50 0 C 57 18, 43 33, 50 50 C 57 66, 43 82, 50 100" fill="none" stroke="url(#emotionCore)" strokeWidth="12" opacity="0.55" />
      <path d="M 44 1 L 50 0 L 56 1 L 50 7 Z" fill="rgba(255,255,255,0.34)" />
      <path d="M 44 99 L 50 100 L 56 99 L 50 93 Z" fill="rgba(255,255,255,0.24)" />
    </svg>
  );
}

function EmotionChip({ label, tone, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${selected ? tone : `${tone}55`}`,
        background: selected ? `${tone}30` : 'rgba(11,13,24,0.72)',
        color: selected ? '#fff' : 'rgba(255,255,255,0.78)',
        borderRadius: 999,
        padding: '6px 9px',
        fontSize: 11,
        lineHeight: 1,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: selected ? `0 0 22px ${tone}3d` : 'none',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  );
}

function EmotionalSpiralDiagram({ selectedId, onSelect }) {
  const findEmotion = (name, direction) =>
    ALL_EMOTIONS.find((emotion) => emotion.name === name && emotion.direction === direction) ||
    ALL_EMOTIONS.find((emotion) => emotion.name === name);

  return (
    <section
      style={{
        position: 'relative',
        borderRadius: 28,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))',
        padding: '24px clamp(14px, 2.5vw, 28px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ color: '#e5e7eb', fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' }}>Emotional spiral</div>
        <h2 style={{ margin: '4px 0 0', color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.04em' }}>Ascending and descending states</h2>
      </div>

      <div
        className="spiral-diagram-grid"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(120px, 170px) minmax(0, 1fr)',
          gap: 12,
          alignItems: 'stretch',
        }}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: '54.2%', height: 1, background: 'rgba(255,255,255,0.35)', boxShadow: '0 0 18px rgba(255,255,255,0.26)' }} />
        <div style={{ gridColumn: 2, gridRow: `1 / ${SPIRAL_LEVELS.length + 1}`, minHeight: 760, position: 'relative', zIndex: 1 }}>
          <SpiralRibbon />
        </div>

        {SPIRAL_LEVELS.map((level, index) => (
          <div
            key={level.id}
            className={`spiral-row spiral-${level.direction}`}
            style={{
              display: 'contents',
            }}
          >
            <div style={{ gridColumn: 1, gridRow: index + 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, flexWrap: 'wrap', minHeight: 34, position: 'relative', zIndex: 3 }}>
              {level.left.map((label) => {
                const emotion = findEmotion(label, level.direction);
                return (
                  <EmotionChip
                    key={`${level.id}-${label}-left`}
                    label={label}
                    tone={level.tone}
                    selected={emotion?.id === selectedId}
                    onClick={() => emotion && onSelect(emotion)}
                  />
                );
              })}
            </div>
            <div style={{ gridColumn: 3, gridRow: index + 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6, flexWrap: 'wrap', minHeight: 34, position: 'relative', zIndex: 3 }}>
              {level.right.map((label) => {
                const emotion = findEmotion(label, level.direction);
                return (
                  <EmotionChip
                    key={`${level.id}-${label}-right`}
                    label={label}
                    tone={level.tone}
                    selected={emotion?.id === selectedId}
                    onClick={() => emotion && onSelect(emotion)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 16, color: 'rgba(255,255,255,0.58)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
        <span>Ascending</span>
        <span>Descending</span>
      </div>
    </section>
  );
}

function CrisisNote() {
  return (
    <div style={{
      border: '1px solid rgba(248,113,113,0.34)',
      borderRadius: 18,
      background: 'rgba(127,29,29,0.22)',
      padding: 14,
      color: 'rgba(254,226,226,0.9)',
      fontSize: 12.5,
      lineHeight: 1.65,
    }}>
      If "No Will to Live" or "Death" feels literal, current, or unsafe, contact emergency services or a crisis line now. In the U.S. or Canada, call or text 988 for immediate crisis support.
    </div>
  );
}

function EmotionPortalNav() {
  const items = [
    { href: '#emotion-spiral-map', label: 'Spiral Map' },
    { href: '#emotion-spiral-list', label: 'Search & Levels' },
    { href: '#emotion-definition-glossary', label: 'Definitions' },
  ];

  return (
    <nav
      aria-label="Emotion portal navigation"
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 20,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        margin: '0 0 22px',
        padding: 10,
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 18,
        background: 'rgba(11,13,24,0.88)',
        backdropFilter: 'blur(14px)',
      }}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          style={{
            border: '1px solid rgba(244,114,182,0.32)',
            background: 'rgba(244,114,182,0.08)',
            color: '#f9a8d4',
            borderRadius: 999,
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 900,
            textDecoration: 'none',
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default function EmotionsAtlas({ onBack, onSelectSection, initialFamily }) {
  const focusFamily = initialFamily && DEFINITION_GROUP_IDS.has(initialFamily) ? initialFamily : null;
  const [activeDirection, setActiveDirection] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(
    () => (focusFamily && FAMILY_SPIRAL_ANCHOR[focusFamily]) || 'ascending-joy'
  );
  const [highlightFamily, setHighlightFamily] = useState(focusFamily);

  // On a family deep link, scroll to that family's glossary card and let the
  // highlight fade after a moment so the page "lands" on the right emotions.
  useEffect(() => {
    if (!focusFamily) return undefined;
    document
      .getElementById(`emotion-family-${focusFamily}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const timer = setTimeout(() => setHighlightFamily(null), 2800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleEmotions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_EMOTIONS.filter((emotion) => {
      const matchesDirection = activeDirection === 'all' || emotion.direction === activeDirection;
      const haystack = [
        emotion.name,
        emotion.definition,
        emotion.explanation,
        emotion.directionLabel,
        emotion.levelName,
      ].join(' ').toLowerCase();
      return matchesDirection && (!q || haystack.includes(q));
    });
  }, [activeDirection, query]);

  const selectedEmotion =
    ALL_EMOTIONS.find((emotion) => emotion.id === selectedId) ||
    visibleEmotions[0] ||
    ALL_EMOTIONS[0];

  const groupedVisible = ['ascending', 'neutral', 'descending'].map((direction) => ({
    id: direction,
    name: directionMeta[direction].category,
    color: directionMeta[direction].color,
    summary: directionMeta[direction].summary,
    emotions: visibleEmotions.filter((emotion) => emotion.direction === direction),
  })).filter((group) => group.emotions.length > 0);

  const selectEmotion = (emotion) => {
    setSelectedId(emotion.id);
    document.getElementById('emotion-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="ia-root" style={accentVars('emotions')}>
      <style>
        {`
          @media (max-width: 760px) {
            .spiral-diagram-grid {
              grid-template-columns: minmax(0, 1fr) !important;
            }

            .spiral-diagram-grid > div:nth-child(2) {
              display: none !important;
            }

            .spiral-row > div {
              grid-column: 1 !important;
              grid-row: auto !important;
              justify-content: flex-start !important;
              min-height: auto !important;
              margin-bottom: 6px !important;
            }
          }
        `}
      </style>
      <InnerAtlasNav activeId="emotions" onBack={onBack} onSelectSection={onSelectSection} title="Emotions & Guidance Spiral" />

      <main style={{ maxWidth: 'var(--ia-max, 1280px)', margin: '0 auto', padding: '38px 24px 72px' }}>
        <header style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: 28,
          alignItems: 'center',
          marginBottom: 28,
        }}>
          <div>
            <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
              Emotional vocabulary
            </div>
            <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(2.1rem, 5vw, 4.8rem)', lineHeight: 0.96, letterSpacing: '-0.035em' }}>
              Map the feeling on the spiral.
            </h1>
            <p style={{ maxWidth: 640, color: 'rgba(255,255,255,0.58)', fontSize: '1rem', lineHeight: 1.75, margin: '18px 0 0' }}>
              This page now follows the emotional spiral structure more closely: ascending states above the boredom midline, descending states below it, and crisis language clearly marked at the floor.
            </p>
          </div>

          <aside id="emotion-detail" style={{
            border: `1px solid ${selectedEmotion.color}55`,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${selectedEmotion.color}18, rgba(255,255,255,0.035))`,
            padding: 22,
          }}>
            <div style={{ color: selectedEmotion.color, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              {selectedEmotion.directionLabel} / {selectedEmotion.levelName}
            </div>
            <h2 style={{ margin: '8px 0 8px', color: '#fff', fontSize: 34, letterSpacing: '-0.03em' }}>{selectedEmotion.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>{selectedEmotion.definition}</p>
            <div style={{ height: 1, background: `${selectedEmotion.color}44`, margin: '18px 0' }} />
            <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: 14 }}>Spiral reading</h3>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{selectedEmotion.explanation}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.6, margin: '18px 0 0' }}>
              This is a reflection map, not a diagnosis. Use it to name direction, not to shame yourself for being in a lower state.
            </p>
          </aside>
        </header>

        <EmotionPortalNav />

        <div id="emotion-spiral-map" style={{ marginBottom: 28, scrollMarginTop: 118 }}>
          <EmotionalSpiralDiagram selectedId={selectedEmotion.id} onSelect={selectEmotion} />
        </div>

        <section id="emotion-spiral-list" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: 20,
          alignItems: 'start',
          scrollMarginTop: 118,
        }}>
          <div style={{ position: 'sticky', top: 76, display: 'grid', gap: 14 }}>
            <CrisisNote />
            <div style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.035)',
              padding: 16,
            }}>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 900, marginBottom: 10 }}>How to use it</div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>
                Find the nearest word, then look one or two bands upward. The next useful move is usually not the top of the chart; it is the closest believable improvement in state.
              </p>
            </div>
          </div>

          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: 12,
              marginBottom: 18,
            }}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search shame, hopefulness, courage, jealousy, integrity..."
                style={{
                  width: '100%',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.055)',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '14px 16px',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { id: 'all', label: 'All', color: '#ffffff' },
                  { id: 'ascending', label: 'Ascending', color: directionMeta.ascending.color },
                  { id: 'neutral', label: 'Midline', color: directionMeta.neutral.color },
                  { id: 'descending', label: 'Descending', color: directionMeta.descending.color },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveDirection(filter.id)}
                    style={{
                      border: `1px solid ${filter.id === 'all' ? 'rgba(255,255,255,0.14)' : `${filter.color}55`}`,
                      background: activeDirection === filter.id ? `${filter.color}24` : 'rgba(255,255,255,0.035)',
                      color: activeDirection === filter.id ? '#fff' : 'rgba(255,255,255,0.68)',
                      borderRadius: 999,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: 'inherit',
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {groupedVisible.length === 0 ? (
              <div style={{ border: '1px dashed rgba(255,255,255,0.18)', borderRadius: 20, padding: 30, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                No emotions found. Try another word.
              </div>
            ) : groupedVisible.map((group) => (
              <section key={group.id} style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: 20 }}>{group.name}</h3>
                  <span style={{ color: group.color, fontSize: 12, fontWeight: 800 }}>{group.emotions.length}</span>
                </div>
                <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, fontSize: 13 }}>{group.summary}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(230px, 100%), 1fr))', gap: 10 }}>
                  {group.emotions.map((emotion) => (
                    <button
                      key={emotion.id}
                      type="button"
                      onClick={() => selectEmotion(emotion)}
                      style={{
                        textAlign: 'left',
                        border: `1px solid ${emotion.id === selectedEmotion.id ? emotion.color : 'rgba(255,255,255,0.09)'}`,
                        borderRadius: 16,
                        background: emotion.id === selectedEmotion.id ? `${emotion.color}18` : 'rgba(255,255,255,0.035)',
                        padding: 14,
                        cursor: 'pointer',
                        color: '#fff',
                        minHeight: 122,
                        fontFamily: 'inherit',
                      }}
                    >
                      <strong style={{ color: emotion.color, fontSize: 14 }}>{emotion.name}</strong>
                      <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.55, fontSize: 12.5, margin: '7px 0 0' }}>{emotion.definition}</p>
                      <p style={{ color: 'rgba(255,255,255,0.34)', lineHeight: 1.45, fontSize: 11.5, margin: '8px 0 0' }}>{emotion.levelName}</p>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section id="emotion-definition-glossary" style={{ marginTop: 34, scrollMarginTop: 118 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Emotion definitions
            </div>
            <h2 style={{ margin: '8px 0 0', color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.035em' }}>
              Simple glossary by family
            </h2>
            <p style={{ maxWidth: 720, color: 'rgba(255,255,255,0.52)', fontSize: 14, lineHeight: 1.75, margin: '10px 0 0' }}>
              The spiral shows emotional direction. This glossary gives plain definitions for nearby feelings that may not appear directly on the spiral.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 14 }}>
            {DEFINITION_GROUPS.map((group) => (
              <article
                key={group.id}
                id={`emotion-family-${group.id}`}
                style={{
                  borderRadius: 20,
                  border: `1px solid ${highlightFamily === group.id ? group.color : `${group.color}38`}`,
                  background: `linear-gradient(135deg, ${group.color}${highlightFamily === group.id ? '26' : '12'}, rgba(255,255,255,0.03))`,
                  padding: 18,
                  scrollMarginTop: 132,
                  boxShadow: highlightFamily === group.id ? `0 0 0 1px ${group.color}, 0 0 34px ${group.color}55` : 'none',
                  transition: 'box-shadow 0.45s ease, border-color 0.45s ease, background 0.45s ease',
                }}
              >
                <h3 style={{ margin: 0, color: group.color, fontSize: 15, fontWeight: 900 }}>{group.name}</h3>
                <dl style={{ display: 'grid', gap: 10, margin: '14px 0 0' }}>
                  {group.emotions.map(([name, definition]) => (
                    <div key={`${group.id}-${name}`} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
                      <dt style={{ color: '#fff', fontSize: 13.5, fontWeight: 900 }}>{name}</dt>
                      <dd style={{ color: 'rgba(255,255,255,0.58)', fontSize: 12.5, lineHeight: 1.55, margin: '4px 0 0' }}>{definition}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
