import moment from "moment";

export function dateTimeToRelative(value: number) {
  const m = moment(value);
  const now = moment();
  const diff = Math.abs(m.diff(now, "seconds"));
  if (diff < 3600 * 2) {
    return m.toNow();
  } else if (m.isSame(now, "day")) {
    return m.format("HH:mm");
  } else if (m.isSame(now, "year")) {
    return m.format("MM/DD HH:mm");
  } else {
    return m.format("YYYY/MM/DD HH:mm");
  }
}
