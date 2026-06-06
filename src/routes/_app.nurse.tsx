import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, Pill, BellRing, ListChecks } from "lucide-react";
import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { StatusBadge } from "@/components/vital/StatusBadge";
import { MetricCard } from "@/components/vital/MetricCard";

export const Route = createFileRoute("/_app/nurse")({
  head: () => ({ meta: [{ title: "Nurse Dashboard — VitalGuard AI" }] }),
  component: NursePage,
});

const meds = [
  { time: "10:00", patient: "Eleanor Whitman", med: "Furosemide 40mg IV", done: true },
  { time: "10:30", patient: "Marcus Bennett", med: "Antibiotic infusion", done: false },
  { time: "11:00", patient: "Maya Sharma", med: "Paracetamol 1g", done: false },
  { time: "12:00", patient: "James Holloway", med: "Salbutamol neb", done: false },
];

const tasks = [
  "Reposition ICU-03 patient",
  "Hourly fluid balance — ICU-01",
  "Wound dressing — 5C-21",
  "Vitals round — Cardiology",
];

function NursePage() {
  const { patients, alerts } = useSimulation();
  const assigned = patients.slice(0, 6);
  const active = alerts.filter((a) => a.state === "active");

  return (
    <PageTransition>
      <PageHeader title="Nurse Dashboard" subtitle="Nicole Rivera, RN · Day Shift" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Assigned Patients" value={assigned.length} icon={<HeartPulse className="h-5 w-5" />} color="var(--primary)" />
        <MetricCard title="Medications Due" value={meds.filter((m) => !m.done).length} icon={<Pill className="h-5 w-5" />} color="var(--purple)" />
        <MetricCard title="Active Alerts" value={active.length} icon={<BellRing className="h-5 w-5" />} color="var(--warning)" />
        <MetricCard title="Shift Tasks" value={tasks.length} icon={<ListChecks className="h-5 w-5" />} color="var(--cyan)" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <h3 className="mb-3 font-semibold">Assigned Patients</h3>
          <div className="space-y-2">
            {assigned.map((p) => (
              <Link key={p.id} to="/patients/$patientId" params={{ patientId: p.id }} className="flex items-center gap-3 rounded-xl bg-secondary/30 p-3 transition-colors hover:bg-secondary/60">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.room}</p>
                </div>
                <StatusBadge status={p.status} />
              </Link>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h3 className="mb-3 font-semibold">Medication Schedule</h3>
          <div className="space-y-2">
            {meds.map((m) => (
              <div key={m.time + m.patient} className="rounded-xl bg-secondary/30 p-3">
                <p className="text-sm font-semibold">{m.time} · {m.patient}</p>
                <p className="text-xs text-muted-foreground">{m.med}</p>
                <span className={m.done ? "text-xs text-success" : "text-xs text-warning"}>{m.done ? "Administered" : "Due"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h3 className="mb-3 font-semibold">Shift Tasks</h3>
          <div className="space-y-2">
            {tasks.map((t) => (
              <label key={t} className="flex items-center gap-2 rounded-xl bg-secondary/30 p-3 text-sm">
                <input type="checkbox" className="accent-primary" /> {t}
              </label>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
