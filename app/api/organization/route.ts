import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json(null)
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      organization: {
        include: { organization: true },
        take: 1
      }
    }
  })

  if (!user || user.organization.length === 0) {
    return NextResponse.json(null)
  }

  return NextResponse.json(user.organization[0].organization)
}

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({ error:"Unauthorized" },{ status:401 })
    }
    const { name,slug } =  await req.json()
    const existing = await prisma.organization.findUnique({ where: { slug } })
    if(existing){
         return NextResponse.json({ error: "Slug already taken" },{ status:400 })
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    const org = await prisma.organization.create({
        data: {
            name,
            slug,
            members: {
                create: {
                    userId: user!.id,
                    role:"owner"
                }
            }
        }
    })
    return NextResponse.json(org,{ status:201 })
}