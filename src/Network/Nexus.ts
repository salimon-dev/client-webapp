import { BehaviorSubject, map } from "rxjs";
import { clearTokens, loadConfigs, setupHttpClient, validateTokens } from "./configs";
import { Profile } from "./specs";
import axios from "axios";
import { getProfile, LoginParams, RegisterParams, login, register } from "./auth";
import { fetchEntities } from "./entities";
import Entity from "./Entity";
import { interact, InteractParams } from "./interact";
import DataBase from "./Database";

export default class Nexus {
  public db = new DataBase();

  public baseUrl = "none";
  public httpClient = axios.create();

  public entities: Entity[] = [];

  public accessToken = new BehaviorSubject<string | undefined>(undefined);
  public refreshToken = new BehaviorSubject<string | undefined>(undefined);
  public profile = new BehaviorSubject<Profile | undefined>(undefined);

  public isReady = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.accessToken.pipe(map((value) => value !== undefined));

  public bootstrap = async () => {
    await loadConfigs(this);
    this.db.setup(this.baseUrl);

    await validateTokens(this);
    setupHttpClient(this);
    this.isReady.next(true);

    // hook events
    this.isLoggedIn.subscribe(async (result) => {
      setupHttpClient(this);
      if (!result) return;
      await fetchEntities(this);
    });
  };

  // auth methods
  public login = (param: LoginParams) => {
    return login(this, param);
  };
  public register = (params: RegisterParams) => {
    return register(this, params);
  };
  public getProfile = () => {
    return getProfile(this);
  };
  public logout = () => {
    clearTokens(this);
  };

  // interaction methods
  public interact = (params: InteractParams) => {
    return interact(params, this);
  };
}
