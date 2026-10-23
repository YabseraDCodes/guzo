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

export default function AgentCard({ agent }: { agent: Agent }) {
    return (
        <article>
            <h3>{agent.name}</h3>

            <p>{agent.description}</p>
            <p>⭐ {agent.rating}</p>
            <p>Contact: {agent.contact_info}</p>

            <div>
                {Object.entries(agent.packages).map(
                    ([packageName, pkg]) => (
                        <section key={packageName}>
                            <h4>{packageName} Package</h4>

                            <p>${pkg.price}</p>
                            <p>Duration: {pkg.duration}</p>

                            <div>
                                <h5>Hotel</h5>

                                <p>
                                    Rating: {"⭐".repeat(
                                        Math.max(
                                            0,
                                            Math.min(
                                                5,
                                                Number(pkg.hotel.ranking) || 0
                                            )
                                        )
                                    )}
                                </p>

                                <p>{pkg.hotel.description}</p>

                                {pkg.hotel.image && (
                                    <img
                                        src={pkg.hotel.image}
                                        alt={`${packageName} package hotel`}
                                    />
                                )}
                            </div>

                            <div>
                                <h5>What's Included</h5>

                                <ul>
                                    {pkg.includes.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h5>Itinerary</h5>

                                <ol>
                                    {pkg.itinerary.map((day, index) => (
                                        <li key={index}>
                                            <p>
                                                {day.day}: {day.title}
                                            </p>

                                            <p>{day.description}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </section>
                    )
                )}
            </div>
        </article>
    );
}
