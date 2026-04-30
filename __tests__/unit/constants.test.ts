import { describe, it, expect } from "vitest";
import { COMPANY, SERVICES, TESTIMONIALS, PRICING_TIERS, NAV_ITEMS, STATS, SERVICE_AREAS } from "@/lib/constants";

describe("COMPANY constants", () => {
  it("has all required fields", () => {
    expect(COMPANY.name).toBeTruthy();
    expect(COMPANY.phone).toBeTruthy();
    expect(COMPANY.email).toBeTruthy();
    expect(COMPANY.address).toBeTruthy();
  });

  it("has valid Google rating (1-5)", () => {
    expect(COMPANY.googleRating).toBeGreaterThanOrEqual(1);
    expect(COMPANY.googleRating).toBeLessThanOrEqual(5);
  });

  it("has positive review count", () => {
    expect(COMPANY.reviewCount).toBeGreaterThan(0);
  });

  it("has valid founding year", () => {
    expect(COMPANY.founded).toBeGreaterThan(1900);
    expect(COMPANY.founded).toBeLessThanOrEqual(new Date().getFullYear());
  });

  it("yearsExperience is consistent with founding year", () => {
    const expected = new Date().getFullYear() - COMPANY.founded;
    expect(Math.abs(COMPANY.yearsExperience - expected)).toBeLessThanOrEqual(1);
  });
});

describe("SERVICES data", () => {
  it("has at least 4 services", () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(4);
  });

  it("each service has required fields", () => {
    SERVICES.forEach((service) => {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.slug).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
      expect(service.image).toMatch(/^https?:\/\//);
    });
  });

  it("has unique slugs", () => {
    const slugs = SERVICES.map((s) => s.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("has unique ids", () => {
    const ids = SERVICES.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("each service has at least 4 features", () => {
    SERVICES.forEach((service) => {
      expect(service.features.length).toBeGreaterThanOrEqual(4);
    });
  });
});

describe("TESTIMONIALS data", () => {
  it("has at least 6 testimonials", () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(6);
  });

  it("each testimonial has valid rating (1-5)", () => {
    TESTIMONIALS.forEach((t) => {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    });
  });

  it("each testimonial has required text fields", () => {
    TESTIMONIALS.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.location).toBeTruthy();
      expect(t.review.length).toBeGreaterThan(50);
      expect(t.avatar).toBeTruthy();
    });
  });

  it("has unique ids", () => {
    const ids = TESTIMONIALS.map((t) => t.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

describe("PRICING_TIERS data", () => {
  it("has exactly 3 tiers", () => {
    expect(PRICING_TIERS.length).toBe(3);
  });

  it("prices increase by tier (ascending)", () => {
    for (let i = 1; i < PRICING_TIERS.length; i++) {
      expect(PRICING_TIERS[i].pricePerSqFt).toBeGreaterThan(PRICING_TIERS[i - 1].pricePerSqFt);
    }
  });

  it("exactly one tier is recommended", () => {
    const recommended = PRICING_TIERS.filter((t) => t.recommended);
    expect(recommended.length).toBe(1);
  });

  it("each tier has features", () => {
    PRICING_TIERS.forEach((tier) => {
      expect(tier.features.length).toBeGreaterThan(0);
    });
  });
});

describe("NAV_ITEMS data", () => {
  it("has at least 3 nav items", () => {
    expect(NAV_ITEMS.length).toBeGreaterThanOrEqual(3);
  });

  it("each nav item has label and href", () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.label).toBeTruthy();
      expect(item.href).toBeTruthy();
    });
  });

  it("Services item has children (dropdown)", () => {
    const services = NAV_ITEMS.find((n) => n.label === "Services");
    expect(services?.children?.length).toBeGreaterThan(0);
  });
});

describe("STATS data", () => {
  it("has 4 stats", () => {
    expect(STATS.length).toBe(4);
  });

  it("all stats have positive values", () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeGreaterThan(0);
    });
  });
});

describe("SERVICE_AREAS data", () => {
  it("has at least 10 service areas", () => {
    expect(SERVICE_AREAS.length).toBeGreaterThanOrEqual(10);
  });

  it("includes Minneapolis", () => {
    expect(SERVICE_AREAS).toContain("Minneapolis");
  });

  it("has no duplicates", () => {
    const unique = new Set(SERVICE_AREAS);
    expect(unique.size).toBe(SERVICE_AREAS.length);
  });
});
