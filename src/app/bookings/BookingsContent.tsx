
import { BookingForm } from "./BookingForm";
import { createClient } from "@/app/utils/supabase/server";

type BookingSearchParams = {
  agentId?: string | string[];
  packageName?: string | string[];
};

type UnknownRecord = Record<string, unknown>;

type SelectedTour = {
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
};

type SelectedPackage = {
  name: string;
  price: number;
  duration: string;
  hotelDescription: string;
  hotelRating: number;
};

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function isRecord(value: unknown): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getFirstImage(value: unknown): string {
  if (!Array.isArray(value)) return "";

  const image = value.find(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0
  );

  return image?.trim() ?? "";
}

function getSelectedPackage(
  packages: unknown,
  packageName: string
): SelectedPackage | null {
  if (!isRecord(packages) || !packageName) return null;

  const requestedName = packageName.trim().toLowerCase();

  const matchingKey = Object.keys(packages).find(
    (key) => key.toLowerCase() === requestedName
  );

  if (!matchingKey) return null;

  const selected = packages[matchingKey];

  if (!isRecord(selected)) return null;

  const price = selected.price;

  if (
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return null;
  }

  const hotel = isRecord(selected.hotel) ? selected.hotel : {};

  const rawRating = Number(hotel.ranking);
  const hotelRating = Number.isFinite(rawRating)
    ? Math.max(0, Math.min(5, Math.round(rawRating)))
    : 0;

  return {
    name: matchingKey,
    price,
    duration: getString(selected.duration),
    hotelDescription: getString(hotel.description),
    hotelRating,
  };
}

export default async function BookingsContent({
  searchParams,
}: {
  searchParams: Promise<BookingSearchParams>;
}) {
  const selected = await searchParams;

  const initialAgentId = firstValue(selected.agentId);
  const requestedPackageName = firstValue(selected.packageName);

  let initialAgentName = "";
  let initialPackage: SelectedPackage | null = null;
  let initialTour: SelectedTour | null = null;

  if (/^\d+$/.test(initialAgentId)) {
    const supabase = await createClient();

    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("id, name, destination_id, packages")
      .eq("id", Number(initialAgentId))
      .maybeSingle();

    if (agentError) {
      throw new Error(
        `Unable to load the selected tour agent: ${agentError.message}`
      );
    }

    if (agent) {
      initialAgentName = agent.name ?? "";

      initialPackage = getSelectedPackage(
        agent.packages,
        requestedPackageName
      );

      if (agent.destination_id != null) {
        const { data: destination, error: destinationError } =
          await supabase
            .from("destinations")
            .select(
              "id, name, description, image_urls, location, category"
            )
            .eq("id", agent.destination_id)
            .maybeSingle();

        if (destinationError) {
          throw new Error(
            `Unable to load the assigned tour: ${destinationError.message}`
          );
        }

        if (destination) {
          initialTour = {
            name: getString(destination.name),
            description: getString(destination.description),
            image: getFirstImage(destination.image_urls),
            location: getString(destination.location),
            category: getString(destination.category),
          };
        }
      }
    }
  }

  return (
    <BookingForm
      initialAgentId={initialAgentId}
      initialAgentName={initialAgentName}
      initialPackageName={requestedPackageName}
      initialPackage={initialPackage}
      initialTour={initialTour}
    />
  );
}
