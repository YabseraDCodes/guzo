
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { getBookingById } from "@/features/bookings/queries";

import BookingStatusBadge from "@/features/bookings/components/BookingStatusBadge";
import BookingTimeline from "@/features/bookings/components/BookingTimeline";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingStatusPage({
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
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">
        Track your booking
      </h1>

      <p>
        Reference: <strong>GUZO-{booking.id}</strong>
      </p>

      <section className="rounded-xl border p-5">
        <p className="mb-3 font-medium">Current status</p>

        <BookingStatusBadge status={booking.status} />

        <div className="mt-6">
          <BookingTimeline status={booking.status} />
        </div>
      </section>

      <Link
        href={`/bookings/confirmation/${booking.id}`}
        className="text-emerald-700 underline"
      >
        Back to confirmation
      </Link>
    </main>
  );
}
