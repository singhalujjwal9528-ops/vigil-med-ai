import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, AlertTriangle, BellRing, CalendarClock } from "lucide-react";
import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { StatusBadge } from "@/components/vital/StatusBadge";
import { MetricCard } from "@/components/vital/MetricCard";
import { riskBand } from "@/lib/status";

export const Route = createFileRoute("/_app/doctor")({
  head: () => ({ meta: [{ title: "Doctor Dashboard — VitalGuard AI" }] }),
  component: DoctorPage,
});

const consultations = [
  { time: "10:30", name: "Eleanor Whitman", reason: "ARDS review", room: "ICU-03" },
  { time: "11:15", name: "Liam Foster", reason: "Cardiology follow-up", room: "ICU-02" },
  { time: "13:00", name: "Sofia Alvarez", reason: "AF rhythm check", room: "4B-12" },
];

function DoctorPage() {
  const { patients, alerts } = useSimulation();
  const assigned = patients.filter((p) => p.doctor === "Dr. Patel");
  const critical = assigned.filter((p) => p.status === "critical");
  const recent = alerts.slice(0, 4);

  return (
    <PageTransition>
      <PageHeader title="Doctor Dashboard" subtitle="Dr. Amara Patel · ICU Director" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Assigned Patients" value={assigned.length} icon={<Stethoscope className="h-5 w-5" />} color="var(--primary)" />
        <MetricCard title="Critical Cases" value={critical.length} icon={<AlertTriangle className="h-5 w-5" />} color="var(--critical)" />
        <MetricCard title="Recent Alerts" value={recent.length} icon={<BellRing className="h-5 w-5" />} color="var(--warning)" />
        <MetricCard title="Consultations" value={consultations.length} icon={<CalendarClock className="h-5 w-5" />} color="var(--cyan)" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <h3 className="mb-3 font-semibold">Assigned Patients</h3>
          <div className="space-y-2">
            {assigned.map((p) => (
              <Link key={p.id} to="/patients/$patientId" params={{ patientId: p.id }} className="flex items-center gap-3 rounded-xl bg-secondary/30 p-3 transition-colors hover:bg-secondary/60">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · {p.room} · {p.diagnosis}</p>
                </div>
                <span className="text-sm font-bold" style={{ color: riskBand(p.riskScore).color }}>{p.riskScore}</span>
                <StatusBadge status={p.status} />
              </Link>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h3 className="mb-3 font-semibold">Upcoming Consultations</h3>
          <div className="space-y-2">
            {consultations.map((c) => (
              <div key={c.time} className="rounded-xl bg-secondary/30 p-3">
                <p className="text-sm font-semibold">{c.time} · {c.name}</p>
                <p className="text-xs text-muted-foreground">{c.reason} · {c.room}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
