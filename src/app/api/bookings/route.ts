
import { NextResponse } from "next/server";
import { bookingSchema } from "@/features/bookings/schemas";
import { createClient } from "@/app/utils/supabase/server";


export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please sign in to view your bookings." },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch bookings:", error);

      return NextResponse.json(
        { error: "Could not retrieve bookings." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected bookings API error:", error);

    return NextResponse.json(
      { error: "Unexpected error while retrieving bookings." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your booking details." },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please sign in before booking." },
        { status: 401 }
      );
    }

    // Retrieve the real package price from the database.
    const { data: tourPackage, error: packageError } =
      await supabase
        .from("tour_packages")
        .select("id, price")
        .eq("id", input.tour_package_id)
        .maybeSingle();

    if (packageError) {
      console.error("Package lookup failed:", packageError);

      return NextResponse.json(
        { error: "Could not check the selected package." },
        { status: 500 }
      );
    }

    if (!tourPackage) {
      return NextResponse.json(
        { error: "The selected package was not found." },
        { status: 404 }
      );
    }

    const pricePerPerson = Number(tourPackage.price);

    if (!Number.isFinite(pricePerPerson) || pricePerPerson < 0) {
      return NextResponse.json(
        { error: "The package price is invalid." },
        { status: 500 }
      );
    }

    // Reject invalid or past travel dates.
    const travelDate = new Date(
      `${input.travel_date}T00:00:00`
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(travelDate.getTime()) ||
      travelDate.toISOString().slice(0, 10) !== input.travel_date ||
      travelDate < today
    ) {
      return NextResponse.json(
        { error: "Choose a valid date today or in the future." },
        { status: 400 }
      );
    }

    const totalPrice =
      pricePerPerson * input.number_of_travellers;

    const { data: booking, error: insertError } =
      await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          tour_package_id: tourPackage.id,
          traveller_name: input.traveller_name,
          email: input.email,
          phone: input.phone,
          travel_date: input.travel_date,
          number_of_travellers: input.number_of_travellers,
          price_per_person: pricePerPerson,
          total_price: totalPrice,
          status: "pending",
        })
        .select("id")
        .single();

    if (insertError || !booking) {
      console.error("Booking insert failed:", insertError);

      return NextResponse.json(
        { error: "Could not save the booking. Check your database columns and permissions." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Booking request saved.",
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected booking API error:", error);

    return NextResponse.json(
      { error: "Unexpected error while creating the booking." },
      { status: 500 }
    );
  }
}
