
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
      className="submit"
    >
      <div>
        <label htmlFor="travellerName" className="name">
          Full name
        </label>
        <input
          id="travellerName"
          value={travellerName}
          onChange={(e) => setTravellerName(e.target.value)}
          autoComplete="name"
          minLength={2}
          required
          className="travellername"
        />
      </div>

      <div>
        <label htmlFor="email" className="emails">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="travelleremail"
        />
      </div>

      <div>
        <label htmlFor="phone" className="phonenumber">
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
          className="travellerphone"
        />
      </div>

      <div>
        <label htmlFor="travelDate" className="date">
          Travel date
        </label>
        <input
          id="travelDate"
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          min={new Date().toLocaleDateString("en-CA")}
          required
          className="travellerdate"
        />
      </div>

      <div>
        <label htmlFor="travellers" className="numbertraveller">
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
          className="peoplenumber"
        />
      </div>

      {error && (
        <p role="alert" className="information">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="informationLoding"
      >
        {loading ? "Submitting..." : "Submit booking"}
      </button>

      <p className="submitbooking">
        You must be signed in to submit a booking.
      </p>
    </form>
  );
}
