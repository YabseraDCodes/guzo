
import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "staff";

export async function requireRole(
  allowedRoles: StaffRole[]
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims?.sub) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", claims.sub)
    .maybeSingle();

  if (profileError || !profile || !allowedRoles.includes(profile.role as StaffRole)) {
    redirect("/unauthorized");
  }

  return { userId: claims.sub, role: profile.role as StaffRole };
}

export async function requireAdmin() {
  return requireRole(["admin"]);
}

export async function requireStaff() {
  return requireRole(["admin", "staff"]);
}
