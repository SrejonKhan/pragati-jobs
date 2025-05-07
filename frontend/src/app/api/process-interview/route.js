import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const video = formData.get('video');
    const transcription = formData.get('transcription') || "No transcription available";
    const question = formData.get('question') || "Unknown question";
    
    // Use a standard model that's definitely supported
    const model = "gpt-4";

    if (!video && !transcription) {
      return NextResponse.json(
        { error: 'Video or transcription is required' },
        { status: 400 }
      );
    }

    // Process the transcription with GPT
    const prompt = `
      You are an expert interviewer and career coach providing detailed feedback on an interview response.
      
      The interview question was: "${question}"
      
      The candidate's response: "${transcription}"
      
      Analyze their response and provide professional feedback in the following structure:
      
      ## Response Analysis
      [Brief 2-3 sentence summary of their overall response]
      
      ## Key Strengths
      - [Strength 1: 1-2 sentences]
      - [Strength 2: 1-2 sentences]
      - [Strength 3: 1-2 sentences if applicable]
      
      ## Areas for Improvement
      - [Area 1: 1-2 sentences with specific suggestion]
      - [Area 2: 1-2 sentences with specific suggestion]
      - [Area 3: 1-2 sentences if applicable]
      
      ## Language and Delivery
      [Analysis of communication style, clarity, confidence, etc.]
      
      ## Sample Improved Response
      [Provide a brief example of a stronger response that maintains their style but addresses weaknesses]
      
      ## Overall Rating
      [Provide a rating out of 10 and 1-2 sentence final assessment]
    `;

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { 
          role: "system", 
          content: "You are an expert interviewer and career coach providing detailed, constructive, and actionable feedback to help candidates improve their interview skills." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    // Extract feedback from GPT response
    const feedback = completion.choices[0].message.content.trim();

    return NextResponse.json({ 
      success: true, 
      transcription,
      feedback 
    });
  } catch (error) {
    console.error('Error processing interview:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing interview' },
      { status: 500 }
    );
  }
} 