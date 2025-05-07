"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchUserData();
  }, [router]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Since we already have the user data from login, we can use it directly
      setUserData(user);
    } catch (error) {
      toast.error("Failed to load user data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: "Find Courses",
      description: "Discover courses that match your career goals and skill needs",
      icon: "📚",
      href: "/courses",
      color: "bg-blue-50",
    },
    {
      title: "Explore Jobs",
      description: "Browse job listings aligned with your skills and interests",
      icon: "💼",
      href: "/jobs",
      color: "bg-green-50",
    },
    {
      title: "Skill Assessment",
      description: "Evaluate your skills and get personalized recommendations",
      icon: "📊",
      href: "/skills",
      color: "bg-purple-50",
    },
    {
      title: "Find a Mentor",
      description: "Connect with experienced professionals in your field",
      icon: "👥",
      href: "/mentors",
      color: "bg-amber-50",
    },
    {
      title: "Community",
      description: "Join discussions and share knowledge with peers",
      icon: "🌐",
      href: "/community",
      color: "bg-rose-50",
    },
    {
      title: "Build Your Portfolio",
      description: "Showcase your projects and achievements",
      icon: "🏆",
      href: "/portfolio",
      color: "bg-cyan-50",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SkillBridge</h1>
          <p className="text-xl text-gray-600">Bridging the gap between education and employment</p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-gray-500">Skills added to your profile</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Courses</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-gray-500">Courses in progress or completed</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Applications</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-gray-500">Job applications submitted</p>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Explore SkillBridge</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <a
                key={index}
                href={feature.href}
                className={`flex flex-col items-center p-4 rounded-lg ${feature.color} hover:shadow-md transition-all duration-300 group`}
              >
                <span className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
                <h3 className="text-base font-semibold text-center">{feature.title}</h3>
                <p className="text-sm text-center text-gray-600 mt-2">{feature.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Start with these courses</h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on your profile, these courses can help you build relevant skills
              </p>
              <a href="/courses" className="text-blue-600 hover:underline text-sm font-medium">
                Browse all courses →
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Job opportunities for you</h3>
              <p className="text-sm text-gray-600 mb-4">Jobs that match your current skills and experience level</p>
              <a href="/jobs" className="text-blue-600 hover:underline text-sm font-medium">
                See all jobs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
