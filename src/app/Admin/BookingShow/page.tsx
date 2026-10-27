
"use client";
import {fetcher} from "@/lib/fetcher"
import { useState } from "react";
import useSWR from "swr";
import { RefreshCw } from "lucide-react";
import "./bookingShow.css";

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
  agents?: {
    name: string;
  } | null;
};

const filters = ["All", "Pending", "Confirmed", "Cancelled"];



export default function BookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const {
    data: bookings = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Booking[]>("/api/bookinGet", fetcher, {
    revalidateOnFocus: true,
  });

  const filteredBookings = bookings.filter((booking) => {
    return (
      activeFilter === "All" ||
      booking.status.toLowerCase() === activeFilter.toLowerCase()
    );
  });

  function formatDate(value: string) {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "confirmed";
      case "cancelled":
        return "cancelled";
      default:
        return "pending";
    }
  }

  return (
    <section className="bookings-page">
      <div className="bookings-heading">
        <h2>All Bookings</h2>

        <button
          className="refresh-button"
          onClick={() => mutate()}
          disabled={isValidating}
          type="button"
        >
          <RefreshCw
            size={14}
            className={isValidating ? "spinning" : ""}
          />
          Refresh
        </button>
      </div>

      <div className="bookings-toolbar">
        <div className="booking-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-button ${
                activeFilter === filter ? "selected" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="bookings-message error-message">
          <p>{error.message}</p>
          <button type="button" onClick={() => mutate()}>
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <div className="bookings-message">
          Loading bookings...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bookings-message">
          No bookings found.
        </div>
      ) : (
        <div className="bookings-table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Agent ID</th>
                <th>Team Size</th>
                <th>Package</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <span className="tracking-id">
                      {booking.id}
                    </span>
                  </td>

                  <td>
                    <div className="traveller-name">
                      {booking.user_name}
                    </div>
                    <div className="traveller-email">
                      {booking.user_email}
                    </div>
                    <div className="traveller-phone">
                      {booking.user_phone}
                    </div>
                  </td>

                  <td>{booking.agents?.name}</td>

                  <td>{booking.team_number}</td>

                  <td>
                    <span className="package-name">
                      {booking.package}
                    </span>
                  </td>

                  <td className="booking-date">
                    {formatDate(booking.created_at)}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bookings-count">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      )}
    </section>
  );
}
