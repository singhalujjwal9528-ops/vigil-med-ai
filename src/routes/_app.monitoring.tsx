import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Droplets, Thermometer, Wind, Gauge, Search } from "lucide-react";
import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { StatusBadge } from "@/components/vital/StatusBadge";
import { VitalStat } from "@/components/vital/VitalStat";
import { EcgLine } from "@/components/vital/EcgLine";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { statusConfig, riskBand } from "@/lib/status";
import type { PatientStatus } from "@/lib/mock/patients";

export const Route = createFileRoute("/_app/monitoring")({
  head: () => ({ meta: [{ title: "Live Monitoring — VitalGuard AI" }] }),
  component: MonitoringPage,
});

const filters: ("all" | PatientStatus)[] = ["all", "critical", "warning", "stable"];

function MonitoringPage() {
  const { patients } = useSimulation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | PatientStatus>("all");

  const list = useMemo(() => {
    return patients.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.room.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "all" || p.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [patients, query, filter]);

  return (
    <PageTransition>
      <PageHeader title="Live Patient Monitoring" subtitle="Real-time vitals across every monitored bed" />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, ID or room…" className="bg-secondary/40 pl-9" />
        </div>
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary/40 text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center rounded-2xl py-16 text-center">
          <Search className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-semibold">No patients match your filters</p>
          <p className="text-sm text-muted-foreground">Try a different search or status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.id}
              to="/patients/$patientId"
              params={{ patientId: p.id }}
              className={cn("glass-card group rounded-2xl p-4 ring-1 transition-transform hover:-translate-y-1", statusConfig[p.status].ring)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · Age {p.age} · {p.room}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="my-3 overflow-hidden rounded-xl bg-secondary/30">
                <EcgLine color={statusConfig[p.status].dot.includes("critical") ? "var(--critical)" : p.status === "warning" ? "var(--warning)" : "var(--success)"} height={40} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <VitalStat icon={<Heart className="h-3.5 w-3.5" />} label="Heart Rate" value={p.vitals.heartRate} unit="bpm" min={40} max={160} color="var(--critical)" />
                <VitalStat icon={<Gauge className="h-3.5 w-3.5" />} label="Blood Pressure" value={p.vitals.systolic} unit={`/${p.vitals.diastolic}`} min={70} max={200} color="var(--purple)" />
                <VitalStat icon={<Droplets className="h-3.5 w-3.5" />} label="SpO₂" value={p.vitals.spo2} unit="%" min={80} max={100} color="var(--cyan)" />
                <VitalStat icon={<Thermometer className="h-3.5 w-3.5" />} label="Temp" value={p.vitals.temperature} unit="°C" decimals={1} min={35} max={41} color="var(--warning)" />
                <VitalStat icon={<Wind className="h-3.5 w-3.5" />} label="Resp Rate" value={p.vitals.respiratoryRate} unit="/min" min={8} max={35} color="var(--success)" />
                <div className="flex flex-col justify-center rounded-xl bg-secondary/40 p-3">
                  <span className="text-xs text-muted-foreground">Risk Score</span>
                  <span className="text-xl font-bold" style={{ color: riskBand(p.riskScore).color }}>{p.riskScore}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
