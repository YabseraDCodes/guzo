
"use client";

import { useEffect, useState } from "react";

export default function CountriesPage() {
    console.log("COUNTRIES PAGE LOADED");
    
    const [countryCards, setCountryCards] = useState<
    { slug: string; name: string; region: string; description: string }[]
  >([]);

  useEffect(() => {
    setCountryCards([
      { slug: "ethiopia", name: "Ethiopia", region: "East Africa", description: "Ancient history, dramatic mountains, and living traditions." },
      { slug: "kenya", name: "Kenya", region: "East Africa", description: "Legendary safaris, wildlife, and beautiful coastlines." },
      { slug: "tanzania", name: "Tanzania", region: "East Africa", description: "Extraordinary wildlife, Mount Kilimanjaro, and Zanzibar." },
      { slug: "morocco", name: "Morocco", region: "North Africa", description: "Colorful markets, historic cities, and desert adventures." },
      { slug: "egypt", name: "Egypt", region: "North Africa", description: "The pyramids, the Nile, and ancient civilizations." },
      { slug: "south-africa", name: "South Africa", region: "Southern Africa", description: "Wildlife, coastlines, and vibrant cities." },
      { slug: "tunisia", name: "Tunisia", region: "North Africa", description: "Mediterranean beaches, historic towns, and desert scenery." },
      { slug: "algeria", name: "Algeria", region: "North Africa", description: "Historic cities and vast Sahara landscapes." },
      { slug: "zambia", name: "Zambia", region: "Southern Africa", description: "Spectacular waterfalls, rivers, and wildlife." },
    ]);
  }, []);

  return (
    <main className="country-page">
      <section className="country-hero">
        <p className="eyebrow">NINE COUNTRIES, ENDLESS STORIES</p>
        <h1>Discover <em>Africa.</em></h1>
        <p>Choose a country to explore its destinations and experiences.</p>

        <div className="country-grid">
          {countryCards.map((country) => (
            <a
              className="country-card"
              href={`/countries/${country.slug}`}
              key={country.slug}
            >
              <h2>{country.name}</h2>
              <p>{country.region}</p>
              <p>{country.description}</p>
              <span>Explore country ↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}