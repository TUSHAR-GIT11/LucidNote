"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next-nprogress-bar"
import SearchBar from "./SearchBar"
import NotesList from "./NotesList"
import UserProfile from "./UserProfile"
import CreateNoteModal from "./CreateNoteModal"
import { Plus, UserPlus } from "lucide-react"

interface Note {
  id: string
  title: string
}

export default function Sidebar({ onNavigate }: { onNavigate?: (url: string) => void }) {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getNotes() {
      const res = await fetch("/api/notes")
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data)) setNotes(data)
    }
    getNotes()
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
    
    if (onNavigate) {
      onNavigate(`/notes/${note.id}`)
    } else {
      router.push(`/notes/${note.id}`)
    }
  }

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="w-[280px] h-screen bg-[#0f0f11] border-r border-white/5 flex flex-col">

      {/* Logo */}
      <div className="h-[58px] px-5 border-b border-white/5 flex items-center gap-3">
        <div className="relative w-7 h-7 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-500 absolute" />
          <div className="w-7 h-7 rounded-lg bg-emerald-400 opacity-70 absolute left-1 top-1" />
        </div>
        <h1 className="text-[15px] font-semibold text-white tracking-tight">lucide note</h1>
        <span className="ml-auto px-2 py-[3px] text-[10px] rounded-full bg-white/5 border border-white/10 text-zinc-400 font-medium">
          Free
        </span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Buttons */}
      <div className="px-3 pt-2 space-y-1.5">
        <button
          onClick={() => setShowModal(true)}
          className="h-[38px] w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
        >
          <Plus size={15} strokeWidth={2.5} />
          New Note
        </button>

        <button className="h-[38px] w-full rounded-xl border border-white/8 bg-white/4 hover:bg-white/8 text-zinc-300 text-[13px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <UserPlus size={15} strokeWidth={2} />
          Invite User
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto mt-3 overflow-x-visible">
      <NotesList
          notes={filteredNotes}
          onDelete={(id) => setNotes((prev) => prev.filter((n) => n.id !== id))}
          onNavigate={onNavigate}
        />
      </div>

      {/* Profile */}
      <UserProfile />

      {/* Modal */}
      {showModal && (
        <CreateNoteModal
          title={title}
          loading={loading}
          onChange={setTitle}
          onCreate={createNote}
          onClose={() => setShowModal(false)}
        />
      )}
    </aside>
  )
}
