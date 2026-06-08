# Quick Start Guide - מדריך התחלה מהיר

## 5-Minute Setup

### Step 1: Get Your API Key
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Create a new API key
4. Copy the key

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
1. Open `.env.local` (or create it from `.env.example`)
2. Paste your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
   ```

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open Browser
Visit `http://localhost:3000`

---

## First Experience

### Try Conversation Feature
1. Click **שיחה** (Conversation) from home
2. Select a topic or start with "Free Conversation"
3. Click **התחל שיחה** (Start Conversation)
4. Either:
   - **Speak**: Click the microphone icon and speak in English
   - **Type**: Type directly in the text box
5. Get AI response with feedback in Hebrew

### Try Vocabulary Feature
1. Click **אוצר מילים** (Vocabulary)
2. Choose a category (e.g., Idioms)
3. Click **התחל את התרגול** (Start Exercise)
4. Learn words and mark as "mastered"

---

## Common Tasks

### Enable Microphone (First Time)
- Browser will ask for microphone permission
- Click "Allow"
- Test by clicking mic icon in conversation

### Use Your Own Topics
Edit `app/conversation/page.tsx`:
```typescript
const topics = [
  'Your Topic Here',
  'Another Topic',
];
```

### Add Custom Vocabulary
Edit `app/vocabulary/page.tsx` → `vocabularyData` object:
```typescript
{
  word: 'Advanced word',
  partOfSpeech: 'Verb',
  definition: 'Hebrew explanation',
  example: 'English sentence example',
}
```

### Change Color Scheme
Edit `tailwind.config.ts` → `theme.extend.colors`

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "Microphone not working" | Use Chrome/Edge, allow permissions, restart browser |
| "API error" | Check API key in `.env.local`, restart dev server |
| "Hebrew text not showing" | Browser set to RTL (should be automatic) |
| "White screen" | Check browser console (F12), look for errors |

---

## Build for Production

```bash
# Build
npm run build

# Start
npm run start
```

---

## Next Steps

1. **Customize**: Edit components in `app/components/`
2. **Deploy**: Push to GitHub, connect to Vercel
3. **Extend**: Add more vocabulary, topics, or features
4. **Monitor**: Use browser DevTools to debug

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `app/components/ConversationUI.tsx` | Main conversation interface |
| `lib/anthropic.ts` | Claude API integration |
| `.env.local` | Your API key (keep secret!) |
| `tailwind.config.ts` | Styling & colors |

---

**Need help?** Check `README.md` for detailed documentation
