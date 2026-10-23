
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="GUZO home">
        GUZO<span>.</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/countries">Destinations</Link>
        <Link href="/tours">Tours</Link>
        <Link href="/trip-status">Trip Status</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
