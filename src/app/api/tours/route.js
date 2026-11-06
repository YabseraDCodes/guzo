import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // The existing database stores destination catalog records in the tours table.
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
        countries ( name ),
        slug
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

  const destinations = (data ?? []).map((record) => {
    const place = record.destination;
    const agency = record.agency;

    // Keep the current UI contract while exposing the new relational data.
    const packages = Object.fromEntries(
      (record.packages ?? [])
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
      id: record.id,
      name: record.name,
      slug: record.slug,
      description: record.description ?? place?.description ?? "",
      // Tour cover and destination gallery are distinct fields in the source data.
      image: record.image ?? null,
      image_urls: place?.image_urls ?? (record.image ? [record.image] : []),
      location: place?.location ?? place?.name ?? "",
      category: place?.category ?? "",
      country_id: place?.country_id,
      countries: place?.countries ?? null,
      destination: place,
      agency: agency ? { ...agency, packages } : null,
    };
  });

  return NextResponse.json(destinations);
}
