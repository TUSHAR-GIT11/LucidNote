"use client"

import { createContext, useContext, useState } from "react"
import { Editor } from "@tiptap/react"

interface EditorContextType {
  editor: Editor | null
  setEditor: (editor: Editor | null) => void
  onSave: (() => void) | null
  setOnSave: (fn: (() => void) | null) => void
  saving: boolean
  setSaving: (v: boolean) => void
  isDirty: boolean
  setIsDirty: (v: boolean) => void
}

const EditorContext = createContext<EditorContextType>({
  editor: null,
  setEditor: () => {},
  onSave: null,
  setOnSave: () => {},
  saving: false,
  setSaving: () => {},
  isDirty: false,
  setIsDirty: () => {},
})

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [onSave, setOnSave] = useState<(() => void) | null>(null)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  return (
    <EditorContext.Provider value={{ editor, setEditor, onSave, setOnSave, saving, setSaving, isDirty, setIsDirty }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = () => useContext(EditorContext)
