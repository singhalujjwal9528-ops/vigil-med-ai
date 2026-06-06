import { createFileRoute } from "@tanstack/react-router";
import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell, Legend } from "recharts";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — VitalGuard AI" }] }),
  component: AnalyticsPage,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function AnalyticsPage() {
  const { patients } = useSimulation();
  const risk = [
    { name: "Low", value: patients.filter((p) => p.riskScore < 40).length, color: "var(--success)" },
    { name: "Moderate", value: patients.filter((p) => p.riskScore >= 40 && p.riskScore < 70).length, color: "var(--warning)" },
    { name: "High", value: patients.filter((p) => p.riskScore >= 70).length, color: "var(--critical)" },
  ];
  const alertsByDay = days.map((d, i) => ({ day: d, alerts: 6 + Math.round(Math.sin(i) * 4 + i), critical: 1 + (i % 3) }));
  const recovery = days.map((d, i) => ({ day: d, recovery: 60 + i * 4 + Math.round(Math.random() * 5) }));
  const admissions = days.map((d, i) => ({ day: d, admissions: 4 + (i % 4), discharges: 3 + ((i + 1) % 4) }));

  return (
    <PageTransition>
      <PageHeader title="Analytics Dashboard" subtitle="Executive insights across the hospital" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Patient Risk Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={risk} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {risk.map((d) => <Cell key={d.name} fill={d.color} stroke="transparent" />)}
              </Pie>
              <Legend />
              <Tooltip contentStyle={tip} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Daily Alerts">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={alertsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={axis} /><YAxis tick={axis} width={28} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="alerts" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="critical" fill="var(--critical)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Recovery Trends">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={recovery}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={axis} /><YAxis tick={axis} width={28} />
              <Tooltip contentStyle={tip} />
              <Line type="monotone" dataKey="recovery" stroke="var(--success)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Admissions & Discharges">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={admissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={axis} /><YAxis tick={axis} width={28} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="admissions" fill="var(--cyan)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="discharges" fill="var(--purple)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="ICU Occupancy" className="mt-4">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={days.map((d, i) => ({ day: d, occupancy: 70 + Math.round(Math.sin(i) * 12 + i * 2) }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={axis} /><YAxis tick={axis} width={28} domain={[0, 100]} />
            <Tooltip contentStyle={tip} />
            <Line type="monotone" dataKey="occupancy" stroke="var(--warning)" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </PageTransition>
  );
}

const axis = { fontSize: 11, fill: "var(--muted-foreground)" } as const;
const tip = { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 } as const;

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl p-5 ${className}`}>
      <h3 className="mb-3 font-semibold">{title}</h3>
      {children}
    </div>
  );
}
