import { useState } from 'react';

import CalendarHeader from './CalendarHeader';
import CalendarCell from './CalendarCell';
import { useCalendarGenerate } from '@/hooks/useCalendarGenerate';
import { gameData } from '@/mocks/game/CalendarScheduleInfo';

const Calendar = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const { days, weekdays } = useCalendarGenerate(year, month);

  return (
    <div className="mx-auto w-full py-14 pb-4 text-white">
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              {weekdays.map((day) => (
                <th
                  key={day}
                  className="w-1/7 py-3 text-center text-base text-gray-200"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <CalendarCell
                    key={dayIndex}
                    day={day}
                    data={day ? gameData[day] : null}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
