const useCalendarGenerate = (year: number, month: number) => {
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const weeks = Math.ceil((firstDay + daysInMonth) / 7);

  const days = [];
  let dayCount = 1;

  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || dayCount > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayCount);
        dayCount++;
      }
    }
    days.push(week);
  }

  return { days, weekdays };
};

export { useCalendarGenerate };
