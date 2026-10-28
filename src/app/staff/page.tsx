import { requireStaff } from "@/lib/auth/require-admin";
import { logout } from "@/app/login/actions";

export default async function StaffDashboard() {
  const user = await requireStaff();

  // Staff accounts must have an assigned agent.
  if (user.role === "staff" && user.agentId === null) {
    return (
      <main>
        <h1>Staff Dashboard</h1>
        <p>
          No agent has been assigned to your account.
          Please contact an administrator.
        </p>
        <form action={logout}>
          <button type="submit">Log out</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px" }}>
      <h1>GUZO Staff Dashboard</h1>
      <p>Role: {user.role}</p>
      <p>Assigned Agent ID: {user.agentId ?? "Not assigned"}</p>

      {/* Your friend can use user.agentId for agent-specific data. */}

      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
