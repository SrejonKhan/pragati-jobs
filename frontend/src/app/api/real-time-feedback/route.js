import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { transcription, question, model = 'gpt-4o-realtime-preview' } = await request.json();
    
    if (!transcription) {
      return NextResponse.json({ error: 'No transcription provided' }, { status: 400 });
    }
    
    // Prepare prompt for real-time feedback
    const prompt = `
      You are an expert interviewer and career coach providing real-time feedback to a candidate.
      
      The interview question was: "${question}"
      
      The candidate's response (in progress): "${transcription}"
      
      Based on their response so far, provide brief, constructive real-time coaching (max 50 words).
      Focus on:
      - Key points they're communicating well
      - Suggestions for improving their current answer
      - What they might want to address that they haven't yet
      
      Keep your feedback concise, supportive, and actionable.
    `;
    
    // Call GPT-4o API
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You provide brief, helpful real-time interview coaching." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    
    const feedback = completion.choices[0].message.content.trim();
    
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('GPT API error:', error);
    return NextResponse.json(
      { error: error.message || 'Error generating feedback' },
      { status: 500 }
    );
  }
} 