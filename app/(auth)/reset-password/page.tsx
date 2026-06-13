"use client"
import { useState } from "react"

export default function ResetFunction(){
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("Reset password:",password,confirmPassword)
    }
    return(
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit} >
                <input
                  type="password"
                  placeholder="enter new password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

                <input 
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                <button type="submit" >Reset Password</button>
            </form>
        </div>
    )
}