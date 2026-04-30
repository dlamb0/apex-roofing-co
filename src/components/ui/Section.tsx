import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const containerSizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({ children, className, size = "xl" }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", containerSizes[size], className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "cream" | "charcoal" | "dark" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const sectionBgs = {
  white: "bg-white",
  cream: "bg-brand-cream",
  charcoal: "bg-brand-charcoal",
  dark: "bg-gray-900",
  transparent: "bg-transparent",
};

const sectionPadding = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

export function Section({ children, className, id, background = "white", padding = "lg" }: SectionProps) {
  return (
    <section id={id} className={cn(sectionBgs[background], sectionPadding[padding], className)}>
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, centered = false, light = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {eyebrow && (
        <p className={cn("text-sm font-semibold uppercase tracking-widest mb-3", light ? "text-brand-orange" : "text-brand-orange")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl md:text-4xl font-bold leading-tight", light ? "text-white" : "text-brand-charcoal")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg max-w-3xl leading-relaxed", centered && "mx-auto", light ? "text-gray-300" : "text-gray-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "orange" | "charcoal" | "green" | "gray";
}

export function Badge({ children, className, variant = "orange" }: BadgeProps) {
  const variants = {
    orange: "bg-brand-orange/10 text-brand-orange-dark border-brand-orange/20",
    charcoal: "bg-brand-charcoal/10 text-brand-charcoal border-brand-charcoal/20",
    green: "bg-green-50 text-green-700 border-green-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border", variants[variant], className)}>
      {children}
    </span>
  );
}
