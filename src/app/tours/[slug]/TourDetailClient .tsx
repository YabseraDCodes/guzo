"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetcher } from "@/lib/fetcher";
import AgentCard from "@/app/components/AgentCard";
import "./TourDetailClient.css";

type TourPackage = {
    id: number;
    price: number;
    duration: string;
    hotel: {
        name?: string;
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

type Agency = {
    id: number;
    name: string;
    description: string | null;
    rating: number | null;
    contact_info: string | null;
    packages: Record<string, TourPackage>;
};

type Tour = {
    id: number;
    slug: string;
    name: string;
    location: string;
    description: string;
    image_urls: string[];
    agency: Agency | null;
};

export default function TourDetailClient({ slug }: { slug: string }) {
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function getTour() {
            setLoading(true);
            try {
                const tours: Tour[] = await fetcher("/api/tours");
                const selectedTour = tours.find((item) => item.slug === slug);
                if (!cancelled) setTour(selectedTour ?? null);
            } catch (error) {
                console.error("Failed to fetch tour details:", error);
                if (!cancelled) setTour(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        } 

        getTour();
        return () => { cancelled = true; };
    }, [slug]);

    if (loading) {
        return <main className="tour-detail"><p className="tour-message">Loading tour details...</p></main>;
    }

    if (!tour) {
        return <main className="tour-detail"><p className="tour-message">Tour not found.</p></main>;
    }

    const agency = tour.agency;
    const hasPackages = agency && Object.keys(agency.packages).length > 0;

    return (
        <main className="tour-detail">
            <section className="tour-overview">
                <div className="tour-overview-content">
                    <p className="tour-eyebrow">DISCOVER YOUR NEXT EXPERIENCE</p>
                    <h1>{tour.name}</h1>
                    <p className="tour-location"><span aria-hidden="true">📍</span> {tour.location}</p>
                    <p className="tour-description">{tour.description}</p>
                </div>

                {tour.image_urls?.length > 0 && (
                    <div className="tour-gallery">
                        {tour.image_urls.map((image, index) => (
                            <div className={`tour-gallery-item tour-gallery-item-${index + 1}`} key={`${image}-${index}`}>
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
                    <h2>Offered by {agency?.name ?? "Our Tour Partner"}</h2>
                    <p>Explore the available packages for this experience.</p>
                </div>

                {!agency ? (
                    <p className="tour-message">No agency is currently assigned to this tour.</p>
                ) : !hasPackages ? (
                    <p className="tour-message">This agency has not added any active packages for this tour yet.</p>
                ) : (
                    <div className="tour-agents-list">
                        <AgentCard
                            agent={{
                                ...agency,
                                destination_id: tour.id,
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
