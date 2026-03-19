"use client";

import { useEffect } from "react";

import { hydrateAuthStore } from "@/stores/auth.store";

export function AuthBootstrap() {
  useEffect(() => {
    hydrateAuthStore();
  }, []);

  return null;
}
