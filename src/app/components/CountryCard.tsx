import Link from "next/link";
import "./CountryCard.css";
import type { Country } from "@/types/country";

type CountryCardProps = {
  country: Country;
  toursCount: number;
};

export default function CountryCard({
  country, toursCount
}: CountryCardProps) {  
  return (
    <Link href={`/Countries/${country.slug}`}>
      <article className="country-listing-card">
        <div className="country-listing-card-image">
          <img
            src={country.cover_image_url}
            alt={country.name}
            loading="lazy"
          />

          <div className="country-listing-card-image-overlay" />

          {country.is_featured && (
            <span className="country-listing-card-featured">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              Featured
            </span>
          )}

          <span className="country-listing-card-region">
            {country.region}
          </span>
        </div>

        <div className="country-listing-card-body">
          <div className="country-listing-card-heading">
            <h3>{country.name}</h3>

            <span
              className="country-listing-card-accent"
              aria-hidden="true"
            />
          </div>

          <p className="country-listing-card-description">
            {country.short_description}
          </p>

          <div className="country-listing-card-footer">
            <div className="country-listing-card-tour-info">
              <span
                className="country-listing-card-tour-icon"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9.5 20v-6h5v6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span>
                <strong>{toursCount}</strong>{" "}
                {toursCount === 1 ? "tour" : "tours"}
                {" "}available
              </span>
            </div>

            <span
              className="country-listing-card-arrow"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
