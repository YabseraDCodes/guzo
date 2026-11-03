"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import TourCard, { type Tour } from "./TourCard";
import type { Country } from "@/types/country";
import "./CountryDetail.css";

type CountryDetailProps = {
    slug: string;
};

export default function CountryDetail({
    slug,
}: CountryDetailProps) {
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
        () => tours?.filter(
            (tour) => tour.country_id === country?.id
        ) ?? [],
        [tours, country]
    );

    if (countriesLoading) {
        return (
            <main className="country-detail-page">
                <div className="country-detail-state" role="status">
                    Loading country...
                </div>
            </main>
        );
    }

    if (countriesError) {
        return (
            <main className="country-detail-page">
                <div className="country-detail-state" role="alert">
                    <h1>Unable to load this country</h1>
                    <p>Please try again in a moment.</p>
                </div>
            </main>
        );
    }

    if (!country) {
        return (
            <main className="country-detail-page">
                <div className="country-detail-state">
                    <h1>Country not found</h1>
                    <Link href="/Countries">
                        Explore all countries
                    </Link>
                </div>
            </main>
        );
    }

    const attractions = country.attractions ?? [];
    const tips = country.travel_tips ?? [];
    const visibleAttractions = showAllAttractions
        ? attractions
        : attractions.slice(0, 3);

    return (
        <main className="country-detail-page">
            <section className="country-detail-hero">
                <img
                    className="country-detail-hero-image"
                    src={country.hero_image_url || country.cover_image_url}
                    alt={`${country.name} landscape`}
                    fetchPriority="high"
                />

                <div className="country-detail-hero-overlay" />

                <div className="country-detail-hero-content">
                    <Link
                        href="/Countries"
                        className="country-detail-back"
                    >
                        <span aria-hidden="true">←</span>
                        All countries
                    </Link>

                    <span className="country-detail-eyebrow">
                        {country.region}
                    </span>

                    <h1>{country.name}</h1>
                    <p>{country.short_description}</p>

                    <div className="country-detail-hero-meta">
                        <span>{country.capital}</span>
                        <span className="country-detail-meta-divider" />
                        <span>{country.best_time_to_visit}</span>
                    </div>

                    <a
                        className="country-detail-cta"
                        href="#country-tours"
                    >
                        Explore tours <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </section>

            <div className="country-detail-content">
                <section className="country-detail-overview">
                    <div className="country-detail-intro">
                        <span className="country-detail-eyebrow">
                            ABOUT THIS COUNTRY
                        </span>
                        <h2>A little about {country.name}</h2>

                        <p>
                            {showDescription
                                ? country.description
                                : country.description.length > 180
                                  ? `${country.description.slice(0, 180).trimEnd()}…`
                                  : country.description}
                        </p>

                        {country.description.length > 180 && (
                            <button
                                type="button"
                                className="country-detail-text-button"
                                onClick={() =>
                                    setShowDescription((value) => !value)
                                }
                                aria-expanded={showDescription}
                            >
                                {showDescription ? "Read less" : "Read more"}
                            </button>
                        )}
                    </div>

                    <div className="country-detail-facts">
                        <div className="country-fact">
                            <span className="country-fact-label">
                                Capital
                            </span>
                            <strong>{country.capital}</strong>
                        </div>

                        <div className="country-fact">
                            <span className="country-fact-label">
                                Languages
                            </span>
                            <strong>
                                {country.languages?.join(", ") || "Not specified"}
                            </strong>
                        </div>

                        <div className="country-fact">
                            <span className="country-fact-label">
                                Currency
                            </span>
                            <strong>{country.currency}</strong>
                        </div>

                        <div className="country-fact">
                            <span className="country-fact-label">
                                Time zone
                            </span>
                            <strong>{country.time_zone}</strong>
                        </div>
                    </div>
                </section>

                {attractions.length > 0 && (
                    <section className="country-detail-section">
                        <div className="country-detail-section-heading">
                            <span className="country-detail-eyebrow">
                                WORTH DISCOVERING
                            </span>
                            <h2>Highlights of {country.name}</h2>
                            <p>
                                A few places to put on your itinerary.
                            </p>
                        </div>

                        <div className="country-attractions-grid">
                            {visibleAttractions.map((attraction) => (
                                <article
                                    className="country-attraction"
                                    key={attraction.name}
                                >
                                    <span
                                        className="country-attraction-marker"
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
                                className="country-detail-text-button"
                                onClick={() =>
                                    setShowAllAttractions((value) => !value)
                                }
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
                    className="country-detail-tours"
                    id="country-tours"
                >
                    <div className="country-detail-section-heading">
                        <span className="country-detail-eyebrow">
                            FIND YOUR EXPERIENCE
                        </span>
                        <h2>Tours in {country.name}</h2>
                        <p>
                            Turn your inspiration into your next adventure.
                        </p>
                    </div>

                    {toursLoading && (
                        <div className="country-detail-state" role="status">
                            Loading tours...
                        </div>
                    )}

                    {toursError && (
                        <div className="country-detail-state" role="alert">
                            <p>
                                We couldn't load the tours right now.
                                Please try again later.
                            </p>
                        </div>
                    )}

                    {!toursLoading && !toursError && relatedTours.length > 0 && (
                        <>
                            <p className="country-detail-tour-count">
                                {relatedTours.length}{" "}
                                {relatedTours.length === 1 ? "tour" : "tours"}{" "}
                                available
                            </p>

                            <div className="country-detail-tours-grid">
                                {relatedTours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} />
                                ))}
                            </div>
                        </>
                    )}

                    {!toursLoading && !toursError && relatedTours.length === 0 && (
                        <div className="country-detail-state">
                            <h3>More adventures coming soon</h3>
                            <p>
                                There are no tours listed for {country.name} yet.
                            </p>
                        </div>
                    )}
                </section>

                {tips.length > 0 && (
                    <section className="country-detail-tips">
                        <button
                            type="button"
                            className="country-detail-tips-toggle"
                            onClick={() => setShowTips((value) => !value)}
                            aria-expanded={showTips}
                        >
                            <span>
                                <strong>Travel tips</strong>
                                <span className="country-detail-tips-subtitle">
                                    Useful things to know before you go
                                </span>
                            </span>
                            <span aria-hidden="true">
                                {showTips ? "−" : "+"}
                            </span>
                        </button>

                        {showTips && (
                            <ul className="country-tips-list">
                                {tips.map((tip, index) => (
                                    <li key={`${index}-${tip}`}>
                                        <span
                                            className="country-tip-check"
                                            aria-hidden="true"
                                        >
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
