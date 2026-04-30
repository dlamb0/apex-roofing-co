import { describe, it, expect } from "vitest";
import {
  cn,
  formatCurrency,
  formatNumber,
  slugify,
  calculateRoofArea,
  estimateRoofCost,
  getPitchMultiplier,
  formatDate,
  getInitials,
  truncate,
} from "@/lib/utils";

describe("cn (classname merge)", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("deduplicates tailwind conflicts", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("handles undefined and null", () => {
    expect(cn(undefined, null, "class")).toBe("class");
  });
});

describe("formatCurrency", () => {
  it("formats whole dollar amounts", () => {
    expect(formatCurrency(1000)).toBe("$1,000");
  });

  it("formats large amounts with commas", () => {
    expect(formatCurrency(15000)).toBe("$15,000");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("rounds decimal amounts", () => {
    expect(formatCurrency(1234.56)).toBe("$1,235");
  });
});

describe("formatNumber", () => {
  it("adds comma separators", () => {
    expect(formatNumber(4800)).toBe("4,800");
  });

  it("handles values under 1000", () => {
    expect(formatNumber(312)).toBe("312");
  });
});

describe("slugify", () => {
  it("lowercases text", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! World?")).toBe("hello-world");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("Hello  --  World")).toBe("hello-world");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify("-hello-")).toBe("hello");
  });
});

describe("calculateRoofArea", () => {
  it("calculates flat roof area", () => {
    expect(calculateRoofArea(50, 40, 1.0)).toBe(2000);
  });

  it("applies pitch multiplier", () => {
    expect(calculateRoofArea(50, 40, 1.2)).toBe(2400);
  });

  it("rounds to nearest integer", () => {
    expect(calculateRoofArea(30, 30, 1.18)).toBe(1062);
  });
});

describe("estimateRoofCost", () => {
  it("calculates basic single-story cost", () => {
    const result = estimateRoofCost(2000, 4.5, 1);
    expect(result).toBe(9000);
  });

  it("applies two-story multiplier (1.15)", () => {
    const result = estimateRoofCost(2000, 4.5, 2);
    expect(result).toBe(Math.round(2000 * 4.5 * 1.15));
  });

  it("applies three-story multiplier (1.25)", () => {
    const result = estimateRoofCost(2000, 4.5, 3);
    expect(result).toBe(Math.round(2000 * 4.5 * 1.25));
  });

  it("returns integer", () => {
    const result = estimateRoofCost(2100, 6.5, 2);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("getPitchMultiplier", () => {
  it("returns 1.0 for flat roof", () => {
    expect(getPitchMultiplier("flat")).toBe(1.0);
  });

  it("returns 1.18 for medium slope", () => {
    expect(getPitchMultiplier("medium-4-6")).toBe(1.18);
  });

  it("returns 1.55 for very steep", () => {
    expect(getPitchMultiplier("very-steep-9+")).toBe(1.55);
  });

  it("defaults to 1.18 for unknown pitch", () => {
    expect(getPitchMultiplier("unknown-value")).toBe(1.18);
  });
});

describe("formatDate", () => {
  it("formats ISO date string correctly", () => {
    const result = formatDate("2024-08-22");
    expect(result).toContain("2024");
    expect(result).toContain("August");
  });

  it("returns a string", () => {
    expect(typeof formatDate("2024-01-01")).toBe("string");
  });
});

describe("getInitials", () => {
  it("returns initials for two-word name", () => {
    expect(getInitials("John Smith")).toBe("JS");
  });

  it("returns initials for three-word name (first two)", () => {
    expect(getInitials("Karen Ann Hoffstedt")).toBe("KA");
  });

  it("uppercases result", () => {
    expect(getInitials("john smith")).toBe("JS");
  });
});

describe("truncate", () => {
  it("returns full string when under limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates and adds ellipsis when over limit", () => {
    const result = truncate("hello world this is a long string", 10);
    expect(result).toContain("…");
    expect(result.length).toBeLessThanOrEqual(12);
  });

  it("returns exact string at limit", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});
