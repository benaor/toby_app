declare type TypedPromise<Error, Result> = {
  catch<TResult = never>(
    onrejected?:
      | ((reason: Error) => TResult | PromiseLike<TResult>)
      | undefined
      | null,
  ): Promise<Result | TResult>;
} & Promise<Result>;
