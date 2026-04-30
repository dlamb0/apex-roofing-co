"use client";

import { useState } from "react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS } from "@/lib/constants";
import { formatCurrency, calculateRoofArea, estimateRoofCost, getPitchMultiplier } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CheckCircle2, Info } from "lucide-react";

const pitchOptions = [
  { value: "flat", label: "Flat / Low (0–2/12)" },
  { value: "low-2-4", label: "Gentle Slope (2–4/12)" },
  { value: "medium-4-6", label: "Standard Slope (4–6/12)" },
  { value: "steep-6-9", label: "Steep (6–9/12)" },
  { value: "very-steep-9+", label: "Very Steep (9+/12)" },
];

export function PricingCalculator() {
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(40);
  const [pitch, setPitch] = useState("medium-4-6");
  const [stories, setStories] = useState(1);
  const [selectedTier, setSelectedTier] = useState(1);

  const pitchMultiplier = getPitchMultiplier(pitch);
  const roofArea = calculateRoofArea(length, width, pitchMultiplier);
  const tier = PRICING_TIERS[selectedTier];
  const estimate = estimateRoofCost(roofArea, tier.pricePerSqFt, stories);
  const lowEstimate = Math.round(estimate * 0.9);
  const highEstimate = Math.round(estimate * 1.15);

  return (
    <Section id="calculator" background="white" padding="lg">
      <Container>
        <SectionHeading
          eyebrow="Pricing Estimator"
          title="Get a Ballpark Estimate"
          subtitle="Use our calculator to estimate your project cost. For an accurate quote, schedule your free inspection."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-3 bg-brand-cream rounded-2xl p-6 md:p-8">
            <h3 className="font-bold text-brand-charcoal text-lg mb-6">Enter Your Roof Details</h3>

            <div className="space-y-6">
              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    House Length (ft)
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={150}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full mb-2 accent-brand-orange"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>20 ft</span>
                    <span className="font-bold text-brand-charcoal text-base">{length} ft</span>
                    <span>150 ft</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    House Width (ft)
                  </label>
                  <input
                    type="range"
                    min={15}
                    max={80}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full mb-2 accent-brand-orange"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>15 ft</span>
                    <span className="font-bold text-brand-charcoal text-base">{width} ft</span>
                    <span>80 ft</span>
                  </div>
                </div>
              </div>

              {/* Pitch */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Roof Pitch (slope)
                </label>
                <select
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  {pitchOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Stories */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Stories</label>
                <div className="flex gap-3">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStories(s)}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all",
                        stories === s
                          ? "bg-brand-charcoal text-white border-brand-charcoal"
                          : "bg-white text-gray-700 border-gray-300 hover:border-brand-charcoal"
                      )}
                    >
                      {s} {s === 1 ? "Story" : "Stories"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Material Tier</label>
                <div className="grid grid-cols-3 gap-3">
                  {PRICING_TIERS.map((t, i) => (
                    <button
                      key={t.name}
                      onClick={() => setSelectedTier(i)}
                      className={cn(
                        "relative py-3 px-2 rounded-lg border text-center transition-all",
                        selectedTier === i
                          ? "bg-brand-orange text-white border-brand-orange"
                          : "bg-white text-gray-700 border-gray-300 hover:border-brand-orange"
                      )}
                    >
                      {t.recommended && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs bg-brand-charcoal text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                          Most Popular
                        </span>
                      )}
                      <div className="text-sm font-bold">{t.name}</div>
                      <div className={cn("text-xs mt-0.5", selectedTier === i ? "text-white/80" : "text-gray-500")}>
                        ${t.pricePerSqFt}/sq ft
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Estimate card */}
            <div className="bg-brand-charcoal text-white rounded-2xl p-6 md:p-8">
              <p className="text-gray-400 text-sm mb-1">Estimated Roof Area</p>
              <p className="text-2xl font-bold text-brand-orange mb-4">{roofArea.toLocaleString()} sq ft</p>

              <div className="border-t border-white/10 pt-4 mb-4">
                <p className="text-gray-400 text-sm mb-2">Estimated Project Cost</p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(lowEstimate)} – {formatCurrency(highEstimate)}
                </p>
                <p className="text-gray-400 text-xs mt-1">{tier.name} tier · {stories === 1 ? "single" : stories + "-"}story</p>
              </div>

              <div className="flex items-start gap-2 bg-white/5 rounded-lg p-3 mb-6">
                <Info size={14} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  This is a rough estimate. Actual costs vary based on existing damage, materials availability, and site conditions. Get an exact quote with our free inspection.
                </p>
              </div>

              <Button href="/quote" className="w-full justify-center" variant="primary">
                Get Exact Quote — It&apos;s Free
              </Button>
            </div>

            {/* Included features */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h4 className="font-bold text-brand-charcoal mb-4 text-sm">{tier.name} Tier Includes:</h4>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
