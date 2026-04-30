import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "white";
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 120, height: 32 },
  md: { width: 160, height: 42 },
  lg: { width: 220, height: 58 },
};

export function Logo({ className, variant = "full", size = "md" }: LogoProps) {
  const { width, height } = sizes[size];
  const isWhite = variant === "white";

  if (variant === "icon") {
    return (
      <svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Apex Roofing Co."
      >
        <polygon points="20,4 38,20 32,20 32,36 8,36 8,20 2,20" fill="#e8621a" />
        <polygon points="20,10 34,22 28,22 28,32 12,32 12,22 6,22" fill="#1a1a2e" opacity="0.6" />
        <rect x="16" y="24" width="8" height="8" fill="white" opacity="0.9" />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label="Apex Roofing Co."
    >
      {/* Roof icon */}
      <polygon points="21,2 38,16 33,16 33,30 9,30 9,16 4,16" fill="#e8621a" />
      <rect x="16" y="20" width="8" height="10" fill={isWhite ? "white" : "#1a1a2e"} opacity="0.85" />

      {/* Company name */}
      <text
        x="46"
        y="20"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill={isWhite ? "white" : "#1a1a2e"}
        letterSpacing="0.5"
      >
        APEX
      </text>
      <text
        x="46"
        y="32"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="10"
        fill={isWhite ? "rgba(255,255,255,0.75)" : "#6b7280"}
        letterSpacing="2"
      >
        ROOFING CO.
      </text>
    </svg>
  );
}
