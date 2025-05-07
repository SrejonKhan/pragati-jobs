"use client"

import { User } from "lucide-react"
import { useEffect, useState } from "react"

const UserProfile = ({ isCollapsed }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(storedUser)
  }, [])

  if (!user) return null

  return (
    <div className={`p-4 border-b ${isCollapsed ? "text-center" : ""}`}>
      <div className="flex items-center space-x-3">
        {user.userProfile?.avatarUrl ? (
          <img 
            src={user.userProfile.avatarUrl} 
            alt={user.displayName}
            className="h-10 w-10 rounded-full object-cover flex-shrink-0 border-2 border-[#006a4e]"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-[#aaffdd] flex items-center justify-center flex-shrink-0 border-2 border-[#006a4e]">
            <span className="text-[#006a4e] font-semibold">
              {user.displayName?.[0]?.toUpperCase()}
            </span>
          </div>
        )}
        {!isCollapsed && (
          <div>
            <p className="font-medium text-[#006a4e]">{user.displayName}</p>
            <p className="text-sm text-gray-600">
              {user.userProfile?.department || 'Student'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile 