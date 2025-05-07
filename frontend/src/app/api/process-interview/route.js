import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const video = formData.get('video');
    const transcription = formData.get('transcription');

    if (!video) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Use the actual transcription from speech recognition
    const userTranscription = transcription || "No transcription available";

    // Process with GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert interviewer and career coach. Analyze the candidate's response and provide constructive feedback. 
          Focus on: 
          1. Content relevance
          2. Communication clarity
          3. Specific improvements
          4. Positive aspects
          
          Format your response in clear sections:
          - Key Points Covered:
          - Strengths:
          - Areas for Improvement:
          - Overall Impression:
          
          Keep the feedback concise, constructive, and actionable.`
        },
        {
          role: "user",
          content: userTranscription
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const feedback = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      transcription: userTranscription,
      feedback: feedback
    });

  } catch (error) {
    console.error('Error processing interview:', error);
    return NextResponse.json(
      { error: 'Failed to process interview' },
      { status: 500 }
    );
  }
} 