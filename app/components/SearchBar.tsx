"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="h-[36px] rounded-lg border border-white/8 bg-white/4 hover:bg-white/6 flex items-center px-3 gap-2 transition-colors">
      <Search size={14} className="text-zinc-500 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className="flex-1 bg-transparent outline-none text-[13px] text-zinc-300 placeholder:text-zinc-600"
      />
      <div className="text-[10px] px-1.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-zinc-500 font-mono">⌘K</div>
    </div>
  )
}
