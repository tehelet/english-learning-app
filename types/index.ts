export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ConversationContext {
  topic?: string;
  difficulty: 'intermediate' | 'advanced' | 'expert';
  focusAreas?: string[];
}

export interface FeedbackItem {
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'fluency';
  original: string;
  correction?: string;
  explanation: string;
  severity: 'minor' | 'moderate' | 'significant';
}

export interface AnalysisResult {
  transcription: string;
  feedback: FeedbackItem[];
  overallScore: number;
  suggestions: string[];
  hebrewExplanation: string;
}

export interface VocabularyItem {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  alternatives?: string[];
}

export interface VocabularyExercise {
  id: string;
  category: 'idioms' | 'phrasal-verbs' | 'academic' | 'business';
  items: VocabularyItem[];
  difficulty: 'intermediate' | 'advanced';
}

export interface UserProgress {
  totalMessages: number;
  conversationTime: number;
  vocabularyLearned: number;
  focusAreas: {
    grammar: number;
    vocabulary: number;
    pronunciation: number;
  };
  lastSession: Date;
}
