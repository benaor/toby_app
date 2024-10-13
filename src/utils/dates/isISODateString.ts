export const isISO8601 = (date: string): date is ISO8601 => {
  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?([Z]|([+-]\d{2}:\d{2})))?$/;

  return isoDateRegex.test(date);
};
