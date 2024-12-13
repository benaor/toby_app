declare type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

declare type DeepNullable<T> = {
  [P in keyof T]: T[P] extends object ? DeepNullable<T[P]> : T[P] | null;
};

declare type DeepNullableExcept<T, K extends keyof T> = {
  [P in keyof T]: P extends K
    ? T[P]
    : T[P] extends object
      ? DeepNullable<T[P]>
      : T[P] | null;
};
