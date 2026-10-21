import Link from "next/link";
import { notFound } from "next/navigation";
import type { Tour } from "../../components/TourCard";
import { images } from "../../components/images";

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

export function generateStaticParams() {
  return tours.map((tour) => ({
    id: tour.id,
  }));
}

export default async function TourDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tour = tours.find((item) => item.id === id);

  if (!tour) {
    notFound();
  }

  return (
    <main className="tour-details-page">
      <section
        className="tour-details-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15, 39, 27, 0.92), rgba(15, 39, 27, 0.3)), url("${tour.image}")`,
        }}
      >
        <div className="tour-details-hero-content">
          <Link href="/tours" className="back-link">
            ← All Tours
          </Link>

          <span className="tour-details-category">{tour.category}</span>

          <h1>{tour.title}</h1>

          <p>{tour.description}</p>

          <div className="tour-details-summary">
            <span>⌖ {tour.location}</span>
            <span>◷ {tour.duration}</span>
          </div>
        </div>
      </section>

      <section className="tour-details-content">
        <div className="tour-details-main">
          <p className="section-eyebrow">YOUR EXPERIENCE</p>

          <h2>Discover something extraordinary.</h2>

          <p>{tour.description}</p>

          <h3>Tour highlights</h3>

          <ul className="tour-details-highlights">
            {tour.highlights.map((highlight) => (
              <li key={highlight}>
                <span>✓</span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="tour-information">
            <div>
              <span>Destination</span>
              <strong>{tour.location}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>{tour.duration}</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>{tour.category}</strong>
            </div>
          </div>
        </div>

        <aside className="tour-booking-card">
          <p className="section-eyebrow">YOUR NEXT JOURNEY</p>

          <span className="tour-booking-label">Starting from</span>

          <h2>{tour.price.toLocaleString("en-US")} ETB</h2>

          <p className="tour-booking-note">Per person · Sample price</p>

          <hr />

          <p>
            Ready to experience {tour.title}? Continue to the bookings section
            to explore the next steps.
          </p>

          <Link href="/bookings" className="button button-gold">
            Book This Tour <span>→</span>
          </Link>

          <Link href="/tours" className="tour-back-to-list">
            Explore Other Tours
          </Link>
        </aside>
      </section>
    </main>
  );
}