import { createClient } from "@/app/utils/supabase/server";

export async function getTourismData() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tours")
        .select(`
            id,
            name,
            slug,
            description,
            image,
            destination:destinations (
                id,
                name,
                description,
                image_urls,
                location,
                category,
                country_id,
                slug,
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
        .order("name")
        .limit(100);

    if (error) {
        console.error("Tourism data error:", error.message);
        throw new Error("Unable to retrieve tourism information.");
    }

    const tours = (data ?? []).map((record) => {

        // Supabase returns these relationships as arrays.
        // Our current application expects one destination and agency per tour.
        const destination = record.destination?.[0] ?? null;
        const agency = record.agency?.[0] ?? null;

        const country = destination?.countries?.[0] ?? null;

        const packages = (record.packages ?? [])
            .filter((pkg) => pkg.is_active !== false)
            .map((pkg) => {
                const hotel = pkg.hotel_details ?? {};

                return {
                    id: pkg.id,
                    name: pkg.name,
                    description: pkg.description,
                    price: pkg.price,
                    duration: pkg.duration,

                    hotel: {
                        name: pkg.hotel_name ?? hotel.name ?? "",
                        image: pkg.hotel_image ?? hotel.image ?? "",
                        ranking: pkg.hotel_ranking ?? hotel.ranking ?? null,
                        description:
                            pkg.hotel_description ??
                            hotel.description ??
                            "",
                    },

                    includes: pkg.includes ?? [],
                    itinerary: pkg.itinerary ?? [],
                };
            });

        return {
            id: record.id,
            name: record.name,
            slug: record.slug,
            description: record.description ?? destination?.description ?? "",
            image: record.image,

            destination: destination
                ? {
                    id: destination.id,
                    name: destination.name,
                    description: destination.description,
                    location: destination.location,
                    category: destination.category,
                    country: country?.name ?? "Unknown",
                    country_id: destination.country_id,
                    slug: destination.slug,
                    image_urls: destination.image_urls,
                }
                : null,

            agency: agency
                ? {
                    id: agency.id,
                    name: agency.name,
                    slug: agency.slug,
                    description: agency.description,
                    rating: agency.rating,
                    contact_info: agency.contact_info,
                }
                : null,

            packages,
        };
    });

    return { tours };
}