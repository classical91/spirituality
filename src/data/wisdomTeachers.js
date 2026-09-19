// Wisdom Atlas — the teacher library, card layer.
//
// Each entry here is the compact card layer (id, name, era, tradition,
// category, lineage, color, essence, core, keyIdeas, practice, bestFor,
// misunderstanding, complements, relatedTeachers, trap, prompt, books, note).
// These drive the browsing cards, the traditions view and the comparison
// table, and are intentionally short.
//
// The dedicated-profile layer (overview, context, teachings, practiceSteps,
// example, distinctions, cautions, relatedNotes, reading, reflectionQuestions)
// lives one file per teacher in ./wisdomProfiles/, because it is 86% of this
// atlas's data and is read only on a teacher's own page at /wisdom?section=<id>.
// Keeping it out of this module is what lets the atlas load without it; see
// ./wisdomProfiles/index.js for how a profile is fetched and merged back on.
//
// So a "teacher" is a card here, and a card merged with its profile on a
// teacher page. Every helper below works on either: the profile-layer checks
// are all guarded, so passing a bare card simply skips them.
//
// Editorial standard for this file: documented biography is distinguished
// from legend and secondhand report; a teacher's metaphysical claims are
// presented as their claims ("he taught", "within this tradition") rather
// than as established fact; no direct quotations are invented; nothing here
// suggests that illness, poverty, grief or harm is caused by wrong thinking.
// Where the historical record is thin or contested, the entry says so in its
// `note` field.

export const teachers = [
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
    tradition: 'Neville Goddard\'s teacher',
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
    note: 'Abdullah is known almost entirely through Neville Goddard\'s own accounts of his teacher; little independent historical record survives. Treat the details as Neville reported them rather than as documented biography. What follows describes a teaching posture as Neville transmitted it, not a reconstructed biography.',
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
    keyIdeas: [
      'Personality creates personal reality',
      'Elevated emotion as signal',
      'Mental rehearsal',
      'Rewiring neural circuits',
      'Breaking the habit of being yourself',
    ],
    practice: 'Daily meditation that combines mental rehearsal of the future with elevated emotions — gratitude, wholeness, awe — held until the body feels the future has already happened.',
    bestFor: 'People who want a structured, embodied practice that bridges inner-work and the language of neuroscience.',
    misunderstanding: 'The meditations are not just relaxation. The goal is a measurable physiological shift — the body living in the future before the outer world confirms it.',
    complements: 'Neville Goddard, Joseph Murphy, Michael Singer',
    relatedTeachers: ['neville', 'murphy', 'singer'],
    trap: 'Chasing peak experiences and big results, then "waiting" for them — which quietly reinforces lack. The shift is meant to become an ordinary, repeated state.',
    prompt: 'Can you generate the feeling of your future self this morning — not as a reward for change, but as the cause of it?',
    books: ['Breaking the Habit of Being Yourself', 'You Are the Placebo', 'Becoming Supernatural'],
    note: 'Dispenza presents his work in the vocabulary of neuroscience, epigenetics and quantum physics. Some underlying ideas — that repeated mental rehearsal alters neural pathways, that stress physiology affects health, that expectation shapes outcomes in placebo research — are well established. Other claims made in this body of work go well beyond what the published evidence supports, and the studies conducted at his events are not equivalent to independent clinical trials. Hold the practice as practice, and treat the scientific framing as interpretation rather than settled fact.',
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
    note: 'Murphy\'s books contain many healing anecdotes reported without names, dates or medical documentation, and his model of the subconscious is a New Thought one rather than a description drawn from clinical psychology. The relaxation and self-talk practices are benign and often helpful; the healing accounts should be read as testimony within a tradition, not as evidence.',
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
    note: 'Her books are written as collections of stories from her practice as a New Thought teacher, with the people involved unnamed. They function as parables illustrating a principle rather than as verifiable case histories, and the striking results described in them are best read in that spirit.',
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
    keyIdeas: [
      'Objective vs subjective mind',
      'Spirit as originating cause',
      'Law is impersonal — it obeys',
      'Orderly thought sets creation in motion',
      'The creative process in the individual',
    ],
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
    keyIdeas: [
      'Universal Mind',
      'Spiritual Mind Treatment',
      'Recognition · unification · realization · release',
      'Affirmative prayer',
      'Law responds to conviction, not petition',
    ],
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
    essence: 'Your beliefs shape what your body and life suffer.',
    core: 'Many forms of suffering are intensified by false belief, fear, and mistaken mental pictures. Healing begins when the mind is led out of error and into a truer understanding of health, God, and self.',
    keyIdeas: [
      'Suffering deepened by false belief',
      'Mind led out of error',
      'Health as a truer understanding',
      'Fear and suggestion shape the body',
      'Wisdom over opinion',
    ],
    practice: 'Notice the belief beneath the symptom or fear, question whether it is true, then replace it with a calmer conviction rooted in health and wholeness.',
    bestFor: 'Anyone studying the roots of New Thought, mental healing, and the mind-cure movement behind later affirmation and subconscious teachings.',
    misunderstanding: 'It is not a claim that all illness is imaginary — it is the observation that fear and false belief can intensify suffering, and that clearer understanding can relieve it.',
    complements: 'Joseph Murphy, Thomas Troward, Ernest Holmes',
    relatedTeachers: ['murphy', 'troward', 'holmes'],
    trap: 'Reducing all illness or hardship to bad thinking. His work is historically important, but modern readers should hold health claims carefully and keep practical care in view.',
    prompt: 'What fear-based explanation have you accepted as fact, and what more healing interpretation could you practice instead?',
    books: ['The Quimby Manuscripts'],
    note: 'Quimby published nothing in his lifetime. What survives is a body of unpublished papers, edited and released decades after his death, whose arrangement and wording have been disputed — particularly in the long controversy over his influence on Mary Baker Eddy. His nineteenth-century healing accounts are anecdotal and were recorded without any medical documentation; they belong to the history of ideas, not to clinical evidence.',
  },
  {
    id: 'goldsmith',
    name: 'Joel S. Goldsmith',
    era: '1892-1964',
    tradition: 'Mystical Christianity / New Thought',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Infinite Way',
    color: 'rgba(255,209,102,.18)',
    essence: 'Be still, and let the Presence do the work.',
    core: 'True supply, healing, and peace arise from conscious union with the Infinite rather than from forcing outcomes. The central movement is from problem-consciousness into God-consciousness.',
    keyIdeas: [
      'Conscious union with the Infinite',
      'Problem-consciousness to God-consciousness',
      'Contemplative silence',
      'Supply as spiritual, not material',
      'Practicing the Presence',
    ],
    practice: 'Practice contemplative silence: pause, become inwardly still, release the demand for a result, and listen for the felt presence of Spirit.',
    bestFor: 'Those who want a quieter mystical version of New Thought centered on inner stillness, prayer, and spiritual realization.',
    misunderstanding: 'The silence is not passive escape — it is an active turning to Spirit meant to clarify life and action, not avoid them.',
    complements: 'Emmet Fox, Joseph Murphy, Neville Goddard',
    relatedTeachers: ['fox', 'murphy', 'neville'],
    trap: 'Using spiritual language to avoid ordinary responsibility. Stillness is meant to clarify action, not replace discernment.',
    prompt: 'Can you stop trying to mentally fix the problem for a moment and rest in the awareness that something deeper is already whole?',
    books: ['The Infinite Way', 'Practicing the Presence', 'The Art of Meditation'],
    note: 'Goldsmith worked as a spiritual healer and taught that healing follows realisation rather than treatment. Accounts of healings in this literature are personal testimony without medical documentation. His own emphasis on not seeking results should not be extended into declining medical care.',
  },
  {
    id: 'dyer',
    name: 'Wayne Dyer',
    era: '1940–2015',
    tradition: 'New Thought / Self-development',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Power of Intention',
    color: 'rgba(0,214,255,.16)',
    essence: 'Change the way you look at things, and the things you look at change.',
    core: 'Intention is not something you do but a field of energy you connect to — the creative power of Spirit (Source) that you are already part of. By matching your inner state to that Source, you stop forcing life and start co-creating it. His later work fused self-actualization with the Tao and with Neville-style assuming of the wish fulfilled.',
    keyIdeas: [
      'The power of intention',
      'You\'ll see it when you believe it',
      'Living the Tao (effortless action)',
      'Assume the feeling of the wish fulfilled',
      'The no-limit, self-actualizing person',
    ],
    practice: 'Each morning and as you fall asleep, hold the inner statement and feeling "I am that which I intend to attract." Match your mood to Source — appreciation, kindness, and ease — rather than to current circumstances.',
    bestFor: 'Anyone wanting a warm, accessible bridge from practical self-help into spiritual law, intention, and the Tao.',
    misunderstanding: 'Intention is not willpower or pushing harder — it is aligning with a state of being. The shift is in who you are, not how forcefully you try.',
    complements: 'Neville Goddard, Joseph Murphy, Eckhart Tolle',
    relatedTeachers: ['neville', 'murphy', 'tolle'],
    trap: 'Treating "intention" as one more way to demand outcomes from life. The teaching is to become the feeling, then act from inspiration rather than lack.',
    prompt: 'Are you living from what you want, or from what already is? What would change today if you matched your mood to your intention instead of your circumstances?',
    books: ['The Power of Intention', 'Wishes Fulfilled', 'Change Your Thoughts – Change Your Life', 'Your Erroneous Zones'],
  },
  {
    id: 'byrne',
    name: 'Rhonda Byrne',
    era: 'Contemporary',
    tradition: 'Law of Attraction',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Secret',
    color: 'rgba(255,209,102,.16)',
    essence: 'Like attracts like — your dominant feeling sets the frequency.',
    core: 'Your thoughts and feelings broadcast a frequency, and life returns experiences that match it. The process is "ask, believe, receive": become clear on the wish, assume the feeling of already having it, and let gratitude hold that frequency steady until the outer world catches up.',
    keyIdeas: ['Ask, believe, receive', 'Feeling sets your frequency', 'Gratitude as a magnet', 'Visualization from the end', 'Thoughts become things'],
    practice: 'Each day, write or speak what you are grateful for as though it is already done, then spend a minute vividly feeling one desire fulfilled — the relief and joy of already having it.',
    bestFor: 'Newcomers who want the most accessible on-ramp to the Law of Attraction and the feeling-based core shared by the New Thought teachers.',
    misunderstanding: 'It is not denial or magical wishing, and difficult events are not a personal failing or punishment. The real lever is a sustained inner feeling-state expressed through grateful, inspired action — not forced positivity.',
    complements: 'Neville Goddard, Joseph Murphy, Bob Proctor',
    relatedTeachers: ['neville', 'murphy', 'proctor'],
    trap: 'Slipping into toxic positivity or self-blame when results lag. The work is steady feeling and aligned action, not policing every thought or shaming yourself for hard seasons.',
    prompt: 'What are you grateful for as if it were already here? Can you give yourself the feeling of the wish fulfilled before the proof arrives?',
    books: ['The Secret', 'The Power', 'The Magic', 'Hero'],
    note: 'The Secret presents the law of attraction as a universal law comparable to gravity and invokes quantum physics in support. That framing is not accepted by physics and has been widely criticised, including for passages implying that misfortune is attracted by those who suffer it. The gratitude and visualisation practices are benign in themselves; the causal claims made for them are not established.',
  },
  {
    id: 'hall',
    name: 'Manly P. Hall',
    era: '1901-1990',
    tradition: 'Esoteric philosophy',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Ancient Wisdom',
    color: 'rgba(124,92,255,.20)',
    essence: 'The myths and symbols are maps of the soul.',
    core: 'Myths, symbols, mystery schools, and sacred art preserve maps of human transformation. Ancient wisdom is less about collecting secrets than learning to read the symbolic language of the soul.',
    keyIdeas: ['Symbol as a language of transformation', 'The mystery schools', 'Perennial philosophy', 'Reading sacred art and myth', 'Wisdom over secrecy'],
    practice: 'Study a symbol slowly, trace its historical meanings, then ask what inner faculty, virtue, or transformation it is pointing toward in your own life.',
    bestFor: 'Symbolic thinkers who want a broad doorway into hermetic, mythic, Masonic, alchemical, and esoteric traditions.',
    misunderstanding: 'Esoteric study is not about collecting hidden secrets or occult status — it is about becoming wiser, kinder, and more disciplined through symbol.',
    complements: 'Franz Bardon, Carl Jung, Baruch Spinoza',
    relatedTeachers: ['bardon', 'jung', 'spinoza'],
    trap: 'Getting lost in correspondences and hidden systems without becoming wiser, kinder, or more disciplined.',
    prompt: 'What symbol keeps appearing in your life, and what quality might it be asking you to develop?',
    books: ['The Secret Teachings of All Ages', 'The Lost Keys of Freemasonry'],
    note: 'Hall wrote as a philosopher and compiler within the esoteric tradition, not as an academic historian. His accounts of ancient mystery schools, Egyptian religion and secret lineages reflect the sources and assumptions of early twentieth-century occultism, and many have been revised or rejected by later scholarship. Read him for the symbolic and philosophical reading, and check historical claims elsewhere.',
  },
  {
    id: 'emerson',
    name: 'Ralph Waldo Emerson',
    era: '1803-1882',
    tradition: 'Transcendentalism',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Self-Reliance',
    color: 'rgba(0,214,255,.16)',
    essence: 'Trust the truth that speaks within you.',
    core: 'The divine is not only distant or institutional; it speaks through nature, intuition, conscience, and the individual soul. Self-reliance means trusting that inner authority without becoming isolated or arrogant.',
    keyIdeas: ['Self-reliance', 'The over-soul', 'Nature as scripture', 'Intuition over conformity', 'An original relation to the universe'],
    practice: 'Take one honest perception seriously today. Write it plainly, act from it modestly, and notice where conformity tries to drown it out.',
    bestFor: 'People who need courage to trust their own perception, conscience, creativity, and spiritual individuality.',
    misunderstanding: 'Self-reliance is not egoism or stubborn isolation — it is fidelity to inner truth, held with humility and a willingness to keep learning.',
    complements: 'Jiddu Krishnamurti, Søren Kierkegaard, Baruch Spinoza',
    relatedTeachers: ['krishnamurti', 'kierkegaard', 'spinoza'],
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
    essence: 'Master yourself before you reach for any power.',
    core: 'Spiritual development requires balanced training of body, soul, and spirit. Magical power without ethical maturity and elemental equilibrium becomes imbalance rather than mastery.',
    keyIdeas: ['Elemental equilibrium', 'Body, soul, and spirit in balance', 'Disciplined self-observation', 'Step-by-step training', 'Character before power'],
    practice: 'Begin with disciplined self-observation: track thoughts, habits, virtues, and weaknesses before attempting advanced inner exercises.',
    bestFor: 'Students drawn to Hermetic practice who want a structured, demanding path rather than vague inspiration.',
    misunderstanding: 'It is not a shortcut to magical abilities — Bardon\'s path is a slow, ethical discipline where balance and character come long before any phenomena.',
    complements: 'Manly P. Hall, Carl Jung, Thomas Troward',
    relatedTeachers: ['hall', 'jung', 'troward'],
    trap: 'Chasing powers, phenomena, or occult identity before building character, balance, and daily discipline.',
    prompt: 'Which inner element feels overdeveloped or neglected in you: fire, air, water, or earth?',
    books: ['Initiation Into Hermetics', 'The Practice of Magical Evocation'],
    note: 'Bardon presents a system of practical magic including claims about elemental forces, evocation and psychic abilities. These are the claims of an esoteric tradition and are not scientifically supported. Biographical accounts of his life — including his imprisonment and death under communist Czechoslovakia — come largely from students and family and are sparsely documented. The early psychological exercises are usable independently of any belief in the later material.',
  },
  {
    id: 'krishnamurti',
    name: 'Jiddu Krishnamurti',
    era: '1895-1986',
    tradition: 'Spiritual inquiry',
    category: 'Presence & Surrender',
    lineage: 'Choiceless Awareness',
    color: 'rgba(165,180,252,.18)',
    essence: 'Truth is a pathless land.',
    core: 'Truth is not reached through authority, ideology, method, or guru-dependence. Freedom begins in direct observation of thought, fear, conditioning, and desire as they move in the present moment.',
    keyIdeas: ['Choiceless awareness', 'Freedom from the known', 'No authority or guru', 'The observer is the observed', 'The ending of conditioning'],
    practice: 'Watch thought without choosing, condemning, or improving it. Let attention see the whole movement of reaction as it happens.',
    bestFor: 'Seekers who are ready to question systems, teachers, beliefs, and the subtle dependence on spiritual authority.',
    misunderstanding: 'His rejection of method is not a license for passivity — it is a call to direct, alert observation instead of dependence on systems and teachers.',
    complements: 'Alan Watts, Ralph Waldo Emerson, Michael Singer',
    relatedTeachers: ['watts', 'emerson', 'singer'],
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
    keyIdeas: [
      'Shadow integration',
      'Individuation',
      'Archetypes of the collective unconscious',
      'Active imagination',
      'Projection: the outer mirrors the inner',
    ],
    practice: 'Shadow work, dream attention, and active imagination — dialoguing honestly with the images and feelings that arise, rather than analyzing them from a safe distance.',
    bestFor: 'Those drawn to depth, symbol, and dreams who want to become whole rather than merely positive.',
    misunderstanding: 'Shadow work is not wallowing in darkness — it is owning what you have disowned so it no longer operates blindly. The goal is integration, not indulgence.',
    complements: 'Alan Watts, Michael Singer',
    relatedTeachers: ['watts', 'singer'],
    trap: 'Endless analysis without integration, or inflation — identifying with an archetype instead of relating to it. Insight that never enters life changes nothing.',
    prompt: 'What part of yourself have you disowned — and where does it keep showing up, projected onto the people who irritate you most?',
    books: ['Memories, Dreams, Reflections', 'Man and His Symbols', 'Modern Man in Search of a Soul'],
    note: 'Jung is a major figure in the history of psychology, but analytical psychology is not the dominant framework in contemporary clinical practice, and concepts such as archetypes and the collective unconscious are theoretical constructs rather than empirically established mechanisms. His interest in alchemy, astrology and synchronicity belongs to his own speculative work. Shadow work in a self-help register is not psychotherapy.',
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
    note: 'Watts described himself as an entertainer and philosopher rather than a teacher or master, and he did not claim formal transmission in any Buddhist lineage. His presentations of Zen, Taoism and Vedanta are interpretive and shaped for a Western audience; practitioners within those traditions sometimes regard them as elegant but partial.',
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
    essence: 'Examine the belief — especially the comforting one.',
    core: 'Clear thinking matters. Beliefs should be examined for evidence, coherence, and hidden assumptions, especially when they are comforting, inherited, or socially rewarded.',
    keyIdeas: ['Evidence over authority', 'Clarity of thought', 'Skepticism as honesty', 'Questioning inherited belief', 'Reason joined to compassion'],
    practice: 'Take one strong belief and write the best argument for it, the best argument against it, and what evidence would actually change your mind.',
    bestFor: 'Anyone who wants spiritual or philosophical study balanced by precision, skepticism, and intellectual honesty.',
    misunderstanding: 'His skepticism is not cynicism — clear thinking is meant to refine wonder and reduce cruelty, not to flatten meaning.',
    complements: 'Baruch Spinoza, Simone Weil, Jiddu Krishnamurti',
    relatedTeachers: ['spinoza', 'weil', 'krishnamurti'],
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
    essence: 'Understand the cause, and the passion loosens.',
    core: 'God, nature, and reality are not separate compartments. Freedom grows as we understand causes, passions, and necessity, moving from reactive emotion toward adequate ideas and clear joy.',
    keyIdeas: ['God or Nature', 'Adequate ideas', 'Freedom through understanding', 'Bondage to confused passion', 'The intellectual love of God'],
    practice: 'When a passion takes hold, trace its causes. Ask what you understand, what you are imagining, and how clearer knowledge could loosen the reaction.',
    bestFor: 'Reflective minds drawn to a rational, non-dual metaphysics where ethics, nature, and spiritual awe meet.',
    misunderstanding: 'His system is not cold abstraction — it is a path from reactive emotion toward clarity, freedom, and a steady joy.',
    complements: 'Ralph Waldo Emerson, Bertrand Russell, Simone Weil',
    relatedTeachers: ['emerson', 'russell', 'weil'],
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
    essence: 'Truth is something you live, not just admire.',
    core: 'Truth is not only an idea to admire; it is a way of existing. Faith, anxiety, choice, and inwardness ask the individual to become responsible before God and before the self.',
    keyIdeas: ['The leap of faith', 'Subjective truth', 'Anxiety and freedom', 'The single individual', 'Stages on life\'s way'],
    practice: 'Name the choice you are avoiding. Ask what fear, social performance, or despair keeps you from living it honestly.',
    bestFor: 'Anyone wrestling with faith, individuality, anxiety, and the demand to live rather than merely think.',
    misunderstanding: 'His focus on anxiety and despair is not morbid — it is the honest ground from which authentic faith and real choice become possible.',
    complements: 'Ralph Waldo Emerson, Viktor Frankl, Simone Weil',
    relatedTeachers: ['emerson', 'frankl', 'weil'],
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
    essence: 'Attention, at its purest, is prayer.',
    core: 'Attention is a moral and spiritual act. To truly attend to another person, to suffering, or to truth is to suspend egoic grasping and make room for grace.',
    keyIdeas: ['Attention as a moral act', 'Affliction and grace', 'Decreation of the ego', 'Waiting for God', 'Rootedness'],
    practice: 'Give one person or problem your full attention without rushing to solve, perform, advise, or center yourself.',
    bestFor: 'Those drawn to the meeting point of spirituality, ethics, compassion, suffering, and disciplined attention.',
    misunderstanding: 'Her severity is not self-punishment for its own sake — it points toward attention and love, and is best held with gentleness toward oneself.',
    complements: 'Viktor Frankl, Søren Kierkegaard, Baruch Spinoza',
    relatedTeachers: ['frankl', 'kierkegaard', 'spinoza'],
    trap: 'Mistaking severity for holiness. Her work is luminous but intense; keep compassion toward yourself in the practice.',
    prompt: 'Where could your attention become an act of love rather than control?',
    books: ['Gravity and Grace', 'Waiting for God', 'The Need for Roots'],
    note: 'Weil published very little in her lifetime; the books under her name were assembled after her death from notebooks and letters by editors, and Gravity and Grace in particular is a thematic arrangement of fragments by Gustave Thibon rather than a book she wrote. Her death at thirty-four followed tuberculosis and severe undereating, and accounts of her motives vary. Her ascetic example should be read with care rather than emulated.',
  },
  {
    id: 'maslow',
    name: 'Abraham Maslow',
    era: '1908-1970',
    tradition: 'Humanistic psychology',
    category: 'Psychology & Self-Development',
    lineage: 'Self-Actualization',
    color: 'rgba(56,242,155,.16)',
    essence: 'We are pulled by growth, not only pushed by lack.',
    core: 'Human beings are motivated not only by deficiency and survival needs but by growth, meaning, creativity, love, and self-actualization. A healthy life makes room for becoming.',
    keyIdeas: ['The hierarchy of needs', 'Self-actualization', 'Peak experiences', 'Being-needs vs deficiency-needs', 'Self-transcendence'],
    practice: 'Check which need is most honestly under-supported right now: safety, belonging, esteem, purpose, creativity, or transcendence. Strengthen that layer without shame.',
    bestFor: 'People mapping personal growth through needs, motivation, peak experiences, and the movement toward fuller potential.',
    misunderstanding: 'The hierarchy is not a rigid ladder climbed once — needs are layered, fluid, and shaped by culture and circumstance.',
    complements: 'Viktor Frankl, Carol Dweck, Carl Jung',
    relatedTeachers: ['frankl', 'dweck', 'jung'],
    trap: 'Treating the hierarchy as a rigid ladder. Real lives are layered, fluid, and culturally shaped.',
    prompt: 'Which basic need are you trying to spiritually bypass instead of care for directly?',
    books: ['Motivation and Personality', 'Toward a Psychology of Being'],
    note: 'The hierarchy of needs is among the most widely taught ideas in psychology and among the least well supported empirically. Maslow developed it from qualitative study of people he selected as exemplary, not from representative sampling, and attempts to validate a strict ordering of needs have largely failed. It remains a useful heuristic; it is not an established law of motivation. The familiar pyramid diagram was not drawn by him.',
  },
  {
    id: 'peterson',
    name: 'Jordan Peterson',
    era: 'Contemporary',
    tradition: 'Psychology / Meaning',
    category: 'Psychology & Self-Development',
    lineage: 'Responsibility & Meaning',
    color: 'rgba(255,107,107,.14)',
    essence: 'Pick up the heaviest load you can carry.',
    core: 'Meaning is found through responsibility, truthful speech, disciplined attention, and the symbolic patterns that organize human life. Order and chaos both have to be faced consciously.',
    keyIdeas: ['Responsibility as meaning', 'Order and chaos', 'Tell the truth', 'Symbolic and archetypal thinking', 'Aim at the highest good'],
    practice: 'Choose one neglected responsibility and make it smaller, concrete, and immediate. Put one piece of order back into your day.',
    bestFor: 'People drawn to archetypes, meaning, discipline, responsibility, and the psychological reading of myth.',
    misunderstanding: 'Responsibility is not meant as harsh self-judgment or rigid ideology — it is voluntarily taking on burden to make life meaningful.',
    complements: 'Carl Jung, Viktor Frankl, Abraham Maslow',
    relatedTeachers: ['jung', 'frankl', 'maslow'],
    trap: 'Turning responsibility into harsh self-judgment, or treating symbolic maps as permission for rigid ideology.',
    prompt: 'What small responsibility would make your life noticeably less chaotic if you faced it today?',
    books: ['Maps of Meaning', '12 Rules for Life', 'Beyond Order'],
    note: 'Peterson is a clinical psychologist and academic whose psychological work on personality and his practical advice about responsibility are distinct from his political and cultural commentary, which is contested and which many readers reject. This profile addresses the psychological and mythological material only. Readers should also know that his own account of his life includes a serious health crisis involving benzodiazepine dependence — a reminder that a teacher of resilience is not exempt from difficulty.',
  },
  {
    id: 'dweck',
    name: 'Carol Dweck',
    era: 'Contemporary',
    tradition: 'Motivation psychology',
    category: 'Psychology & Self-Development',
    lineage: 'Growth Mindset',
    color: 'rgba(0,214,255,.14)',
    essence: 'Ability can grow; difficulty is information.',
    core: 'Believing abilities can develop changes how people meet effort, feedback, failure, and learning. A growth mindset turns difficulty into information rather than proof of fixed limitation.',
    keyIdeas: ['Growth vs fixed mindset', 'The power of "yet"', 'Effort as the path to mastery', 'Failure as feedback', 'Process over praise'],
    practice: 'When you catch "I am bad at this," rewrite it as a specific learning edge: "I have not learned this part yet." Then choose the next practice rep.',
    bestFor: 'Students, creators, and builders who freeze when difficulty feels like identity-level failure.',
    misunderstanding: 'Growth mindset is not empty positivity or merely believing you can — it must be paired with strategy, feedback, and sustained effort.',
    complements: 'Abraham Maslow, Jim Rohn, Tony Robbins',
    relatedTeachers: ['maslow', 'rohn', 'robbins'],
    trap: 'Using "growth mindset" as empty positivity. The shift has to be paired with strategy, feedback, and sustained effort.',
    prompt: 'Where are you calling something identity when it is actually a learnable skill?',
    books: ['Mindset'],
    note: 'Growth mindset is an active research area, and the picture is more mixed than the popular version suggests. Large replication studies have found average effects on academic achievement that are small, concentrated among lower-achieving and disadvantaged students, and dependent on whether the surrounding environment actually supports the message. Dweck herself has criticised the widespread "false growth mindset" — praising effort while changing nothing else. Treat it as a useful reframing with modest, conditional evidence rather than a transformative intervention.',
  },
  {
    id: 'frankl',
    name: 'Viktor Frankl',
    era: '1905-1997',
    tradition: 'Logotherapy',
    category: 'Psychology & Self-Development',
    lineage: 'Meaning in Suffering',
    color: 'rgba(255,209,102,.16)',
    essence: 'When the situation can\'t change, you can still choose your response.',
    core: 'The primary human drive is not pleasure or power alone, but meaning. Even under severe limits, a person may still choose an attitude, a responsibility, or a purpose that gives life dignity.',
    keyIdeas: ['The will to meaning', 'The last human freedom', 'Tragic optimism', 'Meaning through love, work, and suffering', 'Logotherapy'],
    practice: 'Ask what life is asking of you in this situation, rather than only asking what you want from life.',
    bestFor: 'Anyone facing suffering, uncertainty, grief, or a search for purpose that needs grounded existential strength.',
    misunderstanding: 'Finding meaning in suffering does not deny or minimize pain — it asks how dignity can still be found within what cannot be changed.',
    complements: 'Søren Kierkegaard, Simone Weil, Abraham Maslow',
    relatedTeachers: ['kierkegaard', 'weil', 'maslow'],
    trap: 'Using meaning to minimize pain. Logotherapy does not deny suffering; it asks how dignity can still be found within it.',
    prompt: 'What is one meaningful response still available to you, even if the situation is not fully in your control?',
    books: ['Man\'s Search for Meaning', 'The Doctor and the Soul'],
  },
  {
    id: 'covey',
    name: 'Stephen R. Covey',
    era: '1932–2012',
    tradition: 'Leadership & effectiveness',
    category: 'Psychology & Self-Development',
    lineage: 'Time Management Matrix',
    color: 'rgba(99,179,237,.16)',
    essence: 'Put first things first — live in Quadrant II.',
    core: 'Most people spend their time reacting to what is urgent, while what is truly important — relationships, health, planning, growth — quietly waits. The Time Management Matrix divides all activity into four quadrants by urgency and importance. Effectiveness lives in Quadrant II: the important but not yet urgent, where prevention, preparation, and intentional growth happen.',
    keyIdeas: ['The Time Management Matrix', 'Quadrant II living', 'Urgency vs importance', 'Proactive, not reactive', 'The weekly review'],
    practice: 'Map your week across the four quadrants. Identify what is consuming time in Quadrant I (crises) and Quadrant III (other people\'s urgencies). Then carve out protected time for Quadrant II — the things that matter most before they become emergencies.',
    bestFor: 'Anyone overwhelmed by busyness who needs a clear map to distinguish reactive living from intentional living.',
    misunderstanding: 'It is not about doing more, faster — it is about prioritizing what truly matters before it becomes a crisis.',
    complements: 'Viktor Frankl, Jim Rohn, Carol Dweck',
    relatedTeachers: ['frankl', 'rohn', 'dweck'],
    trap: 'Building a beautiful matrix and returning to urgency the next morning. The real work is the weekly review and the honest reckoning of where time actually went.',
    prompt: 'What important thing are you neglecting because nothing is forcing you to do it yet?',
    books: ['The 7 Habits of Highly Effective People', 'First Things First'],
  },
  {
    id: 'proctor',
    name: 'Bob Proctor',
    era: '1934-2022',
    tradition: 'Personal development',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'Paradigm Shift',
    color: 'rgba(124,92,255,.18)',
    essence: 'Change the paradigm, and the results follow.',
    core: 'Results are shaped by paradigms: repeated subconscious patterns of belief, expectation, and behavior. To change results, you must change the inner program that feels normal.',
    keyIdeas: ['Paradigms as subconscious programs', 'Self-image', 'Repetition and impression', 'The terror barrier', 'Thoughts shape results'],
    practice: 'Write the result you want, identify the current paradigm that resists it, and rehearse the new self-image daily through repetition and action.',
    bestFor: 'People studying wealth consciousness, self-image, repetition, and the bridge between New Thought and modern success coaching.',
    misunderstanding: 'Repeating affirmations is not the transformation itself — without changed daily behavior, the old paradigm quietly stays in charge.',
    complements: 'Napoleon Hill, Neville Goddard, Joseph Murphy',
    relatedTeachers: ['hill', 'neville', 'murphy'],
    trap: 'Confusing repetition with transformation while daily behavior remains unchanged.',
    prompt: 'What result keeps repeating, and what hidden assumption might be making it feel normal?',
    books: ['You Were Born Rich'],
    note: 'Proctor taught within the New Thought and success-literature tradition; his claims about the mind, vibration and the attraction of results are teachings within that tradition rather than established findings. He also worked in an industry — seminars, coaching programmes and licensed courses — where the teaching and the sale are closely joined, which is worth holding in view.',
  },
  {
    id: 'rohn',
    name: 'Jim Rohn',
    era: '1930-2009',
    tradition: 'Success philosophy',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'Discipline & Habits',
    color: 'rgba(56,242,155,.14)',
    essence: 'Small disciplines, repeated daily, compound.',
    core: 'Success is built through philosophy, discipline, habits, and personal responsibility. Small daily disciplines compound; small daily neglects compound too.',
    keyIdeas: [
      'The slight edge',
      'Personal philosophy',
      'Discipline vs regret',
      'You become your five closest people',
      'Work harder on yourself than on your job',
    ],
    practice: 'Choose one simple discipline that supports your future and do it today before negotiating with mood.',
    bestFor: 'Anyone who needs practical, grounded success principles without losing the inner-work frame.',
    misunderstanding: 'His emphasis on discipline is not self-punishment — it is stewardship of your time, energy, and potential.',
    complements: 'Carol Dweck, Tony Robbins, Napoleon Hill',
    relatedTeachers: ['dweck', 'robbins', 'hill'],
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
    essence: 'What the mind can conceive and believe, it can achieve.',
    core: 'Desire, definite purpose, belief, planning, persistence, and organized effort shape achievement. The mind needs a clear aim and repeated emotional commitment.',
    keyIdeas: ['A definite chief aim', 'Desire backed by faith', 'The mastermind', 'Persistence', 'Organized planning'],
    practice: 'Write a definite aim, why it matters, what you will give in return, and the first specific action. Read it until it becomes emotionally charged and behaviorally real.',
    bestFor: 'Students of classic success literature, goal-setting, persistence, and wealth consciousness.',
    misunderstanding: 'It is not wishful daydreaming — the aim must be specific, emotionally charged, and backed by honest planning and action.',
    complements: 'Bob Proctor, Jim Rohn, Neville Goddard',
    relatedTeachers: ['proctor', 'rohn', 'neville'],
    trap: 'Dreaming over the written aim without honest planning, skill-building, or ethical action.',
    prompt: 'Is your desire specific enough to organize your behavior, or vague enough to stay a fantasy?',
    books: ['Think and Grow Rich', 'The Law of Success'],
    note: 'Hill\'s account of his own life does not withstand scrutiny. Biographical research — most thoroughly by Matt Novak and others — has found no evidence for the commission from Andrew Carnegie that frames Think and Grow Rich, and has documented a career including failed businesses, fraud allegations and legal trouble. The book has helped a great many readers; its origin story appears to be substantially invented, and that is worth knowing while reading it.',
  },
  {
    id: 'robbins',
    name: 'Tony Robbins',
    era: 'Contemporary',
    tradition: 'Peak performance',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'State & Strategy',
    color: 'rgba(255,79,216,.14)',
    essence: 'Change your state, and you change your story.',
    core: 'State, story, strategy, and standards drive performance. Change often begins by shifting physiology and focus, then installing a clearer decision and plan.',
    keyIdeas: ['State, story, strategy', 'Physiology drives emotion', 'Decisions shape destiny', 'Raising your standards', 'Massive action'],
    practice: 'Change your physical state first, name the old story, choose a stronger meaning, and take one immediate action that proves the new standard.',
    bestFor: 'People who respond to high-energy coaching, emotional state work, decision-making, and practical transformation tools.',
    misunderstanding: 'The high-energy events are not the transformation itself — without repeatable systems afterward, the breakthrough fades.',
    complements: 'Jim Rohn, Carol Dweck, Bob Proctor',
    relatedTeachers: ['rohn', 'dweck', 'proctor'],
    trap: 'Depending on intensity or event energy instead of building repeatable systems after the breakthrough.',
    prompt: 'What story are you rehearsing, and what action would make a stronger story believable today?',
    books: ['Awaken the Giant Within', 'Unlimited Power'],
    note: 'Robbins is a coach and event producer rather than a clinician or researcher. His work draws on neuro-linguistic programming, which is not an evidence-based therapeutic modality, and his large events have drawn criticism over injuries, high-pressure sales and the treatment of sensitive material such as trauma and abuse in a mass setting. The practical tools around physiology, focus and decision are usable; the therapeutic and scientific framing should be held sceptically.',
  },
  {
    id: 'nightingale',
    name: 'Earl Nightingale',
    era: '1921–1989',
    tradition: 'Success philosophy',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'The Strangest Secret',
    color: 'rgba(255,209,102,.16)',
    essence: 'You become what you think about.',
    core: 'Distilling the success literature to one principle, Nightingale taught that we become what we think about most of the time. A definite goal held consistently in mind, joined to service and persistence, shapes the life that follows.',
    keyIdeas: ['You become what you think about', 'A definite goal', 'Service brings reward', 'Attitude as the key', 'Acres of diamonds already at hand'],
    practice: 'Write your most important goal on a card, read it morning and night, think about it constantly, and act toward it — for thirty days, as an experiment.',
    bestFor: 'People who want the single, memorable distillation of classic success thought.',
    misunderstanding: 'It is not idle positive thinking — Nightingale paired the idea with concrete goals, service, and daily action.',
    complements: 'Napoleon Hill, Bob Proctor, Jim Rohn',
    relatedTeachers: ['hill', 'proctor', 'rohn'],
    trap: 'Letting the mind drift to worry, since "what you think about" includes the fears you rehearse.',
    prompt: 'If you become what you think about, what has your mind been rehearsing most this week?',
    books: ['The Strangest Secret', 'Lead the Field'],
  },
  {
    id: 'wattles',
    name: 'Wallace D. Wattles',
    era: '1860–1911',
    tradition: 'New Thought',
    category: 'Wealth, Success & Creative Mindset',
    lineage: 'Science of Getting Rich',
    color: 'rgba(56,242,155,.16)',
    essence: 'Think in a certain way — and act on what is in front of you.',
    core: 'There is a thinking Substance from which all things are made, and impressing your clear vision upon it sets creative forces in motion. Riches come by doing things in a "certain way": gratitude, a definite vision, and efficient present action.',
    keyIdeas: ['The thinking Substance', 'The Certain Way', 'Creation, not competition', 'Gratitude as connection', 'Efficient present action'],
    practice: 'Hold a clear, grateful vision of what you want as already given, then do each day\'s work efficiently and completely — acting in the present, where you are.',
    bestFor: 'Readers who want the disciplined, practical root beneath modern abundance teaching.',
    misunderstanding: 'It is not get-rich-quick passivity — Wattles insisted the vision must be joined to daily, efficient action.',
    complements: 'Charles Haanel, Robert Collier, Napoleon Hill',
    relatedTeachers: ['haanel', 'collier', 'hill'],
    trap: 'Visualizing wealth while neglecting the "efficient action" half of the method.',
    prompt: 'Are you creating from gratitude and vision, or competing from a fear of lack?',
    books: ['The Science of Getting Rich', 'The Science of Being Great'],
    note: 'Wattles describes a "thinking Substance" from which matter is formed and which responds to human thought. This is a metaphysical proposition of the New Thought tradition, presented by him as science, and it has no empirical support. His practical counsel about gratitude, focus and doing present work well stands on its own; his claim that everyone can become rich by these means does not account for the structural realities of poverty.',
  },
  {
    id: 'haanel',
    name: 'Charles F. Haanel',
    era: '1866–1949',
    tradition: 'New Thought',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Master Key System',
    color: 'rgba(0,214,255,.16)',
    essence: 'The within shapes the without.',
    core: 'Through a graded course of mental exercises, Haanel taught that concentration, relaxation, and constructive thought connect the individual to a universal mind whose power flows outward into circumstance.',
    keyIdeas: ['The within and the without', 'Concentration and attention', 'Relaxation and silence', 'The universal mind', 'Harmonious, constructive thought'],
    practice: 'Sit in stillness and train concentration in stages — first physical relaxation, then mental quiet, then holding one constructive idea with steady, undistracted attention.',
    bestFor: 'Students who want a structured, week-by-week training of attention and mental power.',
    misunderstanding: 'The "Master Key" is not a secret trick — it is disciplined practice of concentration and constructive thought, built up over time.',
    complements: 'Wallace D. Wattles, Thomas Troward, Robert Collier',
    relatedTeachers: ['wattles', 'troward', 'collier'],
    trap: 'Reading the lessons for ideas while skipping the weekly exercises that actually train the mind.',
    prompt: 'Can you hold one constructive thought, undistracted, for five full minutes?',
    books: ['The Master Key System'],
    note: 'Haanel presents his system as scientific and invokes the physics of his day in support of claims about thought and vibration. That framing does not correspond to physics as understood then or now. Popular accounts that he taught Bill Gates or that the book was banned by the church are unsubstantiated legends. The concentration exercises are a genuine attention practice regardless.',
  },
  {
    id: 'collier',
    name: 'Robert Collier',
    era: '1885–1950',
    tradition: 'New Thought',
    category: 'New Thought & Spiritual Law',
    lineage: 'The Secret of the Ages',
    color: 'rgba(124,92,255,.18)',
    essence: 'Picture clearly, feel deeply, and the subconscious provides.',
    core: 'Within each person is a creative power — the subconscious linked to a universal Mind of supply. By forming a clear mental picture charged with desire and faith, you draw the corresponding conditions toward you.',
    keyIdeas: ['The genie-of-your-mind', 'Clear mental pictures', 'Desire and faith', 'Universal Mind as supply', 'Gratitude and expectancy'],
    practice: 'Form a vivid mental picture of your goal, charge it with desire and gratitude, hold it as already true in relaxed moments, and let the subconscious work out the means.',
    bestFor: 'Readers who want practical, encouraging instruction in mental picturing and subconscious supply.',
    misunderstanding: 'His "genie" is a metaphor for the subconscious and universal mind, not magic — and the picturing must be joined to faith and openness to opportunity.',
    complements: 'Wallace D. Wattles, Charles Haanel, Neville Goddard',
    relatedTeachers: ['wattles', 'haanel', 'neville'],
    trap: 'Making fuzzy, half-hearted mental pictures, or undercutting them with contrary worry.',
    prompt: 'Is the picture you hold of your goal vivid and deeply felt — or vague and uncertain?',
    books: ['The Secret of the Ages', 'Riches Within Your Reach'],
    note: 'Collier worked in advertising and direct-mail copywriting, and his metaphysical books share that persuasive style. His claims about the subconscious drawing circumstances are teachings within New Thought rather than psychological findings, and his writing on mental healing should not inform decisions about medical care.',
  },
  {
    id: 'ponder',
    name: 'Catherine Ponder',
    era: 'b. 1927',
    tradition: 'Unity / New Thought',
    category: 'New Thought & Spiritual Law',
    lineage: 'Dynamic Laws of Prosperity',
    color: 'rgba(255,79,216,.16)',
    essence: 'Prosperity is your divine birthright.',
    core: 'A Unity minister, Ponder taught prosperity as a spiritual law: through affirmation, forgiveness, tithing, and a wealthy state of mind, one cooperates with a God of abundance rather than struggling against lack.',
    keyIdeas: ['Prosperity as spiritual law', 'Prosperity affirmations', 'Forgiveness releases supply', 'Tithing and giving', 'The vacuum law of prosperity'],
    practice: 'Use a daily prosperity affirmation ("I am rich, well, and happy"), release resentment through forgiveness, and give first — trusting supply rather than clutching at lack.',
    bestFor: 'Those who want a warm, faith-based, affirmation-driven approach to abundance.',
    misunderstanding: 'Her prosperity teaching is not greed — she frames wealth as wholeness, generosity, and the freedom to do good.',
    complements: 'Florence Scovel Shinn, Joseph Murphy, Emmet Fox',
    relatedTeachers: ['shinn', 'murphy', 'fox'],
    trap: 'Affirming prosperity while holding resentment or refusing to give — both of which she said block supply.',
    prompt: 'What grievance might be quietly blocking the good you say you want?',
    books: ['The Dynamic Laws of Prosperity', 'Open Your Mind to Prosperity'],
    note: 'Ponder teaches tithing — giving a tenth of income, often to a spiritual source — as a law of supply. Readers should be careful here: a teaching that giving money to a religious organisation returns multiplied wealth has an obvious conflict of interest built into it, and no one in financial difficulty should give beyond their means on that basis. Her books also contain undocumented healing and prosperity anecdotes.',
  },
  {
    id: 'tolle',
    name: 'Eckhart Tolle',
    era: 'Contemporary',
    tradition: 'Modern non-duality',
    category: 'Presence & Surrender',
    lineage: 'The Power of Now',
    color: 'rgba(0,214,255,.16)',
    essence: 'Life is now; the present moment is all you ever have.',
    core: 'Most suffering is created by compulsive thinking and identification with the mind and its stories about past and future. Freedom is found by bringing full attention to the Now and recognizing the aware presence beneath thought.',
    keyIdeas: ['The power of Now', 'The pain-body', 'Identification with the mind', 'Presence beneath thought', 'Surrender to what is'],
    practice: 'Throughout the day, drop attention out of thinking and into direct sensing — the breath, the body, sounds, this moment — noticing the aware stillness that is already here.',
    bestFor: 'Overthinkers caught in mental noise who need a simple, repeatable return to presence.',
    misunderstanding: 'Living in the Now is not passivity or ignoring the future — it is acting from clarity instead of compulsive thought.',
    complements: 'Alan Watts, Michael Singer, Jiddu Krishnamurti',
    relatedTeachers: ['watts', 'singer', 'krishnamurti'],
    trap: 'Turning "presence" into one more concept to think about rather than an actual shift out of thinking.',
    prompt: 'Can you feel the aliveness in your hands right now, before the next thought arrives?',
    books: ['The Power of Now', 'A New Earth', 'Stillness Speaks'],
    note: 'Tolle\'s account of a sudden transformation at twenty-nine, following years of depression and a night of intense suffering, is his own testimony and cannot be independently verified. His framework — the pain-body, the ego as a mental construct — is a spiritual model rather than a psychological one, and severe depression or anxiety warrants clinical care alongside any practice.',
  },
  {
    id: 'ramdass',
    name: 'Ram Dass',
    era: '1931–2019',
    tradition: 'Bhakti / East–West synthesis',
    category: 'Presence & Surrender',
    lineage: 'Be Here Now',
    color: 'rgba(255,209,102,.18)',
    essence: 'Be here now — and love everyone.',
    core: 'After psychedelic exploration and meeting his guru Neem Karoli Baba, Ram Dass taught a path of loving awareness: being fully present, serving others, and treating life itself as a journey home to the heart.',
    keyIdeas: ['Be here now', 'Loving awareness', 'The guru and devotion', 'We are all just walking each other home', 'Service as spiritual practice'],
    practice: 'Rest as loving awareness: place attention in the heart, silently meet whoever is in front of you as "I am loving awareness," and let presence become compassion.',
    bestFor: 'Seekers who want presence joined to devotion, warmth, and service rather than dry detachment.',
    misunderstanding: 'His warmth is not naïve — it grew through real suffering, including the stroke he came to call "fierce grace."',
    complements: 'Eckhart Tolle, Thich Nhat Hanh, Alan Watts',
    relatedTeachers: ['tolle', 'thich', 'watts'],
    trap: 'Chasing spiritual highs instead of the patient, ordinary work of opening the heart.',
    prompt: 'Who is in front of you today that you could meet as loving awareness rather than as a task?',
    books: ['Be Here Now', 'Still Here', 'Polishing the Mirror'],
    note: 'Ram Dass\'s early work involved psychedelics, which are illegal in most jurisdictions, carry real psychological risks, and were central to a Harvard controversy that ended his academic career. He himself concluded that they could open a door but not keep it open, and turned to meditation and devotion instead. Accounts of his guru\'s miraculous acts are devotional testimony from within a tradition.',
  },
  {
    id: 'thich',
    name: 'Thich Nhat Hanh',
    era: '1926–2022',
    tradition: 'Zen Buddhism',
    category: 'Presence & Surrender',
    lineage: 'Mindfulness / Engaged Buddhism',
    color: 'rgba(56,242,155,.16)',
    essence: 'Peace is every step; breathe and you are home.',
    core: 'Mindfulness — full, gentle attention to the present moment — transforms ordinary life into practice. Through conscious breathing and "interbeing," we touch peace now and carry compassion into action in the world.',
    keyIdeas: ['Mindfulness of breath', 'Interbeing', 'Peace is every step', 'Engaged Buddhism', 'Returning to the present moment'],
    practice: 'Conscious breathing: "Breathing in, I know I am breathing in; breathing out, I smile." Bring this gentle awareness to walking, eating, and washing the dishes.',
    bestFor: 'Anyone wanting a gentle, practical mindfulness that joins inner peace with kindness and everyday life.',
    misunderstanding: 'Mindfulness is not escape or mere relaxation — for him it included deep compassion and active engagement with suffering and injustice.',
    complements: 'Ram Dass, Eckhart Tolle, Alan Watts',
    relatedTeachers: ['ramdass', 'tolle', 'watts'],
    trap: 'Treating mindfulness as a technique for productivity rather than a path of compassion and presence.',
    prompt: 'Can you take three conscious breaths right now and arrive fully where you already are?',
    books: ['The Miracle of Mindfulness', 'Peace Is Every Step', 'No Mud, No Lotus'],
  },
  {
    id: 'rumi',
    name: 'Rumi',
    era: '1207–1273',
    tradition: 'Sufism',
    category: 'Presence & Surrender',
    lineage: 'Mystical Poetry',
    color: 'rgba(255,79,216,.16)',
    essence: 'What you seek is seeking you.',
    core: 'The Sufi poet Rumi sang of divine love as the force that dissolves the separate self. Longing, surrender, and the burning away of the ego become the path by which the soul returns to its Source — the Beloved.',
    keyIdeas: ['Divine love (ishq)', 'The Beloved', 'Surrender of the ego', 'Longing as the path', 'The reed torn from the reed-bed'],
    practice: 'Let longing itself become prayer: instead of fleeing your ache for love or meaning, turn toward it as a call from the Beloved, and let it soften the grip of the separate self.',
    bestFor: 'Hearts drawn to the mystical, poetic, devotional path where love rather than technique opens the way.',
    misunderstanding: 'His poems are not only romantic sentiment — the "Beloved" points to the Divine, and the love he describes is a demanding, transforming fire.',
    complements: 'Ram Dass, Michael Singer, Simone Weil',
    relatedTeachers: ['ramdass', 'singer', 'weil'],
    trap: 'Enjoying the beauty of the poetry while avoiding the surrender and ego-death it actually calls for.',
    prompt: 'What longing have you tried to silence that might actually be pointing you home?',
    books: ['The Essential Rumi (tr. Coleman Barks)', 'The Masnavi'],
    note: 'Rumi was a Muslim jurist and teacher, and his poetry is saturated with the Qur\'an, hadith and Islamic practice. The most popular English versions — particularly Coleman Barks\' — are reworkings from earlier translations by someone who does not read Persian, and they frequently remove the Islamic content. Many lines circulating online as Rumi are not traceable to him at all. Read at least one scholarly translation alongside the popular ones.',
  },
  {
    id: 'aurelius',
    name: 'Marcus Aurelius',
    era: '121–180 CE',
    tradition: 'Stoicism',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'Stoic Meditations',
    color: 'rgba(255,255,255,.14)',
    essence: 'You have power over your mind — not over outside events.',
    core: 'Roman emperor and Stoic, Marcus wrote private reflections on living with virtue, accepting what is beyond our control, and meeting each day with reason and duty. The obstacle, faced rightly, becomes the way.',
    keyIdeas: ['The dichotomy of control', 'Virtue as the only good', 'Memento mori', 'The view from above', 'Amor fati — love your fate'],
    practice: 'Each morning, prepare to meet difficulty with reason; each evening, review your actions against virtue rather than against outcomes you could not control.',
    bestFor: 'Anyone seeking steadiness, duty, and inner freedom amid stress, responsibility, or adversity.',
    misunderstanding: 'Stoicism is not cold suppression of feeling — it is freeing oneself from being ruled by reactions, in service of clear, virtuous action.',
    complements: 'Epictetus, Seneca, Viktor Frankl',
    relatedTeachers: ['epictetus', 'seneca', 'frankl'],
    trap: 'Using "acceptance" as an excuse for passivity rather than acting wisely on what is in your control.',
    prompt: 'What are you suffering over right now that is genuinely outside your control?',
    books: ['Meditations'],
    note: 'Meditations was a private notebook, never intended for publication, and it has no argumentative structure — it is Marcus reminding himself of things, often repetitively. Readers should also hold the historical person alongside the text: he presided over an empire, prosecuted wars, and did not free the enslaved people his household depended on. The philosophy is not thereby invalidated; the man was of his time and place.',
  },
  {
    id: 'epictetus',
    name: 'Epictetus',
    era: '55–135 CE',
    tradition: 'Stoicism',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'The Enchiridion',
    color: 'rgba(0,214,255,.14)',
    essence: 'Some things are up to us; some are not.',
    core: 'Born a slave, Epictetus taught that freedom comes from clearly distinguishing what is within our power — our judgments, desires, and actions — from what is not, and caring only for the former.',
    keyIdeas: ['What is up to us', 'Judgments, not events, disturb us', 'Desire and aversion', 'Role and duty', 'Inner freedom over circumstance'],
    practice: 'When upset, pause and ask: "Is this within my control?" If not, practice releasing it; if so, act on your considered judgment, not your first impression.',
    bestFor: 'People who feel at the mercy of circumstance and want a sharp tool for inner freedom.',
    misunderstanding: 'His detachment is not indifference to life — it is refusing to let externals dictate your peace and character.',
    complements: 'Marcus Aurelius, Seneca, Viktor Frankl',
    relatedTeachers: ['aurelius', 'seneca', 'frankl'],
    trap: 'Reciting "it is not in my control" as a slogan while still inwardly clinging to the outcome.',
    prompt: 'What judgment — not the event itself — is actually disturbing you?',
    books: ['The Enchiridion', 'Discourses'],
    note: 'Epictetus wrote nothing. Everything attributed to him was recorded by his student Arrian, who presented the Discourses as notes taken from his teaching; the Enchiridion is a condensed handbook drawn from them. The words are therefore a student\'s record rather than the teacher\'s own text, which most scholars regard as faithful in substance.',
  },
  {
    id: 'seneca',
    name: 'Seneca',
    era: '4 BCE–65 CE',
    tradition: 'Stoicism',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'Letters on Living',
    color: 'rgba(255,209,102,.15)',
    essence: 'We suffer more in imagination than in reality.',
    core: 'Stoic statesman and writer, Seneca offered practical counsel on time, mortality, anger, and wealth — urging us to live now, rehearse adversity in advance, and value virtue above the gifts of fortune.',
    keyIdeas: ['We suffer more in imagination', 'On the shortness of life', 'Premeditation of adversity', 'Mastering anger', 'Wealth without attachment'],
    practice: 'Occasionally rehearse loss or hardship in advance so misfortune loses its shock, and treat your time as your most precious, non-renewable possession.',
    bestFor: 'Busy, ambitious people who need perspective on time, anger, and what truly matters.',
    misunderstanding: 'His wealth and political life seem to contradict Stoicism — but he argued the wise may possess fortune while remaining inwardly unattached to it.',
    complements: 'Marcus Aurelius, Epictetus, Viktor Frankl',
    relatedTeachers: ['aurelius', 'epictetus', 'frankl'],
    trap: 'Admiring the wisdom on the page while continuing to "live as if you will live forever."',
    prompt: 'What future trouble are you suffering over now that has not — and may never — arrive?',
    books: ['Letters from a Stoic', 'On the Shortness of Life', 'On Anger'],
    note: 'Seneca was among the wealthiest men in Rome, served as tutor and then adviser to the emperor Nero, and was implicated in the moral compromises of that court. Ancient sources accuse him of usury and of complicity in Nero\'s crimes, including the killing of Agrippina; the extent of his responsibility is debated by historians. The tension between the writing and the life is real and worth holding while reading him.',
  },
  {
    id: 'laotzu',
    name: 'Lao Tzu',
    era: 'c. 6th c. BCE',
    tradition: 'Taoism',
    category: 'Philosophy, Ethics & Logic',
    lineage: 'The Tao Te Ching',
    color: 'rgba(165,180,252,.18)',
    essence: 'The Tao that can be named is not the eternal Tao.',
    core: 'The Tao Te Ching points to the Tao — the nameless way underlying all things. Wisdom lies in wu wei (effortless action), yielding like water, embracing simplicity, and aligning with the natural flow rather than forcing.',
    keyIdeas: ['The Tao (the Way)', 'Wu wei — effortless action', 'Yielding like water', 'Simplicity and naturalness', 'The soft overcomes the hard'],
    practice: 'Notice where you are forcing or striving, and experiment with yielding — moving with the situation rather than against it, like water finding its way.',
    bestFor: 'Those exhausted by striving who sense that letting go and flowing may accomplish more than force.',
    misunderstanding: 'Wu wei is not laziness or doing nothing — it is action so aligned with the natural flow that it feels effortless.',
    complements: 'Alan Watts, Jiddu Krishnamurti, Thich Nhat Hanh',
    relatedTeachers: ['watts', 'krishnamurti', 'thich'],
    trap: 'Mistaking the call to non-forcing for passivity or avoidance of necessary action.',
    prompt: 'Where in your life are you pushing against the current instead of flowing with it?',
    books: ['Tao Te Ching'],
    note: 'Whether Lao Tzu existed as a single historical person is genuinely uncertain. The traditional account — a keeper of archives who met Confucius and wrote the book at a border crossing before disappearing westward — is legendary. Most scholars now regard the Tao Te Ching as a compiled text assembled over time, reaching something like its present form by the fourth or third century BCE. Read "Lao Tzu" as the name attached to a tradition rather than as a documented biography.',
  },
  {
    id: 'campbell',
    name: 'Joseph Campbell',
    era: '1904–1987',
    tradition: 'Comparative mythology',
    category: 'Depth & Shadow',
    lineage: 'The Hero\'s Journey',
    color: 'rgba(255,107,107,.14)',
    essence: 'Follow your bliss.',
    core: 'Campbell found a single pattern — the monomyth, or hero\'s journey — beneath the world\'s myths: a call to adventure, trials, transformation, and return. Myths are clues to the spiritual potential and meaning of a human life.',
    keyIdeas: ['The hero\'s journey (monomyth)', 'Follow your bliss', 'Myth as metaphor', 'The call to adventure', 'The return with the boon'],
    practice: 'Read your own life as a hero\'s journey: name the "call" you have been refusing, the threshold you fear to cross, and the gift you might bring back to others.',
    bestFor: 'Anyone seeking the mythic meaning beneath their personal struggles, choices, and creative calling.',
    misunderstanding: '"Follow your bliss" is not chase pleasure — it means follow the deep aliveness that calls you toward your authentic path, including its trials.',
    complements: 'Carl Jung, Jordan Peterson, Marie-Louise von Franz',
    relatedTeachers: ['jung', 'peterson', 'vonfranz'],
    trap: 'Romanticizing the journey while refusing the very call to adventure that would begin it.',
    prompt: 'What call to adventure have you been refusing, and what fear guards the threshold?',
    books: ['The Hero with a Thousand Faces', 'The Power of Myth', 'Myths to Live By'],
    note: 'The monomyth is a literary and interpretive framework, not an established finding about human cultures. Scholars of folklore and religion have criticised it for flattening genuine differences between traditions and for selecting evidence that fits the pattern. It remains an illuminating lens for reading stories and lives; it is not proof that all myths share one structure.',
  },
  {
    id: 'vonfranz',
    name: 'Marie-Louise von Franz',
    era: '1915–1998',
    tradition: 'Jungian psychology',
    category: 'Depth & Shadow',
    lineage: 'Fairy Tales & the Unconscious',
    color: 'rgba(124,92,255,.20)',
    essence: 'Fairy tales are the purest pictures of the psyche.',
    core: 'Jung\'s closest collaborator, von Franz showed how fairy tales, dreams, and alchemy reveal the archetypal processes of individuation — how the Self integrates the shadow and brings the personality toward wholeness.',
    keyIdeas: ['Individuation', 'Fairy tales as psychic maps', 'Integrating the shadow', 'Active imagination', 'Alchemy as inner transformation'],
    practice: 'Take a fairy tale or recurring dream and read each figure as a part of your own psyche — asking what is wounded, what is disowned, and what wants to become whole.',
    bestFor: 'Those drawn to Jungian depth work, dreams, symbols, and the inner path of individuation.',
    misunderstanding: 'Her work is not literary analysis for its own sake — the tales are read as living maps of psychological and spiritual transformation.',
    complements: 'Carl Jung, Joseph Campbell, Jordan Peterson',
    relatedTeachers: ['jung', 'campbell', 'peterson'],
    trap: 'Interpreting symbols intellectually while avoiding the actual inner work of meeting the shadow.',
    prompt: 'Which figure in your dreams or favorite stories might be a disowned part of yourself?',
    books: ['The Interpretation of Fairy Tales', 'Shadow and Evil in Fairy Tales', 'Alchemy'],
    note: 'Von Franz worked within analytical psychology, whose central concepts — archetypes, the collective unconscious, individuation — are theoretical frameworks rather than empirically established mechanisms. Her writing on divination and synchronicity is speculative even within that tradition. The dream and fairy-tale method is a contemplative and analytic practice, not a clinical treatment, and deep work of this kind is traditionally done with an analyst.',
  },
  {
    id: 'yogananda',
    name: 'Paramahansa Yogananda',
    era: '1893–1952',
    tradition: 'Kriya Yoga / Vedanta',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Self-Realization',
    color: 'rgba(255,209,102,.18)',
    essence: 'Self-realization is knowing the Self as the Divine.',
    core: 'Yogananda brought Kriya Yoga to the West, teaching that through meditation and precise technique one can directly experience God within as ever-new bliss, realizing the soul\'s unity with Spirit.',
    keyIdeas: ['Self-realization', 'Kriya Yoga', 'God as ever-new bliss', 'The spiritual eye', 'Unity of the great religions'],
    practice: 'Sit in daily meditation, interiorizing attention at the spiritual eye, calming the breath, and seeking the felt presence of the Divine as peace and joy within.',
    bestFor: 'Seekers wanting a devotional yet methodical path of meditation and direct inner experience.',
    misunderstanding: 'Kriya is not mere relaxation or belief — Yogananda presented it as a precise inner science for experiencing God directly.',
    complements: 'Michael Singer, Ram Dass, Manly P. Hall',
    relatedTeachers: ['singer', 'ramdass', 'hall'],
    trap: 'Reading about mystical experience while neglecting the daily discipline of meditation it rests on.',
    prompt: 'Are you seeking the Divine as an idea to believe, or as an experience to cultivate within?',
    books: ['Autobiography of a Yogi', 'The Science of Religion'],
    note: 'Autobiography of a Yogi contains many accounts of miracles — materialisations, bilocation, resurrection, an immortal guru named Babaji — presented as fact. These are devotional testimony within a tradition and are not independently documented. Kriya Yoga itself is given only under initiation and is not described in full in his books. His descriptions of meditation as a "science" use the word in the sense of a reliable method within his tradition, not of experimental verification.',
  },
  {
    id: 'steiner',
    name: 'Rudolf Steiner',
    era: '1861–1925',
    tradition: 'Anthroposophy',
    category: 'Esoteric & Metaphysical Wisdom',
    lineage: 'Spiritual Science',
    color: 'rgba(165,180,252,.18)',
    essence: 'The spiritual world can be known as exactly as the physical.',
    core: 'Steiner founded Anthroposophy as a "spiritual science": a disciplined path to develop higher perception and investigate spiritual realities, which he applied to education (Waldorf), agriculture (biodynamics), medicine, and art.',
    keyIdeas: [
      'Spiritual science',
      'Developing higher perception',
      'The threefold human being',
      'Karma and reincarnation',
      'Practical application (Waldorf, biodynamics)',
    ],
    practice: 'Practice disciplined inner exercises — focused thinking on a simple object, a daily review of the day backwards, and cultivating reverence — to strengthen clear, awake perception.',
    bestFor: 'Those drawn to a systematic Western esoteric path that joins spiritual insight with practical life.',
    misunderstanding: 'Anthroposophy is presented not as belief but as a path of trained perception — though its specific claims are best held thoughtfully and tested in experience.',
    complements: 'Manly P. Hall, Franz Bardon, Carl Jung',
    relatedTeachers: ['hall', 'bardon', 'jung'],
    trap: 'Accumulating an elaborate spiritual cosmology intellectually without the inner discipline it is meant to rest on.',
    prompt: 'What daily exercise of attention could make your inner perception clearer and more awake?',
    books: ['How to Know Higher Worlds', 'Theosophy', 'An Outline of Esoteric Science'],
    note: 'Steiner\'s cosmology — spiritual hierarchies, past planetary epochs, karma across lives, clairvoyant investigation of the Akashic record — rests entirely on his claimed spiritual perception and cannot be independently verified. Two areas need particular caution: anthroposophic medicine is not evidence-based and Waldorf communities have historically shown low vaccination rates and associated outbreaks; and some of his statements about race and national character, written in the idiom of his era, are regarded by many readers as racist and are the subject of ongoing debate within and outside the movement.',
  },
  {
    id: 'ramana',
    name: 'Ramana Maharshi',
    era: '1879–1950',
    tradition: 'Advaita Vedanta',
    category: 'Eastern Sages & Non-Duality',
    lineage: 'Self-Inquiry',
    color: 'rgba(255,209,102,.18)',
    essence: 'Ask "Who am I?" and follow it to the Source.',
    core: 'The "I"-thought is the root of every other thought and of the sense of a separate self. By tracing attention back to its source — asking "Who am I?" — the false self dissolves, and what remains is the Self: pure awareness that was never bound.',
    keyIdeas: ['Self-inquiry (atma vichara)', 'Who am I?', 'The I-thought as the root', 'The Self as pure awareness', 'Silence as the highest teaching'],
    practice: 'When a thought or feeling arises, gently ask "To whom does this arise? To me — who am I?" and rest attention in the bare sense of "I," letting it sink back into its source.',
    bestFor: 'Seekers drawn to the direct path of self-knowledge rather than technique, ritual, or gradual effort.',
    misunderstanding: 'Self-inquiry is not thinking about the question or answering it in words — it is turning attention back on the feeling of "I" until the questioner itself dissolves.',
    complements: 'Nisargadatta Maharaj, Jiddu Krishnamurti, Michael Singer',
    relatedTeachers: ['nisargadatta', 'krishnamurti', 'singer'],
    trap: 'Turning "Who am I?" into a mantra the mind repeats instead of an actual turning of attention to its source.',
    prompt: 'Before the next thought arrives, who is the one that is aware right now?',
    books: ['Who Am I?', 'Talks with Sri Ramana Maharshi', 'Be As You Are (ed. David Godman)'],
    note: 'Ramana wrote very little. Almost all of what circulates under his name was recorded by devotees — Talks with Sri Ramana Maharshi is a devotee\'s notebook of conversations, later translated — and the wording is therefore at one or two removes. Accounts of miracles around him are devotional testimony. His teaching is a contemplative path, not a treatment for psychological distress.',
  },
  {
    id: 'nisargadatta',
    name: 'Nisargadatta Maharaj',
    era: '1897–1981',
    tradition: 'Advaita Vedanta',
    category: 'Eastern Sages & Non-Duality',
    lineage: 'I Am That',
    color: 'rgba(165,180,252,.18)',
    essence: 'Stay with the sense "I Am" until it reveals its source.',
    core: 'Before all experience there is the simple knowledge "I am." Abiding in that pure sense of being — prior to name, body, and story — the mind grows quiet and reveals the absolute: the awareness in which "I am" itself arises and subsides.',
    keyIdeas: ['I Am', 'Abiding in beingness', 'Prior to consciousness', 'You are not the body-mind', 'The absolute beyond the manifest'],
    practice: 'Hold gently to the felt sense "I am" — not the words, but the bare fact of being — returning to it again and again until identification with the body and mind loosens.',
    bestFor: 'Those ready for an uncompromising, direct pointing beyond the person to pure being.',
    misunderstanding: '"I Am That" is not an affirmation to repeat — it points to resting as the wordless sense of being, prior to every idea about yourself.',
    complements: 'Ramana Maharshi, Jiddu Krishnamurti, Alan Watts',
    relatedTeachers: ['ramana', 'krishnamurti', 'watts'],
    trap: 'Collecting his radical statements as philosophy while never actually abiding in the "I am" he points to.',
    prompt: 'Can you rest in the simple sense that you are — before any thought about who you are?',
    books: ['I Am That', 'Prior to Consciousness', 'The Ultimate Medicine'],
    note: 'I Am That was assembled from tape-recorded conversations translated from Marathi by Maurice Frydman, who was himself a spiritual seeker and shaped the English considerably. Later collections come from different translators with noticeably different tones. Readers should treat particular phrasings as approximations rather than as exact words, and note that his late talks are markedly more radical than the earlier ones.',
  },
  {
    id: 'adyashanti',
    name: 'Adyashanti',
    era: 'Contemporary',
    tradition: 'Zen / Advaita synthesis',
    category: 'Eastern Sages & Non-Duality',
    lineage: 'The Way of Liberation',
    color: 'rgba(0,214,255,.16)',
    essence: 'Let everything be exactly as it is, and see what remains.',
    core: 'Blending Zen and non-dual wisdom, Adyashanti teaches awakening as the falling away of the illusion of a separate self — met not by force but by allowing experience to be as it is, and then embodying that realization in ordinary life.',
    keyIdeas: ['Allowing what is', 'The end of seeking', 'True meditation as effortless awareness', 'Embodying awakening', 'The trap of spiritual ego'],
    practice: 'True meditation: release all control of attention and effort, and simply allow everything to be as it is — resting as the awareness in which experience appears.',
    bestFor: 'Modern seekers wanting a clear, grounded, non-dogmatic path to awakening and its embodiment.',
    misunderstanding: 'Allowing what is is not passivity or indifference — it is a deep, alert openness from which clear, authentic action arises.',
    complements: 'Eckhart Tolle, Jiddu Krishnamurti, Michael Singer',
    relatedTeachers: ['tolle', 'krishnamurti', 'singer'],
    trap: 'Using "letting everything be" to bypass the real psychological and emotional work — spiritual bypassing.',
    prompt: 'What in this moment are you resisting that you could simply allow to be here?',
    books: ['The End of Your World', 'Falling into Grace', 'True Meditation'],
  },
  {
    id: 'mooji',
    name: 'Mooji',
    era: 'Contemporary',
    tradition: 'Advaita Vedanta',
    category: 'Eastern Sages & Non-Duality',
    lineage: 'Invitation to Freedom',
    color: 'rgba(56,242,155,.16)',
    essence: 'You are the awareness, not the passing thoughts and feelings.',
    core: 'In the lineage of Ramana and his own teacher Papaji, Mooji offers direct pointing to the awareness you already are. Through simple invitations and self-inquiry, attention turns from the changing contents of experience to the unchanging presence that witnesses them.',
    keyIdeas: ['You are the awareness', 'Direct pointing', 'The witness', 'Self-inquiry', 'Freedom is your nature'],
    practice: 'Notice that thoughts, feelings, and sensations come and go — then ask: what is the aware presence that never leaves? Rest as that witnessing awareness.',
    bestFor: 'Those wanting warm, accessible, direct guidance into recognizing awareness as their true nature.',
    misunderstanding: 'His simplicity is not superficial — the "invitation" points to an immediate recognition that can be as deep as any long discipline.',
    complements: 'Ramana Maharshi, Nisargadatta Maharaj, Eckhart Tolle',
    relatedTeachers: ['ramana', 'nisargadatta', 'tolle'],
    trap: 'Chasing repeated satsang experiences instead of living from the recognition they point to.',
    prompt: 'Who is aware of the thought you just had — and does that awareness ever come or go?',
    books: ['White Fire', 'Vaster Than Sky, Greater Than Space'],
    note: 'Mooji is a living teacher with a large following and a residential community in Portugal. In 2019 a number of former students published accounts alleging controlling group dynamics and inappropriate conduct; the organisation denied the allegations, and no findings were established. Readers should know the accounts exist, treat the matter as unresolved rather than settled either way, and apply the ordinary caution any devotional community warrants.',
  },
];

/* ── category + lineage metadata ───────────────────────────────────────── */

export const categoryNotes = {
  'Imagination & Inner State':
    'Teachers who hold that consciousness, imagination, and the feeling you assume are what shape the life that unfolds.',
  'New Thought & Spiritual Law':
    'The mental-science lineage — that thought, belief, and the spoken word move according to a dependable spiritual law.',
  'Esoteric & Metaphysical Wisdom':
    'Symbolic, hermetic, transcendental, and ancient-wisdom approaches that read reality as layered with meaning.',
  'Presence & Surrender':
    'Paths of letting go — resting as awareness, releasing resistance, and trusting the flow of life as it is.',
  'Eastern Sages & Non-Duality':
    'Direct-path masters who point beyond the person to awareness itself — through self-inquiry, abiding as being, and recognizing what you already are.',
  'Depth & Shadow':
    'Inner work that integrates the unconscious — meeting what we have disowned in order to become whole.',
  'Philosophy, Ethics & Logic':
    'Thinkers who sharpen truth, faith, ethics, reason, attention, and the responsibility of the individual mind.',
  'Psychology & Self-Development':
    'Modern psychological maps for meaning, motivation, mindset, identity, self-actualization, and growth.',
  'Wealth, Success & Creative Mindset':
    'Success teachers who connect self-image, discipline, purpose, state, and wealth consciousness with action.',
};

export const categories = [
  'Imagination & Inner State',
  'New Thought & Spiritual Law',
  'Esoteric & Metaphysical Wisdom',
  'Presence & Surrender',
  'Eastern Sages & Non-Duality',
  'Depth & Shadow',
  'Philosophy, Ethics & Logic',
  'Psychology & Self-Development',
  'Wealth, Success & Creative Mindset',
];

export const lineages = [...new Set(teachers.map((t) => t.lineage))].sort();

export const teacherById = Object.fromEntries(teachers.map((t) => [t.id, t]));

/* ── lookup helpers ────────────────────────────────────────────────────── */

export function getTeacher(id) {
  return id ? teacherById[id] || null : null;
}

export function isTeacherId(id) {
  return Boolean(id) && Object.prototype.hasOwnProperty.call(teacherById, id);
}

export function teachersInCategory(category) {
  return teachers.filter((t) => t.category === category);
}

/** Resolve a teacher's relatedTeachers ids into teacher objects (dropping any
 *  that no longer exist), each paired with the note explaining the link. */
export function relatedTeachersOf(teacher) {
  if (!teacher || !teacher.relatedTeachers) return [];
  return teacher.relatedTeachers
    .map((id) => {
      const related = teacherById[id];
      if (!related) return null;
      return { teacher: related, note: teacher.relatedNotes?.[id] || '' };
    })
    .filter(Boolean);
}

/** The reading list, structured where available and falling back to the
 *  compact `books` array so no teacher loses their titles. */
export function readingListOf(teacher) {
  if (teacher?.reading?.length) return teacher.reading;
  return (teacher?.books || []).map((title) => ({ title }));
}

export function randomTeacher() {
  return teachers[Math.floor(Math.random() * teachers.length)];
}

/* ── search ────────────────────────────────────────────────────────────── */

// Fields that feed the library search. Nested structures are flattened
// deliberately below rather than being stringified — joining objects with
// String() would put "[object Object]" into the haystack and quietly break
// matching on the expanded profile content.
// The profile-layer keys in this list only contribute once a teacher has been
// merged with its profile — searching bare cards simply matches less. The atlas
// loads the profiles the first time someone types and re-runs the filter, so
// deep matches appear a moment after shallow ones rather than not at all.
const SEARCHABLE_KEYS = [
  'name', 'era', 'tradition', 'category', 'lineage',
  'essence', 'core', 'practice', 'bestFor', 'complements',
  'misunderstanding', 'trap', 'prompt', 'note',
  'keyIdeas', 'books',
  'overview', 'context', 'teachings', 'practiceSteps', 'example',
  'distinctions', 'cautions', 'relatedNotes', 'reading', 'reflectionQuestions',
];

/** Recursively collect the string leaves of a value (string, array, or plain
 *  object) so nested profile content stays searchable as plain text. */
function collectText(value, out) {
  if (!value) return;
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectText(item, out);
  } else if (typeof value === 'object') {
    for (const item of Object.values(value)) collectText(item, out);
  }
}

/** Flatten every searchable field of a teacher into one lowercase string. */
export function teacherSearchText(teacher) {
  const parts = [];
  for (const key of SEARCHABLE_KEYS) collectText(teacher[key], parts);
  return parts.join(' ').toLowerCase();
}

// Flattening is not free and the search runs on every keystroke, so each
// object's haystack is built once. Keyed on the object rather than the id
// because a card and that card merged with its profile are two different
// haystacks for the same teacher, and both are asked about: the atlas hands
// over cards until the profiles land, then the merged set.
const searchTextByTeacher = new WeakMap();

function haystackFor(teacher) {
  let hay = searchTextByTeacher.get(teacher);
  if (hay === undefined) {
    hay = teacherSearchText(teacher);
    searchTextByTeacher.set(teacher, hay);
  }
  return hay;
}

export function teacherMatches(teacher, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return haystackFor(teacher).includes(q);
}

/* ── development-time integrity checks ─────────────────────────────────── */

const REQUIRED_FIELDS = [
  'id', 'name', 'era', 'tradition', 'category', 'lineage',
  'color', 'essence', 'core', 'practice', 'bestFor', 'trap', 'prompt',
];

const SHAPES = {
  teachings: ['title', 'explanation', 'significance'],
  practiceSteps: ['title', 'instruction'],
  distinctions: ['label', 'clarification'],
  cautions: ['title', 'detail'],
  reading: ['title'],
};

/** Returns a list of problems with the teacher data. Exported so it can be
 *  called from a test or a console; run automatically in dev builds below. */
export function validateTeachers(list = teachers) {
  const problems = [];
  const seen = new Set();
  const ids = new Set(list.map((t) => t.id));

  for (const t of list) {
    const label = t.id || t.name || '(unnamed teacher)';

    if (!t.id) problems.push(`${label}: missing id`);
    else if (seen.has(t.id)) problems.push(`${label}: duplicate id`);
    else seen.add(t.id);

    for (const field of REQUIRED_FIELDS) {
      if (!t[field]) problems.push(`${label}: missing required field "${field}"`);
    }

    if (!categories.includes(t.category)) {
      problems.push(`${label}: category "${t.category}" is not in the categories list`);
    }

    if (!Array.isArray(t.keyIdeas) || t.keyIdeas.length === 0) {
      problems.push(`${label}: keyIdeas must be a non-empty array`);
    }

    for (const relId of t.relatedTeachers || []) {
      if (!ids.has(relId)) problems.push(`${label}: relatedTeachers id "${relId}" does not resolve`);
    }

    for (const relId of Object.keys(t.relatedNotes || {})) {
      if (!(t.relatedTeachers || []).includes(relId)) {
        problems.push(`${label}: relatedNotes has "${relId}" which is not in relatedTeachers`);
      }
    }

    if (t.overview && !Array.isArray(t.overview)) {
      problems.push(`${label}: overview must be an array of paragraphs`);
    }

    if (t.reflectionQuestions && !Array.isArray(t.reflectionQuestions)) {
      problems.push(`${label}: reflectionQuestions must be an array`);
    }

    if (t.example && !t.example.scenario) {
      problems.push(`${label}: example is missing a scenario`);
    }

    for (const [field, keys] of Object.entries(SHAPES)) {
      const value = t[field];
      if (value === undefined) continue;
      if (!Array.isArray(value)) {
        problems.push(`${label}: ${field} must be an array`);
        continue;
      }
      value.forEach((entry, i) => {
        if (!entry || typeof entry !== 'object') {
          problems.push(`${label}: ${field}[${i}] must be an object`);
          return;
        }
        for (const key of keys) {
          if (!entry[key]) problems.push(`${label}: ${field}[${i}] is missing "${key}"`);
        }
      });
    }
  }

  return problems;
}

// Card-layer drift is caught while editing. The profile layer is not loaded
// here, so its shape checks skip — src/data/__tests__/wisdomTeachers.test.js
// runs this same function over every teacher merged with its profile, which is
// what holds the long-form content to its shape in CI.
if (import.meta.env?.DEV) {
  const problems = validateTeachers();
  if (problems.length) {
    // Surfaced only in development so data drift is caught while editing.
    console.warn(`[wisdomTeachers] ${problems.length} data problem(s):\n- ${problems.join('\n- ')}`);
  }
}
