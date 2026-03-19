import axios, { AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { env } from "@/env";

import { toAppError } from "@/lib/app-error";
import { getStoredAuthSession, isAccessTokenExpired, type AuthSession } from "@/lib/auth-session";

import { clearAuthSession, setAuthSession, useAuthStore } from "@/stores/auth.store";

import { RefreshTokenResponseSchema } from "@/features/dashboard/schemas/auth.schema";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json"
  }
});

const authApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json"
  }
});

const retriedRequests = new WeakSet<object>();

const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig | AxiosRequestConfig,
  accessToken: string
): void => {
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
    return;
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`
  };
};

const getAuthSnapshot = () => useAuthStore.getState().session ?? getStoredAuthSession();

let refreshPromise: Promise<AuthSession | null> | null = null;

async function refreshAccessToken() {
  const currentSession = getAuthSnapshot();

  if (!currentSession?.refreshToken) {
    clearAuthSession();
    return null;
  }

  try {
    const response = await authApi.post<unknown>("/v1/auth/refresh", {
      refreshToken: currentSession.refreshToken
    });
    const tokens = RefreshTokenResponseSchema.parse(response.data);
    const nextSession = {
      ...currentSession,
      ...tokens
    };

    setAuthSession(nextSession);

    return nextSession;
  } catch (error) {
    clearAuthSession();
    throw toAppError(error);
  }
}

const getFreshSession = async () => {
  const currentSession = getAuthSnapshot();

  if (!currentSession) {
    return null;
  }

  if (!isAccessTokenExpired(currentSession)) {
    return currentSession;
  }

  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

api.interceptors.request.use(async (config) => {
  const session = await getFreshSession();

  if (session?.accessToken) {
    setAuthorizationHeader(config, session.accessToken);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error) || !error.config || error.response?.status !== 401) {
      return Promise.reject(toAppError(error));
    }

    if (retriedRequests.has(error.config)) {
      return Promise.reject(toAppError(error));
    }

    try {
      const session = await getFreshSession();

      if (!session?.accessToken) {
        return Promise.reject(toAppError(error));
      }

      retriedRequests.add(error.config);
      setAuthorizationHeader(error.config, session.accessToken);

      return api.request(error.config);
    } catch (refreshError) {
      return Promise.reject(toAppError(refreshError));
    }
  }
);

type Cfg = AxiosRequestConfig & { signal?: AbortSignal };

export const get = async <T>(url: string, config?: Cfg) => (await api.get<T>(url, config)).data;

export const post = async <T, B = unknown>(url: string, body?: B, config?: Cfg) =>
  (await api.post<T>(url, body, config)).data;

export const put = async <T, B = unknown>(url: string, body?: B, config?: Cfg) =>
  (await api.put<T>(url, body, config)).data;

export const del = async <T>(url: string, config?: Cfg) => (await api.delete<T>(url, config)).data;
