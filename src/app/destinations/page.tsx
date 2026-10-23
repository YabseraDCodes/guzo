
"use client";

import { useState } from "react";

const destinations = [
  {
    name: "Lalibela",
    region: "AMHARA REGION",
    description:
      "Discover extraordinary rock-hewn churches and centuries of history.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/df968d0f7_generated_02e14c4b.png",
    type: "Culture",
  },
  {
    name: "Simien Mountains",
    region: "NORTHERN ETHIOPIA",
    description:
      "Explore dramatic peaks, scenic trails, and incredible wildlife.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/3438e679c_generated_59eeb2e0.png",
    type: "Nature",
  },
  {
    name: "Danakil Depression",
    region: "AFAR REGION",
    description:
      "Experience colorful landscapes and unforgettable adventures.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/9b1e18182_generated_fae7178a.png",
    type: "Adventure",
  },
  {
    name: "Axum",
    region: "TIGRAY REGION",
    description:
      "Discover ancient obelisks, archaeological treasures, and history.",
    image:
        "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ed3d80b4e_generated_be15730c.png",
    type: "Culture",
  },
  {
    name: "Omo Valley",
    region: "SOUTHERN ETHIOPIA",
    description:
      "Learn about diverse communities, traditions, and ways of life.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ad46bca46_generated_8180e903.png",
    type: "Culture",
  },
  {
    name: "Coffee Country",
    region: "SOUTHWEST ETHIOPIA",
    description:
      "Experience Ethiopia's coffee heritage and beautiful green landscapes.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/3aba22369_generated_b000a228.png",
    type: "Nature",
  },
];

const categories = ["All", "Nature", "Culture", "Adventure"];

export default function DestinationsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.region.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || destination.type === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="destinations-page">
      <section className="destinations-hero">
        <p className="destinations-eyebrow">
          YOUR NEXT ADVENTURE BEGINS HERE
        </p>

        <h1>
          Find your <em>somewhere.</em>
        </h1>

        <p className="destinations-intro">
          From ancient wonders to wild landscapes, discover the places
          that make Ethiopia unforgettable.
        </p>

        <a className="destinations-hero-button" href="#explore">
          Explore destinations <span>→</span>
        </a>
      </section>

      <section
        className="destination-browser"
        id="explore"
      >
        <div className="destination-browser-heading">
          <div>
            <p className="destinations-eyebrow">
              MADE FOR THE CURIOUS
            </p>
            <h2>Where will you <em>go?</em></h2>
          </div>

          <p className="destination-count">
            {filteredDestinations.length} places to discover
          </p>
        </div>

        <div className="destination-filters">
          <input
            type="search"
            placeholder="Search destinations..."
            aria-label="Search destinations"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="destination-categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item ? "category-active" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="destination-list">
          {filteredDestinations.map((destination, index) => (
            <article
              className="destination-tile"
              key={destination.name}
            >
              <img
                src={destination.image}
                alt={destination.name}
              />

              <div className="destination-tile-shade" />

              <span className="destination-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="destination-tile-content">
                <p>{destination.region}</p>
                <h3>{destination.name}</h3>
                <span className="destination-description">
                  {destination.description}
                </span>
                <span className="destination-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <p className="no-destinations">
            No places found. Try another search.
          </p>
        )}
      </section>

      <section className="destinations-bottom">
        <p className="destinations-eyebrow">THE GUZO EXPERIENCE</p>
        <h2>
          Ethiopia is waiting <em>for you.</em>
        </h2>
        <p>Discover a new place. Make a lasting memory.</p>
        <a href="/tours" className="destinations-hero-button">
          Explore our tours <span>→</span>
        </a>
      </section>
    </main>
  );
}
