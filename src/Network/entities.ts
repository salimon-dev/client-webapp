import Entity from "./Instances/Entity";
import Nexus from "./Instances/Nexus";
import { Collection, EntityProfile, MessageBody, MessageRecord } from "./specs";

export async function fetchEntities(nexus: Nexus) {
  const { status, data } = await nexus.httpClient.get<Collection<EntityProfile>>("/entities/search", {
    params: { page: 1, page_size: 128 },
  });
  if (status !== 200) {
    return;
  }
  nexus.entities = data.data.map((item) => new Entity(item, nexus.httpClient));
}

export function generateNoEntityFoundMessage(lastMessage: MessageRecord): MessageRecord {
  if (lastMessage.type === "plain") {
    return {
      id: Date.now() + "",
      from: "salimon",
      body: "We could not find active entity in network to answer to your messages. Please contact support or try again later.",
      sentAt: Date.now(),
      type: "plain",
    };
  }
  const body = JSON.parse(lastMessage.body) as MessageBody;
  return {
    id: Date.now() + "",
    from: "salimon",
    body: JSON.stringify({
      meta: body.meta,
      arguments: {
        result: "failed",
        message: "currently there are no entities to process this request. please try again later",
      },
    }),
    sentAt: Date.now(),
    type: "actionResult",
  };
}

export async function handleInteractionCycle() {}
