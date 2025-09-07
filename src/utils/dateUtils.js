export const toStartOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const isToday = (date) => {
  const today = toStartOfDay(new Date());
  const d = toStartOfDay(date);
  return d.getTime() === today.getTime();
};

export const isThisWeek = (date) => {
  const now = new Date();
  const day = (now.getDay() + 6) % 7; // Monday = 0
  const start = new Date(now);
  start.setDate(now.getDate() - day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const d = new Date(date);
  return d >= start && d <= end;
};

export const isWithinRange = (date, start, end) => {
  if (!start || !end) return true;
  const d = toStartOfDay(date).getTime();
  const s = toStartOfDay(start).getTime();
  const e = toStartOfDay(end).getTime();
  return d >= s && d <= e;
};
