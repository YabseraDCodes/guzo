import Link from "next/link";

const tours = [
  {
    title: "Explore Lalibela",
    location: "Amhara, Ethiopia",
    duration: "3 Days",
    price: "$250",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
  },
  {
    title: "Simien Mountains",
    location: "Northern Ethiopia",
    duration: "5 Days",
    price: "$400",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "Danakil Depression",
    location: "Afar, Ethiopia",
    duration: "4 Days",
    price: "$350",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <Link href="/" className="logo">
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

        <div className="tour-grid">
          {tours.map((tour) => (
            <article className="tour-card" key={tour.title}>
              <img src={tour.image} alt={tour.title} />

              <div className="tour-info">
                <p className="tour-location">
                  📍 {tour.location}
                </p>

                <h3>{tour.title}</h3>

                <div className="tour-bottom">
                  <span>🕒 {tour.duration}</span>

                  <p>
                    From <strong>{tour.price}</strong>
                  </p>
                </div>

                <Link href="#booking" className="tour-link">
                  View Tour →
                </Link>
              </div>
            </article>
          ))}
        </div>
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
