
import Link from "next/link";
import "./TourCard.css"

export type Tour = {
    id: number;
    country_id: number;
    name: string;
    description: string;
    image_urls: string[];
    location: string;
    slug: string;
};

type TourCardProps = {
    tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
    const image = tour.image_urls?.[0];

    const tourSlug = tour.slug
<<<<<<< HEAD
    ?.trim()
    .toLowerCase()
    .replace(/\s+/g, "-") || String(tour.id);
=======
        ?.trim()
        .toLowerCase()
        .replace(/\s+/g, "-") || String(tour.id);
>>>>>>> 4fa382c627387b15b4e004ee548b360c5cf5362a

    return (
        <article className="tour-card">
            <Link
                href={`/tours/${tourSlug}`}
                className="tour-card-link"
                aria-label={`Explore ${tour.name}`}
            >
                <div className="tour-card-image">
                    {image ? (
                        <img
                            src={image}
                            alt={tour.name}
                            loading="lazy"
                        />
                    ) : (
                        <div className="tour-card-image-placeholder">
                            <span aria-hidden="true">✦</span>
                            <span>Discover somewhere new</span>
                        </div>
                    )}

                    <div className="tour-card-image-overlay" />

                    <span className="tour-card-explore">
                        Explore tour <span aria-hidden="true">↗</span>
                    </span>
                </div>

                <div className="tour-card-body">
                    <div className="tour-card-location">
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

                        <span>{tour.location}</span>
                    </div>

                    <h3>{tour.name}</h3>

                    <p>{tour.description}</p>

                    <div className="tour-card-footer">
                        <span>Discover this experience</span>
                        <span className="tour-card-arrow" aria-hidden="true">
                            →
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
