
import Link from "next/link";
import { Compass, LayoutGrid, ListChecks, Map } from "lucide-react";
import "./headerstyle.css";


export default function Header() {
  return (
    <header className="staff-header">
      <Link href="/admin" className="staff-brand">
        <span className="brand-icon">
          <Compass size={22} />
        </span>
        <span>GUZO</span>
      </Link>

      <div className="staff-heading">
        <p className="staff-label">STAFF PORTAL</p>

        <h1>Administrative Dashboard</h1>

        <p className="staff-description">
          Manage bookings, tour packages, and monitor activity.
        </p>
      </div>

      <nav className="staff-tabs">
        <Link href="/Admin" className="staff-tab active">
          <LayoutGrid size={16} />
          <span>Overview</span>
        </Link>

        <Link href="/Admin/BookingShow" className="staff-tab">
          <ListChecks size={16} />
          <span>Bookings</span>
        </Link>

        <Link href="/Admin/TourPlace" className="staff-tab">
          <Map size={16} />
          <span>Tour Packages</span>
        </Link>
        <Link href="/Admin/Agents" className="staff-tab">
          <Map size={16} />
          <span>Agents</span>
        </Link>
      </nav>
    </header>
  );
}
