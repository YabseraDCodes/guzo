import Sidebar from "./component/sidebar";
import { logout } from "@/app/login/actions";
import "./admin-layout.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <Sidebar
        footer={
          <form action={logout}>
            <button type="submit" className="logout-button">
              Log out
            </button>
          </form>
        }
      />

      <div className="admin-body">
        <header className="admin-topbar">
          <h1>Admin Dashboard</h1>

          <div className="admin-profile">
            <span className="admin-avatar">A</span>
            <span>Admin</span>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
