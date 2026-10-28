import Link from "next/link";
import "./PackageCard.css";

type Package = {
    price: number;
    duration: string;
    hotel: {
        ranking: number;
        description: string;
    };
    includes: string[];
    itinerary: {
        day: string;
        title: string;
        description: string;
    }[];
};

type PackageCardProps = {
    packageName: string;
    pkg: Package;
    agentId: number;
    destinationId: number;
};

const hotelImages: Record<string, string> = {
    golden: "/images/hotels/golden.jpg",
    silver: "/images/hotels/silver.jpg",
    economy: "/images/hotels/economy.jpg",
};

export default function PackageCard({
    packageName,
    pkg,
    agentId,
    destinationId,
}: PackageCardProps) {
    const normalizedPackageName = packageName.toLowerCase();

    const hotelImage =
        hotelImages[normalizedPackageName] ??
        "/images/hotels/economy.jpg";

    const hotelRating = Math.max(
        0,
        Math.min(5, Number(pkg.hotel.ranking) || 0)
    );

    return (
        <article
            className={`package-card package-${normalizedPackageName}`}
        >
            <div className="package-card-top">
                <span className="package-name">
                    {packageName} Package
                </span>

                {normalizedPackageName === "golden" && (
                    <span className="package-popular">
                        PREMIUM CHOICE
                    </span>
                )}
            </div>

            <div className="package-price">
                <span className="package-currency">$</span>
                <strong>{pkg.price.toLocaleString()}</strong>
            </div>

            <p className="package-duration">
                <span aria-hidden="true">◷</span> {pkg.duration}
            </p>

            <div className="package-divider" />

            <section className="package-hotel">
                <h5>Accommodation</h5>

                <div className="package-hotel-image">
                    <img
                        src={hotelImage}
                        alt={`${packageName} package hotel`}
                    />
                </div>

                <div className="package-hotel-rating">
                    <span aria-label={`${hotelRating} out of 5 stars`}>
                        {"★".repeat(hotelRating)}
                        {"☆".repeat(5 - hotelRating)}
                    </span>
                    <small>Hotel rating</small>
                </div>

                <p>{pkg.hotel.description}</p>
            </section>

            <section className="package-inclusions">
                <h5>What's Included</h5>

                <ul>
                    {pkg.includes.map((item, index) => (
                        <li key={index}>
                            <span className="inclusion-check">✓</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <details className="package-itinerary">
                <summary>
                    <span>View itinerary</span>
                    <span className="itinerary-arrow">⌄</span>
                </summary>

                <ol>
                    {pkg.itinerary.map((day, index) => (
                        <li key={index}>
                            <div className="itinerary-day">
                                {day.day}
                            </div>

                            <div className="itinerary-content">
                                <h6>{day.title}</h6>
                                <p>{day.description}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </details>

            <Link
                href={`/bookings?destinationId=${destinationId}&agentId=${agentId}&packageName=${encodeURIComponent(packageName)}`}
                className="package-book-button"
            >
                Book This Package <span aria-hidden="true">→</span>
            </Link>
        </article>
    );
}
