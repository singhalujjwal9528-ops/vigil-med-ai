import type { PatientStatus } from "@/lib/mock/patients";

export const statusConfig: Record<
  PatientStatus,
  { label: string; text: string; bg: string; dot: string; ring: string }
> = {
  stable: {
    label: "Stable",
    text: "text-success",
    bg: "bg-success/12",
    dot: "bg-success",
    ring: "ring-success/30",
  },
  warning: {
    label: "Warning",
    text: "text-warning",
    bg: "bg-warning/12",
    dot: "bg-warning",
    ring: "ring-warning/30",
  },
  critical: {
    label: "Critical",
    text: "text-critical",
    bg: "bg-critical/15",
    dot: "bg-critical",
    ring: "ring-critical/40",
  },
};

export function riskBand(score: number): { label: string; color: string } {
  if (score >= 70) return { label: "High Risk", color: "var(--critical)" };
  if (score >= 40) return { label: "Moderate Risk", color: "var(--warning)" };
  return { label: "Low Risk", color: "var(--success)" };
}

export function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}
