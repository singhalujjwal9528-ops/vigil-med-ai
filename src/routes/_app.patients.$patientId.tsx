import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Heart, Droplets, Thermometer, Wind, Gauge, BrainCircuit, FileText, FlaskConical, ClipboardList, BellRing } from "lucide-react";
import { useSimulation } from "@/lib/simulation";
import { PageTransition } from "@/components/vital/PageTransition";
import { StatusBadge } from "@/components/vital/StatusBadge";
import { VitalStat } from "@/components/vital/VitalStat";
import { RiskGauge } from "@/components/vital/RiskGauge";
import { riskBand } from "@/lib/status";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_app/patients/$patientId")({
  head: () => ({ meta: [{ title: "Patient Details — VitalGuard AI" }] }),
  component: PatientDetailPage,
});

const trendCharts = [
  { key: "heartRate", label: "Heart Rate", color: "var(--critical)", unit: "bpm" },
  { key: "systolic", label: "Blood Pressure", color: "var(--purple)", unit: "mmHg" },
  { key: "spo2", label: "SpO₂", color: "var(--cyan)", unit: "%" },
  { key: "temperature", label: "Temperature", color: "var(--warning)", unit: "°C" },
] as const;

function PatientDetailPage() {
  const { patientId } = useParams({ from: "/_app/patients/$patientId" });
  const { getPatient, history, alerts } = useSimulation();
  const p = getPatient(patientId);
  const data = history[patientId] ?? [];
  const patientAlerts = alerts.filter((a) => a.patientId === patientId);

  if (!p) {
    return (
      <PageTransition>
        <div className="glass-card flex flex-col items-center rounded-2xl py-16 text-center">
          <p className="font-semibold">Patient not found</p>
          <Link to="/monitoring" className="mt-3 text-sm text-primary hover:underline">Back to monitoring</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Link to="/monitoring" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to monitoring
      </Link>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">{p.name}</h1>
              <p className="text-sm text-muted-foreground">{p.id} · Age {p.age} · {p.gender} · {p.room} · {p.ward}</p>
              <p className="mt-1 text-sm">Diagnosis: <span className="font-medium">{p.diagnosis}</span> · {p.doctor}</p>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <VitalStat icon={<Heart className="h-3.5 w-3.5" />} label="Heart Rate" value={p.vitals.heartRate} unit="bpm" min={40} max={160} color="var(--critical)" />
            <VitalStat icon={<Gauge className="h-3.5 w-3.5" />} label="Blood Pressure" value={p.vitals.systolic} unit={`/${p.vitals.diastolic}`} min={70} max={200} color="var(--purple)" />
            <VitalStat icon={<Droplets className="h-3.5 w-3.5" />} label="SpO₂" value={p.vitals.spo2} unit="%" min={80} max={100} color="var(--cyan)" />
            <VitalStat icon={<Thermometer className="h-3.5 w-3.5" />} label="Temp" value={p.vitals.temperature} unit="°C" decimals={1} min={35} max={41} color="var(--warning)" />
            <VitalStat icon={<Wind className="h-3.5 w-3.5" />} label="Resp Rate" value={p.vitals.respiratoryRate} unit="/min" min={8} max={35} color="var(--success)" />
          </div>
        </div>

        <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-5">
          <h3 className="mb-2 self-start font-semibold">Risk Score</h3>
          <RiskGauge score={p.riskScore} size={170} />
          <div className="mt-4 w-full space-y-1.5 text-sm">
            <Row label="Deterioration prob." value={`${p.deteriorationProb}%`} />
            <Row label="AI confidence" value={`${p.confidence}%`} />
            <Row label="Current status" value={riskBand(p.riskScore).label} />
          </div>
        </div>
      </div>

      <div className="mt-4 glass-card rounded-2xl border border-purple/20 p-5">
        <h3 className="flex items-center gap-2 font-semibold text-purple"><BrainCircuit className="h-4 w-4" /> AI Recommendation</h3>
        <p className="mt-2 text-sm">{p.aiRecommendation}</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {trendCharts.map((c) => (
          <div key={c.key} className="glass-card rounded-2xl p-5">
            <h3 className="mb-3 text-sm font-semibold">{c.label} Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`t-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={c.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} width={28} domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey={c.key} stroke={c.color} strokeWidth={2} fill={`url(#t-${c.key})`} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel icon={<BellRing className="h-4 w-4" />} title="Alerts">
          {patientAlerts.length === 0 ? (
            <Empty text="No alerts for this patient." />
          ) : (
            patientAlerts.slice(0, 5).map((a) => (
              <div key={a.id} className="rounded-xl bg-secondary/30 p-3 text-sm">
                <p className="font-medium text-critical">{a.message}</p>
                <p className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleTimeString()}</p>
              </div>
            ))
          )}
        </Panel>
        <Panel icon={<FileText className="h-4 w-4" />} title="Nurse Notes">
          {p.nurseNotes.map((n, i) => (
            <div key={i} className="rounded-xl bg-secondary/30 p-3 text-sm">
              <p>{n.text}</p>
              <p className="text-xs text-muted-foreground">{n.author} · {n.time}</p>
            </div>
          ))}
        </Panel>
        <Panel icon={<FlaskConical className="h-4 w-4" />} title="Lab Results">
          {p.labResults.map((l, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-sm">
              <span>{l.name}</span>
              <span className={l.flag === "normal" ? "text-success" : l.flag === "high" ? "text-critical" : "text-warning"}>
                {l.value} <span className="text-xs text-muted-foreground">({l.range})</span>
              </span>
            </div>
          ))}
        </Panel>
        <Panel icon={<ClipboardList className="h-4 w-4" />} title="Treatment History">
          {p.treatmentHistory.map((t, i) => (
            <div key={i} className="rounded-xl bg-secondary/30 p-3 text-sm">
              <p>{t.treatment}</p>
              <p className="text-xs text-muted-foreground">{t.date} · {t.by}</p>
            </div>
          ))}
        </Panel>
      </div>
    </PageTransition>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-3 flex items-center gap-2 font-semibold">{icon} {title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-xl bg-secondary/20 p-4 text-center text-sm text-muted-foreground">{text}</p>;
}
