"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth.store";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header/DashboardHeader";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar/DashboardSidebar";

export function DashboardShell({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (hasHydrated && !session) {
      router.replace("/sign-in");
    }
  }, [hasHydrated, router, session]);

  if (!hasHydrated || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen flex-col md:flex-row">
        <DashboardSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
