export function dayOfYear(date = new Date()) {
  // Compare local calendar dates, not raw timestamps: subtracting timestamps
  // that include the time-of-day drifts by an hour across a DST boundary, which
  // can make the rollover land at 1 AM instead of midnight (so the day's pick
  // briefly matches the previous day's). Stripping the time and rounding keeps
  // the index tied purely to the calendar day.
  const start = new Date(date.getFullYear(), 0, 0);
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((current - start) / 86400000);
}
