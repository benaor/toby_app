import { StorageKey } from "./storage.keys";

export interface IStorage
  extends Pick<Storage, "getItem" | "setItem" | "removeItem" | "lenght"> {}

export interface TypedStorage {
  get<T>(key: StorageKey): T | null;
  set<T>(key: StorageKey, value: T): void;
  remove(key: StorageKey): void;
  getStorage(): IStorage;
}
