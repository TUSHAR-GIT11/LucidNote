interface Props {
  params: {
    id: string
  }
}

export default function NoteDetails(
  { params }: Props
) {

  const note = {
    id: params.id,
    title: "Company notes",
    content:
      "This is the content of the note."
  }

  return (

    <div className="p-10">

      <div className="flex justify-between items-center">

        <h1 className="text-5xl font-bold">
          {note.title}
        </h1>

        <button
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Save
        </button>

      </div>

      <div className="mt-10">

        <p className="text-lg">
          {note.content}
        </p>

      </div>

      <div className="mt-10 flex gap-4">

        <button
          className="bg-yellow-600 px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          className="bg-red-600 px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  )
}