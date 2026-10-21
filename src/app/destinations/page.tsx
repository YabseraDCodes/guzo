
import Link from "next/link";
import { getDestinations } from "../../../lib/tour-data";
import "./destinations.css";

export default function DestinationsPage() {
  const destinations = getDestinations();

  return (
    <main className="destinations-page">
      <nav className="destinations-nav">
        <Link href="/" className="destinations-logo">
          GUZO<span>.</span>
        </Link>

        <div className="destinations-nav-links">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/tours">Tours</Link>
        </div>

        <Link
          href="/tours"
          className="destinations-nav-button"
        >
          Explore Tours
        </Link>
      </nav>

      <section className="destinations-hero">
        <p>DISCOVER THE LAND OF ORIGINS</p>
        <h1>Explore Ethiopia</h1>
        <span>
          Find extraordinary places and plan your next adventure.
        </span>
      </section>

      <section className="destinations-list">
        <div className="destinations-heading">
          <div>
            <p className="destinations-label">EXPLORE</p>
            <h2>Popular Destinations</h2>
            <span>Discover the beauty of Ethiopia.</span>
          </div>

          <span>{destinations.length} destinations</span>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <article
              className="destination-card"
              key={destination.slug}
            >
              <Link
                href={`/destinations/${destination.slug}`}
                className="destination-image-link"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                />
              </Link>

              <div className="destination-card-body">
                {destination.category && (
                  <span className="destination-category">
                    {destination.category}
                  </span>
                )}

                <h3>{destination.name}</h3>

                <p className="destination-region">
                  📍 {destination.region}
                </p>

                <p className="destination-description">
                  {destination.description}
                </p>

                <Link
                  href={`/destinations/${destination.slug}`}
                  className="destination-view-link"
                >
                  Explore destination →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="destinations-footer">
        <Link href="/" className="destinations-logo">
          GUZO<span>.</span>
        </Link>
        <p>Discover Ethiopia. Live the Journey.</p>
      </footer>
    </main>
  );
}
