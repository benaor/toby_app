import { AsyncStorage, TypedStorage } from "./storage.interface";
import { StorageKey } from "./storage.keys";

export class InMemoryStorage implements AsyncStorage {
  private storage = new Map<string, string>();
  length: number = this.storage.size;

  async setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getItem(key: string) {
    return this.storage.get(key) ?? null;
  }

  async removeItem(key: string) {
    this.storage.delete(key);
  }
}

export class InMemoryTypedStorage implements TypedStorage {
  constructor(private storage: AsyncStorage) {}

  async get<T>(key: StorageKey): Promise<T | null> {
    const value = await this.storage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  async set<T>(key: StorageKey, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  async remove(key: StorageKey) {
    this.storage.removeItem(key);
  }

  async getStorage() {
    return this.storage;
  }
}
