import Header from "./component/header";
import Footer from "./component/footer";
import "./adminLayout.css";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <Header />
      <main className="admin-main">
        {children}
      </main>

      <Footer />
    </div>
  );
}
