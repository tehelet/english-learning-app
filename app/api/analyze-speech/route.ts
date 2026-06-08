import { NextRequest, NextResponse } from 'next/server';
import { analyzeEnglishSpeech } from '@/lib/anthropic';

export const runtime = 'nodejs';

interface SpeechRequest {
  transcription: string;
  context?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SpeechRequest = await request.json();

    if (!body.transcription) {
      return NextResponse.json(
        { error: 'Transcription is required' },
        { status: 400 }
      );
    }

    const result = await analyzeEnglishSpeech(
      body.transcription,
      body.context
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Speech analysis error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to analyze speech',
      },
      { status: 500 }
    );
  }
}
