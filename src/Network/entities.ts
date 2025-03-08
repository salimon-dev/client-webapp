import Entity from "./Entity";
import Nexus from "./Nexus";
import { ICollection, IEntityProfile } from "./specs";

export async function fetchEntities(nexus: Nexus) {
  const { status, data } = await nexus.httpClient.get<ICollection<IEntityProfile>>("/entities/search", {
    params: { page: 1, page_size: 128 },
  });
  if (status !== 200) {
    return;
  }
  nexus.entities = data.data.map((item) => new Entity(item, nexus));
}
