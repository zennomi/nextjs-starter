"use client";

import Link from "next/link";

import { GitBranch, Rocket } from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { Button } from "@/ui";
import { StackList } from "@/features/landing";
import { stackData } from "@/features/landing/data/stack-data";

export function Dashboard() {
  return (
    <section className="container py-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <Balancer
          as="h1"
          className="text-center text-2xl font-bold text-black lg:text-5xl dark:text-white"
        >
          zennomi/nextjs-starter
        </Balancer>

        <Balancer as="p" className="max-w-3xl px-3 text-center text-base">
          Open-source boilerplate for modern Next.js applications, featuring{" "}
          <strong className="font-semibold">React</strong>,{" "}
          <strong className="font-semibold">TypeScript</strong>,{" "}
          <strong className="font-semibold">Tailwind CSS</strong>, and{" "}
          <strong className="font-semibold">TanStack Query</strong>. Includes reusable components,
          hooks, and utilities to speed up development.
        </Balancer>
      </div>

      <StackList data={stackData} />

      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link
            href="https://vercel.com/new/clone?repository-url=https://github.com/zennomi/nextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Rocket className="h-4 w-4" aria-hidden="true" />
            Deploy to Vercel
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            href="https://github.com/zennomi/nextjs-starter/generate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch className="h-4 w-4" aria-hidden="true" />
            Use Template
          </Link>
        </Button>
      </div>
    </section>
  );
}
