"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password)
      return new NextResponse("missing info", { status: 400 });

    const existingUser = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser)
      return new NextResponse("Username already exists", { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error("REGISTRATION_ERROR", err);
    return new NextResponse("error creating user", { status: 500 });
  }
}
