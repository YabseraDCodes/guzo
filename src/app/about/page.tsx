
export default function AboutPage() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <p className="eyebrow">THE STORY BEHIND GUZO</p>
        <h1>
          Discover Africa. <em>Live the journey.</em>
        </h1>
        <p>
          GUZO is a travel discovery platform designed to help travelers
          explore Africa's remarkable destinations, cultures, and
          experiences.
        </p>
      </section>

      <section className="info-content">
        <h2>Explore beyond the familiar</h2>
        <p>
          From Ethiopia's ancient heritage to spectacular wildlife,
          historic cities, and beautiful coastlines, GUZO helps you
          discover places worth experiencing.
        </p>
        <a className="info-button" href="/countries">
          Discover Africa →
        </a>
      </section>
    </main>
  );
}
