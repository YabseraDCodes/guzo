"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";

import styles from "./tourForm.module.css";

const API_URL = "@/app/api/tourPost";

type Country = { id: number; name: string };

export default function AddDestinationForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState(""); // one URL per line
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("countries")
      .select("id, name")
      .order("name")
      .then(({ data }) => setCountries((data as Country[]) ?? []));
  }, []);

  const handleSubmit = async () => {
    setStatus(null);


    const urls = imageUrls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    if (!id || !name || !countryId || !location || !description || urls.length === 0) {
      setStatus({ type: "error", text: "Fill in all fields and add at least one image URL." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(id),
          name,
          country_id: Number(countryId),
          location,
          description,
          image_urls: urls,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add destination");

      setStatus({ type: "ok", text: "Destination added." });
      setId("");
      setName("");
      setCountryId("");
      setLocation("");
      setDescription("");
      setImageUrls("");
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Add new destination</h2>

      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Destination ID</label>
            <input
              className={styles.input}
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Country</label>
            <select
              className={styles.input}
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Destination name</label>
          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Location (e.g. Federal Capital Territory, Nigeria)</label>
          <input
            className={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.input}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Image URLs (one per line)</label>
          <textarea
            className={styles.input}
            rows={4}
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
          />
        </div>
      </section>

      {status && (
        <p className={status.type === "ok" ? styles.success : styles.error}>{status.text}</p>
      )}

      <button type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Add destination"}
      </button>
    </div>
  );
}