"use client";
import useSWR from "swr";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetcher } from "@/lib/fetcher";

type Booking = {
  id: string;
  user_name: string;
  user_email: string;
  team_number: number;
  package: string;
  status: string;
  created_at: string;
  agents?: { name: string } | null;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LatestBookings() {
  const { data, isLoading } = useSWR<Booking[]>("/api/bookinGet", fetcher);

  // newest first, show only 5
  const latest = (Array.isArray(data) ? [...data] : [])
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <section className="dash-card">
      <div className="dash-card-header">
        <h2>Latest Bookings</h2>
        <Link href="/Admin/BookingShow" className="view-all-link">
          View all
        </Link>
      </div>

      {isLoading ? (
        <p className="latest-message">Loading bookings...</p>
      ) : latest.length === 0 ? (
        <p className="latest-message">No bookings yet.</p>
      ) : (
        <div className="latest-list">
          {latest.map((booking) => (
            <div className="latest-row" key={booking.id}>
              <div className="latest-main">
                <span className="latest-package">{booking.package}</span>
                <span className="latest-sub">
                  {booking.team_number} {booking.team_number === 1 ? "person" : "people"}
                </span>
              </div>

              <div className="latest-col">
                <span className="latest-sub">Agent</span>
                <span>{booking.agents?.name ?? "—"}</span>
              </div>

              <div className="latest-col">
                <span className="latest-sub">Customer</span>
                <span className="latest-email">{booking.user_email}</span>
              </div>

              <div className="latest-col">
                <span className="latest-sub">Booked on</span>
                <span>{formatDate(booking.created_at)}</span>
              </div>

              <span className={`status-badge ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>

              <Link
                href="/Admin/BookingShow"
                className="latest-arrow"
                aria-label="Open bookings"
              >
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
