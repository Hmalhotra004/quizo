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

    await db.session.deleteMany({
      where: {
        expires: { lt: new Date() },
      },
    });

    // const expires = new Date(Date.now() + 1 * 60 * 1000);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const sessionToken = await db.session.create({
      data: {
        sessionToken: uuidv4(),
        userId: user.id,
        expires,
      },
    });

    const response = NextResponse.json({ status: 200 });

    response.cookies.set({
      name: "quizoSession",
      value: sessionToken.sessionToken,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires,
    });

    response.cookies.set({
      name: "quizoUser",
      value: user.id,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires,
    });

    return response;
  } catch (err) {
    console.error("LOGIN_ERROR", err);
    return new NextResponse("error login", { status: 500 });
  }
}
