import { createClient } from "@/app/utils/supabase/server";

function relationArray(value: any): any[] {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

export async function getTourismData() {
    const supabase = await createClient();

    // Retrieve each main catalog source independently.
    const [
        countriesResult,
        destinationsResult,
        toursResult,
        agenciesResult,
        legacyAgentsResult,
    ] = await Promise.all([
        supabase
            .from("countries")
            .select("*")
            .order("name"),

        supabase
            .from("destinations")
            .select(`
                *,
                countries ( name )
            `)
            .order("name"),

        supabase
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
                    slug,
                    description,
                    location,
                    category,
                    country_id,
                    image_urls,
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
            .limit(200),

        supabase
            .from("agencies_test")
            .select("*")
            .order("name"),

        supabase
            .from("agents")
            .select(`
                id,
                name,
                description,
                destination_id,
                contact_info,
                packages,
                rating,
                destinations (
                    id,
                    name,
                    countries ( name )
                )
            `)
            .order("name"),
    ]);

    const sourceErrors: string[] = [];

    const results = [
        ["countries", countriesResult],
        ["destinations", destinationsResult],
        ["tours", toursResult],
        ["agencies_test", agenciesResult],
        ["agents", legacyAgentsResult],
    ] as const;

    for (const [source, result] of results) {
        if (result.error) {
            console.error(
                `GUZO AI: Failed to retrieve ${source}:`,
                result.error.message
            );

            sourceErrors.push(source);
        }
    }

    const countries = countriesResult.data ?? [];

    // Keep every destination and normalize its country relationship.
    const destinations = (destinationsResult.data ?? []).map(
        (destination: any) => {
            const country = relationArray(destination.countries)[0] ?? null;

            return {
                ...destination,
                country: country?.name ?? "Unknown",
            };
        }
    );

    // Preserve every destination, agency and package relationship.
    const tours = (toursResult.data ?? []).map((tour: any) => ({
        ...tour,

        destinations: relationArray(tour.destination),

        agencies: relationArray(tour.agency),

        packages: relationArray(tour.packages)
            .filter((pkg: any) => pkg.is_active !== false)
            .map((pkg: any) => {
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
                        ranking:
                            pkg.hotel_ranking ?? hotel.ranking ?? null,
                        description:
                            pkg.hotel_description ??
                            hotel.description ??
                            "",
                    },

                    includes: pkg.includes ?? [],
                    itinerary: pkg.itinerary ?? [],
                };
            }),
    }));

    const agencies = agenciesResult.data ?? [];

    const legacyAgents = (legacyAgentsResult.data ?? []).map(
        (agent: any) => ({
            ...agent,
            destinations: relationArray(agent.destinations),
        })
    );

    const totalRecords =
        countries.length +
        destinations.length +
        tours.length +
        agencies.length +
        legacyAgents.length;

    if (totalRecords === 0 && sourceErrors.length > 0) {
        throw new Error(
            `Unable to retrieve GUZO catalog data. Failed sources: ${sourceErrors.join(", ")}`
        );
    }

    return {
        countries,
        destinations,
        tours,
        agencies,
        legacyAgents,

        sourceStatus: {
            countries: !countriesResult.error,
            destinations: !destinationsResult.error,
            tours: !toursResult.error,
            agencies: !agenciesResult.error,
            legacyAgents: !legacyAgentsResult.error,
        },

        sourceErrors,
    };
}
