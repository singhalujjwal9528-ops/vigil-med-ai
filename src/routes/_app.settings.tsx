import { createFileRoute } from "@tanstack/react-router";
import { User, Bell, Shield, SlidersHorizontal } from "lucide-react";
import { PageTransition, PageHeader } from "@/components/vital/PageTransition";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — VitalGuard AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PageTransition>
      <PageHeader title="Settings" subtitle="Manage your profile and preferences" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card icon={<User className="h-4 w-4" />} title="Profile Settings">
          <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Dr. Amara Patel" className="bg-secondary/40" /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="a.patel@hospital.org" className="bg-secondary/40" /></div>
          <div className="space-y-1.5"><Label>Role</Label><Input defaultValue="ICU Director" className="bg-secondary/40" /></div>
          <Button style={{ background: "var(--gradient-primary)" }}>Save changes</Button>
        </Card>
        <Card icon={<Bell className="h-4 w-4" />} title="Notification Settings">
          <Toggle label="Critical alerts" defaultChecked /><Toggle label="AI recommendations" defaultChecked />
          <Toggle label="Email digests" /><Toggle label="Shift handover summaries" defaultChecked />
        </Card>
        <Card icon={<Shield className="h-4 w-4" />} title="Security Settings">
          <div className="space-y-1.5"><Label>Current password</Label><Input type="password" placeholder="••••••••" className="bg-secondary/40" /></div>
          <div className="space-y-1.5"><Label>New password</Label><Input type="password" placeholder="••••••••" className="bg-secondary/40" /></div>
          <Toggle label="Two-factor authentication" defaultChecked />
          <Button variant="secondary">Update password</Button>
        </Card>
        <Card icon={<SlidersHorizontal className="h-4 w-4" />} title="System Preferences">
          <Toggle label="Dark mode" defaultChecked /><Toggle label="Live vitals animation" defaultChecked />
          <Toggle label="Compact density" /><Toggle label="Auto-escalate critical alerts" defaultChecked />
        </Card>
      </div>
    </PageTransition>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-4 flex items-center gap-2 font-semibold">{icon} {title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/30 p-3">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
