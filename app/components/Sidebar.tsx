"use client"

import { useState } from "react"
import SearchBar from "./SearchBar"
import { Plus } from "lucide-react"
import CreateNoteModal from "./CreateNoteModal"


export default function Sidebar(){
  const [search,setSearch] = useState("")
  const [showModal,setShowModal] = useState(false)
  const [title,setTitle] = useState("")
  const [loading,setLoading] = useState(false)

  const createNote = ()=>{
  if(!title.trim()) return
  setLoading(true)
  setTitle("")
  setLoading(false)
}

  return(
    <div>
      <div>
        <h1>Lucid Note</h1>
        <h1>Free</h1>
      </div>
      <div>
         <SearchBar value={search} onChange={setSearch} />
      </div>
      <div>
        <button onClick={()=>setShowModal(true)} > <Plus size={16}/> New Note</button>
        <button>Invite User</button>
      </div>
      { showModal && (
        <CreateNoteModal 
          title={title}
          loading={loading}
          onChange={setTitle}
          onCreate={createNote}
          onClose={()=>setShowModal(false)}
          />
      ) }
    </div>
  )
}