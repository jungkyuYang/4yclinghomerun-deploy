import { cn } from '@/utils/cn';
import { getTeamInfo } from '@/mocks/game/CalendarScheduleInfo';

type GameData = {
  team: string;
  time: string;
  home: boolean;
  result?: string;
};

type CalendarCellProps = {
  day: number | null;
  data: GameData | null;
};

const CalendarCell = ({ day, data }: CalendarCellProps) => {
  const teamInfo = data ? getTeamInfo(data.team) : null;

  const renderWinFlag = () => {
    switch (data?.result) {
      case '승':
        return (
          <span className="flex items-center justify-center rounded-md border border-gray-200 bg-red-700 p-1 text-xs text-white">
            승리
          </span>
        );
      case '패':
        return (
          <span className="flex items-center justify-center rounded-md border border-gray-200 bg-blue-700 p-1 text-xs text-white">
            패배
          </span>
        );
      case '무':
        return (
          <span className="flex items-center justify-center rounded-md border border-gray-200 bg-gray-300 p-1 text-xs text-black">
            무
          </span>
        );
      default:
        return data ? (
          <span className="flex items-center justify-center rounded-md border border-gray-200 bg-slate-600 p-1 text-xs text-white">
            경기 전
          </span>
        ) : null;
    }
  };

  return (
    <td
      className={cn(
        'w-1/7 h-40 border border-gray-700 px-2 py-4',
        day && data?.home ? 'bg-gray-900' : 'bg-transparent',
      )}
    >
      {day && (
        <div className="mb-5 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <div className="text-base">{day}</div>
            {data && (
              <div className="text-sm text-gray-200">{renderWinFlag()}</div>
            )}
          </div>
          {data && (
            <div className="flex flex-grow flex-col items-center justify-center">
              <img
                src={teamInfo?.img}
                alt={teamInfo?.name}
                className="mb-1 h-16 w-16 object-contain"
              />
              <div className="flex items-center justify-center gap-2">
                <div className="text-sm">{data.time}</div>
                <div className="text-sm text-red-300">
                  {data.home ? '수원' : teamInfo?.stadium}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </td>
  );
};

export default CalendarCell;
