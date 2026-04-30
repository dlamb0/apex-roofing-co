import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { Phone, ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  variant?: "orange" | "charcoal";
}

export function CTASection({
  title = "Ready for a Roof That Lasts?",
  subtitle = "Get your free, no-obligation estimate today. Most inspections completed within 48 hours.",
  variant = "orange",
}: CTASectionProps) {
  const isOrange = variant === "orange";

  return (
    <section className={isOrange ? "bg-brand-orange" : "bg-brand-charcoal"}>
      <Container>
        <div className="py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
            <p className={`text-lg ${isOrange ? "text-white/80" : "text-gray-300"}`}>{subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Button
              href="/quote"
              variant={isOrange ? "secondary" : "primary"}
              size="lg"
              className="group"
            >
              Free Estimate
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <a
              href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md font-semibold text-lg border transition-all ${
                isOrange
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              <Phone size={20} />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
