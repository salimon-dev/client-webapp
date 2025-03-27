import Entity from "./Instances/Entity";
import Nexus from "./Instances/Nexus";
import { Collection, EntityProfile } from "./specs";

export async function fetchEntities(nexus: Nexus) {
  const { status, data } = await nexus.httpClient.get<Collection<EntityProfile>>("/entities/search", {
    params: { page: 1, page_size: 128 },
  });
  if (status !== 200) {
    return;
  }
  nexus.entities = data.data.map((item) => new Entity(item, nexus.httpClient));
}
