
import Link from "next/link";
import { MapPin, Compass, ArrowRight } from "lucide-react";
import "./overview.css";

export default function AdminOverviewPage() {
  return (
    <section className="overview-page">
      <div className="admin-welcome">
        <div className="welcome-icon">
          <Compass size={32} />
        </div>

        <p className="welcome-eyebrow">WELCOME TO GUZO</p>

        <h1>
          Every journey begins
          <br />
          with a <span>destination.</span>
        </h1>

        <p className="welcome-description">
          Welcome to your GUZO administration dashboard. Manage destinations,
          connect travelers with trusted tour agents, and help create memorable
          travel experiences across Africa.
        </p>

        <div className="welcome-note">
          <MapPin size={22} />
          <div>
            <h3>Your role matters</h3>
            <p>
              Keep destination information accurate, tour agent details
              up to date, and bookings organized. Every detail helps travelers
              explore with confidence.
            </p>
          </div>
        </div>

        <Link href="/admin/agents" className="welcome-button">
          Explore tour agents <ArrowRight size={18} />
        </Link>

        <p className="welcome-footer">
          GUZO — Discover places. Experience cultures. Create memories.
        </p>
      </div>
    </section>
  );
}
