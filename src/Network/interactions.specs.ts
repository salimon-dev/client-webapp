export interface Parameters {
  record_key?: string;
  string_value?: string;
}

export interface Meta {
  action_id: string;
}

export interface Result {
  status: "success" | "failure";
  message: string;
}

type BaseMessage = {
  from: string;
  type: string;
};

export type ActionResultMessage = BaseMessage & {
  type: "actionResult";
  meta: Meta;
  result: Result;
};
export type PlainMessage = BaseMessage & {
  type: "plain";
  body: string;
};
export type SetStringValueMessage = BaseMessage & {
  type: "setStringValue";
  meta: Meta;
  parameters: {
    record_key: string;
    string_value: string;
  };
};
export type GetStringValueMessage = BaseMessage & {
  type: "getStringValue";
  meta: Meta;
  parameters: {
    record_key: string;
  };
};

export type Message = ActionResultMessage | PlainMessage | SetStringValueMessage | GetStringValueMessage;

export interface InteractionSchema {
  data: Message[];
}
