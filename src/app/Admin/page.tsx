export const instant = false;

import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  ListChecks,
  Map,
  MapPin,
  Users,
} from "lucide-react";
import "./overview.css";
import { requireAdmin } from "@/lib/auth/require-admin";

const workspaceLinks = [
  {
    title: "Bookings",
    description: "Review traveler requests and keep each reservation moving.",
    href: "/Admin/BookingShow",
    icon: ListChecks,
    number: "01",
  },
  {
    title: "Tour packages",
    description: "Create and update the journeys travelers can discover.",
    href: "/Admin/TourPlace",
    icon: Map,
    number: "02",
  },
  {
    title: "Tour agents",
    description: "Manage the local experts who bring each destination to life.",
    href: "/Admin/Agents",
    icon: Users,
    number: "03",
  },
];

export default async function AdminOverviewPage() {
  await requireAdmin();

  return (
    <section className="overview-page">
      <div className="admin-welcome">
        <div className="welcome-main">
          <p className="welcome-eyebrow"><span /> YOUR GUZO WORKSPACE</p>
          <h2>
            Every journey begins
            <br />
            with a <em>destination.</em>
          </h2>
          <p className="welcome-description">
            Keep the details behind every memorable trip organized in one
            place. Choose an area below to get started.
          </p>
        </div>
        <div className="welcome-mark" aria-hidden="true">
          <Compass size={48} strokeWidth={1.2} />
          <span>AFRICA · 09°36&apos;N</span>
        </div>
      </div>

      <div className="workspace-heading">
        <div>
          <p className="workspace-eyebrow">ADMINISTRATION</p>
          <h3>Manage your workspace</h3>
        </div>
        <p>Select a section to view or update its information.</p>
      </div>

      <div className="workspace-grid">
        {workspaceLinks.map(({ title, description, href, icon: Icon, number }) => (
          <Link className="workspace-card" href={href} key={href}>
            <div className="workspace-card-top">
              <span className="workspace-card-icon"><Icon size={20} /></span>
              <span className="workspace-card-number">{number}</span>
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
            <span className="workspace-card-link">
              Open section <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>

      <aside className="welcome-note">
        <MapPin size={20} aria-hidden="true" />
        <p>
          <strong>Small details make a difference.</strong> Keep destination,
          package, and agent information accurate so travelers can plan with
          confidence.
        </p>
      </aside>
    </section>
  );
}
