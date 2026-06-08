import { NextRequest, NextResponse } from 'next/server';
import { generateConversationResponse } from '@/lib/anthropic';

export const runtime = 'nodejs';

interface ChatRequest {
  message: string;
  history: Array<{ role: string; content: string }>;
  topic?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.message || !Array.isArray(body.history)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const response = await generateConversationResponse(
      body.message,
      body.history,
      body.topic
    );

    return NextResponse.json({
      success: true,
      response: response,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
