import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  BrainCircuit,
  BellRing,
  Stethoscope,
  HeartPulse,
  BarChart3,
  Bell,
  Settings,
  ShieldPlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Live Monitoring", url: "/monitoring", icon: Activity },
      { title: "AI Prediction", url: "/ai-center", icon: BrainCircuit },
      { title: "Alerts", url: "/alerts", icon: BellRing },
    ],
  },
  {
    label: "Workspaces",
    items: [
      { title: "Doctor", url: "/doctor", icon: Stethoscope },
      { title: "Nurse", url: "/nurse", icon: HeartPulse },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2.5 px-2 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-lg" style={{ background: "var(--gradient-primary)" }}>
            <ShieldPlus className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold">VitalGuard AI</span>
            <span className="text-[10px] text-muted-foreground">Early Warning System</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2.5 rounded-xl bg-secondary/50 p-2.5 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            AP
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold">Dr. Amara Patel</span>
            <span className="text-[10px] text-muted-foreground">ICU Director</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
