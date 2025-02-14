"use server";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, title, desp } = await req.json();

    const session = req.headers.get("Authorization")?.split(" ")[1];

    if (!session || !userId || !title || !desp)
      return new NextResponse("missing info", { status: 400 });

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser)
      return new NextResponse("User doesnt exists", { status: 404 });

    const existingSession = await db.session.findFirst({
      where: {
        userId: userId,
        sessionToken: session,
      },
    });

    if (!existingSession)
      return new NextResponse("User Unauthorized", { status: 401 });

    const quiz = await db.quiz.create({
      data: {
        title,
        description: desp,
        userId,
      },
    });

    return NextResponse.json(quiz);
  } catch (err) {
    console.error("CREATE_QUIZ_ERROR", err);
    return new NextResponse("error creating quiz", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const session = req.headers.get("Authorization")?.split(" ")[1];

    if (!session || !userId)
      return new NextResponse("missing info", { status: 400 });

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser)
      return new NextResponse("User doesnt exists", { status: 404 });

    const existingSession = await db.session.findFirst({
      where: {
        userId: userId,
        sessionToken: session,
      },
    });

    if (!existingSession)
      return new NextResponse("User Unauthorized", { status: 401 });

    const quizzes = await db.quiz.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(quizzes);
  } catch (err) {
    console.error("GETALL_QUIZ_ERROR", err);
    return new NextResponse("error fetching quizzes", { status: 500 });
  }
}
