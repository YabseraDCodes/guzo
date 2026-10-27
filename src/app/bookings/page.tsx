import { BookingForm } from "./BookingForm";
import { createClient } from "@/app/utils/supabase/server";
import "./booking.css";

export const instant = false;

type BookingSearchParams = {
  agentId?: string | string[];
  packageName?: string | string[];
};

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getPackagePrice(packages: unknown, packageName: string): number | null {
  if (!isRecord(packages)) return null;

  const selectedPackage = packages[packageName.toLowerCase()];
  if (!isRecord(selectedPackage)) return null;

  const price = selectedPackage.price;
  return typeof price === "number" && Number.isFinite(price) && price >= 0
    ? price
    : null;
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<BookingSearchParams>;
}) {
  const selected = await searchParams;
  const initialAgentId = firstValue(selected.agentId);
  const initialPackageName = firstValue(selected.packageName);
  let initialAgentName = "";
  let initialPackagePrice: number | null = null;

  if (/^\d+$/.test(initialAgentId)) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("agents")
      .select("name, packages")
      .eq("id", Number(initialAgentId))
      .maybeSingle();

    if (error) {
      throw new Error(`Unable to load the selected tour agent: ${error.message}`);
    }

    initialAgentName = data?.name ?? "";
    initialPackagePrice = getPackagePrice(data?.packages, initialPackageName);
  }

  return (
    <BookingForm
      initialAgentId={initialAgentId}
      initialAgentName={initialAgentName}
      initialPackageName={initialPackageName}
      initialPackagePrice={initialPackagePrice}
    />
  );
}
