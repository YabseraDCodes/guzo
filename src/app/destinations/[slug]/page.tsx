import { Suspense } from "react";
import DestinationDetailClient from "./DestinationDetailClient";

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading destination details...</p>}>
      <DestinationContent params={params} />
    </Suspense>
  );
}

async function DestinationContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <DestinationDetailClient slug={slug} />;
}
