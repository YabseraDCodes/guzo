
import type { Booking } from "@/tyoes/booking";

interface Props {
  booking: Booking;
}

export default function TravellerDetails({ booking }: Props) {
  return (
    <section className="space-y-2 rounded-xl border p-5">
      <h2 className="text-xl font-semibold">Traveller details</h2>

      <p><strong>Name:</strong> {booking.traveller_name}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Phone:</strong> {booking.phone}</p>
    </section>
  );
}
