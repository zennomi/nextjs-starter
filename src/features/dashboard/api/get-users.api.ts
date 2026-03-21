import {
  UsersListParamsSchema,
  UsersListResponseSchema,
  type UsersListParams,
  type UsersListResponse
} from "@/schemas/user.schema";

import { get } from "@/lib/api";

export const getUsers = async (
  input: Partial<UsersListParams>,
  signal?: AbortSignal
): Promise<UsersListResponse> => {
  const params = UsersListParamsSchema.parse(input);
  const response = await get<unknown>("/v1/users", {
    params,
    signal
  });

  return UsersListResponseSchema.parse(response);
};
