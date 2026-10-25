"use client";

import { useEffect, useState, type FormEvent } from "react";
import { fetcher } from "@/lib/fetcher";
import "./booking.css";

type Agent = {
  id: number;
  name: string;
};

type Tour = {
  id: number;
  name: string;
};

export default function TestBooking() {
  const [result, setResult] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState(false);

  useEffect(() => {
    let isActive = true;

    Promise.all([
      fetcher("/api/agents") as Promise<Agent[]>,
      fetcher("/api/tours") as Promise<Tour[]>,
    ])
      .then(([agentData, tourData]) => {
        if (!isActive) return;
        setAgents(agentData);
        setTours(tourData);
      })
      .catch(() => {
        if (isActive) setOptionsError(true);
      })
      .finally(() => {
        if (isActive) setIsLoadingOptions(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/bookingPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: Number(formData.get("agent_id")),
          user_name: formData.get("user_name"),
          user_email: formData.get("user_email"),
          user_phone: formData.get("user_phone"),
          team_number: formData.get("team_number"),
          package: formData.get("package"),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Your booking could not be saved.");
      }

      setResult({
        message: payload.message || "Your booking was submitted successfully.",
        isError: false,
      });
      form.reset();
      setSelectedAgentId("");
    } catch (error) {
      setResult({
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <section className="booking-panel" aria-labelledby="booking-title">
        <div className="booking-heading">
          <span className="booking-eyebrow">GUZO / YOUR JOURNEY</span>
          <h1 id="booking-title">Make a booking</h1>
          <p>Share a few details and our team will help plan your trip.</p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input name="user_name" autoComplete="name" placeholder="Your name" required />
          </label>

          <div className="booking-field-row">
            <label>
              Email address
              <input name="user_email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              Phone number
              <input name="user_phone" type="tel" autoComplete="tel" placeholder="+251 ..." required />
            </label>
          </div>

          <div className="booking-field-row">
            <label>
              Tour package
              <select name="package" defaultValue="" required disabled={isLoadingOptions || !tours.length}>
                <option value="" disabled>
                  {isLoadingOptions ? "Loading packages..." : "Select a package"}
                </option>
                {tours.map((tour) => (
                  <option key={tour.id} value={tour.name}>{tour.name}</option>
                ))}
              </select>
            </label>
            <label>
              Tour agent
              <select
                name="agent_id"
                value={selectedAgentId}
                required
                disabled={isLoadingOptions || !agents.length}
                onChange={(event) => setSelectedAgentId(event.target.value)}
              >
                <option value="" disabled>
                  {isLoadingOptions ? "Loading agents..." : "Select an agent"}
                </option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="booking-team-field">
            Number of travelers
            <input name="team_number" type="number" min="1" defaultValue="2" required />
          </label>

          {optionsError && (
            <p className="booking-message booking-message-error" role="alert">
              Agents or packages could not be loaded. Refresh the page and try again.
            </p>
          )}

          {result && (
            <p className={`booking-message ${result.isError ? "booking-message-error" : "booking-message-success"}`} role="status">
              {result.message}
            </p>
          )}

          <button className="booking-submit" type="submit" disabled={isSubmitting || isLoadingOptions || !agents.length || !tours.length}>
            {isSubmitting ? "Submitting..." : "Submit booking"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>
      <aside className="booking-note" aria-label="Booking note">
        <span className="booking-note-mark" aria-hidden="true">G</span>
        <p>Good journeys begin with a conversation.</p>
        <span className="booking-note-caption">ETHIOPIA, AT YOUR PACE</span>
      </aside>
    </main>
  );
}