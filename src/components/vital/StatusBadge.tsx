import { cn } from "@/lib/utils";
import { statusConfig } from "@/lib/status";
import type { PatientStatus } from "@/lib/mock/patients";

export function StatusBadge({
  status,
  className,
  pulse = true,
}: {
  status: PatientStatus;
  className?: string;
  pulse?: boolean;
}) {
  const cfg = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        cfg.bg,
        cfg.text,
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {pulse && status === "critical" && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", cfg.dot)} />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", cfg.dot)} />
      </span>
      {cfg.label}
    </span>
  );
}
