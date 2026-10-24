import Image from "next/image";
import type { Destination } from "./DestinationCard";
import Link from "next/link";

interface HomeDestinationCardProps {
    destination: Destination;
}

export default function HomeDestinationCard({
    destination,
}: HomeDestinationCardProps) {
    return (
        <Link
            className="destination-card"
            href={`/destinations/${destination.slug}`}
        >
            <Image
                src={destination.cover_image_url}
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="destination-image"
                priority={false}
            />

            <div className="card-shade" />

            <span className="card-number">
                {destination.id}
            </span>

            <div className="card-content">
                <span className="card-region">
                    {destination.region}
                </span>

                <h3>{destination.name}</h3>

                <p>{destination.short_description}</p>

                <span className="card-link" aria-hidden="true">
                    ↗
                </span>
            </div>
        </Link>
    );
}