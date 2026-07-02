import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({error:"Unauthorized"},{ status:401 })
    }
    const { slug } = await req.json()
    const org = await prisma.organization.findUnique({ where:{ slug } })
    if(!org){
        return NextResponse.json({ error:"Organization not found" }, { status:404 })
    }

    const user = await prisma.user.findUnique({ where:{ email:session?.user?.email } })
    
    const existing = await prisma.organizationMember.findUnique({
        where:{ userId_organizationId : { userId : user!.id, organizationId: org.id } }
    })

    if(existing){
        return NextResponse.json({ error: "Already a member" },{ status:400 })
    }

    await prisma.organizationMember.create({ 
        data:{ userId: user!.id, organizationId: org.id, role:"member" }
    })
    
    return NextResponse.json({ message: "Joined successfully" })

}