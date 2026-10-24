import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DemoBar } from "@/components/layout/DemoBar";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { SITE_URL, company } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Умелец — окна, двери, балконы и товары для дома",
    template: "%s — Умелец",
  },
  description: company.description,
  applicationName: company.name,
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
  },
  keywords: [
    "окна",
    "входные двери",
    "межкомнатные двери",
    "балконы",
    "остекление",
    "линолеум",
    "замер",
    "монтаж",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.name,
    title: "Умелец — окна, двери, балконы и товары для дома",
    description: company.description,
    images: [{ url: `${SITE_URL}/images/hero-interior.jpg`, width: 1600, height: 1067, alt: "Интерьер с окном" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Умелец — окна, двери, балконы и товары для дома",
    description: company.description,
    images: [`${SITE_URL}/images/hero-interior.jpg`],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans">
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
              Перейти к содержимому
            </a>
            <DemoBar />
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
