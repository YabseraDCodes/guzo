
import type { BookingStatus } from "@/tyoes/booking";

const steps = [
  {
    key: "pending",
    label: "Booking request received",
  },
  {
    key: "confirmed",
    label: "Booking confirmed by the agency",
  },
  {
    key: "completed",
    label: "Tour completed",
  },
] as const;

export default function BookingTimeline({
  status,
}: {
  status: BookingStatus;
}) {
  if (status === "cancelled") {
    return (
      <p className="rounded-lg bg-red-50 p-4 text-red-800">
        This booking has been cancelled.
      </p>
    );
  }

  const currentIndex =
    status === "completed"
      ? 2
      : status === "confirmed"
        ? 1
        : 0;

  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={step.key} className="flex items-start gap-3">
          <span
            className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
              index <= currentIndex
                ? "bg-emerald-600"
                : "bg-gray-300"
            }`}
          />

          <div>
            <p
              className={
                index <= currentIndex
                  ? "font-semibold"
                  : "text-gray-500"
              }
            >
              {step.label}
            </p>

            {index === currentIndex && (
              <p className="text-sm text-gray-500">
                Current stage
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
