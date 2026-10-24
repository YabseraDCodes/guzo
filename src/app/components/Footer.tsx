
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="brand">
        GUZO<span>.</span>
      </Link>

      <p>Discover Africa. Live the Journey.</p>

      <nav aria-label="Footer navigation">
        <Link href="/">Home</Link>
        <Link href="/countries">Destinations</Link>
        <Link href="/tours">Tours</Link>
        <Link href="/trip-status">Trip Status</Link>
      </nav>

      <p className="footer-bottom">
        © GUZO. Made for the curious.
      </p>
    </footer>
  );
}
