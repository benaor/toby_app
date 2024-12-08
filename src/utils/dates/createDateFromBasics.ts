export const createISO8601FromBasicTime = (
  time: BasicTime,
  options: { _date?: ISO8601; _gmt?: number } = {
    _date: new Date(Date.now()).toISOString(),
  },
): ISO8601 => {
  const [hours, minutes] = time.split(":").map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time format. Expected 'hh:mm'.");
  }

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
  const [year, month, day] = date.split("-").map(Number);

  if (year < 0 || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error("Invalid date format. Expected 'yyyy-mm-dd'.");
  }

  const time = new Date(options._time!);
  time.setFullYear(year, month - 1, day);

  return time.toISOString();
};
