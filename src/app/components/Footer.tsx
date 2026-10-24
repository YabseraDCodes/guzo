import Link from "next/link";
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="GUZO home">
            GUZO<span>.</span>
          </Link>

          <p className="footer-tagline">
            Discover Africa.
            <br />
            <em>Live the journey.</em>
          </p>

          <p className="footer-description">
            Find extraordinary places, experience vibrant cultures,
            and discover your next African adventure with GUZO.
          </p>
        </div>

        <div className="footer-links-group">
          <h2>Explore</h2>
          <nav aria-label="Explore">
            <Link href="/destinations">Destinations</Link>
            <Link href="/tours">Explore tours</Link>
            <Link href="/about">About GUZO</Link>
          </nav>
        </div>

        <div className="footer-links-group">
          <h2>Your journey</h2>
          <nav aria-label="Your journey">
            <Link href="/trip-status">Track your booking</Link>
            <Link href="/tours">Find a tour</Link>
            <Link href="/destinations">Discover Africa</Link>
          </nav>
        </div>

        <div className="footer-note">
          <span className="footer-note-icon" aria-hidden="true">✳</span>
          <p>For the curious.</p>
          <p>For the explorers.</p>
          <p>For the stories yet to be told.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <Link href="/" className="footer-home-link">
          GUZO<span>.</span>
        </Link>

        <p>© {new Date().getFullYear()} GUZO. Made for the curious.</p>

        <a className="footer-back-top" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
