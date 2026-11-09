"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// same colors as the line chart
const STATUSES = [
  { key: "pending", label: "Pending", color: "#5b9bff" },
  { key: "completed", label: "Completed", color: "#22c55e" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
];

export default function StatusDonut() {
  const { data: bookingData } = useSWR("/api/bookinGet", fetcher);

  const bookings = Array.isArray(bookingData) ? bookingData : [];
  const total = bookings.length;

  const rows = STATUSES.map((s) => ({
    ...s,
    value: bookings.filter((b: any) => b.status === s.key).length,
  }));

  // with no bookings, draw an empty grey ring instead of nothing
  const chartData = total === 0 ? [{ label: "None", value: 1, color: "#e4ebe6" }] : rows;

  return (
    <section className="dash-card">
      <div className="dash-card-header">
        <h2>Bookings by Status</h2>
      </div>

      <div className="donut-wrapper">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={total === 0 ? 0 : 2}
              stroke="none"
            >
              {chartData.map((item) => (
                <Cell key={item.label} fill={item.color} />
              ))}
            </Pie>
            {total > 0 && <Tooltip />}
          </PieChart>
        </ResponsiveContainer>

        <div className="donut-center">
          <strong>{total}</strong>
          <span>Bookings</span>
        </div>
      </div>

      <ul className="status-legend">
        {rows.map((row) => (
          <li key={row.key}>
            <span className="legend-dot" style={{ background: row.color }} />
            <span className="legend-label">{row.label}</span>
            <span className="legend-value">
              {row.value}
              <small>{total ? Math.round((row.value / total) * 100) : 0}%</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
