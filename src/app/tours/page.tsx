"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import TourCard, { type Tour }  from "../components/TourCard";
import "./TourPage.css";

const PAGE_SIZE = 9;

export default function ToursPage() {
  const {
    data: tours,
    error,
    isLoading,
    mutate,
  } = useSWR<Tour[]>("/api/tours", fetcher);

  const [currentPage, setCurrentPage] = useState(1);

  const totalTours = tours?.length ?? 0;
  const totalPages = Math.ceil(totalTours / PAGE_SIZE);

  // Keep the current page valid if the API data changes.
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentTours = useMemo(() => {
    if (!tours) return [];

    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return tours.slice(startIndex, startIndex + PAGE_SIZE);
  }, [tours, currentPage]);

  // Generate compact page numbers with ellipses.
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    // Bring the listing back into view after changing pages.
    document
      .getElementById("tours-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="tours-page">
      {/* Page introduction */}
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
              <strong>{totalTours}</strong>
              <span>
                {totalTours === 1 ? "tour" : "tours"} to explore
              </span>
            </div>
          )}
        </div>

        <div className="tours-page-hero-decoration" aria-hidden="true">
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

          {!isLoading && !error && totalTours > 0 && (
            <span className="tours-page-result-count">
              Showing{" "}
              {Math.min((currentPage - 1) * PAGE_SIZE + 1, totalTours)}
              {"–"}
              {Math.min(currentPage * PAGE_SIZE, totalTours)}
              {" "}of {totalTours}
            </span>
          )}
        </div>

        {isLoading && (
          <div className="tours-page-state" role="status">
            <span className="tours-page-loader" />
            <h3>Finding your next adventure...</h3>
            <p>Our tours are on their way.</p>
          </div>
        )}

        {error && (
          <div className="tours-page-state tours-page-error" role="alert">
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

        {!isLoading && !error && totalTours === 0 && (
          <div className="tours-page-state">
            <h3>No tours available just yet.</h3>
            <p>Check back soon for new adventures.</p>
          </div>
        )}

        {!isLoading && !error && currentTours.length > 0 && (
          <>
            <div className="tours-page-grid" aria-live="polite">
              {currentTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Pagination */}
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
                        className={`tours-pagination-number ${
                          currentPage === page ? "active" : ""
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
