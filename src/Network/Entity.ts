import axios from "axios";
import { getEntityTokens } from "./auth";
import Nexus from "./Nexus";
import { EntityProfile } from "./specs";
import { InteractParams } from "./interact";

export default class Entity {
  public name: string;
  public description: string;
  public tags: string[];
  public baseUrl: string;

  public accessToken: string | undefined;
  public refresToken: string | undefined;
  public httpsClient = axios.create();
  constructor(profile: EntityProfile, private nexus: Nexus) {
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
    this.setupHttpClient();
  };

  public setupHttpClient() {
    this.httpsClient = axios.create({
      baseURL: this.baseUrl,
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  public async interact(params: InteractParams) {
    const data = { data: [{ from: "user", body: params.body }] };
    try {
      const result = await this.httpsClient.post("/interact", data).then((response) => response.data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
}
