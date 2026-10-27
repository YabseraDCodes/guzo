export type Attraction = {
  name: string;
  description: string;
};

export type Country = {
  id: number;
  name: string;
  slug: string;
  region: string;
  capital: string;
  short_description: string;
  description: string;
  languages: string[];
  currency: string;
  best_time_to_visit: string;
  time_zone: string;
  cover_image_url: string;
  hero_image_url: string;
  attractions: Attraction[];
  travel_tips: string[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};