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
    <BookingForm
      agents={agents}
      tours={tours}
      isLoadingOptions={isLoadingOptions}
      optionsError={optionsError}
    />
  );
}
