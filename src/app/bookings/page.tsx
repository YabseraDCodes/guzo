
"use client";

import { useEffect, useState } from "react";

const tourOptions = [
  "The Wonders of Lalibela",
  "Into the Simien Mountains",
  "Danakil Adventure",
  "Ancient Axum Discovery",
  "Coffee Country Escape",
  "Omo Valley Journey",
];

export default function BookingsPage() {
  const [tour, setTour] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedTour = params.get("tour");

    if (selectedTour && tourOptions.includes(selectedTour)) {
      setTour(selectedTour);
    }
  }, []);

  return (
    <main className="booking-page">
      <section className="booking-heading">
        <p>YOUR ETHIOPIAN ADVENTURE</p>
        <h1>Let's plan your <em>journey.</em></h1>
        <span>Tell us a little about your trip to get started.</span>
      </section>

      <section className="booking-layout">
        <form
          className="booking-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <h2>Your trip details</h2>

          <label>
            Choose a tour
            <select
              value={tour}
              onChange={(event) => setTour(event.target.value)}
              required
            >
              <option value="">Select a tour</option>
              {tourOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="booking-row">
            <label>
              Preferred date
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>

            <label>
              Travelers
              <select
                value={travelers}
                onChange={(event) => setTravelers(event.target.value)}
              >
                {["1", "2", "3", "4", "5", "6+"].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <h2>Your contact details</h2>

          <label>
            Full name
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Anything else we should know? (optional)
            <textarea
              placeholder="Tell us about your plans..."
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>

          <button type="submit" className="booking-submit">
            Send enquiry <span>→</span>
          </button>

          {submitted && (
            <p className="booking-success" role="status">
              Your enquiry form is complete! This demo does not send or save
              bookings yet.
            </p>
          )}
        </form>

        <aside className="booking-aside">
          <span className="booking-aside-symbol">✳</span>
          <p>THE GUZO PROMISE</p>
          <h2>Travel deeper. Discover more.</h2>
          <ul>
            <li>Experiences rooted in Ethiopia</li>
            <li>Journeys made for curious travelers</li>
            <li>Time to explore at your own pace</li>
          </ul>
          <a href="/destinations">Explore destinations ↗</a>
        </aside>
      </section>
    </main>
  );
}
