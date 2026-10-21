
import destinationsData from "../data/destinations.json";
import toursData from "../data/tours.json"

export type Destination = {
  slug: string;
  name: string;
  region: string;
  description: string;
  image: string;
  highlights: string[];
};

export type TourItineraryItem = {
  day: string;
  title: string;
  description: string;
};

export type Tour = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  category: string;
  itinerary: TourItineraryItem[];
  includes: string[];
};

const destinations: Destination[] =
  destinationsData as Destination[];

const tours: Tour[] = toursData as Tour[];

export function getDestinations(): Destination[] {
  return destinations;
}

export function getDestinationBySlug(
  slug: string
): Destination | undefined {
  return destinations.find(
    (destination) => destination.slug === slug
  );
}

export function getTours(): Tour[] {
  return tours;
}

export function getTourBySlug(
  slug: string
): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getToursByDestination(
  destination: Destination
): Tour[] {
  const destinationName = destination.name.toLowerCase();

  return tours.filter((tour) => {
    const tourDestination = tour.destination
      .split(",")[0]
      .trim()
      .toLowerCase();

    return tourDestination === destinationName;
  });
}
