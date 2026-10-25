
import type { BookingWithPackage } from "@/tyoes/booking";

interface Props {
  booking: BookingWithPackage;
}

export default function BookingSummary({ booking }: Props) {
  return (
    <section className="summary">
      <h2 className="booking-summary">Booking summary</h2>

      <p><strong>Reference:</strong> GUZO-{booking.id}</p>
      <p>
        <strong>Package:</strong>{" "}
        {booking.tourPackage?.name ?? "Package details unavailable"}
      </p>
      <p><strong>Travel date:</strong> {booking.travel_date}</p>
      <p><strong>Travellers:</strong> {booking.number_of_travellers}</p>
      <p><strong>Price per person:</strong> {booking.price_per_person}</p>
      <p><strong>Total price:</strong> {booking.total_price}</p>
    </section>
  );
}
//it show the traveler summary of booking total price , how many people are go, tour place