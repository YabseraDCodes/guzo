
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Destination } from "@/types/destination";
import "./DestinationSearch.css";

export default function DestinationSearch() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const response = await fetch("/api/destination-catalog");

                if (!response.ok) {
                    throw new Error("Failed to fetch destinations");
                }

                const data = await response.json();

                const items = Array.isArray(data)
                    ? data
                    : data.destinations ?? data.data ?? [];

                setDestinations(items);
            } catch (err) {
                console.error("Destination search error:", err);
                setError("Could not load destinations.");
            } finally {
                setLoading(false);
            }
        }

        fetchDestinations();
    }, []);

    const filteredDestinations = destinations
        .filter((destination) => {
            const searchText = query.trim().toLowerCase();

            if (!searchText) return false;

            const name = destination.name ?? "";
            const country = destination.countries?.name ?? "";

            return `${name} ${country}`
                .toLowerCase()
                .includes(searchText);
        })
        .slice(0, 6);

    return (
        <form
            className="search-panel"
            action="/destinations"
            method="get"
        >
            <div className="destination-search-wrap">
                <label className="search-field">
                    <span className="search-icon" aria-hidden="true">
                        ⌕
                    </span>

                    <span className="search-input-wrap">
                        <span className="field-label">WHERE TO?</span>

                        <input
                            type="search"
                            name="search"
                            placeholder="Search destinations"
                            aria-label="Search destinations"
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
                    <div className="destination-dropdown">
                        {loading ? (
                            <p className="destination-search-message">
                                Loading destinations...
                            </p>
                        ) : error ? (
                            <p className="destination-search-message">
                                {error}
                            </p>
                        ) : filteredDestinations.length > 0 ? (
                            filteredDestinations.map((destination) => (
                                <Link
                                    key={destination.id}
                                    href={`/destinations/${destination.slug}`}
                                    className="destination-option"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="destination-option-image">
                                        {destination.image_urls?.[0] ? (
                                            <img
                                                src={destination.image_urls[0]}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="destination-no-image">
                                                ✦
                                            </div>
                                        )}
                                    </div>

                                    <div className="destination-option-info">
                                        <span className="destination-option-name">
                                            {destination.name}
                                        </span>

                                        <span className="destination-option-country">
                                            {destination.countries?.name ??
                                                destination.location ??
                                                "Explore destinations"}
                                        </span>
                                    </div>

                                    <span
                                        className="destination-option-arrow"
                                        aria-hidden="true"
                                    >
                                        ↗
                                    </span>
                                </Link>
                            ))
                        ) : (
                            <p className="destination-search-message">
                                No destinations found for "{query}".
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
