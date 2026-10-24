
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Booking {
  id: number;
  user_id: string;
  tour_package_id: number;
  traveller_name: string;
  email: string;
  phone: string;
  travel_date: string;
  number_of_travellers: number;
  price_per_person: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
}

export interface TourPackageSummary {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration_days: number;
  agent_id: number;
}

export interface BookingWithPackage extends Booking {
  tourPackage: TourPackageSummary | null;
}
