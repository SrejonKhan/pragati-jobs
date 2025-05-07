import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1";

// Create an axios instance with the OpenAI API key from environment variables
const openaiClient = axios.create({
  baseURL: OPENAI_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY}`,
  },
});

/**
 * Transcribe audio using OpenAI's Whisper API
 * This uses a simpler approach that bypasses MediaRecorder's formatting
 *
 * @param {Blob|File} audioData - The audio data to transcribe
 * @param {string} model - The Whisper model to use (default: 'whisper-1')
 * @param {string} language - The language of the audio (default: 'en')
 * @returns {Promise<{text: string}>} - The transcribed text
 */
export const transcribeAudio = async (audioData, model = "whisper-1", language = "en") => {
  try {
    // Check if audioData is valid
    if (!audioData || audioData.size === 0) {
      throw new Error("Invalid audio data: empty or null");
    }

    // Create a clean FormData object for the API request
    const formData = new FormData();

    // Instead of trying to transform the audio, just create a new file with the correct name and type
    // The name with .mp3 extension is critical for the Whisper API
    const audioFile = new File([audioData], "recording.mp3", { type: "audio/mpeg" });

    // Add the file and other parameters to the FormData
    formData.append("file", audioFile);
    formData.append("model", model);

    // Only add language if needed (auto-detect is often better)
    if (language && language !== "auto") {
      formData.append("language", language);
    }

    console.log(`Sending audio to Whisper API:
      - File name: ${audioFile.name}
      - File type: ${audioFile.type}
      - File size: ${audioFile.size} bytes
      - Model: ${model}`);

    // Use the global fetch API for better browser compatibility
    const response = await fetch(`${OPENAI_API_URL}/audio/transcriptions`, {
      method: "POST",
      headers: {
        // Let the browser set the multipart boundary correctly
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    console.log(`Whisper API response status: ${response.status}`);

    // Handle error responses
    if (!response.ok) {
      let errorMessage = `Error ${response.status}`;

      try {
        // Try to get the error details as JSON
        const errorData = await response.json();
        console.error("Whisper API Error:", errorData);

        if (errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;

          // If we get format error, add some debugging information
          if (errorMessage.includes("format") || errorMessage.includes("decode")) {
            console.error("Audio format error details:", {
              originalType: audioData.type,
              originalSize: audioData.size,
              sentType: audioFile.type,
              sentSize: audioFile.size,
            });
          }
        }
      } catch (e) {
        // If not valid JSON, get the raw text
        try {
          const errorText = await response.text();
          console.error("Whisper API Error Text:", errorText);
          errorMessage = `Error ${response.status}: ${errorText.substring(0, 100)}`;
        } catch (textError) {
          console.error("Failed to read error response");
        }
      }

      throw new Error(errorMessage);
    }

    // Parse successful response
    const result = await response.json();
    console.log("Transcription successful, result:", result);
    return result;
  } catch (error) {
    console.error("Error in transcribeAudio:", error);
    throw error;
  }
};

/**
 * Get a suitable file extension for an audio MIME type
 *
 * @param {string} mimeType - The MIME type
 * @returns {string} - The file extension
 */
function getAudioExtension(mimeType) {
  const mimeToExt = {
    "audio/webm": "webm",
    "audio/wav": "wav",
    "audio/wave": "wav",
    "audio/x-wav": "wav",
    "audio/mp3": "mp3",
    "audio/mpeg": "mp3",
    "audio/ogg": "ogg",
    "audio/flac": "flac",
    "audio/m4a": "m4a",
    "audio/mp4": "mp4",
    "audio/x-m4a": "m4a",
  };

  // Get extension based on mime type or default to mp3 (which is widely supported)
  const detectedExt = Object.entries(mimeToExt).find(([mime]) => mimeType.includes(mime.split("/")[1]));

  return detectedExt ? detectedExt[1] : "mp3";
}

/**
 * Send a message to OpenAI's Chat Completions API
 *
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} model - The GPT model to use (default: 'gpt-4o')
 * @param {Object} options - Additional options like temperature, max_tokens, etc.
 * @returns {Promise<Object>} - The OpenAI API response
 */
export const sendChatMessage = async (messages, model = "gpt-4o", options = {}) => {
  try {
    const response = await openaiClient.post("/chat/completions", {
      model,
      messages,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    throw error;
  }
};

/**
 * Get a streaming response from OpenAI's Chat Completions API
 *
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} model - The GPT model to use (default: 'gpt-4o')
 * @param {Object} options - Additional options like temperature, max_tokens, etc.
 * @returns {Promise<ReadableStream>} - A stream of the OpenAI API response
 */
export const streamChatMessage = async (messages, model = "gpt-4o", options = {}) => {
  try {
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        ...options,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(`API request failed: ${errorJson.error?.message || response.status}`);
      } catch (e) {
        throw new Error(`API request failed: ${response.status}. Response: ${errorText}`);
      }
    }

    return response.body;
  } catch (error) {
    console.error("Error in streamChatMessage:", error);
    throw error;
  }
};

/**
 * Generate an analysis of an interview
 *
 * @param {Array} conversation - The conversation history between interviewer and interviewee
 * @param {string} jobTitle - The job title the interview was for
 * @returns {Promise<string>} - The generated interview analysis
 */
export const generateInterviewAnalysis = async (conversation, jobTitle) => {
  try {
    // Filter out system messages
    const interviewConversation = conversation.filter((msg) => msg.role !== "system");

    // Add analysis request
    const analysisRequest = [
      {
        role: "system",
        content: `You are an expert interview analyst. Analyze the following interview for a ${jobTitle} position. 
        Provide constructive feedback on the candidate's responses, highlighting strengths and areas for improvement. 
        Include specific examples from the interview. Format your analysis with clear sections for:
        1. Overall Performance
        2. Key Strengths
        3. Areas for Improvement
        4. Communication Skills
        5. Technical Knowledge
        6. Final Recommendations`,
      },
      ...interviewConversation,
    ];

    const result = await sendChatMessage(analysisRequest, "gpt-4", {
      temperature: 0.7,
      max_tokens: 1000,
    });

    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error in generateInterviewAnalysis:", error);
    throw error;
  }
};

export default {
  transcribeAudio,
  sendChatMessage,
  streamChatMessage,
  generateInterviewAnalysis,
};
