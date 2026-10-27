
import { Suspense } from "react";
import Link from "next/link";
import HomeDestinationCard from "./components/HomeDestinationCard";
<<<<<<< HEAD
import "./homePage.css";
import TourCard from "./components/TourCard";
=======
import type { Destination } from "./components/DestinationCard";
import "./homePage.css";
import type { Tour } from "./components/TourCard";import TourCard from "./components/TourCard";
>>>>>>> feature/package-booking-navigation
import TourSearch from "./components/TourSearch";
import type { Country } from "@/types/country";
import type { Tour } from "@/types/tour";

async function FeaturedContent() {
  const [countriesRes, toursRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/countries`, {
      next: { revalidate: 300 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/tours`, {
      next: { revalidate: 300 },
    }),
  ]);

  if (!countriesRes.ok || !toursRes.ok) {
    throw new Error("Failed to load featured destinations and tours.");
  }

  const countries: Country[] = await countriesRes.json();
  const tours: Tour[] = await toursRes.json();

  const featuredDestinations: Destination[] = countries.slice(0, 3);
  const featuredTours = tours.slice(5, 8);

  return (
    <>
      <section className="destinations-section" id="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> PLACES TO DISCOVER</p>
            <h2>Find your <em>somewhere.</em></h2>
          </div>
          <Link className="text-link" href="/destinations">
            All destinations <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="destination-grid">
          {featuredDestinations.map((destination) => (
            <HomeDestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>

      <section className="featured-tours-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> JOURNEYS WORTH TAKING
            </p>
            <h2>
              Find your next <em>adventure.</em>
            </h2>
          </div>

          <Link className="text-link" href="/tours">
            All tours <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <p className="featured-tours-description">
          From unforgettable landscapes to rich cultural encounters,
          discover experiences that bring Africa closer.
        </p>

        <div className="featured-tours-grid">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span /> YOUR JOURNEY BEGINS HERE
          </p>

          <h1>
            Find your way
            <br />
            to <em>wonder.</em>
          </h1>

          <p className="hero-description">
            Ancient wonders, breathtaking landscapes, and living
            traditions. Discover Africa, one unforgettable journey at a time.
          </p>

          <TourSearch />

          <p className="hero-note">
            <span aria-hidden="true">✳</span>Made for the curious. Rooted in Africa.
          </p>
        </div>

        <div className="hero-caption">
          <span>AFRICA · A WORLD OF ADVENTURE</span>
          <span>9°36&apos;N 40°29&apos;E</span>
        </div>
      </section>

      <section className="intro-section">
        <div>
          <p className="eyebrow"><span /> THE GUZO EXPERIENCE</p>
          <h2>
            Not just a destination.
            <br />
            <em>A whole new perspective.</em>
          </h2>
        </div>
        <p className="intro-copy">
          Discover the places, people, and experiences that make Africa extraordinary.
          From ancient cities to wild landscapes, your next adventure begins here.
        </p>
      </section>

      <section className="stats-strip" aria-label="The Guzo experience">
        <div className="stat-item">
          <span className="stat-number">01</span>
          <span className="stat-label">Discover new places</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">02</span>
          <span className="stat-label">Experience local culture</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">03</span>
          <span className="stat-label">Create lasting memories</span>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="destination-grid" aria-live="polite">
            Loading destinations and tours...
          </div>
        }
      >
        <FeaturedContent />
      </Suspense>

      <section className="closing-banner">
        <p className="eyebrow"><span /> THE WORLD IS WIDE</p>
        <h2>Your next story starts <em>here.</em></h2>
        <a className="banner-button" href="/countries">
          Find your journey <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  );
}
