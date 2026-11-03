export type DestinationPackage = {
  id: number;
  price: number;
  duration: string;
  hotel: {
    name?: string;
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

export type DestinationAgency = {
  id: number;
  name: string;
  slug?: string;
  description: string | null;
  rating: number | null;
  contact_info: string | null;
  packages: Record<string, DestinationPackage>;
};

export type Destination = {
  id: number;
  name: string;
  description: string;
  image_urls: string[];
  location: string;
  slug: string;
  country_id: number;
  category: string;
  countries: {
    name: string;
  } | null;
  agency?: DestinationAgency | null;
};



export type Country = {
  name: string;
};

export type Tour = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_urls: string[];
  location: string;
  category: string;
  country_id: number;
  countries: Country;
  destination: Destination;
  agency: Agency;
};

export type Agency = {
  id: number;
  name: string;
  slug: string;
  rating: number;
  description: string;
  contact_info: string;
  packages: Packages;
};

export type Packages = {
  golden: Package;
  silver: Package;
  economy: Package;
};

export type Package = {
  id: number;
  price: number;
  duration: string;
  hotel: Hotel;
  includes: string[];
  itinerary: Itinerary[];
};

export type Hotel = {
  name: string;
  image: string;
  ranking: number;
  description: string;
};

export type Itinerary = {
  day: string;
  title: string;
  description: string;
};