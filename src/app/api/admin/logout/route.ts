import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set("admin_session", "", {
    path: "/",
    expires: new Date(0), // Set expiration date in the past
    httpOnly: true,
  });

  return response;
}
