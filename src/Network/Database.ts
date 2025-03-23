import { openDB } from "idb";

export default class DataBase {
  public name: string = "none";

  public async setup(name: string) {
    this.name = name;
    return openDB(name, 1, {
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
  }
}
