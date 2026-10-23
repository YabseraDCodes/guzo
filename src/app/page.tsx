


const destinations = [
  {
    name: "Morocco",
    region: "North Africa",
    description: "Explore colorful souks, ancient medinas, and the Sahara Desert.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/morocco",
    number: "01",
  },
  {
    name: "Egypt",
    region: "North Africa",
    description: "Discover the pyramids, the Nile, and thousands of years of history.",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/egypt",
    number: "02",
  },
  {
    name: "Tunisia",
    region: "North Africa",
    description: "Experience Mediterranean beaches, historic towns, and desert scenery.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/tunisia",
    number: "03",
  },
  {
    name: "South Africa",
    region: "Southern Africa",
    description: "Enjoy beautiful coastlines, wildlife, and unforgettable road trips.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/south-africa",
    number: "04",
  },
  {
    name: "Algeria",
    region: "North Africa",
    description: "Explore ancient cities and the vast landscapes of the Sahara.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/algeria",
    number: "05",
  },
  {
    name: "Kenya",
    region: "East Africa",
    description: "Discover spectacular wildlife, open savannahs, and tropical beaches.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/kenya",
    number: "06",
  },
  {
    name: "Tanzania",
    region: "East Africa",
    description: "Experience the Serengeti, Mount Kilimanjaro, and Zanzibar.",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/tanzania",
    number: "07",
  },
  {
    name: "Zambia",
    region: "Southern Africa",
    description: "Discover Victoria Falls, rivers, and incredible wildlife.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
    slug: "/countries/zambia",
    number: "08",
  },
  {
    name: "Ethiopia",
    region: "East Africa",
    description: "Discover rock-hewn churches, ancient history, and dramatic mountains.",
    image: "https://media.base44.com/images/public/6ad6842892d30e872fdb2f0c/df968d0f7_generated_02e14c4b.png",
    slug: "/countries/ethiopia",
    number: "09",
  },
];


export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Guzo home">
          GUZO<span>.</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-active" href="/">Home</a>
          <a href="/destinations">Destinations</a>
          <a href="/tours">Tours</a>
          <a href="/about">About</a>
        </nav>

        <a className="header-cta" href="/destinations">
          Explore Africa <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span /> YOUR JOURNEY BEGINS HERE
          </p>

          <h1>
            Find your way
            <br />
            to <em>wonder.</em>
          </h1>

          <p className="hero-description">
            Ancient wonders, breathtaking landscapes, and living
            traditions. Discover Africa, one unforgettable journey at a time.
          </p>

          <form className="search-panel" action="/destinations">
            <label className="search-field">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="search-input-wrap">
                <span className="field-label">WHERE TO?</span>
                <input
                  type="search"
                  name="search"
                  placeholder="Search destinations"
                  aria-label="Search destinations"
                />
              </span>
            </label>
            <button type="submit" className="search-button">
              Explore <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="hero-note">
            <span aria-hidden="true">✳</span>Made for the curious. Rooted in Africa.
            
          </p>
        </div>

        <div className="hero-caption">
          <span>AFRICA · A WORLD OF ADVENTURE</span>
          <span>9°36&apos;N 40°29&apos;E</span>
        </div>
      </section>

      <section className="intro-section">
        <div>
          <p className="eyebrow"><span /> THE GUZO EXPERIENCE</p>
          <h2>
            Not just a destination.
            <br />
            <em>A whole new perspective.</em>
          </h2>
        </div>
        <p className="intro-copy">
          find the places, people, and experiences that make Africa extraordinary.
        </p>
      </section>

      <section className="destinations-section" id="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> PLACES TO DISCOVER</p>
            <h2>Find your <em>somewhere.</em></h2>
          </div>
          <a className="text-link" href="/destinations">
            All destinations <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <a
              className="destination-card"
              href={destination.slug}
              key={destination.number}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
              />
              <div className="card-shade" />
              <span className="card-number">{destination.number}</span>
              <div className="card-content">
                <span className="card-region">{destination.region}</span>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <span className="card-link" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="closing-banner">
        <p className="eyebrow"><span /> THE WORLD IS WIDE</p>
        <h2>Your next story starts <em>here.</em></h2>
        <a className="banner-button" href="/tours">
          Find your journey <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/">
          GUZO<span>.</span>
        </a>
        <p>Discover Afica. Live the Journey.</p>
        <span>Made for the curious · Africa</span>
      </footer>
    </main>
  );
}
