import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"
import nodemailer from "nodemailer"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { email, organizationId } = await req.json()


  const inviter = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  const isMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId: inviter!.id, organizationId }
    }
  })
  if (!isMember) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 din

  
  await prisma.invite.create({
    data: { email, organizationId, token, expiresAt }
  })
  
  const inviteUrl = `${process.env.NEXTAUTH_URL}/invite/accept?token=${token}`

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  })

  const org = await prisma.organization.findUnique({
    where: { id: organizationId }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `You're invited to join ${org?.name} on LucidNote`,
    html: `
      <h2>You've been invited!</h2>
      <p>${session.user.name || session.user.email} has invited you to join <strong>${org?.name}</strong> on LucidNote.</p>
      <a href="${inviteUrl}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px;">
        Accept Invitation
      </a>
      <p style="color:#888;margin-top:16px;font-size:12px;">This link expires in 7 days.</p>
    `
  })

  return NextResponse.json({ message: "Invitation sent" })
}
