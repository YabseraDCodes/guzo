
import Link from "next/link";
import "./DestinationCard.css"
import type { Destination } from "@/types/destination";

type DestinationCardProps = {
    destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
    const image = destination.image_urls?.[0];

    const destinationSlug = destination.slug
    ?.trim()
    .toLowerCase()
    .replace(/\s+/g, "-") || String(destination.id);

    return (
        <article className="destination-card">
            <Link
                href={`/destinations/${destinationSlug}`}
                className="destination-card-link"
                aria-label={`Explore ${destination.name}`}
            >
                <div className="destination-card-image">
                    {image ? (
                        <img
                            src={image}
                            alt={destination.name}
                            loading="lazy"
                        />
                    ) : (
                        <div className="destination-card-image-placeholder">
                            <span aria-hidden="true">✦</span>
                            <span>Discover somewhere new</span>
                        </div>
                    )}

                    <div className="destination-card-image-overlay" />

                    <span className="destination-card-explore">
                        Explore destination <span aria-hidden="true">↗</span>
                    </span>
                </div>

                <div className="destination-card-body">
                    <div className="destination-card-location">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="12"
                                cy="10"
                                r="2.5"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            />
                        </svg>

                        <span>{destination.location}</span>
                    </div>

                    <h3>{destination.name}</h3>

                    <p>{destination.description}</p>

                    <div className="destination-card-footer">
                        <span>Discover this experience</span>
                        <span className="destination-card-arrow" aria-hidden="true">
                            →
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
