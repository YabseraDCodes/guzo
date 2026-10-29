
import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

export const metadata: Metadata = {
  title: "GUZO | Discover Africa",
  description: "Discover Africa. Live the Journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome placement="header" />
        {children}
        <SiteChrome placement="footer" />
      </body>
    </html>
  );
}
