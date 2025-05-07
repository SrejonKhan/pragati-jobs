"use client";

import { useState } from "react";

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    expertise: "",
    availability: "",
  });

  // Mock mentor data
  const mentors = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      title: "Senior Software Engineer",
      company: "Tech Innovations",
      expertise: ["Web Development", "JavaScript", "React"],
      bio: "15+ years of experience in web development. Passionate about helping new developers build strong foundations.",
      availability: "10 hours/week",
      rating: 4.9,
      reviews: 24,
      imgUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 2,
      name: "Mark Johnson",
      title: "Data Science Lead",
      company: "DataCorp Analytics",
      expertise: ["Python", "Machine Learning", "Statistics"],
      bio: "Data scientist with background in mathematics and 8 years industry experience. Specializes in machine learning applications.",
      availability: "5 hours/week",
      rating: 4.7,
      reviews: 18,
      imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Sophia Chen",
      title: "UX/UI Designer",
      company: "CreativeHub",
      expertise: ["User Research", "Design Thinking", "Figma"],
      bio: "Award-winning designer with focus on creating accessible, user-friendly interfaces. Loves mentoring aspiring designers.",
      availability: "8 hours/week",
      rating: 4.8,
      reviews: 31,
      imgUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
          <p className="mt-2 text-gray-600">Connect with experienced professionals who can guide your learning journey</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, expertise, or company"
                className="w-full p-3 border border-gray-200 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="p-3 border border-gray-200 rounded-lg"
                value={filters.expertise}
                onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
              >
                <option value="">Expertise</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="data">Data Science</option>
                <option value="management">Management</option>
              </select>
              <select
                className="p-3 border border-gray-200 rounded-lg"
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
              >
                <option value="">Availability</option>
                <option value="high">High (8+ hrs/week)</option>
                <option value="medium">Medium (4-7 hrs/week)</option>
                <option value="low">Low (1-3 hrs/week)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mentors List */}
        <div className="space-y-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <img src={mentor.imgUrl} alt={mentor.name} className="w-32 h-32 rounded-full object-cover mb-4" />
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 font-medium">{mentor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({mentor.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">Available {mentor.availability}</p>
                  </div>
                </div>

                <div className="md:w-3/4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{mentor.name}</h2>
                  <p className="text-gray-600 mb-2">
                    {mentor.title} at {mentor.company}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((skill) => (
                      <span key={skill} className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4">{mentor.bio}</p>

                  <div className="flex justify-end">
                    <a
                      href={`/mentors/${mentor.id}`}
                      className="text-sm mr-4 text-blue-600 hover:underline flex items-center"
                    >
                      View profile
                    </a>
                    <button className="text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                      Request Mentorship
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Mentor Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-sm p-8 text-white">
          <div className="md:flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Become a Mentor</h2>
              <p className="max-w-2xl">
                Share your knowledge and experience with others. Help learners achieve their career goals while strengthening
                your leadership and communication skills.
              </p>
            </div>
            <button className="mt-6 md:mt-0 bg-white text-blue-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Apply to Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
