import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/data/legal";

const page = getLegalPage("delivery")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return <LegalPageView page={page} />;
}
