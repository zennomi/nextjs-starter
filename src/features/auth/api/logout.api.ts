import { post } from "@/lib/api";

export const logout = async (): Promise<void> => {
  await post<void>("/v1/auth/logout");
};
