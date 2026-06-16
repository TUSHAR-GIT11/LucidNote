
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        )
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return NextResponse.json(
            { error: "Email already exists" },
            { status: 400 }
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return NextResponse.json(
        { message: "Account successfully created" },
        { status: 201 }
    )

}