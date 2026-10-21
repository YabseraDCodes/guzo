import Link from "next/link";

export interface Tour {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  category: string;
  highlights: string[];
}

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <article className="tour-card">
      <div className="tour-card-image">
        <img src={tour.image} alt={tour.title} />

        <span className="tour-category">{tour.category}</span>
      </div>

      <div className="tour-card-content">
        <div className="tour-location">
          <span>⌖</span> {tour.location}
        </div>

        <h2>{tour.title}</h2>

        <p className="tour-description">{tour.description}</p>

        <div className="tour-highlights">
          {tour.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="tour-card-footer">
          <div className="tour-duration">
            <span>◷</span>
            <span>{tour.duration}</span>
          </div>

          <div className="tour-price">
            <span>From</span>
            <strong>
              {tour.price.toLocaleString("en-US")} ETB
            </strong>
            <small>per person</small>
          </div>
        </div>

        <Link href={`/tours/${tour.id}`} className="tour-details-button">
          Explore Tour <span>→</span>
        </Link>
      </div>
    </article>
  );
}