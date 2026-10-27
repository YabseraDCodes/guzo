export type Tour = {
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
  };
};