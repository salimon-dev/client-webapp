import { BehaviorSubject, map } from "rxjs";
import { clearTokens, loadConfigs, setupHttpClient, validateTokens } from "./configs";
import { IProfile } from "./specs";
import axios from "axios";
import { getProfile, ILoginParams, IRegisterParams, login, register } from "./auth";
import { fetchEntities } from "./entities";
import Entity from "./Entity";

export default class Nexus {
  public baseUrl = "none";
  public httpClient = axios.create();

  public entities: Entity[] = [];

  public accessToken = new BehaviorSubject<string | undefined>(undefined);
  public refreshToken = new BehaviorSubject<string | undefined>(undefined);
  public profile = new BehaviorSubject<IProfile | undefined>(undefined);

  public isReady = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.accessToken.pipe(map((value) => value !== undefined));

  public bootstrap = async () => {
    await loadConfigs(this);
    await validateTokens(this);
    setupHttpClient(this);
    this.isReady.next(true);

    // hook events
    this.isLoggedIn.subscribe(async (result) => {
      if (!result) return;
      await fetchEntities(this);
    });
  };

  // auth methods
  public login = (param: ILoginParams) => {
    return login(this, param);
  };
  public register = (params: IRegisterParams) => {
    return register(this, params);
  };
  public getProfile = () => {
    return getProfile(this);
  };
  public logout = () => {
    clearTokens(this);
  };
}
