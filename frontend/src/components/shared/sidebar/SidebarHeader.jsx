"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-lg bg-[#006a4e] flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-white">PA</span>
        </div>
        {!isCollapsed && <span className="text-xl font-semibold text-[#006a4e]">Pragoti AI</span>}
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="hidden md:flex text-[#006a4e] hover:bg-[#aaffdd] hover:text-[#006a4e]"
      >
        <ChevronLeft className={`h-6 w-6 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
      </Button>
    </div>
  );
};

export default SidebarHeader;
