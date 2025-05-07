"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, MessageCircle, ThumbsUp, Share, Clock, Tag, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CollaborationPortal() {
  // Industry categories for selection
  const industryCategories = [
    "All Industries",
    "Healthcare",
    "Technology",
    "Education",
    "Finance",
    "Engineering",
    "Agriculture",
    "Manufacturing",
    "Entertainment",
    "Transportation",
    "Retail",
    "Energy",
    "Environmental",
    "Legal",
    "Hospitality"
  ];

  // Problem categories for selection
  const problemCategories = [
    "All Problems",
    "Software Solution",
    "Hardware Development",
    "Research Collaboration",
    "Process Improvement",
    "Data Analysis",
    "UI/UX Design",
    "Supply Chain",
    "Education & Training",
    "Marketing Strategy",
    "Customer Experience",
    "Sustainability"
  ];

  // Mock challenges/problems data
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "AI-powered diagnostic tool for rural healthcare clinics",
      industry: "Healthcare",
      description: "Looking for a technology expert to help develop a low-cost AI diagnostic tool that can work in areas with limited connectivity to assist healthcare workers in rural clinics.",
      problemType: "Software Solution",
      postedBy: {
        name: "Dr. Sarah Ahmed",
        profession: "Medical Director",
        organization: "Rural Health Initiative",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=50&h=50"
      },
      skills: ["AI/ML", "Healthcare", "Mobile Development", "Low-connectivity Solutions"],
      likes: 42,
      comments: 16,
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Water purification system for flood-prone areas",
      industry: "Environmental",
      description: "As an environmental engineer, I'm looking for mechanical engineers and software developers to collaborate on creating a low-cost, solar-powered water purification system for communities in flood-prone areas.",
      problemType: "Hardware Development",
      postedBy: {
        name: "Prof. Mahmud Hasan",
        profession: "Environmental Engineer",
        organization: "BUET",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=50&h=50"
      },
      skills: ["Water Purification", "Solar Power", "Environmental Engineering", "Hardware Design"],
      likes: 36,
      comments: 24,
      postedDate: "5 days ago"
    },
    {
      id: 3,
      title: "Financial education platform for small farmers",
      industry: "Agriculture",
      description: "Working with small-scale farmers who need better financial education. Looking for financial experts and app developers to create an accessible learning platform that works offline.",
      problemType: "Education & Training",
      postedBy: {
        name: "Nusrat Khan",
        profession: "Agricultural Consultant",
        organization: "FarmTech BD",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=50&h=50"
      },
      skills: ["Finance", "Agriculture", "Educational Content", "Offline Apps"],
      likes: 28,
      comments: 12,
      postedDate: "1 week ago"
    },
    {
      id: 4,
      title: "Online learning platform for students with disabilities",
      industry: "Education",
      description: "Need assistance from technology experts to develop an inclusive online learning platform with accessibility features for students with various disabilities.",
      problemType: "Software Solution",
      postedBy: {
        name: "Anika Rahman",
        profession: "Special Education Teacher",
        organization: "Inclusive Education Society",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50&h=50"
      },
      skills: ["Accessibility", "Education", "Web Development", "UX Design"],
      likes: 56,
      comments: 19,
      postedDate: "3 days ago"
    },
    {
      id: 5,
      title: "Supply chain tracking system for pharmaceutical delivery",
      industry: "Healthcare",
      description: "Our hospital network needs a better way to track temperature-sensitive medications during transport. Looking for logistics and software experts to develop a real-time tracking system.",
      problemType: "Supply Chain",
      postedBy: {
        name: "Dr. Kamal Uddin",
        profession: "Hospital Administrator",
        organization: "National Health Services",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50"
      },
      skills: ["Supply Chain", "IoT", "Healthcare", "Real-time Systems"],
      likes: 32,
      comments: 14,
      postedDate: "1 day ago"
    }
  ]);

  // State for form modal
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: "",
    industry: "",
    description: "",
    problemType: "",
    skills: []
  });

  // State for filters
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedProblemType, setSelectedProblemType] = useState("All Problems");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(problems);

  // Apply filters
  useEffect(() => {
    let filtered = [...problems];
    
    // Filter by industry
    if (selectedIndustry !== "All Industries") {
      filtered = filtered.filter(problem => problem.industry === selectedIndustry);
    }
    
    // Filter by problem type
    if (selectedProblemType !== "All Problems") {
      filtered = filtered.filter(problem => problem.problemType === selectedProblemType);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(query) || 
        problem.description.toLowerCase().includes(query) ||
        problem.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    setFilteredProblems(filtered);
  }, [problems, selectedIndustry, selectedProblemType, searchQuery]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle selection change
  const handleSelectChange = (name, value) => {
    setNewProblem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle skill input
  const handleSkillInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      setNewProblem(prev => ({
        ...prev,
        skills: [...prev.skills, e.target.value.trim()]
      }));
      e.target.value = '';
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove) => {
    setNewProblem(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Submit new problem
  const handleSubmitProblem = (e) => {
    e.preventDefault();
    
    // Add a new problem to the list
    const newId = problems.length > 0 ? Math.max(...problems.map(p => p.id)) + 1 : 1;
    
    // Mock user data (would be the actual user in a real app)
    const currentUser = {
      name: "Your Name",
      profession: "Your Profession",
      organization: "Your Organization",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=50&h=50"
    };
    
    const problemToAdd = {
      id: newId,
      title: newProblem.title,
      industry: newProblem.industry,
      description: newProblem.description,
      problemType: newProblem.problemType,
      postedBy: currentUser,
      skills: newProblem.skills,
      likes: 0,
      comments: 0,
      postedDate: "Just now"
    };
    
    setProblems(prev => [problemToAdd, ...prev]);
    
    // Reset form and close modal
    setNewProblem({
      title: "",
      industry: "",
      description: "",
      problemType: "",
      skills: []
    });
    setShowProblemForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-bottom py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl bd-heading mb-2 flex items-center">
            <Globe className="h-8 w-8 mr-3 text-[#006a4e]" />
            <span className="bd-flag-gradient font-bold">Cross-Industry Collaboration Portal</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Connect with professionals from different industries to solve interdisciplinary challenges
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bd-card mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search challenges by title, description or required skills..."
                  className="w-full pl-10 pr-4 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
              <div className="w-full md:w-64">
                <Select 
                  value={selectedIndustry} 
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryCategories.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-64">
                <Select 
                  value={selectedProblemType}
                  onValueChange={setSelectedProblemType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Problem Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {problemCategories.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="bd-button w-full md:w-auto"
                onClick={() => setShowProblemForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Post a Challenge
              </Button>
            </div>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="space-y-6">
          {filteredProblems.length > 0 ? (
            filteredProblems.map(problem => (
              <div key={problem.id} className="bd-card hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <img 
                    src={problem.postedBy.avatar} 
                    alt={problem.postedBy.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#006a4e] mb-1">{problem.title}</h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="font-medium mr-2">{problem.postedBy.name}</span>
                      <span>• {problem.postedBy.profession} at {problem.postedBy.organization}</span>
                      <span className="ml-auto flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {problem.postedDate}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {problem.description}
                    </p>
                    
                    <div className="flex flex-wrap mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#aaffdd] text-[#006a4e] mr-2 mb-2">
                        <Tag className="h-3 w-3 mr-1" />
                        {problem.industry}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f8d9c4] text-[#d35400] mr-2 mb-2">
                        <Filter className="h-3 w-3 mr-1" />
                        {problem.problemType}
                      </span>
                      {problem.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mr-2 mb-2"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex border-t pt-4">
                      <Button variant="ghost" className="text-gray-600 hover:text-[#006a4e] hover:bg-[#aaffdd]">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        <span>{problem.likes}</span>
                      </Button>
                      <Button variant="ghost" className="text-gray-600 hover:text-[#006a4e] hover:bg-[#aaffdd]">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <span>{problem.comments}</span>
                      </Button>
                      <Button variant="ghost" className="text-gray-600 hover:text-[#006a4e] hover:bg-[#aaffdd] ml-auto">
                        <Share className="h-4 w-4 mr-2" />
                        <span>Share</span>
                      </Button>
                      <Button className="bd-button ml-2">
                        Collaborate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bd-card p-12 text-center">
              <div className="flex justify-center mb-4">
                <Globe className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No challenges found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedIndustry("All Industries");
                  setSelectedProblemType("All Problems");
                  setSearchQuery("");
                }}
                className="mr-2"
              >
                Reset Filters
              </Button>
              <Button 
                className="bd-button"
                onClick={() => setShowProblemForm(true)}
              >
                Post a Challenge
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* New Problem Form Modal */}
      {showProblemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#006a4e]">Post a New Challenge</h2>
                <button 
                  onClick={() => setShowProblemForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmitProblem} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Challenge Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={newProblem.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter a clear, specific title for your challenge"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Industry *
                    </label>
                    <Select
                      value={newProblem.industry}
                      onValueChange={(value) => handleSelectChange("industry", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryCategories.slice(1).map(industry => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="problemType" className="block text-sm font-medium text-gray-700 mb-1">
                      Problem Type *
                    </label>
                    <Select
                      value={newProblem.problemType}
                      onValueChange={(value) => handleSelectChange("problemType", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select problem type" />
                      </SelectTrigger>
                      <SelectContent>
                        {problemCategories.slice(1).map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Challenge Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={newProblem.description}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:border-[#006a4e]"
                    placeholder="Describe your challenge in detail, including context, requirements, and what kind of help you're looking for"
                  />
                </div>
                
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Required Skills/Expertise
                  </label>
                  <div className="mb-2">
                    <Input
                      id="skills"
                      placeholder="Type a skill and press Enter"
                      onKeyDown={handleSkillInput}
                    />
                  </div>
                  <div className="flex flex-wrap">
                    {newProblem.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mr-2 mb-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowProblemForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bd-button"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post Challenge
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 