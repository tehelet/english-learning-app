'use client';

import { useState } from 'react';
import ConversationUI from '../components/ConversationUI';

const topics = [
  'Free Conversation',
  'Technology & AI',
  'Startups & Business',
  'Philosophy & Ideas',
  'Travel & Culture',
  'Science & Nature',
  'Literature & Arts',
];

export default function ConversationPage() {
  const [selectedTopic, setSelectedTopic] = useState('Free Conversation');
  const [isStarted, setIsStarted] = useState(false);

  if (isStarted) {
    return <ConversationUI topic={selectedTopic} difficulty="advanced" />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 px-6 py-12"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            שיחה עם מדריך AI
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            בחר נושא והתחל שיחה מעמיקה באנגלית עם AI coach המדבר עברית
          </p>
        </div>

        {/* Topic Selection */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50 mb-6">
            בחר נושא:
          </h2>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`p-4 rounded-lg text-right font-medium transition-all border-2 ${
                  selectedTopic === topic
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg text-sm text-blue-900 dark:text-blue-100 mb-8">
            <p className="font-semibold mb-1">💡 טיפ:</p>
            <p>
              בחר נושא שמעניין אותך. AI coach יהיה מוכן לחקור את הנושא בעומק
              ולתת לך הערות על הדקדוק, המילים וההשפעה שלך.
            </p>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-lg transition-colors"
          >
            התחל שיחה
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-lg text-surface-900 dark:text-surface-50 mb-4">
            איך זה עובד:
          </h3>
          <ol className="space-y-3 text-surface-700 dark:text-surface-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <span>בחר נושא שמעניין אותך לשיחה</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <span>
                הקלט או הקלד את הודעתך בעברית או באנגלית
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <span>
                קבל תשובה מזוינת מ-AI coach עם הערות על כישוריך
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <span>המשך את השיחה, וIMPROVE כל פעם</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
