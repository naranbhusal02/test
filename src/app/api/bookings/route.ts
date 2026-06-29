import { NextResponse } from "next/server";
import { addBooking } from "@/lib/db";

export const dynamic = "force-dynamic";

function generateReferenceCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `GR-${num}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, customer_email, customer_phone, notes, department, service, date, time } = body;

    if (!customer_name || !customer_email || !customer_phone || !department || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required booking details." },
        { status: 400 }
      );
    }

    const reference_id = generateReferenceCode();

    const booking = await addBooking({
      reference_id,
      customer_name,
      customer_email,
      customer_phone,
      notes: notes || "",
      department,
      service,
      date,
      time,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing booking." },
      { status: 500 }
    );
  }
}
