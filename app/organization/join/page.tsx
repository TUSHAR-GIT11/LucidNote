"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function JoinOrganization() {
  const router = useRouter()
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/organization/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Join Organization</h1>
          <p className="text-zinc-500 text-sm mt-1">Enter the organization slug to join</p>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-zinc-300 text-sm font-medium">Organization Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="acme-inc"
              required
              className="mt-1 w-full px-3 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm"
          >
            {loading ? "Joining..." : "Join Organization"}
          </button>
        </form>
      </div>
    </div>
  )
}
