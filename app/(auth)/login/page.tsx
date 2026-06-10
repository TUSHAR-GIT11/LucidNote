import { useState } from "react"

export default function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        console.log("forms are:",email,password)
    }
    return(
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <input 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}