"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function AcceptInvitePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [status, setStatus] = useState("Accepting invite...")

  useEffect(() => {
    if (!token) return

    fetch("/api/invite/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then(r => r.json())
      .then(data => {
        if (data.message) {
          setStatus("✅ You've joined the organization!")
          setTimeout(() => router.push("/dashboard"), 2000)
        } else {
          setStatus(`❌ ${data.error}`)
        }
      })
  }, [token, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-white text-center max-w-sm">
        <p className="text-lg">{status}</p>
      </div>
    </div>
  )
}
