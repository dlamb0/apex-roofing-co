import Image from "next/image";
import { notFound } from "next/navigation";
import { Section, Container, Badge } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SERVICES } from "@/lib/constants";
import { CheckCircle2, Phone, Clock } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.description} Serving Minneapolis–St. Paul. Free estimates.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <div className="relative bg-brand-charcoal py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={service.image} alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/80 to-transparent" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="flex gap-2 mb-4">
              <Badge variant="orange">{service.priceRange}</Badge>
              <Badge variant="gray">{service.duration}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-gray-300 text-lg mb-8">{service.longDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/quote" size="lg">Get Free Estimate</Button>
              <a
                href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md px-6 py-3 text-white font-semibold transition-colors"
              >
                <Phone size={18} /> {COMPANY.phone}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Features */}
      <Section background="white" padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-brand-charcoal mb-6">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-brand-cream">
                    <CheckCircle2 size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-brand-charcoal">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={800}
                  height={450}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-brand-charcoal text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Get Your Free Estimate</h3>
                <p className="text-gray-400 text-sm mb-6">Our inspections are thorough, honest, and always free — no commitment required.</p>
                <Button href="/quote" className="w-full justify-center">Request Estimate</Button>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-brand-charcoal mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-brand-orange" />
                    <div>
                      <span className="text-gray-500">Typical Duration: </span>
                      <span className="font-semibold text-brand-charcoal">{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-brand-orange" />
                    <div>
                      <span className="text-gray-500">Price Range: </span>
                      <span className="font-semibold text-brand-charcoal">{service.priceRange}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-6">
                <p className="text-brand-orange-dark font-semibold text-sm mb-1">25-Year Warranty</p>
                <p className="text-gray-700 text-sm">All {service.title.toLowerCase()} work is backed by Apex&apos;s industry-leading 25-year workmanship warranty.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <TestimonialsSection />
      <CTASection />
    </>
  );
}
