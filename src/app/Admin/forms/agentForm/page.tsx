"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import styles from "./agentForm.module.css";

// Change this if your POST route lives somewhere else
const API_URL = "@/app/api/agentPost";

const TIERS = ["golden", "silver", "economy"] as const;
type Tier = (typeof TIERS)[number];

type Stop = { title: string; description: string };

type PackageForm = {
  price: string;
  duration: string;
  hotelImage: string;
  hotelRanking: string;
  hotelDescription: string;
  includes: string; // one item per line
  itinerary: Stop[];
};

const emptyPackage = (): PackageForm => ({
  price: "",
  duration: "",
  hotelImage: "",
  hotelRanking: "",
  hotelDescription: "",
  includes: "",
  itinerary: [{ title: "", description: "" }],
});

type Destination = { id: number; name: string };

export default function AddAgentForm() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [id, setId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [rating, setRating] = useState("");
  const [packages, setPackages] = useState<Record<Tier, PackageForm>>({
    golden: emptyPackage(),
    silver: emptyPackage(),
    economy: emptyPackage(),
  });
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Load destinations for the dropdown
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("destinations")
      .select("id, name")
      .order("name")
      .then(({ data }) => setDestinations((data as Destination[]) ?? []));
  }, []);

  const updatePackage = (tier: Tier, patch: Partial<PackageForm>) =>
    setPackages((p) => ({ ...p, [tier]: { ...p[tier], ...patch } }));

  const updateStop = (tier: Tier, index: number, patch: Partial<Stop>) => {
    const itinerary = packages[tier].itinerary.map((s, i) => (i === index ? { ...s, ...patch } : s));
    updatePackage(tier, { itinerary });
  };

  const addStop = (tier: Tier) =>
    updatePackage(tier, { itinerary: [...packages[tier].itinerary, { title: "", description: "" }] });

  const removeStop = (tier: Tier, index: number) =>
    updatePackage(tier, { itinerary: packages[tier].itinerary.filter((_, i) => i !== index) });

  // Turn the form state into the same JSON shape stored in the database
  const buildPackages = () => {
    const result: Record<string, unknown> = {};
    for (const tier of TIERS) {
      const p = packages[tier];
      if (!p.price) continue; // tier left empty -> skip it
      result[tier] = {
        hotel: {
          image: p.hotelImage,
          ranking: Number(p.hotelRanking),
          description: p.hotelDescription,
        },
        price: Number(p.price),
        duration: p.duration,
        includes: p.includes
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        itinerary: p.itinerary
          .filter((s) => s.title.trim())
          .map((s, i) => ({ day: `Day ${i + 1}`, title: s.title, description: s.description })),
      };
    }
    return result;
  };

  const resetForm = () => {
    setId("");
    setDestinationId("");
    setName("");
    setDescription("");
    setContactInfo("");
    setRating("");
    setPackages({ golden: emptyPackage(), silver: emptyPackage(), economy: emptyPackage() });
  };

  const handleSubmit = async () => {
    setStatus(null);
    const builtPackages = buildPackages();

    if (!id || !destinationId || !name || !description || !contactInfo || !rating) {
      setStatus({ type: "error", text: "Fill in all the agent fields." });
      return;
    }
    if (Object.keys(builtPackages).length === 0) {
      setStatus({ type: "error", text: "Add at least one package (enter a price)." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(id),
          destination_id: Number(destinationId),
          name,
          description,
          contact_info: contactInfo,
          rating: Number(rating),
          packages: builtPackages,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add agent");
      setStatus({ type: "ok", text: "Agent added." });
      resetForm();
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Add new agent</h2>

      {/* ===== Agent details ===== */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Agent ID</label>
            <input
              className={styles.input}
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Destination</label>
            <select
              className={styles.input}
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Agent name</label>
          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
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

        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Contact (email or phone)</label>
            <input
              className={styles.input}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Rating (0 to 5)</label>
            <input
              className={styles.input}
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ===== Packages: golden, silver, economy ===== */}
      {TIERS.map((tier) => {
        const p = packages[tier];
        return (
          <section key={tier} className={styles.packageBox}>
            <h3 className={styles.packageTitle}>{tier} package</h3>
            <p className={styles.hint}>Leave the price empty to skip this package.</p>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label}>Price (USD)</label>
                <input
                  className={styles.input}
                  type="number"
                  value={p.price}
                  onChange={(e) => updatePackage(tier, { price: e.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Duration (e.g. 3 Days)</label>
                <input
                  className={styles.input}
                  value={p.duration}
                  onChange={(e) => updatePackage(tier, { duration: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label}>Hotel image URL</label>
                <input
                  className={styles.input}
                  value={p.hotelImage}
                  onChange={(e) => updatePackage(tier, { hotelImage: e.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Hotel stars (1 to 5)</label>
                <input
                  className={styles.input}
                  type="number"
                  min="1"
                  max="5"
                  value={p.hotelRanking}
                  onChange={(e) => updatePackage(tier, { hotelRanking: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Hotel description</label>
              <textarea
                className={styles.input}
                rows={2}
                value={p.hotelDescription}
                onChange={(e) => updatePackage(tier, { hotelDescription: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>What is included (one item per line)</label>
              <textarea
                className={styles.input}
                rows={4}
                value={p.includes}
                onChange={(e) => updatePackage(tier, { includes: e.target.value })}
              />
            </div>

            {/* ===== Itinerary days ===== */}
            <div className={styles.field}>
              <label className={styles.label}>Itinerary</label>

              {p.itinerary.map((stop, i) => (
                <div key={i} className={styles.dayBox}>
                  <div className={styles.dayHeader}>
                    <span>Day {i + 1}</span>
                    {p.itinerary.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeDayBtn}
                        onClick={() => removeStop(tier, i)}
                      >
                        Remove day
                      </button>
                    )}
                  </div>

                  <input
                    className={styles.input}
                    placeholder="Title"
                    value={stop.title}
                    onChange={(e) => updateStop(tier, i, { title: e.target.value })}
                  />
                  <textarea
                    className={styles.input}
                    rows={2}
                    placeholder="Description"
                    value={stop.description}
                    onChange={(e) => updateStop(tier, i, { description: e.target.value })}
                  />
                </div>
              ))}

              <button type="button" className={styles.addDayBtn} onClick={() => addStop(tier)}>
                Add day
              </button>
            </div>
          </section>
        );
      })}

      {/* ===== Message + submit ===== */}
      {status && (
        <p className={status.type === "ok" ? styles.success : styles.error}>{status.text}</p>
      )}

      <button type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Add agent"}
      </button>
    </div>
  );
}