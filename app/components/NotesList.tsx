"use client"

import { useRef, useState } from "react"
import { useRouter } from "next-nprogress-bar"
import { MoreHorizontal, Trash2 } from "lucide-react"

interface Note {
  id: string
  title: string
}

interface NotesListProps {
  notes: Note[]
  onDelete: (id: string) => void
  onNavigate?: (url: string) => void
}

export default function NotesList({ notes, onDelete, onNavigate }: NotesListProps) {
  const router = useRouter()
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const btnRefs = useRef<{ [id: string]: HTMLButtonElement | null }>({})

  const handleNoteClick = (noteId: string) => {
    const url = `/notes/${noteId}`
    if (onNavigate) {
      onNavigate(url)
    } else {
      router.push(url)
    }
  }

  const handleDotsClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (openMenuId === id) {
      setOpenMenuId(null)
      return
    }
    const btn = btnRefs.current[id]
    if (btn) {
      const rect = btn.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 4, left: rect.left - 100 })
    }
    setOpenMenuId(id)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" })
    onDelete(id)
    setOpenMenuId(null)
    
  }

  return (
    <div className="pt-2">
      <div className="px-5 mb-2 text-[10px] tracking-widest text-zinc-600 font-semibold uppercase">
        Notes
      </div>
      <div className="px-2 space-y-0.5">
        {notes.map((note) => (
          <div key={note.id} className="relative group">
            <button
              onClick={() => handleNoteClick(note.id)}
              className="h-[36px] w-full rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white px-3 flex items-center justify-between transition-all text-left"
            >
              <span className="text-[13px] truncate">{note.title}</span>
              <span
                ref={(el) => { btnRefs.current[note.id] = el as HTMLButtonElement }}
                onClick={(e) => handleDotsClick(e as React.MouseEvent, note.id)}
                className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-zinc-300 p-0.5 transition-all"
              >
                <MoreHorizontal size={14} />
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      {openMenuId && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
          <div
            className="fixed z-50 bg-[#1a1a1f] border border-white/10 rounded-xl shadow-2xl w-36 py-1 overflow-hidden"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <button
              onClick={() => handleDelete(openMenuId)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={13} />
              Delete note
            </button>
          </div>
        </>
      )}
    </div>
  )
}
