import { AsyncStorage } from "./storage.interface";

export class InMemoryStorage implements AsyncStorage {
  private storage = new Map<string, string>();
  length: number = this.storage.size;

  async setItem(key: string, value: string) {
    this.storage.set(key, value);

    return Promise.resolve();
  }

  async getItem(key: string) {
    const item = this.storage.get(key) ?? null;

    return Promise.resolve(item);
  }

  async removeItem(key: string) {
    this.storage.delete(key);

    return Promise.resolve();
  }
}
