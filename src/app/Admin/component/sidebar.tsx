"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  ListChecks,
  Users,
  MapPin,
  Trophy,
} from "lucide-react";
import "./sidebar.css";

const links = [
  { href: "/Admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/Admin/BookingShow", label: "Bookings", icon: ListChecks },
  { href: "/Admin/Agents", label: "Agents", icon: Users },
  { href: "/Admin/TourPlace", label: "Destinations", icon: MapPin },
  { href: "/Admin/leaderPage", label: "Leaderboard", icon: Trophy },
];

export default function Sidebar({ footer }: { footer?: React.ReactNode }) {
  const pathname = (usePathname() || "").toLowerCase();

  // "Dashboard" is active only on its own page, the others also on sub pages
  const isActive = (href: string) => {
    const target = href.toLowerCase();
    return target === "/admin"
      ? pathname === target
      : pathname === target || pathname.startsWith(target + "/");
  };

  return (
    <aside className="admin-sidebar">
      <Link href="/Admin" className="sidebar-brand">
        <span className="sidebar-brand-icon">
          <Compass size={20} />
        </span>
        <span>GUZO</span>
      </Link>

      <nav className="sidebar-nav">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${isActive(href) ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">{footer}</div>
    </aside>
  );
}
