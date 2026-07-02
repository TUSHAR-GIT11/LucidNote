import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import DashboardClient from "./DashboardClient"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      organization: {
        include: { organization: true }
      }
    }
  })

  
  if (!user || user.organization.length === 0) {
    redirect("/organization/create")
  }

  return <DashboardClient />
}
