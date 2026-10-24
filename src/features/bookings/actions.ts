
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";
import type { BookingStatus } from "@/tyoes/booking";

export async function cancelOwnPendingBooking(
  bookingId: number
) {
  if (!Number.isSafeInteger(bookingId) || bookingId <= 0) {
    return { success: false, error: "Invalid booking ID." };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "Please sign in first.",
    };
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: "cancelled" satisfies BookingStatus,
    })
    .eq("id", bookingId)
    .eq("user_id", user.id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Booking cancellation failed:", error);

    return {
      success: false,
      error: "Could not cancel this booking.",
    };
  }

  if (!data) {
    return {
      success: false,
      error: "Booking not found or no longer pending.",
    };
  }

  revalidatePath(`/bookings/confirmation/${bookingId}`);
  revalidatePath(`/bookings/status/${bookingId}`);

  return { success: true };
}
