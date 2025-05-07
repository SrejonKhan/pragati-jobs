import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('file');
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }
    
    // Convert to Blob
    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type });
    const buffer = Buffer.from(await audioBlob.arrayBuffer());
    
    // Always use the standard Whisper model
    const model = "whisper-1";
    
    // Process with Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: {
        buffer,
        name: 'audio.webm',
        type: audioFile.type,
      },
      model,
      language: 'en',
    });
    
    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error('Whisper API error:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing audio' },
      { status: 500 }
    );
  }
} 