"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", bookings: 20 },
  { month: "Feb", bookings: 20 },
  { month: "Mar", bookings: 15 },
  { month: "Apr", bookings: 30 },
  { month: "May", bookings: 25 },
  { month: "Jun", bookings: 40 },
];

export default function BookingChart() {
  return (
    <div className="w-full p-5 bg-white">
      <h2 className="text-xl font-bold text-black mb-4">
        Monthly Bookings
      </h2>

      <LineChart
        width={600}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="bookings"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}