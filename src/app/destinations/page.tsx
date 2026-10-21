import DestinationCard from "../components/DestinationCard";
import { images } from "../components/images";

const regions = [
{
region: "Amhara",
description:
"Discover Ethiopia's historic landmarks, breathtaking mountains, and ancient cultural heritage.",
image: images.heroLalibela,
attractions: [
{
name: "Lalibela",
description:
"Explore the remarkable rock-hewn churches carved into solid stone.",
image: images.heroLalibela,
},
{
name: "Gondar Castle",
description:
"Visit the historic royal castles and palaces of Ethiopia's former imperial capital.",
image: images.heroLalibela,
},
{
name: "Simien Mountains",
description:
"Experience dramatic mountain landscapes, wildlife, and scenic hiking trails.",
image: images.simien,
},
{
name: "Lake Tana",
description:
"Discover Ethiopia's largest lake and its historic island monasteries.",
image: images.heroLalibela,
},
],
},
{
region: "Tigray",
description:
"Explore ancient civilizations, historic ruins, and churches built into dramatic cliffs.",
image: images.axum,
attractions: [
{
name: "Axum",
description:
"Explore the historical heritage of the ancient Kingdom of Axum.",
image: images.axum,
},
{
name: "Rock-Hewn Churches of Tigray",
description:
"Discover ancient churches located among the region's rugged mountains.",
image: images.axum,
},
],
},
{
region: "Afar",
description:
"Discover extraordinary geological formations and dramatic desert landscapes.",
image: images.danakil,
attractions: [
{
name: "Danakil Depression",
description:
"Discover remarkable volcanic landscapes, colorful mineral formations, and salt flats.",
image: images.danakil,
},
],
},
{
region: "Oromia",
description:
"Experience beautiful lakes, green landscapes, wildlife, and Ethiopia's natural wonders.",
image: images.simien,
attractions: [
{
name: "Bale Mountains National Park",
description:
"Explore highland scenery, unique wildlife, and beautiful hiking routes.",
image: images.simien,
},
{
name: "Lake Langano",
description:
"Relax beside the lake and enjoy the surrounding natural scenery.",
image: images.omo,
},
],
},
{
region: "Harari",
description:
"Walk through historic streets and experience the unique culture and architecture of Harar.",
image: images.axum,
attractions: [
{
name: "Harar Jugol",
description:
"Explore the historic walled city, its narrow streets, and traditional houses.",
image: images.axum,
},
],
},
{
region: "Southern Ethiopia",
description:
"Discover diverse cultures, extraordinary landscapes, and the traditions of southern Ethiopia.",
image: images.omo,
attractions: [
{
name: "Omo Valley",
description:
"Discover the region's cultural diversity, traditions, and landscapes.",
image: images.omo,
},
{
name: "Coffee Experiences",
description:
"Learn about Ethiopia's coffee culture and traditional coffee ceremonies.",
image: images.coffee,
},
],
},
];

export default function DestinationsPage() {
  return (
    <main className="destinations-page">
      <section className="destinations-hero">
        <p className="eyebrow">DISCOVER ETHIOPIA</p>
        <h1>Explore Destinations by Region</h1>
        <p>
          From ancient historical landmarks to breathtaking natural landscapes,
          discover the places that make Ethiopia extraordinary.
        </p>
      </section>

      <section className="regions-container">
        {regions.map((region) => (
          <DestinationCard
            key={region.region}
            region={region.region}
            description={region.description}
            image={region.image}
            attractions={region.attractions}
          />
        ))}
      </section>
    </main>
  );
}
