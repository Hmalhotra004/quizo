import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("quizoSession")?.value;
  const userId = req.cookies.get("quizoUser")?.value;

  if (!token || !userId) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
