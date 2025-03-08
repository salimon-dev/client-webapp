import { getEntityTokens } from "./auth";
import Nexus from "./Nexus";
import { IEntityProfile } from "./specs";

export default class Entity {
  public name: string;
  public description: string;
  public tags: string[];
  public baseUrl: string;

  public accessToken: string | undefined;
  public refresToken: string | undefined;
  constructor(profile: IEntityProfile, private nexus: Nexus) {
    this.name = profile.name;
    this.description = profile.description;
    this.tags = profile.tags;
    this.baseUrl = profile.base_url;
    this.setup();
  }

  public setup = async () => {
    const result = await getEntityTokens(this.nexus, this.name);
    if (result.code !== 200) {
      // TODO: some issue is here
      console.error(result);
      return;
    }
    this.accessToken = result.data.access_token;
    this.refresToken = result.data.refresh_token;
  };
}
