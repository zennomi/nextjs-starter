import { UserSchema, type User } from "@/schemas/user.schema";

import { get } from "@/lib/api";

export const getCurrentUser = async (signal?: AbortSignal): Promise<User> => {
  const response = await get<unknown>("/v1/users/me", { signal });

  return UserSchema.parse(response);
};
