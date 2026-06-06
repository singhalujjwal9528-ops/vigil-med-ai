import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MiniChart } from "./MiniChart";

export function MetricCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  color = "var(--primary)",
  chartData,
  chartKey,
  delay = 0,
}: {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  chartData?: Array<Record<string, number | string>>;
  chartKey?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="glass-card group relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: color }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
        </div>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in oklab, ${color} 18%, transparent)`, color }}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              trendUp ? "text-success" : "text-critical",
            )}
          >
            {trendUp ? "▲" : "▼"} {trend}
          </span>
        )}
        {chartData && chartKey && (
          <div className="h-10 w-24">
            <MiniChart data={chartData} dataKey={chartKey} color={color} height={40} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
