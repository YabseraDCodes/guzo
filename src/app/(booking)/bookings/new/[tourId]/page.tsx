
import { Suspense } from "react";
import { notFound } from "next/navigation";
import BookingForm from "@/components/forms/BookingForm";
import { createClient } from "@/app/utils/supabase/server";

interface PageProps {
  params: Promise<{ tourId: string }>;
}

export default function NewBookingPage({ params }: PageProps) {
  return (
    <main className="booking tour">
      <h1 className="booking">Book your tour</h1>
      <Suspense
        fallback={
          <p role="loading tour">
            Loading tour details...
          </p>
        }
      >
        <BookingContent params={params} />
      </Suspense>
    </main>
  );
}

async function BookingContent({ params }: PageProps) {
  const { tourId } = await params;
  const packageId = Number(tourId);

  if (
    !Number.isSafeInteger(packageId) ||
    packageId <= 0
  ) {
    notFound();
  }

  const supabase = await createClient();

  const { data: tourPackage, error } = await supabase
    .from("tour_packages")
    .select("id, name, description, price, duration_days")
    .eq("id", packageId)
    .maybeSingle();

  if (error) {
    console.error("Package lookup failed:", error);
    throw new Error("Could not load this tour package.");
  }

  if (!tourPackage) {
    notFound();
  }

  return (
    <>
      <section className="package name">
        <h2 className="tourpackage">{tourPackage.name}</h2>

        {tourPackage.description && (
          <p className="tourpackage">{tourPackage.description}</p>
        )}

        <p className="mt-3">
          <strong>Price per person:</strong> {Number(tourPackage.price)}
        </p>

        <p>
          <strong>Duration:</strong> {tourPackage.duration_days} days
        </p>
      </section>
      <BookingForm tourPackageId={tourPackage.id} />
    </>
  );
}
