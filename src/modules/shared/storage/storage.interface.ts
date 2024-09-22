import { StorageKey } from "./storage.keys";

export interface AsyncStorage
  extends PromisifyMethods<
    Pick<Storage, "getItem" | "setItem" | "removeItem">
  > {}

export interface TypedStorage {
  get<T>(key: StorageKey): Promise<T | null>;
  set<T>(key: StorageKey, value: T): Promise<void>;
  remove(key: StorageKey): Promise<void>;
  getStorage(): Promise<AsyncStorage>;
}
