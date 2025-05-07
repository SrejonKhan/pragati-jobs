"use client";

import { useState } from "react";
import { CheckCircle, Lock, Clock, Users, Calendar, ChevronRight, FileText, Target, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Cohort() {
  // Active cohort state
  const [activeCohort, setActiveCohort] = useState("healthcare-tech");
  const [activeView, setActiveView] = useState("overview");

  // Sample cohort data
  const cohorts = {
    "healthcare-tech": {
      id: "healthcare-tech",
      title: "Healthcare Technology Solutions",
      description: "Build innovative technology solutions for healthcare challenges in collaboration with medical professionals.",
      startDate: "June 15, 2023",
      endDate: "September 30, 2023",
      status: "In Progress",
      completion: 60,
      participants: 32,
      duration: "16 weeks",
      industry: "Healthcare",
      partners: ["National Health Services", "MedTech Association", "BUET"],
      mentors: [
        {
          name: "Dr. Anika Rahman",
          role: "Medical Director",
          organization: "National Health Services",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50&h=50"
        },
        {
          name: "Tariq Ahmed",
          role: "CTO",
          organization: "BdApps",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50&h=50"
        }
      ],
      sprints: [
        {
          id: 1,
          title: "Problem Definition & Research",
          duration: "2 weeks",
          status: "completed",
          description: "Understand healthcare challenges through research and stakeholder interviews. Define specific problems to solve.",
          deliverables: ["Problem statement document", "User research summary", "Market analysis"],
          startDate: "June 15, 2023",
          endDate: "June 30, 2023"
        },
        {
          id: 2,
          title: "Ideation & Solution Design",
          duration: "3 weeks",
          status: "completed",
          description: "Brainstorm and design potential solutions. Create wireframes and prototypes.",
          deliverables: ["Solution architecture", "Low-fidelity prototypes", "Technical feasibility assessment"],
          startDate: "July 1, 2023",
          endDate: "July 21, 2023"
        },
        {
          id: 3,
          title: "MVP Development",
          duration: "4 weeks",
          status: "completed",
          description: "Develop a minimum viable product (MVP) focusing on core functionality.",
          deliverables: ["Working MVP", "Testing documentation", "Basic user guide"],
          startDate: "July 22, 2023",
          endDate: "August 19, 2023"
        },
        {
          id: 4,
          title: "Testing & Validation",
          duration: "3 weeks",
          status: "in-progress",
          description: "Test the solution with real users and gather feedback for improvements.",
          deliverables: ["User testing results", "Bug reports", "Improvement recommendations"],
          startDate: "August 20, 2023",
          endDate: "September 9, 2023"
        },
        {
          id: 5,
          title: "Refinement & Final Presentation",
          duration: "3 weeks",
          status: "locked",
          description: "Refine the solution based on feedback and prepare for final presentation.",
          deliverables: ["Refined product", "Presentation deck", "Implementation plan", "Final documentation"],
          startDate: "September 10, 2023",
          endDate: "September 30, 2023"
        }
      ],
      resources: [
        {
          title: "Healthcare API Documentation",
          type: "Documentation",
          link: "#"
        },
        {
          title: "Medical UX Design Principles",
          type: "Guide",
          link: "#"
        },
        {
          title: "Data Privacy in Healthcare Applications",
          type: "Workshop Recording",
          link: "#"
        }
      ]
    },
    "agritech-innovation": {
      id: "agritech-innovation",
      title: "AgriTech Innovation for Sustainable Farming",
      description: "Develop technology solutions for agricultural challenges to improve efficiency and sustainability.",
      startDate: "May 1, 2023",
      endDate: "August 31, 2023",
      status: "In Progress",
      completion: 75,
      participants: 28,
      duration: "16 weeks",
      industry: "Agriculture",
      partners: ["Ministry of Agriculture", "Bangladesh Agricultural University", "FarmTech BD"],
      mentors: [
        {
          name: "Dr. Mahmud Hasan",
          role: "Agricultural Scientist",
          organization: "Bangladesh Agricultural University",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=50&h=50"
        },
        {
          name: "Nusrat Khan",
          role: "AgriTech Entrepreneur",
          organization: "FarmTech BD",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=50&h=50"
        }
      ],
      sprints: [
        {
          id: 1,
          title: "Problem Definition & Research",
          duration: "2 weeks",
          status: "completed",
          description: "Research agricultural challenges and identify specific problems to address.",
          deliverables: ["Problem statement document", "Field research summary", "Stakeholder analysis"],
          startDate: "May 1, 2023",
          endDate: "May 14, 2023"
        },
        {
          id: 2,
          title: "Ideation & Solution Design",
          duration: "3 weeks",
          status: "completed",
          description: "Brainstorm and design potential solutions for agricultural challenges.",
          deliverables: ["Solution architecture", "Low-fidelity prototypes", "Technical feasibility assessment"],
          startDate: "May 15, 2023",
          endDate: "June 4, 2023"
        },
        {
          id: 3,
          title: "MVP Development",
          duration: "4 weeks",
          status: "completed",
          description: "Develop a minimum viable product focusing on core functionality.",
          deliverables: ["Working MVP", "Testing documentation", "Basic user guide"],
          startDate: "June 5, 2023",
          endDate: "July 2, 2023"
        },
        {
          id: 4,
          title: "Testing & Validation",
          duration: "3 weeks",
          status: "completed",
          description: "Test the solution with real farmers and gather feedback for improvements.",
          deliverables: ["User testing results", "Bug reports", "Improvement recommendations"],
          startDate: "July 3, 2023",
          endDate: "July 23, 2023"
        },
        {
          id: 5,
          title: "Refinement & Final Presentation",
          duration: "3 weeks",
          status: "in-progress",
          description: "Refine the solution based on feedback and prepare for final presentation.",
          deliverables: ["Refined product", "Presentation deck", "Implementation plan", "Final documentation"],
          startDate: "July 24, 2023",
          endDate: "August 13, 2023"
        }
      ]
    }
  };

  const selectedCohort = cohorts[activeCohort];

  // Helper function to render sprint status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#aaffdd] text-[#006a4e]">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f8d9c4] text-[#d35400]">
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </span>
        );
      case "locked":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <Lock className="w-3 h-3 mr-1" /> Locked
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-bottom py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl bd-heading mb-2 flex items-center">
            <Users className="h-8 w-8 mr-3 text-[#006a4e]" />
            <span className="bd-flag-gradient font-bold">Collaboration Cohorts</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Join long-term projects divided into sprints to build innovative solutions with cross-industry teams
          </p>
        </div>

        {/* Cohort Selection */}
        <div className="bd-card mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <Select value={activeCohort} onValueChange={setActiveCohort}>
                <SelectTrigger className="w-full md:w-72">
                  <SelectValue placeholder="Select a cohort" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(cohorts).map((cohort) => (
                    <SelectItem key={cohort.id} value={cohort.id}>
                      {cohort.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button className="bd-button" onClick={() => window.alert("This would show the application process for this cohort")}>
                Apply to Cohort
              </Button>
            </div>
          </div>
        </div>

        {/* Cohort Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Info */}
          <div className="lg:col-span-2 bd-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl text-[#006a4e] font-semibold mb-2">{selectedCohort.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#aaffdd] text-[#006a4e]">
                    {selectedCohort.industry}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f8d9c4] text-[#d35400]">
                    {selectedCohort.status}
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">Completion</div>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-2 bg-[#006a4e] rounded-full" 
                        style={{ width: `${selectedCohort.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedCohort.completion}%</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{selectedCohort.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> Start Date
                </div>
                <div className="font-medium">{selectedCohort.startDate}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> End Date
                </div>
                <div className="font-medium">{selectedCohort.endDate}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <Users className="w-4 h-4 mr-1" /> Participants
                </div>
                <div className="font-medium">{selectedCohort.participants}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Duration
                </div>
                <div className="font-medium">{selectedCohort.duration}</div>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-sm text-gray-500 font-medium mb-2">Partner Organizations</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCohort.partners.map((partner, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mentors Panel */}
          <div className="bd-card">
            <h3 className="text-lg font-semibold text-[#006a4e] mb-4">Cohort Mentors</h3>
            <div className="space-y-4">
              {selectedCohort.mentors?.map((mentor, index) => (
                <div key={index} className="flex items-center space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{mentor.name}</div>
                    <div className="text-sm text-gray-500">{mentor.role}</div>
                    <div className="text-xs text-gray-500">{mentor.organization}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Mentors
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap -mb-px">
            <button
              className={`mr-8 py-3 border-b-2 font-medium text-sm ${
                activeView === "overview"
                  ? "border-[#006a4e] text-[#006a4e]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveView("overview")}
            >
              Sprint Overview
            </button>
            <button
              className={`mr-8 py-3 border-b-2 font-medium text-sm ${
                activeView === "resources"
                  ? "border-[#006a4e] text-[#006a4e]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveView("resources")}
            >
              Resources
            </button>
            <button
              className={`mr-8 py-3 border-b-2 font-medium text-sm ${
                activeView === "discussions"
                  ? "border-[#006a4e] text-[#006a4e]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveView("discussions")}
            >
              Discussions
            </button>
          </div>
        </div>

        {/* Content based on active view */}
        {activeView === "overview" && (
          <div className="space-y-6">
            {/* Sprint Timeline */}
            <div className="relative">
              {selectedCohort.sprints.map((sprint, index) => (
                <div key={sprint.id} className="mb-8 relative">
                  {/* Vertical line connecting sprints */}
                  {index < selectedCohort.sprints.length - 1 && (
                    <div 
                      className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                        sprint.status === "completed" ? "bg-[#006a4e]" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                  
                  <div className="bd-card hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div 
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          sprint.status === "completed" ? "bg-[#aaffdd] text-[#006a4e]" : 
                          sprint.status === "in-progress" ? "bg-[#f8d9c4] text-[#d35400]" : 
                          "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {sprint.status === "completed" ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : sprint.status === "in-progress" ? (
                          <Clock className="h-6 w-6" />
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-[#006a4e]">
                              Sprint {sprint.id}: {sprint.title}
                            </h3>
                            <div className="flex items-center mb-2">
                              <span className="text-sm text-gray-500 mr-4">{sprint.duration}</span>
                              <span className="text-sm text-gray-500">{sprint.startDate} - {sprint.endDate}</span>
                            </div>
                          </div>
                          <div>{renderStatusBadge(sprint.status)}</div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          {sprint.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Deliverables:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {sprint.deliverables.map((deliverable, i) => (
                              <li key={i}>{deliverable}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            variant={sprint.status === "locked" ? "outline" : "default"}
                            className={sprint.status !== "locked" ? "bd-button" : ""}
                            disabled={sprint.status === "locked"}
                          >
                            {sprint.status === "completed" ? "View Results" : 
                             sprint.status === "in-progress" ? "Continue Sprint" : 
                             "Locked"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "resources" && (
          <div className="bd-card">
            <h3 className="text-xl font-semibold text-[#006a4e] mb-4">Learning Resources</h3>
            <div className="space-y-4">
              {selectedCohort.resources?.map((resource, index) => (
                <div key={index} className="flex items-center p-4 border border-gray-100 rounded-lg hover:border-[#006a4e] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#aaffdd] flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-[#006a4e]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{resource.title}</h4>
                    <div className="text-sm text-gray-500">{resource.type}</div>
                  </div>
                  <Button variant="ghost" className="text-[#006a4e]">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              
              {/* If no resources are available */}
              {!selectedCohort.resources || selectedCohort.resources.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h4 className="text-gray-500 font-medium mb-1">No resources available yet</h4>
                  <p className="text-gray-400 text-sm">Resources will be added as the cohort progresses</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === "discussions" && (
          <div className="bd-card text-center py-8">
            <Target className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h4 className="text-gray-500 font-medium mb-1">Discussion board coming soon</h4>
            <p className="text-gray-400 text-sm mb-4">We're working on implementing a discussion feature for cohorts</p>
            <Button className="bd-button">
              Get Notified When Available
            </Button>
          </div>
        )}

        {/* Open Cohorts */}
        <div className="mt-12">
          <h2 className="text-2xl bd-heading mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2" /> 
            Open Cohorts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bd-card hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#e0f2f1] flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-[#006a4e]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#006a4e] mb-2">EdTech Solution for Inclusive Learning</h3>
                  <p className="text-gray-600 mb-3">
                    Develop educational technology solutions to make learning more accessible for students with disabilities.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Education
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      16 weeks
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#aaffdd] text-[#006a4e]">
                      Applications Open
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Starts: October 15, 2023
                    </div>
                    <Button className="bd-button">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bd-card hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#e0f2f1] flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-[#006a4e]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#006a4e] mb-2">Fintech for Financial Inclusion</h3>
                  <p className="text-gray-600 mb-3">
                    Create innovative financial technology solutions to increase financial inclusion among underserved communities.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Finance
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      14 weeks
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#aaffdd] text-[#006a4e]">
                      Applications Open
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Starts: November 1, 2023
                    </div>
                    <Button className="bd-button">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 