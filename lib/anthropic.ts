const Groq = require('groq-sdk');

export const groq = new Groq.default({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function analyzeEnglishSpeech(
  transcription: string,
  context?: string
): Promise<{
  feedback: string;
  corrections: Array<{ original: string; suggestion: string; reason: string }>;
  score: number;
}> {
  const response = await groq.chat.completions.create({
    model: 'mixtral-8x7b-32768',
    max_tokens: 1024,
    messages: [
      {
        role: 'system',
        content: `אתה מורה אנגלית מיומן המתמחה בלימוד מתקדם.

כאשר משתמש משדר טקסט, עליך:
1. לנתח את דיוקי הדקדוק, בחירת מילים, והשימוש בביטויים
2. לספק הערות מפורטות בעברית בלבד
3. להצע חלופות טובות יותר
4. לתן ציון מ-1-10 על איכות ההפקה

ענה בעברית בלבד. אם יש שגיאות, הסבר מדוע זה לא נכון ואיך לתקן.`,
      },
      {
        role: 'user',
        content: `בדוק את הטקסט הבא וספק הערות מפורטות בעברית:\n\n"${transcription}"${
          context ? `\n\nהקשר: ${context}` : ''
        }`,
      },
    ],
  });

  const content =
    response.choices[0]?.message?.content || 'Error processing response';

  return {
    feedback: content,
    corrections: [],
    score: 7,
  };
}

export async function generateConversationResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>,
  topic?: string
): Promise<string> {
  const systemPrompt = `אתה מדריך אנגלית מוקדש המתמחה בעבודה עם דוברים מתקדמים של עברית.

הוראות:
1. שקול את רמתו של המשתמש - הוא דובר עברית במצב מתקדם באנגלית
2. העלה נושאים מורכבים: ביטויים, טונים תרבותיים, ניואנסים בשפה
3. הערות את בחירות המילים שלו וקדימות
4. הסבר תמיד בעברית בלבד
5. שאל שאלות חוקרניות כדי להרחיב את השיח

${topic ? `הנושא העיקרי: ${topic}` : ''}

תמיד הרחב את הקשר וזקוף קריאות לחשיבה מחודשת.`;

  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
    { role: 'user' as const, content: systemPrompt },
    ...conversationHistory.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: userMessage },
  ];

  const response = await groq.chat.completions.create({
    model: 'mixtral-8x7b-32768',
    max_tokens: 1500,
    messages: messages,
  });

  return response.choices[0]?.message?.content || 'Error generating response';
}

export async function analyzeVocabularyUsage(word: string, context: string): Promise<{
  definition: string;
  usage: string;
  alternatives: string[];
  explanation: string;
}> {
  const response = await groq.chat.completions.create({
    model: 'mixtral-8x7b-32768',
    max_tokens: 512,
    messages: [
      {
        role: 'system',
        content: `אתה מומחה לאוצר מילים אנגלית מתקדם.

תמיד תשיב בעברית בלבד. כאשר מתבקש לנתח מילה:
1. הגדר אותה בקצרה
2. הסבר את השימוש הנכון
3. תן חלופות דומות
4. הסבר מתי להשתמש בה`,
      },
      {
        role: 'user',
        content: `נתח את המילה "${word}" בהקשר זה: "${context}"`,
      },
    ],
  });

  const text =
    response.choices[0]?.message?.content || 'Error analyzing vocabulary';

  return {
    definition: 'Definition extracted from response',
    usage: 'Usage extracted from response',
    alternatives: [],
    explanation: text,
  };
}
