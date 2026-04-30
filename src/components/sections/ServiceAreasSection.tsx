import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREAS, COMPANY } from "@/lib/constants";
import { MapPin } from "lucide-react";

export function ServiceAreasSection() {
  return (
    <Section background="cream" padding="lg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Service Area"
              title="Serving the Twin Cities Metro"
              subtitle={`Apex Roofing serves a ${COMPANY.serviceRadius}. If you don't see your city listed, call us — we may still serve your area.`}
            />

            <div className="grid grid-cols-3 gap-2 mb-8">
              {SERVICE_AREAS.map((area) => (
                <div key={area} className="flex items-center gap-1.5 text-sm text-gray-700">
                  <MapPin size={12} className="text-brand-orange flex-shrink-0" />
                  {area}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/quote">Get Free Estimate</Button>
              <Button href="/contact" variant="outline">Contact Us</Button>
            </div>
          </div>

          {/* Stylized map placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-brand-charcoal aspect-square md:aspect-video lg:aspect-square shadow-xl">
            {/* SVG stylized MN outline with dots */}
            <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <rect width="400" height="400" fill="#1a1a2e" />

              {/* Grid lines */}
              {[...Array(8)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={50 * i} x2="400" y2={50 * i} stroke="#252540" strokeWidth="1" />
              ))}
              {[...Array(8)].map((_, i) => (
                <line key={`v${i}`} x1={50 * i} y1="0" x2={50 * i} y2="400" stroke="#252540" strokeWidth="1" />
              ))}

              {/* Minnesota outline (simplified) */}
              <path
                d="M 120 40 L 280 40 L 290 80 L 285 100 L 300 110 L 295 130 L 280 140 L 270 200 L 260 240 L 230 260 L 220 290 L 200 310 L 190 360 L 170 360 L 160 320 L 120 300 L 100 260 L 95 200 L 105 160 L 100 120 L 105 80 Z"
                fill="#252540"
                stroke="#e8621a"
                strokeWidth="2"
                opacity="0.8"
              />

              {/* Minneapolis/St. Paul area highlight */}
              <circle cx="195" cy="270" r="30" fill="#e8621a" opacity="0.15" />
              <circle cx="195" cy="270" r="18" fill="#e8621a" opacity="0.2" />

              {/* City dots */}
              {[
                { x: 195, y: 270, label: "Minneapolis", size: 6, primary: true },
                { x: 210, y: 265, label: "St. Paul", size: 5, primary: true },
                { x: 175, y: 280, label: "Edina", size: 3 },
                { x: 170, y: 265, label: "Hopkins", size: 3 },
                { x: 160, y: 255, label: "Plymouth", size: 3 },
                { x: 185, y: 293, label: "Bloomington", size: 3 },
                { x: 200, y: 285, label: "Burnsville", size: 3 },
                { x: 155, y: 272, label: "Minnetonka", size: 3 },
                { x: 165, y: 240, label: "Maple Grove", size: 3 },
                { x: 225, y: 250, label: "Woodbury", size: 3 },
              ].map((city) => (
                <g key={city.label}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={city.size}
                    fill={city.primary ? "#e8621a" : "#f07830"}
                    opacity={city.primary ? 1 : 0.7}
                  />
                  {city.primary && (
                    <text
                      x={city.x + 8}
                      y={city.y + 4}
                      fill="white"
                      fontSize="9"
                      fontFamily="sans-serif"
                      fontWeight="600"
                    >
                      {city.label}
                    </text>
                  )}
                </g>
              ))}

              {/* Label */}
              <text x="200" y="380" textAnchor="middle" fill="#6b7280" fontSize="11" fontFamily="sans-serif">
                Twin Cities Metropolitan Area
              </text>
            </svg>

            {/* Overlay badge */}
            <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full">
              50-mile radius
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
