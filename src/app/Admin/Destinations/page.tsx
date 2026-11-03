"use client";
import {fetcher} from "@/lib/fetcher"
import useSWR from "swr";
import { Pencil, Trash2 ,Plus} from "lucide-react";
import "./destinations.css";
import Link from "next/link";
type DestinationSummary = {
  id: number;
  name: string;
  description: string;
  image_urls: string[];
  location: string;
  countries: {
    name: string;
  } | null;
};


export default function DestinationsPage() {
  const {
    data: destinations,
    error,
    isLoading,
  } = useSWR<DestinationSummary[]>("/api/destination-catalog", fetcher);

  if (isLoading) {
    return <p className="packages-message">Loading destinations...</p>;
  }

  if (error) {
    return <p className="packages-message">Failed to load destinations.</p>;
  }

  if (!destinations || destinations.length === 0) {
    return <p className="packages-message">No destinations found.</p>;
  }

  return (
    <section className="packages-page">
      <div className="agents-heading">
       <div>
         <h1>Destinations</h1>
         <p>Manage your available destinations.</p>
       </div>
     
       <div className="agents-heading-actions">
         <span className="agents-count">
           {destinations.length} {destinations.length === 1 ? "Destination" : "Destinations"}
         </span>
     
         <Link href="/Admin/forms/destinationForm" className="add-agent-button">
           <Plus size={16} />
           Add destination
         </Link>
       </div>
     </div>
     
 
      <div className="packages-grid">
        {destinations.map((item) => (
          <article className="package-card" key={item.id}>
            <div className="package-image-wrapper">
              <img
                className="package-image"
                src={item.image_urls?.[1] || "/placeholder.jpg"}
                alt={item.name}
              />
            </div>

            <div className="package-content">
              <h2>{item.name}</h2>

              <p className="package-description">
                {item.description}
              </p>

              <div className="package-location">
                <span>{item.location}</span>
                <span>
                  {item.countries?.name ?? "Unknown country"}
                </span>
              </div>

              <div className="package-actions">
                <button
                  type="button"
                  className="edit-package-button"
                >
                  <Pencil size={15} />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  className="delete-package-button"
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
