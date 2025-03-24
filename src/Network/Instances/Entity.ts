import axios, { Axios } from "axios";
import { getEntityTokens } from "../auth";
import { EntityProfile, InteractResponse, MessageRecord } from "../specs";

export default class Entity {
  public name: string;
  public description: string;
  public tags: string[];
  public baseUrl: string;

  public accessToken: string | undefined;
  public refresToken: string | undefined;
  public httpsClient = axios.create();
  constructor(profile: EntityProfile, private nexusHttpClient: Axios) {
    this.name = profile.name;
    this.description = profile.description;
    this.tags = profile.tags;
    this.baseUrl = profile.base_url;
    this.setup();
  }

  public setup = async () => {
    const result = await getEntityTokens(this.nexusHttpClient, this.name);
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

  public async interact(messages: MessageRecord[]) {
    const data = messages.map((message) => {
      return {
        body: message.body,
        from: message.from,
      };
    });
    const result = await this.httpsClient
      .post("/interact", { data })
      .then<InteractResponse>((response) => response.data);
    return result;
  }
}
