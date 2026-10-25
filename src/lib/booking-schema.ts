import { z } from "zod";

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
  user_phone: z.string().trim().min(1, "Enter your phone number."),
  team_number: z
    .string()
    .regex(/^[1-9]\d*$/, "Enter a whole number of travelers greater than zero.")
    .transform(Number)
    .pipe(z.number().int().positive("Enter at least one traveler.")),
  package: z.string().trim().min(1, "Please select a tour package."),
});

export const bookingConfirmationSchema = z.object({
  booking_id: z.string(),
  user_name: z.string(),
  user_email: z.string(),
  user_phone: z.string(),
  team_number: z.number(),
  package: z.string(),
  agent_name: z.string(),
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
