
"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import DestinationCard, {
    type Destination,
} from "@/app/components/DestinationCard";

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDestinations() {
            try {
                const data: Destination[] = await fetcher(
                    "/api/destinations"
                );

                setDestinations(data);
            } catch (error) {
                console.error("Failed to fetch destinations:", error);
                setDestinations([]);
            } finally {
                setLoading(false);
            }
        }

        getDestinations();
    }, []);

    if (loading) {
        return (
            <main className="destination-page">
                <p className="destination-message">
                    Loading destinations...
                </p>
            </main>
        );
    }

    return (
        <main className="destination-page">
            <section className="destination-hero">
                <p className="eyebrow">EXPLORE AFRICA</p>

                <h1>
                    Discover <em>Destinations.</em>
                </h1>

                <p>
                    Explore remarkable places and find your next adventure.
                </p>
            </section>

            <section className="destination-list">
                {destinations.length === 0 ? (
                    <p className="destination-message">
                        No destinations found.
                    </p>
                ) : (
                    <div className="destination-grid">
                        {destinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
