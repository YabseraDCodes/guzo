"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetcher } from "@/lib/fetcher";
import AgentCard from "@/app/components/AgentCard";
import "./TourDetailClient.css";

type Tour = {
    id: number;
    slug: string;
    name: string;
    location: string;
    description: string;
    image_urls: string[];
};

type Package = {
    price: number;
    duration: string;
    hotel: {
        ranking: number;
        description: string;
        image?: string;
    };
    includes: string[];
    itinerary: {
        day: string;
        title: string;
        description: string;
    }[];
};

type Agent = {
    id: number;
    destination_id: number;
    name: string;
    description: string;
    rating: number;
    packages: {
        golden: Package;
        silver: Package;
        economy: Package;
    };
    contact_info: string;
};

export default function TourDetailClient({
    slug,
}: {
    slug: string;
}) {
    const [tour, setTour] = useState<Tour | null>(null);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            setLoading(true);

            try {
                const tours: Tour[] = await fetcher("/api/tours");
                const allAgents: Agent[] = await fetcher("/api/agents");

                const selectedTour = tours.find(
                    (item) => item.name === slug
                );

                const selectedAgents = selectedTour
                    ? allAgents.filter(
                        (agent) =>
                            Number(agent.destination_id) ===
                            Number(selectedTour.id)
                    )
                    : [];

                setTour(selectedTour ?? null);
                setAgents(selectedAgents);
            } catch (error) {
                console.error("Failed to fetch tour details:", error);
                setTour(null);
                setAgents([]);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [slug]);

    if (loading) {
        return (
            <main className="tour-detail">
                <p className="tour-message">Loading tour details...</p>
            </main>
        );
    }

    if (!tour) {
        return (
            <main className="tour-detail">
                <p className="tour-message">Tour not found.</p>
            </main>
        );
    }

    return (
        <main className="tour-detail">
            <section className="tour-overview">
                <div className="tour-overview-content">
                    <p className="tour-eyebrow">DISCOVER YOUR NEXT DESTINATION</p>

                    <h1>{tour.name}</h1>

                    <p className="tour-location">
                        <span aria-hidden="true">📍</span> {tour.location}
                    </p>

                    <p className="tour-description">
                        {tour.description}
                    </p>
                </div>

                {tour.image_urls?.length > 0 && (
                    <div className="tour-gallery">
                        {tour.image_urls.map((image, index) => (
                            <div
                                className={`tour-gallery-item tour-gallery-item-${index + 1}`}
                                key={`${image}-${index}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${tour.name} - Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                                    className="tour-image"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="tour-agents-section">
                <div className="tour-section-heading">
                    <p className="tour-eyebrow">PLAN YOUR EXPERIENCE</p>

                    <h2>Available Tour Agents</h2>

                    <p>
                        Explore packages and find the right experience
                        for your journey.
                    </p>
                </div>

                {agents.length === 0 ? (
                    <p className="tour-message">
                        No agents found for this tour.
                    </p>
                ) : (
                    <div className="tour-agents-list">
                        {agents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}