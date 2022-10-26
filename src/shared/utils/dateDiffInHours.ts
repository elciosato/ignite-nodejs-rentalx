import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function dateDiffInHours(date1: Date, date2: Date): number {
  let dateStart: Date;
  let dateEnd: Date;

  if (date1 > date2) {
    dateStart = date2;
    dateEnd = date1;
  } else {
    dateStart = date1;
    dateEnd = date2;
  }

  return dayjs(dateEnd).diff(dateStart, "hours");
}
