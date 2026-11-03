import { Suspense } from "react";
import CountryDetail from "@/app/components/CountryDetail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function CountryContent({ params }: PageProps) {
  const { slug } = await params;
  return <CountryDetail slug={slug} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<p>Loading country...</p>}>
      <CountryContent params={params} />
    </Suspense>
  );
}
