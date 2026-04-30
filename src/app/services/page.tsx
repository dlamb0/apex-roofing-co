import Image from "next/image";
import Link from "next/link";
import { Section, Container, Badge } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { SERVICES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roofing Services",
  description: "Complete roofing services: residential, commercial, storm damage, and gutters. Expert installation with 25-year workmanship warranty.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-brand-charcoal py-20">
        <Container>
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Complete Roofing Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            From new construction to emergency storm response, Apex Roofing provides every roofing service the Twin Cities needs — backed by the best warranty in the business.
          </p>
        </Container>
      </div>

      <Section background="cream" padding="lg">
        <Container>
          <div className="space-y-12">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`relative rounded-2xl overflow-hidden aspect-video shadow-lg ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className={i % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="orange">{service.priceRange}</Badge>
                    <Badge variant="gray">{service.duration}</Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-brand-charcoal mb-4">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.longDescription}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all"
                  >
                    Learn more about {service.title} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
