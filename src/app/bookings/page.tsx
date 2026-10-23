"use client";

import { useState } from "react";

export default function TestBooking() {
  const [result, setResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const f = e.target;

    const res = await fetch("/api/bookingPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agent_id: 1,
        user_name: f.user_name.value,
        user_email: f.user_email.value,
        user_phone: f.user_phone.value,
        team_number: f.team_number.value,
        package: f.package.value,
      }),
    });

    setResult(JSON.stringify(await res.json()));
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20, display: "grid", gap: 8, maxWidth: 300 }}>
      <input name="user_name" placeholder="Name" required />
      <input name="user_email" placeholder="Email" required />
      <input name="user_phone" placeholder="Phone" required />
      <input name="team_number" type="number" defaultValue="2" required />
      <select name="package">
        <option value="golden">golden</option>
        <option value="silver">silver</option>
        <option value="economy">economy</option>
      </select>
      <button type="submit">Save</button>
      <p>{result}</p>
    </form>
  );
}