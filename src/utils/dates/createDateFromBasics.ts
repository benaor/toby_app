export const createISO8601FromBasicTime = (
  time: BasicTime,
  options: { _date?: ISO8601; _gmt?: number } = {
    _date: new Date(Date.now()).toISOString(),
  },
): ISO8601 => {
  const [hours, minutes] = extractTimeFromBasicTime(time);

  const date = new Date(options._date!);
  date.setHours(hours, minutes, 0, 0);

  return date.toISOString();
};

export const createISO8601FromBasicDate = (
  date: BasicDate,
  options: { _time?: ISO8601; _gmt?: number } = {
    _time: new Date(Date.now()).toISOString(),
  },
): ISO8601 => {
  const [year, month, day] = extractDateFromBasicDate(date);

  const time = new Date(options._time!);
  time.setFullYear(year, month - 1, day);

  return time.toISOString();
};

const isValidTimeFormat = (time: string): time is BasicTime => {
  const [hours, minutes] = time.split(":").map(Number);

  if (
    hours === undefined ||
    minutes === undefined ||
    isNaN(hours!) ||
    isNaN(minutes!)
  )
    throw new Error("Invalid time format. Expected 'hh:mm'.");

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return false;

  return true;
};

const isValidDateFormat = (date: string): date is BasicDate => {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day))
    throw new Error("Invalid date format. Expected 'yyyy-mm-dd'.");

  if (year < 0 || month < 1 || month > 12 || day < 1 || day > 31) return false;

  return true;
};

const extractTimeFromBasicTime = (
  time: BasicTime,
): [hours: number, minutes: number] => {
  if (!isValidTimeFormat(time))
    throw new Error("Invalid time format. Expected 'hh:mm'.");

  return time.split(":").map(Number) as [number, number];
};

const extractDateFromBasicDate = (
  date: BasicDate,
): [year: number, month: number, day: number] => {
  if (!isValidDateFormat(date))
    throw new Error("Invalid date format. Expected 'yyyy-mm-dd'.");

  return date.split("-").map(Number) as [number, number, number];
};
