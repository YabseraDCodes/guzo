import Header from "./component/header";
import Footer from "./component/footer";
import { logout } from "@/app/login/actions";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <Header />
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>

      <main className="admin-main">
        {children}
      </main>

      <Footer />
    </div>
  );
}
