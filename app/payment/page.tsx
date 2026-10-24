import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/data/legal";

const page = getLegalPage("payment")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/payment" },
};

export default function PaymentPage() {
  return <LegalPageView page={page} />;
}
