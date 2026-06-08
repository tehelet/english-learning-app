'use client';

import Link from 'next/link';
import { MessageSquare, BookOpen, Mic, Zap, Target, Globe } from 'lucide-react';
import Header from './components/Header';

export default function Home() {
  const features = [
    {
      icon: MessageSquare,
      title: 'שיחה חופשית',
      description:
        'שוחח עם AI coach על נושאים מורכבים וקבל הערות בעברית',
      href: '/conversation',
      gradient: 'from-blue-500 to-indigo-600',
      lightGradient: 'from-blue-50 to-indigo-50',
      emoji: '💬',
    },
    {
      icon: BookOpen,
      title: 'אוצר מילים',
      description:
        'תרגול ביטויים, phrasal verbs ואוצר אקדמי בהקשר מתקדם',
      href: '/vocabulary',
      gradient: 'from-emerald-500 to-teal-600',
      lightGradient: 'from-emerald-50 to-teal-50',
      emoji: '📚',
    },
    {
      icon: Mic,
      title: 'ניתוח דיבור',
      description:
        'שימוש בקול שלך לתרגול עם משוב מפורט על ההגייה והדקדוק',
      href: '/conversation',
      gradient: 'from-orange-500 to-red-600',
      lightGradient: 'from-orange-50 to-red-50',
      emoji: '🎤',
    },
  ];

  const benefits = [
    { icon: '🇬🇧', title: 'מתקדמים בחו"ל', text: 'דוברי עברית שרוצים להגיע לרמה גבוהה' },
    { icon: '🤖', title: 'AI בעברית', text: 'הסברים וחומר לימוד בעברית בלבד' },
    { icon: '✨', title: 'הערות חכמות', text: 'משוב מותאם לרמתך ולמטרות שלך' },
    { icon: '📱', title: 'עובד בכל מקום', text: 'מחשב, טאבלט או טלפון - בכל מכان' },
    { icon: '🎯', title: 'ממוקד ויעיל', text: 'למד בקצב שלך עם תרגולים מעשיים' },
    { icon: '🚀', title: 'בשחקנות רבה', text: 'תרגל שיחות אמיתיות ומורכבות' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              🚀 אנגלית מתקדמת <br />
              <span className="bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                עם AI Coach
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              פלטפורמה מהנדסת לדוברי עברית שרוצים לשפר את האנגלית שלהם עם AI coach מהומה המדבר עברית בשטף
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group"
              >
                <div
                  className={`bg-gradient-to-br ${feature.lightGradient} dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 h-full cursor-pointer`}
                >
                  <div className="text-5xl mb-4 block">{feature.emoji}</div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white font-semibold text-sm group-hover:gap-3 transition-all`}>
                    <span>התחל עכשיו</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            למה בחירה חכמה?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            אנחנו בנינו את הפלטפורמה הזו על בסיס מה שהעלה אתכם לרמה גבוהה
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl m-4 md:m-6 md:mx-auto md:max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            מוכן להתחיל?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            בחר תכונה וכנס לעולם של למידה חכמה עם AI coach שדבר עברית
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/conversation"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              שיחה עם AI 💬
            </Link>
            <Link
              href="/vocabulary"
              className="px-8 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-700 transition-colors border-2 border-white"
            >
              תרגול מילים 📚
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-8 border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© 2024 English Learning Platform. בנוי עם ❤️ לדוברי עברית</p>
        </div>
      </footer>
    </div>
  );
}
