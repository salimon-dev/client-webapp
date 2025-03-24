import { MessageRecord } from "@network/specs";
import { IDBPDatabase, openDB } from "idb";
import { BehaviorSubject } from "rxjs";

export default class DataBase {
  public name: string = "none";

  // under no condition database is going to work without db
  public db: IDBPDatabase<unknown> = {} as never;

  public messages = new BehaviorSubject<MessageRecord[]>([]);

  public async setup(name: string) {
    this.name = name;
    this.db = await openDB(name, 1, {
      upgrade: (db, oldVersion, newVersion) => {
        if (!db.objectStoreNames.contains("messages")) {
          db.createObjectStore("messages", { keyPath: "id" });
        }
        // TODO: implement upgrade logic
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
    await this.updateMessageList();
  }

  private async updateMessageList() {
    const data = await this.db.getAll("messages");
    this.messages.next(data.sort((a, b) => b.sentAt - a.sentAt));
  }

  public async addMessage(message: MessageRecord) {
    await this.db.add("messages", message);
    await this.updateMessageList();
  }
}
