import React, { useState } from "react"

export default function JoinOrganization(){
    const [inviteCode, setInviteCode] = useState("")
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("invite code:",inviteCode)
    }
    return(
        <div>
            <h1>Join Organization</h1>
            <form onSubmit={handleSubmit} >
                <input 
                  placeholder="Invite Code"
                  value={inviteCode}
                  onChange={(e)=>setInviteCode(e.target.value)}
                />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}