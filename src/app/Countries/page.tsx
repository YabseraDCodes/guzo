
const countryCards = [
  {
    slug: "ethiopia",
    name: "Ethiopia",
    region: "East Africa",
    description: "Ancient history, dramatic mountains, and living traditions.",
    image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/df968d0f7_generated_02e14c4b.png",
  },
  {
    slug: "kenya",
    name: "Kenya",
    region: "East Africa",
    description: "Legendary safaris, wildlife, and beautiful coastlines.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    region: "East Africa",
    description: "Extraordinary wildlife, Mount Kilimanjaro, and Zanzibar.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "North Africa",
    description: "Colorful markets, historic cities, and desert adventures.",
    image: "https://unsplash.com/s/photos/marrakech-morocco?utm_source=chatgpt.com",
  },
  {
    slug: "egypt",
    name: "Egypt",
    region: "North Africa",
    description: "The pyramids, the Nile, and ancient civilizations.",
    image: "https://images.squarespace-cdn.com/content/v1/678ca078123ed24a1feccd8a/d47dff75-262c-4861-955a-f19a18b34320/Table-Mountain-Cape-Town.jpg?format=1500w",
  },
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Southern Africa",
    description: "Wildlife, coastlines, and vibrant cities.",
    image: "https://images.squarespace-cdn.com/content/v1/678ca078123ed24a1feccd8a/d47dff75-262c-4861-955a-f19a18b34320/Table-Mountain-Cape-Town.jpg?format=1500w",
  },
  {
    slug: "tunisia",
    name: "Tunisia",
    region: "North Africa",
    description: "Mediterranean beaches, historic towns, and desert scenery.",
    image: "https://www.smu.tn/storage/app/media/international%20programs/Study%20in%20Tunisia/Tunisia%20-%20Sidi%20Bou%20Saiid.jpg",
  },
  {
    slug: "algeria",
    name: "Algeria",
    region: "North Africa",
    description: "Historic cities and vast Sahara landscapes.",
    image: "https://media1.thrillophilia.com/filestore/2z2mbwf80dhllysr2yovmsxfr602_Victoria_Falls_83e6e0fdfd.jpg",
  },
  {
    slug: "zambia",
    name: "Zambia",
    region: "Southern Africa",
    description: "Spectacular waterfalls, rivers, and wildlife.",
    image: "https://media1.thrillophilia.com/filestore/2z2mbwf80dhllysr2yovmsxfr602_Victoria_Falls_83e6e0fdfd.jpg",
  },
];

export default function CountriesPage() {
  return (
    <main className="country-page">
      <section className="country-hero">
        <p className="eyebrow">NINE COUNTRIES, ENDLESS STORIES</p>
        <h1>
          Discover <em>Africa.</em>
        </h1>
        <p>Choose a country to explore its destinations and experiences.</p>

        <div className="country-grid">
          {countryCards.map((country) => (
            <a
              className="country-card"
              href={`/countries/${country.slug}`}
              key={country.slug}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(12, 28, 21, 0.95), rgba(12, 28, 21, 0.08)), url("${country.image}")`,
              }}
            >
              <span className="country-region">{country.region}</span>
              <h2>{country.name}</h2>
              <p>{country.description}</p>
              <span className="country-card-link">
                Explore country ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
