import { Dashboard, FeaturesList } from "@/features/landing";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center pb-40">
      <Dashboard />
      <FeaturesList />
    </section>
  );
}
