
import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireStaff() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims?.sub) {
    console.error("AUTH CHECK FAILED:", error?.message);
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", claims.sub)
    .maybeSingle();

  console.log("AUTH USER ID:", claims.sub);
  console.log("PROFILE RESULT:", profile);
  console.log("PROFILE ERROR:", profileError?.message);

  if (profileError || !profile ||
      !["admin", "staff"].includes(profile.role)) {
    redirect("/unauthorized");
  }

  return {
    userId: claims.sub,
    role: profile.role,
  };
}
