"use client";
import {fetcher} from "@/lib/fetcher"
import useSWR from "swr";
import Link from "next/link";
import { Pencil, Trash2, MapPin, Globe, Plus } from "lucide-react";
import "./agent.css";

type Agent = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  destinations: {
    name: string;
    countries: {
      name: string;
    } | null;
  } | null;
};



export default function PackagesPage() {
  const { data: agents, error, isLoading } = useSWR<Agent[]>(
    "/api/adminagent",
    fetcher
  );

  if (isLoading) {
    return <p className="packages-message">Loading agents...</p>;
  }

  if (error) {
    return <p className="packages-message">Failed to load agents.</p>;
  }

  if (!agents?.length) {
    return <p className="packages-message">No agents found.</p>;
  }

  return (
    <section className="agents-page">
    <div className="agents-heading">
  <div>
    <h1>Tour Agents</h1>
    <p>Manage your registered tour agents.</p>
  </div>

  <div className="agents-heading-actions">
    <span className="agents-count">
      {agents.length} {agents.length === 1 ? "Agent" : "Agents"}
    </span>

    <Link href="/../admin/forms/agentForm" className="add-agent-button">
      <Plus size={16} />
      Add agency
    </Link>
  </div>
</div>

      <div className="agents-list">
        {agents.map((agent) => (
          <article className="agent-row" key={agent.id}>
            <div className="agent-logo-wrapper">
              {agent.image ? (
                <img
                  src={agent.image}
                  alt={`${agent.name} logo`}
                  className="agent-logo"
                />
              ) : (
                <div className="agent-logo-placeholder">
                  {agent.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="agent-information">
              <h2>{agent.name}</h2>

              <p className="agent-description">
                {agent.description}
              </p>

              <div className="agent-meta">
                <span>
                  <MapPin size={15} />
                  {agent.destinations?.name ?? "Unknown destination"}
                </span>

                <span>
                  <Globe size={15} />
                  {agent.destinations?.countries?.name ?? "Unknown country"}
                </span>
              </div>
            </div>

            <div className="agent-actions">
             

              <button
                type="button"
                className="agent-delete-button"
                aria-label={`Delete ${agent.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}