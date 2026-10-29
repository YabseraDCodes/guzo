import { Suspense } from "react";
import BookingsContent from "./BookingsContent";
import "./booking.css";

export default function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    agentId?: string | string[];
    packageName?: string | string[];
  }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="booking-page">
          <section className="booking-panel" aria-live="polite">
            <p>Loading your selected tour and package...</p>
          </section>
        </main>
      }
    >
      <BookingsContent searchParams={searchParams} />
    </Suspense>
  );
}