import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(` id,
    user_name,
    user_email,
    agent_id,
    agents (
      name
    ),
    team_number,
    package,
    status,
    created_at`)
    

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

