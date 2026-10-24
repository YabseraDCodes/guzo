
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { getBookingById } from "@/features/bookings/queries";

import BookingSummary from "@/features/bookings/components/BookingSummary";
import TravellerDetails from "@/features/bookings/components/TravellerDetails";
import BookingStatusBadge from "@/features/bookings/components/BookingStatusBadge";
import GuideDetails from "@/features/bookings/components/GuideDetails";
import ArrivalInformation from "@/features/bookings/components/ArrivalInformation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConfirmationPage({
  params,
}: PageProps) {
  const { id } = await params;
  const bookingId = Number(id);

  if (
    !Number.isSafeInteger(bookingId) ||
    bookingId <= 0
  ) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const booking = await getBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <main className="guzo booking">
      <header className="booking header">
        <p className="header">
          GUZO Booking
        </p>

        <h1 className="request">
          Booking request received!
        </h1>

        <p>
          Your reference is{" "}
          <strong>GUZO-{booking.id}</strong>
        </p>

        <BookingStatusBadge status={booking.status} />
      </header>

      <BookingSummary booking={booking} />

      <TravellerDetails booking={booking} />

      <GuideDetails />

      <ArrivalInformation />

      <Link
        href={`/bookings/status/${booking.id}`}
        className="tracking"
      >
        Track booking status
      </Link>
    </main>
  );
}
