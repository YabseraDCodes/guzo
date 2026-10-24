
import Image from "next/image";
import Link from "next/link";

export type Destination = {
    id: number;
    name: string;
    slug: string;
    region: string;
    short_description: string;
    cover_image_url: string;
    is_featured: boolean;
    tour_count?: number;
};

export default function DestinationCard({
    destination,
}: {
    destination: Destination;
}) {
    return (
        <article className="destination-card">
            <Link href={`/destinations/${destination.slug}`}>
                <div className="destination-card-image">
                    <Image
                        src={destination.cover_image_url}
                        alt={destination.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {destination.is_featured && (
                        <span className="destination-featured">
                            Featured
                        </span>
                    )}
                </div>

                <div className="destination-card-content">
                    <p className="destination-region">
                        {destination.region}
                    </p>

                    <h2>{destination.name}</h2>

                    <p>{destination.short_description}</p>

                    <div className="destination-card-footer">
                        <span>
                            {destination.tour_count ?? 0}{" "}
                            {(destination.tour_count ?? 0) === 1
                                ? "tour"
                                : "tours"}
                        </span>

                        <span>Explore destination ↗</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
