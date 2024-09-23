import { AsyncStorage } from "./storage.interface";

export class InMemoryStorage implements AsyncStorage {
  private storage = new Map<string, string>();

  async setItem(key: string, value: string) {
    this.storage.set(key, value);

    return await Promise.resolve();
  }

  async getItem(key: string) {
    const item = this.storage.get(key) ?? null;

    return await Promise.resolve(item);
  }

  async removeItem(key: string) {
    this.storage.delete(key);

    return await Promise.resolve();
  }
}
