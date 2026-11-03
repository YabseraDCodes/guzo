"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetcher } from "@/lib/fetcher";
import AgentCard from "@/app/components/AgentCard";
import type { Destination } from "@/types/destination";
import "./DestinationDetailClient.css";

export default function DestinationDetailClient({ slug }: { slug: string }) {
    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function getDestination() {
            setLoading(true);
            try {
                const destinations: Destination[] = await fetcher("/api/tours");
                const selectedDestination = destinations.find((item) => item.slug === slug);
                if (!cancelled) setDestination(selectedDestination ?? null);
            } catch (error) {
                console.error("Failed to fetch destination details:", error);
                if (!cancelled) setDestination(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        } 

        getDestination();
        return () => { cancelled = true; };
    }, [slug]);

    if (loading) {
        return <main className="destination-detail"><p className="destination-message">Loading destination details...</p></main>;
    }

    if (!destination) {
        return <main className="destination-detail"><p className="destination-message">Destination not found.</p></main>;
    }

    const agency = destination.agency;
    const hasPackages = agency && Object.keys(agency.packages).length > 0;

    return (
        <main className="destination-detail">
            <section className="destination-overview">
                <div className="destination-overview-content">
                    <p className="destination-eyebrow">DISCOVER YOUR NEXT EXPERIENCE</p>
                    <h1>{destination.name}</h1>
                    <p className="destination-location"><span aria-hidden="true">📍</span> {destination.location}</p>
                    <p className="destination-description">{destination.description}</p>
                </div>

                {destination.image_urls?.length > 0 && (
                    <div className="destination-gallery">
                        {destination.image_urls.map((image, index) => (
                            <div className={`destination-gallery-item destination-gallery-item-${index + 1}`} key={`${image}-${index}`}>
                                <Image
                                    src={image}
                                    alt={`${destination.name} - Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                                    className="destination-image"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="destination-agents-section">
                <div className="destination-section-heading">
                    <p className="destination-eyebrow">PLAN YOUR EXPERIENCE</p>
                    <h2>Offered by {agency?.name ?? "Our Local Travel Partner"}</h2>
                    <p>Explore the available packages for this experience.</p>
                </div>

                {!agency ? (
                    <p className="destination-message">No agency is currently assigned to this destination.</p>
                ) : !hasPackages ? (
                    <p className="destination-message">This agency has not added any active packages for this destination yet.</p>
                ) : (
                    <div className="destination-agents-list">
                        <AgentCard
                            agent={{
                                ...agency,
                                destination_id: destination.id,
                                description: agency.description ?? "",
                                rating: agency.rating ?? 0,
                                contact_info: agency.contact_info ?? "",
                            }}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}
