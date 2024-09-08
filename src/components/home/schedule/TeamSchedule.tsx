import ScheduleCarousel from './ScheduleCarousel';
import TeamRank from '../rank/TeamRank';
import { GameScheduleData } from '@/mocks/home/GameSchedule';

const TeamSchedule = () => {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold">GAME & RANK</h1>
        <ScheduleCarousel schedules={GameScheduleData} />
      </div>

      <div className="mt-10 grid w-full grid-cols-2">
        <TeamRank
          rank={5}
          wins={62}
          losses={64}
          ties={2}
          winningPercentage={0.492}
        />
        <TeamRank
          rank={5}
          wins={62}
          losses={64}
          ties={2}
          winningPercentage={0.492}
        />
      </div>
    </>
  );
};

export default TeamSchedule;
