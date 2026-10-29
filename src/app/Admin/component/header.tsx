
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutGrid,
  ListChecks,
  LogOut,
  Map,
  Users,
} from "lucide-react";
import { logout } from "@/app/login/actions";
import "./headerstyle.css";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/Admin"
      ? pathname === "/Admin" || pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="staff-header">
      <Link href="/Admin" className="staff-brand" aria-label="GUZO admin home">
        <span className="brand-icon">
          <Compass size={22} />
        </span>
        <span className="staff-brand-name">
          GUZO<span>.</span>
        </span>
      </Link>

      <div className="staff-heading">
        <p className="staff-label">GUZO · STAFF PORTAL</p>

        <h1>Administrative Dashboard</h1>

        <p className="staff-description">
          Manage the details behind every journey.
        </p>
      </div>

      <form action={logout} className="staff-logout-form">
        <button className="staff-logout" type="submit">
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </form>

      <nav className="staff-tabs">
        <Link
          href="/Admin"
          className={`staff-tab${isActive("/Admin") ? " active" : ""}`}
          aria-current={isActive("/Admin") ? "page" : undefined}
        >
          <LayoutGrid size={16} />
          <span>Overview</span>
        </Link>

        <Link
          href="/Admin/BookingShow"
          className={`staff-tab${isActive("/Admin/BookingShow") ? " active" : ""}`}
          aria-current={isActive("/Admin/BookingShow") ? "page" : undefined}
        >
          <ListChecks size={16} />
          <span>Bookings</span>
        </Link>

        <Link
          href="/Admin/TourPlace"
          className={`staff-tab${isActive("/Admin/TourPlace") ? " active" : ""}`}
          aria-current={isActive("/Admin/TourPlace") ? "page" : undefined}
        >
          <Map size={16} />
          <span>Tour Packages</span>
        </Link>
        <Link
          href="/Admin/Agents"
          className={`staff-tab${isActive("/Admin/Agents") ? " active" : ""}`}
          aria-current={isActive("/Admin/Agents") ? "page" : undefined}
        >
          <Users size={16} />
          <span>Agents</span>
        </Link>
      </nav>
    </header>
  );
}
