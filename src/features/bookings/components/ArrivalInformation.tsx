
interface ArrivalInformationProps {
  meetingPoint?: string | null;
  arrivalTime?: string | null;
  instructions?: string | null;
}

export default function ArrivalInformation({
  meetingPoint,
  arrivalTime,
  instructions,
}: ArrivalInformationProps) {
  return (
    <section className="arrive-info">
      <h2 className="arrive">
        Arrival information
      </h2>

      <p>
        <strong>Meeting point:</strong>{" "}
        {meetingPoint ?? "Awaiting agency confirmation"}
      </p>

      <p>
        <strong>Arrival time:</strong>{" "}
        {arrivalTime ?? "To be provided by the agency"}
      </p>

      <p>
        <strong>Instructions:</strong>{" "}
        {instructions ??
          "Check this page again after your booking is confirmed."}
      </p>
    </section>
  );
}
