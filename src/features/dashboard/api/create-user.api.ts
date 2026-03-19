import { post } from "@/lib/api";

import {
  CreateUserResponseSchema,
  normalizeCreateUserPayload,
  type CreateUserFormValues,
  type CreateUserResponse
} from "@/features/dashboard/schemas/create-user.schema";

export const createUser = async (payload: CreateUserFormValues): Promise<CreateUserResponse> => {
  const body = normalizeCreateUserPayload(payload);
  const response = await post<unknown, typeof body>("/v1/users", body);

  return CreateUserResponseSchema.parse(response);
};
