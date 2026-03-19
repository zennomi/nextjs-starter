import type { UsersListParams } from "@/features/dashboard/schemas/user.schema";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  currentUser: () => [...dashboardKeys.all, "current-user"] as const,
  users: () => [...dashboardKeys.all, "users"] as const,
  usersList: (params: UsersListParams) => [...dashboardKeys.users(), "list", params] as const,
  usersCreate: () => [...dashboardKeys.users(), "create"] as const
};
