import { AsyncStorage } from "./storage.interface";
import { StorageKey } from "./storage.keys";

export interface TypedStorage {
  get<T>(key: StorageKey): Promise<T | null>;
  set<T>(key: StorageKey, value: T): Promise<void>;
  remove(key: StorageKey): Promise<void>;
  getStorage(): AsyncStorage;
}
