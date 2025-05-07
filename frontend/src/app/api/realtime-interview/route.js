import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, model = "gpt-4" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Return the AI response
    return NextResponse.json({
      response: completion.choices[0].message,
      usage: completion.usage,
    });
  } catch (error) {
    console.error("Error in realtime interview:", error);

    // Handle different types of errors
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.error.message || "OpenAI API Error" },
        { status: error.response.status }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
