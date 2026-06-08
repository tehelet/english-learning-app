'use client';

import { Home, MessageSquare, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'בית', icon: Home },
    { href: '/conversation', label: 'שיחה', icon: MessageSquare },
    { href: '/vocabulary', label: 'אוצר מילים', icon: BookOpen },
  ];

  return (
    <nav
      className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
          English Learning Platform
        </h1>

        <div className="flex gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
