export type AsyncStorage = PromisifyMethods<
  Pick<Storage, "getItem" | "setItem" | "removeItem">
>;
