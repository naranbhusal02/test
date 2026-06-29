import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "GentlemensRoom2026";

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set("admin_session", "authenticated", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day session longevity
      });

      return response;
    }

    return NextResponse.json(
      { error: "Incorrect administrator password." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
