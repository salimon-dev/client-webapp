import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults } from "axios";
import Nexus from "./Nexus";
import { HttpResponse, IAuthResponse } from "./specs";
import { IProfile } from "@specs/user";

interface IConfigs {
  nexus_base_url: string;
}

export async function loadConfigs(nexus: Nexus) {
  const response = await axios.get<IConfigs>("/configs.json");
  nexus.baseUrl = response.data.nexus_base_url;
}

export function clearTokens(nexus: Nexus) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  nexus.accessToken.next(undefined);
  nexus.refreshToken.next(undefined);
  nexus.profile.next(undefined);
}
export function updateTokens(data: IAuthResponse, nexus: Nexus) {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  nexus.accessToken.next(data.access_token);
  nexus.refreshToken.next(data.refresh_token);
  nexus.profile.next(data.data);
}

export async function validateTokens(nexus: Nexus) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (!accessToken || !refreshToken) {
    clearTokens(nexus);
    return;
  }
  try {
    const response = await axios.get<IProfile>("/profile", {
      baseURL: nexus.baseUrl,
      headers: { Authorization: "Bearer " + accessToken },
    });
    nexus.accessToken.next(accessToken);
    nexus.refreshToken.next(refreshToken);
    nexus.profile.next(response.data);
  } catch {
    try {
      const response = await axios.post<IAuthResponse>(
        "/auth/rotate",
        { token: refreshToken },
        { baseURL: nexus.baseUrl }
      );
      updateTokens(response.data, nexus);
    } catch {
      clearTokens(nexus);
    }
  }
}

export function setupHttpClient(nexus: Nexus) {
  const config: CreateAxiosDefaults = { baseURL: nexus.baseUrl };
  const accessToken = nexus.accessToken.value;
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer " + accessToken,
    };
  }
  const client = axios.create(config);
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const error = err as AxiosError;
      if (error.status === 401 && accessToken) {
        // TODO: implement
        // await rotateToken();
        return error.response;
      } else {
        throw error;
      }
    }
  );
  nexus.httpClient = client;
}

export async function transformHttpResponse<T>(
  call: () => Promise<AxiosResponse<T>>
): Promise<HttpResponse<T>> {
  try {
    const response = await call();
    return { code: 200, data: response.data };
  } catch (e) {
    const err = e as AxiosError;
    if (err.status === 400 && err.response) {
      const errors = err.response.data as { [key: string]: string };
      Object.keys(errors).forEach((key) => {
        if (!errors[key]) return;
        errors[key] = errors[key].replace("_", " ");
      });
      return { code: 400, errors };
    } else {
      return { code: 0 };
    }
  }
}
