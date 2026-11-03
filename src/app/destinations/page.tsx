
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DestinationCard from "../components/DestinationCard";
import type { Destination } from "@/types/destination";
import "./destinations.css";

const PAGE_SIZE = 9;

const CATEGORIES = [
  "All",
  "Safari",
  "Culture",
  "History",
  "Nature",
  "City",
  "Beach",
  "Coastal",
  "Religion",
  "Trekking",
  "Adventure",
];

type SearchableDestination = Destination & {
  category?: string | null;
  location?: string | null;
  description?: string | null;
  slug?: string | null;
  image_urls?: string[] | null;
  countries?: { name: string } | null;
};

export default function DestinationsPage() {
  const {
    data: destinations,
    error,
    isLoading,
    mutate,
  } = useSWR<SearchableDestination[]>("/api/destinations", fetcher);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);


  // Filter destinations by category and search query.
  const filteredDestinations = useMemo(() => {
    if (!destinations) return [];
    const searchText = debouncedQuery.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesCategory =
        selectedCategory === "All" ||
        destination.category?.toLowerCase() ===
        selectedCategory.toLowerCase();

      const searchableText = [
        destination.name,
        destination.category,
        destination.location,
        destination.countries?.name,
        destination.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchText || searchableText.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [destinations, selectedCategory, debouncedQuery]);



  const totalDestinations = filteredDestinations.length;
  const totalPages = Math.ceil(totalDestinations / PAGE_SIZE);

  // Reset to the first page when search or category changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedQuery]);

  // Keep the page number valid when data changes.
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  // Paginate after filtering.
  const currentDestinations = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredDestinations.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  }, [filteredDestinations, currentPage]);

  // Compact pagination numbers.
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  function goToPage(page: number) {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    document
      .getElementById("destinations-list")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  function clearSearch() {
    setQuery("");
  }

  return (
    <main className="destinations-page">
      {/* Hero */}
      <section className="destinations-page-hero">
        <div className="destinations-page-hero-content">
          <span className="destinations-page-eyebrow">
            FIND YOUR NEXT ADVENTURE
          </span>

          <h1>
            Journeys worth
            <br />
            <span>remembering.</span>
          </h1>

          <p>
            Explore remarkable destinations, discover local
            experiences, and find a journey that feels like yours.
          </p>

          {!isLoading && !error && (
            <div className="destinations-page-total">
              <strong>{destinations?.length ?? 0}</strong>
              <span>
                {(destinations?.length ?? 0) === 1
                  ? "destination"
                  : "destinations"}{" "}
                to explore
              </span>
            </div>
          )}
        </div>

        <div
          className="destinations-page-hero-decoration"
          aria-hidden="true"
        >
          <span className="destinations-hero-circle" />
          <span className="destinations-hero-dot" />
        </div>
      </section>

      {/* Destinations listing */}
      <section
        className="destinations-page-content"
        id="destinations-list"
        aria-labelledby="destinations-page-heading"
      >
        <div className="destinations-page-section-heading">
          <div>
            <span className="destinations-page-eyebrow">
              CURATED FOR THE CURIOUS
            </span>

            <h2 id="destinations-page-heading">Explore our destinations</h2>

            <p>
              Find your next unforgettable experience.
            </p>
          </div>

          {!isLoading && !error && (
            <span className="destinations-page-result-count">
              {totalDestinations}{" "}
              {totalDestinations === 1 ? "destination" : "destinations"} found
            </span>
          )}
        </div>

        {/* Search bar */}

        {/* Search bar */}
        {!isLoading && !error && (
          <div className="destinations-search-section">
            <div className="destinations-search">
              <form
                className="destinations-search-form"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setCurrentPage(1);
                }}
              >
                <span
                  className="destinations-search-icon"
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <div className="destinations-search-field">
                  <label htmlFor="destinations-search-input">
                    FIND YOUR EXPERIENCE
                  </label>

                  <input
                    id="destinations-search-input"
                    type="search"
                    placeholder="Search destinations, countries..."
                    autoComplete="off"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                    }}
                  />
                </div>

                {query && (
                  <button
                    type="button"
                    className="destinations-search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}

                <button
                  type="submit"
                  className="destinations-search-submit"
                >
                  Search <span aria-hidden="true">→</span>
                </button>
              </form>
            </div>

            {query.trim() !== "" && (
              <p className="destinations-search-result-hint">
                {totalDestinations} matching{" "}
                {totalDestinations === 1 ? "destination" : "destinations"}
              </p>
            )}
          </div>
        )}

        {/* Category filters */}
        {!isLoading && !error && (destinations?.length ?? 0) > 0 && (
          <div
            className="destinations-category-bar"
            role="group"
            aria-label="Filter destinations by category"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`destinations-category-button ${selectedCategory === category ? "active" : ""
                  }`}
                onClick={() => selectCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category === "All" ? "All Destinations" : category}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="destinations-page-state" role="status">
            <span className="destinations-page-loader" />
            <h3>Finding your next adventure...</h3>
            <p>Our destinations are on their way.</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            className="destinations-page-state destinations-page-error"
            role="alert"
          >
            <h3>We couldn't load the destinations.</h3>
            <p>Please check your connection and try again.</p>

            <button
              type="button"
              className="destinations-page-retry"
              onClick={() => mutate()}
            >
              Try again
            </button>
          </div>
        )}

        {/* No destinations */}
        {!isLoading && !error && (destinations?.length ?? 0) === 0 && (
          <div className="destinations-page-state">
            <h3>No destinations available just yet.</h3>
            <p>Check back soon for new adventures.</p>
          </div>
        )}

        {/* No search or category matches */}
        {!isLoading &&
          !error &&
          (destinations?.length ?? 0) > 0 &&
          totalDestinations === 0 && (
            <div className="destinations-page-state">
              <h3>No matching destinations found.</h3>
              <p>
                Try another search or choose a different category.
              </p>

              <button
                type="button"
                className="destinations-page-retry"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
              >
                Clear filters
              </button>
            </div>
          )}

        {/* Destination cards and pagination */}
        {!isLoading && !error && currentDestinations.length > 0 && (
          <>
            <div className="destinations-page-grid" aria-live="polite">
              {currentDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="destinations-pagination"
                aria-label="Destinations pagination"
              >
                <button
                  type="button"
                  className="destinations-pagination-button destinations-pagination-prev"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Go to previous page"
                >
                  <span aria-hidden="true">←</span>
                  <span>Previous</span>
                </button>

                <div className="destinations-pagination-pages">
                  {pageNumbers.map((page, index) =>
                    page === "..." ? (
                      <span
                        className="destinations-pagination-ellipsis"
                        key={`ellipsis-${index}`}
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        type="button"
                        key={page}
                        className={`destinations-pagination-number ${currentPage === page ? "active" : ""
                          }`}
                        onClick={() => goToPage(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="destinations-pagination-button destinations-pagination-next"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Go to next page"
                >
                  <span>Next</span>
                  <span aria-hidden="true">→</span>
                </button>
              </nav>
            )}

            {totalPages > 1 && (
              <p className="destinations-pagination-summary">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
