import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();

    const claims = data?.claims;

    if (error || !claims) {
        redirect("/login");
    }

    return (
        <main style={{ padding: "32px" }}>
            <h1>Guzo Admin Dashboard</h1>

            <p>You are signed in.</p>

            <form action={logout}>
                <button type="submit">Log out</button>
            </form>
        </main>
    );
}
