import { motion } from 'framer-motion';

import { useCalendarGenerate } from '@/hooks/useCalendarGenerate';
import { getTeamInfo, gameData } from '@/mocks/game/CalendarScheduleInfo';
import { cn } from '@/utils/cn';

type ListViewProps = {
  year: number;
  month: number;
};

const ListView = ({ year, month }: ListViewProps) => {
  const { flatDays } = useCalendarGenerate(year, month);

  // 경기가 있는 날짜만 필터링
  const gamesInMonth = flatDays.filter((day) => gameData[day]);

  const resultStyles = {
    승: 'bg-gradient-to-r from-red-400 to-red-500 text-white',
    패: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
    무: 'bg-gradient-to-r from-gray-400 to-gray-500 text-black',
  };

  return (
    <div className="space-y-3">
      {gamesInMonth.map((day, index) => {
        const game = gameData[day];
        const teamInfo = getTeamInfo(game.team);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              'bg-gradient-to-r overflow-hidden rounded-lg',
              game.home
                ? 'from-gray-900 to-gray-800'
                : 'from-black to-kt-black-4',
            )}
          >
            <div className="mx-10 grid grid-cols-7 items-center">
              <div className="col-span-2 flex items-center space-x-4 text-lg">
                <span className="font-bold text-white">{`${year}년 ${month}월 ${day}일`}</span>
                <span className="text-gray-300">{game.time}</span>
                <span className="truncate text-gray-300">
                  {game.home ? '수원' : teamInfo?.stadium}
                </span>
              </div>

              <div className="col-span-3 flex items-center justify-center gap-6">
                <img
                  src={teamInfo?.img}
                  alt={teamInfo?.name}
                  className="h-16 w-16 object-contain"
                />
                <span className="max-w-[150px] truncate text-xl font-semibold text-white">
                  {teamInfo?.name}
                </span>
              </div>

              <div className="col-span-1 flex items-center justify-center text-lg font-bold text-white">
                {game.score
                  ? `${game.score.split(':')[0]} : ${game.score.split(':')[1]}`
                  : '경기 전'}
              </div>

              <div className="col-span-1 flex items-center justify-center gap-4">
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold',
                    game.result && resultStyles[game.result],
                  )}
                >
                  {game.result}
                </span>
                <button className="text-base text-gray-200 transition-colors duration-200 hover:text-gray-400">
                  상세 보기
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ListView;
