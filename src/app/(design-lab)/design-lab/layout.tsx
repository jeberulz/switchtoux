import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "./design-lab.css";

export const metadata: Metadata = {
  title: {
    default: "Design Lab | SwitchToUX",
    template: "%s | SwitchToUX Design Lab",
  },
  description: "Internal foundation and component documentation for SwitchToUX.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const labNavigation = [
  { href: "/design-lab", label: "Overview" },
  { href: "/design-lab/foundations", label: "Foundations" },
  { href: "/design-lab/layout", label: "Layout" },
  { href: "/design-lab/controls", label: "Controls" },
  { href: "/design-lab/brand", label: "Brand" },
  { href: "/design-lab/explorations", label: "Explorations" },
] as const;

function LabNavigation() {
  return (
    <nav aria-label="Design Lab sections" className="lab-navigation">
      {labNavigation.map((item) => (
        <Link href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function DesignLabLayout({ children }: { children: ReactNode }) {
  if (process.env.DESIGN_LAB_ENABLED === "false") {
    notFound();
  }

  return (
    <div className="lab-shell">
      <aside className="lab-sidebar">
        <Link className="lab-wordmark" href="/design-lab">
          <span>SwitchToUX</span>
          <strong>Design Lab</strong>
        </Link>
        <LabNavigation />
        <div className="lab-sidebar-meta">
          <span>Current gate</span>
          <strong>Signature selection</strong>
          <span>Figma parity deferred</span>
        </div>
      </aside>

      <header className="lab-mobile-header">
        <Link className="lab-wordmark" href="/design-lab">
          <span>SwitchToUX</span>
          <strong>Design Lab</strong>
        </Link>
        <details className="lab-mobile-menu">
          <summary>Sections</summary>
          <div className="lab-mobile-menu-panel">
            <LabNavigation />
          </div>
        </details>
      </header>

      <main className="lab-main">{children}</main>
    </div>
  );
}
