import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/app/utils/supabase/server";

const tourImages = [
  {
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
  },
];

async function PopularTours() {
  const supabase = await createClient();
  const { data: tours, error } = await supabase
    .from("tour_packages")
    .select("id, name, description, price, duration_days")
    .order("name")
    .limit(6);

  if (error) {
    console.error("Tour package lookup failed:", error);
    throw new Error("Could not load tour packages.");
  }

  if (tours.length === 0) {
    return (
      <p className="col-span-full text-gray-600">
        No tours are available to book yet. Please check back soon.
      </p>
    );
  }

  return (
    <div className="tour-grid">
      {tours.map((tour, index) => (
        <article className="tour-card" key={tour.id}>
          <img
            src={tourImages[index % tourImages.length].image}
            alt={tour.name}
          />

          <div className="tour-info">
            <p className="tour-location">
              {tour.duration_days} {tour.duration_days === 1 ? "Day" : "Days"}
            </p>

            <h3>{tour.name}</h3>

            <div className="tour-bottom">
              <span>{tour.description ?? "Explore Ethiopia"}</span>
              <p>
                From <strong>${Number(tour.price)}</strong>
              </p>
            </div>

            <Link href={`/bookings/new/${tour.id}`} className="tour-link">
              Book this tour →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <Link href="process.env.NEXT_PUBLIC_SUPABASE_URL" className="logo">
          GUZO<span>.</span>
        </Link>

        <div className="nav-links">
          <Link href="#home">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="#tours">Tours</Link>
        </div>

        <Link href="#tours" className="nav-button">
          Explore Tours
        </Link>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">DISCOVER THE LAND OF ORIGINS</p>

          <h1>
    

            Your next
            <br />
            adventure starts
            <br />
            in <span>Ethiopia.</span>
          </h1>

          <p className="hero-description">
            Discover ancient wonders, breathtaking landscapes,
            and unforgettable journeys with Guzo.
          </p>

          <Link href="#tours" className="primary-button">
            Explore Tours →
          </Link>
        </div>
      </section>

      <section className="search-section">
        <div>
          <label htmlFor="destination">Destination</label>
          <select id="destination" defaultValue="">
            <option value="">Where do you want to go?</option>
            <option value="lalibela">Lalibela</option>
            <option value="simien">Simien Mountains</option>
            <option value="danakil">Danakil Depression</option>
          </select>
        </div>

        <div>
          <label htmlFor="duration">Duration</label>
          <select id="duration" defaultValue="">
            <option value="">Any duration</option>
            <option value="short">1–3 days</option>
            <option value="medium">4–7 days</option>
            <option value="long">8+ days</option>
          </select>
        </div>

        <Link href="#tours" className="search-button">
          Find a Tour
        </Link>
      </section>

      <section className="tours-section" id="tours">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR NEXT ADVENTURE</p>
            <h2>Popular Tours</h2>
          </div>

          <Link href="#tours" className="view-all">
            View all tours →
          </Link>
        </div>

        <Suspense
          fallback={
            <p className="col-span-full text-gray-600" role="status">
              Loading tours...
            </p>
          }
        >
          <PopularTours />
        </Suspense>
      </section>

      <section className="cta-section" id="destinations">
        <p className="eyebrow">THE LAND OF ORIGINS</p>
        <h2>There is more to Ethiopia.</h2>
        <p>
          From ancient history to wild landscapes, your
          journey is waiting.
        </p>
        <Link href="#tours" className="primary-button">
          Start Exploring →
        </Link>
      </section>

      <footer className="footer" id="booking">
        <Link href="/" className="logo">
          GUZO<span>.</span>
        </Link>
        <p>Discover Ethiopia. Live the Journey.</p>
        <p>© 2026 Guzo. Built with love for Ethiopia.</p>
       
      </footer>
    </main>
  );
}
