import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const deletedSessions = await db.session.deleteMany({
      where: { expires: { lt: now } },
    });

    return NextResponse.json({
      message: `✅ Deleted ${deletedSessions.count} expired sessions.`,
    });
  } catch (error) {
    console.error("❌ Error deleting expired sessions:", error);
    return NextResponse.json(
      { error: "Error deleting expired sessions" },
      { status: 500 }
    );
  }
}
