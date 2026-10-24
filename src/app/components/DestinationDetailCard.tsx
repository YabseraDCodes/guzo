"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import TourCard, { type Tour } from "./TourCard";
import "./DestinationDetailCard.css";

type Attraction = {
  name: string;
  description: string;
};

export type Country = {
  id: number;
  name: string;
  slug: string;
  region: string;
  capital: string;
  short_description: string;
  description: string;
  languages: string[];
  currency: string;
  best_time_to_visit: string;
  time_zone: string;
  cover_image_url: string;
  hero_image_url: string;
  attractions: Attraction[];
  travel_tips: string[];
  is_featured: boolean;
};

type DestinationDetailPageProps = {
  slug: string;
};

export default function DestinationDetailPage({
  slug,
}: DestinationDetailPageProps) {
  const [showAllAttractions, setShowAllAttractions] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const {
    data: countries,
    error: countriesError,
    isLoading: countriesLoading,
  } = useSWR<Country[]>("/api/countries", fetcher);

  const {
    data: tours,
    error: toursError,
    isLoading: toursLoading,
  } = useSWR<Tour[]>("/api/tours", fetcher);

  const country = useMemo(
    () => countries?.find((item) => item.slug === slug),
    [countries, slug]
  );

  const relatedTours = useMemo(
    () => tours?.filter((tour) => Number(tour.country_id) === country?.id) ?? [],
    [tours, country]
  );

  if (countriesLoading) {
    return (
      <main className="destination-detail-page">
        <div className="destination-detail-state" role="status">
          Loading destination...
        </div>
      </main>
    );
  }

  if (countriesError) {
    return (
      <main className="destination-detail-page">
        <div className="destination-detail-state" role="alert">
          <h1>Unable to load this destination</h1>
          <p>Please try again in a moment.</p>
          <Link href="/destinations">Explore all destinations</Link>
        </div>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="destination-detail-page">
        <div className="destination-detail-state">
          <h1>Destination not found</h1>
          <Link href="/destinations">Explore all destinations</Link>
        </div>
      </main>
    );
  }

  const description = country.description ?? "";
  const shortDescription = country.short_description ?? "";
  const attractions = country.attractions ?? [];
  const tips = country.travel_tips ?? [];
  const languages = country.languages ?? [];

  const visibleAttractions = showAllAttractions
    ? attractions
    : attractions.slice(0, 3);

  return (
    <main className="destination-detail-page">
      <section className="destination-detail-hero">
        {(country.hero_image_url || country.cover_image_url) && (
          <img
            className="destination-detail-hero-image"
            src={country.hero_image_url || country.cover_image_url}
            alt={`${country.name} landscape`}
            fetchPriority="high"
          />
        )}

        <div className="destination-detail-hero-overlay" />

        <div className="destination-detail-hero-content">
          <Link href="/destinations" className="destination-detail-back">
            <span aria-hidden="true">←</span>
            All destinations
          </Link>

          <span className="destination-detail-eyebrow">
            {country.region}
          </span>

          <h1>{country.name}</h1>
          <p>{shortDescription}</p>

          <div className="destination-detail-hero-meta">
            <span>{country.capital}</span>
            <span className="destination-detail-meta-divider" />
            <span>{country.best_time_to_visit}</span>
          </div>

          <a className="destination-detail-cta" href="#destination-tours">
            Explore tours <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <div className="destination-detail-content">
        <section className="destination-detail-overview">
          <div className="destination-detail-intro">
            <span className="destination-detail-eyebrow">
              YOUR DESTINATION
            </span>

            <h2>A little about {country.name}</h2>

            <p>
              {showDescription
                ? description
                : description.length > 180
                  ? `${description.slice(0, 180).trimEnd()}…`
                  : description}
            </p>

            {description.length > 180 && (
              <button
                type="button"
                className="destination-detail-text-button"
                onClick={() => setShowDescription((value) => !value)}
                aria-expanded={showDescription}
              >
                {showDescription ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          <div className="destination-detail-facts">
            <div className="destination-fact">
              <span className="destination-fact-label">Capital</span>
              <strong>{country.capital || "Not specified"}</strong>
            </div>

            <div className="destination-fact">
              <span className="destination-fact-label">Languages</span>
              <strong>
                {languages.length > 0
                  ? languages.join(", ")
                  : "Not specified"}
              </strong>
            </div>

            <div className="destination-fact">
              <span className="destination-fact-label">Currency</span>
              <strong>{country.currency || "Not specified"}</strong>
            </div>

            <div className="destination-fact">
              <span className="destination-fact-label">Time zone</span>
              <strong>{country.time_zone || "Not specified"}</strong>
            </div>
          </div>
        </section>

        {attractions.length > 0 && (
          <section className="destination-detail-section">
            <div className="destination-detail-section-heading">
              <span className="destination-detail-eyebrow">
                WORTH DISCOVERING
              </span>
              <h2>Highlights of {country.name}</h2>
              <p>A few places to put on your itinerary.</p>
            </div>

            <div className="destination-attractions-grid">
              {visibleAttractions.map((attraction, index) => (
                <article
                  className="destination-attraction"
                  key={`${attraction.name}-${index}`}
                >
                  <span
                    className="destination-attraction-marker"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                  <h3>{attraction.name}</h3>
                  <p>{attraction.description}</p>
                </article>
              ))}
            </div>

            {attractions.length > 3 && (
              <button
                type="button"
                className="destination-detail-text-button"
                onClick={() => setShowAllAttractions((value) => !value)}
                aria-expanded={showAllAttractions}
              >
                {showAllAttractions
                  ? "Show fewer places"
                  : `View all ${attractions.length} places`}
              </button>
            )}
          </section>
        )}

        <section
          className="destination-detail-tours"
          id="destination-tours"
        >
          <div className="destination-detail-section-heading">
            <span className="destination-detail-eyebrow">
              FIND YOUR EXPERIENCE
            </span>
            <h2>Tours in {country.name}</h2>
            <p>Turn your inspiration into your next adventure.</p>
          </div>

          {toursLoading && (
            <div className="destination-detail-state" role="status">
              Loading tours...
            </div>
          )}

          {toursError && (
            <div className="destination-detail-state" role="alert">
              <p>
                We couldn't load the tours right now. Please try again later.
              </p>
            </div>
          )}

          {!toursLoading && !toursError && relatedTours.length > 0 && (
            <>
              <p className="destination-detail-tour-count">
                {relatedTours.length}{" "}
                {relatedTours.length === 1 ? "tour" : "tours"} available
              </p>

              <div className="destination-detail-tours-grid">
                {relatedTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </>
          )}

          {!toursLoading && !toursError && relatedTours.length === 0 && (
            <div className="destination-detail-state">
              <h3>More adventures coming soon</h3>
              <p>There are no tours listed for {country.name} yet.</p>
            </div>
          )}
        </section>

        {tips.length > 0 && (
          <section className="destination-detail-tips">
            <button
              type="button"
              className="destination-detail-tips-toggle"
              onClick={() => setShowTips((value) => !value)}
              aria-expanded={showTips}
            >
              <span>
                <strong>Travel tips</strong>
                <span className="destination-detail-tips-subtitle">
                  Useful things to know before you go
                </span>
              </span>

              <span aria-hidden="true">{showTips ? "−" : "+"}</span>
            </button>

            {showTips && (
              <ul className="destination-tips-list">
                {tips.map((tip, index) => (
                  <li key={`${index}-${tip}`}>
                    <span className="destination-tip-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
