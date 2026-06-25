"use client"

import Sidebar from "../components/Sidebar"
import { PenLine, Sparkles, Zap } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar />

      {/* Main empty state */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">

        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-10 rounded-3xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm shadow-2xl max-w-sm w-full mx-4">

          {/* Icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-zinc-700/50 flex items-center justify-center shadow-lg">
              <PenLine size={32} className="text-blue-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-md">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h2 className="text-white text-xl font-semibold tracking-tight">
              Your workspace is ready
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Select a note from the sidebar or create a new one to get started
            </p>
          </div>

          {/* Tips */}
          <div className="w-full space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
              <Zap size={14} className="text-yellow-400 shrink-0" />
              <p className="text-zinc-400 text-xs">Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300 text-[11px] font-mono">⌘ K</kbd> to quickly search notes</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
              <PenLine size={14} className="text-blue-400 shrink-0" />
              <p className="text-zinc-400 text-xs">Click <span className="text-blue-400 font-medium">+ New Note</span> to create your first note</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
