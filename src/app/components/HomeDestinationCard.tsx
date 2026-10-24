
import type { Destination } from "./DestinationCard";

interface HomeDestinationCardProps {
  destination: Destination;
}

export default function HomeDestinationCard({
  destination,
}: HomeDestinationCardProps) {
  return (
    <a
      className="destination-card"
      href={destination.slug}
      key={destination.number}
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="destination-image"
      />

      <div className="card-shade" />

      <span className="card-number">
        {destination.number}
      </span>

      <div className="card-content">
        <span className="card-region">
          {destination.region}
        </span>

        <h3>{destination.name}</h3>

        <p>{destination.description}</p>

        <span className="card-link" aria-hidden="true">
          ↗
        </span>
      </div>
    </a>
  );
}
