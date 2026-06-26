interface UnsavedModalProps {
  onDiscard: () => void
  onSave: () => void
}

export default function UnsavedModal({ onDiscard, onSave }: UnsavedModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
      <div className="bg-[#1a1a1f] border border-zinc-700 rounded-2xl p-6 w-[420px] shadow-2xl">
        <h2 className="text-white text-lg font-semibold mb-2">Unsaved Changes</h2>
        <p className="text-zinc-400 text-sm mb-6">
          You have unsaved changes. What would you like to do?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onDiscard}
            className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-medium transition-colors"
          >
            Discard & Proceed
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  )
}
