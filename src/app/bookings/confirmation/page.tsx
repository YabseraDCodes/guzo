"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {bookingConfirmationSchema, type BookingConfirmation,} from "@/lib/booking-schema";
import "../booking.css";

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
// loads the saved booking information from the browser and 
// checks whether it is valid before displaying it on the confirmation page
  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;
      try {//saved booking information and checks whether it is valid before displaying it
        const storedBooking = sessionStorage.getItem("bookingConfirmation");
        if (storedBooking) {
          const result = bookingConfirmationSchema.safeParse(JSON.parse(storedBooking));
          if (result.success) {
            setBooking(result.data);
          } else {
            sessionStorage.removeItem("bookingConfirmation");
          }
        }
      } catch {
        setBooking(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);//It stops the scheduled code from running if the user leaves the confirmation page before it starts

  return (
    <main className="booking-page">
      <section className="booking-panel booking-confirmation" aria-labelledby="confirmation-title">
        {isLoading ? (
          <p className="booking-heading">Loading your booking...</p>
        ) : booking ? (
          <>
            <div className="booking-heading">
              <span className="booking-eyebrow">GUZO / BOOKING CONFIRMED</span>
              <h1 id="confirmation-title">Thank you, {booking.user_name}</h1>
              <p>Your booking has been submitted. Keep your booking ID for reference.</p>
            </div>

            <p className="booking-confirmation-id">
              Booking ID <strong>{booking.booking_id}</strong>
            </p>

            <dl className="booking-confirmation-details">
              <div><dt>Email</dt><dd>{booking.user_email}</dd></div>
              <div><dt>Phone</dt><dd>{booking.user_phone}</dd></div>
              <div><dt>Tour package</dt><dd>{booking.package}</dd></div>
              <div><dt>Tour agent</dt><dd>{booking.agent_name}</dd></div>
              <div><dt>Travelers</dt><dd>{booking.team_number}</dd></div>
            </dl>

            <Link className="booking-confirmation-link" href="/bookings">
              Make another booking
            </Link>
          </>
        ) : (
          <div className="booking-heading">
            <span className="booking-eyebrow">GUZO / BOOKING</span>
            <h1 id="confirmation-title">Booking details unavailable</h1>
            <p>This confirmation may have expired or been opened on another device.</p>
            <Link className="booking-confirmation-link" href="/bookings">
              Return to bookings
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
