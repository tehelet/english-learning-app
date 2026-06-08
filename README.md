# English Learning Platform - פלטפורמת למידת אנגלית

An advanced AI-powered English learning platform designed for Hebrew speakers at an intermediate-to-advanced English level. The entire interface is in Hebrew with RTL support, providing AI feedback in Hebrew to help learners understand nuances and corrections.

## Features

### 🎯 Core Features

1. **AI Conversation Tutor** - Practice free-flowing conversations with Claude AI on complex topics (technology, philosophy, career development, etc.)
2. **Speech Recognition** - Use your voice with the Web Speech API for real-time speech-to-text
3. **AI Feedback** - Get detailed feedback on grammar, vocabulary, pronunciation, and fluency entirely in Hebrew
4. **Vocabulary Exercises** - Master idioms, phrasal verbs, academic and business terminology
5. **Hebrew UI** - Complete RTL interface designed for Hebrew speakers

## Technical Stack

- **Frontend**: React with Next.js 14 (App Router)
- **Styling**: Tailwind CSS with RTL support
- **AI Backend**: Claude API (Anthropic)
- **Speech**: Web Speech API (browser native)
- **Language**: TypeScript
- **Hosting**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ (with npm or yarn)
- An Anthropic API key (get one at https://console.anthropic.com)
- A modern browser with Web Speech API support

### Installation

1. **Clone or download the project**
   ```bash
   cd english-learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
english-learning-app/
├── app/
│   ├── api/                    # Next.js API routes
│   │   ├── chat/route.ts      # Main conversation endpoint
│   │   └── analyze-speech/    # Speech analysis endpoint
│   ├── components/             # React components
│   │   ├── ConversationUI.tsx # Main conversation interface
│   │   ├── SpeechRecorder.tsx # Voice input component
│   │   ├── FeedbackCard.tsx   # Feedback display
│   │   ├── VocabularyExercise.tsx
│   │   └── Header.tsx
│   ├── conversation/           # Conversation page
│   ├── vocabulary/             # Vocabulary exercises page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── lib/
│   ├── anthropic.ts           # Claude API client
│   └── utils.ts               # Helper functions
├── types/
│   └── index.ts               # TypeScript type definitions
├── public/                     # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind configuration
└── next.config.js             # Next.js configuration
```

## Usage Guide

### Starting a Conversation

1. Navigate to the **שיחה** (Conversation) page
2. Select a topic or leave it as "Free Conversation"
3. Either:
   - Click the mic button and speak in English
   - Type your message in Hebrew or English
4. Receive AI feedback entirely in Hebrew

### Vocabulary Practice

1. Go to **אוצר מילים** (Vocabulary) page
2. Choose a category:
   - **ביטויים** (Idioms)
   - **Phrasal Verbs**
   - **אוצר אקדמי** (Academic)
   - **אוצר עסקי** (Business)
3. Study each word with definitions and examples
4. Mark words as "mastered" to track progress

## Features in Detail

### Speech Recognition

- Real-time speech-to-text using Web Speech API
- Supports English input
- Visual feedback while recording
- Automatic transcript generation

### AI Coaching

The Claude API is configured with a Hebrew-speaking system prompt that:
- Acts as an advanced English coach
- Provides feedback ONLY in Hebrew
- Explains grammar mistakes and vocabulary choices
- Suggests improvements and corrections
- Engages with complex topics suitable for advanced learners

### Vocabulary System

Includes pre-loaded vocabulary in 4 categories:
- **Idioms**: Common English expressions (break the ice, piece of cake, etc.)
- **Phrasal Verbs**: Verb + preposition combinations (bring up, put off, look into, etc.)
- **Academic**: Advanced vocabulary for formal writing (substantiate, paradigm, elucidate, etc.)
- **Business**: Professional terminology (leverage, synergy, due diligence, etc.)

## Customization

### Adding Custom Vocabulary

Edit `app/vocabulary/page.tsx` and add items to the `vocabularyData` object:

```typescript
{
  word: 'Your word',
  partOfSpeech: 'Verb/Noun/Adjective',
  definition: 'Hebrew definition',
  example: 'English example sentence',
  alternatives: ['Similar word 1', 'Similar word 2'],
}
```

### Changing Topics

In `app/conversation/page.tsx`, modify the `topics` array:

```typescript
const topics = [
  'Your Custom Topic',
  // ... more topics
];
```

### Styling

All styling uses Tailwind CSS classes. Modify colors and fonts in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles and custom animations

## API Endpoints

### POST `/api/chat`

**Request:**
```json
{
  "message": "Your message in English",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ],
  "topic": "Technology"
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI response in Hebrew"
}
```

### POST `/api/analyze-speech`

**Request:**
```json
{
  "transcription": "Your English text",
  "context": "Topic or context"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "feedback": "Feedback in Hebrew",
    "score": 85,
    "corrections": [...]
  }
}
```

## Browser Support

- Chrome/Edge 25+
- Firefox 25+
- Safari 14.1+
- Mobile browsers with Web Speech API support

**Note**: Web Speech API support varies by browser. Chrome has the best support.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variable `ANTHROPIC_API_KEY`
4. Deploy

```bash
vercel
```

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS
- Google Cloud
- Heroku
- Any Node.js hosting

## Performance Optimization

- Images optimized with Next.js Image component
- Code splitting for faster initial load
- Tailwind CSS purges unused styles
- API routes optimized for serverless

## Accessibility

- Full RTL support for Hebrew users
- Semantic HTML with proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme options

## Known Limitations

1. **Web Speech API**: Browser support varies; Chrome/Edge have best support
2. **API Rate Limiting**: Anthropic API has rate limits; implement caching for production
3. **Offline**: Application requires internet connection for AI features
4. **Transcription**: English speech recognition only (currently configured for US English)

## Troubleshooting

### "Web Speech API not supported"
- Use Chrome or Edge browser
- Check browser settings for microphone permissions

### "API Key not found"
- Verify `.env.local` file exists
- Check `ANTHROPIC_API_KEY` is set correctly
- Restart dev server after changing env variables

### "Microphone not working"
- Check browser microphone permissions
- Ensure HTTPS (required for some browsers)
- Try a different browser

## Future Enhancements

- [ ] User authentication and progress tracking
- [ ] Custom pronunciation feedback with audio comparison
- [ ] Advanced analytics dashboard
- [ ] Community discussion forum
- [ ] Spaced repetition for vocabulary
- [ ] Lesson plans by difficulty level
- [ ] Collaborative exercises with other learners
- [ ] Integration with language learning APIs

## License

This project is provided as-is for educational use.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for error messages

---

**Made for Hebrew speakers learning advanced English** 🇮🇱 🇬🇧
