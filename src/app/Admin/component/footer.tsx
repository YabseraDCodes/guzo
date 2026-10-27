
import Link from "next/link";
import { Compass } from "lucide-react";
import "./footerstyle.css"
export default function Footer() {
  return (
    <footer className="staff-footer">
      <Link href="/admin" className="footer-brand">
        <Compass size={18} />
        <span>GUZO</span>
      </Link>

      <p>
        © 2026 GUZO. All rights reserved.
      </p>

      <span className="footer-caption">
        Staff Portal · Administrative Dashboard
      </span>
    </footer>
  );
}
