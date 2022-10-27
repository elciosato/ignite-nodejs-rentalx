import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function dateDiffNowInHours(date: Date): number {
  const dateStart = dayjs().format();
  const dateEnd = dayjs(date).local().format();

  return dayjs(dateEnd).diff(dateStart, "hours");
}
