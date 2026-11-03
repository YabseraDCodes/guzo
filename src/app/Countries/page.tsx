"use client";

import useSWR from "swr";
import CountryCard from "../components/CountryCard";
import { fetcher } from "@/lib/fetcher";
import type { Country } from "@/types/country";
import "./countries.css";
import type { Tour } from "@/types/tour";


export default function CountriesPage() {
  const {
    data: countries,
    error,
    isLoading,
  } = useSWR<Country[]>("/api/countries", fetcher);

  const { data: tours } = useSWR<Tour[]>("/api/tours", fetcher);

  return (
    <main className="countries-page">
      <section className="countries-hero">
        <div className="countries-hero-content">
          <span className="countries-eyebrow">
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Discover countries
            <br />
            <span>worth exploring.</span>
          </h1>

          <p>
            From unforgettable landscapes to vibrant cultures,
            find the country that speaks to your sense of adventure.
          </p>

          {!isLoading && !error && countries && (
            <div className="countries-total">
              <span className="countries-total-number">
                {countries.length}
              </span>
              <span>
                countries
                <br />
                waiting to be explored
              </span>
            </div>
          )}
        </div>

        <div
          className="countries-hero-decoration"
          aria-hidden="true"
        >
          <span className="hero-decoration-circle" />
          <span className="hero-decoration-line" />
          <span className="hero-decoration-dot" />
        </div>
      </section>

      <section
        className="countries-content"
        aria-labelledby="countries-heading"
      >
        <div className="countries-section-heading">
          <div>
            <span className="countries-eyebrow">
              FIND YOUR SOMEWHERE
            </span>
            <h2 id="countries-heading">
              Explore countries
            </h2>
            <p>
              Every journey begins with a place worth discovering.
            </p>
          </div>

          {!isLoading && !error && countries && (
            <span className="countries-result-count">
              {countries.length}{" "}
              {countries.length === 1
                ? "country"
                : "countries"}
            </span>
          )}
        </div>

        {isLoading && (
          <div className="countries-message" role="status">
            <span className="countries-loader" />
            <h3>Finding your next adventure...</h3>
            <p>Our countries are on their way.</p>
          </div>
        )}

        {error && (
          <div className="countries-message countries-error" role="alert">
            <h3>We couldn't load the countries.</h3>
            <p>
              Please check your connection and try again.
            </p>
            <button
              type="button"
              className="countries-retry"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          countries &&
          countries.length === 0 && (
            <div className="countries-message">
              <h3>No countries just yet.</h3>
              <p>Check back soon for places to explore.</p>
            </div>
          )}

        {!isLoading &&
          !error &&
          countries &&
          countries.length > 0 && (
            <div className="countries-grid">
              {countries.map((country) => {
                const toursCount = (tours ?? []).filter(
                  (tour) => tour.country_id === country.id
                ).length;

                return (
                  <CountryCard
                    key={country.id}
                    country={country}
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
