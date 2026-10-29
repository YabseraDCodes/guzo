
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import { bookingConfirmationSchema } from "@/lib/booking-schema";
import "../booking.css";

const confirmationPageSchema = bookingConfirmationSchema.extend({
  total_price: z.number().nonnegative().nullable().optional(),
  destination_name: z.string().optional(),
  package_name: z.string().optional(),
  package_price: z.number().nonnegative().optional(),
});

type Confirmation = z.infer<typeof confirmationPageSchema>;

function formatBookingPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function readStoredBooking(): Confirmation | null {
  try {
    const storedBooking = sessionStorage.getItem("bookingConfirmation");

    if (!storedBooking) return null;

    const result = confirmationPageSchema.safeParse(
      JSON.parse(storedBooking)
    );

    if (result.success) {
      return result.data;
    }

    sessionStorage.removeItem("bookingConfirmation");
    return null;
  } catch {
    return null;
  }
}

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<Confirmation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const frame = requestAnimationFrame(() => {
      if (!isActive) return;

      const storedBooking = readStoredBooking();

      if (!isActive) return;

      setBooking(storedBooking);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  async function copyBookingId() {
    if (!booking) return;

    try {
      await navigator.clipboard.writeText(booking.booking_id);
    } catch {
      // Clipboard access may be unavailable in some browsers.
    }
  }

  if (isLoading) {
    return (
      <main className="booking-confirmation-page">
        <section
          className="booking-confirmation-shell"
          aria-live="polite"
        >
          <div className="confirmation-loading-mark">G</div>
          <p className="confirmation-loading-text">
            Preparing your confirmation...
          </p>
        </section>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="booking-confirmation-page">
        <section className="booking-confirmation-shell">
          <span className="confirmation-eyebrow">
            <span />
            GUZO / BOOKING
          </span>

          <h1 className="confirmation-title">
            Booking details <em>unavailable.</em>
          </h1>

          <p className="confirmation-intro">
            We couldn't find your saved confirmation. It may have
            expired, or you may have opened this page in another
            browser or device.
          </p>

          <Link
            className="booking-confirmation-link"
            href="/bookings"
          >
            Return to bookings <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    );
  }

  const displayedTotal =
    booking.total_price ??
    (booking.package_price !== undefined
      ? booking.package_price * booking.team_number
      : null);

  return (
    <main className="booking-confirmation-page">
      <section
        className="booking-confirmation-shell"
        aria-labelledby="confirmation-title"
      >
        <div className="confirmation-success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5L10 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="confirmation-eyebrow">
          <span />
          GUZO / BOOKING CONFIRMED
        </span>

        <h1 id="confirmation-title" className="confirmation-title">
          Thank you, <em>{booking.user_name.split(" ")[0]}.</em>
        </h1>

        <p className="confirmation-intro">
          Your booking has been submitted successfully. Keep your
          booking reference handy, and your tour agent can help you
          with the next steps.
        </p>

        <div className="confirmation-reference">
          <div>
            <span className="confirmation-detail-label">
              YOUR BOOKING REFERENCE
            </span>
            <strong>{booking.booking_id}</strong>
          </div>

          <button
            className="confirmation-copy-button"
            type="button"
            onClick={copyBookingId}
          >
            Copy ID
          </button>
        </div>

        <div className="confirmation-section-heading">
          <h2>Your journey at a glance</h2>
          <p>Review the details submitted with your booking.</p>
        </div>

        <dl className="booking-confirmation-details">
          {booking.destination_name && (
            <div>
              <dt>Destination</dt>
              <dd>{booking.destination_name}</dd>
            </div>
          )}

          <div>
            <dt>Tour package</dt>
            <dd>{booking.package_name || booking.package}</dd>
          </div>

          <div>
            <dt>Travelers</dt>
            <dd>
              {booking.team_number}{" "}
              {booking.team_number === 1 ? "traveler" : "travelers"}
            </dd>
          </div>

          <div>
            <dt>Email address</dt>
            <dd>{booking.user_email}</dd>
          </div>

          <div>
            <dt>Phone number</dt>
            <dd>{booking.user_phone}</dd>
          </div>

          <div>
            <dt>Tour agent</dt>
            <dd>{booking.agent_name}</dd>
          </div>

          {displayedTotal !== null && (
            <div className="confirmation-total-row">
              <dt>Estimated total</dt>
              <dd>{formatBookingPrice(displayedTotal)}</dd>
            </div>
          )}
        </dl>

        <p className="confirmation-footnote">
          Your tour agent will confirm the final arrangements and
          any additional charges.
        </p>

        <div className="confirmation-actions">
          <Link
            className="booking-confirmation-link"
            href="/tours"
          >
            Make another booking <span aria-hidden="true">→</span>
          </Link>

          <Link
            className="confirmation-secondary-link"
            href="/"
          >
            Back to home
          </Link>
        </div>
      </section>

      <footer className="confirmation-footer">
        <p>Good journeys begin with a conversation.</p>
        <span>AFRICA, AT YOUR PACE</span>
      </footer>
    </main>
  );
}
