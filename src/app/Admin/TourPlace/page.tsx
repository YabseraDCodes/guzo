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

  const packageList = packages ?? [];

  return (
    <section className="packages-page">
      {/* heading and Add button always show, even when the list is empty */}
      <div className="agents-heading">
        <div>
          <h1>Destinations</h1>
          <p>Manage your available tour destinations.</p>
        </div>

        <div className="agents-heading-actions">
          <span className="agents-count">
            {packageList.length}{" "}
            {packageList.length === 1 ? "Destination" : "Destinations"}
          </span>

          <Link href="/../Admin/forms/tourForm" className="add-agent-button">
            <Plus size={16} />
            Add Destination
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p className="packages-message">Loading destinations...</p>
      ) : error ? (
        <p className="packages-message">Failed to load destinations.</p>
      ) : packageList.length === 0 ? (
        <p className="packages-message">
          No destinations yet. Use “Add Destination” to create the first one.
        </p>
      ) : (
        <div className="packages-grid">
          {packageList.map((item) => (
            <article className="package-card" key={item.id}>
              <div className="package-image-wrapper">
                <img
                  className="package-image"
                  src={item.image_urls?.[1] || item.image_urls?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                />
              </div>

              <div className="package-content">
                <h2>{item.name}</h2>

                <p className="package-description">{item.description}</p>

                <div className="package-location">
                  <span>{item.location}</span>
                  <span>{item.countries?.name ?? "Unknown country"}</span>
                </div>

                <div className="package-actions">
                  <button type="button" className="edit-package-button">
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
      )}
    </section>
  );
}
