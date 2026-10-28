"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string | null;
};

export async function login( _previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({email, password,});

  if (error) {
    return { error: "Invalid email or password." };
  }

  const { data, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (profileError || !data) {
    await supabase.auth.signOut();
    return { error: "Unable to verify your account role." };
  }

  if (data.role === "admin") {
    redirect("/admin");
  }

  if (data.role === "staff") {
    redirect("/staff");
  }

  redirect("/unauthorized");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Unable to log out. Please try again.");
  }

  redirect("/login");
}