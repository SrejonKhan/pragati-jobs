"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

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
  useEffect(() => {
    if (isAsking && question) {
      const utterance = new SpeechSynthesisUtterance(question);
      // Set voice preferences
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || voice.name.includes('en-US')
      ) || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher pitch for professionalism
      }

      utterance.onstart = () => onQuestionStart();
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech when component updates
    };
  }, [isAsking, question, onQuestionStart]);

  return (
    <div className="relative w-96 mx-auto">
      <div className="interviewer-container">
        {/* Real Human Avatar */}
        <div className={`interviewer-avatar ${isAsking ? 'speaking' : ''}`}>
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-200">
            {/* Using a professional interviewer image */}
            <img 
              src="/images/interviewer-1.jpg" 
              alt="Professional Interviewer"
              className="w-full h-full object-cover"
            />
            {/* Fallback interviewer images in case the first one fails */}
            <img 
              src="/images/interviewer-2.jpg" 
              alt="Professional Interviewer"
              className="hidden"
              onError={(e) => {
                e.target.style.display = 'none';
                const nextImg = e.target.nextElementSibling;
                if (nextImg) nextImg.style.display = 'block';
              }}
            />
            <img 
              src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
              alt="Professional Interviewer"
              className="hidden"
              onError={(e) => {
                e.target.style.display = 'none';
                // If all images fail, show a fallback avatar
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><svg class="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></div>';
              }}
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

export default function MockInterview() {
  const router = useRouter();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef(null);
  const recognitionRef = useRef(null);
  
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showHologram, setShowHologram] = useState(true);
  const [videoBlob, setVideoBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [hasCamera, setHasCamera] = useState(true);
  const [currentCaption, setCurrentCaption] = useState('');
  const [fullTranscript, setFullTranscript] = useState('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [recognitionError, setRecognitionError] = useState(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualTranscript, setManualTranscript] = useState('');
  const retryTimeoutRef = useRef(null);
  const maxRetries = 3;
  const [retryCount, setRetryCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState(null);
  const isTranscribing = useRef(false);

  // Initialize speech recognition with improved error handling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          setSpeechRecognitionSupported(false);
          setTranscriptionError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
          return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
          isTranscribing.current = true;
          setTranscriptionError(null);
          console.log('Speech recognition started');
        };

        recognitionRef.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
              setFullTranscript(prev => prev + ' ' + transcript);
            } else {
              interimTranscript += transcript;
            }
          }

          setCurrentCaption(interimTranscript);
          if (finalTranscript) {
            console.log('Final transcript:', finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'network') {
            handleNetworkError();
          } else {
            setTranscriptionError(getErrorMessage(event.error));
            if (event.error === 'not-allowed') {
              setSpeechRecognitionSupported(false);
            }
          }
        };

        recognitionRef.current.onend = () => {
          console.log('Speech recognition ended');
          if (isRecording && !isManualMode && isTranscribing.current) {
            console.log('Restarting speech recognition...');
            startRecognition();
          }
          isTranscribing.current = false;
        };

      } catch (error) {
        console.error('Speech recognition initialization error:', error);
        setSpeechRecognitionSupported(false);
        setTranscriptionError('Failed to initialize speech recognition. Please use Chrome or Edge.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, isManualMode]);

  const getErrorMessage = (error) => {
    switch (error) {
      case 'not-allowed':
        return 'Microphone access denied. Please enable microphone permissions.';
      case 'no-speech':
        return 'No speech detected. Please try speaking again.';
      default:
        return `Error: ${error}`;
    }
  };

  const handleNetworkError = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setRecognitionError(`Attempting to reconnect... (Attempt ${retryCount + 1}/${maxRetries})`);
      retryTimeoutRef.current = setTimeout(() => {
        restartRecognition();
      }, 2000);
    } else {
      setRecognitionError('Speech recognition unavailable. Switched to manual mode.');
      setIsManualMode(true);
    }
  };

  const restartRecognition = () => {
    if (recognitionRef.current && !isManualMode) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Failed to restart speech recognition:', e);
        setIsManualMode(true);
      }
    }
  };

  // Initialize video stream
  useEffect(() => {
    if (isStarted) {
      initializeCamera();
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
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

  // Modified startRecording function
  const startRecording = async () => {
    if (!videoRef.current?.srcObject) return;

    // Reset states
    setCurrentCaption('');
    setFullTranscript('');
    setManualTranscript('');
    setTranscriptionError(null);
    setRetryCount(0);
    
    // Start speech recognition
    if (!isManualMode) {
      startRecognition();
    }

    // Start video recording
    chunksRef.current = [];
    try {
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
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      setTranscriptionError('Failed to start recording. Please check your camera and microphone permissions.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (recognitionRef.current && !isManualMode) {
        recognitionRef.current.stop();
      }
      
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setVideoBlob(blob);
      
      // Only process automatically if not in manual mode
      if (!isManualMode) {
        processRecording(blob);
      }
      
      setIsRecording(false);
    }
  };

  // Process recording with manual fallback
  const processRecording = async (blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('video', blob);
      formData.append('transcription', isManualMode ? manualTranscript : fullTranscript);
      
      const response = await fetch('/api/process-interview', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to process video');
      
      const data = await response.json();
      setTranscription(data.transcription);
      setFeedback(data.feedback);
      
    } catch (error) {
      console.error('Error processing video:', error);
      setFeedback('There was an error processing your response. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Add manual submission handler
  const handleManualSubmit = async () => {
    if (!manualTranscript.trim()) return;
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('transcription', manualTranscript);
      if (videoBlob) {
        formData.append('video', videoBlob);
      }
      
      const response = await fetch('/api/process-interview', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to process response');
      
      const data = await response.json();
      setTranscription(data.transcription);
      setFeedback(data.feedback);
    } catch (error) {
      console.error('Error processing response:', error);
      setFeedback('There was an error processing your response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setFeedback('');
      setVideoBlob(null);
      setTranscription('');
    } else {
      setIsStarted(false);
      setCurrentQuestion(0);
    }
  };

  const startInterview = () => {
    setIsStarted(true);
    setShowHologram(true);
  };

  // Add speaking animation when changing questions
  useEffect(() => {
    if (isStarted) {
      setIsAvatarSpeaking(true);
      const timer = setTimeout(() => {
        setIsAvatarSpeaking(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, isStarted]);

  // Add styles for avatar animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .interviewer-container {
        position: relative;
        padding: 2rem;
      }

      .interviewer-avatar {
        position: relative;
        transition: all 0.3s ease;
      }

      .interviewer-avatar.speaking {
        animation: subtle-speak 1s infinite alternate;
      }

      @keyframes subtle-speak {
        0% { transform: scale(1); }
        100% { transform: scale(1.02); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const startRecognition = () => {
    if (recognitionRef.current && !isManualMode) {
      try {
        recognitionRef.current.start();
        console.log('Starting speech recognition...');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setTranscriptionError('Failed to start speech recognition. Please try again.');
      }
    }
  };

  // Handle question start
  const handleQuestionStart = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop(); // Stop previous recognition
      setTimeout(() => {
        if (isRecording && !isManualMode) {
          startRecognition(); // Restart recognition after question
        }
      }, 500);
    }
  };

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
              Record your responses and get real-time feedback powered by AI.
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
            <div className="relative flex justify-center">
              <HumanInterviewer 
                isAsking={isAvatarSpeaking}
                question={mockQuestions[currentQuestion].question}
                onQuestionStart={handleQuestionStart}
              />
            </div>

            {/* Add transcription error display */}
            {transcriptionError && !isManualMode && (
              <div className="p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-20 rounded-lg">
                <p className="text-yellow-200 mb-2">{transcriptionError}</p>
                <button
                  onClick={() => setIsManualMode(true)}
                  className="text-yellow-200 underline hover:text-yellow-300"
                >
                  Switch to manual transcription
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

              {/* Video Preview with Captions or Manual Input */}
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
                </div>

                {/* Modified Manual Input Section */}
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
              </div>

              {/* Modified Controls */}
              <div className="flex flex-wrap gap-4">
                {!isRecording ? (
                  <>
                    {isManualMode ? (
                      <>
                        <button
                          onClick={handleManualSubmit}
                          disabled={!manualTranscript.trim() || isSubmitting}
                          className={`flex-1 bd-button ${
                            !manualTranscript.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isSubmitting ? 'Processing...' : 'Submit Response'}
                        </button>
                        <button
                          onClick={() => setIsManualMode(false)}
                          className="px-4 py-2 border border-[#006064] text-[#006064] rounded-lg hover:bg-[#006064] hover:bg-opacity-10 transition-colors"
                        >
                          Try Auto Transcription
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
              {(isProcessing || isSubmitting) && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#d35400] border-t-transparent mx-auto"></div>
                  <p className="mt-2 text-gray-400">
                    {isSubmitting ? 'Processing your response...' : 'Analyzing your response...'}
                  </p>
                </div>
              )}

              {/* Transcription Display */}
              {manualTranscript && isManualMode && !isRecording && (
                <div className="mt-4 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Your Response:</h3>
                  <p className="text-white">{manualTranscript}</p>
                </div>
              )}

              {/* Feedback Section */}
              {feedback && (
                <div className="mt-4 p-4 bg-[#006064] bg-opacity-10 rounded-lg border border-[#006064] border-opacity-20">
                  <h3 className="text-sm font-medium text-[#006064] mb-2">AI Feedback:</h3>
                  <p className="text-[#006064] whitespace-pre-line">{feedback}</p>
                </div>
              )}
            </div>

            {/* Speech Recognition Status */}
            {!speechRecognitionSupported && (
              <div className="p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-20 rounded-lg">
                <p className="text-yellow-200">
                  Speech recognition is not supported in your browser. Captions will not be available.
                  Try using Chrome or Edge for the best experience.
                </p>
              </div>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#d35400] to-[#006064] h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 