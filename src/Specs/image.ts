export type MessageType = "plain";

export interface IMessage {
  id: number;
  from: string;
  body: string;
  type: MessageType;
  sentAt: Date;
}
