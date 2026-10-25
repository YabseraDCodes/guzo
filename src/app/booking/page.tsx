import { notFound, redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { getTourBySlug } from "../../../lib/tour-data";

interface PageProps {
  searchParams: Promise<{
    tour?: string | string[];
  }>;
}

export default async function BookingPage({
  searchParams,
}: PageProps) {
  const { tour: tourSlug } = await searchParams;

  if (typeof tourSlug !== "string") {
    notFound();
  }

  const tour = getTourBySlug(tourSlug);

  if (!tour) {
    notFound();
  }

  const supabase = await createClient();
  const { data: tourPackage, error } = await supabase
    .from("tour_packages")
    .select("id")
    .eq("name", tour.title)
    .maybeSingle();

  if (error) {
    console.error("Tour package lookup failed:", error);
    throw new Error("Could not load this tour package.");
  }

  if (!tourPackage) {
    notFound();
  }

  redirect(`/bookings/new/${tourPackage.id}`);
}
//This page takes the tour the traveler selected, finds its matching package in Supabase, and sends them to the correct booking form.