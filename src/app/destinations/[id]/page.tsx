
"use client";

import { useEffect, useState } from "react";

const destinations = [
  {
    name: "Lalibela",
    region: "Amhara Region",
    description:
      "Discover extraordinary rock-hewn churches carved from solid rock and explore centuries of Ethiopian history.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/df968d0f7_generated_02e14c4b.png",
    highlights: ["Rock-hewn churches", "Local culture", "Historic architecture"],
  },
  {
    name: "Simien Mountains",
    region: "Northern Ethiopia",
    description:
      "Explore dramatic mountain peaks, scenic hiking trails, and remarkable wildlife in Ethiopia's highlands.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/3438e679c_generated_59eeb2e0.png",
    highlights: ["Mountain hiking", "Scenic viewpoints", "Wildlife"],
  },
  {
    name: "Danakil Depression",
    region: "Afar Region",
    description:
      "Discover a striking landscape of colorful mineral formations, salt flats, and volcanic scenery.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/9b1e18182_generated_fae7178a.png",
    highlights: ["Colorful landscapes", "Salt flats", "Volcanic scenery"],
  },
  {
    name: "Axum",
    region: "Tigray Region",
    description:
      "Explore ancient obelisks, archaeological treasures, and the history of one of Ethiopia's great ancient kingdoms.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ed3d80b4e_generated_be15730c.png",
    highlights: ["Ancient obelisks", "Archaeological sites", "Historic heritage"],
  },
];

export default function DestinationDetailPage() {
  const [id, setId] = useState("");

  useEffect(() => {
    const parts = window.location.pathname.split("/");
    const currentId = parts[parts.length - 1] || "";
    setId(decodeURIComponent(currentId).toLowerCase());
  }, []);

  const destination = destinations.find((item) => {
    const slug = item.name.toLowerCase().replace(/\s+/g, "-");

    return (
      slug === id ||
      (id === "danakil" && item.name === "Danakil Depression")
    );
  });

  if (!id) {
    return <main className="detail-page">Loading destination...</main>;
  }

  if (!destination) {
    return (
      <main className="detail-page">
        <h1>Destination not found</h1>
        <a href="/destinations">Explore all destinations</a>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <a className="detail-back" href="/destinations">
        ← All destinations
      </a>

      <section className="detail-hero">
        <img src={destination.image} alt={destination.name} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <p>{destination.region}</p>
          <h1>{destination.name}</h1>
          <span>Discover Ethiopia with Guzo</span>
        </div>
      </section>

      <section className="detail-information">
        <div className="detail-description">
          <p className="detail-eyebrow">DISCOVER THE DESTINATION</p>
          <h2>Your next adventure <em>starts here.</em></h2>
          <p>{destination.description}</p>
        </div>

        <div className="detail-highlights">
          <h2>Highlights</h2>
          {destination.highlights.map((highlight) => (
            <p key={highlight}>✳ {highlight}</p>
          ))}
          <a className="detail-button" href="/tours">
            Explore tours →
          </a>
        </div>
      </section>
    </main>
  );
}
