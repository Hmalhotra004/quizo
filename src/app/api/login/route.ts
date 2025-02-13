"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password)
      return new NextResponse("missing info", { status: 400 });

    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return new NextResponse("User not found", { status: 404 });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return new NextResponse("password incorrect", { status: 401 });

    const sessionToken = await db.session.create({
      data: {
        sessionToken: uuidv4(),
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const response = new NextResponse(
      JSON.stringify({
        message: "Login successful",
        user: { id: user.id, username: user.username },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    response.cookies.set({
      name: "quizoSession",
      value: sessionToken.sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: sessionToken.expires,
    });

    return response;
  } catch (err) {
    console.error("REGISTRATION_ERROR", err);
    return new NextResponse("error creating user", { status: 500 });
  }
}
