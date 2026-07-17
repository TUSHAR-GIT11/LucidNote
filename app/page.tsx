"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const { status } = useSession()
  useEffect(()=>{
    if (status === 'loading') return
    if (status === 'unauthenticated'){
      router.push("/login")
    }
    if(status === 'authenticated'){
      router.push('/dashboard')
    }
  },[status,router])
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <p className="text-zinc-400">Loading...</p>
    </div>
  )
}