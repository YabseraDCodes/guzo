"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";

export default function TourDetailPage() {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const tours = await fetcher("/api/tours");
        const allAgents = await fetcher("/api/agents");

        const selectedTour = tours.find(
          (item) => item.name === Number(id)
        );

        const selectedAgents = allAgents.filter(
          (agent) => agent.destination_id === Number(id)
        );

        setTour(selectedTour || null);
        setAgents(selectedAgents);
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  if (loading) return <p>Loading tour details...</p>;

  if (!tour) return <p>Tour not found.</p>;

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <section className="rounded-xl border p-6">
        <h1 className="text-3xl font-bold">{tour.name}</h1>

        <p className="mt-2 text-gray-500">{tour.location}</p>

        <p className="mt-4">{tour.description}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">
          Available Tour Agents
        </h2>

        {agents.length === 0 ? (
          <p>No agents found for this tour.</p>
        ) : (
          agents.map((agent) => (
            <article
              key={agent.id}
              className="mb-4 rounded-xl border p-5"
            >
              <h3 className="text-xl font-semibold">
                {agent.name}
              </h3>

              <p className="mt-2">{agent.description}</p>

              <p className="mt-2">⭐ {agent.rating}</p>

              <div className="mt-3 space-y-1">
                <p>Golden: ${agent.packages.golden}</p>
                <p>Silver: ${agent.packages.silver}</p>
                <p>Economy: ${agent.packages.economy}</p>
              </div>

              <p className="mt-3">
                Contact: {agent.contact_info}
              </p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
