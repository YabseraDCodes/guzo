import { createClient } from "@/app/utils/supabase/server";

export async function getTourismData() {
    const supabase = await createClient();

    const [destinationsResult, agentsResult] = await Promise.all([
        supabase
            .from("destinations")
            .select(`
                id,
                name,
                description,
                location,
                category,
                country_id,
                countries(name)
            `)
            .order("name"),

        supabase
            .from("agents")
            .select("*")
            .order("name"),
    ]);

    if (destinationsResult.error) {
        throw new Error(
            `Failed to retrieve destinations: ${destinationsResult.error.message}`
        );
    }

    if (agentsResult.error) {
        throw new Error(
            `Failed to retrieve agencies: ${agentsResult.error.message}`
        );
    }

    return {
        destinations: destinationsResult.data ?? [],
        agencies: agentsResult.data ?? [],
    };
}