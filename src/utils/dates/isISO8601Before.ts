export const isISO8601Before = (before: ISO8601, after: ISO8601): boolean =>
  new Date(before) <= new Date(after);
