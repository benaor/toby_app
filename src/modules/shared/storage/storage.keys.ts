const storageKeys = ["authUser"] as const;
export type StorageKey = (typeof storageKeys)[number];
