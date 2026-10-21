
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTourBySlug } from "../../../../lib/tour-data";
import "./tour-detail.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TourDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="tour-detail-page">
      <nav className="tour-detail-nav">
        <Link href="/" className="tour-detail-logo">
          GUZO<span>.</span>
        </Link>

        <div className="tour-detail-nav-links">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/tours">Tours</Link>
        </div>

        <Link
          href="/destinations"
          className="tour-detail-nav-button"
        >
          Explore Ethiopia
        </Link>
      </nav>

      <section
        className="tour-detail-hero"
        style={{
          backgroundImage: `linear-gradient(#0009, #0009), url("${tour.image}")`,
        }}
      >
        <div className="tour-detail-hero-content">
          <Link
            href="/tours"
            className="tour-detail-back-link"
          >
            ← Back to Tours
          </Link>

          <p className="tour-detail-eyebrow">
            YOUR NEXT ADVENTURE
          </p>

          <h1>{tour.title}</h1>

          <p className="tour-detail-location">
            📍 {tour.destination}
          </p>

          <div className="tour-detail-hero-meta">
            <span>🕒 {tour.duration}</span>
            <span>
              From ${tour.price.toLocaleString("en-US")} / person
            </span>
          </div>

          <Link
            href={`/booking?tour=${encodeURIComponent(tour.slug)}`}
            className="tour-detail-book-button"
          >
            Book This Tour →
          </Link>
        </div>
      </section>

      <section className="tour-detail-content">
        <div className="tour-detail-main">
          <section className="tour-detail-about">
            <p className="tour-detail-eyebrow">
              ABOUT THIS TOUR
            </p>

            <h2>Experience {tour.destination}</h2>

            <p>{tour.description}</p>
          </section>

          <section className="tour-detail-itinerary">
            <h2>Tour Itinerary</h2>

            <div className="tour-itinerary-list">
              {tour.itinerary.map((item) => (
                <article
                  className="tour-itinerary-item"
                  key={item.day}
                >
                  <div className="tour-itinerary-day">
                    {item.day}
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="tour-detail-includes">
            <h2>What's Included</h2>

            <ul>
              {tour.includes.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="tour-booking-card">
          <p className="tour-detail-eyebrow">
            YOUR JOURNEY STARTS HERE
          </p>

          <h2>Book This Tour</h2>

          <p className="tour-booking-description">
            Reserve your place and submit your preferred travel
            dates and contact details.
          </p>

          <div className="tour-booking-price">
            <span>Starting from</span>

            <strong>
              ${tour.price.toLocaleString("en-US")}
            </strong>

            <span>per person</span>
          </div>

          <div className="tour-booking-info">
            <div>
              <span>Destination</span>
              <strong>{tour.destination}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>{tour.duration}</strong>
            </div>
          </div>

          <Link
            href={`/booking?tour=${encodeURIComponent(tour.slug)}`}
            className="tour-booking-submit"
          >
            Continue to Booking →
          </Link>

          <p className="tour-booking-note">
            No online payment required for this demo.
          </p>
        </aside>
      </section>

      <section className="tour-detail-cta">
        <h2>Ready to discover Ethiopia?</h2>

        <p>
          Choose your tour and start planning your journey.
        </p>

        <Link
          href="/tours"
          className="tour-detail-cta-button"
        >
          Explore More Tours →
        </Link>
      </section>

      <footer className="tour-detail-footer">
        <Link href="/" className="tour-detail-logo">
          GUZO<span>.</span>
        </Link>

        <p>Discover Ethiopia. Live the Journey.</p>
      </footer>
    </main>
  );
}
