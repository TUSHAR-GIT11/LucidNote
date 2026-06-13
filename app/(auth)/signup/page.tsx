"use client"

import Link from "next/link"
import { useState } from "react"

export default function Signup() {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("signup:", email, password)
  }

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          value={name}
          placeholder="enter name"
          onChange={(e)=>setName(e.target.value)}
          type="name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Sign Up</button>
        <Link href="/login" >Already have an account</Link>
      </form>
    </div>
  )
}
