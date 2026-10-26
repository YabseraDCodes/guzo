import type { BookingField } from "@/lib/booking-schema";

export type Agent = {
  id: number;
  name: string;
};

export type Tour = {
  id: number;
  name: string;
};

type Props = {
  agents: Agent[];
  tours: Tour[];
  isLoadingOptions: boolean;
  selectedAgentId: string;
  fieldErrors: Partial<Record<BookingField, string>>;
  onAgentChange: (agentId: string) => void;
  onFieldChange: (field: BookingField) => void;
};

export function BookingFormFields({
  agents,
  tours,
  isLoadingOptions,
  selectedAgentId,
  fieldErrors,
  onAgentChange,
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

      <div className="booking-field-row">
        <label>
          Tour package
          <select
            name="package"
            defaultValue=""
            required
            disabled={isLoadingOptions || !tours.length}
            aria-invalid={Boolean(fieldErrors.package)}
            aria-describedby={fieldErrors.package ? "booking-package-error" : undefined}
            onChange={() => onFieldChange("package")}
          >
            <option value="" disabled>
              {isLoadingOptions ? "Loading packages..." : "Select a package"}
            </option>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.name}>{tour.name}</option>
            ))}
          </select>
          {fieldErrors.package && <span className="booking-field-error" id="booking-package-error">{fieldErrors.package}</span>}
        </label>
        <label>
          Tour agent
          <select
            name="agent_id"
            value={selectedAgentId}
            required
            disabled={isLoadingOptions || !agents.length} // it see the agency list is still loading and - there are no agencies available by using or condition
            aria-invalid={Boolean(fieldErrors.agent_id)} //indicates whether the field has an error.
            aria-describedby={fieldErrors.agent_id ? "booking-agent-id-error" : undefined} //connects the field to its error message.
            onChange={(event) => onAgentChange(event.target.value)}
          >
            <option value="" disabled>
              {isLoadingOptions ? "Loading agents..." : "Select an agent"}//it is for tour agent box show
            </option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>
          {fieldErrors.agent_id && <span className="booking-field-error" id="booking-agent-id-error">{fieldErrors.agent_id}</span>}
          {/* //this part displays an error message only fieldErrors.agent_id have error */}
        </label>
      </div>

      <label className="booking-team-field">
        Number of travelers
        <input
          name="team_number"
          type="number"
          min="1"
          step="1"
          defaultValue="2"
          required
          aria-invalid={Boolean(fieldErrors.team_number)}
          aria-describedby={fieldErrors.team_number ? "booking-team-number-error" : undefined}
          onChange={() => onFieldChange("team_number")}
        />
        {fieldErrors.team_number && <span className="booking-field-error" id="booking-team-number-error">{fieldErrors.team_number}</span>}
      </label>
    </>
  );
}
