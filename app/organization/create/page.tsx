"use client"
import React, { useState } from "react"

export default function CreateOrganization() {
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("Name and Slug are:",name,slug)
    }
    return (
        <div>
            <h1>Create Organization</h1>
            <form onSubmit={handleSubmit} >
                <input
                   placeholder="Organization Name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                />
                <input 
                  placeholder="Organization Slug"
                  value={slug}
                  onChange={(e)=>setSlug(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}