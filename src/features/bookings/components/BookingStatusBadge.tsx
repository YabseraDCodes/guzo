
import type { BookingStatus } from "@/tyoes/booking";
const styles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

export default function BookingStatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
//it is for booking ststus 
//it give if the booking is pending , confirmed, ....