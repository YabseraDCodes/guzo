export const instant = false;
import { requireAdmin } from "@/lib/auth/require-admin";
import StatCards from "./component/overview/statCards";
import BookingChart from "./component/charts/bookingChart";
import StatusDonut from "./component/charts/paiChart";
import LatestBookings from "./component/overview/latestBookings";
import "./overview.css";

export default async function AdminOverviewPage() {
  await requireAdmin();

  return (
    <section className="overview-page">
      <StatCards />

      <div className="chart-row">
        <BookingChart />
        <StatusDonut />
      </div>

      <LatestBookings />
    </section>
  );
}
