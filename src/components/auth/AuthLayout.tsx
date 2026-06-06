import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldPlus } from "lucide-react";
import { motion } from "motion/react";
import { EcgLine } from "@/components/vital/EcgLine";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-purple/20 blur-[120px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="mb-6 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <ShieldPlus className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">VitalGuard AI</span>
        </Link>
        <div className="glass-card rounded-3xl p-7">
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="mb-5 overflow-hidden rounded-xl bg-secondary/30">
            <EcgLine color="var(--cyan)" height={36} />
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </motion.div>
    </div>
  );
}
