"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Agency, Destination, DestinationPackage } from "@/types/destination";
import "./TourCard.css";

export type TourListing = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string | null;
  image_urls: string[];
  location: string;
  destination: Destination;
  agency: Agency | null;
};

function durationLabel(packages: DestinationPackage[]) {
  const durations = [...new Set(packages.map((pkg) => pkg.duration).filter(Boolean))];
  if (durations.length === 0) return "Flexible duration";
  if (durations.length === 1) return durations[0];
  return `${durations.length} duration options`;
}

function lowestPrice(packages: DestinationPackage[]) {
  const prices = packages.map((pkg) => pkg.price).filter((price) => Number.isFinite(price) && price > 0);
  return prices.length ? Math.min(...prices) : null;
}

export default function TourCard({ tour }: { tour: TourListing }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const packages = Object.entries(tour.agency?.packages ?? {});
  const price = lowestPrice(packages.map(([, pkg]) => pkg));
  const cover = tour.image || tour.image_urls?.[0];

  return (
    <article className="tour-card">
      <div className="tour-card-media">
        {cover ? (
          <Image src={cover} alt={tour.name} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        ) : <div className="tour-card-placeholder" aria-hidden="true">✦</div>}
        <span className="tour-card-location">{tour.location || tour.destination?.name}</span>
      </div>
      <div className="tour-card-content">
        <div className="tour-card-heading">
          <div>
            <p className="tour-card-kicker">CURATED EXPERIENCE</p>
            <h3>{tour.name}</h3>
          </div>
          {tour.agency?.rating ? <span className="tour-card-rating">★ {Number(tour.agency.rating).toFixed(1)}</span> : null}
        </div>
        <p className="tour-card-description">{tour.description || "A memorable way to explore this destination."}</p>
        <div className="tour-card-facts">
          <span>◷ {durationLabel(packages.map(([, pkg]) => pkg))}</span>
          <span>{packages.length} {packages.length === 1 ? "package" : "packages"}</span>
        </div>
        <div className="tour-card-footer">
          <div className="tour-card-price">
            <small>{price === null ? "Pricing on request" : "From"}</small>
            {price !== null && <strong>${price.toLocaleString()}</strong>}
          </div>
          <button className="tour-card-link" type="button" onClick={() => {
            if (detailsRef.current) {
              detailsRef.current.open = true;
              detailsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }}>Explore tour <span aria-hidden="true">↗</span></button>
        </div>
      </div>

      <details className="tour-card-details" id={`tour-details-${tour.id}`} ref={detailsRef}>
        <summary>Tour details <span aria-hidden="true">＋</span></summary>
        <div className="tour-details-body">
          <section>
            <h4>Choose your package</h4>
            {packages.length ? <div className="tour-package-list">
              {packages.map(([name, pkg]) => <article className="tour-package-option" key={pkg.id}>
                <div className="tour-package-top"><h5>{name}</h5><strong>${pkg.price.toLocaleString()}</strong></div>
                <p>{pkg.duration || "Duration varies"}{pkg.hotel?.name ? ` · ${pkg.hotel.name}` : ""}</p>
                {pkg.hotel?.description && <p className="tour-package-hotel">{pkg.hotel.description}</p>}
                {pkg.includes.length > 0 && <ul>{pkg.includes.slice(0, 4).map((item, index) => <li key={`${pkg.id}-${index}`}>{item}</li>)}</ul>}
                {pkg.itinerary.length > 0 && <details className="tour-itinerary">
                  <summary>View {pkg.itinerary.length}-day itinerary</summary>
                  <ol>{pkg.itinerary.map((day, index) => <li key={`${pkg.id}-day-${index}`}>
                    <span>{day.day || `Day ${index + 1}`}</span><div><strong>{day.title}</strong>{day.description && <p>{day.description}</p>}</div>
                  </li>)}</ol>
                </details>}
                <Link className="tour-book-link" href={`/bookings?destinationId=${tour.destination.id}&agentId=${tour.agency?.id}&packageName=${encodeURIComponent(name)}`}>Book this package <span aria-hidden="true">→</span></Link>
              </article>)}
            </div> : <p className="tour-details-muted">Package details are coming soon.</p>}
          </section>
          {tour.agency && <aside className="tour-agency">
            <span className="tour-agency-mark" aria-hidden="true">{tour.agency.name.slice(0, 1).toUpperCase()}</span>
            <div><p className="tour-card-kicker">YOUR LOCAL OPERATOR</p><h4>{tour.agency.name}</h4>
              {tour.agency.description && <p>{tour.agency.description}</p>}
              {tour.agency.contact_info && <p className="tour-agency-contact">{tour.agency.contact_info}</p>}
            </div>
          </aside>}
        </div>
      </details>
    </article>
  );
}
