import { IStorage, TypedStorage } from "./storage.interface";
import { StorageKey } from "./storage.keys";

export class InMemoryStorage implements IStorage {
  private storage = new Map<string, string>();
  length: number = this.storage.size;

  setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

  getItem(key: string) {
    return this.storage.get(key) ?? null;
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }
}

export class InMemoryTypedStorage implements TypedStorage {
  constructor(private storage: IStorage) {}

  get<T>(key: StorageKey): T | null {
    const value = this.storage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  set<T>(key: StorageKey, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: StorageKey) {
    this.storage.removeItem(key);
  }

  getStorage() {
    return this.storage;
  }
}
