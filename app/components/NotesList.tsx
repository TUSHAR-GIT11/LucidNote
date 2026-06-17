import Link from "next/link"
import { MoreHorizontal } from "lucide-react"

interface Note {
  id: string
  title: string
}

interface NotesListProps {
  notes: Note[]
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <div className="mt-5 pt-5 border-t border-zinc-800 flex-1 overflow-y-auto">
      <div className="px-4 mb-3 text-[12px] tracking-wider text-zinc-400 font-medium">NOTES</div>
      <div className="px-3 space-y-1">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="h-[42px] rounded-xl hover:bg-zinc-800 text-white px-4 flex items-center justify-between"
          >
            <span className="text-sm truncate">{note.title}</span>
            <MoreHorizontal size={16} className="text-zinc-400 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
