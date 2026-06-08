export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getReadingSuggestion(text: string): string[] {
  const suggestions: string[] = [];

  if (text.length < 20) {
    suggestions.push('נסה להרחיב את התשובה שלך עם פרטים נוספים');
  }

  if (text.split(' ').length < 5) {
    suggestions.push('השתמש במשפטים מורכבים יותר');
  }

  const commonMistakes = [
    { pattern: /\bthat\b/i, suggestion: 'שקול אם להשתמש ב-which במקום that' },
    {
      pattern: /\bcan\b/i,
      suggestion: 'בשיח מתקדם, שקול להשתמש ב-be able to',
    },
    {
      pattern: /\bvery\b/i,
      suggestion: 'מילה חלשה - שקול חלופות כמו "extremely" או "incredibly"',
    },
  ];

  for (const mistake of commonMistakes) {
    if (mistake.pattern.test(text)) {
      suggestions.push(mistake.suggestion);
    }
  }

  return suggestions;
}

export function calculateFluencyScore(
  wordCount: number,
  uniqueWords: number,
  pauses: number
): number {
  let score = 50;
  score += Math.min(wordCount / 2, 20);
  score += Math.min(uniqueWords / 10, 20);
  score -= Math.min(pauses * 2, 10);
  return Math.min(Math.max(score, 1), 100);
}

export function saveToLocalStorage(key: string, data: unknown): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
