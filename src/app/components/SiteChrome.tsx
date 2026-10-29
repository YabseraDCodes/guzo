"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({ placement }: { placement: "header" | "footer" }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/Admin" || pathname.startsWith("/Admin/")
    || pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) return null;

  return placement === "header" ? <Header /> : <Footer />;
}
