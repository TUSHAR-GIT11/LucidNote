import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions"

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }



    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            organization: { take: 1 }
        }
    })

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const orgId = user.organization[0]?.organizationId || null

    const notes = await prisma.note.findMany({
        where: orgId ? { organizationId: orgId } : { userId: user!.id, organizationId: null },
        orderBy: { updatedAt: "desc" }
    })

    return NextResponse.json(notes)

}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title } = await req.json()
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include:{
            organization: { take:1 }
        }
    })

    const orgId = user?.organization[0]?.organizationId || null

    const note = await prisma.note.create({
        data: { title, content: "", userId: user!.id, organizationId:orgId }
    })

    return NextResponse.json(note, { status: 201 })
}