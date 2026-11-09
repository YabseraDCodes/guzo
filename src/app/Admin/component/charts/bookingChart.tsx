"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BookingChart() {
  const { data: bookingData } = useSWR("/api/bookinGet", fetcher);

  const bookings = Array.isArray(bookingData) ? bookingData : [];

  const countMonth = (month: number, status: string) =>
    bookings.filter(
      (item: any) =>
        new Date(item.travel_date).getMonth() + 1 === month &&
        item.status === status
    ).length;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = months.map((name, i) => ({
    month: name,
    pending: countMonth(i + 1, "pending"),
    completed: countMonth(i + 1, "completed"),
    cancelled: countMonth(i + 1, "cancelled"),
  }));

  return (
    <section className="dash-card">
      <div className="dash-card-header">
        <h2>Bookings per Month</h2>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4ebe6" />
          <XAxis dataKey="month" stroke="#718078" tickLine={false} />
          <YAxis allowDecimals={false} stroke="#718078" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#172b25", border: "none", borderRadius: 8, color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" />

          <Line type="monotone" dataKey="pending" name="Pending" stroke="#5b9bff" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="completed" name="Completed" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
