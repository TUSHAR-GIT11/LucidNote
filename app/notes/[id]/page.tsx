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
import Placeholder from "@tiptap/extension-placeholder"

export default function NotePage() {
  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [, forceUpdate] = useState(0)
  const [saved, setSaved] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Start writting your note here..."
      })
    ],
    content: "",
    onUpdate() {
      forceUpdate(n => n + 1)
    },
    onSelectionUpdate() {
      forceUpdate(n => n + 1)
    },
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
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar editor={editor} onSave={save} saving={saving} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl px-16 pt-14 pb-32">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
              className="w-full bg-transparent text-white text-4xl font-bold outline-none mb-6 placeholder:text-zinc-700 leading-tight"
            />
            <Editor editor={editor} />
          </div>
        </div>
      </div>
      {saved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl text-sm text-white animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Note saved!
        </div>
      )}
    </div>



  )
}
