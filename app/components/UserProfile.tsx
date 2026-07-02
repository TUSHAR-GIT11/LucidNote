"use client"

import { ChevronDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


export default function UserProfile() {
  const { data:session } = useSession()
  const [orgName, setOrgName] = useState("")

  useEffect(()=>{
    fetch("/api/organization")
     .then(r => r.json())
     .then(data => {
       if(data?.name) setOrgName(data.name)
     })
  },[])

  const name = session?.user?.name || "User"
  const email = session?.user?.email || ""

  return (
    <div className="border-t border-white/5 p-3">
      <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg">
          {name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[13px] font-medium text-white truncate">{name} <span className="text-zinc-500">•</span> {orgName || "No org"}</h3>
          <p className="text-[11px] text-zinc-500 truncate">{email}</p>
        </div>
        <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
      </div>
    </div>
  )
}
