import Link from "next/link";

export default function Footer() {
  return (
    <footer className="guzo-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            GUZO<span>.</span>
          </Link>

          <p className="footer-tagline">Discover Ethiopia. Live the Journey.</p>

          <p className="footer-description">
            From ancient wonders to breathtaking landscapes, discover the
            beauty, culture, and unforgettable experiences of Ethiopia.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/tours">Tours</Link>
          <Link href="/bookings">Bookings</Link>
        </div>

        <div className="footer-links">
          <h3>Discover Ethiopia</h3>
          <Link href="/destinations">Historic Landmarks</Link>
          <Link href="/destinations">Natural Wonders</Link>
          <Link href="/destinations">Cultural Experiences</Link>
          <Link href="/tours">Adventure Tours</Link>
        </div>

        <div className="footer-contact">
          <h3>Your Journey Starts Here</h3>
          <p>Ready to explore Ethiopia?</p>
          <Link href="/tours" className="footer-cta">
            Find Your Tour <span>→</span>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GUZO. All rights reserved.</p>
        <p>Made with love for Ethiopia 🇪🇹</p>
      </div>
    </footer>
  );
}
