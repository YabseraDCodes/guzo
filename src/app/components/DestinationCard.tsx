interface Destination {
  name: string;
  description: string;
  image: string;
}

interface DestinationCardProps {
  region: string;
  description: string;
  image: string;
  attractions: Destination[];
}

export default function DestinationCard({
  region,
  description,
  image,
  attractions,
}: DestinationCardProps) {
  return (
    <section className="region-card">
      <div className="region-image">
        <img src={image} alt={region} />
      </div>

      <div className="region-content">
        <h2>{region}</h2>
        <p>{description}</p>

        <h3>Popular Attractions</h3>

        <ul className="attraction-list">
          {attractions.map((attraction) => (
            <li key={attraction.name} className="attraction-item">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="attraction-image"
              />
              <div>
                <h4>{attraction.name}</h4>
                <p>{attraction.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
