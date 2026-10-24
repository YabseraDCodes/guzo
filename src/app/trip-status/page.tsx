
import Link from "next/link";

export default function TripStatusPage() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <h1>Track Your Trip</h1>
        <p>
          Keep your Ethiopian adventure organized.
          Your journey starts here.
        </p>
        <Link href="/countries" className="info-button">
          Explore Destinations
        </Link>
      </section>

      <section className="info-content">
        <h2>Your Trip Status</h2>
        <p>
          You have no trips planned yet. Explore our destinations
          and start planning your next adventure.
        </p>
        <Link href="/countries" className="info-button">
          Plan Your Trip
        </Link>
      </section>
    </main>
  );
}
