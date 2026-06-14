import Link from "next/link"
import {
  Search,
  Plus,
  UserPlus,
  MoreHorizontal,
  ChevronDown
} from "lucide-react"

export default function Sidebar() {
  const notes = [
    {
      id: 1,
      title: "Company notes"
    }
  ]

  return (
    <aside
      className="
      w-[335px]
      h-screen
      bg-[#111217]
      border-r
      border-zinc-800
      flex
      flex-col
    "
    >
      {/* Logo */}

      <div
        className="
        h-[58px]
        px-4
        border-b
        border-zinc-800
        flex
        items-center
        gap-3
      "
      >
        <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-blue-500" />

          <div
            className="
            absolute
            left-1
            top-1
            w-7
            h-7
            rounded-lg
            bg-emerald-400
            opacity-80
          "
          />
        </div>

        <h1
          className="
          text-[18px]
          font-semibold
          text-white
        "
        >
          lucide note
        </h1>

        <span
          className="
          px-2
          py-[2px]
          text-[11px]
          rounded-md
          bg-zinc-800
          text-white
        "
        >
          Pro
        </span>
      </div>

      {/* Search */}

      <div className="p-3">
        <div
          className="
          h-[42px]
          rounded-xl
          border
          border-zinc-700
          bg-black
          flex
          items-center
          px-3
          gap-2
        "
        >
          <Search
            size={18}
            className="text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search notes..."
            className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-white
            placeholder:text-zinc-500
          "
          />

          <div
            className="
            text-[11px]
            px-2
            py-1
            rounded
            bg-zinc-800
            text-zinc-300
          "
          >
            ⌘ K
          </div>
        </div>
      </div>

      {/* Buttons */}

      <div className="px-3 space-y-3">
        <button
          className="
          h-[44px]
          w-full
          rounded-xl
          bg-blue-600
          hover:bg-blue-500
          text-white
          text-sm
          font-medium
          flex
          items-center
          justify-center
          gap-2
        "
        >
          <Plus size={16} />
          New Note
        </button>

        <button
          className="
          h-[44px]
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-[#1a1b21]
          text-white
          text-sm
          font-medium
          flex
          items-center
          justify-center
          gap-2
        "
        >
          <UserPlus size={16} />
          Invite User
        </button>
      </div>

      {/* Notes */}

      <div
        className="
        mt-5
        pt-5
        border-t
        border-zinc-800
        flex-1
      "
      >
        <div
          className="
          px-4
          mb-3
          text-[12px]
          tracking-wider
          text-zinc-400
          font-medium
        "
        >
          NOTES
        </div>

        <div className="px-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="
                h-[42px]
                rounded-xl
                bg-zinc-800/70
                hover:bg-zinc-700
                text-white
                px-4
                flex
                items-center
                justify-between
              "
            >
              <span className="text-sm">
                {note.title}
              </span>

              <MoreHorizontal
                size={16}
                className="text-zinc-400"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Profile */}

      <div
        className="
        border-t
        border-zinc-800
        p-4
      "
      >
        <div
          className="
          flex
          items-center
          gap-3
        "
        >
          <div
            className="
            w-9
            h-9
            rounded-xl
            bg-purple-600
            flex
            items-center
            justify-center
            text-white
            text-sm
            font-semibold
          "
          >
            T
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="
              text-sm
              font-semibold
              text-white
            "
            >
              Admin • codex
            </h3>

            <p
              className="
              text-xs
              text-zinc-400
              truncate
            "
            >
              tushargupta.eliteverse@gmail.com
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-zinc-400"
          />
        </div>
      </div>
    </aside>
  )
}