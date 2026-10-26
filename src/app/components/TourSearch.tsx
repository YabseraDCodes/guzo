
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./TourSearch.css";

type Tour = {
    id: number;
    name: string;
    description: string;
    image_urls: string[];
    location: string;
    countries?: {
        name: string;
    } | null;
    slug: string;
};

export default function TourSearch() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchTours() {
            try {
                const response = await fetch("/api/tours");

                if (!response.ok) {
                    throw new Error("Failed to fetch tours");
                }

                const data = await response.json();

                const items = Array.isArray(data)
                    ? data
                    : data.tours ?? data.data ?? [];

                setTours(items);
            } catch (err) {
                console.error("Tour search error:", err);
                setError("Could not load tours.");
            } finally {
                setLoading(false);
            }
        }

        fetchTours();
    }, []);

    const filteredTours = tours
        .filter((tour) => {
            const searchText = query.trim().toLowerCase();

            if (!searchText) return false;

            const name = tour.name ?? "";
            const country = tour.countries?.name ?? "";

            return `${name} ${country}`
                .toLowerCase()
                .includes(searchText);
        })
        .slice(0, 6);

    return (
        <form
            className="search-panel"
            action="/tours"
            method="get"
        >
            <div className="tour-search-wrap">
                <label className="search-field">
                    <span className="search-icon" aria-hidden="true">
                        ⌕
                    </span>

                    <span className="search-input-wrap">
                        <span className="field-label">WHERE TO?</span>

                        <input
                            type="search"
                            name="search"
                            placeholder="Search tours"
                            aria-label="Search tours"
                            autoComplete="off"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                    </span>
                </label>

                {isOpen && query.trim() !== "" && (
                    <div className="tour-dropdown">
                        {loading ? (
                            <p className="tour-search-message">
                                Loading tours...
                            </p>
                        ) : error ? (
                            <p className="tour-search-message">
                                {error}
                            </p>
                        ) : filteredTours.length > 0 ? (
                            filteredTours.map((tour) => (
                                <Link
                                    key={tour.id}
                                    href={`/tours/${tour.slug}`}
                                    className="tour-option"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="tour-option-image">
                                        {tour.image_urls?.[0] ? (
                                            <img
                                                src={tour.image_urls[0]}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="tour-no-image">
                                                ✦
                                            </div>
                                        )}
                                    </div>

                                    <div className="tour-option-info">
                                        <span className="tour-option-name">
                                            {tour.name}
                                        </span>

                                        <span className="tour-option-country">
                                            {tour.countries?.name ??
                                                tour.location ??
                                                "Explore tours"}
                                        </span>
                                    </div>

                                    <span
                                        className="tour-option-arrow"
                                        aria-hidden="true"
                                    >
                                        ↗
                                    </span>
                                </Link>
                            ))
                        ) : (
                            <p className="tour-search-message">
                                No tours found for "{query}".
                            </p>
                        )}
                    </div>
                )}
            </div>

            <button type="submit" className="search-button">
                Explore <span aria-hidden="true">→</span>
            </button>
        </form>
    );
}
