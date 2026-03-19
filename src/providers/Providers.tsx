"use client";

import { AuthBootstrap } from "@/providers/AuthBootstrap";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthBootstrap />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
