
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GUZO | Discover Ethiopia",
  description: "Discover Ethiopia. Live the Journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
