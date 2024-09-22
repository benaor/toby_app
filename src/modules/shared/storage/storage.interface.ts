export interface AsyncStorage
  extends PromisifyMethods<
    Pick<Storage, "getItem" | "setItem" | "removeItem">
  > {}
