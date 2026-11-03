"use client";

import useSWR from "swr";
import DestinationCard, { type Destination } from "../components/DestinationCard";
import { fetcher } from "@/lib/fetcher";
import "./destinations.css"
import type { Tour } from "@/types/tour";


export default function DestinationPage() {
  const {
    data: destinations,
    error,
    isLoading,
  } = useSWR<Destination[]>("/api/countries", fetcher);

  const { data: tours } = useSWR<Tour[]>("/api/tours", fetcher);

  return (
    <main className="destinations-page">
      <section className="destinations-hero">
        <div className="destinations-hero-content">
          <span className="destinations-eyebrow">
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Discover places
            <br />
            <span>worth exploring.</span>
          </h1>

          <p>
            From unforgettable landscapes to vibrant cultures,
            find the destination that speaks to your sense of adventure.
          </p>

          {!isLoading && !error && destinations && (
            <div className="destinations-total">
              <span className="destinations-total-number">
                {destinations.length}
              </span>
              <span>
                destinations
                <br />
                waiting to be explored
              </span>
            </div>
          )}
        </div>

        <div
          className="destinations-hero-decoration"
          aria-hidden="true"
        >
          <span className="hero-decoration-circle" />
          <span className="hero-decoration-line" />
          <span className="hero-decoration-dot" />
        </div>
      </section>

      <section
        className="destinations-content"
        aria-labelledby="destinations-heading"
      >
        <div className="destinations-section-heading">
          <div>
            <span className="destinations-eyebrow">
              FIND YOUR SOMEWHERE
            </span>
            <h2 id="destinations-heading">
              Explore destinations
            </h2>
            <p>
              Every journey begins with a place worth discovering.
            </p>
          </div>

          {!isLoading && !error && destinations && (
            <span className="destinations-result-count">
              {destinations.length}{" "}
              {destinations.length === 1
                ? "destination"
                : "destinations"}
            </span>
          )}
        </div>

        {isLoading && (
          <div className="destinations-message" role="status">
            <span className="destinations-loader" />
            <h3>Finding your next adventure...</h3>
            <p>Our destinations are on their way.</p>
          </div>
        )}

        {error && (
          <div className="destinations-message destinations-error" role="alert">
            <h3>We couldn't load the destinations.</h3>
            <p>
              Please check your connection and try again.
            </p>
            <button
              type="button"
              className="destinations-retry"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          destinations &&
          destinations.length === 0 && (
            <div className="destinations-message">
              <h3>No destinations just yet.</h3>
              <p>Check back soon for places to explore.</p>
            </div>
          )}

        {!isLoading &&
          !error &&
          destinations &&
          destinations.length > 0 && (
            <div className="destinations-grid">
              {destinations.map((destination) => {
                const toursCount = (tours ?? []).filter(
                  (tour) => tour.country_id === destination.id
                ).length;

                return (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    toursCount={toursCount}
                  />
                );
              })}
            </div>
          )}
      </section>
    </main>
  );
}