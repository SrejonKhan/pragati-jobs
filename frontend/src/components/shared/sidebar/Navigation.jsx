"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Briefcase, Award, Users, MessageSquare, BarChart, User, Globe } from "lucide-react";

const navigationItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "Jobs", path: "/jobs", icon: Briefcase },
  { name: "Skills", path: "/skills", icon: Award },
  { name: "Mentors", path: "/mentors", icon: Users },
  { name: "Community", path: "/community", icon: MessageSquare },
  { name: "Collaboration Portal", path: "/collaboration-portal", icon: Globe },
  {
    name: "My Career",
    icon: BarChart,
    children: [
      { name: "Portfolio", path: "/portfolio", icon: User },
      { name: "Learning Path", path: "/learning-path", icon: Award },
      { name: "Applications", path: "/applications", icon: Briefcase },
    ],
  },
];

const Navigation = ({ isCollapsed }) => {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-2">
      {navigationItems.map((item) => (
        <div key={item.name}>
          {item.children ? (
            <div className="space-y-1">
              <div className={`flex items-center px-3 py-2 text-gray-600 ${isCollapsed ? "justify-center" : ""}`}>
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </div>
              {!isCollapsed && (
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === child.path 
                          ? "bg-[#aaffdd] text-[#006a4e] font-medium" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <child.icon className="h-4 w-4" />
                      <span className="ml-3">{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.path}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${isCollapsed ? "justify-center" : ""} ${
                pathname === item.path 
                  ? "bg-[#aaffdd] text-[#006a4e] font-medium" 
                  : "text-gray-600 hover:bg-[#f5f5f5]"
              }`}
            >
              <item.icon className={`h-5 w-5 ${pathname === item.path ? "text-[#006a4e]" : ""}`} />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
