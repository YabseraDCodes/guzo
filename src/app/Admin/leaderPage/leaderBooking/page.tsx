'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function Leaderboard() {
  const { data, isLoading } = useSWR('/api/bookinGet', fetcher);

  if (isLoading) return <p>Loading leaderboard...</p>;

  // 1. Group and count
  const agentCounts = (data || []).reduce((acc, booking) => {
    acc[booking.agent_id] = (acc[booking.agent_id] || 0) + 1;
    return acc;
  }, {});

  // 2. Sort into a ranking array
  const leaderboard = Object.keys(agentCounts).map((agentId) => ({
    agentId: Number(agentId),
    totalBookings: agentCounts[agentId],
  })).sort((a, b) => b.totalBookings - a.totalBookings);

  return (
    <div>
      <h2>Agent Leaderboard</h2>
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={entry.agentId}>
            Rank #{index + 1} — Agent ID: {entry.agentId} ({entry.totalBookings} bookings)
          </li>
        ))}
      </ol>
    </div>
  );
}