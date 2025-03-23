import Nexus from "./Nexus";

export interface InteractParams {
  body: string;
}
export async function interact(params: InteractParams, nexus: Nexus) {
  const entity = nexus.entities.find((item) => item.tags.includes("general"));
  if (!entity) throw new Error("no entity found");
  const result = await entity.interact(params);

  console.log(result);
}
