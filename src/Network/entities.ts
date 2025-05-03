import Entity from "./Instances/Entity";
import Nexus from "./Instances/Nexus";
import { Collection, EntityProfile, MessageRecord } from "./specs";

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
  return {
    id: Date.now() + "",
    from: "salimon",
    type: "actionResult",
    meta: lastMessage.meta,
    result: {
      status: "failure",
      message:
        "we could not find active entity in network to answer to your messages. Please contact support or try again later.",
    },
    sentAt: Date.now(),
  };
}

export async function handleInteractionCycle() {}
