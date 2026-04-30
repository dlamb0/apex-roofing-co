"use client";

import { useState } from "react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { TESTIMONIALS, COMPANY } from "@/lib/constants";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={cn(i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
        />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  const colors = ["bg-brand-orange", "bg-brand-charcoal", "bg-blue-600", "bg-green-600", "bg-purple-600"];
  const color = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div className={cn("w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0", color)}>
      {initials}
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const total = TESTIMONIALS.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const visible = Array.from({ length: visibleCount }, (_, i) =>
    TESTIMONIALS[(activeIndex + i) % total]
  );

  return (
    <Section background="charcoal" padding="lg">
      <Container>
        <SectionHeading
          eyebrow="Customer Reviews"
          title={`${COMPANY.googleRating}★ on Google — ${COMPANY.reviewCount}+ Reviews`}
          subtitle="Don't take our word for it. Here's what our customers across the Twin Cities say."
          centered
          light
        />

        {/* Featured review (large) */}
        <div className="relative mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto text-center">
            <Quote size={40} className="text-brand-orange mx-auto mb-6 opacity-60" />
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-6 italic">
              &ldquo;{TESTIMONIALS[activeIndex].review}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <Avatar initials={TESTIMONIALS[activeIndex].avatar} />
              <div className="text-left">
                <p className="text-white font-semibold">{TESTIMONIALS[activeIndex].name}</p>
                <p className="text-gray-400 text-sm">{TESTIMONIALS[activeIndex].location}</p>
              </div>
              <div className="ml-4">
                <StarRating rating={TESTIMONIALS[activeIndex].rating} />
                <p className="text-gray-500 text-xs mt-1">{TESTIMONIALS[activeIndex].service} · {TESTIMONIALS[activeIndex].date}</p>
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mini cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {visible.map((review, i) => (
            <button
              key={review.id}
              onClick={() => setActiveIndex((activeIndex + i) % total)}
              className={cn(
                "text-left p-4 rounded-xl border transition-all duration-200",
                i === 0
                  ? "bg-brand-orange/20 border-brand-orange/30"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar initials={review.avatar} />
                <div>
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{review.review}</p>
            </button>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === activeIndex ? "bg-brand-orange w-6" : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
