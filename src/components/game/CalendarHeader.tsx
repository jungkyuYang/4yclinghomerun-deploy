import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaList, FaRegCalendarAlt } from 'react-icons/fa';

type CalendarHeaderProps = {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const CalendarHeader = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => {
  return (
    <header className="mb-4 flex items-center justify-between">
      <nav className="flex items-center gap-5">
        <div className="flex cursor-pointer items-center gap-2 transition-all duration-200 hover:text-lime-600">
          <FaRegCalendarAlt size={28} />
          <p className="text-lg font-bold">달력형</p>
        </div>
        <div className="flex cursor-pointer items-center gap-2 transition-all duration-200 hover:text-lime-600">
          <FaList size={28} />
          <p className="text-lg font-bold">리스트형</p>
        </div>
      </nav>

      <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center space-x-8">
        <button
          className="transition-all duration-200 hover:scale-110 hover:text-orange-600"
          onClick={onPrevMonth}
        >
          <IoIosArrowBack size={36} />
        </button>
        <h2 className="text-2xl font-bold">
          {year}년 {month}월
        </h2>
        <button
          className="transition-all duration-200 hover:scale-110 hover:text-orange-600"
          onClick={onNextMonth}
        >
          <IoIosArrowForward size={36} />
        </button>
      </div>

      <section className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-900"></span>
          <span className="text-lg font-bold">HOME</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-black"></span>
          <span className="text-lg font-bold">AWAY</span>
        </div>
      </section>
    </header>
  );
};

export default CalendarHeader;
