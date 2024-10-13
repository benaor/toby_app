type ISOString =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}${"Z"}`;

/**
 *
 * @example
 * 2020-01-01
 * 2020-01-01T00:00:00.000Z
 * 2020-01-01T00:00:00.000+01:00
 * 2020-01-01T00:00:00.000-01:00
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 *
 * */
declare type ISO8601 =
  | `${number}-${number}-${number}` // YYYY-MM-DD
  | `${number}-${number}-${number}T${number}:${number}:${number}` // YYYY-MM-DDTHH:MM:SS
  | `${number}-${number}-${number}T${number}:${number}:${number}.${number}` // YYYY-MM-DDTHH:MM:SS.sss
  | `${number}-${number}-${number}T${number}:${number}:${number}${"Z"}` // YYYY-MM-DDTHH:MM:SSZ
  | `${number}-${number}-${number}T${number}:${number}:${number}${`Z` | `+${number}:${number}` | `-${number}:${number}`}` // YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DDTHH:MM:SS+HH:MM or YYYY-MM-DDTHH:MM:SS-HH:MM
  | `${number}-${number}-${number}T${number}:${number}:${number}.${number}${`+${number}:${number}` | `-${number}:${number}`}` // YYYY-MM-DDTHH:MM:SS.sssZ or YYYY-MM-DDTHH:MM:SS.sss+HH:MM or YYYY-MM-DDTHH:MM:SS.sss-HH:MM
  | ISOString; // YYYY-MM-DDTHH:MM:SS.sssZ FROM Date.ToISOString

interface Date {
  toISOString(): ISOString;
}
