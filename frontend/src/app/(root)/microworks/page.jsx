"use client";

import { useState } from "react";
import { Search, Filter, ArrowRight, Clock, Tag, PlusCircle, CheckCircle, Briefcase, DollarSign, Award, Zap, ChevronRight } from "lucide-react";

export default function Microworks() {
  // State management
  const [inputComplete, setInputComplete] = useState(false);
  const [learningInput, setLearningInput] = useState("");
  
  // Dummy student profile 
  const [studentProfile, setStudentProfile] = useState({
    name: "Md. Rashedin Khan Srejon",
    skills: [
      { name: "HTML", level: "Advanced", source: "Web Development Fundamentals" },
      { name: "CSS", level: "Advanced", source: "Web Development Fundamentals" },
      { name: "JavaScript", level: "Intermediate", source: "Web Development Fundamentals" },
      { name: "React", level: "Intermediate", source: "React.js - Building Modern UIs" }
    ],
    completedCourses: [
      "Web Development Fundamentals",
      "React.js - Building Modern UIs"
    ],
    preferredWorkTypes: ["Remote", "Part-time"]
  });

  // Function to handle skill input submission
  const handleLearningSubmit = () => {
    if (!learningInput.trim()) return;
    
    const updatedSkills = [...studentProfile.skills];
    
    // Extract what they're learning
    if (learningInput.trim()) {
      const learningItems = learningInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
      
      learningItems.forEach(item => {
        if (!updatedSkills.some(s => s.name.toLowerCase() === item.toLowerCase())) {
          updatedSkills.push({
            name: item,
            level: "Beginner", // Learning items are at beginner level
            source: "Currently learning"
          });
        }
      });
    }
    
    // Update student profile
    setStudentProfile({
      ...studentProfile,
      skills: updatedSkills
    });
    
    setInputComplete(true);
  };
  
  // Calculate personalized match scores based on skills
  const calculateMatchScore = (microwork) => {
    if (!inputComplete) return microwork.matchScore;
    
    let score = 0;
    const userSkills = studentProfile.skills.map(s => s.name.toLowerCase());
    const requiredSkills = microwork.requiredSkills.map(s => s.toLowerCase());
    
    // Direct skill matches
    const matchCount = requiredSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
    ).length;
    
    if (matchCount > 0) {
      // More matches = higher score
      score = Math.min(85, 40 + (matchCount / requiredSkills.length) * 60);
    } else {
      // No direct matches, check for related skills
      const relatedSkillsMap = {
        'javascript': ['js', 'frontend', 'web', 'react', 'angular', 'vue'],
        'css': ['html', 'frontend', 'web', 'ui', 'design'],
        'html': ['css', 'frontend', 'web'],
        'react': ['javascript', 'frontend', 'web'],
        'python': ['programming', 'data', 'analysis', 'backend'],
        'ui design': ['design', 'graphic', 'css']
      };
      
      const hasRelatedSkill = requiredSkills.some(skill => {
        const relatedTerms = relatedSkillsMap[skill] || [];
        return userSkills.some(userSkill => 
          relatedTerms.some(term => userSkill.includes(term))
        );
      });
      
      score = hasRelatedSkill ? 40 : 20; // Some relationship or low match
    }
    
    // Consider skill level
    requiredSkills.forEach(reqSkill => {
      const matchingSkill = studentProfile.skills.find(s => 
        s.name.toLowerCase().includes(reqSkill) || reqSkill.includes(s.name.toLowerCase())
      );
      
      if (matchingSkill) {
        if (matchingSkill.level === "Advanced") score += 15;
        else if (matchingSkill.level === "Intermediate") score += 10;
        else score += 5;
      }
    });
    
    return Math.min(Math.round(score), 100);
  };

  // Dummy microwork opportunities from companies
  const microworks = [
    {
      id: 1,
      title: "Build a Responsive Landing Page",
      company: "Tech Solutions BD",
      companyLogo: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Create a responsive landing page for our new product. Must be mobile-friendly and follow our brand guidelines.",
      requiredSkills: ["HTML", "CSS", "JavaScript"],
      duration: "3-5 days",
      budget: "৳5,000",
      difficulty: "Intermediate",
      type: "Remote",
      category: "Web Development",
      postedDate: "2 days ago",
      matchScore: 92
    },
    {
      id: 2,
      title: "Develop a Simple React Component",
      company: "GrameenPhone",
      companyLogo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Build a reusable React component for our dashboard that displays user analytics in a clean, interactive way.",
      requiredSkills: ["React", "JavaScript", "CSS"],
      duration: "1 week",
      budget: "৳8,000",
      difficulty: "Intermediate",
      type: "Remote",
      category: "Frontend Development",
      postedDate: "3 days ago",
      matchScore: 85
    },
    {
      id: 3,
      title: "Write Technical Blog Posts",
      company: "DevBangla Community",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Create 3 technical blog posts about modern web development techniques. Topics include React hooks, CSS grid, and API integration.",
      requiredSkills: ["Content Writing", "JavaScript", "React"],
      duration: "2 weeks",
      budget: "৳6,000",
      difficulty: "Beginner",
      type: "Remote",
      category: "Content Creation",
      postedDate: "1 week ago",
      matchScore: 78
    },
    {
      id: 4,
      title: "Fix CSS Layout Issues on E-commerce Site",
      company: "Daraz Bangladesh",
      companyLogo: "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Identify and fix responsive layout issues on our product listing pages. Must work across all device sizes.",
      requiredSkills: ["HTML", "CSS"],
      duration: "2-3 days",
      budget: "৳3,500",
      difficulty: "Beginner",
      type: "Remote",
      category: "Web Development",
      postedDate: "5 days ago",
      matchScore: 95
    },
    {
      id: 5,
      title: "UI Design for Mobile App",
      company: "Pathao",
      companyLogo: "https://images.unsplash.com/photo-1534670007418-bc50e48e2047?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Create UI designs for 5 screens of our new food delivery app. Match our existing brand style.",
      requiredSkills: ["UI Design"],
      duration: "1 week",
      budget: "৳7,500",
      difficulty: "Intermediate",
      type: "Remote",
      category: "UI/UX Design",
      postedDate: "4 days ago",
      matchScore: 60
    },
    {
      id: 6,
      title: "Python Data Processing Script",
      company: "Analytica BD",
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Develop a Python script to clean and process customer data from CSV files. Must handle missing values and outliers.",
      requiredSkills: ["Python"],
      duration: "1 week",
      budget: "৳6,500",
      difficulty: "Intermediate",
      type: "Remote",
      category: "Data Processing",
      postedDate: "1 day ago",
      matchScore: 65
    },
    {
      id: 7,
      title: "Translation of Product Descriptions",
      company: "Bangla Mart",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Translate 50 product descriptions from English to Bangla. Must maintain the marketing tone and technical accuracy.",
      requiredSkills: ["Translation", "Content Writing"],
      duration: "1 week",
      budget: "৳4,500",
      difficulty: "Beginner",
      type: "Remote",
      category: "Content Creation",
      postedDate: "3 days ago",
      matchScore: 72
    },
    {
      id: 8,
      title: "Social Media Graphics for Campaign",
      company: "Digital Marketing BD",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=50&h=50",
      description: "Create 10 social media graphics for our upcoming Eid campaign. Must follow our brand guidelines and incorporate festive elements.",
      requiredSkills: ["Graphic Design"],
      duration: "3-5 days",
      budget: "৳5,500",
      difficulty: "Intermediate",
      type: "Remote",
      category: "Graphic Design",
      postedDate: "2 days ago",
      matchScore: 68
    }
  ];

  // Categories for filtering
  const categories = [
    "All Categories",
    "Web Development",
    "Frontend Development",
    "UI/UX Design",
    "Content Creation",
    "Data Processing",
    "Graphic Design",
    "Digital Marketing"
  ];

  // State for filtering and search
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBestMatches, setShowBestMatches] = useState(true);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "Beginner" });

  // Filter microworks based on selected category, search query
  const filteredMicroworks = microworks
    .map(work => ({
      ...work,
      personalizedScore: calculateMatchScore(work)
    }))
    .filter(work => {
      // Category filtering
      const matchesCategory = selectedCategory === "All Categories" || 
        work.category === selectedCategory;
      
      // Search filtering
      const matchesSearch = searchQuery === "" || 
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => showBestMatches ? 
      b.personalizedScore - a.personalizedScore : 
      new Date(b.postedDate) - new Date(a.postedDate)
    );

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setStudentProfile({
        ...studentProfile,
        skills: [...studentProfile.skills, {...newSkill, source: "Self-reported"}]
      });
      setNewSkill({ name: "", level: "Beginner" });
      setShowAddSkillForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-top py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl bd-heading mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#006a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="bd-flag-gradient font-bold">Microworks for You</span>
          </h1>
          <p className="mt-2 text-gray-600">
            {inputComplete 
              ? "Here are small jobs and tasks that match your skills"
              : "Tell us what you're learning to find relevant microworks"}
          </p>
        </div>

        {/* Learning Input Form */}
        {!inputComplete && (
          <div className="bd-card p-6 mb-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#006a4e] mb-3">What are you currently learning?</h3>
              <p className="text-sm text-gray-500 mb-4">
                Enter technologies or skills you're currently learning, separated by commas (e.g., "React, UX Design, Python")
              </p>
              <div className="mt-4">
                <textarea
                  value={learningInput}
                  onChange={(e) => setLearningInput(e.target.value)}
                  placeholder="Enter what you're learning here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006a4e] focus:border-[#006a4e] h-32"
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleLearningSubmit}
                disabled={!learningInput.trim()}
                className={`bd-button px-6 py-3 text-base ${
                  !learningInput.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Find Microworks
              </button>
            </div>
          </div>
        )}

        {inputComplete && (
          <>
            {/* Skills Section */}
            <div className="bd-card p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-[#006a4e] opacity-5"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#006a4e]">Your Skills</h2>
                  <button
                    onClick={() => setInputComplete(false)}
                    className="text-[#006a4e] hover:text-[#015a40] flex items-center text-sm font-medium"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Edit Skills
                  </button>
                </div>
                
                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {studentProfile.skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-full px-3 py-1.5 flex items-center shadow-sm border border-gray-100"
                    >
                      <span 
                        className={`w-2.5 h-2.5 rounded-full mr-2 ${
                          skill.level === 'Advanced' ? 'bg-[#006a4e]' : 
                          skill.level === 'Intermediate' ? 'bg-[#f59e0b]' : 
                          'bg-[#f43f5e]'
                        }`}
                      ></span>
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {skill.level}
                        {skill.source && (
                          <span className="ml-1">• {
                            skill.source === 'Self-reported' 
                              ? 'Added by you' 
                              : skill.source === 'Currently learning'
                                ? 'Learning'
                                : `From ${skill.source}`
                          }</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
                      placeholder="Search for microworks, companies, or skills..."
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006a4e] focus:border-[#006a4e]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Best Matches Filter */}
                <div>
                  <div className="flex items-center h-full">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={showBestMatches}
                        onChange={() => setShowBestMatches(!showBestMatches)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#aaffdd] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a4e]"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900">Show Best Matches First</span>
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

            {/* Microworks List */}
            <div className="space-y-6 mb-10">
              {filteredMicroworks.length > 0 ? (
                filteredMicroworks.map((microwork) => (
                  <div key={microwork.id} className="bd-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                            <img 
                              src={microwork.companyLogo} 
                              alt={microwork.company} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[#006a4e]">{microwork.title}</h3>
                            <p className="text-sm text-gray-600">{microwork.company}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="bg-[#aaffdd] text-[#006a4e] text-sm font-medium px-3 py-1 rounded-full">
                            {microwork.personalizedScore}% Match
                          </div>
                          <span className="text-sm text-gray-500 mt-1">{microwork.postedDate}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 my-4">{microwork.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Tag className="h-5 w-5 text-[#006a4e] mr-2" />
                          <div>
                            <p className="text-sm text-gray-500">Required Skills</p>
                            <p className="text-sm font-medium">{microwork.requiredSkills.join(", ")}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-[#006a4e] mr-2" />
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="text-sm font-medium">{microwork.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-[#006a4e] mr-2" />
                          <div>
                            <p className="text-sm text-gray-500">Budget</p>
                            <p className="text-sm font-medium">{microwork.budget}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {microwork.difficulty}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {microwork.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {microwork.category}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          {microwork.personalizedScore >= 80 ? (
                            <span className="flex items-center text-[#006a4e]">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Great match for your skills!
                            </span>
                          ) : microwork.personalizedScore >= 60 ? (
                            <span className="flex items-center text-[#f59e0b]">
                              <Zap className="h-4 w-4 mr-1" />
                              Good opportunity to build experience
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <Award className="h-4 w-4 mr-1" />
                              Challenge yourself with new skills
                            </span>
                          )}
                        </div>
                        <button className="bd-button py-2 px-4 flex items-center">
                          Apply Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* Empty state */
                <div className="bd-card p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <Briefcase className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No microworks found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCategory("All Categories");
                      setSearchQuery("");
                    }}
                    className="bd-button-secondary"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 