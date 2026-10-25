import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(request) {
  const supabase = await createClient();
  const body = await request.json();

  const { id, name, description, location, countries,image_urls } = body;

  if (!id || !name || !location || !description || !countries || !image_urls ) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const { error } = await supabase.from("destinations").insert({
    id,
    name,
  
    image_urls,
   
    description,
    location,
    countries
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Booking submitted" }, { status: 201 });
}