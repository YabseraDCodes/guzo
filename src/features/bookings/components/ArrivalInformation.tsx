
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
    <section className="space-y-2 rounded-xl border p-5">
      <h2 className="text-xl font-semibold">
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
