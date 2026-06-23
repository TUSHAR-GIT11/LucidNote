"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "./SearchBar"
import NotesList from "./NotesList"
import UserProfile from "./UserProfile"
import CreateNoteModal from "./CreateNoteModal"
import { Plus, UserPlus } from "lucide-react"

interface Note {
  id: string
  title: string
}

export default function Sidebar() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  // DB se notes fetch karo
  useEffect(() => {
    async function getNotes() {
      const res = await fetch("/api/notes")
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data)) setNotes(data)
    }
    getNotes()  // ← call karo
  }, [])

  // Note create karo
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
    router.push(`/notes/${note.id}`)
  }

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="w-[335px] h-screen bg-[#111217] border-r border-zinc-800 flex flex-col">

      {/* Logo */}
      <div className="h-[58px] px-4 border-b border-zinc-800 flex items-center gap-3">
        <div className="relative w-7 h-7">
          <div className="w-7 h-7 rounded-lg bg-blue-500 absolute" />
          <div className="w-7 h-7 rounded-lg bg-emerald-400 opacity-80 absolute left-1 top-1" />
        </div>
        <h1 className="text-[18px] font-semibold text-white">Lucid Note</h1>
        <span className="ml-auto px-2 py-[2px] text-[11px] rounded-md bg-zinc-800 text-zinc-300">
          Free
        </span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Buttons */}
      <div className="px-3 pt-3 space-y-2">
        <button
          onClick={() => setShowModal(true)}
          className="h-[44px] w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={16} />
          New Note
        </button>

        <button className="h-[44px] w-full rounded-xl border border-zinc-700 bg-[#1a1b21] hover:bg-zinc-800 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
          <UserPlus size={16} />
          Invite User
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto mt-4">
        <NotesList notes={filteredNotes} />
      </div>

      {/* Profile */}
      <UserProfile name="Admin" org="abcd" email="tushargupta10th@gmail.com" />

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
