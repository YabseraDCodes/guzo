"use client";
import useSWR from "swr";
import { CalendarCheck, Users, MapPin } from "lucide-react";
import { fetcher } from "@/lib/fetcher";

export default function StatCards() {
  const { data: bookings } = useSWR("/api/bookinGet", fetcher);
  const { data: agents } = useSWR("/api/adminagent", fetcher);
  const { data: tours } = useSWR("/api/tours", fetcher);

  // show "—" while loading (or if a request failed)
  const count = (list: unknown) => (Array.isArray(list) ? list.length : "—");

  const cards = [
    { label: "Total Bookings", value: count(bookings), icon: CalendarCheck },
    { label: "Agents", value: count(agents), icon: Users },
    { label: "Destinations", value: count(tours), icon: MapPin },
  ];

  return (
    <div className="stat-row">
      {cards.map(({ label, value, icon: Icon }) => (
        <div className="stat-card" key={label}>
          <span className="stat-icon">
            <Icon size={24} />
          </span>
          <div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
