"use client";
import {fetcher} from "@/lib/fetcher"
import useSWR from "swr";
import { Pencil, Trash2 ,Plus} from "lucide-react";
import "./TourPlaces.css";
import Link from "next/link";
type Package = {
  id: number;
  name: string;
  description: string;
  image_urls: string[];
  location: string;
  countries: {
    name: string;
  } | null;
};


export default function PackagesPage() {
  const {
    data: packages,
    error,
    isLoading,
  } = useSWR<Package[]>("/api/tours", fetcher);

  if (isLoading) {
    return <p className="packages-message">Loading packages...</p>;
  }

  if (error) {
    return <p className="packages-message">Failed to load packages.</p>;
  }

  if (!packages || packages.length === 0) {
    return <p className="packages-message">No packages found.</p>;
  }

  return (
    <section className="packages-page">
      <div className="agents-heading">
       <div>
         <h1>Tour Packages</h1>
         <p>Manage your available tour packages.</p>
       </div>
     
       <div className="agents-heading-actions">
         <span className="agents-count">
           {packages.length} {packages.length === 1 ? "Agent" : "Agents"}
         </span>
     
         <Link href="/../Admin/forms/tourForm" className="add-agent-button">
           <Plus size={16} />
           Add agency
         </Link>
       </div>
     </div>
     
 
      <div className="packages-grid">
        {packages.map((item) => (
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