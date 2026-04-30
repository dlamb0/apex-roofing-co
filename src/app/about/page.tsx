import Image from "next/image";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { COMPANY } from "@/lib/constants";
import { Shield, Award, Users, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Apex Roofing Co.",
  description: `Learn about Apex Roofing Co., Minneapolis's most trusted roofing contractor since ${COMPANY.founded}. Meet our team and learn our story.`,
};

const teamMembers = [
  {
    name: "Mike Halvorsen",
    title: "Founder & CEO",
    bio: `Started Apex Roofing in ${COMPANY.founded} with a single crew and a commitment to doing every job right. 30+ years of hands-on roofing experience.`,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    initials: "MH",
  },
  {
    name: "Sarah Kowalczyk",
    title: "Operations Manager",
    bio: "Oversees scheduling, crew management, and customer relations across all active projects. Keeps every job on time and every client informed.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    initials: "SK",
  },
  {
    name: "Dave Reinhart",
    title: "Lead Commercial Estimator",
    bio: "Certified commercial roofing specialist with 18 years of experience estimating and managing large-scale commercial and industrial projects.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    initials: "DR",
  },
  {
    name: "Jen Tran",
    title: "Insurance Claims Specialist",
    bio: "Former insurance adjuster turned homeowner advocate. Helps clients navigate storm damage claims and consistently secures maximum settlements.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    initials: "JT",
  },
];

const values = [
  { icon: Shield, title: "Integrity First", desc: "We tell you exactly what your roof needs — nothing more, nothing less. Honest assessments, fair pricing." },
  { icon: Award, title: "Craftsmanship", desc: "Every nail, every shingle, every flashing detail matters. We install every roof as if it were our own home." },
  { icon: Users, title: "Community", desc: `We've served the Twin Cities for ${COMPANY.yearsExperience}+ years. This is our home too, and we're invested in every neighborhood we work in.` },
  { icon: Heart, title: "Accountability", desc: "If something isn't right, we make it right. Our 25-year warranty isn't just paper — it's a promise we keep." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-brand-charcoal py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1920&q=60"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {COMPANY.yearsExperience} Years of Protecting Minnesota Homes
            </h1>
            <p className="text-gray-300 text-lg">
              Founded in {COMPANY.founded}, Apex Roofing Co. has grown from a one-crew operation into the Twin Cities&apos; most trusted roofing contractor — without ever losing the values that started it all.
            </p>
          </div>
        </Container>
      </div>

      {/* Story */}
      <Section background="white" padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="The Apex Story" title="Built on the Right Way to Do Things" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Mike Halvorsen started Apex Roofing in {COMPANY.founded} after spending a decade working for large roofing companies and growing frustrated watching homeowners get oversold, underserved, and left with warranties that meant nothing.
                </p>
                <p>
                  His idea was simple: hire only experienced roofers, use only manufacturer-certified materials, and communicate with customers at every step. Word spread fast. Within five years, Apex had expanded to a full commercial division. By 2010, we had completed over 1,500 roofing projects.
                </p>
                <p>
                  Today, with {COMPANY.projectsCompleted.toLocaleString()}+ completed roofs and a {COMPANY.googleRating}★ Google rating, Apex Roofing is the company the Twin Cities calls first — whether it&apos;s a hail storm at 2am or a planned commercial re-roof six months out.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Apex Roofing crew at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section background="cream" padding="lg">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What We Stand For" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-brand-charcoal mb-2">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading eyebrow="Our Team" title="The People Behind Every Roof" subtitle="Our team combines decades of roofing expertise with a genuine commitment to customer service." centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-brand-cream group-hover:ring-brand-orange transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <h3 className="font-bold text-brand-charcoal">{member.name}</h3>
                <p className="text-brand-orange text-sm font-semibold mb-2">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Work With Minnesota's Best Roofing Team"
        subtitle="Join thousands of satisfied customers across the Twin Cities."
        variant="charcoal"
      />
    </>
  );
}
