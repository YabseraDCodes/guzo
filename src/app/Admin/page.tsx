export const instant = false;
import BookingChart from "./component/charts/bookingChart";
import Link from "next/link";
import { MapPin, Compass, ArrowRight } from "lucide-react";
import "./overview.css";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminOverviewPage() {
  await requireAdmin();

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
            <div className="flex-1 min-w-0">
            <BookingChart /></div>
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
