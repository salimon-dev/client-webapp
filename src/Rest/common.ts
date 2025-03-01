import { accessTokenAtom, refreshTokenAtom, store } from "@providers/store";
import { IConfigs } from "@specs/configs";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";

export interface ISearchParams {
  page: number;
  page_size: number;
}

export interface ICollection<T> {
  data: T[];
  page: number;
  page_size: number;
  total: number;
}

// TODO: implement this function
function rotateToken() {
  const refreshToken = store.get(refreshTokenAtom);
  console.log(refreshToken);
}

export function httpClient() {
  const config: CreateAxiosDefaults = { baseURL };
  const accessToken = store.get(accessTokenAtom);
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
        await rotateToken();
        return error.response;
      } else {
        return error.response;
      }
    }
  );
  return client;
}

export let baseURL = "http://localhost:8080";

export async function loadConfigs() {
  const response = await axios.get<IConfigs>("/configs.json").then((response) => response.data);
  baseURL = response.base_url;
}
