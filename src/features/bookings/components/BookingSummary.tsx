
import type { BookingWithPackage } from "@/tyoes/booking";

interface Props {
  booking: BookingWithPackage;
}

export default function BookingSummary({ booking }: Props) {
  return (
    <section className="space-y-3 rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Booking summary</h2>

      <p><strong>Reference:</strong> GUZO-{booking.id}</p>
      <p>
        <strong>Package:</strong>{" "}
        {booking.tourPackage?.name ?? "Package details unavailable"}
      </p>
      <p><strong>Travel date:</strong> {booking.travel_date}</p>
      <p><strong>Travellers:</strong> {booking.number_of_travellers}</p>
      <p><strong>Price per person:</strong> {booking.price_per_person}</p>
      <p><strong>Total price:</strong> {booking.total_price}</p>

      <p className="text-sm text-gray-500">
        The displayed currency depends on the currency used by your tour package data.
      </p>
    </section>
  );
}
