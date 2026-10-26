import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {bookingSchema,getBookingFieldErrors,type BookingField,} from "@/lib/booking-schema";
import { BookingFormFields, type Agent, type Tour } from "./BookingFormFields";

type Props = {
  agents: Agent[];
  tours: Tour[];
  isLoadingOptions: boolean;
  optionsError: boolean;
};

export function BookingForm({ agents, tours, isLoadingOptions, optionsError }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<BookingField, string>>>({});

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
        agent_name: agents.find((agent) => agent.id === validation.data.agent_id)?.name ?? "Not assigned",
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

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <BookingFormFields // by using sher stste we passe part to BookingFormFields
            agents={agents}
            tours={tours}
            isLoadingOptions={isLoadingOptions}
            selectedAgentId={selectedAgentId}
            fieldErrors={fieldErrors}
            onAgentChange={(agentId) => {
              setSelectedAgentId(agentId);
              clearFieldError("agent_id");
            }}
            onFieldChange={clearFieldError}
          />

          {optionsError && (
            <p className="booking-message booking-message-error" role="alert">
              Agents or packages could not be loaded. Refresh the page and try again.
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
            disabled={isSubmitting || isLoadingOptions || !agents.length || !tours.length}
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
