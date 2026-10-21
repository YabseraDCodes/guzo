import Link from "next/link";
import "./TourCard.css";

export type Tour = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  description: string;
};

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <article className="tour-card">
      <Link
        href={`/tours/${tour.slug}`}
        className="tour-card-image-link"
      >
        <img
          src={tour.image}
          alt={tour.title}
          className="tour-card-image"
        />
      </Link>

      <div className="tour-card-content">
        <p className="tour-card-location">
          📍 {tour.destination}
        </p>

        <h3 className="tour-card-title">
          {tour.title}
        </h3>

        <p className="tour-card-description">
          {tour.description}
        </p>

        <div className="tour-card-meta">
          <span>🕒 {tour.duration}</span>

          <p>
            From{" "}
            <strong>
              ${tour.price.toLocaleString("en-US")}
            </strong>
          </p>
        </div>

        <Link
          href={`/tours/${tour.slug}`}
          className="tour-card-button"
        >
          View Tour →
        </Link>
      </div>
    </article>
  );
}