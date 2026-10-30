"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = new Set([
  "pending",
  "confirmed",
  "cancelled",
]);

export type BookingStatusActionState = {
  message: string | null;
  success: boolean;
};

export async function updateAssignedBookingStatus(
  _previousState: BookingStatusActionState,
  formData: FormData,
): Promise<BookingStatusActionState> {
  console.log("========== BOOKING STATUS ACTION ==========");

  // 1. Log all submitted form fields
  const submittedFields = Object.fromEntries(formData.entries());
  console.log("[FORM] Submitted fields:", submittedFields);

  const bookingId = String(
    formData.get("bookingId") ?? "",
  ).trim();

  const status = String(
    formData.get("status") ?? "",
  ).trim().toLowerCase();

  console.log("[FORM] bookingId:", bookingId);
  console.log("[FORM] status:", status);

  if (!bookingId || !allowedStatuses.has(status)) {
    console.log("[VALIDATION] Invalid bookingId or status");

    return {
      message: "Choose a valid booking status.",
      success: false,
    };
  }

  // 2. Get the authenticated staff user
  const user = await requireRole(["staff"]);

  console.log("[AUTH] Authenticated staff user:", user);
  console.log("[AUTH] Assigned agent ID:", user.agentId);

  if (user.agentId === null) {
    console.log("[AUTH] No agent assigned to this account");

    return {
      message: "No agent is assigned to this staff account.",
      success: false,
    };
  }

  // 3. Create the Supabase client
  const supabase = await createClient();

  console.log("[DATABASE] Table: bookings");
  console.log("[DATABASE] Update values:", { status });
  console.log("[DATABASE] Filter: id =", bookingId);
  console.log("[DATABASE] Filter: agent_id =", user.agentId);
  const { data: booking, error: lookupError } = await supabase
    .from("bookings")
    .select("id, agent_id, status")
    .eq("id", bookingId)
    .maybeSingle();

  console.log("Booking lookup:", booking);
  console.log("Lookup error:", lookupError);
  console.log("Expected agent ID:", user.agentId);

  // 4. Execute update and request the updated ID
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .eq("agent_id", user.agentId)
    .select("id")
    .maybeSingle();

  // 5. Log the database response
  console.log("[DATABASE] Returned data:", data);
  console.log("[DATABASE] Returned error:", error);

  if (error) {
    console.error("[DATABASE] Update failed:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return {
      message:
        "Unable to update this booking. Check your access and try again.",
      success: false,
    };
  }

  if (!data) {
    console.warn(
      "[DATABASE] No matching booking found for these filters:",
      {
        bookingId,
        agentId: user.agentId,
      },
    );

    return {
      message: "Booking not found for your assigned agency.",
      success: false,
    };
  }

  // 6. Log success
  console.log("[SUCCESS] Booking updated:", {
    id: data.id,
    newStatus: status,
  });

  revalidatePath("/staff");

  console.log("[CACHE] Revalidated /staff");
  console.log("========== ACTION COMPLETE ==========");

  return {
    message: "Booking status updated.",
    success: true,
  };
}