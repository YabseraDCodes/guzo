import HomeDestinationCard from "./components/HomeDestinationCard";
import { fetcher } from "@/lib/fetcher";
import { type Destination } from "./components/DestinationCard";

export default async function Home() {
 
    const res = await fetch('http://localhost:3000/api/countries');
    const countries = await res.json()

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

          <form className="search-panel" action="/destinations">
            <label className="search-field">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="search-input-wrap">
                <span className="field-label">WHERE TO?</span>
                <input
                  type="search"
                  name="search"
                  placeholder="Search destinations"
                  aria-label="Search destinations"
                />
              </span>
            </label>
            <button type="submit" className="search-button">
              Explore <span aria-hidden="true">→</span>
            </button>
          </form>

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

      <section className="destinations-section" id="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> PLACES TO DISCOVER</p>
            <h2>Find your <em>somewhere.</em></h2>
          </div>
          <a className="text-link" href="/destinations">
            All destinations <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="destination-grid">
          {featuredDestinations.map((destination) => (
            <HomeDestinationCard
              key={destination.number}
              destination={destination}
            />
          ))}
        </div>
      </section>

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
