import { get } from "@/lib/api";

import { UserSchema, type User } from "@/features/dashboard/schemas/user.schema";

export const getCurrentUser = async (signal?: AbortSignal): Promise<User> => {
  const response = await get<unknown>("/v1/users/me", { signal });

  return UserSchema.parse(response);
};
