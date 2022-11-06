import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function dateDiffNowInHours(date: Date): number {
  const dateStart = dayjs().format();
  const dateEnd = dayjs(date).local().format();

  return dayjs(dateEnd).diff(dateStart, "hours");
}

export function dateDiffDays(start: Date, end: Date): number {
  const dateStart = dayjs(start).local().format();
  const dateEnd = dayjs(end).local().format();

  return dayjs(dateEnd).diff(dateStart, "day", true);
}

export function addDays(days: number): Date {
  return dayjs().add(days, "days").toDate();
}
