

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

  const bookings = bookingData || [];

  
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
    declined: countMonth(i + 1, "cancelled"),
    
  }));

  return (
    <div style={{ background: "#fdfdff", padding: 16, borderRadius: 8 }}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cfcfdf" />
          <XAxis dataKey="month" stroke="#2f2f30" />
          <YAxis allowDecimals={false} stroke="#1e1e1f" />
          <Tooltip
            contentStyle={{ background: "#272729", border: "none", color: "#fff" }}
          />
          <Legend verticalAlign="top" align="right" />

          <Line
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke="#5b9bff"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="declined"
            name="Declined"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


