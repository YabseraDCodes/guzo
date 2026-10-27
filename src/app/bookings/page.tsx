"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { BookingForm } from "./BookingForm";
import type { Agent, Tour } from "./BookingFormFields";
import "./booking.css";

export default function BookingsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState(false);

  useEffect(() => {
    let isActive = true;

    Promise.all([//fetch agents and tours together
      fetcher("/api/agents") as Promise<Agent[]>,
      fetcher("/api/tours") as Promise<Tour[]>,
    ])
      .then(([agentData, tourData]) => {
        if (!isActive) return;
        setAgents(agentData);
        setTours(tourData);
      })//receives the agents and tours from the API and saves them in the page's state.
      .catch(() => {
        if (isActive) setOptionsError(true);
      })//show an error if fetching fails
      .finally(() => {
        if (isActive) setIsLoadingOptions(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <BookingForm
      agents={agents}
      tours={tours}
      isLoadingOptions={isLoadingOptions}
      optionsError={optionsError}
    />
  );
}
interface BookingPageProps {
  searchParams: Promise<{
    destinationId?: string;
    agentId?: string;
    packageName?: string;
  }>;
}

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const { destinationId, agentId, packageName } = await searchParams;

  return (
    <main className="info-page">
      <section className="info-hero">
        <h1>Book Your Trip</h1>
        <p>You're one step closer to your next adventure!</p>
      </section>

      <section className="info-content">
        <h2>Your Selected Package</h2>

        <p>Package Name: {packageName || "No package selected"}</p>
        <p>Destination ID: {destinationId || "Not provided"}</p>
        <p>Agent ID: {agentId || "Not provided"}</p>

      </section>
    </main>
  );
}