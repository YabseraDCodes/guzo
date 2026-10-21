
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getTours, type Tour } from "../../../lib/tour-data";
import "./tours.css";

const categories = ["All", "Culture", "Adventure", "Nature"];

export default function ToursPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [destination, setDestination] = useState("All");

  const tours: Tour[] = getTours();

  const destinations = [
    "All",
    ...Array.from(
      new Set(
        tours.map((tour) => tour.destination.split(",")[0].trim())
      )
    ),
  ];

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch = [
        tour.title,
        tour.destination,
        tour.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || tour.category === category;

      const tourDestination = tour.destination
        .split(",")[0]
        .trim();

      const matchesDestination =
        destination === "All" ||
        tourDestination === destination;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDestination
      );
    });
  }, [tours, search, category, destination]);

  return (
    <main className="tours-page">
      <nav className="tours-navbar">
        <Link href="/" className="tours-logo">
          GUZO<span>.</span>
        </Link>

        <div className="tours-nav-links">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/tours" className="active">
            Tours
          </Link>
        </div>

        <Link
          href="/destinations"
          className="tours-nav-button"
        >
          Explore Ethiopia
        </Link>
      </nav>

      <section className="tours-hero">
        <div className="tours-hero-content">
          <p className="tours-eyebrow">
            YOUR JOURNEY STARTS HERE
          </p>

          <h1>Find Your Perfect Tour</h1>

          <p>
            From ancient historical sites to breathtaking
            mountains, discover Ethiopia your way.
          </p>
        </div>
      </section>

      <section className="tours-content">
        <div className="tours-heading">
          <div>
            <p className="tours-section-label">
              EXPLORE OUR PACKAGES
            </p>

            <h2>Discover Our Tours</h2>

            <p>
              Choose an adventure that fits your journey.
            </p>
          </div>

          <span className="tours-count">
            {filteredTours.length} tours found
          </span>
        </div>

        <div className="tours-filters">
          <input
            type="search"
            placeholder="Search tours or destinations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search tours"
          />

          <select
            value={destination}
            onChange={(event) =>
              setDestination(event.target.value)
            }
            aria-label="Filter by destination"
          >
            {destinations.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Destinations" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="tours-categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "category-active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredTours.length > 0 ? (
          <div className="tours-grid">
            {filteredTours.map((tour) => (
              <article
                className="tour-card"
                key={tour.slug}
              >
                <Link
                  href={`/tours/${tour.slug}`}
                  className="tour-card-image-link"
                >
                  <img src={tour.image} alt={tour.title} />

                  <span className="tour-category-badge">
                    {tour.category}
                  </span>
                </Link>

                <div className="tour-card-body">
                  <p className="tour-card-destination">
                    📍 {tour.destination.split(",")[0].trim()}
                  </p>

                  <h3>
                    <Link href={`/tours/${tour.slug}`}>
                      {tour.title}
                    </Link>
                  </h3>

                  <p className="tour-card-description">
                    {tour.description}
                  </p>

                  <div className="tour-card-meta">
                    <span>◷ {tour.duration}</span>
                    <span>Per person</span>
                  </div>

                  <div className="tour-card-footer">
                    <p>
                      <span>From </span>
                      <strong>${tour.price}</strong>
                    </p>

                    <Link
                      href={`/tours/${tour.slug}`}
                      className="tour-view-button"
                    >
                      View Tour →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="tours-empty">
            <h3>No tours found</h3>

            <p>
              Try another search or change your filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setDestination("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <section className="tours-cta">
        <h2>Your Ethiopian adventure awaits.</h2>

        <p>
          Discover amazing places and create unforgettable memories.
        </p>

        <Link
          href="/destinations"
          className="tours-cta-button"
        >
          Explore Destinations →
        </Link>
      </section>

      <footer className="tours-footer">
        <Link href="/" className="tours-logo">
          GUZO<span>.</span>
        </Link>

        <p>Discover Ethiopia. Live the Journey.</p>
        <p>© 2026 Guzo</p>
      </footer>
    </main>
  );
}
