export const timestampToDateObject = (timestamp: number) => {
  const date = new Date(timestamp);
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};
