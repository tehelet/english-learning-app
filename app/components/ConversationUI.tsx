'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader, Mic } from 'lucide-react';
import FeedbackCard from './FeedbackCard';
import { generateId, saveToLocalStorage, getFromLocalStorage } from '@/lib/utils';
import type { Message } from '@/types';

interface ConversationUIProps {
  topic?: string;
  difficulty?: 'intermediate' | 'advanced' | 'expert';
}

export default function ConversationUI({
  topic = 'Free Conversation',
  difficulty = 'advanced',
}: ConversationUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => setIsRecording(true);

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setTranscript((prev) => prev + transcript + ' ');
            } else {
              interimTranscript += transcript;
            }
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech error:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
          if (transcript.trim()) {
            handleSendMessage(transcript.trim());
            setTranscript('');
          }
        };
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const savedMessages = getFromLocalStorage<Message[]>('conversation', []);
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setFeedback('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          topic,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const updated = [...prev, assistantMessage];
        saveToLocalStorage('conversation', updated);
        return updated;
      });

      await generateFeedback(text);
    } catch (error) {
      console.error('Error:', error);
      setFeedback('שגיאה בהתחברות לשרת. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFeedback = async (text: string) => {
    try {
      const response = await fetch('/api/analyze-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcription: text,
          context: topic,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(data.data.feedback);
      }
    } catch (error) {
      console.error('Feedback generation error:', error);
    }
  };

  const toggleMicrophone = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-blue-100 dark:border-slate-700 px-4 md:px-6 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI אנגלית Coach
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {topic} • רמה: {difficulty === 'advanced' ? 'מתקדמת' : 'ביניים'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
        <div className="max-w-5xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="mb-4 text-5xl">👋</div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  ברוכים הבאים!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  בואו נתחילה שיחה על נושא מעניין
                </p>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <p>🎤 לחץ על המיקרופון ודבר באנגלית</p>
                  <p>או</p>
                  <p>⌨️ הקלד את הודעתך בעברית או באנגלית</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 md:gap-4 animate-message-enter ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}
                  >
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>

                  <div
                    className={`max-w-xs md:max-w-2xl rounded-2xl px-4 md:px-5 py-3 md:py-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-bl from-amber-100 to-orange-50 dark:from-orange-900/30 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800/50'
                        : 'bg-white dark:bg-slate-700 shadow-md border border-blue-100 dark:border-slate-600'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-100">
                      {message.content}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString('he-IL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 md:gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Loader size={18} className="text-white animate-spin" />
                  </div>
                  <div className="bg-white dark:bg-slate-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 shadow-md border border-blue-100 dark:border-slate-600">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {feedback && (
                <div className="w-full mt-6">
                  <FeedbackCard
                    type="suggestion"
                    title="💡 הערות ושיפור"
                    content={feedback}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-blue-100 dark:border-slate-700 px-4 md:px-6 py-4 md:py-6">
        <div className="max-w-5xl mx-auto w-full space-y-3 md:space-y-4">
          {/* Microphone Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 md:p-5 border border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mic size={18} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-900 dark:text-blue-100 text-sm md:text-base">
                  דיבור בעברית
                </span>
              </div>
              <button
                onClick={toggleMicrophone}
                disabled={isLoading}
                className={`px-4 md:px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all flex items-center gap-2 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRecording ? '⏹️ עצור' : '🎤 הקלט'}
              </button>
            </div>

            {isRecording && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>מקליט...</span>
              </div>
            )}

            {transcript && (
              <div className="mt-3 p-3 bg-white dark:bg-slate-700 rounded-lg">
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-1">
                  טקסט שלך:
                </p>
                <p className="text-sm md:text-base text-slate-800 dark:text-slate-100">
                  {transcript}
                </p>
              </div>
            )}
          </div>

          {/* Text Input */}
          <div className="flex gap-2 md:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(input);
                }
              }}
              placeholder="או הקלד כאן..."
              className="flex-1 px-4 md:px-5 py-2 md:py-3 rounded-full border-2 border-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-sm md:text-base"
              dir="rtl"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="px-5 md:px-7 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white rounded-full font-semibold flex items-center gap-2 transition-all text-sm md:text-base shadow-md"
              aria-label="שלח הודעה"
            >
              <Send size={18} />
              <span className="hidden md:inline">שלח</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
