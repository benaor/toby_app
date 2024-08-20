// TODO: Should throw an error if start date is greater than end date

export const getDatesInRange = (start: Date, end: Date): Date[] => {
  const dateArray: Date[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};
