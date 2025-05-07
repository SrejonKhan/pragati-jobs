import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { conversation, jobDetails } = body;

    if (!conversation || !Array.isArray(conversation)) {
      return NextResponse.json({ error: "Conversation array is required" }, { status: 400 });
    }

    if (!jobDetails) {
      return NextResponse.json({ error: "Job details are required" }, { status: 400 });
    }

    // Filter out system messages for the analysis
    const filteredConversation = conversation.filter((msg) => msg.role !== "system");

    // Create system prompt for analysis
    const systemPrompt = {
      role: "system",
      content: `You are an expert interview analyst. Analyze the following interview for a ${
        jobDetails.title || "professional"
      } 
      position at ${jobDetails.experienceLevel || ""} level. 
      
      Provide constructive feedback on the candidate's responses, highlighting strengths and areas for improvement.
      Include specific examples from the interview. Format your analysis with clear sections for:
      1. Overall Performance
      2. Key Strengths
      3. Areas for Improvement
      4. Communication Skills
      5. Technical Knowledge (if applicable)
      6. Final Recommendations
      
      Format your response in markdown for better readability. Be encouraging but honest in your assessment.`,
    };

    // Create messages array for OpenAI
    const messages = [systemPrompt, ...filteredConversation];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Return the analysis
    return NextResponse.json({
      analysis: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in interview analysis:", error);

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
