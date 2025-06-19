import { httpClient } from "@providers/http";
import { IMessage, IThread, IThreadMember } from "@specs/threads";
import { ICollection, ISearchParams } from "./common";

interface IStartThreadParams {
  target_id: string;
  message: string;
}

interface IStartThreadResponse {
  thread: IThread;
  members: IThreadMember[];
  messages: IMessage[];
}
export async function startThread(params: IStartThreadParams) {
  return httpClient
    .post<IStartThreadResponse>("/member/threads/start", params)
    .then((response) => response.data);
}

interface ISearchThreadsParams extends ISearchParams {
  name?: string;
}
export async function searchThreads(params: ISearchThreadsParams) {
  return httpClient
    .get<ICollection<IThread>>("/member/threads", { params })
    .then((response) => response.data);
}

export async function deleteThread(threadId: string) {
  return httpClient.delete(`/member/threads/${threadId}`).then((response) => response.data);
}
