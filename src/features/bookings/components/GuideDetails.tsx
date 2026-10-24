
interface GuideDetailsProps {
  guideName?: string | null;
  guidePhone?: string | null;
  languages?: string[] | null;
}

export default function GuideDetails({
  guideName,
  guidePhone,
  languages,
}: GuideDetailsProps) {
  return (
    <section className="space-y-2 rounded-xl border p-5">
      <h2 className="details">Guide details</h2>

      {guideName ? (
        <>
          <p><strong>Guide:</strong> {guideName}</p>

          {guidePhone && (
            <p><strong>Contact:</strong> {guidePhone}</p>
          )}

          {languages?.length ? (
            <p>
              <strong>Languages:</strong> {languages.join(", ")}
            </p>
          ) : null}
        </>
      ) : (
        <p className="assignment">
          Guide assignment is pending confirmation from the agency.
        </p>
      )}
    </section>
  );
}
