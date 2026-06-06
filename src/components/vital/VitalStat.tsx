import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./AnimatedNumber";

export function VitalStat({
  icon,
  label,
  value,
  unit,
  decimals = 0,
  min,
  max,
  color = "var(--cyan)",
}: {
  icon: ReactNode;
  label: string;
  value: number;
  unit: string;
  decimals?: number;
  min: number;
  max: number;
  color?: string;
}) {
  const pct = Math.max(4, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="rounded-xl bg-secondary/40 p-3">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <AnimatedNumber value={value} decimals={decimals} className="text-xl font-bold tabular-nums" />
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all duration-700")}
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}
