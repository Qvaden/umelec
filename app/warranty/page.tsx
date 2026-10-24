import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/data/legal";

const page = getLegalPage("warranty")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return <LegalPageView page={page} />;
}
