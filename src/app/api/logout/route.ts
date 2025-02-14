"use server";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { session } = await req.json();

    if (!session) return new NextResponse("missing info", { status: 400 });

    const sessionId = await db.session.findUnique({
      where: {
        sessionToken: session,
      },
    });

    if (!sessionId)
      return new NextResponse("Session doesnt exists", { status: 404 });

    await db.session.delete({
      where: {
        sessionToken: session,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("LOGOUT_ERROR", err);
    return new NextResponse("error logout", { status: 500 });
  }
}
