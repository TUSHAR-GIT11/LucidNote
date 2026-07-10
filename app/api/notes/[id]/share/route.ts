import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
export async function POST(_req:NextRequest, { params }:{ params: Promise<{ id:string }> } ){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({ error:"Unauthorized" },{ status:401 })
    }
    const { id } = await params
    const existing = await prisma.sharedNote.findUnique({
        where:{ noteId:id }
    })
    
    if(existing){
        return NextResponse.json(existing)
    }

    const shared = await prisma.sharedNote.create({
        data:{ noteId:id, token: crypto.randomBytes(16).toString("hex") }
    })

    return NextResponse.json(shared,{ status:201 })
}

export async function DELETE(_req:NextRequest, { params }: { params: Promise<{ id:string }> }){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({ error:"Unauthorized" },{ status:401 })
    }
    const { id } = await params
    await prisma.sharedNote.delete({
        where: { noteId:id }
    })
    return NextResponse.json({ message:"Unshared" })
}