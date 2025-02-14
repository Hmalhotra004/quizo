import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { userId, title, desp, id } = await req.json();

    const session = req.headers.get("Authorization")?.split(" ")[1];

    if (!session || !userId || !id || !title || !desp)
      return new NextResponse("missing info", { status: 400 });

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser)
      return new NextResponse("User doesnt exists", { status: 401 });

    const existingSession = await db.session.findFirst({
      where: {
        userId: userId,
        sessionToken: session,
      },
    });

    if (!existingSession)
      return new NextResponse("User Unauthorized", { status: 401 });

    const existingQuiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    const updatedQuiz = await db.quiz.update({
      where: {
        id,
        userId,
      },
      data: {
        title,
        description: desp,
      },
    });

    return NextResponse.json(updatedQuiz, { status: 200 });
  } catch (err) {
    console.error("PUT_QUIZ_ERROR", err);
    return new NextResponse("error updating quiz", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const id = searchParams.get("id");
    const session = req.headers.get("Authorization")?.split(" ")[1];

    if (!session || !userId || !id)
      return new NextResponse("missing info", { status: 400 });

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser)
      return new NextResponse("User doesnt exists", { status: 401 });

    const existingSession = await db.session.findFirst({
      where: {
        userId: userId,
        sessionToken: session,
      },
    });

    if (!existingSession)
      return new NextResponse("User Unauthorized", { status: 401 });

    const existingQuiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    return NextResponse.json(existingQuiz, { status: 200 });
  } catch (err) {
    console.error("GET_QUIZID_ERROR", err);
    return new NextResponse("error fetching quizid", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, id } = await req.json();

    const session = req.headers.get("Authorization")?.split(" ")[1];

    if (!session || !userId || !id)
      return new NextResponse("missing info", { status: 400 });

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser)
      return new NextResponse("User doesnt exists", { status: 401 });

    const existingSession = await db.session.findFirst({
      where: {
        userId: userId,
        sessionToken: session,
      },
    });

    if (!existingSession)
      return new NextResponse("User Unauthorized", { status: 401 });

    const existingQuiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    await db.quiz.delete({
      where: {
        id,
        userId,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("DELETE_QUIZ_ERROR", err);
    return new NextResponse("error deleting quiz", { status: 500 });
  }
}
