"use client";

import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { Phone, ChevronDown, Shield, Star, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60"
          aria-hidden="true"
        >
          {/* Pexels free-use roofing video */}
          <source
            src="https://videos.pexels.com/video-files/5617469/5617469-hd_1280_720_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-brand-charcoal/50 to-brand-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
          <span className="text-brand-orange text-sm font-semibold tracking-wide">
            Serving the Twin Cities since {COMPANY.founded}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
          Minnesota&apos;s Most{" "}
          <span className="text-brand-orange">Trusted</span>
          <br />
          Roofing Contractor
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {COMPANY.yearsExperience}+ years of expert installation, storm damage restoration, and commercial roofing across the Twin Cities metro. Backed by a 25-year workmanship warranty.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button href="/quote" size="lg" className="min-w-[200px]">
            Get Free Estimate
          </Button>
          <a
            href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md px-8 py-4 text-white font-semibold text-lg transition-all duration-200 min-w-[200px] justify-center"
          >
            <Phone size={20} />
            {COMPANY.phone}
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-white/80">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">{COMPANY.googleRating}/5 · {COMPANY.reviewCount}+ reviews</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Shield size={16} className="text-brand-orange" />
            <span>25-Year Workmanship Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock size={16} className="text-brand-orange" />
            <span>24/7 Emergency Response</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors"
        aria-label="Scroll to services"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </a>
    </section>
  );
}
