import { AsyncStorage } from "./storage.interface";
import { StorageKey } from "./storage.keys";
import { TypedStorage } from "./typedStorage.interface";

export class TypedStorageImpl implements TypedStorage {
  constructor(private storage: AsyncStorage) {}

  async get<T>(key: StorageKey): Promise<T | null> {
    const value = await this.storage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  async set<T>(key: StorageKey, value: T) {
    await this.storage.setItem(key, JSON.stringify(value));
  }

  async remove(key: StorageKey) {
    await this.storage.removeItem(key);
  }

  async getStorage() {
    return this.storage;
  }
}
