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

  redirect("/admin");
}


export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Unable to log out. Please try again.");
  }

  redirect("/login");
}

