'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';

interface SpeechRecorderProps {
  onTranscription: (text: string) => void;
  isListening?: boolean;
}

export default function SpeechRecorder({
  onTranscription,
  isListening = false,
}: SpeechRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error('Web Speech API not supported');
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

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
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        if (transcript) {
          onTranscription(transcript.trim());
        }
      };
    }
  }, [onTranscription, transcript]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setTranscript('');
    } else {
      setTranscript('');
      recognitionRef.current?.start();
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-lg border border-primary-200 bg-white dark:bg-surface-900 dark:border-primary-800"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">הקלטת קול</h3>
        <button
          onClick={toggleRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
          aria-label={isRecording ? 'הפסק הקלטה' : 'התחל הקלטה'}
        >
          {isRecording ? (
            <>
              <Square size={18} />
              <span>עצור</span>
            </>
          ) : (
            <>
              <Mic size={18} />
              <span>התחל הקלטה</span>
            </>
          )}
        </button>
      </div>

      {isRecording && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse delay-200"></div>
          </div>
          <span className="text-sm text-red-600 dark:text-red-400">
            מקליט...
          </span>
        </div>
      )}

      {transcript && (
        <div className="p-4 rounded-lg bg-surface-50 dark:bg-surface-800">
          <p className="text-sm text-surface-600 dark:text-surface-300 mb-2">
            הטקסט שלך:
          </p>
          <p className="text-base leading-relaxed">{transcript}</p>
          <button
            onClick={clearTranscript}
            className="mt-2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 underline"
          >
            נקה
          </button>
        </div>
      )}
    </div>
  );
}
