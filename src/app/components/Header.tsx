
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import "./Header.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/tours" },
  { label: "Trip Status", href: "/trip-status" },
  { label: "About", href: "/about" },
];

function HeaderContent() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <Link
        href="/"
        className="brand"
        aria-label="GUZO home"
        onClick={() => setMenuOpen(false)}
      >
        GUZO<span>.</span>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        id="main-navigation"
        className={`main-nav${menuOpen ? " nav-open" : ""}`}
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "nav-active" : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/destinations"
          className="header-cta"
          onClick={() => setMenuOpen(false)}
        >
          Plan your trip <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="site-header">
          <Link href="/" className="brand" aria-label="GUZO home">
            GUZO<span>.</span>
          </Link>
        </header>
      }
    >
      <HeaderContent />
    </Suspense>
  );
}
