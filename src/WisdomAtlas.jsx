import { useState, useMemo } from 'react';
import './WisdomAtlas.css';

// Wisdom Atlas — a reflective library of spiritual teachers and inner-work
// traditions. Each teacher is offered in three layers: a compact card with
// the essence, an expandable panel with key ideas and practice, and a full
// modal with the complete wisdom profile.
// (CSS class names keep the historical `fa-` prefix; they are internal.)

const teachers = [
  {
    id: 'neville',
    name: 'Neville Goddard',
    era: '1905–1972',
    tradition: 'New Thought',
    category: 'Imagination & Inner State',
    lineage: 'Law of Assumption',
    color: 'rgba(124,92,255,.22)',
    essence: 'Imagination creates reality.',
    core: 'Imagination is the only creative power. Whatever you assume to be true — and feel as real — hardens into fact. Consciousness is the one reality, and "I AM" is the name of the creative self within.',
    keyIdeas: ['Living in the end', 'Feeling is the secret', 'Revision', 'SATS (State Akin to Sleep)', 'Everyone is you pushed out'],
    practice: 'Assume the feeling of the wish fulfilled, then enter SATS (a drowsy state akin to sleep) and live a short scene from the end as though it were already so.',
    bestFor: 'Anyone ready to take radical responsibility for their inner state and live from the end rather than chasing the outer world.',
    misunderstanding: 'It is not positive thinking or wishful daydreaming — it is the disciplined assumption of an inner state, held without outer proof.',
    complements: 'Abdullah, Joseph Murphy, Florence Scovel Shinn',
    relatedTeachers: ['abdullah', 'murphy', 'shinn'],
    trap: 'Anxiously checking the outer world for proof — which silently affirms the wish is still missing. Persistence in the assumption, not monitoring, is the work.',
    prompt: 'If your desire were already fulfilled, how would you feel right now? Can you give yourself that feeling tonight, before anything outside has changed?',
    books: ['The Power of Awareness', 'Feeling Is the Secret', 'Awakened Imagination', 'The Law and the Promise'],
  },
  {
    id: 'abdullah',
    name: 'Abdullah',
    era: 'Early 20th c.',
    tradition: "Neville Goddard's teacher",
    category: 'Imagination & Inner State',
    lineage: 'Assume It Is Done',
    color: 'rgba(255,209,102,.20)',
    essence: 'It is already done.',
    core: 'Scripture is psychological and symbolic, not merely historical — every figure is a state of consciousness within you. What you desire is already yours the moment you dare to assume it; there is nothing to wait for.',
    keyIdeas: ['The wish is already granted', 'Scripture as psychology', 'Dare to assume', 'No bargaining, no waiting', 'Certainty as the posture'],
    practice: 'Take the wish as already accomplished and refuse every thought that argues otherwise. Walk, speak, and rest as the person who already has it — and stay there.',
    bestFor: 'Those who keep hoping and trying, and need the firmness of "it is already done — now live from that."',
    misunderstanding: 'Abdullah is known almost entirely through Neville\'s own accounts. He represents a teaching posture — absolute certainty — more than a documented historical figure.',
    complements: 'Neville Goddard, Florence Scovel Shinn',
    relatedTeachers: ['neville', 'shinn'],
    trap: 'Waiting for outer confirmation before fully assuming the wish. Abdullah\'s whole stance was to grant it now and never beg for it again.',
    prompt: 'What would you stop asking for if you truly believed it was already yours? Can you live today from that quiet certainty?',
    books: [],
    note: 'Abdullah is known almost entirely through Neville Goddard\'s own accounts of his teacher; little independent historical record survives. Treat the details as Neville reported them rather than as documented biography.',
  },
  {
    id: 'dispenza',
    name: 'Joe Dispenza',
    era: 'Contemporary',
    tradition: 'Mind–body science',
    category: 'Imagination & Inner State',
    lineage: 'Mind & Neuroscience',
    color: 'rgba(0,214,255,.18)',
    essence: 'Rehearse the future until the body believes it.',
    core: 'Your personality creates your personal reality. By rehearsing a new future in mind and feeling its elevated emotion now, you rewire the brain and condition the body to a new state before the outer change arrives.',
    keyIdeas: ['Personality creates personal reality', 'Elevated emotion as signal', 'Mental rehearsal', 'Rewiring neural circuits', 'Breaking the habit of being yourself'],
    practice: 'Daily meditation that combines mental rehearsal of the future with elevated emotions — gratitude, wholeness, awe — held until the body feels the future has already happened.',
    bestFor: 'People who want a structured, embodied practice that bridges inner-work and the language of neuroscience.',
    misunderstanding: 'The meditations are not just relaxation. The goal is a measurable physiological shift — the body living in the future before the outer world confirms it.',
    complements: 'Neville Goddard, Joseph Murphy, Michael Singer',
    relatedTeachers: ['neville', 'murphy', 'singer'],
    trap: 'Chasing peak experiences and big results, then "waiting" for them — which quietly reinforces lack. The shift is meant to become an ordinary, repeated state.',
    prompt: 'Can you generate the feeling of your future self this morning — not as a reward for change, but as the cause of it?',
    books: ['Breaking the Habit of Being Yourself', 'You Are the Placebo', 'Becoming Supernatural'],
  },
  {
    id: 'murphy',
    name: 'Joseph Murphy',
    era: '1898–1981',
    tradition: 'New Thought / Divine Science',
    category: 'New Thought & Spiritual Law',
    lineage: 'Subconscious Mind',
    color: 'rgba(56,242,155,.18)',
    essence: 'The subconscious is your servant — feed it well.',
    core: 'Whatever you impress upon the subconscious mind is expressed as condition, experience, and event. The subconscious accepts what the conscious mind feels to be true and works it out faithfully, for good or ill.',
    keyIdeas: ['Subconscious accepts what you feel is true', 'Sleep as planting time', 'Autosuggestion', 'Law of belief', 'Affirmative prayer'],
    practice: 'In the relaxed, drowsy state before sleep, quietly affirm and feel the wish as already real, letting the subconscious receive it without the interference of effort or doubt.',
    bestFor: 'Anyone who wants a gentle, prayerful approach to reprogramming inner beliefs and self-talk.',
    misunderstanding: 'Words alone do nothing. The subconscious responds to felt conviction — to the emotion behind the statement, not its syllables.',
    complements: 'Neville Goddard, Emmet Fox, Florence Scovel Shinn',
    relatedTeachers: ['neville', 'shinn', 'fox'],
    trap: 'Affirming on the surface while the deeper mind still holds the opposite belief. The subconscious answers your felt conviction, not your words alone.',
    prompt: 'What have you been quietly impressing on your subconscious — through worry or repetition — without realizing you were planting it?',
    books: ['The Power of Your Subconscious Mind'],
  },
  {
    id: 'shinn',
    name: 'Florence Scovel Shinn',
    era: '1871–1940',
    tradition: 'New Thought',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Spoken Word',
    color: 'rgba(255,79,216,.16)',
    essence: 'Your word is your wand.',
    core: 'Life is a game played by spiritual law, and your word is your wand. What you speak and affirm goes out to shape your affairs; forgiveness and nonresistance clear the channel so the divine design can appear.',
    keyIdeas: ['The spoken word creates', 'Nonresistance', 'Casting the burden', 'Divine right order', 'Forgiveness clears the channel'],
    practice: 'Use a short, clear affirmation (the "spoken word") for the situation, practice nonresistance, and "cast the burden" — handing the worry over so you can act from peace.',
    bestFor: 'Those who notice the power of their own speech and want a warm, practical, faith-filled approach to daily problems.',
    misunderstanding: 'Her affirmations are not magic spells. They work through inner alignment — resentment or unforgiveness silently cancels the word you speak.',
    complements: 'Emmet Fox, Joseph Murphy, Neville Goddard',
    relatedTeachers: ['fox', 'murphy', 'neville'],
    trap: 'Speaking affirmations while harboring resentment or unforgiveness. She taught that holding a grievance blocks the very good you are affirming.',
    prompt: 'What words have you been speaking about your life and yourself? Are they the words you would want to see made manifest?',
    books: ['The Game of Life and How to Play It', 'Your Word Is Your Wand', 'The Power of the Spoken Word'],
  },
  {
    id: 'fox',
    name: 'Emmet Fox',
    era: '1886–1951',
    tradition: 'Divine Science',
    category: 'New Thought & Spiritual Law',
    lineage: 'Mental Equivalent',
    color: 'rgba(255,209,102,.18)',
    essence: 'Turn your attention from the problem to God.',
    core: 'You experience in life the physical equivalent of the thoughts you habitually hold — your "mental equivalent." To change a condition, build a new mental equivalent and turn your attention from the problem toward the spiritual idea.',
    keyIdeas: ['Mental equivalent', 'The Golden Key', 'Where attention goes, power flows', 'Scientific prayer', 'The Seven-Day Mental Diet'],
    practice: 'The Golden Key: whenever a problem grips you, deliberately turn your thought away from it and dwell on the divine instead, repeatedly, until the inner state settles.',
    bestFor: 'Anyone caught in worry loops who needs a clear instruction for where to put attention.',
    misunderstanding: 'The Golden Key requires actually moving attention away — not just saying you have. Half-hearted redirection leaves the problem fully in charge.',
    complements: 'Florence Scovel Shinn, Joseph Murphy, Ernest Holmes',
    relatedTeachers: ['shinn', 'murphy', 'holmes'],
    trap: 'Dwelling on the problem "to understand it" rather than fully turning toward the spiritual idea. The method only works when attention actually moves.',
    prompt: 'What is the mental equivalent you are quietly holding for the thing you want — and what new image would you have to build to match it?',
    books: ['The Sermon on the Mount', 'Power Through Constructive Thinking', 'The Mental Equivalent'],
  },
  {
    id: 'troward',
    name: 'Thomas Troward',
    era: '1847–1916',
    tradition: 'Mental Science',
    category: 'New Thought & Spiritual Law',
    lineage: 'Mental Science',
    color: 'rgba(124,92,255,.20)',
    essence: 'Law follows mind; mind follows intention.',
    core: 'The conscious (objective) mind originates thought; the subconscious (subjective) mind is impersonal creative power that receives it and brings it into form. Spirit is the originating cause, and orderly thought sets it in motion.',
    keyIdeas: ['Objective vs subjective mind', 'Spirit as originating cause', 'Law is impersonal — it obeys', 'Orderly thought sets creation in motion', 'The creative process in the individual'],
    practice: 'Reason your way into a calm, affirmative conviction, then deliberately impress that conviction on the subjective mind — trusting law rather than forcing outcomes.',
    bestFor: 'Reflective minds who want the philosophical foundation beneath modern manifestation teaching.',
    misunderstanding: 'Troward is philosophical — but the philosophy is meant to produce a calm, convinced inner state, not just intellectual framework. He must be applied.',
    complements: 'Ernest Holmes, Joseph Murphy, Neville Goddard',
    relatedTeachers: ['holmes', 'murphy', 'neville'],
    trap: 'Treating the lectures as intellectual philosophy to admire rather than a practice to apply. Understanding without use leaves the creative law untouched.',
    prompt: 'If thought truly initiates a creative process, what general tendency are your habitual thoughts quietly setting in motion?',
    books: ['The Edinburgh Lectures on Mental Science', 'The Doré Lectures on Mental Science', 'The Creative Process in the Individual'],
  },
  {
    id: 'holmes',
    name: 'Ernest Holmes',
    era: '1887–1960',
    tradition: 'Religious Science',
    category: 'New Thought & Spiritual Law',
    lineage: 'Science of Mind',
    color: 'rgba(0,214,255,.18)',
    essence: 'There is one Mind — and you use it.',
    core: 'There is one Universal Mind, an Infinite Intelligence, that each of us uses. Thought is creative, and "the Law of Mind in action" responds to our directed, believing word with mathematical precision.',
    keyIdeas: ['Universal Mind', 'Spiritual Mind Treatment', 'Recognition · unification · realization · release', 'Affirmative prayer', 'Law responds to conviction, not petition'],
    practice: 'Spiritual Mind Treatment — affirmative prayer through recognition, unification, realization, thanksgiving, and release — declaring the good as already true, then letting it go.',
    bestFor: 'Those who want a clear, structured method of affirmative prayer grounded in a unifying philosophy.',
    misunderstanding: 'Religious Science is not a religion — it is a method of prayer. The "treatment" is a declaration of what is already spiritually true, not a request to a distant deity.',
    complements: 'Thomas Troward, Emmet Fox, Joseph Murphy',
    relatedTeachers: ['troward', 'fox', 'murphy'],
    trap: 'Reciting the steps of treatment as a formula without real felt conviction. The Law responds to embodied belief, not mechanical repetition.',
    prompt: 'Can you declare your situation as already whole in Mind — and then truly release it, instead of anxiously watching for results?',
    books: ['The Science of Mind', 'Creative Mind and Success'],
  },
  {
    id: 'quimby',
    name: 'Phineas Quimby',
    era: '1802-1866',
    tradition: 'New Thought precursor',
    category: 'New Thought & Spiritual Law',
    lineage: 'Mind Cure',
    color: 'rgba(56,242,155,.18)',
    core: 'Many forms of suffering are intensified by false belief, fear, and mistaken mental pictures. Healing begins when the mind is led out of error and into a truer understanding of health, God, and self.',
    practice: 'Notice the belief beneath the symptom or fear, question whether it is true, then replace it with a calmer conviction rooted in health and wholeness.',
    bestFor: 'Anyone studying the roots of New Thought, mental healing, and the mind-cure movement behind later affirmation and subconscious teachings.',
    complements: 'Joseph Murphy, Thomas Troward, Ernest Holmes',
    trap: 'Reducing all illness or hardship to bad thinking. His work is historically important, but modern readers should hold health claims carefully and keep practical care in view.',
    prompt: 'What fear-based explanation have you accepted as fact, and what more healing interpretation could you practice instead?',
    books: ['The Quimby Manuscripts'],
  },
  {
    id: 'goldsmith',
    name: 'Joel S. Goldsmith',
    era: '1892-1964',
    tradition: 'Mystical Christianity / New Thought',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Infinite Way',
    color: 'rgba(255,209,102,.18)',
    core: 'True supply, healing, and peace arise from conscious union with the Infinite rather than from forcing outcomes. The central movement is from problem-consciousness into God-consciousness.',
    practice: 'Practice contemplative silence: pause, become inwardly still, release the demand for a result, and listen for the felt presence of Spirit.',
    bestFor: 'Those who want a quieter mystical version of New Thought centered on inner stillness, prayer, and spiritual realization.',
    complements: 'Emmet Fox, Joseph Murphy, Neville Goddard',
    trap: 'Using spiritual language to avoid ordinary responsibility. Stillness is meant to clarify action, not replace discernment.',
    prompt: 'Can you stop trying to mentally fix the problem for a moment and rest in the awareness that something deeper is already whole?',
    books: ['The Infinite Way', 'Practicing the Presence', 'The Art of Meditation'],
  },
  {
    id: 'hall',
    name: 'Manly P. Hall',
    era: '1901-1990',
    tradition: 'Esoteric philosophy',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Ancient Wisdom',
    color: 'rgba(124,92,255,.20)',
    core: 'Myths, symbols, mystery schools, and sacred art preserve maps of human transformation. Ancient wisdom is less about collecting secrets than learning to read the symbolic language of the soul.',
    practice: 'Study a symbol slowly, trace its historical meanings, then ask what inner faculty, virtue, or transformation it is pointing toward in your own life.',
    bestFor: 'Symbolic thinkers who want a broad doorway into hermetic, mythic, Masonic, alchemical, and esoteric traditions.',
    complements: 'Franz Bardon, Carl Jung, Baruch Spinoza',
    trap: 'Getting lost in correspondences and hidden systems without becoming wiser, kinder, or more disciplined.',
    prompt: 'What symbol keeps appearing in your life, and what quality might it be asking you to develop?',
    books: ['The Secret Teachings of All Ages', 'The Lost Keys of Freemasonry'],
  },
  {
    id: 'emerson',
    name: 'Ralph Waldo Emerson',
    era: '1803-1882',
    tradition: 'Transcendentalism',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Self-Reliance',
    color: 'rgba(0,214,255,.16)',
    core: 'The divine is not only distant or institutional; it speaks through nature, intuition, conscience, and the individual soul. Self-reliance means trusting that inner authority without becoming isolated or arrogant.',
    practice: 'Take one honest perception seriously today. Write it plainly, act from it modestly, and notice where conformity tries to drown it out.',
    bestFor: 'People who need courage to trust their own perception, conscience, creativity, and spiritual individuality.',
    complements: 'Jiddu Krishnamurti, Søren Kierkegaard, Baruch Spinoza',
    trap: 'Confusing self-reliance with egoic stubbornness. The point is fidelity to truth, not refusal to learn.',
    prompt: 'Where are you asking permission to know what you already know?',
    books: ['Self-Reliance', 'Nature', 'The Conduct of Life'],
  },
  {
    id: 'bardon',
    name: 'Franz Bardon',
    era: '1909-1958',
    tradition: 'Hermetics',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Hermetic Training',
    color: 'rgba(255,79,216,.16)',
    core: 'Spiritual development requires balanced training of body, soul, and spirit. Magical power without ethical maturity and elemental equilibrium becomes imbalance rather than mastery.',
    practice: 'Begin with disciplined self-observation: track thoughts, habits, virtues, and weaknesses before attempting advanced inner exercises.',
    bestFor: 'Students drawn to Hermetic practice who want a structured, demanding path rather than vague inspiration.',
    complements: 'Manly P. Hall, Carl Jung, Thomas Troward',
    trap: 'Chasing powers, phenomena, or occult identity before building character, balance, and daily discipline.',
    prompt: 'Which inner element feels overdeveloped or neglected in you: fire, air, water, or earth?',
    books: ['Initiation Into Hermetics', 'The Practice of Magical Evocation'],
  },
  {
    id: 'krishnamurti',
    name: 'Jiddu Krishnamurti',
    era: '1895-1986',
    tradition: 'Spiritual inquiry',
    category: 'Presence & Surrender',
    lineage: 'Choiceless Awareness',
    color: 'rgba(165,180,252,.18)',
    core: 'Truth is not reached through authority, ideology, method, or guru-dependence. Freedom begins in direct observation of thought, fear, conditioning, and desire as they move in the present moment.',
    practice: 'Watch thought without choosing, condemning, or improving it. Let attention see the whole movement of reaction as it happens.',
    bestFor: 'Seekers who are ready to question systems, teachers, beliefs, and the subtle dependence on spiritual authority.',
    complements: 'Alan Watts, Ralph Waldo Emerson, Michael Singer',
    trap: 'Turning anti-method into another rigid method, or using skepticism to avoid sincere practice.',
    prompt: 'Can you observe a thought today without immediately becoming its defender, enemy, or judge?',
    books: ['Freedom from the Known', 'The First and Last Freedom', 'Think on These Things'],
  },
  {
    id: 'jung',
    name: 'Carl Jung',
    era: '1875–1961',
    tradition: 'Analytical Psychology',
    category: 'Depth & Shadow',
    lineage: 'Depth Psychology',
    color: 'rgba(255,107,107,.16)',
    essence: 'What you refuse to see in yourself, you meet as fate.',
    core: 'Wholeness comes through individuation — making the unconscious conscious. What we refuse to face within ourselves (the shadow) we meet as fate outside, projected onto others, until we own and integrate it.',
    keyIdeas: ['Shadow integration', 'Individuation', 'Archetypes of the collective unconscious', 'Active imagination', 'Projection: the outer mirrors the inner'],
    practice: 'Shadow work, dream attention, and active imagination — dialoguing honestly with the images and feelings that arise, rather than analyzing them from a safe distance.',
    bestFor: 'Those drawn to depth, symbol, and dreams who want to become whole rather than merely positive.',
    misunderstanding: 'Shadow work is not wallowing in darkness — it is owning what you have disowned so it no longer operates blindly. The goal is integration, not indulgence.',
    complements: 'Alan Watts, Michael Singer',
    relatedTeachers: ['watts', 'singer'],
    trap: 'Endless analysis without integration, or inflation — identifying with an archetype instead of relating to it. Insight that never enters life changes nothing.',
    prompt: 'What part of yourself have you disowned — and where does it keep showing up, projected onto the people who irritate you most?',
    books: ['Memories, Dreams, Reflections', 'Man and His Symbols', 'Modern Man in Search of a Soul'],
  },
  {
    id: 'watts',
    name: 'Alan Watts',
    era: '1915–1973',
    tradition: 'Zen / Taoist philosophy',
    category: 'Presence & Surrender',
    lineage: 'Zen & Tao',
    color: 'rgba(56,242,155,.16)',
    essence: 'You are not a problem to be solved — you are the universe happening.',
    core: 'You are not a separate ego dropped into the world but an expression of the whole universe — "you are it." Suffering grows from grasping for security; freedom is found in releasing the need to control and trusting the flow.',
    keyIdeas: ['Non-duality', '"You are it"', 'The game of black and white', 'Relaxing the separate self', 'Life as play, not problem'],
    practice: 'Present-moment awareness and letting go — relaxing the grip of the controlling self, watching experience as it is, and meeting life as play rather than a problem to solve.',
    bestFor: 'Over-thinkers and seekers who need permission to stop grasping and rest in the present.',
    misunderstanding: 'Watts is often consumed as intellectual entertainment. The insight he points at must be felt, not merely understood — he himself warned against treating philosophy as spectator sport.',
    complements: 'Carl Jung, Michael Singer, Joe Dispenza',
    relatedTeachers: ['jung', 'singer'],
    trap: 'Turning his ideas into clever intellectual entertainment without ever practicing — mistaking the menu for the meal, which he warned against himself.',
    prompt: 'What would it feel like, just for this breath, to stop bracing against the moment and trust where life is already carrying you?',
    books: ['The Wisdom of Insecurity', 'The Way of Zen', 'The Book: On the Taboo Against Knowing Who You Are'],
  },
  {
    id: 'singer',
    name: 'Michael Singer',
    era: 'Contemporary',
    tradition: 'Yogic / Nondual',
    category: 'Presence & Surrender',
    lineage: 'Surrender & Witness',
    color: 'rgba(165,180,252,.18)',
    essence: 'You are the witness, not the voice.',
    core: 'You are not the anxious voice in your head — you are the awareness that notices it. Freedom comes from relaxing and releasing the stored energy and resistance you carry, and surrendering to the flow of life.',
    keyIdeas: ['The inner roommate', 'Unconditional happiness as a decision', 'Surrender to the flow', 'Releasing vs suppressing', 'Seat of consciousness'],
    practice: 'Notice the inner voice and the energy it stirs, then relax and release rather than acting it out — and consciously let go of resistance to whatever life brings.',
    bestFor: 'Anyone exhausted by the inner commentary who wants to step behind it and simply let go.',
    misunderstanding: 'Letting go does not mean not feeling. Singer\'s method faces the energy that arises and allows it to pass — it is not suppression dressed in spiritual language.',
    complements: 'Alan Watts, Joe Dispenza, Carl Jung',
    relatedTeachers: ['watts', 'dispenza', 'jung'],
    trap: 'Using "letting go" to suppress or bypass real feeling. True release faces the energy and lets it pass through — it does not push it back down.',
    prompt: 'Can you notice, right now, the one who is aware of your thoughts — rather than being lost inside them?',
    books: ['The Untethered Soul', 'The Surrender Experiment', 'Living Untethered'],
  },
  {
    id: 'russell',
    name: 'Bertrand Russell',
    era: '1872-1970',
    tradition: 'Analytic philosophy',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'Logic & Clarity',
    color: 'rgba(0,214,255,.14)',
    core: 'Clear thinking matters. Beliefs should be examined for evidence, coherence, and hidden assumptions, especially when they are comforting, inherited, or socially rewarded.',
    practice: 'Take one strong belief and write the best argument for it, the best argument against it, and what evidence would actually change your mind.',
    bestFor: 'Anyone who wants spiritual or philosophical study balanced by precision, skepticism, and intellectual honesty.',
    complements: 'Baruch Spinoza, Simone Weil, Jiddu Krishnamurti',
    trap: 'Letting critique become cynicism. Clarity should refine wonder, not flatten it.',
    prompt: 'Which belief do you defend most quickly, and what would it look like to examine it without fear?',
    books: ['The Problems of Philosophy', 'A History of Western Philosophy', 'Why I Am Not a Christian'],
  },
  {
    id: 'spinoza',
    name: 'Baruch Spinoza',
    era: '1632-1677',
    tradition: 'Rational metaphysics',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'Pantheism',
    color: 'rgba(56,242,155,.15)',
    core: 'God, nature, and reality are not separate compartments. Freedom grows as we understand causes, passions, and necessity, moving from reactive emotion toward adequate ideas and clear joy.',
    practice: 'When a passion takes hold, trace its causes. Ask what you understand, what you are imagining, and how clearer knowledge could loosen the reaction.',
    bestFor: 'Reflective minds drawn to a rational, non-dual metaphysics where ethics, nature, and spiritual awe meet.',
    complements: 'Ralph Waldo Emerson, Bertrand Russell, Simone Weil',
    trap: 'Reading him as cold abstraction. His system points toward liberation from bondage to confused passion.',
    prompt: 'What emotion would soften if you understood its causes more clearly?',
    books: ['Ethics', 'Treatise on the Emendation of the Intellect'],
  },
  {
    id: 'kierkegaard',
    name: 'Søren Kierkegaard',
    era: '1813-1855',
    tradition: 'Existential Christianity',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'Faith & Individuality',
    color: 'rgba(255,209,102,.15)',
    core: 'Truth is not only an idea to admire; it is a way of existing. Faith, anxiety, choice, and inwardness ask the individual to become responsible before God and before the self.',
    practice: 'Name the choice you are avoiding. Ask what fear, social performance, or despair keeps you from living it honestly.',
    bestFor: 'Anyone wrestling with faith, individuality, anxiety, and the demand to live rather than merely think.',
    complements: 'Ralph Waldo Emerson, Viktor Frankl, Simone Weil',
    trap: 'Romanticizing angst instead of making the concrete choice that inward honesty requires.',
    prompt: 'What truth do you discuss beautifully but avoid living plainly?',
    books: ['Fear and Trembling', 'The Sickness Unto Death', 'Either/Or'],
  },
  {
    id: 'weil',
    name: 'Simone Weil',
    era: '1909-1943',
    tradition: 'Mystical ethics',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'Attention & Affliction',
    color: 'rgba(255,255,255,.14)',
    core: 'Attention is a moral and spiritual act. To truly attend to another person, to suffering, or to truth is to suspend egoic grasping and make room for grace.',
    practice: 'Give one person or problem your full attention without rushing to solve, perform, advise, or center yourself.',
    bestFor: 'Those drawn to the meeting point of spirituality, ethics, compassion, suffering, and disciplined attention.',
    complements: 'Viktor Frankl, Søren Kierkegaard, Baruch Spinoza',
    trap: 'Mistaking severity for holiness. Her work is luminous but intense; keep compassion toward yourself in the practice.',
    prompt: 'Where could your attention become an act of love rather than control?',
    books: ['Gravity and Grace', 'Waiting for God', 'The Need for Roots'],
  },
  {
    id: 'maslow',
    name: 'Abraham Maslow',
    era: '1908-1970',
    tradition: 'Humanistic psychology',
    category: 'Psychology & Self-Development',
    lineage: 'Self-Actualization',
    color: 'rgba(56,242,155,.16)',
    core: 'Human beings are motivated not only by deficiency and survival needs but by growth, meaning, creativity, love, and self-actualization. A healthy life makes room for becoming.',
    practice: 'Check which need is most honestly under-supported right now: safety, belonging, esteem, purpose, creativity, or transcendence. Strengthen that layer without shame.',
    bestFor: 'People mapping personal growth through needs, motivation, peak experiences, and the movement toward fuller potential.',
    complements: 'Viktor Frankl, Carol Dweck, Carl Jung',
    trap: 'Treating the hierarchy as a rigid ladder. Real lives are layered, fluid, and culturally shaped.',
    prompt: 'Which basic need are you trying to spiritually bypass instead of care for directly?',
    books: ['Motivation and Personality', 'Toward a Psychology of Being'],
  },
  {
    id: 'peterson',
    name: 'Jordan Peterson',
    era: 'Contemporary',
    tradition: 'Psychology / Meaning',
    category: 'Psychology & Self-Development',
    lineage: 'Responsibility & Meaning',
    color: 'rgba(255,107,107,.14)',
    core: 'Meaning is found through responsibility, truthful speech, disciplined attention, and the symbolic patterns that organize human life. Order and chaos both have to be faced consciously.',
    practice: 'Choose one neglected responsibility and make it smaller, concrete, and immediate. Put one piece of order back into your day.',
    bestFor: 'People drawn to archetypes, meaning, discipline, responsibility, and the psychological reading of myth.',
    complements: 'Carl Jung, Viktor Frankl, Abraham Maslow',
    trap: 'Turning responsibility into harsh self-judgment, or treating symbolic maps as permission for rigid ideology.',
    prompt: 'What small responsibility would make your life noticeably less chaotic if you faced it today?',
    books: ['Maps of Meaning', '12 Rules for Life', 'Beyond Order'],
  },
  {
    id: 'dweck',
    name: 'Carol Dweck',
    era: 'Contemporary',
    tradition: 'Motivation psychology',
    category: 'Psychology & Self-Development',
    lineage: 'Growth Mindset',
    color: 'rgba(0,214,255,.14)',
    core: 'Believing abilities can develop changes how people meet effort, feedback, failure, and learning. A growth mindset turns difficulty into information rather than proof of fixed limitation.',
    practice: 'When you catch "I am bad at this," rewrite it as a specific learning edge: "I have not learned this part yet." Then choose the next practice rep.',
    bestFor: 'Students, creators, and builders who freeze when difficulty feels like identity-level failure.',
    complements: 'Abraham Maslow, Jim Rohn, Tony Robbins',
    trap: 'Using "growth mindset" as empty positivity. The shift has to be paired with strategy, feedback, and sustained effort.',
    prompt: 'Where are you calling something identity when it is actually a learnable skill?',
    books: ['Mindset'],
  },
  {
    id: 'frankl',
    name: 'Viktor Frankl',
    era: '1905-1997',
    tradition: 'Logotherapy',
    category: 'Psychology & Self-Development',
    lineage: 'Meaning in Suffering',
    color: 'rgba(255,209,102,.16)',
    core: 'The primary human drive is not pleasure or power alone, but meaning. Even under severe limits, a person may still choose an attitude, a responsibility, or a purpose that gives life dignity.',
    practice: 'Ask what life is asking of you in this situation, rather than only asking what you want from life.',
    bestFor: 'Anyone facing suffering, uncertainty, grief, or a search for purpose that needs grounded existential strength.',
    complements: 'Søren Kierkegaard, Simone Weil, Abraham Maslow',
    trap: 'Using meaning to minimize pain. Logotherapy does not deny suffering; it asks how dignity can still be found within it.',
    prompt: 'What is one meaningful response still available to you, even if the situation is not fully in your control?',
    books: ['Man\'s Search for Meaning', 'The Doctor and the Soul'],
  },
  {
    id: 'proctor',
    name: 'Bob Proctor',
    era: '1934-2022',
    tradition: 'Personal development',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'Paradigm Shift',
    color: 'rgba(124,92,255,.18)',
    core: 'Results are shaped by paradigms: repeated subconscious patterns of belief, expectation, and behavior. To change results, you must change the inner program that feels normal.',
    practice: 'Write the result you want, identify the current paradigm that resists it, and rehearse the new self-image daily through repetition and action.',
    bestFor: 'People studying wealth consciousness, self-image, repetition, and the bridge between New Thought and modern success coaching.',
    complements: 'Napoleon Hill, Neville Goddard, Joseph Murphy',
    trap: 'Confusing repetition with transformation while daily behavior remains unchanged.',
    prompt: 'What result keeps repeating, and what hidden assumption might be making it feel normal?',
    books: ['You Were Born Rich'],
  },
  {
    id: 'rohn',
    name: 'Jim Rohn',
    era: '1930-2009',
    tradition: 'Success philosophy',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'Discipline & Habits',
    color: 'rgba(56,242,155,.14)',
    core: 'Success is built through philosophy, discipline, habits, and personal responsibility. Small daily disciplines compound; small daily neglects compound too.',
    practice: 'Choose one simple discipline that supports your future and do it today before negotiating with mood.',
    bestFor: 'Anyone who needs practical, grounded success principles without losing the inner-work frame.',
    complements: 'Carol Dweck, Tony Robbins, Napoleon Hill',
    trap: 'Turning discipline into self-punishment. His point is stewardship of life, not constant strain.',
    prompt: 'What small neglect has been compounding, and what small discipline would reverse it?',
    books: ['The Five Major Pieces to the Life Puzzle', 'The Seasons of Life'],
  },
  {
    id: 'hill',
    name: 'Napoleon Hill',
    era: '1883-1970',
    tradition: 'Success philosophy',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'Definite Chief Aim',
    color: 'rgba(255,209,102,.16)',
    core: 'Desire, definite purpose, belief, planning, persistence, and organized effort shape achievement. The mind needs a clear aim and repeated emotional commitment.',
    practice: 'Write a definite aim, why it matters, what you will give in return, and the first specific action. Read it until it becomes emotionally charged and behaviorally real.',
    bestFor: 'Students of classic success literature, goal-setting, persistence, and wealth consciousness.',
    complements: 'Bob Proctor, Jim Rohn, Neville Goddard',
    trap: 'Dreaming over the written aim without honest planning, skill-building, or ethical action.',
    prompt: 'Is your desire specific enough to organize your behavior, or vague enough to stay a fantasy?',
    books: ['Think and Grow Rich', 'The Law of Success'],
  },
  {
    id: 'robbins',
    name: 'Tony Robbins',
    era: 'Contemporary',
    tradition: 'Peak performance',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'State & Strategy',
    color: 'rgba(255,79,216,.14)',
    core: 'State, story, strategy, and standards drive performance. Change often begins by shifting physiology and focus, then installing a clearer decision and plan.',
    practice: 'Change your physical state first, name the old story, choose a stronger meaning, and take one immediate action that proves the new standard.',
    bestFor: 'People who respond to high-energy coaching, emotional state work, decision-making, and practical transformation tools.',
    complements: 'Jim Rohn, Carol Dweck, Bob Proctor',
    trap: 'Depending on intensity or event energy instead of building repeatable systems after the breakthrough.',
    prompt: 'What story are you rehearsing, and what action would make a stronger story believable today?',
    books: ['Awaken the Giant Within', 'Unlimited Power'],
  },
];

const categoryNotes = {
  'Imagination & Inner State':
    'Teachers who hold that consciousness, imagination, and the feeling you assume are what shape the life that unfolds.',
  'New Thought & Spiritual Law':
    'The mental-science lineage — that thought, belief, and the spoken word move according to a dependable spiritual law.',
  'Esoteric & Metaphysical Wisdom':
    'Symbolic, hermetic, transcendental, and ancient-wisdom approaches that read reality as layered with meaning.',
  'Presence & Surrender':
    'Paths of letting go — resting as awareness, releasing resistance, and trusting the flow of life as it is.',
  'Depth & Shadow':
    'Inner work that integrates the unconscious — meeting what we have disowned in order to become whole.',
  'Philosophy, Ethics & Logic':
    'Thinkers who sharpen truth, faith, ethics, reason, attention, and the responsibility of the individual mind.',
  'Psychology & Self-Development':
    'Modern psychological maps for meaning, motivation, mindset, identity, self-actualization, and growth.',
  'Wealth, Success & Creative Mindset':
    'Success teachers who connect self-image, discipline, purpose, state, and wealth consciousness with action.',
};

const categories = [
  'Imagination & Inner State',
  'New Thought & Spiritual Law',
  'Esoteric & Metaphysical Wisdom',
  'Presence & Surrender',
  'Depth & Shadow',
  'Philosophy, Ethics & Logic',
  'Psychology & Self-Development',
  'Wealth, Success & Creative Mindset',
];
const lineages = [...new Set(teachers.map((t) => t.lineage))].sort();

const teacherById = Object.fromEntries(teachers.map((t) => [t.id, t]));

/* ─── TeacherCard: compact + expandable inline panel ─── */
function TeacherCard({ t, onOpen }) {
  const [expanded, setExpanded] = useState(false);

  function toggle(e) {
    e.stopPropagation();
    setExpanded((v) => !v);
  }

  return (
    <article
      className={`fa-card ${expanded ? 'fa-card-open' : ''}`}
      style={{ '--cardGlow': t.color }}
    >
      {/* ── compact header (always visible) ── */}
      <div className="fa-card-header" onClick={() => onOpen(t)}>
        <div className="fa-chip-row">
          <span className="fa-chip hot">{t.category}</span>
          <span className="fa-chip gold">{t.lineage}</span>
        </div>
        <h3>{t.name}</h3>
        <div className="fa-creator">{t.era} · {t.tradition}</div>
        <p className="fa-essence">"{t.essence || t.core}"</p>
      </div>

      {/* ── expanded inline panel ── */}
      {expanded && (
        <div className="fa-expand-body">
          {t.keyIdeas && t.keyIdeas.length > 0 && (
            <div className="fa-key-ideas">
              {t.keyIdeas.map((idea) => (
                <span key={idea} className="fa-idea-pill">{idea}</span>
              ))}
            </div>
          )}
          <div className="fa-expand-row">
            <div className="fa-expand-item">
              <span className="fa-expand-label">Practice</span>
              <span>{t.practice}</span>
            </div>
          </div>
          <div className="fa-expand-row">
            <div className="fa-expand-item">
              <span className="fa-expand-label">Best for</span>
              <span>{t.bestFor}</span>
            </div>
          </div>
          {t.misunderstanding && (
            <div className="fa-expand-row">
              <div className="fa-expand-item">
                <span className="fa-expand-label">Often misunderstood as</span>
                <span className="fa-misunderstanding">{t.misunderstanding}</span>
              </div>
            </div>
          )}
          <button className="fa-full-profile-btn" onClick={() => onOpen(t)}>
            Open full wisdom profile ↗
          </button>
        </div>
      )}

      {/* ── footer actions ── */}
      <div className="fa-card-footer">
        <button className="fa-expand-btn" onClick={toggle} aria-expanded={expanded}>
          {expanded ? 'Collapse ↑' : 'Expand teaching ↓'}
        </button>
        <button className="fa-open-btn" onClick={() => onOpen(t)}>
          Full profile ↗
        </button>
      </div>
    </article>
  );
}

/* ─── TeacherProfile: the complete wisdom profile body ─── */
/* Shared by both the in-atlas modal and each teacher's dedicated page.   */
/* Every section is guarded so teachers with a lighter record still read. */
function TeacherProfile({ t, onOpenRelated }) {
  const related = (t.relatedTeachers || [])
    .map((id) => teacherById[id])
    .filter(Boolean);

  return (
    <>
      {/* essence banner */}
      {t.essence && <div className="fa-modal-essence">"{t.essence}"</div>}

      {/* key ideas */}
      {t.keyIdeas && t.keyIdeas.length > 0 && (
        <div className="fa-modal-section">
          <h4 className="fa-modal-label">Key ideas</h4>
          <div className="fa-key-ideas large">
            {t.keyIdeas.map((idea) => (
              <span key={idea} className="fa-idea-pill">{idea}</span>
            ))}
          </div>
        </div>
      )}

      {/* core grid */}
      <div className="fa-detail-grid">
        <div className="fa-detail-box full">
          <h4>Core teaching</h4>
          <p>{t.core}</p>
        </div>
        <div className="fa-detail-box">
          <h4>Main practice</h4>
          <p>{t.practice}</p>
        </div>
        <div className="fa-detail-box">
          <h4>Best for</h4>
          <p>{t.bestFor}</p>
        </div>
        {t.misunderstanding && (
          <div className="fa-detail-box">
            <h4>Often misunderstood as</h4>
            <p className="fa-misunderstanding">{t.misunderstanding}</p>
          </div>
        )}
        {t.trap && (
          <div className="fa-detail-box">
            <h4>Common trap</h4>
            <p>{t.trap}</p>
          </div>
        )}
      </div>

      {/* reflection prompt */}
      {t.prompt && (
        <div className="fa-detail-box full">
          <h4>Reflection prompt</h4>
          <div className="fa-prompt-box">{t.prompt}</div>
        </div>
      )}

      {/* related teachers */}
      {related.length > 0 && (
        <div className="fa-modal-section">
          <h4 className="fa-modal-label">Relates to</h4>
          <div className="fa-related-row">
            {related.map((r) => (
              <div
                key={r.id}
                className={`fa-related-chip ${onOpenRelated ? 'clickable' : ''}`}
                style={{ '--relGlow': r.color }}
                onClick={onOpenRelated ? () => onOpenRelated(r) : undefined}
                role={onOpenRelated ? 'button' : undefined}
                tabIndex={onOpenRelated ? 0 : undefined}
                onKeyDown={onOpenRelated ? (e) => { if (e.key === 'Enter') onOpenRelated(r); } : undefined}
              >
                <strong>{r.name}</strong>
                <span>{r.essence || r.core}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* books */}
      {t.books && t.books.length > 0 && (
        <div className="fa-detail-box full">
          <h4>Books to begin with</h4>
          <ul>{t.books.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      )}

      {t.note && (
        <div className="fa-detail-box full">
          <h4>A note on sources</h4>
          <p>{t.note}</p>
        </div>
      )}
    </>
  );
}

/* ─── TeacherPage: a teacher's own dedicated reading page ─── */
/* Reached at /wisdom?section=<id> — where "Reading for Today" jumps in. */
function TeacherPage({ t, onHome, onBackToAtlas, onOpenRelated }) {
  return (
    <div className="fa">
      {/* top bar */}
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={onBackToAtlas}>← Wisdom Atlas</button>
        <div className="fa-brand">
          <div className="fa-logo">✦</div>
          <span>Wisdom Atlas</span>
        </div>
        <button className="fa-btn fa-topbar-random" onClick={onHome}>⌂ Home</button>
      </div>

      <div className="fa-inner">
        <article className="fa-teacher-page" style={{ '--cardGlow': t.color }}>
          <header className="fa-teacher-page-head">
            <div className="fa-chip-row">
              <span className="fa-chip hot">{t.category}</span>
              <span className="fa-chip gold">{t.lineage}</span>
            </div>
            <h1 className="fa-teacher-page-title">{t.name}</h1>
            <div className="fa-modal-creator">{t.era} · {t.tradition}</div>
          </header>

          <div className="fa-modal-body">
            <TeacherProfile t={t} onOpenRelated={onOpenRelated} />
          </div>

          <button className="fa-btn" onClick={onBackToAtlas}>← Back to all teachers</button>
        </article>
      </div>
    </div>
  );
}

/* ─── WisdomAtlas: main page ─── */
export default function WisdomAtlas({ onBack, onNavigate, initialSection }) {
  const [query,          setQuery]          = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lineageFilter,  setLineageFilter]  = useState('all');
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [rotation,       setRotation]       = useState(35);

  // The open teacher follows the URL (?section=<id>) so deep links — like
  // "Reading for Today" — land straight on that teacher's page. `localId` is a
  // fallback for when no router navigation is wired in. It is reset whenever the
  // URL section changes, using the render-phase pattern (no effect needed).
  const [localId,     setLocalId]     = useState(null);
  const [seenSection, setSeenSection] = useState(initialSection);
  if (seenSection !== initialSection) {
    setSeenSection(initialSection);
    setLocalId(null);
  }

  const activeId = initialSection || localId;
  const activeTeacher = activeId ? teacherById[activeId] : null;

  // Open a teacher's own page. Push the section URL when we can so the page is
  // shareable; the local id keeps it responsive before the URL settles.
  function openTeacher(t) {
    setLocalId(t.id);
    if (onNavigate) onNavigate('wisdom', { section: t.id });
  }
  function backToAtlas() {
    setLocalId(null);
    if (onNavigate) onNavigate('wisdom');
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teachers.filter((t) => {
      const hay = [
        t.name, t.tradition, t.category, t.lineage,
        t.essence, t.core, t.practice, t.bestFor,
        t.complements, t.misunderstanding,
        ...(t.keyIdeas || []),
      ].join(' ').toLowerCase();
      return (!q || hay.includes(q))
        && (categoryFilter === 'all' || t.category === categoryFilter)
        && (lineageFilter  === 'all' || t.lineage  === lineageFilter);
    });
  }, [query, categoryFilter, lineageFilter]);

  const catTeachers = teachers.filter((t) => t.category === activeCategory);

  function reset() { setQuery(''); setCategoryFilter('all'); setLineageFilter('all'); }

  function openRandom() {
    const random = teachers[Math.floor(Math.random() * teachers.length)];
    openTeacher(random);
  }

  // A teacher is open → show their dedicated reading page.
  if (activeTeacher) {
    return (
      <TeacherPage
        t={activeTeacher}
        onHome={onBack}
        onBackToAtlas={backToAtlas}
        onOpenRelated={openTeacher}
      />
    );
  }

  return (
    <div className="fa">
      {/* top bar */}
      <div className="fa-topbar">
        <button className="fa-back-btn" onClick={onBack}>← Back</button>
        <div className="fa-brand">
          <div className="fa-logo">✦</div>
          <span>Wisdom Atlas</span>
        </div>
        <nav className="fa-nav-links">
          <a className="fa-nav-link" href="#fa-library">Teachers</a>
          <a className="fa-nav-link" href="#fa-map">Traditions</a>
          <a className="fa-nav-link" href="#fa-models">One Room</a>
          <a className="fa-nav-link" href="#fa-builder">How to Begin</a>
        </nav>
        <button className="fa-btn fa-topbar-random" onClick={openRandom}>✦ Random teacher</button>
      </div>

      <div className="fa-inner">
        {/* hero */}
        <header className="fa-hero">
          <div>
            <div className="fa-eyebrow"><span className="fa-pulse" /> Teachers · Teachings · Inner Work</div>
            <h1 className="fa-h1">
              The teachers of the <span className="fa-grad">inner life</span>,<br />gathered into one quiet library.
            </h1>
            <p className="fa-lead">
              An atlas of spiritual teachers and inner-work traditions. Each one is offered in layers — a distilled essence, key ideas to explore, a practice to live, what it is best for, where it is often misread, and a reflection prompt to carry into your day.
            </p>
            <div className="fa-hero-actions">
              <a className="fa-btn primary" href="#fa-library">Meet the teachers</a>
              <button className="fa-btn" onClick={openRandom}>✦ Read a random teacher</button>
              <a className="fa-btn" href="#fa-builder">How to work with them</a>
            </div>
            <div className="fa-stat-row">
              <div className="fa-stat"><strong>{teachers.length}</strong><span>Teachers</span></div>
              <div className="fa-stat"><strong>{categories.length}</strong><span>Traditions</span></div>
              <div className="fa-stat"><strong>{lineages.length}</strong><span>Approaches</span></div>
              <div className="fa-stat"><strong>∞</strong><span>Reflections</span></div>
            </div>
          </div>

          {/* 3D sphere */}
          <div className="fa-atlas-stage" aria-label="3D orbit of inner-work themes">
            <div className="fa-sphere">
              <div className="fa-ring r1" /><div className="fa-ring r2" />
              <div className="fa-ring r3" /><div className="fa-ring r4" />
              <div className="fa-node n1">Imagination</div>
              <div className="fa-node n2">Spiritual Law</div>
              <div className="fa-node n3">Surrender</div>
              <div className="fa-node n4">Shadow</div>
              <div className="fa-node n5">Presence</div>
              <div className="fa-core">WISDOM<br/>ATLAS</div>
            </div>
            <div className="fa-floating-note">
              Each teacher is a doorway — open the card to see key ideas, then the full profile for the complete wisdom map.
            </div>
          </div>
        </header>

        {/* library */}
        <section className="fa-section" id="fa-library">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Wisdom Library</h2>
              <p>Search by teacher, tradition, teaching, or practice. Expand any card to see key ideas and practice, or open the full wisdom profile.</p>
            </div>
          </div>

          <div className="fa-controls fa-panel">
            <div className="fa-field">
              <label>Search</label>
              <input
                className="fa-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: imagination, surrender, shadow, subconscious, assumption..."
              />
            </div>
            <div className="fa-field">
              <label>Tradition</label>
              <select className="fa-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All traditions</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>Approach</label>
              <select className="fa-select" value={lineageFilter} onChange={(e) => setLineageFilter(e.target.value)}>
                <option value="all">All approaches</option>
                {lineages.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={reset}>Reset</button>
            </div>
            <div className="fa-field">
              <label>&nbsp;</label>
              <button className="fa-btn" onClick={openRandom}>✦ Random</button>
            </div>
          </div>

          <div className="fa-grid">
            {filtered.length ? filtered.map((t) => (
              <TeacherCard key={t.id} t={t} onOpen={openTeacher} />
            )) : (
              <div className="fa-panel" style={{ gridColumn: '1/-1', padding: 28, color: 'var(--muted)' }}>
                No teachers match that. Try a broader word — like "surrender", "imagination", or "shadow".
              </div>
            )}
          </div>
        </section>

        {/* tradition pages */}
        <section className="fa-section" id="fa-map">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Traditions</h2>
              <p>The library gathers naturally into a few living lineages. Choose one to see who sits within it — and a gentle way to study it.</p>
            </div>
          </div>
          <div className="fa-map-wrap">
            <aside className="fa-category-menu fa-panel">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`fa-cat-btn ${c === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  <span>{c}</span>
                  <b>{teachers.filter((t) => t.category === c).length}</b>
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
                  <span className="fa-chip gold">{catTeachers.length} teachers</span>
                </div>
                <div className="fa-lane-items">
                  {catTeachers.map((t) => (
                    <div className="fa-pill-card" key={t.id} onClick={() => openTeacher(t)}>
                      <b>{t.name}</b>
                      <span className="fa-pill-essence">{t.essence}</span>
                      <span className="fa-pill-meta">{t.lineage} · {t.era}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fa-lane">
                <div className="fa-lane-head">
                  <div>
                    <h3>How to study a tradition</h3>
                    <p>The same quiet rhythm works for any teacher in this lineage.</p>
                  </div>
                </div>
                <div className="fa-lane-items">
                  {[
                    ['Read slowly', 'Let the core teaching land before you judge it or rush to apply it.'],
                    ['Choose one practice', 'Pick a single practice and give it a week of honest, unforced effort.'],
                    ['Watch the trap', 'Notice the way this path tends to go astray — in others, and in you.'],
                    ['Journal the prompt', 'Write from the reflection prompt without editing or impressing yourself.'],
                  ].map(([label, desc]) => (
                    <div className="fa-pill-card" key={label}>
                      <b>{label}</b>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* many doors, one room */}
        <section className="fa-section" id="fa-models">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">Many doors, one room</h2>
              <p>These teachers use different language, but they keep pointing at the same inner shift. Turn it over and notice what they share.</p>
            </div>
          </div>
          <div className="fa-model-lab">
            <div className="fa-cube-stage fa-panel">
              <div className="fa-cube" style={{ '--rot': `${rotation}deg` }}>
                <div className="fa-face front">Imagination</div>
                <div className="fa-face back">The Word</div>
                <div className="fa-face right">Spiritual<br/>Law</div>
                <div className="fa-face left">Surrender</div>
                <div className="fa-face top">Shadow</div>
                <div className="fa-face bottom">Presence</div>
              </div>
            </div>
            <div className="fa-lab-copy fa-panel">
              <h2 className="fa-h2">Different languages, one movement.</h2>
              <p>One teacher calls it assumption, another calls it prayer, another surrender, another individuation. Underneath the words, each one asks you to change the inner state first — and let the outer life follow.</p>
              <input
                className="fa-range"
                type="range"
                min="0" max="360"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
              />
              <div className="fa-mini-tools">
                {[
                  ['Imagination', 'Assume the feeling of the wish fulfilled and live from the end.'],
                  ['Surrender', 'Relax and release the grip of the inner voice; let life move through you.'],
                  ['The Word', 'Speak and think only what you would want to see made real.'],
                  ['Shadow', 'Meet what you have disowned so it no longer runs you from the dark.'],
                ].map(([title, desc]) => (
                  <div className="fa-tool-box" key={title}><b>{title}</b><span>{desc}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* how to begin */}
        <section className="fa-section" id="fa-builder">
          <div className="fa-section-head">
            <div>
              <h2 className="fa-h2">How to Work With a Teacher</h2>
              <p>These teachings are meant to be lived, not just read. Here is a gentle way to begin.</p>
            </div>
          </div>
          <div className="fa-builder fa-panel">
            {[
              ['1', 'Choose a teacher', 'Let one voice meet you where you are. You do not need all of them at once.'],
              ['2', 'Sit with the core teaching', 'Read it slowly and ask, honestly: what would change if this were true for me?'],
              ['3', 'Take up the practice', 'Give the teaching a body — one small ritual you actually do each day.'],
              ['4', 'Notice the trap, keep the prompt', 'Watch where the path goes astray, and carry the reflection question into your day.'],
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
          A reflective library, not a doctrine. These teachings are offered for contemplation and inner work — take what serves you and hold the rest lightly. Nothing here is medical, psychological, or religious advice.
        </footer>
      </div>
    </div>
  );
}
