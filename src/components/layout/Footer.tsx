import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { COMPANY, SERVICE_AREAS, SERVICES } from "@/lib/constants";
import { Phone, Mail, MapPin, Star, Shield, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Logo variant="white" size="md" className="mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Minnesota&apos;s trusted roofing contractor since {COMPANY.founded}. Residential, commercial, and storm damage specialists serving the Twin Cities metro area.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-400">{COMPANY.googleRating}/5 · {COMPANY.reviewCount} reviews</span>
            </div>
            <p className="text-xs text-gray-500">{COMPANY.license} · {COMPANY.insurance}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-brand-orange transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="text-brand-orange hover:text-brand-orange-light transition-colors text-sm font-semibold">
                  Get Free Estimate →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Service Areas</h3>
            <ul className="space-y-1.5 columns-2">
              {SERVICE_AREAS.slice(0, 14).map((area) => (
                <li key={area} className="text-gray-400 text-xs">{area}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="flex items-start gap-3 text-gray-300 hover:text-brand-orange transition-colors">
                  <Phone size={15} className="mt-0.5 flex-shrink-0 text-brand-orange" />
                  <span className="text-sm">{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 text-gray-300 hover:text-brand-orange transition-colors">
                  <Mail size={15} className="mt-0.5 flex-shrink-0 text-brand-orange" />
                  <span className="text-sm">{COMPANY.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-brand-orange" />
                <span className="text-sm">{COMPANY.address}</span>
              </li>
            </ul>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock size={12} className="text-brand-orange" />
                Mon–Fri: 7am–6pm · Sat: 8am–4pm
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400">
                <Shield size={12} />
                24/7 Emergency Storm Response
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Sitemap", href: "/sitemap.xml" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
