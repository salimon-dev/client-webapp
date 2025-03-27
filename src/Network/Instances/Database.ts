import { MessageRecord, MessageRecordParam, MessageType } from "@network/specs";
import { IDBPDatabase, openDB } from "idb";
import { BehaviorSubject, Subject } from "rxjs";

const MESSAGE_COUNT_CAP = 32;
const MESSAGE_DATE_CAP = 1000 * 3600 * 4;

export default class DataBase {
  public name: string = "none";

  // under no condition database is going to work without db
  public db: IDBPDatabase<unknown> = {} as never;

  public messages = new BehaviorSubject<MessageRecord[]>([]);
  // this signal activates when new data added to the list of messages
  public interactionSignal = new Subject<{ type: MessageType; from: string }>();

  public async setup(name: string) {
    this.name = name;
    this.db = await openDB(name, 1, {
      upgrade: (db, oldVersion, newVersion) => {
        console.log("here");
        if (!db.objectStoreNames.contains("messages")) {
          db.createObjectStore("messages", { keyPath: "id" });
        } else {
          // TODO: this will lose user data
          db.deleteObjectStore("messages");
          db.createObjectStore("messages", { keyPath: "id" });
        }
        console.log(`upgrade needed from ${oldVersion} to ${newVersion}`);
      },
      blocked: (currentVersion, blockedVersion) => {
        console.log(`blocked from ${currentVersion} to ${blockedVersion}`);
      },
      blocking: (currentVersion, blockingVersion) => {
        console.log(`blocking from ${currentVersion} to ${blockingVersion}`);
      },
      terminated: () => {
        console.log("database terminated");
      },
    });
    await this.clearOldHistory();
    await this.updateMessageList();
  }

  private async clearOldHistory() {
    const messages = await this.db.getAll("messages");
    const count = messages.length;
    let index = 0;
    if (count > MESSAGE_COUNT_CAP) {
      for (let i = 0; i < count - MESSAGE_COUNT_CAP; i++) {
        await this.db.delete("messages", messages[i].id);
        index = i;
      }
    }
    for (index; index < count; index++) {
      if (messages[index].sentAt + MESSAGE_DATE_CAP <= Date.now()) {
        await this.db.delete("messages", messages[index].id);
      }
    }
  }

  private async updateMessageList() {
    const data = await this.db.getAll("messages");
    this.messages.next(data);
  }

  public async addMessage(message: MessageRecordParam) {
    await this.db.add("messages", { ...message, id: Date.now(), sentAt: Date.now() });
    await this.updateMessageList();
    this.interactionSignal.next({ type: message.type, from: message.from });
  }
}
