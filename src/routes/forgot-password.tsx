import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — VitalGuard AI" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We'll send you a secure reset link"
      footer={
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="h-10 w-10 text-success" />
          <p className="text-sm text-muted-foreground">
            If an account exists, a reset link is on its way to your inbox.
          </p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" required placeholder="you@hospital.org" className="bg-secondary/40 pl-9" />
            </div>
          </div>
          <Button type="submit" className="w-full" style={{ background: "var(--gradient-primary)" }}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
