import { StorageKey } from "./storage.keys";

export interface Storage {
  get(key: StorageKey): unknown | null;
  set(key: StorageKey, value: unknown): void;
}
