"use client";

import { useState } from "react";
import TourCard, { type Tour } from "../components/TourCard";
import { images } from "../components/images";

const tours: Tour[] = [
  {
    id: "lalibela-historic-tour",
    title: "The Wonders of Lalibela",
    location: "Lalibela, Amhara",
    description:
      "Discover Ethiopia's remarkable rock-hewn churches and experience centuries of history and spiritual heritage.",
    image: images.heroLalibela,
    duration: "3 days",
    price: 8500,
    category: "Historical",
    highlights: ["Rock-hewn Churches", "Local Culture"],
  },
  {
    id: "simien-mountains-adventure",
    title: "Simien Mountains Adventure",
    location: "Simien Mountains, Amhara",
    description:
      "Explore dramatic mountain scenery, encounter unique wildlife, and enjoy unforgettable highland views.",
    image: images.simien,
    duration: "4 days",
    price: 12000,
    category: "Adventure",
    highlights: ["Mountain Hiking", "Wildlife"],
  },
  {
    id: "danakil-expedition",
    title: "Danakil Desert Expedition",
    location: "Afar Region",
    description:
      "Experience extraordinary desert landscapes, colorful mineral formations, and fascinating geological wonders.",
    image: images.danakil,
    duration: "3 days",
    price: 15000,
    category: "Adventure",
    highlights: ["Desert Landscapes", "Geological Wonders"],
  },
  {
    id: "axum-heritage-tour",
    title: "Ancient Axum Heritage",
    location: "Axum, Tigray",
    description:
      "Explore the legacy of an ancient Ethiopian kingdom through its historic monuments and archaeological sites.",
    image: images.axum,
    duration: "2 days",
    price: 6500,
    category: "Historical",
    highlights: ["Ancient Monuments", "Ethiopian Heritage"],
  },
  {
    id: "omo-valley-cultural-tour",
    title: "Omo Valley Cultural Journey",
    location: "Southern Ethiopia",
    description:
      "Learn about the diverse traditions, art, and ways of life found among communities of the Omo Valley.",
    image: images.omo,
    duration: "5 days",
    price: 18000,
    category: "Cultural",
    highlights: ["Cultural Experiences", "Local Traditions"],
  },
  {
    id: "ethiopian-coffee-experience",
    title: "Ethiopian Coffee Experience",
    location: "Ethiopia",
    description:
      "Discover Ethiopia's celebrated coffee heritage and learn about the traditions behind its famous coffee ceremony.",
    image: images.coffee,
    duration: "1 day",
    price: 2500,
    category: "Cultural",
    highlights: ["Coffee Ceremony", "Local Traditions"],
  },
];

const categories = ["All", "Historical", "Adventure", "Cultural"];

export default function ToursPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = [
      tour.title,
      tour.location,
      tour.description,
      tour.category,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || tour.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="tours-page">
      <section className="tours-hero">
        <div className="tours-hero-content">
          <span className="section-eyebrow">EXPERIENCE ETHIOPIA</span>

          <h1>
            Find the journey
            <br />
            <span>that speaks to you.</span>
          </h1>

          <p>
            From ancient civilizations to breathtaking adventures, discover
            tours that bring Ethiopia's stories to life.
          </p>

          <a href="#available-tours" className="button button-gold">
            Explore Our Tours <span>↓</span>
          </a>
        </div>
      </section>

      <section className="tours-introduction">
        <div>
          <span className="section-eyebrow">YOUR NEXT ADVENTURE</span>
          <h2>Experiences worth remembering.</h2>
        </div>

        <p>
          Find your perfect experience, whether you love history, adventure,
          or discovering the cultures and traditions of Ethiopia.
        </p>
      </section>

      <section className="tour-finder" id="available-tours">
        <div className="tour-finder-heading">
          <div>
            <span className="section-eyebrow">EXPLORE OUR COLLECTION</span>
            <h2>Discover our tours</h2>
          </div>

          <span className="tour-count">
            {filteredTours.length}{" "}
            {filteredTours.length === 1 ? "tour" : "tours"} found
          </span>
        </div>

        <div className="tour-controls">
          <div className="tour-search">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search tours, destinations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search tours"
            />
          </div>

          <div className="tour-filters" aria-label="Filter tours by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`tour-filter ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredTours.length > 0 ? (
          <div className="tours-grid">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="no-tours">
            <h3>No tours found</h3>
            <p>
              Try a different search or choose another category to discover
              more experiences.
            </p>

            <button
              type="button"
              className="button button-dark"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              Show All Tours
            </button>
          </div>
        )}
      </section>

      <section className="tours-cta">
        <span className="section-eyebrow">YOUR STORY STARTS HERE</span>

        <h2>Ethiopia is calling.</h2>

        <p>
          Every destination has a story. Find the one you want to experience.
        </p>

        <a href="#available-tours" className="button button-dark">
          Find Your Tour <span>→</span>
        </a>
      </section>
    </main>
  );
}