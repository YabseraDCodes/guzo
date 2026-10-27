import type { BookingField } from "@/lib/booking-schema";



type Props = {
  fieldErrors: Partial<Record<BookingField, string>>;
  teamNumber: string;
  onTeamNumberChange: (value: string) => void;
  onFieldChange: (field: BookingField) => void;
};

export function BookingFormFields({
  fieldErrors,
  teamNumber,
  onTeamNumberChange,
  onFieldChange,
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
            placeholder="+251 ..."
            required
            aria-invalid={Boolean(fieldErrors.user_phone)}
            aria-describedby={fieldErrors.user_phone ? "booking-user-phone-error" : undefined}
            onChange={() => onFieldChange("user_phone")}
          />
          {fieldErrors.user_phone && <span className="booking-field-error" id="booking-user-phone-error">{fieldErrors.user_phone}</span>}
        </label>
      </div>

      <label className="booking-team-field">
        Number of travelers
        <input
          name="team_number"
          type="number"
          min="1"
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
    </>
  );
}
