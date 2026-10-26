
import Link from "next/link";
import { Compass, LayoutGrid, ListChecks, Map } from "lucide-react";
import "./headerstyle.css";


export default function Header() {
  return (
    <header className="staff-header">
<<<<<<< HEAD
      <Link href="/admin" className="staff-brand">
=======
      <Link href="/Admin" className="staff-brand">
>>>>>>> 18ba0727469bdd1260bc4be3e88e951ff079b166
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
<<<<<<< HEAD
        <Link href="/admin" className="staff-tab active">
=======
        <Link href="/Admin" className="staff-tab active">
>>>>>>> 18ba0727469bdd1260bc4be3e88e951ff079b166
          <LayoutGrid size={16} />
          <span>Overview</span>
        </Link>

<<<<<<< HEAD
        <Link href="/admin/bookingShow" className="staff-tab">
=======
        <Link href="/Admin/BookingShow" className="staff-tab">
>>>>>>> 18ba0727469bdd1260bc4be3e88e951ff079b166
          <ListChecks size={16} />
          <span>Bookings</span>
        </Link>

<<<<<<< HEAD
        <Link href="/admin/tourPlace" className="staff-tab">
          <Map size={16} />
          <span>Tour Packages</span>
        </Link>
        <Link href="/admin/agents" className="staff-tab">
=======
        <Link href="/Admin/TourPlace" className="staff-tab">
          <Map size={16} />
          <span>Tour Packages</span>
        </Link>
        <Link href="/Admin/Agents" className="staff-tab">
>>>>>>> 18ba0727469bdd1260bc4be3e88e951ff079b166
          <Map size={16} />
          <span>Agents</span>
        </Link>
      </nav>
    </header>
  );
}
