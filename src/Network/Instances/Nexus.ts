import { BehaviorSubject, map } from "rxjs";
import { clearTokens, loadConfigs, setupHttpClient, validateTokens } from "../configs";
import { Profile } from "../specs";
import axios from "axios";
import { getProfile, LoginParams, RegisterParams, login, register } from "../auth";
import { fetchEntities } from "../entities";
import Entity from "./Entity";
import { InteractParams } from "../specs";
import DataBase from "./Database";
import { v4 as uuidV4 } from "uuid";

export default class Nexus {
  public db = new DataBase();

  public baseUrl = "none";
  public httpClient = axios.create();

  public entities: Entity[] = [];

  public accessToken = new BehaviorSubject<string | undefined>(undefined);
  public refreshToken = new BehaviorSubject<string | undefined>(undefined);
  public profile = new BehaviorSubject<Profile | undefined>(undefined);

  public isReady = new BehaviorSubject<boolean>(false);
  public activeEntity = new BehaviorSubject<Entity | undefined>(undefined);
  public isLoggedIn = this.accessToken.pipe(map((value) => value !== undefined));

  public bootstrap = async () => {
    await loadConfigs(this);
    await this.db.setup(this.baseUrl);
    // TODO: destory subscriptions when nexus terminated

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
  public interact = async (params: InteractParams) => {
    // step 1: add user message to database
    await this.db.addMessage({
      id: uuidV4(),
      body: params.body,
      from: "user",
      sentAt: Date.now(),
      type: "plain",
    });
    // step 2: find an entity for interaction
    const entity = this.entities.find((item) => item.tags.includes("general"));
    if (!entity) throw new Error("no entity found");
    // step 3: send data to entity
    this.activeEntity.next(entity);
    const result = await entity.interact(this.db.messages.value);
    await this.db.addMessage({
      from: result.from,
      body: result.body,
      id: uuidV4(),
      sentAt: Date.now(),
      type: result.type,
    });
    this.activeEntity.next(undefined);
  };
}
