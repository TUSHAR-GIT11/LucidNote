import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({ error:"Unauthorized" }, { status:401 })
    }

    const user = await prisma.user.findUnique({
        where:{email:session.user.email}
    })

    if (!user) {
       return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    const notes = await prisma.note.findMany({
        where:{ userId: user!.id },
        orderBy:{ updatedAt:"desc" }
    })

    return NextResponse.json(notes)

}

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({ error:"Unauthorized" },{ status:401})
    }

    const { title } = req.json()
    const user = await prisma.user.findUnique({
        where:{ email:session.user.email }
    })

    const note = await prisma.note.create({
        data:{ title,content:"", userId:user!.id }
    })

    return NextResponse.json(note,{status:201})
}