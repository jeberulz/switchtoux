import type { Metadata } from "next";
import { FormsLab } from "./forms-lab";
import "./forms-lab.css";

export const metadata: Metadata = {
  title: "Forms",
};

export default function FormsPage() {
  return <FormsLab />;
}
