"use client";

import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui";
import { useCurrentUser } from "@/features/dashboard/hooks/use-current-user";

export function MeOverview() {
  const { data: user, isPending, isError, error } = useCurrentUser();

  if (isPending) {
    return <div className="h-56 animate-pulse rounded-2xl bg-muted" aria-hidden="true" />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Me</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : "An error occurred."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Me</h1>
        <p className="text-sm text-muted-foreground">Active user session information.</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative size-20 rounded-full border">
              <Image
                src={user.image}
                alt={user.username}
                className="object-cover"
                fill
                unoptimized
              />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 py-6 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">User ID</div>
            <div className="text-sm break-all">{user.id}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Joined</div>
            <div className="text-sm">{new Date(user.createdAt).toLocaleString()}</div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <div className="text-sm font-medium text-muted-foreground">Bio</div>
            <div className="text-sm">{user.bio || "No bio provided."}</div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
