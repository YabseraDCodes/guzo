import { z } from "zod";
//uses Zod to validate booking data, define the booking confirmation structure, and collect form errors.
export const bookingSchema = z.object({
  agent_id: z
    .string()
    .min(1, "Please select a tour agent.")
    .regex(/^\d+$/, "Please select a valid tour agent.")
    .transform(Number)
    .pipe(z.number().int().positive("Please select a valid tour agent.")),
  user_name: z
    .string()
    .trim()
    .min(1, "Enter your name."),
  user_email: z.string().trim().email("Enter a valid email address."),
  user_phone: z.string().trim().regex(
    /^\+[1-9]\d{6,14}$/,
    "Enter a valid international phone number starting with +."
  ),
  team_number: z
    .string()
    .regex(
      /^[1-9]\d*$/,
      "Enter a whole number of travelers between 1 and 12."
    )
    .refine(
      (value) => Number(value) <= 12,
      "A booking cannot have more than 12 travelers."
    )
    .transform(Number)
    .pipe(
      z
        .number()
        .int()
        .min(1, "Enter at least one traveler.")
        .max(12, "A booking cannot have more than 12 travelers.")
    ),
  package: z.string().trim().min(1, "Please select a tour package."),
  
travel_date: z
  .string()
  .min(1, "Please select your travel date.")
  .refine((value) => {
    let year: number;
    let month: number;
    let day: number;

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      [year, month, day] = value.split("-").map(Number);
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      [month, day, year] = value.split("/").map(Number);
    } else {
      return false;
    }

    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }, "Choose a valid travel date.")
  .refine((value) => {
    let year: number;
    let month: number;
    let day: number;

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      [year, month, day] = value.split("-").map(Number);
    } else {
      [month, day, year] = value.split("/").map(Number);
    }

    const travelDate = new Date(year, month - 1, day);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return travelDate >= today;
  }, "Travel date cannot be in the past."),

});

export const bookingConfirmationSchema = z.object({
  booking_id: z.string(),
  user_name: z.string(),
  user_email: z.string(),
  user_phone: z.string(),
  team_number: z.number(),
  package: z.string(),
  agent_name: z.string(),
  travel_date: z.string(),
});

export type BookingField = keyof z.input<typeof bookingSchema>;
export type BookingConfirmation = z.infer<typeof bookingConfirmationSchema>;

export function getBookingFieldErrors(
  error: z.ZodError,
): Partial<Record<BookingField, string>> {
  const fieldErrors: Partial<Record<BookingField, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || !(field in bookingSchema.shape)) continue;

    const bookingField = field as BookingField;
    if (!fieldErrors[bookingField]) fieldErrors[bookingField] = issue.message;
  }

  return fieldErrors;
}
