
import { BookingForm } from "./BookingForm";
import { createClient } from "@/app/utils/supabase/server";

type BookingSearchParams = {
  destinationId?: string | string[];
  agentId?: string | string[];
  packageName?: string | string[];
};

type UnknownRecord = Record<string, unknown>;

type SelectedDestination = {
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
  if (!packageName) return null;

  const requestedName = packageName.trim().toLowerCase();
  const selected = Array.isArray(packages)
    ? packages.find(
        (item) =>
          isRecord(item) &&
          getString(item.name).toLowerCase() === requestedName &&
          item.is_active !== false
      )
    : isRecord(packages)
      ? packages[
          Object.keys(packages).find(
            (key) => key.toLowerCase() === requestedName
          ) ?? ""
        ]
      : null;

  if (!isRecord(selected)) return null;

  const price = Number(selected.price);

  if (
    !Number.isFinite(price) ||
    price < 0
  ) {
    return null;
  }

  const hotelDetails = isRecord(selected.hotel_details)
    ? selected.hotel_details
    : {};
  const hotel = isRecord(selected.hotel) ? selected.hotel : hotelDetails;

  const rawRating = Number(selected.hotel_ranking ?? hotel.ranking);
  const hotelRating = Number.isFinite(rawRating)
    ? Math.max(0, Math.min(5, Math.round(rawRating)))
    : 0;

  return {
    name: getString(selected.name) || requestedName,
    price,
    duration: getString(selected.duration),
    hotelDescription:
      getString(selected.hotel_description) || getString(hotel.description),
    hotelRating,
  };
}

export default async function BookingsContent({
  searchParams,
}: {
  searchParams: Promise<BookingSearchParams>;
}) {
  const selected = await searchParams;

  const initialDestinationId = firstValue(selected.destinationId);
  const initialAgentId = firstValue(selected.agentId);
  const requestedPackageName = firstValue(selected.packageName);

  let initialAgentName = "";
  let initialPackage: SelectedPackage | null = null;
  let initialDestination: SelectedDestination | null = null;

  if (/^\d+$/.test(initialDestinationId) && /^\d+$/.test(initialAgentId)) {
    const supabase = await createClient();

    // Booking links carry a destination ID and an agency ID. Resolve them
    // through the same normalized tour relations used by /api/tours; the
    // legacy agents.destination_id column is not present in this database.
    const { data: tours, error: tourError } = await supabase
      .from("tours")
      .select(`
        destination:destinations (
          id, name, description, image_urls, location, category
        ),
        agency:agencies_test (
          id, name
        ),
        packages:packages_test (
          name, price, duration, hotel_description, hotel_ranking,
          hotel_details, is_active
        )
      `)
      .eq("destination_id", Number(initialDestinationId));

    if (tourError) {
      throw new Error(
        `Unable to load the selected tour: ${tourError.message}`
      );
    }

    const matchingTour = (tours ?? []).find((tour) => {
      const agency = Array.isArray(tour.agency) ? tour.agency[0] : tour.agency;
      return isRecord(agency) && String(agency.id) === initialAgentId;
    });

    if (matchingTour) {
      const agency = Array.isArray(matchingTour.agency)
        ? matchingTour.agency[0]
        : matchingTour.agency;
      const destination = Array.isArray(matchingTour.destination)
        ? matchingTour.destination[0]
        : matchingTour.destination;

      if (isRecord(agency)) initialAgentName = getString(agency.name);
      if (isRecord(destination)) {
        initialDestination = {
          name: getString(destination.name),
          description: getString(destination.description),
          image: getFirstImage(destination.image_urls),
          location: getString(destination.location),
          category: getString(destination.category),
        };
      }
      initialPackage = getSelectedPackage(
        matchingTour.packages,
        requestedPackageName
      );
    }
  }

  return (
    <BookingForm
      initialAgentId={initialAgentId}
      initialAgentName={initialAgentName}
      initialPackageName={requestedPackageName}
      initialPackage={initialPackage}
      initialDestination={initialDestination}
    />
  );
}
