import Link from "next/link";

export default function Header() {
  return (
    <header className="guzo-header">
      <div className="header-container">
        <Link href="/" className="guzo-logo">
          GUZO<span>.</span>
          <small>DISCOVER ETHIOPIA</small>
        </Link>

        <nav className="main-navigation" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/tours">Tours</Link>
          <Link href="/bookings">Bookings</Link>
        </nav>

        <Link href="/tours" className="header-cta">
          Explore Tours <span>→</span>
        </Link>
      </div>
    </header>
  );
}
