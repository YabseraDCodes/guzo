# Booking work summary

**Date:** October 25, 2026

This document summarizes today's booking-form work and the related files in
`src/lib` and `src/types`.

## Booking page and form

- [`page.tsx`](./page.tsx) loads available agents and tour packages, then passes
  them to the form.
- [`BookingForm.tsx`](./BookingForm.tsx) validates and submits booking data,
  handles submission feedback, and navigates to the confirmation page after a
  successful response.
- [`BookingFormFields.tsx`](./BookingFormFields.tsx) renders the form inputs and
  their field-level validation errors.
- [`booking.css`](./booking.css) styles the booking form and confirmation
  details.

## Validation and types

- [`booking-schema.ts`](../../lib/booking-schema.ts) defines the Zod schemas
  for booking input and confirmation data, along with the helper that maps
  validation issues to form fields.
- [`booking.ts`](../../types/booking.ts) defines the TypeScript
  `BookingSubmission` shape used by the POST route. This type is for
  compile-time checking; it does not validate incoming JSON at runtime.

## Submission and confirmation

1. The form validates its fields with Zod.
2. It sends valid booking data to `/api/bookingPost`.
3. The POST route saves the booking and returns its ID.
4. The form stores the submitted details in the browser tab's session storage
   and navigates to [`confirmation/page.tsx`](./confirmation/page.tsx).
5. The confirmation page validates the stored data and displays the booking ID
   and submitted details. Confirmation details are only available in the same
   tab and session.

The GET endpoint remains separate at
[`bookinGet/route.ts`](../api/bookinGet/route.ts); GET and POST were not
consolidated.
