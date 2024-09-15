import { motion } from 'framer-motion';

import CalendarCell from './CalendarCell';
import { useCalendarGenerate } from '@/hooks/useCalendarGenerate';
import { gameData } from '@/mocks/game/CalendarScheduleInfo';

type CalendarViewProps = {
  year: number;
  month: number;
};

const CalendarView = ({ year, month }: CalendarViewProps) => {
  const { days, weekdays } = useCalendarGenerate(year, month);

  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};

export default CalendarView;
