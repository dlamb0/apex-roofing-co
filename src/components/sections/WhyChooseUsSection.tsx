import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";
import { Shield, Clock, Star, DollarSign, Wrench, Phone } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "25-Year Workmanship Warranty",
    description: "The longest warranty in the Minneapolis–St. Paul market. If anything goes wrong with our installation, we fix it. Period.",
  },
  {
    icon: Star,
    title: `${COMPANY.googleRating}★ Google Rating`,
    description: `${COMPANY.reviewCount}+ verified reviews from homeowners and business owners across the Twin Cities. We earn our reputation on every job.`,
  },
  {
    icon: Clock,
    title: "24/7 Emergency Response",
    description: "Severe weather doesn't keep business hours. Our emergency storm team is on call around the clock with tarping and board-up services.",
  },
  {
    icon: DollarSign,
    title: "Insurance Claim Specialists",
    description: "We document every detail and work directly with your adjuster to maximize your claim. Our clients consistently receive higher settlements.",
  },
  {
    icon: Wrench,
    title: `${COMPANY.yearsExperience}+ Years of Experience`,
    description: `Founded in ${COMPANY.founded}, we've completed over ${COMPANY.projectsCompleted.toLocaleString()} roofing projects in Minnesota. That's expertise you can count on.`,
  },
  {
    icon: Phone,
    title: "Clear, Constant Communication",
    description: "You'll know exactly what's happening at every stage — material delivery, crew arrival, progress updates, and final walkthrough. No surprises.",
  },
];

export function WhyChooseUsSection() {
  return (
    <Section background="white" padding="lg">
      <Container>
        <SectionHeading
          eyebrow="Why Apex Roofing"
          title="A Different Kind of Roofing Company"
          subtitle="We built Apex on the belief that exceptional roofing and exceptional service aren't mutually exclusive. Here's what sets us apart."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="group flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 hover:border-brand-orange/30 hover:bg-brand-cream/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <Icon size={22} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-charcoal mb-2 text-lg">{reason.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
