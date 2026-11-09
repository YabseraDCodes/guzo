"use client";
import { useState } from "react";
import useSWR from "swr";
import { Star } from "lucide-react";
import { fetcher } from "@/lib/fetcher";
import "./leaderboard.css";

type Agent = {
  id: number;
  name: string;
  rating: number | null;
  image?: string | null;
};

type Booking = {
  agent_id: number;
  status: string;
};

type SortKey = "bookings" | "rating";

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortKey>("bookings");

  const { data: agents, error: agentsError, isLoading: agentsLoading } =
    useSWR<Agent[]>("/api/agents", fetcher);
  const { data: bookings, error: bookingsError, isLoading: bookingsLoading } =
    useSWR<Booking[]>("/api/bookinGet", fetcher);

  const agentList = Array.isArray(agents) ? agents : [];
  const bookingList = Array.isArray(bookings) ? bookings : [];

  // one row per agent (agents with 0 bookings are included).
  // cancelled bookings are not counted.
  const rows = agentList.map((agent) => ({
    id: agent.id,
    name: agent.name,
    image: agent.image,
    rating: Number(agent.rating) || 0,
    bookings: bookingList.filter(
      (b) => b.agent_id === agent.id && b.status !== "cancelled"
    ).length,
  }));

  // sort by the chosen column; if tied, use the other column
  rows.sort((a, b) =>
    sortBy === "bookings"
      ? b.bookings - a.bookings || b.rating - a.rating
      : b.rating - a.rating || b.bookings - a.bookings
  );

  const isLoading = agentsLoading || bookingsLoading;
  const error = agentsError || bookingsError;

  return (
    <section className="leader-page">
      <div className="agents-heading">
        <div>
          <h1>Leaderboard</h1>
          <p>See which agents get the most bookings and the best ratings.</p>
        </div>

        <div className="leader-sort">
          <button
            type="button"
            className={sortBy === "bookings" ? "selected" : ""}
            onClick={() => setSortBy("bookings")}
          >
            Most bookings
          </button>
          <button
            type="button"
            className={sortBy === "rating" ? "selected" : ""}
            onClick={() => setSortBy("rating")}
          >
            Highest rating
          </button>
        </div>
      </div>

      {error ? (
        <p className="packages-message">Failed to load the leaderboard.</p>
      ) : isLoading ? (
        <p className="packages-message">Loading leaderboard...</p>
      ) : rows.length === 0 ? (
        <p className="packages-message">No agents yet.</p>
      ) : (
        <div className="leader-table-wrapper">
          <table className="leader-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Agent</th>
                <th className={sortBy === "rating" ? "sorted" : ""}>Rating</th>
                <th className={sortBy === "bookings" ? "sorted" : ""}>Bookings</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <span className={`rank-badge rank-${index + 1}`}>
                      {index + 1}
                    </span>
                  </td>

                  <td>
                    <div className="leader-agent">
                      {row.image ? (
                        <img src={row.image} alt="" className="leader-logo" />
                      ) : (
                        <span className="leader-logo leader-initial">
                          {row.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <span className="leader-name">{row.name}</span>
                    </div>
                  </td>

                  <td className={sortBy === "rating" ? "sorted" : ""}>
                    <span className="leader-rating">
                      <Star size={15} />
                      {row.rating.toFixed(1)}
                    </span>
                  </td>

                  <td className={sortBy === "bookings" ? "sorted" : ""}>
                    <strong>{row.bookings}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
