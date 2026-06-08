'use client';

import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface FeedbackItemProps {
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'fluency' | 'suggestion';
  title: string;
  content: string;
  severity?: 'minor' | 'moderate' | 'significant';
}

export default function FeedbackCard({
  type,
  title,
  content,
  severity = 'minor',
}: FeedbackItemProps) {
  const getIcon = () => {
    if (type === 'suggestion') return <Info size={20} />;
    if (severity === 'significant') return <AlertCircle size={20} />;
    return <CheckCircle size={20} />;
  };

  const getColor = () => {
    if (type === 'suggestion')
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100';
    if (severity === 'significant')
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100';
    if (severity === 'moderate')
      return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100';
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100';
  };

  return (
    <div
      className={`p-4 rounded-lg border-l-4 flex gap-3 animate-fade-in ${getColor()}`}
      dir="rtl"
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
