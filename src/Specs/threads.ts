import { ITransaction } from "./transactions";
import { IUser } from "./users";

export interface IThread {
  id: string;
  created_at: number;
  updated_at: number;
  category: number;
  name: string;
  members: IUser[];
}

export interface IThreadMember {
  id: string;
  created_at: number;
  updated_at: number;
  thread_id: string;
  user_id: string;
}

export const MESSAGE_TYPE_PLAIN = 1;
export const MESSAGE_TYPE_PAYMENT = 2;
export interface IMessage {
  id: string;
  created_at: number;
  updated_at: number;
  thread_id: string;
  user_id: string;
  username: string;
  body: string;
  type: number;
  transaction?: ITransaction;
}

export interface ILocalMessage extends IMessage {
  sendStatus: "pending" | "failed" | "done";
}

export interface ILocalThread extends IThread {
  fetchedUntil: number | undefined;
  hasOlderMessages: boolean;
}

export const THREAD_CATEGORY_CHAT = 1;
export const THREAD_CATEGORY_PAYMENTS = 2;
