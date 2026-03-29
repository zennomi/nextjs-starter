"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CircleUserRound, Users } from "lucide-react";

import { routes } from "@/config/routes";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    href: routes.dashboard.me,
    icon: CircleUserRound,
    label: "me"
  },
  {
    href: routes.dashboard.users,
    icon: Users,
    label: "users"
  }
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b bg-sidebar md:w-64 md:border-r md:border-b-0">
      <nav className="flex h-full flex-row gap-2 overflow-x-auto p-4 md:flex-col md:overflow-visible">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex min-w-fit items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium capitalize transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
