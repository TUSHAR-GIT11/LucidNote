"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/app/components/Sidebar"
import Toolbar from "@/app/components/Toolbar"
import UnsavedModal from "@/app/components/UnsavedModal"
import { EditorProvider, useEditorContext } from "@/app/context/EditorContext"

function NotesContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { editor, onSave, saving, isDirty, setIsDirty } = useEditorContext()
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [showUnsaved, setShowUnsaved] = useState(false)

  // Note click event suno
  if (typeof window !== "undefined") {
    // Event listener yahan add karna React pattern ke against hai
    // useEffect use karna chahiye — layout component mein
  }

  const handleNavigate = (url: string) => {
    if (isDirty) {
      setPendingUrl(url)
      setShowUnsaved(true)
    } else {
      router.push(url)
    }
  }

  const handleDiscard = () => {
    setIsDirty(false)
    setShowUnsaved(false)
    if (pendingUrl) router.push(pendingUrl)
  }

  const handleSaveAndProceed = async () => {
    if (onSave) await onSave()
    setIsDirty(false)
    setShowUnsaved(false)
    if (pendingUrl) router.push(pendingUrl)
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar editor={editor} onSave={onSave ?? undefined} saving={saving} />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
      {showUnsaved && (
        <UnsavedModal onDiscard={handleDiscard} onSave={handleSaveAndProceed} />
      )}
    </div>
  )
}

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider>
      <NotesContent>{children}</NotesContent>
    </EditorProvider>
  )
}
