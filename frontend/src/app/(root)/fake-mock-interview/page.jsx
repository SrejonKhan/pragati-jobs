"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, CheckCircle, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FakeMockInterview() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState("intro");
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  
  // Sample interview questions
  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      expectedDuration: 60,
      keyPoints: ["Professional experience", "Educational background", "Relevant skills"]
    },
    {
      id: 2,
      question: "What is your greatest professional achievement?",
      expectedDuration: 90,
      keyPoints: ["Challenge faced", "Actions taken", "Results achieved"]
    },
    {
      id: 3,
      question: "How do you handle difficult situations or conflicts in the workplace?",
      expectedDuration: 90,
      keyPoints: ["Conflict resolution approach", "Example of past conflict", "Outcome and learning"]
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      expectedDuration: 60,
      keyPoints: ["Career goals", "Skill development plans", "Alignment with job/industry"]
    },
    {
      id: 5,
      question: "Do you have any questions for me?",
      expectedDuration: 60,
      keyPoints: ["Company culture", "Team structure", "Growth opportunities"]
    }
  ];
  
  // Sample feedback data
  const sampleFeedback = {
    overallScore: 78,
    strengths: [
      "Strong communication skills with clear articulation of thoughts",
      "Good examples to support your statements",
      "Maintained positive tone throughout the interview"
    ],
    improvements: [
      "Some answers could be more concise and focused",
      "More specific examples would strengthen your responses",
      "Consider more structured responses using the STAR method"
    ],
    questionFeedback: [
      {
        questionId: 1,
        score: 80,
        feedback: "Good introduction but could be more concise. You covered your experience well but spent too much time on less relevant details."
      },
      {
        questionId: 2,
        score: 85,
        feedback: "Excellent response with a clear example. Your description of challenges faced and solutions implemented was very effective."
      },
      {
        questionId: 3,
        score: 70,
        feedback: "Your conflict resolution approach is sound, but the example was somewhat vague. Consider providing more specific details about the situation and your exact actions."
      },
      {
        questionId: 4,
        score: 75,
        feedback: "Your 5-year plan shows good ambition, but could be better aligned with the natural progression in this field. Consider researching typical career paths."
      },
      {
        questionId: 5,
        score: 80,
        feedback: "Good questions that demonstrate your interest in the company culture. Consider also asking about specific projects or challenges the team is currently facing."
      }
    ],
    bodylanguageFeedback: "You maintained good eye contact and posture. Some nervous gestures were noticed, such as frequent hand movements. Consider practicing a more relaxed posture.",
    improvedResponseExample: "For question 3, a stronger response might be: 'When faced with conflicts, I first ensure I fully understand all perspectives. For example, at CompanyX, two team members disagreed on project priorities. I arranged a structured meeting where each person could explain their reasoning, then facilitated a discussion focused on project goals rather than personal preferences. We reached a compromise that incorporated key elements from both approaches, and the project was completed successfully. This taught me that most conflicts arise from miscommunication or different perspectives, not bad intentions.'"
  };
  
  // Initialize camera when interview starts
  useEffect(() => {
    if (isStarted && currentStep === "interview") {
      startCamera();
    }
    
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isStarted, currentStep]);
  
  // Timer effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isRecording]);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const startRecording = () => {
    if (!streamRef.current) return;
    
    setIsRecording(true);
    setTimer(0);
    
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    
    const chunks = [];
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      // In a real app, you'd send this blob to the server or process it
      
      // Save the answer in our state
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: {
          questionId: interviewQuestions[currentQuestion].id,
          recordingBlob: blob,
          duration: timer
        }
      }));
    };
    
    mediaRecorder.start();
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Interview completed
      setCurrentStep("completed");
      showFeedback();
    }
  };
  
  const showFeedback = () => {
    // In a real app, this would be generated dynamically
    setFeedback(sampleFeedback);
    setIsCompleted(true);
  };
  
  const renderTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setIsStarted(true);
    setCurrentStep("interview");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-bottom py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl bd-heading mb-2">Mock Interview Practice</h1>
          <p className="text-gray-600">Practice your interview skills and get AI-powered feedback</p>
        </div>
        
        {currentStep === "intro" && (
          <div className="bd-card text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-[#006a4e] mb-6">Ready for your mock interview?</h2>
              <p className="text-gray-600 mb-8">
                You'll be asked a series of common interview questions. Answer as if you're in a real interview.
                After you complete all questions, you'll receive feedback on your performance.
              </p>
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">This session includes:</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#006a4e] mt-0.5 mr-2 flex-shrink-0" />
                    <span>5 standard interview questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#006a4e] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Video recording of your responses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#006a4e] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Detailed feedback on your performance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#006a4e] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Suggestions for improvement</span>
                  </li>
                </ul>
              </div>
              <Button onClick={startInterview} className="bd-button px-8 py-3 text-lg">
                Start Interview
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === "interview" && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bd-card">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Interview Progress</div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-[#006a4e] rounded-full transition-all duration-500" 
                      style={{ width: `${((currentQuestion) / interviewQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-600">
                  Question {currentQuestion + 1} of {interviewQuestions.length}
                </div>
              </div>
            </div>
            
            {/* Question Card */}
            <div className="bd-card">
              <h2 className="text-xl font-semibold text-[#006a4e] mb-4">
                Question: {interviewQuestions[currentQuestion].question}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Clock className="h-4 w-4 mr-1" />
                <span>Suggested response time: {Math.floor(interviewQuestions[currentQuestion].expectedDuration / 60)} min</span>
              </div>
              
              {/* Key points to consider */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Key points to consider:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {interviewQuestions[currentQuestion].keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Video Recording */}
            <div className="bd-card">
              <div className="mb-4 relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                {isRecording && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    Recording {renderTimer()}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                {!isRecording ? (
                  <Button 
                    onClick={startRecording}
                    className="bg-[#d35400] text-white hover:bg-[#b84a00] transition-colors"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button 
                    onClick={stopRecording}
                    className="bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
                
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion]}
                  className={`bd-button ${!answers[currentQuestion] ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {currentQuestion < interviewQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === "completed" && feedback && (
          <div className="space-y-6">
            {/* Overall Feedback Card */}
            <div className="bd-card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#006a4e] mb-2">Interview Feedback</h2>
                  <p className="text-gray-600">Based on your responses to all questions</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#006a4e] text-white flex items-center justify-center text-xl font-bold">
                  {feedback.overallScore}%
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-[#006a4e] mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006a4e] mt-2 mr-2"></span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#d35400] mb-3">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d35400] mt-2 mr-2"></span>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Body Language Feedback</h3>
                <p className="text-gray-600">{feedback.bodylanguageFeedback}</p>
              </div>
              
              <div className="bg-[#f8f9fa] p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Sample Improved Response</h3>
                <p className="text-gray-600 italic">{feedback.improvedResponseExample}</p>
              </div>
            </div>
            
            {/* Question-by-Question Feedback */}
            <div className="bd-card">
              <h2 className="text-xl font-semibold text-[#006a4e] mb-4">Question-by-Question Feedback</h2>
              <div className="space-y-6">
                {feedback.questionFeedback.map((qFeedback) => {
                  const question = interviewQuestions.find(q => q.id === qFeedback.questionId);
                  return (
                    <div key={qFeedback.questionId} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
                        <div className="bg-[#006a4e] text-white text-sm px-2 py-1 rounded-md">
                          Score: {qFeedback.score}%
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{qFeedback.feedback}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-between">
              <Button className="bg-gray-500 text-white hover:bg-gray-600 transition-colors">
                Download Report
              </Button>
              <Button className="bd-button" onClick={() => {
                setIsStarted(false);
                setCurrentStep("intro");
                setCurrentQuestion(0);
                setAnswers({});
                setFeedback(null);
                setIsCompleted(false);
              }}>
                Retry Interview
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 