import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import Nexus from "./Nexus";
import { IAuthResponse } from "./specs";
import { IProfile } from "@specs/user";

interface IConfigs {
  nexus_base_url: string;
}

export async function loadConfigs(nexus: Nexus) {
  const response = await axios.get<IConfigs>("/configs.json");
  nexus.baseUrl = response.data.nexus_base_url;
}

function clearTokens(nexus: Nexus) {
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
        return error.response;
      }
    }
  );
  nexus.httpClient = client;
}
