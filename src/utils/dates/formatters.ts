export const ISO8601ToYYYYMMDD = (iso: ISO8601, separator: string = "-") => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${separator}${month}${separator}${day}`;
};

export const ISO8601ToHHMM = (iso: ISO8601, separator: string = ":") => {
  const date = new Date(iso);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}${separator}${minutes}`;
};
