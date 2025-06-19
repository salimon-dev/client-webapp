export interface IThread {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
}

export interface IThreadMember {
  id: string;
  created_at: number;
  updated_at: number;
  thread_id: string;
  user_id: string;
}

export const MESSAGE_TYPE_PLAIN = 1;
export interface IMessage {
  id: string;
  created_at: number;
  updated_at: number;
  thread_id: string;
  user_id: string;
  username: string;
  body: string;
  type: number;
}
