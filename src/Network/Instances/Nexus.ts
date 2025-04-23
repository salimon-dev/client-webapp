import { BehaviorSubject, map } from "rxjs";
import { clearTokens, loadConfigs, setupHttpClient, validateTokens } from "../configs";
import { MessageRecord, Profile } from "../specs";
import axios from "axios";
import { getProfile, LoginParams, RegisterParams, login, register } from "../auth";
import { fetchEntities, generateNoEntityFoundMessage } from "../entities";
import Entity from "./Entity";
import { InteractParams } from "../specs";
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

    this.db.interactionSignal.subscribe(this.handleInteractionSignal);
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
    await this.db.addMessage({
      type: "plain",
      body: params.body,
      from: "user",
    });
  };

  private handleInteractionSignal = async (message: MessageRecord) => {
    const { type, from } = message;
    if (type === "plain" && from !== "user") {
      // it means this is the last cycle of interaction
      return;
    }

    // find the entity with compatible AK
    const entity = this.entities.find((item) => item.tags.includes(type));
    if (!entity) {
      return await this.db.addMessage(generateNoEntityFoundMessage(message));
    }

    this.activeEntity.next(entity);
    try {
      // interact with entity
      const result = await entity.interact(this.db.messages.value);
      await this.db.addMessage({
        type: result.type,
        body: result.body,
        from: result.from,
      });
    } catch (e) {
      // TODO: we have to do something here (rollback messages?)
      console.log(e);
    } finally {
      this.activeEntity.next(undefined);
    }
  };
}
