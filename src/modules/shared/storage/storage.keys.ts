const storageKeys = ["session"] as const;
export type StorageKey = (typeof storageKeys)[number];

export enum StorageKeyEnum {
  Session = "session",
}
