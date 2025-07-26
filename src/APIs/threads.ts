import { httpClient } from "@providers/http";
import { ILocalMessage, IMessage, IThread, IThreadMember } from "@specs/threads";
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

interface ISearchMessageParams extends ISearchParams {
  thread_id: string;
  before?: number;
}
export async function searchMessages(params: ISearchMessageParams): Promise<ICollection<ILocalMessage>> {
  return httpClient
    .get<ICollection<IMessage>>("/member/messages", { params })
    .then((response) => response.data)
    .then((response) => ({
      ...response,
      data: response.data.map((item) => ({ ...item, sendStatus: "done" })),
    }));
}

interface ISendMessageParams {
  thread_id: string;
  body: string;
}
export async function sendMessage(params: ISendMessageParams) {
  return httpClient.post<IMessage>("/member/messages/send", params).then((response) => response.data);
}
