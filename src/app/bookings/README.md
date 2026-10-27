# Booking flow

**Updated:** October 27, 2026

This document describes the customer booking flow and its current behavior.

## Booking page and form

- [`PackageCard.tsx`](../components/PackageCard.tsx) links the selected agent
  and package to the booking page through its query parameters.
- [`page.tsx`](./page.tsx) reads those parameters, loads the selected agent's
  name and package price, and passes the booking details to the form.
- [`BookingForm.tsx`](./BookingForm.tsx) is a Client Component because it uses
  React state and client navigation. It validates booking details, shows the
  selected package's per-traveler price and estimated total, then submits the
  booking and navigates to the confirmation page.
- [`BookingFormFields.tsx`](./BookingFormFields.tsx) renders the form inputs and
  field-level validation errors. The traveler count starts at two and updates
  the estimate.
- [`booking.css`](./booking.css) styles the form, selected-package summary, and
  confirmation details.

## Validation and types

- [`booking-schema.ts`](../../lib/booking-schema.ts) defines the Zod schemas
  for booking input and confirmation data, with a helper to map validation
  issues to form fields.
- [`booking.ts`](../../types/booking.ts) defines the TypeScript
  `BookingSubmission` shape used by the POST route. This type is for
  compile-time checking; it does not validate incoming JSON at runtime.

## Submission and confirmation

1. The form validates its fields with Zod and sends valid data to
   `/api/bookingPost`.
2. The POST route saves the booking and returns the database-generated booking
   ID.
3. The form stores the submitted details, booking ID, and estimated total in
   the current browser tab's session storage, then navigates to
   [`confirmation/page.tsx`](./confirmation/page.tsx).
4. The confirmation page validates and displays the saved details and booking
   ID. Confirmation details are available in that tab and session only.

The estimated total is the package price per traveler multiplied by the
traveler count. It is not stored with the booking or charged as a payment.
Booking status lookup and the separate GET endpoint are outside this flow.
