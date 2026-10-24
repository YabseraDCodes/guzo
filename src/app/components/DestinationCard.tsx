import "./DestinationCard.css";

export type Destination = {
  id: number;
  name: string;
  short_description: string;
  cover_image_url: string;
  region: string;
  is_featured: boolean;
  tours_count: number;
};

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <article className="destination-card">
      <div className="destination-card-image">
        <img
          src={destination.cover_image_url}
          alt={destination.name}
          loading="lazy"
        />

        <div className="destination-card-image-overlay" />

        {destination.is_featured && (
          <span className="destination-card-featured">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            Featured
          </span>
        )}

        <span className="destination-card-region">
          {destination.region}
        </span>
      </div>

      <div className="destination-card-body">
        <div className="destination-card-heading">
          <h3>{destination.name}</h3>

          <span
            className="destination-card-accent"
            aria-hidden="true"
          />
        </div>

        <p className="destination-card-description">
          {destination.short_description}
        </p>

        <div className="destination-card-footer">
          <div className="destination-card-tour-info">
            <span
              className="destination-card-tour-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9.5 20v-6h5v6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span>
              <strong>{destination.tours_count}</strong>{" "}
              {destination.tours_count === 1 ? "tour" : "tours"}
              {" "}available
            </span>
          </div>

          <span
            className="destination-card-arrow"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}