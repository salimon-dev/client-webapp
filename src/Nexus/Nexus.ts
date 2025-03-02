import { BehaviorSubject } from "rxjs";
import { loadConfigs, setupHttpClient, validateTokens } from "./configs";
import { IProfile } from "./specs";
import axios from "axios";
import { getProfile, ILoginParams, login } from "./auth";

export default class Nexus {
  public baseUrl = "none";

  public isReady = new BehaviorSubject<boolean>(false);

  public accessToken = new BehaviorSubject<string | undefined>(undefined);
  public refreshToken = new BehaviorSubject<string | undefined>(undefined);
  public profile = new BehaviorSubject<IProfile | undefined>(undefined);

  public httpClient = axios.create();

  async bootstrap() {
    await loadConfigs(this);
    await validateTokens(this);
    setupHttpClient(this);
    this.isReady.next(true);
  }

  // auth methods
  login(param: ILoginParams) {
    return login(this, param);
  }
  getProfile() {
    return getProfile(this);
  }
}
