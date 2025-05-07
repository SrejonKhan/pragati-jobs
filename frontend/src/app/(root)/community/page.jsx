"use client";

import { useState } from "react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock posts data
  const posts = [
    {
      id: 1,
      title: "Tips for Landing Your First Developer Job",
      category: "CAREER_ADVICE",
      author: {
        name: "Alex Thompson",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        role: "Senior Developer",
      },
      content:
        "After mentoring many junior developers, I've noticed some common patterns in successful job searches. Here are my top tips...",
      likes: 124,
      comments: 35,
      timestamp: "2 days ago",
      tags: ["Career", "Job Search", "Development"],
    },
    {
      id: 2,
      title: "My Experience with the Machine Learning Specialization Course",
      category: "COURSE_REVIEW",
      author: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        role: "Data Scientist",
      },
      content:
        "I recently completed the Machine Learning Specialization, and I wanted to share my thoughts on the curriculum and what I learned...",
      likes: 87,
      comments: 19,
      timestamp: "1 week ago",
      tags: ["Machine Learning", "Course Review", "Data Science"],
    },
    {
      id: 3,
      title: "Open Positions at TechStart Inc. - Junior Developers Wanted!",
      category: "JOB_OPPORTUNITY",
      author: {
        name: "Marcus Wilson",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        role: "Tech Recruiter",
      },
      content:
        "We're expanding our team at TechStart and looking for motivated junior developers to join us. Remote options available...",
      likes: 156,
      comments: 42,
      timestamp: "3 days ago",
      tags: ["Job Opportunity", "Hiring", "Remote Work"],
    },
  ];

  const renderCategoryBadge = (category) => {
    const colors = {
      CAREER_ADVICE: "bg-blue-100 text-blue-800",
      COURSE_REVIEW: "bg-green-100 text-green-800",
      JOB_OPPORTUNITY: "bg-purple-100 text-purple-800",
      TECHNICAL_DISCUSSION: "bg-amber-100 text-amber-800",
      GENERAL: "bg-gray-100 text-gray-800",
    };

    const labels = {
      CAREER_ADVICE: "Career Advice",
      COURSE_REVIEW: "Course Review",
      JOB_OPPORTUNITY: "Job Opportunity",
      TECHNICAL_DISCUSSION: "Technical Discussion",
      GENERAL: "General",
    };

    return <span className={`text-xs px-2 py-1 rounded ${colors[category]}`}>{labels[category]}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="mt-2 text-gray-600">Connect, share, and learn with fellow community members</p>
        </div>

        {/* Search and Create Post */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search discussions, topics, or tags"
              className="w-full p-3 border border-gray-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Create Post
          </button>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab("trending")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "trending"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveTab("recent")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "recent"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Most Recent
              </button>
              <button
                onClick={() => setActiveTab("career")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "career"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Career Advice
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "courses"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Course Reviews
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                  activeTab === "jobs"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Job Opportunities
              </button>
            </nav>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white shadow-sm rounded-b-xl">
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h3 className="font-medium">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{post.timestamp}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                    {renderCategoryBadge(post.category)}
                  </div>
                  <p className="text-gray-700">{post.content}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-blue-600">
                      <span className="mr-1">👍</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-600">
                      <span className="mr-1">💬</span>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <a href={`/community/post/${post.id}`} className="text-sm text-blue-600 hover:underline">
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Community Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600">12,450+</p>
              <p className="text-sm text-gray-500">Community Members</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600">5,280+</p>
              <p className="text-sm text-gray-500">Discussions</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600">842+</p>
              <p className="text-sm text-gray-500">Job Opportunities Shared</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600">1,320+</p>
              <p className="text-sm text-gray-500">Course Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
