import Link from "next/link"

export default function NotesPage() {

  const notes = [
    {
      id: 1,
      title: "Company notes"
    },
    {
      id: 2,
      title: "Meeting notes"
    },
    {
      id: 3,
      title: "Project Alpha"
    }
  ]

  return (
    <div className="p-5">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Notes
        </h1>

        <Link
          href="/notes/create"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          New Note
        </Link>

      </div>

      <div className="mt-6 space-y-3">

        {notes.map((note) => (

          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="block border rounded p-4 hover:bg-zinc-900"
          >
            {note.title}
          </Link>

        ))}

      </div>

    </div>
  )
}