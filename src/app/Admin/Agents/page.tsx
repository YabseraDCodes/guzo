"use client";
import {fetcher} from "@/lib/fetcher"
import useSWR from "swr";
import Link from "next/link";
import { Trash2, MapPin, Globe, Plus } from "lucide-react";
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

  const agentList = agents ?? [];

  return (
    <section className="agents-page">
      {/* heading and Add button always show, even when the list is empty */}
      <div className="agents-heading">
        <div>
          <h1>Tour Agents</h1>
          <p>Manage your registered tour agents.</p>
        </div>

        <div className="agents-heading-actions">
          <span className="agents-count">
            {agentList.length} {agentList.length === 1 ? "Agent" : "Agents"}
          </span>

          <Link href="/../Admin/forms/agentForm" className="add-agent-button">
            <Plus size={16} />
            Add agency
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p className="packages-message">Loading agents...</p>
      ) : error ? (
        <p className="packages-message">Failed to load agents.</p>
      ) : agentList.length === 0 ? (
        <p className="packages-message">
          No agents yet. Use “Add agency” to create the first one.
        </p>
      ) : (
        <div className="agents-list">
          {agentList.map((agent) => (
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

                <p className="agent-description">{agent.description}</p>

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
      )}
    </section>
  );
}
