import Link from "next/link";
import { images } from "./components/images";

const featuredDestinations = [
{
name: "Lalibela",
region: "AMHARA",
description: "Discover the extraordinary rock-hewn churches of Ethiopia.",
image: images.heroLalibela,
},
{
name: "Simien Mountains",
region: "AMHARA",
description: "Explore dramatic mountain landscapes and incredible wildlife.",
image: images.simien,
},
{
name: "Danakil Depression",
region: "AFAR",
description: "Experience one of the world's most extraordinary landscapes.",
image: images.danakil,
},
];

export default function Home() {
return ( <main className="home-page">
<section
className="home-hero"
style={{ backgroundImage: `url(${images.heroLalibela})` }}
> <div className="hero-overlay"> <div className="hero-content"> <span className="hero-label">YOUR JOURNEY BEGINS HERE</span>
        <h1>
  Discover ኢትዮጵያ
  <br />
  <span>Live the Journey.</span>
</h1>


        <p>
          From ancient wonders to breathtaking landscapes, discover the
          beauty, culture, and unforgettable experiences of Ethiopia.
        </p>

        <div className="hero-actions">
          <Link href="/destinations" className="button button-gold">
            Explore Destinations <span>→</span>
          </Link>

          <Link href="/tours" className="button button-outline">
            Discover Tours
          </Link>
        </div>

        <div className="hero-note">
          <span className="hero-note-line" />
          <span>ONE COUNTRY. A THOUSAND STORIES.</span>
        </div>
      </div>
    </div>
  </section>

  <section className="home-intro section-padding">
    <div className="intro-heading">
      <span className="section-eyebrow">WELCOME TO GUZO</span>

      <h2>
        Ethiopia is waiting
        <br />
        <span>to be discovered.</span>
      </h2>
    </div>

    <div className="intro-description">
      <p>
        GUZO helps you discover the remarkable places, rich traditions,
        and natural beauty that make Ethiopia unique. Find your next
        adventure, explore different regions, and experience the country
        beyond the ordinary.
      </p>

      <Link href="/destinations" className="text-link">
        Explore all destinations <span>↗</span>
      </Link>
    </div>
  </section>

  <section className="featured-section section-padding">
    <div className="section-heading">
      <div>
        <span className="section-eyebrow">PLACES THAT INSPIRE</span>
        <h2>Find your next adventure</h2>
      </div>

      <Link href="/destinations" className="text-link">
        View all destinations <span>→</span>
      </Link>
    </div>

    <div className="featured-grid">
      {featuredDestinations.map((destination, index) => (
        <Link
          href="/destinations"
          className={`featured-card featured-card-${index + 1}`}
          key={destination.name}
        >
          <img src={destination.image} alt={destination.name} />

          <div className="featured-card-overlay">
            <span className="featured-region">{destination.region}</span>
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            <span className="featured-arrow">↗</span>
          </div>
        </Link>
      ))}
    </div>
  </section>

  <section className="why-guzo section-padding">
    <div className="why-heading">
      <span className="section-eyebrow">THE GUZO EXPERIENCE</span>
      <h2>
        More than a destination.
        <br />
        <span>A story worth living.</span>
      </h2>
      <p>
        Travel with curiosity. Connect with culture. Create memories
        that stay with you.
      </p>
    </div>

    <div className="benefits-grid">
      <article className="benefit-card">
        <span className="benefit-number">01</span>
        <span className="benefit-icon">⌖</span>
        <h3>Remarkable Places</h3>
        <p>
          Discover destinations ranging from ancient historical sites
          to spectacular natural landscapes.
        </p>
      </article>

      <article className="benefit-card">
        <span className="benefit-number">02</span>
        <span className="benefit-icon">✳</span>
        <h3>Authentic Culture</h3>
        <p>
          Experience Ethiopia's traditions, heritage, food, and the
          stories of its communities.
        </p>
      </article>

      <article className="benefit-card">
        <span className="benefit-number">03</span>
        <span className="benefit-icon">↗</span>
        <h3>Unforgettable Adventures</h3>
        <p>
          Find inspiration for your next trip and explore experiences
          worth remembering.
        </p>
      </article>
    </div>
  </section>

  <section className="home-cta">
    <div className="cta-content">
      <span className="section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
      <h2>Ready to discover Ethiopia?</h2>
      <p>
        Your next unforgettable journey is closer than you think.
      </p>

      <Link href="/destinations" className="button button-dark">
        Start Exploring <span>→</span>
      </Link>
    </div>
  </section>
</main>

);
}
