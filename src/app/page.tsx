import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { PricingCalculator } from "@/components/sections/PricingCalculator";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Roofing Co. | Minneapolis Roofing Contractor",
  description: "Minneapolis–St. Paul's most trusted roofing contractor since 1998. Residential, commercial & storm damage specialists. 25-year workmanship warranty. Free estimates.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PricingCalculator />
      <TestimonialsSection />
      <ServiceAreasSection />
      <CTASection />
    </>
  );
}
