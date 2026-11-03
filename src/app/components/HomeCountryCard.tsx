import Image from "next/image";
import type { Country } from "@/types/country";
import Link from "next/link";

interface HomeCountryCardProps {
  country: Country;
}

export default function HomeCountryCard({
  country,
}: HomeCountryCardProps) {
  return (
    <Link className="country-listing-card" href={`/Countries/${country.slug}`}>
      <Image
        src={country.cover_image_url}
        alt={country.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="country-listing-image"
        priority={false}
      />

      <div className="card-shade" />

      <span className="card-number">{country.id}</span>

      <div className="card-content">
        <span className="card-region">{country.region}</span>
        <h3>{country.name}</h3>
        <p>{country.short_description}</p>
        <span className="card-link" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
