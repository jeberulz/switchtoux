"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const labNavigation = [
  { href: "/design-lab", label: "Overview" },
  { href: "/design-lab/foundations", label: "Foundations" },
  { href: "/design-lab/layout", label: "Layout" },
  { href: "/design-lab/controls", label: "Controls" },
  { href: "/design-lab/brand", label: "Brand" },
  { href: "/design-lab/explorations", label: "Explorations" },
] as const;

function LabNavigation({ id, onNavigate }: { id: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Design Lab sections" className="lab-navigation" id={id}>
      {labNavigation.map((item) => (
        <Link
          aria-current={pathname === item.href ? "page" : undefined}
          href={item.href}
          key={item.href}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function DesignLabChrome({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <div
      className="lab-shell"
      data-sidebar-collapsed={sidebarCollapsed || undefined}
    >
      <aside className="lab-sidebar">
        <button
          aria-controls="lab-sidebar-content"
          aria-expanded={!sidebarCollapsed}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="lab-sidebar-toggle"
          onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
          type="button"
        >
          <span aria-hidden="true">{sidebarCollapsed ? "→" : "←"}</span>
        </button>

        <Link
          aria-hidden={!sidebarCollapsed || undefined}
          className="lab-sidebar-mark"
          href="/design-lab"
          tabIndex={sidebarCollapsed ? 0 : -1}
        >
          S/UX
        </Link>

        <div className="lab-sidebar-content" id="lab-sidebar-content">
          <Link className="lab-wordmark" href="/design-lab">
            <span>SwitchToUX</span>
            <strong>Design Lab</strong>
          </Link>
          <LabNavigation id="lab-sidebar-navigation" />
          <div className="lab-sidebar-meta">
            <span>Current gate</span>
            <strong>Signature selection</strong>
            <span>Figma parity deferred</span>
          </div>
        </div>
      </aside>

      <header className="lab-mobile-header">
        <Link className="lab-wordmark" href="/design-lab">
          <span>SwitchToUX</span>
          <strong>Design Lab</strong>
        </Link>
        <button
          aria-controls="lab-mobile-navigation-panel"
          aria-expanded={mobileOpen}
          className="lab-mobile-menu-toggle"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          <span aria-hidden="true" className="lab-menu-glyph">
            ☰
          </span>
          <span>Menu</span>
        </button>
        {mobileOpen ? (
          <div className="lab-mobile-menu-panel" id="lab-mobile-navigation-panel">
            <LabNavigation
              id="lab-mobile-navigation"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        ) : null}
      </header>

      <main className="lab-main">{children}</main>
    </div>
  );
}
