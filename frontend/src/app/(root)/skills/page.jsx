"use client";

import { useState } from "react";

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userSkills, setUserSkills] = useState([
    { id: 1, name: "JavaScript", proficiency: 4, category: "Technical" },
    { id: 2, name: "React", proficiency: 3, category: "Technical" },
    { id: 3, name: "Communication", proficiency: 4, category: "Soft" },
  ]);

  // Mock skill categories and recommended skills
  const skillCategories = [
    {
      name: "Technical Skills",
      skills: ["JavaScript", "Python", "React", "Node.js", "SQL", "Docker", "AWS", "Git"],
    },
    {
      name: "Soft Skills",
      skills: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management"],
    },
    {
      name: "Industry Skills",
      skills: ["Digital Marketing", "Project Management", "Data Analysis", "Product Management"],
    },
  ];

  const recommendedSkills = [
    { name: "TypeScript", reason: "Based on your JavaScript skills" },
    { name: "Express.js", reason: "Enhances your Node.js development" },
    { name: "Public Speaking", reason: "Complements your communication skills" },
  ];

  // Helper function to render skill proficiency
  const renderProficiency = (level) => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(<div key={i} className={`h-3 w-3 rounded-full ${i <= level ? "bg-blue-500" : "bg-gray-200"}`}></div>);
    }
    return <div className="flex space-x-1">{dots}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Skill Assessment</h1>
          <p className="mt-2 text-gray-600">Track, manage, and improve your skills</p>
        </div>

        {/* Your Skills Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Skills</h2>
            <button className="text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add New Skill</button>
          </div>

          {userSkills.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Skill</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Proficiency</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userSkills.map((skill) => (
                    <tr key={skill.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{skill.name}</td>
                      <td className="py-3 px-4">{skill.category}</td>
                      <td className="py-3 px-4">{renderProficiency(skill.proficiency)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-xs text-blue-600 hover:underline">Edit</button>
                          <button className="text-xs text-red-600 hover:underline">Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't added any skills yet.</p>
              <button className="mt-4 text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Add Your First Skill
              </button>
            </div>
          )}
        </div>

        {/* Skill Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Recommended Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedSkills.map((skill, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-medium">{skill.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{skill.reason}</p>
                <button className="text-xs text-blue-600 hover:underline block mt-2">Add to my skills →</button>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Skills */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Explore Skills</h2>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Search for skills"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-800 mb-3">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <button
                      key={idx}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-full transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
