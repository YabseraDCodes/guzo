import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // A tour belongs to one destination and one agency. Packages belong to the tour.
  const { data, error } = await supabase
    .from("tours")
    .select(`
      id,
      name,
      slug,
      description,
      image,
      created_at,
      destination:destinations (
        id,
        name,
        description,
        image_urls,
        location,
        category,
        country_id,
        countries ( name )
      ),
      agency:agencies_test (
        id,
        name,
        slug,
        description,
        rating,
        contact_info
      ),
      packages:packages_test (
        id,
        name,
        description,
        price,
        duration,
        hotel_name,
        hotel_image,
        hotel_ranking,
        hotel_description,
        hotel_details,
        includes,
        itinerary,
        is_active
      )
    `)
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const tours = (data ?? []).map((tour) => {
    const destination = tour.destination;
    const agency = tour.agency;

    // Keep the current UI contract while exposing the new relational data.
    const packages = Object.fromEntries(
      (tour.packages ?? [])
        .filter((pkg) => pkg.is_active !== false)
        .map((pkg) => {
          const hotel = pkg.hotel_details ?? {};
          return [pkg.name.toLowerCase(), {
            id: pkg.id,
            price: Number(pkg.price),
            duration: pkg.duration ?? "",
            hotel: {
              name: pkg.hotel_name ?? hotel.name ?? "",
              image: pkg.hotel_image ?? hotel.image ?? "",
              ranking: Number(pkg.hotel_ranking ?? hotel.ranking ?? 0),
              description: pkg.hotel_description ?? hotel.description ?? "",
            },
            includes: Array.isArray(pkg.includes) ? pkg.includes : [],
            itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
          }];
        })
    );

    return {
      id: tour.id,
      name: tour.name,
      slug: tour.slug,
      description: tour.description ?? destination?.description ?? "",
      image_urls: destination?.image_urls ?? (tour.image ? [tour.image] : []),
      location: destination?.location ?? destination?.name ?? "",
      category: destination?.category ?? "",
      country_id: destination?.country_id,
      countries: destination?.countries ?? null,
      destination,
      agency: agency ? { ...agency, packages } : null,
    };
  });

  return NextResponse.json(tours);
}
