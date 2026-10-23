import { Suspense } from "react";
import TourDetailClient from "./TourDetailClient ";

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading tour details...</p>}>
      <TourContent params={params} />
    </Suspense>
  );
}

async function TourContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <TourDetailClient slug={slug} />;
}
