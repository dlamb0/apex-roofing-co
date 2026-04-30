import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
  external?: boolean;
}

const variants = {
  primary: "bg-brand-orange hover:bg-brand-orange-dark text-white border-transparent shadow-sm",
  secondary: "bg-brand-charcoal hover:bg-brand-charcoal-light text-white border-transparent shadow-sm",
  outline: "bg-transparent hover:bg-brand-charcoal/5 text-brand-charcoal border-brand-charcoal",
  ghost: "bg-transparent hover:bg-white/10 text-white border-transparent",
  danger: "bg-red-600 hover:bg-red-700 text-white border-transparent shadow-sm",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, loading, external, children, disabled, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-semibold rounded-md border transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variants[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
