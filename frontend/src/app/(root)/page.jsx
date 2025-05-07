"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  // Show welcome banner state
  const [showBanner, setShowBanner] = useState(true);
  
  // Sample student data with Bangladeshi names and context
  const studentProfile = {
    name: "Md. Rashedin Khan Srejon",
    university: "Bangladesh Army International University of Science and Technology (BAIUST)",
    department: "Computer Science and Engineering",
    batch: "2021",
    completedCourses: [
      {
        name: "Data Structures and Algorithms",
        platform: "Coursera",
        score: "95%",
        certificate: "CS101-CERT",
      },
      {
        name: "Machine Learning Fundamentals",
        platform: "edX",
        score: "88%",
        certificate: "ML202-CERT",
      },
      {
        name: "Web Development with React",
        platform: "Udemy",
        score: "92%",
        certificate: "WD303-CERT",
      }
    ],
    socialProfiles: {
      github: "github.com/tasnim-dev",
      linkedin: "linkedin.com/in/tasnimrahman",
      portfolio: "tasnimrahman.dev"
    },
    skills: [
      { name: "Python", level: "Advanced", score: 85 },
      { name: "JavaScript", level: "Intermediate", score: 75 },
      { name: "React", level: "Intermediate", score: 70 },
      { name: "Machine Learning", level: "Beginner", score: 60 },
      { name: "Data Analysis", level: "Intermediate", score: 78 }
    ],
    assessmentResults: {
      technicalSkills: 82,
      problemSolving: 88,
      communication: 75,
      teamwork: 85
    },
    recommendedJobs: [
      {
        title: "Junior Software Engineer",
        company: "Brain Station 23",
        match: "95%"
    },
    {
        title: "Frontend Developer",
        company: "Kaz Software",
        match: "88%"
      },
      {
        title: "Machine Learning Engineer",
        company: "Samsung R&D Bangladesh",
        match: "82%"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-top">
      {/* Welcome Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#d35400] to-[#006064] text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-[#ab4300]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
                <p className="ml-3 font-medium truncate">
                  <span className="md:hidden">New to Pragoti AI? Sign up now!</span>
                  <span className="hidden md:inline">Are you new to Pragoti AI? Create your free account and start learning today!</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <Link
                  href="/register"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#d35400] bg-white hover:bg-gray-100"
                >
                  Register Now
                </Link>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-[#ab4300] focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                  onClick={() => setShowBanner(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Section with Profile Overview */}
        <div className="bd-card p-6 mb-8 relative overflow-hidden">
          {/* Bangladesh flag-inspired decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-[#d35400] opacity-10"></div>
          <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-[#006064] opacity-10"></div>
          
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-6 relative z-10">
            <div className="w-24 h-24 flex-shrink-0 bg-[#d35400] rounded-full flex items-center justify-center text-white mb-4 md:mb-0">
              <span className="text-3xl font-bold">{studentProfile.name.charAt(0)}</span>
        </div>
            <div>
              <h1 className="text-2xl font-bold text-[#d35400] mb-1">{studentProfile.name}</h1>
              <p className="text-gray-600">{studentProfile.university}</p>
              <p className="text-gray-500">{studentProfile.department} | Batch {studentProfile.batch}</p>
              
              {/* Social Profiles */}
              <div className="flex space-x-4 mt-3">
                <a href="#" className="text-[#d35400] hover:text-[#ab4300] transition-colors">
                  <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub</span>
                </a>
                <a href="#" className="text-[#d35400] hover:text-[#ab4300] transition-colors">
                  <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn</span>
                </a>
                <a href="#" className="text-[#d35400] hover:text-[#ab4300] transition-colors">
                  <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg> Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Assessment Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Skills */}
          <div className="bd-card p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#006a4e] opacity-5"></div>
            <h2 className="text-xl bd-heading mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Skills
            </h2>
            <div className="space-y-4 relative z-10">
              {studentProfile.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#006a4e] h-2 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Results */}
          <div className="bd-card p-6 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#f42a41] opacity-5"></div>
            <h2 className="text-xl bd-heading mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Assessment
            </h2>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {Object.entries(studentProfile.assessmentResults).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#006a4e]">
                  <h3 className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <p className="text-2xl font-bold text-gray-900 flex items-end">
                    {value}%
                    <span className="ml-2 text-sm text-gray-500">
                      {value >= 80 ? 'High' : value >= 70 ? 'Good' : 'Average'}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completed Courses */}
        <div className="bd-card p-6 mb-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 h-32 w-full bg-gradient-to-t from-[#006a4e] opacity-5"></div>
          <h2 className="text-xl bd-heading mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Completed Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {studentProfile.completedCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-100 hover:border-[#006a4e] transition-colors p-5 hover:shadow-md">
                <h3 className="font-semibold mb-2 text-[#006a4e]">{course.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500 mr-2">Platform:</span>
                  <span className="text-sm font-medium">{course.platform}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500 mr-2">Score:</span>
                  <span className="text-sm font-medium text-[#006a4e]">{course.score}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Certificate:</span>
                  <span className="text-sm font-medium">{course.certificate}</span>
                </div>
                <button className="mt-3 w-full bd-button text-sm py-1.5">View Certificate</button>
              </div>
            ))}
          </div>
        </div>

        {/* Job Recommendations */}
        <div className="bd-card p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f42a41] opacity-5"></div>
          <h2 className="text-xl bd-heading mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Recommended Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {studentProfile.recommendedJobs.map((job, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-100 hover:border-[#f42a41] transition-colors p-5 hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#f42a41]">{job.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                  </div>
                  <span className="bg-[#aaffdd] text-[#006a4e] text-xs font-medium px-2.5 py-1 rounded">
                    {job.match}
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="bd-button-secondary flex-1 text-sm">Details</button>
                  <button className="bd-button flex-1 text-sm">Apply</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/jobs" className="inline-block bd-button px-6 py-2.5">
              <span className="flex items-center">
                <span className="mr-2">See More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl bd-heading mb-2 text-center">Our Services</h2>
          <p className="text-gray-600 mb-12 text-center">
            Comprehensive tools for your career development journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Existing cards */}
            
            {/* New Collaboration Portal Card */}
            <div className="bd-card flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-full bg-[#e0f2f1] flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#006a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#006a4e] mb-3">Cross-Industry Collaboration</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Connect with professionals from different industries to solve interdisciplinary challenges and bring innovative ideas to life.
              </p>
              <a href="/collaboration-portal" className="bd-button text-center py-2 rounded-lg">
                Explore Portal
              </a>
            </div>
            
            {/* ... rest of the existing cards ... */}
          </div>
        </div>
      </section>
    </div>
  );
}
