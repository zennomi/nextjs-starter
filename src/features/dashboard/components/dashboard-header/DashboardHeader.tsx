import { UserMenu } from "@/features/dashboard/components/user-menu/UserMenu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-8">
      <div className="text-lg font-semibold tracking-tight">NextJS Starter</div>
      <UserMenu />
    </header>
  );
}
