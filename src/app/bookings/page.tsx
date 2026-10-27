"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { BookingForm } from "./BookingForm";
import type { Agent, Tour } from "./BookingFormFields";
import "./booking.css";

export default function BookingsPage() {
  const searchParams = useSearchParams();

  const destinationId = searchParams.get("destinationId") || "";
  const agentId = searchParams.get("agentId") || "";
  const packageName = searchParams.get("packageName") || "";

  const [agents, setAgents] = useState<Agent[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
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

  return (
    <>
      {packageName && (
        <section className="info-content">
          <h2>Your Selected Package</h2>
          <p>Package Name: {packageName}</p>
          <p>Destination ID: {destinationId || "Not provided"}</p>
          <p>Agent ID: {agentId || "Not provided"}</p>
        </section>
      )}

      <BookingForm
        agents={agents}
        tours={tours}
        isLoadingOptions={isLoadingOptions}
        optionsError={optionsError}
      />
    </>
  );
}