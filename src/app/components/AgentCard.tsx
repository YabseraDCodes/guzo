import PackageCard from "./PackageCard";

type Package = {
    price: number;
    duration: string;
    hotel: {
        ranking: number;
        description: string;
        image?: string;
    };
    includes: string[];
    itinerary: {
        day: string;
        title: string;
        description: string;
    }[];
};

type Agent = {
    id: number;
    destination_id: number;
    name: string;
    description: string;
    rating: number;
    packages: {
        golden: Package;
        silver: Package;
        economy: Package;
    };
    contact_info: string;
};

export default function AgentCard({
    agent,
}: {
    agent: Agent;
}) {
    return (
        <article>
            <h3>{agent.name}</h3>

            <p>{agent.description}</p>
            <p>⭐ {agent.rating}</p>
            <p>Contact: {agent.contact_info}</p>

            <div>
                {Object.entries(agent.packages).map(
                    ([packageName, pkg]) => (
                        <PackageCard
                            key={packageName}
                            packageName={packageName}
                            pkg={pkg}
                        />
                    )
                )}
            </div>
        </article>
    );
}
