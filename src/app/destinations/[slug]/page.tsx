import DestinationDetailPage from "@/app/components/DestinationDetailCard";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  return <DestinationDetailPage slug={slug} />;
}