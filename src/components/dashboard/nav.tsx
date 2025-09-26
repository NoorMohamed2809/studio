"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ClipboardList,
  HeartPulse,
  BookOpen,
  Bell,
  AlertTriangle,
  LogOut,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/log", label: "Symptom Log", icon: ClipboardList },
  {
    href: "/dashboard/risk-assessment",
    label: "Risk Assessment",
    icon: HeartPulse,
  },
  { href: "/dashboard/education", label: "Learn", icon: BookOpen },
  { href: "/dashboard/reminders", label: "Reminders", icon: Bell },
  { href: "/dashboard/emergency", label: "Emergency", icon: AlertTriangle },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold font-headline text-primary-foreground">
            HeartWise
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="w-full justify-start"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" className="w-full justify-start">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
