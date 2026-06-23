"use client"

import { EditorContent, Editor as TiptapEditor } from "@tiptap/react"

interface EditorProps {
  editor: TiptapEditor | null
}

export default function Editor({ editor }: EditorProps) {
  if (!editor) return null

  return (
    <EditorContent
      editor={editor}
      className="prose prose-invert max-w-none text-zinc-200 text-lg outline-none min-h-[60vh] focus:outline-none"
    />
  )
}
