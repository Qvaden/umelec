import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactsStrip } from "@/components/sections/ContactsStrip";
import { BenefitsStrip } from "@/components/sections/BenefitsStrip";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { PopularProducts } from "@/components/sections/PopularProducts";
import { BalconyPromo } from "@/components/sections/BalconyPromo";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ChoiceCta } from "@/components/sections/ChoiceCta";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadCta } from "@/components/sections/LeadCta";
import { Reveal } from "@/components/ui/Reveal";
import { company, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Умелец — окна, двери, балконы и товары для дома" },
  description:
    "Окна, двери, балконы, линолеум и другие товары для дома. Подбор, бесплатный замер, доставка и профессиональный монтаж от компании «Умелец».",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.description,
  url: SITE_URL,
  telephone: company.phone,
  email: company.email,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ContactsStrip />
      <Reveal>
        <BenefitsStrip />
      </Reveal>
      <Reveal>
        <CategoryGrid />
      </Reveal>
      <Reveal>
        <PopularProducts />
      </Reveal>
      <Reveal>
        <BalconyPromo />
      </Reveal>
      <Reveal>
        <HowWeWork />
      </Reveal>
      <Reveal>
        <CalculatorSection />
      </Reveal>
      <Reveal>
        <ServicesPreview />
      </Reveal>
      <Reveal>
        <ChoiceCta />
      </Reveal>
      <Reveal>
        <ReviewsSection />
      </Reveal>
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <LeadCta />
      </Reveal>
    </>
  );
}
