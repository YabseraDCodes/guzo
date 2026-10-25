"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./TripStatusPage.css"

type Booking = {
  id: string;
  agent_id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  team_number: number;
  package: string;
  status: string;
  created_at: string;
};

export default function TripStatusPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingReference, setBookingReference] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/bookinGet");

        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Unable to load booking information. Please try again later.");
      } finally {
        setFetching(false);
      }
    }

    fetchBookings();
  }, []);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBooking(null);

    const reference = bookingReference.trim();

    if (!reference) {
      setError("Please enter your booking reference.");
      setLoading(false);
      return;
    }

    const foundBooking = bookings.find(
      (item) => item.id.toLowerCase() === reference.toLowerCase()
    );

    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      setError("No booking found with that reference. Please check and try again.");
    }

    setLoading(false);
  }

  return (
    <main className="info-page">
      <section className="info-hero">
        <h1>Track Your Trip</h1>
        <p>
          Keep your Ethiopian adventure organized.
          Your journey starts here.
        </p>

        <Link href="/destinations" className="info-button">
          Explore Destinations
        </Link>
      </section>

      <section className="info-content">
        <h2>Your Trip Status</h2>
        <p>
          Enter your booking reference below to check your trip status.
        </p>

        <form onSubmit={handleSearch}>
          <label htmlFor="bookingReference">
            Booking Reference
          </label>

          <input
            id="bookingReference"
            type="text"
            placeholder="e.g. irv-airrz-rpe"
            value={bookingReference}
            onChange={(e) => setBookingReference(e.target.value)}
            required
          />

          <button type="submit" disabled={fetching || loading}>
            {fetching
              ? "Loading bookings..."
              : loading
                ? "Checking..."
                : "Check Status"}
          </button>
        </form>

        {error && (
          <p role="alert" className="booking-error">
            {error}
          </p>
        )}

        {booking && (
          <div className="booking-result">
            <h3>Booking Details</h3>

            <p>
              <strong>Booking Reference:</strong> {booking.id}
            </p>

            <p>
              <strong>Name:</strong> {booking.user_name}
            </p>

            <p>
              <strong>Email:</strong> {booking.user_email}
            </p>

            <p>
              <strong>Phone:</strong> {booking.user_phone}
            </p>

            <p>
              <strong>Package:</strong> {booking.package}
            </p>

            <p>
              <strong>Team Number:</strong> {booking.team_number}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`booking-status ${booking.status.toLowerCase()}`}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </span>
            </p>

            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.created_at).toLocaleDateString()}
            </p>
          </div>
        )}

        <Link href="/destinations" className="info-button">
          Plan Your Trip
        </Link>
      </section>
    </main>
  );
}
