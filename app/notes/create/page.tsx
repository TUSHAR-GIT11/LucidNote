"use client"
import { useState } from "react";

export default function CreateNote(){
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log({title,content})
    }
    return(
        <div>
            <h1>Create Note</h1>
            <form onSubmit={handleSubmit} >
                <input 
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <textarea 
                  placeholder="write something..."
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                  rows={12}
                  
                />
                <button type="submit" >Save Note</button>
            </form>
        </div>
    )
}