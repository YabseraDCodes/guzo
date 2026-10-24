
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  tourPackageId: number;
}

export default function BookingForm({
  tourPackageId,
}: BookingFormProps) {
  const router = useRouter();

  const [travellerName, setTravellerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState(1);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tour_package_id: tourPackageId,
          traveller_name: travellerName,
          email,
          phone,
          travel_date: travelDate,
          number_of_travellers: travellers,
        }),
      });

      const result: {
        error?: string;
        bookingId?: number | string;
      } = await response.json();

      if (!response.ok || result.bookingId == null) {
        setError(result.error ?? "Booking failed.");
        return;
      }

      router.push(
        `/bookings/confirmation/${result.bookingId}`
      );
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="travellerName" className="mb-1 block">
          Full name
        </label>
        <input
          id="travellerName"
          value={travellerName}
          onChange={(e) => setTravellerName(e.target.value)}
          autoComplete="name"
          minLength={2}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          minLength={7}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="travelDate" className="mb-1 block">
          Travel date
        </label>
        <input
          id="travelDate"
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          min={new Date().toLocaleDateString("en-CA")}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="travellers" className="mb-1 block">
          Number of travellers
        </label>
        <input
          id="travellers"
          type="number"
          min={1}
          max={20}
          value={travellers}
          onChange={(e) => setTravellers(Number(e.target.value))}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit booking"}
      </button>

      <p className="text-sm text-gray-500">
        You must be signed in to submit a booking.
      </p>
    </form>
  );
}
