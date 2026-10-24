import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/data/legal";

const page = getLegalPage("returns")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return <LegalPageView page={page} />;
}
