"use client";

import { useActionState } from "react";
import {
  updateAssignedBookingStatus,
  type BookingStatusActionState,
} from "./actions";

const initialState: BookingStatusActionState = {
  message: null,
  success: false,
};

const statuses = ["pending", "confirmed", "cancelled"] as const;

export default function BookingStatusForm({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateAssignedBookingStatus,
    initialState,
  );
  const normalizedStatus = currentStatus.toLowerCase();
  const selectedStatus = statuses.includes(normalizedStatus as (typeof statuses)[number])
    ? normalizedStatus
    : "pending";

  return (
    <form action={formAction} className="booking-status-form">
      <input type="hidden" name="bookingId" value={bookingId} />
      <label htmlFor={`status-${bookingId}`}>Update status</label>
      <div className="booking-status-controls">
        <select
          id={`status-${bookingId}`}
          name="status"
          defaultValue={selectedStatus}
          disabled={isPending}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save status"}
        </button>
      </div>
      {state.message && (
        <p
          className={`booking-status-message${state.success ? " is-success" : " is-error"}`}
          role={state.success ? "status" : "alert"}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
