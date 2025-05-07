"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  // State to track progress through registration steps
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    resumeFileName: "",
    linkedinUrl: "",
    githubUrl: "",
    completedQuiz: false,
    quizScore: null,
    learningInterests: [],
  });
  
  // Modal state for course recommendations
  const [showModal, setShowModal] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  
  // Add animation styles
  useEffect(() => {
    // Add animation classes to stylesheet
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
      
      .animate-scaleIn {
        animation: scaleIn 0.4s ease-out forwards;
      }
      
      .course-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .course-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      
      .course-card .view-button {
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(5px);
      }
      
      .course-card:hover .view-button {
        opacity: 1;
        transform: translateY(0);
      }
      
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.8; }
        100% { opacity: 1; }
      }
      
      .animate-pulse {
        animation: pulse 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Available learning interests
  const availableInterests = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Cloud Computing",
    "Blockchain",
    "DevOps",
    "Cybersecurity",
    "Digital Marketing"
  ];
  
  // Quiz questions (sample)
  const quizQuestions = [
    {
      question: "Which of the following is a JavaScript framework?",
      options: ["Java", "Python", "React", "SQL"],
      correctAnswer: "React"
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language", 
        "High Tech Machine Learning", 
        "Hyper Transfer Markup Language", 
        "Hybrid Text Management Language"
      ],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "Which of these is a version control system?",
      options: ["Docker", "Kubernetes", "Git", "Nginx"],
      correctAnswer: "Git"
    }
  ];
  
  const [quizAnswers, setQuizAnswers] = useState(Array(quizQuestions.length).fill(""));
  const [showQuizResults, setShowQuizResults] = useState(false);
  
  // Handler for file input change
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        resume: file,
        resumeFileName: file.name
      });
    }
  };
  
  // Handler for text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handler for learning interests selection
  const toggleInterest = (interest) => {
    if (formData.learningInterests.includes(interest)) {
      setFormData({
        ...formData,
        learningInterests: formData.learningInterests.filter(item => item !== interest)
      });
    } else {
      setFormData({
        ...formData,
        learningInterests: [...formData.learningInterests, interest]
      });
    }
  };
  
  // Handler for quiz answers
  const handleQuizAnswer = (index, answer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = answer;
    setQuizAnswers(newAnswers);
  };
  
  // Calculate quiz score
  const calculateQuizScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quizQuestions.length) * 100);
  };
  
  // Submit quiz and show results
  const submitQuiz = () => {
    const score = calculateQuizScore();
    setFormData({
      ...formData,
      completedQuiz: true,
      quizScore: score
    });
    setShowQuizResults(true);
  };
  
  // Skip quiz
  const skipQuiz = () => {
    setFormData({
      ...formData,
      completedQuiz: true,
      quizScore: null
    });
    setCurrentStep(currentStep + 1);
  };
  
  // Complete registration
  const completeRegistration = () => {
    // In a real app, we would submit the data to an API
    console.log("Registration complete with data:", formData);
    
    // Show loading state
    setLoadingCourses(true);
    setShowModal(true);
    
    // Simulate API call to get recommended courses
    setTimeout(() => {
      // All possible courses
      const allCourses = [
        {
          id: 1,
          title: "Advanced React Development",
          instructor: "Md. Sakib Rahman",
          level: "Intermediate",
          duration: "8 weeks",
          matchScore: 95,
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
          tags: ["React", "JavaScript", "Frontend"],
          category: "Web Development"
        },
        {
          id: 2,
          title: "UI/UX Design Fundamentals",
          instructor: "Anika Tahsin",
          level: "Beginner",
          duration: "6 weeks",
          matchScore: 92,
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400",
          tags: ["UI/UX", "Design", "Figma"],
          category: "UI/UX Design"
        },
        {
          id: 3,
          title: "AWS Cloud Practitioner",
          instructor: "Fahim Rahman",
          level: "Beginner",
          duration: "5 weeks",
          matchScore: 87,
          image: "https://images.unsplash.com/photo-1603695576504-b2b22b5932e7?auto=format&fit=crop&q=80&w=400",
          tags: ["Cloud", "AWS", "DevOps"],
          category: "Cloud Computing"
        },
        {
          id: 4,
          title: "TensorFlow for Machine Learning",
          instructor: "Dr. Fazle Rabbi",
          level: "Intermediate",
          duration: "10 weeks",
          matchScore: 89,
          image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400",
          tags: ["Python", "ML", "TensorFlow"],
          category: "Machine Learning"
        },
        {
          id: 5,
          title: "Flutter Mobile Development",
          instructor: "Nasim Ahmed",
          level: "Beginner",
          duration: "8 weeks",
          matchScore: 91,
          image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=400",
          tags: ["Flutter", "Dart", "Mobile"],
          category: "Mobile App Development"
        },
        {
          id: 6,
          title: "Data Science with Python",
          instructor: "Dr. Shadman Sakib",
          level: "Intermediate",
          duration: "12 weeks",
          matchScore: 90,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
          tags: ["Python", "Data Analysis", "Visualization"],
          category: "Data Science"
        },
        {
          id: 7,
          title: "Blockchain Development Fundamentals",
          instructor: "Rahman Khan",
          level: "Intermediate",
          duration: "8 weeks",
          matchScore: 85,
          image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=400",
          tags: ["Blockchain", "Smart Contracts", "Web3"],
          category: "Blockchain"
        },
        {
          id: 8,
          title: "DevOps and CI/CD Pipeline",
          instructor: "Fahim Hussain",
          level: "Advanced",
          duration: "6 weeks",
          matchScore: 88,
          image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=400",
          tags: ["DevOps", "Docker", "Jenkins"],
          category: "DevOps"
        },
        {
          id: 9,
          title: "Cybersecurity Essentials",
          instructor: "Tasnim Rahman",
          level: "Beginner",
          duration: "7 weeks",
          matchScore: 86,
          image: "https://images.unsplash.com/photo-1563163447-6984b60f5311?auto=format&fit=crop&q=80&w=400",
          tags: ["Security", "Ethical Hacking", "Network"],
          category: "Cybersecurity"
        },
        {
          id: 10,
          title: "Digital Marketing Strategies",
          instructor: "Nusrat Jahan",
          level: "Beginner",
          duration: "5 weeks",
          matchScore: 82,
          image: "https://images.unsplash.com/photo-1571677246347-5040e8453722?auto=format&fit=crop&q=80&w=400",
          tags: ["Marketing", "SEO", "Social Media"],
          category: "Digital Marketing"
        }
      ];
      
      // Filter courses based on user's learning interests
      let filtered = [];
      
      if (formData.learningInterests.length > 0) {
        // Find courses that match user's interests
        filtered = allCourses.filter(course => 
          formData.learningInterests.some(interest => 
            course.category === interest || course.tags.includes(interest)
          )
        );
        
        // Adjust match scores based on interests
        filtered = filtered.map(course => {
          let score = course.matchScore;
          
          // Boost score if the category is a direct match with user interests
          if (formData.learningInterests.includes(course.category)) {
            score += 5;
          }
          
          // Boost score based on how many tags match user interests
          const matchingTags = course.tags.filter(tag => 
            formData.learningInterests.some(interest => 
              interest.toLowerCase().includes(tag.toLowerCase()) || 
              tag.toLowerCase().includes(interest.toLowerCase())
            )
          );
          
          score += matchingTags.length * 2;
          
          // Cap the score at 100
          score = Math.min(score, 100);
          
          return { ...course, matchScore: score };
        });
        
        // Sort by match score
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        
        // Take top 3 recommendations
        filtered = filtered.slice(0, 3);
      } else {
        // If no interests selected, just return top rated courses
        filtered = allCourses.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
      }
      
      setRecommendedCourses(filtered);
      setLoadingCourses(false);
    }, 1500);
  };
  
  const closeModal = () => {
    setShowModal(false);
    router.push("/");
  };
  
  const goToCourses = () => {
    setShowModal(false);
    router.push("/courses");
  };
  
  // Navigate to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Conditional rendering based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl bd-heading mb-6">Let's start with the basics</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d35400] focus:border-[#d35400]"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d35400] focus:border-[#d35400]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={nextStep}
                disabled={!formData.name || !formData.email}
                className={`w-full bd-button ${
                  !formData.name || !formData.email ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl bd-heading mb-6">Upload your resume</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 border-[#d35400] bg-[#f8d9c4] text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                
                {formData.resumeFileName ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#d35400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-[#d35400] font-medium">{formData.resumeFileName}</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="text-[#006064] underline text-sm"
                    >
                      Upload a different file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#d35400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Drag and drop your resume here or</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="text-[#d35400] underline font-medium"
                    >
                      Browse files
                    </button>
                    <p className="text-gray-500 text-sm">Supported formats: PDF, DOC, DOCX</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 flex space-x-4">
              <button onClick={prevStep} className="flex-1 py-2 px-4 border border-[#d35400] text-[#d35400] rounded-lg hover:bg-[#f8d9c4] transition-colors">
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.resume}
                className={`flex-1 bd-button ${
                  !formData.resume ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl bd-heading mb-6">Connect your profiles</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d35400] focus:border-[#d35400]"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d35400] focus:border-[#d35400]"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex space-x-4">
              <button onClick={prevStep} className="flex-1 py-2 px-4 border border-[#d35400] text-[#d35400] rounded-lg hover:bg-[#f8d9c4] transition-colors">
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bd-button"
              >
                Continue
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl bd-heading mb-6">Skills Assessment Quiz (Optional)</h2>
            
            {showQuizResults ? (
              <div className="space-y-8">
                <div className="text-center p-8 bg-[#f8d9c4] rounded-lg">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#d35400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#d35400] mb-2">Quiz Completed!</h3>
                  <p className="text-gray-700">Your Score: {formData.quizScore}%</p>
                </div>
                
                <button
                  onClick={nextStep}
                  className="w-full bd-button"
                >
                  Continue to Final Step
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <p className="text-gray-600">Take this short quiz to help us understand your skill level better. This will help us recommend the most suitable courses and opportunities for you.</p>
                
                <div className="space-y-6">
                  {quizQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="p-4 border border-gray-200 rounded-lg">
                      <p className="font-medium mb-3">{qIndex + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <label key={oIndex} className="flex items-center p-2 cursor-pointer hover:bg-gray-50 rounded-md">
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={option}
                              checked={quizAnswers[qIndex] === option}
                              onChange={() => handleQuizAnswer(qIndex, option)}
                              className="h-4 w-4 text-[#d35400] focus:ring-[#d35400] border-gray-300"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 flex space-x-4">
                  <button onClick={prevStep} className="flex-1 py-2 px-4 border border-[#d35400] text-[#d35400] rounded-lg hover:bg-[#f8d9c4] transition-colors">
                    Back
                  </button>
                  <button onClick={skipQuiz} className="flex-1 py-2 px-4 border border-[#006064] text-[#006064] rounded-lg hover:bg-[#e0f2f1] transition-colors">
                    Skip Quiz
                  </button>
                  <button
                    onClick={submitQuiz}
                    disabled={quizAnswers.some(a => a === "")}
                    className={`flex-1 bd-button ${
                      quizAnswers.some(a => a === "") ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl bd-heading mb-6">What would you like to learn?</h2>
            
            <p className="text-gray-600 mb-4">Select topics you're interested in learning. We'll recommend courses tailored to your interests.</p>
            
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {availableInterests.map((interest, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    formData.learningInterests.includes(interest)
                      ? "bg-[#d35400] text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-[#f8d9c4]"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            
            <div className="pt-6 flex space-x-4">
              <button onClick={prevStep} className="flex-1 py-2 px-4 border border-[#d35400] text-[#d35400] rounded-lg hover:bg-[#f8d9c4] transition-colors">
                Back
              </button>
              <button
                onClick={completeRegistration}
                disabled={formData.learningInterests.length === 0}
                className={`flex-1 bd-button ${
                  formData.learningInterests.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Complete Registration
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 bd-pattern-top">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#d35400] to-[#006064] text-transparent bg-clip-text">
              Join Pragoti AI
            </span>
          </h1>
          <p className="text-gray-600">Create your account to access personalized learning opportunities</p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-[#d35400] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                <div className="text-xs mt-2 text-center">
                  {step === 1 && "Basics"}
                  {step === 2 && "Resume"}
                  {step === 3 && "Profiles"}
                  {step === 4 && "Quiz"}
                  {step === 5 && "Interests"}
                </div>
              </div>
            ))}
            
            {/* Progress line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-[#d35400] transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Current Step Content */}
        {renderStep()}
      </div>
      
      {/* Course Recommendations Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#f8d9c4] to-[#e0f2f1]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#d35400]">
                    Welcome to Pragoti AI, {formData.name}!
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Your profile has been created successfully. Based on your profile, we've found some courses that might interest you.
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* User Profile Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-[#d35400] mb-3">Your Profile</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Detected Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.resume && (
                        <>
                          {/* These would normally be extracted from the resume */}
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f8d9c4] text-[#d35400]">
                            JavaScript · Intermediate
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f8d9c4] text-[#d35400]">
                            HTML/CSS · Advanced
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f8d9c4] text-[#d35400]">
                            Git · Intermediate
                          </span>
                        </>
                      )}
                      {formData.completedQuiz && formData.quizScore && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f8d9c4] text-[#d35400]">
                          Quiz Score: {formData.quizScore}%
                        </span>
                      )}
                    </div>
                    
                    {/* Personalized message about skills */}
                    <p className="mt-3 text-sm text-gray-600 italic">
                      {formData.resume ? 
                        "We've analyzed your resume and identified these key skills." : 
                        "Add your resume to help us identify more of your skills."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Learning Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.learningInterests.map((interest, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#e0f2f1] text-[#006064]"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    
                    {/* Personalized message about interests */}
                    <p className="mt-3 text-sm text-gray-600 italic">
                      {formData.learningInterests.length > 0 ? 
                        `Based on your ${formData.learningInterests.length} selected interests, we've curated personalized course recommendations for you.` : 
                        "You haven't selected any learning interests yet."}
                    </p>
                  </div>
                </div>
                
                {formData.githubUrl && formData.linkedinUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Connected Profiles</h4>
                    <div className="flex space-x-4">
                      {formData.githubUrl && (
                        <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#d35400] hover:underline flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {formData.linkedinUrl && (
                        <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#d35400] hover:underline flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Personalized Welcome Note */}
              <div className="mb-6 p-4 bg-[#e0f2f1] rounded-lg border border-[#006064] border-opacity-20">
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 bg-[#006064] rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#006064]">What's Next?</h3>
                    <p className="mt-1 text-sm text-gray-700">
                      Your profile is now active! Start by exploring these recommended courses based on your interests. 
                      You can also browse all courses or complete your profile further to get even more personalized recommendations.
                    </p>
                    {formData.learningInterests.length > 0 && (
                      <p className="mt-3 text-sm font-medium text-[#006064]">
                        We see you're interested in {formData.learningInterests.slice(0, 2).join(" and ")}{formData.learningInterests.length > 2 ? ", and more" : ""}.
                        We'll continue to suggest new courses as you progress!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Recommended Courses For You</h3>
              
              {loadingCourses ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d35400] border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-gray-600">Finding the perfect courses for you...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow course-card">
                      <div className="relative h-40">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${
                          course.matchScore >= 95 ? 'bg-[#d35400] animate-pulse' : 'bg-[#d35400]'
                        }`}>
                          {course.matchScore}% Match
                        </div>
                        
                        {course.matchScore >= 95 && (
                          <div className="absolute top-2 left-2 bg-[#006064] text-white text-xs font-bold px-2 py-1 rounded-full">
                            Top Pick
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-[#f8d9c4] text-[#d35400] text-xs font-medium px-2.5 py-1 rounded">
                            {course.level}
                          </span>
                          <span className="text-xs text-gray-500">{course.duration}</span>
                        </div>
                        
                        <h3 className="text-sm font-semibold text-[#d35400] mb-1 line-clamp-2">{course.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {course.tags.map((tag, index) => (
                            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="w-full text-center py-1.5 text-sm bd-button view-button">
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8 flex items-center justify-center space-x-4">
                <button 
                  onClick={closeModal}
                  className="py-2 px-6 border border-[#d35400] text-[#d35400] rounded-lg hover:bg-[#f8d9c4] transition-colors"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={goToCourses}
                  className="bd-button py-2 px-6"
                >
                  Explore All Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 