import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main style={{ padding: "32px" }}>
      <h1>Access denied</h1>
      <p>You don't have permission to access this page.</p>
      <Link href="/">Return to homepage</Link>
    </main>
  );
}