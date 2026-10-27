import { Suspense } from "react";
import DestinationDetailPage from "@/app/components/DestinationDetailCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function DestinationContent({ params }: PageProps) {
  const { slug } = await params;
  return <DestinationDetailPage slug={slug} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<p>Loading destination...</p>}>
      <DestinationContent params={params} />
    </Suspense>
  );
}
