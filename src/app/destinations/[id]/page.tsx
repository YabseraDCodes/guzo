import Link from "next/link";
import { notFound } from "next/navigation";
import { images } from "../../components/images";

interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
}

const destinations: Destination[] = [
  {
    id: "lalibela",
    name: "Lalibela",
    region: "Amhara Region",
    description:
      "Discover the extraordinary rock-hewn churches of Lalibela, carved into solid rock centuries ago. This remarkable destination offers an unforgettable journey into Ethiopia's history, architecture, and spiritual heritage.",
    image: images.heroLalibela,
    highlights: [
      "Rock-Hewn Churches",
      "Ethiopian Orthodox Heritage",
      "Traditional Architecture",
      "Local Culture",
    ],
    bestTime: "October to March",
  },
  {
    id: "gondar",
    name: "Gondar Castle",
    region: "Amhara Region",
    description:
      "Explore the historic castles and palaces of Gondar, once the center of Ethiopia's imperial power. Its remarkable architecture and royal history make it one of the country's most fascinating historical destinations.",
    image: images.heroLalibela,
    highlights: [
      "Royal Enclosure",
      "Historic Castles",
      "Imperial History",
      "Traditional Architecture",
    ],
    bestTime: "October to March",
  },
  {
    id: "simien-mountains",
    name: "Simien Mountains",
    region: "Amhara Region",
    description:
      "Experience spectacular mountain landscapes, deep valleys, dramatic cliffs, and remarkable wildlife in the Simien Mountains. It is an excellent destination for travelers who enjoy hiking and nature.",
    image: images.simien,
    highlights: [
      "Mountain Hiking",
      "Scenic Landscapes",
      "Wildlife Watching",
      "Photography",
    ],
    bestTime: "October to March",
  },
  {
    id: "axum",
    name: "Axum",
    region: "Tigray Region",
    description:
      "Travel into the history of the ancient Kingdom of Axum. Discover towering stone stelae, archaeological treasures, and monuments associated with one of Africa's great ancient civilizations.",
    image: images.axum,
    highlights: [
      "Ancient Stelae",
      "Archaeological Sites",
      "Ancient Kingdom History",
      "Cultural Heritage",
    ],
    bestTime: "October to March",
  },
  {
    id: "danakil",
    name: "Danakil Depression",
    region: "Afar Region",
    description:
      "Discover a remarkable landscape of salt flats, volcanic formations, and colorful mineral deposits. The Danakil Depression offers a distinctive adventure for travelers interested in geology and dramatic scenery.",
    image: images.danakil,
    highlights: [
      "Volcanic Landscapes",
      "Salt Flats",
      "Geological Wonders",
      "Desert Scenery",
    ],
    bestTime: "November to February",
  },
  {
    id: "omo-valley",
    name: "Omo Valley",
    region: "Southern Ethiopia",
    description:
      "Explore the cultural diversity of the Omo Valley and learn about the traditions, arts, and everyday lives of its many communities. Responsible travel and respect for local customs are essential to the experience.",
    image: images.omo,
    highlights: [
      "Cultural Experiences",
      "Traditional Arts",
      "Local Communities",
      "Landscape Photography",
    ],
    bestTime: "June to September",
  },
];

export function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }));
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const destination = destinations.find(
    (item) => item.id === id
  );

  if (!destination) {
    notFound();
  }

  return (
    <main className="destination-details-page">
      <section
        className="destination-details-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15, 39, 27, 0.92), rgba(15, 39, 27, 0.35)), url("${destination.image}")`,
        }}
      >
        <div className="destination-details-hero-content">
          <Link href="/destinations" className="back-link">
            ← All Destinations
          </Link>

          <p className="section-eyebrow">
            DISCOVER {destination.region.toUpperCase()}
          </p>

          <h1>{destination.name}</h1>

          <p className="destination-hero-description">
            {destination.description}
          </p>

          <Link href="/tours" className="button button-gold">
            Explore Tours <span>→</span>
          </Link>
        </div>
      </section>

      <section className="destination-details-content">
        <div className="destination-about">
          <p className="section-eyebrow">EXPLORE ETHIOPIA</p>

          <h2>A place worth discovering.</h2>

          <p>{destination.description}</p>

          <div className="best-time-box">
            <span>☀</span>

            <div>
              <strong>When to visit</strong>
              <p>{destination.bestTime}</p>
            </div>
          </div>
        </div>

        <div className="destination-highlights">
          <p className="section-eyebrow">WHAT TO EXPERIENCE</p>

          <h2>Highlights</h2>

          <ul>
            {destination.highlights.map((highlight) => (
              <li key={highlight}>
                <span>✓</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="destination-details-cta">
        <p className="section-eyebrow">YOUR NEXT ADVENTURE</p>

        <h2>Ready to discover {destination.name}?</h2>

        <p>
          Explore our tours and find an experience that brings this destination
          to life.
        </p>

        <Link href="/tours" className="button button-dark">
          Find a Tour <span>→</span>
        </Link>
      </section>
    </main>
  );
}