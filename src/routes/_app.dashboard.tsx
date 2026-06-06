import { createFileRoute } from "@tanstack/react-router";
import { Users, AlertTriangle, BellRing, Activity, Gauge, CalendarPlus, BrainCircuit, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSimulation } from "@/lib/simulation";
import { MetricCard } from "@/components/vital/MetricCard";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { StatusBadge } from "@/components/vital/StatusBadge";
import { riskBand, statusConfig } from "@/lib/status";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Operations Dashboard — VitalGuard AI" }] }),
  component: DashboardPage,
});

const spark = (base: number, n = 12) =>
  Array.from({ length: n }, (_, i) => ({ i, v: Math.round(base + Math.sin(i) * base * 0.08 + (Math.random() - 0.5) * base * 0.06) }));

function DashboardPage() {
  const { patients, alerts, history } = useSimulation();
  const total = patients.length;
  const critical = patients.filter((p) => p.status === "critical").length;
  const icu = patients.filter((p) => p.isICU).length;
  const admissions = patients.filter((p) => p.admittedToday).length;
  const activeAlerts = alerts.filter((a) => a.state === "active").length;
  const avgRisk = Math.round(patients.reduce((s, p) => s + p.riskScore, 0) / total);

  const riskDist = [
    { name: "Low", value: patients.filter((p) => p.riskScore < 40).length, color: "var(--success)" },
    { name: "Moderate", value: patients.filter((p) => p.riskScore >= 40 && p.riskScore < 70).length, color: "var(--warning)" },
    { name: "High", value: patients.filter((p) => p.riskScore >= 70).length, color: "var(--critical)" },
  ];

  const watchlist = [...patients].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  const trend = (history[watchlist[0]?.id] ?? []).map((p) => ({ label: p.label, hr: p.heartRate, spo2: p.spo2 }));

  return (
    <PageTransition>
      <PageHeader title="Operations Dashboard" subtitle="Real-time overview across all wards" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Patients" value={total} icon={<Users className="h-5 w-5" />} color="var(--primary)" trend="+3 today" trendUp chartData={spark(total)} chartKey="v" delay={0} />
        <MetricCard title="Critical Patients" value={critical} icon={<AlertTriangle className="h-5 w-5" />} color="var(--critical)" trend="needs review" chartData={spark(critical + 2)} chartKey="v" delay={0.05} />
        <MetricCard title="Active Alerts" value={activeAlerts} icon={<BellRing className="h-5 w-5" />} color="var(--warning)" trend="live" chartData={spark(activeAlerts + 3)} chartKey="v" delay={0.1} />
        <MetricCard title="ICU Patients" value={icu} icon={<Activity className="h-5 w-5" />} color="var(--cyan)" trend="stable" trendUp chartData={spark(icu)} chartKey="v" delay={0.15} />
        <MetricCard title="Average Risk Score" value={avgRisk} icon={<Gauge className="h-5 w-5" />} color="var(--purple)" trend={riskBand(avgRisk).label} chartData={spark(avgRisk)} chartKey="v" delay={0.2} />
        <MetricCard title="Today's Admissions" value={admissions} icon={<CalendarPlus className="h-5 w-5" />} color="var(--success)" trend="+2 vs avg" trendUp chartData={spark(admissions + 2)} chartKey="v" delay={0.25} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Live trend — {watchlist[0]?.name}</h3>
            <span className="text-xs text-muted-foreground">HR & SpO₂ · last updates</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="hrG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--critical)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--critical)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="spo2G" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={28} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="hr" stroke="var(--critical)" strokeWidth={2} fill="url(#hrG)" isAnimationActive={false} />
              <Area type="monotone" dataKey="spo2" stroke="var(--cyan)" strokeWidth={2} fill="url(#spo2G)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <h3 className="mb-4 font-semibold">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={riskDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3}>
                {riskDist.map((d) => (
                  <Cell key={d.name} fill={d.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {riskDist.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />{d.name}</span>
                <span className="font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 glass-card rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Priority Watchlist</h3>
          <Link to="/monitoring" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {watchlist.map((p) => (
            <Link
              key={p.id}
              to="/patients/$patientId"
              params={{ patientId: p.id }}
              className="flex items-center gap-4 rounded-xl bg-secondary/30 p-3 transition-colors hover:bg-secondary/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.id} · {p.room}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs text-muted-foreground">Risk</p>
                <p className="text-sm font-bold" style={{ color: riskBand(p.riskScore).color }}>{p.riskScore}</p>
              </div>
              <StatusBadge status={p.status} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5 glass-card rounded-2xl border border-purple/20 p-5">
        <h3 className="flex items-center gap-2 font-semibold text-purple"><BrainCircuit className="h-4 w-4" /> AI Summary</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {critical} patient{critical !== 1 ? "s" : ""} currently flagged critical. Average ward risk is{" "}
          <span className="font-semibold text-foreground">{avgRisk}</span> ({riskBand(avgRisk).label}). Closest watch:{" "}
          <span className="font-semibold text-foreground">{watchlist[0]?.name}</span>.
        </p>
      </div>
      <div className="sr-only">{Object.keys(statusConfig).length}</div>
    </PageTransition>
  );
}
