import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Stethoscope, HeartPulse, ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/mock/patients";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — VitalGuard AI" }] }),
  component: RegisterPage,
});

const roles: { id: Role; label: string; icon: typeof Stethoscope; desc: string }[] = [
  { id: "doctor", label: "Doctor", icon: Stethoscope, desc: "Clinical oversight" },
  { id: "nurse", label: "Nurse", icon: HeartPulse, desc: "Bedside care" },
  { id: "admin", label: "Admin", icon: ShieldCheck, desc: "System & analytics" },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("doctor");

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join your hospital's monitoring network"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/dashboard" });
        }}
      >
        <div className="space-y-1.5">
          <Label>Register as</Label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRole(r.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all",
                  role === r.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50",
                )}
              >
                <r.icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{r.label}</span>
                <span className="text-[10px] leading-tight">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" required placeholder="Dr. Jane Doe" className="bg-secondary/40 pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" required placeholder="you@hospital.org" className="bg-secondary/40 pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" required placeholder="••••••••" className="bg-secondary/40 pl-9" />
          </div>
        </div>
        <Button type="submit" className="w-full" style={{ background: "var(--gradient-primary)" }}>
          Create {role} account
        </Button>
      </form>
    </AuthLayout>
  );
}
