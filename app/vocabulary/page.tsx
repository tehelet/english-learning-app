'use client';

import { useState } from 'react';
import VocabularyExercise from '../components/VocabularyExercise';
import type { VocabularyExercise as VocabularyExerciseType } from '@/types';

const vocabularyData: Record<string, VocabularyExerciseType> = {
  idioms: {
    id: '1',
    category: 'idioms',
    difficulty: 'advanced',
    items: [
      {
        word: 'Break the ice',
        partOfSpeech: 'Idiom',
        definition:
          'להתחיל שיחה או להתחבר לאנשים שאתה לא מכיר, בדרך כלל בסיטואציה מביכה',
        example: "Sarah decided to break the ice by asking about everyone's weekend.",
        alternatives: ['Get the conversation started', 'Make a good impression'],
      },
      {
        word: 'Piece of cake',
        partOfSpeech: 'Idiom',
        definition: 'משהו שקל מאוד לעשות',
        example:
          'The exam was a piece of cake for students who studied thoroughly.',
        alternatives: ['Easy', 'Simple as pie', 'Child\'s play'],
      },
      {
        word: 'Hit the nail on the head',
        partOfSpeech: 'Idiom',
        definition: 'להגיד משהו שנכון לגמרי או ישירות לנקודה',
        example:
          'Your analysis really hit the nail on the head about the company\'s problems.',
        alternatives: ['Get it right', 'Identify the problem', 'Be absolutely correct'],
      },
      {
        word: 'Under the weather',
        partOfSpeech: 'Idiom',
        definition: 'להרגיש לא טוב או חלש פיזית',
        example:
          "I'm feeling a bit under the weather, so I might skip the party tonight.",
        alternatives: ['Sick', 'Unwell', 'Ill'],
      },
      {
        word: 'Cross that bridge when we come to it',
        partOfSpeech: 'Idiom',
        definition: 'להתמודד עם בעיה רק כשזה יקרה, לא לדאוג מראש',
        example:
          'We can plan the details later. Let\'s cross that bridge when we come to it.',
        alternatives: [
          'Deal with it later',
          'Focus on the present',
          'Worry about it when it happens',
        ],
      },
    ],
  },
  'phrasal-verbs': {
    id: '2',
    category: 'phrasal-verbs',
    difficulty: 'advanced',
    items: [
      {
        word: 'Bring up',
        partOfSpeech: 'Phrasal Verb',
        definition:
          'להזכיר נושא בשיחה או לגדל ילד (תלוי בהקשר)',
        example:
          'She brought up the important issue during the meeting.',
        alternatives: ['Mention', 'Raise', 'Introduce', 'Educate'],
      },
      {
        word: 'Put off',
        partOfSpeech: 'Phrasal Verb',
        definition: 'לדחות משהו לזמן מאוחר יותר',
        example:
          "Don't put off your homework. It's due tomorrow.",
        alternatives: ['Postpone', 'Delay', 'Procrastinate'],
      },
      {
        word: 'Look into',
        partOfSpeech: 'Phrasal Verb',
        definition: 'לחקור או לבדוק משהו בעומק',
        example:
          'The police are looking into the mysterious disappearance.',
        alternatives: ['Investigate', 'Examine', 'Research', 'Check'],
      },
      {
        word: 'Come up with',
        partOfSpeech: 'Phrasal Verb',
        definition: 'להמציא או להציע רעיון חדש',
        example:
          'The team came up with an innovative solution to the problem.',
        alternatives: ['Invent', 'Suggest', 'Propose', 'Think of'],
      },
      {
        word: 'Back up',
        partOfSpeech: 'Phrasal Verb',
        definition:
          'לתמוך במישהו או לעשות עותק של נתונים (במחשב)',
        example:
          'I always back up my important files on an external drive.',
        alternatives: ['Support', 'Copy', 'Assist'],
      },
    ],
  },
  academic: {
    id: '3',
    category: 'academic',
    difficulty: 'advanced',
    items: [
      {
        word: 'Substantiate',
        partOfSpeech: 'Verb',
        definition:
          'להוכיח או לתמוך בטענה עם עדויות או נתונים',
        example:
          'The researcher had to substantiate her hypothesis with empirical data.',
        alternatives: ['Prove', 'Verify', 'Support', 'Validate'],
      },
      {
        word: 'Quintessential',
        partOfSpeech: 'Adjective',
        definition: 'ייצוג מושלם או סופי של משהו',
        example:
          'Jazz is the quintessential American art form.',
        alternatives: ['Perfect', 'Ideal', 'Typical', 'Characteristic'],
      },
      {
        word: 'Paradigm',
        partOfSpeech: 'Noun',
        definition: 'מודל או דפוס שמשמש כדוגמה או הצגה',
        example:
          'The scientific revolution marked a paradigm shift in how we understand the universe.',
        alternatives: ['Model', 'Pattern', 'Framework', 'Standard'],
      },
      {
        word: 'Elucidate',
        partOfSpeech: 'Verb',
        definition: 'להסביר משהו בדרך ברורה',
        example:
          'The professor will elucidate the complex concepts in the next lecture.',
        alternatives: ['Clarify', 'Explain', 'Illuminate', 'Describe'],
      },
      {
        word: 'Meticulous',
        partOfSpeech: 'Adjective',
        definition: 'קפדני מאוד, עם תשומת לב גבוהה לפרטים',
        example:
          'Her meticulous research methodology ensured accurate results.',
        alternatives: ['Careful', 'Precise', 'Thorough', 'Detailed'],
      },
    ],
  },
  business: {
    id: '4',
    category: 'business',
    difficulty: 'advanced',
    items: [
      {
        word: 'Leverage',
        partOfSpeech: 'Verb/Noun',
        definition:
          'להשתמש במשהו בכדי להשיג יתרון או להנפיק הלוואה כדי לממן עסק',
        example:
          'The company can leverage its strong brand to enter new markets.',
        alternatives: [
          'Use',
          'Exploit',
          'Utilize',
          'Take advantage',
        ],
      },
      {
        word: 'Streamline',
        partOfSpeech: 'Verb',
        definition: 'להפוך תהליך יעיל יותר על ידי הסרת חלקים מיותרים',
        example:
          'We need to streamline our supply chain to reduce costs.',
        alternatives: [
          'Simplify',
          'Optimize',
          'Improve',
          'Make efficient',
        ],
      },
      {
        word: 'Synergy',
        partOfSpeech: 'Noun',
        definition:
          'השילוב של שני דברים בכדי להחזיק תוצאה גדולה מסך הכולל',
        example:
          'The merger created synergy between the two companies.',
        alternatives: ['Cooperation', 'Collaboration', 'Combined effect'],
      },
      {
        word: 'Trajectory',
        partOfSpeech: 'Noun',
        definition:
          'הקורס או כיוונו של משהו, כמו חברה או קריירה',
        example:
          'The startup is on an impressive growth trajectory.',
        alternatives: [
          'Path',
          'Course',
          'Direction',
          'Trend',
        ],
      },
      {
        word: 'Due diligence',
        partOfSpeech: 'Phrase',
        definition:
          'בדיקה יסודית של פרטים של עסקה או השקעה לפני קבלת החלטה',
        example:
          'Investors conduct thorough due diligence before funding a startup.',
        alternatives: [
          'Thorough investigation',
          'Careful research',
          'Verification',
        ],
      },
    ],
  },
};

export default function VocabularyPage() {
  const categories = ['idioms', 'phrasal-verbs', 'academic', 'business'] as const;
  const categoryLabels = {
    idioms: 'ביטויים',
    'phrasal-verbs': 'Phrasal Verbs',
    academic: 'אוצר אקדמי',
    business: 'אוצר עסקי',
  };

  const [selectedCategory, setSelectedCategory] = useState<
    'idioms' | 'phrasal-verbs' | 'academic' | 'business'
  >('idioms');
  const [isStarted, setIsStarted] = useState(false);

  if (isStarted) {
    return (
      <VocabularyExercise
        words={vocabularyData[selectedCategory].items}
        category={selectedCategory}
        difficulty="advanced"
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 px-6 py-12"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            תרגול אוצר מילים
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            שיפור מילים מתקדמות, ביטויים ו-phrasal verbs
          </p>
        </div>

        {/* Category Selection */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50 mb-6">
            בחר קטגוריה:
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg font-medium transition-all border-2 ${
                  selectedCategory === category
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
            <p className="text-sm text-green-900 dark:text-green-100">
              <span className="font-semibold">✓ {vocabularyData[selectedCategory].items.length} מילים</span> בקטגוריה זו
            </p>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-lg transition-colors"
          >
            התחל את התרגול
          </button>
        </div>

        {/* Description Card */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-lg text-surface-900 dark:text-surface-50 mb-4">
            איך לתרגל:
          </h3>
          <ul className="space-y-3 text-surface-700 dark:text-surface-300">
            <li className="flex gap-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                1.
              </span>
              <span>ראה את המילה וחשוב על המשמעות</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                2.
              </span>
              <span>לחץ על "הראה הגדרה" כדי לוודא את ההבנה שלך</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                3.
              </span>
              <span>לחץ "זכור את המילה" כשאתה בטוח בהגדרה</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                4.
              </span>
              <span>עבור למילה הבאה והמשך לתרגל</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
