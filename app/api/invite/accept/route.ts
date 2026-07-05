import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Login first" }, { status: 401 })
  }

  const { token } = await req.json()

  const invite = await prisma.invite.findUnique({ where: { token } })

  if (!invite) {
    return NextResponse.json({ error: "Invalid invite link" }, { status: 404 })
  }
  if (invite.used) {
    return NextResponse.json({ error: "Invite already used" }, { status: 400 })
  }
  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite expired" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  // Already member?
  const existing = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: user!.id,
        organizationId: invite.organizationId
      }
    }
  })

  if (!existing) {
    await prisma.organizationMember.create({
      data: {
        userId: user!.id,
        organizationId: invite.organizationId,
        role: "member"
      }
    })
  }

  // Token use mark karo
  await prisma.invite.update({
    where: { token },
    data: { used: true }
  })

  return NextResponse.json({ message: "Joined organization" })
}
