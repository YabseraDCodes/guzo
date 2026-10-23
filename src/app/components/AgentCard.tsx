import PackageCard from "./PackageCard";
import "./AgentCard.css";

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
        <article className="agent-card">
            <header className="agent-card-header">
                <div className="agent-info">
                    <span className="agent-label">TOUR OPERATOR</span>

                    <h3>{agent.name}</h3>

                    <p className="agent-description">
                        {agent.description}
                    </p>
                </div>

                <div className="agent-rating">
                    <span>★</span>
                    <strong>{agent.rating}</strong>
                    <small>Rating</small>
                </div>
            </header>

            <div className="agent-contact">
                <span className="agent-contact-icon">✉</span>
                <div>
                    <small>Contact the agent</small>
                    <p>{agent.contact_info}</p>
                </div>
            </div>

            <div className="agent-packages-heading">
                <div>
                    <h4>Choose Your Experience</h4>
                    <p>Find the package that suits your journey.</p>
                </div>
            </div>

            <div className="agent-packages">
                {Object.entries(agent.packages).map(
                    ([packageName, pkg]) => (
                        <PackageCard
                            key={packageName}
                            packageName={packageName}
                            pkg={pkg}
                            agentId={agent.id}
                            destinationId={agent.destination_id}
                        />
                    )
                )}
            </div>
        </article>
    );
}
