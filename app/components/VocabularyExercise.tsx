'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import FeedbackCard from './FeedbackCard';
import type { VocabularyItem } from '@/types';

interface VocabularyExerciseProps {
  words: VocabularyItem[];
  category: 'idioms' | 'phrasal-verbs' | 'academic' | 'business';
  difficulty: 'intermediate' | 'advanced';
}

export default function VocabularyExercise({
  words,
  category,
  difficulty,
}: VocabularyExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mastered, setMastered] = useState<Set<number>>(new Set());
  const [showDefinition, setShowDefinition] = useState(false);

  const current = words[currentIndex];
  const isMastered = mastered.has(currentIndex);

  const handleMaster = () => {
    setMastered((prev) => new Set([...prev, currentIndex]));
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowDefinition(false);
    }
  };

  const categoryLabels = {
    idioms: 'ביטויים',
    'phrasal-verbs': 'Phrasal Verbs',
    academic: 'אוצר אקדמי',
    business: 'אוצר עסקי',
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 px-6 py-8"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {categoryLabels[category]}
          </h1>
          <p className="text-surface-600 dark:text-surface-400">
            רמה: {difficulty === 'advanced' ? 'מתקדמת' : 'ביניים'}
          </p>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / words.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
            {currentIndex + 1} מתוך {words.length}
          </p>
        </div>

        {/* Word Card */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 font-english">
              {current.word}
            </h2>
            <p className="text-sm text-accent-600 dark:text-accent-400 font-semibold">
              {current.partOfSpeech}
            </p>
          </div>

          {/* Toggle Definition Button */}
          <button
            onClick={() => setShowDefinition(!showDefinition)}
            className="mb-6 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors text-sm font-medium"
          >
            {showDefinition ? 'הסתר הגדרה' : 'הראה הגדרה'}
          </button>

          {/* Definition */}
          {showDefinition && (
            <div className="mb-6 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
              <p className="text-base leading-relaxed mb-4">{current.definition}</p>

              {/* Example */}
              <div>
                <p className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                  דוגמה:
                </p>
                <p className="text-sm italic text-surface-600 dark:text-surface-400 font-english">
                  {current.example}
                </p>
              </div>

              {/* Alternatives */}
              {current.alternatives && current.alternatives.length > 0 && (
                <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                  <p className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    חלופות דומות:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.alternatives.map((alt, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 rounded-full text-sm font-english"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Master Button */}
          {!isMastered && (
            <button
              onClick={handleMaster}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors mb-3"
            >
              זכור המילה
            </button>
          )}

          {isMastered && (
            <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle size={20} />
              <span>מצוין! זכרת את המילה הזאת</span>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-surface-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>המילה הבאה</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-4">התקדמות</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {mastered.size}
              </p>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                מילים שזכרת
              </p>
            </div>
            <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
              <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                {words.length - mastered.size}
              </p>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                עדיין להשיג
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
