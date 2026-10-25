
import type { Booking } from "@/tyoes/booking";

interface Props {
  booking: Booking;
}

export default function TravellerDetails({ booking }: Props) {
  return (
    <section className="travel-information">
      <h2 className="information">Traveller details</h2>

      <p><strong>Name:</strong> {booking.traveller_name}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Phone:</strong> {booking.phone}</p>
    </section>
  );
}
//it display traveler information 

