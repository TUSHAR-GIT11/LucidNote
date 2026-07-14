"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next-nprogress-bar"
import SearchBar from "./SearchBar"
import NotesList from "./NotesList"
import UserProfile from "./UserProfile"
import CreateNoteModal from "./CreateNoteModal"
import { Plus, UserPlus, X } from "lucide-react"
import InviteModal from "./InviteModal"

interface Note {
  id: string
  title: string
}

interface SidebarProps {
  onNavigate?: (url: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ onNavigate, isOpen = true, onClose }: SidebarProps) {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [orgId, setOrgId] = useState("")

  useEffect(() => {
    async function getNotes() {
      const res = await fetch("/api/notes")
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data)) setNotes(data)
    }
    getNotes()
  }, [])

  useEffect(() => {
    fetch("/api/organization")
      .then(r => r.json())
      .then(data => {
        if (data?.id) setOrgId(data.id)
      })
  }, [])

  const createNote = async () => {
    if (!title.trim()) return
    setLoading(true)
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    const note = await res.json()
    setNotes((prev) => [note, ...prev])
    setTitle("")
    setShowModal(false)
    setLoading(false)

    // Close sidebar on mobile after creating note
    if (onClose) onClose()

    if (onNavigate) {
      onNavigate(`/notes/${note.id}`)
    } else {
      router.push(`/notes/${note.id}`)
    }
  }

  const handleNoteSelect = (url: string) => {
    // Close sidebar on mobile after selecting note
    if (onClose) onClose()
    
    if (onNavigate) {
      onNavigate(url)
    } else {
      router.push(url)
    }
  }

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className={`
      w-full sm:w-80 lg:w-[280px] xl:w-[320px] 
      h-screen bg-[#0f0f11] border-r border-white/5 
      flex flex-col
      lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      transition-transform duration-300 ease-in-out
    `}>

      {/* Header with Close Button (Mobile) */}
      <div className="h-12 sm:h-14 lg:h-[58px] px-3 sm:px-4 lg:px-5 border-b border-white/5 flex items-center gap-3">
        
        {/* Close Button - Mobile Only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-zinc-400 hover:text-white rounded"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        {/* Logo */}
        <div className="relative w-6 sm:w-7 h-6 sm:h-7 shrink-0">
          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-blue-500 absolute" />
          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-emerald-400 opacity-70 absolute left-1 top-1" />
        </div>
        
        <h1 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight">
          lucide note
        </h1>
        
        <span className="ml-auto px-2 py-[3px] text-[10px] rounded-full bg-white/5 border border-white/10 text-zinc-400 font-medium hidden sm:inline">
          Free
        </span>
      </div>

      {/* Search */}
      <div className="px-3 sm:px-4 lg:px-3 pt-3">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Action Buttons */}
      <div className="px-3 sm:px-4 lg:px-3 pt-2 space-y-1.5">
        <button
          onClick={() => setShowModal(true)}
          className="h-9 sm:h-[38px] w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
        >
          <Plus size={14} strokeWidth={2.5} className="sm:w-[15px] sm:h-[15px]" />
          New Note
        </button>

        <button 
          onClick={() => setShowInvite(true)} 
          className="h-9 sm:h-[38px] w-full rounded-xl border border-white/8 bg-white/4 hover:bg-white/8 text-zinc-300 text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <UserPlus size={14} strokeWidth={2} className="sm:w-[15px] sm:h-[15px]" />
          Invite User
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto mt-3 px-1">
        <NotesList
          notes={filteredNotes}
          onDelete={(id) => setNotes((prev) => prev.filter((n) => n.id !== id))}
          onNavigate={handleNoteSelect}
        />
      </div>

      {/* User Profile */}
      <div className="shrink-0">
        <UserProfile />
      </div>

      {/* Modals */}
      {showModal && (
        <CreateNoteModal
          title={title}
          loading={loading}
          onChange={setTitle}
          onCreate={createNote}
          onClose={() => setShowModal(false)}
        />
      )}

      {showInvite && orgId && (
        <InviteModal
          organizationId={orgId}
          onClose={() => setShowInvite(false)}
        />
      )}
    </aside>
  )
}