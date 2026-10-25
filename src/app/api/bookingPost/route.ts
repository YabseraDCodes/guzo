import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import type { BookingSubmission } from "@/types/booking";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body: BookingSubmission = await request.json();

  const { agent_id, user_name, user_email, user_phone, team_number, package: pkg } = body;

  if (!agent_id || !user_name || !user_email || !user_phone || !team_number || !pkg) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      agent_id,
      user_name,
      user_email,
      user_phone,
      team_number: Number(team_number),
      package: pkg,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(
    { message: "Booking submitted", booking_id: booking.id },
    { status: 201 },
  );
}
