"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  bookingSchema,
  getBookingFieldErrors,
  type BookingField,
} from "@/lib/booking-schema";
import { BookingFormFields } from "./BookingFormFields";

type SelectedTour = {
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
};

type SelectedPackage = {
  name: string;
  price: number;
  duration: string;
  hotelDescription: string;
  hotelRating: number;
};

type Props = {
  initialAgentId: string;
  initialAgentName: string;
  initialPackageName: string;
  initialPackage: SelectedPackage | null;
  initialTour: SelectedTour | null;
};

const packageImages: Record<string, string> = {
  golden: "/images/hotels/golden.jpg",
  silver: "/images/hotels/silver.jpg",
  economy: "/images/hotels/economy.jpg",
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
  initialPackage,
  initialTour,
}: Props) {
  const router = useRouter();

  const [result, setResult] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<BookingField, string>>
  >({});

  const [teamNumber, setTeamNumber] = useState("2");

  const [travelDate, setTravelDate] = useState("");

  const travelerCount = /^[1-9]\d*$/.test(teamNumber)
    ? Number(teamNumber)
    : 0;

  const estimatedTotal =
    initialPackage && travelerCount > 0
      ? initialPackage.price * travelerCount
      : null;

  const normalizedPackageName = initialPackageName
    .trim()
    .toLowerCase();

  const packageImage =
    packageImages[normalizedPackageName] ??
    "/images/hotels/economy.jpg";

  function clearFieldError(field: BookingField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];

      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setResult(null);

    // Do not submit a booking for a missing or invalid selection.
    if (!initialPackage) {
      setResult({
        message:
          "The selected package is unavailable. Please return to the tour and choose an available package.",
        isError: true,
      });
      return;
    }

    if (!initialTour) {
      setResult({
        message:
          "We couldn't load the tour assigned to this agent. Please try selecting the tour again.",
        isError: true,
      });
      return;
    }

    const validation = bookingSchema.safeParse({
      agent_id: formData.get("agent_id"),
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      user_phone: formData.get("user_phone"),
      team_number: formData.get("team_number"),
      package: formData.get("package"),
      travel_date: formData.get("travel_date")
    });

    if (!validation.success) {
      setFieldErrors(getBookingFieldErrors(validation.error));
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    let bookingId: string | null = null;

    try {
      const response = await fetch("/api/bookingPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload.error || "Your booking could not be saved."
        );
      }

      if (
        typeof payload.booking_id !== "string" &&
        typeof payload.booking_id !== "number"
      ) {
        throw new Error(
          "Your booking was saved, but its ID could not be retrieved."
        );
      }

      bookingId = String(payload.booking_id);

      const confirmation = {
        booking_id: bookingId,
        ...validation.data,
        agent_name: initialAgentName || `Agent ${initialAgentId}`,
        destination_name: initialTour.name,
        package_name: initialPackage.name,
        package_price: initialPackage.price,
        total_price:
          initialPackage.price * validation.data.team_number,
      };

      sessionStorage.setItem(
        "bookingConfirmation",
        JSON.stringify(confirmation)
      );

      router.push("/bookings/confirmation");
    } catch (error) {
      setResult({
        message: bookingId
          ? `Booking submitted successfully. Your booking ID is ${bookingId}, but confirmation details could not be opened.`
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        isError: !bookingId,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <section
        className="booking-panel"
        aria-labelledby="booking-title"
      >


        <div className="booking-heading">
          <span className="booking-eyebrow">
            <span aria-hidden="true" />
            YOUR NEXT ADVENTURE
          </span>

          <h1 id="booking-title">
            Let's plan your <em>journey.</em>
          </h1>

          <p>
            Your African experience starts here. Review your tour and
            complete your booking details below.
          </p>
        </div>



        <div className="booking-selections">
          {/* Selected tour card */}
          <section
            className="booking-selection-card booking-tour-card"
            aria-labelledby="selected-tour-title"
          >
            <div className="booking-card-image">
              {initialTour?.image ? (
                <img
                  src={initialTour.image}
                  alt={initialTour.name}
                />
              ) : (
                <div className="booking-image-placeholder">
                  <span aria-hidden="true">✦</span>
                  <span>Discover somewhere new</span>
                </div>
              )}
            </div>

            <div className="booking-card-content">
              <div className="booking-card-label">
                YOUR SELECTED TOUR
              </div>

              {initialTour?.category && (
                <span className="booking-category">
                  {initialTour.category}
                </span>
              )}

              <h2 id="selected-tour-title">
                {initialTour?.name || "Tour details unavailable"}
              </h2>

              {initialTour?.location && (
                <p className="booking-tour-location">
                  <span aria-hidden="true">⌖</span>
                  {initialTour.location}
                </p>
              )}

              <p className="booking-card-description">
                {initialTour?.description ||
                  "Tour description is currently unavailable."}
              </p>

              <div className="booking-card-agent">
                <span>Tour agent</span>
                <strong>
                  {initialAgentName ||
                    `Agent ${initialAgentId || "not assigned"}`}
                </strong>
              </div>
            </div>
          </section>

          {/* Selected package card */}
          <section
            className="booking-selection-card booking-package-card"
            aria-labelledby="selected-package-title"
          >
            <div className="booking-card-image">
              <img
                src={packageImage}
                alt={`${initialPackageName || "Selected"} package`}
              />
            </div>

            <div className="booking-card-content">
              <div className="booking-card-label">
                YOUR SELECTED PACKAGE
              </div>

              <h2 id="selected-package-title">
                {initialPackage?.name
                  ? `${initialPackage.name.charAt(0).toUpperCase()}${initialPackage.name.slice(1)} Package`
                  : "Package details unavailable"}
              </h2>

              {initialPackage ? (
                <>
                  <div className="booking-package-price">
                    <strong>
                      {formatBookingPrice(initialPackage.price)}
                    </strong>
                    <span> / traveler</span>
                  </div>

                  <div className="booking-package-meta">
                    {initialPackage.duration && (
                      <span>
                        <span aria-hidden="true">◷</span>{" "}
                        {initialPackage.duration}
                      </span>
                    )}

                    {initialPackage.hotelRating > 0 && (
                      <span
                        aria-label={`${initialPackage.hotelRating} out of 5 hotel stars`}
                      >
                        <span aria-hidden="true">
                          {"★".repeat(initialPackage.hotelRating)}
                          {"☆".repeat(
                            5 - initialPackage.hotelRating
                          )}
                        </span>
                        <span className="booking-rating-label">
                          Hotel rating
                        </span>
                      </span>
                    )}
                  </div>

                  {initialPackage.hotelDescription && (
                    <p className="booking-card-description">
                      {initialPackage.hotelDescription}
                    </p>
                  )}
                </>
              ) : (
                <p className="booking-card-description">
                  This package is not available for the selected
                  agent. Return to the tour page to choose an
                  available package.
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="booking-form-heading">
          <h2>Your booking details</h2>
          <p>
            Enter your contact details and the number of travelers.
          </p>
        </div>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="hidden"
            name="agent_id"
            value={initialAgentId}
          />

          <input
            type="hidden"
            name="package"
            value={initialPackage?.name ?? initialPackageName}
          />

          <BookingFormFields
            fieldErrors={fieldErrors}
            teamNumber={teamNumber}
            onTeamNumberChange={setTeamNumber}
            onFieldChange={clearFieldError}
            travelDate={travelDate}
            onTravelDateChange={setTravelDate}
          />

          {initialPackage && (
            <div
              className="booking-total"
              aria-live="polite"
            >
              <div>
                <span>Price per traveler</span>
                <strong>
                  {formatBookingPrice(initialPackage.price)}
                </strong>
              </div>

              <div>
                <span>Number of travelers</span>
                <strong>{travelerCount || "—"}</strong>
              </div>

              <div className="booking-total-final">
                <span>Estimated total</span>
                <strong>
                  {estimatedTotal === null
                    ? "—"
                    : formatBookingPrice(estimatedTotal)}
                </strong>
              </div>

              <p>
                Final arrangements and any additional charges will
                be confirmed by your tour agent.
              </p>
            </div>
          )}

          {result && (
            <p
              className={`booking-message ${result.isError
                ? "booking-message-error"
                : "booking-message-success"
                }`}
              role="status"
            >
              {result.message}
            </p>
          )}

          <button
            className="booking-submit"
            type="submit"
            disabled={isSubmitting || !initialPackage || !initialTour}
          >
            {isSubmitting ? "Submitting..." : "Submit booking"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <aside className="booking-note" aria-label="Booking note">
        <span className="booking-note-mark" aria-hidden="true">
          G
        </span>

        <p>Good journeys begin with a conversation.</p>

        <span className="booking-note-caption">
          AFRICA, AT YOUR PACE
        </span>
      </aside>
    </main>
  );
}
