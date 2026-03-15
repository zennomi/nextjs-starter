"use client";

import Link from "next/link";

import { Button } from "@/ui";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Error</h2>
      <p className="text-muted-foreground">
        Something went wrong!
        {isDev && error?.message && (
          <span className="mt-2 block text-sm text-muted-foreground/80">{error.message}</span>
        )}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Go to home</Link>
        </Button>
      </div>
    </div>
  );
}
