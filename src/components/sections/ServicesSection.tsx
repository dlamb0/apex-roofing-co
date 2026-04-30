import Link from "next/link";
import Image from "next/image";
import { Section, Container, SectionHeading, Badge } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import { Home, Building2, CloudLightning, Droplets, ArrowRight } from "lucide-react";

const iconMap = {
  Home,
  Building2,
  CloudLightning,
  Droplets,
};

type IconName = keyof typeof iconMap;

export function ServicesSection() {
  return (
    <Section id="services" background="cream" padding="lg">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Complete Roofing Solutions"
          subtitle="From new construction to storm damage restoration, Apex Roofing handles every roofing need with expert craftsmanship and industry-leading warranties."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as IconName];
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="orange">{service.duration}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {Icon && <Icon size={20} className="text-brand-orange" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-brand-orange font-semibold mt-0.5">{service.priceRange}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-1.5 mb-4">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="text-xs text-gray-600 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-brand-orange font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button href="/quote" size="lg">
            Get Your Free Estimate
          </Button>
          <p className="text-gray-500 text-sm mt-3">No pressure, no obligation — just honest pricing</p>
        </div>
      </Container>
    </Section>
  );
}
