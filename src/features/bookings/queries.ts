import { createClient } from "@/app/utils/supabase/server";
import type { BookingWithPackage } from "@/tyoes/booking";

export async function getBookingById(
  id: number
): Promise<BookingWithPackage | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Booking lookup failed:", error);
    return null;
  }

  if (!booking) {
    return null;
  }

  const { data: pkg, error: packageError } = await supabase
    .from("tour_packages")
    .select("id, name, description, price, duration_days, agent_id")
    .eq("id", booking.tour_package_id)
    .maybeSingle();

  if (packageError) {
    console.error("Package lookup failed:", packageError);
  }

  return {
    ...booking,
    tourPackage: pkg
      ? {
          ...pkg,
          price: Number(pkg.price),
        }
      : null,
  } as BookingWithPackage;
}
