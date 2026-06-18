"use client"
import { ChevronDown } from "lucide-react"

interface UserProfileProps {
  name: string
  org: string
  email: string
}

export default function UserProfile({ name, org, email }: UserProfileProps) {
  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
          {name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white">{name} • {org}</h3>
          <p className="text-xs text-zinc-400 truncate">{email}</p>
        </div>
        <ChevronDown size={16} className="text-zinc-400" />
      </div>
    </div>
  )
}
