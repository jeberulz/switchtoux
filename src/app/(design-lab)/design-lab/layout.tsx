import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DesignLabChrome } from "./design-lab-chrome";
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

export default function DesignLabLayout({ children }: { children: ReactNode }) {
  if (process.env.DESIGN_LAB_ENABLED === "false") {
    notFound();
  }

  return <DesignLabChrome>{children}</DesignLabChrome>;
}
