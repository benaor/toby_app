import { StorageKey } from "./storage.keys";

export interface IStorage {
  get(key: StorageKey): unknown | null;
  set(key: StorageKey, value: unknown): void;
  remove(key: StorageKey): void;
}
