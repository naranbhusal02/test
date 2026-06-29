import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBookings, updateBookingStatus, deleteBooking } from "@/lib/db";

export const dynamic = "force-dynamic";

function checkAuth(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session")?.value;
  return session === "authenticated";
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const list = await getBookings();
    return NextResponse.json({ success: true, bookings: list });
  } catch (error) {
    console.error("Fetch bookings API error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing booking ID or status." }, { status: 400 });
    }

    if (status !== "Pending" && status !== "Confirmed" && status !== "Cancelled") {
      return NextResponse.json({ error: "Invalid booking status." }, { status: 400 });
    }

    const success = await updateBookingStatus(id, status);
    if (success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Booking record not found." }, { status: 404 });
  } catch (error) {
    console.error("Update booking API error:", error);
    return NextResponse.json({ error: "Failed to update booking status." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing booking ID parameter." }, { status: 400 });
    }

    const success = await deleteBooking(id);
    if (success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Booking record not found." }, { status: 404 });
  } catch (error) {
    console.error("Delete booking API error:", error);
    return NextResponse.json({ error: "Failed to delete booking." }, { status: 500 });
  }
}
