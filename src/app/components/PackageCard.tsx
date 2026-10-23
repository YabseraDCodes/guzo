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

export default function PackageCard({
    packageName,
    pkg,
}: {
    packageName: string;
    pkg: Package;
}) {
    return (
        <section>
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
            
            <button
                type="button"
                onClick={() => {
                    // TODO: Navigate to the bookings page.
                    // Pass the destination ID, agent ID, and package name.
                    // Coordinate the route with the bookings page implementation.
                }}
            >
                Book this package
            </button>
        </section>
    );
}
