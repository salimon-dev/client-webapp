import { BehaviorSubject } from "rxjs";
import { clearTokens, loadConfigs, setupHttpClient, validateTokens } from "./configs";
import { IProfile } from "./specs";
import axios from "axios";
import { getProfile, ILoginParams, IRegisterParams, login, register } from "./auth";

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
  register(params: IRegisterParams) {
    return register(this, params);
  }
  public getProfile = () => {
    return getProfile(this);
  };
  public logout = () => {
    clearTokens(this);
  };
}
