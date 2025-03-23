export type MessageType = "plain";

export interface MessageRecord {
  id: number;
  from: string;
  body: string;
  type: MessageType;
  sentAt: Date;
}
