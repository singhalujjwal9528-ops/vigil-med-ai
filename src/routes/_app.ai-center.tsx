import { createFileRoute, Link } from "@tanstack/react-router";
import { BrainCircuit, TrendingDown, Activity, AlertTriangle } from "lucide-react";
import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { RiskGauge } from "@/components/vital/RiskGauge";
import { riskBand } from "@/lib/status";

export const Route = createFileRoute("/_app/ai-center")({
  head: () => ({ meta: [{ title: "AI Prediction Center — VitalGuard AI" }] }),
  component: AiCenterPage,
});

function AiCenterPage() {
  const { patients } = useSimulation();
  const ranked = [...patients].sort((a, b) => b.riskScore - a.riskScore);
  const focus = ranked[0];
  const avg = Math.round(patients.reduce((s, p) => s + p.riskScore, 0) / patients.length);

  return (
    <PageTransition>
      <PageHeader title="AI Prediction Center" subtitle="Continuous deterioration forecasting" />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-6">
          <h3 className="mb-3 self-start font-semibold">Highest Risk · {focus?.name}</h3>
          <RiskGauge score={focus?.riskScore ?? 0} size={200} />
          <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center">
            <Stat label="Risk %" value={`${focus?.riskScore}%`} color="var(--critical)" />
            <Stat label="Deterioration" value={`${focus?.deteriorationProb}%`} color="var(--warning)" />
            <Stat label="Confidence" value={`${focus?.confidence}%`} color="var(--cyan)" />
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-purple/20 p-6 lg:col-span-2">
          <h3 className="flex items-center gap-2 font-semibold text-purple"><BrainCircuit className="h-4 w-4" /> AI Insights</h3>
          <div className="mt-4 space-y-3">
            {ranked.slice(0, 4).flatMap((p) =>
              p.aiInsights.slice(0, 1).map((insight, i) => (
                <Link
                  key={`${p.id}-${i}`}
                  to="/patients/$patientId"
                  params={{ patientId: p.id }}
                  className="flex items-start gap-3 rounded-xl bg-secondary/30 p-4 transition-colors hover:bg-secondary/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "color-mix(in oklab, var(--purple) 18%, transparent)", color: "var(--purple)" }}>
                    {p.status === "critical" ? <AlertTriangle className="h-4 w-4" /> : p.status === "warning" ? <TrendingDown className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{insight}</p>
                    <p className="text-xs text-muted-foreground">{p.name} · {p.room} · {riskBand(p.riskScore).label}</p>
                  </div>
                </Link>
              )),
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Ward avg risk" value={`${avg}`} color={riskBand(avg).color} big />
        <Stat label="High risk patients" value={`${patients.filter((p) => p.riskScore >= 70).length}`} color="var(--critical)" big />
        <Stat label="Model confidence" value="94%" color="var(--cyan)" big />
      </div>
    </PageTransition>
  );
}

function Stat({ label, value, color, big }: { label: string; value: string; color: string; big?: boolean }) {
  return (
    <div className={big ? "glass-card rounded-2xl p-5" : "rounded-xl bg-secondary/40 p-3"}>
      <p className={big ? "text-3xl font-bold" : "text-lg font-bold"} style={{ color }}>{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
