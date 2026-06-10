import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, BrainCircuit, Siren } from "lucide-react";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { useSimulation } from "@/lib/simulation";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { timeAgo } from "@/lib/status";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — VitalGuard AI" }] }),
  component: NotificationsPage,
});

  function NotificationsPage() {
  const { alerts, patients } = useSimulation();

  useEffect(() => {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("✅ Connected to Socket.IO Server");
    console.log("Socket ID:", socket.id);
  });

  socket.on("newAlert", (data) => {
    console.log("🚨 New Alert Received:", data);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Socket Error:", error.message);
  });

  return () => {
    console.log("🔌 Socket Disconnected");
    socket.disconnect();
  };
}, []);

  const emergencies = alerts.filter(
    (a) => a.severity === "critical" && a.state === "active"
  );

  const insights = patients.filter((p) => p.riskScore >= 50).slice(0, 4);

  return (
    <PageTransition>
      <PageHeader
        title="Notification Center"
        subtitle="Everything that needs your attention"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Section
          icon={<Siren className="h-4 w-4 text-critical" />}
          title="Emergency"
        >
          {emergencies.length === 0 ? (
            <Empty />
          ) : (
            emergencies.map((a) => (
              <Item
                key={a.id}
                title={a.patientName}
                text={a.message}
                meta={timeAgo(a.timestamp)}
                accent="var(--critical)"
              />
            ))
          )}
        </Section>

        <Section
          icon={<BellRing className="h-4 w-4 text-warning" />}
          title="New Alerts"
        >
          {alerts.length === 0 ? (
            <Empty />
          ) : (
            alerts.slice(0, 6).map((a) => (
              <Item
                key={a.id}
                title={a.patientName}
                text={a.message}
                meta={timeAgo(a.timestamp)}
                accent="var(--warning)"
              />
            ))
          )}
        </Section>

        <Section
          icon={<BrainCircuit className="h-4 w-4 text-purple" />}
          title="AI Recommendations"
        >
          {insights.map((p) => (
            <Link
              key={p.id}
              to="/patients/$patientId"
              params={{ patientId: p.id }}
              className="block"
            >
              <Item
                title={p.name}
                text={p.aiInsights[0]}
                meta={p.room}
                accent="var(--purple)"
              />
            </Link>
          ))}
        </Section>
      </div>
    </PageTransition>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-3 flex items-center gap-2 font-semibold">
        {icon} {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({
  title,
  text,
  meta,
  accent,
}: {
  title: string;
  text: string;
  meta: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl bg-secondary/30 p-3"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{text}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{meta}</p>
    </div>
  );
}

function Empty() {
  return (
    <p className="rounded-xl bg-secondary/20 p-4 text-center text-sm text-muted-foreground">
      Nothing here yet.
    </p>
  );
}