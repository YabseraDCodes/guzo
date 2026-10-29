import type { BookingField } from "@/lib/booking-schema";



type Props = {
  fieldErrors: Partial<Record<BookingField, string>>;
  teamNumber: string;
  onTeamNumberChange: (value: string) => void;
  onFieldChange: (field: BookingField) => void;
  travelDate: string;
  onTravelDateChange: (value: string) => void;
};

export function BookingFormFields({
  fieldErrors,
  teamNumber,
  onTeamNumberChange,
  onFieldChange,
  travelDate,
  onTravelDateChange,
}: Props) {
  return (
    <>
      <label>
        Full name
        <input
          name="user_name"
          autoComplete="name"
          placeholder="Your name"
          required
          aria-invalid={Boolean(fieldErrors.user_name)}//indicates whether the field has an error.
          aria-describedby={fieldErrors.user_name ? "booking-user-name-error" : undefined} //connects the field to its error message.
          onChange={() => onFieldChange("user_name")}
        />
        {fieldErrors.user_name && <span className="booking-field-error" id="booking-user-name-error">{fieldErrors.user_name}</span>}
      </label>

      <div className="booking-field-row">
        <label>
          Email address
          <input
            name="user_email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            aria-invalid={Boolean(fieldErrors.user_email)}
            aria-describedby={fieldErrors.user_email ? "booking-user-email-error" : undefined}
            onChange={() => onFieldChange("user_email")}
          />
          {fieldErrors.user_email && <span className="booking-field-error" id="booking-user-email-error">{fieldErrors.user_email}</span>}
        </label>
        <label>
          Phone number
          <input
            name="user_phone"
            type="tel"
            autoComplete="tel"
            placeholder="+251912345678"
            pattern="\+[1-9][0-9]{6,14}"
            title="Enter an international phone number starting with +"
            required
            aria-invalid={Boolean(fieldErrors.user_phone)}
            aria-describedby={
              fieldErrors.user_phone
                ? "booking-user-phone-error"
                : "booking-phone-hint"
            }
            onChange={() => onFieldChange("user_phone")}
          />
          {fieldErrors.user_phone ? (
            <span
              className="booking-field-error"
              id="booking-user-phone-error"
            >
              {fieldErrors.user_phone}
            </span>
          ) : (
            <span className="booking-field-hint" id="booking-phone-hint">
              Include your country code, starting with +.
            </span>
          )}
        </label>
      </div>

      <label className="booking-team-field">
        Number of travelers
        <span className="booking-field-hint">
          Groups can include 1–12 travelers.
        </span>
        <input
          name="team_number"
          type="number"
          min="1"
          max="12"
          step="1"
          value={teamNumber}
          required
          aria-invalid={Boolean(fieldErrors.team_number)}
          aria-describedby={fieldErrors.team_number ? "booking-team-number-error" : undefined}
          onChange={(event) => {
            onTeamNumberChange(event.target.value);
            onFieldChange("team_number");
          }}
        />
        {fieldErrors.team_number && <span className="booking-field-error" id="booking-team-number-error">{fieldErrors.team_number}</span>}
      </label>

      <label className="booking-date-field">
        <span className="booking-date-label">
          Preferred travel date
        </span>

        <span className="booking-date-hint">
          When would you like your journey to begin?
        </span>

        <input
          className="booking-date-input"
          type="date"
          name="travel_date"
          value={travelDate}
          min={new Date().getFullYear() + "-" +
            String(new Date().getMonth() + 1).padStart(2, "0") + "-" +
            String(new Date().getDate()).padStart(2, "0")}
          required
          aria-invalid={Boolean(fieldErrors.travel_date)}
          aria-describedby={
            fieldErrors.travel_date
              ? "booking-travel-date-error"
              : "booking-travel-date-hint"
          }
          onChange={(event) => {
            onTravelDateChange(event.target.value);
            onFieldChange("travel_date");
          }}
        />

        {fieldErrors.travel_date ? (
          <span
            className="booking-field-error"
            id="booking-travel-date-error"
          >
            {fieldErrors.travel_date}
          </span>
        ) : (
          <span
            className="booking-date-note"
            id="booking-travel-date-hint"
          >
            Your tour agent can help finalize the itinerary.
          </span>
        )}
      </label>

    </>
  );
}
