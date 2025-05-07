"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Configuration for OpenAI services
const OPENAI_CONFIG = {
  whisperModel: 'whisper-1',
  gptModel: 'gpt-4'
};

const mockQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your experience.",
    context: "Looking for a comprehensive introduction covering professional background and key achievements."
  },
  {
    id: 2,
    question: "What are your strengths and weaknesses?",
    context: "Evaluate self-awareness and personal development mindset."
  },
  {
    id: 3,
    question: "Where do you see yourself in 5 years?",
    context: "Assess career planning and ambition."
  },
  {
    id: 4,
    question: "Why should we hire you?",
    context: "Looking for unique value proposition and relevant skills."
  },
  {
    id: 5,
    question: "Do you have any questions for me?",
    context: "Evaluate candidate's research and interest in the role."
  }
];

const HumanInterviewer = ({ isAsking, question, onQuestionStart }) => {
  // Create a ref to track if we've initialized speech synthesis
  const speechInitialized = useRef(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  
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
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setFallbackMode(true);
    }
    
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
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
    if (typeof window === 'undefined' || !window.speechSynthesis) {
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
            const preferredVoice = voices.find(v => 
              (v.name.includes('English') || v.lang.includes('en')) && 
              (v.name.includes('Female') || !v.name.includes('Male'))
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
      if (typeof window !== 'undefined' && window.speechSynthesis) {
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
        {/* Real Human Avatar */}
        <div className={`interviewer-avatar ${isAsking ? 'speaking' : ''}`}>
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-200">
            {/* Using a professional interviewer image */}
            <img 
              src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg";
              }}
              alt="Professional Interviewer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Speech Bubble */}
        {question && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 w-80">
            <div className="relative bg-white rounded-lg p-4 shadow-lg">
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-white"></div>
              <p className="text-gray-800 text-lg font-medium">{question}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// A custom hook for handling speech recognition using Whisper API
const useWhisperTranscription = (isRecording, isManualMode) => {
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const processingIntervalRef = useRef(null);

  // Start audio recording and processing
  const startRecording = async () => {
    if (isManualMode) return;
    
    try {
      // Reset state
      setTranscript('');
      setError(null);
      audioChunksRef.current = [];
      
      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up media recorder
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      
      // Collect audio chunks
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      // Start recording
      recorder.start(1000); // Collect chunks every second
      
      // Set up periodic processing
      processingIntervalRef.current = setInterval(() => {
        if (audioChunksRef.current.length > 0) {
          processAudioChunk();
        }
      }, 5000); // Process every 5 seconds
      
    } catch (err) {
      setError('Failed to start audio recording');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
    }
    
    // Process any remaining audio
    if (audioChunksRef.current.length > 0) {
      processAudioChunk(true); // Final processing
    }
  };

  // Process collected audio chunks using Whisper API
  const processAudioChunk = async (isFinal = false) => {
    if (audioChunksRef.current.length === 0 || isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      // Prepare audio blob
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
      // Only process if we have enough audio data
      if (audioBlob.size < 1024) {
        if (!isFinal) {
          setIsProcessing(false);
          return;
        }
      }
      
      // Create form data for API request
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      
      // Send to our backend API that will proxy to OpenAI
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Transcription failed');
      }
      
      const result = await response.json();
      
      if (result.text) {
        setTranscript(prev => prev + ' ' + result.text);
        // Clear processed chunks if not final
        if (!isFinal) {
          audioChunksRef.current = [];
        }
      }
    } catch (err) {
      setError('Failed to transcribe audio');
    } finally {
      setIsProcessing(false);
    }
  };

  // Set up and clean up recording based on isRecording state
  useEffect(() => {
    if (isRecording && !isManualMode) {
      startRecording();
    } else if (!isRecording && mediaRecorderRef.current) {
      stopRecording();
    }
    
    return () => {
      stopRecording();
    };
  }, [isRecording, isManualMode]);

  return { transcript, isProcessing, error };
};

export default function MockInterview() {
  const router = useRouter();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef(null);
  
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showHologram, setShowHologram] = useState(true);
  const [videoBlob, setVideoBlob] = useState(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [currentCaption, setCurrentCaption] = useState('');
  const [fullTranscript, setFullTranscript] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualTranscript, setManualTranscript] = useState('');
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [realTimeFeedback, setRealTimeFeedback] = useState('');
  
  // Use the custom Whisper transcription hook
  const { 
    transcript: whisperTranscript, 
    isProcessing: isWhisperProcessing, 
    error: whisperError 
  } = useWhisperTranscription(isRecording, isManualMode);
  
  // Update current caption and full transcript from Whisper results
  useEffect(() => {
    if (whisperTranscript && !isManualMode) {
      setCurrentCaption(whisperTranscript);
      setFullTranscript(whisperTranscript);
    }
  }, [whisperTranscript, isManualMode]);
  
  // Switch to manual mode if there's a Whisper error
  useEffect(() => {
    if (whisperError && isRecording) {
      setIsManualMode(true);
    }
  }, [whisperError, isRecording]);
  
  // Initialize video stream
  useEffect(() => {
    if (isStarted) {
      initializeCamera();
    }
    return () => {
      // Cleanup resources
    };
  }, [isStarted]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasCamera(false);
    }
  };

  // Start recording with Whisper integration
  const startRecording = async () => {
    if (!videoRef.current?.srcObject) return;

    // Reset states for new recording
    setCurrentCaption('');
    setFullTranscript('');
    setManualTranscript('');
    setRealTimeFeedback('');
    
    // Start video recording
    try {
      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(videoRef.current.srcObject);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        await processRecording(blob);
      };
      
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      
      // Start real-time feedback process if not in manual mode
      if (!isManualMode) {
        startRealTimeFeedback();
      }
    } catch (error) {
      alert("Failed to start recording. Please check your camera and microphone permissions.");
    }
  };
  
  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Use manual transcript if in manual mode
      if (isManualMode) {
        setFullTranscript(manualTranscript);
      }
      
      setIsRecording(false);
    }
  };
  
  // Process recording with GPT-4
  const processRecording = async (blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('video', blob);
      formData.append('transcription', isManualMode ? manualTranscript : fullTranscript);
      formData.append('question', mockQuestions[currentQuestion].question);
      
      const response = await fetch('/api/process-interview', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to process video');
      
      const data = await response.json();
      setFeedback(data.feedback);
      
    } catch (error) {
      setFeedback('There was an error processing your response. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Get real-time feedback using GPT-4
  const startRealTimeFeedback = () => {
    // Set up interval to periodically check transcript and provide feedback
    const feedbackInterval = setInterval(async () => {
      if (!isRecording || isManualMode || !fullTranscript) {
        clearInterval(feedbackInterval);
        return;
      }
      
      try {
        const response = await fetch('/api/real-time-feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            transcription: fullTranscript,
            question: mockQuestions[currentQuestion].question
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setRealTimeFeedback(data.feedback);
        }
      } catch (error) {
        // Silently handle real-time feedback errors
      }
    }, 8000); // Check every 8 seconds
    
    return () => clearInterval(feedbackInterval);
  };

  // Handle manual submission
  const handleManualSubmit = async () => {
    if (!manualTranscript.trim()) return;
    
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('transcription', manualTranscript);
      formData.append('question', mockQuestions[currentQuestion].question);
      
      if (videoBlob) {
        formData.append('video', videoBlob);
      }
      
      const response = await fetch('/api/process-interview', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to process response');
      
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      setFeedback('There was an error processing your response. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Rest of the existing functions...
  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setFeedback('');
      setVideoBlob(null);
      setFullTranscript('');
      setRealTimeFeedback('');
    } else {
      setIsStarted(false);
      setCurrentQuestion(0);
    }
  };

  const startInterview = () => {
    setIsStarted(true);
    setShowHologram(true);
  };
  
  // Handle question start
  const handleQuestionStart = () => {
    // Implementation remains the same
  };
  
  // Add speaking animation when changing questions
  useEffect(() => {
    if (isStarted) {
      setIsAvatarSpeaking(true);
      const timer = setTimeout(() => {
        setIsAvatarSpeaking(false);
      }, 5000); // Allow more time for speech synthesis
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, isStarted]);

  // Return the JSX, now with real-time feedback section
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {!isStarted ? (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d35400] to-[#006064] text-transparent bg-clip-text">
              AI Video Interview
            </h1>
            <p className="text-gray-300">
              Practice your interview skills with our AI interviewer.
              Get real-time transcription with Whisper and feedback powered by GPT-4.
            </p>
            <button
              onClick={startInterview}
              className="bd-button px-8 py-3 text-lg"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Human Interviewer */}
            <div className="relative flex justify-center">
              <HumanInterviewer 
                isAsking={isAvatarSpeaking}
                question={mockQuestions[currentQuestion].question}
                onQuestionStart={handleQuestionStart}
              />
            </div>
            
            {/* Whisper error notification */}
            {whisperError && !isManualMode && (
              <div className="p-3 bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-20 rounded-lg mb-2">
                <p className="text-yellow-200 text-sm">Transcription service unavailable. Consider switching to manual mode.</p>
                <button
                  onClick={() => setIsManualMode(true)}
                  className="text-yellow-200 underline text-sm hover:text-yellow-300 mt-1"
                >
                  Switch to manual mode
                </button>
              </div>
            )}
            
            {/* Video and Question Section */}
            <div className="space-y-6 bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-lg border border-[#d35400] border-opacity-20">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Question {currentQuestion + 1} of {mockQuestions.length}</p>
                <h2 className="text-xl font-semibold text-[#d35400]">
                  {mockQuestions[currentQuestion].question}
                </h2>
              </div>

              {/* Video Preview */}
              <div className="relative">
                <div className="video-container aspect-video">
                  {hasCamera ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {isRecording && <div className="recording-indicator" />}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Camera access is required for the interview
                    </div>
                  )}
                  
                  {/* Real-time captions */}
                  {currentCaption && isRecording && !isManualMode && (
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="bg-black bg-opacity-75 p-3 rounded-lg">
                        <p className="text-white text-center">{currentCaption}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Manual mode textarea */}
              {isManualMode && (
                <div className="mt-4">
                  <textarea
                    value={manualTranscript}
                    onChange={(e) => setManualTranscript(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full p-4 bg-gray-700 bg-opacity-50 text-white rounded-lg border border-gray-600 focus:border-[#d35400] focus:ring-1 focus:ring-[#d35400] resize-none min-h-[120px]"
                    rows={4}
                  />
                </div>
              )}

              {/* Controls */}
              <div className="flex flex-wrap gap-4">
                {!isRecording ? (
                  <>
                    {isManualMode ? (
                      <>
                        <button
                          onClick={handleManualSubmit}
                          disabled={!manualTranscript.trim() || isProcessing}
                          className={`flex-1 bd-button ${
                            !manualTranscript.trim() || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isProcessing ? 'Processing...' : 'Submit Response'}
                        </button>
                        <button
                          onClick={() => setIsManualMode(false)}
                          className="px-4 py-2 border border-[#006064] text-[#006064] rounded-lg hover:bg-[#006064] hover:bg-opacity-10 transition-colors"
                        >
                          Try Whisper Transcription
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={startRecording}
                          disabled={!hasCamera || isProcessing}
                          className={`flex-1 bd-button ${
                            (!hasCamera || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Start Recording
                        </button>
                        <button
                          onClick={() => setIsManualMode(true)}
                          className="px-4 py-2 border border-[#006064] text-[#006064] rounded-lg hover:bg-[#006064] hover:bg-opacity-10 transition-colors"
                        >
                          Switch to Manual Mode
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 transition-colors"
                  >
                    Stop Recording
                  </button>
                )}
                
                {feedback && (
                  <button
                    onClick={handleNext}
                    className="flex-1 border border-[#006064] text-[#006064] rounded-lg hover:bg-[#006064] hover:bg-opacity-10 transition-colors"
                  >
                    Next Question
                  </button>
                )}
              </div>

              {/* Processing State */}
              {(isProcessing || isWhisperProcessing) && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#d35400] border-t-transparent mx-auto"></div>
                  <p className="mt-2 text-gray-400">
                    {isProcessing ? 'Analyzing your response...' : 'Transcribing your speech...'}
                  </p>
                </div>
              )}

              {/* Transcription Display */}
              {!isRecording && fullTranscript && (
                <div className="mt-4 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Your Response (Whisper Transcription):</h3>
                  <p className="text-white">{fullTranscript}</p>
                </div>
              )}
              
              {/* Real-time Feedback Display */}
              {isRecording && realTimeFeedback && !isManualMode && (
                <div className="mt-4 p-4 bg-[#006064] bg-opacity-5 rounded-lg border border-[#006064] border-opacity-10">
                  <h3 className="text-sm font-medium text-[#006064] mb-2">Real-time Feedback:</h3>
                  <p className="text-[#006064] text-sm">{realTimeFeedback}</p>
                </div>
              )}

              {/* Final Feedback Section */}
              {feedback && (
                <div className="mt-4 p-4 bg-[#006064] bg-opacity-10 rounded-lg border border-[#006064] border-opacity-20">
                  <h3 className="text-sm font-medium text-[#006064] mb-2">AI Feedback (GPT-4):</h3>
                  <p className="text-[#006064] whitespace-pre-line">{feedback}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 