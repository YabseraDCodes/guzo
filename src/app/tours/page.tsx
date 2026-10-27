
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import TourCard, { type Tour } from "../components/TourCard";
import "./TourPage.css";

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

type SearchableTour = Tour & {
  location?: string | null;
  description?: string | null;
  slug?: string | null;
  image_urls?: string[] | null;
  countries?: { name: string } | null;
};

export default function ToursPage() {
  const {
    data: tours,
    error,
    isLoading,
    mutate,
  } = useSWR<SearchableTour[]>("/api/tours", fetcher);

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


  // Filter tours by category and search query.
  const filteredTours = useMemo(() => {
    if (!tours) return [];
    const searchText = debouncedQuery.trim().toLowerCase();

    return tours.filter((tour) => {
      const matchesCategory =
        selectedCategory === "All" ||
        tour.category?.toLowerCase() ===
        selectedCategory.toLowerCase();

      const searchableText = [
        tour.name,
        tour.category,
        tour.location,
        tour.countries?.name,
        tour.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchText || searchableText.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [tours, selectedCategory, debouncedQuery]);



  const totalTours = filteredTours.length;
  const totalPages = Math.ceil(totalTours / PAGE_SIZE);

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
  const currentTours = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredTours.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  }, [filteredTours, currentPage]);

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
      .getElementById("tours-list")
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
    setIsSearchOpen(false);
  }

  return (
    <main className="tours-page">
      {/* Hero */}
      <section className="tours-page-hero">
        <div className="tours-page-hero-content">
          <span className="tours-page-eyebrow">
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
            <div className="tours-page-total">
              <strong>{tours?.length ?? 0}</strong>
              <span>
                {(tours?.length ?? 0) === 1
                  ? "tour"
                  : "tours"}{" "}
                to explore
              </span>
            </div>
          )}
        </div>

        <div
          className="tours-page-hero-decoration"
          aria-hidden="true"
        >
          <span className="tours-hero-circle" />
          <span className="tours-hero-dot" />
        </div>
      </section>

      {/* Tours listing */}
      <section
        className="tours-page-content"
        id="tours-list"
        aria-labelledby="tours-page-heading"
      >
        <div className="tours-page-section-heading">
          <div>
            <span className="tours-page-eyebrow">
              CURATED FOR THE CURIOUS
            </span>

            <h2 id="tours-page-heading">Explore our tours</h2>

            <p>
              Find your next unforgettable experience.
            </p>
          </div>

          {!isLoading && !error && (
            <span className="tours-page-result-count">
              {totalTours}{" "}
              {totalTours === 1 ? "tour" : "tours"} found
            </span>
          )}
        </div>

        {/* Search bar */}

        {/* Search bar */}
        {!isLoading && !error && (
          <div className="tours-search-section">
            <div className="tours-search">
              <form
                className="tours-search-form"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setCurrentPage(1);
                }}
              >
                <span
                  className="tours-search-icon"
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <div className="tours-search-field">
                  <label htmlFor="tours-search-input">
                    FIND YOUR EXPERIENCE
                  </label>

                  <input
                    id="tours-search-input"
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
                    className="tours-search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}

                <button
                  type="submit"
                  className="tours-search-submit"
                >
                  Search <span aria-hidden="true">→</span>
                </button>
              </form>
            </div>

            {query.trim() !== "" && (
              <p className="tours-search-result-hint">
                {totalTours} matching{" "}
                {totalTours === 1 ? "tour" : "tours"}
              </p>
            )}
          </div>
        )}

        {/* Category filters */}
        {!isLoading && !error && (tours?.length ?? 0) > 0 && (
          <div
            className="tours-category-bar"
            role="group"
            aria-label="Filter tours by category"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`tours-category-button ${selectedCategory === category ? "active" : ""
                  }`}
                onClick={() => selectCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category === "All" ? "All Tours" : category}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="tours-page-state" role="status">
            <span className="tours-page-loader" />
            <h3>Finding your next adventure...</h3>
            <p>Our tours are on their way.</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            className="tours-page-state tours-page-error"
            role="alert"
          >
            <h3>We couldn't load the tours.</h3>
            <p>Please check your connection and try again.</p>

            <button
              type="button"
              className="tours-page-retry"
              onClick={() => mutate()}
            >
              Try again
            </button>
          </div>
        )}

        {/* No tours */}
        {!isLoading && !error && (tours?.length ?? 0) === 0 && (
          <div className="tours-page-state">
            <h3>No tours available just yet.</h3>
            <p>Check back soon for new adventures.</p>
          </div>
        )}

        {/* No search or category matches */}
        {!isLoading &&
          !error &&
          (tours?.length ?? 0) > 0 &&
          totalTours === 0 && (
            <div className="tours-page-state">
              <h3>No matching tours found.</h3>
              <p>
                Try another search or choose a different category.
              </p>

              <button
                type="button"
                className="tours-page-retry"
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

        {/* Tour cards and pagination */}
        {!isLoading && !error && currentTours.length > 0 && (
          <>
            <div className="tours-page-grid" aria-live="polite">
              {currentTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="tours-pagination"
                aria-label="Tours pagination"
              >
                <button
                  type="button"
                  className="tours-pagination-button tours-pagination-prev"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Go to previous page"
                >
                  <span aria-hidden="true">←</span>
                  <span>Previous</span>
                </button>

                <div className="tours-pagination-pages">
                  {pageNumbers.map((page, index) =>
                    page === "..." ? (
                      <span
                        className="tours-pagination-ellipsis"
                        key={`ellipsis-${index}`}
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        type="button"
                        key={page}
                        className={`tours-pagination-number ${currentPage === page ? "active" : ""
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
                  className="tours-pagination-button tours-pagination-next"
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
              <p className="tours-pagination-summary">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}