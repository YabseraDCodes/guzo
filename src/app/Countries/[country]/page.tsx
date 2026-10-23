
"use client";

import { useEffect, useState } from "react";

type Destination = {
  name: string;
  description: string;
  image: string;
  slug: string;
};

type Country = {
  name: string;
  region: string;
  description: string;
  destinations: Destination[];
};

const countries: Record<string, Country> = {
  morocco: {
    name: "Morocco",
    region: "North Africa",
    description: "Discover colorful cities, ancient medinas, and desert adventures.",
    destinations: [
      {
        name: "Marrakech",
        description: "Explore lively souks, beautiful gardens, and historic palaces.",
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
        slug: "marrakech",
      },
      {
        name: "Chefchaouen",
        description: "Wander through the famous blue streets of the Rif Mountains.",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1000&q=80",
        slug: "chefchaouen",
      },
      {
        name: "Sahara Desert",
        description: "Experience golden dunes and unforgettable desert scenery.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=80",
        slug: "sahara-desert",
      },
    ],
  },

  egypt: {
    name: "Egypt",
    region: "North Africa",
    description: "Travel through ancient history along the Nile and beyond.",
    destinations: [
      {
        name: "Cairo & Giza",
        description: "See the pyramids and explore Egypt's bustling capital.",
        image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1000&q=80",
        slug: "cairo-giza",
      },
      {
        name: "Luxor",
        description: "Discover magnificent temples and ancient royal tombs.",
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80",
        slug: "luxor",
      },
      {
        name: "Hurghada",
        description: "Relax by the Red Sea and explore colorful coral reefs.",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
        slug: "hurghada",
      },
    ],
  },

  tunisia: {
    name: "Tunisia",
    region: "North Africa",
    description: "Enjoy Mediterranean coastlines, historic towns, and desert landscapes.",
    destinations: [
      {
        name: "Tunis",
        description: "Explore historic streets, markets, and local culture.",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
        slug: "tunis",
      },
      {
        name: "Sidi Bou Said",
        description: "Visit a charming seaside village known for blue and white buildings.",
        image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=1000&q=80",
        slug: "sidi-bou-said",
      },
      {
        name: "Djerba",
        description: "Enjoy sandy beaches, island culture, and peaceful coastal views.",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80",
        slug: "djerba",
      },
    ],
  },

  "south-africa": {
    name: "South Africa",
    region: "Southern Africa",
    description: "Experience remarkable coastlines, wildlife, and outdoor adventures.",
    destinations: [
      {
        name: "Cape Town",
        description: "Enjoy Table Mountain, coastal views, and vibrant city life.",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80",
        slug: "cape-town",
      },
      {
        name: "Kruger National Park",
        description: "Discover incredible wildlife on a safari adventure.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        slug: "kruger-national-park",
      },
      {
        name: "Garden Route",
        description: "Travel along a scenic coast of forests, beaches, and small towns.",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80",
        slug: "garden-route",
      },
    ],
  },

  algeria: {
    name: "Algeria",
    region: "North Africa",
    description: "Discover historic cities and the immense Sahara Desert.",
    destinations: [
      {
        name: "Algiers",
        description: "Explore the capital's historic architecture and waterfront.",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
        slug: "algiers",
      },
      {
        name: "Oran",
        description: "Experience coastal views, music, and lively city culture.",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80",
        slug: "oran",
      },
      {
        name: "Sahara Desert",
        description: "Explore vast desert scenery and dramatic rock formations.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=80",
        slug: "sahara-desert",
      },
    ],
  },

  kenya: {
    name: "Kenya",
    region: "East Africa",
    description: "Discover wildlife safaris, beautiful highlands, and tropical beaches.",
    destinations: [
      {
        name: "Maasai Mara",
        description: "Experience open savannahs and remarkable wildlife.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        slug: "maasai-mara",
      },
      {
        name: "Amboseli",
        description: "See elephants against the spectacular backdrop of Mount Kilimanjaro.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
        slug: "amboseli",
      },
      {
        name: "Diani Beach",
        description: "Relax on white-sand beaches along the Indian Ocean.",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80",
        slug: "diani-beach",
      },
    ],
  },

  tanzania: {
    name: "Tanzania",
    region: "East Africa",
    description: "Journey from world-famous wildlife reserves to tropical islands.",
    destinations: [
      {
        name: "Zanzibar",
        description: "Discover turquoise waters, sandy beaches, and historic Stone Town.",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
        slug: "zanzibar",
      },
      {
        name: "Serengeti",
        description: "Explore vast plains and extraordinary wildlife.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        slug: "serengeti",
      },
      {
        name: "Mount Kilimanjaro",
        description: "Discover Africa's iconic mountain and its scenic surroundings.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
        slug: "mount-kilimanjaro",
      },
    ],
  },

  zambia: {
    name: "Zambia",
    region: "Southern Africa",
    description: "Experience powerful waterfalls, rivers, and unforgettable wildlife.",
    destinations: [
      {
        name: "Victoria Falls",
        description: "Witness one of the world's most spectacular waterfalls.",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80",
        slug: "victoria-falls",
      },
      {
        name: "South Luangwa",
        description: "Discover wildlife and guided safari experiences.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        slug: "south-luangwa",
      },
      {
        name: "Lower Zambezi",
        description: "Explore scenic river landscapes and wilderness.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
        slug: "lower-zambezi",
      },
    ],
  },

  ethiopia: {
    name: "Ethiopia",
    region: "East Africa",
    description: "Explore ancient heritage, mountain landscapes, and living traditions.",
    destinations: [
      {
        name: "Lalibela",
        description: "Discover extraordinary rock-hewn churches and centuries of history.",
        image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/df968d0f7_generated_02e14c4b.png",
        slug: "lalibela",
      },
      {
        name: "Axum",
        description: "Discover ancient obelisks and Ethiopia's rich history.",
        image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ed3d80b4e_generated_be15730c.png",
        slug: "axum",
      },
      {
        name: "Gondar",
        description: "Explore historic castles and the royal heritage of Ethiopia.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
        slug: "gondar",
      },
      {
        name: "Simien Mountains",
        description: "Explore dramatic peaks, scenic trails, and wild landscapes.",
        image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/3438e679c_generated_59eeb2e0.png",
        slug: "simien-mountains",
      },
      {
        name: "Danakil Depression",
        description: "Experience colorful landscapes and unforgettable adventures.",
        image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/9b1e18182_generated_fae7178a.png",
        slug: "danakil",
      },
      {
        name: "Omo Valley",
        description: "Learn about diverse cultures and traditions in southern Ethiopia.",
        image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/ad46bca46_generated_8180e903.png",
        slug: "omo-valley",
      },
    ],
  },
};

export default function CountryPage() {
  const [countryKey, setCountryKey] = useState("");
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const slug = window.location.pathname.split("/").filter(Boolean).pop() || "";
    const selectedCountry = countries[slug];

    setCountryKey(slug);
    setCountry(selectedCountry || null);
  }, []);

  if (!country) {
    return (
      <main className="country-page">
        <header className="site-header">
          <a className="brand" href="/">GUZO<span>.</span></a>
          <nav className="main-nav">
            <a href="/">Home</a>
            <a href="/destinations">Destinations</a>
            <a href="/tours">Tours</a>
          </nav>
          <a className="header-cta" href="/countries/ethiopia">Explore Africa ↗</a>
        </header>
        <section className="country-hero">
          <p className="eyebrow">EXPLORE AFRICA</p>
          <h1>Discover a new <em>somewhere.</em></h1>
          <p>Choose a country to start exploring.</p>
          <div className="country-grid">
            {Object.entries(countries).map(([slug, item]) => (
              <a className="country-card" href={`/countries/${slug}`} key={slug}>
                <h2>{item.name}</h2>
                <p>{item.region}</p>
                <span>Explore country ↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="country-page">
      <header className="site-header">
        <a className="brand" href="/">GUZO<span>.</span></a>
        <nav className="main-nav">
          <a href="/">Home</a>
          <a className="nav-active" href="/countries/ethiopia">Countries</a>
          <a href="/tours">Tours</a>
        </nav>
        <a className="header-cta" href="/countries">Explore Africa ↗</a>
      </header>

      <section className="country-hero">
        <p className="eyebrow">{country.region.toUpperCase()} · EXPLORE AFRICA</p>
        <h1>Discover <em>{country.name}.</em></h1>
        <p>{country.description}</p>
      </section>

      <section className="country-destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PLACES TO DISCOVER</p>
            <h2>Explore <em>{country.name}</em></h2>
          </div>
          <a className="text-link" href="/countries">All countries ↗</a>
        </div>

        <div className="destination-grid">
          {country.destinations.map((destination, index) => (
            <a
              className="destination-card"
              href={`/countries/${countryKey}/${destination.slug}`}
              key={destination.slug}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
              />
              <div className="card-shade" />
              <span className="card-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="card-content">
                <span className="card-region">{country.name}</span>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <span className="card-link">Explore destination ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="closing-banner">
        <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
        <h2>Find your next <em>adventure.</em></h2>
        <a className="banner-button" href="/destinations">
          Explore more <span>→</span>
        </a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/">GUZO<span>.</span></a>
        <p>Discover Africa. Live the Journey.</p>
        <span>Made for the curious · Africa</span>
      </footer>
    </main>
  );
}
