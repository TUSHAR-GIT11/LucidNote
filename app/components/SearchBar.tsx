"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}


export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="p-3">
      <div className="h-[42px] rounded-xl border border-zinc-700 bg-black flex items-center px-3 gap-2">
        <Search size={18} className="text-zinc-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search notes..."
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
        />
        <div className="text-[11px] px-2 py-1 rounded bg-zinc-800 text-zinc-300">⌘ K</div>
      </div>
    </div>
  )
}
