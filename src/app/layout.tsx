import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://apexroofingco.pages.dev"),
  title: {
    default: `${COMPANY.name} | Minneapolis Roofing Contractor`,
    template: `%s | ${COMPANY.name}`,
  },
  description: `${COMPANY.name} — Minneapolis–St. Paul's most trusted roofing contractor since ${COMPANY.founded}. Residential, commercial & storm damage roofing with a 25-year workmanship warranty.`,
  keywords: ["roofing contractor Minneapolis", "roof replacement Minnesota", "storm damage roof repair"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-brand-charcoal font-sans">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
