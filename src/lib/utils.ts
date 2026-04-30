import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateRoofArea(
  lengthFt: number,
  widthFt: number,
  pitchMultiplier: number = 1.0
): number {
  return Math.round(lengthFt * widthFt * pitchMultiplier);
}

export function estimateRoofCost(
  areaSqFt: number,
  pricePerSqFt: number,
  stories: number = 1
): number {
  const storyMultiplier = stories === 1 ? 1.0 : stories === 2 ? 1.15 : 1.25;
  return Math.round(areaSqFt * pricePerSqFt * storyMultiplier);
}

export function getPitchMultiplier(pitch: string): number {
  const multipliers: Record<string, number> = {
    "flat": 1.0,
    "low-2-4": 1.08,
    "medium-4-6": 1.18,
    "steep-6-9": 1.35,
    "very-steep-9+": 1.55,
  };
  return multipliers[pitch] ?? 1.18;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "…";
}
