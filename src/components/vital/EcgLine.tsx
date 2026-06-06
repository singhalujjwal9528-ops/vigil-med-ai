import { useId } from "react";

export function EcgLine({
  color = "var(--cyan)",
  className,
  height = 48,
}: {
  color?: string;
  className?: string;
  height?: number;
}) {
  const id = useId();
  const wave =
    "M0 24 H40 L48 24 L54 8 L60 40 L66 16 L72 24 H110 L118 24 L124 12 L130 36 L136 20 L142 24 H180 L188 24 L194 6 L200 42 L206 18 L212 24 H250";
  return (
    <svg
      viewBox="0 0 250 48"
      preserveAspectRatio="none"
      className={className}
      style={{ width: "100%", height }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="20%" stopColor={color} stopOpacity="1" />
          <stop offset="80%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={wave}
        fill="none"
        stroke={`url(#fade-${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="animate-ecg"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}
