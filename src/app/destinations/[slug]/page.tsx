
import Link from "next/link";
import { notFound } from "next/navigation";
import TourCard from "@/app/components/TourCard";
import {
  getDestinationBySlug,
  getToursByDestination,
} from "../../../../lib/tour-data";
import "./destination-detail.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DestinationDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const destinationTours = getToursByDestination(destination);

  return (
    <main className="destination-detail-page">
      <nav className="detail-nav">
        <Link href="/" className="detail-logo">
          GUZO<span>.</span>
        </Link>

        <div className="detail-nav-links">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/tours">Tours</Link>
        </div>

        <Link href="/tours" className="detail-nav-button">
          Explore Tours
        </Link>
      </nav>

      <section
        className="detail-hero"
        style={{
          backgroundImage: `linear-gradient(#0009, #0009), url("${destination.image}")`,
        }}
      >
        <div className="detail-hero-content">
          <Link
            href="/destinations"
            className="detail-back-link"
          >
            ← All Destinations
          </Link>

          <p className="detail-eyebrow">DISCOVER ETHIOPIA</p>

          <h1>{destination.name}</h1>

          <p className="detail-region">
            📍 {destination.region}
          </p>

          <p className="detail-description">
            {destination.description}
          </p>
        </div>
      </section>

      <section className="detail-about">
        <div>
          <p className="detail-eyebrow">
            ABOUT THIS DESTINATION
          </p>

          <h2>Discover {destination.name}</h2>

          <p>{destination.description}</p>
        </div>

        <div className="detail-highlights">
          <h3>Highlights</h3>

          <ul>
            {destination.highlights.map((highlight) => (
              <li key={highlight}>✓ {highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="detail-tours">
        <div className="detail-tours-heading">
          <div>
            <p className="detail-eyebrow">
              FIND YOUR ADVENTURE
            </p>

            <h2>Tours in {destination.name}</h2>

            <p>
              Choose a package for your next Ethiopian journey.
            </p>
          </div>

          <span>
            {destinationTours.length}{" "}
            {destinationTours.length === 1 ? "tour" : "tours"}
          </span>
        </div>

        {destinationTours.length > 0 ? (
          <div className="detail-tours-grid">
            {destinationTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="detail-no-tours">
            <h3>No tours available yet</h3>

            <p>
              We're preparing tours for this destination.
            </p>

            <Link
              href="/tours"
              className="detail-nav-button"
            >
              Browse All Tours
            </Link>
          </div>
        )}
      </section>

      <section className="detail-cta">
        <h2>Your Ethiopian adventure awaits.</h2>

        <p>
          Discover more places and experiences with Guzo.
        </p>

        <Link
          href="/destinations"
          className="detail-cta-button"
        >
          Explore Destinations →
        </Link>
      </section>

      <footer className="detail-footer">
        <Link href="/" className="detail-logo">
          GUZO<span>.</span>
        </Link>

        <p>Discover Ethiopia. Live the Journey.</p>
      </footer>
    </main>
  );
}
