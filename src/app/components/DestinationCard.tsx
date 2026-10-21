
import Link from "next/link";

type Destination = {
  slug: string;
  image: string;
  name: string;
  category?: string;
  region: string;
  description: string;
};

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <article className="destination-card" key={destination.slug}>
      <Link
        href={`/destinations/${destination.slug}`}
        className="destination-image-link"
      >
        <img
          src={destination.image}
          alt={destination.name}
        />
      </Link>

      <div className="destination-card-body">
        {destination.category && (
          <span className="destination-category">
            {destination.category}
          </span>
        )}

        <h3>{destination.name}</h3>

        <p className="destination-region">
          📍 {destination.region}
        </p>

        <p className="destination-description">
          {destination.description}
        </p>

        <Link
          href={`/destinations/${destination.slug}`}
          className="destination-view-link"
        >
          Explore destination →
        </Link>
      </div>
    </article>
  );
}
