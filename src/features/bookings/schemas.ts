
import { z } from "zod";

export const bookingSchema = z.object({
  tour_package_id: z.number().int().positive(),

  traveller_name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(120),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254),

  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30),

  travel_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD."),

  number_of_travellers: z
    .number()
    .int()
    .min(1, "At least one traveller is required.")
    .max(20, "Maximum 20 travellers per booking."),
});

export type BookingInput = z.infer<typeof bookingSchema>;
