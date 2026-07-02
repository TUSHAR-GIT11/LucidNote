import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"

// Helper — user note access kar sakta hai ya nahi
async function canAccessNote(userId: string, noteId: string) {
  const note = await prisma.note.findUnique({ where: { id: noteId } })
  if (!note) return { allowed: false, note: null }

  // Personal note — sirf owner
  if (!note.organizationId) {
    return { allowed: note.userId === userId, note }
  }

  // Org note — org member hona chahiye
  const isMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId: note.organizationId
      }
    }
  })

  return { allowed: !!isMember, note }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(note)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const { allowed } = await canAccessNote(user.id, id)
  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  const { title, content } = await req.json()
  const note = await prisma.note.update({
    where: { id },
    data: { title, content }
  })
  return NextResponse.json(note)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const { allowed } = await canAccessNote(user.id, id)
  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  await prisma.note.delete({ where: { id } })
  return NextResponse.json({ message: "Deleted" })
}
