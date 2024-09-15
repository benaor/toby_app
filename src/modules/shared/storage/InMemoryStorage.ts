import { IStorage } from "./storage.interface";
import { StorageKey } from "./storage.keys";

export class InMemoryStorage implements IStorage {
  private storage = new Map<StorageKey, string>();

  set(key: StorageKey, value: unknown) {
    const valueToStored = JSON.stringify(value);
    this.storage.set(key, valueToStored);
  }

  get(key: StorageKey) {
    const res = this.storage.get(key);

    return res ? JSON.parse(res) : null;
  }

  remove(key: StorageKey) {
    this.storage.delete(key);
  }
}
