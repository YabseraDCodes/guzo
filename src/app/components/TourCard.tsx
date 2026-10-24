import Link from "next/link";
import "./TourCard.css";

export type Tour = {
  id: number | string;
  country_id: number | string;
  name: string;
  description: string;
  image_urls?: string[] | string | null;
  location?: string | null;
  slug?: string | null;
};

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  // Select the first image if image_urls contains multiple images.
  const image = Array.isArray(tour.image_urls)
    ? tour.image_urls[0]
    : tour.image_urls;

  // Use the slug when available; otherwise use the tour ID.
  const tourSlug =
    tour.slug?.trim().toLowerCase().replace(/\s+/g, "-") ||
    String(tour.id);

  return (
    <article className="tour-card">
      <Link
        href={`/tours/${encodeURIComponent(tourSlug)}`}
        className="tour-card__link"
      >
        <div className="tour-card__image-wrapper">
          {image ? (
            <img
              src={image}
              alt={tour.name}
              className="tour-card__image"
            />
          ) : (
            <div className="tour-card__image-placeholder">
              <span>Explore Ethiopia</span>
            </div>
          )}

          {tour.location && (
            <span className="tour-card__location">
              {tour.location}
            </span>
          )}
        </div>

        <div className="tour-card__content">
          <h3 className="tour-card__title">{tour.name}</h3>

          <p className="tour-card__description">
            {tour.description || "Discover the beauty of Ethiopia with GUZO."}
          </p>

          <span className="tour-card__button">
            Explore Tour <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}