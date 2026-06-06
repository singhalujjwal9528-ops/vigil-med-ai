import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  ShieldPlus,
  BellRing,
  HeartPulse,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Clock,
  Zap,
} from "lucide-react";
import { EcgLine } from "@/components/vital/EcgLine";
import { testimonials } from "@/lib/mock/patients";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VitalGuard AI — Predict Patient Deterioration Before It's Critical" },
      {
        name: "description",
        content:
          "VitalGuard AI is an AI-powered smart patient monitoring and early warning system that predicts deterioration in real time, so clinical teams can act before it becomes critical.",
      },
      { property: "og:title", content: "VitalGuard AI — AI-Powered Early Warning System" },
      {
        property: "og:description",
        content: "Real-time patient monitoring and predictive healthcare for modern clinical teams.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    desc: "Continuous vitals streaming from every bed into one calm, glanceable station.",
    color: "var(--cyan)",
  },
  {
    icon: BrainCircuit,
    title: "Predictive AI",
    desc: "Deterioration risk scored continuously with confidence and probability metrics.",
    color: "var(--purple)",
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    desc: "Prioritized, actionable alerts that reduce noise and surface what matters.",
    color: "var(--warning)",
  },
  {
    icon: ShieldPlus,
    title: "Early Warning",
    desc: "Catch silent deterioration hours earlier with trend-aware modeling.",
    color: "var(--primary)",
  },
  {
    icon: LineChart,
    title: "Clinical Analytics",
    desc: "Executive dashboards for risk distribution, occupancy and recovery trends.",
    color: "var(--success)",
  },
  {
    icon: HeartPulse,
    title: "Role Workspaces",
    desc: "Tailored views for doctors, nurses and administrators in one platform.",
    color: "var(--critical)",
  },
];

const steps = [
  { icon: Activity, title: "Connect", desc: "Vitals stream in from monitors across the ward in real time." },
  { icon: BrainCircuit, title: "Analyze", desc: "AI models score deterioration risk every few seconds." },
  { icon: Zap, title: "Predict", desc: "Trends and probabilities forecast critical events early." },
  { icon: Stethoscope, title: "Act", desc: "Teams receive prioritized, actionable recommendations." },
];

const benefits = [
  "Detect deterioration up to 6 hours earlier",
  "Reduce alarm fatigue with prioritized alerts",
  "Lower ICU readmissions and adverse events",
  "Unified view across every ward and bed",
  "Explainable AI insights clinicians trust",
  "Deploys without changing existing monitors",
];

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <ShieldPlus className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">VitalGuard AI</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="transition-colors hover:text-foreground">How It Works</a>
            <a href="#benefits" className="transition-colors hover:text-foreground">Benefits</a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Sign in
            </Link>
            <Link
              to="/dashboard"
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute right-10 top-40 h-60 w-60 rounded-full bg-purple/20 blur-[120px]" />
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              Predictive healthcare, live
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered Smart Patient Monitoring &amp; <span className="gradient-text">Early Warning System</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              VitalGuard AI continuously monitors every patient and predicts deterioration before it becomes critical —
              giving clinical teams the lead time to act.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-primary)" }}
              >
                View Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Request Demo
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div><span className="text-xl font-bold text-foreground">6 hrs</span><br />earlier detection</div>
              <div><span className="text-xl font-bold text-foreground">94%</span><br />model confidence</div>
              <div><span className="text-xl font-bold text-foreground">24/7</span><br />live monitoring</div>
            </div>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Live Vitals · ICU-03</p>
                  <p className="text-lg font-bold">Eleanor Whitman</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-critical/15 px-2.5 py-1 text-xs font-semibold text-critical">
                  <span className="h-2 w-2 animate-ping rounded-full bg-critical" /> Critical
                </span>
              </div>
              <div className="mt-3 rounded-xl bg-secondary/40 p-3">
                <EcgLine color="var(--cyan)" height={56} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { l: "HR", v: "118", u: "bpm", c: "var(--critical)" },
                  { l: "SpO₂", v: "89", u: "%", c: "var(--warning)" },
                  { l: "Temp", v: "38.6", u: "°C", c: "var(--cyan)" },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-secondary/40 p-3">
                    <p className="text-[11px] text-muted-foreground">{m.l}</p>
                    <p className="text-xl font-bold" style={{ color: m.c }}>{m.v}</p>
                    <p className="text-[10px] text-muted-foreground">{m.u}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-purple/30 bg-purple/10 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-purple">
                  <BrainCircuit className="h-3.5 w-3.5" /> AI Insight
                </p>
                <p className="mt-1 text-sm">Possible respiratory distress — SpO₂ trending down.</p>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass-card absolute -left-6 bottom-10 hidden rounded-2xl p-3 sm:block"
            >
              <p className="text-[11px] text-muted-foreground">Risk Score</p>
              <p className="text-2xl font-bold text-critical">88</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading eyebrow="Features" title="Everything a modern clinical team needs" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${f.color} 18%, transparent)`, color: f.color }}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading eyebrow="How It Works" title="From signal to action in seconds" />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative glass-card rounded-2xl p-6"
            >
              <span className="text-sm font-bold text-primary">0{i + 1}</span>
              <s.icon className="mt-3 h-6 w-6 text-cyan" />
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Benefits" title="Outcomes that matter at the bedside" align="left" />
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "↓ 38%", l: "Adverse events", c: "var(--success)" },
              { v: "↑ 6 hrs", l: "Earlier warning", c: "var(--cyan)" },
              { v: "↓ 52%", l: "Alarm fatigue", c: "var(--purple)" },
              { v: "94%", l: "Model confidence", c: "var(--primary)" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-3xl font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading eyebrow="Testimonials" title="Trusted by clinical leaders" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card flex flex-col rounded-2xl p-6"
            >
              <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="glass-card relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-cyber)", filter: "blur(80px)" }} />
          <Clock className="mx-auto h-8 w-8 text-cyan" />
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold">Predicting patient deterioration before it becomes critical</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">See VitalGuard AI in action with a live, simulated hospital monitoring station.</p>
          <Link
            to="/dashboard"
            className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-primary)" }}
          >
            View Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <ShieldPlus className="h-4 w-4" />
            </div>
            <span className="font-semibold">VitalGuard AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 VitalGuard AI · Predictive healthcare monitoring</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <Link to="/login" className="hover:text-foreground">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
