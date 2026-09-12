// The refreshing affirmations, and the rules for moving between them.
//
// This used to live inside HomePage.jsx, which was the only place that showed
// them. Main Hub's Daily Dashboard shows them too now, and a second copy of
// sixty lines in a second repository would have drifted from this one the first
// time a line was edited — the same reason the daily prayer and reading rotation
// is shared rather than duplicated. So the list lives here, the home screen and
// the API both read it, and there is one copy to edit.

export const REFRESHING_AFFIRMATIONS = [
  { title: 'Alignment', lines: ['I am aligned with who I truly am.', 'I live in harmony with my values.', 'I naturally make choices that feel right for me.'] },
  { title: 'Stability', lines: ['I am steady and grounded.', 'I create stability wherever I go.', 'I trust myself to remain centered.'] },
  { title: 'Depth', lines: ['I embrace depth in myself and in life.', 'I connect with people in meaningful ways.', 'I value what is real, authentic, and profound.'] },
  { title: 'Honesty', lines: ['I am honest with myself and others.', 'I speak my truth with confidence and kindness.', 'I live transparently and authentically.'] },
  { title: 'Peace', lines: ['I am at peace with myself.', 'I carry calmness within me.', 'I choose peace over unnecessary conflict.'] },
  { title: 'Devotion', lines: ['I am devoted to what matters most.', 'I give my heart fully and sincerely.', 'I honor my commitments with love and consistency.'] },
  { title: 'Freedom', lines: ['I am free to be myself.', 'I live life on my own terms.', 'I trust my ability to choose my path.'] },
  { title: 'Purpose', lines: ['I am guided by purpose.', 'I know my life has meaning.', 'I move forward with intention and direction.'] },
  { title: 'Clarity', lines: ['I see clearly and think clearly.', 'I trust my understanding.', 'I make decisions with confidence and wisdom.'] },
  { title: 'Balance', lines: ['I live in balance and harmony.', 'I honor both work and rest.', 'I maintain healthy priorities.'] },
  { title: 'Growth', lines: ['I am always growing into my highest self.', 'I welcome growth and transformation.', 'I become stronger and wiser every day.'] },
  { title: 'Loyalty', lines: ['I am loyal to myself and those I love.', 'I build relationships based on trust and commitment.', 'I value faithfulness and consistency.'] },
  { title: 'Security', lines: ['I am secure in who I am.', 'I trust life to support me.', 'I feel safe, grounded, and protected.'] },
  { title: 'Connection', lines: ['I am deeply connected to myself and others.', 'I build meaningful and fulfilling relationships.', 'I welcome love, understanding, and closeness.'] },
  { title: 'Integrity', lines: ['I live with integrity in all that I do.', 'I honor my values through my actions.', 'I am trustworthy, authentic, and true to myself.'] },
  {
    title: 'Condensed Identity Version',
    lines: [
      'I am aligned.',
      'I am stable.',
      'I am deep.',
      'I am honest.',
      'I am peaceful.',
      'I am devoted.',
      'I am free.',
      'I am purposeful.',
      'I am clear.',
      'I am balanced.',
      'I am growing.',
      'I am loyal.',
      'I am secure.',
      'I am connected.',
      'I am a man of integrity.',
    ],
  },
].flatMap((group) => group.lines.map((line) => ({ title: group.title, line })));

export function getRefreshingAffirmation() {
  return REFRESHING_AFFIRMATIONS[Math.floor(Math.random() * REFRESHING_AFFIRMATIONS.length)];
}

// Pick a different affirmation than the one currently shown, for auto-rotation
// and the manual shuffle button — same "don't repeat what's already on screen"
// rule the Daily Reading shuffle uses.
export function getNextAffirmation(excludeLine) {
  if (REFRESHING_AFFIRMATIONS.length <= 1) return REFRESHING_AFFIRMATIONS[0];
  let pick;
  do {
    pick = getRefreshingAffirmation();
  } while (pick.line === excludeLine);
  return pick;
}
