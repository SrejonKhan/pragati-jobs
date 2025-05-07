"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { transcribeAudio } from "@/services/api/openai";

// Default interview settings
const DEFAULT_SETTINGS = {
  jobTitle: "Software Engineer",
  experienceLevel: "Mid-level",
  interviewType: "Technical",
  duration: 15, // minutes
};

// AI Interviewer component that handles the realtime interview
const AIInterviewer = ({ isAsking, question, onQuestionStart, isFinishing = false }) => {
  const [fallbackMode, setFallbackMode] = useState(false);
  const speechInitialized = useRef(false);

  // Load voices when component mounts
  useEffect(() => {
    function loadVoices() {
      // Get all available voices
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        speechInitialized.current = true;
      } else {
        // If no voices are available, switch to fallback mode
        setFallbackMode(true);
      }
    }

    // Try to load voices immediately
    loadVoices();

    // Also listen for voiceschanged event (which fires when voices are actually loaded)
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setFallbackMode(true);
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Handle speaking when question changes or avatar starts speaking
  useEffect(() => {
    if (!isAsking || !question) return;

    // For fallback mode, still trigger the question start handler
    if (fallbackMode) {
      onQuestionStart();
      return;
    }

    // Ensure speech synthesis is available
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setFallbackMode(true);
      onQuestionStart();
      return;
    }

    // Cancel any ongoing speech
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      setFallbackMode(true);
      onQuestionStart();
      return;
    }

    // Use a short timeout to ensure the UI is ready
    const timeoutId = setTimeout(() => {
      try {
        // Create a new utterance for the question
        const utterance = new SpeechSynthesisUtterance(question);

        // Set properties for clear speech
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        // Set event handlers
        utterance.onstart = () => {
          onQuestionStart();
        };

        utterance.onerror = () => {
          // Switch to fallback mode on any error
          setFallbackMode(true);
          onQuestionStart();
        };

        // Try to find a good English voice
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const preferredVoice =
              voices.find(
                (v) =>
                  (v.name.includes("English") || v.lang.includes("en")) &&
                  (v.name.includes("Female") || !v.name.includes("Male"))
              ) || voices[0];

            if (preferredVoice) {
              utterance.voice = preferredVoice;
            }
          }
        } catch (e) {
          // Continue with default voice if voice selection fails
        }

        // Speak the utterance
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        // Switch to fallback mode on any error
        setFallbackMode(true);
        onQuestionStart();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {
          // Silently handle any cleanup errors
        }
      }
    };
  }, [isAsking, question, onQuestionStart, fallbackMode]);

  return (
    <div className="relative w-96 mx-auto">
      <div className="interviewer-container">
        {/* AI Interviewer Avatar */}
        <div className={`interviewer-avatar ${isAsking ? "speaking" : ""}`}>
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg">
            <img
              src={
                isFinishing
                  ? "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg"
                  : "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
              }
              onError={(e) => {
                e.target.onerror = null;
                // Fallback to a generic AI avatar if image fails to load
                e.target.src = "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg";
              }}
              alt="AI Interviewer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Speech Bubble */}
        {question && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 w-80">
            <div className="relative bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-white"></div>
              <p className="text-gray-800 text-lg font-medium">{question}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom hook for audio recording and transcription
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start recording
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Collect chunks every second
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError("Failed to start recording. Please check your microphone permissions.");
      console.error("Recording error:", err);
    }
  };

  // Stop recording and transcribe
  const stopRecording = async () => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") {
        resolve("");
        return;
      }

      setIsProcessing(true);

      mediaRecorderRef.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

          if (audioBlob.size < 1024) {
            setIsProcessing(false);
            resolve("");
            return;
          }

          // Use OpenAI's Whisper API for transcription
          const result = await transcribeAudio(audioBlob);

          if (result && result.text) {
            setTranscript(result.text);
            setIsProcessing(false);
            resolve(result.text);
          } else {
            throw new Error("No transcription returned");
          }
        } catch (err) {
          setError("Failed to transcribe audio");
          console.error("Transcription error:", err);
          setIsProcessing(false);
          reject(err);
        }
      };

      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Clean up the stream tracks
      const stream = mediaRecorderRef.current.stream;
      stream.getTracks().forEach((track) => track.stop());
    });
  };

  return {
    isRecording,
    transcript,
    isProcessing,
    error,
    startRecording,
    stopRecording,
  };
};

export default function RealtimeInterview() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [conversation, setConversation] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [currentThinking, setCurrentThinking] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  // Use our custom hooks for recording
  const { isRecording, transcript, isProcessing, error: recordingError, startRecording, stopRecording } = useAudioRecorder();

  // Initialize camera
  useEffect(() => {
    if (isInterviewStarted && !isInterviewEnded) {
      initializeCamera();
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isInterviewStarted, isInterviewEnded]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, // Audio is handled separately
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Start the interview with our API
  const startInterview = async () => {
    setIsSettingUp(true);

    try {
      // Create initial system message
      const initialMessages = [
        {
          role: "system",
          content: `You are an AI interviewer conducting a ${settings.interviewType} interview for a ${settings.experienceLevel} ${settings.jobTitle} position. 
          Follow these guidelines:
          1. Ask one question at a time and wait for a response.
          2. Start with a brief introduction of yourself and the role.
          3. Ask appropriate questions for the position and experience level.
          4. Follow-up on interesting points the candidate mentions.
          5. The interview should last about ${settings.duration} minutes.
          6. Keep your responses conversational but professional.
          7. End the interview politely when appropriate.`,
        },
      ];

      // Call our API endpoint
      const response = await fetch("/api/realtime-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: initialMessages,
          model: "gpt-4",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start interview");
      }

      const data = await response.json();
      const firstMessage = data.response;

      // Add to conversation
      setConversation([...initialMessages, firstMessage]);
      setCurrentQuestion(firstMessage.content);

      // Start the interview
      setIsSettingUp(false);
      setIsInterviewStarted(true);
      setIsAvatarSpeaking(true);
    } catch (error) {
      console.error("Error starting interview:", error);
      setIsSettingUp(false);
    }
  };

  // Handle avatar speaking
  const handleAvatarSpeaking = () => {
    // This will be called when the avatar starts speaking
    // Could add animation controls here
  };

  // Capture and process user response
  const handleUserResponse = async () => {
    if (isRecording) {
      setWaitingForResponse(true);
      try {
        // Stop recording and get transcript
        const userTranscript = await stopRecording();

        if (!userTranscript) {
          setWaitingForResponse(false);
          return;
        }

        // Add user message to conversation
        const updatedConversation = [...conversation, { role: "user", content: userTranscript }];

        setConversation(updatedConversation);
        setCurrentThinking("Thinking...");

        // Call our API endpoint for the response
        const response = await fetch("/api/realtime-interview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedConversation,
            model: "gpt-4",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }

        const data = await response.json();
        const aiMessage = data.response;

        // Check if interview should end
        const shouldEndInterview =
          aiMessage.content.toLowerCase().includes("thank you for your time") ||
          aiMessage.content.toLowerCase().includes("end of our interview") ||
          aiMessage.content.toLowerCase().includes("conclude this interview") ||
          updatedConversation.length > settings.duration * 2 + 4; // Rough estimate based on duration

        // Add AI response to conversation
        setConversation([...updatedConversation, aiMessage]);
        setCurrentQuestion(aiMessage.content);
        setCurrentThinking("");

        // Speak the response
        setIsAvatarSpeaking(true);

        // End interview if needed
        if (shouldEndInterview) {
          setTimeout(() => {
            handleEndInterview([...updatedConversation, aiMessage]);
          }, 5000);
        }
      } catch (error) {
        console.error("Error processing response:", error);
      } finally {
        setWaitingForResponse(false);
      }
    } else {
      // Start recording user response
      startRecording();
    }
  };

  // End the interview and generate analysis - updated to use our analysis API
  const handleEndInterview = async (finalConversation = conversation) => {
    try {
      setIsInterviewEnded(true);

      // Call our interview analysis API
      const response = await fetch("/api/interview-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: finalConversation,
          jobDetails: {
            title: settings.jobTitle,
            experienceLevel: settings.experienceLevel,
            type: settings.interviewType,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const data = await response.json();
      setAnalysis(data.analysis);

      // Set final AI message
      setCurrentQuestion("Thank you for completing the interview! I've prepared an analysis of our conversation.");
      setIsAvatarSpeaking(true);
    } catch (error) {
      console.error("Error ending interview:", error);
      setAnalysis("We encountered an error generating your interview analysis. Please try again later.");
    }
  };

  // Effect to toggle avatar speaking state
  useEffect(() => {
    if (isAvatarSpeaking) {
      const timer = setTimeout(() => {
        setIsAvatarSpeaking(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAvatarSpeaking]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 text-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {!isInterviewStarted ? (
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">
              AI Realtime Interview
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practice your interview skills with our AI interviewer that adapts to your responses in real-time. Get valuable
              feedback and insights to improve your interview performance.
            </p>

            {/* Interview Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-indigo-600">Interview Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={settings.jobTitle}
                    onChange={(e) => setSettings({ ...settings, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    value={settings.experienceLevel}
                    onChange={(e) => setSettings({ ...settings, experienceLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Entry-level">Entry-level</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                  <select
                    value={settings.interviewType}
                    onChange={(e) => setSettings({ ...settings, interviewType: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="General">General</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <select
                    value={settings.duration}
                    onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="20">20 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={startInterview}
              disabled={isSettingUp}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50"
            >
              {isSettingUp ? "Setting up interview..." : "Start Interview"}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* AI Interviewer */}
            <div className="relative flex justify-center">
              <AIInterviewer
                isAsking={isAvatarSpeaking}
                question={currentQuestion}
                onQuestionStart={handleAvatarSpeaking}
                isFinishing={isInterviewEnded}
              />
            </div>

            {/* Interview Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
              {!isInterviewEnded ? (
                <>
                  {/* Video Preview */}
                  <div className="relative mb-6">
                    <div className="video-container aspect-video">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      {isRecording && (
                        <div className="recording-indicator animate-pulse absolute top-4 right-4 w-4 h-4 bg-red-500 rounded-full"></div>
                      )}
                    </div>

                    {/* Current Caption */}
                    {transcript && !isRecording && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Your Last Response:</h3>
                        <p className="text-gray-800">{transcript}</p>
                      </div>
                    )}

                    {/* AI Thinking */}
                    {currentThinking && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center border border-blue-100">
                        <div className="animate-pulse mr-2 w-3 h-3 bg-blue-400 rounded-full"></div>
                        <p className="text-blue-700 text-sm">{currentThinking}</p>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleUserResponse}
                      disabled={isProcessing || waitingForResponse}
                      className={`${
                        isRecording ? "bg-red-500 hover:bg-red-600" : "bg-indigo-500 hover:bg-indigo-600"
                      } text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50`}
                    >
                      {isProcessing || waitingForResponse ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          {isRecording ? (
                            <>
                              <span>Stop Recording</span>
                            </>
                          ) : (
                            <>
                              <span>Start Recording</span>
                            </>
                          )}
                        </>
                      )}
                    </button>

                    {!isRecording && !isProcessing && !waitingForResponse && (
                      <button
                        onClick={() => handleEndInterview()}
                        className="ml-4 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        End Interview
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Interview Analysis */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-indigo-600">Interview Analysis</h2>

                    {analysis ? (
                      <div className="prose max-w-none text-gray-800">
                        <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, "<br>") }} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
                        <span className="ml-2 text-indigo-500">Generating analysis...</span>
                      </div>
                    )}

                    {/* Conversation History */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-indigo-600 mb-4">Interview Transcript</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {conversation
                          .filter((msg) => msg.role !== "system")
                          .map((message, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                message.role === "assistant"
                                  ? "bg-indigo-50 border border-indigo-100"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <p className="text-sm font-bold mb-1 text-gray-700">
                                {message.role === "assistant" ? "AI Interviewer" : "You"}:
                              </p>
                              <p className="text-gray-800">{message.content}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => router.push("/")}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
                      >
                        Return Home
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
