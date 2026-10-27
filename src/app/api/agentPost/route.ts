import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { id, destination_id, name, description, contact_info, packages,rating } = body;

  if (!id || !name || !destination_id || !description || !contact_info || !packages || !rating) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const { error } = await supabase.from("agents").insert({
    id,
    name,
    destination_id,
    contact_info,
    description,
    packages,
    rating
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Booking submitted" }, { status: 201 });
}