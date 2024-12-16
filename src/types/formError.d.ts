declare type FormError<T> = {
  [K in keyof T]: T[K] extends object ? FormError<T[K]> : string | null;
};
