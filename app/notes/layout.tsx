"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/app/components/Sidebar"
import Toolbar from "@/app/components/Toolbar"
import UnsavedModal from "@/app/components/UnsavedModal"
import { EditorProvider, useEditorContext } from "@/app/context/EditorContext"
import { Menu } from "lucide-react"

function NotesContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { editor, onSave, saving, isDirty, setIsDirty, noteId } = useEditorContext()
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [showUnsaved, setShowUnsaved] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // Close sidebar on route changes (mobile)
  useEffect(() => {
    setShowSidebar(false)
  }, [router])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSidebar) setShowSidebar(false)
    }
    
    if (showSidebar) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showSidebar])

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
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Desktop Sidebar - Always visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar 
          onNavigate={handleNavigate}
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* Mobile/Tablet Sidebar - Overlay */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
          {/* Sidebar */}
          <div className="fixed left-0 top-0 bottom-0 z-50 lg:hidden">
            <Sidebar 
              onNavigate={handleNavigate} 
              isOpen={showSidebar}
              onClose={() => setShowSidebar(false)}
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* Mobile Header with Menu */}
        <div className="lg:hidden flex items-center h-12 sm:h-14 px-3 sm:px-4 border-b border-zinc-800 bg-black shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowSidebar(true)
            }}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors mr-3"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-white text-sm sm:text-base font-medium">LucidNotes</h1>
        </div>

        {/* Toolbar - Responsive */}
        <div className="shrink-0">
          <Toolbar 
            editor={editor} 
            onSave={onSave ?? undefined} 
            saving={saving} 
            noteId={noteId ?? undefined} 
          />
        </div>
        
        {/* Editor Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>

      {/* Unsaved Changes Modal */}
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