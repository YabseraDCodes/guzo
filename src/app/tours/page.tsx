
"use client";

import { useState } from "react";

const tours = [
  {
    name: "The Wonders of Lalibela",
    location: "Lalibela, Amhara Region",
    duration: "3 days",
    category: "Culture",
    description:
      "Explore remarkable rock-hewn churches and discover Ethiopia's rich heritage.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/df968d0f7_generated_02e14c4b.png",
    number: "01",
  },
  {
    name: "Into the Simien Mountains",
    location: "Northern Ethiopia",
    duration: "4 days",
    category: "Nature",
    description:
      "Discover dramatic mountain scenery, hiking trails, and unique wildlife.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/3438e679c_generated_59eeb2e0.png",
    number: "02",
  },
  {
    name: "Danakil Adventure",
    location: "Afar Region",
    duration: "3 days",
    category: "Adventure",
    description:
      "Experience colorful mineral landscapes and extraordinary volcanic scenery.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/9b1e18182_generated_fae7178a.png",
    number: "03",
  },
  {
    name: "Ancient Axum Discovery",
    location: "Axum, Tigray Region",
    duration: "2 days",
    category: "Culture",
    description:
      "Visit ancient obelisks and explore the legacy of a historic Ethiopian kingdom.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ed3d80b4e_generated_be15730c.png",
    number: "04",
  },
  {
    name: "Coffee Country Escape",
    location: "Southwest Ethiopia",
    duration: "3 days",
    category: "Nature",
    description:
      "Discover green landscapes and learn about Ethiopia's celebrated coffee traditions.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/3aba22369_generated_b000a228.png",
    number: "05",
  },
  {
    name: "Omo Valley Journey",
    location: "Southern Ethiopia",
    duration: "5 days",
    category: "Culture",
    description:
      "Explore regional traditions, local communities, and the landscapes of the Omo Valley.",
    image:
      "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ad46bca46_generated_8180e903.png",
    number: "06",
  },
];

const categories = ["All", "Culture", "Nature", "Adventure"];

export default function ToursPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTours = tours.filter((tour) => {
    const matchesCategory =
      category === "All" || tour.category === category;

    const query = search.toLowerCase();
    const matchesSearch =
      tour.name.toLowerCase().includes(query) ||
      tour.location.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="tours-page">
      <section className="tours-hero">
        <p className="tours-eyebrow">EXPERIENCE ETHIOPIA WITH GUZO</p>
        <h1>
          Find your next <em>adventure.</em>
        </h1>
        <p className="tours-hero-description">
          From ancient kingdoms to breathtaking wild landscapes,
          find a journey that speaks to you.
        </p>
        <a href="#tour-collection" className="tours-hero-button">
          Explore our tours <span>→</span>
        </a>
      </section>

      <section className="tours-collection" id="tour-collection">
        <div className="tours-section-heading">
          <div>
            <p className="tours-eyebrow">YOUR JOURNEY, YOUR WAY</p>
            <h2>Journeys worth <em>taking.</em></h2>
          </div>
          <span>{filteredTours.length} experiences</span>
        </div>

        <div className="tours-controls">
          <input
            type="search"
            placeholder="Search tours or destinations..."
            aria-label="Search tours"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="tours-categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "tour-category-active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="tours-grid">
          {filteredTours.map((tour) => (
            <article className="tour-card" key={tour.number}>
              <div className="tour-image-wrap">
                <img src={tour.image} alt={tour.name} />
                <span className="tour-number">{tour.number}</span>
                <span className="tour-category-tag">{tour.category}</span>
              </div>

              <div className="tour-card-content">
                <p className="tour-location">{tour.location}</p>
                <h3>{tour.name}</h3>
                <p className="tour-description">{tour.description}</p>

                <div className="tour-card-footer">
                  <span>◷ {tour.duration}</span>
                  <a
                    href={`/bookings?tour=${encodeURIComponent(tour.name)}`}
                    className="tour-book-link"
                  >
                    Enquire <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <p className="tours-empty">
            No tours found. Try another search or category.
          </p>
        )}
      </section>

      <section className="tours-cta">
        <p className="tours-eyebrow">YOUR STORY STARTS HERE</p>
        <h2>Ready to discover <em>Ethiopia?</em></h2>
        <p>Choose your next journey and start planning your adventure.</p>
        <a href="/destinations" className="tours-hero-button">
          Discover destinations <span>→</span>
        </a>
      </section>
    </main>
  );
}
