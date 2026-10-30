export const instant = false;

import { Compass, LogOut, MapPin, Star } from "lucide-react";
import { logout } from "@/app/login/actions";
import { requireRole } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import BookingStatusForm from "./BookingStatusForm";
import "./staffDashboard.css";

type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
  id: string;
  agent_id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  team_number: number;
  package: string;
  status: string;
  created_at: string;
  travel_date: string | null;
};

type Agent = {
  id: number;
  name: string;
  description: string | null;
  rating: number | null;
  contact_info: string | null;
  packages: Record<string, unknown> | null;
  destinations: {
    name: string;
    countries: { name: string }[] | { name: string } | null;
  }[] | {
    name: string;
    countries: { name: string }[] | { name: string } | null;
  } | null;
};

const statuses: BookingStatus[] = ["pending", "confirmed", "cancelled"];

function formatDate(value: string | null, includeTime = false) {
  if (!value) return "Not provided";

  const normalizedValue = value.replace(
    /^(\d{4})\/(\d{2})\/(\d{2})$/,
    "$1-$2-$3",
  );
  const normalized = normalizedValue.includes("T")
    ? normalizedValue
    : normalizedValue.replace(" ", "T");
  const date = new Date(includeTime || normalized.includes("T")
    ? normalized
    : `${normalized}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(date);
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  return statuses.includes(normalized as BookingStatus) ? normalized : "unknown";
}

function SignOutForm() {
  return (
    <form action={logout}>
      <button className="agent-logout" type="submit">
        <LogOut size={16} />
        <span>Log out</span>
      </button>
    </form>
  );
}

export default async function StaffDashboard() {
  const user = await requireRole(["staff"]);

  if (user.agentId === null) {
    return (
      <main className="staff-dashboard">
        <header className="agent-dashboard-topbar">
          <a className="agent-brand" href="/" aria-label="GUZO home">
            <span className="agent-brand-icon"><Compass size={20} /></span>
            <span>GUZO<span>.</span></span>
          </a>
          <SignOutForm />
        </header>
        <section className="staff-empty-state">
          <span className="agent-kicker">AGENT WORKSPACE</span>
          <h1>Your account needs an agent assignment</h1>
          <p>
            Ask an administrator to connect your staff profile to an agent
            before you manage bookings.
          </p>
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const [agentResult, bookingsResult] = await Promise.all([
    supabase
      .from("agents")
      .select("id, name, description, rating, contact_info, packages, destinations(name, countries(name))")
      .eq("id", user.agentId)
      .maybeSingle(),
    supabase
      .from("bookings")
      .select("id, agent_id, user_name, user_email, user_phone, team_number, package, status, created_at, travel_date")
      .eq("agent_id", user.agentId)
      .order("created_at", { ascending: false }),
  ]);

  if (agentResult.error || bookingsResult.error || !agentResult.data) {
    return (
      <main className="staff-dashboard">
        <header className="agent-dashboard-topbar">
          <a className="agent-brand" href="/" aria-label="GUZO home">
            <span className="agent-brand-icon"><Compass size={20} /></span>
            <span>GUZO<span>.</span></span>
          </a>
          <SignOutForm />
        </header>
        <section className="staff-empty-state" role="alert">
          <span className="agent-kicker">AGENT WORKSPACE</span>
          <h1>We couldn’t load your workspace</h1>
          <p>
            Check that your account is linked to an agent and that your
            Supabase policies allow access to its bookings.
          </p>
        </section>
      </main>
    );
  }

  const agent = agentResult.data as Agent;
  const bookings = (bookingsResult.data ?? []) as Booking[];
  const counts = {
    all: bookings.length,
    pending: bookings.filter((booking) => booking.status.toLowerCase() === "pending").length,
    confirmed: bookings.filter((booking) => booking.status.toLowerCase() === "confirmed").length,
    cancelled: bookings.filter((booking) => booking.status.toLowerCase() === "cancelled").length,
  };
  const packageCount = agent.packages && typeof agent.packages === "object"
    ? Object.keys(agent.packages).length
    : 0;
  const destination = Array.isArray(agent.destinations)
    ? agent.destinations[0]
    : agent.destinations;
  const country = Array.isArray(destination?.countries)
    ? destination.countries[0]
    : destination?.countries;
  const location = [destination?.name, country?.name]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="staff-dashboard">
      <header className="agent-dashboard-topbar">
        <a className="agent-brand" href="/" aria-label="GUZO home">
          <span className="agent-brand-icon"><Compass size={20} /></span>
          <span>GUZO<span>.</span></span>
        </a>
        <div className="agent-portal-label">AGENT WORKSPACE</div>
        <SignOutForm />
      </header>

      <div className="staff-dashboard-content">
        <section className="agent-welcome">
          <div className="agent-welcome-copy">
            <p className="agent-kicker"><span /> YOUR BOOKINGS, IN ONE PLACE</p>
            <h1>Welcome, <em>{agent.name}</em></h1>
            <p className="agent-description">
              Review incoming travel requests and keep each booking up to date.
            </p>
            <div className="agent-meta">
              {location && <span><MapPin size={15} />{location}</span>}
              {agent.rating !== null && agent.rating !== undefined && (
                <span><Star size={15} />{Number(agent.rating).toFixed(1)} rating</span>
              )}
            </div>
          </div>
          <div className="agent-summary-card">
            <span className="agent-summary-label">YOUR PACKAGES</span>
            <strong>{String(packageCount).padStart(2, "0")}</strong>
            <span>available to travelers</span>
          </div>
        </section>

        <section className="booking-overview" aria-label="Booking totals">
          <article className="booking-stat booking-stat-total">
            <span>Total bookings</span><strong>{counts.all}</strong>
          </article>
          <article className="booking-stat booking-stat-pending">
            <span>Pending review</span><strong>{counts.pending}</strong>
          </article>
          <article className="booking-stat booking-stat-confirmed">
            <span>Confirmed</span><strong>{counts.confirmed}</strong>
          </article>
          <article className="booking-stat booking-stat-cancelled">
            <span>Cancelled</span><strong>{counts.cancelled}</strong>
          </article>
        </section>

        <section className="agent-bookings-section">
          <div className="agent-bookings-heading">
            <div>
              <p className="agent-section-kicker">BOOKING MANAGEMENT</p>
              <h2>Traveler requests</h2>
              <p>Only bookings assigned to {agent.name} appear here.</p>
            </div>
            <span className="booking-total-pill">
              {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="agent-bookings-empty">
              <span className="empty-compass"><Compass size={22} /></span>
              <h3>No bookings yet</h3>
              <p>New traveler requests assigned to your agency will appear here.</p>
            </div>
          ) : (
            <div className="agent-bookings-list">
              {bookings.map((booking) => {
                return (
                  <article className="agent-booking-card" key={booking.id}>
                    <div className="booking-card-main">
                      <div className="booking-card-title-row">
                        <div>
                          <span className="booking-reference">BOOKING {booking.id}</span>
                          <h3>{booking.user_name}</h3>
                          <a href={`mailto:${booking.user_email}`}>{booking.user_email}</a>
                        </div>
                        <span className={`agent-status status-${statusClass(booking.status)}`}>
                          {booking.status || "Unknown"}
                        </span>
                      </div>

                      <div className="booking-facts">
                        <div><span>Phone</span><strong>{booking.user_phone}</strong></div>
                        <div><span>Package</span><strong>{booking.package}</strong></div>
                        <div><span>Travelers</span><strong>{booking.team_number}</strong></div>
                        <div><span>Travel date</span><strong>{formatDate(booking.travel_date)}</strong></div>
                        <div><span>Requested</span><strong>{formatDate(booking.created_at, true)}</strong></div>
                      </div>
                    </div>

                    <BookingStatusForm
                      bookingId={booking.id}
                      currentStatus={booking.status}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {agent.description && (
          <aside className="agent-profile-note">
            <span>AGENCY PROFILE</span>
            <p>{agent.description}</p>
            {agent.contact_info && <a href={`mailto:${agent.contact_info}`}>{agent.contact_info}</a>}
          </aside>
        )}
      </div>
    </main>
  );
}
