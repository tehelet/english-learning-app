import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'English Learning Platform - פלטפורמת למידת אנגלית',
  description:
    'פלטפורמה מתקדמת לשיפור מיומנויות אנגלית עם AI coach ודוברות בעברית',
  keywords: [
    'English Learning',
    'AI Tutor',
    'Advanced English',
    'Hebrew UI',
    'Speech Recognition',
  ],
  authors: [{ name: 'English Learning Team' }],
  openGraph: {
    title: 'English Learning Platform',
    description: 'Advanced English learning with AI-powered feedback',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
        {children}
      </body>
    </html>
  );
}
