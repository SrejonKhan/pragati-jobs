"use client";

import { useState } from "react";
import { Search, Filter, Star, Clock, ChevronRight, CheckCircle } from "lucide-react";

export default function Courses() {
  // Dummy course data
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Md. Sakib Rahman",
      institution: "Bangladesh University of Engineering and Technology",
      rating: 4.8,
      students: 3250,
      duration: "8 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400",
      tags: ["HTML", "CSS", "JavaScript"],
      price: "Free",
      progress: 78,
      modules: 12,
      modulesCompleted: 9,
      lastUpdated: "October 2023",
    },
    {
      id: 2,
      title: "Data Science for Beginners",
      instructor: "Dr. Fazle Rabbi",
      institution: "North South University",
      rating: 4.6,
      students: 2150,
      duration: "10 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
      tags: ["Python", "Data Analysis", "Visualization"],
      price: "৳3,500",
      progress: null,
      modules: 15,
      modulesCompleted: 0,
      lastUpdated: "November 2023",
    },
    {
      id: 3,
      title: "Artificial Intelligence: Machine Learning",
      instructor: "Dr. Shadman Sakib",
      institution: "Islamic University of Technology",
      rating: 4.9,
      students: 1850,
      duration: "12 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=400",
      tags: ["ML", "Neural Networks", "Python"],
      price: "৳4,999",
      progress: null,
      modules: 18,
      modulesCompleted: 0,
      lastUpdated: "December 2023",
    },
    {
      id: 4,
      title: "React.js - Building Modern UIs",
      instructor: "Anika Tahsin",
      institution: "BRAC University",
      rating: 4.7,
      students: 2780,
      duration: "6 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=400",
      tags: ["React", "JavaScript", "Frontend"],
      price: "৳2,750",
      progress: 45,
      modules: 10,
      modulesCompleted: 4,
      lastUpdated: "September 2023",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      instructor: "Nasim Ahmed",
      institution: "Daffodil International University",
      rating: 4.5,
      students: 1950,
      duration: "8 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=400",
      tags: ["Flutter", "Dart", "Mobile"],
      price: "৳3,200",
      progress: null,
      modules: 14,
      modulesCompleted: 0,
      lastUpdated: "October 2023",
    },
    {
      id: 6,
      title: "Cloud Computing Fundamentals",
      instructor: "Fahim Rahman",
      institution: "Independent University Bangladesh",
      rating: 4.4,
      students: 1250,
      duration: "5 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&q=80&w=400",
      tags: ["AWS", "Cloud", "DevOps"],
      price: "৳2,500",
      progress: 22,
      modules: 8,
      modulesCompleted: 2,
      lastUpdated: "November 2023",
    }
  ];

  // Categories for filtering
  const categories = [
    "All Courses",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "AI & Machine Learning",
    "Cloud Computing"
  ];

  // State for filtering and search
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [showInProgress, setShowInProgress] = useState(false);

  // Filter courses based on selected category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All Courses" || 
      course.tags.some(tag => selectedCategory.toLowerCase().includes(tag.toLowerCase())) ||
      course.title.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesProgress = showInProgress ? course.progress !== null : true;
    
    return matchesCategory && matchesSearch && matchesProgress;
  });

  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-top py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl bd-heading mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#006a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="bd-flag-gradient font-bold">Courses & Learning</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Find the best courses to enhance your skills and advance your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bd-card p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-[#006a4e] opacity-5"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for courses, instructors, or topics..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006a4e] focus:border-[#006a4e]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* In Progress Filter */}
            <div>
              <div className="flex items-center h-full">
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={showInProgress}
                    onChange={() => setShowInProgress(!showInProgress)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#aaffdd] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a4e]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">Show In Progress</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 py-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-[#006a4e] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-[#aaffdd]"
                } transition-colors duration-200`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bd-card hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Course Image */}
              <div className="relative h-48 w-full">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                {course.progress !== null && (
                  <div className="absolute top-2 right-2 bg-[#006a4e] text-white text-xs font-bold px-2 py-1 rounded-full">
                    In Progress
                  </div>
                )}
              </div>
              
              {/* Course Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#aaffdd] text-[#006a4e] text-xs font-medium px-2.5 py-1 rounded">
                    {course.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-current h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-[#006a4e] mb-2 line-clamp-2">{course.title}</h3>
                
                <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{course.modules} modules</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Progress bar for courses in progress */}
                {course.progress !== null && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{course.modulesCompleted} of {course.modules} modules</span>
                      <span>{course.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#006a4e] h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#f42a41] font-medium">
                    {course.price}
                  </span>
                  <button className="bd-button text-sm py-1.5 px-4 flex items-center">
                    {course.progress !== null ? 'Continue' : 'Enroll'} 
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <div className="bd-card p-12 text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSelectedCategory("All Courses");
                setSearchQuery("");
                setShowInProgress(false);
              }}
              className="bd-button-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}