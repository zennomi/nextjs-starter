"use client";

import { AuthForm, UserList } from "@/features/landing";

export function Showcase() {
  return (
    <section className="container w-full max-w-5xl py-16">
      <div className="mb-6 space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Showcase</h2>
        <p className="text-muted-foreground">A showcase of the features of the project.</p>
      </div>

      <div className="grid gap-20 md:grid-cols-3">
        <UserList />
        <AuthForm />
      </div>
    </section>
  );
}
