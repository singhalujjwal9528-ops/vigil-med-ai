import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ArrowUpRight, BellOff, BellRing } from "lucide-react";
import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/status";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/alerts")({
  head: () => ({ meta: [{ title: "Alert Management — VitalGuard AI" }] }),
  component: AlertsPage,
});

const sevStyle: Record<string, { text: string; bg: string }> = {
  critical: { text: "text-critical", bg: "bg-critical/12" },
  warning: { text: "text-warning", bg: "bg-warning/12" },
  resolved: { text: "text-success", bg: "bg-success/12" },
};

function AlertsPage() {
  const { alerts, acknowledgeAlert, resolveAlert, escalateAlert } = useSimulation();

  return (
    <PageTransition>
      <PageHeader title="Alert Management Center" subtitle="Prioritized, actionable patient alerts" />

      {alerts.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center rounded-2xl py-20 text-center">
          <BellOff className="h-9 w-9 text-muted-foreground" />
          <p className="mt-3 font-semibold">All clear</p>
          <p className="text-sm text-muted-foreground">No alerts right now. New alerts appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((a) => {
            const s = sevStyle[a.severity] ?? sevStyle.warning;
            return (
              <div key={a.id} className={cn("glass-card rounded-2xl p-4", a.state === "resolved" && "opacity-60")}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", s.bg, s.text)}>
                      <BellRing className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{a.patientName}</p>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", s.bg, s.text)}>{a.severity}</span>
                        {a.state === "acknowledged" && <span className="text-xs text-muted-foreground">· acknowledged</span>}
                      </div>
                      <p className="mt-0.5 text-sm">{a.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Suggested: {a.suggestedAction}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo(a.timestamp)}</p>
                    </div>
                  </div>
                  {a.state !== "resolved" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => acknowledgeAlert(a.id)}>Acknowledge</Button>
                      <Button size="sm" variant="outline" onClick={() => escalateAlert(a.id)}>
                        <ArrowUpRight className="mr-1 h-3.5 w-3.5" /> Escalate
                      </Button>
                      <Button size="sm" onClick={() => resolveAlert(a.id)} style={{ background: "var(--gradient-primary)" }}>
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Resolve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}
