"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationSuccess() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Mock user profile data that would normally be fetched from an API
  const [userData, setUserData] = useState({
    name: "Md. Tasnim Rahman",
    email: "tasnim.rahman@gmail.com",
    university: "Bangladesh University of Engineering and Technology",
    department: "Computer Science and Engineering",
    resumeAnalysis: {
      skills: [
        { name: "JavaScript", level: "Intermediate" },
        { name: "React", level: "Beginner" },
        { name: "HTML/CSS", level: "Advanced" },
        { name: "Git", level: "Intermediate" }
      ],
      experience: "1-2 years",
      education: "Bachelor's Degree in Computer Science"
    },
    learningInterests: ["Web Development", "UI/UX Design", "Cloud Computing"],
    quizScore: 75
  });
  
  // Mock recommended courses based on interests and skills
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  
  useEffect(() => {
    // Simulate API call to get recommended courses
    setTimeout(() => {
      const courses = [
        {
          id: 1,
          title: "Advanced React Development",
          instructor: "Md. Sakib Rahman",
          level: "Intermediate",
          duration: "8 weeks",
          matchScore: 95,
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
          tags: ["React", "JavaScript", "Frontend"]
        },
        {
          id: 2,
          title: "UI/UX Design Fundamentals",
          instructor: "Anika Tahsin",
          level: "Beginner",
          duration: "6 weeks",
          matchScore: 92,
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400",
          tags: ["UI/UX", "Design", "Figma"]
        },
        {
          id: 3,
          title: "AWS Cloud Practitioner",
          instructor: "Fahim Rahman",
          level: "Beginner",
          duration: "5 weeks",
          matchScore: 87,
          image: "https://images.unsplash.com/photo-1603695576504-b2b22b5932e7?auto=format&fit=crop&q=80&w=400",
          tags: ["Cloud", "AWS", "DevOps"]
        },
        {
          id: 4,
          title: "Responsive Web Design Masterclass",
          instructor: "Dr. Fazle Rabbi",
          level: "Intermediate",
          duration: "4 weeks",
          matchScore: 85,
          image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=400",
          tags: ["CSS", "HTML", "Responsive Design"]
        }
      ];
      
      setRecommendedCourses(courses);
      setLoading(false);
    }, 1500);
  }, []);
  
  const goToDashboard = () => {
    router.push("/");
  };
  
  const goToCourses = () => {
    router.push("/courses");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 bd-pattern-top">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-[#f8d9c4] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#d35400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#d35400] to-[#006064] text-transparent bg-clip-text">
              Registration Complete!
            </span>
          </h1>
          
          <p className="text-gray-600 mb-6">
            Welcome to Pragoti AI, {userData.name}! Your profile has been created successfully. 
            We've analyzed your resume and interests to recommend personalized learning paths.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={goToDashboard}
              className="py-2 px-6 border border-[#d35400] text-[#d35400] rounded-lg hover:bg-[#f8d9c4] transition-colors"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={goToCourses}
              className="bd-button py-2 px-6"
            >
              Browse All Courses
            </button>
          </div>
        </div>
        
        {/* Profile Snapshot */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#d35400] mb-6">Your Profile Snapshot</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Detected Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userData.resumeAnalysis.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f8d9c4] text-[#d35400]"
                    >
                      {skill.name} · {skill.level}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Learning Interests</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userData.learningInterests.map((interest, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#e0f2f1] text-[#006064]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Education</h3>
                <p className="mt-1 text-gray-900">{userData.resumeAnalysis.education}</p>
                <p className="text-gray-700">{userData.university}</p>
                <p className="text-gray-700">{userData.department}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                <p className="mt-1 text-gray-900">{userData.resumeAnalysis.experience}</p>
              </div>
              
              {userData.quizScore && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quiz Score</h3>
                  <p className="mt-1 text-gray-900">{userData.quizScore}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recommended Courses */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-[#d35400] mb-6">Recommended Courses For You</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d35400] border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Finding the perfect courses for you...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#d35400] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {course.matchScore}% Match
                    </div>
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
                    
                    <button className="w-full text-center py-1.5 text-sm bd-button">
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <button
              onClick={goToCourses}
              className="inline-flex items-center text-[#d35400] font-medium hover:underline"
            >
              <span>See all recommended courses</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 