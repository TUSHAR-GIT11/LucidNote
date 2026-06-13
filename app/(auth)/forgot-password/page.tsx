"use client"
import { useState } from "react"

export default function ForgotPassword(){
    const [email, setEmail] = useState("")
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("forgot password:",email)
    }
    return(
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit} >
                <input 
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <button type="submit" >Send Reset Link</button>
            </form>
        </div>
    )
}