"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetcher } from "@/lib/fetcher";
import TourCard, { type TourListing } from "@/app/components/TourCard";
import type { Tour } from "@/types/destination";
import "./DestinationDetailClient.css";

export default function DestinationDetailClient({ slug }: { slug: string }) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadTours() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetcher("/api/tours");
        if (!Array.isArray(response)) throw new Error("Unexpected tours response");
        const matching = (response as Tour[]).filter((tour) => tour.destination?.slug === slug);
        if (!cancelled) setTours(matching);
      } catch (fetchError) {
        console.error("Failed to fetch destination tours:", fetchError);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadTours();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return <main className="destination-detail"><div className="destination-loading" role="status"><span className="destination-spinner" />Finding experiences for you…</div></main>;
  if (error) return <main className="destination-detail"><div className="destination-message" role="alert"><h1>We couldn’t load these experiences</h1><p>Please refresh the page to try again.</p></div></main>;
  if (!tours.length) return <main className="destination-detail"><div className="destination-message"><h1>Destination not found</h1><p>We couldn’t find a destination with that address.</p></div></main>;

  const destination = tours[0].destination;
  const images = destination.image_urls?.filter(Boolean) ?? [];

  return (
    <main className="destination-detail">
      <section className="destination-overview">
        <div className="destination-overview-content">
          <p className="destination-eyebrow">A PLACE TO REMEMBER</p>
          <h1>{destination.name}</h1>
          <p className="destination-location"><span aria-hidden="true">⌖</span> {destination.location || destination.countries?.name}</p>
          {destination.description && <p className="destination-description">{destination.description}</p>}
          <div className="destination-overview-meta"><span>{tours.length} {tours.length === 1 ? "curated experience" : "curated experiences"}</span>{destination.category && <span>{destination.category}</span>}</div>
        </div>
        {images.length > 0 && <div className="destination-gallery">
          {images.slice(0, 3).map((image, index) => <div className={`destination-gallery-item destination-gallery-item-${index + 1}`} key={`${image}-${index}`}>
            <Image src={image} alt={`${destination.name} landscape ${index + 1}`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" className="destination-image" priority={index === 0} />
          </div>)}
        </div>}
      </section>

      <section className="destination-tours-section" aria-labelledby="destination-tours-title">
        <div className="destination-section-heading">
          <div><p className="destination-eyebrow">FIND YOUR WAY THERE</p><h2 id="destination-tours-title">Experiences in {destination.name}</h2></div>
          <p>Compare thoughtfully planned tours, then open a trip to explore packages and day-by-day details.</p>
        </div>
        <div className="destination-tours-grid">
          {tours.map((tour) => <TourCard key={tour.id} tour={tour as TourListing} />)}
        </div>
      </section>
    </main>
  );
}
