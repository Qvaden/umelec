import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/data/legal";

const page = getLegalPage("privacy")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPageView page={page} />;
}
