import { StorageKey } from "./storage.keys";
import { Storage } from "./Storage.port";

export class InMemoryStorage implements Storage {
  private storage = new Map<StorageKey, string>();

  set(key: StorageKey, value: unknown) {
    const valueToStored = JSON.stringify(value);
    this.storage.set(key, valueToStored);
  }

  get(key: StorageKey) {
    const res = this.storage.get(key);

    return res ? JSON.parse(res) : null;
  }
}
