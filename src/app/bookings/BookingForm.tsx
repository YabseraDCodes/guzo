"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  bookingSchema,
  getBookingFieldErrors,
  type BookingField,
} from "@/lib/booking-schema";
import { BookingFormFields } from "./BookingFormFields";

type Props = {
  initialAgentId: string;
  initialAgentName: string;
  initialPackageName: string;
  initialPackagePrice: number | null;
};

function formatBookingPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function BookingForm({
  initialAgentId,
  initialAgentName,
  initialPackageName,
  initialPackagePrice,
}: Props) {
  const router = useRouter();
  const [result, setResult] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [teamNumber, setTeamNumber] = useState("2");
  const travelerCount = /^[1-9]\d*$/.test(teamNumber) ? Number(teamNumber) : 0;
  const estimatedTotal =
    initialPackagePrice !== null && travelerCount > 0
      ? initialPackagePrice * travelerCount
      : null;

  function clearFieldError(field: BookingField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;//it see if the error exist
      const next = { ...current };
      delete next[field];
      return next;
    });
  }//The system detects errors when the user submits the form, and clearFieldError() removes the error for a field when the user corrects it.

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setResult(null);

    const validation = bookingSchema.safeParse({
      agent_id: formData.get("agent_id"),
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      user_phone: formData.get("user_phone"),
      team_number: formData.get("team_number"),
      package: formData.get("package"),
    });

    if (!validation.success) {
      setFieldErrors(getBookingFieldErrors(validation.error));
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    let bookingId: string | null = null;
    try {//for all it do The user submits the form → the validated data is sent to the booking API → the server processes the booking and responds.
      const response = await fetch("/api/bookingPost", {
        method: "POST",//tells the server to process the submitted data to create a booking.
        headers: { "Content-Type": "application/json" },//tells the server the data format is JSON.
        body: JSON.stringify(validation.data),//converts the validated booking information into JSON text to send.
      });

      const payload = await response.json();//checks the server's response after the user submits a booking.
      if (!response.ok) {
        throw new Error(payload.error || "Your booking could not be saved.");
      }

      if (
        typeof payload.booking_id !== "string" &&
        typeof payload.booking_id !== "number"
      ) {
        throw new Error("Your booking was saved, but its ID could not be retrieved.");
      }

      bookingId = String(payload.booking_id);
      const confirmation = {
        booking_id: bookingId,
        ...validation.data,
        agent_name: initialAgentName || `Agent ${initialAgentId}`,
        total_price:
          initialPackagePrice === null
            ? null
            : initialPackagePrice * validation.data.team_number,
      };
      sessionStorage.setItem("bookingConfirmation", JSON.stringify(confirmation));
      router.push("/bookings/confirmation");//prepares the booking confirmation information, saves it temporarily in the browser, and opens the confirmation page.
    } catch (error) {
      setResult({
        message: bookingId
          ? `Booking submitted successfully. Your booking ID is ${bookingId}, but confirmation details could not be opened.`
          : error instanceof Error ? error.message : "Something went wrong. Please try again.",
        isError: !bookingId,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <section className="booking-panel" aria-labelledby="booking-title">
        <div className="booking-heading">
          <span className="booking-eyebrow">GUZO / YOUR JOURNEY</span>
          <h1 id="booking-title">Make a booking</h1>
          <p>Share a few details and our team will help plan your trip.</p>
        </div>

        <dl className="booking-selection">
          <div>
            <dt>Agent ID</dt>
            <dd>{initialAgentId || "Not provided"}</dd>
          </div>
          <div>
            <dt>Tour agent</dt>
            <dd>{initialAgentName || "Not provided"}</dd>
          </div>
          <div>
            <dt>Selected package</dt>
            <dd>{initialPackageName || "Not provided"}</dd>
          </div>
        </dl>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <input type="hidden" name="agent_id" value={initialAgentId} />
          <input type="hidden" name="package" value={initialPackageName} />
          <BookingFormFields
            fieldErrors={fieldErrors}
            teamNumber={teamNumber}
            onTeamNumberChange={setTeamNumber}
            onFieldChange={clearFieldError}
          />

          {initialPackagePrice !== null && (
            <p className="booking-message booking-message-success" aria-live="polite">
              Estimated total: {estimatedTotal === null ? "—" : formatBookingPrice(estimatedTotal)}
              {" "}({formatBookingPrice(initialPackagePrice)} per traveler)
            </p>
          )}

          {result && (
            <p className={`booking-message ${result.isError ? "booking-message-error" : "booking-message-success"}`} role="status">
              {result.message}
            </p>
          )}

          <button
            className="booking-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit booking"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <aside className="booking-note" aria-label="Booking note">
        <span className="booking-note-mark" aria-hidden="true">G</span>
        <p>Good journeys begin with a conversation.</p>
        <span className="booking-note-caption">ETHIOPIA, AT YOUR PACE</span>
      </aside>
    </main>
  );
}
