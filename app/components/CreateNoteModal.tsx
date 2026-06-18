"use client"

import { X } from "lucide-react"

interface CreateNoteModalProps {
  title: string
  loading: boolean
  onChange: (value: string) => void
  onCreate: () => void
  onClose: () => void
}

export default function CreateNoteModal({
  title,
  loading,
  onChange,
  onCreate,
  onClose,
}: CreateNoteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1b21] rounded-2xl p-6 w-[420px] shadow-xl">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-white text-lg font-semibold">Create New Note</h2>
          <button onClick={onClose}>
            <X size={18} className="text-zinc-400 hover:text-white" />
          </button>
        </div>
        <p className="text-zinc-500 text-sm mb-4">Add a new note to your collection.</p>

        <label className="text-sm text-white font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onCreate()}
          placeholder="Enter note title"
          autoFocus
          className="mt-1 w-full px-3 py-2.5 rounded-lg border border-blue-500 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white border border-zinc-600 rounded-lg hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={loading || !title.trim()}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  )
}
