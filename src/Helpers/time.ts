import moment from "moment";

export function tsToDateString(ts: number) {
  const m = moment(ts * 1000);
  if (moment().diff(m, "days") < 1) {
    return m.fromNow();
  }
  if (moment().diff(m, "months") < 1) {
    return m.format("MM/DD HH:mm");
  }
  return m.format("YYYY/MM/DD HH:mm");
}
