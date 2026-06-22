
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
     const { id } = await params
     const note = await prisma.note.findUnique({ where:{ id } })
     if(!note) return NextResponse.json({ error:"not found" },{ status:404 })
     return NextResponse.json(note)   
}

export async function PUT(req:NextRequest,{ params }:{ params: Promise<{id:string}> }){
    const { id } = await params
    const { title,content } = await req.json()
    const note = await prisma.note.update({
        where:{id},
        data: { title,content }
    })

    return NextResponse.json(note)
}

export async function DELETE(_req:NextRequest,{ params }: { params: Promise<{id:string}> }){
    const { id } = await params
    await prisma.note.delete(
        { where : {id} }
    )
    return NextResponse.json({ message:"Deleted" })
}