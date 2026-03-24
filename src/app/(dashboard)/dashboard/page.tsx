import { redirect } from "next/navigation";

import { routes } from "@/config/routes";

export default function DashboardIndexPage() {
  redirect(routes.dashboard.me);
}
