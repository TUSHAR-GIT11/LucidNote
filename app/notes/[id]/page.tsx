"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import TextAlign from "@tiptap/extension-text-align"
import Sidebar from "@/app/components/Sidebar"
import Toolbar from "@/app/components/Toolbar"
import Editor from "@/app/components/Editor"

export default function NotePage() {
  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  })

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((r) => r.json())
      .then((note) => {
        setTitle(note.title)
        setContent(note.content)
        editor?.commands.setContent(note.content || "")
        setLoaded(true)
      })
  }, [id, editor])

  const save = async () => {
    setSaving(true)
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content: editor?.getHTML() || "",
      }),
    })
    setSaving(false)
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar editor={editor} onSave={save} saving={saving} />
        <div className="flex-1 p-16 overflow-y-auto">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="w-full bg-transparent text-white text-5xl font-bold outline-none mb-8 placeholder:text-zinc-700"
          />
          <Editor editor={editor} />
        </div>
      </div>
    </div>
  )
}
