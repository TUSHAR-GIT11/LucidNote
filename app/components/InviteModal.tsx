"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface InviteModalProps {
  organizationId: string
  onClose: () => void
}

export default function InviteModal({ organizationId, onClose }: InviteModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleInvite = async () => {
    if (!email.trim()) return
    setLoading(true)

    const res = await fetch("/api/organization/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, organizationId }),
    })

    const data = await res.json()
    setMessage(res.ok ? "Invitation sent!" : data.error)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1f] border border-zinc-700 rounded-2xl p-6 w-[400px] shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-white text-lg font-semibold">Invite User</h2>
            <p className="text-zinc-500 text-sm">Send an invite link via email</p>
          </div>
          <button onClick={onClose}>
            <X size={18} className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        <label className="text-sm text-zinc-300 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="mt-1 w-full px-3 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-blue-500"
        />

        {message && (
          <p className={`mt-2 text-sm ${message === "Invitation sent!" ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-300 border border-zinc-600 rounded-xl hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={loading || !email.trim()}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-xl disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </div>
    </div>
  )
}
