import { IStorage } from "./storage.interface";
import { StorageKey } from "./storage.keys";

export class InMemoryStorage implements IStorage {
  private storage = new Map<StorageKey, string>();

  async set<T>(key: StorageKey, value: T) {
    const valueToStored = JSON.stringify(value);
    this.storage.set(key, valueToStored);
  }

  async get<T>(key: StorageKey) {
    const res = this.storage.get(key);

    return Promise.resolve(res ? (JSON.parse(res) as T) : null);
  }

  async remove(key: StorageKey) {
    await Promise.resolve(this.storage.delete(key));
  }
}
